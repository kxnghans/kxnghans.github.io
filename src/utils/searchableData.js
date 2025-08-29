import { projectData } from "../data/projects";
import { skillsData } from "../data/skills";
import { workData } from "../data/work";
import { educationData } from "../data/education";
import { certificationsData } from "../data/certifications";
import { communityData } from "../data/community";
import { honors } from "../data/honors";

const getProjectContent = (details) => {
  if (!details) return "";
  const highlights =
    details.highlights?.map((h) => `${h.label}: ${h.value}`).join(" ") || "";
  return `${details.challenge} ${details.action} ${details.outcome} ${highlights}`;
};

const getCertificationContent = (item) => {
  if (!item) return "";
  const summary = item.summary?.join(" ") || "";
  const subtitle = item.details?.subtitle || "";
  const details = item.details?.details?.join(" ") || "";
  return `${summary} ${subtitle} ${details}`;
};

const getCommunityContent = (item) => {
  if (!item) return "";
  const summary = item.summary?.join(" ") || "";
  const details = item.details?.details?.join(" ") || "";
  return `${summary} ${details}`;
};

export const searchableData = [
  ...projectData.map((item, index) => ({
    id: `project-${index}`,
    title: item.title,
    content: getProjectContent(item.details),
    category: "Projects",
    location: {
      pageName: "Projects",
      componentType: "modal",
      itemId: index,
    },
  })),
  ...skillsData.map((item, index) => ({
    id: `skill-${index}`,
    title: item.title,
    content: item.details.join(", "),
    category: "Skills",
    location: {
      pageName: "Skills",
      componentType: "slideshow",
      componentId: "skills-slideshow",
      itemId: index,
    },
  })),
  ...workData.map((item, index) => ({
    id: `work-${index}`,
    title: item.title,
    content: item.details.details.join(" "),
    category: "Work Experience",
    location: {
      pageName: "Work Experience",
      componentType: "none",
      itemId: `work-${index}`,
    },
  })),
  ...educationData.map((item, index) => ({
    id: `education-${index}`,
    title: item.title,
    content: item.details.subtitle,
    category: "Education",
    location: {
      pageName: "Education",
      componentType: "none",
      itemId: `education-${index}`,
    },
  })),
  ...certificationsData.map((item, index) => ({
    id: `certification-${index}`,
    title: item.title,
    content: getCertificationContent(item),
    category: "Certifications",
    location: {
      pageName: "Honors",
      componentType: "slideshow",
      componentId: "certifications-slideshow",
      itemId: index,
    },
  })),
  ...communityData.map((item, index) => ({
    id: `community-${index}`,
    title: item.title,
    content: getCommunityContent(item),
    category: "Community",
    location: {
      pageName: "More",
      componentType: "slideshow",
      componentId: "community-slideshow",
      itemId: index,
    },
  })),
  ...honors.map((item, index) => ({
    id: `honor-${index}`,
    title: item.title,
    content: item.details.subtitle,
    category: "Honors",
    location: {
      pageName: "Honors",
      componentType: "none",
      itemId: `honor-${index}`,
    },
  })),
];