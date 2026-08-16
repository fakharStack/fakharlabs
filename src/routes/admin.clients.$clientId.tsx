import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Loader2, Trash2, Plus } from "lucide-react";
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
  ConfirmDialog,
  EmptyState,
} from "@/components/admin/primitives";
import { CLIENT_STATUSES, PROJECT_STATUSES, PROJECT_TYPES, formatDate } from "@/lib/admin/constants";
import { createProject, deleteClient, getClient, getClientProjects, updateClient } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/clients/$clientId")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Client details — Fakhar Labs Admin" },
      { name: "description", content: "Review a client profile and their projects." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ClientDetailPage,
});

const projectSchema = z.object({
  name: z.string().trim().min(1, "Project name is required").max(120),
  type: z.string().max(40),
  status: z.string().max(40),
  deadline: z.string().max(20).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
});

function ClientDetailPage() {
  const { clientId } = useParams({ from: "/admin/clients/$clientId" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);

  const fetchClient = useServerFn(getClient);
  const fetchProjects = useServerFn(getClientProjects);
  const updateClientFn = useServerFn(updateClient);
  const deleteClientFn = useServerFn(deleteClient);
  const createProjectFn = useServerFn(createProject);

  const client = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => fetchClient({ data: { id: clientId } }),
  });

  const projects = useQuery({
    queryKey: ["client-projects", clientId],
    queryFn: () => fetchProjects({ data: { id: clientId } }),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["client", clientId] });
    queryClient.invalidateQueries({ queryKey: ["clients"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const update = useMutation({
    mutationFn: async (patch: { status?: string; notes?: string }) => {
      await updateClientFn({ data: { id: clientId, patch } });
    },
    onSuccess: invalidate,
    onError: (err: Error) => setActionError(err.message),
  });

  const remove = useMutation({
    mutationFn: () => deleteClientFn({ data: { id: clientId } }),
    onSuccess: () => {
      invalidate();
      navigate({ to: "/admin/clients", replace: true });
    },
    onError: (err: Error) => setActionError(err.message),
  });

  const createProjectMutation = useMutation({
    mutationFn: async (form: FormData) => {
      const parsed = projectSchema.safeParse(Object.fromEntries(form));
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      return createProjectFn({ data: { client_id: clientId, ...parsed.data } });
    },
    onSuccess: () => {
      setProjectOpen(false);
      setActionError(null);
      queryClient.invalidateQueries({ queryKey: ["client-projects", clientId] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err: Error) => setActionError(err.message),
  });

  return (
    <AdminLayout
      title={client.data?.name ?? "Client"}
      breadcrumb={
        <Link to="/admin/clients" className="inline-flex items-center gap-1 hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> Clients
        </Link>
      }
    >
      {client.isLoading ? (
        <LoadingState />
      ) : client.isError || !client.data ? (
        <ErrorState message={(client.error as Error | null)?.message ?? ""} onRetry={() => client.refetch()} />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-headline-md text-2xl font-bold tracking-tight">{client.data.name}</h1>
              <p className="mt-1 text-sm text-on-surface-variant">
                {client.data.business_name || "Individual"} · client since {formatDate(client.data.created_at)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setProjectOpen(true)}>
                <Plus className="h-4 w-4" /> New project
              </Button>
              <Button variant="danger" onClick={() => setConfirmDelete(true)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>

          {actionError && <p className="mb-4 text-sm text-error">{actionError}</p>}

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-headline-md text-lg font-bold">Projects</h2>
                <StatusBadge status={client.data.status} />
              </div>
              {projects.isLoading ? (
                <LoadingState />
              ) : projects.isError ? (
                <ErrorState onRetry={() => projects.refetch()} />
              ) : !projects.data?.length ? (
                <EmptyState title="No projects yet" description="Start a project for this client." />
              ) : (
                <div className="divide-y divide-outline-variant/60">
                  {projects.data.map((project) => (
                    <Link
                      key={project.id}
                      to="/admin/projects/$projectId"
                      params={{ projectId: project.id }}
                      className="flex items-center justify-between gap-3 py-3 hover:text-primary"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{project.name}</p>
                        <p className="text-xs text-on-surface-variant">
                          {project.type} · due {formatDate(project.deadline)}
                        </p>
                      </div>
                      <StatusBadge status={project.status} />
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            <div className="space-y-4">
              <Card>
                <h2 className="font-headline-md text-lg font-bold">Contact</h2>
                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-on-surface-variant">Email</dt>
                    <dd className="break-words">{client.data.email || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-on-surface-variant">Phone</dt>
                    <dd>{client.data.phone || "—"}</dd>
                  </div>
                </dl>
                <Field label="Status">
                  <Select
                    className="mt-3"
                    value={client.data.status}
                    onChange={(e) => update.mutate({ status: e.target.value })}
                    disabled={update.isPending}
                  >
                    {CLIENT_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </Field>
              </Card>

              <Card>
                <h2 className="font-headline-md text-lg font-bold">Notes</h2>
                <Textarea
                  className="mt-3"
                  rows={6}
                  maxLength={2000}
                  value={notes ?? client.data.notes ?? ""}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <Button
                  className="mt-3 w-full"
                  disabled={update.isPending || notes === null}
                  onClick={() => update.mutate({ notes: notes ?? "" })}
                >
                  {update.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save notes
                </Button>
              </Card>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this client?"
        description="Projects linked to this client will lose their client reference."
        onConfirm={() => remove.mutate()}
        pending={remove.isPending}
      />

      <Modal open={projectOpen} onOpenChange={setProjectOpen} title="New project">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createProjectMutation.mutate(new FormData(e.currentTarget));
          }}
        >
          <Field label="Project name">
            <Input name="name" required maxLength={120} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type">
              <Select name="type" defaultValue="Website">
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Status">
              <Select name="status" defaultValue="Planning">
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Deadline">
              <Input name="deadline" type="date" />
            </Field>
          </div>
          <Field label="Description">
            <Textarea name="description" rows={3} maxLength={2000} />
          </Field>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setProjectOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createProjectMutation.isPending}>
              {createProjectMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Create project
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
