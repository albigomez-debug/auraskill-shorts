// Pimpín 2 · "El examen", 39.5 s. Words: copiaron 26 · bajito 67 · Villazanca 84 · Estirado 123 · Examen 142 · miden 212 · miran 276 · copian 313 · Zancudo 363 ·
// pizarra 444 · Pimpín 472 · metro 494 · Intenta 516 · espaldas 557 · Codos 579 · mochila 606 · pensar 665 · Siete 682 · seis 720 · notas 769 · pizarra 793 ·
// pequeños 842 · mal 882 · Cero 895/912/926/940 · diez 958 · Pimpín 978 · Porque 994 · bajito 1067 · Y 1085 · dale 1112
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1184;
export const W = { estirado: 123, examen: 142, miran: 276, zancudo: 363, pizarra: 444, metro: 494, intenta: 516, espaldas: 557, mochila: 606, siete: 682, seis: 720, notas: 769, mal: 882, cero: 895, cero2: 912, cero3: 926, cero4: 940, diez: 958, dale: 1112 };
export const S = { hook: 1, intro: 2, tall: 3, zancudo: 4, pimpin: 5, think: 6, notas: 7, grades: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 3.4, -6.4], look: [0, 1.9, 3], fov: 56 }, { f: b, pos: [0.1, 1.9, -2.2], look: [0, 1.5, 1.5], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 82, keys: hk(0, 82) },
  { id: 2, a: 80, b: 194, keys: [{ f: 80, pos: [1.5, 3.2, 6.8], look: [-0.5, 3.0, -7], fov: 56 }, { f: 194, pos: [0.2, 2.8, 2.5], look: [-1.2, 3.0, -6], fov: 52, glide: true }] },
  { id: 3, a: 192, b: 342, keys: [{ f: 192, pos: [-5.5, 2.4, -5.0], look: [-3, 2.2, 0], fov: 54 }, { f: 270, pos: [-1.5, 3.0, -5.6], look: [-1.0, 2.4, 1], fov: 54, glide: true }, { f: 342, pos: [2.0, 2.6, -4.6], look: [1.5, 2.2, 1.5], fov: 52, glide: true }] },
  { id: 4, a: 340, b: 470, keys: [{ f: 340, pos: [3.4, 3.0, -2.2], look: [3, 3.0, 1.5], fov: 52 }, { f: 410, pos: [2.6, 3.2, -1.6], look: [2.8, 3.0, 2], fov: 52, glide: true }, { f: 470, pos: [-0.5, 3.6, -3.5], look: [1.5, 3.4, 8.6], fov: 54, glide: true }] },
  { id: 5, a: 468, b: 622, keys: [{ f: 468, pos: [0.2, 1.6, -1.3], look: [0, 1.4, 1.5], fov: 50 }, { f: 545, pos: [-0.4, 1.5, -0.9], look: [0, 1.5, 1.5], fov: 50, glide: true }, { f: 622, pos: [0.4, 1.8, -1.4], look: [0, 1.8, 1.5], fov: 52, glide: true }] },
  { id: 6, a: 620, b: 732, keys: [{ f: 620, pos: [0.3, 1.9, -1.6], look: [0.2, 1.95, 1.5], fov: 52 }, { f: 732, pos: [0.3, 1.9, -0.9], look: [0.3, 2.0, 1.5], fov: 50, glide: true }] },
  { id: 7, a: 730, b: 892, keys: [{ f: 730, pos: [0.5, 2.6, 2.5], look: [-2.6, 2.4, -5], fov: 52 }, { f: 785, pos: [0.5, 2.6, 2.5], look: [-1.8, 2.6, -5], fov: 52, glide: true }, { f: 820, pos: [0.4, 3.2, 3.6], look: [1.5, 3.4, 8.6], fov: 54, glide: true }, { f: 892, pos: [1.5, 3.4, 5.0], look: [1.5, 3.5, 8.6], fov: 54, glide: true }] },
  { id: 8, a: 890, b: 992, keys: [{ f: 890, pos: [0, 3.0, -7.0], look: [0, 2.2, 2], fov: 56 }, { f: 950, pos: [0, 2.2, -4.2], look: [0, 1.6, 1.5], fov: 52, glide: true }, { f: 992, pos: [0.1, 1.9, -1.6], look: [0, 1.95, 1.5], fov: 50, glide: true }] },
  { id: 9, a: 990, b: 1082, keys: hk(990, 1082) },
  { id: 10, a: 1080, b: TOTAL, keys: [{ f: 1080, pos: [0.2, 2.3, -3.5], look: [0, 2.2, 2.0], fov: 52 }, { f: TOTAL, pos: [0.1, 2.2, -2.5], look: [0, 2.2, 2.0], fov: 50, glide: true }] },
];
const K = kit(SHOTS, [{ f: 67, k: 0.03 }, { f: 606, k: 0.05 }, { f: 882, k: 0.05 }, { f: 958, k: 0.06 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.tall ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 78, label: "¡COPIARON!", sub: "todos... menos el bajito", col: "#ff3b3b", big: true },
  { a: 84, b: 140, label: "VILLAZANCA", sub: "examen sorpresa", col: "#ffffff" },
  { a: 994, b: 1078, label: "¡COPIARON!", sub: "todos... menos el bajito", col: "#ff3b3b", big: true },
];
