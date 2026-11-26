// Pimpín 30 · "Equilibrista", 38.7 s. Words: cruzado 37 · plaza 49 · cuerda 67 · tender 75 · Aquí 90 · caen 107 · menos 135 · Pimpín 142 · equilibrio 177 · circo 191 · platos 222 · cabeza 236 · bici 261 · fuente 285 ·
// recreo 311 · siesta 334 · valla 349 · gato 385 · panadera 396 · cuerda 422 · banderas 436 · bajar 471 · bombero 494 · escalera 513 · resbala 539 · cartero 562 · red 585 · Atrapa 594 · cura 608 · panadera 627 · cuerda 650 ·
// colgando 678 · espera 702 · Pimpín 718 · cuerda 737 · paso 759 · Otro 774 · manos 796 · Coge 812 · gato 823 · panadera 845 · vuelve 861 · brazos 898 · llegar 923 · reverencia 945 · Porque 967 · Y 1063 · dale 1090
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1161;
export const W = { cuerda: 65, platos: 220, bici: 259, siesta: 332, gato: 383, resbala: 537, red: 583, atrapa: 592, panadera: 625, colgando: 676, paso: 757, otro: 772, manos: 794, coge: 810, panadera2: 843, llegar: 921, reverencia: 943, dale: 1090 };
export const S = { hook: 1, premise: 2, plates: 3, bike: 4, nap: 5, cat: 6, tries: 7, walk: 8, rescue: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const RY = 4.5, RZ = -0.6;
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const UP = (a: number, b: number, x0: number, x1: number): ShotDef["keys"] => [{ f: a, pos: [x0, 2.2, 7.6], look: [x0, 4.4, RZ], fov: 56 }, { f: b, pos: [x1, 2.2, 7.0], look: [x1, 4.4, RZ], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 92, keys: UP(0, 92, -1.2, 0.8) },
  { id: 2, a: 90, b: 160, keys: [{ f: 90, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 160, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 158, b: 252, keys: M(158, 252, 0, 1.4, 6.5, 1.8) },
  { id: 4, a: 250, b: 302, keys: M(250, 302, 0, 1.4, 6.0, 1.2) },
  { id: 5, a: 300, b: 365, keys: M(300, 365, 0, 1.4, 5.5, 1.2) },
  { id: 6, a: 363, b: 490, keys: [{ f: 363, pos: [0, 2.0, 8.0], look: [0, 3.0, RZ], fov: 56 }, { f: 490, pos: [0.3, 2.2, 7.0], look: [0.3, 3.6, RZ], fov: 54, glide: true }] },
  { id: 7, a: 488, b: 702, keys: [{ f: 488, pos: [0, 2.0, 8.4], look: [0, 2.4, RZ], fov: 58 }, { f: 620, pos: [0.2, 2.0, 8.0], look: [0.2, 2.2, RZ], fov: 58, glide: true }, { f: 702, pos: [0.4, 2.4, 7.6], look: [0.4, 3.8, RZ], fov: 56, glide: true }] },
  { id: 8, a: 700, b: 812, keys: UP(700, 812, -1.4, -0.2) },
  { id: 9, a: 810, b: 967, keys: [{ f: 810, pos: [0.4, 2.4, 7.0], look: [0.4, 4.4, RZ], fov: 54 }, { f: 900, pos: [-1.0, 2.2, 7.4], look: [-1.4, 3.4, RZ], fov: 56, glide: true }, { f: 967, pos: [-1.8, 1.8, 6.8], look: [-2.0, 1.3, RZ], fov: 54, glide: true }] },
  { id: 10, a: 965, b: 1065, keys: UP(965, 1065, -1.2, 0.8) },
  { id: 11, a: 1063, b: TOTAL, keys: [{ f: 1063, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 537, k: 0.03 }, { f: 592, k: 0.03 }, { f: 676, k: 0.02 }, { f: 921, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.cat || id === S.tries || id === S.walk || id === S.rescue ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 30, b: 88, label: "¡CRUZA!", sub: "por la cuerda de tender", col: "#ffd23f", big: true },
  { a: 216, b: 250, label: "10 PLATOS", sub: "", col: "#ffd23f" },
  { a: 794, b: 812, label: "SIN MANOS", sub: "", col: "#9ad4ff", big: true },
  { a: 990, b: 1060, label: "¡CRUZA!", sub: "por la cuerda de tender", col: "#ffd23f", big: true },
];
void smooth;
