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
  challenge?: string;
  action?: string;
  outcome?: string;
  details: string[];
  highlights?: Highlight[];
  exposure?: string[];
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
  challenge?: string;
  action?: string;
  outcome?: string;
  details: string[];
  highlights?: Highlight[];
  exposure?: string[];
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
  icon: import("../components/icons").IconName;
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

export type ValueCategory = "financial" | "efficiency" | "scale" | "governance";

export type ValueDomain =
  | "Defense & Space"
  | "Enterprise Automation"
  | "Military Logistics & Readiness"
  | "Software Solutions"
  | "Academic & Research";

export type ValueType = "quantitative" | "qualitative";

export interface BeforeAfterMetric {
  before: string;
  after: string;
  metricName: string;
}

export interface LifetimeMetric {
  id: string;
  title: string;
  value: string;
  label: string;
  category: ValueCategory;
  domain: ValueDomain;
  type: ValueType;
  description: string;
  impactHighlight: string;
  timeframe: string;
  organization: string;
  badge?: string;
  beforeAfter?: BeforeAfterMetric;
}

export interface QualitativePillar {
  id: string;
  title: string;
  domain: ValueDomain;
  role: string;
  organization: string;
  timeframe: string;
  summary: string;
  competencies: string[];
  car: {
    context: string;
    action: string;
    result: string;
  };
  keyArtifacts: string[];
}

export interface RadarAxisPoint {
  axis: string;
  score: number;
  years?: number;
  tenureDisplay?: string;
  benchmark: string;
  description: string;
  domain: ValueDomain;
  category?: string;
  era?: string;
}

export interface MultiplierPoint {
  id: string;
  label: string;
  metric: string;
  value: number;
  displayValue: string;
  baseline: string;
  optimized: string;
  domain: ValueDomain;
  category?: string;
  era?: string;
  color: string;
}

export interface TimelinePoint {
  period: string;
  year: number;
  era?: string;
  cumulativeROI: number;
  displayROI: string;
  cumulativeHours: number;
  displayHours: string;
  milestone: string;
}

export interface LedgerEntry {
  id: string;
  label: string;
  domain: ValueDomain;
  amountM: number;
}

export interface DistributionPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
  domain: ValueDomain;
  description?: string;
}

export interface LifetimeValueData {
  executiveSummary: {
    totalFinancialROI: string;
    totalHoursSaved: string;
    maxAcceleration: string;
    enterpriseScale: string;
    auditAccuracy: string;
    engineCoverage: string;
    gpa: string;
  };
  metrics: LifetimeMetric[];
  qualitativePillars: QualitativePillar[];
  charts: {
    radar: RadarAxisPoint[];
    multipliers: MultiplierPoint[];
    timeline: TimelinePoint[];
    distribution: DistributionPoint[];
  };
}
