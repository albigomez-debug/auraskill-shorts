// "Wojtek, el oso soldado" (1942-45), 35 s. Words: oso 40 · munición 76 · 1942 93 · polacos 148 · Irán 166 · compran 176 · osezno 189 · Wojtek 226 ·
// Bebe 241 · botella 262 · vodka 274 · Duerme 296 · Fuma 322 · come 348 · cigarrillos 357 · crece 381 · Doscientos 414 · problema 453 · barcos 475 ·
// animales 518 · alistan 548 · Oficialmente 562 · número 592 · rango 608 · paga 620 · Montecassino 650 · cajas 714 · ayudar 762 · Caja 776 ·
// soltar 808 · suerte 836 · desgracia 882 · zoo 913 · Escocia 921 · amigos 962 · soldado 1038
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1058;
export const W = { compran: 176, osezno: 189, wojtek: 226, bebe: 241, botella: 262, duerme: 296, fuma: 322, come: 348, crece: 381, doscientos: 414,
  problema: 453, barcos: 475, animales: 518, alistan: 548, oficial: 562, numero: 592, rango: 608, paga: 620, monte: 650, cajas: 714, ayudar: 762,
  caja: 776, soltar: 808, suerte: 836, desgracia: 882, zoo: 913, amigos: 962 };
export const S = { hook: 1, buy: 2, bottle: 3, sleep: 4, cigs: 5, grow: 6, ship: 7, enlist: 8, battle: 9, carry: 10, luck: 11, zoo: 12, end: 13 };
export const MC: V3 = [60, 0, 0], DOCK: V3 = [-60, 0, 0], ZOO: V3 = [-120, 0, 0];
const M = MC[0], D = DOCK[0], Z = ZOO[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 92, keys: [{ f: 0, pos: [M + 0.4, 1.4, 3.2], look: [M, 1.2, 0], fov: 44 }, { f: 92, pos: [M + 1.2, 1.6, 4.8], look: [M + 0.6, 1.1, 0], fov: 48, glide: true }] },
  { id: 2, a: 88, b: 212, keys: [{ f: 88, pos: [2, 2.4, 8], look: [0, 1, -1], fov: 50 }, { f: 212, pos: [0.6, 1.2, 4.2], look: [0.2, 0.7, 0], fov: 44, glide: true }] },
  { id: 3, a: 208, b: 296, keys: [{ f: 208, pos: [0.4, 1.1, 4.2], look: [0.3, 0.8, 0], fov: 46 }, { f: 296, pos: [0.5, 0.9, 3.2], look: [0.4, 0.7, 0], fov: 44, glide: true }] },
  { id: 4, a: 292, b: 324, keys: [{ f: 292, pos: [8.2, 1.6, 3.4], look: [8, 0.5, 0], fov: 46 }, { f: 324, pos: [8.1, 1.4, 2.8], look: [8, 0.5, 0], fov: 44, glide: true }] },
  { id: 5, a: 320, b: 380, keys: [{ f: 320, pos: [0.7, 0.8, 3.2], look: [0.5, 0.5, 0], fov: 44 }, { f: 380, pos: [0.6, 0.7, 2.6], look: [0.5, 0.5, 0], fov: 42, glide: true }] },
  { id: 6, a: 376, b: 444, keys: [{ f: 376, pos: [0.3, 0.8, 3.0], look: [0.2, 0.6, 0], fov: 44 }, { f: 444, pos: [0.4, 1.4, 4.6], look: [0.2, 1.1, 0], fov: 48, glide: true }] },
  { id: 7, a: 440, b: 534, keys: [{ f: 440, pos: [D + 6, 3, 14], look: [D, 2, -2], fov: 50 }, { f: 534, pos: [D + 1, 1.6, 4.6], look: [D + 0.3, 1.3, 0], fov: 44, glide: true }] },
  { id: 8, a: 530, b: 632, keys: [{ f: 530, pos: [D + 0.4, 1.7, 5.6], look: [D + 0.3, 1.4, 0], fov: 46 }, { f: 632, pos: [D + 0.4, 1.6, 4.6], look: [D + 0.3, 1.4, 0], fov: 44, glide: true }] },
  { id: 9, a: 628, b: 746, keys: [{ f: 628, pos: [M - 3, 3.5, 11], look: [M, 2, -4], fov: 50 }, { f: 746, pos: [M - 1, 1.6, 5.2], look: [M, 1.2, 0], fov: 46, glide: true }] },
  { id: 10, a: 742, b: 832, keys: [{ f: 742, pos: [M - 2, 1.5, 4.4], look: [M - 1.6, 1.2, 0], fov: 46 }, { f: 832, pos: [M + 1.6, 1.5, 4.4], look: [M + 1.4, 1.2, 0], fov: 46, glide: true }] },
  { id: 11, a: 828, b: 878, keys: [{ f: 828, pos: [M + 0.3, 1.6, 5.4], look: [M, 1.2, -0.3], fov: 46 }, { f: 878, pos: [M + 0.3, 1.5, 4.4], look: [M, 1.2, -0.3], fov: 44, glide: true }] },
  { id: 12, a: 874, b: 976, keys: [{ f: 874, pos: [Z + 0.5, 1.5, 4.6], look: [Z, 1.2, -0.5], fov: 46 }, { f: 976, pos: [Z + 0.3, 1.4, 3.0], look: [Z, 1.3, -0.5], fov: 42, glide: true }] },
  { id: 13, a: 972, b: TOTAL, keys: [{ f: 972, pos: [M + 1.2, 1.6, 4.8], look: [M + 0.6, 1.1, 0], fov: 48 }, { f: TOTAL, pos: [M + 0.4, 1.4, 3.2], look: [M, 1.2, 0], fov: 44, glide: true }] },
];
const K = kit(SHOTS, [{ f: 20, k: 0.04 }, { f: 680, k: 0.04 }, { f: 1000, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.battle || id === S.ship ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 62, label: "OSO SOLDADO", sub: "cargando munición", col: "#ff3b3b", big: true },
  { a: 94, b: 170, label: "1942", sub: "Irán", col: "#ffffff" },
  { a: 412, b: 444, label: "200 kg", col: "#ffd23f" },
  { a: 652, b: 740, label: "Montecassino", sub: "1944", col: "#ffffff" },
  { a: 976, b: TOTAL, label: "OSO SOLDADO", sub: "cargando munición", col: "#ff3b3b", big: true },
];
