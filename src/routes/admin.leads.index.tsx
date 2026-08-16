import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import { z } from "zod";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Card,
  Button,
  Input,
  Select,
  Field,
  Textarea,
  Modal,
  StatusBadge,
  LoadingState,
  ErrorState,
  EmptyState,
  PageHeader,
} from "@/components/admin/primitives";
import { LEAD_STATUSES, LEAD_SOURCES, SERVICES, formatDate } from "@/lib/admin/constants";
import { createLead, getLeads } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/leads/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Leads — Fakhar Labs Admin" },
      { name: "description", content: "Manage inbound agency leads and their pipeline status." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadsPage,
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

function LeadsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [source, setSource] = useState("All");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useServerFn(getLeads);
  const createLeadFn = useServerFn(createLead);

  const leads = useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchLeads(),
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (leads.data ?? []).filter((lead) => {
      if (status !== "All" && lead.status !== status) return false;
      if (source !== "All" && lead.source !== source) return false;
      if (!term) return true;
      return [lead.name, lead.email, lead.business_name, lead.service]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(term));
    });
  }, [leads.data, search, status, source]);

  const createLeadMutation = useMutation({
    mutationFn: async (form: FormData) => {
      const parsed = leadSchema.safeParse(Object.fromEntries(form));
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      return createLeadFn({ data: parsed.data });
    },
    onSuccess: () => {
      setOpen(false);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <AdminLayout title="Leads">
      <PageHeader
        title="Leads"
        description="Every enquiry from the website and other channels."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add lead
          </Button>
        }
      />

      <Card className="mb-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <Input
              className="pl-9"
              placeholder="Search by name, email or business"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search leads"
            />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="All">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select value={source} onChange={(e) => setSource(e.target.value)} aria-label="Filter by source">
            <option value="All">All sources</option>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {leads.isLoading ? (
        <LoadingState />
      ) : leads.isError ? (
        <ErrorState message={(leads.error as Error).message} onRetry={() => leads.refetch()} />
      ) : !filtered.length ? (
        <EmptyState
          title={leads.data?.length ? "No leads match your filters" : "No leads yet"}
          description={
            leads.data?.length
              ? "Try changing the search term or filters."
              : "Submissions from the website contact form will land here."
          }
        />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-outline-variant/60 text-xs uppercase tracking-wide text-on-surface-variant">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Service</th>
                <th className="px-5 py-3 font-semibold">Source</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/60">
              {filtered.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface-container/60">
                  <td className="px-5 py-3">
                    <Link
                      to="/admin/leads/$leadId"
                      params={{ leadId: lead.id }}
                      className="font-medium text-on-background hover:text-primary"
                    >
                      {lead.name}
                    </Link>
                    <p className="text-xs text-on-surface-variant">{lead.business_name || lead.email}</p>
                  </td>
                  <td className="px-5 py-3 text-on-surface-variant">{lead.service || "—"}</td>
                  <td className="px-5 py-3 text-on-surface-variant">{lead.source}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-5 py-3 text-on-surface-variant">{formatDate(lead.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Modal open={open} onOpenChange={setOpen} title="Add lead" description="Log an enquiry from any channel.">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createLeadMutation.mutate(new FormData(e.currentTarget));
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <Input name="name" required maxLength={100} />
            </Field>
            <Field label="Email">
              <Input name="email" type="email" required maxLength={255} />
            </Field>
            <Field label="Phone">
              <Input name="phone" maxLength={40} />
            </Field>
            <Field label="Business">
              <Input name="business_name" maxLength={120} />
            </Field>
            <Field label="Service">
              <Select name="service" defaultValue="">
                <option value="">Not specified</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Budget">
              <Input name="budget" maxLength={60} placeholder="e.g. $5k–10k" />
            </Field>
            <Field label="Source">
              <Select name="source" defaultValue="Website">
                {LEAD_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Status">
              <Select name="status" defaultValue="New">
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Message">
            <Textarea name="message" rows={3} maxLength={2000} />
          </Field>
          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createLeadMutation.isPending}>
              {createLeadMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save lead
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
