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
