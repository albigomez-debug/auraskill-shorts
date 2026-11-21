// "El babuino guardavías" (Jack y James Wide, Uitenhage, Sudáfrica, años 1880), 40 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1198;
export const W = { sudafrica: 106, y1880: 128, james: 167, ferrocarril: 193, hasta: 215, cae: 233, vagones: 251, pierde: 264, piernas: 283,
  que: 308, compra: 334, babuino: 345, llama: 370, jack: 378, james2: 394, empujar: 417, carrito: 430, entregar: 450, llaves: 465,
  maquinistas: 479, mover: 505, palancas: 516, senales: 533, hasta2: 556, pasajera: 571, ventana: 595, mono: 619, vias: 645, escandalo: 663,
  compania: 691, examen: 730, jack2: 743, resultado: 759, aprobado: 784, contratan: 821, sueldo: 845, veinte: 872, dia: 894, media: 909,
  cerveza: 929, nueve: 964, puesto: 986, ni: 1004, fallo: 1012, mas: 1030, humanos: 1057, porque: 1078 };
export const S = { hook: 1, intro: 2, fall: 3, buy: 4, push: 5, keys: 6, levers: 7, lady: 8, exam: 9, pay: 10, best: 11, end: 12 };
export const RAIL: V3 = [0, 0, 0], BOX: V3 = [6, 0, 0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, sunAz: 120, keys: [
    { f: 0, pos: [6.6, 1.0, 2.6], look: [6.2, 0.75, 0], fov: 44 },
    { f: 100, pos: [6.4, 0.9, 2.0], look: [6.1, 0.7, 0], fov: 42, glide: true },
  ] },
  { id: 2, a: 96, b: 225, sunAz: 130, keys: [
    { f: 96, pos: [-6, 6, 18], look: [0, 1.5, -2], fov: 46 },
    { f: 225, pos: [-1.0, 1.6, 5.0], look: [-1.2, 1.2, 0], fov: 44, glide: true },
  ] },
  { id: 3, a: 221, b: 300, sunAz: 120, keys: [
    { f: 221, pos: [-1.6, 1.4, 4.4], look: [-1.6, 1.0, -1], fov: 44 },
    { f: 300, pos: [-1.6, 1.2, 3.6], look: [-1.6, 0.9, -1], fov: 42, glide: true },
  ] },
  { id: 4, a: 296, b: 392, sunAz: 130, keys: [
    { f: 296, pos: [0.3, 1.2, 3.8], look: [0.2, 0.8, 0], fov: 44 },
    { f: 392, pos: [0.4, 1.0, 2.9], look: [0.3, 0.75, 0], fov: 42, glide: true },
  ] },
  { id: 5, a: 388, b: 448, sunAz: 120, keys: [
    { f: 388, pos: [-2.0, 1.2, 4.4], look: [-1.0, 0.8, 0], fov: 44 },
    { f: 448, pos: [1.0, 1.2, 4.4], look: [1.4, 0.8, 0], fov: 44, glide: true },
  ] },
  { id: 6, a: 444, b: 502, sunAz: 130, keys: [
    { f: 444, pos: [-3.4, 1.4, 3.6], look: [-3.4, 1.2, -1], fov: 44 },
    { f: 502, pos: [-3.3, 1.3, 3.0], look: [-3.4, 1.15, -1], fov: 42, glide: true },
  ] },
  { id: 7, a: 498, b: 556, sunAz: 120, keys: [
    { f: 498, pos: [6.5, 1.1, 2.8], look: [6.1, 0.85, 0], fov: 44 },
    { f: 556, pos: [6.3, 1.0, 2.2], look: [6.1, 0.8, 0], fov: 42, glide: true },
  ] },
  { id: 8, a: 552, b: 687, sunAz: 140, keys: [
    { f: 552, pos: [3.0, 1.7, 5.4], look: [3.6, 1.3, -1], fov: 46 },
    { f: 687, pos: [3.4, 1.5, 4.4], look: [4.0, 1.2, -0.5], fov: 44, glide: true },
  ] },
  { id: 9, a: 683, b: 842, sunAz: 130, keys: [
    { f: 683, pos: [6.6, 1.5, 4.2], look: [6.3, 1.1, 0], fov: 44 },
    { f: 842, pos: [6.5, 1.3, 3.2], look: [6.3, 1.0, 0], fov: 42, glide: true },
  ] },
  { id: 10, a: 838, b: 1026, sunAz: 120, keys: [
    { f: 838, pos: [0.4, 1.1, 3.0], look: [0.3, 0.85, 0], fov: 42 },
    { f: 1026, pos: [0.5, 1.2, 3.8], look: [0.35, 0.9, 0], fov: 44, glide: true },
  ] },
  { id: 11, a: 1022, b: 1078, sunAz: 130, keys: [
    { f: 1022, pos: [-2.2, 1.4, 4.4], look: [-2.2, 1.0, 0], fov: 44 },
    { f: 1078, pos: [-2.1, 1.3, 3.6], look: [-2.2, 1.0, 0], fov: 42, glide: true },
  ] },
  { id: 12, a: 1074, b: TOTAL, sunAz: 120, keys: [
    { f: 1074, pos: [6.4, 0.9, 2.0], look: [6.1, 0.7, 0], fov: 42 },
    { f: TOTAL, pos: [6.6, 1.0, 2.6], look: [6.2, 0.75, 0], fov: 44, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 8, k: 0.04 }, { f: W.cae, k: 0.08 }, { f: W.escandalo, k: 0.05 }, { f: W.aprobado, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.intro ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 96, label: "9 AÑOS", sub: "ni un solo error", col: "#ffd23f", big: true },
  { a: 100, b: 165, label: "Sudáfrica", sub: "1880", col: "#ffffff" },
  { a: 374, b: 440, label: "JACK", sub: "el babuino", col: "#ffd23f" },
  { a: 660, b: 686, label: "¡ESCÁNDALO!", col: "#ff3b3b" },
  { a: 868, b: 905, label: "20 céntimos", sub: "al día", col: "#ffd23f" },
  { a: 906, b: 960, label: "+ ½ cerveza", sub: "a la semana", col: "#ffd23f" },
  { a: 962, b: 1020, label: "9 AÑOS", sub: "0 fallos", col: "#ffd23f" },
  { a: 1076, b: TOTAL, label: "9 AÑOS", sub: "ni un solo error", col: "#ffd23f", big: true },
];
