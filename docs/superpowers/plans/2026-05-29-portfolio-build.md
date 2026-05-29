# Nathan Rubini Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a production-ready personal portfolio site to GitHub Pages using Vite + React + TypeScript + Tailwind + shadcn/ui with Framer Motion animations.

**Architecture:** Single-page React app with one `App.tsx` that composes section components in order. All resume data lives in `src/data/resume.ts` — section components import from there, never hardcode content. Aceternity UI components (`AuroraBackground`, `ContainerScroll`, `AnimatedHero`) live in `src/components/ui/` alongside shadcn components.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS v3, shadcn/ui, Framer Motion, lucide-react

**Working directory for all commands:** `C:\Users\natha\OneDrive\Documentos\Personal Portfolio`

---

## File Map

| File | Responsibility |
|---|---|
| `src/data/resume.ts` | Single source of truth for all content |
| `src/components/ui/aurora-background.tsx` | Aceternity aurora animated background |
| `src/components/ui/container-scroll-animation.tsx` | Aceternity 3D scroll card |
| `src/components/ui/animated-hero.tsx` | Rotating words component |
| `src/components/ui/button.tsx` | shadcn Button |
| `src/components/Navbar.tsx` | Sticky nav with resume download |
| `src/sections/Hero.tsx` | AuroraBackground + photo + AnimatedHero |
| `src/sections/Stats.tsx` | 3-col stat strip with count-up |
| `src/sections/Experience.tsx` | Company logo + bullets grid |
| `src/sections/Projects.tsx` | ContainerScroll wrapping Hack the Globe screenshot |
| `src/sections/Skills.tsx` | Tag cloud |
| `src/sections/Awards.tsx` | 2-col award card grid |
| `src/sections/Contact.tsx` | Dark contact + footer |
| `src/App.tsx` | Composes all sections |
| `src/index.css` | Tailwind directives + font imports + CSS vars |
| `tailwind.config.ts` | Aurora keyframe + color variable plugin |
| `vite.config.ts` | GitHub Pages base path |
| `public/` | Headshot, resume PDF, all logos |

---

## Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`

- [ ] **Step 1: Scaffold Vite project in current directory**

```bash
npm create vite@latest . -- --template react-ts
```

When prompted "Current directory is not empty. Continue?" → select **"Ignore files and continue"**.

- [ ] **Step 2: Install core dependencies**

```bash
npm install
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot
```

- [ ] **Step 3: Install and init Tailwind CSS**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 4: Init shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

This creates `src/lib/utils.ts` and updates `tailwind.config.ts`.

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git init
git remote add origin https://github.com/NathanRubini/Nathan-Personal-Portfolio.git
git add package.json vite.config.ts tsconfig.json index.html src/
git commit -m "feat: scaffold Vite React TS project with shadcn"
```

---

## Task 2: Configure Tailwind + fonts + CSS variables

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/index.css`

- [ ] **Step 1: Replace `tailwind.config.ts` with full config including aurora animation**

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: "50% 50%, 50% 50%" },
          to:   { backgroundPosition: "350% 50%, 350% 50%" },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }: { addBase: (obj: Record<string, Record<string, string>>) => void; theme: (key: string) => Record<string, string> }) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));
  addBase({ ":root": newVars });
}

