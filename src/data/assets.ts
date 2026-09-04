/**
 * @file assets.ts
 * @description Centralized Single Source of Truth registry for portfolio cloud-hosted image assets.
 * All image references across Hanson-Tube must import from this registry.
 * Aligns with sibling architecture in gospelgames, milcalc, and hansoncreations.
 */

/**
 * Base URL for Google Cloud Storage bucket asset delivery.
 */
export const GCS_BASE_URL =
  "https://storage.googleapis.com/portfolio_showcase/images";

/**
 * Resolves the active base URL, supporting local/custom CDN overrides via environment variable.
 */
export const ASSET_BASE_URL =
  (import.meta.env.VITE_ASSET_BASE_URL as string | undefined) || GCS_BASE_URL;

/**
 * Constructs a canonical CDN URL for a given relative asset path.
 *
 * @param relativePath - Relative asset path (e.g. 'projects/carohans-hub.webp')
 * @returns Fully-qualified CDN HTTPS URL
 */
export const getAssetUrl = (relativePath: string): string => {
  const cleanPath = relativePath.replace(/^\/+/, "");
  return `${ASSET_BASE_URL}/${encodeURI(cleanPath)}`;
};

/**
 * Strongly-typed, immutable registry of all application images.
 */
export const ASSET_URLS = {
  // Flagship & Historical Projects
  PROJECTS: {
    AUTONOMOUS_ROBOTICS: getAssetUrl("projects/autonomous-robotics.webp"),
    CAROHANS_HUB: getAssetUrl("projects/carohans-hub.webp"),
    CIRCUIT_DESIGN: getAssetUrl("projects/circuit-design.webp"),
    CLOUD_MIGRATION: getAssetUrl("projects/cloud-migration.webp"),
    COMPUTER_VISION: getAssetUrl("projects/computer-vision.webp"),
    COVID_CONTINGENCY: getAssetUrl("projects/covid-contingency.webp"),
    CREATIVE_MEDIA: getAssetUrl("projects/creative-media.webp"),
    FACILITIES_AUTOMATION: getAssetUrl("projects/facilities-automation.webp"),
    FLIGHT_SIMULATOR: getAssetUrl("projects/flight-simulator.webp"),
    FRETWORK_GUITAR: getAssetUrl("projects/fretwork-guitar.webp"),
    GOSPEL_GAMES: getAssetUrl("projects/gospel-games.webp"),
    INNOVATION_DASHBOARD: getAssetUrl("projects/innovation-dashboard.webp"),
    LOGISTICS_PIPELINE: getAssetUrl("projects/logistics-pipeline.webp"),
    MILCALC_SUITE: getAssetUrl("projects/milcalc-suite.webp"),
    PORTFOLIO_SHOWCASE: getAssetUrl("projects/portfolio-showcase.webp"),
    PRODUCT_ADOPTION: getAssetUrl("projects/product-adoption.webp"),
    STOCK_PREDICTION: getAssetUrl("projects/stock-prediction.webp"),
    UNPACK_TRAVEL: getAssetUrl("projects/unpack-travel.webp"),
    YOUTH_MENTORSHIP: getAssetUrl("projects/youth-mentorship.webp"),
  },

  // Technical & Leadership Competency Domains
  SKILLS: {
    ADOBE_SUITE: getAssetUrl("skills/adobe-suite.webp"),
    BI_ANALYTICS: getAssetUrl("skills/bi-analytics.webp"),
    CLOUD_DEVOPS: getAssetUrl("skills/cloud-devops.webp"),
    ELECTRONICS: getAssetUrl("skills/electronics.webp"),
    IT_SYSTEMS: getAssetUrl("skills/it-systems.webp"),
    LANGUAGES: getAssetUrl("skills/languages.webp"),
    PROGRAMMING: getAssetUrl("skills/programming.webp"),
    PROJECT_MANAGEMENT: getAssetUrl("skills/project-management.webp"),
  },

  // Career Positions & Corporate Experience
  WORK: {
    AIR_FORCE_SUPPLY: getAssetUrl("work/air-force-supply.webp"),
    LOCKHEED_MARTIN: getAssetUrl("work/lockheed-martin.webp"),
    UCCS_SOFTWARE: getAssetUrl("work/uccs-software.webp"),
  },

  // Academic Degrees & Universities
  EDUCATION: {
    UC_BERKELEY_MS: getAssetUrl("education/uc-berkeley-ms.webp"),
    UCCS_EE_BS: getAssetUrl("education/uccs-ee-bs.webp"),
  },

  // Military & Academic Honors
  HONORS: {
    AIRMAN_OF_THE_YEAR: getAssetUrl("honors/airman-of-the-year.webp"),
    DECORATIONS_MEDALS: getAssetUrl("honors/decorations-medals.webp"),
    HONOR_GRADUATE: getAssetUrl("honors/honor-graduate.webp"),
    PRESIDENTS_DEANS_LIST: getAssetUrl("honors/presidents-deans-list.webp"),
  },

  // Professional Certifications & Military PME
  CERTIFICATIONS: {
    LINKEDIN_LEARNING: getAssetUrl("certifications/linkedin-learning.webp"),
    POWER_PLATFORM: getAssetUrl("certifications/power-platform.webp"),
    SCRUM_MASTER: getAssetUrl("certifications/scrum-master.webp"),
    SYSTEMS_BOOTCAMP: getAssetUrl("certifications/systems-bootcamp.webp"),
    AIR_FORCE_SUPPLY: getAssetUrl("work/air-force-supply.webp"),
    HONOR_GRADUATE: getAssetUrl("honors/honor-graduate.webp"),
  },

  // Community Leadership & Outreach
  COMMUNITY: {
    CODE_QUEST: getAssetUrl("community/code-quest.webp"),
    NSBE_CHAPTER: getAssetUrl("community/nsbe-chapter.webp"),
    PHOTOGRAPHY_MEDIA: getAssetUrl("community/photography-media.webp"),
    READERS_WRITERS: getAssetUrl("community/readers-writers.webp"),
    THUNDERBIRD_AIRSHOW: getAssetUrl("community/thunderbird-airshow.webp"),
  },

  // Profile Imagery
  PROFILE: {
    AVATAR_WEBP: getAssetUrl("profile/Kobs DP.webp"),
    AVATAR_PNG: getAssetUrl("profile/Kobs DP.png"),
  },

  // Brand Previews & OpenGraph Cards
  BRAND: {
    HANSON_TUBE_PNG: getAssetUrl("brand/hanson-tube.png"),
    HANSON_TUBE_WEBP: getAssetUrl("brand/hanson-tube.webp"),
  },
} as const;
