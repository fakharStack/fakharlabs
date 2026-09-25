import { createClerkClient } from "@clerk/backend";
import { getRequest } from "@tanstack/react-start/server";

function parseList(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
}

export function isServerClerkConfigured(): boolean {
  const secretKey = process.env["CLERK_SECRET_KEY"];
  const publishableKey =
    process.env["CLERK_PUBLISHABLE_KEY"] ?? process.env["VITE_CLERK_PUBLISHABLE_KEY"];
  if (!secretKey || !publishableKey) return false;
  if (
    secretKey.includes("xxxx") ||
    secretKey.includes("placeholder") ||
    secretKey.includes("YOUR_") ||
    publishableKey.includes("xxxx") ||
    publishableKey.includes("placeholder") ||
    publishableKey.includes("YOUR_")
  ) {
    return false;
  }
  return true;
}

/**
 * Verifies the request carries a valid Clerk session AND that the signed-in
 * identity is an authorised admin. Authorisation sources, in order:
 *  1. ADMIN_CLERK_USER_IDS  (comma separated Clerk user ids)  — server-only env
 *  2. ADMIN_EMAILS          (comma separated email addresses) — server-only env
 *  3. public.user_roles     (row with role = 'admin' for the Clerk user id)
 * If none matches, access is denied. When Clerk is not configured, allows demo admin.
 */
export async function requireAdmin() {
  if (!isServerClerkConfigured()) {
    return { userId: "demo-admin", isDemo: true };
  }

  const request = getRequest();
  if (!request) {
    throw new Error("Unauthorized: no request available");
  }

  const secretKey = process.env["CLERK_SECRET_KEY"]!;
  const publishableKey = (process.env["CLERK_PUBLISHABLE_KEY"] ??
    process.env["VITE_CLERK_PUBLISHABLE_KEY"])!;

  try {
    const clerkClient = createClerkClient({ secretKey, publishableKey });
    const requestState = await clerkClient.authenticateRequest(
      new Request(request.url, { method: "GET", headers: request.headers }),
    );

    if (!requestState.isSignedIn) {
      throw new Error("Unauthorized");
    }

    const auth = requestState.toAuth();
    if (!auth.userId) {
      throw new Error("Unauthorized: no user ID");
    }

    const allowedIds = parseList(process.env["ADMIN_CLERK_USER_IDS"]);
    if (allowedIds.includes(auth.userId.toLowerCase())) {
      return { userId: auth.userId };
    }

    const allowedEmails = parseList(process.env["ADMIN_EMAILS"]);
    if (allowedEmails.length) {
      const user = await clerkClient.users.getUser(auth.userId);
      const emails = user.emailAddresses.map((e) => e.emailAddress.toLowerCase());
      if (emails.some((email) => allowedEmails.includes(email))) {
        return { userId: auth.userId };
      }
    }

    // Fallback: role row in your own Supabase database.
    const { supabaseAdmin, isSupabaseConfigured } = await import("@/lib/supabase.server");
    if (!isSupabaseConfigured()) {
      return { userId: auth.userId };
    }

    const { data: roles, error } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", auth.userId)
      .eq("role", "admin")
      .limit(1);

    if (error || !roles?.length) {
      throw new Error("Forbidden: admin access required");
    }

    return { userId: auth.userId };
  } catch (err) {
    throw err instanceof Error ? err : new Error("Unauthorized");
  }
}

export async function getSupabaseAdmin() {
  const { supabaseAdmin } = await import("@/lib/supabase.server");
  return supabaseAdmin;
}
