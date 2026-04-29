/**
 * Converts any Sanity CDN file URL to your domain proxy URL
 * Input:  https://cdn.sanity.io/files/jo6fxsyw/production/abc123.pdf
 * Output: /api/pdf/abc123.pdf
 */
export function toProxyUrl(sanityUrl?: string | null): string {
  if (!sanityUrl || sanityUrl === '#') return '#';

  // Already a proxy URL
  if (sanityUrl.startsWith('/api/pdf/')) return sanityUrl;

  // Extract filename from Sanity CDN URL
  // Format: https://cdn.sanity.io/files/{projectId}/{dataset}/{filename}
  const match = sanityUrl.match(/\/files\/[^/]+\/[^/]+\/(.+?)(\?.*)?$/);
  if (match) return `/api/pdf/${match[1]}`;

  return sanityUrl;
}