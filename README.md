# AI Video Portfolio

Static portfolio website for an AI Video Specialist.

## Structure
- `index.html` — page layout
- `styles.css` — visual design / responsive styling
- `portfolio-data.js` — project library (easy to update as new videos are added)
- `script.js` — filtering and Google Drive video modal

## Add a new portfolio video
Add a new object to `window.PORTFOLIO_PROJECTS` inside `portfolio-data.js`.

```js
{
  title: "Project title",
  category: "UGC",
  filter: "ugc",
  id: "GOOGLE_DRIVE_FILE_ID",
  desc: "Short description",
  art: "linear-gradient(...)"
}
```

Drive videos are embedded using:
`https://drive.google.com/file/d/FILE_ID/preview`

Make sure each portfolio video is shared so website visitors can view it.

## GitHub Pages deployment
1. Create a GitHub repository.
2. Upload these four files to the repository root.
3. In GitHub: **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. GitHub will provide the public portfolio URL.

## Before publishing
Replace `your@email.com` in `index.html` with the preferred contact email.

## Current portfolio inventory
The current build contains all 51 videos found in the organized Drive portfolio folders at the time of this update, and every video card uses the video's Google Drive-generated thumbnail.

## Cinematic motion
This build includes:
- hero entrance animation
- scroll reveal animations
- staggered project/service cards
- smooth category transitions
- floating featured video stack
- subtle cursor glow on desktop
- hero parallax response
- animated thumbnail loading
- smoother modal open/close
- button and navigation micro-interactions
- `prefers-reduced-motion` accessibility support

## V3.1 playback fix
- Thumbnails no longer start hidden while waiting for JavaScript load events.
- Cached Google Drive thumbnails remain visible.
- Video modal now has safer source clearing.
- Every modal includes an “Open in Google Drive” fallback link.


## V4 featured showcase
Featured work is configured in `featured-data.js`, separate from the full portfolio library.
Current featured projects:
- Nike Dunks Advertisement
- Tired Of Acne
- Creatine Day 1 to Day 50 Timeline

The hero includes previous/next arrows, thumbnail selectors, and an 8-second automatic rotation.

## Contact form
The contact modal uses FormSubmit's AJAX endpoint so a static GitHub Pages site can forward portfolio inquiries to:
`joyculanculanjr@gmail.com`

Important: FormSubmit requires a one-time email confirmation/activation on the first submission. After the endpoint is activated, later portfolio inquiries are delivered to the email inbox.

Discord, Telegram and WhatsApp are supported in the UI through `CONTACT_DETAILS` in `script.js`. They are intentionally hidden until the exact handles/numbers are supplied.


## V5 About Me feature
The About section is now a dedicated profile experience with:
- profile card
- AI Video Specialist role
- creative direction / AI production / post-production specialties
- animated “More about me” modal
- workflow/approach overview
- tool stack
- direct handoff from About modal into the Hire / Contact form

The profile currently uses a clean `JC` monogram. A real profile photo can be added later without changing the layout.


## V6
- About Me is now the homepage/first major content visitors see.
- Featured Work now appears directly after About Me.
- Contact details added:
  - Discord: joyculanculan21 (click to copy)
  - Telegram: @joyculanculan
  - WhatsApp: +63 951 836 4107
- Portfolio cards no longer depend only on Google Drive thumbnail images.
  They now lazy-load the official Google Drive `preview` iframe as a live visual poster.
- The normal click-to-watch modal remains in place.


## V8 — About photo added
- Replaced the JC monogram in the About section with the uploaded portrait image.
- Replaced the modal profile icon with the same real portrait.
- Best used with GitHub Pages deployment or local preview via `START_PORTFOLIO.bat`.


## V9 — premium About copy + GitHub-ready
- Refined About Me copy to sound more personal, premium, and production-focused.
- Added `.nojekyll` for clean static GitHub Pages publishing.
- Added `DEPLOY_TO_GITHUB.md` with deployment steps.


## V11 — email form reliability fix
- Added `_url` with the exact deployed page URL.
- Added `_replyto` so replying to an inquiry targets the visitor.
- Added a normal HTML POST fallback when AJAX fails.
- Added a hidden iframe so fallback submissions do not navigate away from the portfolio.
- Added activation-aware status messages.


## V12 — direct contact-form submission
- Removed FormSubmit AJAX/fetch entirely.
- The browser now POSTs directly to FormSubmit, matching its simplest documented integration.
- Added visitor email as Reply-To.
- Added exact page URL.
- Added local `thank-you.html` return page.
- First use still requires one FormSubmit activation email confirmation.

## V13 — autoplay portfolio previews
- Portfolio cards now use muted, looping HTML5 video previews.
- A preview only loads when its card enters the viewport, reducing unnecessary bandwidth.
- Videos pause automatically when scrolled off-screen.
- Clicking a card still opens the full player for normal viewing/audio.
- Thumbnail and designed fallback remain underneath while a preview loads or if Google Drive cannot provide the stream.
