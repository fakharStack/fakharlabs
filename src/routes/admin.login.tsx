import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Login — Fakhar Labs" },
      { name: "description", content: "Private administration area for Fakhar Labs staff." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Login — Fakhar Labs" },
      { property: "og:description", content: "Private administration area for Fakhar Labs staff." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      navigate({ to: "/admin/dashboard", replace: true });
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  if (!isLoaded || isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-container-low px-4">
        <div className="grid min-h-40 place-items-center text-sm text-on-surface-variant">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-container-low px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2 font-headline-md text-lg font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-black text-white">
            A
          </span>
          Fakhar Labs
        </Link>
        <SignIn
          routing="virtual"
          redirectUrl="/admin/dashboard"
          afterSignInUrl="/admin/dashboard"
          appearance={{
            variables: {
              colorPrimary: "hsl(217 91% 60%)",
              colorBackground: "hsl(222 47% 11%)",
              colorText: "hsl(210 40% 98%)",
              colorInputBackground: "hsl(222 47% 15%)",
              colorInputText: "hsl(210 40% 98%)",
              borderRadius: "0.5rem",
            },
            elements: {
              card: "shadow-none border border-outline-variant/60 bg-surface",
              headerTitle: "text-on-background font-headline-md",
              headerSubtitle: "text-on-surface-variant",
              socialButtonsBlockButton: "border-outline-variant/60 text-on-background",
              formFieldLabel: "text-on-surface-variant",
              formFieldInput: "bg-surface-container text-on-background border-outline-variant/60",
              formButtonPrimary: "bg-primary text-on-primary hover:bg-primary/90",
              footer: "hidden",
              footerAction: "hidden",
              footerActionText: "hidden",
              footerActionLink: "hidden",
            },
          }}
        />
        <p className="mt-4 text-center text-xs text-on-surface-variant">
          This area is private to the agency team. If you need access, contact an existing admin.
        </p>
      </div>
    </div>
  );
}
