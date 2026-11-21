// Pimpín 5 · "Humo en la panadería", 40.7 s. Words: incendio 11 · bajito 47 · razón 94 · Villazanca 110 · panadería 139 · Hogaza 165 · horno 188 · humo 226 ·
// vecinos 262 · gigantes 286 · tosen 336 · nada 362 · salir 387 · Migas 418 · gato 434 · Pimpín 465 · humo 516 · arriba 526 · abajo 548 · respira 566 · Fíjate 585 ·
// sube 622 · agachado 676 · suelo 712 · Pimpín 736 · Entra 778 · Migas 803 · mesa 823 · sale 833 · brazos 847 · bomberos 878 · apagan 892 · regala 947 · tarta 973 ·
// grande 987 · En 1014 · razón 1105 · Y 1122 · dale 1148
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1220;
export const W = { hogaza: 165, humo: 226, tosen: 336, salir: 387, migas: 418, sube: 622, agachado: 676, migas2: 803, sale: 833, bomberos: 878, apagan: 892, regala: 947, tarta: 973, dale: 1148 };
export const S = { hook: 1, intro: 2, giants: 3, cat: 4, idea: 5, fact: 6, enter: 7, out: 8, cake: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const INT: V3 = [60, 0, 0];
export const smoke = (f: number, id: number) => (id === 1 || id === 10 ? 1 : smooth((f - 240) / 30));
export const pimIn = (f: number) => INT[0] + 3.5 - smooth((f - 740) / 70) * 5.0 + smooth((f - 833) / 30) * 4.5;
const I = INT[0];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [I + 0.4, 0.8, 4.6], look: [I - 0.4, 1.3, 0], fov: 56 }, { f: b, pos: [I - 0.2, 0.7, 3.4], look: [I - 0.5, 0.8, 0.8], fov: 52, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 108, keys: hk(0, 108) },
  { id: 2, a: 106, b: 254, keys: [{ f: 106, pos: [2, 4, 12], look: [-2, 3.5, -8], fov: 54 }, { f: 190, pos: [0.5, 2.8, 4], look: [-1.5, 3.2, -6], fov: 54, glide: true }, { f: 254, pos: [-1, 3.5, 3], look: [-3, 5.0, -8], fov: 56, glide: true }] },
  { id: 3, a: 252, b: 400, keys: [{ f: 252, pos: [I, 2.2, 7], look: [I, 2.0, 0], fov: 56 }, { f: 400, pos: [I + 0.4, 1.6, 5.4], look: [I, 1.6, 0.5], fov: 54, glide: true }] },
  { id: 4, a: 398, b: 465, keys: [{ f: 398, pos: [I - 1.2, 0.7, 1.8], look: [I - 1.6, 0.5, -1.1], fov: 50 }, { f: 465, pos: [I - 1.4, 0.6, 1.1], look: [I - 1.6, 0.5, -1.1], fov: 48, glide: true }] },
  { id: 5, a: 463, b: 585, keys: [{ f: 463, pos: [I + 0.7, 0.9, 3.4], look: [I + 0.5, 0.9, 0.8], fov: 50 }, { f: 520, pos: [I + 0.8, 1.6, 4.4], look: [I + 0.5, 2.6, 0], fov: 56, glide: true }, { f: 585, pos: [I + 0.6, 0.6, 3.2], look: [I + 0.5, 0.7, 0.8], fov: 52, glide: true }] },
  { id: 6, a: 583, b: 734, keys: [{ f: 583, pos: [I, 1.8, 7.5], look: [I, 1.8, 0], fov: 56 }, { f: 734, pos: [I + 0.2, 1.5, 6.0], look: [I, 1.5, 0], fov: 54, glide: true }] },
  { id: 7, a: 732, b: 862, keys: [{ f: 732, pos: [I + 3.6, 0.8, 4.0], look: [I + 3.0, 0.8, 0.8], fov: 54 }, { f: 800, pos: [I - 0.8, 0.7, 3.4], look: [I - 1.4, 0.6, -0.2], fov: 52, glide: true }, { f: 862, pos: [I + 2.2, 0.8, 3.6], look: [I + 2.2, 0.8, 0.8], fov: 52, glide: true }] },
  { id: 8, a: 860, b: 922, keys: [{ f: 860, pos: [0, 3.0, 6], look: [-2.5, 2.5, -7], fov: 56 }, { f: 922, pos: [0.5, 2.5, 4], look: [-1.5, 2.2, -6], fov: 54, glide: true }] },
  { id: 9, a: 920, b: 1014, keys: [{ f: 920, pos: [1.0, 1.4, 1.8], look: [0.6, 1.6, -4], fov: 54 }, { f: 1014, pos: [1.4, 1.8, 3.2], look: [1.2, 1.9, -3], fov: 56, glide: true }] },
  { id: 10, a: 1012, b: 1118, keys: hk(1012, 1118) },
  { id: 11, a: 1116, b: TOTAL, keys: [{ f: 1116, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 336, k: 0.03 }, { f: 892, k: 0.03 }, { f: 973, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.intro || id === S.out ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 104, label: "¡SOLO ÉL!", sub: "pudo entrar en el incendio", col: "#ff3b3b", big: true },
  { a: 110, b: 160, label: "VILLAZANCA", sub: "la panadería", col: "#ffffff" },
  { a: 676, b: 732, label: "¡AGÁCHATE!", sub: "el humo caliente sube", col: "#8ae86a" },
  { a: 1014, b: 1112, label: "¡SOLO ÉL!", sub: "pudo entrar en el incendio", col: "#ff3b3b", big: true },
];
