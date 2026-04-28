import { initBotId } from 'botid/client/core';

// Protect both English ("contact") and Danish ("kontakt") locale paths.
// Action paths must match the actual rendered route or the client never
// installs the classifier — BotID then defaults to isBot:true server-side.
initBotId({
  protect: [
    { path: '/*/contact', method: 'POST' },
    { path: '/*/kontakt', method: 'POST' },
  ],
});
