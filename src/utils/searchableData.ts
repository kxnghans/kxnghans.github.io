import { projectData } from "../data/projects";
import { skillsData } from "../data/skills";
import { workData } from "../data/work";
import { educationData } from "../data/education";
import { certificationsData } from "../data/certifications";
import { communityData } from "../data/community";
import { honors } from "../data/honors";
import type {
  ProjectItem,
  SkillCategory,
  WorkExperience,
  EducationItem,
  CertificationItem,
  CommunityItem,
  HonorItem,
} from "../types/data";
import type { SearchableItem } from "../types/search";

type DetailedGenericItem =
  | WorkExperience
  | EducationItem
  | CertificationItem
  | CommunityItem
  | HonorItem;

const getProjectContent = (item?: ProjectItem): string => {
  if (!item) return "";
  const summary = item.summary?.join(" ") || "";
  const details = item.details;
  if (!details) return summary;

  const title = details.title || "";
  const challenge = details.challenge || "";
  const action = details.action || "";
  const outcome = details.outcome || "";
  const rawDetails = Array.isArray(details.details)
    ? details.details.join(" ")
    : "";
  const highlights =
    details.highlights
      ?.map((h) => `${h.label || ""}: ${h.value || ""}`)
      .join(" ") || "";
  const links = `${details.liveLink || ""} ${details.codeLink || ""}`;

  return `${summary} ${title} ${challenge} ${action} ${outcome} ${rawDetails} ${highlights} ${links}`.trim();
};

const getSkillsContent = (item?: SkillCategory): string => {
  if (!item) return "";
  const details =
    item.details?.map((d) => (typeof d === "string" ? d : d.name)).join(", ") ||
    "";
  const exposure = item.exposure?.join(", ") || "";
  const subcategories =
    item.subcategories
      ?.map((s) => `${s.title}: ${s.details?.join(", ")}`)
      .join("; ") || "";
  const modalTitle = item.modalDetails?.title || "";
  const modalSubtitle = item.modalDetails?.subtitle || "";
  const modalDetails = item.modalDetails?.details?.join(" ") || "";
  const modalExposure = item.modalDetails?.exposure?.join(" ") || "";
  return `${details} ${exposure} ${subcategories} ${modalTitle} ${modalSubtitle} ${modalDetails} ${modalExposure}`.trim();
};

const getDetailedContent = (item?: DetailedGenericItem): string => {
  if (!item) return "";
  const summary = item.summary?.join(" ") || "";
  const detailsObj = item.details;
  const title = detailsObj?.title || item.title || "";
  const subtitle =
    "subtitle" in detailsObj && detailsObj.subtitle ? detailsObj.subtitle : "";
  const details = Array.isArray(detailsObj?.details)
    ? detailsObj.details.join(" ")
    : "";
  const highlights =
    "highlights" in detailsObj && Array.isArray(detailsObj.highlights)
      ? detailsObj.highlights
          .map((h) => `${h.label || ""}: ${h.value || ""}`)
          .join(" ")
      : "";
  return `${summary} ${title} ${subtitle} ${details} ${highlights}`.trim();
};

export const searchableData: SearchableItem[] = [
  ...projectData.map((item, index) => ({
    id: `project-${index}`,
    title: item.title,
    content: getProjectContent(item),
    category: "Projects" as const,
    location: {
      pageName: "Projects",
      componentType: "modal" as const,
      itemId: index,
    },
  })),
  ...skillsData.map((item, index) => ({
    id: `skill-${index}`,
    title: item.title,
    content: getSkillsContent(item),
    category: "Skills" as const,
    location: {
      pageName: "Skills",
      componentType: "slideshow" as const,
      componentId: "skills-slideshow",
      itemId: index,
    },
  })),
  ...workData.map((item, index) => ({
    id: `work-${index}`,
    title: item.title,
    content: getDetailedContent(item),
    category: "Work" as const,
    location: {
      pageName: "Work Experience",
      componentType: "none" as const,
      itemId: `work-${index}`,
    },
  })),
  ...educationData.map((item, index) => ({
    id: `education-${index}`,
    title: item.title,
    content: getDetailedContent(item),
    category: "Education" as const,
    location: {
      pageName: "Education",
      componentType: "none" as const,
      itemId: `education-${index}`,
    },
  })),
  ...certificationsData.map((item, index) => ({
    id: `certification-${index}`,
    title: item.title,
    content: getDetailedContent(item),
    category: "Certifications" as const,
    location: {
      pageName: "Honors",
      componentType: "slideshow" as const,
      componentId: "certifications-slideshow",
      itemId: index,
    },
  })),
  ...communityData.map((item, index) => ({
    id: `community-${index}`,
    title: item.title,
    content: getDetailedContent(item),
    category: "Community" as const,
    location: {
      pageName: "More",
      componentType: "slideshow" as const,
      componentId: "community-slideshow",
      itemId: index,
    },
  })),
  ...honors.map((item, index) => ({
    id: `honor-${index}`,
    title: item.title,
    content: getDetailedContent(item),
    category: "Honors" as const,
    location: {
      pageName: "Honors",
      componentType: "modal" as const,
      itemId: index,
    },
  })),
];
