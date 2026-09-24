import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { projects, type Project } from "@/data/projects";

// Curated selection of 7 real, visually distinct client projects from Fakhar Labs portfolio
const showcaseProjects: Project[] = projects.filter((p: Project) =>
  [
    "kidscareclinic",
    "ironman-gym",
    "tiny-tool-kit",
    "dr-amna",
    "fitness-arena-gym",
    "doctor-fitness",
    "shift-canvas",
  ].includes(p.slug),
);

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const total = showcaseProjects.length;

  // Detect whether we are in side-by-side layout (lg: >= 1024px) or stacked (< 1024px or zoom)
  useEffect(() => {
    const checkLayout = () => {
      setIsDesktop(typeof window !== "undefined" && window.innerWidth >= 1024);
    };
    checkLayout();
    window.addEventListener("resize", checkLayout);
    return () => window.removeEventListener("resize", checkLayout);
  }, []);

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotate every 4.8 seconds when not hovered/paused
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(nextSlide, 4800);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, total]);

  // Touch gesture support (vertical swipe on desktop side-by-side, horizontal on stacked/mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    const touch = e.targetTouches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    if (!touch) return;
    touchEndX.current = touch.clientX;
    touchEndY.current = touch.clientY;
  };

  const handleTouchEnd = () => {
    const startX = touchStartX.current;
    const startY = touchStartY.current;
    const endX = touchEndX.current;
    const endY = touchEndY.current;

    if (isDesktop && startY !== null && endY !== null) {
      const distanceY = startY - endY;
      if (distanceY > 35) {
        nextSlide();
      } else if (distanceY < -35) {
        prevSlide();
      }
    } else if (!isDesktop && startX !== null && endX !== null) {
      const distanceX = startX - endX;
      if (distanceX > 35) {
        nextSlide();
      } else if (distanceX < -35) {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
    touchEndY.current = null;
    setIsPaused(false);
  };

  // Keyboard navigation (both arrows work seamlessly)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextSlide();
    }
  };

  // Compute circular offset diff (-3 to +3) relative to activeIndex
  const getOffset = (index: number): number => {
    if (total === 0) return 0;
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const activeProject = showcaseProjects[activeIndex] ?? showcaseProjects[0];

  if (!activeProject || total === 0) {
    return null;
  }

  return (
    <div
      className="relative isolate mx-auto w-full max-w-[560px] select-none py-1 focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Fakhar Labs Work Showcase"
    >
      {/* Soft light purple glow matching brand palette */}
      <div
        className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-gradient-to-tr from-primary/10 via-primary-fixed/15 to-secondary/10 blur-3xl opacity-75"
        aria-hidden="true"
      />

      {/* ============================================================== */}
      {/* CAROUSEL STAGE                                                 */}
      {/* Desktop side-by-side: bottom-to-top subtle movement + fade     */}
      {/* Mobile / stacked / zoom: horizontal curved layered flow         */}
      {/* ============================================================== */}
      <div
        className={`relative flex w-full items-center justify-center overflow-visible ${
          isDesktop ? "h-[290px] sm:h-[320px] lg:h-[340px]" : "h-[240px] sm:h-[300px] md:h-[325px]"
        }`}
      >
        {showcaseProjects.map((project: Project, index: number) => {
          const diff = getOffset(index);
          const isCenter = diff === 0;

          // Compute transformations based on layout mode
          let translateX = "0%";
          let translateY = "0px";
          let scale = 1;
          let rotate = "0deg";
          let zIndex = 30;
          let opacity = 1;
          let visibilityClass = "";

          if (isDesktop) {
            // ========================================================
            // DESKTOP (Side-by-side [Text] - [Carousel]):
            // Bottom-to-top subtle movement with fade in / fade out
            // ========================================================
            if (diff === 0) {
              translateY = "0px";
              scale = 1;
              zIndex = 30;
              opacity = 1;
            } else if (diff === -1) {
              // Preceding project (moved upward, subtle displacement, soft fade)
              translateY = "-24px";
              scale = 0.93;
              zIndex = 20;
              opacity = 0.45;
            } else if (diff === 1) {
              // Succeeding project (waiting below, subtle displacement, soft fade)
              translateY = "24px";
              scale = 0.93;
              zIndex = 20;
              opacity = 0.45;
            } else if (diff === -2) {
              // Further upward
              translateY = "-44px";
              scale = 0.86;
              zIndex = 10;
              opacity = 0.15;
            } else if (diff === 2) {
              // Further downward
              translateY = "44px";
              scale = 0.86;
              zIndex = 10;
              opacity = 0.15;
            } else {
              translateY = diff < 0 ? "-60px" : "60px";
              scale = 0.8;
              zIndex = 0;
              opacity = 0;
              visibilityClass = "pointer-events-none opacity-0";
            }
          } else {
            // ========================================================
            // STACKED / SMALL DEVICES / ZOOM ([Text] | [Carousel]):
            // Horizontal layered carousel, shown as they are
            // ========================================================
            if (Math.abs(diff) >= 3) {
              visibilityClass = "pointer-events-none opacity-0";
            } else if (Math.abs(diff) === 2) {
              visibilityClass = "hidden lg:block";
            } else if (Math.abs(diff) === 1) {
              visibilityClass = "hidden sm:block";
            }

            if (diff === 0) {
              translateX = "0%";
              translateY = "0px";
              scale = 1;
              rotate = "0deg";
              zIndex = 30;
              opacity = 1;
            } else if (diff === -1) {
              translateX = "-34%";
              translateY = "8px";
              scale = 0.86;
              rotate = "-4deg";
              zIndex = 20;
              opacity = 0.88;
            } else if (diff === 1) {
              translateX = "34%";
              translateY = "8px";
              scale = 0.86;
              rotate = "4deg";
              zIndex = 20;
              opacity = 0.88;
            } else if (diff === -2) {
              translateX = "-64%";
              translateY = "18px";
              scale = 0.72;
              rotate = "-7.5deg";
              zIndex = 10;
              opacity = 0.6;
            } else if (diff === 2) {
              translateX = "64%";
              translateY = "18px";
              scale = 0.72;
              rotate = "7.5deg";
              zIndex = 10;
              opacity = 0.6;
            } else if (diff < -2) {
              translateX = "-100%";
              translateY = "24px";
              scale = 0.55;
              rotate = "-10deg";
              zIndex = 0;
              opacity = 0;
            } else if (diff > 2) {
              translateX = "100%";
              translateY = "24px";
              scale = 0.55;
              rotate = "10deg";
              zIndex = 0;
              opacity = 0;
            }
          }

          const cardWidthClass = isDesktop
            ? "w-[330px] sm:w-[410px] md:w-[440px] max-w-[94%]"
            : "w-[270px] sm:w-[335px] md:w-[365px]";

          return (
            <div
              key={project.slug}
              onClick={() => {
                if (!isCenter) {
                  setActiveIndex(index);
                }
              }}
              onKeyDown={(e) => {
                if (!isCenter && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              role={isCenter ? "group" : "button"}
              tabIndex={isCenter ? -1 : 0}
              aria-roledescription="slide"
              aria-label={
                isCenter ? `${index + 1} of ${total}: ${project.name}` : `View ${project.name}`
              }
              className={`absolute top-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${cardWidthClass} ${visibilityClass}`}
              style={{
                transform: `translateX(${translateX}) translateY(${translateY}) scale(${scale}) rotate(${rotate})`,
                zIndex,
                opacity,
              }}
            >
              {/* Card Chassis: clean image with subtle rounded border */}
              <div
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl border bg-white transition-all duration-500 ${
                  isCenter
                    ? "border-primary/30 shadow-[0_20px_45px_-12px_rgba(99,14,212,0.22),0_8px_24px_-6px_rgba(20,27,43,0.08)] ring-1 ring-primary/20"
                    : "cursor-pointer border-slate-200/80 shadow-[0_10px_25px_-8px_rgba(20,27,43,0.08)] hover:border-primary/40 hover:shadow-md"
                }`}
              >
                {/* Clean screenshot container with subtle rounded border */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={`${project.name} website preview`}
                    loading={Math.abs(diff) <= 1 ? "eager" : "lazy"}
                    className="h-full w-full object-cover object-top transition-transform duration-700"
                  />
                  {/* Subtle soft tint overlay on inactive peek cards */}
                  {!isCenter && (
                    <div className="absolute inset-0 bg-slate-900/[0.04] transition-opacity duration-300 hover:opacity-0" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* ACTIVE PROJECT INFO & SUBTLE NAVIGATION CONTROLS                */}
      {/* ============================================================== */}
      <div className="mt-4 flex flex-col gap-2.5 px-2 sm:mt-5 sm:px-3">
        <div className="flex items-center justify-between gap-3">
          {/* Active project title & category */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate font-headline-md text-sm sm:text-base font-bold text-on-background">
                {activeProject.name}
              </h3>
              <span className="text-on-surface-variant/40" aria-hidden="true">
                •
              </span>
              <span className="truncate text-xs font-medium text-on-surface-variant">
                {activeProject.type}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-on-surface-variant">
              {activeProject.industry}
              {activeProject.stack && activeProject.stack.length > 0 && (
                <span>{` • ${activeProject.stack.slice(0, 2).join(", ")}`}</span>
              )}
            </p>
          </div>

          {/* Controls: Prev/Next and Link */}
          <div className="flex shrink-0 items-center gap-1.5">
            {activeProject.url && (
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 rounded-full border border-outline-variant/60 bg-white px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <span>Visit site</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </a>
            )}

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous project"
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-on-surface-variant shadow-sm transition-colors hover:border-primary/40 hover:text-primary active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                {isDesktop ? "keyboard_arrow_up" : "chevron_left"}
              </span>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next project"
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/95 text-on-surface-variant shadow-sm transition-colors hover:border-primary/40 hover:text-primary active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                {isDesktop ? "keyboard_arrow_down" : "chevron_right"}
              </span>
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-between border-t border-outline-variant/30 pt-2.5">
          <div
            className="flex items-center gap-1.5"
            role="group"
            aria-label="Project slide navigation"
          >
            {showcaseProjects.map((p: Project, idx: number) => (
              <button
                key={p.slug}
                type="button"
                aria-label={`Show ${p.name}`}
                aria-current={idx === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <Link
            to="/work"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
          >
            <span>Explore all projects ({projects.length})</span>
            <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
