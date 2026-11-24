// Pimpín 15 · "Brillante", 36.2 s. Words: luz 41 · cuenta 67 · apagan 98 · noche 112 · menos 131 · Pimpín 138 · brilla 165 · oscuridad 176 · mosquitos 200 · partes 231 · dormir 256 ·
// caja 297 · cine 322 · película 374 · noche 399 · fiesta 423 · apagón 445 · niños 473 · bosque 499 · Linternas 516 · pilas 549 · Velas 565 · apagan 589 · luciérnaga 612 · asusta 634 ·
// va 647 · espera 664 · Pimpín 680 · bosque 699 · Paso 714 · iluminado 742 · Sale 761 · niños 783 · búho 799 · enfadado 808 · fiesta 828 · alrededor 858 · Pimpín 872 · Porque 889 ·
// Pimpín 972 · Y 989 · dale 1016
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1087;
export const W = { caja: 290, pelicula: 372, apagon: 443, ninos: 471, linternas: 514, pilas: 547, velas: 563, apagan: 587, luci: 610, asusta: 632, entra: 687, iluminado: 740, sale: 759, buho: 797, fiesta: 826, dale: 1016 };
export const S = { hook: 1, premise: 2, mosq: 3, box: 4, cine: 5, party: 6, tries: 7, forest: 8, back: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const night = (f: number, id: number) => id === S.cta ? 0 : id === S.party ? 0.55 + 0.45 * smooth((f - W.apagon) / 6) : 1;
/** string lights on? */
export const bulbs = (f: number, id: number) => id === S.party && f < W.apagon;
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 2.6, 8.4], look: [0, 1.2, 1], fov: 56 }, { f: b, pos: [0.2, 2.2, 7.2], look: [0.1, 1.2, 1], fov: 52, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 80, keys: hk(0, 80) },
  { id: 2, a: 78, b: 154, keys: [{ f: 78, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 154, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 152, b: 247, keys: [{ f: 152, pos: [-2.5, 1.6, 6.0], look: [-1.5, 1.1, 2.0], fov: 52 }, { f: 247, pos: [1.6, 1.6, 6.0], look: [1.8, 1.1, 2.0], fov: 52, glide: true }] },
  { id: 4, a: 245, b: 312, keys: [{ f: 245, pos: [2.1, 1.6, 6.2], look: [2.1, 1.1, 2.2], fov: 50 }, { f: 312, pos: [2.1, 1.5, 5.2], look: [2.1, 1.0, 2.2], fov: 48, glide: true }] },
  { id: 5, a: 310, b: 392, keys: [{ f: 310, pos: [4.5, 1.8, 0.5], look: [-1.5, 1.6, -3.5], fov: 54 }, { f: 392, pos: [3.8, 1.7, 0.2], look: [-1.5, 1.6, -3.5], fov: 52, glide: true }] },
  { id: 6, a: 390, b: 507, keys: [{ f: 390, pos: [0, 2.6, 8.4], look: [0, 1.8, 0], fov: 56 }, { f: 470, pos: [0, 2.4, 7.4], look: [0, 1.4, 1], fov: 54, glide: true }, { f: 507, pos: [-1, 2.2, 5], look: [-2, 1.2, 11], fov: 56, glide: true }] },
  { id: 7, a: 505, b: 662, keys: [{ f: 505, pos: [-1.6, 1.8, 4.6], look: [-2.2, 1.3, 9], fov: 54 }, { f: 662, pos: [-1.8, 1.7, 5.4], look: [-2.2, 1.3, 9], fov: 52, glide: true }] },
  { id: 8, a: 660, b: 762, keys: [{ f: 660, pos: [-1.5, 1.8, 5.0], look: [-2.2, 1.2, 9.5], fov: 54 }, { f: 762, pos: [-2.4, 1.6, 10.5], look: [-2.6, 1.0, 13.5], fov: 52, glide: true }] },
  { id: 9, a: 760, b: 891, keys: [{ f: 760, pos: [-2.0, 1.7, 6.0], look: [-2.2, 1.2, 10.0], fov: 52 }, { f: 820, pos: [-1.8, 1.8, 4.6], look: [-2.0, 1.2, 8.0], fov: 54, glide: true }, { f: 891, pos: [0.4, 3.6, 9.5], look: [0, 1.0, 1], fov: 56, glide: true }] },
  { id: 10, a: 889, b: 991, keys: hk(889, 991) },
  { id: 11, a: 989, b: TOTAL, keys: [{ f: 989, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 445, k: 0.04 }, { f: 549, k: 0.03 }, { f: 589, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.party ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 76, label: "¡APAGÓN!", sub: "y nadie se ha dado cuenta", col: "#ffd23f", big: true },
  { a: 360, b: 390, label: "¡FUERA!", sub: "", col: "#ff3b3b", big: true },
  { a: 443, b: 470, label: "¡APAGÓN!", sub: "", col: "#ffd23f", big: true },
  { a: 547, b: 562, label: "SIN PILAS", sub: "", col: "#ff3b3b" },
  { a: 587, b: 605, label: "SE APAGAN", sub: "", col: "#ff3b3b" },
  { a: 889, b: 985, label: "¡APAGÓN!", sub: "y nadie se ha dado cuenta", col: "#ffd23f", big: true },
];
void smooth;
