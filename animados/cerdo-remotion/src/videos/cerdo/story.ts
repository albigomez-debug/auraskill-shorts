// "La guerra del cerdo" (San Juan Island, 1859), 39 s. Words: guerra 75 · cerdo 93 · 1859 106 · Isla 147 · suya 218 · granjero 234 ·
// cerdo 270 · patatas 296 · pum 317 · Pero 347 · irlandés 372 · británicos 409 · amenazan 432 · lía 480 · soldados 518 · buques 569 ·
// dos mil 600 · cuatrocientos 631 · Cañones 668 · disparo 727 · suerte 746 · almirante 762 · cerdo 832 · desgracia 849 · tarde 891 ·
// doce años 931 · fiestas 973 · víctima 1013 · cerdo 1056 · Estados 1079 · guerra 1151
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1168;
export const W = { isla: 147, granjero: 234, cerdo: 270, patatas: 296, pum: 317, pero: 347, irlandes: 372, amenazan: 432, lia: 480,
  soldados: 518, buques: 569, dosmil: 600, cuatro: 631, canones: 668, disparo: 727, suerte: 746, almirante: 762, yo: 797, desgracia: 849,
  tarde: 891, doce: 931, fiestas: 973, victima: 1013, cerdo2: 1056, estados: 1079 };
export const S = { hook: 1, island: 2, potato: 3, owner: 4, armies: 5, fleet: 6, stand: 7, admiral: 8, dead: 9, party: 10, end: 11 };
export const SHIP: V3 = [0, 0, -70];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 104, sunAz: 130, keys: [
    { f: 0, pos: [0, 1.0, 4.2], look: [0, 0.8, 0], fov: 46 },
    { f: 104, pos: [0, 0.8, 3.0], look: [0, 0.6, 0], fov: 42, glide: true },
  ] },
  { id: 2, a: 100, b: 228, sunAz: 120, keys: [
    { f: 100, pos: [10, 26, 40], look: [0, 0, -10], fov: 50 },
    { f: 228, pos: [3, 5, 12], look: [0, 0.8, -1], fov: 46, glide: true },
  ] },
  { id: 3, a: 224, b: 345, sunAz: 130, keys: [
    { f: 224, pos: [-0.3, 1.4, 5.0], look: [-0.1, 1.0, -0.5], fov: 44 },
    { f: 310, pos: [0.1, 1.1, 4.2], look: [0.1, 0.7, -0.5], fov: 42, glide: true },
    { f: 345, pos: [0.2, 1.0, 3.8], look: [0.2, 0.6, -0.5], fov: 40, glide: true },
  ] },
  { id: 4, a: 341, b: 488, sunAz: 130, keys: [
    { f: 341, pos: [1.5, 1.5, 5.2], look: [0.8, 1.1, 0], fov: 44 },
    { f: 488, pos: [0.6, 1.4, 3.8], look: [0.6, 1.2, 0], fov: 42, glide: true },
  ] },
  { id: 5, a: 484, b: 556, sunAz: 120, keys: [
    { f: 484, pos: [-2, 1.4, 6], look: [-5, 1.2, -2], fov: 46 },
    { f: 556, pos: [-3, 1.6, 4], look: [-6, 1.3, -3], fov: 44, glide: true },
  ] },
  { id: 6, a: 552, b: 664, sunAz: 110, keys: [
    { f: 552, pos: [6, 3, -20], look: [0, 3, -70], fov: 46 },
    { f: 664, pos: [8, 2.5, -32], look: [0, 3, -70], fov: 44, glide: true },
  ] },
  { id: 7, a: 660, b: 742, sunAz: 120, keys: [
    { f: 660, pos: [0, 1.5, 7], look: [0, 1.1, 0], fov: 50 },
    { f: 742, pos: [0, 1.2, 5.2], look: [0, 1.0, 0], fov: 48, glide: true },
  ] },
  { id: 8, a: 738, b: 845, sunAz: 120, keys: [
    { f: 738, pos: [0.6, 4.2, -63], look: [0, 3.7, -70], fov: 44 },
    { f: 845, pos: [0.3, 3.9, -65.8], look: [0, 3.7, -70], fov: 40, glide: true },
  ] },
  { id: 9, a: 841, b: 904, sunAz: 130, keys: [
    { f: 841, pos: [0.4, 0.9, 2.6], look: [0, 0.4, 0], fov: 42 },
    { f: 904, pos: [0.2, 0.8, 2.0], look: [0, 0.35, 0], fov: 40, glide: true },
  ] },
  { id: 10, a: 900, b: 1000, sunAz: 130, keys: [
    { f: 900, pos: [0, 2.2, 9], look: [0, 1.2, 0], fov: 46 },
    { f: 1000, pos: [0.5, 1.6, 6.5], look: [0, 1.2, 0], fov: 44, glide: true },
  ] },
  { id: 11, a: 996, b: TOTAL, sunAz: 130, keys: [
    { f: 996, pos: [0, 1.0, 3.0], look: [0, 0.9, 0], fov: 42 },
    { f: 1075, pos: [0, 1.6, 3.0], look: [0, 1.6, 0], fov: 42, glide: true },
    { f: TOTAL, pos: [0, 1.0, 4.4], look: [0, 0.8, 0], fov: 46, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 317, k: 0.07 }, { f: 480, k: 0.04 }, { f: 668, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.island || id === S.fleet ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 98, label: "¿GUERRA?", sub: "por un cerdo", col: "#ff3b3b", big: true },
  { a: 104, b: 220, label: "Isla de San Juan", sub: "1859", col: "#ffffff" },
  { a: 598, b: 666, label: "2.000 vs 400", sub: "británicos contra americanos", col: "#ffd23f" },
  { a: 928, b: 994, label: "12 AÑOS", sub: "de fiesta", col: "#ffd23f" },
  { a: 1080, b: TOTAL, label: "¿GUERRA?", sub: "por un cerdo", col: "#ff3b3b", big: true },
];
