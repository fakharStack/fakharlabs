import { useEffect, useState } from "react";

/**
 * CustomSiteLoader:
 * A luxury, light-themed full-page loader that shields the user from
 * unstyled Google Fonts, Material Symbol ligature flicker, and asset clutter.
 *
 * Features:
 * - Center: Fakhar Labs logo with a breathing glow aura that acts as the loader.
 * - Bottom Right: Live numerical percentage counter (0% to 100%) with micro progress bar.
 * - Resolves `document.fonts.ready` before completing to guarantee zero icon/text clutter.
 */
export function CustomSiteLoader() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Prevent background scrolling while loading overlay is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    let isFontsLoaded = false;
    let isWindowLoaded = document.readyState === "complete";

    // Track Google Fonts & Material Symbols readiness
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => {
          isFontsLoaded = true;
        })
        .catch(() => {
          isFontsLoaded = true;
        });
    } else {
      isFontsLoaded = true;
    }

    const onWindowLoad = () => {
      isWindowLoaded = true;
    };

    if (!isWindowLoaded) {
      window.addEventListener("load", onWindowLoad);
    }

    const startTime = Date.now();
    const MINIMUM_DURATION_MS = 1000; // Ensures smooth, non-jarring visual experience
    const MAXIMUM_TIMEOUT_MS = 3000; // Safeguard timeout on slow 3G networks

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timedOut = elapsed >= MAXIMUM_TIMEOUT_MS;
      const assetsReady = (isFontsLoaded && isWindowLoaded) || timedOut;

      if (!assetsReady) {
        // Smoothly advance up to 88% while waiting for assets and fonts
        if (currentProgress < 88) {
          const step = Math.max(1, (88 - currentProgress) * 0.12);
          currentProgress = Math.min(88, currentProgress + step);
          setProgress(Math.round(currentProgress));
        }
      } else {
        // Once fonts & window are ready, ensure minimum display time then glide to 100%
        if (elapsed >= MINIMUM_DURATION_MS) {
          if (currentProgress < 100) {
            const step = Math.max(2, (100 - currentProgress) * 0.28);
            currentProgress = Math.min(100, currentProgress + step);
            setProgress(Math.round(currentProgress));
          } else {
            clearInterval(interval);
            setProgress(100);

            // Brief pause at 100% so user sees completion, then initiate fade out
            setTimeout(() => {
              setIsExiting(true);
              document.body.style.overflow = originalOverflow;

              // Unmount completely after transition completes
              setTimeout(() => {
                setIsRemoved(true);
              }, 700);
            }, 200);
          }
        } else {
          // Progress steadily towards 92% until MINIMUM_DURATION_MS is satisfied
          if (currentProgress < 92) {
            currentProgress = Math.min(92, currentProgress + 2);
            setProgress(Math.round(currentProgress));
          }
        }
      }
    }, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", onWindowLoad);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="custom-site-loader"
      aria-label="Loading site experiences"
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#f9f9ff] select-none transition-all duration-700 ease-out ${
        isExiting ? "opacity-0 pointer-events-none scale-102" : "opacity-100"
      }`}
    >
      {/* Subtle ambient background glow aura */}
      <div
        className="pointer-events-none absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-tr from-primary/20 via-primary-container/20 to-secondary/15 blur-3xl opacity-80 animate-pulse"
        aria-hidden="true"
      />

      {/* Decorative delicate radial grid dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#141b2b 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* ============================================================== */}
      {/* CENTER: LOGO ACTING AS LOADER WITH CIRCULAR MOVING RING & GLOW */}
      {/* ============================================================== */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          {/* Subtle background glow aura behind the logo */}
          <div
            className="absolute -inset-6 rounded-full bg-primary/20 blur-2xl animate-pulse"
            aria-hidden="true"
          />

          {/* Smooth moving circular ring orbiting around the logo */}
          <div
            className="absolute -inset-3 sm:-inset-3.5 pointer-events-none animate-spin"
            style={{ animationDuration: "2.2s", animationTimingFunction: "linear" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <linearGradient id="loader-spin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#630ed4" stopOpacity="1" />
                  <stop offset="60%" stopColor="#8856e5" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#630ed4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Subtle track orbit */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#630ed4"
                strokeOpacity="0.12"
                strokeWidth="2"
              />
              {/* Spinning gradient arc */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#loader-spin-grad)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeDasharray="95 195"
              />
              {/* Radiant glowing head bead */}
              <circle
                cx="96"
                cy="50"
                r="3"
                fill="#630ed4"
                className="filter drop-shadow-[0_0_6px_rgba(99,14,212,0.85)]"
              />
            </svg>
          </div>

          {/* Circular logo container */}
          <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-outline-variant/40 bg-white p-3.5 shadow-2xl shadow-purple-600/10 backdrop-blur-md">
            <img
              src="/logo.png"
              alt="Fakhar Labs"
              className="h-full w-full rounded-full object-contain animate-pulse duration-1000"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="mt-5 text-center">
          <span className="font-headline-md text-base sm:text-lg font-black tracking-tight text-on-background">
            Fakhar Labs
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM RIGHT: LOADING PROGRESS PERCENTAGE */}
      {/* ============================================================== */}
      <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-12 z-20 flex flex-col items-end">
        {/* Large stylized percentage counter */}
        <div className="flex items-baseline gap-1 font-headline-md font-black tracking-tight text-on-background">
          <span className="text-3xl sm:text-4xl tabular-nums text-on-background">{progress}</span>
          <span className="text-lg sm:text-xl font-bold text-primary">%</span>
        </div>

        {/* Micro progress line */}
        <div className="mt-2 h-1.5 w-28 sm:w-36 overflow-hidden rounded-full bg-primary-fixed/60 border border-outline-variant/30">
          <div
            className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status text */}
        <div className="mt-1.5 flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          <span>{progress < 100 ? "Loading assets" : "Ready"}</span>
          <span className="text-primary">•</span>
          <span className="text-primary font-mono">{progress < 100 ? "..." : "✓"}</span>
        </div>
      </div>
    </div>
  );
}
