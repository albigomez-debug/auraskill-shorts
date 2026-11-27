// Pimpín 41 · "Jardinero". Words: garbanzo 49 · mañana 71 · árbol 89 · mueren 132 · menos 149 · increíble 221 · cactus 255 · flores 278 · piedra 310 · musgo 329 · tomates 371 · balón 399 · árbol 435 · seca 459 · mañana 479 ·
// jardinero 530 · riega 545 · Nada 560 · abono 588 · hojas 623 · canta 672 · rama 711 · jardinero 732 · espera 758 · mano 794 · tronco 804 · susurra 827 · hojas 876 · flores 893 · naranjas 906 · rama 935 · vuelve 959 · sitio 980 · Porque 997 · Y 1099 · dale 1126
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1197;
export const W = { garbanzo: 47, manana: 69, arbol: 87, cactus: 253, flores: 276, piedra: 308, musgo: 327, tomates: 369, balon: 397, seca: 457, riega: 543, nada: 558, abono: 586, hojas: 621, canta: 670, rama: 709, encima: 716, mano: 792, susurra: 825, hojas2: 874, flores2: 891, naranjas: 904, vuelve: 957, sitio: 978, dale: 1126 };
export const S = { hook: 1, premise: 2, cactus: 3, stone: 4, garden: 5, dry: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const TR = (a: number, b: number, y0 = 1.8, y1 = 2.0): ShotDef["keys"] => [{ f: a, pos: [-0.4, 1.8, 7.6], look: [0, y0, 0], fov: 58 }, { f: b, pos: [0.4, 1.8, 7.0], look: [0.3, y1, 0], fov: 56, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 105, keys: [{ f: 0, pos: [0, 1.3, 5.0], look: [0.3, 0.9, 0.6], fov: 52 }, { f: 105, pos: [0.2, 1.6, 7.2], look: [0.3, 1.7, 0.2], fov: 58, glide: true }] },
  { id: 2, a: 103, b: 170, keys: [{ f: 103, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 170, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 168, b: 292, keys: M(168, 292, 0, 1.0, 5.8, 1.1) },
  { id: 4, a: 290, b: 345, keys: M(290, 345, 0, 1.0, 5.4, 0.9) },
  { id: 5, a: 343, b: 412, keys: M(343, 412, 0, 1.0, 6.2, 1.0) },
  { id: 6, a: 410, b: 526, keys: TR(410, 526) },
  { id: 7, a: 524, b: 760, keys: [{ f: 524, pos: [-0.3, 1.8, 7.4], look: [0, 1.6, 0.2], fov: 58 }, { f: 660, pos: [0.3, 1.8, 7.4], look: [0.3, 1.8, 0.2], fov: 58, glide: true }, { f: 760, pos: [0.5, 1.7, 6.6], look: [0.5, 1.4, 0.4], fov: 55, glide: true }] },
  { id: 8, a: 756, b: 999, keys: [{ f: 756, pos: [-0.6, 1.6, 5.8], look: [-0.4, 1.3, 0.6], fov: 54 }, { f: 860, pos: [0, 1.7, 8.0], look: [0.1, 2.1, 0], fov: 60, glide: true }, { f: 999, pos: [0.4, 1.8, 7.6], look: [0.4, 2.0, 0], fov: 58, glide: true }] },
  { id: 9, a: 997, b: 1101, keys: [{ f: 997, pos: [0, 1.3, 5.0], look: [0.3, 0.9, 0.6], fov: 52 }, { f: 1101, pos: [0.2, 1.6, 7.2], look: [0.3, 1.7, 0.2], fov: 58, glide: true }] },
  { id: 10, a: 1099, b: TOTAL, keys: [{ f: 1099, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 87, k: 0.03 }, { f: 716, k: 0.03 }, { f: 874, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.dry || id === S.tries || id === S.fix || id === S.premise || id === S.hook || id === S.end ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 72, b: 100, label: "¡UN ÁRBOL!", sub: "de un garbanzo", col: "#9ae86a", big: true },
  { a: 1025, b: 1095, label: "¡UN ÁRBOL!", sub: "de un garbanzo", col: "#9ae86a", big: true },
];
void smooth;
