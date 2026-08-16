import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-seo";

export const Route = createFileRoute("/services/seo-performance")({
  head: () => ({
    meta: [
      { title: "SEO & Performance — Fakhar Labs" },
      { name: "description", content: "Better performance, better experience, better rankings." },
      { property: "og:title", content: "SEO & Performance — Fakhar Labs" },
      { property: "og:description", content: "Better performance, better experience, better rankings." },
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
