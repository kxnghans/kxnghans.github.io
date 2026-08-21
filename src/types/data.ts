import type { ComponentType } from "react";

export interface Highlight {
  label: string;
  value: string;
}

export interface ProjectDetails {
  title?: string;
  challenge?: string;
  action?: string;
  outcome?: string;
  details?: string[];
  highlights?: Highlight[];
  liveLink?: string;
  codeLink?: string;
  video?: string;
}

export interface ProjectItem {
  title: string;
  imageUrl: string;
  summary: string[];
  details: ProjectDetails;
}

export interface SkillDetail {
  name: string;
  priority: number;
}

export interface SkillSubcategory {
  title: string;
  details: string[];
}

export interface SkillModalDetails {
  title: string;
  subtitle?: string;
  details: string[];
  exposure?: string[];
}

export interface SkillCategory {
  title: string;
  imageUrl: string;
  details: (string | SkillDetail)[];
  exposure?: string[];
  subcategories?: SkillSubcategory[];
  modalDetails?: SkillModalDetails;
}

export interface WorkDetails {
  title: string;
  subtitle?: string;
  details: string[];
  highlights?: Highlight[];
}

export interface WorkExperience {
  title: string;
  imageUrl: string;
  summary: string[];
  details: WorkDetails;
}

export interface EducationDetails {
  title: string;
  subtitle?: string;
  details: string[];
}

export interface EducationItem {
  title: string;
  imageUrl: string;
  summary: string[];
  details: EducationDetails;
}

export interface CertificationDetails {
  title: string;
  subtitle?: string;
  details: string[];
}

export interface CertificationItem {
  title: string;
  imageUrl: string;
  summary: string[];
  details: CertificationDetails;
}

export interface CommunityDetails {
  title: string;
  details: string[];
}

export interface CommunityItem {
  title: string;
  imageUrl: string;
  summary: string[];
  details: CommunityDetails;
}

export interface HonorDetails {
  title: string;
  subtitle?: string;
  details: string[];
}

export interface HonorItem {
  title: string;
  imageUrl: string;
  summary: string[];
  details: HonorDetails;
}

export interface ContactLink {
  href: string;
  icon: ComponentType<{ className?: string }>;
  text: string;
}

export interface FormFieldValidation {
  required?: string | boolean;
  pattern?: {
    value: RegExp;
    message: string;
  };
}

export interface FormFieldItem {
  name: "name" | "email" | "subject" | "message";
  type: "text" | "email" | "textarea";
  placeholder: string;
  validation: FormFieldValidation;
}
