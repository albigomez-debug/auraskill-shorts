// "Onoda", 37.4 s. Words: veintinueve 69 · 1944 121 · Onoda 196 · jamás 276 · 1945 294 · panfletos 369 · trampa 471 · jungla 513 · Diez 526 ·
// Veinte 548 · trizas 616 · 1974 636 · encuentra 697 · comandante 773 · jubilado 845 · orden 901 · suerte 917 · desgracia 963 · siglo 1002 · terminara 1103
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1124;
export const W = { onoda: 196, orden: 248, jamas: 276, termina: 342, panfletos: 369, piensa: 443, trampa: 471, diez: 526, veinte: 548,
  escondido: 572, trizas: 616, joven: 676, encuentra: 697, dice: 726, comandante: 773, traen: 802, jubilado: 845, vuela: 864, orden2: 901,
  suerte: 917, desgracia: 963, siglo: 1002 };
export const S = { hook: 1, order: 2, leaflets: 3, years: 4, found: 5, boss: 6, home: 7, end: 8 };
export const CAMP: V3 = [60, 0, 0], TOKYO: V3 = [-60, 0, 0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 120, keys: [{ f: 0, pos: [0.3, 1.5, 4.4], look: [0, 1.3, 0], fov: 44 }, { f: 120, pos: [0.2, 1.5, 3.0], look: [0, 1.45, 0], fov: 40, glide: true }] },
  { id: 2, a: 116, b: 290, keys: [{ f: 116, pos: [64, 4, 12], look: [60, 1.5, 0], fov: 46 }, { f: 230, pos: [60.4, 1.6, 4.4], look: [60.1, 1.4, 0], fov: 44, glide: true }, { f: 290, pos: [60.6, 1.6, 3.2], look: [60.4, 1.5, 0], fov: 40, glide: true }] },
  { id: 3, a: 286, b: 500, keys: [{ f: 286, pos: [0, 2, 9], look: [0, 6, -4], fov: 50 }, { f: 400, pos: [0.4, 1.6, 5], look: [0, 2.2, 0], fov: 46, glide: true }, { f: 500, pos: [0.2, 1.6, 3.0], look: [0, 1.4, 0], fov: 42, glide: true }] },
  { id: 4, a: 496, b: 632, keys: [{ f: 496, pos: [-2.5, 1.4, 5], look: [-1, 1.1, 0], fov: 44 }, { f: 632, pos: [0.6, 1.4, 3.2], look: [0.3, 1.2, 0], fov: 42, glide: true }] },
  { id: 5, a: 628, b: 792, keys: [{ f: 628, pos: [0, 2.2, 7], look: [0, 1.3, 0], fov: 46 }, { f: 792, pos: [-0.2, 1.6, 3.6], look: [-0.3, 1.4, 0], fov: 42, glide: true }] },
  { id: 6, a: 788, b: 914, keys: [{ f: 788, pos: [0.4, 1.6, 4.4], look: [0, 1.3, 0], fov: 44 }, { f: 914, pos: [0.4, 1.6, 3.2], look: [0.2, 1.4, 0], fov: 40, glide: true }] },
  { id: 7, a: 910, b: 1014, keys: [{ f: 910, pos: [-60, 2.4, 9], look: [-60, 1.6, 0], fov: 46 }, { f: 1014, pos: [-60, 1.6, 3.2], look: [-60, 1.5, 0], fov: 40, glide: true }] },
  { id: 8, a: 1010, b: TOTAL, keys: [{ f: 1010, pos: [0.2, 1.5, 3.0], look: [0, 1.45, 0], fov: 40 }, { f: TOTAL, pos: [0.3, 1.5, 4.4], look: [0, 1.3, 0], fov: 44, glide: true }] },
];
const K = kit(SHOTS, [{ f: 471, k: 0.03 }, { f: 901, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.order || id === S.home ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 114, label: "29 AÑOS", sub: "en una guerra que ya acabó", col: "#ff3b3b", big: true },
  { a: 122, b: 220, label: "1944", sub: "Filipinas", col: "#ffffff" },
  { a: 296, b: 360, label: "1945", sub: "fin de la guerra", col: "#ffffff" },
  { a: 526, b: 548, label: "10 AÑOS", col: "#ffd23f" },
  { a: 548, b: 628, label: "20 AÑOS", col: "#ffd23f" },
  { a: 636, b: 700, label: "1974", col: "#ffffff" },
  { a: 735, b: 790, label: "¿Rendirme?", sub: "solo si lo ordena mi comandante", col: "#ffd23f" },
  { a: 1014, b: TOTAL, label: "29 AÑOS", sub: "en una guerra que ya acabó", col: "#ff3b3b", big: true },
];
