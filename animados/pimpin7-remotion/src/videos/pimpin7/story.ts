// Pimpín 7 · "Dormilón", 38.2 s. Words: dormido 25 · pie 41 · boda 65 · era 83 · suya 89 · madrugan 129 · menos 149 · Pimpín 156 · Ja 172/181/191 · duerme 218 · autobús 258 ·
// cola 284 · pan 294 · durmió 322 · estornudaba 339 · despertador 370 · suena 392 · rendido 432 · reta 487 · concurso 512 · estatuas 527 · mueva 560 · pierde 571 · hora 595 ·
// horas 616 · rasca 638 · ríe 667 · alcaldesa 694 · estornuda 733 · Solo 752 · Pimpín 781 · moverse 805 · parpadear 830 · pelo 860 · trofeo 887 · decirle 921 · roncando 954 ·
// Porque 973 · Pimpín 1032 · Y 1049 · dale 1075
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1147;
export const W = { suya: 87, estornudaba: 339, ya: 385, rendido: 430, rasca: 638, rie: 667, estornuda: 733, trofeo: 885, roncando: 952, dale: 1075 };
export const S = { hook: 1, early: 2, ja: 3, bus: 4, bread: 5, clock: 6, dare: 7, statues: 8, solo: 9, prize: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [-0.3, 1.9, 7.0], look: [-0.2, 1.5, 1.6], fov: 52 }, { f: b, pos: [-0.5, 1.8, 5.2], look: [-0.5, 1.6, 1.8], fov: 48, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 104, keys: hk(0, 104) },
  { id: 2, a: 102, b: 172, keys: [{ f: 102, pos: [-2, 2.2, 9], look: [-3.5, 1.2, 1.5], fov: 54 }, { f: 172, pos: [-6.0, 1.6, 6.6], look: [-6.6, 0.9, 2.4], fov: 50, glide: true }] },
  { id: 3, a: 170, b: 206, keys: [{ f: 170, pos: [0, 2.4, 9], look: [0, 1.6, 1.5], fov: 54 }, { f: 206, pos: [0.1, 2.1, 7.8], look: [0.1, 1.5, 1.5], fov: 52, glide: true }] },
  { id: 4, a: 204, b: 276, keys: [{ f: 204, pos: [-6.2, 1.6, 7.0], look: [-6.3, 1.4, 2.4], fov: 50 }, { f: 276, pos: [-6.3, 1.5, 6.0], look: [-6.3, 1.3, 2.4], fov: 48, glide: true }] },
  { id: 5, a: 274, b: 360, keys: [{ f: 274, pos: [0.6, 1.9, 7.4], look: [0.6, 1.4, 1.6], fov: 52 }, { f: 360, pos: [1.6, 1.8, 5.6], look: [2.0, 1.6, 1.4], fov: 50, glide: true }] },
  { id: 6, a: 358, b: 452, keys: [{ f: 358, pos: [0.3, 1.5, 6.4], look: [0.4, 1.2, 2.6], fov: 50 }, { f: 452, pos: [0.5, 1.2, 4.8], look: [0.6, 1.0, 2.6], fov: 48, glide: true }] },
  { id: 7, a: 450, b: 585, keys: [{ f: 450, pos: [0, 4.5, 9], look: [0, 3.6, -6], fov: 54 }, { f: 530, pos: [0, 2.6, 8.5], look: [0, 2.6, -4], fov: 54, glide: true }, { f: 585, pos: [0, 2.0, 9.5], look: [0, 1.4, 0.6], fov: 56, glide: true }] },
  { id: 8, a: 583, b: 752, keys: [{ f: 583, pos: [-1.2, 2.0, 7.4], look: [-1.6, 1.4, 0.6], fov: 56 }, { f: 660, pos: [-2.4, 1.8, 6.0], look: [-2.8, 1.5, 0.6], fov: 54, glide: true }, { f: 752, pos: [-0.8, 1.9, 6.4], look: [-0.6, 1.5, 0.6], fov: 54, glide: true }] },
  { id: 9, a: 750, b: 872, keys: [{ f: 750, pos: [-0.6, 1.8, 6.6], look: [-0.6, 1.5, 2.2], fov: 52 }, { f: 872, pos: [-0.6, 1.7, 4.6], look: [-0.6, 1.6, 2.2], fov: 46, glide: true }] },
  { id: 10, a: 870, b: 975, keys: [{ f: 870, pos: [-0.4, 2.0, 7.2], look: [-0.5, 1.6, 2.2], fov: 52 }, { f: 975, pos: [-0.5, 1.9, 5.6], look: [-0.5, 1.7, 2.2], fov: 50, glide: true }] },
  { id: 11, a: 973, b: 1050, keys: hk(973, 1050) },
  { id: 12, a: 1048, b: TOTAL, keys: [{ f: 1048, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 733, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.dare || id === S.early ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 100, label: "¡DORMIDO!", sub: "en su propia boda", col: "#ff3b3b", big: true },
  { a: 336, b: 362, label: "¡ACH... ZZZ!", sub: "", col: "#9ad4ff" },
  { a: 412, b: 448, label: "SE HA RENDIDO", sub: "el despertador", col: "#ffffff" },
  { a: 545, b: 583, label: "EL QUE SE MUEVA", sub: "pierde", col: "#ffd23f" },
  { a: 593, b: 605, label: "1 HORA", sub: "", col: "#ffffff" },
  { a: 606, b: 630, label: "2 HORAS", sub: "", col: "#ffffff" },
  { a: 797, b: 870, label: "NI UN PELO", sub: "sin moverse", col: "#8ae86a" },
  { a: 935, b: 970, label: "3 HORAS", sub: "roncando", col: "#9ad4ff" },
  { a: 973, b: 1046, label: "¡DORMIDO!", sub: "en su propia boda", col: "#ff3b3b", big: true },
];
