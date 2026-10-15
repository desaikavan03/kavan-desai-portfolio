# Kavan Desai — Digital Marketing & Creative Portfolio

A responsive static portfolio website built with HTML, CSS and JavaScript.

## Structure
- `index.html` — homepage with introduction, clients, selected work, services, about, process and contact.
- `work.html` — full client/project directory.
- `projects/` — one case-study page per client. Lijjat Khaman House includes its supplied branding gallery.
- `assets/` — portrait, client logos and supplied project images.
- `styles.css` and `script.js` — shared styling and interactions.

## Theme and interactions
- Starts in the original light theme.
- The moon/sun button in the header switches between light and dark themes across every page.
- Theme choice is remembered in the visitor's browser and stays selected while browsing between pages.
- Includes staggered scroll reveals, smoother card/image hovers, button shine, floating portrait details, gentle availability pulse and micro-interactions.
- Uses a higher-contrast 4px scroll progress indicator in light and dark themes.
- Includes a floating “Back to top” control after scrolling; both it and the footer link use explicit smooth scrolling (or instant scrolling when reduced motion is requested).
- Dark mode corrects contrast for the “Strategy · Content · Design” portrait badge.
- Respects the visitor's reduced-motion accessibility setting.
- Includes a typography legibility pass: small reading text, project descriptions, navigation, labels, contact fields and mobile text sizes have been increased for a more consistent reading experience. Tiny lettering inside the decorative campaign-preview graphics is left as part of the artwork.
- The homepage social media client section is a smooth, right-to-left marquee showing each client logo, name and one-line description; these items are display-only and not clickable. The Lijjat Khaman House branding card remains separate and unchanged.

## Preview locally
Open `index.html` in Safari or Chrome. Keep `styles.css`, `script.js`, `work.html`, the `projects/` folder and `assets/` folder in the same extracted website directory.

## Before publishing
1. Submit a test inquiry through the contact form and complete the one-time activation email from FormSubmit. Check spam if it does not arrive.
2. Add approved original posts, reels covers, carousels and campaign screenshots to each client's page as they are selected.
3. Confirm permission to display client logos and supplied work publicly.

The Lijjat Khaman House page currently displays 13 supplied items: four standees, two table stands, four brochure pages and three installed tempo-branding photos. No performance metrics or client outcomes are invented.

## Contact form setup
- WhatsApp contact button uses the public number provided by Kavan.
- Email contact link: `kavand404@gmail.com`.
- The inquiry form is configured with FormSubmit. Email delivery remains subject to FormSubmit's one-time inbox activation and should be tested after deployment.
- Personal Instagram and LinkedIn links are intentionally omitted. Client Instagram links remain in the client roster.


## Updated personal logo
- Replaced the plain “K” monograms in the header and footer with the supplied geometric logo mark.
- Replaced the large letter mark in the About section with the same geometric logo.
- The supplied geometric mark is embedded as a normal image (not a CSS mask) for reliable display when opened locally or hosted. CSS filters recolor it dark in light mode and ivory in dark mode, while the existing gold accents remain.


## Publish with GitHub Pages

1. Create a GitHub repository (for example, `kavan-desai-portfolio`).
2. Upload the contents of this folder to the repository root. Keep `index.html`, `styles.css`, `script.js`, `assets/`, and `projects/` at the root level.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Wait for the Pages deployment to finish; GitHub will show the public website URL in Settings → Pages.

This package is arranged for GitHub Pages: `index.html` is at the root, internal links use relative paths, and `.nojekyll` is included. Test the contact form after publishing; FormSubmit may require a one-time email activation.
