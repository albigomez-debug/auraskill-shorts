// Pimpín 11 · "Hipo", 43.3 s. Words: tiene 12 · levanta 41 · suelo 62 · todos 92 · tierra 118 · menos 136 · Pimpín 142 · hipo 177 · Bebe 211 · revés 229 · volando 249 · vaso 260 ·
// susto 290 · y 303 · asusta 312 · pueblo 328 · misa 370 · campana 390 · cabeza 406 · madre 437 · piedras 454 · bolsillos 469 · fiesta 512 · globo 538 · escapa 559 · enganchado 588 ·
// campanario 624 · gato 656 · alcaldesa 667 · cuerda 696 · Escaleras 713 · cortas 743 · cuerda 768 · corta 791 · Nada 805 · espera 827 · hipo 860 · Hip 873 · Hip 903 · Hip 937 ·
// campanario 951 · Coge 971 · gato 983 · globo 1004 · baja 1017 · flotando 1023 · paracaídas 1043 · gato 1072 · encantado 1083 · Porque 1106 · Pimpín 1182 · Y 1199 · dale 1226
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1298;
export const W = { vuela: 247, bu: 283, hip4: 301, asusta: 312, campana: 388, piedras: 452, hip6: 467, escapa: 556, atasco: 603, gato: 650, alc: 665, escalera: 713, cortas: 741, cuerda: 762, corta: 789, nada: 803, coge: 971, globo: 1000, baja: 1017, suelo: 1095, cheer: 1060, dale: 1226 };
export const S = { hook: 1, premise: 2, water: 3, scare: 4, misa: 5, stones: 6, balloon: 7, ladders: 8, ascent: 9, rescue: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
export const TW: V3 = [-5, 0, -4.5];
export const TOP: V3 = [-3.7, 17.6, -2.6];
export const CAT: V3 = [-3.4, 14.2, -2.1];
/** one hiccup: up in 6 frames to h, hang, back down over 14 (hold = stay up) */
export const hop = (f: number, f0: number, h: number, hold = false) => {
  if (f < f0) return 0; const u = smooth((f - f0) / 6); if (hold) return h * u;
  return h * Math.min(u, 1 - smooth((f - f0 - 12) / 14));
};
/** Pimpín's height in the bell-tower climb */
export const climbY = (f: number) => f < 871 ? 0 : f < 901 ? 1 * smooth((f - 871) / 7) : f < 935 ? 1 + 2 * smooth((f - 901) / 8) : 3 + 10.6 * smooth((f - 935) / 15);
/** after the rescue: float down [x, y, z] */
export const floatAt = (f: number): V3 => { const s = smooth((f - W.baja) / (W.suelo - W.baja)); return [-2.4 + 2.9 * s, 13.6 * (1 - s), -1.6 + 3.6 * s]; };
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.5, 1.5, 6.8], look: [0.5, 1.4, 2.5], fov: 52 }, { f: b, pos: [0.8, 1.6, 6.0], look: [0.6, 1.6, 2.5], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 75, keys: hk(0, 75) },
  { id: 2, a: 73, b: 158, keys: [{ f: 73, pos: [-4, 0.45, 5.2], look: [-4, 0.4, 1], fov: 50 }, { f: 120, pos: [-1.5, 0.8, 6.5], look: [-1.5, 0.9, 1], fov: 52, glide: true }, { f: 158, pos: [0.5, 2.0, 8.8], look: [0.3, 1.8, 1], fov: 56, glide: true }] },
  { id: 3, a: 156, b: 275, keys: [{ f: 156, pos: [2, 1.4, 6.6], look: [2, 1.2, 3], fov: 50 }, { f: 240, pos: [2.1, 1.5, 5.8], look: [2, 1.4, 3], fov: 48, glide: true }, { f: 275, pos: [2.3, 2.2, 7.4], look: [2, 2.6, 3], fov: 56, glide: true }] },
  { id: 4, a: 273, b: 342, keys: [{ f: 273, pos: [-1, 1.8, 7.6], look: [-1.2, 1.4, 1.5], fov: 54 }, { f: 342, pos: [-0.6, 1.9, 7.0], look: [-1, 1.5, 1.5], fov: 52, glide: true }] },
  { id: 5, a: 340, b: 421, keys: [{ f: 340, pos: [-5, 1.7, 3.2], look: [-5, 1.5, -1.8], fov: 52 }, { f: 421, pos: [-4.8, 1.9, 2.4], look: [-5, 1.9, -1.8], fov: 48, glide: true }] },
  { id: 6, a: 419, b: 489, keys: [{ f: 419, pos: [2.1, 1.5, 6.2], look: [2.1, 1.2, 2.2], fov: 50 }, { f: 489, pos: [2.0, 1.2, 5.0], look: [1.8, 0.9, 2.3], fov: 48, glide: true }] },
  { id: 7, a: 487, b: 711, keys: [{ f: 487, pos: [1, 2.0, 9], look: [1, 2.4, 0], fov: 54 }, { f: 556, pos: [1, 2.0, 9.4], look: [1, 3.2, 0], fov: 56, glide: true }, { f: 610, pos: [1, 3, 12], look: [-3, 10, -3], fov: 62, glide: true }, { f: 660, pos: [-1.8, 9.5, 6], look: [-3.5, 15, -2.4], fov: 48, glide: true }, { f: 711, pos: [-0.6, 3.2, 9.5], look: [-3.0, 8, -2.4], fov: 62, glide: true }] },
  { id: 8, a: 709, b: 822, keys: [{ f: 709, pos: [1.6, 2.4, 8], look: [-3.4, 4.2, -2.6], fov: 60 }, { f: 822, pos: [1.0, 2.2, 7.2], look: [-2.6, 3.6, -2.0], fov: 58, glide: true }] },
  { id: 9, a: 820, b: 968, keys: [{ f: 820, pos: [1.2, 1.4, 5.2], look: [-2.4, 1.0, -1.6], fov: 52 }, { f: 880, pos: [1.0, 2.0, 4.8], look: [-2.4, 1.9, -1.6], fov: 52, glide: true }, { f: 912, pos: [1.0, 3.8, 5.0], look: [-2.4, 3.8, -1.6], fov: 54, glide: true }, { f: 952, pos: [1.6, 14.4, 5.6], look: [-3.0, 14.4, -2.0], fov: 52, glide: true }, { f: 968, pos: [1.4, 14.5, 5.2], look: [-3.0, 14.5, -2.0], fov: 50, glide: true }] },
  { id: 10, a: 966, b: 1102, keys: [{ f: 966, pos: [1.4, 14.6, 5.2], look: [-3.0, 14.8, -2.0], fov: 50 }, { f: 1017, pos: [1.2, 14.4, 5.6], look: [-2.6, 15.0, -1.8], fov: 54, glide: true }, { f: 1095, pos: [1.4, 1.8, 7.2], look: [0.4, 1.6, 1.8], fov: 54, glide: true }, { f: 1102, pos: [1.4, 1.7, 6.9], look: [0.4, 1.5, 1.8], fov: 54, glide: true }] },
  { id: 11, a: 1100, b: 1201, keys: hk(1100, 1201) },
  { id: 12, a: 1199, b: TOTAL, keys: [{ f: 1199, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 12, k: 0.03 }, { f: 41, k: 0.03 }, { f: W.hip4, k: 0.04 }, { f: W.campana + 2, k: 0.06 }, { f: 873, k: 0.03 }, { f: 903, k: 0.03 }, { f: 937, k: 0.05 }, { f: 1112, k: 0.03 }, { f: 1140, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.balloon || id === S.ladders || id === S.rescue ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 70, label: "¡HIP!", sub: "+1 metro", col: "#ffd23f", big: true },
  { a: 247, b: 272, label: "¡VASO AL AIRE!", sub: "", col: "#3a9ad8" },
  { a: 386, b: 418, label: "¡DONG!", sub: "", col: "#ffd23f", big: true },
  { a: 450, b: 486, label: "+5 KG", sub: "de piedras", col: "#ff3b3b" },
  { a: 741, b: 760, label: "MUY CORTAS", sub: "", col: "#ff3b3b" },
  { a: 789, b: 818, label: "MUY CORTA", sub: "", col: "#ff3b3b" },
  { a: 871, b: 898, label: "¡HIP!", sub: "1 metro", col: "#ffd23f", big: true },
  { a: 901, b: 932, label: "¡HIP!", sub: "3 metros", col: "#ffd23f", big: true },
  { a: 935, b: 966, label: "¡HIP!", sub: "¡el campanario!", col: "#ffd23f", big: true },
  { a: 1100, b: 1195, label: "¡HIP!", sub: "+1 metro", col: "#ffd23f", big: true },
];
void smooth;
