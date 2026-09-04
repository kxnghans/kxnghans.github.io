import type { SkillCategory } from "../types/data";
import { ASSET_URLS } from "./assets";

// Skills & Technical Competencies Dataset (SSOT)
// Categorized proficiencies structured around TPM Core Competencies:
// 1. Program Orchestration, 2. Technical Architecture & Cloud, 3. BI & Data Analytics, 4. Software Architecture.
export const skillsData: SkillCategory[] = [
  // 1. Project & Program Management Leadership (TPM / Systems Leadership / Governance)
  {
    title: "Project & Program Management",
    imageUrl: ASSET_URLS.SKILLS.PROJECT_MANAGEMENT,
    summary: ["Agile & Scrum Leadership", "Technical Program Management"],
    details: [
      { name: "Agile & Scrum Leadership", priority: 1 },
      { name: "Technical Program Management", priority: 1 },
      { name: "Stakeholder Management", priority: 1 },
      { name: "Requirements & CONOPS", priority: 1 },
      { name: "JIRA & Confluence", priority: 1 },
      { name: "Process Optimization", priority: 1 },
      { name: "Model-Based Systems (MBSE)", priority: 2 },
      { name: "UI/UX Prototyping (Figma / XD)", priority: 2 },
    ],
    modalDetails: {
      title: "Project & Program Management",
      subtitle:
        "Technical Program Management (TPM), Agile Delivery, and Systems Governance",
      details: [
        "Agile & Scrum Delivery: Sprint planning, sprint ceremonies, backlog refinement, developer velocity tracking, and JIRA/Confluence administration.",
        "Technical Architecture & Governance: Concept of Operations (CONOPS), requirements gathering, architectural review boards, and Model-Based Systems Engineering (MBSE).",
        "Program Orchestration: Cross-functional alignment, dependency mapping, technical onboarding, and stakeholder conflict mediation.",
        "Business Analysis & Operations: Quantitative workflow analysis, process optimization, resource allocation, and UI/UX prototyping (Figma, Adobe XD).",
      ],
      exposure: [
        "Agile / Scrum Master",
        "JIRA & Confluence",
        "Concept of Operations (CONOPS)",
        "Requirements Gathering",
        "Model-Based Systems Engineering",
        "Stakeholder Management",
        "Figma & Adobe XD",
      ],
    },
  },

  // 2. Cloud Infrastructure & DevSecOps (Technical Architecture / Containerization / CI/CD)
  {
    title: "Cloud & DevOps",
    imageUrl: ASSET_URLS.SKILLS.CLOUD_DEVOPS,
    summary: ["Kubernetes & OpenShift", "Docker & Containers"],
    details: [
      { name: "Kubernetes & OpenShift", priority: 1 },
      { name: "Docker & Containers", priority: 1 },
      { name: "CI/CD Pipelines", priority: 1 },
      { name: "Cloud Platforms (AWS / Azure)", priority: 1 },
      { name: "DevSecOps & SBOM", priority: 1 },
      { name: "Git & Version Control", priority: 1 },
      { name: "Harbor & Nexus Proxies", priority: 2 },
      { name: "Cloudflare Workers", priority: 2 },
    ],
    modalDetails: {
      title: "Cloud, Infrastructure & DevOps",
      subtitle: "Cloud Architecture, Containerization, and DevSecOps",
      details: [
        "Container Orchestration: Deploying and managing Kubernetes clusters, OpenShift Single Node (SNO) environments, Docker containers, and Podman runtime.",
        "CI/CD & DevSecOps: Automated GitLab and GitHub Actions build pipelines, Trivy container security scanning, and automated CycloneDX SBOM generation.",
        "Cloud & Edge Infrastructure: Multi-cloud deployments across AWS and Microsoft Azure, Cloudflare Workers edge runtimes, and air-gapped proxy caches (Harbor, Nexus).",
      ],
      exposure: [
        "Kubernetes",
        "OpenShift (SNO)",
        "Docker & Podman",
        "GitLab CI/CD",
        "GitHub Actions",
        "AWS & Azure",
        "Trivy & CycloneDX SBOM",
        "Harbor & Nexus",
        "Cloudflare Workers",
      ],
    },
  },

  // 3. Business Intelligence & Data Analytics (Data Telemetry, Lakehouse & Automated ETL)
  {
    title: "BI & Data Analytics",
    imageUrl: ASSET_URLS.SKILLS.BI_ANALYTICS,
    summary: ["Microsoft Power BI", "Power Query & ETL"],
    details: [
      { name: "Microsoft Power BI", priority: 1 },
      { name: "Power Query & ETL", priority: 1 },
      { name: "DAX Measures & Modeling", priority: 1 },
      { name: "SQL (PostgreSQL, MySQL)", priority: 1 },
      { name: "Row-Level Security (RLS)", priority: 1 },
      { name: "Power Apps & Automation", priority: 2 },
      { name: "Microsoft Fabric", priority: 2 },
      { name: "Python (Pandas, NumPy)", priority: 2 },
      { name: "Tableau Visualizations", priority: 2 },
      { name: "Statistical Process Control", priority: 3 },
    ],
    subcategories: [
      {
        title: "Data Architecture & Analysis",
        details: [
          "Dimensional Data Modeling (Star Schema)",
          "Row-Level Security (RLS) Governance",
          "Automated Power Query ETL Pipelines",
          "DAX Financial & Operational Measures",
          "REST API Ingestion & JSON Parsing",
          "Time-Series Forecasting & Regression",
          "Statistical Process & Quality Control",
        ],
      },
    ],
    modalDetails: {
      title: "BI & Data Analytics",
      subtitle:
        "Business Intelligence, Automated ETL, and Quantitative Modeling",
      details: [
        "Microsoft Power Platform: Enterprise dashboards in Power BI, custom business applications in Power Apps, automated workflows in Power Automate, and Dataverse data modeling.",
        "Data Pipelines & ETL: Automated Power Query ingestion, REST API data feeds, relational database querying, and Microsoft Fabric lakehouse structures.",
        "Dimensional Modeling & Analytics: Star schema design, advanced DAX measures, Row-Level Security (RLS), and statistical time-series forecasting in Python (Pandas, NumPy).",
      ],
      exposure: [
        "Power BI & DAX",
        "Power Query ETL",
        "Power Apps & Automate",
        "Microsoft Fabric",
        "SQL (PostgreSQL / MySQL)",
        "Row-Level Security (RLS)",
        "Tableau",
        "Python (Pandas / NumPy)",
      ],
    },
  },

  // 4. Programming Languages & Frameworks (Software & Full-Stack Development)
  {
    title: "Programming",
    imageUrl: ASSET_URLS.SKILLS.PROGRAMMING,
    summary: ["Python", "TypeScript / JavaScript", "React & React Native"],
    details: [
      { name: "Python", priority: 1 },
      { name: "TypeScript / JavaScript", priority: 1 },
      { name: "React & React Native", priority: 1 },
      { name: "SQL", priority: 1 },
      { name: "Next.js & Node.js", priority: 2 },
      { name: "Tailwind CSS", priority: 2 },
      { name: "C / C++", priority: 2 },
      { name: "PHP & VueJS", priority: 3 },
      { name: "Ansible & YAML", priority: 3 },
      { name: "TensorFlow & Keras", priority: 3 },
      { name: "Markdown", priority: 4 },
    ],
    modalDetails: {
      title: "Programming & Frameworks",
      subtitle: "Languages, Modern Web/Mobile Frameworks, and Systems Code",
      details: [
        "Core Languages: Python (FastAPI, PyTorch, Pandas), TypeScript, JavaScript (ES6+), and SQL (PostgreSQL, SQLite, MySQL).",
        "Web & Mobile Ecosystem: React, React Native (Expo), Next.js, VueJS, and Tailwind CSS.",
        "Systems & Automation: C, C++, PHP, Ansible, YAML, Turborepo monorepos, and local embedded databases (SQLite, MMKV).",
      ],
      exposure: [
        "Python (FastAPI / PyTorch)",
        "TypeScript & JavaScript",
        "React & React Native (Expo)",
        "Next.js & Node.js",
        "SQL",
        "C & C++",
        "VueJS & PHP",
        "Ansible & YAML",
        "Verilog & Assembly",
      ],
    },
  },

  // 5. Operating Systems, Hardware & Defense Systems
  {
    title: "IT & Systems",
    imageUrl: ASSET_URLS.SKILLS.IT_SYSTEMS,
    summary: ["Linux (RHEL, Ubuntu)", "Microsoft 365 / VBA"],
    details: [
      { name: "Linux (RHEL, Ubuntu)", priority: 1 },
      { name: "Microsoft 365 / VBA", priority: 1 },
      { name: "Defense Supply Systems", priority: 2 },
      { name: "Unreal Engine", priority: 2 },
      { name: "Raspberry Pi & Microcontrollers", priority: 3 },
    ],
    modalDetails: {
      title: "IT & Systems Architecture",
      subtitle: "Operating Systems, Productivity, and Hardware Integration",
      details: [
        "Operating Systems: Linux administration (RHEL, Ubuntu CLI), bash shell scripting, user permissions, and remote SSH administration.",
        "Productivity & Office Automation: Microsoft 365 Enterprise Suite, advanced Excel data modeling, VBA macro automation, and team collaboration workflows.",
        "Specialized & Embedded Systems: Defense inventory management systems (ILS-S, ESS), digital records archiving, and hardware prototyping with Raspberry Pi and Arduino microcontrollers.",
      ],
      exposure: [
        "Linux (RHEL / Ubuntu)",
        "Microsoft 365 & VBA",
        "Defense Supply Systems (ILS-S / ESS)",
        "Unreal Engine 3D",
        "Raspberry Pi & Arduino",
        "Shell Scripting",
      ],
    },
  },

  // 6. Adobe Creative Suite & UI/UX Design
  {
    title: "Adobe Suite",
    imageUrl: ASSET_URLS.SKILLS.ADOBE_SUITE,
    summary: ["Adobe XD", "Photoshop", "Premiere Pro", "After Effects"],
    details: [
      { name: "Adobe XD", priority: 1 },
      { name: "Photoshop", priority: 1 },
      { name: "Premiere Pro", priority: 1 },
      { name: "After Effects", priority: 2 },
      { name: "Illustrator", priority: 2 },
      { name: "Acrobat Pro", priority: 3 },
    ],
    modalDetails: {
      title: "Adobe Creative Suite",
      subtitle: "UI/UX Prototyping, Video Production, and Digital Media",
      details: [
        "UI/UX & Prototyping: Interactive wireframing, component design, responsive screen flows, and user journey design in Adobe XD.",
        "Video Editing & Motion Graphics: Non-linear video timeline editing, multi-track audio mixing, and color grading in Premiere Pro; motion graphics and title animation in After Effects.",
        "Graphic Design & Publishing: Raster image manipulation, compositing, and photo retouching in Photoshop; vector asset and iconography creation in Illustrator; interactive PDF document workflows in Acrobat Pro.",
      ],
      exposure: [
        "Adobe XD Prototyping",
        "Photoshop",
        "Premiere Pro",
        "After Effects",
        "Illustrator",
        "Acrobat Pro",
      ],
    },
  },

  // 7. Electronics, SPICE Simulation & Hardware Design
  {
    title: "Electronics",
    imageUrl: ASSET_URLS.SKILLS.ELECTRONICS,
    summary: ["LTspice", "MATLAB & Simulink", "AutoCAD", "ModelSim"],
    details: [
      { name: "LTspice", priority: 1 },
      { name: "MATLAB & Simulink", priority: 1 },
      { name: "AutoCAD", priority: 2 },
      { name: "ModelSim", priority: 2 },
    ],
    modalDetails: {
      title: "Electronics & Hardware Design",
      subtitle:
        "Circuit Simulation, Mathematical Modeling, and Hardware Analysis",
      details: [
        "Circuit Simulation & Analysis: Analog and mixed-signal circuit simulation in LTspice, RF microstrip simulations in Keysight ADS, and frequency-domain Bode plot analysis.",
        "Mathematical Modeling: Mathematical modeling, matrix computations, and signal analysis in MATLAB & Simulink.",
        "Digital Logic & Schematics: VHDL and Verilog digital logic design and timing verification in ModelSim; 2D/3D electrical schematics and layouts in AutoCAD.",
      ],
      exposure: [
        "LTspice Analog Simulation",
        "MATLAB & Simulink",
        "Keysight ADS",
        "ModelSim (VHDL / Verilog)",
        "AutoCAD Schematics",
        "Vector Network Analyzers (VNA)",
      ],
    },
  },

  // 8. Spoken & Written Natural Languages
  {
    title: "Languages",
    imageUrl: ASSET_URLS.SKILLS.LANGUAGES,
    summary: ["English (Fluent)", "French (Intermediate)"],
    details: [
      { name: "English (Fluent)", priority: 1 },
      { name: "French (Intermediate)", priority: 2 },
      { name: "Ga & Twi (Native Dialects)", priority: 3 },
    ],
    modalDetails: {
      title: "Language Proficiency",
      subtitle: "Spoken & Written Communication",
      details: [
        "English: Native / Fluent proficiency in professional engineering, technical writing, and executive presentations.",
        "French: Intermediate proficiency in professional reading, conversational communication, and written correspondence.",
        "Ga & Twi: Native conversational proficiency in Ghanaian regional dialects.",
      ],
      exposure: [
        "English (Native / Fluent)",
        "French (Intermediate)",
        "Ga (Native)",
        "Twi (Native)",
      ],
    },
  },
];

export default skillsData;
