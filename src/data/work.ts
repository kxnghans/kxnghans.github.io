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
        "Built automated Microsoft Power Query ETL pipelines during a Qatar deployment (Operation Allies Refuge) to track perishable supplies and forecast burn rates, boosting operational productivity by 66%, cutting nightly reconciliation from 3 hours to 5 minutes, and reducing supply errors from 20% to <5%.",
        "Built transaction regression models and shift contingency plans during pandemic restrictions, maintaining a 91% mission capable rate (7% above baseline) with zero workplace outbreaks.",
        "Led quality assurance of flight line assets for fighter, cargo, and tanker aircraft during high-tempo operations, earning the 22nd Numbered Air Force (NAF) Airman of the Year award.",
        "Maintained inventory databases and enforced strict DoD data protection protocols in accordance with military compliance standards.",
      ],
    },
  },
];

