// "La lluvia de carne de Kentucky" (Bath County, 3 marzo 1876), 38.8 s. Words: Kentucky 48 · carne 87 · granjera 129 · jabón 161 ·
// despejado 184 · plaf 223/234/246 · Trozos 257 · mano 336 · lleno 395 · curiosos 431 · prueban 475 · cordero 510 · periódicos 530 ·
// milagro 573 · tormenta 594 · científicos 631 · Pulmón 652 · músculo 666 · cartílago 681 · Fíjate 726 · buitres 741 · asusta 819 ·
// vomita 831 · vomita 882 · suerte 928 · desgracia 972 · vómito 1025 · eso 1057 · carne 1147
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1165;
export const W = { carne: 87, granjera: 129, jabon: 161, despejado: 184, plaf1: 223, plaf2: 234, plaf3: 246, trozos: 257, mano: 336,
  lleno: 395, curiosos: 431, prueban: 475, cordero: 510, periodicos: 530, milagro: 573, tormenta: 594, cientificos: 631, pulmon: 652,
  musculo: 666, cartilago: 681, fijate: 726, buitres: 741, asusta: 819, vomita: 831, vomita2: 882, suerte: 928, desgracia: 972,
  vomito: 1025, eso: 1057 };
export const S = { hook: 1, farm: 2, plaf: 3, field: 4, taste: 5, news: 6, science: 7, sky: 8, after: 9, end: 10 };
export const POT: V3 = [1.3, 0, -0.5], LAB: V3 = [8, 0, 2], SKYY = 25;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 122, sunAz: 120, keys: [
    { f: 0, pos: [0, 1.2, 4.2], look: [0, 1.6, 0], fov: 50 },
    { f: 122, pos: [0.2, 1.0, 3.2], look: [0.1, 1.3, 0], fov: 46, glide: true },
  ] },
  { id: 2, a: 118, b: 202, sunAz: 130, keys: [
    { f: 118, pos: [4, 4, 12], look: [0, 1.5, -2], fov: 46 },
    { f: 202, pos: [0.8, 1.6, 4.4], look: [0.2, 1.1, 0], fov: 44, glide: true },
  ] },
  { id: 3, a: 198, b: 345, sunAz: 130, keys: [
    { f: 198, pos: [0.6, 1.5, 3.6], look: [0.2, 1.1, 0], fov: 44 },
    { f: 260, pos: [0.4, 0.9, 2.6], look: [0.4, 0.5, 0], fov: 42, glide: true },
    { f: 345, pos: [0.2, 0.7, 1.8], look: [0.3, 0.2, 0.4], fov: 40, glide: true },
  ] },
  { id: 4, a: 341, b: 450, sunAz: 120, keys: [
    { f: 341, pos: [0, 3.5, 9], look: [0, 0.5, 0], fov: 48 },
    { f: 450, pos: [-2, 7, 13], look: [0, 0.5, -1], fov: 48, glide: true },
  ] },
  { id: 5, a: 446, b: 524, sunAz: 130, keys: [
    { f: 446, pos: [-2.2, 1.5, 4.2], look: [-2.2, 1.3, 0.5], fov: 44 },
    { f: 524, pos: [-2.2, 1.55, 3.0], look: [-2.2, 1.45, 0.5], fov: 40, glide: true },
  ] },
  { id: 6, a: 520, b: 620, sunAz: 130, keys: [
    { f: 520, pos: [-6, 1.4, 1.2], look: [-6, 1.4, -1], fov: 44 },
    { f: 620, pos: [-6, 1.4, 0.5], look: [-6, 1.4, -1], fov: 40, glide: true },
  ] },
  { id: 7, a: 616, b: 726, sunAz: 130, keys: [
    { f: 616, pos: [8.2, 1.6, 5.4], look: [8, 1.2, 2], fov: 44 },
    { f: 726, pos: [8.3, 1.4, 4.3], look: [8.1, 1.15, 2], fov: 40, glide: true },
  ] },
  { id: 8, a: 722, b: 922, sunAz: 120, keys: [
    { f: 722, pos: [0, SKYY + 1, 9], look: [0, SKYY + 1.5, 0], fov: 50 },
    { f: 820, pos: [1.5, SKYY + 1.4, 5], look: [1.2, SKYY + 1.4, 0], fov: 44, glide: true },
    { f: 922, pos: [-1, SKYY + 3, 8], look: [0, SKYY - 1, 0], fov: 50, glide: true },
  ] },
  { id: 9, a: 918, b: 1050, sunAz: 130, keys: [
    { f: 918, pos: [-1.2, 1.6, 5.0], look: [-1.2, 1.2, 0.3], fov: 46 },
    { f: 1050, pos: [-2.0, 1.5, 3.4], look: [-2.2, 1.4, 0.5], fov: 40, glide: true },
  ] },
  { id: 10, a: 1046, b: TOTAL, sunAz: 120, keys: [
    { f: 1046, pos: [0.2, 1.0, 3.2], look: [0.1, 1.3, 0], fov: 46 },
    { f: TOTAL, pos: [0, 1.2, 4.2], look: [0, 1.6, 0], fov: 50, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 223, k: 0.03 }, { f: 234, k: 0.03 }, { f: 246, k: 0.04 }, { f: 831, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.field || id === S.sky || id === S.farm ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 116, label: "¡CARNE!", sub: "lloviendo del cielo", col: "#ff3b3b", big: true },
  { a: 122, b: 196, label: "Kentucky", sub: "1876", col: "#ffffff" },
  { a: 742, b: 810, label: "BUITRES", sub: "", col: "#ffd23f" },
  { a: 1050, b: TOTAL, label: "¡CARNE!", sub: "lloviendo del cielo", col: "#ff3b3b", big: true },
];
