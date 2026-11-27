// Pimpín 34 · "Cocinero". Words: tortilla 48 · tirachinas 88 · menos 158 · cocina 192 · bizcochos 228 · flotan 243 · Sopas 260 · vecino 295 · croquetas 322 · cola 345 · paella 417 · quemar 451 · comer 497 ·
// agua 537 · inunda 562 · harina 601 · engrudo 632 · remueve 669 · pala 687 · pala 713 · espera 740 · cucharón 774 · pizca 798 · limón 835 · Remueve 850 · perfecta 898 · socarrat 922 · pala 957 · cuchara 994 · Porque 1023 · Y 1122 · dale 1149
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1221;
export const W = { tortilla: 46, tirachinas: 86, bizcochos: 226, sopas: 258, vecino: 293, croquetas: 320, cola: 343, paella: 415, quemar: 449, agua: 535, inunda: 560, harina: 599, engrudo: 630, remueve: 667, pala: 711, cucharon: 772, pizca: 796, limon: 833, remueve2: 848, perfecta: 896, socarrat: 920, pala2: 955, cuchara: 992, dale: 1149 };
export const S = { hook: 1, premise: 2, cakes: 3, soup: 4, croq: 5, paella: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const PA = (a: number, b: number, x0: number, x1: number): ShotDef["keys"] => [{ f: a, pos: [x0, 2.6, 7.0], look: [x0, 1.0, 0.6], fov: 56 }, { f: b, pos: [x1, 2.4, 6.4], look: [x1, 1.1, 0.6], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 111, keys: M(0, 111, 0, 1.2, 6.0, 1.7) },
  { id: 2, a: 109, b: 180, keys: [{ f: 109, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 180, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 178, b: 258, keys: M(178, 258, 0, 1.2, 6.0, 1.6) },
  { id: 4, a: 256, b: 312, keys: M(256, 312, 0, 1.2, 6.6, 1.4) },
  { id: 5, a: 310, b: 380, keys: M(310, 380, 0, 1.2, 7.4, 1.3) },
  { id: 6, a: 378, b: 511, keys: PA(378, 511, -0.3, 0.4) },
  { id: 7, a: 509, b: 742, keys: PA(509, 742, -0.2, 0.5) },
  { id: 8, a: 740, b: 1025, keys: [{ f: 740, pos: [-0.6, 2.0, 5.8], look: [-0.4, 1.5, 1.0], fov: 52 }, { f: 880, pos: [0.0, 2.6, 6.8], look: [0.1, 1.1, 0.6], fov: 55, glide: true }, { f: 1025, pos: [0.5, 2.3, 6.4], look: [0.5, 1.2, 0.6], fov: 54, glide: true }] },
  { id: 9, a: 1023, b: 1124, keys: M(1023, 1124, 0, 1.2, 6.0, 1.7) },
  { id: 10, a: 1122, b: TOTAL, keys: [{ f: 1122, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 86, k: 0.02 }, { f: 560, k: 0.03 }, { f: 711, k: 0.02 }, { f: 896, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.paella || id === S.tries || id === S.fix || id === S.premise || id === S.croq ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 50, b: 106, label: "¡TIRACHINAS!", sub: "para dar la vuelta", col: "#ffd23f", big: true },
  { a: 1040, b: 1118, label: "¡TIRACHINAS!", sub: "para dar la vuelta", col: "#ffd23f", big: true },
];
void smooth;
