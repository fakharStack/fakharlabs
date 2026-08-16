import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Plus, Search, Loader2 } from "lucide-react";
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
import { PROJECT_STATUSES, PROJECT_TYPES, formatDate } from "@/lib/admin/constants";
import { createProject, getProjects, getClientOptions } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/projects/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Projects — Fakhar Labs Admin" },
      { name: "description", content: "Track delivery status across all agency projects." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ProjectsPage,
});

const projectSchema = z.object({
  name: z.string().trim().min(1, "Project name is required").max(120),
  client_id: z.string().max(60).optional().or(z.literal("")),
  type: z.string().max(40),
  status: z.string().max(40),
  deadline: z.string().max(20).optional().or(z.literal("")),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
});

function ProjectsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useServerFn(getProjects);
  const fetchClients = useServerFn(getClientOptions);
  const createProjectFn = useServerFn(createProject);

  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  const clients = useQuery({
    queryKey: ["clients", "options"],
    queryFn: () => fetchClients(),
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (projects.data ?? []).filter((p) => {
      if (status !== "All" && p.status !== status) return false;
      if (!term) return true;
      return [p.name, p.client_name, p.type].filter(Boolean).some((v) => String(v).toLowerCase().includes(term));
    });
  }, [projects.data, search, status]);

  const createMutation = useMutation({
    mutationFn: async (form: FormData) => {
      const parsed = projectSchema.safeParse(Object.fromEntries(form));
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      return createProjectFn({ data: parsed.data });
    },
    onSuccess: () => {
      setOpen(false);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <AdminLayout title="Projects">
      <PageHeader
        title="Projects"
        description="Delivery pipeline across every client engagement."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> New project
          </Button>
        }
      />

      <Card className="mb-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <Input
              className="pl-9"
              placeholder="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search projects"
            />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="All">All statuses</option>
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {projects.isLoading ? (
        <LoadingState />
      ) : projects.isError ? (
        <ErrorState message={(projects.error as Error).message} onRetry={() => projects.refetch()} />
      ) : !filtered.length ? (
        <EmptyState
          title={projects.data?.length ? "No projects match your filters" : "No projects yet"}
          description="Create a project to start tracking delivery."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link key={project.id} to="/admin/projects/$projectId" params={{ projectId: project.id }}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{project.name}</p>
                    <p className="truncate text-xs text-on-surface-variant">{project.client_name ?? "No client"}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-4 text-sm text-on-surface-variant">{project.type}</p>
                <p className="text-xs text-on-surface-variant">Due {formatDate(project.deadline)}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Modal open={open} onOpenChange={setOpen} title="New project">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutate(new FormData(e.currentTarget));
          }}
        >
          <Field label="Project name">
            <Input name="name" required maxLength={120} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Client">
              <Select name="client_id" defaultValue="">
                <option value="">No client</option>
                {(clients.data ?? []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
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
          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Create project
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
