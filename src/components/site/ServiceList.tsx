import { Link } from "@tanstack/react-router";
import { useId, useState } from "react";
import type { ServiceItem } from "@/data/site";
import { Reveal } from "./Reveal";

/**
 * Interactive vertical service index. Rows are always readable; selecting a row
 * expands a richer detail area beside it. Deliberately not a card grid.
 */
export function ServiceList({ services }: { services: ServiceItem[] }) {
  const [active, setActive] = useState(services[0]?.slug ?? "");
  const uid = useId();
  const current = services.find((s) => s.slug === active) ?? services[0];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
      <div className="min-w-0 divide-y divide-outline-variant/60 border-t border-outline-variant/60">
        {services.map((s, i) => {
          const isActive = s.slug === active;
          return (
            <Reveal key={s.slug} delay={Math.min(i * 50, 250)}>
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`${uid}-detail`}
                onClick={() => setActive(s.slug)}
                className={`group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-2 py-5 text-left transition-colors sm:gap-4 sm:px-3 ${
                  isActive ? "text-primary" : "text-on-background hover:text-primary"
                }`}
              >
                <span className="font-headline-md text-xs font-black text-primary/50 sm:text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-headline-md text-base font-bold sm:text-lg">
                    {s.name}
                  </span>
                  <span className="mt-1 block font-body-md text-xs text-on-surface-variant sm:text-sm lg:hidden">
                    {s.intro}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`material-symbols-outlined shrink-0 text-xl transition-transform duration-300 ${
                    isActive ? "translate-x-1 text-primary" : "text-outline group-hover:translate-x-1"
                  }`}
                >
                  arrow_forward
                </span>
              </button>
              {/* Mobile-only detail, stacked directly under the selected row */}
              {isActive && current && (
                <div className="px-2 pb-6 lg:hidden">
                  <ServiceDetail service={current} />
                </div>
              )}
            </Reveal>
          );
        })}
      </div>

      <div id={`${uid}-detail`} className="hidden min-w-0 lg:block">
        {current && (
          <div className="sticky top-28">
            <ServiceDetail service={current} featured />
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceDetail({ service, featured = false }: { service: ServiceItem; featured?: boolean }) {
  return (
    <div
      key={service.slug}
      className={`glass-card price-swap rounded-2xl p-5 sm:p-6 ${featured ? "lg:p-8" : ""}`}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-on-primary">
          <span aria-hidden="true" className="material-symbols-outlined text-2xl">
            {service.icon}
          </span>
        </span>
        <h3 className="min-w-0 font-headline-md text-lg font-bold text-on-background sm:text-xl">
          {service.name}
        </h3>
      </div>
      <p className="mt-4 font-body-md text-sm text-on-surface-variant sm:text-base">{service.intro}</p>

      <p className="font-label-caps text-label-caps mt-6 uppercase text-primary">What's included</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {service.capabilities.map((c) => (
          <li key={c} className="flex items-start gap-2 font-body-md text-sm text-on-surface-variant">
            <span aria-hidden="true" className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">
              check_circle
            </span>
            <span className="min-w-0">{c}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-xl bg-primary-fixed/40 px-4 py-3 font-body-md text-sm text-on-surface-variant">
        <span className="font-bold text-on-background">Ideal for: </span>
        {service.bestFor}
      </p>

      <Link
        to={service.to as never}
        className="btn-primary mt-6 min-h-11 !px-6 !py-3 text-sm"
      >
        Explore {service.name}
        <span aria-hidden="true" className="material-symbols-outlined text-base">
          arrow_forward
        </span>
      </Link>
    </div>
  );
}
