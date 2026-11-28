// "El peor negocio de la historia": Jeanne Calment and the viager (Arles, 1965-1995), 37 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1106;
export const W = { abogado: 11, negocio: 35, arles: 160, jeanne: 201, vende: 249, piso: 260, trato: 301, paga: 322, mes: 349, muera: 378, suyo: 405,
  piensa: 432, dos: 462, tres: 476, pasan: 515, diez: 524, veinte: 550, treinta: 569, viva: 602, bici: 627, chocolate: 645, y1995: 677, muere: 741,
  viuda: 788, pagando: 816, vivio: 848, veintidos: 863, longeva: 906, vangogh: 972, suscribete: 993, abuela: 1057 };
export const S = { hook: 1, town: 2, deal: 3, think: 4, years: 5, widow: 6, record: 7, end: 8 };
const hookK = (a: number, b: number, rev = false) => {
  const k0 = { pos: [0, 1.45, 3.8] as V3, look: [0, 1.3, 0] as V3, fov: 44 }, k1 = { pos: [0, 1.45, 2.9] as V3, look: [0, 1.35, 0] as V3, fov: 42 };
  const [x, y] = rev ? [k1, k0] : [k0, k1];
  return [{ f: a, ...x }, { f: b, ...y, glide: true }];
};
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, sunAz: 140, keys: hookK(0, 100) },
  { id: 2, a: 98, b: 245, sunAz: 150, keys: [
    { f: 98, pos: [8, 10, 26], look: [0, 3, -4], fov: 48 },
    { f: 245, pos: [-1.2, 1.4, 3.6], look: [-0.6, 1.3, 0], fov: 42, glide: true },
  ] },
  { id: 3, a: 243, b: 422, sunAz: 140, keys: [
    { f: 243, pos: [1.6, 1.6, 4.2], look: [0, 1.3, 0], fov: 46 },
    { f: 422, pos: [-1.2, 1.5, 3.8], look: [0, 1.3, 0], fov: 44, glide: true },
  ] },
  { id: 4, a: 420, b: 512, sunAz: 140, keys: [
    { f: 420, pos: [0.6, 1.6, 3.2], look: [0.45, 1.6, 0], fov: 44 },
    { f: 512, pos: [0.6, 1.6, 2.8], look: [0.45, 1.6, 0], fov: 42, glide: true },
  ] },
  { id: 5, a: 510, b: 670, sunAz: 150, keys: [
    { f: 510, pos: [-0.6, 1.7, 5.6], look: [-0.3, 1.3, 0], fov: 50 },
    { f: 670, pos: [0.6, 1.7, 5.4], look: [0.4, 1.3, 0], fov: 50, glide: true },
  ] },
  { id: 6, a: 668, b: 838, sunAz: 120, keys: [
    { f: 668, pos: [30.0, 1.6, 4.4], look: [30.0, 1.1, 0], fov: 46 },
    { f: 780, pos: [30.0, 1.5, 4.4], look: [30.0, 1.2, 0], fov: 46, glide: true },
    { f: 838, pos: [30.2, 1.5, 4.0], look: [30.2, 1.3, 0], fov: 46, glide: true },
  ] },
  { id: 7, a: 836, b: 990, sunAz: 150, keys: [
    { f: 836, pos: [-0.6, 1.4, 3.2], look: [-0.6, 1.25, 0], fov: 44 },
    { f: 990, pos: [-0.3, 1.45, 2.8], look: [-0.4, 1.3, 0], fov: 42, glide: true },
  ] },
  { id: 8, a: 988, b: TOTAL, sunAz: 140, keys: hookK(988, TOTAL, true) },
];
const K = kit(SHOTS, [{ f: 6, k: 0.04 }, { f: W.muere, k: 0.06 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.town ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 96, label: "PEOR NEGOCIO", sub: "de la historia", col: "#ffd23f", big: true },
  { a: 104, b: 196, label: "Arlés, Francia", sub: "1965", col: "#ffffff" },
  { a: 198, b: 243, label: "Jeanne Calment", sub: "90 años", col: "#ffd0e0" },
  { a: 670, b: 736, label: "1995", col: "#ffffff", big: true },
  { a: 856, b: 936, label: "122 AÑOS", sub: "la persona más longeva", col: "#ffd23f", big: true },
];
