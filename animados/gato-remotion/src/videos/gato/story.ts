// "Operación Gatito Acústico" (CIA, años 60), 34 s. Words: gato 53 · espía 71 · sesenta 93 · Fría 117 · soviéticos 163 · ocurre 203 ·
// sospeche 266 · gato 287 · operan 312 · Micrófono 326 · Antena 356 · Operación 394 · Pero 431 · gana 488 · distrae 505 · hambre 527 ·
// pájaros 550 · misión 590 · embajada 628 · sueltan 660 · exagente 689 · cruza 716 · atropella 743 · taxi 758 · terminada 781 ·
// informe 816 · práctico 900 · Vamos 916 · espía 1008
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1026;
export const W = { sesenta: 93, fria: 117, sovieticos: 163, ocurre: 203, quien: 216, sospeche: 266, gato: 287, operan: 312, micro: 326,
  antena: 356, operacion: 394, pero: 431, gana: 488, distrae: 505, hambre: 527, pajaros: 550, mision: 590, embajada: 628, sueltan: 660,
  exagente: 689, cruza: 716, atropella: 743, taxi: 758, terminada: 781, informe: 816, practico: 900, vamos: 916 };
export const S = { hook: 1, cold: 2, idea: 3, surgery: 4, problem: 5, mission: 6, taxi: 7, report: 8, end: 9 };
export const LAB: V3 = [60, 0, 0], EMB: V3 = [0, 0, -14];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 86, sunAz: 130, keys: [
    { f: 0, pos: [60.2, 1.3, 3.0], look: [60, 1.05, 0], fov: 44 },
    { f: 86, pos: [60.1, 1.2, 2.2], look: [60, 1.0, 0], fov: 40, glide: true },
  ] },
  { id: 2, a: 82, b: 180, sunAz: 120, keys: [
    { f: 82, pos: [6, 9, 16], look: [0, 3, -12], fov: 48 },
    { f: 180, pos: [2, 3, 6], look: [0, 3.5, -14], fov: 46, glide: true },
  ] },
  { id: 3, a: 176, b: 300, sunAz: 130, keys: [
    { f: 176, pos: [60, 1.6, 5.0], look: [60, 1.4, 0], fov: 44 },
    { f: 300, pos: [60.1, 1.3, 3.0], look: [60, 1.1, 0], fov: 42, glide: true },
  ] },
  { id: 4, a: 296, b: 430, sunAz: 130, keys: [
    { f: 296, pos: [60.6, 1.5, 2.8], look: [60, 1.0, 0], fov: 42 },
    { f: 360, pos: [59.6, 1.4, 2.4], look: [59.8, 1.0, 0], fov: 40, glide: true },
    { f: 430, pos: [60.2, 1.3, 2.0], look: [60, 1.0, 0], fov: 38, glide: true },
  ] },
  { id: 5, a: 426, b: 568, sunAz: 120, keys: [
    { f: 426, pos: [-1.6, 0.9, 5.6], look: [-1.5, 0.5, 2], fov: 44 },
    { f: 568, pos: [1.2, 0.8, 5.2], look: [1.2, 0.5, 2], fov: 44, glide: true },
  ] },
  { id: 6, a: 564, b: 702, sunAz: 120, keys: [
    { f: 564, pos: [1.2, 1.6, 6.5], look: [0, 1.5, -6], fov: 46 },
    { f: 702, pos: [0.4, 1.0, 3.2], look: [0, 0.7, -4], fov: 44, glide: true },
  ] },
  { id: 7, a: 698, b: 812, sunAz: 120, keys: [
    { f: 698, pos: [0.6, 1.0, 0.8], look: [0, 0.4, -4], fov: 44 },
    { f: 812, pos: [0.3, 0.8, -1.6], look: [0, 0.2, -4.6], fov: 42, glide: true },
  ] },
  { id: 8, a: 808, b: 918, sunAz: 130, keys: [
    { f: 808, pos: [61.2, 1.8, 1.6], look: [61.2, 1.0, -0.2], fov: 44 },
    { f: 918, pos: [61.2, 1.5, 1.0], look: [61.2, 0.95, -0.2], fov: 40, glide: true },
  ] },
  { id: 9, a: 914, b: TOTAL, sunAz: 130, keys: [
    { f: 914, pos: [60.1, 1.2, 2.2], look: [60, 1.0, 0], fov: 40 },
    { f: TOTAL, pos: [60.2, 1.3, 3.0], look: [60, 1.05, 0], fov: 44, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 287, k: 0.04 }, { f: 743, k: 0.08 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.cold ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 80, label: "GATO ESPÍA", sub: "de la CIA", col: "#ff3b3b", big: true },
  { a: 86, b: 172, label: "Guerra Fría", sub: "años 60", col: "#ffffff" },
  { a: 392, b: 428, label: "OPERACIÓN", sub: "Gatito Acústico", col: "#ffd23f" },
  { a: 586, b: 650, label: "MISIÓN 1", sub: "embajada soviética", col: "#ffd23f" },
  { a: 920, b: TOTAL, label: "GATO ESPÍA", sub: "de la CIA", col: "#ff3b3b", big: true },
];
