// Pimpín 6 · "Súper rápido", 40.4 s. Words: vuelta 28 · diez 48 · veces 53 · Mientras 70 · esto 92 · despacito 132 · menos 156 · Pimpín 163 · Ja 179/188/197 · rápido 228 · llega 241 ·
// salir 270 · casa 279 · ducha 302 · toalla 312 · moja 327 · escondite 352 · encuentra 374 · mismo 389 · carreras 449 · perro 486 · cumpleaños 525 · alcaldesa 542 · escapa 578 ·
// tarta 590 · balcón 611 · piso 633 · Tres 649 · nata 691 · debajo 734 · espera 757 · corriendo 788 · sube 805 · baja 831 · velas 868 · coge 886 · suelo 915 · encima 935 ·
// cantar 967 · Dos 1004 · Porque 1030 · Pimpín 1096 · Y 1113 · dale 1140
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1211;
export const W = { salir: 268, moja: 325, encuentra: 372, perro: 484, cumple: 520, escapa: 576, sale: 786, sube: 803, baja: 829, velas: 866, coge: 886, dale: 1140 };
export const S = { hook: 1, slow: 2, ja: 3, home: 4, shower: 5, hide: 6, race: 7, party: 8, save: 9, sing: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
/** the cake: on the balcony until `escapa`, then falls in slow motion to 2.3 m at `coge` */
export const cakeY = (f: number, id: number) => { void id; if (f < W.escapa) return 5.0; const s = Math.min(1, (f - W.escapa) / (W.coge - W.escapa)); return 5.0 - 2.7 * (s * s * 0.3 + s * 0.7); };
/** Pimpín running: [x, z, facing, y?] */
export const runAt = (f: number, id: number): [number, number, -1 | 1, number?] | null => {
  if (id === 1 || id === 11) { const a = f * 0.35; return [Math.cos(a) * 2.6, 1.6 + Math.sin(a) * 1.6, -Math.sin(a) > 0 ? 1 : -1]; }
  if (id === 2) { if (f < 150 || f > 172) return null; const s = (f - 150) / 22; return [-9 + 18 * s, 0.6, 1]; }
  if (id === 9) {
    if (f < W.sale) return null;
    if (f < W.sube) { const s = (f - W.sale) / (W.sube - W.sale); return [-4 + 6 * s, -6.6, 1]; }
    if (f < W.baja) return [3.9, -7.6, -1, 4.7];
    if (f < W.coge) { const s = (f - W.baja) / (W.coge - W.baja); return [5 - 1.2 * s, -6.6, -1]; }
    return null;
  }
  return null;
};
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 3.0, 9.6], look: [0, 1.2, 0.6], fov: 54 }, { f: b, pos: [0.2, 2.4, 8.2], look: [0, 1.2, 1.0], fov: 52, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 104, keys: hk(0, 104) },
  { id: 2, a: 102, b: 177, keys: [{ f: 102, pos: [-2.5, 1.8, 6.4], look: [-2.5, 1.5, -1.5], fov: 52 }, { f: 177, pos: [-2.4, 1.8, 5.6], look: [-2.4, 1.5, -1.5], fov: 50, glide: true }] },
  { id: 3, a: 175, b: 208, keys: [{ f: 175, pos: [0, 2.4, 9], look: [0, 1.6, 1.5], fov: 54 }, { f: 208, pos: [0.1, 2.1, 7.8], look: [0.1, 1.5, 1.5], fov: 52, glide: true }] },
  { id: 4, a: 206, b: 292, keys: [{ f: 206, pos: [-7.2, 1.9, -1.2], look: [-8.4, 1.4, -7], fov: 52 }, { f: 292, pos: [-7.5, 1.8, -2.0], look: [-8.5, 1.4, -7], fov: 50, glide: true }] },
  { id: 5, a: 290, b: 340, keys: [{ f: 290, pos: [-5.6, 1.7, 6.0], look: [-5.7, 1.4, 2.0], fov: 50 }, { f: 340, pos: [-5.6, 1.6, 5.2], look: [-5.7, 1.3, 2.0], fov: 48, glide: true }] },
  { id: 6, a: 338, b: 402, keys: [{ f: 338, pos: [0, 1.6, 6.2], look: [0, 1.3, 2.0], fov: 50 }, { f: 402, pos: [0, 1.5, 5.2], look: [0, 1.3, 2.0], fov: 48, glide: true }] },
  { id: 7, a: 400, b: 502, keys: [{ f: 400, pos: [-0.5, 1.9, 8.4], look: [-0.5, 1.3, 2.8], fov: 52 }, { f: 502, pos: [-0.4, 1.6, 7.0], look: [-0.4, 1.2, 2.8], fov: 50, glide: true }] },
  { id: 8, a: 500, b: 752, keys: [{ f: 500, pos: [2, 3.0, 4], look: [3, 3.2, -7], fov: 56 }, { f: 580, pos: [3, 3.6, 0], look: [3, 4.6, -7.5], fov: 54, glide: true }, { f: 640, pos: [3.2, 1.4, -1.0], look: [3, 4.4, -7.2], fov: 58, glide: true }, { f: 700, pos: [2.6, 2.4, 0.4], look: [3, 2.6, -7], fov: 56, glide: true }, { f: 752, pos: [3.2, 1.8, -1.4], look: [3, 2.2, -6.6], fov: 54, glide: true }] },
  { id: 9, a: 750, b: 932, keys: [{ f: 750, pos: [0, 3.0, 4.6], look: [1.6, 2.8, -6.8], fov: 58 }, { f: 820, pos: [3.0, 4.0, -1.6], look: [3.6, 4.0, -7.4], fov: 56, glide: true }, { f: 880, pos: [3.4, 2.2, -1.8], look: [3.6, 2.0, -6.8], fov: 54, glide: true }, { f: 932, pos: [3.2, 2.0, -1.6], look: [3.2, 1.9, -6.6], fov: 52, glide: true }] },
  { id: 10, a: 930, b: 1032, keys: [{ f: 930, pos: [2.0, 2.4, -0.6], look: [2.8, 2.0, -6.4], fov: 54 }, { f: 1032, pos: [2.6, 2.1, -2.2], look: [3.0, 2.1, -6.4], fov: 50, glide: true }] },
  { id: 11, a: 1030, b: 1115, keys: hk(1030, 1115) },
  { id: 12, a: 1113, b: TOTAL, keys: [{ f: 1113, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 886, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.party || id === S.save ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 100, label: "¡10 VUELTAS!", sub: "mientras leías esto", col: "#ff3b3b", big: true },
  { a: 105, b: 150, label: "DESPACITO", sub: "todos... menos Pimpín", col: "#ffffff" },
  { a: 323, b: 340, label: "¡SECA!", sub: "", col: "#ffd23f" },
  { a: 484, b: 500, label: "NI EL PERRO", sub: "", col: "#ff3b3b" },
  { a: 649, b: 700, label: "3 PISOS", sub: "y una tarta de nata", col: "#ffd23f" },
  { a: 886, b: 930, label: "¡CAZADA!", sub: "con velas y todo", col: "#8ae86a" },
  { a: 1004, b: 1030, label: "x2", sub: "cumpleaños feliz", col: "#ffd23f" },
  { a: 1030, b: 1110, label: "¡10 VUELTAS!", sub: "mientras leías esto", col: "#ff3b3b", big: true },
];
