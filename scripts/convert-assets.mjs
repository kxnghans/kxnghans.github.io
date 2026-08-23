import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const MEDIA_DIR = path.join(ROOT_DIR, "media");
const PUBLIC_ASSETS_DIR = path.join(ROOT_DIR, "public", "assets");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

/**
 * Recursively retrieves all source image files matching supported extensions.
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

/**
 * Resolves the WebP output path for a given source file.
 * - media/generated/<category>/<name>.<ext> -> public/assets/generated/<category>/<name>.webp
 * - media/<name>.<ext>                      -> public/assets/<name>.webp
 */
function resolveOutputPath(sourceFile) {
  const relativeToMedia = path.relative(MEDIA_DIR, sourceFile);
  const withoutExt = relativeToMedia.slice(
    0,
    -path.extname(relativeToMedia).length,
  );
  return path.join(PUBLIC_ASSETS_DIR, `${withoutExt}.webp`);
}

async function convertImage(filePath) {
  const webpPath = resolveOutputPath(filePath);
  fs.mkdirSync(path.dirname(webpPath), { recursive: true });

  const originalStats = fs.statSync(filePath);

  await sharp(filePath)
    .webp({ quality: 85, effort: 6 })
    .toFile(webpPath);

  const webpStats = fs.statSync(webpPath);
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  const savings = (
    ((originalStats.size - webpStats.size) / originalStats.size) *
    100
  ).toFixed(1);

  return {
    file: relativePath,
    output: path.relative(ROOT_DIR, webpPath).replace(/\\/g, "/"),
    originalSize: originalStats.size,
    webpSize: webpStats.size,
    savings: Number(savings),
  };
}

async function main() {
  console.log("🚀 Starting automated WebP conversion pipeline...\n");
  console.log(`Source directory : ${path.relative(ROOT_DIR, MEDIA_DIR)}`);
  console.log(`Output directory : ${path.relative(ROOT_DIR, PUBLIC_ASSETS_DIR)}\n`);

  if (!fs.existsSync(MEDIA_DIR)) {
    console.log(`No media directory found at ${MEDIA_DIR}. Nothing to convert.`);
    return;
  }

  const allFiles = getFilesRecursively(MEDIA_DIR);

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
