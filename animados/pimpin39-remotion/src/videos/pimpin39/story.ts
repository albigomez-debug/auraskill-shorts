// Pimpín 39 · "Pintor". Words: puerta 50 · entrar 87 · menos 142 · real 204 · manzana 231 · mordisco 257 · charco 287 · salta 306 · gato 341 · ladran 367 · lluvia 402 · cartel 420 · hora 464 · comarca 490 · cura 516 · huevo 560 ·
// panadero 579 · fiesta 600 · revés 645 · alcaldesa 668 · nariz 722 · azul 731 · espera 751 · pincel 787 · Tres 804 · minuto 837 · cartel 859 · bonito 878 · castillo 920 · nariz 947 · moda 996 · Porque 1010 · Y 1101 · dale 1128
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1200;
export const W = { entrar: 85, manzana: 229, mordisco: 255, charco: 285, salta: 304, gato: 339, ladran: 365, lluvia: 400, cartel: 418, comarca: 488, dibuja: 519, huevo: 558, escribe: 588, reves: 643, pinta: 682, nariz: 720, pincel: 785, tres: 802, minuto: 835, cartel2: 857, castillo: 918, nariz2: 945, moda: 994, dale: 1128 };
export const S = { hook: 1, premise: 2, apple: 3, puddle: 4, cat: 5, rain: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const PO = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [-0.4, 1.9, 6.6], look: [0, 1.5, 0], fov: 56 }, { f: b, pos: [0.4, 1.9, 6.0], look: [0.3, 1.5, 0], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 103, keys: M(0, 103, 0, 0.6, 6.4, 1.3) },
  { id: 2, a: 101, b: 170, keys: [{ f: 101, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 170, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 168, b: 270, keys: M(168, 270, 0, 0.8, 6.0, 1.3) },
  { id: 4, a: 268, b: 325, keys: M(268, 325, 0, 1.0, 6.4, 0.9) },
  { id: 5, a: 323, b: 385, keys: M(323, 385, 0, 0.8, 6.2, 1.1) },
  { id: 6, a: 383, b: 512, keys: PO(383, 512) },
  { id: 7, a: 510, b: 751, keys: [{ f: 510, pos: [-0.4, 1.9, 6.4], look: [0, 1.5, 0], fov: 56 }, { f: 640, pos: [0.3, 1.9, 6.2], look: [0.2, 1.5, 0], fov: 55, glide: true }, { f: 751, pos: [0.4, 1.8, 5.6], look: [0.3, 1.5, 0.4], fov: 53, glide: true }] },
  { id: 8, a: 749, b: 1012, keys: [{ f: 749, pos: [-0.6, 1.8, 5.8], look: [-0.4, 1.4, 0.6], fov: 53 }, { f: 870, pos: [0, 2.0, 7.0], look: [0.1, 1.6, 0], fov: 57, glide: true }, { f: 1012, pos: [0.4, 1.9, 6.6], look: [0.4, 1.5, 0.4], fov: 55, glide: true }] },
  { id: 9, a: 1010, b: 1103, keys: M(1010, 1103, 0, 0.6, 6.4, 1.3) },
  { id: 10, a: 1101, b: TOTAL, keys: [{ f: 1101, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 85, k: 0.03 }, { f: 1080, k: 0.03 }, { f: 720, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.rain || id === S.tries || id === S.fix || id === S.premise ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 52, b: 98, label: "¡PINTADA!", sub: "una puerta", col: "#ffd23f", big: true },
  { a: 462, b: 505, label: "1 HORA", sub: "llega el rey", col: "#9ad4ff", big: true },
  { a: 1030, b: 1096, label: "¡PINTADA!", sub: "una puerta", col: "#ffd23f", big: true },
];
void smooth;
