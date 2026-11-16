/* Aurea Hosting, tags.js. The only place analytics tags live.
   Runs on the live host only. Waits for load, then idle time, or the first pointer or key event, whichever is first. */
(function () {
  'use strict';
  if (location.hostname !== 'aureahosting.com.au') return;

  var started = false;

  function start() {
    if (started) return;
    started = true;
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (t) { removeEventListener(t, start, true); });

    // Google tag, loaded once.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-0PHKTBR7RB');
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=G-0PHKTBR7RB';
    document.head.appendChild(g);

    // Meta Pixel.
    if (!window.fbq) {
      var n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!window._fbq) window._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      var f = document.createElement('script');
      f.async = true;
      f.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(f);
    }
    window.fbq('init', '1027065616568144');
    window.fbq('track', 'PageView');
  }

  function armed() {
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 });
    else setTimeout(start, 2000);
  }

  ['pointerdown', 'keydown', 'touchstart'].forEach(function (t) { addEventListener(t, start, { capture: true, once: true, passive: true }); });
  if (document.readyState === 'complete') armed();
  else addEventListener('load', armed);
})();
