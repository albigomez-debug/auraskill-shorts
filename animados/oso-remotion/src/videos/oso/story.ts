// "El oso soldado" (Wojtek, 22ª Compañía de Suministro de Artillería polaca, 1942-1945), 43 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1293;
export const W = { iran: 107, soldados: 174, nino: 224, latas: 249, wojtek: 289, crece: 322, bestia: 341, cerveza: 367, lucha: 386,
  cigarros: 425, pero: 450, barco: 485, mascotas: 518, solucion: 545, alistan: 571, nombre: 597, numero: 612, sueldo: 622, mascota: 655,
  soldado: 680, monte: 701, explosiones: 771, wojtek2: 836, cajas: 895, canones: 945, una: 968, escudo: 1032, proyectil: 1071,
  ascienden: 1099, asi: 1120, guerra: 1192, cabo: 1239 };
export const S = { hook: 1, iran: 2, grow: 3, ship: 4, enlist: 5, battle: 6, carry: 7, emblem: 8, end: 9 };
export const CAMP: V3 = [0, 0, 0], SHIP: V3 = [80, 0, 0], BATTLE: V3 = [-80, 0, 0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 104, sunAz: 120, keys: [
    { f: 0, pos: [-79.2, 1.5, 4.6], look: [-80, 1.3, 0], fov: 46 },
    { f: 104, pos: [-79.7, 1.4, 3.2], look: [-80, 1.2, 0], fov: 42, glide: true },
  ] },
  { id: 2, a: 100, b: 300, sunAz: 130, keys: [
    { f: 100, pos: [4, 6, 20], look: [0, 1.5, -2], fov: 46 },
    { f: 200, pos: [0.4, 1.5, 5.0], look: [0, 1.0, 0], fov: 42, glide: true },
    { f: 300, pos: [0.9, 0.9, 3.0], look: [0.6, 0.6, 0], fov: 40, glide: true },
  ] },
  { id: 3, a: 296, b: 450, sunAz: 120, keys: [
    { f: 296, pos: [0.2, 1.2, 5.2], look: [0, 1.0, 0], fov: 44 },
    { f: 450, pos: [0.6, 1.3, 4.0], look: [0.3, 1.0, 0], fov: 42, glide: true },
  ] },
  { id: 4, a: 446, b: 566, sunAz: 140, keys: [
    { f: 446, pos: [84, 4, 16], look: [80, 3, -2], fov: 48 },
    { f: 566, pos: [80.3, 1.5, 4.4], look: [80.1, 1.2, 0], fov: 44, glide: true },
  ] },
  { id: 5, a: 562, b: 700, sunAz: 130, keys: [
    { f: 562, pos: [3.2, 1.6, 4.6], look: [3, 1.1, 0], fov: 44 },
    { f: 700, pos: [3.1, 1.3, 3.0], look: [3, 1.1, 0], fov: 40, glide: true },
  ] },
  { id: 6, a: 696, b: 880, sunAz: 110, keys: [
    { f: 696, pos: [-74, 9, 22], look: [-80, 2, -4], fov: 48 },
    { f: 880, pos: [-78.5, 1.8, 7], look: [-80, 1.2, 0], fov: 44, glide: true },
  ] },
  { id: 7, a: 876, b: 1000, sunAz: 120, keys: [
    { f: 876, pos: [-80.5, 1.3, 4.8], look: [-80.8, 1.1, 0], fov: 44 },
    { f: 1000, pos: [-78.3, 1.3, 4.8], look: [-78.6, 1.1, 0], fov: 44, glide: true },
  ] },
  { id: 8, a: 996, b: 1118, sunAz: 130, keys: [
    { f: 996, pos: [-3, 1.9, 4.2], look: [-3, 1.9, -2], fov: 44 },
    { f: 1118, pos: [-3, 1.8, 2.8], look: [-3, 1.7, -2], fov: 40, glide: true },
  ] },
  { id: 9, a: 1114, b: TOTAL, sunAz: 120, keys: [
    { f: 1114, pos: [-80.3, 1.3, 3.6], look: [-80, 1.2, 0], fov: 44 },
    { f: TOTAL, pos: [-79.2, 1.5, 4.6], look: [-80, 1.3, 0], fov: 46, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 30, k: 0.05 }, { f: W.explosiones, k: 0.08 }, { f: W.explosiones + 20, k: 0.06 }, { f: W.ascienden, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.iran || id === S.ship || id === S.battle ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 100, label: "OSO SOLDADO", sub: "ejército polaco", col: "#ffd23f", big: true },
  { a: 104, b: 190, label: "Irán", sub: "1942", col: "#ffffff" },
  { a: 287, b: 345, label: "WOJTEK", col: "#ffd23f" },
  { a: 515, b: 560, label: "NO MASCOTAS", col: "#ff3b3b" },
  { a: 700, b: 770, label: "Montecassino", sub: "1944", col: "#ffffff" },
  { a: 1097, b: 1116, label: "¡ASCENDIDO!", col: "#ffd23f" },
  { a: 1236, b: TOTAL, label: "OSO SOLDADO", sub: "ejército polaco", col: "#ffd23f", big: true },
];
