import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCheck } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Card,
  Button,
  LoadingState,
  ErrorState,
  EmptyState,
  PageHeader,
} from "@/components/admin/primitives";
import { formatDateTime } from "@/lib/admin/constants";
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/notifications")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Notifications — Fakhar Labs Admin" },
      { name: "description", content: "New leads and project updates from across the agency." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const queryClient = useQueryClient();
  const fetchNotifications = useServerFn(getNotifications);
  const markReadFn = useServerFn(markNotificationRead);
  const markAllFn = useServerFn(markAllNotificationsRead);

  const notifications = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["notifications", "unread-count"] });
  };

  const markRead = useMutation({
    mutationFn: (id: string) => markReadFn({ data: { id } }),
    onSuccess: invalidate,
  });

  const markAll = useMutation({
    mutationFn: () => markAllFn(),
    onSuccess: invalidate,
  });

  const unread = (notifications.data ?? []).filter((n) => !n.read).length;

  return (
    <AdminLayout title="Notifications">
      <PageHeader
        title="Notifications"
        description="Alerts for new enquiries and project changes."
        actions={
          unread > 0 ? (
            <Button variant="secondary" onClick={() => markAll.mutate()} disabled={markAll.isPending}>
              <CheckCheck className="h-4 w-4" /> Mark all read
            </Button>
          ) : undefined
        }
      />

      {notifications.isLoading ? (
        <LoadingState />
      ) : notifications.isError ? (
        <ErrorState message={(notifications.error as Error).message} onRetry={() => notifications.refetch()} />
      ) : !notifications.data?.length ? (
        <EmptyState title="Nothing to see yet" description="You will be notified when a new lead arrives." />
      ) : (
        <Card className="divide-y divide-outline-variant/60 p-0">
          {notifications.data.map((item) => (
            <div
              key={item.id}
              className={"flex items-start gap-3 px-5 py-4 " + (item.read ? "" : "bg-primary/5")}
            >
              <span
                className={
                  "mt-1.5 h-2 w-2 shrink-0 rounded-full " + (item.read ? "bg-outline-variant" : "bg-primary")
                }
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                {item.message && <p className="text-sm text-on-surface-variant">{item.message}</p>}
                <p className="mt-1 text-xs text-on-surface-variant">{formatDateTime(item.created_at)}</p>
              </div>
              {!item.read && (
                <Button size="sm" variant="ghost" onClick={() => markRead.mutate(item.id)}>
                  Mark read
                </Button>
              )}
            </div>
          ))}
        </Card>
      )}
    </AdminLayout>
  );
}
