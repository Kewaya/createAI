/** @type {import('next').NextConfig} */
function normalizeBasePath(value) {
  if (!value) return "";
  return value.startsWith("/") ? value : `/${value}`;
}

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || ""),
  assetPrefix: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH || ""),
};

export default nextConfig;


