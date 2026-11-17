// "El Turco" (1770-1854), 36 s. Words: robot 9 · ajedrez 29 · Napoleón 51 · 1770 68 · Viena 103 · inventor 121 · máquina 147 · turco 185 · tablero 235 ·
// puertas 260 · engranajes 293 · mueve 328 · gana 361 · Europa 409 · ochenta 427 · Franklin 477 · Napoleón 502 · trampas 537 · tira 565 · suelo 597 ·
// cómo 619 · Fíjate 643 · hombre 688 · escondido 732 · palancas 779 · engranajes 801 · despistar 826 · suerte 848 · décadas 885 · desgracia 907 ·
// 1854 927 · incendio 979 · Napoleón 1060
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1080;
export const W = { inventor: 121, maquina: 147, turco: 185, tablero: 235, puertas: 260, engranajes: 293, mueve: 328, gana: 361, europa: 409,
  franklin: 477, napoleon: 502, trampas: 537, tira: 565, como: 619, hombre: 688, escondido: 732, palancas: 779, engr2: 801, despistar: 826,
  suerte: 848, decadas: 885, y1854: 927, incendio: 979 };
export const S = { hook: 1, vienna: 2, turk: 3, doors: 4, moves: 5, europe: 6, franklin: 7, napo: 8, how: 9, inside: 10, gears: 11, luck: 12, fire: 13, end: 14 };
export const MUS: V3 = [40, 0, 0];
const M = MUS[0];
const CLOSE = (a: number, b: number, x = 0.6): ShotDef["keys"] => [{ f: a, pos: [x, 1.6, 3.6], look: [0, 1.4, -0.3], fov: 46 }, { f: b, pos: [x * 0.7, 1.6, 3.0], look: [0, 1.4, -0.3], fov: 42, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, keys: [{ f: 0, pos: [0.4, 1.7, 3.2], look: [0.3, 1.45, -0.3], fov: 46 }, { f: 100, pos: [0.6, 1.8, 4.2], look: [0.4, 1.4, -0.3], fov: 48, glide: true }] },
  { id: 2, a: 96, b: 200, keys: [{ f: 96, pos: [4, 3, 9], look: [0, 1.4, -1], fov: 50 }, { f: 200, pos: [1.2, 1.8, 5], look: [0, 1.2, -0.3], fov: 46, glide: true }] },
  { id: 3, a: 196, b: 250, keys: [{ f: 196, pos: [0.2, 1.8, 2.6], look: [0, 1.6, -0.4], fov: 42 }, { f: 250, pos: [0.2, 1.8, 2.0], look: [0, 1.65, -0.4], fov: 40, glide: true }] },
  { id: 4, a: 246, b: 312, keys: [{ f: 246, pos: [0.1, 0.9, 2.6], look: [0, 0.6, 0], fov: 44 }, { f: 312, pos: [0.1, 0.8, 1.8], look: [0, 0.55, 0], fov: 42, glide: true }] },
  { id: 5, a: 308, b: 400, keys: CLOSE(308, 400) },
  { id: 6, a: 396, b: 450, keys: [{ f: 396, pos: [3, 2.6, 8], look: [0, 1.4, -1], fov: 50 }, { f: 450, pos: [1.6, 2, 6], look: [0, 1.3, -1], fov: 48, glide: true }] },
  { id: 7, a: 446, b: 492, keys: CLOSE(446, 492, 0.8) },
  { id: 8, a: 488, b: 612, keys: [{ f: 488, pos: [0.6, 1.7, 4.2], look: [0.3, 1.35, -0.3], fov: 48 }, { f: 612, pos: [0.5, 1.6, 3.4], look: [0.3, 1.3, -0.3], fov: 44, glide: true }] },
  { id: 9, a: 608, b: 648, keys: [{ f: 608, pos: [0.2, 1.4, 3.6], look: [0, 1.0, 0], fov: 46 }, { f: 648, pos: [0.2, 1.3, 3.0], look: [0, 1.0, 0], fov: 44, glide: true }] },
  { id: 10, a: 644, b: 800, keys: [{ f: 644, pos: [0.2, 1.1, 3.4], look: [0, 0.7, 0], fov: 46 }, { f: 800, pos: [0.2, 0.9, 2.2], look: [0, 0.6, 0], fov: 42, glide: true }] },
  { id: 11, a: 796, b: 846, keys: [{ f: 796, pos: [0.1, 0.8, 1.9], look: [0, 0.55, 0], fov: 42 }, { f: 846, pos: [0.1, 0.8, 2.5], look: [0, 0.6, 0], fov: 44, glide: true }] },
  { id: 12, a: 842, b: 904, keys: [{ f: 842, pos: [3, 2.2, 7], look: [0, 1.3, -1], fov: 50 }, { f: 904, pos: [2, 1.9, 5.6], look: [0, 1.3, -1], fov: 48, glide: true }] },
  { id: 13, a: 900, b: 996, keys: [{ f: 900, pos: [M + 0.4, 1.8, 5], look: [M, 1.3, -0.5], fov: 48 }, { f: 996, pos: [M + 0.3, 1.6, 3.6], look: [M, 1.3, -0.5], fov: 44, glide: true }] },
  { id: 14, a: 992, b: TOTAL, keys: [{ f: 992, pos: [0.6, 1.8, 4.2], look: [0.4, 1.4, -0.3], fov: 48 }, { f: TOTAL, pos: [0.4, 1.7, 3.2], look: [0.3, 1.45, -0.3], fov: 46, glide: true }] },
];
const K = kit(SHOTS, [{ f: 565, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.vienna || id === S.europe ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 64, label: "UN ROBOT", sub: "ganó a Napoleón al ajedrez", col: "#ffd23f", big: true },
  { a: 100, b: 190, label: "Viena", sub: "1770", col: "#ffffff" },
  { a: 400, b: 448, label: "80 años", sub: "de gira por Europa", col: "#ffffff" },
  { a: 860, b: 900, label: "décadas", sub: "sin que nadie lo supiera", col: "#ffffff" },
  { a: 925, b: 990, label: "1854", col: "#ffffff" },
  { a: 1004, b: TOTAL, label: "UN ROBOT", sub: "ganó a Napoleón al ajedrez", col: "#ffd23f", big: true },
];
