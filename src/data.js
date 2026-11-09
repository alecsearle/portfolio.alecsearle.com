// All site copy lives here so updates don't require touching components.

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/alec_srl/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/alec.searle.54", icon: "facebook" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/alec-searle/", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/alecsearle", icon: "github" },
];

export const contactLinks = [
  {
    label: "Email",
    value: "alec@alecsearle.com",
    href: "mailto:alec@alecsearle.com",
    icon: "email",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/alec-searle",
    href: "https://www.linkedin.com/in/alec-searle/",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    value: "github.com/alecsearle",
    href: "https://github.com/alecsearle",
    icon: "github",
  },
];

export const quickFacts = [
  { label: "Currently", value: "Associate Software Engineer @ Zonos" },
  { label: "Education", value: "B.S. Software Engineering, Utah Tech University (2026)" },
  { label: "Based in", value: "St. George, Utah" },
];

// Each company can hold several roles (newest first).
export const experience = [
  {
    company: "Zonos",
    location: "St. George, UT",
    roles: [
      {
        // TODO(Alec): replace this bullet with what you actually work on.
        title: "Associate Software Engineer",
        period: "2026 – Present",
        bullets: ["Build and maintain software for Zonos' cross-border commerce platform."],
      },
      {
        title: "Landed Cost Data Analyst",
        period: "Dec 2025 – 2026",
        bullets: [
          "Audited landed cost quotes against actual import charges to identify discrepancies in duties, taxes, and fees.",
          "Analyzed variance patterns and investigated root causes to improve the accuracy of future quotes.",
          "Shared insights with product and operations teams to support process and system improvements.",
        ],
      },
    ],
  },
  {
    company: "Alec Searle Dev",
    location: "Remote",
    roles: [
      {
        title: "Freelance Web Developer",
        period: "2025 – Present",
        bullets: [
          "Build and launch WordPress websites for private clients, boosting online visibility and SEO reach.",
          "Provide ongoing hosting, content, and performance optimization support.",
        ],
      },
    ],
  },
  {
    company: "ExpiTrans (Buzz Financial)",
    location: "St. George, UT",
    roles: [
      {
        title: "ISV Operations Lead / Developer",
        period: "Mar 2025 – Nov 2025",
        bullets: [
          "First hire in the Utah branch; helped grow the team from 2 to 10 ISV specialists and trained each hire.",
          "Handled Tier 2 integration and troubleshooting tickets, resolving most issues without Tier 3 escalation.",
          "Acted as office lead, managing workflow and priorities when management was offsite.",
          "Built a webhook automation system for converting warm leads into approved merchants, cutting response time by 80%.",
        ],
      },
    ],
  },
  {
    company: "HFB Technologies",
    location: "St. George, UT",
    roles: [
      {
        title: "Frontend Developer",
        period: "Aug 2024 – Mar 2025",
        bullets: [
          "Implemented 60+ weekly updates for client WordPress/Divi sites across a 1,400-site portfolio.",
          "Worked directly with clients to clarify design requests and recommend UX improvements.",
        ],
      },
    ],
  },
];

// Order matters on desktop: cards 3 and 4 are the large tiles in the bento grid.
export const projects = [
  {
    title: "BK Builders UT",
    description: "Custom home and remodel specialists.",
    label: "Web Development",
    image: "/projects/bkbuilders.jpg",
    href: "https://bkbuildersutah.com/",
  },
  {
    title: "Squeegee Bee",
    description: "Window cleaning and pressure washing services.",
    label: "Web Development",
    image: "/projects/squeegeebee.jpg",
    href: "https://squeegeebeewindowcleaning.com/",
  },
  {
    title: "Multiplayer Flappy Bird",
    description: "Real-time multiplayer Flappy Bird you can play with friends.",
    label: "Vue / Express / Node.js",
    image: "/projects/multiplayerflappybird.jpg",
    href: "https://multiplayer-flappybird.onrender.com/",
  },
  {
    title: "Apex Fire Preparedness",
    description: "Fire mitigation and home hardening services.",
    label: "Web Development",
    image: "/projects/apexfp.jpg",
    href: "https://apex-fp.com/",
  },
  {
    title: "Apex Risk Solutions",
    description: "Fire safety consulting and risk assessment.",
    label: "Web Development",
    image: "/projects/apexrisksolutions.jpg",
    href: "https://apexrisksolutions.co",
  },
  {
    title: "More on GitHub",
    description: "Side projects, experiments, and school work.",
    label: "Code",
    image: null,
    href: "https://github.com/alecsearle",
  },
];
