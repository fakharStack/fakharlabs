import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-landing";

export const Route = createFileRoute("/services/landing-pages")({
  head: () => ({
    meta: [
      { title: "Landing Pages — Fakhar Labs" },
      { name: "description", content: "Landing pages built to convert." },
      { property: "og:title", content: "Landing Pages — Fakhar Labs" },
      { property: "og:description", content: "Landing pages built to convert." },
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
