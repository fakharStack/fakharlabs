import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-development";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/web-development")({
  head: () => ({
    meta: [
      { title: "Custom Website Development Pakistan — Fakhar Labs" },
      { name: "description", content: "Expert Next.js and React developers in Pakistan. We build fast, custom website development solutions for growing businesses." },
      { property: "og:title", content: "Custom Website Development Pakistan — Fakhar Labs" },
      { property: "og:description", content: "Expert Next.js and React developers in Pakistan. We build fast, custom website development solutions for growing businesses." },
    ],
  }),
  component: Page,
});

function Page() {
  const breadcrumbs = [
    { name: "Home", url: "https://fakharlabs.online/" },
    { name: "Services", url: "https://fakharlabs.online/services" },
    { name: "Web Development", url: "https://fakharlabs.online/services/web-development" },
  ];

  return (
    <SiteLayout>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema 
        name="Custom Website Development"
        description="Expert Next.js and React developers in Pakistan building fast, custom web solutions."
        url="https://fakharlabs.online/services/web-development"
      />
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden pt-28 md:pt-36">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-8 mb-8">
          <Reveal>
            <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Fakhar Labs offers <strong>custom website development in Pakistan</strong>. Our Next.js and React developers build high-performance, mobile-first websites and web applications tailored to your business needs, delivered fast and optimized for SEO.
              </p>
            </div>
          </Reveal>
        </section>
        <ScreenContent html={html} />
      </main>
    </SiteLayout>
  );
}
