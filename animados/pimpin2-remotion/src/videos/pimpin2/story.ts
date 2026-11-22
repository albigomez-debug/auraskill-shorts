// Pimpín 2 · "Súper fuerte", 35.8 s. Words: normales 29 · menos 51 · Pimpín 57 · Ja 74/83/92 · fuerte 120 · verdad 152 · Llama 165 · puerta 209 · mano 220 · Abre 234 ·
// pepinillos 254 · mesa 288 · mano 315 · alcalde 342 · volando 359 · fuente 376 · nadie 416 · choca 426 · cinco 437 · fiesta 469 · roca 486 · rodando 511 · tapa 543 · puerta 552 ·
// Prueban 578 · diez 588 · Veinte 612 · burro 633 · Nada 648 · espera 670 · Pimpín 691 · remanga 715 · Respira 733 · aparta 762 · dedo 777 · lanza 835 · lejos 847 · caído 879 ·
// Porque 896 · Pimpín 959 · Y 976 · dale 1003
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1075;
export const W = { verdad: 150, llama: 165, mano: 217, mesa: 286, vuela: 350, fuente: 376, nadie: 414, choca: 424, rodando: 505, tapa: 543, veinte: 612, burro: 631, nada: 646, llega: 685, remanga: 713, respira: 731, aparta: 760, lanza: 833, caido: 862, dale: 1003 };
export const S = { hook: 1, ja: 2, flex: 3, door: 4, jar: 5, shake: 6, five: 7, rock: 8, push: 9, pim: 10, throw: 11, end: 12, cta: 13 };
export const GOLD: number[] = [];
export const G: V3 = [-70, 0, 0];
/** rock: [x, y, z, roll, scale] */
export const rockAt = (f: number): [number, number, number, number, number] => {
  const x0 = G[0];
  if (f < W.rodando - 30) return [x0 - 4, 21.5, -45, 0, 0.001];
  if (f < W.tapa) { const s = smooth((f - (W.rodando - 30)) / (W.tapa - W.rodando + 30)); return [x0 - 4 + 4 * s, 21.5 * (1 - s) + 1.9 * s + Math.abs(Math.sin(s * 9)) * 1.2 * (1 - s), -45 + 46 * s, s * 14, 1]; }
  if (f < W.aparta) return [x0, 1.9, 1, 14, 1];
  if (f < W.lanza) { const s = smooth((f - W.aparta) / 20); return [x0 + 3.4 * s, 1.9, 1, 14 + s, 1]; }
  const s = Math.min(1, (f - W.lanza) / 60); return [x0 + 3.4 + 30 * s, 1.9 + 60 * s, 1 - 40 * s, 15 + s * 8, 1];
};
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.3, 2.6, 9.5], look: [0.2, 2.0, 2], fov: 54 }, { f: b, pos: [0.3, 2.1, 7.4], look: [0.2, 2.0, 3], fov: 50, glide: true }];
const x0 = G[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 64, keys: hk(0, 64) },
  { id: 2, a: 62, b: 104, keys: [{ f: 62, pos: [0, 3.2, 11], look: [0, 1.8, 0], fov: 56 }, { f: 104, pos: [0, 2.8, 9.6], look: [0, 1.8, 0], fov: 54, glide: true }] },
  { id: 3, a: 102, b: 163, keys: [{ f: 102, pos: [0.2, 1.7, 6.8], look: [0.2, 1.7, 3], fov: 50 }, { f: 163, pos: [0.2, 1.8, 5.8], look: [0.2, 1.9, 3], fov: 48, glide: true }] },
  { id: 4, a: 161, b: 232, keys: [{ f: 161, pos: [-34.4, 2.3, 7.2], look: [-35, 1.9, 0.6], fov: 52 }, { f: 232, pos: [-34.6, 2.1, 6.0], look: [-35, 1.8, 0.8], fov: 50, glide: true }] },
  { id: 5, a: 230, b: 301, keys: [{ f: 230, pos: [0.2, 1.8, 8.4], look: [0.1, 1.2, 3.8], fov: 50 }, { f: 301, pos: [0.2, 1.7, 7.4], look: [0.1, 1.2, 3.8], fov: 48, glide: true }] },
  { id: 6, a: 299, b: 390, keys: [{ f: 299, pos: [0.8, 1.9, 8.4], look: [0.6, 1.6, 3.4], fov: 50 }, { f: 350, pos: [1.2, 2.2, 9.0], look: [1.4, 1.8, 2.4], fov: 52, glide: true }, { f: 390, pos: [3.5, 2.4, 4.5], look: [5, 1.4, -3], fov: 52, glide: true }] },
  { id: 7, a: 388, b: 452, keys: [{ f: 388, pos: [0.3, 2.4, 9.4], look: [0.3, 1.9, 2], fov: 54 }, { f: 452, pos: [0.4, 2.1, 7.6], look: [0.4, 1.9, 2.6], fov: 50, glide: true }] },
  { id: 8, a: 450, b: 576, keys: [{ f: 450, pos: [x0, 2.6, 14], look: [x0, 3, 0], fov: 56 }, { f: 500, pos: [x0 + 2, 4, 16], look: [x0 - 2, 10, -30], fov: 56, glide: true }, { f: 540, pos: [x0 + 1, 3, 14], look: [x0, 3, 0], fov: 56, glide: true }, { f: 576, pos: [x0, 2.6, 12], look: [x0, 2.4, 0], fov: 54, glide: true }] },
  { id: 9, a: 574, b: 662, keys: [{ f: 574, pos: [x0 + 1, 2.4, 10], look: [x0, 1.8, 2.4], fov: 54 }, { f: 662, pos: [x0 + 0.5, 2.6, 10.6], look: [x0, 2.0, 2.4], fov: 54, glide: true }] },
  { id: 10, a: 660, b: 790, keys: [{ f: 660, pos: [x0 + 2.5, 2.2, 10], look: [x0 + 2.5, 1.6, 3.4], fov: 54 }, { f: 720, pos: [x0 + 0.3, 1.9, 7.6], look: [x0 + 0.2, 1.7, 3.4], fov: 50, glide: true }, { f: 760, pos: [x0 + 0.8, 2.4, 10.5], look: [x0 + 0.8, 2.0, 2.4], fov: 54, glide: true }, { f: 790, pos: [x0 + 1.2, 2.6, 11.5], look: [x0 + 1.4, 2.0, 2.4], fov: 56, glide: true }] },
  { id: 11, a: 788, b: 896, keys: [{ f: 788, pos: [x0 - 1, 2.0, 9.5], look: [x0 + 1.5, 2.0, 2], fov: 54 }, { f: 845, pos: [x0 - 1.5, 1.5, 8.5], look: [x0 + 3, 4, 0], fov: 56, glide: true }, { f: 896, pos: [x0 - 2, 1.2, 9], look: [x0 + 5, 9, -6], fov: 58, glide: true }] },
  { id: 12, a: 894, b: 975, keys: hk(894, 975) },
  { id: 13, a: 973, b: TOTAL, keys: [{ f: 973, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 220, k: 0.03 }, { f: 286, k: 0.03 }, { f: 376, k: 0.02 }, { f: 543, k: 0.06 }, { f: 760, k: 0.03 }, { f: 833, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.rock || id === S.throw ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 58, label: "¡NORMALES!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
  { a: 116, b: 148, label: "FUERTE", sub: "", col: "#ffd23f" },
  { a: 586, b: 610, label: "10", sub: "vecinos", col: "#ffffff" },
  { a: 610, b: 630, label: "20", sub: "vecinos", col: "#ffffff" },
  { a: 758, b: 792, label: "¡CON UN DEDO!", sub: "", col: "#ffd23f" },
  { a: 858, b: 893, label: "¡AÚN NO HA CAÍDO!", sub: "", col: "#ffd23f" },
  { a: 896, b: 972, label: "¡NORMALES!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
];
