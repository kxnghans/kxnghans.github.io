import type { WorkExperience } from "../types/data";

export const workData: WorkExperience[] = [
  {
    title: "Systems Engineer & Sr Business Analyst",
    imageUrl: "/assets/generated/work/lockheed-martin.webp",
    summary: [
      "Lockheed Martin, Space",
      "Role: Enterprise Cloud Architecture",
      "Focus: OpenShift SNO, CONOPS, SBOM, Kubernetes",
      "Impact: 10x Test Cycle Reduction & $1M+ Program ROI",
    ],
    details: {
      title: "Systems Engineer & Sr Business Analyst",
      subtitle: "Lockheed Martin, Space | June 2020 to Present",
      details: [
        "Deployed Single Node OpenShift (SNO) clusters in the Galaxy Test Bed (GTB). This cut nightly build cycles from 10 hours to 1 hour and saved over $10,000 in infrastructure costs.",
        "Wrote the Concept of Operations (CONOPS) for GTB and secured formal approvals through the Architecture Review Board (ARB), Security & Information Assurance (SIA), and Classified Review (CARB).",
        "Stepped up as Scrum Master during an emergency 50% team staffing cut, restructuring sprint roadmaps around shared internal libraries to deliver live VP demos on time.",
        "Mediated conflicting requirements between RF engineers and business leads on the MESHc catalog using Adobe XD wireframes. Expanded adoption from 2 to 10 programs (800% increase), cut a month of UI backlog, and helped secure $1.0M in follow-on funding.",
        "Led the Galaxy Assist team in standardizing deployment blueprints and firewall port matrices, onboarding 10+ defense programs (including NGI, MK21A, and STARWAN) without network delays.",
        "Secured disconnected container supply chains by routing all packages and container images strictly through internal Harbor and Nexus proxy-caches.",
        "Built GitLab CI/CD pipelines with Trivy vulnerability scanning, checksum verification, and automated SBOM generation across 40+ repositories.",
        "Built data models and automation workflows in Jira and Power BI to give executive leadership weekly visibility into delivery speed and tool usage.",
      ],
    },
  },
  {
    title: "Software Developer",
    imageUrl: "/assets/generated/work/uccs-software.webp",
    summary: [
      "UCCS",
      "Stack: TypeScript, Vue.js, PHP, SQL",
      "Projects: Education & Healthcare Apps",
      "Role: Full-Stack Web Development",
    ],
    details: {
      title: "Software Developer",
      subtitle: "UCCS | November 2019 to December 2021",
      details: [
        "Built and maintained full-stack web applications for University of Colorado partners, including the Pikes Peak education portal and the UCHealth management system.",
        "Developed web interfaces with TypeScript, Vue.js, PHP, and SQL, conducting user training sessions for university staff and regional partner organizations.",
        "Migrated legacy flat JSON data storage to relational SQL databases using Linux command-line tools for migrations, automated backups, and schema integrity.",
      ],
    },
  },
  {
    title: "Supply Chain Manager",
    imageUrl: "/assets/generated/work/air-force-supply.webp",
    summary: [
      "US Air Force",
      "Leadership: 2d Lt (MSC) & TSgt (NCOIC)",
      "Scope: Aeromedical Logistics & $92M CRF",
      "Impact: $5M+ Repair ROI & 50% Time Cut",
    ],
    details: {
      title: "Supply Chain Manager",
      subtitle:
        "US Air Force | September 2015 to Present – 2 Middle East Deployments",
      details: [
        "Commissioned as Medical Service Corps (MSC) Officer (Health Services Administrator, 41A3) directing medical logistics and contingency equipment readiness for the 34th Aeromedical Evacuation Squadron (AES).",
        "Modernized aeromedical evacuation unit operations through digital records and archive transformation, cutting inventory time by 50% and maintaining 100% asset accountability across 2,216 items valued at $672K.",
        "Served as NCOIC of the Centralized Repair Facility (CRF) at Al Udeid Air Base (Qatar), managing AFCENT's sole $92M Wheel & Tire repair hub directing 2,000 shipments across 20 Wings supporting 7 airframes (ISO OFS, OIR, and OSS).",
        "Partnered with Boeing-Qatar on a multi-national retread program for 3,000 aircraft wheel & tire assemblies and 1,700 C-17 assemblies, saving the Air Force over $5M in repair costs.",
        "Revived Found on Base (FOB) and Product Quality Deficiency Report (PQDR) programs as Acting Section Chief, repurposing 29 critical aircraft assets and recouping $750K to DoD inventory.",
        "Built automated Microsoft Power Query ETL pipelines during Operation Allies Refuge (Qatar) to model shelf-life and forecast burn rates, boosting productivity by 66%, cutting nightly reconciliation from 3 hours to 5 minutes, and reducing errors from 20% to <5%.",
        "Orchestrated rapid logistics support for 302d Airlift Wing C-130 fleet and Modular Airborne Fire Fighting System (MAFFS) wildfire response (31 airdrops, 72k gals retardant), delivering 71 critical assets ($5.5M) with 0 discrepancies to mitigate severe hail damage.",
        "Fulfilled 386 Government Purchase Card (GPC) transactions worth $179K in under 3 weeks for deployment readiness, and managed $41M ETDC inventory (190k items across 44 locations) earning 22nd Numbered Air Force Airman of the Year and 386 AEW Diamond Sharp awards.",
      ],
    },
  },
];

