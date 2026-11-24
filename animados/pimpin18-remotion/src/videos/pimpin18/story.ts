// Pimpín 18 · "Elástico", 38.2 s. Words: manzana 50 · árbol 62 · casa 82 · brazos 118 · menos 147 · Pimpín 154 · estira 183 · chicle 199 · mando 226 · sofá 254 · rasca 275 · espalda 285 ·
// vecino 296 · calle 324 · baloncesto 345 · salta 362 · deja 375 · canasta 396 · niño 436 · panadera 447 · trepa 458 · árbol 469 · alto 482 · bajar 522 · escalera 547 · corta 574 ·
// bomberos 595 · vacaciones 620 · madre 648 · bollo 669 · sube 691 · espera 718 · Pimpín 734 · estira 743 · brazo 753 · Cinco 768 · Diez 795 · Quince 809 · Baja 825 · niño 836 ·
// ascensor 854 · devuelve 897 · vecino 913 · manzana 926 · Porque 945 · Pimpín 1031 · Y 1048 · dale 1075
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1146;
export const W = { coge: 48, mando: 224, sofa: 252, rasca: 273, canasta: 394, deja: 373, escalera: 545, bomberos: 593, bollo: 667, sube: 689, cinco: 766, diez: 793, quince: 807, baja: 823, ascensor: 852, devuelve: 895, dale: 1075 };
export const S = { hook: 1, premise: 2, sofa: 3, scratch: 4, hoop: 5, problem: 6, tries: 7, stretch: 8, lower: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const TREE: V3 = [-5, 0, -3];
export const KIDY = (f: number, id: number) => id === S.tries && f > W.sube - 6 ? 7.8 + 1.0 * smooth((f - W.sube + 6) / 16) : id === S.lower ? 8.8 - 8.8 * smooth((f - W.baja) / 40) : id === S.stretch || (id === S.tries) ? (id === S.stretch ? 8.8 : 7.8) : 7.8;
/** stretch shot: hand height */
export const reach = (f: number) => 1.1 + (f < W.cinco - 4 ? 0 : f < W.diez - 4 ? 3.2 * smooth((f - W.cinco + 4) / 8) : f < W.quince - 4 ? 3.2 + 3.0 * smooth((f - W.diez + 4) / 8) : 6.2 + 1.8 * smooth((f - W.quince + 4) / 10));
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.4, 2.4, 2.6], look: [0.2, 3.4, -7], fov: 56 }, { f: b, pos: [0.4, 2.2, 1.6], look: [0.2, 3.4, -7], fov: 54, glide: true }];
const [tx, , tz] = TREE;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 92, keys: hk(0, 92) },
  { id: 2, a: 90, b: 163, keys: [{ f: 90, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.6, 1.5], fov: 56 }, { f: 163, pos: [0.4, 2.2, 8.0], look: [0.4, 2.0, 1.5], fov: 56, glide: true }] },
  { id: 3, a: 161, b: 267, keys: [{ f: 161, pos: [0.6, 1.6, 7.4], look: [0.6, 0.9, 1.8], fov: 58 }, { f: 267, pos: [0.6, 1.5, 6.8], look: [0.6, 0.9, 1.8], fov: 56, glide: true }] },
  { id: 4, a: 265, b: 338, keys: [{ f: 265, pos: [0, 1.8, 9.6], look: [0, 1.3, 1.5], fov: 58 }, { f: 338, pos: [0, 1.7, 8.8], look: [0, 1.3, 1.5], fov: 56, glide: true }] },
  { id: 5, a: 336, b: 416, keys: [{ f: 336, pos: [1.8, 2.0, 7.4], look: [1.8, 1.9, 1.5], fov: 56 }, { f: 416, pos: [1.8, 2.2, 6.8], look: [2.0, 2.2, 1.5], fov: 54, glide: true }] },
  { id: 6, a: 414, b: 539, keys: [{ f: 414, pos: [tx + 3.5, 1.6, tz + 7], look: [tx, 2.0, tz], fov: 56 }, { f: 539, pos: [tx + 3.0, 2.4, tz + 8.5], look: [tx, 6.0, tz], fov: 60, glide: true }] },
  { id: 7, a: 537, b: 710, keys: [{ f: 537, pos: [tx + 3.0, 2.4, tz + 9], look: [tx, 4.6, tz], fov: 60 }, { f: 710, pos: [tx + 3.2, 2.6, tz + 9.5], look: [tx, 5.4, tz], fov: 62, glide: true }] },
  { id: 8, a: 708, b: 827, keys: [{ f: 708, pos: [tx + 3.0, 1.6, tz + 7], look: [tx + 0.8, 1.6, tz + 1], fov: 56 }, { f: 760, pos: [tx + 3.0, 1.8, tz + 7.5], look: [tx + 0.8, 2.6, tz + 1], fov: 58, glide: true }, { f: 827, pos: [tx + 3.4, 3.0, tz + 11], look: [tx + 0.6, 5.6, tz + 0.5], fov: 62, glide: true }] },
  { id: 9, a: 825, b: 947, keys: [{ f: 825, pos: [tx + 3.4, 3.0, tz + 11], look: [tx + 0.6, 5.4, tz + 0.5], fov: 62 }, { f: 880, pos: [tx + 3.6, 1.8, tz + 8], look: [tx + 1.2, 1.4, tz + 1], fov: 56, glide: true }, { f: 947, pos: [tx + 4.6, 1.9, tz + 8.4], look: [tx + 2.4, 1.3, tz + 1], fov: 58, glide: true }] },
  { id: 10, a: 945, b: 1050, keys: hk(945, 1050) },
  { id: 11, a: 1048, b: TOTAL, keys: [{ f: 1048, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 768, k: 0.03 }, { f: 795, k: 0.03 }, { f: 809, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.problem || id === S.tries ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 86, label: "¡DESDE CASA!", sub: "", col: "#ffd23f", big: true },
  { a: 373, b: 412, label: "SIN SALTAR", sub: "", col: "#ffd23f" },
  { a: 572, b: 590, label: "MUY CORTA", sub: "", col: "#ff3b3b" },
  { a: 766, b: 791, label: "5 METROS", sub: "", col: "#ffd23f", big: true },
  { a: 793, b: 805, label: "10", sub: "", col: "#ffd23f", big: true },
  { a: 807, b: 825, label: "¡15!", sub: "", col: "#ffd23f", big: true },
  { a: 945, b: 1044, label: "¡DESDE CASA!", sub: "", col: "#ffd23f", big: true },
];
void smooth;
