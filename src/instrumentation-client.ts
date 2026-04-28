import { initBotId } from 'botid/client/core';

// BotID's `path` matcher is exact — the action's rendered route must match
// or the client never instruments the page, the request carries no token,
// and checkBotId() defaults to isBot:true server-side. We therefore register
// every common localized contact slug rather than a single English default,
// so multi-locale sites work out of the box.
//
// Add more here if a client uses a slug not on this list.
const CONTACT_SLUGS = [
  'contact',   // en, fr, nl, ro
  'kontakt',   // da, de, no, sv, pl, cs, sk, hr, sr, sl
  'contacto',  // es
  'contato',   // pt-br
  'contatti',  // it (plural — most common)
  'contatto',  // it (singular)
  'kapcsolat', // hu
];

initBotId({
  protect: CONTACT_SLUGS.map((slug) => ({
    path: `/*/${slug}`,
    method: 'POST' as const,
  })),
});
