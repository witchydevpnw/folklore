/*
 * analytics-events.js: GA4 click events for Folklore Society.
 * One delegated listener, so it covers any donate or directions link on any
 * page, including ones added later. Loaded after the Google tag in <head>.
 *   donate_click   any link to zeffy.com (fund: author_fund or general)
 *   get_directions any Google Maps link
 */
(function () {
  function isZeffy(url) {
    return /(^|\.)zeffy\.com$/i.test(url.hostname);
  }
  function isMaps(url) {
    var host = url.hostname.toLowerCase();
    var path = url.pathname.toLowerCase();
    return host === 'maps.google.com' ||
      host === 'maps.app.goo.gl' ||
      (host === 'goo.gl' && path.indexOf('/maps') === 0) ||
      (/(^|\.)google\.[a-z.]+$/.test(host) && path.indexOf('/maps') === 0);
  }
  function fundFor(url, text) {
    var haystack = (url.href + ' ' + text).toLowerCase();
    // The Author Fund's Zeffy form lives at /donation-form/support-literacy-events.
    if (/author[\s_-]*fund/.test(haystack) || haystack.indexOf('support-literacy-events') !== -1) {
      return 'author_fund';
    }
    return 'general';
  }
  function onClick(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    if (typeof window.gtag !== 'function') return;
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    var url;
    try { url = new URL(link.href, window.location.href); } catch (e) { return; }
    var text = (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100);
    var params = {
      link_url: url.href,
      link_text: text,
      page_path: window.location.pathname,
      transport_type: 'beacon'
    };
    if (isZeffy(url)) {
      params.fund = fundFor(url, text);
      window.gtag('event', 'donate_click', params);
    } else if (isMaps(url)) {
      window.gtag('event', 'get_directions', params);
    }
  }
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
})();
