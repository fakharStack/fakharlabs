import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-landing";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/landing-pages")({
  head: () => ({
    meta: [
      { title: "Landing Page Design Services — Fakhar Labs" },
      { name: "description", content: "High-converting landing page design services. We build fast, focused single-page websites tailored for your ad campaigns and product launches." },
      { property: "og:title", content: "Landing Page Design Services — Fakhar Labs" },
      { property: "og:description", content: "High-converting landing page design services. We build fast, focused single-page websites tailored for your ad campaigns and product launches." },
    ],
  }),
  component: Page,
});

function Page() {
  const breadcrumbs = [
    { name: "Home", url: "https://fakharlabs.online/" },
    { name: "Services", url: "https://fakharlabs.online/services" },
    { name: "Landing Pages", url: "https://fakharlabs.online/services/landing-pages" },
  ];

  return (
    <SiteLayout>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema 
        name="Landing Page Design"
        description="High-converting landing page design services for ad campaigns and product launches."
        url="https://fakharlabs.online/services/landing-pages"
      />
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden pt-28 md:pt-36">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-8 mb-8">
          <Reveal>
            <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Fakhar Labs offers <strong>landing page design services</strong> that focus entirely on conversion. Whether for an ad campaign, product launch, or lead generation, we deliver fast, single-page websites engineered to turn visitors into action.
              </p>
            </div>
          </Reveal>
        </section>
        <ScreenContent html={html} />
      </main>
    </SiteLayout>
  );
}
