// Pimpín 14 · "Comilón", 40.0 s. Words: comido 41 · banco 51 · sido 77 · Pimpín 83 · comen 114 · día 136 · menos 153 · treinta 192 · barras 225 · tarta 249 · mesa 264 · cumpleaños 287 ·
// velas 328 · encendidas 335 · restaurante 367 · cobran 401 · vuelva 440 · calabaza 474 · rodando 505 · plaza 549 · Tres 565 · metros 574 · Quinientos 592 · kilos 606 · empujan 640 ·
// Nada 659 · tractor 679 · Nada 695 · panadero 716 · delante 736 · encima 773 · espera 796 · Pimpín 812 · boca 829 · Ñam 843/855/868 · calabaza 896 · segundos 925 · postre 979 ·
// Porque 996 · Pimpín 1084 · Y 1102 · dale 1129
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1200;
export const W = { bite: 30, sido: 77, pan: 221, tarta: 247, mesa: 262, velas: 326, vuelva: 438, rodando: 503, empujan: 638, nada1: 657, tractor: 677, nada2: 693, panadero: 714, encima: 771, boca: 827, nam1: 843, nam2: 855, nam3: 868, postre: 977, dale: 1129 };
export const S = { hook: 1, premise: 2, table: 3, bday: 4, resto: 5, pumpkin: 6, tries: 7, eat: 8, after: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
/** pumpkin centre x and size (1 = 3 m) */
export const pump = (f: number, id: number): [number, number] => {
  if (id === S.pumpkin) return [14 - 10 * smooth((f - 470) / 140), 1];
  if (id === S.tries) return [4 - 2.2 * smooth((f - 630) / 150), 1];
  if (id === S.eat) { const n = (f >= W.nam1 ? 1 : 0) + (f >= W.nam2 ? 1 : 0) + (f >= W.nam3 ? 1 : 0); return [1.8, n >= 3 ? 0 : 1 - n * 0.3]; }
  return [0, 0];
};
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.8, 1.6, 6.4], look: [0.8, 1.0, 1.8], fov: 52 }, { f: b, pos: [0.9, 1.5, 5.4], look: [0.8, 1.0, 1.8], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 98, keys: hk(0, 98) },
  { id: 2, a: 96, b: 176, keys: [{ f: 96, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 176, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 174, b: 279, keys: [{ f: 174, pos: [0.6, 1.8, 6.2], look: [0.6, 1.0, 2.0], fov: 50 }, { f: 279, pos: [0.6, 1.6, 5.2], look: [0.6, 1.0, 2.0], fov: 48, glide: true }] },
  { id: 4, a: 277, b: 357, keys: [{ f: 277, pos: [-2.6, 1.6, 6.0], look: [-2.6, 1.1, 2.0], fov: 50 }, { f: 357, pos: [-2.6, 1.5, 5.0], look: [-2.6, 1.1, 2.0], fov: 46, glide: true }] },
  { id: 5, a: 355, b: 455, keys: [{ f: 355, pos: [-3, 2.4, 1.2], look: [-3, 2.0, -7.5], fov: 56 }, { f: 455, pos: [-3, 2.0, -1.4], look: [-3, 1.8, -7.5], fov: 52, glide: true }] },
  { id: 6, a: 453, b: 623, keys: [{ f: 453, pos: [2, 2.0, 9], look: [8, 1.6, 0], fov: 54 }, { f: 560, pos: [0, 2.2, 9], look: [5, 1.8, 0], fov: 56, glide: true }, { f: 623, pos: [0, 2.0, 8.5], look: [3, 1.6, 0], fov: 56, glide: true }] },
  { id: 7, a: 621, b: 790, keys: [{ f: 621, pos: [-1.5, 2.2, 9.5], look: [2.2, 1.6, 0], fov: 56 }, { f: 790, pos: [-1.0, 2.0, 8.6], look: [1.6, 1.6, 0], fov: 56, glide: true }] },
  { id: 8, a: 788, b: 882, keys: [{ f: 788, pos: [-2.4, 1.4, 5.2], look: [0.4, 1.2, 0.4], fov: 52 }, { f: 882, pos: [-2.0, 1.4, 4.6], look: [0.4, 1.0, 0.4], fov: 50, glide: true }] },
  { id: 9, a: 880, b: 998, keys: [{ f: 880, pos: [0, 1.4, 4.6], look: [-0.4, 0.9, 0.4], fov: 50 }, { f: 998, pos: [0.2, 2.0, 6.8], look: [-0.2, 1.2, 0.4], fov: 54, glide: true }] },
  { id: 10, a: 996, b: 1104, keys: hk(996, 1104) },
  { id: 11, a: 1102, b: TOTAL, keys: [{ f: 1102, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 77, k: 0.03 }, { f: 264, k: 0.03 }, { f: 565, k: 0.04 }, { f: 606, k: 0.04 }, { f: 773, k: 0.04 }, { f: 843, k: 0.04 }, { f: 855, k: 0.04 }, { f: 868, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.pumpkin || id === S.tries ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 92, label: "¡EL BANCO!", sub: "se lo ha comido", col: "#ffd23f", big: true },
  { a: 186, b: 215, label: "30 VECES", sub: "al día", col: "#ff3b3b", big: true },
  { a: 430, b: 453, label: "NO VUELVAS", sub: "por favor", col: "#ff3b3b" },
  { a: 563, b: 590, label: "3 METROS", sub: "", col: "#ff8a2a", big: true },
  { a: 590, b: 621, label: "500 KILOS", sub: "", col: "#ff8a2a", big: true },
  { a: 657, b: 672, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 693, b: 708, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 841, b: 853, label: "¡ÑAM!", sub: "", col: "#ffd23f", big: true },
  { a: 853, b: 866, label: "¡ÑAM!", sub: "", col: "#ffd23f", big: true },
  { a: 866, b: 890, label: "¡ÑAM!", sub: "", col: "#ffd23f", big: true },
  { a: 965, b: 996, label: "¿POSTRE?", sub: "", col: "#ffd23f", big: true },
  { a: 996, b: 1098, label: "¡EL BANCO!", sub: "se lo ha comido", col: "#ffd23f", big: true },
];
void smooth;
