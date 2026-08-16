import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Fakhar Labs" },
      {
        name: "description",
        content:
          "How Fakhar Labs collects, uses and stores the information you submit through this website.",
      },
      { property: "og:title", content: "Privacy Policy — Fakhar Labs" },
      { property: "og:description", content: "How we handle information submitted through this website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

const sections = [
  {
    h: "What we collect",
    p: "When you submit the contact form we collect the details you provide: your name, email address, optional phone number, business name, budget indication and your message. We do not ask for payment details through this website.",
  },
  {
    h: "Why we collect it",
    p: "We use this information solely to respond to your enquiry, prepare a proposal and, if you become a client, deliver the project. We do not sell or rent enquiry data to anyone.",
  },
  {
    h: "Where it is stored",
    p: "Enquiries are stored in our managed database and are accessible only to authenticated members of our team through an access-controlled admin area.",
  },
  {
    h: "How long we keep it",
    p: "Enquiry records are retained while a conversation or project is active and for a reasonable period afterwards for accounting and reference. You can ask us to delete your record at any time.",
  },
  {
    h: "Your choices",
    p: "You can request a copy of the information we hold about you, ask for corrections, or ask us to erase it. Email us and we will action the request.",
  },
  {
    h: "Cookies and analytics",
    p: "This website does not use advertising cookies. Any analytics we run is limited to aggregate page performance and does not build advertising profiles.",
  },
];

function Page() {
  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <section className="mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8 md:pt-36">
          <p className="font-label-caps text-label-caps uppercase text-primary">Legal</p>
          <h1 className="mt-3 font-display-xl-mobile text-3xl leading-tight text-on-background sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 font-body-md text-sm text-on-surface-variant">
            This policy explains what happens to the information you send us through this website.
          </p>
          <div className="mt-10 flex flex-col gap-8">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="font-headline-md text-lg font-bold text-on-background sm:text-xl">{s.h}</h2>
                <p className="mt-3 font-body-md text-sm text-on-surface-variant sm:text-base">{s.p}</p>
              </section>
            ))}
            <section>
              <h2 className="font-headline-md text-lg font-bold text-on-background sm:text-xl">Contact</h2>
              <p className="mt-3 font-body-md text-sm text-on-surface-variant sm:text-base">
                Questions about this policy? Email{" "}
                <a className="text-primary underline" href="mailto:hello@fakharlabs.com">
                  hello@fakharlabs.com
                </a>
                .
              </p>
            </section>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
