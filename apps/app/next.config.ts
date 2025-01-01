import { env } from '@/env';
import { withToolbar } from '@interiorly/feature-flags/lib/toolbar';
import { config, withAnalyzer } from '@interiorly/next-config';
import { withLogtail, withSentry } from '@interiorly/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withToolbar(withLogtail({ ...config }));

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
