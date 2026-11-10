// Timeline of "La ola de cerveza de Londres" (17 Oct 1814), 35.6 s, timed to public/voz/voz.wav (palabras.json).
export const FPS = 30;
export const TOTAL = 1068;
export type V3 = [number, number, number];
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const u = clamp01(x); return u * u * (3 - 2 * u); };
const smoother = (x: number) => { const u = clamp01(x); return u * u * u * (u * (6 * u - 15) + 10); };

// words (frames): 1814 8 · ola 50 · cerveza 58 · Londres 79 · no es coña 104-121 · Fábrica Meux 138-150 · cuba 193 ·
// siete metros 213-220 · seiscientos mil litros 239-259 · negra 280 · Una tarde 297 · aro 323 · se suelta 338-342 ·
// revienta 375 · rompe 392 · lado 411 · hostia 425 · millón y medio 442 · calle 483 · ola 508 · cinco metros 524 ·
// tumba 543 · casas 556 · sótanos 580 · Por suerte 600 · obreros 628 · vivos 669 · Por desgracia 686 · murieron 725 ·
// ocho 736 · Fíjate 765 · golpe 802 · nueve mil barriles 811-823 · juez 853 · acto de Dios 891-900 ·
// vaya puta locura 922-936 · Hacienda 969 · devolvió 983 · impuestos 1013 · perdida 1042 (voice ends ~1065)
export const W = { cona: 121, suelta: 342, rompe: 392, sotanos: 580, vivos: 669, golpe: 802, dios: 900, devolvio: 983 };
export const S = { hook: 1, calm: 2, vat: 3, wave: 4, rescue: 5, sad: 6, barrels: 7, court: 8, tax: 9 };

export const VAT = { x: 0, z: -38, r: 5.4, h: 6.7 };
export const VAT_FRONT = VAT.z + VAT.r;
export const BURST = 373;
const WV = 7.3;
export const floodAt = (id: number, f: number): { on: boolean; front: number; h: number; level: number } => {
  if (id === S.hook) { const t = 2.8 + f / FPS; return { on: true, front: VAT_FRONT + WV * t * 0.9, h: 4.4, level: 1.0 }; }
  if (id === S.vat || id === S.wave) {
    if (f < BURST) return { on: false, front: VAT_FRONT, h: 0, level: 0 };
    const t = (f - BURST) / FPS;
    return { on: true, front: VAT_FRONT + 0.5 + WV * t, h: 4.8 * smooth(t / 0.4) * (1 - 0.03 * t), level: 1.0 * smooth(t / 0.6) };
  }
  return { on: false, front: 0, h: 0, level: 0 };
};

