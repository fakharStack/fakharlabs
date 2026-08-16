import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, Button, Input, Field, LoadingState, ErrorState, PageHeader } from "@/components/admin/primitives";
import { useAdminSession } from "@/hooks/useAdminSession";
import { getSettings, saveSettings } from "@/lib/admin/functions";

export const Route = createFileRoute("/admin/settings")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Settings — Fakhar Labs Admin" },
      { name: "description", content: "Agency contact details and notification preferences." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SettingsPage,
});

const optionalUrl = z.string().trim().max(255).url("Enter a valid URL").optional().or(z.literal(""));

const settingsSchema = z.object({
  agency_name: z.string().trim().min(1, "Agency name is required").max(120),
  agency_email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  agency_phone: z.string().trim().max(40).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  website_url: optionalUrl,
  instagram_url: optionalUrl,
  facebook_url: optionalUrl,
  linkedin_url: optionalUrl,
});

function SettingsPage() {
  const queryClient = useQueryClient();
  const { user } = useAdminSession();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useServerFn(getSettings);
  const saveSettingsFn = useServerFn(saveSettings);

  const settings = useQuery({
    queryKey: ["agency-settings"],
    queryFn: () => fetchSettings(),
  });

  const save = useMutation({
    mutationFn: async (form: FormData) => {
      const raw = Object.fromEntries(form);
      const parsed = settingsSchema.safeParse(raw);
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      return saveSettingsFn({
        data: {
          ...parsed.data,
          notify_new_leads: form.get("notify_new_leads") === "on",
          notify_projects: form.get("notify_projects") === "on",
        },
      });
    },
    onSuccess: (row) => {
      setError(null);
      setMessage("Settings saved successfully.");
      if (row) queryClient.setQueryData(["agency-settings"], row);
      queryClient.invalidateQueries({ queryKey: ["agency-settings"] });
    },
    onError: (err: Error) => {
      setMessage(null);
      setError(err.message || "We couldn't save your settings. Please try again.");
    },
  });

  const s = settings.data;
  // Remount the (uncontrolled) form whenever fresh server data arrives so inputs resync.
  const formKey = JSON.stringify(s ?? null);

  return (
    <AdminLayout title="Settings">
      <PageHeader title="Settings" description="Agency details used across the dashboard." />

      {settings.isLoading ? (
        <LoadingState />
      ) : settings.isError ? (
        <ErrorState message={(settings.error as Error).message} onRetry={() => settings.refetch()} />
      ) : (
        <form
          key={formKey}
          className="grid gap-6 lg:grid-cols-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (save.isPending) return;
            save.mutate(new FormData(e.currentTarget));
          }}
        >
          <Card className="lg:col-span-2">
            <h2 className="font-headline-md text-lg font-bold">Agency profile</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Agency name">
                <Input name="agency_name" defaultValue={s?.agency_name ?? "Fakhar Labs"} required maxLength={120} />
              </Field>
              <Field label="Email">
                <Input name="agency_email" type="email" defaultValue={s?.agency_email ?? ""} maxLength={255} />
              </Field>
              <Field label="Phone">
                <Input name="agency_phone" defaultValue={s?.agency_phone ?? ""} maxLength={40} />
              </Field>
              <Field label="WhatsApp">
                <Input name="whatsapp" defaultValue={s?.whatsapp ?? ""} maxLength={40} />
              </Field>
              <Field label="Website">
                <Input name="website_url" type="url" defaultValue={s?.website_url ?? ""} maxLength={255} />
              </Field>
              <Field label="Instagram">
                <Input name="instagram_url" type="url" defaultValue={s?.instagram_url ?? ""} maxLength={255} />
              </Field>
              <Field label="Facebook">
                <Input name="facebook_url" type="url" defaultValue={s?.facebook_url ?? ""} maxLength={255} />
              </Field>
              <Field label="LinkedIn">
                <Input name="linkedin_url" type="url" defaultValue={s?.linkedin_url ?? ""} maxLength={255} />
              </Field>
            </div>
          </Card>

          <div className="space-y-4">
            <Card>
              <h2 className="font-headline-md text-lg font-bold">Notifications</h2>
              <label className="mt-4 flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="notify_new_leads"
                  defaultChecked={s?.notify_new_leads ?? true}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                Alert me about new leads
              </label>
              <label className="mt-3 flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="notify_projects"
                  defaultChecked={s?.notify_projects ?? true}
                  className="h-4 w-4 accent-[var(--color-primary)]"
                />
                Alert me about project updates
              </label>
            </Card>

            <Card>
              <h2 className="font-headline-md text-lg font-bold">Account</h2>
              <p className="mt-2 break-words text-sm text-on-surface-variant">{user?.email}</p>
              <p className="mt-1 text-xs text-on-surface-variant">Signed in as an agency admin.</p>
            </Card>

            {message && <p className="text-sm text-primary">{message}</p>}
            {error && <p className="text-sm text-error">{error}</p>}
            <Button type="submit" className="w-full" disabled={save.isPending}>
              {save.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}
