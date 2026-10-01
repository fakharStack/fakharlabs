import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-development";

export const Route = createFileRoute("/services/web-development")({
  head: () => ({
    meta: [
      { title: "Web Development — Fakhar Labs" },
      { name: "description", content: "Fast, modern websites built for the real world." },
      { property: "og:title", content: "Web Development — Fakhar Labs" },
      { property: "og:description", content: "Fast, modern websites built for the real world." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <ScreenContent html={html} />
    </SiteLayout>
  );
}
