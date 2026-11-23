// Canonical-host redirects for folkloresocietywa.org, then static assets.
// www and plain http both 301 to https://folkloresocietywa.org (Google Ad Grants
// requires one canonical https address). Everything else is served from the repo.
const CANONICAL_HOST = 'folkloresocietywa.org';

// Old program pages that now live on /programs. These answer with a real 301
// instead of a stub page that redirects in the browser.
const MOVED_PAGES = {
  '/round-table': '/programs#round-table',
  '/round-table/': '/programs#round-table',
  '/round-table.html': '/programs#round-table',
  '/shelf-life': '/programs',
  '/shelf-life/': '/programs',
  '/shelf-life.html': '/programs',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isWww = url.hostname === 'www.' + CANONICAL_HOST;
    const isPlainHttp = url.protocol === 'http:' && url.hostname === CANONICAL_HOST;
    if (isWww || isPlainHttp) {
      return Response.redirect('https://' + CANONICAL_HOST + url.pathname + url.search, 301);
    }
    const moved = MOVED_PAGES[url.pathname];
    if (moved) {
      return Response.redirect('https://' + CANONICAL_HOST + moved, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
