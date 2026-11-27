// Pimpín 33 · "Ordenado". Words: cuarto 50 · colores 66 · menos 132 · ordena 168 · lápices 198 · tamaño 217 · calcetines 242 · días 264 · panadería 299 · barras 321 · vendaval 378 · mercado 402 · mezcla 429 ·
// manzanas 492 · tomates 523 · pescadero 546 · melón 603 · alcaldesa 624 · lechuga 679 · cabeza 692 · espera 715 · remanga 743 · Uno 761 · tres 784 · diez 803 · puesto 843 · color 875 · lechuga 895 · vuelve 937 · Porque 964 · Y 1063 · dale 1090
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1162;
export const W = { colores: 64, lapices: 196, tamano: 215, calcetines: 240, dias: 262, barras: 319, vendaval: 376, mezcla: 427, manzanas: 490, tomates: 521, melon: 601, lechuga: 677, cabeza: 690, remanga: 741, uno: 759, tres: 782, diez: 801, color: 873, lechuga2: 893, vuelve: 935, dale: 1090 };
export const S = { hook: 1, premise: 2, pencils: 3, socks: 4, bread: 5, storm: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const MK = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [-0.3, 2.0, 7.6], look: [0, 1.3, 0.6], fov: 56 }, { f: b, pos: [0.4, 1.9, 6.8], look: [0.3, 1.3, 0.6], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 85, keys: M(0, 85, 0, 1.0, 6.4, 1.4) },
  { id: 2, a: 83, b: 160, keys: [{ f: 83, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 160, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 158, b: 237, keys: M(158, 237, 0, 1.2, 5.6, 1.3) },
  { id: 4, a: 235, b: 292, keys: M(235, 292, 0, 1.2, 5.8, 1.5) },
  { id: 5, a: 290, b: 357, keys: M(290, 357, 0, 1.2, 6.0, 1.4) },
  { id: 6, a: 355, b: 460, keys: MK(355, 460) },
  { id: 7, a: 458, b: 715, keys: [{ f: 458, pos: [-0.4, 2.0, 7.2], look: [0, 1.4, 0.6], fov: 56 }, { f: 600, pos: [0.3, 2.0, 6.8], look: [0.3, 1.4, 0.6], fov: 55, glide: true }, { f: 715, pos: [0.6, 1.9, 6.2], look: [0.6, 1.6, 0.6], fov: 54, glide: true }] },
  { id: 8, a: 713, b: 964, keys: [{ f: 713, pos: [-0.6, 1.8, 6.4], look: [-0.4, 1.4, 0.8], fov: 54 }, { f: 820, pos: [0, 2.0, 7.0], look: [0.2, 1.4, 0.6], fov: 56, glide: true }, { f: 964, pos: [0.6, 1.9, 7.0], look: [0.5, 1.4, 0.6], fov: 54, glide: true }] },
  { id: 9, a: 962, b: 1065, keys: M(962, 1065, 0, 1.0, 6.4, 1.4) },
  { id: 10, a: 1063, b: TOTAL, keys: [{ f: 1063, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 376, k: 0.03 }, { f: 427, k: 0.03 }, { f: 690, k: 0.02 }, { f: 801, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.storm || id === S.tries || id === S.fix || id === S.premise ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 30, b: 82, label: "POR COLORES", sub: "", col: "#ffd23f", big: true },
  { a: 801, b: 840, label: "10 SEGUNDOS", sub: "", col: "#9ad4ff", big: true },
  { a: 985, b: 1058, label: "POR COLORES", sub: "", col: "#ffd23f", big: true },
];
void smooth;
