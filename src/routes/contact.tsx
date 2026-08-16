import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { WhatsAppLinkButton } from "@/components/site/WhatsAppButton";
import {
  currencyMeta,
  isCurrencyCode,
  isPlanId,
  isServiceId,
  type CurrencyCode,
  type PlanId,
  type ServiceId,
} from "@/data/pricing";
import { storeCurrency, useStoredCurrency } from "@/hooks/useCurrencyPreference";

export const Route = createFileRoute("/contact")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { service?: ServiceId; plan?: PlanId; currency?: CurrencyCode } => ({
    ...(isServiceId(search["service"]) ? { service: search["service"] } : {}),
    ...(isPlanId(search["plan"]) ? { plan: search["plan"] } : {}),
    ...(isCurrencyCode(search["currency"]) ? { currency: search["currency"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Contact — Fakhar Labs" },
      {
        name: "description",
        content:
          "Tell us about your project and we'll reply within 24 hours with a written quote. Message us by form or WhatsApp.",
      },
      { property: "og:title", content: "Contact — Fakhar Labs" },
      {
        property: "og:description",
        content: "Share your project scope and get a written quote within 24 hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const search = Route.useSearch();
  const stored = useStoredCurrency();
  const currency = search.currency ?? stored ?? "PKR";

  useEffect(() => {
    if (search.currency) storeCurrency(search.currency);
  }, [search.currency]);

  return (
    <SiteLayout>
      <main className="page-enter w-full max-w-full flex-grow overflow-x-hidden">
        <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28 sm:px-8 md:pt-36">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-gutter">
            <div className="min-w-0 lg:col-span-5">
              <Reveal>
                <p className="font-label-caps text-label-caps uppercase text-primary">
                  Let's work together
                </p>
                <h1 className="mt-3 font-headline-lg text-3xl leading-tight text-on-background sm:text-4xl md:text-5xl">
                  Have a project in mind?
                </h1>
                <p className="mt-5 max-w-md font-body-md text-base text-on-surface-variant sm:text-lg">
                  Tell us what you're building and what it needs to do. We'll come back with a
                  written quote — no obligation, no hard sell.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <div className="glass-panel ambient-shadow-lg mt-8 max-w-md rounded-2xl p-6 sm:p-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-body-md text-sm text-outline">Direct enquiries</h2>
                      <a
                        href="mailto:hello@fakharlabs.com"
                        className="font-headline-md text-lg text-on-background transition-colors hover:text-primary sm:text-xl"
                      >
                        hello@fakharlabs.com
                      </a>
                    </div>
                    <div>
                      <h2 className="font-body-md text-sm text-outline">Response time</h2>
                      <p className="font-body-md text-base font-medium text-on-background">
                        Within 24 hours
                      </p>
                    </div>
                    <div>
                      <h2 className="mb-3 font-body-md text-sm text-outline">Prefer a quick chat?</h2>
                      <WhatsAppLinkButton message="Hi Fakhar Labs — I'd like to discuss a project." />
                    </div>
                    <div className="border-t border-outline-variant/60 pt-5">
                      <p className="font-body-md text-sm text-on-surface-variant">
                        Not sure what you need yet? Our{" "}
                        <Link
                          to="/pricing"
                          search={{ service: "development", currency }}
                          className="font-bold text-primary hover:text-secondary"
                        >
                          pricing page
                        </Link>{" "}
                        shows starting points in {currencyMeta[currency].label}.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="min-w-0 lg:col-span-7">
              <Reveal delay={60}>
                <ContactForm
                  key={currency}
                  context={{
                    ...(search.service ? { service: search.service } : {}),
                    ...(search.plan ? { plan: search.plan } : {}),
                    currency,
                  }}
                />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
