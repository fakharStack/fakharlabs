import { Link } from "@tanstack/react-router";
import { useId, useState } from "react";

export type ExpandableCard = {
  id: string;
  title: string;
  icon: string;
  intro: string;
  points: string[];
  bestFor?: string;
  ctaLabel?: string;
  ctaTo?: string;
  index?: string;
  pointsLabel?: string;
};

/**
 * Fluid interactive grid: selecting a card widens it in place while the
 * remaining cards reflow around it (no overlap, no scale hacks).
 * Hover previews on pointer devices; tap/click and keyboard lock the state.
 */
export function ExpandableGrid({
  items,
  columns = 3,
  className = "",
}: {
  items: ExpandableCard[];
  columns?: 2 | 3;
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const uid = useId();

  const cols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 gap-5 ${cols} ${className}`}>
      {items.map((item) => {
        const isOpen = active === item.id;
        const isPreview = !active && hovered === item.id;
        const dimmed = active !== null && !isOpen;
        const panelId = `${uid}-${item.id}`;

        return (
          <article
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered((h) => (h === item.id ? null : h))}
            className={`expand-cell ${isOpen ? (columns === 2 ? "md:col-span-2" : "md:col-span-2") : ""}`}
          >
            <div
              className={`glass-card expand-card flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
                isOpen ? "expand-card-open" : ""
              } ${dimmed ? "expand-card-dim" : ""} ${isPreview ? "expand-card-preview" : ""}`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setActive((a) => (a === item.id ? null : item.id))}
                className="group/btn flex w-full items-start gap-4 text-left"
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary transition-colors ${
                    isOpen ? "from-primary to-secondary text-on-primary" : ""
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </span>
                <span className="min-w-0 flex-1">
                  {item.index && (
                    <span className="font-label-caps text-label-caps block text-outline">{item.index}</span>
                  )}
                  <span className="mt-1 block font-headline-md text-lg font-bold text-on-background sm:text-xl">
                    {item.title}
                  </span>
                  <span className="mt-2 block font-body-md text-sm text-on-surface-variant sm:text-base">
                    {item.intro}
                  </span>
                </span>
                <span
                  className={`material-symbols-outlined mt-1 shrink-0 text-xl text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  add
                </span>
              </button>

              <div id={panelId} className={`expand-panel ${isOpen ? "expand-panel-open" : ""}`}>
                <div className="min-h-0 overflow-hidden">
                  <div className="expand-panel-inner mt-6 border-t border-outline-variant/50 pt-6">
                    <p className="font-label-caps text-label-caps uppercase text-primary">
                      {item.pointsLabel ?? "Key capabilities"}
                    </p>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {item.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 font-body-md text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary">
                            check_circle
                          </span>
                          <span className="min-w-0">{p}</span>
                        </li>
                      ))}
                    </ul>
                    {item.bestFor && (
                      <p className="mt-5 rounded-xl bg-primary-fixed/40 px-4 py-3 font-body-md text-sm text-on-surface-variant">
                        <span className="font-bold text-on-background">Best for: </span>
                        {item.bestFor}
                      </p>
                    )}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      {item.ctaTo && (
                        <Link
                          to={item.ctaTo as never}
                          className="inline-flex min-h-11 items-center gap-2 font-body-md text-sm font-bold text-primary transition-colors hover:text-secondary"
                        >
                          {item.ctaLabel ?? "Learn more"}
                          <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => setActive(null)}
                        className="inline-flex min-h-11 items-center gap-1 font-body-md text-sm text-on-surface-variant transition-colors hover:text-primary"
                      >
                        Close
                        <span className="material-symbols-outlined text-base">expand_less</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
