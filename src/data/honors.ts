import type { HonorItem } from "../types/data";

export const honors: HonorItem[] = [
  {
    title: "President's & Dean's Lists",
    imageUrl: "/assets/generated/honors/presidents-deans-list.webp",
    summary: ["Details: 7x at UCCS", "Criteria: 3.75 - 4.0 GPA"],
    details: {
      title: "UCCS President's & Dean's Lists",
      subtitle: "7-time recipient",
      details: [
        "Maintained a 3.75-4.0 semester GPA while enrolled in full-time engineering coursework (12+ credits).",
        "Earned this distinction across 7 semesters while working as a software developer, serving in the Air Force Reserve, and completing an overseas deployment.",
      ],
    },
  },
  {
    title: "Airman of the Year",
    imageUrl: "/assets/generated/honors/airman-of-the-year.webp",
    summary: ["Summary: Air Force", "Level: 22nd Numbered Air Force"],
    details: {
      title: "Airman of the Year",
      subtitle: "Top honor at the 22nd Numbered Air Force (NAF) level",
      details: [
        "Awarded for exceptional performance and logistics improvements during my first deployment.",
        "Selected at squadron, group, and wing levels before winning at the 22nd Numbered Air Force level.",
        "Finished as 1st runner-up at the Air Force Reserve Command (Major Command) level.",
      ],
    },
  },
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
        "Awarded for top performance across physical fitness, academic exams, and drill evaluations.",
        "Scored above 90% in every evaluated category.",
        "Graduated in the top 10% of 800 basic military trainees.",
      ],
    },
  },
];