export default config;
```

- [ ] **Step 2: Replace `src/index.css` with font imports + Tailwind directives**

```css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@300;400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 4%;
    --border: 214 32% 91%;
    --muted: 215 16% 47%;
    --blue: 221 83% 53%;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { @apply bg-white text-slate-900 font-body antialiased; }
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: `dist/` folder created, no errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/index.css
git commit -m "feat: configure Tailwind with aurora animation and Google Fonts"
```

---

## Task 3: Copy Aceternity UI components

**Files:**
- Create: `src/components/ui/aurora-background.tsx`
- Create: `src/components/ui/container-scroll-animation.tsx`
- Create: `src/components/ui/animated-hero.tsx`
- Create: `src/components/ui/button.tsx`

- [ ] **Step 1: Create `src/components/ui/aurora-background.tsx`**

```tsx
// src/components/ui/aurora-background.tsx
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-screen items-center justify-center bg-white text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
              [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
              [background-image:var(--white-gradient),var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[10px] invert
              after:content-[""] after:absolute after:inset-0
              after:[background-image:var(--white-gradient),var(--aurora)]
              after:[background-size:200%,_100%]
              after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
              pointer-events-none
              absolute -inset-[10px] opacity-50 will-change-transform`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          />
        </div>
        {children}
      </div>
    </main>
  );
};
```

- [ ] **Step 2: Create `src/components/ui/container-scroll-animation.tsx`**

```tsx
// src/components/ui/container-scroll-animation.tsx
"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale  = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
        <ScrollHeader translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
};

const ScrollHeader = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => (
  <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center">
    {titleComponent}
  </motion.div>
);

const ScrollCard = ({
  rotate, scale, children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
    }}
    className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
      {children}
    </div>
  </motion.div>
);
```

- [ ] **Step 3: Create `src/components/ui/animated-hero.tsx`**

```tsx
// src/components/ui/animated-hero.tsx
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedRoleProps {
  titles: string[];
  intervalMs?: number;
}

export function AnimatedRole({ titles, intervalMs = 2000 }: AnimatedRoleProps) {
  const [index, setIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, intervalMs);
    return () => clearTimeout(id);
  }, [index, titles, intervalMs]);

  return (
    <span className="relative inline-block overflow-hidden h-[1.1em] align-bottom min-w-[200px]">
      {titles.map((title, i) => (
        <motion.span
          key={title}
          className="absolute font-semibold text-slate-700"
          initial={{ opacity: 0, y: 40 }}
          animate={
            index === i
              ? { y: 0, opacity: 1 }
              : { y: index > i ? -60 : 60, opacity: 0 }
          }
          transition={
            shouldReduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 60, damping: 14 }
          }
        >
          {title}
        </motion.span>
      ))}
    </span>
  );
}
```

- [ ] **Step 4: Ensure `src/components/ui/button.tsx` exists (shadcn init creates it — verify)**

```bash
ls src/components/ui/button.tsx
```

If missing, create it:

```tsx
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        outline: "border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "hover:bg-slate-100",
        link: "text-slate-900 underline-offset-4 hover:underline",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat: add Aceternity UI components and shadcn Button"
```

---

## Task 4: Copy public assets + create data file

**Files:**
- Create: `src/data/resume.ts`
- Copy assets to `public/`

- [ ] **Step 1: Create `public/logos/` directory and copy logo files**

Run in PowerShell:
```powershell
New-Item -ItemType Directory -Force public/logos
Copy-Item "BCG_Corporate_Logo.svg.png"         "public/logos/bcg.png"
Copy-Item "eNgoDCpG4U6oyzmoxxTOYwMm.avif"     "public/logos/rbc-capital-markets.avif"
Copy-Item "5 (1).png"                          "public/logos/rbc-insurance.png"
Copy-Item "donor_image.png"                    "public/logos/laurier.png"
Copy-Item "Bell_logo.svg"                      "public/logos/bell.svg"
Copy-Item "lauriersalesassociation_logo.jpg"   "public/logos/lsa.jpg"
Copy-Item "Loblaws-scaled.webp"                "public/logos/loblaws.webp"
Copy-Item "Nathan Rubini-542.jpg"              "public/headshot.jpg"
Copy-Item "Nathan Rubini Resume.docx"          "public/Nathan-Rubini-Resume.pdf"
```

Note: For the TELUS logo — when obtained, save as `public/logos/telus.png`.
Note: Take a screenshot of `https://hack-the-globe-seven.vercel.app/` and save as `public/hack-the-globe-preview.jpg`.

- [ ] **Step 2: Create `src/data/resume.ts`**

```ts
// src/data/resume.ts

export const PERSONAL = {
  name: "Nathan Rubini",
  email: "nathan.rubini9@gmail.com",
  linkedin: "https://www.linkedin.com/in/nathan-rubini",
  github: "https://github.com/NathanRubini",
  description: "BBA Co-op Student at Wilfrid Laurier University, graduating in 2027.",
  roleTitles: ["BBA Student", "Consultant", "Leader", "Strategist"],
  resumeUrl: "/Nathan-Rubini-Resume.pdf",
  headshotUrl: "/headshot.jpg",
};

export const STATS = [
  { value: "11.76", suffix: "/12", label: "GPA" },
  { value: "5",     suffix: "",    label: "Scholarships Awarded" },
  { value: "3",     suffix: "",    label: "Competition Podiums" },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  logoUrl: string;
  bullets: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: "Boston Consulting Group",
    role: "Centre for Canada's Future — Intern",
    period: "Jan – Apr 2026",
    location: "Toronto, ON",
    logoUrl: "/logos/bcg.png",
    bullets: [
      "Built executive decks on Canadian trade, AI & economic policy — contributing to a published BCG report analyzing 50+ export categories and 2 national opinion articles",
      "Independently sourced 250+ board chairs across Canada's largest enterprises for BCG's AI board upskilling initiative",
      "Built an impact measurement dashboard tracking 4 metric categories — shared as best practice by BCG teams across the US and Europe",
      "Launched the division's first senior partner newsletter reaching 40+ executives across Canada",
    ],
  },
  {
    company: "RBC Capital Markets",
    role: "Productivity & Efficiency — Summer Analyst",
    period: "May – Aug 2025",
    location: "Toronto, ON",
    logoUrl: "/logos/rbc-capital-markets.avif",
    bullets: [
      "Built Tableau dashboards tracking $200M+ in vendor spend, enabling leadership to identify trends and make data-driven cost optimization decisions",
      "Designed a leadership reporting tool organizing 80+ KPIs across 15+ teams for monthly Managing Director presentations",
      "Automated tracking of 50+ stock exchanges across 3 countries using AI and PowerShell, saving 8+ hours per week",
      "Delivered 4 monthly presentations to Managing Directors, translating complex data into actionable insights",
    ],
  },
  {
    company: "RBC Insurance",
    role: "Summer Product Analyst",
    period: "May – Aug 2024",
    location: "Mississauga, ON",
    logoUrl: "/logos/rbc-insurance.png",
    bullets: [
      "Presented competitor digital app analyses to Senior Leadership — resulting in implementation of new product features",
      "Guided a 20-member agile team by writing 10+ user stories in Jira, defining acceptance criteria and business requirements",
      "Co-designed a chatbot prototype using AWS AI tools to streamline the insurance application process and improve customer engagement",
    ],
  },
  {
    company: "Ontario Court of Justice",
    role: "Court Administration Clerk",
    period: "Jul – Sep 2023",
    location: "Mississauga, ON",
    logoUrl: "",
    bullets: [
      "Supported court administration operations and case file management in a high-volume judicial environment",
      "Coordinated scheduling, documentation, and procedural support across active court proceedings",
    ],
  },
];

export const SKILLS = [
  "Tableau", "Microsoft Excel", "PowerPoint", "Jira", "Confluence",
  "Notion", "Slack", "PowerShell", "AWS AI Tools", "Strategic Analysis",
  "Business Analysis", "Agile / Scrum", "Executive Reporting", "Data Visualization",
];

export const LANGUAGES = ["French — DELF B1"];

export interface Award {
  name: string;
  org: string;
  logoUrl: string;
  amount?: string;
  description?: string;
}

export const AWARDS: Award[] = [
  {
    name: "President's Gold Scholarship × 3",
    org: "Wilfrid Laurier University · Renewed annually",
    logoUrl: "/logos/laurier.png",
    amount: "$4,000 / year",
  },
  {
    name: "TELUS Hal Neldner & Cyrus McLean Scholarship",
    org: "TELUS Corporation",
    logoUrl: "/logos/telus.png",
    amount: "$5,000",
  },
  {
    name: "TELUS Family Scholarship × 2",
    org: "TELUS Corporation",
    logoUrl: "/logos/telus.png",
    amount: "$2,000 / year",
  },
  {
    name: "Loblaw Companies Limited Scholarship",
    org: "Loblaw Companies",
    logoUrl: "/logos/loblaws.webp",
    amount: "$2,000",
  },
  {
    name: "1st Place — LSA HawkTank Pitch Competition",
    org: "Laurier Sales Association · January 2024",
    logoUrl: "/logos/lsa.jpg",
    description: "Developed a sales pitch in 30 minutes for a surprise product, identifying needs and presenting a persuasive solution.",
  },
  {
    name: "2nd Place — Bell Canada Case Competition",
    org: "Business Entertainment Laurier · January 2025",
    logoUrl: "/logos/bell.svg",
    description: "Developed a strategic plan in 24 hours to help Bell better target Gen-Z audiences amid declining cable usage.",
  },
  {
    name: "2nd Place — RBC Insurance Summer Student Innovation Challenge",
    org: "RBC Insurance · August 2024",
    logoUrl: "/logos/rbc-insurance.png",
    description: "Built a chatbot prototype in two months to streamline insurance applications and improve customer engagement.",
  },
  {
    name: "2nd Place — Hack the Globe (BCG × Global Spark)",
    org: "BCG · January 2026",
    logoUrl: "/logos/bcg.png",
    description: "Built Basis, a fintech platform improving credit for gig workers. 232 students across 21 countries.",
  },
];
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add public/ src/data/
git commit -m "feat: add public assets and resume data file"
```

---

## Task 5: Build Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create `src/components/Navbar.tsx`**

```tsx
// src/components/Navbar.tsx
import { PERSONAL } from "@/data/resume";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-[60px] px-16 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <span className="font-display font-bold text-[15px] text-slate-900">
        Nathan Rubini
      </span>
      <ul className="hidden md:flex gap-7 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="font-body text-[13px] font-medium text-slate-400 hover:text-slate-900 transition-colors duration-150 cursor-pointer"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={PERSONAL.resumeUrl}
        download
        className="font-body text-[13px] font-semibold bg-slate-900 text-white px-[18px] py-2 rounded-lg hover:opacity-85 transition-opacity cursor-pointer"
      >
        Resume ↓
      </a>
    </nav>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add sticky Navbar with resume download"
```

---

## Task 6: Build Hero section

**Files:**
- Create: `src/sections/Hero.tsx`

- [ ] **Step 1: Create `src/sections/Hero.tsx`**

```tsx
// src/sections/Hero.tsx
import { motion, useReducedMotion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AnimatedRole } from "@/components/ui/animated-hero";
import { PERSONAL } from "@/data/resume";

export function Hero() {
  const shouldReduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
    visible: (delay: number) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay, ease: "easeOut" },
    }),
  };

  return (
    <section id="about">
      <AuroraBackground className="!h-screen !items-center !justify-start px-16">
        <div className="grid grid-cols-[280px_1fr] gap-18 items-center max-w-[1120px] w-full mx-auto pt-16">
          {/* Photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <img
              src={PERSONAL.headshotUrl}
              alt="Nathan Rubini"
              className="w-[280px] h-[280px] rounded-[14px] object-cover object-top border border-slate-200 shadow-[0_20px_56px_rgba(0,0,0,0.09),0_4px_14px_rgba(0,0,0,0.05)]"
            />
          </motion.div>

          {/* Text */}
          <div className="flex flex-col justify-center gap-0">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="font-display font-extrabold text-black leading-[0.93] tracking-[-4px] text-[clamp(60px,7vw,96px)] mb-5"
            >
              Nathan<br />Rubini
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="font-display text-[clamp(20px,2.5vw,26px)] font-medium text-slate-500 tracking-[-0.3px] mb-5 h-[40px] flex items-center"
            >
              <AnimatedRole titles={PERSONAL.roleTitles} />
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="font-body text-[15px] text-slate-400 leading-relaxed max-w-[360px] mb-8"
            >
              {PERSONAL.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="flex gap-3 flex-wrap"
            >
              <a
                href="#experience"
                className="font-body text-[14px] font-semibold bg-slate-900 text-white px-[26px] py-3 rounded-[9px] hover:opacity-85 transition-opacity cursor-pointer"
              >
                View My Work →
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[14px] font-medium bg-white text-slate-900 px-[26px] py-3 rounded-[9px] border border-slate-200 hover:border-slate-400 transition-colors cursor-pointer"
              >
                LinkedIn ↗
              </a>
            </motion.div>
          </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/Hero.tsx
git commit -m "feat: add Hero section with AuroraBackground and AnimatedRole"
```

---

## Task 7: Build Stats strip

**Files:**
- Create: `src/sections/Stats.tsx`

- [ ] **Step 1: Create `src/sections/Stats.tsx`**

```tsx
// src/sections/Stats.tsx
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { STATS } from "@/data/resume";

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className="grid border-t border-slate-200"
      style={{ gridTemplateColumns: `repeat(${STATS.length}, 1fr)` }}
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`py-8 text-center hover:bg-slate-50 transition-colors ${i < STATS.length - 1 ? "border-r border-slate-200" : ""}`}
        >
          <div className="font-display font-extrabold text-[38px] tracking-[-2px] leading-none text-slate-900">
            {stat.value}
            <em className="not-italic font-normal text-[18px] text-slate-400">{stat.suffix}</em>
          </div>
          <div className="font-mono text-[8px] tracking-[2px] uppercase text-slate-400 mt-2">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/Stats.tsx
git commit -m "feat: add Stats strip with scroll-triggered fade"
```

---

## Task 8: Build Experience section

**Files:**
- Create: `src/sections/Experience.tsx`

- [ ] **Step 1: Create `src/sections/Experience.tsx`**

```tsx
// src/sections/Experience.tsx
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EXPERIENCE, type Experience as Exp } from "@/data/resume";

function ScalesIcon() {
  return (
    <svg viewBox="0 0 44 44" width="32" height="32" fill="none" className="text-slate-500">
      <line x1="22" y1="5" x2="22" y2="39" stroke="currentColor" strokeWidth="1.8" />
      <line x1="7" y1="13" x2="37" y2="13" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="21" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="37" cy="21" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="15" y1="39" x2="29" y2="39" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ExpRow({ exp, index }: { exp: Exp; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="grid grid-cols-[220px_1fr] gap-13 py-12 border-t border-slate-200 items-start"
    >
      {/* Left: logo + meta */}
      <div className="flex flex-col gap-2.5">
        <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
          {exp.logoUrl ? (
            <img src={exp.logoUrl} alt={exp.company} className="w-full h-full object-contain" />
          ) : (
            <ScalesIcon />
          )}
        </div>
        <p className="font-display font-bold text-[15px] text-slate-900 tracking-[-0.3px] leading-snug">
          {exp.company}
        </p>
        <p className="font-mono text-[9px] tracking-[1px] uppercase text-blue-700 leading-relaxed">
          {exp.role}
        </p>
        <p className="font-mono text-[9px] text-slate-400">
          {exp.period} · {exp.location}
        </p>
      </div>

      {/* Right: bullets */}
      <ul className="flex flex-col gap-2.5 mt-1">
        {exp.bullets.map((bullet) => (
          <li key={bullet} className="relative font-body text-[13px] text-slate-600 leading-relaxed pl-4">
            <span className="absolute left-0 top-[10px] w-[5px] h-px bg-slate-300 inline-block" />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="border-t border-slate-200">
      <div className="px-16 py-22 max-w-[1120px] mx-auto">
        <p className="font-mono text-[9px] tracking-[3px] uppercase text-blue-700 mb-1.5 flex items-center gap-2">
          <span className="inline-block w-[18px] h-px bg-blue-700" />
          Career
        </p>
        <h2 className="font-display font-extrabold text-[clamp(30px,3.5vw,44px)] tracking-[-2px] text-slate-900 mb-13">
          Professional Experience
        </h2>
        <div>
          {EXPERIENCE.map((exp, i) => (
            <ExpRow key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/Experience.tsx
git commit -m "feat: add Experience section with logos and animated bullets"
```

---

## Task 9: Build Projects section (ContainerScroll)

**Files:**
- Create: `src/sections/Projects.tsx`

- [ ] **Step 1: Take a screenshot of `https://hack-the-globe-seven.vercel.app/` and save to `public/hack-the-globe-preview.jpg`**

Use any browser screenshot tool. Full-page or viewport, minimum 1400px wide.

- [ ] **Step 2: Create `src/sections/Projects.tsx`**

```tsx
// src/sections/Projects.tsx
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function Projects() {
  return (
    <section id="projects" className="bg-slate-50 border-t border-slate-200">
      <div className="px-16 pt-22 max-w-[1120px] mx-auto text-center">
        <p className="font-mono text-[9px] tracking-[3px] uppercase text-blue-700 mb-1.5 flex items-center justify-center gap-2">
          Projects
        </p>
        <h2 className="font-display font-extrabold text-[clamp(28px,3.5vw,42px)] tracking-[-2px] text-slate-900">
          Cases & Competition Wins
        </h2>
      </div>

      <ContainerScroll
        titleComponent={<span />}
      >
        <img
          src="/hack-the-globe-preview.jpg"
          alt="Hack the Globe — Basis fintech platform"
          className="w-full h-full object-cover object-top rounded-xl"
          draggable={false}
        />
      </ContainerScroll>

      {/* Caption below scroll card */}
      <div className="text-center pb-16 px-4">
        <p className="font-mono text-[8px] tracking-[2px] uppercase text-slate-400">
          2nd Place · Hack the Globe · BCG × Global Spark · January 2026
        </p>
        <h3 className="font-display font-extrabold text-[20px] tracking-[-0.5px] text-slate-900 mt-1">
          Basis — Fintech Platform for Gig Worker Credit
        </h3>
        <p className="font-body text-[12px] text-slate-400 mt-1">
          Competed against 232 students across 21 countries
        </p>
        <div className="flex gap-2.5 justify-center mt-3.5">
          <a
            href="https://hack-the-globe-seven.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] font-semibold bg-slate-900 text-white px-[22px] py-2 rounded-lg hover:opacity-85 transition-opacity cursor-pointer"
          >
            Live Demo ↗
          </a>
          <a
            href="https://github.com/CooperMcKay/Hack-the-Globe"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[13px] font-medium bg-white text-slate-900 px-[22px] py-2 rounded-lg border border-slate-200 hover:border-slate-400 transition-colors cursor-pointer"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/sections/Projects.tsx public/hack-the-globe-preview.jpg
git commit -m "feat: add Projects section with ContainerScroll animation"
```

---

## Task 10: Build Skills section

**Files:**
- Create: `src/sections/Skills.tsx`

- [ ] **Step 1: Create `src/sections/Skills.tsx`**

```tsx
// src/sections/Skills.tsx
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SKILLS, LANGUAGES } from "@/data/resume";

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();

  const allSkills = [
    ...SKILLS.map((s) => ({ label: s, lang: false })),
    ...LANGUAGES.map((s) => ({ label: s, lang: true })),
  ];

  return (
    <section id="skills" className="border-t border-slate-200">
      <div ref={ref} className="px-16 py-22 max-w-[1120px] mx-auto">
        <p className="font-mono text-[9px] tracking-[3px] uppercase text-blue-700 mb-1.5 flex items-center gap-2">
          <span className="inline-block w-[18px] h-px bg-blue-700" />
          Expertise
        </p>
        <h2 className="font-display font-extrabold text-[clamp(30px,3.5vw,44px)] tracking-[-2px] text-slate-900 mb-13">
          Skills & Toolkit
        </h2>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill, i) => (
            <motion.span
              key={skill.label}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className={
                skill.lang
                  ? "font-body text-[13px] font-medium px-4 py-2 rounded-lg border cursor-default text-amber-800 bg-amber-50 border-amber-200 transition-all duration-150"
                  : "font-body text-[13px] font-medium px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 cursor-default hover:border-blue-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-150"
              }
            >
              {skill.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/Skills.tsx
git commit -m "feat: add Skills tag cloud with staggered animation"
```

---

## Task 11: Build Awards section

**Files:**
- Create: `src/sections/Awards.tsx`

- [ ] **Step 1: Create `src/sections/Awards.tsx`**

```tsx
// src/sections/Awards.tsx
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AWARDS, type Award } from "@/data/resume";

function AwardCard({ award, index }: { award: Award; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-slate-200 rounded-xl p-5 flex items-start gap-3.5 bg-white hover:border-blue-700 hover:shadow-[0_4px_20px_rgba(29,78,216,0.07)] transition-all duration-200 cursor-default"
    >
      {/* Logo */}
      <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white overflow-hidden flex items-center justify-center flex-shrink-0 p-1">
        {award.logoUrl ? (
          <img
            src={award.logoUrl}
            alt=""
            className="w-full h-full object-contain"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        ) : null}
      </div>

      {/* Body */}
      <div>
        <p className="font-body text-[13px] font-semibold text-slate-900 leading-snug mb-0.5">
          {award.name}
        </p>
        <p className="font-mono text-[8px] tracking-[0.3px] uppercase text-slate-400 mb-1">
          {award.org}
        </p>
        {award.amount && (
          <p className="font-body text-[12px] font-bold text-green-600">
            {award.amount}
          </p>
        )}
        {award.description && (
          <p className="font-body text-[11px] text-slate-400 leading-relaxed mt-1">
            {award.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function Awards() {
  return (
    <section className="border-t border-slate-200">
      <div className="px-16 py-22 max-w-[1120px] mx-auto">
        <p className="font-mono text-[9px] tracking-[3px] uppercase text-blue-700 mb-1.5 flex items-center gap-2">
          <span className="inline-block w-[18px] h-px bg-blue-700" />
          Recognition
        </p>
        <h2 className="font-display font-extrabold text-[clamp(30px,3.5vw,44px)] tracking-[-2px] text-slate-900 mb-13">
          Awards & Scholarships
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {AWARDS.map((award, i) => (
            <AwardCard key={award.name} award={award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/Awards.tsx
git commit -m "feat: add Awards section with logo cards and scholarship amounts"
```

---

## Task 12: Build Contact + Footer

**Files:**
- Create: `src/sections/Contact.tsx`

- [ ] **Step 1: Create `src/sections/Contact.tsx`**

```tsx
// src/sections/Contact.tsx
import { PERSONAL } from "@/data/resume";

export function Contact() {
  return (
    <>
      <section id="contact" className="bg-slate-900 text-white text-center px-16 py-[110px] relative overflow-hidden border-t border-slate-200">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none bg-[radial-gradient(ellipse,rgba(59,130,246,0.15),transparent_65%)]" />

        <div className="relative z-10">
          <p className="font-mono text-[9px] tracking-[3px] uppercase text-white/30 mb-2.5">
            Get In Touch
          </p>
          <h2 className="font-display font-extrabold text-[clamp(44px,5.5vw,68px)] tracking-[-2px] leading-none mb-3.5">
            Let's{" "}
            <span className="text-blue-400">Connect</span>
          </h2>
          <p className="font-body text-[14px] text-white/40 mb-10">
            Open to internships, case competitions, and interesting conversations.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="font-body text-[14px] font-semibold bg-white text-slate-900 px-[30px] py-3 rounded-[9px] hover:opacity-90 transition-opacity cursor-pointer"
            >
              Send an Email
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[14px] font-medium text-white px-[30px] py-3 rounded-[9px] border border-white/20 hover:border-white/40 transition-colors cursor-pointer"
            >
              View LinkedIn ↗
            </a>
          </div>
          <p className="font-mono text-[11px] tracking-[1px] text-white/20 mt-6">
            {PERSONAL.email}
          </p>
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-white/[0.07] px-16 py-5 flex justify-between items-center">
        <span className="font-display font-bold text-[14px] text-white/30">Nathan Rubini</span>
        <span className="font-mono text-[9px] tracking-[1px] text-white/[0.18]">
          © 2025 · React + Vite · GitHub Pages
        </span>
      </footer>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/Contact.tsx
git commit -m "feat: add Contact section and Footer"
```

---

## Task 13: Assemble App.tsx + wire up sections

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
// src/App.tsx
import { Navbar }     from "@/components/Navbar";
import { Hero }       from "@/sections/Hero";
import { Stats }      from "@/sections/Stats";
import { Experience } from "@/sections/Experience";
import { Projects }   from "@/sections/Projects";
import { Skills }     from "@/sections/Skills";
import { Awards }     from "@/sections/Awards";
import { Contact }    from "@/sections/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Experience />
      <Projects />
      <Skills />
      <Awards />
      <Contact />
    </>
  );
}
```

- [ ] **Step 2: Replace `src/main.tsx`**

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 3: Run dev server and visually verify all sections render**

```bash
npm run dev
```

Open `http://localhost:5173` and scroll through:
- [ ] Aurora effect visible in hero top-right
- [ ] Photo loads (280×280, square)
- [ ] Name is largest element on page
- [ ] Rotating words cycle: BBA Student → Consultant → Leader → Strategist
- [ ] Stats strip: 3 columns, no vendor spend
- [ ] Experience: logos show for BCG, RBC Cap Markets, RBC Insurance; scales icon for Court
- [ ] Projects: ContainerScroll card starts tilted, flattens on scroll
- [ ] Skills: tags wrap, hover turns blue, French tag is amber
- [ ] Awards: 2-col grid, green amounts show for scholarships
- [ ] Contact: dark section, email link works

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: `dist/` built with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: assemble App with all sections"
```

---

## Task 14: Configure Vite for GitHub Pages + add path aliases

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.json`

