/** @type {import('next').NextConfig} */
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

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || ""),
  assetPrefix: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || ""),
};

export default nextConfig;


