import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT_DIR, "public", "assets");
const GENERATED_DIR = path.join(ASSETS_DIR, "generated");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

/**
 * Recursively retrieves all image files matching supported extensions.
 */
function getFilesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function convertImage(filePath) {
  const ext = path.extname(filePath);
  const webpPath = filePath.slice(0, -ext.length) + ".webp";
  const originalStats = fs.statSync(filePath);

  await sharp(filePath).webp({ quality: 85, effort: 6 }).toFile(webpPath);

  const webpStats = fs.statSync(webpPath);
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  const savings = (
    ((originalStats.size - webpStats.size) / originalStats.size) *
    100
  ).toFixed(1);

  return {
    file: relativePath,
    originalSize: originalStats.size,
    webpSize: webpStats.size,
    savings: Number(savings),
  };
}

async function main() {
  console.log("🚀 Starting automated WebP conversion pipeline...\n");

  const generatedFiles = getFilesRecursively(GENERATED_DIR);
  const rootAssetFiles = fs
    .readdirSync(ASSETS_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => path.join(ASSETS_DIR, entry.name));

  const allFiles = [...generatedFiles, ...rootAssetFiles];

  if (allFiles.length === 0) {
    console.log("No images found to convert.");
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
        `✓ ${result.file} -> WebP: ${(result.originalSize / 1024).toFixed(1)} KB -> ${(result.webpSize / 1024).toFixed(1)} KB (${result.savings}% reduction)`,
      );
    } catch (err) {
      console.error(`✗ Error converting ${file}:`, err.message);
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
