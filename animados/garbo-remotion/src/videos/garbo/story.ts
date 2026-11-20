// "Garbo" (Juan Pujol García, 1912-1988), 41.6 s. Words: Hitler 28 · medalla 61 · Pujol 85 · Barcelona 99 · ingleses 178 · no 218 · Varias 229 · nazis 293 ·
// Londres 331 · Lisboa 357 · guía 403 · mapa 425 · inventa 447 · Veintisiete 473 · pagan 543 · Por 577 · Garbo 631 · Día 661 · Garbo 677 · Normandía 716 ·
// Calais 787 · Hitler 810 · nunca 886 · Fíjate 908 · Cruz 952 · rey 1017 · bandos 1059 · Un 1076 · Y 1159 · dale 1186
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1250;
export const W = { pujol: 85, no: 218, varias: 229, nazis: 293, londres: 331, lisboa: 357, guia: 403, mapa: 425, inventa: 447, pagan: 543, garbo: 631, diad: 661,
  calais: 787, nunca: 886, rey: 1017, dale: 1186 };
export const S = { hook: 1, bcn: 2, no: 3, lisbon: 4, spies: 5, garbo: 6, radio: 7, calais: 8, medals: 9, end: 10, cta: 11 };
export const UK: V3 = [40, 0, 0], LIS: V3 = [80, 0, 0], GER: V3 = [120, 0, 0], CAL: V3 = [160, 0, 0], NOR: V3 = [220, 0, 0];
const U = UK[0], L = LIS[0], G = GER[0], C = CAL[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 74, keys: [{ f: 0, pos: [G - 0.3, 1.7, 3.6], look: [G - 0.4, 1.5, 0], fov: 46 }, { f: 74, pos: [G - 0.2, 1.9, 5.2], look: [G - 0.4, 1.5, 0], fov: 50, glide: true }] },
  { id: 2, a: 72, b: 197, keys: [{ f: 72, pos: [1.5, 2.6, 9], look: [0, 1.8, -1], fov: 52 }, { f: 197, pos: [0.3, 1.8, 5.0], look: [0, 1.5, 0], fov: 48, glide: true }] },
  { id: 3, a: 195, b: 257, keys: [{ f: 195, pos: [U - 0.2, 1.8, 5.2], look: [U - 0.2, 1.5, -0.3], fov: 48 }, { f: 257, pos: [U - 0.2, 1.6, 4.0], look: [U - 0.2, 1.4, -0.3], fov: 44, glide: true }] },
  { id: 4, a: 255, b: 437, keys: [{ f: 255, pos: [L + 1.0, 2.0, 6.2], look: [L + 1.0, 1.6, -0.5], fov: 50 }, { f: 380, pos: [L + 0.6, 1.9, 5.0], look: [L + 0.5, 1.6, -0.5], fov: 48, glide: true }, { f: 437, pos: [L - 0.3, 1.6, 3.4], look: [L - 0.3, 1.2, 0], fov: 46, glide: true }] },
  { id: 5, a: 435, b: 577, keys: [{ f: 435, pos: [L + 6, 1.9, 5.5], look: [L + 6, 1.6, 0], fov: 48 }, { f: 520, pos: [L + 6, 3.0, 11], look: [L + 6, 1.4, -1], fov: 52, glide: true }, { f: 577, pos: [L + 6.5, 2.8, 10], look: [L + 6, 1.5, -1], fov: 52, glide: true }] },
  { id: 6, a: 575, b: 675, keys: [{ f: 575, pos: [U + 6, 2.0, 6.2], look: [U + 6, 1.6, -0.3], fov: 50 }, { f: 675, pos: [U + 6, 2.0, 5.0], look: [U + 6, 1.8, -0.3], fov: 48, glide: true }] },
  { id: 7, a: 673, b: 805, keys: [{ f: 673, pos: [U + 12.6, 1.8, 4.6], look: [U + 12.3, 1.6, 0], fov: 46 }, { f: 805, pos: [U + 12.4, 1.8, 3.8], look: [U + 12.3, 1.8, 0], fov: 44, glide: true }] },
  { id: 8, a: 803, b: 908, keys: [{ f: 803, pos: [C, 3.8, 13], look: [C, 1.4, 0], fov: 52 }, { f: 908, pos: [C + 1, 2.4, 9], look: [C, 1.6, 0], fov: 50, glide: true }] },
  { id: 9, a: 906, b: 1074, keys: [{ f: 906, pos: [G, 2.0, 6.4], look: [G, 1.5, 0], fov: 50 }, { f: 1074, pos: [G, 1.8, 4.8], look: [G, 1.5, 0], fov: 48, glide: true }] },
  { id: 10, a: 1072, b: 1157, keys: [{ f: 1072, pos: [G - 0.2, 1.9, 5.2], look: [G - 0.4, 1.5, 0], fov: 50 }, { f: 1157, pos: [G - 0.3, 1.7, 3.6], look: [G - 0.4, 1.5, 0], fov: 46, glide: true }] },
  { id: 11, a: 1155, b: TOTAL, keys: [{ f: 1155, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 4, k: 0.04 }, { f: 218, k: 0.04 }, { f: 473, k: 0.04 }, { f: 787, k: 0.05 }, { f: 952, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.calais || id === S.spies || id === S.bcn ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 70, label: "¡ENGAÑÓ!", sub: "a Hitler... y le dio una medalla", col: "#ff3b3b", big: true },
  { a: 99, b: 195, label: "Barcelona", sub: "España", col: "#ffffff" },
  { a: 473, b: 570, label: "27 ESPÍAS", sub: "todos inventados", col: "#ffd23f" },
  { a: 661, b: 703, label: "DÍA D", sub: "6 de junio de 1944", col: "#ffffff" },
  { a: 1076, b: 1155, label: "¡ENGAÑÓ!", sub: "a Hitler... y ganó una medalla", col: "#ff3b3b", big: true },
];
