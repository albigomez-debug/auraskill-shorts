// "El pollo sin cabeza" (Mike, Fruita, Colorado 1945), 37 s. Words: pollo 9 · cabeza 52 · Colorado 100 · granjero 159 · cenar 208 ·
// Hachazo 222 · falla 243 · levanta 285 · andando 309 · siguiente 348 · vivo 370 · flipa 390 · Mike 414 · cuentagotas 446 · gira 510 ·
// veinticinco 539 · fortuna 604 · Fíjate 644 · cerebro 699 · respirar 763 · andar 777 · comer 789 · cantar 820 · pensar 867 ·
// suerte 886 · desgracia 932 · noche 951 · atragantó 961 · Olsen 981 · cuentagotas 1007 · así 1032 · cabeza 1091
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1110;
export const W = { colorado: 100, granjero: 159, cenar: 208, hachazo: 222, falla: 243, levanta: 285, andando: 309, vivo: 370, flipa: 390,
  mike: 414, gotas: 446, gira: 510, paga: 533, veinti: 539, fortuna: 604, fijate: 644, cerebro: 699, respirar: 763, andar: 777, comer: 789,
  cantar: 820, pensar: 867, suerte: 886, desgracia: 932, noche: 951, atraganto: 961, olsen: 981, gotas2: 1007, asi: 1032 };
export const S = { hook: 1, farm: 2, chop: 3, feed: 4, tour: 5, board: 6, life: 7, motel: 8, end: 9 };
export const STUMP: V3 = [0, 0, 0], TENT: V3 = [80, 0, 0], MOTEL: V3 = [-80, 0, 0], BOARD: V3 = [3, 0, -2];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, sunAz: 130, keys: [
    { f: 0, pos: [-0.9, 0.55, 3.1], look: [-0.3, 0.4, 0], fov: 44 },
    { f: 100, pos: [0.8, 0.5, 2.5], look: [0.9, 0.4, 0], fov: 40, glide: true },
  ] },
  { id: 2, a: 96, b: 218, sunAz: 120, keys: [
    { f: 96, pos: [3, 7, 22], look: [0, 1.5, -4], fov: 46 },
    { f: 218, pos: [0.6, 1.5, 5.2], look: [-0.2, 0.9, 0], fov: 42, glide: true },
  ] },
  { id: 3, a: 214, b: 336, sunAz: 130, keys: [
    { f: 214, pos: [0.4, 1.1, 3.4], look: [0, 0.7, 0], fov: 42 },
    { f: 270, pos: [0.6, 0.7, 2.6], look: [0.3, 0.5, 0], fov: 40, glide: true },
    { f: 336, pos: [1.6, 0.6, 2.4], look: [1.4, 0.4, 0], fov: 40, glide: true },
  ] },
  { id: 4, a: 332, b: 500, sunAz: 140, keys: [
    { f: 332, pos: [0.2, 1.4, 4.4], look: [0, 0.9, 0], fov: 44 },
    { f: 420, pos: [0.3, 1.1, 3.2], look: [0.2, 0.7, 0], fov: 42, glide: true },
    { f: 500, pos: [0.5, 0.8, 2.2], look: [0.4, 0.5, 0], fov: 40, glide: true },
  ] },
  { id: 5, a: 496, b: 640, sunAz: 120, keys: [
    { f: 496, pos: [80, 2.6, 11], look: [80, 1.8, 0], fov: 46 },
    { f: 640, pos: [79.4, 1.5, 5.4], look: [80, 1.2, 0], fov: 42, glide: true },
  ] },
  { id: 6, a: 636, b: 760, sunAz: 130, keys: [
    { f: 636, pos: [3, 1.5, 2.6], look: [3, 1.4, -2], fov: 44 },
    { f: 760, pos: [3, 1.45, 1.4], look: [3, 1.4, -2], fov: 40, glide: true },
  ] },
  { id: 7, a: 756, b: 880, sunAz: 130, keys: [
    { f: 756, pos: [-0.6, 0.55, 2.8], look: [-0.3, 0.4, 0], fov: 42 },
    { f: 880, pos: [1.3, 0.55, 2.6], look: [1.2, 0.4, 0], fov: 42, glide: true },
  ] },
  { id: 8, a: 876, b: 1030, sunAz: 150, keys: [
    { f: 876, pos: [-80, 2.4, 9], look: [-80, 1.6, 0], fov: 46 },
    { f: 960, pos: [-80, 1.2, 4.6], look: [-80.2, 0.8, 0], fov: 42, glide: true },
    { f: 1030, pos: [-79.8, 0.9, 3.2], look: [-80, 0.6, 0], fov: 40, glide: true },
  ] },
  { id: 9, a: 1026, b: TOTAL, sunAz: 130, keys: [
    { f: 1026, pos: [0.4, 0.5, 2.6], look: [0.5, 0.4, 0], fov: 40 },
    { f: TOTAL, pos: [-0.9, 0.55, 3.2], look: [-0.3, 0.4, 0], fov: 44, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 222, k: 0.06 }, { f: 961, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.farm || id === S.tour ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 96, label: "18 MESES", sub: "sin cabeza", col: "#ff3b3b", big: true },
  { a: 100, b: 200, label: "Colorado", sub: "1945", col: "#ffffff" },
  { a: 412, b: 494, label: "MIKE", sub: "el pollo sin cabeza", col: "#ffd23f" },
  { a: 1030, b: TOTAL, label: "18 MESES", sub: "sin cabeza", col: "#ff3b3b", big: true },
];
