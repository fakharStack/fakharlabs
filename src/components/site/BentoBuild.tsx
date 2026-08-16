import { Link } from "@tanstack/react-router";
import { useId, useState } from "react";
import type { ExpandItem } from "@/data/site";
import { Reveal } from "./Reveal";

type Size = "lg" | "md" | "sm" | "wide";

/** Desktop spans per tile, keyed by intent rather than index. */
const spanFor: Record<Size, string> = {
  lg: "sm:col-span-2 lg:col-span-3 lg:row-span-2",
  md: "lg:col-span-3",
  sm: "sm:col-span-1 lg:col-span-2",
  wide: "sm:col-span-2 lg:col-span-6",
};

export type BentoItem = ExpandItem & { size: Size };

/**
 * Asymmetric bento layout: tiles differ in weight and content density, and the
 * selected tile reveals its detail inline while neighbours reflow. All copy is
 * present in the DOM regardless of interaction state (only detail is collapsed).
 */
export function BentoBuild({ items }: { items: BentoItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);
  const uid = useId();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((item, i) => {
        const isOpen = active === item.id;
        const panelId = `${uid}-${item.id}`;
        const featured = item.size === "lg";

        return (
          <Reveal
            key={item.id}
            as="article"
            delay={Math.min(i * 70, 280)}
            className={`min-w-0 ${spanFor[item.size]}`}
          >
            <div
              className={`bento-tile glass-card flex h-full flex-col rounded-2xl p-5 sm:p-6 ${
                featured ? "lg:p-8" : ""
              } ${isOpen ? "expand-card-open" : ""}`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setActive((a) => (a === item.id ? null : item.id))}
                className="flex w-full items-start gap-3 text-left sm:gap-4"
              >
                <span
                  className={`grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary transition-colors ${
                    featured ? "h-14 w-14" : "h-11 w-11"
                  } ${isOpen ? "from-primary to-secondary text-on-primary" : ""}`}
                >
                  <span className={`material-symbols-outlined ${featured ? "text-3xl" : "text-xl"}`}>
                    {item.icon}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-headline-md font-bold text-on-background ${
                      featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`mt-2 block font-body-md text-on-surface-variant ${
                      featured ? "text-sm sm:text-base" : "text-sm"
                    }`}
                  >
                    {item.intro}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`material-symbols-outlined mt-0.5 shrink-0 text-lg text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  add
                </span>
              </button>

              <div id={panelId} className={`expand-panel ${isOpen ? "expand-panel-open" : ""}`}>
                <div className="min-h-0 overflow-hidden">
                  <div className="expand-panel-inner mt-5 border-t border-outline-variant/50 pt-5">
                    <ul className={`grid gap-2 ${featured ? "sm:grid-cols-2" : ""}`}>
                      {item.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2 font-body-md text-sm text-on-surface-variant"
                        >
                          <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">
                            check_circle
                          </span>
                          <span className="min-w-0">{p}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 font-body-md text-sm font-bold text-primary hover:text-secondary"
                    >
                      Discuss your project
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>

              {featured && (
                <div className="mt-auto hidden pt-8 lg:block">
                  <div className="rounded-xl bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-5">
                    <p className="font-label-caps text-label-caps uppercase text-primary">Typical build</p>
                    <p className="mt-2 font-body-md text-sm text-on-surface-variant">
                      Custom design, mobile-first development, SEO-ready structure and a full handover of
                      the code and accounts.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
