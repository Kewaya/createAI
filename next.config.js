/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

function normalizeBasePath(value) {
  if (!value) return "";
  let v = String(value).trim();
  // People sometimes paste the full GitHub Pages URL here by mistake.
  // If it's a URL, extract the pathname.
  if (v.includes("://")) {
    try {
      v = new URL(v).pathname;
    } catch {
      // fall through
    }
  }
  if (!v) return "";
  if (!v.startsWith("/")) v = `/${v}`;
  // Next.js requires basePath NOT to end with a trailing slash (unless it's just "/").
  if (v.length > 1 && v.endsWith("/")) v = v.slice(0, -1);
  return v;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Turbopack's `resolveAlias` expects project-relative paths (not absolute FS paths).
const supabaseAliasTarget = "./node_modules/@supabase/supabase-js/dist/module/index.js";
const toolbarNextStub = "./src/components/dev/toolbar-next.stub.tsx";
const toolbarReactStub = "./src/components/dev/21st-react.stub.ts";
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || ""),
  assetPrefix: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || ""),
  // Next.js 16 uses Turbopack by default. Keep our aliasing working there as well.
  turbopack: {
    resolveAlias: {
      "@supabase/supabase-js": supabaseAliasTarget,
      ...(isDev
        ? {}
        : {
            // Ensure the 21st.dev toolbar is never included in production builds.
            "@21st-extension/toolbar-next": toolbarNextStub,
            "@21st-extension/react": toolbarReactStub,
          }),
    },
  },
  webpack: (config, { dev }) => {
    // Keep the same aliasing behavior when running with webpack (`next --webpack`).
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@supabase/supabase-js$": path.join(
        __dirname,
        "node_modules/@supabase/supabase-js/dist/module/index.js"
      ),
    };

    // Ensure the 21st.dev toolbar is never included in production builds.
    // This also avoids production build-time issues from transitive deps (e.g. Supabase ESM wrapper).
    if (!dev) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@21st-extension/toolbar-next": path.join(__dirname, toolbarNextStub),
        "@21st-extension/react": path.join(__dirname, toolbarReactStub),
      };
    }
    return config;
  },
};

export default nextConfig;


