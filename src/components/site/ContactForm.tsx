import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { WhatsAppIconButton } from "@/components/site/WhatsAppButton";
import {
  budgetExamples,
  currencyMeta,
  services as pricingServices,
  type CurrencyCode,
  type PlanId,
  type ServiceId,
} from "@/data/pricing";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(40),
  business: z.string().trim().max(120),
  budget: z.string().trim().max(60),
  message: z.string().trim().min(1, "Please tell us about your project").max(2000),
});

const PLAN_LABELS: Record<PlanId, string> = {
  basic: "Basic",
  professional: "Professional",
  business: "Business",
};

export type ContactContext = {
  service?: ServiceId;
  plan?: PlanId;
  currency?: CurrencyCode;
};

type Values = {
  name: string;
  email: string;
  phone: string;
  business: string;
  budget: string;
  message: string;
  service: string;
  plan: string;
  currency: CurrencyCode;
};

const fieldClass =
  "glass-input font-body-md text-base text-on-background placeholder:text-on-surface-variant/60";
const labelClass =
  "mb-2 block font-body-md text-sm text-on-surface-variant transition-colors group-focus-within:text-primary";

export function ContactForm({ context }: { context: ContactContext }) {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    phone: "",
    business: "",
    budget: "",
    message: "",
    service: context.service ?? "",
    plan: context.plan ?? "",
    currency: context.currency ?? "PKR",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const prefilled = Boolean(context.service || context.plan);

  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const serviceLabel = pricingServices.find((s) => s.id === values.service)?.label ?? "";
  const planLabel = values.plan ? (PLAN_LABELS[values.plan as PlanId] ?? "") : "";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Please check the form and try again.");
      return;
    }

    setStatus("sending");
    setError(null);

    const contextParts = [
      serviceLabel && `Service: ${serviceLabel}`,
      planLabel && `Plan: ${planLabel}`,
      `Currency: ${values.currency}`,
    ].filter(Boolean);

    const serviceField = [serviceLabel || null, planLabel ? `${planLabel} plan` : null]
      .filter(Boolean)
      .join(" · ");

    try {
      const { error: err } = await supabase.from("leads").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        business_name: parsed.data.business || null,
        service: serviceField || null,
        budget: parsed.data.budget || null,
        message: `${parsed.data.message}\n\n— Enquiry context —\n${contextParts.join("\n")}`,
        source: "Website",
        status: "New",
      });
      if (err) throw err;
    } catch {
      // Values stay in state so nothing the visitor typed is lost.
      setStatus("error");
      setError("We couldn't send your enquiry. Please try again, or reach us on WhatsApp.");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <SuccessCard
        context={{
          service: serviceLabel,
          plan: planLabel,
          currency: values.currency,
        }}
        onReset={() => {
          setValues((v) => ({ ...v, name: "", email: "", phone: "", business: "", message: "" }));
          setStatus("idle");
        }}
      />
    );
  }

  const sending = status === "sending";

  return (
    <div className="glass-panel ambient-shadow-lg rounded-2xl p-6 sm:p-8 md:p-10">
      <form onSubmit={onSubmit} noValidate className="space-y-7">
        {prefilled && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
            <p className="font-label-caps text-label-caps uppercase text-primary">
              Carried over from pricing
            </p>
            <p className="mt-2 font-body-md text-sm text-on-surface-variant">
              {[serviceLabel, planLabel && `${planLabel} plan`, values.currency]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group min-w-0">
            <label className={labelClass} htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Your name"
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="group min-w-0">
            <label className={labelClass} htmlFor="business">
              Business name
            </label>
            <input
              id="business"
              name="business"
              type="text"
              autoComplete="organization"
              placeholder="Optional"
              value={values.business}
              onChange={(e) => set("business", e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group min-w-0">
            <label className={labelClass} htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="group min-w-0">
            <label className={labelClass} htmlFor="phone">
              Phone / WhatsApp (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Optional"
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group min-w-0">
            <label className={labelClass} htmlFor="service">
              Service
            </label>
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={(e) => set("service", e.target.value)}
              className={`${fieldClass} cursor-pointer bg-transparent`}
            >
              <option value="">Not sure yet</option>
              {pricingServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="group min-w-0">
            <label className={labelClass} htmlFor="plan">
              Plan of interest
            </label>
            <select
              id="plan"
              name="plan"
              value={values.plan}
              onChange={(e) => set("plan", e.target.value)}
              className={`${fieldClass} cursor-pointer bg-transparent`}
            >
              <option value="">No preference</option>
              {(Object.keys(PLAN_LABELS) as PlanId[]).map((p) => (
                <option key={p} value={p}>
                  {PLAN_LABELS[p]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="group min-w-0">
            <label className={labelClass} htmlFor="currency">
              Preferred currency
            </label>
            <select
              id="currency"
              name="currency"
              value={values.currency}
              onChange={(e) => set("currency", e.target.value as CurrencyCode)}
              className={`${fieldClass} cursor-pointer bg-transparent`}
            >
              {(Object.keys(currencyMeta) as CurrencyCode[]).map((c) => (
                <option key={c} value={c}>
                  {currencyMeta[c].label} — {currencyMeta[c].market}
                </option>
              ))}
            </select>
          </div>
          <div className="group min-w-0">
            <label className={labelClass} htmlFor="budget">
              Approximate budget (optional)
            </label>
            <input
              id="budget"
              name="budget"
              type="text"
              placeholder={budgetExamples[values.currency]}
              value={values.budget}
              onChange={(e) => set("budget", e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="group min-w-0">
          <label className={labelClass} htmlFor="message">
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="What are you building, what does it need to do, and when do you need it live?"
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${fieldClass} resize-none`}
          />
        </div>

        {status === "error" && error && (
          <p
            role="alert"
            className="rounded-2xl border border-error/30 bg-error-container px-4 py-3 font-body-md text-sm text-on-error-container"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={sending}
            aria-busy={sending}
            className={`btn-primary min-h-12 w-full !px-8 !py-3.5 font-body-md sm:w-auto ${
              sending ? "cursor-not-allowed opacity-60" : ""
            }`}
          >
            {sending ? (
              <>
                <span
                  aria-hidden="true"
                  className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
                />
                Sending...
              </>
            ) : (
              <>
                Send project enquiry
                <span aria-hidden="true" className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </>
            )}
          </button>
          <p className="font-body-md text-xs text-on-surface-variant sm:text-sm">
            Typical response time: within 24 hours.
          </p>
        </div>
      </form>
    </div>
  );
}

function SuccessCard({
  onReset,
  context,
}: {
  onReset: () => void;
  context: { service: string; plan: string; currency: CurrencyCode };
}) {
  const contextLine = [context.service, context.plan && `${context.plan} plan`, context.currency]
    .filter(Boolean)
    .join(" · ");
  const whatsappMessage = contextLine
    ? `Hi Fakhar Labs, I just submitted an enquiry about ${contextLine}.`
    : "Hi Fakhar Labs, I just submitted an enquiry on your website.";

  return (
    <div
      role="status"
      aria-live="polite"
      className="success-card glass-panel ambient-shadow-lg rounded-2xl p-8 text-center sm:p-12"
    >
      <span className="success-badge mx-auto grid h-20 w-20 place-items-center rounded-full border border-primary/25 bg-primary/10">
        <svg viewBox="0 0 52 52" aria-hidden="true" className="h-10 w-10">
          <path
            className="success-check"
            d="M14 27.5 22.5 36 38 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "var(--color-primary)" }}
          />
        </svg>
      </span>
      <h2 className="mt-7 font-headline-lg text-2xl text-on-background sm:text-3xl">
        Message received
      </h2>
      <p className="mx-auto mt-4 max-w-md font-body-md text-base text-on-surface-variant">
        Thanks for reaching out to Fakhar Labs. We've received your project inquiry and will review
        the details shortly.
      </p>
      <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-body-md text-sm text-primary">
        <span aria-hidden="true" className="material-symbols-outlined text-base">
          schedule
        </span>
        Typical response time: within 24 hours
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button type="button" onClick={onReset} className="btn-secondary min-h-11 !px-6 !py-3 text-on-surface">
          Send another message
        </button>
        <WhatsAppIconButton
          message={whatsappMessage}
          label="Continue the conversation on WhatsApp"
          className="h-12 w-12"
        />
      </div>
    </div>
  );
}
