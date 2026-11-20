// "Tulipomanía" (Holanda, 1636-1637), 36.9 s. Words: bulbo 43 · casa 95 · Holanda 108 · moda 195 · rayas 251 · locos 289 · muebles 327 ·
// animales 363 · tabernas 438 · papel 491 · sube 516-535 · casa 594 · febrero 1637 645 · nadie 720 · desploman 767 · Fíjate 807 · burbuja 836 ·
// suerte 888 · desgracia 948 · casa 1021 · casa 1091
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1110;
export const W = { tulipanes: 168, raros: 219, rayas: 251, locos: 289, gente: 308, muebles: 327, tierras: 345, animales: 363, tabernas: 438,
  papel: 491, sube: 516, casa: 594, febrero: 645, nadie: 720, desploman: 767, fijate: 807, burbuja: 836, suerte: 888, desgracia: 948, sincasa: 1016 };
export const S = { hook: 1, field: 2, stripe: 3, sell: 4, tavern: 5, rise: 6, crash: 7, bubble: 8, after: 9, end: 10 };
export const FIELD: V3 = [0, 0, -40], TAV: V3 = [50, 0, 0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 106, keys: [{ f: 0, pos: [0.3, 1.6, 4.4], look: [0, 1.5, 0], fov: 44 }, { f: 106, pos: [0.2, 1.6, 3.2], look: [0, 1.55, 0], fov: 40, glide: true }] },
  { id: 2, a: 102, b: 206, keys: [{ f: 102, pos: [6, 6, -20], look: [0, 2, -46], fov: 48 }, { f: 206, pos: [1, 1.6, -34], look: [0, 1.2, -40], fov: 44, glide: true }] },
  { id: 3, a: 202, b: 302, keys: [{ f: 202, pos: [0.3, 1.5, -36.6], look: [0, 1.4, -40], fov: 42 }, { f: 302, pos: [0.2, 1.5, -37.4], look: [0, 1.45, -40], fov: 38, glide: true }] },
  { id: 4, a: 298, b: 407, keys: [{ f: 298, pos: [-2, 1.6, 6], look: [0, 1.3, 0], fov: 46 }, { f: 407, pos: [2, 1.6, 5], look: [0.5, 1.3, 0], fov: 44, glide: true }] },
  { id: 5, a: 403, b: 502, keys: [{ f: 403, pos: [50.3, 1.7, 5.0], look: [50, 1.3, 0], fov: 46 }, { f: 502, pos: [50.2, 1.6, 4.0], look: [50, 1.35, 0], fov: 44, glide: true }] },
  { id: 6, a: 498, b: 620, keys: [{ f: 498, pos: [0.1, 1.7, 4.6], look: [0, 1.6, 0], fov: 46 }, { f: 620, pos: [0.1, 1.7, 3.8], look: [0, 1.6, 0], fov: 44, glide: true }] },
  { id: 7, a: 616, b: 808, keys: [{ f: 616, pos: [0, 2.2, 7], look: [0, 1.3, 0], fov: 46 }, { f: 740, pos: [0.4, 1.6, 4.2], look: [0.2, 1.4, 0], fov: 44, glide: true }, { f: 808, pos: [0.1, 1.7, 3.9], look: [0, 1.6, 0], fov: 44, glide: true }] },
  { id: 8, a: 804, b: 884, keys: [{ f: 804, pos: [0.1, 1.7, 3.9], look: [0, 1.6, 0], fov: 44 }, { f: 884, pos: [0.1, 1.7, 3.3], look: [0, 1.6, 0], fov: 42, glide: true }] },
  { id: 9, a: 880, b: 1032, keys: [{ f: 880, pos: [0, 2.6, 9], look: [0, 1.5, 0], fov: 46 }, { f: 960, pos: [0.8, 1.2, 3.6], look: [0.6, 0.9, 0], fov: 42, glide: true }, { f: 1032, pos: [0.7, 1.0, 2.6], look: [0.6, 0.8, 0], fov: 40, glide: true }] },
  { id: 10, a: 1028, b: TOTAL, keys: [{ f: 1028, pos: [0.2, 1.6, 3.2], look: [0, 1.55, 0], fov: 40 }, { f: TOTAL, pos: [0.3, 1.6, 4.4], look: [0, 1.5, 0], fov: 44, glide: true }] },
];
const K = kit(SHOTS, [{ f: 767, k: 0.05 }, { f: 836, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.field || id === S.crash ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 100, label: "1 TULIPÁN", sub: "= 1 casa", col: "#ff3b3b", big: true },
  { a: 108, b: 200, label: "Holanda", sub: "1636", col: "#ffffff" },
  { a: 645, b: 715, label: "Febrero 1637", col: "#ffffff" },
  { a: 836, b: 880, label: "LA 1ª BURBUJA", sub: "especulativa", col: "#ffd23f" },
  { a: 1034, b: TOTAL, label: "1 TULIPÁN", sub: "= 1 casa", col: "#ff3b3b", big: true },
];
