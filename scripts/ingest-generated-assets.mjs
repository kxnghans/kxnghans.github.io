import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const BRAIN_DIR = process.env.BRAIN_DIR || "";
const GENERATED_DIR = path.resolve(
  ROOT_DIR,
  "..",
  "dev-assets",
  "hansontube",
);

const ASSET_MAPPINGS = [
  // Projects (19)
  { prefix: "carohans_hub", dest: "projects/carohans-hub.jpg" },
  { prefix: "milcalc_suite", dest: "projects/milcalc-suite.jpg" },
  { prefix: "gospel_games", dest: "projects/gospel-games.jpg" },
  { prefix: "unpack_travel", dest: "projects/unpack-travel.jpg" },
  { prefix: "fretwork_guitar", dest: "projects/fretwork-guitar.jpg" },
  { prefix: "creative_media", dest: "projects/creative-media.jpg" },
  { prefix: "portfolio_showcase", dest: "projects/portfolio-showcase.jpg" },
  {
    prefix: "facilities_automation",
    dest: "projects/facilities-automation.jpg",
  },
  { prefix: "innovation_dashboard", dest: "projects/innovation-dashboard.jpg" },
  { prefix: "cloud_migration", dest: "projects/cloud-migration.jpg" },
  { prefix: "product_adoption", dest: "projects/product-adoption.jpg" },
  { prefix: "logistics_pipeline", dest: "projects/logistics-pipeline.jpg" },
  { prefix: "covid_contingency", dest: "projects/covid-contingency.jpg" },
  { prefix: "youth_mentorship", dest: "projects/youth-mentorship.jpg" },
  { prefix: "stock_prediction", dest: "projects/stock-prediction.jpg" },
  { prefix: "computer_vision", dest: "projects/computer-vision.jpg" },
  { prefix: "autonomous_robotics", dest: "projects/autonomous-robotics.jpg" },
  { prefix: "flight_simulator", dest: "projects/flight-simulator.jpg" },
  { prefix: "circuit_design", dest: "projects/circuit-design.jpg" },

  // Skills (8)
  { prefix: "skills_programming", dest: "skills/programming.jpg" },
  { prefix: "skills_bi_analytics", dest: "skills/bi-analytics.jpg" },
  { prefix: "skills_cloud_devops", dest: "skills/cloud-devops.jpg" },
  {
    prefix: "skills_project_management",
    dest: "skills/project-management.jpg",
  },
  { prefix: "skills_it_systems", dest: "skills/it-systems.jpg" },
  { prefix: "skills_adobe_suite", dest: "skills/adobe-suite.jpg" },
  { prefix: "skills_electronics", dest: "skills/electronics.jpg" },
  { prefix: "skills_languages", dest: "skills/languages.jpg" },

  // Certifications (4)
  {
    prefix: "cert_linkedin_learning",
    dest: "certifications/linkedin-learning.jpg",
  },
  { prefix: "cert_power_platform", dest: "certifications/power-platform.jpg" },
  {
    prefix: "cert_systems_bootcamp",
    dest: "certifications/systems-bootcamp.jpg",
  },
  { prefix: "cert_scrum_master", dest: "certifications/scrum-master.jpg" },

  // Community (5)
  {
    prefix: "community_photography_media",
    dest: "community/photography-media.jpg",
  },
  { prefix: "community_nsbe_chapter", dest: "community/nsbe-chapter.jpg" },
  {
    prefix: "community_readers_writers",
    dest: "community/readers-writers.jpg",
  },
  { prefix: "community_code_quest", dest: "community/code-quest.jpg" },
  {
    prefix: "community_thunderbird_airshow",
    dest: "community/thunderbird-airshow.jpg",
  },

  // Education (2)
  { prefix: "edu_uc_berkeley_ms", dest: "education/uc-berkeley-ms.jpg" },
  { prefix: "edu_uccs_ee_bs", dest: "education/uccs-ee-bs.jpg" },

  // Honors (4)
  {
    prefix: "honors_presidents_deans_list",
    dest: "honors/presidents-deans-list.jpg",
  },
  {
    prefix: "honors_airman_of_the_year",
    dest: "honors/airman-of-the-year.jpg",
  },
  {
    prefix: "honors_decorations_medals",
    dest: "honors/decorations-medals.jpg",
  },
  { prefix: "honors_honor_graduate", dest: "honors/honor-graduate.jpg" },

  // Work (3)
  { prefix: "work_lockheed_martin", dest: "work/lockheed-martin.jpg" },
  { prefix: "work_uccs_software", dest: "work/uccs-software.jpg" },
  { prefix: "work_air_force_supply", dest: "work/air-force-supply.jpg" },
];

async function main() {
  console.log("📦 Ingesting generated studio images...\n");
  if (!BRAIN_DIR || !fs.existsSync(BRAIN_DIR)) {
    console.log(
      "No valid BRAIN_DIR specified. Set BRAIN_DIR environment variable to ingest raw images.",
    );
    return;
  }
  const brainFiles = fs.readdirSync(BRAIN_DIR);

  let copiedCount = 0;

  for (const mapping of ASSET_MAPPINGS) {
    const matchingFiles = brainFiles.filter(
      (f) => f.startsWith(mapping.prefix + "_") && f.endsWith(".jpg"),
    );

    if (matchingFiles.length === 0) {
      console.warn(
        `⚠️ Warning: No file found matching prefix '${mapping.prefix}'`,
      );
      continue;
    }

    // Sort descending by timestamp in filename to pick newest if multiple
    matchingFiles.sort().reverse();
    const sourceFile = path.join(BRAIN_DIR, matchingFiles[0]);
    const targetFile = path.join(GENERATED_DIR, mapping.dest);
    const targetDir = path.dirname(targetFile);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.copyFileSync(sourceFile, targetFile);
    console.log(`✓ Copied ${matchingFiles[0]} -> ${mapping.dest}`);
    copiedCount++;
  }

  console.log(
    `\n🎉 Successfully ingested ${copiedCount}/${ASSET_MAPPINGS.length} studio assets!\n`,
  );
}

main().catch((err) => {
  console.error("Ingestion failed:", err);
  process.exit(1);
});
