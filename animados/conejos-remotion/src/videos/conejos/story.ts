// "Napoleón contra los conejos", 25.1 s. Words: derrotado 17 · conejos 32 · verdad 61 · 1807 75 · firmar la paz 130-142 ·
// cacería 179 · conejos 192 · Berthier 240 · cientos 263 · miles 300 · Pero 317 · detalle 329 · granjas 358 · domésticos 398 ·
// abren las jaulas 447-456 · no huyen 471-474 · Corren 490 · Napoleón 506 · comida 555 · rodean 580 · trepan 597 · piernas 613 ·
// conquistó media Europa 641-660 · huir 681 · carruaje 691 · Derrotado por conejos 711-730
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 755;
export const W = { verdad: 61, paz: 130, caceria: 179, berthier: 240, cientos: 263, miles: 300, pero: 317, granjas: 358, domesticos: 398,
  abren: 447, huyen: 471, corren: 490, comida: 555, rodean: 580, trepan: 597, europa: 641, huir: 681, carruaje: 691, derrotado: 711 };
export const S = { hook: 1, peace: 2, cages: 3, cute: 4, open: 5, swarm: 6, flee: 7 };
export const CAGES_Z = -6, COACH: V3 = [6, 0, -2];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 105, sunAz: 130, keys: [
    { f: 0, pos: [0.2, 1.4, 4.8], look: [0, 1.0, 0], fov: 46 },
    { f: 105, pos: [0.3, 1.5, 3.9], look: [0.1, 1.2, 0], fov: 44, glide: true },
  ] },
  { id: 2, a: 101, b: 210, sunAz: 120, keys: [
    { f: 101, pos: [0.3, 1.8, 5.5], look: [0, 1.6, 0], fov: 42 },
    { f: 210, pos: [1.5, 2.4, 9], look: [0, 1.2, -2], fov: 48, glide: true },
  ] },
  { id: 3, a: 206, b: 316, sunAz: 120, keys: [
    { f: 206, pos: [-0.2, 1.7, -1.2], look: [-0.3, 1.3, CAGES_Z + 1.4], fov: 46 },
    { f: 316, pos: [1.0, 3.2, 1.5], look: [0, 0.8, CAGES_Z], fov: 52, glide: true },
  ] },
  { id: 4, a: 312, b: 420, sunAz: 130, keys: [
    { f: 312, pos: [0.3, 0.7, CAGES_Z + 3.0], look: [0.25, 0.35, CAGES_Z + 0.8], fov: 40 },
    { f: 420, pos: [0.3, 0.65, CAGES_Z + 2.5], look: [0.25, 0.35, CAGES_Z + 0.8], fov: 38, glide: true },
  ] },
  { id: 5, a: 416, b: 520, sunAz: 120, keys: [
    { f: 416, pos: [0, 1.6, CAGES_Z + 6.5], look: [0, 0.6, CAGES_Z], fov: 50 },
    { f: 470, pos: [0, 1.4, CAGES_Z + 5.5], look: [0, 0.6, CAGES_Z], fov: 48, glide: true },
    { f: 520, pos: [0.2, 1.3, 4.6], look: [0, 0.9, 0], fov: 50, glide: true },
  ] },
  { id: 6, a: 516, b: 700, sunAz: 130, keys: [
    { f: 516, pos: [0.4, 1.6, 4.2], look: [0, 1.0, 0], fov: 46 },
    { f: 640, pos: [-0.6, 1.4, 3.4], look: [0, 1.0, 0], fov: 42, glide: true },
    { f: 700, pos: [2.5, 2.2, 6], look: [3.5, 1.0, -1], fov: 48, glide: true },
  ] },
  { id: 7, a: 696, b: TOTAL, sunAz: 120, keys: [
    { f: 696, pos: [3.5, 2, 9], look: [6.5, 1.3, -2], fov: 48 },
    { f: TOTAL, pos: [4, 3.5, 13], look: [8, 1.2, -3], fov: 50, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 317, k: 0.03 }, { f: 490, k: 0.05 }, { f: 681, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.cute ? 16 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 100, label: "NAPOLEÓN", sub: "vs CONEJOS", col: "#ffd23f", big: true },
  { a: 104, b: 170, label: "1807", col: "#ffffff" },
  { a: 290, b: 330, label: "¿3.000?", sub: "conejos", col: "#ffffff" },
  { a: 376, b: 420, label: "de granja", sub: "domésticos", col: "#ffd23f" },
];
