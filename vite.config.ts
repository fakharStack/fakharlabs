import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

// Portable build config — no Lovable packages required.
// Deploy target is controlled by NITRO_PRESET (Vercel sets this automatically
// via auto-detection; you can force it with NITRO_PRESET=vercel).
export default defineConfig(({ mode }) => {
  // Vite only exposes VITE_* to the client. Server functions read process.env,
  // which Vite does not populate — so load .env into process.env for local dev.
  // On Vercel the platform provides the real environment variables instead.
  const fileEnv = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(fileEnv)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
  // Lovable's build/preview pipeline expects the Cloudflare-module layout in
  // dist/ (dist/server + dist/client). Outside the Lovable sandbox the build
  // stays portable: Vercel auto-detects its own preset via NITRO_PRESET.
  const isLovableSandbox =
    process.env["LOVABLE_SANDBOX"] === "1" || !!process.env["DEV_SERVER__PROJECT_PATH"];
  const preset = process.env["NITRO_PRESET"];
  const nitroOptions = isLovableSandbox
    ? {
        preset: "cloudflare-module",
        output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
        cloudflare: { nodeCompat: true, deployConfig: true },
      }
    : preset
      ? { preset }
      : {};
  return {
  server: { host: "::", port: 8080, strictPort: true },
  preview: { host: "::", port: 8080 },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Route the server entry through src/server.ts (SSR error wrapper).
      server: { entry: "server" },
    }),
    react(),
    ...(process.env["NODE_ENV"] === "production" || process.argv.includes("build")
      ? [nitro(nitroOptions)]
      : []),
  ],
  };
});
