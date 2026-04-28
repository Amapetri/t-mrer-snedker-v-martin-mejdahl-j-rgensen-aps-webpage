import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

// The 149e9513-... segment is BotID's well-known prefix for the challenge
// script and proxy paths (set up by withBotId in next.config.ts). Without
// excluding it here, next-intl prepends the locale, the rewrite no longer
// matches, c.js 404s, and the form submission server-side defaults to
// isBot:true (or throws).
export const config = {
  matcher: ['/((?!api|_next|images|videos|favicon.ico|149e9513-01fa-4fb0-aad4-566afd725d1b).*)']
};
