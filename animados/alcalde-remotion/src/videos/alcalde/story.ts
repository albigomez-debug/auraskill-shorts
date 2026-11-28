// "El gato alcalde" (Stubbs, alcalde honorario de Talkeetna, Alaska, 1997-2017), 42 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1256;
export const W = { talkeetna: 99, y1997: 120, vecinos: 171, convence: 190, candidato: 210, asi: 232, leyenda: 261, propone: 286,
  stubbs: 296, gatito: 317, tienda: 332, arrasa: 364, desde: 382, alcalde: 413, despacho: 448, tienda2: 470, atiende: 488, turistas: 503,
  posa: 522, fotos: 537, bebe: 549, hierba: 566, copa: 593, vino: 602, cada: 618, visitan: 632, decenas: 643, cartas: 692, mundo: 712,
  senado: 760, gestion: 785, impuestos: 825, promesas: 854, escandalo: 887, bueno: 909, duerme: 946, siesta: 956, se: 997, y2017: 1010,
  veinte: 1042, invicto: 1065, mejor: 1132, porque: 1176 };
export const S = { hook: 1, town: 2, vote: 3, office: 4, tour: 5, fame: 6, gov: 7, nap: 8, legacy: 9, end: 10 };
export const TOWN: V3 = [0, 0, 0], STORE: V3 = [60, 0, 0], HALL: V3 = [-60, 0, 0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 95, sunAz: 120, keys: [
    { f: 0, pos: [60.1, 1.3, 2.4], look: [60, 1.15, 0], fov: 42 },
    { f: 95, pos: [60.05, 1.25, 1.9], look: [60, 1.15, 0], fov: 40, glide: true },
  ] },
  { id: 2, a: 91, b: 230, sunAz: 130, keys: [
    { f: 91, pos: [4, 6, 22], look: [0, 3, -6], fov: 46 },
    { f: 230, pos: [0.4, 1.6, 5.2], look: [0, 1.3, 0], fov: 44, glide: true },
  ] },
  { id: 3, a: 226, b: 380, sunAz: 120, keys: [
    { f: 226, pos: [-60, 1.6, 4.8], look: [-60, 1.2, 0], fov: 44 },
    { f: 380, pos: [-59.8, 1.4, 3.6], look: [-59.9, 1.1, 0], fov: 42, glide: true },
  ] },
  { id: 4, a: 376, b: 486, sunAz: 140, keys: [
    { f: 376, pos: [61.2, 1.6, 4.2], look: [60.2, 1.4, 0], fov: 46 },
    { f: 486, pos: [60.4, 1.4, 2.8], look: [60.1, 1.25, 0], fov: 42, glide: true },
  ] },
  { id: 5, a: 482, b: 616, sunAz: 130, keys: [
    { f: 482, pos: [60.8, 1.4, 3.6], look: [60.3, 1.2, 0], fov: 44 },
    { f: 580, pos: [60.3, 1.3, 2.7], look: [60.1, 1.2, 0], fov: 42, glide: true },
    { f: 616, pos: [60.1, 1.25, 2.0], look: [60.05, 1.15, 0], fov: 40, glide: true },
  ] },
  { id: 6, a: 612, b: 778, sunAz: 120, keys: [
    { f: 612, pos: [3, 3, 10], look: [0, 1.4, -1], fov: 46 },
    { f: 778, pos: [0.6, 1.5, 5.2], look: [0.2, 1.4, 0], fov: 44, glide: true },
  ] },
  { id: 7, a: 774, b: 905, sunAz: 130, keys: [
    { f: 774, pos: [-57.9, 1.7, 4.4], look: [-57.9, 1.55, -1], fov: 44 },
    { f: 905, pos: [-57.9, 1.6, 3.8], look: [-57.9, 1.5, -1], fov: 44, glide: true },
  ] },
  { id: 8, a: 901, b: 1000, sunAz: 130, keys: [
    { f: 901, pos: [60.1, 1.3, 2.4], look: [60, 1.1, 0], fov: 42 },
    { f: 1000, pos: [60.05, 1.2, 1.8], look: [60, 1.1, 0], fov: 40, glide: true },
  ] },
  { id: 9, a: 996, b: 1175, sunAz: 150, keys: [
    { f: 996, pos: [0, 2.4, 9], look: [0, 1.8, -2], fov: 46 },
    { f: 1175, pos: [0, 1.9, 5.4], look: [0, 1.8, -2], fov: 44, glide: true },
  ] },
  { id: 10, a: 1171, b: TOTAL, sunAz: 120, keys: [
    { f: 1171, pos: [60.05, 1.25, 1.9], look: [60, 1.15, 0], fov: 40 },
    { f: TOTAL, pos: [60.1, 1.3, 2.4], look: [60, 1.15, 0], fov: 42, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 12, k: 0.03 }, { f: W.arrasa, k: 0.05 }, { f: W.senado, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.town || id === S.fame || id === S.legacy ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 90, label: "GATO ALCALDE", sub: "durante 20 años", col: "#ffd23f", big: true },
  { a: 96, b: 168, label: "Talkeetna", sub: "Alaska · 1997", col: "#ffffff" },
  { a: 360, b: 380, label: "¡ARRASA!", col: "#ffd23f" },
  { a: 756, b: 778, label: "¿SENADO?", col: "#ffd23f" },
  { a: 1040, b: 1090, label: "20 AÑOS", sub: "invicto", col: "#ffd23f" },
  { a: 1172, b: TOTAL, label: "GATO ALCALDE", sub: "durante 20 años", col: "#ffd23f", big: true },
];
