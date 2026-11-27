// Pimpín 36 · "Calculadora". Words: estrellas 50 · dedos 81 · menos 134 · calculadora 199 · granos 240 · arroz 266 · gotas 290 · nube 307 · cambio 356 · tendero 366 · calabazas 419 · báscula 442 · rompe 456 · pesa 497 ·
// juez 524 · Nada 548 · levanta 570 · cae 587 · balancín 657 · volando 689 · espera 719 · mide 769 · dedo 781 · cuenta 798 · Trescientos 812 · kilos 835 · Gana 852 · abuela 880 · kilo 899 · aterriza 939 · premio 974 · Porque 990 · Y 1078 · dale 1105
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1177;
export const W = { estrellas: 48, dedos: 79, granos: 238, arroz: 264, gotas: 288, nube: 305, cambio: 354, rompe: 454, nada: 546, levanta: 568, cae: 585, balancin: 655, volando: 687, mide: 767, cuenta: 796, tres: 810, kilos: 833, gana: 850, abuela: 878, aterriza: 937, premio: 972, dale: 1105 };
export const S = { hook: 1, premise: 2, rice: 3, cloud: 4, shop: 5, contest: 6, tries: 7, count: 8, win: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 1.4, 6.4], look: [0, 2.6, 0], fov: 58 }, { f: b, pos: [0.3, 1.5, 5.8], look: [0.2, 2.2, 0], fov: 55, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 98, keys: hk(0, 98) },
  { id: 2, a: 96, b: 170, keys: [{ f: 96, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 170, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 168, b: 280, keys: M(168, 280, 0, 1.2, 6.0, 1.4) },
  { id: 4, a: 278, b: 325, keys: M(278, 325, 0, 1.2, 6.4, 1.9) },
  { id: 5, a: 323, b: 386, keys: M(323, 386, 0, 1.2, 6.2, 1.3) },
  { id: 6, a: 384, b: 514, keys: [{ f: 384, pos: [-0.4, 2.2, 7.4], look: [0, 1.0, 0.6], fov: 56 }, { f: 514, pos: [0.4, 2.0, 6.6], look: [0.3, 1.1, 0.6], fov: 54, glide: true }] },
  { id: 7, a: 512, b: 721, keys: [{ f: 512, pos: [-0.3, 2.0, 7.2], look: [0, 1.2, 0.6], fov: 56 }, { f: 640, pos: [0.3, 2.0, 7.4], look: [0.3, 1.4, 0.6], fov: 56, glide: true }, { f: 721, pos: [0.5, 2.0, 8.0], look: [0.5, 2.2, 0.6], fov: 58, glide: true }] },
  { id: 8, a: 719, b: 848, keys: M(719, 848, -0.3, 1.0, 5.8, 1.3) },
  { id: 9, a: 846, b: 992, keys: [{ f: 846, pos: [0, 2.0, 7.2], look: [0, 1.2, 0.6], fov: 56 }, { f: 992, pos: [0.5, 2.2, 6.6], look: [0.5, 1.6, 0.6], fov: 55, glide: true }] },
  { id: 10, a: 990, b: 1080, keys: hk(990, 1080) },
  { id: 11, a: 1078, b: TOTAL, keys: [{ f: 1078, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 454, k: 0.03 }, { f: 585, k: 0.03 }, { f: 687, k: 0.02 }, { f: 937, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.contest || id === S.tries || id === S.win || id === S.premise ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 52, b: 94, label: "¡SOBRAN DEDOS!", sub: "", col: "#ffd23f", big: true },
  { a: 1005, b: 1075, label: "¡SOBRAN DEDOS!", sub: "", col: "#ffd23f", big: true },
];
void smooth;
