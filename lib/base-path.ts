// With `images.unoptimized: true` (required for static export), next/image
// does not automatically prefix local src paths with `basePath` the way it
// prefixes Next's own _next/* assets. Wrap every public/ asset reference with
// this so images and icons resolve correctly on GitHub Pages project sites
// (served from /<repo>/) as well as at the root of a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
