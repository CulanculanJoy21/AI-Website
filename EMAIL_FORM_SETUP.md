# EMAIL FORM FIX — V11

The contact form now has two delivery methods:

1. **AJAX delivery** to FormSubmit.
2. **Normal HTML POST fallback** into a hidden iframe if AJAX fails.

It also sends the exact GitHub Pages URL in `_url`, which FormSubmit recommends for
"Unable to submit form" errors.

## One-time activation

FormSubmit requires the owner email to be confirmed once.

After deploying V11:

1. Open your live GitHub Pages website.
2. Fill in the contact form and press **Send message**.
3. Open `joyculanculanjr@gmail.com`.
4. Look for the FormSubmit activation/confirmation email.
5. Check Spam/Junk if it is not in Inbox.
6. Click the confirmation link.

After that, future portfolio inquiries should arrive directly in the inbox.

FormSubmit says unconfirmed submissions are retained temporarily and delivered after activation.

## Testing

After confirming the activation email:
- open your live GitHub Pages URL in an incognito/private window
- send a test inquiry using another email address
- verify it arrives at `joyculanculanjr@gmail.com`
