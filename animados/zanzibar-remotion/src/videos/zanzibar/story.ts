// "Guerra anglo-zanzibariana" (27 ago 1896), 34.3 s. Words: minutos 68 · 1896 84 · Zanzíbar 124 · sultán 177 · trono 219 · británicos 255 ·
// ultimátum 305 · nueve 350 · atacamos 377 · encierra 403 · barco viejo 469 · nueve 501 · fuego 548 · Boom 559 · hunde 601 · abajo 636 ·
// corriendo 670 · treinta y ocho 730 · acabó 753 · suerte 770 · desgracia 844 · factura 901 · minutos 1010
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1030;
export const W = { sultan: 177, trono: 219, permiso: 240, britanicos: 280, ultimatum: 305, nueve: 350, atacamos: 377, encierra: 403,
  soldados: 448, barco: 469, llegan: 489, nueve2: 501, fuego: 548, boom: 559, hunde: 601, palacio: 616, abajo: 636, corriendo: 670,
  treinta: 730, acabo: 753, suerte: 770, desgracia: 844, factura: 901 };
export const S = { hook: 1, island: 2, throne: 3, ultimatum: 4, palace: 5, fire: 6, run: 7, clock: 8, bill: 9, end: 10 };
export const PAL: V3 = [0, 0, -6], OLD: V3 = [-16, 0, 4], FLEET: V3 = [8, 0, 26], ADM: V3 = [40, 0, 0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 86, keys: [{ f: 0, pos: [1, 3, 12], look: [0, 4, -6], fov: 48 }, { f: 86, pos: [0.6, 3, 9], look: [0, 4.5, -6], fov: 46, glide: true }] },
  { id: 2, a: 82, b: 170, keys: [{ f: 82, pos: [20, 30, 50], look: [0, 0, -4], fov: 50 }, { f: 170, pos: [6, 8, 22], look: [0, 3, -6], fov: 48, glide: true }] },
  { id: 3, a: 166, b: 275, keys: [{ f: 166, pos: [0.4, 1.5, 1.8], look: [0, 1.3, -2.5], fov: 44 }, { f: 275, pos: [0.3, 1.4, 0.4], look: [0, 1.35, -2.5], fov: 40, glide: true }] },
  { id: 4, a: 271, b: 395, keys: [{ f: 271, pos: [40.4, 1.6, 3.8], look: [40, 1.4, 0], fov: 44 }, { f: 395, pos: [40.3, 1.6, 2.6], look: [40.1, 1.5, 0], fov: 40, glide: true }] },
  { id: 5, a: 391, b: 489, keys: [{ f: 391, pos: [1, 1.9, 5], look: [0, 1.4, -2], fov: 48 }, { f: 458, pos: [0, 1.8, 4], look: [0, 1.4, -2], fov: 46, glide: true }, { f: 489, pos: [-8, 2.6, 16], look: [-15, 1.5, 4], fov: 46, glide: true }] },
  { id: 6, a: 485, b: 650, keys: [{ f: 485, pos: [14, 4, 36], look: [8, 3, 26], fov: 48 }, { f: 556, pos: [2, 4, 26], look: [-14, 2, 4], fov: 46, glide: true }, { f: 612, pos: [1, 4, 24], look: [-14, 1.5, 4], fov: 44, glide: true }, { f: 650, pos: [3, 4, 18], look: [0, 4, -6], fov: 48, glide: true }] },
  { id: 7, a: 646, b: 714, keys: [{ f: 646, pos: [1.5, 1.5, 4], look: [0.5, 1.2, -1], fov: 46 }, { f: 714, pos: [-1.5, 1.5, 4], look: [-2.2, 1.2, -1], fov: 46, glide: true }] },
  { id: 8, a: 710, b: 840, keys: [{ f: 710, pos: [40.4, 1.7, 3.8], look: [40, 1.6, 0], fov: 44 }, { f: 840, pos: [40.3, 1.6, 2.8], look: [40.1, 1.5, 0], fov: 40, glide: true }] },
  { id: 9, a: 836, b: 940, keys: [{ f: 836, pos: [0.3, 1.6, 4.2], look: [0, 1.4, 0], fov: 44 }, { f: 940, pos: [0.3, 1.5, 3.0], look: [0.1, 1.4, 0], fov: 40, glide: true }] },
  { id: 10, a: 936, b: TOTAL, keys: [{ f: 936, pos: [0.6, 3, 9], look: [0, 4.5, -6], fov: 46 }, { f: TOTAL, pos: [1, 3, 12], look: [0, 4, -6], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 559, k: 0.07 }, { f: 601, k: 0.04 }, { f: 636, k: 0.06 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.island || id === S.fire || id === S.hook || id === S.end ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 80, label: "38 MINUTOS", sub: "la guerra más corta", col: "#ff3b3b", big: true },
  { a: 88, b: 166, label: "Zanzíbar", sub: "1896", col: "#ffffff" },
  { a: 500, b: 550, label: "9:00", col: "#ffd23f" },
  { a: 728, b: 800, label: "9:38", sub: "fin de la guerra", col: "#ffd23f" },
  { a: 940, b: TOTAL, label: "38 MINUTOS", sub: "la guerra más corta", col: "#ff3b3b", big: true },
];
