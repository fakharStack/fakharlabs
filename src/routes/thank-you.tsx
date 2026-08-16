import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/thanks";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank You — Fakhar Labs" },
      { name: "description", content: "Thanks for reaching out. We'll be in touch shortly." },
      { property: "og:title", content: "Thank You — Fakhar Labs" },
      { property: "og:description", content: "Thanks for reaching out. We'll be in touch shortly." },
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
