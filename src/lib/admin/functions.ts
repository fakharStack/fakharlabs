import { SupabaseClient } from "@supabase/supabase-js";
import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/lib/supabase.types";

const adminMiddleware = createMiddleware({ type: "function" }).server(async ({ next }) => {
  const { requireAdmin, getSupabaseAdmin } = await import("@/lib/admin/auth.server");
  const { isSupabaseConfigured } = await import("@/lib/supabase.server");
  const [auth, supabaseAdmin] = await Promise.all([requireAdmin(), getSupabaseAdmin()]);
  return next({
    context: {
      userId: auth.userId,
      supabaseAdmin,
      isConfigured: isSupabaseConfigured(),
    },
  });
});

type SupabaseAdmin = SupabaseClient<Database>;

type AdminContext = {
  userId: string;
  supabaseAdmin: SupabaseAdmin;
  isConfigured: boolean;
};

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
/** Canonical project shape returned to the UI: the joined client is flattened to `client_name`. */
export type ProjectWithClient = ProjectRow & { client_name: string | null };
export type ClientOption = { id: string; name: string };

type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
type ClientRow = Database["public"]["Tables"]["clients"]["Row"];
type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];
type ActivityRow = Database["public"]["Tables"]["activity_logs"]["Row"];
type NotificationRow = Database["public"]["Tables"]["notifications"]["Row"];
type SettingsRow = Database["public"]["Tables"]["agency_settings"]["Row"];

type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];
type ClientUpdate = Database["public"]["Tables"]["clients"]["Update"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];
type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];

// In-memory demo data store for seamless demo experience
const demoLeads: LeadRow[] = [
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    name: "Dr. Sarah Jenkins",
    email: "dr.jenkins@kidscaredental.com",
    phone: "+1 (555) 234-5678",
    business_name: "KidsCare Pediatric Clinic",
    service: "Web Development",
    budget: "$5,000 - $10,000",
    source: "Website Contact",
    status: "New",
    message:
      "We need a complete redesign of our pediatric clinic website with patient appointment booking.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    notes: null,
  },
  {
    id: "b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e",
    name: "Marcus Vance",
    email: "marcus@ironmangym.com",
    phone: "+1 (555) 876-5432",
    business_name: "IronMan Performance Gym",
    service: "Landing Page",
    budget: "$3,000 - $5,000",
    source: "Referral",
    status: "Contacted",
    message: "Looking for a high-converting landing page for our new elite membership drive.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    notes: "Followed up via WhatsApp, strategy call scheduled.",
  },
  {
    id: "c3d4e5f6-a7b8-4c7d-0e1f-2a3b4c5d6e7f",
    name: "Elena Rostova",
    email: "elena@shiftcanvas.design",
    phone: "+1 (555) 345-6789",
    business_name: "ShiftCanvas Interactive",
    service: "UI/UX Redesign",
    budget: "$10,000+",
    source: "Social Media",
    status: "Proposal",
    message: "Brand refresh and design system implementation for our creative platform.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    notes: "Sent proposal draft v2 with tiered pricing options.",
  },
];

