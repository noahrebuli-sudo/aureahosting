/* Aurea Hosting, next.js. Form handling only.
   The page is complete without this file. With JavaScript off the form posts straight to Formspree. */
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
    // Tags are not loaded on this prototype. When they are, a send is counted once, here.
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
