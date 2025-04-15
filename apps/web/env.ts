import { keys as email } from '@interiorly/email/keys';
import { keys as flags } from '@interiorly/feature-flags/keys';
import { keys as core } from '@interiorly/next-config/keys';
import { keys as observability } from '@interiorly/observability/keys';
import { keys as rateLimit } from '@interiorly/rate-limit/keys';
import { keys as security } from '@interiorly/security/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [core(), email(), observability(), flags(), security(), rateLimit()],
  server: {},
  client: {},
  runtimeEnv: {},
});
