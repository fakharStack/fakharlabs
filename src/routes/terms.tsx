import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Fakhar Labs" },
      {
        name: "description",
        content:
          "The terms that apply to using the Fakhar Labs website, including content ownership, quotes and project agreements.",
      },
      { property: "og:title", content: "Terms of Use — Fakhar Labs" },
      { property: "og:description", content: "Terms that apply to using this website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

const sections = [
  {
    h: "Using this website",
    p: "You are welcome to browse and share this site. Content, code and imagery published here remain the property of Fakhar Labs unless stated otherwise.",
  },
  {
    h: "Project imagery",
    p: "Project visuals shown in our work and case studies are design mockups produced by the studio to present layout and direction. They are presentation material and are not represented as live client screenshots or verified performance data.",
  },
  {
    h: "Pricing and quotes",
    p: "Prices shown are indicative starting points in PKR. The price for your project is confirmed in a written quote once scope is agreed, and that quote takes precedence over anything published here.",
  },
  {
    h: "Enquiries",
    p: "Submitting an enquiry does not create a contract. Work begins only once a written proposal is accepted by both parties.",
  },
  {
    h: "Project agreements",
    p: "Deliverables, timelines, revisions, payment schedule and ownership are set out in the project agreement. On final payment, ownership of the delivered code and content transfers to you.",
  },
  {
    h: "Liability",
    p: "We take care to keep information on this site accurate, but it is provided as-is. We are not liable for decisions made solely on the basis of published marketing content.",
  },
];

function Page() {
  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <section className="mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8 md:pt-36">
          <p className="font-label-caps text-label-caps uppercase text-primary">Legal</p>
          <h1 className="mt-3 font-display-xl-mobile text-3xl leading-tight text-on-background sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-4 font-body-md text-sm text-on-surface-variant">
            The basics of what applies when you use this website or work with us.
          </p>
          <div className="mt-10 flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-headline-md text-lg font-bold text-on-background sm:text-xl">{s.h}</h2>
                <p className="mt-3 font-body-md text-sm text-on-surface-variant sm:text-base">{s.p}</p>
              </section>
            ))}
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
