import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Loader2, Trash2, UserPlus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Card,
  Button,
  Select,
  Field,
  Textarea,
  StatusBadge,
  LoadingState,
  ErrorState,
  ConfirmDialog,
  Modal,
  Input,
} from "@/components/admin/primitives";
import { LEAD_STATUSES, formatDateTime } from "@/lib/admin/constants";
import { convertLeadToClient, deleteLead, getLead, updateLead } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/leads/$leadId")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Lead details — Fakhar Labs Admin" },
      { name: "description", content: "Review and update an individual agency lead." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadDetailPage,
});

function LeadDetailPage() {
  const { leadId } = useParams({ from: "/admin/leads/$leadId" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [notes, setNotes] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchLead = useServerFn(getLead);
  const updateLeadFn = useServerFn(updateLead);
  const deleteLeadFn = useServerFn(deleteLead);
  const convertLeadFn = useServerFn(convertLeadToClient);

  const lead = useQuery({
    queryKey: ["lead", leadId],
    queryFn: () => fetchLead({ data: { id: leadId } }),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
    queryClient.invalidateQueries({ queryKey: ["leads"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const updateLeadMutation = useMutation({
    mutationFn: async (patch: { status?: string; notes?: string }) => {
      await updateLeadFn({ data: { id: leadId, patch } });
    },
    onSuccess: invalidate,
    onError: (err: Error) => setActionError(err.message),
  });

  const deleteLeadMutation = useMutation({
    mutationFn: () => deleteLeadFn({ data: { id: leadId } }),
    onSuccess: () => {
      invalidate();
      navigate({ to: "/admin/leads", replace: true });
    },
    onError: (err: Error) => setActionError(err.message),
  });

  const convertMutation = useMutation({
    mutationFn: async (form: FormData) => {
      const name = String(form.get("name") ?? "").trim().slice(0, 100);
      if (!name) throw new Error("Client name is required");
      return convertLeadFn({
        data: {
          leadId,
          name,
          business_name: String(form.get("business_name") ?? "").trim().slice(0, 120),
        },
      });
    },
    onSuccess: (client) => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      navigate({ to: "/admin/clients/$clientId", params: { clientId: client.id } });
    },
    onError: (err: Error) => setActionError(err.message),
  });

  return (
    <AdminLayout
      title={lead.data?.name ?? "Lead"}
      breadcrumb={
        <Link to="/admin/leads" className="inline-flex items-center gap-1 hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> Leads
        </Link>
      }
    >
      {lead.isLoading ? (
        <LoadingState />
      ) : lead.isError || !lead.data ? (
        <ErrorState message={(lead.error as Error | null)?.message ?? ""} onRetry={() => lead.refetch()} />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-headline-md text-2xl font-bold tracking-tight">{lead.data.name}</h1>
              <p className="mt-1 text-sm text-on-surface-variant">
                {lead.data.business_name || "Individual"} · received {formatDateTime(lead.data.created_at)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setConvertOpen(true)}>
                <UserPlus className="h-4 w-4" /> Convert to client
              </Button>
              <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>

          {actionError && <p className="mb-4 text-sm text-error">{actionError}</p>}

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <h2 className="font-headline-md text-lg font-bold">Enquiry</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  ["Email", lead.data.email],
                  ["Phone", lead.data.phone || "—"],
                  ["Service", lead.data.service || "—"],
                  ["Budget", lead.data.budget || "—"],
                  ["Source", lead.data.source],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                      {label}
                    </dt>
                    <dd className="mt-1 break-words text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
              {lead.data.message && (
                <div className="mt-5 rounded-lg bg-surface-container p-4 text-sm whitespace-pre-wrap">
                  {lead.data.message}
                </div>
              )}
            </Card>

            <div className="space-y-4">
              <Card>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-headline-md text-lg font-bold">Status</h2>
                  <StatusBadge status={lead.data.status} />
                </div>
                <Field label="Pipeline stage">
                  <Select
                    value={lead.data.status}
                    onChange={(e) => updateLeadMutation.mutate({ status: e.target.value })}
                    disabled={updateLeadMutation.isPending}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </Field>
              </Card>

              <Card>
                <h2 className="font-headline-md text-lg font-bold">Internal notes</h2>
                <Textarea
                  className="mt-3"
                  rows={6}
                  maxLength={2000}
                  value={notes ?? lead.data.notes ?? ""}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add context for the team…"
                />
                <Button
                  className="mt-3 w-full"
                  disabled={updateLeadMutation.isPending || notes === null}
                  onClick={() => updateLeadMutation.mutate({ notes: notes ?? "" })}
                >
                  {updateLeadMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save notes
                </Button>
              </Card>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this lead?"
        description="This permanently removes the enquiry and cannot be undone."
        onConfirm={() => deleteLeadMutation.mutate()}
        pending={deleteLeadMutation.isPending}
      />

      <Modal
        open={convertOpen}
        onOpenChange={setConvertOpen}
        title="Convert to client"
        description="Create a client record from this lead and mark it as won."
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            convertMutation.mutate(new FormData(e.currentTarget));
          }}
        >
          <Field label="Client name">
            <Input name="name" defaultValue={lead.data?.name ?? ""} required maxLength={100} />
          </Field>
          <Field label="Business name">
            <Input name="business_name" defaultValue={lead.data?.business_name ?? ""} maxLength={120} />
          </Field>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setConvertOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={convertMutation.isPending}>
              {convertMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Create client
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
