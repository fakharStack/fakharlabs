import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Slim top progress bar shown while the router resolves the next route. The
 * outgoing page stays mounted and visible underneath — no blank screen.
 * This is the only navigation loading UI: there is no full-page overlay.
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
