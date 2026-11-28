// Recorta as miniaturas redondas da linha do tempo a partir das ilustrações.
// Rode "node scripts/stage-thumbs.mjs" se alguma ilustração de public/design/phase-*.webp mudar.
import sharp from "sharp";

const SIZE = 192;
// Centro do recorte e lado do quadrado, em pixels da ilustração original.
const crops = {
  pregnancy: { x: 545, y: 343, side: 614 },
  family: { x: 387, y: 231, side: 522 },
  babies: { x: 367, y: 251, side: 406 },
  childhood: { x: 370, y: 282, side: 518 },
  teens: { x: 370, y: 211, side: 370 },
  adults: { x: 387, y: 211, side: 425 },
  elderly: { x: 406, y: 201, side: 406 },
};

for (const [name, { x, y, side }] of Object.entries(crops)) {
  const source = `public/design/phase-${name}.webp`;
  const { width, height } = await sharp(source).metadata();
  const left = Math.round(x - side / 2);
  const top = Math.round(y - side / 2);

  // Completa com transparência o que passar da borda da ilustração.
  const pad = {
    left: Math.max(0, -left),
    top: Math.max(0, -top),
    right: Math.max(0, left + side - width),
    bottom: Math.max(0, top + side - height),
  };
  const padded = await sharp(source)
    .ensureAlpha()
    .extend({ ...pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(padded)
    .extract({ left: left + pad.left, top: top + pad.top, width: side, height: side })
    .resize(SIZE, SIZE)
    .webp({ quality: 90 })
    .toFile(`public/design/thumb-${name}.webp`);
}
