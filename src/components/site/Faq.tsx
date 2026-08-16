import { useId, useState } from "react";
import { faqs } from "@/data/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="divide-y divide-outline-variant/50 overflow-hidden rounded-2xl glass-card">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-faq-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-headline-md text-base font-bold text-on-background transition-colors hover:text-primary sm:px-7 sm:text-lg"
              >
                <span className="min-w-0">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`material-symbols-outlined shrink-0 text-primary transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  expand_more
                </span>
              </button>
            </h3>
            <div id={panelId} className={`faq-panel ${isOpen ? "faq-panel-open" : ""}`}>
              <div className="min-h-0 overflow-hidden">
                <p className="px-5 pb-6 font-body-md text-sm text-on-surface-variant sm:px-7 sm:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
