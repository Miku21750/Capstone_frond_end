import fs from 'fs';
import fetch from 'node-fetch'; // install via `npm install node-fetch`
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Your JSON file (or use a direct variable instead)
const CACHE_FILE = path.join(__dirname, "skin_conditions.json");
const jsonData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));

const downloadImage = async (url, filename) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const buffer = await res.buffer();
  fs.writeFileSync(filename, buffer);
  console.log(`Downloaded: ${filename}`);
};

const downloadAllImages = async () => {
  const outputDir = path.join(__dirname, '../../public/images/conditions');
  fs.mkdirSync(outputDir, { recursive: true });

  for (const condition of jsonData) {
    const conditionSlug = condition.name.toLowerCase().replace(/\s+/g, '-');
    const conditionDir = path.join(outputDir, conditionSlug);
    fs.mkdirSync(conditionDir, { recursive: true });

    for (const [index, img] of condition.images.entries()) {
      const ext = path.extname(img.src).split('?')[0];
      const filename = `${index}${ext}`;
      const filePath = path.join(conditionDir, filename);
      try {
        await downloadImage(img.src, filePath);
        img.localPath = `/images/conditions/${conditionSlug}/${filename}`;
      } catch (err) {
        console.error(`Error downloading ${img.src}:`, err.message);
      }
    }
  }

  fs.writeFileSync('conditions-with-local-paths.json', JSON.stringify(jsonData, null, 2));
};

downloadAllImages();
