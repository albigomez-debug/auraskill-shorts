// Pimpín 19 · "Soplador", 40.3 s. Words: apagado 37 · velas 51 · tarta 63 · plaza 98 · soplan 127 · menos 156 · Pimpín 162 · huracán 215 · Sopla 232 · sopa 246 · pared 280 · Infla 292 ·
// globo 305 · volando 333 · sopló 369 · león 387 · despeinó 398 · pueblo 418 · concurso 453 · cometas 467 · vecino 495 · viento 550 · Corren 567 · Nada 604 · tiran 627 · arriba 639 · Nada 654 ·
// alcaldesa 676 · tejado 703 · cae 731 · alcalde 749 · vecino 758 · Pimpín 797 · aire 814 · Mucho 826 · Muchísimo 849 · Fuuu 877 · vuelan 925 · vecino 966 · aterrizan 981 · estanque 999 ·
// Porque 1018 · Pimpín 1094 · Y 1111 · dale 1138
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1209;
export const W = { sopla0: 34, velas: 49, sopa: 230, pared: 244, infla: 292, volando: 326, leon: 367, tiran: 625, alcaldesa: 674, cae: 729, mucho: 826, fuuu: 875, aterrizan: 979, dale: 1138 };
export const S = { hook: 1, premise: 2, soup: 3, balloon: 4, dandelion: 5, contest: 6, tries: 7, breathe: 8, fly: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 2.6, 9.4], look: [0, 1.2, 1], fov: 56 }, { f: b, pos: [0, 2.3, 8.4], look: [0, 1.2, 1], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 112, keys: hk(0, 112) },
  { id: 2, a: 110, b: 178, keys: [{ f: 110, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 178, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 176, b: 292, keys: [{ f: 176, pos: [-3.2, 1.7, -0.8], look: [-3.2, 1.3, -7.6], fov: 54 }, { f: 292, pos: [-3.2, 1.7, -1.6], look: [-3.2, 1.4, -7.6], fov: 52, glide: true }] },
  { id: 4, a: 290, b: 358, keys: [{ f: 290, pos: [1.0, 1.6, 6.0], look: [1.0, 1.3, 2.0], fov: 52 }, { f: 358, pos: [1.0, 2.4, 6.8], look: [1.0, 2.6, 2.0], fov: 56, glide: true }] },
  { id: 5, a: 356, b: 433, keys: [{ f: 356, pos: [0, 2.0, 8.6], look: [0, 1.4, 1.2], fov: 56 }, { f: 433, pos: [0.3, 2.0, 7.8], look: [0.3, 1.5, 1.2], fov: 54, glide: true }] },
  { id: 6, a: 431, b: 567, keys: [{ f: 431, pos: [0, 3.2, 11], look: [0, 2.6, -2], fov: 58 }, { f: 567, pos: [0, 2.2, 9.4], look: [0, 1.4, 0.5], fov: 56, glide: true }] },
  { id: 7, a: 565, b: 777, keys: [{ f: 565, pos: [-1, 2.0, 8.6], look: [-0.5, 1.4, 0.5], fov: 56 }, { f: 665, pos: [0.5, 2.6, 9.0], look: [0.5, 2.0, 0], fov: 56, glide: true }, { f: 700, pos: [2.5, 3.6, 2.0], look: [3.0, 6.6, -8.6], fov: 56, glide: true }, { f: 777, pos: [2.5, 2.0, 6.0], look: [2.6, 1.4, 0.5], fov: 54, glide: true }] },
  { id: 8, a: 775, b: 879, keys: [{ f: 775, pos: [0.2, 1.4, 4.8], look: [0.0, 1.0, 1.2], fov: 50 }, { f: 879, pos: [0.2, 1.3, 3.9], look: [0.0, 1.0, 1.2], fov: 46, glide: true }] },
  { id: 9, a: 877, b: 1020, keys: [{ f: 877, pos: [-1.5, 1.6, 6.5], look: [1, 3.5, -1], fov: 60 }, { f: 960, pos: [0, 3.0, 10], look: [1, 5, -1], fov: 62, glide: true }, { f: 980, pos: [4.2, 2.2, 8.0], look: [5.0, 0.8, 2.6], fov: 56, glide: true }] },
  { id: 10, a: 1018, b: 1113, keys: hk(1018, 1113) },
  { id: 11, a: 1111, b: TOTAL, keys: [{ f: 1111, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 49, k: 0.03 }, { f: 244, k: 0.03 }, { f: 731, k: 0.04 }, { f: 877, k: 0.07 }, { f: 1067, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.contest || id === S.fly ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 106, label: "¡FUUU!", sub: "desde la otra punta", col: "#9ad4ff", big: true },
  { a: 395, b: 430, label: "¡DESPEINADOS!", sub: "", col: "#ff8a2a", big: true },
  { a: 530, b: 565, label: "VIENTO: 0", sub: "", col: "#ff3b3b", big: true },
  { a: 602, b: 618, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 652, b: 668, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 824, b: 846, label: "MUCHO AIRE", sub: "", col: "#9ad4ff" },
  { a: 847, b: 875, label: "MUCHÍSIMO", sub: "", col: "#9ad4ff", big: true },
  { a: 875, b: 920, label: "¡FUUU!", sub: "", col: "#9ad4ff", big: true },
  { a: 1018, b: 1106, label: "¡FUUU!", sub: "desde la otra punta", col: "#9ad4ff", big: true },
];
void smooth;