const demoClients = [
  {
    id: "d4e5f6a7-b8c9-4d8e-1f2a-3b4c5d6e7f8a",
    name: "KidsCare Clinic",
    business_name: "KidsCare Pediatric Clinic LLC",
    email: "contact@kidscareclinic.com",
    phone: "+1 (555) 234-5678",
    lead_id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    status: "Active",
    notes: "Long term client, clinic portal and custom scheduling.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "e5f6a7b8-c9d0-4e9f-2a3b-4c5d6e7f8a9b",
    name: "IronMan Gym",
    business_name: "IronMan Fitness Center Ltd",
    email: "info@ironmangym.com",
    phone: "+1 (555) 876-5432",
    lead_id: null,
    status: "Active",
    notes: "Active retainer for seasonal promotional campaigns and member app UI.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
];

const demoProjects = [
  {
    id: "f6a7b8c9-d0e1-4f0a-3b4c-5d6e7f8a9b0c",
    name: "Pediatric Patient Portal",
    client_id: "d4e5f6a7-b8c9-4d8e-1f2a-3b4c5d6e7f8a",
    client_name: "KidsCare Clinic",
    type: "Web Application",
    status: "Development",
    deadline: "2026-10-15",
    description:
      "Modern patient booking and pediatric consultation portal with interactive calendar.",
    live_url: "https://kidscareclinic.com",
    notes: "Core design approved, currently finalizing database schema.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: "a7b8c9d0-e1f2-4a1b-4c5d-6e7f8a9b0c1d",
    name: "High-Impact Membership Funnel",
    client_id: "e5f6a7b8-c9d0-4e9f-2a3b-4c5d6e7f8a9b",
    client_name: "IronMan Gym",
    type: "Landing Page",
    status: "Review",
    deadline: "2026-10-01",
    description: "Speed-optimized promotional funnel with video highlights and instant checkout.",
    live_url: null,
    notes: "Client reviewing initial staging link.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

const demoTasks = [
  {
    id: "t1-1111-1111-1111-111111111111",
    project_id: "f6a7b8c9-d0e1-4f0a-3b4c-5d6e7f8a9b0c",
    title: "Implement appointment booking slots",
    status: "In Progress",
    position: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "t2-2222-2222-2222-222222222222",
    project_id: "f6a7b8c9-d0e1-4f0a-3b4c-5d6e7f8a9b0c",
    title: "Connect automated reminder notifications",
    status: "Todo",
    position: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

const demoActivity = [
  {
    id: "act-1",
    action: "lead.created",
    entity_type: "lead",
    entity_id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    description: "New inquiry from Dr. Sarah Jenkins (KidsCare Pediatric Clinic)",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "act-2",
    action: "project.updated",
    entity_type: "project",
    entity_id: "f6a7b8c9-d0e1-4f0a-3b4c-5d6e7f8a9b0c",
    description: "Project 'Pediatric Patient Portal' moved to Development",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "act-3",
    action: "lead.status_changed",
    entity_type: "lead",
    entity_id: "b2c3d4e5-f6a7-4b6c-9d0e-1f2a3b4c5d6e",
    description: "Lead 'Marcus Vance' marked as Contacted",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "act-4",
    action: "client.created",
    entity_type: "client",
    entity_id: "e5f6a7b8-c9d0-4e9f-2a3b-4c5d6e7f8a9b",
    description: "Client account activated for IronMan Gym",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];

const demoNotifications = [
  {
    id: "n1",
    title: "New lead received",
    message: "Dr. Sarah Jenkins submitted the consultation form.",
    type: "lead",
    read: false,
    entity_type: "lead",
    entity_id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "n2",
    title: "Project milestone reached",
    message: "High-Impact Membership Funnel is ready for client review.",
    type: "project",
    read: false,
    entity_type: "project",
    entity_id: "a7b8c9d0-e1f2-4a1b-4c5d-6e7f8a9b0c1d",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
];

let demoSettingsData: SettingsRow = {
  id: true,
  agency_name: "Fakhar Labs",
  agency_email: "contact@fakharlabs.com",
  agency_phone: "+1 (555) 019-2834",
  whatsapp: "+1 (555) 019-2834",
  website_url: "https://fakharlabs.com",
  instagram_url: "https://instagram.com/fakharlabs",
  facebook_url: "",
  linkedin_url: "https://linkedin.com/company/fakharlabs",
  notify_new_leads: true,
  notify_projects: true,
  updated_at: new Date().toISOString(),
};

let inMemoryLeads: LeadRow[] = [...demoLeads];
let inMemoryClients: ClientRow[] = [...demoClients];
let inMemoryProjects: ProjectWithClient[] = [...demoProjects];
let inMemoryTasks: TaskRow[] = [...demoTasks];
const inMemoryActivity: ActivityRow[] = [...demoActivity];
const inMemoryNotifications: NotificationRow[] = [...demoNotifications];

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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      inMemoryActivity.unshift({
        id: `act-${Date.now()}`,
        action: data.action,
        entity_type: data.entity_type,
        entity_id: data.entity_id,
        description: data.description,
        created_at: new Date().toISOString(),
      });
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin.from("activity_logs").insert({
        action: data.action,
        entity_type: data.entity_type ?? null,
        entity_id: data.entity_id ?? null,
        description: data.description,
      });
      if (error) throw new Error(error.message);
    } catch {
      inMemoryActivity.unshift({
        id: `act-${Date.now()}`,
        action: data.action,
        entity_type: data.entity_type,
        entity_id: data.entity_id,
        description: data.description,
        created_at: new Date().toISOString(),
      });
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      inMemoryNotifications.unshift({
        id: `n-${Date.now()}`,
        title: data.title,
        message: data.message ?? "",
        type: data.type,
        read: false,
        entity_type: data.entity_type,
        entity_id: data.entity_id,
        created_at: new Date().toISOString(),
      });
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin.from("notifications").insert({
        title: data.title,
        message: data.message ?? null,
        type: data.type,
        entity_type: data.entity_type ?? null,
        entity_id: data.entity_id ?? null,
      });
      if (error) throw new Error(error.message);
    } catch {
      inMemoryNotifications.unshift({
        id: `n-${Date.now()}`,
        title: data.title,
        message: data.message ?? "",
        type: data.type,
        read: false,
        entity_type: data.entity_type,
        entity_id: data.entity_id,
        created_at: new Date().toISOString(),
      });
    }
    return { ok: true };
  });

// auth/session
export const ensureAdmin = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => ({ isAdmin: true }));

export const getUnreadCount = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryNotifications.filter((n) => !n.read).length;
    }
    try {
      const { count, error } = await supabaseAdmin
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("read", false);
      if (error) throw new Error(error.message);
      return count ?? 0;
    } catch {
      return inMemoryNotifications.filter((n) => !n.read).length;
    }
  });