- [ ] **Step 1: Update `vite.config.ts`**

```ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/Nathan-Personal-Portfolio/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

- [ ] **Step 2: Update `tsconfig.json` to include path alias**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Install path dependency**

```bash
npm install -D @types/node
```

- [ ] **Step 4: Verify build with correct base**

```bash
npm run build
```

Check `dist/index.html` — asset paths should start with `/Nathan-Personal-Portfolio/`.

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts tsconfig.json
git commit -m "feat: configure GitHub Pages base path and TS path aliases"
```

---

## Task 15: Deploy to GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Install gh-pages**

```bash
npm install -D gh-pages
```

- [ ] **Step 2: Add deploy script to `package.json`**

In `package.json`, add to `"scripts"`:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

- [ ] **Step 3: Create GitHub Actions workflow for auto-deploy on push**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 4: Push to GitHub and trigger deploy**

```bash
git add .github/ package.json
git commit -m "feat: add GitHub Actions deploy workflow"
git push origin main
```

- [ ] **Step 5: Verify deployment**

After ~2 minutes, open:
```
https://nathanrubini.github.io/Nathan-Personal-Portfolio/
```

Check that all sections render, fonts load, images appear, animations work.

---

## Self-Review

**Spec coverage:**
- [x] Vite + React + TS + Tailwind + shadcn → Task 1–2
- [x] AuroraBackground → Task 3 + 6
- [x] ContainerScroll → Task 3 + 9
- [x] AnimatedHero rotating words → Task 3 + 6
- [x] Hero: photo 280px square, name biggest, one-line description → Task 6
- [x] Stat strip (3 stats, no vendor spend) → Task 7
- [x] Experience with real logos, no chips → Task 8
- [x] Projects: Hack the Globe, live + GitHub links → Task 9
- [x] Skills tag cloud with French amber → Task 10
- [x] Awards: 8 cards, logos, green amounts, descriptions → Task 11
- [x] Contact + Footer dark → Task 12
- [x] GitHub Pages base path → Task 14
- [x] CI/CD deploy workflow → Task 15

**No placeholders found.**

**Type consistency:** `Award` and `Experience` interfaces defined in `resume.ts` Task 4, consumed identically in Tasks 8 and 11. `AnimatedRole` props match usage in Task 6. `ContainerScroll` signature matches Task 3 and usage in Task 9.
