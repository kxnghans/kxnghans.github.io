import type { WorkExperience } from "../types/data";

// Work Experience Dataset (SSOT)
// Professional career achievements across Defense, Enterprise, and Military Logistics.
export const workData: WorkExperience[] = [
  // Lockheed Martin Space - Systems Engineer & Sr Business Analyst
  {
    title: "Systems Engineer & Sr Business Analyst",
    imageUrl: "/assets/generated/work/lockheed-martin.webp",
    summary: [
      "Lockheed Martin, Space",
      "Projects: MESHc (Space EBOM), Testbed Infra & SBOM",
      "Focus: CONOPs & Roadmap, Agile Leadership, Infrastructure",
      "Tools: JIRA, Confluence, MS Suite, GitLab",
    ],
    details: {
      title: "Systems Engineer & Sr Business Analyst",
      subtitle: "Lockheed Martin, Space | June 2020 to Present",
      details: [
        "Architected Single Node OpenShift (SNO) clusters in the Galaxy Test Bed (GTB). This cut nightly automated test runs from 10 hours to 1 hour and saved over $10,000 in infrastructure costs.",
        "Authored the formal Concept of Operations (CONOPS) for GTB and secured accreditations across the Architecture Review Board (ARB), Security & Information Assurance (SIA), and Classified Review (CARB).",
        "Led requirements analysis and stakeholder UX for MESHc (Master Software & Hardware Catalog), an enterprise platform managing Engineering Bills of Materials (EBOM) and technical requirements. Interactive Adobe XD prototypes grew adoption from 2 to 10 programs, prevented 1 month of UI rework, and secured $1.0M in follow-on funding.",
        "Led technical onboarding on the Galaxy Assist team. Standardized blueprints and network port matrices to onboard 10+ defense programs (NGI, MK21A, MONET, STARWAN) with zero firewall blockers.",
        "Stepped in as Scrum Master during a 50% team reduction, restructuring sprint backlogs around shared internal libraries to deliver VP live demonstrations on schedule.",
        "Hardened air-gapped software supply chains by routing all package registries and container images strictly through internal Harbor and Nexus proxy-caches.",
        "Built automated GitLab CI/CD pipelines with Trivy security scanning, checksum verification, and CycloneDX Software Bill of Materials (SBOM) generation across 40+ producer repositories.",
        "Engineered dimensional data models and automated telemetry dashboards in Jira and Power BI, giving executive leadership weekly visibility into developer velocity and tool adoption.",
      ],
      exposure: [
        "MESHc (Space EBOM)",
        "OpenShift SNO",
        "Kubernetes",
        "AWS / Azure",
        "GitLab CI/CD",
        "Trivy / SBOM",
        "Harbor & Nexus",
        "Power BI & DAX",
        "Adobe XD",
      ],
    },
  },

  // UCCS - Software Developer
  {
    title: "Software Developer",
    imageUrl: "/assets/generated/work/uccs-software.webp",
    summary: [
      "UCCS",
      "Stack: TypeScript, VueJS, PHP, SQL",
      "Projects: Education & Healthcare",
      "Role: Full-Stack Development",
    ],
    details: {
      title: "Software Developer",
      subtitle: "UCCS | November 2019 to December 2021",
      details: [
        "Built and maintained full-stack web applications for University of Colorado partners, including the Pikes Peak regional education portal and the UCHealth patient management system.",
        "Developed responsive web interfaces with TypeScript, VueJS, PHP, and SQL, leading user training sessions for university staff and regional partner teams.",
        "Migrated legacy flat JSON data stores to relational SQL databases using Linux command-line scripts for automated schema validation, data backups, and indexing.",
      ],
      exposure: [
        "TypeScript",
        "VueJS",
        "PHP",
        "SQL / MySQL",
        "Database Migrations",
        "REST APIs",
        "Linux CLI",
      ],
    },
  },

  // United States Air Force - Supply Chain Manager & Medical Service Corps Officer
  {
    title: "Supply Chain Manager",
    imageUrl: "/assets/generated/work/air-force-supply.webp",
    summary: [
      "US Air Force",
      "Role: Aircraft Repair Cycle & Aeromedical Evac Ops",
      "Focus: Logistics & Data Analysis",
      "Award: Airman of the Year",
    ],
    details: {
      title: "Supply Chain Manager",
      subtitle:
        "US Air Force | September 2015 to Present – 2 Middle East Deployments",
      details: [
        "Commissioned as Medical Service Corps (MSC) Officer (Health Services Administrator, 41A3), directing medical logistics and equipment readiness for the 34th Aeromedical Evacuation Squadron (AES).",
        "Modernized aeromedical unit operations through digital records archiving, cutting inventory audit turnaround by 50% and maintaining 100% property accountability across 2,216 items valued at $672K.",
        "Directed AFCENT's $92M Wheel and Tire repair hub (CRF) at Al Udeid Air Base (Qatar) as NCOIC, overseeing 2,000 shipments across 20 Wings supporting 7 airframe configurations (ISO OFS, OIR, and OSS).",
        "Negotiated an international retread contract program with Boeing-Qatar for 4,700 aircraft wheel and tire assemblies, saving the Air Force $5.0M in repair costs.",
        "Built automated Power Query ETL pipelines during Operation Allies Refuge (Qatar) to track shelf-life and forecast burn rates. This cut nightly reconciliation from 3 hours to 5 minutes, lifted daily throughput by 66%, and reduced supply errors from 20% to under 5%.",
        "Revived dormant Found on Base (FOB) and Product Quality Deficiency Report (PQDR) programs as Acting Section Chief, recovering 29 critical aircraft assets and returning $750K to DoD inventory.",
        "Coordinated logistics for the 302d Airlift Wing C-130 fleet and Modular Airborne Fire Fighting System (MAFFS) wildfire response (31 airdrops, 72k gallons of retardant). Delivered 71 mission assets ($5.5M) with zero discrepancies during catastrophic hail recovery.",
        "Executed 386 Government Purchase Card transactions worth $179K in under 3 weeks for deployment taskings and managed $41M in equipment inventory across 44 locations, receiving 22nd Numbered Air Force Airman of the Year and 386 AEW Diamond Sharp honors.",
      ],
      exposure: [
        "Aeromedical Readiness",
        "Expeditionary Logistics",
        "DoD Supply Chain",
        "Power Query ETL",
        "Process Optimization",
        "Inventory Control",
        "Government Purchase Card (GPC)",
      ],
    },
  },
];
