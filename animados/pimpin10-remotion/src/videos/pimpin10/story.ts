// Pimpín 10 · "Patoso", 38.2 s. Words: tropezado 17 · sombra 41 · derechitos 85 · menos 109 · Pimpín 115 · Ja 132/141/150 · patoso 184 · tropieza 219 · subiendo 229 · bajándolas 264 ·
// suelo 296 · liso 303 · sí 322 · jarrones 351 · foto 373 · Prohibido 401 · ladrón 446 · roba 454 · queso 464 · oro 475 · corriendo 499 · plaza 518 · persiguen 541 · guardias 556 ·
// vecinos 582 · perro 606 · rápido 644 · espera 668 · Pimpín 685 · sale 694 · tropieza 716 · felpudo 733 · rueda 748 · bola 763 · rebota 773 · fuente 786 · tira 803 · ladrón 811 ·
// bolo 835 · Pleno 850 · queso 873 · aterriza 880 · manos 907 · Bueno 923 · cabeza 944 · Porque 961 · Pimpín 1029 · Y 1046 · dale 1073
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1145;
export const W = { trip: 39, tropieza: 219, bajando: 262, liso: 301, prohibido: 401, guardias: 556, vecinos: 582, perro: 606, felpudo: 716, rueda: 746, rebota: 784, tira: 803, queso: 873, cabeza: 942, dale: 1073 };
export const S = { hook: 1, straight: 2, ja: 3, clumsy: 4, stairs: 5, vases: 6, theft: 7, chase: 8, roll: 9, cheese: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
export const ST: V3 = [-8, 0, 3];
export const thiefAt = (f: number, id: number): [number, number] | null => {
  if (id === 7) return [-6 + (f - 427) * 0.09, 0.8];
  if (id === 8) return [-4 + (f - 535) * 0.08, 0.8];
  if (id === 9) { if (f < 760) return null; if (f < 803) return [-6 + (f - 760) * (10 / 43), 0]; return [4.6, 0]; }
  return null;
};
/** Pimpín out of his door, trip, roll to the well, bounce, hit the thief: [x, y, z, rolling, tilt] */
export const rollAt = (f: number): [number, number, number, boolean, number] => {
  if (f < W.felpudo - 4) { const s = smooth((f - 694) / 18); return [-3, 0, -7.6 + s * 0.6, false, 0]; }
  if (f < W.rebota) { const s = (f - W.felpudo + 4) / (W.rebota - W.felpudo + 4); return [-3 + 7.2 * s, 0.35, -7 + 3.4 * s, true, s * 14]; }
  if (f < W.tira) { const s = (f - W.rebota) / (W.tira - W.rebota); return [4.2 + 0.2 * s, 0.35 + Math.sin(s * Math.PI) * 1.2, -3.6 + 3.6 * s, true, 14 + s * 6]; }
  const s = smooth((f - W.tira) / 20); return [4.4, 0.35 * (1 - s), 0.3, s < 1, 20 + s * 2];
};
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 1.6, 7.2], look: [0.2, 1.2, 2], fov: 52 }, { f: b, pos: [0.6, 1.4, 6.2], look: [0.6, 1.0, 2.2], fov: 50, glide: true }];
const [sx, , sz] = ST;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 58, keys: hk(0, 58) },
  { id: 2, a: 56, b: 134, keys: [{ f: 56, pos: [-2, 2.0, 8.6], look: [-2, 1.2, 1.4], fov: 56 }, { f: 134, pos: [0.5, 2.0, 8.0], look: [0.5, 1.2, 1.4], fov: 54, glide: true }] },
  { id: 3, a: 132, b: 165, keys: [{ f: 132, pos: [0, 2.4, 9], look: [0, 1.6, 1.5], fov: 54 }, { f: 165, pos: [0.1, 2.1, 7.8], look: [0.1, 1.5, 1.5], fov: 52, glide: true }] },
  { id: 4, a: 163, b: 214, keys: [{ f: 163, pos: [0, 1.6, 5.8], look: [0, 1.5, 2.6], fov: 50 }, { f: 214, pos: [0, 1.6, 4.8], look: [0, 1.6, 2.6], fov: 46, glide: true }] },
  { id: 5, a: 212, b: 336, keys: [{ f: 212, pos: [sx + 3.5, 2.0, sz + 5.5], look: [sx, 1.2, sz - 0.8], fov: 54 }, { f: 290, pos: [sx + 3.6, 2.0, sz + 5.8], look: [sx + 0.8, 1.0, sz + 0.6], fov: 54, glide: true }, { f: 336, pos: [sx + 3.6, 1.6, sz + 5.0], look: [sx + 2.2, 0.9, sz + 1.2], fov: 52, glide: true }] },
  { id: 6, a: 334, b: 429, keys: [{ f: 334, pos: [3.4, 2.6, 0.4], look: [3.2, 2.4, -7.5], fov: 54 }, { f: 429, pos: [3.6, 2.0, -1.6], look: [3.4, 1.8, -7.5], fov: 50, glide: true }] },
  { id: 7, a: 427, b: 537, keys: [{ f: 427, pos: [-3, 1.8, 6.4], look: [-3.5, 1.3, 0.8], fov: 54 }, { f: 537, pos: [2.5, 1.8, 6.4], look: [3.5, 1.3, 0.8], fov: 54, glide: true }] },
  { id: 8, a: 535, b: 662, keys: [{ f: 535, pos: [-6, 2.4, 9], look: [-5, 1.2, 0.8], fov: 56 }, { f: 662, pos: [2, 2.4, 9], look: [3, 1.2, 0.8], fov: 56, glide: true }] },
  { id: 9, a: 660, b: 852, keys: [{ f: 660, pos: [-2.6, 2.0, -2.0], look: [-3, 1.3, -7.6], fov: 54 }, { f: 730, pos: [-1.6, 2.4, -1.0], look: [-2.6, 0.8, -6.8], fov: 56, glide: true }, { f: 760, pos: [0.6, 7.5, 9], look: [0.8, 0, -3], fov: 56, glide: true }, { f: 803, pos: [1.6, 5.5, 7.5], look: [2.8, 0.5, -1.4], fov: 54, glide: true }, { f: 852, pos: [4.2, 2.0, 5.0], look: [4.5, 0.6, 0.2], fov: 52, glide: true }] },
  { id: 10, a: 850, b: 963, keys: [{ f: 850, pos: [4.6, 1.9, 5.4], look: [4.4, 1.6, 0.6], fov: 52 }, { f: 963, pos: [4.3, 1.8, 4.2], look: [4.2, 1.7, 0.6], fov: 48, glide: true }] },
  { id: 11, a: 961, b: 1048, keys: hk(961, 1048) },
  { id: 12, a: 1046, b: TOTAL, keys: [{ f: 1046, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 41, k: 0.04 }, { f: 219, k: 0.03 }, { f: 303, k: 0.03 }, { f: 784, k: 0.04 }, { f: 803, k: 0.07 }, { f: 942, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.chase || id === S.roll ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 54, label: "¡TROPEZÓN!", sub: "con una sombra", col: "#ff3b3b", big: true },
  { a: 399, b: 429, label: "PROHIBIDO PASAR", sub: "", col: "#ff3b3b" },
  { a: 462, b: 500, label: "QUESO DE ORO", sub: "", col: "#ffd23f" },
  { a: 850, b: 880, label: "¡PLENO!", sub: "", col: "#ffd23f", big: true },
  { a: 961, b: 1044, label: "¡TROPEZÓN!", sub: "con una sombra", col: "#ff3b3b", big: true },
];
void smooth;
