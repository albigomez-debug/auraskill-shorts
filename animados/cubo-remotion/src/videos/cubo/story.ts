// "La guerra del cubo" (Módena vs Bolonia, 1325), 36 s. Words: guerra 42 · cubo 60 · madera 69 · Italia 82 · 1325 97 · Módena 134 · Bolonia 146 ·
// odiándose 172 · leyenda 210 · noche 227 · soldados 240 · cuelan 266 · trofeo 305 · cubo 323 · pozo 334 · cubo 364 · madera 380 · exige 404 ·
// devuelvan 422 · no 458 · manda 475 · ejército 486 · treinta mil 515 · siete mil 564 · Zappolino 593 · gana 613 · Miles 626 · persiguen 672 ·
// murallas 713 · Fíjate 730 · política 767 · cubo 789 · símbolo 815 · suerte 843 · quedó 882 · desgracia 910 · hoy 940 · expuesto 951 · madera 1059
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1076;
export const W = { modena: 134, bolonia: 146, odio: 172, noche: 227, cuelan: 266, trofeo: 305, cubo: 323, exige: 404, devuelvan: 422, no: 458,
  manda: 475, treinta: 515, siete: 564, zappolino: 593, gana: 613, persiguen: 672, murallas: 713, politica: 767, simbolo: 815, quedo: 882,
  hoy: 940, expuesto: 951 };
export const S = { hook: 1, italy: 2, theft: 3, bucket: 4, demand: 5, army: 6, wait: 7, win: 8, symbol: 9, tower: 10, today: 11, end: 12 };
export const MOD: V3 = [40, 0, 0], ZAP: V3 = [-50, 0, 0], MUS: V3 = [90, 0, 0];
const M = MOD[0], Z = ZAP[0], U = MUS[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 80, keys: [{ f: 0, pos: [Z + 0.3, 1.5, 3.0], look: [Z, 1.2, 0], fov: 46 }, { f: 80, pos: [Z + 0.6, 2.2, 6.0], look: [Z, 1.2, -1], fov: 50, glide: true }] },
  { id: 2, a: 78, b: 188, keys: [{ f: 78, pos: [4, 4, 12], look: [0, 1.5, -2], fov: 52 }, { f: 188, pos: [1.5, 2.2, 7], look: [0, 1.4, -1], fov: 48, glide: true }] },
  { id: 3, a: 184, b: 358, keys: [{ f: 184, pos: [-1.6, 1.7, 5.2], look: [-1.4, 1.2, 0], fov: 48 }, { f: 300, pos: [-0.9, 1.6, 4.4], look: [-0.8, 1.2, 0], fov: 46, glide: true }, { f: 358, pos: [-1.0, 1.5, 3.8], look: [-0.9, 1.2, 0], fov: 46, glide: true }] },
  { id: 4, a: 354, b: 394, keys: [{ f: 354, pos: [0.1, 1.2, 1.6], look: [0, 1.1, 0], fov: 40 }, { f: 394, pos: [0.1, 1.2, 1.2], look: [0, 1.1, 0], fov: 38, glide: true }] },
  { id: 5, a: 390, b: 464, keys: [{ f: 390, pos: [M + 0.3, 1.6, 4.2], look: [M, 1.35, 0], fov: 46 }, { f: 464, pos: [M + 0.3, 1.55, 3.2], look: [M, 1.4, 0], fov: 42, glide: true }] },
  { id: 6, a: 460, b: 542, keys: [{ f: 460, pos: [Z + 9, 5, 14], look: [Z + 4, 1, -2], fov: 50 }, { f: 542, pos: [Z + 7, 3.5, 11], look: [Z + 4, 1, -2], fov: 50, glide: true }] },
  { id: 7, a: 538, b: 612, keys: [{ f: 538, pos: [Z - 3, 2.5, 8], look: [Z - 4, 1, -1], fov: 48 }, { f: 612, pos: [Z - 3.5, 1.8, 6], look: [Z - 4, 1.1, -1], fov: 46, glide: true }] },
  { id: 8, a: 608, b: 730, keys: [{ f: 608, pos: [Z, 3, 10], look: [Z, 1.2, -1], fov: 50 }, { f: 730, pos: [Z + 6, 2.5, 8], look: [Z + 7, 1.5, -3], fov: 50, glide: true }] },
  { id: 9, a: 726, b: 840, keys: [{ f: 726, pos: [M + 0.4, 1.8, 5.2], look: [M, 1.5, -0.5], fov: 48 }, { f: 840, pos: [M + 0.3, 1.7, 4.0], look: [M, 1.6, -0.5], fov: 46, glide: true }] },
  { id: 10, a: 836, b: 908, keys: [{ f: 836, pos: [M + 6, 3, 12], look: [M + 4, 7, -6], fov: 50 }, { f: 908, pos: [M + 5, 4, 9], look: [M + 4, 11, -6], fov: 50, glide: true }] },
  { id: 11, a: 904, b: 978, keys: [{ f: 904, pos: [U + 0.3, 1.6, 4.4], look: [U, 1.2, -0.5], fov: 46 }, { f: 978, pos: [U + 0.2, 1.4, 2.8], look: [U, 1.2, -0.5], fov: 42, glide: true }] },
  { id: 12, a: 974, b: TOTAL, keys: [{ f: 974, pos: [Z + 0.6, 2.2, 6.0], look: [Z, 1.2, -1], fov: 50 }, { f: TOTAL, pos: [Z + 0.3, 1.5, 3.0], look: [Z, 1.2, 0], fov: 46, glide: true }] },
];
const K = kit(SHOTS, [{ f: 10, k: 0.04 }, { f: 613, k: 0.05 }, { f: 1000, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.italy || id === S.army || id === S.win || id === S.tower ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 62, label: "GUERRA", sub: "por un cubo de madera", col: "#ff3b3b", big: true },
  { a: 82, b: 130, label: "Italia", sub: "1325", col: "#ffffff" },
  { a: 512, b: 540, label: "30.000", sub: "Bolonia", col: "#ff6a6a" },
  { a: 562, b: 600, label: "7.000", sub: "Módena · Zappolino", col: "#ffd23f" },
  { a: 940, b: 974, label: "Hoy", sub: "Módena", col: "#ffffff" },
  { a: 990, b: TOTAL, label: "GUERRA", sub: "por un cubo de madera", col: "#ff3b3b", big: true },
];
