# The Avenues Kuwait — Interactive Sales Deck

> A cinematic, browser-based sales tool for The Avenues Kuwait — built for the Liat AI screening assignment.

**Live URL:** https://mall-screening-assignment-eight.vercel.app/
**Subject Property:** The Avenues Kuwait 
**Built for:** Prospective retail tenants, corporate sponsors, and event partners

---

## What This Is

This is not a website. It is a purpose-built, interactive sales deck — the kind a commercial leasing rep can screen-share on a live call or send as a standalone link that a prospect can explore on their own.

The tool replaces the fragmented process of pulling up YouTube videos, flipping through static PDFs, and verbally narrating the property. Instead, it tells the story of The Avenues Kuwait through video, data, imagery, and narrative — with the polish of a luxury brand and the interactivity of a modern web experience.

**Primary audiences:**
- Retail tenants (luxury flagships, mid-tier, pop-up)
- Corporate sponsors and brand partners
- Event promoters and venue bookers

**Business objectives every section serves:**
- Drive retail leasing enquiries
- Drive sponsorship and brand partnership conversations
- Drive event and venue bookings

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Language | JavaScript (JSX) |
| Font | Geist (via `next/font`) |
| Deployment | Vercel  |

---

## Project Structure

```
Mall---Screening-Assignment/
├── app/
│   ├── components/
│   │   └── Navbar.jsx          # Sticky navigation with section anchors
│   ├── globals.css             # Global styles & CSS variables
│   ├── layout.js               # Root layout, font setup
│   └── page.jsx                # Main page — all sections
├── public/
│   ├── images/                 # All property imagery (real )
│   │   ├── luxury/
│   │   └── dining/
│   └── videos/                 # Background and section videos (.mp4 )
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
└── README.md
```

---


## Sections & Architecture

The deck is structured as a single-page, non-linear experience. Users control their own journey via the sticky navbar or in-page anchor links.

| Section | Purpose |
|---|---|
| **Hero** | Cinematic video intro. Immediate emotional impact. Scale + energy within 3 seconds. |
| **Path Selector** | Personalises the experience — Retail / Events / Sponsorship before the user scrolls. |
| **Why The Avenues** | Data-driven property overview. Stats, location, awards, certifications. |
| **12 Districts** | Interactive district explorer. All 12 verified districts with descriptions and enquiry CTAs. |
| **Luxury (Prestige)** | Full-bleed video section for the Prestige district. |
| **Dining & Lifestyle** | Hover-reveal cards + background video strip. |
| **Attractions** | Cinescape, Grand Plaza, SuperPark, Forum Circus  all verified. |
| **Brand Presence** | Tabbed event/activation module with venue chips and enquiry CTA. |
| **Leasing Paths** | Segmented by Luxury / Retail / Dining / Brand Presence each with tailored pitch. |
| **Sponsorship** | Three partnership tiers with hover-animated enquiry buttons. |
| **Final CTA** | Contextual call-to-action — changes based on the user's selected path. |

### Expandability (Phase 2 Ready)

The architecture is modular by design. Each section is a self-contained `<Section id="...">` component. Adding deeper sub-modules requires no rewrite:

- Drop in a new `<Section id="venue-module">` for a dedicated performing arts or expo hall page
- Extend `LEASING_PATHS`, `EVENT_TYPES`, or `SPONSORSHIP_TIERS` arrays to add new content
- The `CTAModal` component is reusable across any new section

---

## Design Decisions

### Visual Direction
Inspired by luxury brand websites  combined with the energy of destination experiences . The palette centres on near-black backgrounds with a warm gold accent (`#c9a96e`) gives the touch of luxury colors.

### Video as Primary Medium
Video is not decoration here  it is the primary storytelling tool. The hero autoplays immediately. Section backgrounds use scroll-triggered video elements. A sound toggle lets users choose immersion level.

### Video Quality (GPU Compositing Fix)
A key technical decision was fixing video quality degradation that occurs in browsers when `<video>` elements are blended with overlapping `<div>` overlays. The fix:
- `transform: translateZ(0)` + `will-change: transform` + `backface-visibility: hidden` on all video elements forces a dedicated GPU compositing layer
- `crossOrigin="anonymous"` prevents the browser from using a lower-quality decode path
- Gradient overlays are always **sibling `<div>`s**, never applied as CSS `filter` or `opacity` directly on the `<video>` tag — mixing filter+video triggers a CPU composite path that drops to 8-bit YUV colour
- WebM source listed first for better compression at equal visual quality
- After doing all this the video quality was still not very high quality .

### Non-Linear Navigation
The sticky `Navbar` component provides instant access to any section. The user path selector (Retail / Events / Sponsorship) dynamically personalises the final CTA without forcing a linear journey.

### Framer Motion
Used for scroll-triggered reveals (`whileInView`), parallax hero scaling (`useScroll` + `useTransform`), and `AnimatePresence` transitions between tabbed content in the Districts, Events, and Leasing sections.

### Data Accuracy
All property facts were verified against the official website, the official Avenues website (`the-avenues.com`), and cross-referenced with Wikipedia. No unverified statistics are used.

**Key verified facts:**
- 12 districts (1st Avenue, 2nd Avenue, Prestige, Grand Avenue, SoKu, The Mall, The Souk, The Arcades, Grand Plaza, Electra, The Forum, The Gardens)
- 1,100+ stores
- 360,000 m² gross land area
- 13,000 parking spaces
- Opened April 2007
- Adjacent to Hilton Garden Inn Kuwait (brand's largest hotel in EMEA) and Waldorf Astoria Kuwait
- ICSC Gold Award winner (Best Shopping Centre, MENA)
- First mall in Kuwait to receive LEED Silver certification
- The Forum Circus: 70 m diameter ETFE roof structure

---

## AI Tools Used

### Claude (Anthropic)
- Used for component architecture, Framer Motion animation logic, Tailwind class composition, and debugging
- Code review, refactoring, and accuracy audit of all content

### ChatGPT (OpenAI)
- For understanding the assigment requirements properly

### stitch AI
- For UI enhancement

---

## Evaluation Criteria — Self Assessment

| Criteria | Weight | What Was Done |
|---|---|---|
| Visual & UX Design | 30% | Luxury dark aesthetic, GPU-optimised video, Framer Motion reveals, hover interactions, non-linear navigation |
| Technical Execution | 25% | Next.js App Router, modular component architecture, lazy loading, GPU compositing fix, WebM/MP4 dual source |
| AI Integration | 15% | Claude , ChatGPT ,  |
| Storytelling & Strategy | 15% | Each section maps to a business objective; user path selector personalises the CTA journey |
| Expandability | 10% | Array-driven data model, self-contained Section components, Phase 2 modules can be added without rewrite |
| Attention to Detail | 5% | Verified facts only, meaningful commit messages, responsive layout, loading states, fallback gradients |

---

## Contact

Submitted by: **Sania Shamsi**  
Repository: [github.com/sania102/Mall---Screening-Assignment](https://github.com/sania102/Mall---Screening-Assignment)  
Submission email: medi@liat.ai
