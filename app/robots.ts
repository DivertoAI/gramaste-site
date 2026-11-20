import type { MetadataRoute } from 'next';

// Needed so the static (GitHub Pages) build can include this file.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' } };
}
