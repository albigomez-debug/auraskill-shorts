// "Dagen H" (Suecia, 1967), 37.5 s. Words: cinco 21 · mañana 33 · país 54 · carril 74 · Suecia 98 · 1967 113 · izquierda 183 · vecinos 215 · derecha 236 ·
// volante 284 · izquierda 296 · caos 317 · gobierno 344 · cambiar 376 · Todos 390 · septiembre 442 · Día H 475 · anuncios 516 · canciones 532 ·
// ropa 557 · madrugada 598 · tráfico 631 · cinco 655 · cruzan 695 · Despacito 740 · Pita 759 · señales 834 · noche 855 · suerte 872 · accidentes 887 ·
// desgracia 920 · parada 977 · autobús 998 · cinco 1041 · carril 1093 · vez 1106
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1124;
export const W = { izquierda: 183, vecinos: 215, derecha: 236, volante: 284, caos: 317, gobierno: 344, cambiar: 376, todos: 390, septiembre: 442,
  diaH: 475, anuncios: 516, canciones: 532, ropa: 557, madrugada: 598, trafico: 631, cinco: 655, cruzan: 695, despacito: 740, pita: 759,
  senales: 834, suerte: 872, accidentes: 887, desgracia: 920, parada: 977, autobus: 998 };
export const S = { hook: 1, sweden: 2, left: 3, chaos: 4, gov: 5, ads: 6, stop: 7, cross: 8, signs: 9, luck: 10, bus: 11, end: 12 };
export const GOV: V3 = [40, 0, 0], SIGN: V3 = [-40, 0, 0];
const G = GOV[0], SG = SIGN[0];
const TOP = (f0: number, f1: number, z0 = 0) => [{ f: f0, pos: [0, 13, z0 + 5] as V3, look: [0, 0, z0 - 1] as V3, fov: 46 }, { f: f1, pos: [0, 11, z0 + 4] as V3, look: [0, 0, z0 - 1] as V3, fov: 46, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 96, keys: TOP(0, 96) },
  { id: 2, a: 92, b: 152, keys: [{ f: 92, pos: [2.5, 4, 14], look: [0, 1.5, -2], fov: 50 }, { f: 152, pos: [2, 2.6, 9], look: [0, 1.3, -1], fov: 48, glide: true }] },
  { id: 3, a: 148, b: 252, keys: TOP(148, 252, -6) },
  { id: 4, a: 248, b: 334, keys: [{ f: 248, pos: [-3.2, 1.4, 4.2], look: [-1.2, 0.9, 0], fov: 46 }, { f: 334, pos: [-2.4, 1.3, 3.4], look: [-1.0, 0.9, 0], fov: 44, glide: true }] },
  { id: 5, a: 330, b: 462, keys: [{ f: 330, pos: [G + 0.4, 1.7, 4.4], look: [G, 1.4, 0], fov: 46 }, { f: 462, pos: [G + 0.3, 1.6, 3.2], look: [G, 1.45, 0], fov: 42, glide: true }] },
  { id: 6, a: 458, b: 594, keys: [{ f: 458, pos: [G + 6.4, 1.8, 5.4], look: [G + 6, 1.4, -0.5], fov: 48 }, { f: 594, pos: [G + 6.2, 1.7, 4.2], look: [G + 6, 1.4, -0.5], fov: 46, glide: true }] },
  { id: 7, a: 590, b: 680, keys: TOP(590, 680, -12) },
  { id: 8, a: 676, b: 790, keys: TOP(676, 790, -12) },
  { id: 9, a: 786, b: 870, keys: [{ f: 786, pos: [SG + 0.4, 1.8, 4.6], look: [SG, 1.6, 0], fov: 46 }, { f: 870, pos: [SG + 0.3, 1.7, 3.4], look: [SG, 1.7, 0], fov: 44, glide: true }] },
  { id: 10, a: 866, b: 920, keys: [{ f: 866, pos: [G + 0.4, 1.6, 3.8], look: [G + 0.3, 1.5, 0], fov: 44 }, { f: 920, pos: [G + 0.4, 1.6, 3.0], look: [G + 0.3, 1.55, 0], fov: 42, glide: true }] },
  { id: 11, a: 916, b: 1014, keys: [{ f: 916, pos: [1.2, 1.7, 5.4], look: [3.8, 1.2, -0.8], fov: 48 }, { f: 1014, pos: [1.8, 1.6, 4.4], look: [4.0, 1.2, -0.8], fov: 46, glide: true }] },
  { id: 12, a: 1010, b: TOTAL, keys: TOP(1010, TOTAL) },
];
const K = kit(SHOTS, [{ f: 317, k: 0.04 }, { f: 759, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.left || id === S.stop || id === S.cross || id === S.end || id === S.sweden ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 66, label: "TODO UN PAÍS", sub: "cambió de carril a la vez", col: "#ffd23f", big: true },
  { a: 96, b: 150, label: "Suecia", sub: "1967", col: "#ffffff" },
  { a: 160, b: 210, label: "⬅ por la IZQUIERDA", col: "#ffffff" },
  { a: 436, b: 470, label: "3 de septiembre", col: "#ffffff" },
  { a: 600, b: 676, label: "4:50", sub: "de la madrugada", col: "#ffffff" },
  { a: 676, b: 760, label: "5:00", sub: "¡a la DERECHA! ➡", col: "#ffd23f" },
  { a: 1040, b: TOTAL, label: "TODO UN PAÍS", sub: "cambió de carril a la vez", col: "#ffd23f", big: true },
];
