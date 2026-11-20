// "Siete rayos" (Roy Sullivan, 1942-1977), 44.6 s. Words: rayo 29 · siete 42 · Roy 99 · guardabosques 124 · 1942 186 · rayo 229 · uña 266 · 1969 304 ·
// rayo 347 · cejas 404 · 1970 423 · hombro 470 · 1972 511 · cabeza 563 · pelo 600 · garrafa 656 · 1973 710 · rayo 748 · quemar 768 · 1976 791 ·
// tobillo 845 · 1977 870 · séptimo 933 · oso 984 · Fíjate 1031 · Guinness 1112 · museo 1175 · Siete 1192 · Y 1248 · dale 1275
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1340;
export const W = { roy: 99, guardabosques: 124, y1942: 236, rayo1: 236, una: 266, y1969: 341, cejas: 396, y1970: 423, hombro: 470, cabeza: 563, pelo: 600, garrafa: 656,
  rayo5: 748, quemar: 768, y1976: 791, tobillo: 845, septimo: 933, oso: 984, museo: 1175, siete2: 1192, dale: 1275 };
export const S = { hook: 1, intro: 2, tower: 3, truck: 4, yard: 5, hair: 6, again: 7, lake: 8, record: 9, end: 10, cta: 11 };
export const TOW: V3 = [30, 0, 0], TRK: V3 = [60, 0, 0], YRD: V3 = [90, 0, 0], STA: V3 = [120, 0, 0], LAK: V3 = [150, 0, 0], MUS: V3 = [180, 0, 0];
const T = TOW[0], K0 = TRK[0], Y = YRD[0], A = STA[0], L = LAK[0], M = MUS[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 95, keys: [{ f: 0, pos: [0.2, 1.8, 3.4], look: [0, 1.7, 0], fov: 50 }, { f: 95, pos: [0.4, 2.2, 5.6], look: [0, 2.0, 0], fov: 52, glide: true }] },
  { id: 2, a: 93, b: 184, keys: [{ f: 93, pos: [1.5, 2.2, 7.5], look: [0, 1.6, -1], fov: 50 }, { f: 184, pos: [0.4, 1.7, 4.4], look: [0, 1.5, 0], fov: 46, glide: true }] },
  { id: 3, a: 182, b: 302, keys: [{ f: 182, pos: [T + 4, 4, 12], look: [T, 5.5, -2], fov: 50 }, { f: 302, pos: [T + 1.0, 6.6, 5.2], look: [T, 6.7, -2], fov: 46, glide: true }] },
  { id: 4, a: 300, b: 421, keys: [{ f: 300, pos: [K0 + 2.5, 2.6, 8.5], look: [K0 + 1.0, 1.6, -0.8], fov: 50 }, { f: 421, pos: [K0 + 1.6, 2.2, 5.8], look: [K0 + 1.3, 1.7, -0.5], fov: 46, glide: true }] },
  { id: 5, a: 421, b: 509, keys: [{ f: 421, pos: [Y + 1.5, 2.4, 7], look: [Y, 1.6, -1], fov: 50 }, { f: 509, pos: [Y + 0.4, 1.8, 4.4], look: [Y, 1.5, 0], fov: 46, glide: true }] },
  { id: 6, a: 509, b: 681, keys: [{ f: 509, pos: [A + 1.5, 2.4, 7], look: [A, 1.8, -1], fov: 50 }, { f: 600, pos: [A + 0.3, 1.8, 3.8], look: [A, 1.7, 0], fov: 44, glide: true }, { f: 681, pos: [A + 0.5, 1.7, 4.2], look: [A + 0.2, 1.5, 0], fov: 44, glide: true }] },
  { id: 7, a: 679, b: 862, keys: [{ f: 679, pos: [A + 7, 2.2, 6], look: [A + 6, 1.7, 0], fov: 48 }, { f: 790, pos: [A + 6.3, 1.8, 3.8], look: [A + 6, 1.7, 0], fov: 44, glide: true }, { f: 862, pos: [A + 6.2, 1.0, 3.6], look: [A + 6, 0.8, 0], fov: 46, glide: true }] },
  { id: 8, a: 860, b: 1031, keys: [{ f: 860, pos: [L + 1, 2.6, 8.5], look: [L, 1.2, 0], fov: 50 }, { f: 960, pos: [L + 0.4, 1.8, 5.8], look: [L, 1.1, 1], fov: 46, glide: true }, { f: 1031, pos: [L + 1.4, 2.0, 7.2], look: [L + 0.8, 1.1, 0.8], fov: 50, glide: true }] },
  { id: 9, a: 1029, b: 1190, keys: [{ f: 1029, pos: [M - 3, 1.9, 3.4], look: [M - 3.1, 1.8, -1.8], fov: 46 }, { f: 1120, pos: [M - 1.8, 1.7, 3.4], look: [M - 1.5, 1.4, -1.2], fov: 46, glide: true }, { f: 1190, pos: [M - 0.5, 2.4, 5.0], look: [M - 0.5, 2.2, -1.5], fov: 50, glide: true }] },
  { id: 10, a: 1188, b: 1246, keys: [{ f: 1188, pos: [0.4, 2.2, 5.6], look: [0, 2.0, 0], fov: 52 }, { f: 1246, pos: [0.2, 1.8, 3.4], look: [0, 1.7, 0], fov: 50, glide: true }] },
  { id: 11, a: 1244, b: TOTAL, keys: [{ f: 1244, pos: [0.3, 2.2, 6.0], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.2, 5.0], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 1, k: 0.05 }, { f: 236, k: 0.05 }, { f: 347, k: 0.05 }, { f: 467, k: 0.05 }, { f: 560, k: 0.05 }, { f: 746, k: 0.05 }, { f: 842, k: 0.05 }, { f: 930, k: 0.06 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.tower ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 90, label: "7 RAYOS", sub: "y sobrevivió", col: "#ffd23f", big: true },
  { a: 142, b: 182, label: "Virginia", sub: "EE. UU.", col: "#ffffff" },
  { a: 186, b: 300, label: "1942", sub: "rayo 1 de 7", col: "#ffffff" },
  { a: 304, b: 419, label: "1969", sub: "rayo 2 de 7", col: "#ffffff" },
  { a: 423, b: 507, label: "1970", sub: "rayo 3 de 7", col: "#ffffff" },
  { a: 511, b: 640, label: "1972", sub: "rayo 4 de 7", col: "#ffffff" },
  { a: 710, b: 788, label: "1973", sub: "rayo 5 de 7", col: "#ffffff" },
  { a: 791, b: 860, label: "1976", sub: "rayo 6 de 7", col: "#ffffff" },
  { a: 870, b: 980, label: "1977", sub: "rayo 7 de 7", col: "#ff6a6a" },
  { a: 1192, b: 1244, label: "7 RAYOS", sub: "y sobrevivió", col: "#ffd23f", big: true },
];
