import type { CertificationItem } from "../types/data";

// Certifications & Professional Training Dataset (SSOT)
// Industry credentials, technical bootcamps, and professional military education.
export const certificationsData: CertificationItem[] = [
  // 1. Certified Scrum Master Credential
  {
    title: "Certified Scrum Master",
    imageUrl: "/assets/generated/certifications/scrum-master.webp",
    summary: ["Certification: Certified Scrum Master", "Provider: Scrum Inc."],
    details: {
      title: "Certified Scrum Master",
      subtitle: "Scrum Inc.",
      details: [
        "Certification: Certified in Scrum frameworks, sprint planning, and Agile project delivery.",
        "Leadership: Facilitates sprint ceremonies, unblocks engineering teams, and tracks sprint velocity.",
        "Values: Focused on iterative releases, transparency, and retrospectives.",
      ],
    },
  },

  // 2. Lockheed Martin Systems Engineering Bootcamp
  {
    title: "Systems Engineering Bootcamp",
    imageUrl: "/assets/generated/certifications/systems-bootcamp.webp",
    summary: [
      "Training: Systems Engineering Bootcamp",
      "Provider: Lockheed Martin",
    ],
    details: {
      title: "Systems Engineering Bootcamp",
      subtitle: "Internal Lockheed Martin Training",
      details: [
        "Program Overview: Lockheed Martin internal training covering systems architecture, lifecycle modeling, and trade studies.",
        "Focus: Requirements verification, functional baselines, and architectural design reviews.",
        "Capstone Project: Modeled municipal infrastructure, transit networks, and power distribution trade studies from scratch.",
      ],
    },
  },

  // 3. Microsoft Power Platform Credentials
  {
    title: "Microsoft Power Platform",
    imageUrl: "/assets/generated/certifications/power-platform.webp",
    summary: [
      "Citizen Developer Certified",
      "Training: Microsoft Power Platform",
      "Provider: Microsoft",
    ],
    details: {
      title: "Microsoft Power Platform",
      subtitle: "Certifications & Training",
      details: [
        "Citizen Developer Certified: Certified in building business applications with Power Apps and Dataverse.",
        "Fabric in a Day: Completed hands-on data lakehouse pipelines and modeling in Microsoft Fabric.",
        "Dashboard in a Day: Designed interactive sales reporting dashboards with live filters in Power BI.",
        "App in a Day: Built and deployed a work queue tracking application to automate manual ticketing.",
        "Introduction to Power Apps: Low-code canvas app development and data connectors.",
      ],
    },
  },

  // 4. Health Services Administration (HSA) Officer Accreditation
  {
    title: "Health Services Administration (HSA)",
    imageUrl: "/assets/generated/work/air-force-supply.webp",
    summary: [
      "Medical Service Corps Officer",
      "Course: Health Services Admin",
      "Focus: Aeromedical Evac Logistics",
    ],
    details: {
      title: "Health Services Administration (HSA)",
      subtitle: "USAF Medical Service Corps | DAFSC 41A3",
      details: [
        "Accreditation: Medical Service Corps (MSC) Officer Training.",
        "Core Competencies: Healthcare administration, aeromedical evacuation readiness, medical resource management, and defense medical logistics systems.",
        "Operational Impact: Directs aeromedical equipment readiness for the 34th Aeromedical Evacuation Squadron (AFRC). Digitized medical records archives, cut audit turnaround by 50%, and sustained 100% asset accountability across 2,216 assets ($672K).",
      ],
    },
  },

  // 5. Airman Leadership School (ALS) PME
  {
    title: "Airman Leadership School (ALS)",
    imageUrl: "/assets/generated/honors/honor-graduate.webp",
    summary: [
      "USAF Noncommissioned Officer PME",
      "Focus: Supervisory Leadership",
      "Status: Graduate",
    ],
    details: {
      title: "Airman Leadership School (ALS)",
      subtitle: "USAF Professional Military Education (PME)",
      details: [
        "Accreditation: USAF Noncommissioned Officer Professional Military Education.",
        "Core Competencies: Supervisory leadership, team performance dynamics, interpersonal communications, and military evaluation management (ACA/EPR/EPB).",
        "Operational Application: Led teams across CONUS and deployed Centralized Repair Facility environments, mentoring junior airmen and directing multi-million dollar supply operations.",
      ],
    },
  },

  // 6. Continuous Learning & Technical Courses
  {
    title: "LinkedIn Learning Courses",
    imageUrl: "/assets/generated/certifications/linkedin-learning.webp",
    summary: ["Training: 20+ specialized courses", "Provider: LinkedIn"],
    details: {
      title: "LinkedIn Learning Courses",
      subtitle: "Continuous Professional Development",
      details: [
        "Programming & Web Development:",
        "TypeScript Essential Training: Intermediate TypeScript for typing React and Node.js applications.",
        "JavaScript Essential Training: Modern ES6+ syntax, asynchronous programming, and DOM manipulation.",
        "Learning VueJS: Built dynamic web applications using VueJS components, HTML, and CSS.",
        "PHP Essential Training: Core language fundamentals, data structures, and backend routing.",
        "PHP with MySQL Essential Training: Connected PHP backend scripts with MySQL databases.",
        "SQL Essential Training: Relational database design, table queries, and triggers.",
        "HTML Essential Training: Semantic HTML structure and web accessibility standards.",
        "GIT Essential Training: Branching workflows, merge conflict resolution, and repository management.",
        "Data Analysis & Business Intelligence:",
        "Power BI Essential Training: Data modeling, DAX formulas, and interactive dashboard design.",
        "Tableau Essential Training: Data connections, calculated fields, and visual analytics.",
        "Microsoft Power Apps Essential Training: Low-code application development for internal tooling.",
        "IT, Cloud & Systems:",
        "Networking Foundations: Network architecture, OSI layers, and IP routing fundamentals.",
        "Ansible Essential Training: Hands-on automation playbooks and server configuration management.",
        "Unreal Engine Essential Training: Core 3D level design, physics modeling, and lighting.",
        "Creative & Design:",
        "Adobe XD Essential Training: Screen layout design, wireframing, and interactive prototyping.",
        "Photoshop Essential Training: Layer masks, compositing, and raster asset preparation.",
        "Premiere Pro Essential Training: Timeline video editing, color grading, and audio mixing.",
        "Premiere Pro Guru: Advanced keyframing, motion presets, and color corrections.",
        "DaVinci Resolve Fundamentals: Video editing, Fairlight audio mastering, and color grading.",
      ],
    },
  },
];
