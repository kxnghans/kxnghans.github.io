import type { LedgerEntry, LifetimeValueData } from "../types/data";
import { CHART_PALETTE } from "../theme/theme";

// Value Domains for filtering portfolio metrics
export const VALUE_DOMAINS = [
  "Defense & Space",
  "Enterprise Automation",
  "Military Logistics & Readiness",
  "Software Solutions",
  "Academic & Research",
];

// Impact Categories for analytical categorization
export const IMPACT_CATEGORIES = [
  "Efficiency & Speed",
  "Scale & Growth",
  "Governance & Quality",
  "Financial ROI",
];

// Career Eras aligned with functional domains and program leadership
export const CAREER_ERAS = [
  "2015 – 2019: Logistics & Supply Chain",
  "2019 – 2021: Software Dev & Expeditionary Logistics",
  "2020 – 2024: Systems Engineering & Program Management",
  "2024 – Present: Infrastructure & Enterprise Automation",
];

// Verified Financial Savings Ledger (SSOT for Dollar Metrics)
export const FINANCIAL_LEDGER: LedgerEntry[] = [
  {
    id: "led-1",
    label: "Boeing Retread Repair Savings",
    domain: "Military Logistics & Readiness",
    amountM: 5.0,
  },
  {
    id: "led-2",
    label: "ETDC Shelf-Life Recertification",
    domain: "Military Logistics & Readiness",
    amountM: 0.96,
  },
  {
    id: "led-3",
    label: "FOB/PQDR Asset Recoupment",
    domain: "Military Logistics & Readiness",
    amountM: 0.75,
  },
  {
    id: "led-4",
    label: "DLADS Inventory Recovery",
    domain: "Military Logistics & Readiness",
    amountM: 0.13,
  },
  {
    id: "led-5",
    label: "Innovation Platform First-Year Savings",
    domain: "Enterprise Automation",
    amountM: 1.1,
  },
  {
    id: "led-6",
    label: "Branch Facilities Annualized Savings",
    domain: "Enterprise Automation",
    amountM: 0.6624,
  },
  {
    id: "led-7",
    label: "MESHc Follow-on Program Funding",
    domain: "Defense & Space",
    amountM: 1.0,
  },
  {
    id: "led-8",
    label: "SNO Infrastructure Overhead Avoided",
    domain: "Defense & Space",
    amountM: 0.01,
  },
];

