// Pimpín 8 · "Vozarrón", 38.9 s. Words: hola 20 · roto 36 · ventanas 53 · bajito 111 · menos 132 · Pimpín 139 · Ja 155/165/174 · vozarrón 205 · susurra 232 · caen 250 · hojas 261 ·
// canta 301 · ducha 312 · oyen 327 · lado 350 · bosteza 375 · palomas 393 · mudan 406 · biblioteca 437 · silla 462 · Fuera 489 · niebla 521 · monte 549 · niños 567 · camino 608 ·
// Linternas 636 · Silbatos 660 · Campanas 684 · Nada 705 · oye 741 · espera 766 · Pimpín 788 · Coge 805 · grita 825 · POR 837 · AQUÍIII 841 · Vuelven 860 · niños 875 · profe 903 ·
// rebaño 933 · ovejas 946 · nadie 969 · Porque 985 · Pimpín 1050 · Y 1068 · dale 1094
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1166;
export const W = { hola: 20, roto: 36, caen: 250, bosteza: 373, niebla: 519, linternas: 636, silbatos: 660, campanas: 684, nada: 705, coge: 805, grita: 835, profe: 903, ovejas: 946, dale: 1094 };
export const S = { hook: 1, whisper: 2, ja: 3, voz: 4, leaves: 5, shower: 6, yawn: 7, library: 8, fog: 9, lost: 10, shout: 11, back: 12, end: 13, cta: 14 };
export const GOLD: number[] = [];
export const M: V3 = [0, 0, -70];
const mz = M[2];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 2.2, 7.4], look: [0, 2.6, -2], fov: 56 }, { f: b, pos: [0, 2.0, 6.2], look: [0, 2.4, -1], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 82, keys: hk(0, 82) },
  { id: 2, a: 80, b: 152, keys: [{ f: 80, pos: [-1, 2.0, 7.6], look: [-1, 1.6, 1.6], fov: 54 }, { f: 152, pos: [0.5, 2.0, 7.0], look: [0.5, 1.6, 1.6], fov: 54, glide: true }] },
  { id: 3, a: 150, b: 186, keys: [{ f: 150, pos: [0, 2.4, 9], look: [0, 1.6, 1.5], fov: 54 }, { f: 186, pos: [0.1, 2.1, 7.8], look: [0.1, 1.5, 1.5], fov: 52, glide: true }] },
  { id: 4, a: 184, b: 226, keys: [{ f: 184, pos: [0, 1.6, 5.6], look: [0, 1.5, 2.6], fov: 50 }, { f: 226, pos: [0, 1.6, 4.6], look: [0, 1.6, 2.6], fov: 46, glide: true }] },
  { id: 5, a: 224, b: 294, keys: [{ f: 224, pos: [-9.0, 2.0, 2.4], look: [-10.4, 2.4, -4], fov: 56 }, { f: 294, pos: [-9.2, 2.2, 1.6], look: [-10.4, 2.6, -4], fov: 54, glide: true }] },
  { id: 6, a: 292, b: 366, keys: [{ f: 292, pos: [-5.6, 1.7, 6.0], look: [-5.8, 1.6, 2.0], fov: 52 }, { f: 366, pos: [-5.6, 1.8, 5.0], look: [-5.8, 1.7, 2.0], fov: 50, glide: true }] },
  { id: 7, a: 364, b: 424, keys: [{ f: 364, pos: [0, 1.8, 6.6], look: [0, 1.9, 2.6], fov: 54 }, { f: 424, pos: [0, 2.2, 7.4], look: [0, 2.8, 2.6], fov: 56, glide: true }] },
  { id: 8, a: 422, b: 502, keys: [{ f: 422, pos: [3.2, 3.0, 1.0], look: [3.2, 3.2, -8], fov: 54 }, { f: 470, pos: [3.4, 2.4, -0.6], look: [3.5, 2.2, -7.5], fov: 54, glide: true }, { f: 502, pos: [3.5, 2.2, -1.4], look: [3.6, 2.0, -7.5], fov: 52, glide: true }] },
  { id: 9, a: 500, b: 630, keys: [{ f: 500, pos: [0, 6, mz + 16], look: [0, 2, mz - 4], fov: 56 }, { f: 630, pos: [0, 2.2, mz + 9], look: [0, 1.2, mz + 1.6], fov: 54, glide: true }] },
  { id: 10, a: 628, b: 762, keys: [{ f: 628, pos: [-0.8, 1.4, mz + 7], look: [-0.6, 1.0, mz + 2], fov: 54 }, { f: 700, pos: [0.8, 1.4, mz + 7], look: [0.8, 1.0, mz + 2], fov: 54, glide: true }, { f: 762, pos: [0, 2.0, mz + 9], look: [0, 1.2, mz + 1.6], fov: 56, glide: true }] },
  { id: 11, a: 760, b: 862, keys: [{ f: 760, pos: [0, 2.2, 8.4], look: [0, 1.6, 1.6], fov: 54 }, { f: 830, pos: [0, 1.7, 4.8], look: [0, 1.7, 1.6], fov: 48, glide: true }, { f: 862, pos: [0, 2.0, 7.2], look: [0, 2.0, 1.6], fov: 56, glide: true }] },
  { id: 12, a: 860, b: 987, keys: [{ f: 860, pos: [-0.5, 1.8, 7.4], look: [-0.5, 1.1, 1], fov: 56 }, { f: 987, pos: [1.0, 1.7, 6.6], look: [1.4, 1.0, 0.6], fov: 54, glide: true }] },
  { id: 13, a: 985, b: 1070, keys: hk(985, 1070) },
  { id: 14, a: 1068, b: TOTAL, keys: [{ f: 1068, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 20, k: 0.05 }, { f: 36, k: 0.06 }, { f: 205, k: 0.03 }, { f: 375, k: 0.03 }, { f: 837, k: 0.08 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.fog || id === S.lost ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 80, label: "¡HOLA!", sub: "...y adiós ventanas", col: "#ff3b3b", big: true },
  { a: 320, b: 362, label: "SE OYE", sub: "en el pueblo de al lado", col: "#ffd23f" },
  { a: 487, b: 502, label: "FUERA", sub: "su silla especial", col: "#ffffff" },
  { a: 634, b: 658, label: "LINTERNAS", sub: "", col: "#ffffff" },
  { a: 658, b: 682, label: "SILBATOS", sub: "", col: "#ffffff" },
  { a: 682, b: 703, label: "CAMPANAS", sub: "", col: "#ffffff" },
  { a: 703, b: 730, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 835, b: 862, label: "¡POR AQUÍIII!", sub: "", col: "#ffd23f", big: true },
  { a: 985, b: 1066, label: "¡HOLA!", sub: "...y adiós ventanas", col: "#ff3b3b", big: true },
];
