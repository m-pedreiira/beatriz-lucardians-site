import sharp from "sharp";
import path from "path";
import fs from "fs";

const SRC = "C:/Users/mateus/Documentos/Projetos/fotosBeatriz";
const OUT_IMG = "public/images";
const OUT_LOGO = "public/logo";
fs.mkdirSync(OUT_IMG, { recursive: true });
fs.mkdirSync(OUT_LOGO, { recursive: true });

// Remove near-white background -> alpha channel
async function whiteToTransparent(inputPath, outputPath, { threshold = 244, trimBg = "white" } = {}) {
  const img = sharp(inputPath).trim({ background: trimBg, threshold: 12 });
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0;
    }
  }
  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
  console.log("logo ->", outputPath, width, height);
}

const logoFiles = {
  stack: "WhatsApp Image 2026-08-31 at 22.35.28 (3).jpeg",
  badge: "WhatsApp Image 2026-08-31 at 22.35.29.jpeg",
};

const photoFiles = {
  clinical: "WhatsApp Image 2026-08-31 at 22.35.28.jpeg",
  "portrait-pink": "WhatsApp Image 2026-08-31 at 22.35.29 (1).jpeg",
  "portrait-coat": "WhatsApp Image 2026-08-31 at 22.35.29 (2).jpeg",
  "portrait-pattern": "WhatsApp Image 2026-08-31 at 22.35.30.jpeg",
  "portrait-pattern-tight": "WhatsApp Image 2026-08-31 at 22.35.30 (1).jpeg",
  candid: "WhatsApp Image 2026-08-31 at 22.36.14.jpeg",
};

async function run() {
  await whiteToTransparent(
    path.join(SRC, logoFiles.stack),
    path.join(OUT_LOGO, "logo-lockup.png")
  );
  await whiteToTransparent(
    path.join(SRC, logoFiles.badge),
    path.join(OUT_LOGO, "logo-badge.png")
  );

  // Favicon / touch icons from the circular badge
  const badgeTrimmed = sharp(path.join(OUT_LOGO, "logo-badge.png"));
  for (const size of [32, 180, 512]) {
    await badgeTrimmed
      .clone()
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUT_LOGO, `icon-${size}.png`));
  }

  const dims = {};
  for (const [key, file] of Object.entries(photoFiles)) {
    const inputPath = path.join(SRC, file);
    const meta = await sharp(inputPath).metadata();
    const maxW = 2200;
    const targetW = Math.min(meta.width, maxW);
    const outPath = path.join(OUT_IMG, `${key}.jpg`);
    const resized = sharp(inputPath).rotate().resize({ width: targetW });
    await resized.jpeg({ quality: 86, mozjpeg: true }).toFile(outPath);
    const outMeta = await sharp(outPath).metadata();
    dims[key] = { width: outMeta.width, height: outMeta.height };
    console.log("photo ->", outPath, outMeta.width, outMeta.height);
  }

  fs.writeFileSync(
    path.join(OUT_IMG, "dimensions.json"),
    JSON.stringify(dims, null, 2)
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
