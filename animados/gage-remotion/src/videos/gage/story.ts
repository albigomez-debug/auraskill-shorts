// "Phineas Gage" (1848), 35.7 s. Words: barra 23 · atravesó 42 · cabeza 56 · hablando 81 · 1848 95 · Phineas 162 · tren 211 · explosivos 220 · Mete 241 ·
// pólvora 252 · aprieta 281 · metro 322 · chispa 340 · Boom 354 · disparada 383 · entra 401 · mejilla 414 · sale 430 · cabeza 454 · cae 467 · veinte 475 ·
// levanta 516 · Habla 531 · carreta 563 · médico 583 · doctor 613 · trabajo 638 · Sobrevive 653 · amigos 682 · impulsivo 731 · maleducado 753 ·
// Fíjate 771 · cerebro 807 · carácter 834 · suerte 853 · doce 872 · desgracia 904 · ojo 934 · ciencia 967 · cerebro 1004 · barra 1029 · cabeza 1052
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1072;
export const W = { gage: 162, polvora: 252, aprieta: 281, chispa: 340, boom: 354, entra: 401, sale: 430, cabeza: 454, cae: 467, levanta: 516,
  habla: 531, carreta: 563, doctor: 613, trabajo: 638, sobrevive: 653, amigos: 682, impulsivo: 731, maleducado: 753, cerebro: 807,
  caracter: 834, doce: 872, desgracia: 904, ojo: 934, ciencia: 967 };
export const S = { hook: 1, site: 2, tamp: 3, boom: 4, rod: 5, up: 6, cart: 7, doc: 8, friends: 9, brain: 10, years: 11, science: 12, end: 13 };
export const DOC: V3 = [40, 0, 0], TOWN: V3 = [-40, 0, 0], LAB: V3 = [80, 0, 0];
const D = DOC[0], T = TOWN[0], L = LAB[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, keys: [{ f: 0, pos: [0.2, 1.6, 2.0], look: [0, 1.55, 0], fov: 42 }, { f: 100, pos: [0.4, 1.6, 3.0], look: [0, 1.4, 0], fov: 46, glide: true }] },
  { id: 2, a: 96, b: 236, keys: [{ f: 96, pos: [6, 3, 12], look: [0, 1.4, -2], fov: 50 }, { f: 236, pos: [1.6, 1.6, 5], look: [0, 1.2, 0], fov: 46, glide: true }] },
  { id: 3, a: 232, b: 352, keys: [{ f: 232, pos: [0.6, 1.4, 3.6], look: [0.2, 1.0, 0], fov: 44 }, { f: 352, pos: [0.5, 1.1, 2.6], look: [0.3, 0.8, 0], fov: 42, glide: true }] },
  { id: 4, a: 348, b: 400, keys: [{ f: 348, pos: [0.4, 1.4, 4.4], look: [0, 1.2, 0], fov: 46 }, { f: 400, pos: [0.4, 1.4, 5.0], look: [0, 1.3, 0], fov: 48, glide: true }] },
  { id: 5, a: 396, b: 500, keys: [{ f: 396, pos: [0.3, 1.6, 2.4], look: [0, 1.5, 0], fov: 44 }, { f: 455, pos: [0.3, 2.0, 3.2], look: [0, 2.2, 0], fov: 46, glide: true }, { f: 500, pos: [1, 1.8, 5.5], look: [4, 1, -6], fov: 48, glide: true }] },
  { id: 6, a: 496, b: 545, keys: [{ f: 496, pos: [0.3, 1.0, 3.0], look: [0, 0.8, 0], fov: 44 }, { f: 545, pos: [0.3, 1.5, 2.8], look: [0, 1.4, 0], fov: 42, glide: true }] },
  { id: 7, a: 541, b: 600, keys: [{ f: 541, pos: [21, 1.8, 6], look: [20, 1.4, 0], fov: 46 }, { f: 600, pos: [23.5, 1.8, 5.5], look: [22.5, 1.4, 0], fov: 46, glide: true }] },
  { id: 8, a: 596, b: 672, keys: [{ f: 596, pos: [D + 0.2, 1.6, 4.2], look: [D, 1.3, 0], fov: 44 }, { f: 672, pos: [D + 0.2, 1.5, 3.2], look: [D, 1.35, 0], fov: 42, glide: true }] },
  { id: 9, a: 668, b: 772, keys: [{ f: 668, pos: [T + 0.4, 1.7, 5], look: [T, 1.3, 0], fov: 46 }, { f: 772, pos: [T + 0.2, 1.6, 3.8], look: [T, 1.4, 0], fov: 44, glide: true }] },
  { id: 10, a: 768, b: 850, keys: [{ f: 768, pos: [L + 0.4, 1.7, 4.6], look: [L, 1.6, -1], fov: 46 }, { f: 850, pos: [L + 0.6, 1.8, 3.2], look: [L + 0.6, 1.9, -1.6], fov: 42, glide: true }] },
  { id: 11, a: 846, b: 948, keys: [{ f: 846, pos: [-2, 1.6, 4.2], look: [-1.6, 1.3, 0], fov: 46 }, { f: 948, pos: [-0.4, 1.6, 2.8], look: [-0.6, 1.5, 0], fov: 42, glide: true }] },
  { id: 12, a: 944, b: 1022, keys: [{ f: 944, pos: [L + 6, 1.8, 5], look: [L + 6, 1.4, -1], fov: 46 }, { f: 1022, pos: [L + 6, 1.5, 2.6], look: [L + 6, 1.4, -1], fov: 40, glide: true }] },
  { id: 13, a: 1018, b: TOTAL, keys: [{ f: 1018, pos: [0.4, 1.6, 3.0], look: [0, 1.4, 0], fov: 46 }, { f: TOTAL, pos: [0.2, 1.6, 2.0], look: [0, 1.55, 0], fov: 42, glide: true }] },
];
const K = kit(SHOTS, [{ f: 354, k: 0.07 }, { f: 401, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.site ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 66, label: "LE ATRAVESÓ", sub: "la cabeza... y siguió hablando", col: "#ff3b3b", big: true },
  { a: 98, b: 160, label: "1848", sub: "Estados Unidos", col: "#ffffff" },
  { a: 470, b: 500, label: "20 metros", col: "#ffd23f" },
  { a: 860, b: 900, label: "+12 años", col: "#ffffff" },
  { a: 1030, b: TOTAL, label: "LE ATRAVESÓ", sub: "la cabeza... y siguió hablando", col: "#ff3b3b", big: true },
];
