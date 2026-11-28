// "El panadero del whisky" (Charles Joughin, RMS Titanic, 15 de abril de 1912), 39 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1178;
export const W = { hunde: 21, whisky: 74, dijo: 103, charles: 123, panaderos: 160, abril: 197, barco: 249, choca: 257, iceberg: 272,
  charles2: 296, baja: 312, camarote: 323, trago: 354, luego: 372, tumbonas: 408, borda: 425, gente: 450, otro: 500, traguito: 507,
  barco2: 533, levanta: 543, trepa: 573, popa: 589, alta: 619, agarra: 638, cuando: 676, hunde2: 694, baja2: 712, ascensor: 744,
  dijo2: 766, pelo: 801, horas: 817, helada: 836, flotando: 870, amanecer: 896, bote: 928, ojo: 961, ciencia: 979, alcohol: 1002,
  enfria: 1010, pero: 1046, explico: 1064, asi: 1096 };
export const S = { hook: 1, galley: 2, berg: 3, cabin: 4, deck: 5, rise: 6, sink: 7, water: 8, science: 9, end: 10 };
export const SEA: V3 = [0, 0, 0], SHIPZ = -70, GALLEY: V3 = [-80, 0, 0], DECK: V3 = [80, 0, 0];
const water1 = (a: number, b: number) => [
  { f: a, pos: [0.15, 0.55, 2.4] as V3, look: [0, 0.4, 0] as V3, fov: 44 },
  { f: b, pos: [0.4, 0.75, 3.4] as V3, look: [0.1, 0.9, -10] as V3, fov: 46, glide: true },
];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 118, sunAz: 140, keys: water1(0, 118) },
  { id: 2, a: 114, b: 245, sunAz: 130, keys: [
    { f: 114, pos: [-80, 1.5, 4.4], look: [-80, 1.3, 0], fov: 44 },
    { f: 245, pos: [-79.6, 1.4, 3.2], look: [-79.8, 1.2, 0], fov: 42, glide: true },
  ] },
  { id: 3, a: 241, b: 292, sunAz: 140, keys: [
    { f: 241, pos: [30, 8, 10], look: [0, 6, SHIPZ], fov: 46 },
    { f: 292, pos: [24, 7, 4], look: [0, 6, SHIPZ], fov: 44, glide: true },
  ] },
  { id: 4, a: 288, b: 372, sunAz: 130, keys: [
    { f: 288, pos: [-73.6, 1.2, 3.4], look: [-74, 0.9, 0], fov: 44 },
    { f: 372, pos: [-73.8, 1.1, 2.5], look: [-74, 0.9, 0], fov: 42, glide: true },
  ] },
  { id: 5, a: 368, b: 528, sunAz: 130, keys: [
    { f: 368, pos: [81.5, 1.7, 5.0], look: [80.4, 1.3, 0], fov: 46 },
    { f: 528, pos: [80.8, 1.5, 3.6], look: [80.2, 1.3, 0], fov: 44, glide: true },
  ] },
  { id: 6, a: 524, b: 672, sunAz: 140, keys: [
    { f: 524, pos: [10, 6, 40], look: [8, 10, SHIPZ], fov: 46 },
    { f: 672, pos: [14, 5, 25], look: [14, 16, SHIPZ], fov: 44, glide: true },
  ] },
  { id: 7, a: 668, b: 764, sunAz: 140, keys: [
    { f: 668, pos: [14, 5, 25], look: [14, 16, SHIPZ], fov: 44 },
    { f: 764, pos: [14, 3, 22], look: [14, 6, SHIPZ], fov: 44, glide: true },
  ] },
  { id: 8, a: 760, b: 955, sunAz: 140, keys: [
    { f: 760, pos: [0.1, 0.6, 2.2], look: [0, 0.45, 0], fov: 42 },
    { f: 880, pos: [0.5, 0.9, 3.4], look: [0.2, 0.5, 0], fov: 44, glide: true },
    { f: 955, pos: [1.2, 1.2, 5.0], look: [0.6, 0.6, 0], fov: 46, glide: true },
  ] },
  { id: 9, a: 951, b: 1094, sunAz: 130, keys: [
    { f: 951, pos: [-81.2, 1.8, 4.8], look: [-81.25, 1.75, -1], fov: 44 },
    { f: 1094, pos: [-81.2, 1.75, 4.0], look: [-81.25, 1.7, -1], fov: 44, glide: true },
  ] },
  { id: 10, a: 1090, b: TOTAL, sunAz: 140, keys: water1(1090, TOTAL) },
];
const K = kit(SHOTS, [{ f: 10, k: 0.04 }, { f: W.choca, k: 0.12 }, { f: W.levanta, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.berg || id === S.rise || id === S.sink ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 98, label: "SE SALVÓ", sub: "gracias al whisky", col: "#ffd23f", big: true },
  { a: 120, b: 192, label: "Charles Joughin", sub: "jefe de panaderos", col: "#ffffff" },
  { a: 194, b: 244, label: "Abril", sub: "1912", col: "#ffffff" },
  { a: 615, b: 668, label: "LA POPA", sub: "lo más alto", col: "#ffd23f" },
  { a: 815, b: 868, label: "HORAS", sub: "en agua a -2 °C", col: "#7ad4ff" },
  { a: 1000, b: 1044, label: "ALCOHOL", sub: "= más frío", col: "#ff3b3b" },
  { a: 1094, b: TOTAL, label: "SE SALVÓ", sub: "gracias al whisky", col: "#ffd23f", big: true },
];
