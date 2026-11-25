// Pimpín 21 · "Animales", 39.4 s. Words: gallina 33 · palabra 59 · razón 92 · animales 134 · menos 156 · Pimpín 162 · vacas 238 · problemas 261 · gato 286 · favor 315 · palomas 337 · barrendero 394 ·
// cerdos 433 · escapan 457 · Veinte 477 · Corriendo 504 · plaza 525 · boda 556 · granjero 575 · Nada 606 · comida 636 · comen 662 · corriendo 679 · novia 705 · grita 712 · pastel 747 · espera 771 ·
// Pimpín 787 · Oink 819/834/847 · fila 895 · granja 917 · último 942 · devuelve 954 · pastel 967 · Porque 985 · Pimpín 1065 · Y 1082 · dale 1109
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1181;
export const W = { palabra: 57, razon: 90, vacas: 236, gato: 284, favor: 313, barrendero: 392, escapan: 455, nada: 604, comida: 634, grita: 710, pastel: 745, oink: [817, 832, 845], fila: 893, devuelve: 952, dale: 1109 };
export const S = { hook: 1, premise: 2, zoo: 3, cows: 4, cat: 5, pigeons: 6, escape: 7, tries: 8, oink: 9, line: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 1.8, 6.2], look: [0, 1.2, 1], fov: 52 }, { f: b, pos: [0.1, 1.6, 5.0], look: [0, 1.2, 1], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 118, keys: hk(0, 118) },
  { id: 2, a: 116, b: 180, keys: [{ f: 116, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 180, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 178, b: 234, keys: M(178, 234, 0, 1.5) },
  { id: 4, a: 232, b: 282, keys: M(232, 282, 0, 1.5) },
  { id: 5, a: 280, b: 333, keys: M(280, 333, 0, 1.5, 5.5) },
  { id: 6, a: 331, b: 431, keys: M(331, 431, 0, 1.5) },
  { id: 7, a: 429, b: 565, keys: [{ f: 429, pos: [0, 3.2, 10.5], look: [0, 1.0, 0], fov: 58 }, { f: 565, pos: [0.4, 2.4, 9.0], look: [0.4, 1.0, 0], fov: 56, glide: true }] },
  { id: 8, a: 563, b: 771, keys: [{ f: 563, pos: [-0.5, 2.4, 9.0], look: [0, 1.0, 0], fov: 56 }, { f: 771, pos: [0.5, 2.0, 7.6], look: [0.5, 1.0, 0], fov: 54, glide: true }] },
  { id: 9, a: 769, b: 895, keys: [{ f: 769, pos: [0.2, 1.4, 4.8], look: [0.0, 1.1, 1.2], fov: 50 }, { f: 895, pos: [0.2, 1.3, 3.9], look: [0.0, 1.1, 1.2], fov: 46, glide: true }] },
  { id: 10, a: 893, b: 987, keys: [{ f: 893, pos: [0, 2.0, 6.8], look: [0.2, 0.8, 0.8], fov: 56 }, { f: 987, pos: [0.6, 1.8, 6.0], look: [0.6, 0.8, 0.8], fov: 54, glide: true }] },
  { id: 11, a: 985, b: 1084, keys: hk(985, 1084) },
  { id: 12, a: 1082, b: TOTAL, keys: [{ f: 1082, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 90, k: 0.03 }, { f: 455, k: 0.03 }, { f: 710, k: 0.04 }, { f: 745, k: 0.03 }, { f: 817, k: 0.03 }, { f: 832, k: 0.03 }, { f: 845, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.escape || id === S.tries || id === S.line ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 88, b: 114, label: "¡TIENE RAZÓN!", sub: "", col: "#ffd23f", big: true },
  { a: 475, b: 520, label: "20 CERDOS", sub: "", col: "#ff8ab0", big: true },
  { a: 604, b: 622, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 745, b: 769, label: "¡EL PASTEL!", sub: "", col: "#ff3b3b", big: true },
];
void smooth;
