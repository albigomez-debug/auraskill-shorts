// "Vendió la Torre Eiffel dos veces", 25.4 s. Words (frames): Torre Eiffel 27-34 · hizo 67 · dos veces 87-93 · París 112 · 1925 126 ·
// Lustig 180 · periódico 203 · fortuna 254 · Así que 273 · funcionario 307 · reúne 340 · chatarreros 358 · hotel de lujo 378-387 ·
// suelta 399 · desmonta 430 · chatarra 460 · Uno paga 480-489 · Lustig huye 504-517 · dinero 529 · comprador 547 · vergüenza 573 ·
// denuncia 595 · Pero aquí viene lo mejor 617-638 · un mes después 651-658 · vuelve 686 · París 694 · otra vez 738-743
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 765;
export const W = { hizo: 67, dos: 87, paris: 112, lustig: 180, periodico: 203, fortuna: 254, asi: 273, funcionario: 307, reune: 340,
  suelta: 399, desmonta: 430, paga: 480, huye: 504, comprador: 547, verguenza: 573, pero: 617, mes: 651, vuelve: 686, otra: 735 };
export const S = { hook: 1, read: 2, disguise: 3, hotel: 4, pay: 5, shame: 6, back: 7 };
export const HOTEL = 400, TOWER_Z = -150;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 112, sunAz: 140, keys: [
    { f: 0, pos: [0.3, 0.9, 6.5], look: [0, 4.5, -8], fov: 50 },
    { f: 112, pos: [0.2, 1.1, 4.6], look: [0, 3.6, -8], fov: 48, glide: true },
  ] },
  { id: 2, a: 108, b: 272, sunAz: 130, keys: [
    { f: 108, pos: [-4.5, 1.8, 12], look: [-6.5, 1.0, 4], fov: 46 },
    { f: 200, pos: [-5.6, 1.5, 8.2], look: [-6.6, 1.0, 4], fov: 42, glide: true },
    { f: 272, pos: [-6.0, 1.3, 6.6], look: [-6.6, 1.1, 4], fov: 40, glide: true },
  ] },
  { id: 3, a: 268, b: 340, sunAz: 130, keys: [
    { f: 268, pos: [0.2, 1.7, 4.8], look: [0, 1.5, 0], fov: 42 },
    { f: 340, pos: [0.1, 1.65, 3.6], look: [0, 1.6, 0], fov: 40, glide: true },
  ] },
  { id: 4, a: 336, b: 478, sunAz: 140, keys: [
    { f: 336, pos: [HOTEL + 0.4, 2.6, 7.5], look: [HOTEL, 1.2, -1], fov: 48 },
    { f: 420, pos: [HOTEL + 0.2, 1.9, 5.2], look: [HOTEL, 1.3, -1], fov: 46, glide: true },
    { f: 478, pos: [HOTEL - 0.3, 1.8, 4.4], look: [HOTEL - 0.3, 1.4, -1], fov: 44, glide: true },
  ] },
  { id: 5, a: 474, b: 542, sunAz: 140, keys: [
    { f: 474, pos: [HOTEL + 0.6, 1.7, 4.2], look: [HOTEL + 0.6, 1.4, -0.5], fov: 44 },
    { f: 542, pos: [HOTEL + 1.6, 1.8, 4.6], look: [HOTEL + 2.2, 1.3, -0.5], fov: 46, glide: true },
  ] },
  { id: 6, a: 538, b: 619, sunAz: 140, keys: [
    { f: 538, pos: [HOTEL - 1.0, 1.7, 3.8], look: [HOTEL - 1.2, 1.5, 0], fov: 42 },
    { f: 619, pos: [HOTEL - 1.1, 1.6, 2.6], look: [HOTEL - 1.2, 1.55, 0], fov: 38, glide: true },
  ] },
  { id: 7, a: 615, b: TOTAL, sunAz: 140, keys: [
    { f: 615, pos: [0.4, 2.4, 22], look: [0, 3, -10], fov: 48 },
    { f: 700, pos: [0.3, 1.2, 9], look: [0, 3.5, -8], fov: 48, glide: true },
    { f: TOTAL, pos: [0.3, 0.9, 6.5], look: [0, 4.5, -8], fov: 50, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 87, k: 0.05 }, { f: 430, k: 0.05 }, { f: 617, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.back ? 6 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 108, label: "SE VENDE", sub: "la Torre Eiffel", col: "#ffd23f", big: true },
  { a: 112, b: 190, label: "París", sub: "1925", col: "#ffffff" },
  { a: 340, b: 400, label: "5", sub: "chatarreros", col: "#ffffff" },
  { a: 648, b: 705, label: "1 mes después", col: "#ffd23f" },
];
