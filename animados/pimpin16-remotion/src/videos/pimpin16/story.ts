// Pimpín 16 · "Silencioso", 39.1 s. Words: oso 32 · duerme 37 · plaza 56 · llaves 81 · fiesta 92 · ruido 128 · andar 137 · menos 155 · Pimpín 161 · silencioso 195 · cascabel 233 ·
// escondite 263 · encuentran 284 · primavera 297 · clase 338 · examen 357 · fue 372 · profe 390 · busca 410 · oso 439 · mueve 453 · llaves 481 · fiesta 516 · alcaldesa 539 ·
// puntillas 559 · oso 585 · gruñe 590 · panadero 611 · tarta 634 · come 668 · cartero 689 · corriendo 720 · espera 745 · Pimpín 764 · ruido 790 · respiración 815 · Coge 838 ·
// llaves 851 · manta 877 · almohada 913 · regalo 925 · entera 960 · Porque 976 · Pimpín 1057 · Y 1075 · dale 1101
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1173;
export const W = { cascabel: 231, primavera: 295, examen: 355, fue: 370, profe: 388, puntillas: 557, gruñe: 588, panadero: 609, come: 666, cartero: 687, llaves: 849, manta: 875, almohada: 911, entera: 958, dale: 1101 };
export const S = { hook: 1, premise: 2, bell: 3, hide: 4, school: 5, problem: 6, tries: 7, sneak: 8, rescue: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const BEAR: V3 = [0, 0, -1];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.6, 2.2, 6.4], look: [0, 0.9, -1], fov: 52 }, { f: b, pos: [0.4, 1.8, 5.2], look: [0, 0.9, -1], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 107, keys: hk(0, 107) },
  { id: 2, a: 105, b: 177, keys: [{ f: 105, pos: [-2.5, 1.8, 7.0], look: [-1.5, 1.2, 2], fov: 54 }, { f: 177, pos: [1.2, 1.8, 7.0], look: [1.4, 1.2, 2], fov: 54, glide: true }] },
  { id: 3, a: 175, b: 252, keys: [{ f: 175, pos: [2.1, 1.6, 6.2], look: [2.1, 1.1, 2.2], fov: 50 }, { f: 252, pos: [2.1, 1.5, 5.2], look: [2.1, 1.1, 2.2], fov: 48, glide: true }] },
  { id: 4, a: 250, b: 317, keys: [{ f: 250, pos: [-1, 1.8, 7.2], look: [-1, 1.2, 1.5], fov: 54 }, { f: 317, pos: [-0.6, 1.7, 6.4], look: [-0.8, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 5, a: 315, b: 425, keys: [{ f: 315, pos: [3.4, 1.8, 7.0], look: [3.4, 1.4, 2.0], fov: 54 }, { f: 425, pos: [3.6, 1.7, 6.0], look: [3.6, 1.4, 2.0], fov: 52, glide: true }] },
  { id: 6, a: 423, b: 533, keys: [{ f: 423, pos: [0, 4.5, 9], look: [0, 0.6, -1], fov: 54 }, { f: 533, pos: [0.5, 2.6, 7.4], look: [0, 0.9, -1], fov: 54, glide: true }] },
  { id: 7, a: 531, b: 739, keys: [{ f: 531, pos: [-3.5, 1.8, 5.5], look: [-0.5, 1.0, -0.6], fov: 56 }, { f: 739, pos: [-3.2, 1.8, 5.0], look: [-0.5, 1.0, -0.6], fov: 56, glide: true }] },
  { id: 8, a: 737, b: 837, keys: [{ f: 737, pos: [-3.6, 1.2, 4.6], look: [-1.6, 0.9, 0.6], fov: 50 }, { f: 837, pos: [-2.6, 1.2, 3.6], look: [-0.6, 0.9, 0.0], fov: 48, glide: true }] },
  { id: 9, a: 835, b: 978, keys: [{ f: 835, pos: [0.4, 1.8, 4.8], look: [0, 0.8, -0.8], fov: 52 }, { f: 978, pos: [0.8, 2.4, 6.4], look: [0, 0.9, -0.8], fov: 54, glide: true }] },
  { id: 10, a: 976, b: 1077, keys: hk(976, 1077) },
  { id: 11, a: 1075, b: TOTAL, keys: [{ f: 1075, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 590, k: 0.05 }, { f: 668, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.problem ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 100, label: "¡UN OSO!", sub: "encima de las llaves", col: "#ff8a2a", big: true },
  { a: 293, b: 315, label: "EN PRIMAVERA", sub: "", col: "#5ab85a" },
  { a: 505, b: 531, label: "NO HAY FIESTA", sub: "", col: "#ff3b3b" },
  { a: 588, b: 606, label: "¡GRRR!", sub: "", col: "#ff3b3b", big: true },
  { a: 760, b: 832, label: "SHHH...", sub: "", col: "#9ad4ff", big: true },
  { a: 976, b: 1072, label: "¡UN OSO!", sub: "encima de las llaves", col: "#ff8a2a", big: true },
];
void smooth;
