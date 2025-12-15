type PublicEnvKey = "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY" | "NEXT_PUBLIC_BASE_PATH";

// IMPORTANT: For client bundles, Next.js only inlines NEXT_PUBLIC_* env vars when accessed via
// static properties (process.env.NEXT_PUBLIC_...). Dynamic indexing like process.env[name]
// will be undefined in the browser.
export function getRequiredPublicEnv(name: PublicEnvKey): string {
  const value =
    name === "NEXT_PUBLIC_SUPABASE_URL"
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : name === "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      : process.env.NEXT_PUBLIC_BASE_PATH;

  if (!value) {
    throw new Error(
      `Missing required env var ${name}. Set it in your GitHub Pages build environment (Actions) or local .env.local.`
    );
  }
  return value;
}


