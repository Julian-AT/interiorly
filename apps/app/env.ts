import { keys as analytics } from '@interiorly/analytics/keys';
import { keys as auth } from '@interiorly/auth/keys';
import { keys as collaboration } from '@interiorly/collaboration/keys';
import { keys as database } from '@interiorly/database/keys';
import { keys as email } from '@interiorly/email/keys';
import { keys as flags } from '@interiorly/feature-flags/keys';
import { keys as core } from '@interiorly/next-config/keys';
import { keys as observability } from '@interiorly/observability/keys';
import { keys as security } from '@interiorly/security/keys';
import { keys as webhooks } from '@interiorly/webhooks/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [
    auth(),
    analytics(),
    collaboration(),
    core(),
    database(),
    email(),
    flags(),
    observability(),
    security(),
    webhooks(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
});
