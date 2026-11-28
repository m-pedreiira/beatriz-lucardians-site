// Gera as versões da foto do hero a partir do arquivo original.
//
//   1. Coloque o original em assets/originais/hero.jpg (ou .jpeg, .png, .webp, .tif)
//   2. Rode: npm run foto-hero
//
// Só reduz o tamanho e converte o formato: não amplia, não aplica filtros e não
// altera a imagem. Os metadados do arquivo (como localização) não vão para o site.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/originais";
const OUT_DIR = "public/images/hero";
const MANIFEST = "lib/hero-photo.json";
const WIDTHS = [480, 720, 960, 1365, 1800, 2400];

const sources = fs.existsSync(SOURCE_DIR)
  ? fs.readdirSync(SOURCE_DIR).filter((f) => /^hero\.(jpe?g|png|webp|tiff?)$/i.test(f))
  : [];

if (sources.length !== 1) {
  console.error(`Esperava exatamente um arquivo "hero.*" em ${SOURCE_DIR}; encontrei ${sources.length}.`);
  process.exit(1);
}

const input = path.join(SOURCE_DIR, sources[0]);
const meta = await sharp(input).metadata();
// Fotos de celular podem vir "deitadas", com a rotação anotada nos metadados.
const turned = (meta.orientation ?? 1) >= 5;
const width = turned ? meta.height : meta.width;
const height = turned ? meta.width : meta.height;

const largest = Math.min(width, WIDTHS.at(-1));
const widths = [...WIDTHS.filter((w) => w < largest), largest];

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const w of widths) {
  const resized = () => sharp(input).rotate().resize({ width: w, withoutEnlargement: true }).keepIccProfile();
  const out = (ext) => path.join(OUT_DIR, `hero-${w}.${ext}`);

  await resized().avif({ quality: 80, chromaSubsampling: "4:4:4" }).toFile(out("avif"));
  await resized().webp({ quality: 92, smartSubsample: true }).toFile(out("webp"));

  // Um JPEG já no tamanho final e sem metadados é copiado byte a byte.
  const untouched = meta.format === "jpeg" && w === width && !turned && !meta.exif && !meta.xmp;
  if (untouched) fs.copyFileSync(input, out("jpg"));
  else await resized().jpeg({ quality: 95, chromaSubsampling: "4:4:4", mozjpeg: true }).toFile(out("jpg"));

  console.log(
    `${w}px`,
    ["avif", "webp", "jpg"].map((e) => `${e} ${Math.round(fs.statSync(out(e)).size / 1024)}KB`).join("  ")
  );
}

fs.writeFileSync(
  MANIFEST,
  JSON.stringify({ width: largest, height: Math.round((height * largest) / width), widths }, null, 2) + "\n"
);

if (width < 1600) {
  console.warn(`\nAviso: o original tem ${width}px de largura. O recomendado é 1600×2400 ou mais.`);
}
