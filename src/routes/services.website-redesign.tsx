import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, ScreenContent } from "@/components/SiteLayout";
import { html } from "@/content/svc-redesign";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/JsonLd";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/website-redesign")({
  head: () => ({
    meta: [
      { title: "Website Redesign Services Pakistan — Fakhar Labs" },
      { name: "description", content: "Professional website redesign services in Pakistan. We upgrade outdated sites into fast, modern, mobile-first experiences built on React." },
      { property: "og:title", content: "Website Redesign Services Pakistan — Fakhar Labs" },
      { property: "og:description", content: "Professional website redesign services in Pakistan. We upgrade outdated sites into fast, modern, mobile-first experiences built on React." },
    ],
  }),
  component: Page,
});

function Page() {
  const breadcrumbs = [
    { name: "Home", url: "https://fakharlabs.online/" },
    { name: "Services", url: "https://fakharlabs.online/services" },
    { name: "Website Redesign", url: "https://fakharlabs.online/services/website-redesign" },
  ];

  return (
    <SiteLayout>
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema 
        name="Website Redesign"
        description="Professional website redesign services in Pakistan to upgrade outdated sites into modern experiences."
        url="https://fakharlabs.online/services/website-redesign"
      />
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden pt-28 md:pt-36">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-8 mb-8">
          <Reveal>
            <div className="rounded-2xl bg-primary/5 p-4 border border-primary/10">
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Do you need <strong>website redesign services in Pakistan</strong>? Fakhar Labs helps businesses modernize their digital presence by rebuilding slow, outdated websites into fast, mobile-first, and highly optimized platforms using modern technology like React and Next.js.
              </p>
            </div>
          </Reveal>
        </section>
        <ScreenContent html={html} />
      </main>
    </SiteLayout>
  );
}