type Key = { f: number; pos: V3; look: V3; fov: number; glide?: boolean };
export type ShotDef = { id: number; a: number; b: number; keys: Key[]; place: "street" | "room"; sunAz?: number };
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 132, place: "street", sunAz: 140, keys: [
    { f: 0, pos: [0.8, 1.7, 6], look: [0, 2.6, -14], fov: 50 },
    { f: 132, pos: [-0.4, 2.2, 26], look: [0, 3.0, 4], fov: 52, glide: true },
  ] },
  { id: 2, a: 126, b: 292, place: "street", sunAz: 125, keys: [
    { f: 126, pos: [1, 1.75, 22], look: [0, 3.5, -20], fov: 46 },
    { f: 200, pos: [0.6, 2.4, 2], look: [0, 5, -34], fov: 50, glide: true },
    { f: 250, pos: [-2.5, 6.5, -10], look: [0, 4, -38], fov: 54, glide: true },
    { f: 292, pos: [2, 9.5, -14], look: [0, 3, -40], fov: 54, glide: true },
  ] },
  { id: 3, a: 288, b: 436, place: "street", sunAz: 120, keys: [
    { f: 288, pos: [-2.6, 1.9, -26.8], look: [0.2, 2.4, -33], fov: 46 },
    { f: 345, pos: [-2.4, 1.8, -27.2], look: [0.2, 2.0, -33], fov: 44, glide: true },
    { f: 370, pos: [-1, 5.5, -16], look: [0, 3.5, -34], fov: 50, glide: true },
    { f: 436, pos: [-0.8, 5.9, -12.5], look: [0, 3.2, -30], fov: 52, glide: true },
  ] },
  { id: 4, a: 432, b: 598, place: "street", sunAz: 130, keys: [
    { f: 432, pos: [-3, 6.5, -8], look: [0, 3, -30], fov: 52 },
    { f: 500, pos: [-3, 7, 8], look: [0, 2.5, -10], fov: 54, glide: true },
    { f: 550, pos: [2.5, 6, 27], look: [-8, 2.5, 13], fov: 50, glide: true },
    { f: 598, pos: [2.8, 3.5, 30], look: [3, 0.8, 8], fov: 48, glide: true },
  ] },
  { id: 5, a: 594, b: 690, place: "street", sunAz: 120, keys: [
    { f: 594, pos: [1.8, 2.2, -28.5], look: [-0.4, 1.3, -35.5], fov: 46 },
    { f: 690, pos: [1.2, 2.0, -30.5], look: [-0.4, 1.4, -35.5], fov: 42, glide: true },
  ] },
  { id: 6, a: 686, b: 762, place: "street", sunAz: 150, keys: [
    { f: 686, pos: [1.5, 1.7, 19.5], look: [0.5, 1.5, 13.5], fov: 42 },
    { f: 762, pos: [1.2, 1.65, 17.8], look: [0.5, 1.5, 13.5], fov: 40, glide: true },
  ] },
  { id: 7, a: 758, b: 842, place: "room", sunAz: 120, keys: [
    { f: 758, pos: [-300.5, 1.5, 3], look: [-300, 1.2, -8], fov: 50 },
    { f: 842, pos: [-300, 5, 8], look: [-300, 0.5, -14], fov: 54, glide: true },
  ] },
  { id: 8, a: 838, b: 912, place: "room", sunAz: 140, keys: [
    { f: 838, pos: [302.6, 2.3, 4.6], look: [302.8, 2.0, -2.5], fov: 46 },
    { f: 912, pos: [302.8, 2.5, 2.6], look: [302.9, 2.3, -2.5], fov: 42, glide: true },
  ] },
  { id: 9, a: 908, b: TOTAL, place: "room", sunAz: 130, keys: [
    { f: 908, pos: [601, 1.8, 6.2], look: [601, 1.4, 0], fov: 46 },
    { f: TOTAL, pos: [601, 1.75, 4.6], look: [601, 1.5, 0], fov: 42, glide: true },
  ] },
];
export const XFADE = 6;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const SHAKES = [{ f: BURST, k: 0.18 }, { f: W.rompe, k: 0.1 }, { f: 545, k: 0.1 }];
export const camAt = (id: number, f: number) => {
  const k = SHOTS[id - 1].keys;
  let pos: V3 = k[k.length - 1].pos, look: V3 = k[k.length - 1].look, fov = k[k.length - 1].fov;
  if (f <= k[0].f) { pos = k[0].pos; look = k[0].look; fov = k[0].fov; }
  else for (let i = 1; i < k.length; i++) if (f <= k[i].f) {
    const u = (f - k[i - 1].f) / (k[i].f - k[i - 1].f), t = k[i].glide ? smoother(u) : u;
    pos = lerp3(k[i - 1].pos, k[i].pos, t); look = lerp3(k[i - 1].look, k[i].look, t); fov = lerp(k[i - 1].fov, k[i].fov, t);
    break;
  }
  let sx = 0, sy = 0;
  for (const s of SHAKES) { const d = f - s.f; if (d >= 0 && d < 7) { const a = s.k * (1 - d / 7) * (d % 2 ? -1 : 1); sx += a; sy += a * 0.6; } }
  return { pos: [pos[0] + sx, pos[1] + sy, pos[2]] as V3, look, fov };
};
export const layersAt = (f: number): { id: number; alpha: number }[] => {
  for (let i = SHOTS.length - 1; i > 0; i--) {
    const a = SHOTS[i].a;
    if (f >= a + XFADE) return [{ id: i + 1, alpha: 1 }];
    if (f >= a) return [{ id: i, alpha: 1 }, { id: i + 1, alpha: (f - a + 1) / (XFADE + 1) }];
  }
  return [{ id: 1, alpha: 1 }];
};
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => {
  if (id === S.hook) return { cInf: 3 };
  if (id === S.calm) return { cInf: lerp(7, 0, smooth((f - 150) / 40)) };
  if (id === S.vat) return f < 350 ? { cInf: 12, focus: [-2.2, 1.7, -30] } : { cInf: 3 };
  if (id === S.wave) return { cInf: 0 };
  if (id === S.rescue) return { cInf: 6 };
  if (id === S.sad) return { cInf: 14, focus: [0.8, 1.8, 14] };
  if (id === S.barrels) return { cInf: 4 };
  if (id === S.court) return { cInf: 12, focus: [303, 2.6, -3] };
  return { cInf: 12, focus: [601, 1.8, 0.3] };
};
export const MARKS = [
  { a: 6, b: 74, label: "LONDRES", sub: "17 de octubre de 1814", col: "#ffffff" },
  { a: 238, b: 290, label: "600.000", sub: "litros", col: "#ffd23f" },
  { a: 440, b: 490, label: "1.500.000", sub: "litros", col: "#ffd23f" },
  { a: 520, b: 548, label: "5 m", sub: "de altura", col: "#ffffff" },
  { a: 810, b: 842, label: "9.000", sub: "barriles", col: "#ffd23f" },
];
