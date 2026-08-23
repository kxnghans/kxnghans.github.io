import type { WorkExperience } from "../types/data";

export const workData: WorkExperience[] = [
  {
    title: "Systems Engineer & Business Analyst",
    imageUrl: "/assets/generated/work/lockheed-martin.webp",
    summary: [
      "Lockheed Martin Space",
      "Role: Enterprise Cloud Architecture",
      "Focus: OpenShift SNO, CONOPS, SBOM, Kubernetes",
      "Impact: 10x Test Cycle Reduction & $1M+ Program ROI",
    ],
    details: {
      title: "Systems Engineer & Business Analyst",
      subtitle: "Lockheed Martin Space | Enterprise Digital Transformation",
      details: [
        "Architected and deployed Single Node OpenShift (SNO) clusters in the Galaxy Test Bed (GTB), cutting nightly automated build cycles by 10x (from 10 hours to 1 hour) and saving $10,000+ in infrastructure overhead.",
        "Authored the Concept of Operations (CONOPS) for GTB, securing formal governance accreditation through Architecture Review Board (ARB), Security & Information Assurance (SIA), and Classified Architecture Review Board (CARB).",
        "Rearchitected disconnected container supply chains to eliminate external network vectors, sourcing packages strictly through internal Enterprise Harbor and Nexus proxy-caches.",
        "Engineered automated GitLab CI/CD pipelines with Trivy vulnerability scanning, deterministic package hashes, and automated Software Bill of Materials (SBOM) generation across 40+ defense repositories.",
        "Led cross-functional stakeholder negotiations and Adobe XD prototyping for the MESHc parts catalog, driving an 800% increase in active user adoption and securing $1.0M in follow-on program funding.",
        "Served as technical lead on the Galaxy Assist team, standardizing deployment blueprints and port matrices to onboard 10+ major defense programs with zero network blockers.",
        "Engineered enterprise automation workflows and data models tracking software delivery velocity, tool usage metrics, and sprint performance for executive leadership.",
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
      subtitle: "University of Colorado, Colorado Springs | Nov 2019 to Dec 2021",
      details: [
        "Built and maintained full-stack web applications for University of Colorado partners, including the Pikes Peak education portal and the UCHealth management system.",
        "Developed web interfaces with TypeScript, Vue.js, PHP, and SQL, conducting user training sessions for university staff and regional partner organizations.",
        "Migrated legacy flat JSON data storage to relational SQL databases using Linux command-line tools for migrations, automated backups, and schema integrity.",
      ],
    },
  },
  {
    title: "Supply Chain Manager & Operations Planner",
    imageUrl: "/assets/generated/work/air-force-supply.webp",
    summary: [
      "US Air Force",
      "Leadership: Supervised Team of 10",
      "Focus: Logistics & Data Pipelines",
      "Award: 22nd NAF Airman of the Year",
    ],
    details: {
      title: "Supply Chain Manager & Operations Planner",
      subtitle:
        "US Air Force | Sept 2015 to Present – 2 Middle East Deployments",
      details: [
        "Supervised a 10-person maintenance and logistics team in a centralized repair facility, managing inventory pipelines to deliver critical aircraft components on schedule.",
        "Built automated Microsoft Power Query ETL pipelines during a Qatar deployment to track perishable supplies and forecast burn rates, cutting inventory reconciliation from hours to minutes and reducing supply errors from 20% to <5%.",
        "Built transaction regression models and shift contingency plans during pandemic restrictions, maintaining a 91% mission capable rate (7% above baseline) with zero workplace outbreaks.",
        "Led quality assurance of flight line assets for fighter, cargo, and tanker aircraft during high-tempo operations, earning the 22nd Numbered Air Force (NAF) Airman of the Year award.",
        "Maintained inventory databases and enforced strict DoD data protection protocols in accordance with military compliance standards.",
      ],
    },
  },
];

