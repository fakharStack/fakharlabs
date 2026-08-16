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
import { CLIENT_STATUSES, formatDate } from "@/lib/admin/constants";
import { createClient, getClients } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/clients/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Clients — Fakhar Labs Admin" },
      { name: "description", content: "Manage the agency client roster and their details." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ClientsPage,
});

const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  business_name: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  status: z.string().max(20),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

function ClientsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useServerFn(getClients);
  const createClientFn = useServerFn(createClient);

  const clients = useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (clients.data ?? []).filter((c) => {
      if (status !== "All" && c.status !== status) return false;
      if (!term) return true;
      return [c.name, c.business_name, c.email].filter(Boolean).some((v) => String(v).toLowerCase().includes(term));
    });
  }, [clients.data, search, status]);

  const createClientMutation = useMutation({
    mutationFn: async (form: FormData) => {
      const parsed = clientSchema.safeParse(Object.fromEntries(form));
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      return createClientFn({ data: parsed.data });
    },
    onSuccess: () => {
      setOpen(false);
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (err: Error) => setError(err.message),
  });

  return (
    <AdminLayout title="Clients">
      <PageHeader
        title="Clients"
        description="Everyone the agency is currently working with."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add client
          </Button>
        }
      />

      <Card className="mb-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <Input
              className="pl-9"
              placeholder="Search clients"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search clients"
            />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="All">All statuses</option>
            {CLIENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {clients.isLoading ? (
        <LoadingState />
      ) : clients.isError ? (
        <ErrorState message={(clients.error as Error).message} onRetry={() => clients.refetch()} />
      ) : !filtered.length ? (
        <EmptyState
          title={clients.data?.length ? "No clients match your filters" : "No clients yet"}
          description="Convert a won lead or add a client manually."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((client) => (
            <Link key={client.id} to="/admin/clients/$clientId" params={{ clientId: client.id }}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{client.name}</p>
                    <p className="truncate text-xs text-on-surface-variant">{client.business_name || "—"}</p>
                  </div>
                  <StatusBadge status={client.status} />
                </div>
                <p className="mt-4 truncate text-sm text-on-surface-variant">{client.email || "No email"}</p>
                <p className="text-xs text-on-surface-variant">Since {formatDate(client.created_at)}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Modal open={open} onOpenChange={setOpen} title="Add client">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createClientMutation.mutate(new FormData(e.currentTarget));
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <Input name="name" required maxLength={100} />
            </Field>
            <Field label="Business">
              <Input name="business_name" maxLength={120} />
            </Field>
            <Field label="Email">
              <Input name="email" type="email" maxLength={255} />
            </Field>
            <Field label="Phone">
              <Input name="phone" maxLength={40} />
            </Field>
            <Field label="Status">
              <Select name="status" defaultValue="Active">
                {CLIENT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <Field label="Notes">
            <Textarea name="notes" rows={3} maxLength={2000} />
          </Field>
          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createClientMutation.isPending}>
              {createClientMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Save client
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
