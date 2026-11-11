// "El Gran Hedor de Londres", 26.9 s. Words: oliera tan mal 22-35 · gobierno 45 · corriendo 74 · Londres 93 · 1858 123 ·
// aguas sucias 204-211 · Támesis 229 · ola de calor 268-277 · apestar 316 · Gran Hedor 369-375 · Pero lo mejor 389-399 ·
// Parlamento 420 · río 459 · cortinas 483 · cal 513 · olor 537 · políticos 565 · sufrían 590 · aprobaron 606 · dieciocho días 641-655 ·
// ingeniero 677 · alcantarillas 731 · todavía las usa 773-788
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 808;
export const W = { mal: 35, corriendo: 74, londres: 93, sucias: 204, calor: 268, apestar: 316, hedor: 369, pero: 389, parlamento: 420,
  cortinas: 483, olor: 537, sufrian: 590, aprobaron: 606, dias: 641, ingeniero: 677, alcantarillas: 731, usa: 773 };
export const S = { hook: 1, river: 2, sewage: 3, stink: 4, curtains: 5, vote: 6, sewer: 7 };
export const HOUSE = 300, TUNNEL = 600, PARL_X = -30, PARL_Z = -36;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 90, sunAz: 130, keys: [
    { f: 0, pos: [0.2, 1.6, 5.4], look: [0, 1.4, 0], fov: 44 },
    { f: 90, pos: [0.3, 1.6, 4.4], look: [0.1, 1.5, 0], fov: 42, glide: true },
  ] },
  { id: 2, a: 86, b: 170, sunAz: 110, keys: [
    { f: 86, pos: [10, 8, 6], look: [PARL_X, 8, -40], fov: 48 },
    { f: 170, pos: [4, 5, 0], look: [PARL_X, 8, -40], fov: 46, glide: true },
  ] },
  { id: 3, a: 166, b: 290, sunAz: 120, keys: [
    { f: 166, pos: [8, 2.2, -12], look: [8, 2, 4], fov: 48 },
    { f: 290, pos: [7, 3.0, -15], look: [7, 4, 4], fov: 52, glide: true },
  ] },
  { id: 4, a: 286, b: 389, sunAz: 120, keys: [
    { f: 286, pos: [0, 1.7, 7], look: [0, 1.3, -3], fov: 46 },
    { f: 389, pos: [0, 2.6, 10], look: [0, 1.2, -6], fov: 50, glide: true },
  ] },
  { id: 5, a: 385, b: 550, sunAz: 140, keys: [
    { f: 385, pos: [PARL_X + 3, 3, -18], look: [PARL_X, 6, -36], fov: 50 },
    { f: 480, pos: [PARL_X + 0.6, 4.0, -30.5], look: [PARL_X, 3.9, -36], fov: 42, glide: true },
    { f: 550, pos: [PARL_X + 0.4, 4.0, -32.0], look: [PARL_X, 3.9, -36], fov: 40, glide: true },
  ] },
  { id: 6, a: 546, b: 670, sunAz: 140, keys: [
    { f: 546, pos: [HOUSE, 4.5, 9], look: [HOUSE, 1.0, -1.5], fov: 54 },
    { f: 670, pos: [HOUSE + 0.3, 3.4, 7], look: [HOUSE, 1.1, -1.5], fov: 52, glide: true },
  ] },
  { id: 7, a: 666, b: TOTAL, sunAz: 140, keys: [
    { f: 666, pos: [TUNNEL + 0.3, 1.6, 4], look: [TUNNEL, 1.5, 0], fov: 42 },
    { f: 740, pos: [TUNNEL + 0.2, 1.5, 6], look: [TUNNEL, 1.3, -6], fov: 48, glide: true },
    { f: TOTAL, pos: [TUNNEL, 1.4, 9], look: [TUNNEL, 1.3, -20], fov: 50, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 389, k: 0.04 }, { f: 641, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.river || id === S.sewage ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 84, label: "¡APESTA!", sub: "el Gran Hedor de Londres", col: "#b8e05a", big: true },
  { a: 92, b: 166, label: "Londres", sub: "1858", col: "#ffffff" },
  { a: 266, b: 290, label: "+30 °C", sub: "a la sombra", col: "#ffb03a" },
  { a: 638, b: 670, label: "18 días", col: "#ffd23f" },
];
