// "Norton I, Emperador de EE. UU." (1859-1880), 34.5 s. Words: emperador 29 · Unidos 52 · rollo 92 · San Francisco 110 · 1859 127 · Norton 175 ·
// arroz 220 · carta 257 · periódicos 270 · Emperador 300 · periódico 350 · publica 366 · uniforme 403 · charreteras 428 · sable 445 · plumas 469 ·
// pasea 488 · calles 530 · dinero 567 · bares 588 · aceptan 597 · Congreso 636 · caso 670 · puente 716 · bahía 742 · existe 762 · suerte 781 ·
// adoraba 815 · murió 836 · treinta mil 848 · entierro 885 · desgracia 903 · nada 936 · veinte 961 · emperador 989 · Unidos 1013
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1036;
export const W = { norton: 175, arroz: 220, carta: 257, emperador: 300, publica: 366, uniforme: 403, charreteras: 428, sable: 445, plumas: 469,
  pasea: 488, dinero: 567, bares: 588, aceptan: 597, congreso: 636, caso: 670, puente: 716, existe: 762, adoraba: 815, murio: 836, treinta: 848,
  entierro: 885, desgracia: 903, nada: 936 };
export const S = { hook: 1, sf: 2, rice: 3, letter: 4, paper: 5, dress: 6, walk: 7, money: 8, congress: 9, bridge: 10, loved: 11, funeral: 12, never: 13, end: 14 };
export const NEWS: V3 = [40, 0, 0], BAR: V3 = [-40, 0, 0], CAP: V3 = [80, 0, 0], BAY: V3 = [130, 0, 0];
const N = NEWS[0], B = BAR[0], C = CAP[0], Y = BAY[0];
const CL = (x: number, a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [x + 0.3, 1.6, 4.0], look: [x, 1.35, 0], fov: 46 }, { f: b, pos: [x + 0.3, 1.55, 3.0], look: [x, 1.4, 0], fov: 42, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, keys: [{ f: 0, pos: [0.3, 1.7, 2.4], look: [0, 1.55, 0], fov: 42 }, { f: 100, pos: [0.5, 1.8, 4.2], look: [0, 1.4, -0.4], fov: 48, glide: true }] },
  { id: 2, a: 96, b: 184, keys: [{ f: 96, pos: [6, 4, 13], look: [0, 2, -3], fov: 52 }, { f: 184, pos: [2, 2.4, 8], look: [0, 1.6, -2], fov: 50, glide: true }] },
  { id: 3, a: 180, b: 236, keys: CL(0, 180, 236) },
  { id: 4, a: 232, b: 344, keys: CL(N, 232, 344) },
  { id: 5, a: 340, b: 380, keys: [{ f: 340, pos: [N + 4, 1.5, 1.4], look: [N + 4, 1.5, -1], fov: 44 }, { f: 380, pos: [N + 4, 1.5, 0.8], look: [N + 4, 1.5, -1], fov: 40, glide: true }] },
  { id: 6, a: 376, b: 484, keys: [{ f: 376, pos: [0.2, 1.3, 2.4], look: [0, 1.0, 0], fov: 44 }, { f: 430, pos: [0.2, 1.7, 2.6], look: [0, 1.5, 0], fov: 44, glide: true }, { f: 484, pos: [0.3, 2.0, 2.2], look: [0, 1.9, 0], fov: 42, glide: true }] },
  { id: 7, a: 480, b: 545, keys: [{ f: 480, pos: [-2, 1.6, 4.4], look: [-1.6, 1.3, 0], fov: 46 }, { f: 545, pos: [1.2, 1.6, 4.4], look: [1.0, 1.3, 0], fov: 46, glide: true }] },
  { id: 8, a: 541, b: 610, keys: CL(B, 541, 610) },
  { id: 9, a: 606, b: 694, keys: [{ f: 606, pos: [C + 4, 4, 14], look: [C, 3, -4], fov: 50 }, { f: 650, pos: [C + 0.4, 1.7, 4.2], look: [C, 1.4, 0], fov: 46, glide: true }, { f: 694, pos: [C + 0.3, 1.6, 3.4], look: [C, 1.4, 0], fov: 44, glide: true }] },
  { id: 10, a: 690, b: 776, keys: [{ f: 690, pos: [Y - 8, 3, 18], look: [Y, 4, -10], fov: 50 }, { f: 776, pos: [Y - 4, 2.4, 14], look: [Y, 5, -10], fov: 52, glide: true }] },
  { id: 11, a: 772, b: 830, keys: [{ f: 772, pos: [0.4, 1.8, 5.2], look: [0, 1.3, -0.5], fov: 48 }, { f: 830, pos: [0.3, 1.7, 4.2], look: [0, 1.35, -0.5], fov: 46, glide: true }] },
  { id: 12, a: 826, b: 900, keys: [{ f: 826, pos: [6, 5, 12], look: [0, 1, -2], fov: 50 }, { f: 900, pos: [3, 3.5, 9], look: [0, 1, -2], fov: 50, glide: true }] },
  { id: 13, a: 896, b: 948, keys: CL(C, 896, 948) },
  { id: 14, a: 944, b: TOTAL, keys: [{ f: 944, pos: [0.5, 1.8, 4.2], look: [0, 1.4, -0.4], fov: 48 }, { f: TOTAL, pos: [0.3, 1.7, 2.4], look: [0, 1.55, 0], fov: 42, glide: true }] },
];
const K = kit(SHOTS, [{ f: 366, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.sf || id === S.bridge || id === S.funeral ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 64, label: "EMPERADOR", sub: "de EE. UU. (porque él lo dijo)", col: "#ffd23f", big: true },
  { a: 100, b: 176, label: "San Francisco", sub: "1859", col: "#ffffff" },
  { a: 742, b: 776, label: "hoy existe", col: "#ffffff" },
  { a: 848, b: 898, label: "30.000 personas", col: "#ffd23f" },
  { a: 960, b: TOTAL, label: "EMPERADOR", sub: "de EE. UU. (porque él lo dijo)", col: "#ffd23f", big: true },
];
