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

const getProjectTags = (item?: ProjectItem): string[] => {
  if (!item) return [];
  const tags: string[] = [];

  // Extract from summary lines (e.g., "Stack: React Native, Expo, SQLite", "Platform: Next.js")
  item.summary?.forEach((line) => {
    const parts = line.split(":");
    if (parts.length > 1) {
      parts[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((tag) => tags.push(tag));
    }
  });

  // Extract from highlights
  item.details?.highlights?.forEach((h) => {
    if (h.label) tags.push(h.label);
  });

  return Array.from(new Set(tags));
};

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

const getSkillsTags = (item?: SkillCategory): string[] => {
  if (!item) return [];
  const tags: string[] = [];

  item.details?.forEach((d) => {
    const name = typeof d === "string" ? d : d.name;
    if (name) tags.push(name);
  });

  item.exposure?.forEach((exp) => {
    if (exp) tags.push(exp);
  });

  item.subcategories?.forEach((sub) => {
    if (sub.title) tags.push(sub.title);
    sub.details?.forEach((d) => tags.push(d));
  });

  return Array.from(new Set(tags));
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

const getDetailedTags = (item?: DetailedGenericItem): string[] => {
  if (!item) return [];
  const tags: string[] = [];
  const detailsObj = item.details;

  if (detailsObj && "highlights" in detailsObj && Array.isArray(detailsObj.highlights)) {
    detailsObj.highlights.forEach((h) => {
      if (h.label) tags.push(h.label);
    });
  }

  return Array.from(new Set(tags));
};

const getDetailedContent = (item?: DetailedGenericItem): string => {
  if (!item) return "";
  const summary = item.summary?.join(" ") || "";
  const detailsObj = item.details;
  const title = detailsObj?.title || item.title || "";
  const subtitle =
    detailsObj && "subtitle" in detailsObj && detailsObj.subtitle
      ? detailsObj.subtitle
      : "";
  const details = Array.isArray(detailsObj?.details)
    ? detailsObj.details.join(" ")
    : "";
  const highlights =
    detailsObj && "highlights" in detailsObj && Array.isArray(detailsObj.highlights)
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
    subtitle: item.details?.title,
    tags: getProjectTags(item),
    summary: item.summary?.join(". "),
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
    subtitle: item.modalDetails?.subtitle || item.modalDetails?.title,
    tags: getSkillsTags(item),
    summary: item.modalDetails?.details?.join(". "),
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
    subtitle: item.details?.title ? `${item.details.title} - ${item.details.subtitle || ""}`.trim() : item.details?.subtitle,
    tags: getDetailedTags(item),
    summary: item.summary?.join(". "),
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
    subtitle: item.details?.subtitle || item.details?.title,
    tags: getDetailedTags(item),
    summary: item.summary?.join(". "),
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
    subtitle: item.details?.subtitle || item.details?.title,
    tags: getDetailedTags(item),
    summary: item.summary?.join(". "),
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
    subtitle: item.details?.title,
    tags: getDetailedTags(item),
    summary: item.summary?.join(". "),
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
    subtitle: item.details?.subtitle || item.details?.title,
    tags: getDetailedTags(item),
    summary: item.summary?.join(". "),
    content: getDetailedContent(item),
    category: "Honors" as const,
    location: {
      pageName: "Honors",
      componentType: "modal" as const,
      itemId: index,
    },
  })),
];

