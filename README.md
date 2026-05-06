# WIN International Education Service

A multi-page React site translated from the Framer mock — built with Vite, React Router, Embla Carousel, and Framer Motion.

## Routes

The navbar wires to five distinct pages, each with its own component and stylesheet:

| Path              | File                          |
| ----------------- | ----------------------------- |
| `/`               | `src/pages/Home.tsx`          |
| `/services`       | `src/pages/Services.tsx`      |
| `/success-story`  | `src/pages/SuccessStory.tsx`  |
| `/contact`        | `src/pages/Contact.tsx`       |
| `/social`         | `src/pages/Social.tsx`        |

## The three Framer primitives

You asked specifically for Slider, Carousel, and Ticker. All three are real interactive components, not static blocks.

- **Carousel** — `WhoWeAreCarousel` + `HomeSpotlightCarousel` (`src/components/`). Embla-based carousels on Home (awards strip + partner spotlight). Success Story uses its own inline story carousel, not a shared `Carousel` component.
- **Ticker** — `src/components/FlagTicker.tsx`. Framer-motion infinite loop with dual-direction support and edge fades. Used on Home (two rows running opposite directions), Services, and Social.
- **Slider** — `src/components/RevealSlider.tsx`. Drag-to-reveal before/after slider using `framer-motion` clip-path. Used on Home in the "Everyone who walks through our door" section.

## Run locally

```bash
npm install
npm run dev      # local dev server (default :5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Production build

The `dist/` folder is included pre-built. Any static host works (Vercel, Netlify, Cloudflare Pages, plain S3+CloudFront). For SPA routing to work with deep links — someone landing directly on `/services` — point all 404s back to `index.html`:

- **Vercel** — works automatically
- **Netlify** — add `_redirects` with `/* /index.html 200`
- **Nginx** — `try_files $uri $uri/ /index.html;`

## Design system

Defined in `src/index.css` as CSS custom properties:

- **Palette** — navy `#0a1f4d` anchored to the WIN brand, paired with a sky-blue accent band, warm paper background, gold accent, and a five-step ink scale.
- **Type** — Fraunces (variable serif, optical-sized for display) + Inter Tight (sans). Loaded from Google Fonts.
- **Motion** — `cubic-bezier(0.22, 1, 0.36, 1)` ease-out as the dominant curve.

## File map

```
src/
├── App.tsx                     # Router + scroll-to-top
├── main.tsx                    # React mount
├── index.css                   # Design tokens, base styles, buttons
├── components/
│   ├── Logo.tsx                # SVG WIN cap+wing mark
│   ├── Navbar.tsx + .css       # Sticky nav with mobile drawer
│   ├── Footer.tsx + .css       # Footer w/ newsletter, partners, socials
│   ├── Hero.tsx + .css         # Landing hero + stat tiles
│   ├── PageHeader.tsx + .css   # Inner page title block w/ index numeral
│   ├── WhoWeAreCarousel.tsx + .css
│   ├── HomeSpotlightCarousel.tsx + .css
│   ├── FlagTicker.tsx + .css   # Infinite country ticker
│   ├── RevealSlider.tsx + .css # Drag before/after slider
│   ├── FAQ.tsx + .css          # Animated accordion
│   └── SocialIcons.tsx         # Brand-mark SVGs (FB / X / LI / IG / YT)
└── pages/
    ├── Home.tsx + .css
    ├── Services.tsx + .css
    ├── SuccessStory.tsx + .css
    ├── Contact.tsx + .css
    └── Social.tsx + .css
```

## Dependencies of note

- `react-router-dom` — five-route SPA
- `embla-carousel-react` — the carousel engine (Hero, Who we are, spotlight)
- `framer-motion` — page transitions, ticker, accordion expand, in-view reveals, drag handle on the slider
- `lucide-react` — UI icons. Note: brand glyphs (Facebook, X, LinkedIn, etc.) were removed in newer Lucide releases, so those marks live inline in `SocialIcons.tsx`.

## Notes for next iteration

- All content (services list, FAQ, stories, posts, partner logos) is hardcoded in the page components. Swap in a CMS, Supabase table, or Markdown frontmatter when ready.
- Hero photo and reveal slider photos use Unsplash hotlinks for the demo. Replace with assets from your own CDN before launch.
- The contact form prevents default and shows a "sent" state but does not post anywhere yet. Wire it up to Formspree / Resend / your backend of choice.
- The newsletter footer form is also stubbed.
- Tracking, analytics, and meta/OG tags are not included — add per your stack.
