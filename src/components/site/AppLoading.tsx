import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Branded first-paint loader. It is only ever displayed while the app is
 * genuinely still becoming interactive:
 *  - A <noscript> stylesheet hides it entirely when JS is unavailable, so it can
 *    never block the SSR-rendered page.
 *  - React removes it on its first committed effect, i.e. the moment hydration
 *    completes. There are no timers or artificial delays.
 */
export function InitialLoader() {
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);
  const routerReady = useRouterState({ select: (s) => s.status === "idle" });

  useEffect(() => {
    if (!routerReady) return;
    setDone(true);
    // Unmount after the fade-out transition ends (animationend, not a timer).
    const node = document.querySelector<HTMLElement>(".app-loader");
    if (!node) {
      setRemoved(true);
      return;
    }
    const onEnd = () => setRemoved(true);
    node.addEventListener("animationend", onEnd, { once: true });
    return () => node.removeEventListener("animationend", onEnd);
  }, [routerReady]);

  if (removed) return null;

  return (
    <div className="app-loader" data-done={done ? "true" : "false"} role="status" aria-live="polite">
      <div className="flex w-64 max-w-[80vw] flex-col items-center gap-5 text-center">
        <span className="loader-mark grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-headline-md text-2xl font-black text-on-primary">
          F
        </span>
        <span className="font-headline-md text-base font-extrabold tracking-tight text-on-background">
          Fakhar Labs
        </span>
        <span className="loader-track h-1.5 w-full">
          <span />
        </span>
        <span className="sr-only">Loading Fakhar Labs</span>
      </div>
    </div>
  );
}

/**
 * Slim top progress bar shown while the router resolves the next route. The
 * outgoing page stays mounted and visible underneath — no blank screen.
 */
export function RouteProgress() {
  // Client-only: SSR always renders null (the server's router state is
  // "pending" by definition), so the bar can never be baked into the HTML.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isPending = useRouterState({
    select: (s) => s.status === "pending" || s.isLoading || s.isTransitioning,
  });

  if (!mounted || !isPending) return null;

  return (
    <div className="route-progress" role="progressbar" aria-label="Loading page" aria-busy="true">
      <span />
    </div>
  );
}
