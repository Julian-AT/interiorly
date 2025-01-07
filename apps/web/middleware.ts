import { env } from '@/env';
import { authMiddleware } from '@interiorly/auth/middleware';
import { parseError } from '@interiorly/observability/error';
import { secure } from '@interiorly/security';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@interiorly/security/middleware';
import { type NextMiddleware, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

export default authMiddleware(async (_auth, request) => {
  if (!env.ARCJET_KEY) {
    return securityHeaders();
  }

  try {
    await secure(
      ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW', 'CATEGORY:MONITOR'],
      request
    );

    return securityHeaders();
  } catch (error) {
    const message = parseError(error);

    return NextResponse.json({ error: message }, { status: 403 });
  }
}) as unknown as NextMiddleware;
