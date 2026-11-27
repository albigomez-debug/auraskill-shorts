// Pimpín 42 · "Bailarín". Words: bailado 38 · bailar 65 · estatua 76 · menos 144 · barre 222 · brillando 247 · cola 282 · avanza 308 · boda 356 · invitados 383 · vecino 404 · baile 444 · orquesta 472 · música 496 · silla 541 ·
// trompetista 563 · pitido 608 · tambor 634 · rompe 666 · parche 675 · canta 710 · perros 751 · espera 775 · levanta 803 · palmada 832 · otra 854 · bailar 879 · sigue 905 · entero 946 · estatua 969 · apunta 1008 · Porque 1027 · Y 1116 · dale 1143
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1214;
export const W = { bailar: 55, barre: 220, brillando: 245, avanza: 306, boda: 354, invitados: 381, musica: 494, silla: 539, sopla: 576, pitido: 606, toca: 640, rompe: 664, canta: 708, perros: 749, levanta: 801, palmada: 830, otra: 852, bailar2: 877, sigue: 903, entero: 944, estatua: 967, apunta: 1006, dale: 1143 };
export const S = { hook: 1, premise: 2, sweep: 3, queue: 4, wedding: 5, silent: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const WD = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [-0.4, 2.0, 7.6], look: [0, 1.3, 0.4], fov: 58 }, { f: b, pos: [0.4, 2.0, 7.0], look: [0.3, 1.4, 0.4], fov: 56, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 106, keys: M(0, 106, 0.3, 0.6, 6.8, 1.4) },
  { id: 2, a: 104, b: 175, keys: [{ f: 104, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 175, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 173, b: 270, keys: M(173, 270, 0, 1.0, 6.0, 1.1) },
  { id: 4, a: 268, b: 335, keys: M(268, 335, 0.4, 0.6, 7.0, 1.2) },
  { id: 5, a: 333, b: 419, keys: WD(333, 419) },
  { id: 6, a: 417, b: 556, keys: WD(417, 556) },
  { id: 7, a: 554, b: 777, keys: [{ f: 554, pos: [-0.3, 1.9, 7.0], look: [0, 1.4, 0.6], fov: 56 }, { f: 680, pos: [0.3, 1.9, 6.8], look: [0.3, 1.4, 0.6], fov: 56, glide: true }, { f: 777, pos: [0.5, 1.9, 7.2], look: [0.5, 1.3, 0.6], fov: 57, glide: true }] },
  { id: 8, a: 773, b: 1029, keys: [{ f: 773, pos: [-0.4, 1.7, 5.6], look: [-0.3, 1.2, 1.0], fov: 52 }, { f: 900, pos: [0, 2.2, 8.0], look: [0.1, 1.3, 0.4], fov: 60, glide: true }, { f: 1029, pos: [0.4, 2.0, 7.6], look: [0.5, 1.6, 0.2], fov: 58, glide: true }] },
  { id: 9, a: 1027, b: 1118, keys: M(1027, 1118, 0.3, 0.6, 6.8, 1.4) },
  { id: 10, a: 1116, b: TOTAL, keys: [{ f: 1116, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 664, k: 0.02 }, { f: 830, k: 0.02 }, { f: 852, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.wedding || id === S.silent || id === S.tries || id === S.fix || id === S.premise || id === S.queue ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 66, b: 102, label: "¡LA ESTATUA!", sub: "también baila", col: "#ffd23f", big: true },
  { a: 1050, b: 1112, label: "¡LA ESTATUA!", sub: "también baila", col: "#ffd23f", big: true },
];
void smooth;
