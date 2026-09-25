import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase.types";

export function isSupabaseConfigured(): boolean {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
  if (!url || !key) return false;
  if (
    url.includes("YOUR-PROJECT-REF") ||
    url.includes("placeholder") ||
    key.includes("your-service-ro") ||
    key.includes("placeholder")
  ) {
    return false;
  }
  return true;
}

function createAdminClient() {
  const url = process.env["SUPABASE_URL"] || "https://placeholder.supabase.co";
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"] || "placeholder-key";

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let _client: ReturnType<typeof createAdminClient> | undefined;

export const supabaseAdmin = new Proxy({} as ReturnType<typeof createAdminClient>, {
  get(_, prop, receiver) {
    if (!_client) _client = createAdminClient();
    return Reflect.get(_client, prop, receiver);
  },
});
