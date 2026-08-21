import type { EducationItem } from "../types/data";

export const educationData: EducationItem[] = [
  {
    title: "Masters in Data Science",
    imageUrl: "/assets/generated/education/uc-berkeley-ms.webp",
    summary: [
      "University of California, Berkeley",
      "Degree: Masters",
      "GPA: 4.0",
      "Ends: Spring 2026",
    ],
    details: {
      title: "Masters in Data Science",
      subtitle: "University of California, Berkeley",
      details: ["Estimated Graduation: Spring 2026", "Current GPA: 4.0"],
    },
  },
  {
    title: "Bachelors in Electrical Engineering",
    imageUrl: "/assets/generated/education/uccs-ee-bs.webp",
    summary: [
      "University of Colorado, Colorado Springs",
      "Degree: Bachelors",
      "GPA: 3.67",
      "Status: Graduated",
    ],
    details: {
      title: "Bachelors in Electrical Engineering",
      subtitle: "University of Colorado, Colorado Springs",
      details: ["Graduated with 3.67 GPA"],
    },
  },
];
