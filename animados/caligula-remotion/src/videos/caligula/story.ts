// "Calígula contra el mar" (año 40), 35.5 s. Words: emperador 9 · guerra 44 · mar 59 · Año 70 · Calígula 96 · emperador 114 · ejército 150 · Britania 192 · Miles 210 ·
// Catapultas 243 · invadir 286 · orden 324 · Britania 362 · mar 398 · conchas 425 · botín 452 · miran 497 · obedecen 509 · cascos 546 · Pero 576 · vuelve 622 ·
// océano 670 · desfile 702 · Fíjate 732 · Suetonio 780 · quiso 867 · cónsul 882 · caballo 896 · El 914 · mar 964 · Y 976 · dale 1003
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1066;
export const W = { caligula: 96, emperador: 114, orden: 324, conchas: 425, botin: 452, obedecen: 509, cascos: 546, vuelve: 610, oceano: 670, caballo: 864, dale: 1003 };
export const S = { hook: 1, intro: 2, army: 3, order: 4, sea: 5, shells: 6, rome: 7, source: 8, end: 9, cta: 10 };
export const GOLD = [1, 3, 4, 5, 6, 9];
export const ROM: V3 = [60, 0, 0], LIB: V3 = [120, 0, 0];
const R0 = ROM[0], L0 = LIB[0];
const cx = (f: number) => R0 - 5 + (f - W.vuelve) * 0.03;
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [5.0, 2.4, 6.5], look: [1.0, 1.3, -1.5], fov: 52 }, { f: b, pos: [2.2, 1.6, 4.6], look: [1.5, 1.6, 0], fov: 48, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 70, keys: hk(0, 70) },
  { id: 2, a: 68, b: 160, keys: [{ f: 68, pos: [0.6, 1.9, 5.5], look: [0, 1.7, 0.5], fov: 50 }, { f: 160, pos: [0.1, 1.9, 5.0], look: [0, 2.0, 0.5], fov: 48, glide: true }] },
  { id: 3, a: 158, b: 300, keys: [{ f: 158, pos: [-7, 2.0, 6.5], look: [-5.5, 1.4, 1.5], fov: 50 }, { f: 230, pos: [-1, 4.2, 10], look: [0, 1.2, -1], fov: 54, glide: true }, { f: 300, pos: [4, 3.0, 7.5], look: [4.5, 1.6, -2], fov: 52, glide: true }] },
  { id: 4, a: 298, b: 378, keys: [{ f: 298, pos: [0.2, 1.9, 5.4], look: [0.2, 1.8, 0], fov: 50 }, { f: 378, pos: [-0.5, 1.8, 4.2], look: [-0.5, 1.9, 0.3], fov: 48, glide: true }] },
  { id: 5, a: 376, b: 472, keys: [{ f: 376, pos: [0, 2.1, 5.6], look: [-0.2, 1.9, -0.2], fov: 50 }, { f: 472, pos: [0.1, 2.0, 5.0], look: [0, 1.9, 0.2], fov: 48, glide: true }] },
  { id: 6, a: 470, b: 574, keys: [{ f: 470, pos: [-3, 1.4, 4.8], look: [-2, 0.9, 1], fov: 50 }, { f: 574, pos: [2, 1.7, 5.6], look: [1, 1.0, 1], fov: 50, glide: true }] },
  { id: 7, a: 572, b: 730, keys: [{ f: 572, pos: [cx(572) + 1.5, 2.0, 5.5], look: [cx(572) + 0.6, 1.7, 0], fov: 50 }, { f: 650, pos: [cx(650) + 1.5, 2.0, 5.5], look: [cx(650) + 0.6, 1.8, 0], fov: 50, glide: true }, { f: 730, pos: [R0 - 0.5, 2.0, 7.5], look: [R0 - 0.8, 3.0, -2], fov: 54, glide: true }] },
  { id: 8, a: 728, b: 912, keys: [{ f: 728, pos: [L0 - 0.5, 1.6, 1.9], look: [L0 - 0.5, 1.5, -0.5], fov: 48 }, { f: 845, pos: [L0 + 0.6, 1.9, 4.2], look: [L0 + 0.2, 1.6, -0.5], fov: 50, glide: true }, { f: 880, pos: [L0 + 5.2, 2.0, 6.6], look: [L0 + 5.4, 1.8, 0], fov: 50, glide: true }, { f: 912, pos: [L0 + 5.3, 1.9, 5.8], look: [L0 + 5.5, 1.8, 0], fov: 48, glide: true }] },
  { id: 9, a: 910, b: 972, keys: hk(910, 972) },
  { id: 10, a: 970, b: TOTAL, keys: [{ f: 970, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 4, k: 0.05 }, { f: 324, k: 0.05 }, { f: 398, k: 0.04 }, { f: 914, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.army || id === S.hook || id === S.end ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 66, label: "¡AL MAR!", sub: "le declaró la guerra", col: "#ff3b3b", big: true },
  { a: 72, b: 150, label: "AÑO 40", sub: "costa frente a Britania", col: "#ffffff" },
  { a: 210, b: 262, label: "¡MILES!", sub: "de soldados", col: "#ffd23f" },
  { a: 914, b: 968, label: "¡AL MAR!", sub: "le declaró la guerra", col: "#ff3b3b", big: true },
];
