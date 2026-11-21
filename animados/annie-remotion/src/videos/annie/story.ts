// "Annie Taylor y el Niágara" (24-X-1901), 40.25 s. Words: abuela 9 · sesenta 19 · cataratas 57 · Niágara 71 · barril 95 · 1901 109 · Annie 139 · profesora 170 ·
// arruinada 199 · plan 239 · famosa 268 · barril 345 · Primero 361 · gato 387 · sobrevive 416 · cumpleaños 450 · cojín 512 · tapa 546 · bomba 590 · cae 638 ·
// metros 675 · Pero 693 · viva 774 · corte 804 · dice 851 · nunca 901 · Fíjate 918 · robó 994 · pobre 1030 · Una 1044 · barril 1102 · Y 1117 · dale 1144
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth, clamp01 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1208;
export const W = { annie: 139, anos0: 163, arruinada: 199, barril0: 345, sobrevive: 416, cojin: 512, tapa: 546, bomba: 590, cae: 638, viva: 774, corte: 804, robo: 994, pobre: 1030, dale: 1144 };
export const S = { hook: 1, intro: 2, plan: 3, cat: 4, prep: 5, fall: 6, rescue: 7, quote: 8, poor: 9, end: 10, cta: 11 };
export const GOLD = [1, 6, 10];
export const FAL: V3 = [60, 0, -10], TOP: V3 = [54, 12, -14], STR: V3 = [-40, 0, 0];
export const barrelY = (f: number) => { const s = f < 300 ? (f - 8) / 72 : f < 900 ? (f - 624) / 46 : (f - 1046) / 60; const c = clamp01(s); return s >= 1 ? 0.55 + Math.sin(f * 0.2) * 0.08 : 12.6 - 12.0 * c * c; };
const H = (f: number) => barrelY(f) * 0.85 + 1.0;
const fallKeys = (a: number, b: number, d: number): ShotDef["keys"] => [0, 0.25, 0.5, 0.75, 1].map((k) => { const f = Math.round(a + (b - a) * k); return { f, pos: [FAL[0] + 1.5 - k * 3, 3.5 + H(f) * 0.4, FAL[2] + d - k * 2] as V3, look: [FAL[0], H(f), FAL[2]] as V3, fov: 52, glide: k > 0 }; });
const [fx0, , ] = FAL, [tx, ty, tz] = TOP, sx = STR[0], rx = FAL[0] + 8;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 107, keys: fallKeys(0, 107, 17) },
  { id: 2, a: 105, b: 215, keys: [{ f: 105, pos: [-0.8, 1.9, 6.5], look: [0, 1.6, 0], fov: 50 }, { f: 215, pos: [0.3, 1.7, 4.5], look: [0, 1.7, 0.5], fov: 46, glide: true }] },
  { id: 3, a: 213, b: 358, keys: [{ f: 213, pos: [0.6, 1.7, 4.2], look: [0.2, 1.7, 0.5], fov: 48 }, { f: 300, pos: [0.2, 1.8, 4.6], look: [0.3, 1.8, 0.5], fov: 48, glide: true }, { f: 358, pos: [0.9, 1.5, 4.0], look: [0.35, 1.3, 0.5], fov: 48, glide: true }] },
  { id: 4, a: 356, b: 432, keys: [{ f: 356, pos: [tx + 0.2, ty + 1.8, tz + 6], look: [tx, ty + 1.0, tz + 0.6], fov: 50 }, { f: 432, pos: [tx + 0.6, ty + 1.5, tz + 4.4], look: [tx + 0.3, ty + 1.0, tz + 0.6], fov: 48, glide: true }] },
  { id: 5, a: 430, b: 622, keys: [{ f: 430, pos: [tx - 1.5, ty + 1.9, tz + 6], look: [tx, ty + 1.2, tz + 0.4], fov: 52 }, { f: 530, pos: [tx + 0.4, ty + 1.6, tz + 4.6], look: [tx, ty + 1.1, tz + 0.5], fov: 50, glide: true }, { f: 622, pos: [tx + 1.6, ty + 1.8, tz + 5.4], look: [tx + 0.2, ty + 1.0, tz + 0.5], fov: 50, glide: true }] },
  { id: 6, a: 620, b: 692, keys: fallKeys(620, 692, 13) },
  { id: 7, a: 690, b: 830, keys: [{ f: 690, pos: [rx - 2.5, 2.4, 7.5], look: [rx - 1, 1.2, 0], fov: 52 }, { f: 770, pos: [rx, 1.9, 5.2], look: [rx, 1.4, 0.8], fov: 48, glide: true }, { f: 830, pos: [rx + 0.3, 1.8, 3.9], look: [rx, 1.6, 0.9], fov: 46, glide: true }] },
  { id: 8, a: 828, b: 915, keys: [{ f: 828, pos: [rx + 0.6, 1.9, 5.2], look: [rx + 0.2, 1.8, 0.9], fov: 48 }, { f: 915, pos: [rx + 0.2, 1.8, 4.6], look: [rx + 0.2, 1.8, 0.9], fov: 46, glide: true }] },
  { id: 9, a: 913, b: 1042, keys: [{ f: 913, pos: [sx - 0.6, 1.8, 5.2], look: [sx - 0.4, 1.5, 0.3], fov: 50 }, { f: 994, pos: [sx + 0.4, 1.8, 5.6], look: [sx + 0.6, 1.5, 0.3], fov: 50, glide: true }, { f: 1042, pos: [sx - 0.9, 1.5, 3.6], look: [sx - 1.0, 1.4, 0.4], fov: 46, glide: true }] },
  { id: 10, a: 1040, b: 1115, keys: fallKeys(1040, 1115, 17) },
  { id: 11, a: 1113, b: TOTAL, keys: [{ f: 1113, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
void fx0; void smooth;
const K = kit(SHOTS, [{ f: 80, k: 0.06 }, { f: 670, k: 0.07 }, { f: 1106, k: 0.06 }, { f: 994, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.fall || id === S.end ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 100, label: "¡63 AÑOS!", sub: "Niágara... en un barril", col: "#ff3b3b", big: true },
  { a: 109, b: 165, label: "1901", sub: "Cataratas del Niágara", col: "#ffffff" },
  { a: 651, b: 690, label: "+50 m", sub: "de caída", col: "#ffd23f" },
  { a: 1044, b: 1110, label: "¡63 AÑOS!", sub: "Niágara... en un barril", col: "#ff3b3b", big: true },
];
