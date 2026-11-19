// "El jinete que ganó muerto" (Frank Hayes, Belmont Park, 4-VI-1923), 37.7 s. Words: muerto 64 · Nueva 79 · 1923 99 · Frank 140 · nunca 184 ·
// Sweet 255 · apuesta 299 · peso 333 · comer 374 · Salen 389 · Saltan 405 · cabeza 448 · Pero 465 · para 533 · bueno 566 · silla 595 · corriendo 632 ·
// primero 667 · Cuando 683 · cuenta 727 · Fíjate 744 · único 767 · morir 838 · Al 852 · beso 887 · correr 931 · Y 947 · muerto 1026 · Y 1042 · dale 1069
import { kit, ShotDef, Mark, V3, Key } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1134;
export const W = { nunca: 184, sweet: 255, apuesta: 299, comer: 374, cabeza: 448, para: 533, primero: 667, cuenta: 727, unico: 767, beso: 887, dale: 1069 };
export const S = { hook: 1, ny: 2, stable: 3, kiss: 4, diet: 5, race: 6, heart: 7, keeps: 8, finish: 9, congrats: 10, kissdeath: 11, end: 12, cta: 13 };
export const STB: V3 = [-120, 0, 0];
export const FIN = 140;
export const HEDGES = [-45, 62, 92, 118];
export const hx = (f: number) => Math.min(-60 + 0.3 * f, f > 680 && f < 940 ? FIN + 4 : 1e9);
const tr = (a: number, b: number, dx0: number, dx1: number, y: number, z: number, fov: number, ly = 1.6): Key[] => [
  { f: a, pos: [hx(a) + dx0, y, z], look: [hx(a) + dx0 * 0.3, ly, 0.3], fov }, { f: b, pos: [hx(b) + dx1, y, z], look: [hx(b) + dx1 * 0.3, ly, 0.3], fov }];
const C = STB[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 76, keys: tr(0, 76, 2.5, 0.5, 2.2, 6.5, 50) },
  { id: 2, a: 74, b: 138, keys: [{ f: 74, pos: [FIN - 10, 9, 26], look: [FIN - 10, 3, -6], fov: 52 }, { f: 138, pos: [FIN - 6, 6, 18], look: [FIN - 10, 2.5, -6], fov: 50, glide: true }] },
  { id: 3, a: 136, b: 222, keys: [{ f: 136, pos: [C - 0.6, 1.7, 6.0], look: [C - 0.6, 1.3, 0], fov: 48 }, { f: 222, pos: [C - 0.9, 1.6, 4.6], look: [C - 0.9, 1.3, 0], fov: 46, glide: true }] },
  { id: 4, a: 220, b: 315, keys: [{ f: 220, pos: [C + 1.0, 1.9, 6.5], look: [C + 0.6, 1.6, 0], fov: 48 }, { f: 315, pos: [C + 1.2, 1.9, 5.2], look: [C + 0.8, 1.8, 0], fov: 46, glide: true }] },
  { id: 5, a: 313, b: 387, keys: [{ f: 313, pos: [C - 1.0, 1.5, 4.4], look: [C - 1.1, 1.2, 0], fov: 46 }, { f: 387, pos: [C - 1.1, 1.4, 3.4], look: [C - 1.1, 1.2, 0], fov: 42, glide: true }] },
  { id: 6, a: 385, b: 463, keys: tr(385, 463, -3, 3, 2.6, 8.5, 52) },
  { id: 7, a: 461, b: 545, keys: tr(461, 545, 1.2, 0.6, 2.6, 4.6, 44, 2.2) },
  { id: 8, a: 543, b: 647, keys: tr(543, 647, 4, -2, 2.2, 7.0, 50) },
  { id: 9, a: 645, b: 681, keys: [{ f: 645, pos: [FIN - 2, 2.2, 8], look: [FIN - 3, 2.0, 0], fov: 52 }, { f: 681, pos: [FIN + 2, 2.4, 9], look: [FIN, 2.2, -1], fov: 52, glide: true }] },
  { id: 10, a: 679, b: 850, keys: [{ f: 679, pos: [FIN + 5, 2.0, 7.5], look: [FIN + 5, 1.5, 0.5], fov: 50 }, { f: 850, pos: [FIN + 5.4, 1.9, 6.0], look: [FIN + 5.2, 1.6, 0.5], fov: 48, glide: true }] },
  { id: 11, a: 848, b: 945, keys: [{ f: 848, pos: [C + 0.3, 2.2, 7.5], look: [C, 2.0, -1], fov: 50 }, { f: 945, pos: [C + 0.4, 2.0, 5.6], look: [C + 0.2, 2.0, -1], fov: 48, glide: true }] },
  { id: 12, a: 943, b: 1040, keys: tr(943, 1040, 0.5, 2.5, 2.2, 6.5, 50) },
  { id: 13, a: 1038, b: TOTAL, keys: [{ f: 1038, pos: [FIN + 20.5, 2.4, 7.5], look: [FIN + 20, 2.2, 0.5], fov: 50 }, { f: TOTAL, pos: [FIN + 20.3, 2.3, 6.2], look: [FIN + 20, 2.3, 0.5], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 8, k: 0.04 }, { f: 389, k: 0.05 }, { f: 533, k: 0.06 }, { f: 667, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.ny || id === S.race || id === S.finish ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 70, label: "GANÓ", sub: "estando muerto", col: "#ff3b3b", big: true },
  { a: 79, b: 136, label: "Nueva York", sub: "1923", col: "#ffffff" },
  { a: 767, b: 845, label: "ÚNICO", sub: "en la historia", col: "#ffd23f" },
  { a: 1000, b: 1040, label: "GANÓ", sub: "estando muerto", col: "#ff3b3b", big: true },
];
