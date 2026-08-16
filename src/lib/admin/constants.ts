import type { Database } from "@/lib/supabase.types";

type Tables = Database["public"]["Tables"];

export type Lead = Tables["leads"]["Row"];
export type Client = Tables["clients"]["Row"];
export type Project = Tables["projects"]["Row"];
export type Task = Tables["tasks"]["Row"];
export type Notification = Tables["notifications"]["Row"];
export type ActivityLog = Tables["activity_logs"]["Row"];
export type AgencySettings = Tables["agency_settings"]["Row"];

export const LEAD_STATUSES = ["New", "Contacted", "Proposal Sent", "Won", "Lost"] as const;
export const LEAD_SOURCES = ["Website", "WhatsApp", "Instagram", "Facebook", "Referral", "Other"] as const;
export const CLIENT_STATUSES = ["Active", "Inactive"] as const;
export const PROJECT_STATUSES = [
  "Planning",
  "Design",
  "Development",
  "Review",
  "Completed",
  "Cancelled",
] as const;
export const PROJECT_TYPES = ["Website", "Landing Page", "Redesign", "Other"] as const;
export const TASK_STATUSES = ["Todo", "In Progress", "Completed"] as const;

export const SERVICES = [
  "Website Design",
  "Web Development",
  "Landing Pages",
  "Website Redesign",
  "SEO & Performance",
  "Branding",
  "Strategy",
  "Other",
] as const;

export const ACTIVE_PROJECT_STATUSES = ["Planning", "Design", "Development", "Review"];

export const statusTone: Record<string, string> = {
  New: "bg-primary/10 text-primary ring-primary/20",
  Contacted: "bg-amber-500/10 text-amber-700 ring-amber-500/20",
  "Proposal Sent": "bg-sky-500/10 text-sky-700 ring-sky-500/20",
  Won: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20",
  Lost: "bg-error/10 text-error ring-error/20",
  Active: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20",
  Inactive: "bg-outline/10 text-on-surface-variant ring-outline/20",
  Planning: "bg-outline/10 text-on-surface-variant ring-outline/20",
  Design: "bg-fuchsia-500/10 text-fuchsia-700 ring-fuchsia-500/20",
  Development: "bg-sky-500/10 text-sky-700 ring-sky-500/20",
  Review: "bg-amber-500/10 text-amber-700 ring-amber-500/20",
  Completed: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20",
  Cancelled: "bg-error/10 text-error ring-error/20",
  Todo: "bg-outline/10 text-on-surface-variant ring-outline/20",
  "In Progress": "bg-sky-500/10 text-sky-700 ring-sky-500/20",
};

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
