import { env } from '@/env';
import { withToolbar } from '@interiorly/feature-flags/lib/toolbar';
import { config, withAnalyzer } from '@interiorly/next-config';
import { withLogtail, withSentry } from '@interiorly/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withToolbar(withLogtail({ ...config }));

nextConfig.images?.remotePatterns?.push(
  {
    protocol: 'https',
    hostname: 'assets.basehub.com',
  },
  {
    protocol: 'https',
    hostname: 'randomuser.me',
  }
);

if (process.env.NODE_ENV === 'production') {
  const redirects: NextConfig['redirects'] = async () => [
    {
      source: '/legal',
      destination: '/legal/privacy',
      statusCode: 301,
    },
  ];

  nextConfig.redirects = redirects;
}

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig as unknown as NextConfig;
