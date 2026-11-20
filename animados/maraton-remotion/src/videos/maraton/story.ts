// "El maratón de 1904" (San Luis), 41 s. Words: coche 63 · envenenado 93 · San 111 · 1904 177 · grados 226 · agua 279 · Fred 293 · cansa 312 · coche 340 ·
// Kilómetros 356 · rompe 400 · baja 419 · estadio 438 · oro 485 · pilla 521 · Pero 538 · espera 544 · Hicks 593 · veneno 617 · huevo 653 · coñac 661 ·
// alucinando 740 · brazos 769 · gana 791 · cartero 814 · manzanas 882 · siesta 924 · cuarto 960 · Fíjate 976 · catorce 1051 · Un 1070 · Y 1138 · dale 1165
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1230;
export const W = { grados: 226, agua: 279, cansa: 312, coche: 340, rompe: 400, baja: 419, estadio: 438, pilla: 521, espera: 544, veneno: 617, huevo: 653, cognac: 661,
  alucinando: 740, brazos: 769, gana: 791, cartero: 814, manzanas: 882, siesta: 924, cuarto: 960, dale: 1165 };
export const S = { hook: 1, city: 2, car: 3, stadium: 4, caught: 5, hicks: 6, carva: 7, stats: 8, end: 9, cta: 10 };
export const ORC: V3 = [-60, 0, 0], STD: V3 = [120, 0, 0];
export const carX = (f: number) => f < 200 ? -40 + 0.2 * f : f > 1060 ? -54 + 0.2 * (f - 1066) : f <= 400 ? 3 + 0.25 * (f - 340) : 18;
export const lorzX = (f: number) => f < 340 ? 0.06 * (f - 289) : 19 + 0.06 * (f - 419);
const hk = (a: number, b: number) => [{ f: a, pos: [carX(a) - 0.6, 2.0, 7.8] as V3, look: [carX(a) - 1.4, 1.3, 0] as V3, fov: 52 }, { f: b, pos: [carX(b) - 0.6, 2.0, 7.8] as V3, look: [carX(b) - 1.4, 1.3, 0] as V3, fov: 52 }];
const X = STD[0], O = ORC[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 109, keys: hk(0, 109) },
  { id: 2, a: 107, b: 291, keys: [{ f: 107, pos: [7, 2.6, 8], look: [5, 1.4, 0], fov: 52 }, { f: 291, pos: [16, 2.0, 6.5], look: [15, 1.4, 0], fov: 50, glide: true }] },
  { id: 3, a: 289, b: 430, keys: [{ f: 289, pos: [1, 2.2, 7], look: [1, 1.4, 0], fov: 50 }, { f: 340, pos: [3, 2.2, 7], look: [3, 1.3, -0.5], fov: 50, glide: true }, { f: 400, pos: [18.5, 2.4, 7.5], look: [18, 1.4, -1], fov: 50 }, { f: 430, pos: [19.5, 2.2, 6.5], look: [19.5, 1.3, -0.5], fov: 48, glide: true }] },
  { id: 4, a: 428, b: 496, keys: [{ f: 428, pos: [X - 5, 2.4, 7.5], look: [X - 5, 1.5, 0], fov: 52 }, { f: 496, pos: [X + 3, 2.2, 6.5], look: [X + 3, 1.5, 0], fov: 50, glide: true }] },
  { id: 5, a: 494, b: 538, keys: [{ f: 494, pos: [X + 3.6, 1.9, 5.2], look: [X + 3.6, 1.5, 0], fov: 48 }, { f: 538, pos: [X + 3.7, 1.8, 4.4], look: [X + 3.7, 1.5, 0], fov: 46, glide: true }] },
  { id: 6, a: 536, b: 804, keys: [{ f: 536, pos: [30.4, 1.9, 5.4], look: [30.6, 1.5, 0], fov: 50 }, { f: 700, pos: [33.6, 1.8, 5.0], look: [33.9, 1.4, 0.3], fov: 48, glide: true }, { f: 804, pos: [35.6, 2.0, 5.4], look: [35.6, 1.6, 0.3], fov: 48, glide: true }] },
  { id: 7, a: 802, b: 976, keys: [{ f: 802, pos: [O - 0.4, 1.9, 6], look: [O - 0.2, 1.4, 1.2], fov: 50 }, { f: 976, pos: [O - 0.3, 1.6, 4.6], look: [O - 0.2, 1.2, 1.2], fov: 46, glide: true }] },
  { id: 8, a: 974, b: 1068, keys: [{ f: 974, pos: [67, 5, 10], look: [67, 0.8, 0], fov: 52 }, { f: 1068, pos: [68, 3.4, 7.5], look: [67, 0.9, 0], fov: 50, glide: true }] },
  { id: 9, a: 1066, b: 1136, keys: hk(1066, 1136) },
  { id: 10, a: 1134, b: TOTAL, keys: [{ f: 1134, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 4, k: 0.04 }, { f: 400, k: 0.05 }, { f: 521, k: 0.05 }, { f: 791, k: 0.05 }, { f: 960, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.city || id === S.stats || id === S.stadium ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 104, label: "¿EN COCHE?", sub: "y el campeón, envenenado", col: "#ff3b3b", big: true },
  { a: 111, b: 200, label: "San Luis", sub: "Juegos Olímpicos 1904", col: "#ffffff" },
  { a: 211, b: 288, label: "32 °C", sub: "caminos de tierra", col: "#ff8a3a" },
  { a: 356, b: 398, label: "17 km", sub: "en coche", col: "#ffd23f" },
  { a: 998, b: 1066, label: "32 → 14", sub: "corredores que terminaron", col: "#ffd23f" },
  { a: 1070, b: 1134, label: "TRAMPOSO", sub: "y campeón envenenado", col: "#ff3b3b", big: true },
];