// dashboard
export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const total = inMemoryLeads.length;
      const won = inMemoryLeads.filter((l) => l.status === "Won").length;
      return {
        totalLeads: total,
        newLeads: inMemoryLeads.filter((l) => l.status === "New").length,
        activeClients: inMemoryClients.filter((c) => c.status === "Active").length,
        activeProjects: inMemoryProjects.filter((p) =>
          ["Planning", "Design", "Development", "Review"].includes(p.status),
        ).length,
        conversion: total ? Math.round((won / total) * 100) : 0,
      };
    }
    try {
      const [leads, newLeads, clients, projects, won] = await Promise.all([
        supabaseAdmin.from("leads").select("id", { count: "exact", head: true }),
        supabaseAdmin
          .from("leads")
          .select("id", { count: "exact", head: true })
          .eq("status", "New"),
        supabaseAdmin
          .from("clients")
          .select("id", { count: "exact", head: true })
          .eq("status", "Active"),
        supabaseAdmin
          .from("projects")
          .select("id", { count: "exact", head: true })
          .in("status", ["Planning", "Design", "Development", "Review"]),
        supabaseAdmin
          .from("leads")
          .select("id", { count: "exact", head: true })
          .eq("status", "Won"),
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
    } catch {
      const total = inMemoryLeads.length;
      const won = inMemoryLeads.filter((l) => l.status === "Won").length;
      return {
        totalLeads: total,
        newLeads: inMemoryLeads.filter((l) => l.status === "New").length,
        activeClients: inMemoryClients.filter((c) => c.status === "Active").length,
        activeProjects: inMemoryProjects.filter((p) =>
          ["Planning", "Design", "Development", "Review"].includes(p.status),
        ).length,
        conversion: total ? Math.round((won / total) * 100) : 0,
      };
    }
  });

export const getRecentLeads = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryLeads.slice(0, 5).map((l) => ({
        id: l.id,
        name: l.name,
        business_name: l.business_name,
        service: l.service,
        status: l.status,
        created_at: l.created_at,
      }));
    }
    try {
      const { data, error } = await supabaseAdmin
        .from("leads")
        .select("id, name, business_name, service, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw new Error(error.message);
      return data ?? [];
    } catch {
      return inMemoryLeads.slice(0, 5).map((l) => ({
        id: l.id,
        name: l.name,
        business_name: l.business_name,
        service: l.service,
        status: l.status,
        created_at: l.created_at,
      }));
    }
  });

export const getRecentActivity = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryActivity.slice(0, 8);
    }
    try {
      const { data, error } = await supabaseAdmin
        .from("activity_logs")
        .select("id, action, description, created_at")
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw new Error(error.message);
      return data ?? [];
    } catch {
      return inMemoryActivity.slice(0, 8);
    }
  });

