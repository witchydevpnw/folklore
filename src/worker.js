// Canonical-host redirects for folkloresocietywa.org, then static assets.
// www and plain http both 301 to https://folkloresocietywa.org (Google Ad Grants
// requires one canonical https address). Everything else is served from the repo.
const CANONICAL_HOST = 'folkloresocietywa.org';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isWww = url.hostname === 'www.' + CANONICAL_HOST;
    const isPlainHttp = url.protocol === 'http:' && url.hostname === CANONICAL_HOST;
    if (isWww || isPlainHttp) {
      return Response.redirect('https://' + CANONICAL_HOST + url.pathname + url.search, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
