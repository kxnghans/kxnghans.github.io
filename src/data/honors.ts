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
        "Recognized for achieving academic excellence with a GPA between 3.75 and 4.0 while enrolled in a minimum of 12 credit hours per semester.",
        "Earned this distinction seven times while balancing a role as a software engineer, serving in the Air Force Reserves, and completing a deployment mid-schooling.",
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
        "Earned for outstanding performance during my first deployment.",
        "Won at every level of competition: squadron, group, and wing (base), before advancing to the NAF level.",
        "Achieved 1st runner-up at the Major Command level, the highest tier of competition.",
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
        "Recognized for excelling in all aspects of training, including physical fitness, academics, and military bearing.",
        "Scored a minimum of 90% in each category to be considered.",
        "Placed in the top 10% of a graduating flight of 800 trainees.",
      ],
    },
  },
];
