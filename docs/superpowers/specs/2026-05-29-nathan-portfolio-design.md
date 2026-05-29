# Nathan Rubini — Personal Portfolio Design Spec
**Date:** 2026-05-29  
**Status:** Approved  
**Repo:** https://github.com/NathanRubini/Nathan-Personal-Portfolio.git  
**Deploy target:** GitHub Pages

---

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| Styling | Tailwind CSS v3 + shadcn/ui (dark: `class`) |
| Animations | Framer Motion |
| Icons | lucide-react |
| Deploy | `gh-pages` branch via `vite build` |

**shadcn/ui init:** `npx shadcn@latest init` — components path `/src/components/ui`

---

## 2. Visual Design System

Sourced from UI/UX Pro Max + frontend-design skill.

| Token | Value |
|---|---|
| Background | `#ffffff` |
| Text primary | `#0a0a0a` |
| Text secondary | `#334155` |
| Muted | `#94a3b8` |
| Border | `#e2e8f0` |
| Surface | `#f8fafc` |
| Accent blue | `#1d4ed8` |
| Accent green (amounts) | `#16a34a` |
| Display font | Bricolage Grotesque (800, 700, 500) |
| Body font | DM Sans (400, 500, 600) |
| Mono font | DM Mono (400) |

**Style:** Trust & Authority (UI/UX Pro Max) — credentials/metrics front-and-center, clean white, minimal decoration.

---

## 3. Aceternity / Custom Components

All placed in `src/components/ui/`.

### 3a. `aurora-background.tsx`
- Used in the **Hero** section as the full-viewport background
- Light mode: white-gradient + aurora (blue/indigo/violet wash, top-right masked)
- Tailwind config extension required: `animate-aurora` keyframe + `addVariablesForColors` plugin

### 3b. `container-scroll-animation.tsx`
- Used in the **Projects** section to showcase the Hack the Globe live site
- Initial state: `rotateX(20deg)`, `scale(1.05)` — flattens to `rotateX(0)`, `scale(1)` on scroll
- Wraps an iframe/image of `https://hack-the-globe-seven.vercel.app/`

### 3c. `animated-hero.tsx`
- Used inside the Hero section for the rotating role words
- Cycles: **BBA Student → Consultant → Leader → Strategist** (2s interval, spring transition)
- No prefix word — rotating word stands alone under the name

---

## 4. Page Sections (in order)

### Navbar
- Sticky, blur backdrop, `border-bottom`
- Logo: "Nathan Rubini" (Bricolage Grotesque 700)
- Links: About · Experience · Projects · Skills · Contact
- CTA: "Resume ↓" button (dark fill) → links to PDF resume in `/public/`

### Hero
- Full-viewport `AuroraBackground` (light mode)
- 2-column grid: photo left, text right
- **Photo:** `Nathan Rubini-542.jpg` → 280×280px square, `border-radius: 14px`, `object-position: center top`
- **Name:** "Nathan Rubini" — Bricolage Grotesque 800, `~96px`, black, letter-spacing `-4px`, line-height `0.93`
- **Rotating words:** `AnimatedHero` component — BBA Student / Consultant / Leader / Strategist
- **Description:** "BBA Co-op Student at Wilfrid Laurier University, graduating in 2027."
- **CTAs:** "View My Work →" (dark) + "LinkedIn ↗" (outline)

### Stat Strip
- 3-column border grid (no vendor spend stat)
- **11.76/12** GPA · **5** Scholarships · **3** Competition Podiums
- Bricolage Grotesque 800, large numerals, animated count-up on scroll (framer-motion `useInView`)

### Experience
- 2-column layout: logo + meta left, bullets right
- **Companies:** BCG · RBC Capital Markets · RBC Insurance · Ontario Court of Justice
- **Logos** (from `/public/logos/`): `bcg.png` · `rbc-capital-markets.avif` · `rbc-insurance.png` · SVG scales icon
- No metric chip tags — clean bullet points only
- Bullets animated: fade+slide up on scroll via `motion.div` with stagger

### Projects (ContainerScroll)
- Section heading: "Cases & Competition Wins"
- `ContainerScroll` wrapping a screenshot `<img>` of `https://hack-the-globe-seven.vercel.app/` (not an iframe — external iframes break due to X-Frame-Options). Screenshot saved to `/public/hack-the-globe-preview.png`.
- Caption: "2nd Place · Hack the Globe · BCG × Global Spark · January 2026"
- Subtitle: "Basis — Fintech Platform for Gig Worker Credit · 232 students · 21 countries"
- Two buttons: "Live Demo ↗" + "GitHub ↗" (links to `https://github.com/CooperMcKay/Hack-the-Globe`)

