import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // Preload on intent so most navigations resolve before the click finishes,
    // and keep the current page mounted while the destination loads.
    defaultPreload: "intent",
    defaultPreloadDelay: 40,
    defaultPendingMs: 400,
    defaultPendingMinMs: 300,
  });

  return router;
};
