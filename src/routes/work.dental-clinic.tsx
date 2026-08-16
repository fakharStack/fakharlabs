import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/case-dental";

export const Route = createFileRoute("/work/dental-clinic")({
  head: () => ({
    meta: [
      { title: "Dental Clinic Case Study — Fakhar Labs" },
      { name: "description", content: "How we built a modern digital experience for a dental clinic." },
      { property: "og:title", content: "Dental Clinic Case Study — Fakhar Labs" },
      { property: "og:description", content: "How we built a modern digital experience for a dental clinic." },
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
