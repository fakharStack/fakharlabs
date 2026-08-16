import type { ExpandItem } from "@/data/site";
import { Reveal } from "./Reveal";

/**
 * Editorial list: numbered rows with generous type instead of a card grid.
 * All text renders statically; hover/reveal are decoration only.
 */
export function EditorialRows({ items }: { items: ExpandItem[] }) {
  return (
    <div className="divide-y divide-outline-variant/60 border-y border-outline-variant/60">
      {items.map((item, i) => (
        <Reveal key={item.id} as="article" delay={Math.min(i * 60, 240)}>
          <div className="editorial-row grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 rounded-xl px-2 py-7 sm:gap-6 sm:px-4 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:py-9">
            <span className="font-headline-md text-base font-black text-primary/50 sm:text-lg">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-fixed/60 text-primary">
                <span aria-hidden="true" className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
              </span>
              <h3 className="min-w-0 font-headline-md text-lg font-bold uppercase tracking-tight text-on-background sm:text-xl">
                {item.title}
              </h3>
            </div>
            <div className="col-span-2 min-w-0 md:col-span-1">
              <p className="font-body-md text-sm text-on-surface-variant sm:text-base">{item.intro}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full bg-white/70 px-3 py-1 font-body-md text-xs text-on-surface-variant"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
