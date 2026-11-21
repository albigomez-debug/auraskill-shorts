// "El ladrón del zumo de limón" (McArthur Wheeler, Pittsburgh, 1995), 37 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1124;
export const W = { pitts: 138, wheeler: 160, robar: 195, bancos: 208, cara: 237, camaras: 287, porque: 348, zumo: 377, tinta: 408, invisible: 416,
  penso: 445, echo: 471, verán: 513, probo: 547, foto: 561, sin: 587, apunto: 628, noche: 669, noticias: 699, detienen: 730, el: 770,
  pero: 836, zumo2: 858, estudio: 910, poco: 952, efecto: 978, suscribete: 1013, ladron: 1063 };
export const S = { hook: 1, city: 2, rob: 3, idea: 4, apply: 5, news: 6, jail: 7, study: 8, end: 9 };
export const BANK: V3 = [0, 0, 0], HOME: V3 = [60, 0, 0], TV: V3 = [-60, 0, 0], JAIL: V3 = [-120, 0, 0];
const hookK = (a: number, b: number, rev = false) => {
  const k0 = { pos: [0.5, 1.45, 3.4] as V3, look: [0.15, 1.35, 0] as V3, fov: 44 }, k1 = { pos: [0.25, 1.5, 2.3] as V3, look: [0.05, 1.45, 0] as V3, fov: 40 };
  const [x, y] = rev ? [k1, k0] : [k0, k1];
  return [{ f: a, ...x }, { f: b, ...y, glide: true }];
};
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 88, sunAz: 120, keys: hookK(0, 88) },
  { id: 2, a: 86, b: 186, sunAz: 130, keys: [
    { f: 86, pos: [6, 9, 22], look: [0, 3, -4], fov: 48 },
    { f: 186, pos: [1.0, 1.7, 6], look: [0, 1.4, 0], fov: 44, glide: true },
  ] },
  { id: 3, a: 184, b: 310, sunAz: 120, keys: [
    { f: 184, pos: [-1.2, 1.5, 3.8], look: [-0.4, 1.4, 0], fov: 44 },
    { f: 310, pos: [0.9, 1.5, 3.4], look: [0.2, 1.4, 0], fov: 42, glide: true },
  ] },
  { id: 4, a: 308, b: 440, sunAz: 130, keys: [
    { f: 308, pos: [60.3, 1.6, 3.8], look: [60.1, 1.3, 0], fov: 44 },
    { f: 440, pos: [60.2, 1.45, 2.8], look: [60.1, 1.3, 0], fov: 42, glide: true },
  ] },
  { id: 5, a: 438, b: 652, sunAz: 140, keys: [
    { f: 438, pos: [60.1, 1.55, 2.6], look: [60, 1.45, 0], fov: 40 },
    { f: 545, pos: [60.4, 1.5, 3.0], look: [60.2, 1.4, 0], fov: 42, glide: true },
    { f: 652, pos: [60.4, 1.5, 2.6], look: [60.35, 1.45, 0], fov: 40, glide: true },
  ] },
  { id: 6, a: 650, b: 762, sunAz: 130, keys: [
    { f: 650, pos: [-58.0, 2.0, 3.4], look: [-59.9, 1.1, -0.6], fov: 46 },
    { f: 762, pos: [-58.4, 1.8, 2.8], look: [-59.8, 1.1, -0.6], fov: 44, glide: true },
  ] },
  { id: 7, a: 760, b: 875, sunAz: 120, keys: [
    { f: 760, pos: [-120, 1.5, 3.4], look: [-120, 1.4, 0], fov: 44 },
    { f: 875, pos: [-120, 1.5, 2.3], look: [-120, 1.45, 0], fov: 40, glide: true },
  ] },
  { id: 8, a: 873, b: 1010, sunAz: 130, keys: [
    { f: 873, pos: [62.4, 1.7, 4.4], look: [62.4, 1.6, -1], fov: 44 },
    { f: 1010, pos: [62.4, 1.65, 3.6], look: [62.4, 1.6, -1], fov: 42, glide: true },
  ] },
  { id: 9, a: 1008, b: TOTAL, sunAz: 120, keys: hookK(1008, TOTAL, true) },
];
const K = kit(SHOTS, [{ f: 6, k: 0.04 }, { f: W.detienen, k: 0.06 }, { f: W.pero, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.city ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 86, label: "INVISIBLE", sub: "con zumo de limón 🍋", col: "#ffe23a", big: true },
  { a: 120, b: 184, label: "Pittsburgh", sub: "1995", col: "#ffffff" },
  { a: 404, b: 438, label: "TINTA INVISIBLE", col: "#ffe23a" },
  { a: 970, b: 1008, label: "EFECTO", sub: "Dunning-Kruger", col: "#ffd23f" },
];
