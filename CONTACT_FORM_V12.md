# V12 CONTACT FORM — IMPORTANT

V12 removes the AJAX email logic completely.

The contact form now uses FormSubmit's simplest documented method:

```html
<form action="https://formsubmit.co/joyculanculanjr@gmail.com" method="POST">
```

This means the browser itself submits the form directly to FormSubmit. There is no JavaScript fetch/CORS layer that can fail.

## First submission only

FormSubmit requires one activation for `joyculanculanjr@gmail.com`.

1. Deploy V12 to GitHub Pages.
2. Open the LIVE GitHub Pages site.
3. Send one test message.
4. Open `joyculanculanjr@gmail.com`.
5. Find the FormSubmit activation email (check Spam/Junk too).
6. Click the activation/confirmation link.
7. Send another test inquiry.

After activation, normal inquiries are forwarded to your inbox.

## Successful submissions

After a successful normal submission, visitors return to:

`thank-you.html`

This page is included in V12.
