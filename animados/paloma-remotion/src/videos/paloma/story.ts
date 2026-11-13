// "Proyecto Paloma" (B. F. Skinner, 1943), 36.7 s. Words: palomas 73 · misiles 100 · serio 123 · 1943 136 · apuntar 222 · Skinner 255 ·
// brutal 311 · tres 341 · bomba 378 · pantallita 423 · barco 444 · picotea 497 · gira 527 · fallan 607 · dinero 642 · demostración 667 ·
// risa 730 · Nadie 743 · suerte 814 · cancelan 846 · desgracia 881 · Marina 912 · resucita 924 · cancelar 971 · Estados 1019 · misiles 1080
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1100;
export const W = { serio: 123, apuntar: 222, skinner: 255, brutal: 311, tres: 341, bomba: 378, pantalla: 423, barco: 444, picotea: 497,
  gira: 527, picotea2: 548, entrena: 570, fallan: 607, dinero: 642, demo: 667, generales: 697, risa: 730, nadie: 743, suerte: 814,
  cancelan: 846, desgracia: 881, marina: 912, resucita: 924, cancelar: 971, asi: 992 };
export const S = { hook: 1, lab: 2, skinner: 3, nose: 4, peck: 5, turn: 6, train: 7, demo: 8, cancel: 9, navy: 10, end: 11 };
export const SKY = 60;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 120, sunAz: 120, keys: [
    { f: 0, pos: [-0.6, SKY + 0.5, 4.2], look: [0.7, SKY, 0], fov: 46 },
    { f: 120, pos: [1.6, SKY + 0.2, 2.4], look: [1.15, SKY, 0], fov: 40, glide: true },
  ] },
  { id: 2, a: 116, b: 238, sunAz: 130, keys: [
    { f: 116, pos: [2.5, 3.2, 8], look: [0, 1.2, -1], fov: 48 },
    { f: 238, pos: [0.8, 1.7, 4.2], look: [0.2, 1.2, 0], fov: 44, glide: true },
  ] },
  { id: 3, a: 234, b: 324, sunAz: 130, keys: [
    { f: 234, pos: [0.3, 1.5, 3.2], look: [0, 1.2, 0], fov: 44 },
    { f: 300, pos: [0.7, 1.25, 2.0], look: [0.6, 1.15, 0], fov: 38, glide: true },
    { f: 324, pos: [0.68, 1.3, 1.5], look: [0.62, 1.3, 0], fov: 34, glide: true },
  ] },
  { id: 4, a: 320, b: 466, sunAz: 130, keys: [
    { f: 320, pos: [3, 1.7, 2.2], look: [3, 1.5, -2], fov: 44 },
    { f: 466, pos: [3, 1.6, 1.0], look: [3, 1.5, -2], fov: 40, glide: true },
  ] },
  { id: 5, a: 462, b: 524, sunAz: 130, keys: [
    { f: 462, pos: [0.55, 1.3, 2.0], look: [0.6, 1.15, 0], fov: 40 },
    { f: 524, pos: [0.65, 1.25, 1.6], look: [0.65, 1.15, 0], fov: 38, glide: true },
  ] },
  { id: 6, a: 520, b: 566, sunAz: 120, keys: [
    { f: 520, pos: [0.4, SKY + 0.8, 5.5], look: [0.6, SKY, 0], fov: 46 },
    { f: 566, pos: [1.2, SKY + 0.6, 4.8], look: [0.8, SKY, 0], fov: 44, glide: true },
  ] },
  { id: 7, a: 562, b: 656, sunAz: 130, keys: [
    { f: 562, pos: [0.0, 1.4, 2.6], look: [0.3, 1.1, 0], fov: 42 },
    { f: 656, pos: [0.6, 1.3, 2.0], look: [0.5, 1.1, 0], fov: 40, glide: true },
  ] },
  { id: 8, a: 652, b: 812, sunAz: 130, keys: [
    { f: 652, pos: [0, 2.2, 8.5], look: [0, 1.3, 0], fov: 46 },
    { f: 730, pos: [0.5, 1.7, 6.0], look: [0, 1.4, 0.5], fov: 44, glide: true },
    { f: 812, pos: [0.8, 1.6, 4.8], look: [0.3, 1.4, 0.8], fov: 42, glide: true },
  ] },
  { id: 9, a: 808, b: 906, sunAz: 130, keys: [
    { f: 808, pos: [3, 1.6, 0.9], look: [3, 1.45, -2], fov: 42 },
    { f: 906, pos: [3, 1.55, 0.4], look: [3, 1.45, -2], fov: 40, glide: true },
  ] },
  { id: 10, a: 902, b: 990, sunAz: 130, keys: [
    { f: 902, pos: [-0.9, 1.6, 4.0], look: [-1.0, 1.3, 0], fov: 44 },
    { f: 990, pos: [-1.0, 1.5, 3.0], look: [-1.05, 1.3, 0], fov: 42, glide: true },
  ] },
  { id: 11, a: 986, b: TOTAL, sunAz: 120, keys: [
    { f: 986, pos: [1.6, SKY + 0.2, 2.4], look: [1.15, SKY, 0], fov: 40 },
    { f: TOTAL, pos: [-0.6, SKY + 0.5, 4.2], look: [0.7, SKY, 0], fov: 46, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 497, k: 0.03 }, { f: 730, k: 0.03 }, { f: 846, k: 0.05 }, { f: 971, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.lab || id === S.demo ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 114, label: "PALOMAS", sub: "pilotando misiles", col: "#ff3b3b", big: true },
  { a: 128, b: 230, label: "1943", sub: "Estados Unidos", col: "#ffffff" },
  { a: 250, b: 320, label: "B. F. Skinner", sub: "psicólogo", col: "#ffd23f" },
  { a: 990, b: TOTAL, label: "PALOMAS", sub: "pilotando misiles", col: "#ff3b3b", big: true },
];
