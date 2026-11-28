// "382 días sin comer": Angus Barbieri (Scotland, 1965-66), 39 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1170;
export const W = { comer: 62, y1965: 112, escocia: 160, angus: 185, doscientos: 247, kilos: 260, hospital: 292, quiero: 321, medicos: 365, vigilancia: 416,
  pero: 442, semana: 485, mes: 511, seis: 529, agua: 570, te: 586, cafe: 598, vitaminas: 607, trabaja: 652, patatas: 675, comida: 739, trescientos: 762,
  pesa: 815, ochenta: 821, kilos2: 836, plato: 873, huevo: 893, ojo: 917, medicos2: 950, intentes: 1018, suscribete: 1054, comer2: 1141 };
export const S = { hook: 1, town: 2, hosp: 3, time: 4, shop: 5, result: 6, warn: 7, end: 8 };
export const TOWN: V3 = [-60, 0, 0], SHOP: V3 = [60, 0, 0];
const hookK = (a: number, b: number, rev = false) => {
  const k0 = { pos: [0.2, 1.5, 3.6] as V3, look: [0, 1.25, 0] as V3, fov: 44 }, k1 = { pos: [0.1, 1.45, 2.7] as V3, look: [0, 1.3, 0] as V3, fov: 42 };
  const [x, y] = rev ? [k1, k0] : [k0, k1];
  return [{ f: a, ...x }, { f: b, ...y, glide: true }];
};
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, sunAz: 130, keys: hookK(0, 100) },
  { id: 2, a: 98, b: 292, sunAz: 140, keys: [
    { f: 98, pos: [-50, 9, 24], look: [-60, 2, -6], fov: 48 },
    { f: 180, pos: [-59.2, 1.6, 4.4], look: [-60, 1.3, 0], fov: 44, glide: true },
    { f: 292, pos: [-59.6, 1.5, 3.4], look: [-60, 1.3, 0], fov: 42, glide: true },
  ] },
  { id: 3, a: 290, b: 442, sunAz: 130, keys: [
    { f: 290, pos: [1.6, 1.6, 4.6], look: [0.4, 1.2, 0], fov: 46 },
    { f: 442, pos: [0.6, 1.5, 3.8], look: [0.3, 1.25, 0], fov: 44, glide: true },
  ] },
  { id: 4, a: 440, b: 654, sunAz: 140, keys: [
    { f: 440, pos: [-1.0, 1.5, 3.4], look: [-0.2, 1.3, 0], fov: 44 },
    { f: 654, pos: [0.6, 1.5, 3.0], look: [0.0, 1.3, 0], fov: 44, glide: true },
  ] },
  { id: 5, a: 652, b: 762, sunAz: 120, keys: [
    { f: 652, pos: [61.6, 1.6, 4.4], look: [60.2, 1.2, 0], fov: 46 },
    { f: 762, pos: [60.6, 1.5, 3.4], look: [60.1, 1.25, 0], fov: 44, glide: true },
  ] },
  { id: 6, a: 760, b: 917, sunAz: 130, keys: [
    { f: 760, pos: [0.3, 1.4, 3.4], look: [0.3, 1.2, 0], fov: 44 },
    { f: 917, pos: [0.2, 1.35, 2.7], look: [0.2, 1.2, 0], fov: 42, glide: true },
  ] },
  { id: 7, a: 915, b: 1052, sunAz: 130, keys: [
    { f: 915, pos: [1.8, 1.6, 4.6], look: [0.6, 1.2, 0], fov: 46 },
    { f: 1052, pos: [0.8, 1.5, 3.6], look: [0.4, 1.3, 0], fov: 44, glide: true },
  ] },
  { id: 8, a: 1050, b: TOTAL, sunAz: 130, keys: hookK(1050, TOTAL, true) },
];
const K = kit(SHOTS, [{ f: 6, k: 0.04 }, { f: W.huevo, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.town ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 96, label: "382 DÍAS", sub: "sin comer", col: "#ffd23f", big: true },
  { a: 104, b: 182, label: "Escocia", sub: "1965", col: "#ffffff" },
  { a: 184, b: 244, label: "Angus Barbieri", sub: "27 años", col: "#9ad4ff" },
  { a: 676, b: 760, label: "RODEADO DE COMIDA", col: "#ffb23a" },
  { a: 990, b: 1050, label: "NO LO INTENTES", sub: "lo hizo con control médico", col: "#ff5a4a" },
];
