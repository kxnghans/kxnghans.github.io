import type { SkillCategory } from "../types/data";

export const skillsData: SkillCategory[] = [
  {
    title: "Programming",
    imageUrl: "/assets/generated/skills/programming.webp",
    details: [
      { name: "Python (PyTorch, Pandas, NumPy)", priority: 1 },
      { name: "TypeScript / JavaScript", priority: 1 },
      { name: "React & React Native (Expo)", priority: 1 },
      { name: "SQL (PostgreSQL, SQLite)", priority: 1 },
      { name: "Next.js & Supabase", priority: 2 },
      { name: "Tailwind CSS & HTML5", priority: 2 },
      { name: "C / C++", priority: 2 },
      { name: "PHP & Vue.js", priority: 3 },
      { name: "Ansible & YAML", priority: 3 },
      { name: "Keras & TensorFlow", priority: 2 },
      { name: "Markdown", priority: 4 },
    ],
    exposure: [
      "Turborepo",
      "MMKV",
      "Firebase Realtime Database",
      "Cloudflare (Workers, Pages)",
      "Verilog",
      "C#",
      "Java",
    ],
    modalDetails: {
      title: "Programming & Frameworks",
      subtitle: "Languages, Libraries, and Mobile/Web Ecosystems",
      details: [
        "Python (PyTorch, Pandas, NumPy, Scikit-Learn), TypeScript, JavaScript, SQL",
        "React, React Native (Expo), Next.js, Vue.js, Tailwind CSS, HTML5/CSS3",
        "C, C++, PHP, Ansible, YAML, Markdown, Keras, TensorFlow",
      ],
      exposure: [
        "Turborepo, MMKV, SQLite, Firebase Realtime Database, Cloudflare Workers & Pages",
        "Verilog, Assembly Language, C#, Java",
      ],
    },
  },
  {
    title: "BI & Data Analytics",
    imageUrl: "/assets/generated/skills/bi-analytics.webp",
    details: [
      {
        name: "MS Power Platform (Power BI, Power Apps, Power Automate, Dataverse)",
        priority: 1,
      },
      { name: "MS Fabric", priority: 2 },
      { name: "Tableau", priority: 2 },
      { name: "Power Query", priority: 3 },
      { name: "Salesforce", priority: 3 },
      { name: "R", priority: 4 },
      { name: "Business Objects", priority: 4 },
      { name: "Cognos", priority: 4 },
    ],
    subcategories: [
      {
        title: "Data Analysis",
        details: [
          "Regression Analysis",
          "Statistical Modeling",
          "Data Visualization",
          "Data Pipeline Automation",
          "Time-Series Forecasting",
          "Viterbi & Dynamic Programming",
        ],
      },
    ],
    modalDetails: {
      title: "BI & Data Analytics",
      subtitle: "Business Intelligence, Forecasting, and Pipelines",
      details: [
        "MS Power Platform (Power BI, Power Apps, Power Automate, Dataverse), MS Fabric, Tableau, Power Query, Salesforce, R, Business Objects, Cognos",
        "Regression Analysis, Statistical Modeling, Data Visualization, Data Pipeline Automation, Time-Series Forecasting, Proximate Viterbi Pathfinding",
      ],
    },
  },
  {
    title: "Cloud & DevOps",
    imageUrl: "/assets/generated/skills/cloud-devops.webp",
    details: [
      { name: "AWS & Microsoft Azure", priority: 1 },
      { name: "Kubernetes & OpenShift", priority: 1 },
      { name: "Docker & Podman", priority: 2 },
      { name: "DevSecOps & SBOM Tracking", priority: 1 },
      { name: "Cloudflare (Workers, Pages)", priority: 2 },
      { name: "Git & GitHub Actions", priority: 1 },
      { name: "Jira & Azure DevOps (ADO)", priority: 2 },
      { name: "Confluence", priority: 3 },
    ],
    modalDetails: {
      title: "Cloud, Infrastructure & DevOps",
      subtitle: "Cloud Architecture, Containerization, and DevSecOps",
      details: [
        "AWS, Microsoft Azure, OpenShift, Kubernetes, Docker, Podman",
        "DevSecOps, SBOM (Software Bill of Materials), Cloudflare Edge Workers",
        "Git, GitHub Actions, Jira, Azure DevOps (ADO), Confluence",
      ],
    },
  },
  {
    title: "Project & Program Management",
    imageUrl: "/assets/generated/skills/project-management.webp",
    details: [
      { name: "JIRA", priority: 1 },
      { name: "Agile Methodologies (Scrum / Kanban)", priority: 1 },
      { name: "Model Based Systems Engineering (MBSE)", priority: 2 },
      { name: "Stakeholder Management", priority: 2 },
      { name: "Requirements Gathering & CONOPS", priority: 1 },
      { name: "Business Analysis & Process ROI", priority: 1 },
      { name: "UI/UX Design (Figma, Adobe XD)", priority: 2 },
    ],
    modalDetails: {
      title: "Project & Systems Management",
      subtitle: "Agile Delivery, CONOPS, and Requirements Analysis",
      details: [
        "JIRA, Agile Methodologies (Scrum, Kanban), Model Based Systems Engineering (MBSE)",
        "CONOPS Authoring, Stakeholder Management, Requirements Gathering, Business Analysis, Process ROI Modeling",
        "UI/UX Prototyping (Figma, Adobe XD)",
      ],
    },
  },
  {
    title: "IT & Systems",
    imageUrl: "/assets/generated/skills/it-systems.webp",
    details: [
      { name: "Linux (RHEL, Ubuntu)", priority: 1 },
      {
        name: "Microsoft Office Suite (Word, Excel, PowerPoint, Teams, VBA)",
        priority: 1,
      },
      { name: "Unreal Engine", priority: 2 },
      { name: "Raspberry Pi & Arduino Microcontrollers", priority: 3 },
    ],
    modalDetails: {
      title: "IT & Systems Architecture",
      subtitle: "Operating Systems, Productivity, and Hardware Integration",
      details: [
        "Linux (RHEL, Ubuntu), Microsoft Office Suite (Word, Excel, PowerPoint, Teams, VBA)",
        "Unreal Engine, Raspberry Pi, Arduino Hardware Interfaces",
      ],
    },
  },
  {
    title: "Adobe Suite",
    imageUrl: "/assets/generated/skills/adobe-suite.webp",
    details: [
      { name: "Photoshop", priority: 1 },
      { name: "Premiere Pro", priority: 1 },
      { name: "After Effects", priority: 2 },
      { name: "Illustrator", priority: 2 },
      { name: "Adobe XD", priority: 2 },
      { name: "Acrobat", priority: 3 },
    ],
    modalDetails: {
      title: "Adobe Creative Suite",
      subtitle: "UI Design, Video Production, and Digital Media",
      details: [
        "Photoshop, Premiere Pro, After Effects",
        "Illustrator, Adobe XD, Acrobat",
      ],
    },
  },
  {
    title: "Electronics",
    imageUrl: "/assets/generated/skills/electronics.webp",
    details: [
      { name: "LTspice", priority: 1 },
      { name: "MATLAB", priority: 1 },
      { name: "AutoCAD", priority: 2 },
      { name: "ModelSim", priority: 2 },
    ],
    modalDetails: {
      title: "Electronics & Hardware Design",
      subtitle: "Circuit Simulation, Modeling, and Analysis",
      details: ["LTspice, MATLAB, AutoCAD, ModelSim"],
    },
  },
  {
    title: "Languages",
    imageUrl: "/assets/generated/skills/languages.webp",
    details: [
      { name: "English (Fluent)", priority: 1 },
      { name: "French (Intermediate)", priority: 2 },
    ],
    modalDetails: {
      title: "Languages",
      subtitle: "Spoken & Written Communication",
      details: [
        "English (Fluent)",
        "French (Intermediate)",
        "Ga (Native Local Dialect)",
        "Twi (Native Local Dialect)",
      ],
    },
  },
];

export default skillsData;
