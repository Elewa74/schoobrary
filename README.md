# Schoobrary Website

Static bilingual marketing website for Schoobrary. The site is plain HTML, CSS, and JavaScript, so it can be hosted directly on GitHub Pages, Netlify, Vercel, or any static hosting provider.

## Included pages
- Home: `index.html`, `index-ar.html`
- About: `about.html`, `about-ar.html`
- Libraries: `libraries.html`, `libraries-ar.html`
- Question Bank: `question-bank.html`, `question-bank-ar.html`
- Integrations: `integrations.html`, `integrations-ar.html`
- Schools: `schools.html`, `schools-ar.html`
- Teachers: `teachers.html`, `teachers-ar.html`
- Students & Parents: `students.html`, `students-ar.html`
- Contact: `contact.html`, `contact-ar.html`
- Legal: `legal.html`, `legal-ar.html`

## Features
- English and Arabic navigation
- Working EN/AR language switcher across page pairs
- Lightweight site search
- Arabic typography using Cairo
- No Publishers, Pricing, or Contact Sales flow
- Responsive layout
- Mouse-follow hero spotlight reveal on desktop
- Static ambient hero fallback on mobile/reduced-motion
- Distinctive digital transformation hero visual
- Animated counters
- Scroll reveal animations
- Demo request form confirmation

## How to run
Open `index.html` in a browser, or serve the folder with a local static server.

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages

After pushing this folder to GitHub:

1. Open the repository settings.
2. Go to Pages.
3. Set Source to `Deploy from a branch`.
4. Select branch `main` and folder `/root`.
5. Save. GitHub will publish the site at `https://OWNER.github.io/REPOSITORY/`.

## Developer Notes

- Main stylesheet: `assets/css/styles.css`
- Main script: `assets/js/main.js`
- Image assets: `assets/img/`
- The `ready to dev/` folder is ignored because it is a duplicate export copy, not the source that should be maintained.
