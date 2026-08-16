import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-redesign";

export const Route = createFileRoute("/services/website-redesign")({
  head: () => ({
    meta: [
      { title: "Website Redesign — Fakhar Labs" },
      { name: "description", content: "Your business has evolved. Your website should too." },
      { property: "og:title", content: "Website Redesign — Fakhar Labs" },
      { property: "og:description", content: "Your business has evolved. Your website should too." },
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
