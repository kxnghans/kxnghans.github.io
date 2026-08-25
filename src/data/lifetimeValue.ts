import type { LedgerEntry, LifetimeValueData } from "../types/data";


export const VALUE_DOMAINS = [
  "Defense & Space",
  "Enterprise & Fintech",
  "Proprietary Ecosystem",
  "Military Operations",
  "Academic & Community",
];

export const IMPACT_CATEGORIES = [
  "Efficiency & Speed",
  "Scale & Growth",
  "Governance & Quality",
  "Financial ROI",
];

export const CAREER_ERAS = [
  "2015 – 2019 (USAF Expeditionary Logistics)",
  "2019 – 2021 (UCCS Dev & USAF Deployed Ops)",
  "2020 – Present (Lockheed Martin Space & Defense SNO)",
  "2024 – Present (Enterprise Scale, AI & 34th AES)",
];

export const FINANCIAL_LEDGER: LedgerEntry[] = [
  { id: "led-1", label: "Boeing Retread Repair Savings", domain: "Military Operations", amountM: 5.0 },
  { id: "led-2", label: "ETDC Shelf-Life Recertification", domain: "Military Operations", amountM: 0.96 },
  { id: "led-3", label: "FOB/PQDR Asset Recoupment", domain: "Military Operations", amountM: 0.75 },
  { id: "led-4", label: "DLADS Inventory Recovery", domain: "Military Operations", amountM: 0.13 },
  { id: "led-5", label: "Innovation Platform First-Year Savings", domain: "Enterprise & Fintech", amountM: 1.1 },
  { id: "led-6", label: "Branch Facilities Annualized Savings", domain: "Enterprise & Fintech", amountM: 0.6624 },
  { id: "led-7", label: "MESHc Follow-on Program Funding", domain: "Defense & Space", amountM: 1.0 },
  { id: "led-8", label: "SNO Infrastructure Overhead Avoided", domain: "Defense & Space", amountM: 0.01 },
];

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
    {
      id: "val-1",
      title: "Total Verified Operational & Innovation Savings",
      value: "$1.7M+",
      label: "Verified Financial ROI",
      category: "financial",
      domain: "Enterprise & Fintech",
      type: "quantitative",
      description:
        "Cumulative financial savings validated across enterprise operations, facility automation, and employee innovation pipelines.",
      impactHighlight: "Direct bottom-line efficiency savings across multi-branch enterprise environments.",
      timeframe: "2024 – Present",
      organization: "Lockheed Martin Space & Enterprise Operations Cross-Assignment",
      badge: "Flagship ROI",
    },
    {
      id: "val-2",
      title: "First-Year Innovation Platform Savings",
      value: "$1.1M",
      label: "Validated Operational Savings",
      category: "financial",
      domain: "Enterprise & Fintech",
      type: "quantitative",
      description:
        "Engineered Power BI gamification analytics tracking 19,000+ employee ideas, validating $1.1M first-year savings.",
      impactHighlight: "13% increase in enterprise employee participation.",
      timeframe: "2024 – Present",
      organization: "Enterprise Innovation Program (Internal Stretch Assignment)",
      badge: "Enterprise Gamification",
    },
    {
      id: "val-3",
      title: "Facilities Key & Combo Modernization ROI",
      value: "$662,400",
      label: "Annualized Cost Savings",
      category: "financial",
      domain: "Enterprise & Fintech",
      type: "quantitative",
      description:
        "Modernized manual branch management spreadsheets into unified Microsoft Power Platform across 450 branches ($55,200/mo).",
      impactHighlight: "2,760+ annual analyst hours saved with zero maintenance overhead.",
      timeframe: "2024 – Present",
      organization: "Enterprise Internal Operations Automation",
      badge: "Operational Automation",
      beforeAfter: {
        before: "$55.2k/mo lost time",
        after: "$0 manual overhead",
        metricName: "Monthly Operational Cost",
      },
    },
    {
      id: "val-4",
      title: "Single Node OpenShift (SNO) Testbed Acceleration",
      value: "10x",
      label: "Nightly CI/CD Cycle Reduction",
      category: "efficiency",
      domain: "Defense & Space",
      type: "quantitative",
      description:
        "Architected an SNO cluster within the Galaxy Test Bed (GTB), cutting nightly automated build and integration runtimes from 10+ hours to 1 hour.",
      impactHighlight: "Saved $10,000+ in infrastructure overhead while accelerating developer feedback loops.",
      timeframe: "2020 – Present",
      organization: "Lockheed Martin Space",
      badge: "Platform Engineering",
      beforeAfter: {
        before: "10+ Hours / Night",
        after: "1 Hour / Night",
        metricName: "Integration Test Duration",
      },
    },
    {
      id: "val-5",
      title: "Legacy Backend ETL Performance Optimization",
      value: "18x",
      label: "Data Refresh Acceleration",
      category: "efficiency",
      domain: "Enterprise & Fintech",
      type: "quantitative",
      description:
        "Upgraded legacy data extraction pipelines to REST API 2.0, cutting report refresh durations from 3+ hours down to under 10 minutes.",
      impactHighlight: "Near real-time analytics access for executive decision makers.",
      timeframe: "2024 – Present",
      organization: "Enterprise Data Engineering (Internal Stretch Assignment)",
      badge: "Data Engineering",
      beforeAfter: {
        before: "180+ Minutes",
        after: "<10 Minutes",
        metricName: "Report Refresh Cycle",
      },
    },
    {
      id: "val-6",
      title: "Enterprise MESHc User Adoption Surge",
      value: "800%",
      label: "Adoption Surge & Follow-on Funding",
      category: "scale",
      domain: "Defense & Space",
      type: "quantitative",
      description:
        "Conducted wireframing to resolve conflicting requirements between RF engineering and business teams, securing $1.0M in additional program funding.",
      impactHighlight: "Saved 1 month of UI backlog rework and increased active user adoption by 800%.",
      timeframe: "2020 – Present",
      organization: "Lockheed Martin Space",
      badge: "Systems & UX Leadership",
    },
    {
      id: "val-7",
      title: "Customer & Operational Hours Reclaimed",
      value: "705k+",
      label: "Customer Hours Saved",
      category: "efficiency",
      domain: "Enterprise & Fintech",
      type: "quantitative",
      description:
        "Eliminated customer transaction delays and internal compilation bottlenecks through streamlined digital workflows and automation.",
      impactHighlight: "Direct customer satisfaction boost and branch efficiency improvement.",
      timeframe: "2024 – Present",
      organization: "Enterprise Customer Operations Automation",
      badge: "Customer Impact",
    },
    {
      id: "val-8",
      title: "Enterprise Multi-Branch Modernization Scope",
      value: "450",
      label: "Branch Locations Modernized",
      category: "scale",
      domain: "Enterprise & Fintech",
      type: "quantitative",
      description:
        "Deployed enterprise Power Platform governance across 450 retail and commercial banking locations with 100% operational continuity.",
      impactHighlight: "Zero system downtime during nationwide multi-branch rollout.",
      timeframe: "2024 – Present",
      organization: "Enterprise Internal Operations Automation",
      badge: "Scale & Rollout",
    },
    {
      id: "val-9",
      title: "Branch Audit Compliance & Error Elimination",
      value: "0.0%",
      label: "Audit Error Rate Achieved",
      category: "governance",
      domain: "Enterprise & Fintech",
      type: "quantitative",
      description:
        "Eliminated compliance discrepancies across 450 branch logs by enforcing programmatic validation rules and automated escalation flows.",
      impactHighlight: "Passed corporate audits with zero findings and guaranteed 2-year compliance.",
      timeframe: "2024 – Present",
      organization: "Enterprise Compliance Automation",
      badge: "Zero-Defect Quality",
      beforeAfter: {
        before: "7.5% Error Baseline",
        after: "0.0% Perfect Audit",
        metricName: "Branch Audit Discrepancies",
      },
    },
    {
      id: "val-10",
      title: "Humanitarian Logistics Productivity Surge (OAR)",
      value: "+66%",
      label: "Deployment Productivity Boost",
      category: "efficiency",
      domain: "Military Operations",
      type: "quantitative",
      description:
        "Engineered automated Power Query ETL pipelines in Qatar during Operation Allies Refuge to track perishable inventory burn rates.",
      impactHighlight: "Cut nightly inventory reconciliation from hours to minutes under mission-critical conditions.",
      timeframe: "2019 – Present",
      organization: "US Air Force (Active Duty / ANG)",
      badge: "Mission Critical",
      beforeAfter: {
        before: "20% Re-issue Errors",
        after: "<5% Error Rate",
        metricName: "Supply Reconciliation Errors",
      },
    },
    {
      id: "val-11",
      title: "Disconnected Enterprise SBOM CI/CD Coverage",
      value: "40+",
      label: "Producer Repositories Hardened",
      category: "governance",
      domain: "Defense & Space",
      type: "quantitative",
      description:
        "Implemented reusable GitLab CI/CD pipelines integrating Trivy vulnerability scanning, deterministic package hashes, and automated SBOM generation.",
      impactHighlight: "Eliminated public internet attack vectors in classified build environments.",
      timeframe: "2020 – Present",
      organization: "Lockheed Martin Space",
      badge: "DevSecOps & Supply Chain",
    },
    {
      id: "val-12",
      title: "Major Defense Programs Onboarded Block-Free",
      value: "10+",
      label: "Defense Programs Onboarded",
      category: "scale",
      domain: "Defense & Space",
      type: "quantitative",
      description:
        "Authored standardized onboarding blueprints and pre-validated network security port matrices for programs including NGI, MK21A, MONET, and STARWAN.",
      impactHighlight: "Zero deployment network blockers encountered across all onboarded programs.",
      timeframe: "2020 – Present",
      organization: "Lockheed Martin Space",
      badge: "Program Interface",
    },
    {
      id: "val-13",
      title: "Commercial Loan Queue Real-Time Visibility",
      value: "$280M+",
      label: "Active Funding Queues Tracked",
      category: "scale",
      domain: "Enterprise & Fintech",
      type: "quantitative",
      description:
        "Built an EVP-sponsored tracking portal for $280M+ in active loan funding queues and delivered compliance analytics across a $15B+ commercial portfolio.",
      impactHighlight: "Isolated funding bottlenecks with granular Row-Level Security (RLS) enforcement.",
      timeframe: "2024 – Present",
      organization: "Enterprise Executive Analytics (Internal Stretch Assignment)",
      badge: "Fintech Analytics",
    },
    {
      id: "val-14",
      title: "Pure Calculation Engine Unit Test Coverage",
      value: "100%",
      label: "Unit Test Coverage on Core Engines",
      category: "governance",
      domain: "Proprietary Ecosystem",
      type: "quantitative",
      description:
        "Enforced 100% unit test coverage across pure calculation packages (@repo/utils, @repo/engine) in MilCalc and Gospel Games.",
      impactHighlight: "Zero-defect state machines and exact mathematical compliance with statutory pay tables.",
      timeframe: "2024 – Present",
      organization: "HansOnCreations Monorepo",
      badge: "Code Integrity",
      beforeAfter: {
        before: "Coupled UI Logic",
        after: "100% Pure Test Coverage",
        metricName: "Engine Test Isolation",
      },
    },
    {
      id: "val-15",
      title: "Engineers & Analysts Trained in AI Agents",
      value: "50+",
      label: "Enterprise Practitioners Trained",
      category: "scale",
      domain: "Academic & Community",
      type: "quantitative",
      description:
        "Designed and led 'Building & Deploying AI Agents in Banking' during Innovation Week, demonstrating live grounded Gemini agent architectures.",
      impactHighlight: "Established internal AI agent development standards and pilot adoption.",
      timeframe: "2024 – Present",
      organization: "Enterprise AI Enablement Program",
      badge: "AI Enablement",
    },
    {
      id: "val-16",
      title: "Academic & Graduate Research Rigor",
      value: "4.0",
      label: "M.S. Data Science GPA (UC Berkeley)",
      category: "governance",
      domain: "Academic & Community",
      type: "quantitative",
      description:
        "Master of Science in Data Science from UC Berkeley with 4.0/4.0 GPA, specializing in Deep Learning, Applied ML, and Music Information Retrieval.",
      impactHighlight: "Benchmark score R^2 = 0.952 on financial time-series LSTM models.",
      timeframe: "2024 – 2026",
      organization: "University of California, Berkeley",
      badge: "Academic Excellence",
    },
  ],
  qualitativePillars: [
    {
      id: "pillar-1",
      title: "Classified CONOPS Authoring & SNO Modernization",
      domain: "Defense & Space",
      role: "Systems & Platform Engineer",
      organization: "Lockheed Martin Space",
      timeframe: "2020 – Present",
      summary:
        "Authored the Concept of Operations (CONOPS) for the Galaxy Test Bed and guided it through stringent multi-board defense accreditations.",
      competencies: [
        "Concept of Operations (CONOPS)",
        "CARB / ARB / SIA Accreditations",
        "Single Node OpenShift (SNO)",
        "Zero-Trust Supply Chain",
      ],
      car: {
        context:
          "Nightly integration testing across classified defense programs was burdened by 10+ hour runtimes and lacked standardized operational accreditation.",
        action:
          "Architected a containerized SNO cluster within the Galaxy Test Bed and authored the formal CONOPS, shepherding it through Architecture Review Board (ARB), Security & Information Assurance (SIA), and Classified ARB (CARB).",
        result:
          "Achieved full production accreditation, cut nightly test cycles from 10+ hours to 1 hour (10x speedup), and saved $10,000+ in infrastructure overhead.",
      },
      keyArtifacts: [
        "CARB-Approved CONOPS Document",
        "SNO Deployment Topology",
        "Network Port Security Matrices",
      ],
    },
    {
      id: "pillar-2",
      title: "Enterprise Process Modernization & AI Enablement",
      domain: "Enterprise & Fintech",
      role: "Business Analyst & AI Champion",
      organization: "Enterprise Internal Operations Automation & AI Enablement",
      timeframe: "2024 – Present",
      summary:
        "Spearheaded multi-branch automation, audit compliance elimination, and enterprise AI agent training across 450 banking branches.",
      competencies: [
        "Microsoft Power Platform",
        "Enterprise AI Agent Architecture",
        "Row-Level Security (RLS)",
        "Business Process Reengineering",
      ],
      car: {
        context:
          "Branch facilities relied on fragmented Excel spreadsheets with 7.5% audit error rates and 2,760+ hours of annual manual BA reconciliation.",
        action:
          "Built a centralized Power Platform system with automated escalation flows, created real-time executive loan tracking portals ($280M+ queues), and conducted hands-on AI agent workshops for 50+ analysts.",
        result:
          "Achieved 0.0% audit error rates across 450 branches, delivered $662,400 in annualized operational savings, and established enterprise-wide AI agent standards.",
      },
      keyArtifacts: [
        "Enterprise Power Apps Portal",
        "Executive Power BI Loan Dashboards",
        "Grounded Gemini Agent Workshop Curriculum",
      ],
    },
    {
      id: "pillar-3",
      title: "Humanitarian Mission Logistics Data Engineering",
      domain: "Military Operations",
      role: "Logistics Lead & Operations Planner",
      organization: "United States Air Force",
      timeframe: "2019 – Present",
      summary:
        "Engineered automated ETL supply forecasting pipelines during rapid overseas crisis response for Operation Allies Refuge.",
      competencies: [
        "Mission-Critical Logistics",
        "Power Query ETL",
        "Perishable Supply Forecasting",
        "Contingency Readiness",
      ],
      car: {
        context:
          "Massive influx of personnel during Operation Allies Refuge in Qatar led to severe supply chain bottlenecks and a 20% inventory reconciliation error rate.",
        action:
          "Constructed automated Power Query ETL pipelines to track shelf-life expiration, predict burn rates, and automate nightly supply manifest reconciliation.",
        result:
          "Boosted operational productivity by 66%, slashed critical supply re-issue errors from 20% to <5%, and reduced inventory reconciliation from hours to minutes.",
      },
      keyArtifacts: [
        "OAR Logistics Data Pipeline",
        "Perishable Supply Forecasting Models",
        "Daily Mission Readiness Dashboards",
      ],
    },
    {
      id: "pillar-4",
      title: "Offline-First Mobile Architecture & Pure Calculation Engines",
      domain: "Proprietary Ecosystem",
      role: "Sole Architect & Developer",
      organization: "HansOnCreations",
      timeframe: "2024 – Present",
      summary:
        "Engineered zero-crash, offline-first calculation applications serving military personnel in classified SCIFs and disconnected field operations.",
      competencies: [
        "Turborepo Monorepo",
        "React Native & Expo",
        "Pure Calculation Engines",
        "MMKV & SQLite Synchronization",
      ],
      car: {
        context:
          "Military members operating in SCIFs require exact statutory calculation tools (fitness scores, pay, pensions) without network access.",
        action:
          "Decoupled pure business calculation engines into standalone packages (@repo/utils) with 100% unit test coverage, pairing MMKV synchronous caching with SQLite storage.",
        result:
          "Delivered zero-latency, crash-proof mobile calculation suites (MilCalc, Gospel Games) with flawless offline execution and modular reusability.",
      },
      keyArtifacts: [
        "MilCalc Mobile Suite (@repo/utils)",
        "Gospel Games Engine (@repo/engine)",
        "Turborepo Shared Package Architecture",
      ],
    },
    {
      id: "pillar-5",
      title: "Applied Machine Learning & Biomechanical Tablature Synthesis",
      domain: "Academic & Community",
      role: "Lead Machine Learning Architect",
      organization: "UC Berkeley (Capstone Research)",
      timeframe: "2025 – 2026",
      summary:
        "Invented an Automatic Music Transcription (AMT) system transforming polyphonic guitar audio into biomechanically ergonomic tablature.",
      competencies: [
        "PyTorch & Deep Learning",
        "Spotify Basic Pitch AMT",
        "Prox-Viterbi Pathfinding",
        "FastAPI & AWS ECS Fargate",
      ],
      car: {
        context:
          "Existing music transcription models produce unplayable guitar tablature by ignoring human hand anatomy, finger strain, and physical fretboard shifts.",
        action:
          "Integrated Spotify's Basic Pitch note detection with a causal TabTransformer prior and custom Viterbi pathfinding to mathematically penalize unnatural finger shifts.",
        result:
          "Produced biologically ergonomic tablature verified on GuitarSet benchmarks and deployed an interactive playback engine on AWS ECS Fargate.",
      },
      keyArtifacts: [
        "Fretwork Transcription Engine",
        "Prox-Viterbi Optimization Algorithm",
        "FastAPI Containerized Microservice",
      ],
    },
    {
      id: "pillar-6",
      title: "Youth Tech Mentorship & Community Empowerment",
      domain: "Academic & Community",
      role: "Founder & Lead Mentor",
      organization: "Youth Tech Mentorship Bootcamp",
      timeframe: "2023 – Present",
      summary:
        "Founded and instructed an intensive remote coding bootcamp empowering young adults to launch professional engineering careers.",
      competencies: [
        "Curriculum Design & Instruction",
        "React Native & Mobile Dev",
        "Agile Team Coaching",
        "Career Sponsorship",
      ],
      car: {
        context:
          "Underrepresented youth often face steep barriers entering technical careers due to a lack of hands-on project coaching and professional networks.",
        action:
          "Structured an 8-week remote mobile engineering bootcamp, mentoring 15+ students through building production React Native applications with Git collaboration.",
        result:
          "Successfully graduated 15+ young adults, connecting them with industry mentors at Google, Deloitte, and Booz Allen Hamilton to jumpstart tech careers.",
      },
      keyArtifacts: [
        "Bootcamp Mobile Curriculum",
        "Student Production Apps",
        "Industry Mentorship Network",
      ],
    },
  ],
  charts: {
    radar: [
      {
        axis: "Communication",
        score: 95,
        years: 23,
        tenureDisplay: "23 Years",
        benchmark: "Lifelong Practice | Executive Briefings, AI Workshops, Military Briefs & Public Speaking",
        description:
          "Translating complex engineering architecture to executive stakeholders, delivering enterprise AI workshops, and cross-functional team leadership.",
        domain: "Academic & Community",
        category: "Scale & Growth",
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
      },
      {
        axis: "Systems Eng",
        score: 82,
        years: 11,
        tenureDisplay: "11 Years",
        benchmark: "B.S. Electrical Engineering | SNO GTB Cluster, CARB CONOPS & Hardware/Software MBSE",
        description:
          "Single Node OpenShift cluster deployment, classified CONOPS authoring, and mission hardware-software integration.",
        domain: "Defense & Space",
        category: "Efficiency & Speed",
        era: "2020 – Present (Lockheed Martin Space & Defense SNO)",
      },
      {
        axis: "Supply Chain",
        score: 80,
        years: 10,
        tenureDisplay: "10 Years",
        benchmark: "USAF Officer (41A3) & Prior NCOIC | $92M AFCENT CRF Hub, 2 Deployments & $5M Retread",
        description:
          "Expeditionary supply chain leadership, aeromedical equipment readiness, and international supplier cost avoidance.",
        domain: "Military Operations",
        category: "Scale & Growth",
        era: "2015 – 2019 (USAF Expeditionary Logistics)",
      },
      {
        axis: "Software Tech",
        score: 72,
        years: 7,
        tenureDisplay: "7 Years",
        benchmark: "Full-Stack Web & Mobile | Turborepo, React Native Expo, TypeScript & 100% Engine Test Coverage",
        description:
          "Decoupled domain engines, offline-first SQLite/MMKV architecture, and production cross-platform apps.",
        domain: "Proprietary Ecosystem",
        category: "Governance & Quality",
        era: "2019 – 2021 (UCCS Dev & USAF Deployed Ops)",
      },
      {
        axis: "Automation & BI",
        score: 68,
        years: 6,
        tenureDisplay: "6 Years",
        benchmark: "450-Site Rollout | Microsoft Power Platform, REST ETL Pipelines & 0.0% Audit Defect Rate",
        description:
          "Replacing legacy multi-branch spreadsheets with automated workflows, real-time analytics, and automated compliance tracking.",
        domain: "Enterprise & Fintech",
        category: "Financial ROI",
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
      },
      {
        axis: "AI & Data Science",
        score: 60,
        years: 4,
        tenureDisplay: "4 Years",
        benchmark: "UC Berkeley M.S. (4.0 GPA) | TabTransformer AMT, Multivariate LSTM & Enterprise Gemini Agents",
        description:
          "Biomechanical tablature Viterbi pathfinding, financial time-series forecasting, and enterprise cognitive agent workflows.",
        domain: "Academic & Community",
        category: "Efficiency & Speed",
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
      },
    ],
    multipliers: [
      {
        id: "mult-1",
        label: "Supply Reconciliation (OAR)",
        metric: "Nightly Reconciliation Speedup",
        value: 36,
        displayValue: "36x",
        baseline: "3 hrs / night",
        optimized: "5 min / night",
        domain: "Military Operations",
        category: "Efficiency & Speed",
        era: "2019 – 2021 (UCCS Dev & USAF Deployed Ops)",
        color: "#8b5cf6",
      },
      {
        id: "mult-2",
        label: "Executive Report ETL",
        metric: "Refresh Cycle Speedup",
        value: 18,
        displayValue: "18x",
        baseline: "180+ min per refresh",
        optimized: "<10 min per refresh",
        domain: "Enterprise & Fintech",
        category: "Efficiency & Speed",
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
        color: "#10b981",
      },
      {
        id: "mult-3",
        label: "SNO CI/CD Builds",
        metric: "Integration Cycle Speedup",
        value: 10,
        displayValue: "10x",
        baseline: "10 hrs / night",
        optimized: "1 hr / night",
        domain: "Defense & Space",
        category: "Efficiency & Speed",
        era: "2020 – Present (Lockheed Martin Space & Defense SNO)",
        color: "#ef4444",
      },
      {
        id: "mult-4",
        label: "Aeromedical Inventory",
        metric: "Inventory Pass Speedup",
        value: 2,
        displayValue: "2x",
        baseline: "Manual records pass",
        optimized: "50% faster digital workflow",
        domain: "Military Operations",
        category: "Governance & Quality",
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
        color: "#06b6d4",
      },
    ],

    timeline: [
      {
        period: "2015 – 2019",
        year: 2019,
        era: "2015 – 2019 (USAF Expeditionary Logistics)",
        cumulativeROI: 1.09,
        displayROI: "$1.09M",
        cumulativeHours: 15,
        displayHours: "15k hrs",
        milestone:
          "USAF ETDC Kuwait Theater Distribution: $960k Shelf-Life Recertification & $130k DLADS Recovery",
      },
      {
        period: "2019 – 2021",
        year: 2021,
        era: "2019 – 2021 (UCCS Dev & USAF Deployed Ops)",
        cumulativeROI: 1.84,
        displayROI: "$1.84M",
        cumulativeHours: 65,
        displayHours: "65k hrs",
        milestone:
          "$750k FOB/PQDR Recoupment & Operation Allies Refuge Power Query ETL (66% productivity boost)",
      },
      {
        period: "2020 – 2023",
        year: 2023,
        era: "2020 – Present (Lockheed Martin Space & Defense SNO)",
        cumulativeROI: 7.85,
        displayROI: "$7.85M",
        cumulativeHours: 240,
        displayHours: "240k hrs",
        milestone:
          "Lockheed Martin Space (June 2020+): $5.0M Boeing Retread Program, $1.0M MESHc Follow-on Funding & SNO GTB Cluster",
      },
      {
        period: "2024 – Present",
        year: 2026,
        era: "2024 – Present (Enterprise Scale, AI & 34th AES)",
        cumulativeROI: 9.61,
        displayROI: "$9.61M",
        cumulativeHours: 705,
        displayHours: "705k+ hrs",
        milestone:
          "Enterprise Scale: $1.1M Innovation Engine, $662k/yr Branch Automation Across 450 Sites, Berkeley M.S. AI & 34th AES Officer",
      },
    ],


    distribution: [
      {
        name: "Enterprise & Fintech",
        value: 50,
        percentage: 50,
        color: "#3b82f6",
        domain: "Enterprise & Fintech",
      },
      {
        name: "Defense & Space",
        value: 25,
        percentage: 25,
        color: "#ef4444",
        domain: "Defense & Space",
      },
      {
        name: "Academic & Community",
        value: 13,
        percentage: 13,
        color: "#f59e0b",
        domain: "Academic & Community",
      },
      {
        name: "Military Operations",
        value: 6,
        percentage: 6,
        color: "#8b5cf6",
        domain: "Military Operations",
      },
      {
        name: "Proprietary Ecosystem",
        value: 6,
        percentage: 6,
        color: "#10b981",
        domain: "Proprietary Ecosystem",
      },
    ],
  },
};