### Skills
- Flat tag cloud — `flex-wrap`, `gap-2`
- Tags: Tableau · Excel · PowerPoint · Jira · Confluence · Notion · Slack · PowerShell · AWS AI Tools · Strategic Analysis · Business Analysis · Agile/Scrum · Executive Reporting · Data Visualization · French — DELF B1
- Hover: border turns blue, bg tints blue-50
- French tag: amber background (distinct language category)

### Awards & Scholarships
- 2-column card grid, 8 cards total
- Each card: logo (40×40 in rounded box) + name + org + optional green bold amount + optional italic description

| Award | Logo | Amount |
|---|---|---|
| President's Gold Scholarship × 3 | `donor_image.png` (Laurier) | $4,000 / year |
| TELUS Hal Neldner & Cyrus McLean Scholarship | `telus_logo.png` (text fallback) | $5,000 |
| TELUS Family Scholarship × 2 | `telus_logo.png` | $2,000 / year |
| Loblaw Companies Limited Scholarship | `Loblaws-scaled.webp` | $2,000 |
| 1st Place — LSA HawkTank | `lauriersalesassociation_logo.jpg` | — |
| 2nd Place — Bell Canada Case Competition | `Bell_logo.svg` | — |
| 2nd Place — RBC Insurance Innovation Challenge | `5 (1).png` | — |
| 2nd Place — Hack the Globe (BCG × Global Spark) | `BCG_Corporate_Logo.svg.png` | — |

### Contact
- Dark navy/black background, centered
- Heading: "Let's Connect" with blue accent word
- Subtext: "Open to internships, case competitions, and interesting conversations."
- Buttons: "Send an Email" (white) · "View LinkedIn ↗" (outline)
- Email shown below: `nathan.rubini9@gmail.com`
- Subtle radial blue glow behind text

### Footer
- Same dark background
- "Nathan Rubini" left · "© 2025 · React + Vite · GitHub Pages" right (mono, muted)

---

## 5. Tailwind Config Extensions

```ts
// tailwind.config.ts additions
animation: { aurora: "aurora 60s linear infinite" },
keyframes: {
  aurora: {
    from: { backgroundPosition: "50% 50%, 50% 50%" },
    to:   { backgroundPosition: "350% 50%, 350% 50%" },
  },
},
// addVariablesForColors plugin (exposes all Tailwind colors as CSS vars)
```

---

## 6. File Structure

```
Nathan-Personal-Portfolio/
├── public/
│   ├── Nathan Rubini-542.jpg        # headshot
│   ├── Nathan Rubini Resume.pdf     # downloadable resume
│   └── logos/
│       ├── bcg.png
│       ├── rbc-capital-markets.avif
│       ├── rbc-insurance.png
│       ├── loblaws.webp
│       ├── lsa.jpg
│       ├── bell.svg
│       ├── donor_image.png          # Laurier/Lazaridis
│       └── telus.png                # add when available
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── aurora-background.tsx
│   │       ├── container-scroll-animation.tsx
│   │       ├── animated-hero.tsx
│   │       └── button.tsx           # shadcn Button
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Awards.tsx
│   │   └── Contact.tsx
│   ├── data/
│   │   └── resume.ts                # all real data in one file
│   ├── lib/
│   │   └── utils.ts                 # cn() from shadcn
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts                   # base: '/Nathan-Personal-Portfolio/'
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 7. GitHub Pages Deployment

```ts
// vite.config.ts
base: '/Nathan-Personal-Portfolio/'
```

Deploy command:
```bash
npm run build && npx gh-pages -d dist
```

Or via GitHub Actions: push to `main` → build → deploy `dist/` to `gh-pages` branch.

---

## 8. Pre-Delivery Checklist (UI/UX Pro Max)

- [ ] No emojis as icons — lucide-react SVGs only
- [ ] `cursor-pointer` on all interactive elements
- [ ] Hover states on all cards/buttons (150–300ms transition)
- [ ] All images have `alt` text
- [ ] `prefers-reduced-motion` respected in Framer Motion (`useReducedMotion`)
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] Focus states visible for keyboard nav
