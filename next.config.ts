import type { NextConfig } from 'next';

/**
 * Two ways to build the site:
 * - normal (`next build`): a Node server with the waitlist API.
 * - static (`STATIC_EXPORT=true`): plain files for GitHub Pages. There is no server there, so the API route is left out
 *   and the waitlist form is replaced by a "coming soon" note until `NEXT_PUBLIC_WAITLIST_URL` points at a real endpoint.
 */
const staticExport = process.env.STATIC_EXPORT === 'true';
const basePath = process.env.BASE_PATH ?? '';

const config: NextConfig = {
  reactStrictMode: true,
  // Lets components prefix files in /public with the base path (next/image does not do this when unoptimised).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  poweredByHeader: false,
  ...(staticExport
    ? { output: 'export', trailingSlash: true, images: { unoptimized: true }, ...(basePath ? { basePath, assetPrefix: basePath } : {}) }
    : {
        async headers() {
          return [
            {
              source: '/:path*',
              headers: [
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                { key: 'X-Frame-Options', value: 'DENY' },
              ],
            },
          ];
        },
      }),
};

export default config;
