import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Loader2, Trash2, Plus, Check } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Card,
  Button,
  Input,
  Select,
  Field,
  Textarea,
  StatusBadge,
  LoadingState,
  ErrorState,
  ConfirmDialog,
  EmptyState,
} from "@/components/admin/primitives";
import { PROJECT_STATUSES, TASK_STATUSES, formatDate } from "@/lib/admin/constants";
import { addTask, deleteProject, deleteTask, getProject, getTasks, updateProject, updateTask } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/projects/$projectId")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Project details — Fakhar Labs Admin" },
      { name: "description", content: "Track tasks, status and deadlines for a single project." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectId } = useParams({ from: "/admin/projects/$projectId" });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [notes, setNotes] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchProject = useServerFn(getProject);
  const fetchTasks = useServerFn(getTasks);
  const updateProjectFn = useServerFn(updateProject);
  const deleteProjectFn = useServerFn(deleteProject);
  const addTaskFn = useServerFn(addTask);
  const updateTaskFn = useServerFn(updateTask);
  const deleteTaskFn = useServerFn(deleteTask);

  const project = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => fetchProject({ data: { id: projectId } }),
  });

  const tasks = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => fetchTasks({ data: { projectId } }),
  });

  const invalidateProject = () => {
    queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    queryClient.invalidateQueries({ queryKey: ["projects"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  const update = useMutation({
    mutationFn: async (patch: { status?: string; deadline?: string | null; live_url?: string | null; notes?: string }) => {
      await updateProjectFn({ data: { id: projectId, patch } });
    },
    onSuccess: invalidateProject,
    onError: (err: Error) => setActionError(err.message),
  });

  const remove = useMutation({
    mutationFn: () => deleteProjectFn({ data: { id: projectId } }),
    onSuccess: () => {
      invalidateProject();
      navigate({ to: "/admin/projects", replace: true });
    },
    onError: (err: Error) => setActionError(err.message),
  });

  const addTaskMutation = useMutation({
    mutationFn: async (title: string) => {
      await addTaskFn({ data: { projectId, title: title.trim().slice(0, 160) } });
    },
    onSuccess: () => {
      setTaskTitle("");
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
    onError: (err: Error) => setActionError(err.message),
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: { status: string } }) => {
      await updateTaskFn({ data: { id, patch } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks", projectId] }),
    onError: (err: Error) => setActionError(err.message),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteTaskFn({ data: { id } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks", projectId] }),
    onError: (err: Error) => setActionError(err.message),
  });

  const done = (tasks.data ?? []).filter((t) => t.status === "Completed").length;
  const total = tasks.data?.length ?? 0;
  const progress = total ? Math.round((done / total) * 100) : 0;

  return (
    <AdminLayout
      title={project.data?.name ?? "Project"}
      breadcrumb={
        <Link to="/admin/projects" className="inline-flex items-center gap-1 hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> Projects
        </Link>
      }
    >
      {project.isLoading ? (
        <LoadingState />
      ) : project.isError || !project.data ? (
        <ErrorState message={(project.error as Error | null)?.message ?? ""} onRetry={() => project.refetch()} />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-headline-md text-2xl font-bold tracking-tight">{project.data.name}</h1>
              <p className="mt-1 text-sm text-on-surface-variant">
                {project.data.client_id ? (
                  <Link to="/admin/clients/$clientId" params={{ clientId: project.data.client_id }} className="hover:text-primary">
                    {project.data.client_name ?? "Client"}
                  </Link>
                ) : (
                  "No client"
                )}{" "}
                · {project.data.type} · due {formatDate(project.data.deadline)}
              </p>
            </div>
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </div>

          {actionError && <p className="mb-4 text-sm text-error">{actionError}</p>}

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-lg font-bold">Tasks</h2>
                <span className="text-sm text-on-surface-variant">
                  {done}/{total} complete
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-container">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>

              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  addTaskMutation.mutate(taskTitle);
                }}
              >
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Add a task…"
                  maxLength={160}
                  aria-label="New task title"
                />
                <Button type="submit" disabled={addTaskMutation.isPending}>
                  {addTaskMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  Add
                </Button>
              </form>

              <div className="mt-4">
                {tasks.isLoading ? (
                  <LoadingState />
                ) : tasks.isError ? (
                  <ErrorState onRetry={() => tasks.refetch()} />
                ) : !tasks.data?.length ? (
                  <EmptyState title="No tasks yet" description="Break the project into deliverable steps." />
                ) : (
                  <ul className="divide-y divide-outline-variant/60">
                    {tasks.data.map((task) => (
                      <li key={task.id} className="flex items-center gap-3 py-3">
                        <button
                          type="button"
                          aria-label={task.status === "Completed" ? "Mark as todo" : "Mark as completed"}
                          onClick={() =>
                            updateTaskMutation.mutate({
                              id: task.id,
                              patch: { status: task.status === "Completed" ? "Todo" : "Completed" },
                            })
                          }
                          className={
                            "grid h-5 w-5 shrink-0 place-items-center rounded border " +
                            (task.status === "Completed"
                              ? "border-primary bg-primary text-on-primary"
                              : "border-outline-variant")
                          }
                        >
                          {task.status === "Completed" && <Check className="h-3 w-3" />}
                        </button>
                        <span
                          className={
                            "flex-1 text-sm " +
                            (task.status === "Completed" ? "text-on-surface-variant line-through" : "")
                          }
                        >
                          {task.title}
                        </span>
                        <Select
                          className="w-36"
                          value={task.status}
                          onChange={(e) => updateTaskMutation.mutate({ id: task.id, patch: { status: e.target.value } })}
                          aria-label={`Status for ${task.title}`}
                        >
                          {TASK_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </Select>
                        <button
                          type="button"
                          aria-label={`Delete ${task.title}`}
                          className="rounded p-1.5 text-on-surface-variant hover:bg-error-container hover:text-error"
                          onClick={() => deleteTaskMutation.mutate(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>

            <div className="space-y-4">
              <Card>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-headline-md text-lg font-bold">Status</h2>
                  <StatusBadge status={project.data.status} />
                </div>
                <Field label="Stage">
                  <Select
                    value={project.data.status}
                    onChange={(e) => update.mutate({ status: e.target.value })}
                    disabled={update.isPending}
                  >
                    {PROJECT_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Deadline">
                  <Input
                    className="mt-3"
                    type="date"
                    defaultValue={project.data.deadline ?? ""}
                    onChange={(e) => update.mutate({ deadline: e.target.value || null })}
                  />
                </Field>
                <Field label="Live URL">
                  <Input
                    className="mt-3"
                    type="url"
                    defaultValue={project.data.live_url ?? ""}
                    placeholder="https://"
                    onBlur={(e) => update.mutate({ live_url: e.target.value.trim() || null })}
                  />
                </Field>
              </Card>

              <Card>
                <h2 className="font-headline-md text-lg font-bold">Notes</h2>
                <Textarea
                  className="mt-3"
                  rows={6}
                  maxLength={2000}
                  value={notes ?? project.data.notes ?? ""}
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
        title="Delete this project?"
        description="All tasks belonging to this project will also be removed."
        onConfirm={() => remove.mutate()}
        pending={remove.isPending}
      />
    </AdminLayout>
  );
}
