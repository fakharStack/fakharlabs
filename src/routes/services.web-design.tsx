import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-design";

export const Route = createFileRoute("/services/web-design")({
  head: () => ({
    meta: [
      { title: "Web Design — Fakhar Labs" },
      { name: "description", content: "Websites designed to make your business stand out." },
      { property: "og:title", content: "Web Design — Fakhar Labs" },
      { property: "og:description", content: "Websites designed to make your business stand out." },
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
