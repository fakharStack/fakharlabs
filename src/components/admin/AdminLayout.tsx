import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FolderKanban,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useAdminSession } from "@/hooks/useAdminSession";
import { ensureAdmin, getUnreadCount } from "@/lib/admin/functions";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/clients", label: "Clients", icon: Briefcase },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function AdminLayout({ title, breadcrumb, children }: { title: string; breadcrumb?: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { name, user, loading: sessionLoading, signOut } = useAdminSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const checkAdmin = useServerFn(ensureAdmin);
  const fetchUnread = useServerFn(getUnreadCount);

  const {
    data: isAdmin,
    isLoading: roleLoading,
    isError: roleError,
  } = useQuery({
    queryKey: ["ensure-admin"],
    queryFn: () => checkAdmin(),
    enabled: !!user,
    retry: false,
  });

  const { data: unread = 0 } = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => fetchUnread(),
    enabled: !!user,
  });

  useEffect(() => {
    if (!sessionLoading && !user) {
      navigate({ to: "/admin/login", replace: true });
    }
  }, [sessionLoading, user, navigate]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-on-background text-inverse-on-surface">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-black text-white">
          A
        </span>
        <div>
          <p className="font-headline-md text-sm font-bold">Fakhar Labs</p>
          <p className="text-xs text-inverse-on-surface/60">Admin</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const pathname = typeof window !== "undefined" ? window.location.pathname : "";
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary text-on-primary"
                  : "text-inverse-on-surface/70 hover:bg-white/5 hover:text-inverse-on-surface",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.label === "Notifications" && unread > 0 && (
                <span className="rounded-full bg-error px-2 py-0.5 text-[11px] font-semibold text-on-error">
                  {unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link
          to="/"
          className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-inverse-on-surface/60 hover:bg-white/5"
        >
          <ExternalLink className="h-3.5 w-3.5" /> View public website
        </Link>
        <div className="rounded-lg bg-white/5 px-3 py-2.5">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-xs text-inverse-on-surface/60">{user?.email}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-inverse-on-surface/70 transition-colors hover:bg-white/5 hover:text-inverse-on-surface"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );

  if (sessionLoading || !user || (roleLoading && !isAdmin)) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface-container-low text-sm text-on-surface-variant">
        Checking your access…
      </div>
    );
  }

  if (roleError || !isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface-container-low px-4 text-center">
        <div className="max-w-sm">
          <h1 className="font-headline-md text-xl font-bold">Access restricted</h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            This account does not have admin permissions for the agency dashboard.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-surface-container-low text-on-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">{sidebar}</aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-on-background/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">{sidebar}</div>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-outline-variant/60 bg-surface-container-lowest/90 px-4 py-3 backdrop-blur md:px-6">
          <button
            type="button"
            aria-label="Toggle navigation"
            className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="min-w-0">
            {breadcrumb && <div className="text-xs text-on-surface-variant">{breadcrumb}</div>}
            <p className="truncate font-headline-md text-sm font-semibold">{title}</p>
          </div>
          <Link
            to="/admin/notifications"
            className="relative ml-auto rounded-lg p-2 text-on-surface-variant hover:bg-surface-container"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-error px-1 text-[10px] font-semibold text-on-error">
                {unread}
              </span>
            )}
          </Link>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">{children}</main>
      </div>
    </div>
  );
}
