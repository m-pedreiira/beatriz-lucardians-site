import type { NextConfig } from "next";

// When building for GitHub Pages as a project site (https://<user>.github.io/<repo>/),
// the workflow sets BASE_PATH="/<repo>". For a custom domain or a user/org root page,
// leave BASE_PATH unset (or empty) so the site is served from "/".
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Exposed to client code so lib/base-path.ts can prefix public/ asset URLs —
  // with images.unoptimized (required for static export) Next does NOT do this
  // automatically the way it does for its own _next/* assets.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
