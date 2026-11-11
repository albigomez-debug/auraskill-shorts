// "La epidemia de baile de 1518", 26.7 s. Words: bailar 42 · 1518 65 · ciudad entera 113-122 · Estrasburgo 140 · julio 164 ·
// mujer 186 · calle 206 · bailar 228 · Sin música 244-254 · no para 277-281 · días 289 · decenas 326 · vecinos se unen 339-353 ·
// autoridades 388 · Atención 412 · cura 450 · bailar más 460-469 · músicos 499 · escenario 526 · Fíjate 548 · empeoró 583 ·
// cientos 622 · histeria colectiva 670-679 · hambre 703 · miedo 715 · nadie sabe 746-754 · empezó 779
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 802;
export const W = { estrasburgo: 140, mujer: 186, bailar: 228, musica: 244, dias: 289, decenas: 326, unen: 353, autoridades: 388,
  atencion: 412, cura: 450, mas: 460, musicos: 499, escenario: 526, fijate: 548, empeoro: 583, cientos: 622, histeria: 670, hambre: 703, nadie: 746 };
export const S = { hook: 1, city: 2, alone: 3, join: 4, council: 5, worse: 6, end: 7 };
export const STAGE: V3 = [3.5, 0, -7];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 95, sunAz: 130, keys: [
    { f: 0, pos: [0.2, 1.6, 4.6], look: [0, 1.3, 0], fov: 44 },
    { f: 95, pos: [0.4, 1.7, 3.8], look: [0.1, 1.4, 0], fov: 42, glide: true },
  ] },
  { id: 2, a: 91, b: 180, sunAz: 120, keys: [
    { f: 91, pos: [0, 14, 30], look: [0, 4, -10], fov: 50 },
    { f: 180, pos: [0, 6, 18], look: [0, 2, -4], fov: 48, glide: true },
  ] },
  { id: 3, a: 176, b: 305, sunAz: 130, keys: [
    { f: 176, pos: [0, 1.8, 9], look: [0, 1.2, 0], fov: 44 },
    { f: 305, pos: [0.3, 1.6, 5.2], look: [0, 1.2, 0], fov: 42, glide: true },
  ] },
  { id: 4, a: 301, b: 410, sunAz: 120, keys: [
    { f: 301, pos: [0.5, 2.0, 8], look: [0, 1.2, -1], fov: 46 },
    { f: 410, pos: [-1.0, 3.2, 12], look: [0, 1.0, -2], fov: 50, glide: true },
  ] },
  { id: 5, a: 406, b: 545, sunAz: 140, keys: [
    { f: 406, pos: [-6, 1.7, 2.6], look: [-6, 1.5, -1], fov: 42 },
    { f: 470, pos: [-5.6, 1.7, 2.2], look: [-6, 1.6, -1], fov: 40, glide: true },
    { f: 480, pos: [3.4, 2.4, 0], look: [3.5, 1.8, -7], fov: 46 },
    { f: 545, pos: [3.2, 2.2, -2.2], look: [3.5, 1.9, -7], fov: 44, glide: true },
  ] },
  { id: 6, a: 541, b: 640, sunAz: 120, keys: [
    { f: 541, pos: [0, 3, 12], look: [0, 1.2, -3], fov: 48 },
    { f: 640, pos: [0, 8, 20], look: [0, 0.8, -5], fov: 52, glide: true },
  ] },
  { id: 7, a: 636, b: TOTAL, sunAz: 160, keys: [
    { f: 636, pos: [1.2, 1.4, 5], look: [0.4, 1.0, 0], fov: 44 },
    { f: 720, pos: [0.6, 1.5, 4.2], look: [0.2, 1.1, 0], fov: 42, glide: true },
    { f: TOTAL, pos: [0, 10, 22], look: [0, 1, -4], fov: 50, glide: true },
  ] },
];
const K = kit(SHOTS, [{ f: 412, k: 0.04 }, { f: 548, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.city || id === S.worse ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 90, label: "NO PODÍAN", sub: "dejar de bailar", col: "#ffd23f", big: true },
  { a: 140, b: 200, label: "Estrasburgo", sub: "1518", col: "#ffffff" },
  { a: 286, b: 330, label: "DÍAS", sub: "sin parar", col: "#ffffff" },
  { a: 446, b: 500, label: "La cura:", sub: "¡bailar más!", col: "#ffd23f" },
  { a: 618, b: 660, label: "CIENTOS", col: "#ffd23f" },
];
