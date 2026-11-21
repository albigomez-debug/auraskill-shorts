// "La cigüeña flecha" (Pfeilstorch, Klütz 1822), 42.9 s. Words: cuello 85 · 1822 99 · Klütz 165 · invierno 249 · barro 308 · convertían 357 · Luna 443 ·
// aparece 466 · lanza 508 · volando 568 · abate 603 · alucina 656 · África 706 · Pero 724 · miles 801 · Fíjate 855 · Migran 948 · universidad 1033 ·
// flecha 1093 · Todo 1110 · cuello 1181 · Y 1196 · dale 1223
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1287;
export const W = { invierno: 249, barro: 308, convertian: 357, luna: 443, volando: 568, abate: 603, alucina: 656, africa: 706, miles: 801, migran: 948, universidad: 1033, flecha: 1093, dale: 1223 };
export const S = { hook: 1, village: 2, mud: 3, change: 4, moon: 5, appear: 6, hunter: 7, map: 8, museum: 9, end: 10, cta: 11 };
export const GOLD = [5];
export const LAK: V3 = [40, 0, 0], HUN: V3 = [80, 0, 0], UNI: V3 = [120, 0, 0];
export const flyX = (f: number) => f < 200 ? f * 0.05 - 2.4 : f < 800 ? (f - 516) * 0.04 : (f - 1150) * 0.05;
const fk = (a: number, b: number, y = 4.6, z = 5, ly = 5): ShotDef["keys"] => [{ f: a, pos: [flyX(a) + 0.5, y, z], look: [flyX(a), ly, 0], fov: 48 }, { f: b, pos: [flyX(b) + 0.5, y, z], look: [flyX(b), ly, 0], fov: 48 }];
const L = LAK[0], H = HUN[0], U = UNI[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 97, keys: fk(0, 97) },
  { id: 2, a: 95, b: 266, keys: [{ f: 95, pos: [0, 2.2, 8], look: [0, 1.6, 0], fov: 50 }, { f: 266, pos: [0.4, 1.8, 5.4], look: [0, 1.7, 0], fov: 48, glide: true }] },
  { id: 3, a: 264, b: 335, keys: [{ f: 264, pos: [L + 0.3, 1.6, 5.4], look: [L, 0.9, 1.2], fov: 48 }, { f: 335, pos: [L + 0.2, 1.3, 4.4], look: [L, 0.8, 1.2], fov: 46, glide: true }] },
  { id: 4, a: 333, b: 396, keys: [{ f: 333, pos: [0, 1.5, 4.6], look: [0, 1.2, 0.5], fov: 48 }, { f: 396, pos: [0.1, 1.4, 3.8], look: [0.1, 1.3, 0.5], fov: 46, glide: true }] },
  { id: 5, a: 394, b: 453, keys: [{ f: 394, pos: [0, 1.5, 9], look: [0, 10, -30], fov: 56 }, { f: 453, pos: [0, 2.5, 8], look: [0, 14, -30], fov: 56, glide: true }] },
  { id: 6, a: 451, b: 582, keys: [{ f: 451, pos: [flyX(451), 2.5, 9.5], look: [flyX(451), 3.2, 0], fov: 52 }, { f: 582, pos: [flyX(582), 2.4, 8.5], look: [flyX(582), 3.4, 0], fov: 52 }] },
  { id: 7, a: 580, b: 722, keys: [{ f: 580, pos: [H - 0.8, 2.0, 6.5], look: [H - 0.6, 1.7, 0], fov: 50 }, { f: 660, pos: [H - 0.2, 1.7, 5.6], look: [H - 0.1, 1.3, 0.3], fov: 48, glide: true }, { f: 722, pos: [H + 0.5, 1.5, 4.4], look: [H + 0.5, 1.1, 0.3], fov: 46, glide: true }] },
  { id: 8, a: 720, b: 853, keys: [{ f: 720, pos: [0.3, 2.0, 4.6], look: [0, 2.1, 0], fov: 50 }, { f: 853, pos: [0.1, 2.2, 3.8], look: [0, 2.3, 0], fov: 50, glide: true }] },
  { id: 9, a: 851, b: 1108, keys: [{ f: 851, pos: [U - 1, 2.2, 6.4], look: [U - 0.4, 2.0, -0.8], fov: 50 }, { f: 980, pos: [U, 1.9, 3.8], look: [U, 1.8, -0.8], fov: 46, glide: true }, { f: 1108, pos: [U - 0.4, 2.6, 5.6], look: [U - 0.6, 2.6, -1], fov: 50, glide: true }] },
  { id: 10, a: 1106, b: 1194, keys: fk(1106, 1194) },
  { id: 11, a: 1192, b: TOTAL, keys: [{ f: 1192, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 4, k: 0.04 }, { f: 603, k: 0.06 }, { f: 948, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.moon || id === S.appear ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 92, label: "¡LANZA!", sub: "en el cuello... y volando", col: "#ff3b3b", big: true },
  { a: 99, b: 178, label: "1822", sub: "Klütz, Alemania", col: "#ffffff" },
  { a: 508, b: 560, label: "80 cm", sub: "de lanza", col: "#ffd23f" },
  { a: 1110, b: 1190, label: "¡LANZA!", sub: "en el cuello... y volando", col: "#ff3b3b", big: true },
];
