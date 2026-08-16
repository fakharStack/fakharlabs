import { createStart, createMiddleware } from "@tanstack/react-start";
// Imported from the package that actually implements it, so the production SSR
// bundle can never resolve a re-export barrel that lacks the symbol.
import { createCsrfMiddleware } from "@tanstack/start-client-core";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
if (typeof createCsrfMiddleware !== "function") {
  // Fail loudly at startup instead of shipping server functions without CSRF
  // protection (or crashing with an opaque "not a function" TypeError).
  throw new Error(
    "createCsrfMiddleware is unavailable — @tanstack/start-client-core is out of sync with @tanstack/react-start. Reinstall dependencies from the committed lockfile.",
  );
}

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));
