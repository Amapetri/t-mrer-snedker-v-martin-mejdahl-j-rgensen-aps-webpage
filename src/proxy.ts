import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

// Exclude any path that starts with a UUID segment. BotID's challenge
// script and proxy URLs live under a UUID-prefixed path
// (/149e9513-.../2d206a39-.../...), set up by withBotId in next.config.ts.
// Without this exclusion next-intl prepends the locale, the BotID rewrite
// no longer matches, c.js 404s, and the form's checkBotId() defaults to
// isBot:true (or throws). Matching the UUID *shape* instead of the literal
// prefix means we survive any future Vercel rotation of the BotID prefix.
export const config = {
  matcher: [
    '/((?!api|_next|images|videos|favicon.ico|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}).*)',
  ],
};
