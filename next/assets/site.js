/* Aurea Hosting, site.js. The menu, the form and the click tracker.
   The page is complete without this file. With JavaScript off there is no menu button, the footer nav carries
   navigation, and the form posts straight to Formspree. */

// Menu. site.js shows the button (it ships hidden), opens the dialog with showModal() and keeps aria-expanded in step.
(function () {
  'use strict';
  var btn = document.querySelector('.menu-btn');
  var dlg = document.getElementById('site-menu');
  if (!btn || !dlg || typeof dlg.showModal !== 'function') return;

  btn.hidden = false;

  btn.addEventListener('click', function () {
    dlg.showModal();
    btn.setAttribute('aria-expanded', 'true');
  });

  dlg.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a, .menu__close');
    if (el && dlg.contains(el)) dlg.close();
  });

  // Escape closes natively. Whatever closes it, the button is told and takes focus back.
  dlg.addEventListener('close', function () {
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  });

  // Tab stays inside the dialog.
  dlg.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var items = dlg.querySelectorAll('a[href], button:not([disabled])');
    var first = items[0];
    var last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // The button is hidden from 1200, so an open menu closes if the window grows past it.
  if (window.matchMedia) {
    window.matchMedia('(min-width: 1200px)').addEventListener('change', function (e) {
      if (e.matches && dlg.open) dlg.close();
    });
  }
})();

(function () {
  'use strict';
  var form = document.getElementById('enquiry');
  var panel = document.getElementById('confirm');
  if (!form || !panel || !window.fetch || !window.FormData) return;

  var status = document.getElementById('form-status');
  var button = form.querySelector('[type=submit]');
  var label = button.textContent;
  var sent = false;

  form.noValidate = true; // our messages sit next to the field, in plain words

  var rules = {
    fullName: function (v) { return v.length > 1 ? '' : 'Enter your name.'; },
    phone: function (v) {
      if (!v) return 'Enter the mobile number we should call.';
      var digits = v.replace(/\D/g, '');
      return /^[\d\s()+.-]+$/.test(v) && digits.length >= 8 && digits.length <= 15 ? '' : 'Check the number. It should look like 0412 345 678.';
    },
    address: function (v) { return v.length > 4 ? '' : 'Enter the address of the home. Street and suburb is enough.'; },
    goLive: function (v) { return v ? '' : 'Choose the closest answer.'; },
    email: function (v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Check the email address, or leave it blank.'; }
  };

  function check(el) {
    var rule = rules[el.name];
    if (!rule) return true;
    var message = rule(el.value.trim());
    var out = document.getElementById(el.id + '-err');
    if (message) {
      el.setAttribute('aria-invalid', 'true');
      out.textContent = message;
      out.hidden = false;
    } else {
      el.removeAttribute('aria-invalid');
      out.hidden = true;
      out.textContent = '';
    }
    return !message;
  }

  // Check a field when the person leaves it, but only once they have typed something.
  form.addEventListener('focusout', function (e) {
    var el = e.target;
    if (rules[el.name] && (el.value.trim() || el.hasAttribute('aria-invalid'))) check(el);
  });
  // Clear an error as soon as it is fixed.
  form.addEventListener('input', function (e) {
    if (e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) check(e.target);
  });

  function say(message) {
    status.textContent = message;
    status.hidden = !message;
  }

  function busy(on) {
    button.disabled = on;
    button.textContent = on ? 'Sending' : label;
  }

  function showPanel(data) {
    var first = String(data.get('fullName') || '').trim().split(/\s+/)[0];
    var later = /^(6mo-plus|exploring)$/.test(data.get('goLive'));
    if (first) document.getElementById('confirm-h').textContent = 'Thanks, ' + first + '. We have your details.';
    if (later) document.getElementById('confirm-next').textContent = 'We will call you, usually the same business day. The first call is about 15 minutes. If your timing is further out, we will set a time to talk again closer to the date.';
    var swap = function () {
      form.hidden = true;
      panel.hidden = false;
    };
    var land = function () {
      panel.focus({ preventScroll: true }); // the panel is read out, and the keyboard carries on from it
      panel.scrollIntoView({ block: 'nearest' });
    };
    var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !calm) document.startViewTransition(swap).updateCallbackDone.then(land, land);
    else { swap(); land(); }
    // A send is counted once, here. Both calls are guarded, so nothing throws where tags.js has not loaded them.
    if (window.gtag) window.gtag('event', 'form_submission', { event_category: 'lead', event_label: 'request_a_call' });
    if (window.fbq) window.fbq('track', 'Lead');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sent || button.disabled) return;

    var bad = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (rules[el.name] && !check(el)) bad.push(el);
    });
    if (bad.length) {
      say(bad.length === 1 ? 'One answer needs another look.' : bad.length + ' answers need another look.');
      bad[0].focus();
      return;
    }
    say('');

    // One id per enquiry, kept across retries, made the same way as the current contact page.
    var sid = document.getElementById('submission_id');
    if (sid && !sid.value) sid.value = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + '-' + Math.random().toString(36).slice(2);

    var data = new FormData(form);
    busy(true);
    fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('send failed');
        sent = true;
        showPanel(data);
      })
      .catch(function () {
        busy(false);
        say('That did not send. Your answers are still here. Try again, or call 0404 608 196.');
      });
  });
})();

// One delegated listener for [data-track]. Phone taps count as Contact and phone_click. Guarded, so it never throws.
document.addEventListener('click', function (e) {
  var el = e.target.closest && e.target.closest('[data-track]');
  if (!el || el.getAttribute('data-track') !== 'call') return;
  try {
    if (typeof window.fbq === 'function') window.fbq('track', 'Contact');
    if (typeof window.gtag === 'function') window.gtag('event', 'phone_click');
  } catch (err) { /* tracking must never block a call */ }
});
