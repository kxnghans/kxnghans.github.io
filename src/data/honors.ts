import type { HonorItem } from "../types/data";

// Honors & Military Decorations Dataset (SSOT)
// Official awards, military medals, and academic distinctions.
export const honors: HonorItem[] = [
  // 1. Official Military Medals & Citations
  {
    title: "USAF Decorations and Medals",
    imageUrl: "/assets/generated/honors/decorations-medals.webp",
    summary: [
      "Medals: 2x Commendation, 1x Achievement",
      "Authority: AFCENT & 302 AW",
      "Impact: $5M+ Saved & 2,000 Shipments",
      "Scope: Al Udeid & Ali Al Salem Deployments",
    ],
    details: {
      title: "USAF Decorations and Medals",
      subtitle: "United States Air Force & Air Forces Central (AFCENT)",
      details: [
        "Air and Space Commendation Medal (1st Oak Leaf Cluster - Jul 2022): Awarded by Commander 9 AF (AFCENT) for outstanding service as NCOIC of the Centralized Repair Facility at Al Udeid Air Base, Qatar. Directed operations for AFCENT's sole $92M Wheel & Tire repair hub, coordinating 2,000 shipments across 20 Wings to support 7 airframes (in support of OFS, OIR, and OSS). Averted $750K in acquisition costs and enabled 12,000 flight hours.",
        "Air Force Commendation Medal (Jan 2021): Awarded by the 302 LRS Commander for meritorious service. Executed 386 Government Purchase Card transactions ($179K) in under 3 weeks. Inspected 8 California shelter kits, securing 8,000 critical war reserve materiel assets ($656K) for USAFE, recouped $130K through DLADS disposition, and delivered 71 mission assets ($5.5M) during C-130 hail damage recovery.",
        "Air Force Achievement Medal (Jul 2018): Awarded by Lieutenant General, USAFCENT at Ali Al Salem Air Base, Kuwait. Automated supply systems to distribute 14,000 combat assets ($3M) to 1,000 forward-deploying Airmen in support of Operation Inherent Resolve. Expedited 148 weapons and restored $7M in shelf-life inventory.",
      ],
    },
  },

  // 2. Military Award: 22nd NAF Airman of the Year
  {
    title: "Airman of the Year",
    imageUrl: "/assets/generated/honors/airman-of-the-year.webp",
    summary: [
      "Summary: Air Force",
      "Level: 22nd Numbered Air Force",
      "Honors: Diamond Sharp Award",
    ],
    details: {
      title: "Airman of the Year & Diamond Sharp Award",
      subtitle:
        "Top honor at the 22nd Numbered Air Force (NAF) level & 386 AEW",
      details: [
        "Won 22nd Numbered Air Force (NAF) Airman of the Year for supply chain leadership and automated logistics during combat deployment.",
        "Advanced through Squadron, Group, and Wing selection boards before winning at the Numbered Air Force level; finished as 1st runner-up at the Air Force Reserve Command (Major Command) level.",
        "Earned the 386th Air Expeditionary Wing Diamond Sharp Award for flightline logistics execution and base community support.",
      ],
    },
  },

  // 3. Academic Distinction: UCCS President's & Dean's Lists
  {
    title: "President's & Dean's Lists",
    imageUrl: "/assets/generated/honors/presidents-deans-list.webp",
    summary: [
      "Distinction: 7x Recipient",
      "College of Engineering & Applied Science",
    ],
    details: {
      title: "UCCS President's & Dean's Lists",
      subtitle: "7-time recipient (EAS Academic Honors)",
      details: [
        "Maintained semester GPA honors across 7 full-time semesters in the College of Engineering and Applied Science (President's List 3.50+ / Dean's List 3.00–3.49+).",
        "Earned continuous academic distinction while working as a university software developer, serving in the Air Force Reserve, and completing an overseas combat deployment.",
      ],
    },
  },

  // 4. Air Force Basic Military Training Honor Graduate
  {
    title: "Honor Graduate",
    imageUrl: "/assets/generated/honors/honor-graduate.webp",
    summary: [
      "Awarded: Air Force Basic Training",
      "Details: Top 10% of 800 recruits",
    ],
    details: {
      title: "Honor Graduate",
      subtitle: "Air Force Basic Training",
      details: [
        "Graduated in the top 10% of 800 basic military trainees at Air Force Basic Military Training.",
        "Awarded for top overall performance across physical fitness, academic examinations, and military drill evaluations.",
        "Scored above 90% in every evaluated category.",
      ],
    },
  },
];
