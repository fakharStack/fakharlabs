import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { testimonialsRow1, testimonialsRow2, type Testimonial } from "@/data/testimonials";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="glass-card flex h-full w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-outline-variant/40 bg-surface/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:w-[410px] sm:p-7">
      <div>
        {/* Top: Star rating + Highlight */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-0.5 text-amber-500" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-lg sm:text-xl"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}
                aria-hidden="true"
              >
                star
              </span>
            ))}
          </div>

          <span className="font-label-caps text-[11px] font-semibold tracking-wider text-primary/80 uppercase">
            Verified Project
          </span>
        </div>

        {/* Highlight callout */}
        <div className="mt-3 flex items-center gap-2 font-body-md text-xs font-semibold text-primary">
          <span className="material-symbols-outlined text-base">check_circle</span>
          <span>{item.highlight}</span>
        </div>

        {/* Authentic Quote */}
        <blockquote className="mt-3.5 font-body-md text-sm leading-relaxed text-on-surface/90 sm:text-[15px]">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
      </div>

      {/* Author and company info */}
      <footer className="mt-6 border-t border-outline-variant/30 pt-4">
        <div className="flex items-center gap-3.5">
          <div
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br font-headline-md text-xs font-bold sm:h-11 sm:w-11 sm:text-sm ${item.accentColor}`}
            aria-hidden="true"
          >
            {item.initials}
          </div>
          <div className="min-w-0 grow">
            <h4 className="truncate font-headline-md text-sm font-bold text-on-background sm:text-base">
              {item.name}
            </h4>
            <p className="truncate font-body-md text-xs text-on-surface-variant sm:text-sm">
              {item.role}, <span className="font-medium text-on-background/80">{item.company}</span>
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-on-surface-variant/80">
              <span>{item.location}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{item.projectType}</span>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}

export function TestimonialSection() {
  const row1 = [...testimonialsRow1, ...testimonialsRow1];
  const row2 = [...testimonialsRow2, ...testimonialsRow2];

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative w-full overflow-hidden border-y border-outline-variant/30 bg-surface-container-low/40 py-20 md:py-28"
    >
      {/* Background ambient lighting */}
      <div
        className="hero-glow pointer-events-none absolute inset-0 -z-10 opacity-70"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Client Stories & Reviews"
          title="What founders and operators say about working with us."
          intro="Delivered on schedule, engineered with zero bloat, and handed over with complete code ownership."
          align="center"
        />

        {/* Trust summary strip */}
        <Reveal delay={80} className="mt-8 mb-12">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-outline-variant/30 bg-surface/70 px-5 py-3 text-center text-xs font-medium text-on-surface-variant backdrop-blur-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-on-background font-semibold">
              <span
                className="material-symbols-outlined text-amber-500 text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>5.0 / 5.0 Client Satisfaction</span>
            </div>
            <span className="hidden sm:inline text-outline" aria-hidden="true">
              ·
            </span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">verified</span>
              <span>100% Code Ownership</span>
            </div>
            <span className="hidden sm:inline text-outline" aria-hidden="true">
              ·
            </span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">timer</span>
              <span>Fixed Timelines</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Marquee viewport with edge fades */}
      <div className="testimonial-marquee-wrapper relative w-full overflow-hidden">
        {/* Left & Right gradient edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-background to-transparent sm:w-28 md:w-36"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-background to-transparent sm:w-28 md:w-36"
          aria-hidden="true"
        />

        {/* Hover pause hint on larger screens */}
        <div className="mb-3 text-center">
          <span className="font-label-caps text-[11px] uppercase tracking-wider text-on-surface-variant/70">
            Hover to pause · Gliding in parallel
          </span>
        </div>

        {/* Carousel Row 1: Glides LEFT */}
        <div className="relative mb-5 flex w-full overflow-hidden sm:mb-6">
          <div className="testimonial-track-left gap-4 pr-4 sm:gap-6 sm:pr-6">
            {row1.map((item, idx) => (
              <TestimonialCard key={`row1-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Carousel Row 2: Glides RIGHT */}
        <div className="relative flex w-full overflow-hidden">
          <div className="testimonial-track-right gap-4 pr-4 sm:gap-6 sm:pr-6">
            {row2.map((item, idx) => (
              <TestimonialCard key={`row2-${item.id}-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