// Lifetime Value Dataset: Executive KPIs, Quantitative Metrics, and Qualitative Pillars
export const lifetimeValueData: LifetimeValueData = {
  executiveSummary: {
    totalFinancialROI: "$9.6M+",
    totalHoursSaved: "705k+",
    maxAcceleration: "36x",
    enterpriseScale: "450 Sites",
    auditAccuracy: "0.0% Errors",
    engineCoverage: "100% Core",
    gpa: "4.0 GPA",
  },
  metrics: [
    // Enterprise & Operational Savings Overview
    {
      id: "val-1",
      title: "Total Verified Operational & Innovation Savings",
      value: "$1.7M+",
      label: "Verified Financial ROI",
      category: "financial",
      domain: "Enterprise Automation",
      type: "quantitative",
      description:
        "Direct bottom-line savings validated across commercial operations, automated facility tracking, and employee ideation programs.",
      impactHighlight:
        "Measured financial impact across a multi-state 450-location commercial network.",
      timeframe: "2024 – Present",
      organization:
        "Lockheed Martin Space & Enterprise Operations Cross-Assignment",
      badge: "Flagship ROI",
    },
    // Enterprise Innovation Platform
    {
      id: "val-2",
      title: "First-Year Innovation Platform Savings",
      value: "$1.1M",
      label: "Validated Operational Savings",
      category: "financial",
      domain: "Enterprise Automation",
      type: "quantitative",
      description:
        "Built a Power BI analytics platform tracking 19,000+ employee ideas, validating $1.1M in first-year operational savings.",
      impactHighlight:
        "13% increase in employee participation across the organization.",
      timeframe: "2024 – Present",
      organization:
        "Enterprise Innovation Program (Internal Stretch Assignment)",
      badge: "Enterprise Gamification",
    },
    // Multi-Branch Facilities Automation
    {
      id: "val-3",
      title: "Facilities Key & Combo Modernization ROI",
      value: "$662,400",
      label: "Annualized Cost Savings",
      category: "financial",
      domain: "Enterprise Automation",
      type: "quantitative",
      description:
        "Replaced manual spreadsheets across 450 branch locations with a unified Power Platform and SQL system, saving $55,200 each month.",
      impactHighlight:
        "2,760 annual hours saved with zero recurring maintenance overhead.",
      timeframe: "2024 – Present",
      organization: "Enterprise Internal Operations Automation",
      badge: "Operational Automation",
      beforeAfter: {
        before: "$55.2k/mo manual time",
        after: "$0 manual overhead",
        metricName: "Monthly Operational Cost",
      },
    },
    // SNO Testbed CI/CD Speedup
    {
      id: "val-4",
      title: "Single Node OpenShift (SNO) Testbed Acceleration",
      value: "10x",
      label: "Nightly CI/CD Cycle Reduction",
      category: "efficiency",
      domain: "Defense & Space",
      type: "quantitative",
      description:
        "Built an SNO cluster inside the Galaxy Test Bed (GTB), cutting nightly automated test runs from 10 hours to 1 hour.",
      impactHighlight:
        "Saved $10,000+ in infrastructure costs while giving developers immediate nightly feedback.",
      timeframe: "2020 – Present",
      organization: "Lockheed Martin Space",
      badge: "Platform Engineering",
      beforeAfter: {
        before: "10 Hours / Night",
        after: "1 Hour / Night",
        metricName: "Integration Test Duration",
      },
    },
    // Enterprise Data Extraction Optimization
    {
      id: "val-5",
      title: "Legacy Backend ETL Performance Optimization",
      value: "18x",
      label: "Data Refresh Acceleration",
      category: "efficiency",
      domain: "Enterprise Automation",
      type: "quantitative",
      description:
        "Upgraded legacy data extraction to REST API 2.0, cutting report refresh times from 3 hours to under 10 minutes.",
      impactHighlight:
        "Near real-time data access for executive portfolio reviews.",
      timeframe: "2024 – Present",
      organization: "Enterprise Data Engineering (Internal Stretch Assignment)",
      badge: "Data Engineering",
      beforeAfter: {
        before: "180 Minutes",
        after: "<10 Minutes",
        metricName: "Report Refresh Cycle",
      },
    },
    // MESHc Defense Catalog Adoption
    {
      id: "val-6",
      title: "Enterprise MESHc User Adoption Surge",
      value: "800%",
      label: "Adoption Surge & Follow-on Funding",
      category: "scale",
      domain: "Defense & Space",
      type: "quantitative",
      description:
        "Used interactive prototypes to bridge conflicting requirements between RF engineers and business leads, helping secure $1.0M in follow-on funding.",
      impactHighlight:
        "Cut a month of UI rework and increased active program usage from 2 to 10 teams.",
      timeframe: "2020 – Present",
      organization: "Lockheed Martin Space",
      badge: "Systems & UX Leadership",
    },
    // Customer Time Reclaimed
    {
      id: "val-7",
      title: "Customer & Operational Hours Reclaimed",
      value: "705k+",
      label: "Customer Hours Saved",
      category: "efficiency",
      domain: "Enterprise Automation",
      type: "quantitative",
      description:
        "Removed processing bottlenecks and manual paperwork using automated digital workflows across customer service points.",
      impactHighlight:
        "Faster transaction turnaround across branch operations.",
      timeframe: "2024 – Present",
      organization: "Enterprise Customer Operations Automation",
      badge: "Customer Impact",
    },
    // Multi-Facility Scale Scope
    {
      id: "val-8",
      title: "Enterprise Multi-Facility Modernization Scope",
      value: "450",
      label: "Regional Facilities Modernized",
      category: "scale",
      domain: "Enterprise Automation",
      type: "quantitative",
      description:
        "Rolled out Power Platform systems across 450 enterprise facility locations without a single service outage.",
      impactHighlight:
        "Zero unplanned downtime during nationwide multi-facility deployment.",
      timeframe: "2024 – Present",
      organization: "Enterprise Internal Operations Automation",
      badge: "Scale & Rollout",
    },
    // Audit Defect Elimination
    {
      id: "val-9",
      title: "Facility Audit Compliance & Error Elimination",
      value: "0.0%",
      label: "Audit Error Rate Achieved",
      category: "governance",
      domain: "Enterprise Automation",
      type: "quantitative",
      description:
        "Removed compliance discrepancies across 450 facility logs using automated validation rules and daily escalation tracking.",
      impactHighlight:
        "Passed corporate audits with zero findings across two consecutive evaluation cycles.",
      timeframe: "2024 – Present",
      organization: "Enterprise Compliance Automation",
      badge: "Zero-Defect Quality",
      beforeAfter: {
        before: "7.5% Error Baseline",
        after: "0.0% Perfect Audit",
        metricName: "Facility Audit Discrepancies",
      },
    },
    // Operation Allies Refuge Crisis Logistics
    {
      id: "val-10",
      title: "Humanitarian Logistics Productivity Surge (OAR)",
      value: "+66%",
      label: "Deployment Productivity Boost",
      category: "efficiency",
      domain: "Military Logistics & Readiness",
      type: "quantitative",
      description:
        "Built automated Power Query ETL pipelines in Qatar during Operation Allies Refuge to track shelf-life and forecast inventory burn rates.",
      impactHighlight:
        "Cut nightly inventory reconciliation from 3 hours to 5 minutes during crisis response.",
      timeframe: "2019 – Present",
      organization: "US Air Force (Active Duty / AFRC)",
      badge: "Mission Critical",
      beforeAfter: {
        before: "20% Re-issue Errors",
        after: "<5% Error Rate",
        metricName: "Supply Reconciliation Errors",
      },
    },
    // DevSecOps Supply Chain & SBOM
    {
      id: "val-11",
      title: "Disconnected Enterprise SBOM CI/CD Coverage",
      value: "40+",
      label: "Producer Repositories Hardened",
      category: "governance",
      domain: "Defense & Space",
      type: "quantitative",
      description:
        "Built reusable GitLab CI/CD pipelines with Trivy security scans, package checksum validation, and automated SBOM generation.",
      impactHighlight:
        "Blocked public internet vulnerabilities across 40+ classified software repositories.",
      timeframe: "2020 – Present",
      organization: "Lockheed Martin Space",
      badge: "DevSecOps & Supply Chain",
    },
    // Major Defense Program Onboarding
    {
      id: "val-12",
      title: "Major Defense Programs Onboarded Block-Free",
      value: "10+",
      label: "Defense Programs Onboarded",
      category: "scale",
      domain: "Defense & Space",
      type: "quantitative",
      description:
        "Standardized onboarding blueprints and pre-configured firewall port matrices for major programs like NGI, MK21A, MONET, and STARWAN.",
      impactHighlight:
        "Zero deployment delays caused by missing network ports across all 10 programs.",
      timeframe: "2020 – Present",
      organization: "Lockheed Martin Space",
      badge: "Program Interface",
    },
    // Enterprise Capital Pipeline Analytics
    {
      id: "val-13",
      title: "Enterprise Capital & Pipeline Queue Visibility",
      value: "$280M+",
      label: "Active Capital Pipelines Tracked",
      category: "scale",
      domain: "Enterprise Automation",
      type: "quantitative",
      description:
        "Built executive tracking portals for $280M+ in active capital allocation queues and delivered compliance analytics across a $15B+ asset portfolio.",
      impactHighlight:
        "Isolated processing bottlenecks with granular Row-Level Security (RLS) controls.",
      timeframe: "2024 – Present",
      organization:
        "Enterprise Executive Analytics (Internal Stretch Assignment)",
      badge: "Portfolio Analytics",
    },
    // Monorepo Pure Calculation Engine Test Coverage
    {
      id: "val-14",
      title: "Pure Calculation Engine Unit Test Coverage",
      value: "100%",
      label: "Unit Test Coverage on Core Engines",
      category: "governance",
      domain: "Software Solutions",
      type: "quantitative",
      description:
        "Enforced 100% unit test coverage across pure calculation packages (@repo/utils, @repo/engine) in MilCalc and Gospel Games.",
      impactHighlight:
        "Zero calculation errors and exact mathematical compliance with statutory military pay tables.",
      timeframe: "2024 – Present",
      organization: "HansOnCreations Monorepo",
      badge: "Code Integrity",
      beforeAfter: {
        before: "Coupled UI Logic",
        after: "100% Pure Test Coverage",
        metricName: "Engine Test Isolation",
      },
    },
    // Enterprise AI Enablement
    {
      id: "val-15",
      title: "Engineers & Analysts Trained in AI Agents",
      value: "50+",
      label: "Enterprise Practitioners Trained",
      category: "scale",
      domain: "Academic & Research",
      type: "quantitative",
      description:
        "Designed and led hands-on AI agent workshops, building live agentic workflows in Google Gemini Enterprise.",
      impactHighlight:
        "Trained 50+ analysts and helped establish internal AI agent governance standards.",
      timeframe: "2024 – Present",
      organization: "Enterprise AI Enablement Program",
      badge: "AI Enablement",
    },
    // Academic & Graduate Research
    {
      id: "val-16",
      title: "Academic & Graduate Research Rigor",
      value: "4.0",
      label: "M.S. Data Science GPA (UC Berkeley)",
      category: "governance",
      domain: "Academic & Research",
      type: "quantitative",
      description:
        "Master of Science in Data Science from UC Berkeley with a 4.0/4.0 GPA, focusing on deep learning, applied ML, and audio transcription.",
      impactHighlight:
        "Achieved R² = 0.952 on financial time-series forecasting benchmarks.",
      timeframe: "2024 – 2026",
      organization: "University of California, Berkeley",
      badge: "Academic Excellence",
    },
    // Institutional Web Platforms & SQL Migration (UCCS)
    {
      id: "val-17",
      title: "Institutional Web Platforms & SQL Migrations",
      value: "100%",
      label: "Data Integrity on Academic Migrations",
      category: "governance",
      domain: "Academic & Research",
      type: "quantitative",
      description:
        "Engineered university web portals and automated SQL schema migrations for UCCS, replacing legacy flat JSON stores with 100% data integrity.",
      impactHighlight:
        "Supported thousands of regional students and healthcare users across UCCS and UCHealth portals.",
      timeframe: "2019 – 2021",
      organization: "University of Colorado Colorado Springs",
      badge: "Institutional Systems",
    },
  ],

  // Qualitative Leadership Pillars (CAR Framework)
  qualitativePillars: [
    // Defense Platform Engineering Pillar
    {
      id: "pillar-1",
      title: "Classified CONOPS Authoring & SNO Modernization",
      domain: "Defense & Space",
      role: "Systems & Platform Engineer",
      organization: "Lockheed Martin Space",
      timeframe: "2020 – Present",
      summary:
        "Authored the formal Concept of Operations (CONOPS) for the Galaxy Test Bed and guided it through multi-board defense accreditations.",
      competencies: [
        "Concept of Operations (CONOPS)",
        "CARB / ARB / SIA Accreditations",
        "Single Node OpenShift (SNO)",
        "Zero-Trust Supply Chain",
      ],
      car: {
        context:
          "Nightly integration testing across classified defense programs ran on unstable servers, taking 10+ hours and lacking formal operational accreditation.",
        action:
          "Architected a containerized SNO cluster inside the Galaxy Test Bed and authored the formal CONOPS, securing approvals through ARB, SIA, and Classified CARB review boards. Stepped in as Scrum Master during a 50% developer reduction to keep sprint commitments on track.",
        result:
          "Secured full production accreditation, cut nightly test runs from 10 hours to 1 hour, and delivered executive live demonstrations on schedule.",
      },
      keyArtifacts: [
        "CARB-Approved CONOPS Document",
        "SNO Deployment Topology",
        "Network Port Security Matrices",
      ],
    },
    // Enterprise Automation Pillar
    {
      id: "pillar-2",
      title: "Enterprise Process Modernization & AI Enablement",
      domain: "Enterprise Automation",
      role: "Business Analyst & AI Champion",
      organization: "Enterprise Internal Operations Automation & AI Enablement",
      timeframe: "2024 – Present",
      summary:
        "Led multi-facility automation, audit compliance elimination, and enterprise AI agent training across 450 corporate sites.",
      competencies: [
        "Microsoft Power Platform",
        "Enterprise AI Agent Architecture",
        "Row-Level Security (RLS)",
        "Business Process Reengineering",
      ],
      car: {
        context:
          "Corporate facilities tracked keys and combinations in scattered Excel sheets, leading to a 7.5% audit error rate and 2,760 hours of manual reconciliation each year.",
        action:
          "Built a centralized Power Platform portal with automated escalation flows, created real-time executive capital pipeline dashboards ($280M+ queues), and conducted hands-on AI agent workshops for 50+ analysts.",
        result:
          "Achieved a 0.0% audit error rate across 450 sites, delivered $662,400 in annualized operational savings, and established enterprise AI standards.",
      },
      keyArtifacts: [
        "Enterprise Power Apps Portal",
        "Executive Power BI Pipeline Dashboards",
        "Grounded Gemini Agent Workshop Curriculum",
      ],
    },
    // Military Operations Leadership & Data Engineering Pillar
    {
      id: "pillar-3",
      title: "Expeditionary Program Leadership & Mission Data Systems",
      domain: "Military Logistics & Readiness",
      role: "Logistics Operations Officer & Data Systems Lead",
      organization: "United States Air Force",
      timeframe: "2019 – Present",
      summary:
        "Directed a $92M theater maintenance hub, negotiated $5M in contractor repair savings, and engineered automated ETL pipelines for crisis response.",
      competencies: [
        "Mission-Critical Logistics",
        "Contract Negotiation ($5.0M)",
        "Power Query ETL Pipelines",
        "High-Reliability Operations",
      ],
      car: {
        context:
          "Managing high-tempo flightline maintenance and humanitarian evacuation across AFCENT required strict property accountability, contractor oversight, and rapid crisis data handling.",
        action:
          "Directed AFCENT's sole $92M Wheel & Tire repair hub, coordinating 2,000 shipments across 20 Wings and negotiating a $5.0M retread contract with Boeing-Qatar. Restored 29 critical defense assets ($750k returned to inventory) and built automated Power Query ETL pipelines to model shelf-life and burn rates during Operation Allies Refuge.",
        result:
          "Cut supply errors from 20% to under 5%, slashed nightly reconciliation from 3 hours to 5 minutes, sustained 100% property accountability across 2,216 aeromedical assets ($672k), and enabled 12,000 flight hours.",
      },
      keyArtifacts: [
        "AFCENT CRF $92M Operations Matrix",
        "Boeing-Qatar $5M Retread Program Record",
        "OAR Logistics Data Automation Pipeline",
      ],
    },
    // Proprietary Monorepo Pillar
    {
      id: "pillar-4",
      title: "Offline-First Mobile Architecture & Pure Calculation Engines",
      domain: "Software Solutions",
      role: "Sole Architect & Developer",
      organization: "HansOnCreations",
      timeframe: "2024 – Present",
      summary:
        "Built zero-crash, offline-first calculation applications serving military personnel in classified SCIFs and disconnected field operations.",
      competencies: [
        "Turborepo Monorepo",
        "React Native & Expo",
        "Pure Calculation Engines",
        "MMKV & SQLite Synchronization",
      ],
      car: {
        context:
          "Service members in SCIFs need accurate statutory calculation tools for fitness scores, pay, and pensions without network connectivity.",
        action:
          "Separated pure calculation logic into standalone packages (@repo/utils) with 100% unit test coverage, combining MMKV synchronous caching with SQLite local storage.",
        result:
          "Delivered fast, crash-proof mobile apps (MilCalc, Gospel Games) with reliable offline performance and modular code reusability.",
      },
      keyArtifacts: [
        "MilCalc Mobile Suite (@repo/utils)",
        "Gospel Games Engine (@repo/engine)",
        "Turborepo Shared Package Architecture",
      ],
    },
    // Applied AI Capstone Pillar
    {
      id: "pillar-5",
      title: "Applied Machine Learning & Biomechanical Tablature Synthesis",
      domain: "Academic & Research",
      role: "Lead Machine Learning Architect",
      organization: "UC Berkeley (Capstone Research)",
      timeframe: "2025 – 2026",
      summary:
        "Built an Automatic Music Transcription (AMT) system transforming polyphonic guitar audio into biomechanically ergonomic tablature.",
      competencies: [
        "PyTorch & Deep Learning",
        "Spotify Basic Pitch AMT",
        "Prox-Viterbi Pathfinding",
        "FastAPI & AWS ECS Fargate",
      ],
      car: {
        context:
          "Standard music transcription models generate unplayable guitar tabs because they ignore hand anatomy, finger strain, and physical fretboard shifts.",
        action:
          "Connected Spotify Basic Pitch note detection with a causal TabTransformer prior and custom Viterbi pathfinding to penalize awkward finger stretches.",
        result:
          "Produced natural, playable tablature verified on GuitarSet benchmarks and deployed an interactive playback engine on AWS ECS Fargate.",
      },
      keyArtifacts: [
        "Fretwork Transcription Engine",
        "Prox-Viterbi Optimization Algorithm",
        "FastAPI Containerized Microservice",
      ],
    },
    // Youth Tech Mentorship Pillar
    {
      id: "pillar-6",
      title: "Youth Tech Mentorship & Community Programs",
      domain: "Academic & Research",
      role: "Founder & Lead Mentor",
      organization: "Youth Tech Mentorship Bootcamp",
      timeframe: "2023 – Present",
      summary:
        "Founded and instructed an intensive remote coding bootcamp helping young adults launch professional engineering careers.",
      competencies: [
        "Curriculum Design & Instruction",
        "React Native & Mobile Dev",
        "Agile Team Coaching",
        "Career Sponsorship",
      ],
      car: {
        context:
          "College students and early-career developers often struggle to bridge the gap between classroom theory and building production software.",
        action:
          "Ran an 8-week remote mobile engineering bootcamp, mentoring 15+ students through building production React Native apps with Git collaboration.",
        result:
          "Graduated 15+ young adults, connecting them with industry mentors at Google, Deloitte, and Booz Allen Hamilton to help them land engineering roles.",
      },
      keyArtifacts: [
        "Bootcamp Mobile Curriculum",
        "Student Production Apps",
        "Industry Mentorship Network",
      ],
    },
  ],

  // Interactive Analytical Visualizer Data Arrays
  charts: {
    // 6-Axis Radar Competency Axes
    radar: [
      {
        axis: "Communication",
        score: 95,
        years: 10,
        tenureDisplay: "Top Tier",
        benchmark:
          "Executive Briefings | Multi-Board Defense Governance (ARB/CARB) & Enterprise AI Workshops",
        description:
          "Mediated RF engineering and business requirements for an 800% adoption boost, presented executive portfolio analytics, and trained 50+ analysts in AI workflows.",
        domain: "Academic & Research",
        category: "Scale & Growth",
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
      },
      {
        axis: "Systems Eng",
        score: 90,
        years: 9,
        tenureDisplay: "Lead Level",
        benchmark:
          "B.S. Electrical Engineering | SNO Cluster Architecture, CARB CONOPS & 10+ Program Blueprints",
        description:
          "Single Node OpenShift deployment (10x test speedup), hardware-software integration, and zero-trust container supply chain security across 40+ repos.",
        domain: "Defense & Space",
        category: "Efficiency & Speed",
        era: "2020 – Present (Lockheed Martin Space & Defense SNO)",
      },
      {
        axis: "Supply Chain",
        score: 88,
        years: 9,
        tenureDisplay: "Director Level",
        benchmark:
          "USAF Officer (41A3) & Prior NCOIC | $92M AFCENT Hub, $5M Boeing Retread & 34th AES Readiness",
        description:
          "Expeditionary supply chain leadership, aeromedical equipment readiness across 2,216 assets ($672k), and international contractor negotiations.",
        domain: "Military Logistics & Readiness",
        category: "Scale & Growth",
        era: "2015 – 2019 (USAF Expeditionary Logistics)",
      },
      {
        axis: "Software Tech",
        score: 85,
        years: 7,
        tenureDisplay: "Full-Stack Lead",
        benchmark:
          "Monorepo Architect | Turborepo, React Native Expo, TypeScript & 100% Core Test Coverage",
        description:
          "Decoupled calculation engines (@repo/utils, @repo/engine), offline-first SQLite/MMKV architecture, and cross-platform mobile apps.",
        domain: "Software Solutions",
        category: "Governance & Quality",
        era: "2019 – 2021 (UCCS Dev & USAF Deployed Ops)",
      },
      {
        axis: "Automation & BI",
        score: 92,
        years: 6,
        tenureDisplay: "Architect Level",
        benchmark:
          "450-Site Architecture | Power Platform, REST API 2.0, DAX Models & 0.0% Audit Defect Rate",
        description:
          "Re-engineered facility operations data pipelines, automated $280M+ capital queues with Row-Level Security, and generated $662k/yr hard savings.",
        domain: "Enterprise Automation",
        category: "Financial ROI",
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
      },
      {
        axis: "AI & Data Science",
        score: 88,
        years: 4,
        tenureDisplay: "Graduate Level",
        benchmark:
          "UC Berkeley M.S. (4.0 GPA) | TabTransformer AMT, Multivariate LSTM (R²=0.952) & Grounded AI Agents",
        description:
          "Applied machine learning systems, statistical time-series forecasting, and enterprise cognitive agent workflows.",
        domain: "Academic & Research",
        category: "Efficiency & Speed",
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
      },
    ],

    // Cross-Functional Impact Vectors (Bundled Multipliers)
    multipliers: [
      {
        id: "vec-cost",
        label: "Total Financial ROI",
        metric: "Cost Savings & Avoidance",
        value: 96,
        displayValue: "$9.6M+",
        baseline: "Unoptimized procurement & manual overhead",
        optimized:
          "Boeing retread ($5M), enterprise ROI ($1.7M+), asset recoupment ($1.7M+)",
        domain: "Military Logistics & Readiness",
        category: "Financial ROI",
        era: "2020 – 2024: Systems Engineering & Program Management",
        color: CHART_PALETTE.MILITARY_PURPLE,
      },
      {
        id: "vec-time",
        label: "Labor Hours Reclaimed",
        metric: "Workforce Hours Saved",
        value: 88,
        displayValue: "705k+ hrs",
        baseline: "Manual paper logs & 2,760 annual BA hours",
        optimized:
          "Power Platform across 450 sites & automated ideation tracking",
        domain: "Enterprise Automation",
        category: "Efficiency & Speed",
        era: "2024 – Present: Infrastructure & Enterprise Automation",
        color: CHART_PALETTE.ENTERPRISE_BLUE,
      },
      {
        id: "vec-speed",
        label: "Workflow Velocity",
        metric: "Cycle-Time Acceleration",
        value: 92,
        displayValue: "36x faster",
        baseline: "3-hour crisis reconciliation & 10-hour test runs",
        optimized:
          "5-min Power Query ETL & 1-hour OpenShift SNO cluster builds",
        domain: "Military Logistics & Readiness",
        category: "Efficiency & Speed",
        era: "2015 – 2019: Logistics & Supply Chain",
        color: CHART_PALETTE.ACADEMIC_AMBER,
      },
      {
        id: "vec-risk",
        label: "Risk & Defect Quality",
        metric: "Audit Defect Elimination",
        value: 98,
        displayValue: "0.0% error",
        baseline: "7.5% facility audit errors & 20% stockout errors",
        optimized:
          "0.0% audit defect rate & 100% aeromedical property accountability",
        domain: "Enterprise Automation",
        category: "Governance & Quality",
        era: "2024 – Present: Infrastructure & Enterprise Automation",
        color: CHART_PALETTE.ECOSYSTEM_EMERALD,
      },
      {
        id: "vec-security",
        label: "Supply Chain Security",
        metric: "Air-Gapped Repos Hardened",
        value: 84,
        displayValue: "40+ repos",
        baseline: "Direct public registry access in air-gapped environments",
        optimized:
          "Internal Harbor/Nexus proxy-caches & automated CycloneDX SBOM",
        domain: "Defense & Space",
        category: "Governance & Quality",
        era: "2020 – 2024: Systems Engineering & Program Management",
        color: CHART_PALETTE.DEFENSE_RED,
      },
      {
        id: "vec-scale",
        label: "Program Adoption Scale",
        metric: "Cross-Program Expansion",
        value: 86,
        displayValue: "800% growth",
        baseline: "2 pilot programs with requirements gridlock",
        optimized: "10+ active defense programs & 450 commercial facilities",
        domain: "Defense & Space",
        category: "Scale & Growth",
        era: "2020 – 2024: Systems Engineering & Program Management",
        color: CHART_PALETTE.ANALYTICS_CYAN,
      },
    ],

    // Cumulative Savings and Hours Trajectory
    timeline: [
      {
        period: "2015 – 2019",
        year: 2019,
        era: "2015 – 2019: Logistics & Supply Chain",
        cumulativeROI: 1.09,
        displayROI: "$1.09M",
        cumulativeHours: 15,
        displayHours: "15k hrs",
        milestone:
          "Logistics & Supply Chain: $960k chemical defense shelf-life recertification & $130k inventory recovery.",
      },
      {
        period: "2019 – 2021",
        year: 2021,
        era: "2019 – 2021: Software Dev & Expeditionary Logistics",
        cumulativeROI: 1.84,
        displayROI: "$1.84M",
        cumulativeHours: 65,
        displayHours: "65k hrs",
        milestone:
          "Software Dev & Expeditionary Logistics: $750k FOB/PQDR asset recoupment & crisis supply ETL automation (36x speedup).",
      },
      {
        period: "2020 – 2024",
        year: 2024,
        era: "2020 – 2024: Systems Engineering & Program Management",
        cumulativeROI: 7.85,
        displayROI: "$7.85M",
        cumulativeHours: 240,
        displayHours: "240k hrs",
        milestone:
          "Systems Engineering & Program Management: $5.0M Boeing retread contract, $1.0M MESHc funding capture, and OpenShift SNO cluster deployment (10x test cut).",
      },
      {
        period: "2024 – Present",
        year: 2026,
        era: "2024 – Present: Infrastructure & Enterprise Automation",
        cumulativeROI: 9.61,
        displayROI: "$9.61M",
        cumulativeHours: 705,
        displayHours: "705k+ hrs",
        milestone:
          "Infrastructure & Enterprise Automation: $662k/yr facility modernization across 450 sites, $1.1M ideation platform, Berkeley M.S. (4.0 GPA), and production app monorepos.",
      },
    ],

    // Impact Domain Distribution
    distribution: [
      {
        name: "Military Logistics & Readiness",
        value: 45,
        percentage: 45,
        color: CHART_PALETTE.MILITARY_PURPLE,
        domain: "Military Logistics & Readiness",
        description:
          "$92M AFCENT maintenance hub, $5.0M Boeing contract savings, and 34th AES aeromedical asset readiness ($672k).",
      },
      {
        name: "Enterprise Automation",
        value: 30,
        percentage: 30,
        color: CHART_PALETTE.ENTERPRISE_BLUE,
        domain: "Enterprise Automation",
        description:
          "450-site automation ($662k/yr), $1.1M innovation platform, and executive pipeline analytics ($280M+).",
      },
      {
        name: "Defense & Space",
        value: 15,
        percentage: 15,
        color: CHART_PALETTE.DEFENSE_RED,
        domain: "Defense & Space",
        description:
          "Lockheed Martin Space GTB SNO cluster (10x test speedup), MESHc defense catalog ($1.0M), and 10+ program integrations.",
      },
      {
        name: "Software Solutions",
        value: 5,
        percentage: 5,
        color: CHART_PALETTE.ECOSYSTEM_EMERALD,
        domain: "Software Solutions",
        description:
          "HansOnCreations monorepo suite (MilCalc, Gospel Games, CaroHans, Unpack) with 100% unit-tested calculation engines.",
      },
      {
        name: "Academic & Research",
        value: 5,
        percentage: 5,
        color: CHART_PALETTE.ACADEMIC_AMBER,
        domain: "Academic & Research",
        description:
          "UC Berkeley M.S. Data Science (4.0 GPA), UCCS institutional platforms & UCHealth portals, Fretwork AMT audio ML, and STEM youth mentorship.",
      },
    ],
  },
};
