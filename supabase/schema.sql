-- ============================================================
-- Portable schema for Aether Studio admin dashboard
-- Designed for: your own Supabase project + Clerk auth
-- No Supabase Auth dependency. No Lovable Cloud dependency.
-- Run this in your Supabase project's SQL Editor.
-- ============================================================

-- roles
CREATE TYPE public.app_role AS ENUM ('admin');

-- OPTIONAL fallback authorization tables. The primary admin allowlist lives in
-- the ADMIN_EMAILS / ADMIN_CLERK_USER_IDS server env vars; these tables let you
-- grant admin by Clerk user id instead. Passwords always live in Clerk.
CREATE TABLE public.users (
  id text PRIMARY KEY,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.users TO service_role;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- roles must be stored in a separate table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- helper to check admin role (used by server functions, not RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id text, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- shared updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- leads (public can submit via website contact form)
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  business_name text,
  email text NOT NULL,
  phone text,
  service text,
  budget text,
  message text,
  source text NOT NULL DEFAULT 'Website',
  status text NOT NULL DEFAULT 'New',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX leads_status_idx ON public.leads (status);
CREATE INDEX leads_service_idx ON public.leads (service);
CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);
GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit contact leads" ON public.leads FOR INSERT TO anon
  WITH CHECK (source = 'Website' AND status = 'New' AND notes IS NULL);
CREATE TRIGGER leads_set_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- clients
CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  name text NOT NULL,
  business_name text,
  email text,
  phone text,
  notes text,
  status text NOT NULL DEFAULT 'Active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX clients_status_idx ON public.clients (status);
CREATE INDEX clients_lead_id_idx ON public.clients (lead_id);
GRANT ALL ON public.clients TO service_role;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER clients_set_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'Website',
  status text NOT NULL DEFAULT 'Planning',
  deadline date,
  live_url text,
  repository_url text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX projects_client_id_idx ON public.projects (client_id);
CREATE INDEX projects_status_idx ON public.projects (status);
CREATE INDEX projects_deadline_idx ON public.projects (deadline);
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER projects_set_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- tasks
CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'Todo',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX tasks_project_id_idx ON public.tasks (project_id, position);
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER tasks_set_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- notifications
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text,
  type text NOT NULL DEFAULT 'system',
  entity_type text,
  entity_id uuid,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX notifications_read_idx ON public.notifications (read, created_at DESC);
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- activity log
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX activity_logs_created_at_idx ON public.activity_logs (created_at DESC);
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- agency settings (single row)
CREATE TABLE public.agency_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  agency_name text NOT NULL DEFAULT 'Aether Studio',
  agency_email text,
  agency_phone text,
  whatsapp text,
  website_url text,
  instagram_url text,
  facebook_url text,
  linkedin_url text,
  notify_new_leads boolean NOT NULL DEFAULT true,
  notify_projects boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.agency_settings TO service_role;
ALTER TABLE public.agency_settings ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER agency_settings_set_updated_at BEFORE UPDATE ON public.agency_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.agency_settings (id, agency_email) VALUES (true, 'hello@aetherstudio.com');

-- new lead -> notification + activity
CREATE OR REPLACE FUNCTION public.on_lead_created()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.notifications (title, message, type, entity_type, entity_id)
  VALUES ('New website lead',
          NEW.name || COALESCE(' (' || NEW.business_name || ')', '') || ' submitted an enquiry.',
          'lead', 'lead', NEW.id);
  INSERT INTO public.activity_logs (action, entity_type, entity_id, description)
  VALUES ('lead_created', 'lead', NEW.id, 'Lead created from ' || NEW.source || ': ' || NEW.name);
  RETURN NEW;
END;
$$;
CREATE TRIGGER leads_after_insert AFTER INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.on_lead_created();

-- revoke public execute on internal functions
REVOKE ALL ON FUNCTION public.on_lead_created() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(text, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(text, public.app_role) TO service_role;
