import { FEATURE_FLAGS } from "../config/features";

export const navOrder: string[] = [
  "Projects",
  "Skills",
  "Education",
  "Work",
  "Honors",
  "Certifications",
  "Community",
  ...(FEATURE_FLAGS.showValuePage ? ["Value"] : []),
];

