import type { ExpandItem } from "@/data/site";
import { Reveal } from "./Reveal";

/**
 * Vertical rail timeline (single composition across breakpoints, wider gutters
 * on desktop). Step copy is always rendered — the rail is decoration.
 */
export function ProcessTimeline({ steps }: { steps: ExpandItem[] }) {
  return (
    <ol className="relative ml-1 flex flex-col gap-8 md:gap-10">
      <span
        aria-hidden="true"
        className="timeline-rail absolute bottom-4 left-[15px] top-4 w-[2px] md:left-[19px]"
      />
      {steps.map((step, i) => (
        <Reveal key={step.id} as="li" delay={Math.min(i * 60, 300)}>
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 sm:gap-6">
            <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-headline-md text-xs font-black text-on-primary md:h-10 md:w-10 md:text-sm">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-baseline md:gap-8">
              <h3 className="font-headline-md text-lg font-bold text-on-background sm:text-xl">
                {step.title}
              </h3>
              <div className="min-w-0">
                <p className="mt-2 font-body-md text-sm text-on-surface-variant sm:text-base md:mt-0">
                  {step.intro}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {step.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-1.5 font-body-md text-xs text-on-surface-variant sm:text-sm"
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                      <span className="min-w-0">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
