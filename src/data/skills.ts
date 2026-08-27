import type { SkillCategory } from "../types/data";

// Skills & Technical Competencies Dataset (SSOT)
// Categorized proficiencies across software, systems, cloud, data, and defense.
export const skillsData: SkillCategory[] = [
  // Programming Languages & Frameworks
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
    modalDetails: {
      title: "Programming & Frameworks",
      subtitle: "Languages, Libraries, and Mobile/Web Ecosystems",
      details: [
        "Python (PyTorch, Pandas, NumPy, Scikit-Learn), TypeScript, JavaScript, SQL",
        "React, React Native (Expo), Next.js, Vue.js, Tailwind CSS, HTML5/CSS3",
        "C, C++, PHP, Ansible, YAML, Markdown, Keras, TensorFlow",
        "Turborepo, MMKV, SQLite, Firebase Realtime Database, Cloudflare Workers & Pages",
        "Verilog, Assembly Language, C#, Java",
      ],
    },
  },

  // Business Intelligence & Data Analytics
  {
    title: "BI & Data Analytics",
    imageUrl: "/assets/generated/skills/bi-analytics.webp",
    details: [
      {
        name: "MS Power Platform (Power BI, Power Apps, Power Automate, Dataverse)",
        priority: 1,
      },
      { name: "Power Query ETL & REST API 2.0 Pipelines", priority: 1 },
      { name: "DAX Measures & Dimensional Modeling (Star Schema)", priority: 1 },
      { name: "Row-Level Security (RLS) & Data Governance", priority: 1 },
      { name: "SQL (PostgreSQL, SQLite, MySQL)", priority: 1 },
      { name: "MS Fabric & Data Lakehouse Architecture", priority: 2 },
      { name: "Tableau & Salesforce Data Feeds", priority: 2 },
      { name: "Time-Series Forecasting & Multivariate Modeling", priority: 2 },
      { name: "Python (Pandas, NumPy, Scikit-Learn)", priority: 2 },
      { name: "R & Statistical Process Control", priority: 3 },
    ],
    subcategories: [
      {
        title: "Quantitative Systems Analysis",
        details: [
          "Dimensional Data Modeling",
          "Row-Level Security (RLS)",
          "REST API 2.0 Ingestion",
          "DAX Financial Calculations",
          "Automated ETL Pipelines",
          "Time-Series Forecasting (LSTM / ARIMA)",
          "Statistical Hypothesis Testing",
        ],
      },
    ],
    modalDetails: {
      title: "BI & Data Analytics",
      subtitle: "Enterprise BI, Dimensional Modeling, and Automated ETL",
      details: [
        "MS Power Platform (Power BI, Power Apps, Power Automate, Dataverse), MS Fabric, Power Query ETL, REST API 2.0",
        "DAX Measures, Dimensional Modeling, Row-Level Security (RLS), SQL (PostgreSQL, SQLite, MySQL), Tableau",
        "Statistical Modeling, Multivariate Time-Series Forecasting (LSTM, ARIMA), Python (Pandas, NumPy, Scikit-Learn)",
      ],
    },
  },

  // Cloud Infrastructure & DevSecOps
  {
    title: "Cloud & DevOps",
    imageUrl: "/assets/generated/skills/cloud-devops.webp",
    details: [
      { name: "AWS & Microsoft Azure", priority: 1 },
      { name: "Kubernetes & OpenShift (SNO)", priority: 1 },
      { name: "Docker & Podman Containers", priority: 1 },
      { name: "DevSecOps & Automated SBOM Generation", priority: 1 },
      { name: "GitLab CI/CD Pipelines & Trivy Scanning", priority: 1 },
      { name: "Cloudflare (Workers, Pages, OpenNext)", priority: 2 },
      { name: "Git & GitHub Actions", priority: 1 },
      { name: "Jira & Azure DevOps (ADO)", priority: 2 },
      { name: "Confluence Documentation Systems", priority: 2 },
    ],
    modalDetails: {
      title: "Cloud, Infrastructure & DevOps",
      subtitle: "Cloud Architecture, Containerization, and DevSecOps",
      details: [
        "AWS, Microsoft Azure, OpenShift (Single Node OpenShift - SNO), Kubernetes, Docker, Podman",
        "DevSecOps, Automated SBOM (CycloneDX), Trivy Security Scans, Harbor & Nexus Proxy-Caches",
        "Cloudflare Edge Runtime (Workers, Pages, OpenNext), Git, GitHub Actions, Jira, Azure DevOps (ADO)",
      ],
    },
  },

  // Project & Program Management Leadership
  {
    title: "Project & Program Management",
    imageUrl: "/assets/generated/skills/project-management.webp",
    details: [
      { name: "Technical Program Management (TPM) & Roadmapping", priority: 1 },
      { name: "High-Reliability Operations & Command Stewardship", priority: 1 },
      { name: "Agile & Scrum Master (SAFe, Sprint Governance)", priority: 1 },
      { name: "JIRA & Confluence Administration", priority: 1 },
      { name: "Concept of Operations (CONOPS) Authoring", priority: 1 },
      { name: "Governance & Review Boards (ARB, SIA, CARB)", priority: 1 },
      { name: "Stakeholder Conflict Resolution & UX Mediation", priority: 1 },
      { name: "Quantitative Business Analysis & Process ROI ($1.7M+)", priority: 1 },
      { name: "Model-Based Systems Engineering (Cameo, DOORS)", priority: 2 },
      { name: "Rapid Prototyping (Adobe XD, Figma)", priority: 2 },
    ],
    modalDetails: {
      title: "Project & Systems Management",
      subtitle: "Technical Program Management, High-Reliability Operations, and Governance",
      details: [
        "Technical Program Management (TPM), Agile / Scrum Master (SAFe, Sprint Governance), JIRA, Confluence",
        "High-Reliability Operations, Command Stewardship, Aeromedical Logistics (41A3), Centralized Repair Facility ($92M CRF Hub)",
        "CONOPS Authoring, Multi-Board Governance (ARB, SIA, CARB), Stakeholder Conflict Resolution, Multi-Program Onboarding",
        "Quantitative Business Analysis, Process ROI Modeling ($1.7M+ Enterprise ROI), UI/UX Prototyping (Adobe XD, Figma)",
        "Model Based Systems Engineering (MBSE - Cameo Systems Modeler, IBM DOORS, TIBCO)",
      ],
    },
  },

  // Operating Systems, Hardware & Defense Systems
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
        "ILS-S & ESS Defense Supply Systems, DLADS Property Disposition, GPC Procurement",
        "Digital Records Archiving & Lifecycle Management",
      ],
    },
  },

  // Adobe Creative Suite & Digital Media
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

  // Electronics, SPICE Simulation & Hardware Design
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

  // Spoken & Written Natural Languages
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
