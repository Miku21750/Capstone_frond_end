import fs from 'fs';
import fetch from 'node-fetch'; // install via `npm install node-fetch`
import path from 'path';

import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const BUCKET = process.env.SUPABASE_BUCKET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Your JSON file (or use a direct variable instead)
const CACHE_FILE = path.join(__dirname, "skin-conditions.json");
const jsonData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));

const downloadBuffer = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return await res.buffer();
};

const uploadToSupabase = async (buffer, filePath) => {
  const { data, error } = await supabase
    .storage
    .from(BUCKET)
    .upload(filePath, buffer, { upsert: true, contentType: 'image/jpeg' }); // adjust if PNG/etc

  if (error) throw error;
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${filePath}`;
};

const processImages = async () => {
  for (const condition of jsonData) {
    const slug = condition.name.toLowerCase().replace(/\s+/g, '-');
    for (const [i, img] of condition.images.entries()) {
      try {
        const ext = path.extname(img.src).split('?')[0] || '.jpg';
        const filename = `${i}${ext}`;
        const storagePath = `${slug}/${filename}`;

        const buffer = await downloadBuffer(img.src);
        const publicUrl = await uploadToSupabase(buffer, storagePath);

        img.supabaseUrl = publicUrl;
        console.log(`✅ Uploaded: ${publicUrl}`);
      } catch (err) {
        console.error(`❌ Failed for ${img.src}:`, err.message);
      }
    }
  }

  const OUTPUT_JSON = path.join(__dirname, 'conditions-with-supabase-paths.json');
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonData, null, 2));
  console.log(`🎉 Saved updated JSON to ${OUTPUT_JSON}`);
};

// const downloadImage = async (url, filename) => {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`Failed to fetch ${url}`);
//   const buffer = await res.buffer();
//   fs.writeFileSync(filename, buffer);
//   console.log(`Downloaded: ${filename}`);
// };

// const downloadAllImages = async () => {
//   const outputDir = path.join(__dirname, '../public/images/conditions');
//   fs.mkdirSync(outputDir, { recursive: true });

//   for (const condition of jsonData) {
//     const conditionSlug = condition.name.toLowerCase().replace(/\s+/g, '-');
//     const conditionDir = path.join(outputDir, conditionSlug);
//     fs.mkdirSync(conditionDir, { recursive: true });

//     for (const [index, img] of condition.images.entries()) {
//       const ext = path.extname(img.src).split('?')[0];
//       const filename = `${index}${ext}`;
//       const filePath = path.join(conditionDir, filename);
//       try {
//         await downloadImage(img.src, filePath);
//         img.localPath = `/images/conditions/${conditionSlug}/${filename}`;
//       } catch (err) {
//         console.error(`Error downloading ${img.src}:`, err.message);
//       }
//     }
//   }
//   console.log("Saving JSON file with", jsonData.length, "conditions...");

//   const OUTPUT_JSON = path.join(__dirname, 'conditions-with-local-pathss.json');
//   try {
//     fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonData, null, 2));
//     console.log("JSON file saved successfully at:", OUTPUT_JSON);
//   } catch (err) {
//     console.error("Failed to save JSON file:", err.message);
//   }

// };

processImages();
