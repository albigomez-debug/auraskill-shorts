// "El caballo que sabía sumar" (Clever Hans), 27.2 s. Words: caballo 8 · matemáticas 30 · Berlín 62 · creían 87 · 1904 114 ·
// profesor 157 · Hans 182 · preguntas 225 · tres más dos 249-259 · cinco golpes 280-288 · pata 305 · fallar 332 · gente 359 ·
// comisión 411 · expertos 424 · trampa 471 · Pero 489 · psicólogo 499 · no sabe la respuesta 554-567 · Hans falla 593-601 ·
// sumar 634 · caras 659 · relajaban 691 · correcto 725 · increíble 789
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 815;
export const W = { berlin: 62, profesor: 157, hans: 182, preguntas: 225, tres: 249, golpes: 280, fallar: 332, gente: 359, comision: 411,
  trampa: 471, pero: 489, psicologo: 499, respuesta: 567, falla: 601, sumar: 634, caras: 659, relajaban: 691, correcto: 725, increible: 789 };
export const S = { hook: 1, berlin: 2, sum: 3, crowd: 4, test: 5, faces: 6, end: 7 };
export const HORSE: V3 = [0.9, 0, 0], PROF: V3 = [-0.7, 0, 0.5], BOARD: V3 = [-1.6, 0, -0.8];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 110, sunAz: 130, keys: [
    { f: 0, pos: [0.4, 1.6, 7.4], look: [0.3, 1.3, 0], fov: 46 },
    { f: 110, pos: [0.4, 1.6, 6.2], look: [0.3, 1.3, 0], fov: 44, glide: true },
  ] },
  { id: 2, a: 106, b: 218, sunAz: 120, keys: [
    { f: 106, pos: [2, 6, 18], look: [0, 1, 0], fov: 46 },
    { f: 218, pos: [1, 2.6, 10], look: [0, 1.2, 0], fov: 44, glide: true },
  ] },
  { id: 3, a: 214, b: 347, sunAz: 130, keys: [
    { f: 214, pos: [-0.4, 1.6, 4.6], look: [-0.4, 1.3, 0], fov: 44 },
    { f: 270, pos: [0.6, 1.3, 3.8], look: [0.8, 1.0, 0], fov: 44, glide: true },
    { f: 347, pos: [0.7, 1.2, 3.4], look: [0.9, 0.9, 0], fov: 42, glide: true },
  ] },
  { id: 4, a: 343, b: 487, sunAz: 120, keys: [
    { f: 343, pos: [0, 2.2, 12], look: [0, 1.2, 0], fov: 46 },
    { f: 420, pos: [-2.5, 1.8, 8], look: [-0.6, 1.3, 0], fov: 44, glide: true },
    { f: 487, pos: [-2.8, 1.7, 6.4], look: [-0.8, 1.3, 0], fov: 42, glide: true },
  ] },
  { id: 5, a: 483, b: 612, sunAz: 130, keys: [
    { f: 483, pos: [0.4, 1.7, 6.0], look: [0, 1.2, 0], fov: 44 },
    { f: 612, pos: [0.8, 1.4, 4.2], look: [0.8, 1.0, 0], fov: 42, glide: true },
  ] },
  { id: 6, a: 608, b: 745, sunAz: 130, keys: [
    { f: 608, pos: [-0.6, 1.7, 3.6], look: [-0.7, 1.6, 0.5], fov: 40 },
    { f: 700, pos: [-0.65, 1.7, 2.9], look: [-0.7, 1.65, 0.5], fov: 36, glide: true },
    { f: 745, pos: [0.0, 1.6, 3.4], look: [0.2, 1.4, 0.3], fov: 42, glide: true },
  ] },
  { id: 7, a: 741, b: TOTAL, sunAz: 130, keys: [
    { f: 741, pos: [0.3, 1.8, 6], look: [0.1, 1.3, 0], fov: 44 },
    { f: TOTAL, pos: [0.4, 3.2, 12], look: [0, 1.3, 0], fov: 48, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 489, k: 0.04 }, { f: 601, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.berlin ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 104, label: "¿3 + 2?", sub: "pregúntale al caballo", col: "#ffd23f", big: true },
  { a: 108, b: 200, label: "Berlín", sub: "1904", col: "#ffffff" },
  { a: 408, b: 482, label: "13", sub: "expertos", col: "#ffffff" },
];
