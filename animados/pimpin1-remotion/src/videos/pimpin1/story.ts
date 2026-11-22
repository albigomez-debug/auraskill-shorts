// Pimpín 1 · "Todos de fiesta", 41.3 s. Words: fiesta 33 · menos 52 · Pimpín 58 · Ja 75/84/93 · hamburguesería 131 · Hace 155 · envuelve 186 · patatas 228 · bolsa 245 ·
// lanza 279 · lejos 292 · Uy 309 · casi 320 · fiesta 360 · cumpleaños 404 · martes 433 · piedra 494 · alcalde 537 · estornudó 548 · tres 561 · seguidas 574 · Pimpín 598 ·
// friendo 627 · espera 662 · tres 682 · hambre 726 · abierto 763 · Cola 780 · Mil 813 · lanzando 858 · falla 914 · noche 945 · hamburguesería 980 · honor 1025 · Pimpín 1039 ·
// Porque 1057 · Pimpín 1123 · Y 1140 · dale 1166
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1238;
export const W = { hace: 155, envuelve: 186, patatas: 228, lanza: 279, casi: 312, cumple: 404, martes: 433, piedra: 494, alcalde: 530, ach1: 548, ach2: 561, ach3: 570, hambre: 720, mil: 813, lanzando: 858, falla: 914, honor: 1011, dale: 1166 };
export const S = { hook: 1, hookB: 2, work: 3, reasons: 4, fries: 5, night: 6, rush: 7, honor: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
export const BUR: V3 = [60, 0, 0];
export const night = (f: number, id: number) => id === 6 || id === 7 || id === 8 ? 1 : id === 5 ? smooth((f - 600) / 40) : 0;
/** fries thrown from the fryer (x0) to the bag (x1) in `d` frames, starting at f0 (repeats every 2d) */
export const fryArc = (f: number, f0: number, x0: number, x1: number, d = 26): [number, number] | null => { const s = ((f - f0) % (2 * d)) / d; if (f < f0 || s > 1) return null; return [x0 + (x1 - x0) * s - 2.4 * (1 - s) * 0 + (s * 0), 1.3 + Math.sin(s * Math.PI) * 1.3 - (s > 0.9 ? (s - 0.9) * 4 : 0)]; };
export const queueN = (f: number) => Math.floor(Math.max(0, f - 840) / 10);
const B = BUR[0];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.3, 2.8, 9], look: [0, 2.0, 0], fov: 54 }, { f: b, pos: [0.4, 2.0, 6.2], look: [0.2, 1.9, 0], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 56, keys: hk(0, 56) },
  { id: 2, a: 54, b: 106, keys: [{ f: 54, pos: [B - 0.6, 2.0, 4.6], look: [B - 0.7, 1.7, -0.2], fov: 50 }, { f: 106, pos: [B - 0.7, 1.9, 3.8], look: [B - 0.8, 1.7, -0.2], fov: 48, glide: true }] },
  { id: 3, a: 104, b: 334, keys: [{ f: 104, pos: [B, 2.6, 7], look: [B, 1.6, -2], fov: 54 }, { f: 160, pos: [B - 1.4, 1.8, 2.6], look: [B - 1.6, 1.2, -2.4], fov: 52, glide: true }, { f: 200, pos: [B - 0.3, 1.8, 3.4], look: [B - 0.3, 1.3, 0.4], fov: 50, glide: true }, { f: 260, pos: [B + 0.3, 2.1, 6.4], look: [B + 0.3, 1.5, 0], fov: 54, glide: true }, { f: 334, pos: [B + 0.5, 2.0, 5.6], look: [B + 0.5, 1.5, 0], fov: 52, glide: true }] },
  { id: 4, a: 332, b: 596, keys: [{ f: 332, pos: [0, 4.5, 13], look: [0, 2.5, -2], fov: 54 }, { f: 400, pos: [-1.5, 2.2, 5.2], look: [-1.5, 1.9, 0.6], fov: 52, glide: true }, { f: 440, pos: [0.5, 2.8, 6.5], look: [0.5, 3.2, 0.4], fov: 52, glide: true }, { f: 495, pos: [1.2, 2.2, 4.8], look: [1.2, 2.1, 1.2], fov: 50, glide: true }, { f: 540, pos: [0.2, 2.4, 6.8], look: [0.2, 2.3, 2.2], fov: 52, glide: true }, { f: 596, pos: [0.2, 2.5, 6.0], look: [0.2, 2.6, 2.2], fov: 52, glide: true }] },
  { id: 5, a: 594, b: 656, keys: [{ f: 594, pos: [B, 2.1, 4.6], look: [B - 0.4, 1.7, -0.6], fov: 52 }, { f: 656, pos: [B - 0.4, 2.0, 3.8], look: [B - 0.7, 1.7, -0.6], fov: 50, glide: true }] },
  { id: 6, a: 654, b: 780, keys: [{ f: 654, pos: [0, 5, 14], look: [0, 4, -4], fov: 56 }, { f: 720, pos: [0, 2.6, 9], look: [0, 2.0, 0], fov: 54, glide: true }, { f: 780, pos: [0.5, 2.4, 7.5], look: [0.5, 2.0, 0], fov: 54, glide: true }] },
  { id: 7, a: 778, b: 937, keys: [{ f: 778, pos: [B + 6, 3.5, 16], look: [B + 0.5, 1.5, 4], fov: 56 }, { f: 830, pos: [B - 1.2, 2.4, 6.0], look: [B - 1.4, 1.6, 0.6], fov: 52, glide: true }, { f: 880, pos: [B + 0.4, 2.2, 6.0], look: [B + 0.4, 1.6, 0.2], fov: 54, glide: true }, { f: 937, pos: [B + 0.4, 2.3, 6.8], look: [B + 0.4, 1.8, 0.4], fov: 54, glide: true }] },
  { id: 8, a: 935, b: 1057, keys: [{ f: 935, pos: [B, 2.8, 10], look: [B, 1.8, 1], fov: 54 }, { f: 1057, pos: [B, 2.1, 6.8], look: [B, 2.0, 2.4], fov: 50, glide: true }] },
  { id: 9, a: 1055, b: 1138, keys: hk(1055, 1138) },
  { id: 10, a: 1136, b: TOTAL, keys: [{ f: 1136, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 312, k: 0.03 }, { f: 548, k: 0.03 }, { f: 561, k: 0.03 }, { f: 570, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.night ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 52, label: "¡DE FIESTA!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
  { a: 682, b: 740, label: "3:00", sub: "de la mañana", col: "#ffffff" },
  { a: 813, b: 850, label: "¡1.000!", sub: "hamburguesas", col: "#ffd23f" },
  { a: 1057, b: 1134, label: "¡DE FIESTA!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
];
