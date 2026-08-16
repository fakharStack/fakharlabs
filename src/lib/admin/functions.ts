import { SupabaseClient } from "@supabase/supabase-js";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/lib/supabase.types";

const adminMiddleware = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const { requireAdmin, getSupabaseAdmin } = await import("@/lib/admin/auth.server");
  const [auth, supabaseAdmin] = await Promise.all([requireAdmin(), getSupabaseAdmin()]);
  return next({ context: { userId: auth.userId, supabaseAdmin } });
});

type SupabaseAdmin = SupabaseClient<Database>;

type AdminContext = {
  userId: string;
  supabaseAdmin: SupabaseAdmin;
};

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
/** Canonical project shape returned to the UI: the joined client is flattened to `client_name`. */
export type ProjectWithClient = ProjectRow & { client_name: string | null };
export type ClientOption = { id: string; name: string };




// activity logging
const logActivitySchema = z.object({
  action: z.string(),
  entity_type: z.string().optional(),
  entity_id: z.string().uuid().optional(),
  description: z.string(),
});

export const logActivity = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => logActivitySchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("activity_logs").insert({
      action: data.action,
      entity_type: data.entity_type ?? null,
      entity_id: data.entity_id ?? null,
      description: data.description,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const createNotificationSchema = z.object({
  title: z.string(),
  message: z.string().optional(),
  type: z.string(),
  entity_type: z.string().optional(),
  entity_id: z.string().uuid().optional(),
});

export const createNotification = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => createNotificationSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("notifications").insert({
      title: data.title,
      message: data.message ?? null,
      type: data.type,
      entity_type: data.entity_type ?? null,
      entity_id: data.entity_id ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// auth/session
export const ensureAdmin = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => ({ isAdmin: true }));

export const getUnreadCount = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { count, error } = await supabaseAdmin
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("read", false);
    if (error) throw new Error(error.message);
    return count ?? 0;
  });

// dashboard
export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const [leads, newLeads, clients, projects, won] = await Promise.all([
      supabaseAdmin.from("leads").select("id", { count: "exact", head: true }),
      supabaseAdmin.from("leads").select("id", { count: "exact", head: true }).eq("status", "New"),
      supabaseAdmin.from("clients").select("id", { count: "exact", head: true }).eq("status", "Active"),
      supabaseAdmin
        .from("projects")
        .select("id", { count: "exact", head: true })
        .in("status", ["Planning", "Design", "Development", "Review"]),
      supabaseAdmin.from("leads").select("id", { count: "exact", head: true }).eq("status", "Won"),
    ]);
    const err = [leads, newLeads, clients, projects, won].find((r) => r.error)?.error;
    if (err) throw new Error(err.message);
    const total = leads.count ?? 0;
    return {
      totalLeads: total,
      newLeads: newLeads.count ?? 0,
      activeClients: clients.count ?? 0,
      activeProjects: projects.count ?? 0,
      conversion: total ? Math.round(((won.count ?? 0) / total) * 100) : 0,
    };
  });

export const getRecentLeads = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("id, name, business_name, service, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getRecentActivity = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data, error } = await supabaseAdmin
      .from("activity_logs")
      .select("id, action, description, created_at")
      .order("created_at", { ascending: false })
      .limit(8);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

// leads
const idSchema = z.object({ id: z.string().uuid() });

export const getLeads = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data, error } = await supabaseAdmin
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getLead = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: lead, error } = await supabaseAdmin.from("leads").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!lead) throw new Error("Lead not found");
    return lead;
  });

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  business_name: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().max(60).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  source: z.string().max(40),
  status: z.string().max(40),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const createLead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => leadSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, userId } = context as AdminContext;
    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        business_name: data.business_name || null,
        service: data.service || null,
        budget: data.budget || null,
        source: data.source,
        status: data.status,
        message: data.message || null,
      })
      .select("id, name")
      .single();
    if (error) throw new Error(error.message);
    await supabaseAdmin
      .from("activity_logs")
      .insert({ action: "lead.created", entity_type: "lead", entity_id: row.id, description: `Lead added manually: ${row.name} (${userId})` });
    return row;
  });

const updateLeadSchema = z.object({
  id: z.string().uuid(),
  patch: z.object({
    status: z.string().max(40).optional(),
    notes: z.string().max(2000).optional(),
  }),
});

