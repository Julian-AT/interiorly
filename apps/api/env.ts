import { keys as analytics } from '@interiorly/analytics/keys';
import { keys as auth } from '@interiorly/auth/keys';
import { keys as database } from '@interiorly/database/keys';
import { keys as email } from '@interiorly/email/keys';
import { keys as core } from '@interiorly/next-config/keys';
import { keys as observability } from '@interiorly/observability/keys';
import { keys as payments } from '@interiorly/payments/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [
    auth(),
    analytics(),
    core(),
    database(),
    email(),
    observability(),
    payments(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
});
