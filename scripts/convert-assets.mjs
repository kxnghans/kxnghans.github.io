import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const DEV_ASSETS_DIR = path.resolve(ROOT_DIR, "..", "dev-assets", "hansontube");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

/**
 * Recursively retrieves all source image files matching supported extensions,
 * ignoring already generated 'webp' subdirectories.
 */
function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "webp") {
        results = results.concat(getFilesRecursively(fullPath));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * Resolves the WebP output path for a given source file within dev-assets/hansontube.
 * - <domain>/<name>.<ext> -> <domain>/webp/<name>.webp
 */
function resolveOutputPath(sourceFile) {
  const dir = path.dirname(sourceFile);
  const ext = path.extname(sourceFile);
  const base = path.basename(sourceFile, ext);
  return path.join(dir, "webp", `${base}.webp`);
}

async function convertImage(filePath) {
  const webpPath = resolveOutputPath(filePath);
  fs.mkdirSync(path.dirname(webpPath), { recursive: true });

  const originalStats = fs.statSync(filePath);

  await sharp(filePath).webp({ quality: 85, effort: 6 }).toFile(webpPath);

  const webpStats = fs.statSync(webpPath);
  const relativePath = path
    .relative(DEV_ASSETS_DIR, filePath)
    .replace(/\\/g, "/");
  const relativeOutput = path
    .relative(DEV_ASSETS_DIR, webpPath)
    .replace(/\\/g, "/");
  const savings = (
    ((originalStats.size - webpStats.size) / originalStats.size) *
    100
  ).toFixed(1);

  return {
    file: relativePath,
    output: relativeOutput,
    originalSize: originalStats.size,
    webpSize: webpStats.size,
    savings: Number(savings),
  };
}

async function main() {
  console.log(
    "🚀 Starting automated WebP conversion pipeline (dev-assets/hansontube)...\n",
  );
  console.log(`Dev Assets directory: ${DEV_ASSETS_DIR}\n`);

  if (!fs.existsSync(DEV_ASSETS_DIR)) {
    console.log(
      `No dev-assets directory found at ${DEV_ASSETS_DIR}. Nothing to convert.`,
    );
    return;
  }

  const allFiles = getFilesRecursively(DEV_ASSETS_DIR);

  if (allFiles.length === 0) {
    console.log("No raw images (.jpg, .jpeg, .png) found to convert.");
    return;
  }

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of allFiles) {
    try {
      const result = await convertImage(file);
      totalOriginal += result.originalSize;
      totalWebp += result.webpSize;
      console.log(
        `✓ ${result.file} -> ${result.output}: ${(result.originalSize / 1024).toFixed(1)} KB -> ${(result.webpSize / 1024).toFixed(1)} KB (${result.savings}% reduction)`,
      );
    } catch (err) {
      console.error(`✖ Error converting ${file}:`, err.message);
    }
  }

  const overallSavings = (
    ((totalOriginal - totalWebp) / totalOriginal) *
    100
  ).toFixed(1);
  console.log("\n==========================================");
  console.log(
    `Total Original Size : ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(
    `Total WebP Size     : ${(totalWebp / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(`Overall Reduction   : ${overallSavings}%`);
  console.log("==========================================\n");
}

main().catch((err) => {
  console.error("Conversion failed:", err);
  process.exit(1);
});
