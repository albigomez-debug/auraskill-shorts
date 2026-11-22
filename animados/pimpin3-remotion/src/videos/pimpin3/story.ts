// Pimpín 3 · "Súper flaco", 37.6 s. Words: bestias 36 · menos 55 · Pimpín 61 · Ja 77/87/96 · flaco 128 · lado 163 · desaparece 174 · viento 208 · atan 223 · farola 235 ·
// escondite 269 · escoba 313 · gana 327 · abuela 357 · tres 374 · macarrones 391 · come 428 · uno 435 · Uno 448 · macarrones 461 · alcaldesa 504 · cae 524 · llave 532 · rejilla 568 ·
// Nadie 607 · niño 640 · gato 664 · gato 687 · flaco 699 · espera 722 · Pimpín 738 · lado 759 · cuela 774 · barrotes 788 · carta 808 · buzón 821 · Sale 837 · llave 853 ·
// calcetín 872 · veinte 902 · años 910 · rana 931 · Porque 946 · Pimpín 1014 · Y 1031 · dale 1057
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1129;
export const W = { lado: 163, desaparece: 174, viento: 208, atan: 223, gana: 327, come: 428, uno1: 435, uno2: 448, cae: 524, rejilla: 568, nadie: 607, gato1: 664, gato2: 687, lado2: 759, cuela: 774, carta: 806, sale: 837, llave2: 853, calcetin: 872, anios: 902, rana: 931, dale: 1057 };
export const S = { hook: 1, ja: 2, side: 3, wind: 4, hide: 5, mac: 6, key: 7, nobody: 8, slip: 9, out: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
export const LP: V3 = [-6, 0, 3];
export const GR: V3 = [4, 0, 7.5];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 2.6, 9.4], look: [0, 1.6, 2.4], fov: 54 }, { f: b, pos: [0.1, 2.0, 7.0], look: [0, 1.5, 2.4], fov: 50, glide: true }];
const g0 = GR[0], g2 = GR[2];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 66, keys: hk(0, 66) },
  { id: 2, a: 64, b: 106, keys: [{ f: 64, pos: [0, 3.0, 10.5], look: [0, 1.6, 2.4], fov: 56 }, { f: 106, pos: [0, 2.6, 9.0], look: [0, 1.6, 2.4], fov: 54, glide: true }] },
  { id: 3, a: 104, b: 194, keys: [{ f: 104, pos: [0.1, 1.7, 10.0], look: [0, 1.4, 5.5], fov: 50 }, { f: 194, pos: [0.1, 1.7, 9.0], look: [0, 1.4, 5.5], fov: 48, glide: true }] },
  { id: 4, a: 192, b: 250, keys: [{ f: 192, pos: [-5.0, 2.2, 8.6], look: [-5.4, 1.8, 3], fov: 52 }, { f: 250, pos: [-5.2, 2.4, 8.0], look: [-5.4, 2.0, 3], fov: 50, glide: true }] },
  { id: 5, a: 248, b: 348, keys: [{ f: 248, pos: [-0.2, 2.0, 10.6], look: [-0.2, 1.5, 5.5], fov: 50 }, { f: 348, pos: [-0.2, 1.8, 9.6], look: [-0.2, 1.5, 5.5], fov: 48, glide: true }] },
  { id: 6, a: 346, b: 480, keys: [{ f: 346, pos: [-0.2, 2.0, 8.0], look: [-0.1, 1.4, 3], fov: 52 }, { f: 430, pos: [0.6, 1.7, 5.6], look: [0.7, 1.4, 2.6], fov: 48, glide: true }, { f: 480, pos: [0.3, 2.0, 7.0], look: [0.3, 1.8, 2.6], fov: 50, glide: true }] },
  { id: 7, a: 478, b: 605, keys: [{ f: 478, pos: [g0 - 0.4, 2.0, g2 + 4.8], look: [g0 - 0.5, 1.4, g2], fov: 52 }, { f: 540, pos: [g0 - 0.2, 1.8, g2 + 3.8], look: [g0 - 0.2, 1.0, g2], fov: 50, glide: true }, { f: 605, pos: [g0, 2.6, g2 + 2.8], look: [g0, 0.1, g2], fov: 50, glide: true }] },
  { id: 8, a: 603, b: 714, keys: [{ f: 603, pos: [g0, 2.2, g2 + 4.4], look: [g0, 0.8, g2 - 0.4], fov: 54 }, { f: 714, pos: [g0, 1.9, g2 + 3.6], look: [g0, 0.8, g2 - 0.4], fov: 50, glide: true }] },
  { id: 9, a: 712, b: 836, keys: [{ f: 712, pos: [g0, 2.0, g2 + 5.0], look: [g0, 1.4, g2], fov: 54 }, { f: 770, pos: [g0 + 0.2, 1.9, g2 + 4.2], look: [g0, 1.2, g2], fov: 50, glide: true }, { f: 836, pos: [g0, 2.8, g2 + 3.6], look: [g0, 0.6, g2], fov: 52, glide: true }] },
  { id: 10, a: 834, b: 946, keys: [{ f: 834, pos: [g0, 1.9, g2 + 4.2], look: [g0, 1.5, g2], fov: 52 }, { f: 946, pos: [g0, 1.9, g2 + 3.4], look: [g0, 1.6, g2], fov: 48, glide: true }] },
  { id: 11, a: 944, b: 1030, keys: hk(944, 1030) },
  { id: 12, a: 1028, b: TOTAL, keys: [{ f: 1028, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 174, k: 0.02 }, { f: 568, k: 0.02 }, { f: 774, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 60, label: "¡A COMER!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
  { a: 120, b: 160, label: "FLACO", sub: "muy flaco", col: "#ffd23f" },
  { a: 446, b: 478, label: "1 MACARRÓN", sub: "", col: "#ffd23f" },
  { a: 898, b: 928, label: "20 AÑOS", sub: "perdido", col: "#ffffff" },
  { a: 604, b: 712, label: "NADIE CABE", sub: "", col: "#ff3b3b" },
  { a: 946, b: 1026, label: "¡A COMER!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
];