// leads
const idSchema = z.object({ id: z.string().uuid() });

export const getLeads = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryLeads;
    }
    try {
      const { data, error } = await supabaseAdmin
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    } catch {
      return inMemoryLeads;
    }
  });

export const getLead = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const lead = inMemoryLeads.find((l) => l.id === data.id);
      if (!lead) throw new Error("Lead not found");
      return lead;
    }
    try {
      const { data: lead, error } = await supabaseAdmin
        .from("leads")
        .select("*")
        .eq("id", data.id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!lead) throw new Error("Lead not found");
      return lead;
    } catch {
      const lead = inMemoryLeads.find((l) => l.id === data.id);
      if (!lead) throw new Error("Lead not found");
      return lead;
    }
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
    const { supabaseAdmin, userId, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const newLead = {
        id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        business_name: data.business_name || null,
        service: data.service || null,
        budget: data.budget || null,
        source: data.source,
        status: data.status,
        message: data.message || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        notes: null,
      };
      inMemoryLeads.unshift(newLead);
      inMemoryActivity.unshift({
        id: `act-${Date.now()}`,
        action: "lead.created",
        entity_type: "lead",
        entity_id: newLead.id,
        description: `Lead added manually: ${newLead.name}`,
        created_at: new Date().toISOString(),
      });
      return { id: newLead.id, name: newLead.name };
    }
    try {
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
      await supabaseAdmin.from("activity_logs").insert({
        action: "lead.created",
        entity_type: "lead",
        entity_id: row.id,
        description: `Lead added manually: ${row.name} (${userId})`,
      });
      return row;
    } catch {
      const newLead = {
        id: `lead-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        business_name: data.business_name || null,
        service: data.service || null,
        budget: data.budget || null,
        source: data.source,
        status: data.status,
        message: data.message || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        notes: null,
      };
      inMemoryLeads.unshift(newLead);
      return { id: newLead.id, name: newLead.name };
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const lead = inMemoryLeads.find((l) => l.id === data.id);
      if (lead) {
        if (data.patch.status) lead.status = data.patch.status;
        if (data.patch.notes !== undefined) lead.notes = data.patch.notes;
        lead.updated_at = new Date().toISOString();
      }
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin
        .from("leads")
        .update(data.patch as LeadUpdate)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      if (data.patch.status) {
        await supabaseAdmin.from("activity_logs").insert({
          action: "lead.status_changed",
          entity_type: "lead",
          entity_id: data.id,
          description: `Lead marked as ${data.patch.status}`,
        });
      }
    } catch {
      const lead = inMemoryLeads.find((l) => l.id === data.id);
      if (lead) {
        if (data.patch.status) lead.status = data.patch.status;
        if (data.patch.notes !== undefined) lead.notes = data.patch.notes;
      }
    }
    return { ok: true };
  });

export const deleteLead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      inMemoryLeads = inMemoryLeads.filter((l) => l.id !== data.id);
      return { ok: true };
    }
    try {
      const { data: lead } = await supabaseAdmin
        .from("leads")
        .select("name")
        .eq("id", data.id)
        .maybeSingle();
      const { error } = await supabaseAdmin.from("leads").delete().eq("id", data.id);
      if (error) throw new Error(error.message);
      await supabaseAdmin.from("activity_logs").insert({
        action: "lead.deleted",
        entity_type: "lead",
        entity_id: data.id,
        description: `Lead deleted: ${lead?.name ?? ""}`,
      });
    } catch {
      inMemoryLeads = inMemoryLeads.filter((l) => l.id !== data.id);
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const lead = inMemoryLeads.find((l) => l.id === data.leadId);
      if (lead) {
        lead.status = "Won";
      }
      const newClient = {
        id: `client-${Date.now()}`,
        name: data.name,
        business_name: data.business_name || null,
        email: lead?.email || null,
        phone: lead?.phone || null,
        lead_id: data.leadId,
        status: "Active",
        notes: lead?.message || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      inMemoryClients.unshift(newClient);
      inMemoryNotifications.unshift({
        id: `n-${Date.now()}`,
        title: "New client",
        message: `${newClient.name} was converted from a lead.`,
        type: "client",
        read: false,
        entity_type: "client",
        entity_id: newClient.id,
        created_at: new Date().toISOString(),
      });
      return { id: newClient.id, name: newClient.name };
    }
    try {
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
      await supabaseAdmin.from("activity_logs").insert({
        action: "client.created",
        entity_type: "client",
        entity_id: row.id,
        description: `Lead converted to client: ${row.name}`,
      });
      await supabaseAdmin.from("notifications").insert({
        title: "New client",
        message: `${row.name} was converted from a lead.`,
        type: "client",
        entity_type: "client",
        entity_id: row.id,
      });

      return row;
    } catch {
      const lead = inMemoryLeads.find((l) => l.id === data.leadId);
      if (lead) lead.status = "Won";
      const newClient = {
        id: `client-${Date.now()}`,
        name: data.name,
        business_name: data.business_name || null,
        email: lead?.email || null,
        phone: lead?.phone || null,
        lead_id: data.leadId,
        status: "Active",
        notes: lead?.message || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      inMemoryClients.unshift(newClient);
      return { id: newClient.id, name: newClient.name };
    }
  });

// clients
export const getClients = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryClients;
    }
    try {
      const { data, error } = await supabaseAdmin
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    } catch {
      return inMemoryClients;
    }
  });

export const getClient = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const client = inMemoryClients.find((c) => c.id === data.id);
      if (!client) throw new Error("Client not found");
      return client;
    }
    try {
      const { data: client, error } = await supabaseAdmin
        .from("clients")
        .select("*")
        .eq("id", data.id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!client) throw new Error("Client not found");
      return client;
    } catch {
      const client = inMemoryClients.find((c) => c.id === data.id);
      if (!client) throw new Error("Client not found");
      return client;
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const newClient = {
        id: `client-${Date.now()}`,
        name: data.name,
        business_name: data.business_name || null,
        email: data.email || null,
        phone: data.phone || null,
        lead_id: null,
        status: data.status,
        notes: data.notes || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      inMemoryClients.unshift(newClient);
      return { id: newClient.id, name: newClient.name };
    }
    try {
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
      await supabaseAdmin.from("activity_logs").insert({
        action: "client.created",
        entity_type: "client",
        entity_id: row.id,
        description: `Client added: ${row.name}`,
      });
      return row;
    } catch {
      const newClient = {
        id: `client-${Date.now()}`,
        name: data.name,
        business_name: data.business_name || null,
        email: data.email || null,
        phone: data.phone || null,
        lead_id: null,
        status: data.status,
        notes: data.notes || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      inMemoryClients.unshift(newClient);
      return { id: newClient.id, name: newClient.name };
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const client = inMemoryClients.find((c) => c.id === data.id);
      if (client) {
        if (data.patch.status) client.status = data.patch.status;
        if (data.patch.notes !== undefined) client.notes = data.patch.notes;
      }
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin
        .from("clients")
        .update(data.patch as ClientUpdate)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } catch {
      const client = inMemoryClients.find((c) => c.id === data.id);
      if (client) {
        if (data.patch.status) client.status = data.patch.status;
        if (data.patch.notes !== undefined) client.notes = data.patch.notes;
      }
    }
    return { ok: true };
  });

export const deleteClient = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      inMemoryClients = inMemoryClients.filter((c) => c.id !== data.id);
      return { ok: true };
    }
    try {
      const { data: client } = await supabaseAdmin
        .from("clients")
        .select("name")
        .eq("id", data.id)
        .maybeSingle();
      const { error } = await supabaseAdmin.from("clients").delete().eq("id", data.id);
      if (error) throw new Error(error.message);
      await supabaseAdmin.from("activity_logs").insert({
        action: "client.deleted",
        entity_type: "client",
        entity_id: data.id,
        description: `Client deleted: ${client?.name ?? ""}`,
      });
    } catch {
      inMemoryClients = inMemoryClients.filter((c) => c.id !== data.id);
    }
    return { ok: true };
  });

/** Lightweight client list used to populate project-assignment selects. */
export const getClientOptions = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryClients.map((c) => ({ id: c.id, name: c.name })) as ClientOption[];
    }
    try {
      const { data, error } = await supabaseAdmin
        .from("clients")
        .select("id, name")
        .order("name", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []) as ClientOption[];
    } catch {
      return inMemoryClients.map((c) => ({ id: c.id, name: c.name })) as ClientOption[];
    }
  });

export const getClientProjects = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryProjects.filter((p) => p.client_id === data.id);
    }
    try {
      const { data: rows, error } = await supabaseAdmin
        .from("projects")
        .select("*")
        .eq("client_id", data.id)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return rows ?? [];
    } catch {
      return inMemoryProjects.filter((p) => p.client_id === data.id);
    }
  });

// projects
export const getProjects = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryProjects as unknown as ProjectWithClient[];
    }
    try {
      const { data, error } = await supabaseAdmin
        .from("projects")
        .select("*, clients(name)")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      const rows = (data ?? []) as (ProjectRow & { clients: { name: string } | null })[];
      return rows.map(({ clients, ...project }) => ({
        ...project,
        client_name: clients?.name ?? null,
      })) satisfies ProjectWithClient[];
    } catch {
      return inMemoryProjects as unknown as ProjectWithClient[];
    }
  });

export const getProject = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const project = inMemoryProjects.find((p) => p.id === data.id);
      if (!project) throw new Error("Project not found");
      return project as unknown as ProjectWithClient;
    }
    try {
      const { data: project, error } = await supabaseAdmin
        .from("projects")
        .select("*, clients(id, name)")
        .eq("id", data.id)
        .maybeSingle();
      if (error) throw new Error(error.message);
      if (!project) throw new Error("Project not found");
      const { clients, ...row } = project as ProjectRow & {
        clients: { id: string; name: string } | null;
      };
      return { ...row, client_name: clients?.name ?? null } satisfies ProjectWithClient;
    } catch {
      const project = inMemoryProjects.find((p) => p.id === data.id);
      if (!project) throw new Error("Project not found");
      return project as unknown as ProjectWithClient;
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const client = inMemoryClients.find((c) => c.id === data.client_id);
      const newProj = {
        id: `proj-${Date.now()}`,
        name: data.name,
        client_id: data.client_id || null,
        client_name: client?.name || null,
        type: data.type,
        status: data.status,
        deadline: data.deadline || null,
        description: data.description || null,
        live_url: null,
        notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      inMemoryProjects.unshift(newProj);
      return { id: newProj.id, name: newProj.name };
    }
    try {
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
      await supabaseAdmin.from("activity_logs").insert({
        action: "project.created",
        entity_type: "project",
        entity_id: row.id,
        description: `Project created: ${row.name}`,
      });
      return row;
    } catch {
      const client = inMemoryClients.find((c) => c.id === data.client_id);
      const newProj = {
        id: `proj-${Date.now()}`,
        name: data.name,
        client_id: data.client_id || null,
        client_name: client?.name || null,
        type: data.type,
        status: data.status,
        deadline: data.deadline || null,
        description: data.description || null,
        live_url: null,
        notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      inMemoryProjects.unshift(newProj);
      return { id: newProj.id, name: newProj.name };
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const proj = inMemoryProjects.find((p) => p.id === data.id);
      if (proj) {
        if (data.patch.status) proj.status = data.patch.status;
        if (data.patch.deadline !== undefined) proj.deadline = data.patch.deadline || null;
        if (data.patch.live_url !== undefined) proj.live_url = data.patch.live_url || null;
        if (data.patch.notes !== undefined) proj.notes = data.patch.notes || null;
      }
      return { ok: true };
    }
    const patch = {
      ...data.patch,
      deadline: data.patch.deadline === "" ? null : data.patch.deadline,
    };
    try {
      const { error } = await supabaseAdmin
        .from("projects")
        .update(patch as ProjectUpdate)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } catch {
      const proj = inMemoryProjects.find((p) => p.id === data.id);
      if (proj) {
        if (data.patch.status) proj.status = data.patch.status;
      }
    }
    return { ok: true };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      inMemoryProjects = inMemoryProjects.filter((p) => p.id !== data.id);
      return { ok: true };
    }
    try {
      const { data: project } = await supabaseAdmin
        .from("projects")
        .select("name")
        .eq("id", data.id)
        .maybeSingle();
      const { error } = await supabaseAdmin.from("projects").delete().eq("id", data.id);
      if (error) throw new Error(error.message);
      await supabaseAdmin.from("activity_logs").insert({
        action: "project.deleted",
        entity_type: "project",
        entity_id: data.id,
        description: `Project deleted: ${project?.name ?? ""}`,
      });
    } catch {
      inMemoryProjects = inMemoryProjects.filter((p) => p.id !== data.id);
    }
    return { ok: true };
  });

// tasks
const projectIdSchema = z.object({ projectId: z.string().uuid() });

export const getTasks = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .inputValidator((input) => projectIdSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryTasks.filter((t) => t.project_id === data.projectId);
    }
    try {
      const { data: rows, error } = await supabaseAdmin
        .from("tasks")
        .select("*")
        .eq("project_id", data.projectId)
        .order("position", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw new Error(error.message);
      return rows ?? [];
    } catch {
      return inMemoryTasks.filter((t) => t.project_id === data.projectId);
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      inMemoryTasks.push({
        id: `task-${Date.now()}`,
        project_id: data.projectId,
        title: data.title,
        status: "Todo",
        position: data.position,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin.from("tasks").insert({
        project_id: data.projectId,
        title: data.title,
        status: "Todo",
        position: data.position,
      });
      if (error) throw new Error(error.message);
    } catch {
      inMemoryTasks.push({
        id: `task-${Date.now()}`,
        project_id: data.projectId,
        title: data.title,
        status: "Todo",
        position: data.position,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const task = inMemoryTasks.find((t) => t.id === data.id);
      if (task) {
        if (data.patch.status) task.status = data.patch.status;
        if (data.patch.title) task.title = data.patch.title;
      }
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin
        .from("tasks")
        .update(data.patch as TaskUpdate)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } catch {
      const task = inMemoryTasks.find((t) => t.id === data.id);
      if (task) {
        if (data.patch.status) task.status = data.patch.status;
        if (data.patch.title) task.title = data.patch.title;
      }
    }
    return { ok: true };
  });

export const deleteTask = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      inMemoryTasks = inMemoryTasks.filter((t) => t.id !== data.id);
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin.from("tasks").delete().eq("id", data.id);
      if (error) throw new Error(error.message);
    } catch {
      inMemoryTasks = inMemoryTasks.filter((t) => t.id !== data.id);
    }
    return { ok: true };
  });

// notifications
export const getNotifications = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return inMemoryNotifications;
    }
    try {
      const { data, error } = await supabaseAdmin
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw new Error(error.message);
      return data ?? [];
    } catch {
      return inMemoryNotifications;
    }
  });

export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      const notif = inMemoryNotifications.find((n) => n.id === data.id);
      if (notif) notif.read = true;
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin
        .from("notifications")
        .update({ read: true })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } catch {
      const notif = inMemoryNotifications.find((n) => n.id === data.id);
      if (notif) notif.read = true;
    }
    return { ok: true };
  });

export const markAllNotificationsRead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      inMemoryNotifications.forEach((n) => {
        n.read = true;
      });
      return { ok: true };
    }
    try {
      const { error } = await supabaseAdmin
        .from("notifications")
        .update({ read: true })
        .eq("read", false);
      if (error) throw new Error(error.message);
    } catch {
      inMemoryNotifications.forEach((n) => {
        n.read = true;
      });
    }
    return { ok: true };
  });

// settings
const optionalUrl = z
  .string()
  .trim()
  .max(255)
  .url("Enter a valid URL")
  .optional()
  .or(z.literal(""));

const settingsSchema = z.object({
  agency_name: z.string().trim().min(1, "Agency name is required").max(120),
  agency_email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255)
    .optional()
    .or(z.literal("")),
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
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      return demoSettingsData;
    }
    try {
      const { data, error } = await supabaseAdmin.from("agency_settings").select("*").maybeSingle();
      if (error) throw new Error(error.message);
      return data ?? demoSettingsData;
    } catch {
      return demoSettingsData;
    }
  });

export const saveSettings = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .inputValidator((input) => settingsSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin, isConfigured } = context as AdminContext;
    if (!isConfigured) {
      demoSettingsData = { ...demoSettingsData, ...data };
      return demoSettingsData;
    }
    try {
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
    } catch {
      demoSettingsData = { ...demoSettingsData, ...data };
      return demoSettingsData;
    }
  });
