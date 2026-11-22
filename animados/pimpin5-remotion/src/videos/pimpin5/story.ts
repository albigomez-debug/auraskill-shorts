// Pimpín 5 · "Miedica", 38.0 s. Words: valientes 29 · menos 51 · Pimpín 57 · Ja 74/83/93 · miedo 124 · palomas 153 · sombra 178 · calcetines 204 · rayas 220 · agachado 261 ·
// ninja 321 · asustado 337 · panadería 378 · horno 409 · humo 434 · Migas 480 · gato 497 · valientes 519 · entran 531 · salen 552 · tosiendo 560 · nada 589 · Fíjate 603 ·
// sube 639 · agachado 683 · suelo 713 · adivina 732 · agachado 758 · Pimpín 777 · entra 788 · Migas 810 · sale 820 · brazos 834 · medalla 866 · corriendo 904 · brilla 939 ·
// Porque 962 · Pimpín 1025 · Y 1042 · dale 1069
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1141;
export const W = { palomas: 153, sombra: 178, rayas: 210, ninja: 321, humo: 434, migas: 480, salen: 550, tosiendo: 558, sube: 639, agachado: 683, migas2: 810, sale: 820, medalla: 866, corriendo: 904, brilla: 939, dale: 1069 };
export const S = { hook: 1, ja: 2, fear: 3, ninja: 4, bake: 5, cat: 6, giants: 7, fact: 8, idea: 9, enter: 10, medal: 11, end: 12, cta: 13 };
export const GOLD: number[] = [];
export const INT: V3 = [60, 0, 0];
export const smoke = (f: number, id: number) => (id === 6 ? 1 : smooth((f - 500) / 20));
export const pimIn = (f: number) => INT[0] + 3.5 - smooth((f - 784) / 26) * 5.0 + smooth((f - 820) / 40) * 3.0;
const I = INT[0];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.3, 2.4, 10], look: [0, 1.6, 2], fov: 54 }, { f: b, pos: [0.2, 1.4, 6.8], look: [0, 1.0, 2.4], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 68, keys: hk(0, 68) },
  { id: 2, a: 66, b: 106, keys: [{ f: 66, pos: [0, 3.0, 11], look: [0, 1.8, 2], fov: 56 }, { f: 106, pos: [0, 2.6, 10], look: [0, 1.8, 2], fov: 54, glide: true }] },
  { id: 3, a: 104, b: 240, keys: [{ f: 104, pos: [0.1, 1.6, 7.6], look: [0, 1.3, 3], fov: 50 }, { f: 240, pos: [0.2, 1.5, 6.4], look: [0.2, 1.2, 3], fov: 48, glide: true }] },
  { id: 4, a: 238, b: 356, keys: [{ f: 238, pos: [-2, 1.0, 6.8], look: [-1.8, 0.7, 3], fov: 50 }, { f: 356, pos: [2, 1.0, 6.8], look: [1.8, 0.7, 3], fov: 50, glide: true }] },
  { id: 5, a: 354, b: 465, keys: [{ f: 354, pos: [2, 4, 12], look: [-2, 3.5, -8], fov: 54 }, { f: 410, pos: [0.5, 2.8, 4], look: [-1.5, 3.2, -6], fov: 54, glide: true }, { f: 465, pos: [-1, 3.5, 3], look: [-3, 5.0, -8], fov: 56, glide: true }] },
  { id: 6, a: 463, b: 512, keys: [{ f: 463, pos: [I - 1.2, 0.7, 1.8], look: [I - 1.6, 0.5, -1.1], fov: 50 }, { f: 512, pos: [I - 1.4, 0.6, 1.1], look: [I - 1.6, 0.5, -1.1], fov: 48, glide: true }] },
  { id: 7, a: 510, b: 601, keys: [{ f: 510, pos: [I, 2.2, 7], look: [I, 2.0, 0], fov: 56 }, { f: 601, pos: [I + 0.4, 1.6, 5.4], look: [I, 1.6, 0.5], fov: 54, glide: true }] },
  { id: 8, a: 599, b: 727, keys: [{ f: 599, pos: [I, 1.8, 7.5], look: [I, 1.8, 0], fov: 56 }, { f: 727, pos: [I + 0.2, 1.5, 6.0], look: [I, 1.5, 0], fov: 54, glide: true }] },
  { id: 9, a: 725, b: 786, keys: [{ f: 725, pos: [I + 0.7, 0.8, 3.6], look: [I + 0.5, 0.6, 0.8], fov: 50 }, { f: 786, pos: [I + 0.6, 0.6, 2.8], look: [I + 0.5, 0.5, 0.8], fov: 48, glide: true }] },
  { id: 10, a: 784, b: 852, keys: [{ f: 784, pos: [I + 3.6, 0.8, 4.0], look: [I + 3.0, 0.6, 0.8], fov: 54 }, { f: 812, pos: [I - 0.8, 0.7, 3.4], look: [I - 1.4, 0.5, -0.2], fov: 52, glide: true }, { f: 852, pos: [I + 0.8, 0.8, 3.6], look: [I + 0.8, 0.6, 0.8], fov: 52, glide: true }] },
  { id: 11, a: 850, b: 962, keys: [{ f: 850, pos: [1.0, 1.4, 1.8], look: [0.8, 1.2, -2.4], fov: 54 }, { f: 900, pos: [0.9, 1.3, 1.2], look: [0.8, 1.2, -2.4], fov: 50, glide: true }, { f: 962, pos: [-1.5, 2.0, 4.5], look: [-3.5, 1.2, -2.4], fov: 56, glide: true }] },
  { id: 12, a: 960, b: 1042, keys: hk(960, 1042) },
  { id: 13, a: 1040, b: TOTAL, keys: [{ f: 1040, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 159, k: 0.02 }, { f: 184, k: 0.02 }, { f: 216, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.bake || id === S.hook || id === S.end ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 62, label: "¡VALIENTES!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
  { a: 176, b: 204, label: "¡SU SOMBRA!", sub: "", col: "#ffffff" },
  { a: 318, b: 354, label: "NINJA...", sub: "pero asustado", col: "#ffd23f" },
  { a: 936, b: 960, label: "¡BRILLA!", sub: "", col: "#ffd23f" },
  { a: 583, b: 600, label: "NO VEN NADA", sub: "", col: "#ffffff" },
  { a: 683, b: 725, label: "¡AGACHADO!", sub: "el humo caliente sube", col: "#8ae86a" },
  { a: 962, b: 1038, label: "¡VALIENTES!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
];
