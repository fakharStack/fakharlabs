import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-design";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/web-design")({
  head: () => ({
    meta: [
      { title: "Website Design for Small Business Pakistan — Fakhar Labs" },
      { name: "description", content: "Professional website design for small businesses in Pakistan. We create modern, mobile-first UI/UX designs that convert visitors into customers." },
      { property: "og:title", content: "Website Design for Small Business Pakistan — Fakhar Labs" },
      { property: "og:description", content: "Professional website design for small businesses in Pakistan. We create modern, mobile-first UI/UX designs that convert visitors into customers." },
    ],
  }),
  component: Page,
});

function Page() {
  const breadcrumbs = [
    { name: "Home", url: "https://fakharlabs.online/" },
    { name: "Services", url: "https://fakharlabs.online/services" },
    { name: "Website Design", url: "https://fakharlabs.online/services/web-design" },
  ];

  return (
    <SiteLayout>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema 
        name="Website Design"
        description="Professional website design for small businesses in Pakistan."
        url="https://fakharlabs.online/services/web-design"
      />
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden pt-28 md:pt-36">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-8 mb-8">
          <Reveal>
            <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Looking for <strong>website design for small business in Pakistan</strong>? Fakhar Labs designs beautiful, mobile-first, and conversion-optimized websites. We ensure your digital presence is modern, accessible, and aligned with your brand goals.
              </p>
            </div>
          </Reveal>
        </section>
        <ScreenContent html={html} />
      </main>
    </SiteLayout>
  );
}
