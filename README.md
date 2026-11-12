# Aurea Hosting

This is the static marketing website for Aurea Hosting, an Adelaide short-term rental (Airbnb) property management business, served at https://aureahosting.com.au.

## Site structure

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/why-us` | Why Us |
| `/services` | Services |
| `/areas` | Areas |
| `/faq` | FAQ |
| `/report` | Free yield report |
| `/contact` | Application form |
| `/privacy` | Privacy policy |

## Contact form

`contact.html` submits via Formspree (endpoint `https://formspree.io/f/xkopyjkj`) using a `fetch` POST with `FormData`. The form includes a honeypot field (`_gotcha`) to filter spam. Before submission, a client-generated `submission_id` is attached as a hidden field, populated with `crypto.randomUUID()` and a timestamp fallback for browsers that do not support it.

## Analytics

The site loads the following analytics integrations:

- Google Analytics (gtag)
- Google Ads conversion tracking
- Meta Pixel
