// "El hombre que se comió un avión" (Michel Lotito, Monsieur Mangetout; Cessna 150, 1978-1980), 42 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1260;
export const W = { francia: 110, michel: 132, mangetout: 176, cometodo: 209, nino: 235, vasos: 262, ambicioso: 301, bicis: 323, teles: 352,
  carritos: 380, ataud: 425, pero: 481, y1978: 488, jefe: 533, cessna: 570, corta: 593, trocitos: 602, aceite: 642, agua: 659, masticar: 683,
  kilo: 710, tarda: 735, anos: 748, como: 767, fijate: 796, estomago: 845, doble: 881, raro: 935, platanos: 953, huevos: 970, fatal: 1000,
  total: 1023, nueve: 1040, guinness: 1084, placa: 1103, bronce: 1112, tambien: 1160, comio: 1172, porque: 1190 };
export const S = { hook: 1, intro: 2, kid: 3, menu: 4, plane: 5, eat: 6, doc: 7, plaque: 8, end: 9 };
export const FIELD: V3 = [0, 0, 0], HOME: V3 = [60, 0, 0], CLINIC: V3 = [-60, 0, 0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 108, sunAz: 120, keys: [
    { f: 0, pos: [0.9, 1.35, 4.6], look: [0.3, 1.3, -1], fov: 46 },
    { f: 108, pos: [0.6, 1.3, 3.6], look: [0.2, 1.25, -1], fov: 44, glide: true },
  ] },
  { id: 2, a: 104, b: 230, sunAz: 130, keys: [
    { f: 104, pos: [60.5, 7, 22], look: [60, 2, -6], fov: 46 },
    { f: 230, pos: [60.2, 1.5, 4.0], look: [60, 1.2, 0], fov: 42, glide: true },
  ] },
  { id: 3, a: 226, b: 320, sunAz: 130, keys: [
    { f: 226, pos: [62.6, 1.0, 3.0], look: [62.5, 0.8, 0], fov: 42 },
    { f: 320, pos: [62.6, 0.95, 2.2], look: [62.5, 0.8, 0], fov: 40, glide: true },
  ] },
  { id: 4, a: 316, b: 478, sunAz: 140, keys: [
    { f: 316, pos: [59.6, 1.6, 3.6], look: [60, 1.15, 0], fov: 44 },
    { f: 478, pos: [60.4, 1.5, 3.0], look: [60.1, 1.15, 0], fov: 42, glide: true },
  ] },
  { id: 5, a: 474, b: 700, sunAz: 110, keys: [
    { f: 474, pos: [-4, 3, 18], look: [0, 1.6, -3], fov: 48 },
    { f: 590, pos: [-1, 1.8, 9], look: [0, 1.4, -2], fov: 46, glide: true },
    { f: 700, pos: [0.6, 1.4, 4.2], look: [0.3, 1.1, 0], fov: 44, glide: true },
  ] },
  { id: 6, a: 696, b: 792, sunAz: 120, keys: [
    { f: 696, pos: [2, 2.4, 13], look: [0, 1.4, -3], fov: 48 },
    { f: 792, pos: [1.2, 2.0, 10], look: [0, 1.3, -3], fov: 48, glide: true },
  ] },
  { id: 7, a: 788, b: 1015, sunAz: 130, keys: [
    { f: 788, pos: [-60.1, 1.6, 5.2], look: [-60.15, 1.4, 0], fov: 44 },
    { f: 1015, pos: [-60.0, 1.5, 4.3], look: [-60.1, 1.4, 0], fov: 44, glide: true },
  ] },
  { id: 8, a: 1011, b: 1188, sunAz: 120, keys: [
    { f: 1011, pos: [0, 2.4, 13], look: [0, 1.4, -3], fov: 48 },
    { f: 1080, pos: [0.3, 1.4, 3.6], look: [0.1, 1.2, 0], fov: 44, glide: true },
    { f: 1188, pos: [0.2, 1.25, 2.4], look: [0.05, 1.1, 0], fov: 40, glide: true },
  ] },
  { id: 9, a: 1184, b: TOTAL, sunAz: 120, keys: [
    { f: 1184, pos: [0.4, 1.3, 3.2], look: [0.2, 1.25, -1], fov: 44 },
    { f: TOTAL, pos: [0.9, 1.35, 4.6], look: [0.3, 1.3, -1], fov: 46, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 20, k: 0.04 }, { f: W.jefe, k: 0.05 }, { f: W.comio, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.intro || id === S.plane || id === S.eat ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 100, label: "SE COMIÓ", sub: "un avión entero", col: "#ff3b3b", big: true },
  { a: 106, b: 170, label: "Francia", col: "#ffffff" },
  { a: 172, b: 228, label: "MANGETOUT", sub: "«el señor Cometodo»", col: "#ffd23f" },
  { a: 486, b: 530, label: "1978", col: "#ffffff" },
  { a: 531, b: 590, label: "JEFE FINAL", sub: "una avioneta Cessna", col: "#ff3b3b" },
  { a: 706, b: 745, label: "1 kg al día", col: "#ffd23f" },
  { a: 745, b: 790, label: "2 AÑOS", col: "#ffd23f" },
  { a: 878, b: 925, label: "×2", sub: "paredes del estómago", col: "#ffd23f" },
  { a: 1036, b: 1080, label: "9 TONELADAS", sub: "de metal", col: "#ff3b3b" },
  { a: 1186, b: TOTAL, label: "SE COMIÓ", sub: "un avión entero", col: "#ff3b3b", big: true },
];
