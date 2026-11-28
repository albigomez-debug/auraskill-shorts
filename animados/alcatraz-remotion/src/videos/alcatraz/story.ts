// "La fuga de Alcatraz" (1962): three prisoners, fake heads, a raincoat raft, no bodies ever found. 39 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1162;
export const W = { nunca: 52, frank: 202, anglin: 236, plan: 254, rascan: 300, cucharas: 335, rejilla: 378, fabrican: 417, cabezas: 430, papel: 454, jabon: 467,
  pelo: 476, cama: 541, noche: 567, guardias: 585, durmiendo: 633, tejado: 698, lanzan: 712, bahia: 724, balsa: 736, chubasqueros: 773, manana: 808,
  cabeza: 828, cae: 838, nadie: 882, fbi: 909, ahogaron: 933, cuerpo: 989, crees: 1009, suscribete: 1036, alcatraz: 1095 };
export const S = { hook: 1, island: 2, plan: 3, dig: 4, heads: 5, guards: 6, escape: 7, morning: 8, fbi: 9, end: 10 };
export const BAY: V3 = [60, 0, 0];
const hookK = (a: number, b: number, rev = false) => {
  const k0 = { pos: [60.6, 1.15, 4.8] as V3, look: [60, 0.85, 0] as V3, fov: 44 }, k1 = { pos: [60.3, 1.1, 3.8] as V3, look: [60, 0.9, 0] as V3, fov: 42 };
  const [x, y] = rev ? [k1, k0] : [k0, k1];
  return [{ f: a, ...x }, { f: b, ...y, glide: true }];
};
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 88, sunAz: 200, keys: hookK(0, 88) },
  { id: 2, a: 86, b: 200, sunAz: 200, keys: [
    { f: 86, pos: [84, 12, 36], look: [60, 6, -40], fov: 46 },
    { f: 200, pos: [66, 4, 4], look: [60, 7, -40], fov: 44, glide: true },
  ] },
  { id: 3, a: 198, b: 296, sunAz: 200, keys: [
    { f: 198, pos: [0, 1.5, 3.6], look: [0, 1.2, 0], fov: 46 },
    { f: 296, pos: [0, 1.45, 2.8], look: [0, 1.25, 0], fov: 44, glide: true },
  ] },
  { id: 4, a: 294, b: 417, sunAz: 200, keys: [
    { f: 294, pos: [0.2, 1.0, 1.8], look: [-0.6, 0.7, -1.2], fov: 44 },
    { f: 417, pos: [-0.1, 0.9, 1.4], look: [-0.7, 0.6, -1.2], fov: 42, glide: true },
  ] },
  { id: 5, a: 415, b: 567, sunAz: 200, keys: [
    { f: 415, pos: [0.4, 1.5, 2.4], look: [0.3, 1.0, -0.4], fov: 44 },
    { f: 520, pos: [0.4, 1.4, 2.0], look: [0.3, 1.0, -0.4], fov: 42, glide: true },
    { f: 567, pos: [0.9, 1.3, 1.8], look: [0.9, 0.6, -0.6], fov: 44, glide: true },
  ] },
  { id: 6, a: 565, b: 696, sunAz: 200, keys: [
    { f: 565, pos: [-1.6, 1.6, 4.8], look: [0.2, 0.9, 0], fov: 46 },
    { f: 696, pos: [1.6, 1.6, 4.4], look: [0.4, 0.9, 0], fov: 44, glide: true },
  ] },
  { id: 7, a: 694, b: 808, sunAz: 200, keys: [
    { f: 694, pos: [56, 3, 6], look: [60, 0.6, 0], fov: 46 },
    { f: 808, pos: [62, 1.4, 4.2], look: [60.5, 0.7, 0], fov: 44, glide: true },
  ] },
  { id: 8, a: 806, b: 906, sunAz: 140, keys: [
    { f: 806, pos: [0.1, 1.6, 3.8], look: [0.4, 0.8, -0.4], fov: 48 },
    { f: 906, pos: [0.3, 1.5, 3.3], look: [0.5, 0.7, -0.4], fov: 46, glide: true },
  ] },
  { id: 9, a: 904, b: 1034, sunAz: 200, keys: [
    { f: 904, pos: [60, 1.4, 5.4], look: [60, 1.1, 0], fov: 46 },
    { f: 1034, pos: [60, 1.3, 3.8], look: [60, 1.1, 0], fov: 44, glide: true },
  ] },
  { id: 10, a: 1032, b: TOTAL, sunAz: 200, keys: hookK(1032, TOTAL, true) },
];
const K = kit(SHOTS, [{ f: 6, k: 0.04 }, { f: W.cae, k: 0.06 }, { f: W.lanzan, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.island ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 84, label: "ESCAPARON", sub: "y nunca los encontraron", col: "#9ad4ff", big: true },
  { a: 92, b: 160, label: "Alcatraz", sub: "1962", col: "#ffffff" },
  { a: 162, b: 198, label: "NADIE ESCAPABA", col: "#ff6a5a" },
  { a: 200, b: 292, label: "Morris + hermanos Anglin", col: "#ffd23f" },
  { a: 980, b: 1004, label: "CUERPOS: 0", col: "#ffffff", big: true },
  { a: 1006, b: 1034, label: "¿TÚ QUÉ CREES?", col: "#ffd23f", big: true },
];
