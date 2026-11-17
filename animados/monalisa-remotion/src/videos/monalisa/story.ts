// "El robo de la Mona Lisa" (1911), 33.7 s. Words: robaron 53 · París 68 · 1911 81 · cerrado 156 · Peruggia 203 · armario 230 · noche 277 ·
// Descuelga 289 · bata 352 · puerta 389 · hueco 431 · Escándalo 453 · periódicos 535 · Picasso 588 · cola 636 · vacío 677 · Florencia 752 ·
// pillan 773 · suerte 790 · desgracia 840 · cuadro 907 · robaron 994
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1012;
export const W = { robaron: 53, lunes: 115, cerrado: 156, trabajador: 175, sale: 217, armario: 230, noche: 277, descuelga: 289, mete: 331,
  bata: 352, andando: 373, puerta: 389, siguiente: 412, hueco: 431, escandalo: 453, cara: 486, periodicos: 535, policia: 558, picasso: 588,
  miles: 607, cola: 636, vacio: 677, dos: 691, venderla: 738, pillan: 773, suerte: 790, vuelve: 814, desgracia: 840, famoso: 875, cuadro: 907 };
export const S = { hook: 1, louvre: 2, closet: 3, steal: 4, exit: 5, hole: 6, news: 7, police: 8, queue: 9, caught: 10, back: 11, end: 12 };
export const OUT: V3 = [40, 0, 0], FLO: V3 = [-40, 0, 0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 66, keys: [{ f: 0, pos: [0, 1.7, 1.2], look: [0, 1.7, -2.9], fov: 42 }, { f: 66, pos: [0, 1.6, 2.6], look: [0, 1.5, -2.9], fov: 46, glide: true }] },
  { id: 2, a: 62, b: 170, keys: [{ f: 62, pos: [44, 8, 26], look: [40, 5, -6], fov: 50 }, { f: 170, pos: [41, 3, 14], look: [40, 4, -6], fov: 48, glide: true }] },
  { id: 3, a: 166, b: 286, keys: [{ f: 166, pos: [-1.5, 1.6, 3.6], look: [-3, 1.3, -0.6], fov: 44 }, { f: 286, pos: [-2.0, 1.6, 2.4], look: [-2.8, 1.4, -0.6], fov: 40, glide: true }] },
  { id: 4, a: 282, b: 365, keys: [{ f: 282, pos: [0.6, 1.6, 1.8], look: [0, 1.5, -2.9], fov: 44 }, { f: 365, pos: [0.4, 1.5, 1.2], look: [0, 1.4, -2.0], fov: 42, glide: true }] },
  { id: 5, a: 361, b: 404, keys: [{ f: 361, pos: [42, 1.6, 6], look: [40, 1.3, 0], fov: 46 }, { f: 404, pos: [43, 1.6, 5.4], look: [41.5, 1.3, 0], fov: 46, glide: true }] },
  { id: 6, a: 400, b: 480, keys: [{ f: 400, pos: [0, 1.6, 3.4], look: [0, 1.6, -2.9], fov: 44 }, { f: 480, pos: [0, 1.6, 1.6], look: [0, 1.65, -2.9], fov: 40, glide: true }] },
  { id: 7, a: 476, b: 556, keys: [{ f: 476, pos: [10, 1.5, 1.4], look: [10, 1.5, -1], fov: 44 }, { f: 556, pos: [10, 1.5, 0.7], look: [10, 1.5, -1], fov: 40, glide: true }] },
  { id: 8, a: 552, b: 604, keys: [{ f: 552, pos: [20.3, 1.6, 3.4], look: [20, 1.35, 0], fov: 44 }, { f: 604, pos: [20.2, 1.5, 2.6], look: [20, 1.4, 0], fov: 40, glide: true }] },
  { id: 9, a: 600, b: 690, keys: [{ f: 600, pos: [48, 2.2, 8], look: [43, 1.3, -1], fov: 48 }, { f: 690, pos: [46, 1.9, 6], look: [42.5, 1.3, -1.5], fov: 46, glide: true }] },
  { id: 10, a: 686, b: 788, keys: [{ f: 686, pos: [-40, 1.6, 4.4], look: [-40, 1.3, 0], fov: 44 }, { f: 788, pos: [-39.8, 1.5, 3.2], look: [-40, 1.35, 0], fov: 42, glide: true }] },
  { id: 11, a: 784, b: 930, keys: [{ f: 784, pos: [0, 1.8, 5.0], look: [0, 1.5, -2.9], fov: 46 }, { f: 930, pos: [0.4, 1.6, 2.8], look: [0, 1.6, -2.9], fov: 42, glide: true }] },
  { id: 12, a: 926, b: TOTAL, keys: [{ f: 926, pos: [0, 1.6, 2.6], look: [0, 1.5, -2.9], fov: 46 }, { f: TOTAL, pos: [0, 1.7, 1.2], look: [0, 1.7, -2.9], fov: 42, glide: true }] },
];
const K = kit(SHOTS, [{ f: 431, k: 0.04 }, { f: 773, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.louvre ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 60, label: "ROBADA", sub: "y por eso es famosa", col: "#ff3b3b", big: true },
  { a: 70, b: 160, label: "París", sub: "1911", col: "#ffffff" },
  { a: 691, b: 750, label: "2 años después", sub: "Florencia", col: "#ffffff" },
  { a: 930, b: TOTAL, label: "ROBADA", sub: "y por eso es famosa", col: "#ff3b3b", big: true },
];
