import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Users, Briefcase, FolderKanban, TrendingUp } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, LoadingState, ErrorState, StatusBadge, EmptyState } from "@/components/admin/primitives";
import { formatDateTime, greeting } from "@/lib/admin/constants";
import { useAdminSession } from "@/hooks/useAdminSession";
import { getDashboardStats, getRecentActivity, getRecentLeads } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard — Fakhar Labs Admin" },
      { name: "description", content: "Overview of leads, clients and active projects." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { name } = useAdminSession();
  const fetchStats = useServerFn(getDashboardStats);
  const fetchRecentLeads = useServerFn(getRecentLeads);
  const fetchActivity = useServerFn(getRecentActivity);

  const stats = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: () => fetchStats(),
  });

  const recentLeads = useQuery({
    queryKey: ["dashboard", "recent-leads"],
    queryFn: () => fetchRecentLeads(),
  });

  const activity = useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: () => fetchActivity(),
  });

  const cards = [
    { label: "Total leads", value: stats.data?.totalLeads, icon: Users, to: "/admin/leads" as const },
    { label: "New leads", value: stats.data?.newLeads, icon: Users, to: "/admin/leads" as const },
    { label: "Active clients", value: stats.data?.activeClients, icon: Briefcase, to: "/admin/clients" as const },
    { label: "Active projects", value: stats.data?.activeProjects, icon: FolderKanban, to: "/admin/projects" as const },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-6">
        <h1 className="font-headline-md text-2xl font-bold tracking-tight">
          {greeting()}, {name}
        </h1>
        <p className="mt-1 text-sm text-on-surface-variant">Here is what is happening at the agency today.</p>
      </div>

      {stats.isLoading ? (
        <LoadingState />
      ) : stats.isError ? (
        <ErrorState message={(stats.error as Error).message} onRetry={() => stats.refetch()} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <Link key={c.label} to={c.to}>
                <Card className="transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-on-surface-variant">{c.label}</p>
                    <c.icon className="h-4 w-4 text-primary" />
                  </div>
                  <p className="mt-3 font-headline-md text-3xl font-bold">{c.value ?? 0}</p>
                </Card>
              </Link>
            ))}
          </div>
          <Card className="mt-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-on-surface-variant">Lead conversion rate</p>
                <p className="font-headline-md text-2xl font-bold">{stats.data?.conversion}%</p>
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-container">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${stats.data?.conversion ?? 0}%` }}
              />
            </div>
          </Card>
        </>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-headline-md text-lg font-bold">Recent leads</h2>
            <Link to="/admin/leads" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {recentLeads.isLoading ? (
            <LoadingState />
          ) : recentLeads.isError ? (
            <ErrorState onRetry={() => recentLeads.refetch()} />
          ) : !recentLeads.data?.length ? (
            <EmptyState title="No leads yet" description="New contact form submissions will appear here." />
          ) : (
            <Card className="divide-y divide-outline-variant/60 p-0">
              {recentLeads.data.map((lead) => (
                <Link
                  key={lead.id}
                  to="/admin/leads/$leadId"
                  params={{ leadId: lead.id }}
                  className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-surface-container/60"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{lead.name}</p>
                    <p className="truncate text-xs text-on-surface-variant">
                      {lead.business_name || lead.service || "—"} · {formatDateTime(lead.created_at)}
                    </p>
                  </div>
                  <StatusBadge status={lead.status} />
                </Link>
              ))}
            </Card>
          )}
        </section>

        <section>
          <h2 className="mb-3 font-headline-md text-lg font-bold">Recent activity</h2>
          {activity.isLoading ? (
            <LoadingState />
          ) : activity.isError ? (
            <ErrorState onRetry={() => activity.refetch()} />
          ) : !activity.data?.length ? (
            <EmptyState title="No activity yet" />
          ) : (
            <Card className="space-y-3">
              {activity.data.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0">
                    <p className="text-sm">{item.description ?? item.action}</p>
                    <p className="text-xs text-on-surface-variant">{formatDateTime(item.created_at)}</p>
                  </div>
                </div>
              ))}
            </Card>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
