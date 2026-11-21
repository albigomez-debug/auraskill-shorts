// "Karánsebes" (1788, según la leyenda), 41.1 s. Words: mismo 56 · 1788 79 · Karánsebes 132 · Miles 184 · turcos 241 · leyenda 281 · noche 299 · jinetes 318 ·
// campesinos 350 · aguardiente 374 · Compran 395 · fiesta 442 · Llegan 459 · infantería 485 · no 559 · peleas 579 · dispara 606 · grita 635 · turcos 662 ·
// Pero 681 · Halt 750 · Alá 831 · Todos 841 · disparan 902 · Fíjate 949 · llegan 976 · vacío 1034 · heridos 1059 · Un 1077 · mismo 1128 · Y 1144 · dale 1171
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1234;
export const W = { turcos: 241, campesinos: 350, aguardiente: 374, infanteria: 485, no: 559, peleas: 579, dispara: 606, grita: 635, vienen: 651, halt: 750, ala: 831, llegan: 976, vacio: 1034, dale: 1171 };
export const S = { hook: 1, camp: 2, wait: 3, meet: 4, party: 5, fight: 6, shot: 7, halt: 8, chaos: 9, turks: 10, end: 11, cta: 12 };
export const GOLD = [1, 4, 5, 6, 7, 8, 9, 11];
export const BAR: V3 = [40, 0, 0], TUR: V3 = [25, 0, 0];
const B = BAR[0], T = TUR[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 68, keys: [{ f: 0, pos: [0.5, 1.8, 6], look: [0, 1.4, 0], fov: 50 }, { f: 68, pos: [0.2, 1.7, 4.5], look: [0, 1.5, 0], fov: 48, glide: true }] },
  { id: 2, a: 66, b: 182, keys: [{ f: 66, pos: [0, 6, 16], look: [0, 1, -4], fov: 52 }, { f: 182, pos: [3, 3, 10], look: [2, 1.2, -2], fov: 50, glide: true }] },
  { id: 3, a: 180, b: 258, keys: [{ f: 180, pos: [0, 1.7, 5.4], look: [0, 1.5, 0], fov: 48 }, { f: 258, pos: [0, 1.6, 4.2], look: [0, 1.7, 0], fov: 46, glide: true }] },
  { id: 4, a: 256, b: 393, keys: [{ f: 256, pos: [B + 0.2, 2.2, 7.4], look: [B + 0.1, 1.4, 0], fov: 50 }, { f: 393, pos: [B + 0.8, 1.7, 5.6], look: [B + 0.8, 1.4, 0], fov: 48, glide: true }] },
  { id: 5, a: 391, b: 457, keys: [{ f: 391, pos: [B - 1, 1.6, 4.6], look: [B - 0.8, 1.6, 0], fov: 48 }, { f: 457, pos: [B - 0.4, 2.2, 6], look: [B - 0.4, 1.6, 0], fov: 50, glide: true }] },
  { id: 6, a: 455, b: 595, keys: [{ f: 455, pos: [B + 0.4, 1.9, 7.0], look: [B + 0.4, 1.4, 0], fov: 50 }, { f: 540, pos: [B + 0.3, 1.8, 5.8], look: [B + 0.2, 1.6, 0], fov: 48, glide: true }, { f: 595, pos: [B + 0.3, 1.7, 4.8], look: [B + 0.3, 1.5, 0], fov: 46, glide: true }] },
  { id: 7, a: 593, b: 679, keys: [{ f: 593, pos: [0, 1.8, 6.2], look: [0, 1.4, 0], fov: 50 }, { f: 679, pos: [-0.5, 1.9, 4.6], look: [-0.6, 1.8, 0], fov: 46, glide: true }] },
  { id: 8, a: 677, b: 839, keys: [{ f: 677, pos: [0.2, 1.8, 5.6], look: [0, 1.5, 0], fov: 50 }, { f: 760, pos: [-0.8, 1.7, 3.8], look: [-1.0, 1.7, 0], fov: 46, glide: true }, { f: 839, pos: [0.9, 1.7, 3.8], look: [1.1, 1.7, 0], fov: 46, glide: true }] },
  { id: 9, a: 837, b: 947, keys: [{ f: 837, pos: [0.4, 1.7, 4.5], look: [0, 1.5, 0], fov: 48 }, { f: 947, pos: [0, 7, 14], look: [0, 1, -2], fov: 52, glide: true }] },
  { id: 10, a: 945, b: 1075, keys: [{ f: 945, pos: [T, 2.4, 8], look: [T, 1.2, -0.5], fov: 50 }, { f: 1075, pos: [T + 0.4, 1.7, 5], look: [T, 1.2, 0], fov: 48, glide: true }] },
  { id: 11, a: 1073, b: 1142, keys: [{ f: 1073, pos: [0, 7, 14], look: [0, 1, -2], fov: 52 }, { f: 1142, pos: [0.5, 1.8, 6], look: [0, 1.4, 0], fov: 50, glide: true }] },
  { id: 12, a: 1140, b: TOTAL, keys: [{ f: 1140, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 4, k: 0.05 }, { f: 579, k: 0.04 }, { f: 606, k: 0.07 }, { f: 831, k: 0.05 }, { f: 902, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.camp || id === S.chaos || id === S.end ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 62, label: "PERDIÓ", sub: "contra sí mismo", col: "#ff3b3b", big: true },
  { a: 79, b: 178, label: "1788", sub: "Karánsebes (Rumanía)", col: "#ffffff" },
  { a: 281, b: 340, label: "Según la leyenda", sub: "", col: "#ffd23f" },
  { a: 1077, b: 1138, label: "PERDIÓ", sub: "contra sí mismo", col: "#ff3b3b", big: true },
];
