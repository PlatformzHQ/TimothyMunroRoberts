import type { NextConfig } from "next";

// Static export for GitHub Pages, served at the root of the custom domain
// (timothymunroroberts.com) — so no basePath/assetPrefix.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "",
  assetPrefix: "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