export const updateLead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => updateLeadSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("leads").update(data.patch as any).eq("id", data.id);
    if (error) throw new Error(error.message);
    if (data.patch.status) {
      await supabaseAdmin
        .from("activity_logs")
        .insert({ action: "lead.status_changed", entity_type: "lead", entity_id: data.id, description: `Lead marked as ${data.patch.status}` });
    }
    return { ok: true };
  });

export const deleteLead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: lead } = await supabaseAdmin.from("leads").select("name").eq("id", data.id).maybeSingle();
    const { error } = await supabaseAdmin.from("leads").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await supabaseAdmin
      .from("activity_logs")
      .insert({ action: "lead.deleted", entity_type: "lead", entity_id: data.id, description: `Lead deleted: ${lead?.name ?? ""}` });
    return { ok: true };
  });

const convertLeadSchema = z.object({
  leadId: z.string().uuid(),
  name: z.string().trim().min(1, "Client name is required").max(100),
  business_name: z.string().trim().max(120).optional().or(z.literal("")),
});

export const convertLeadToClient = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => convertLeadSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .select("*")
      .eq("id", data.leadId)
      .maybeSingle();
    if (leadError || !lead) throw new Error(leadError?.message ?? "Lead not found");

    const { data: row, error } = await supabaseAdmin
      .from("clients")
      .insert({
        name: data.name,
        business_name: data.business_name || null,
        email: lead.email,
        phone: lead.phone,
        lead_id: lead.id,
        status: "Active",
        notes: lead.message,
      })
      .select("id, name")
      .single();
    if (error) throw new Error(error.message);

    await supabaseAdmin.from("leads").update({ status: "Won" }).eq("id", lead.id);
    await supabaseAdmin
      .from("activity_logs")
      .insert({ action: "client.created", entity_type: "client", entity_id: row.id, description: `Lead converted to client: ${row.name}` });
    await supabaseAdmin
      .from("notifications")
      .insert({ title: "New client", message: `${row.name} was converted from a lead.`, type: "client", entity_type: "client", entity_id: row.id });

    return row;
  });

// clients
export const getClients = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data, error } = await supabaseAdmin
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getClient = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: client, error } = await supabaseAdmin.from("clients").select("*").eq("id", data.id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!client) throw new Error("Client not found");
    return client;
  });

const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  business_name: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  status: z.string().max(20),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const createClient = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => clientSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: row, error } = await supabaseAdmin
      .from("clients")
      .insert({
        name: data.name,
        business_name: data.business_name || null,
        email: data.email || null,
        phone: data.phone || null,
        status: data.status,
        notes: data.notes || null,
      })
      .select("id, name")
      .single();
    if (error) throw new Error(error.message);
    await supabaseAdmin
      .from("activity_logs")
      .insert({ action: "client.created", entity_type: "client", entity_id: row.id, description: `Client added: ${row.name}` });
    return row;
  });

const updateClientSchema = z.object({
  id: z.string().uuid(),
  patch: z.object({
    status: z.string().max(20).optional(),
    notes: z.string().max(2000).optional(),
  }),
});

export const updateClient = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => updateClientSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("clients").update(data.patch as any).eq("id", data.id);
    if (error) throw new Error(error.message);
    await supabaseAdmin
      .from("activity_logs")
      .insert({ action: "client.updated", entity_type: "client", entity_id: data.id, description: "Client updated" });
    return { ok: true };
  });

export const deleteClient = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: client } = await supabaseAdmin.from("clients").select("name").eq("id", data.id).maybeSingle();
    const { error } = await supabaseAdmin.from("clients").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await supabaseAdmin
      .from("activity_logs")
      .insert({ action: "client.deleted", entity_type: "client", entity_id: data.id, description: `Client deleted: ${client?.name ?? ""}` });
    return { ok: true };
  });

/** Lightweight client list used to populate project-assignment selects. */
export const getClientOptions = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data, error } = await supabaseAdmin
      .from("clients")
      .select("id, name")
      .order("name", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as ClientOption[];
  });

export const getClientProjects = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: rows, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("client_id", data.id)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

// projects
export const getProjects = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*, clients(name)")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as (ProjectRow & { clients: { name: string } | null })[];
    // Flatten the joined client into `client_name` — the shape every UI consumer expects.
    return rows.map(({ clients, ...project }) => ({
      ...project,
      client_name: clients?.name ?? null,
    })) satisfies ProjectWithClient[];
  });

export const getProject = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: project, error } = await supabaseAdmin
      .from("projects")
      .select("*, clients(id, name)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!project) throw new Error("Project not found");
    const { clients, ...row } = project as ProjectRow & { clients: { id: string; name: string } | null };
    return { ...row, client_name: clients?.name ?? null } satisfies ProjectWithClient;
  });

