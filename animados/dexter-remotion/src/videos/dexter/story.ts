// "Timothy Dexter", 35 s. Words: rico 25 · peores 44 · negocios 53 · siglo 104 · Timothy 129 · escribir 172 · ricos 196 · reírse 227 · malísimos 270 ·
// carbón 300 · Newcastle 311 · hace 367 · huelga 397 · Vende 423 · calentadores 489 · Caribe 517 · calor 544 · manda 573 · plantaciones 598 · compran 617 ·
// melaza 644 · gatos 669 · ratas 739 · Ganancias 754 · suerte 779 · rico 831 · desgracia 845 · libro 908 · comas 934 · rico 987 · mundo 1029
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1050;
export const W = { timothy: 129, escribir: 172, ricos: 196, reirse: 227, malisimos: 270, carbon: 300, hace: 367, huelga: 397, vende: 423,
  calentadores: 489, calor: 544, manda: 573, compran: 617, melaza: 644, gatos: 669, ratas: 739, ganancias: 754, suerte: 779, rico: 831,
  desgracia: 845, libro: 908, comas: 934 };
export const S = { hook: 1, town: 2, mock: 3, coal: 4, newc: 5, warm: 6, plant: 7, cats: 8, luck: 9, book: 10, end: 11 };
export const NEWC: V3 = [40, 0, 0], CAR: V3 = [-40, 0, 0], HOME: V3 = [80, 0, 0];
const N = NEWC[0], C = CAR[0], H = HOME[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 80, keys: [{ f: 0, pos: [H + 0.2, 1.7, 2.4], look: [H, 1.5, 0], fov: 42 }, { f: 80, pos: [H + 0.4, 1.8, 3.6], look: [H, 1.4, 0], fov: 46, glide: true }] },
  { id: 2, a: 76, b: 188, keys: [{ f: 76, pos: [4, 3, 10], look: [0, 1.4, -1], fov: 50 }, { f: 188, pos: [0.6, 1.6, 4.0], look: [0.2, 1.3, 0], fov: 44, glide: true }] },
  { id: 3, a: 184, b: 290, keys: [{ f: 184, pos: [0.3, 1.7, 5.4], look: [0, 1.3, -0.3], fov: 48 }, { f: 290, pos: [0.3, 1.6, 4.4], look: [0, 1.35, -0.3], fov: 46, glide: true }] },
  { id: 4, a: 286, b: 356, keys: [{ f: 286, pos: [0.5, 1.6, 3.8], look: [0.2, 1.4, 0], fov: 44 }, { f: 356, pos: [0.4, 1.6, 3.0], look: [0.2, 1.45, 0], fov: 42, glide: true }] },
  { id: 5, a: 352, b: 456, keys: [{ f: 352, pos: [N + 6, 3, 12], look: [N, 1.6, -2], fov: 50 }, { f: 456, pos: [N + 0.6, 1.6, 4.8], look: [N + 0.2, 1.3, 0], fov: 46, glide: true }] },
  { id: 6, a: 452, b: 586, keys: [{ f: 452, pos: [0.4, 1.6, 3.8], look: [0.2, 1.4, 0], fov: 44 }, { f: 512, pos: [0.4, 1.6, 3.2], look: [0.2, 1.45, 0], fov: 42, glide: true }, { f: 520, pos: [C + 4, 3, 10], look: [C, 2, -1], fov: 50 }, { f: 586, pos: [C + 1.5, 2, 6], look: [C, 1.5, -1], fov: 48, glide: true }] },
  { id: 7, a: 582, b: 660, keys: [{ f: 582, pos: [C + 6.3, 1.7, 4.2], look: [C + 6, 1.1, 0], fov: 46 }, { f: 660, pos: [C + 6.2, 1.6, 3.2], look: [C + 6, 1.1, 0], fov: 44, glide: true }] },
  { id: 8, a: 656, b: 776, keys: [{ f: 656, pos: [C - 5.5, 1.2, 4.6], look: [C - 6, 0.6, 0], fov: 46 }, { f: 776, pos: [C - 6.2, 1.0, 3.4], look: [C - 6, 0.6, 0], fov: 44, glide: true }] },
  { id: 9, a: 772, b: 846, keys: [{ f: 772, pos: [H + 0.6, 1.8, 5.2], look: [H, 1.3, -0.5], fov: 48 }, { f: 846, pos: [H + 0.4, 1.7, 3.8], look: [H, 1.4, -0.5], fov: 44, glide: true }] },
  { id: 10, a: 842, b: 950, keys: [{ f: 842, pos: [0.3, 1.7, 5.2], look: [0, 1.4, -0.3], fov: 48 }, { f: 950, pos: [0.4, 1.6, 3.8], look: [0.2, 1.45, -0.3], fov: 44, glide: true }] },
  { id: 11, a: 946, b: TOTAL, keys: [{ f: 946, pos: [H + 0.4, 1.8, 3.6], look: [H, 1.4, 0], fov: 46 }, { f: TOTAL, pos: [H + 0.2, 1.7, 2.4], look: [H, 1.5, 0], fov: 42, glide: true }] },
];
const K = kit(SHOTS, [{ f: 397, k: 0.03 }, { f: 754, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.newc || (id === S.warm && f > 516) ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 64, label: "RICO", sub: "con pésimos negocios", col: "#ffd23f", big: true },
  { a: 80, b: 160, label: "Siglo XVIII", sub: "Estados Unidos", col: "#ffffff" },
  { a: 372, b: 450, label: "Newcastle", sub: "la ciudad del carbón", col: "#ffffff" },
  { a: 960, b: TOTAL, label: "RICO", sub: "con pésimos negocios", col: "#ffd23f", big: true },
];