const projectSchema = z.object({
  name: z.string().trim().min(1, "Project name is required").max(120),
  client_id: z.string().uuid().optional().or(z.literal("")),
  type: z.string().max(40),
  status: z.string().max(40),
  deadline: z.string().max(20).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const createProject = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => projectSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: row, error } = await supabaseAdmin
      .from("projects")
      .insert({
        name: data.name,
        client_id: data.client_id || null,
        type: data.type,
        status: data.status,
        deadline: data.deadline || null,
        description: data.description || null,
      })
      .select("id, name")
      .single();
    if (error) throw new Error(error.message);
    await supabaseAdmin
      .from("activity_logs")
      .insert({ action: "project.created", entity_type: "project", entity_id: row.id, description: `Project created: ${row.name}` });
    return row;
  });

const updateProjectSchema = z.object({
  id: z.string().uuid(),
  patch: z.object({
    status: z.string().max(40).optional(),
    deadline: z.string().max(20).optional().or(z.literal("")),
    live_url: z.string().max(255).optional().or(z.literal("")),
    notes: z.string().max(2000).optional(),
  }),
});

export const updateProject = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => updateProjectSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const patch = {
      ...data.patch,
      deadline: data.patch.deadline === "" ? null : data.patch.deadline,
    };
    const { error } = await supabaseAdmin.from("projects").update(patch as any).eq("id", data.id);
    if (error) throw new Error(error.message);
    if (data.patch.status) {
      await supabaseAdmin
        .from("activity_logs")
        .insert({ action: "project.status_changed", entity_type: "project", entity_id: data.id, description: `Project moved to ${data.patch.status}` });
    }
    return { ok: true };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: project } = await supabaseAdmin.from("projects").select("name").eq("id", data.id).maybeSingle();
    const { error } = await supabaseAdmin.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await supabaseAdmin
      .from("activity_logs")
      .insert({ action: "project.deleted", entity_type: "project", entity_id: data.id, description: `Project deleted: ${project?.name ?? ""}` });
    return { ok: true };
  });

// tasks
const projectIdSchema = z.object({ projectId: z.string().uuid() });

export const getTasks = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => projectIdSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: rows, error } = await supabaseAdmin
      .from("tasks")
      .select("*")
      .eq("project_id", data.projectId)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

const addTaskSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().trim().min(1, "Task title is required").max(160),
  position: z.number().int().default(0),
});

export const addTask = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => addTaskSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("tasks").insert({
      project_id: data.projectId,
      title: data.title,
      status: "Todo",
      position: data.position,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const updateTaskSchema = z.object({
  id: z.string().uuid(),
  patch: z.object({
    status: z.string().max(40).optional(),
    title: z.string().max(160).optional(),
  }),
});

export const updateTask = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => updateTaskSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("tasks").update(data.patch as any).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteTask = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("tasks").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// notifications
export const getNotifications = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data, error } = await supabaseAdmin
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("notifications").update({ read: true }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const markAllNotificationsRead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { error } = await supabaseAdmin.from("notifications").update({ read: true }).eq("read", false);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// settings
const optionalUrl = z.string().trim().max(255).url("Enter a valid URL").optional().or(z.literal(""));

const settingsSchema = z.object({
  agency_name: z.string().trim().min(1, "Agency name is required").max(120),
  agency_email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  agency_phone: z.string().trim().max(40).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  website_url: optionalUrl,
  instagram_url: optionalUrl,
  facebook_url: optionalUrl,
  linkedin_url: optionalUrl,
  notify_new_leads: z.boolean().default(true),
  notify_projects: z.boolean().default(true),
});

export const getSettings = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data, error } = await supabaseAdmin.from("agency_settings").select("*").maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

export const saveSettings = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => settingsSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = context as AdminContext;
    const { data: row, error } = await supabaseAdmin
      .from("agency_settings")
      .upsert({
        id: true,
        agency_name: data.agency_name,
        agency_email: data.agency_email || null,
        agency_phone: data.agency_phone || null,
        whatsapp: data.whatsapp || null,
        website_url: data.website_url || null,
        instagram_url: data.instagram_url || null,
        facebook_url: data.facebook_url || null,
        linkedin_url: data.linkedin_url || null,
        notify_new_leads: data.notify_new_leads,
        notify_projects: data.notify_projects,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });
