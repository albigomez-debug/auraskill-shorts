// Pimpín 13 · "Helado", 40.7 s. Words: congelar 51 · agosto 75 · calentitas 121 · menos 145 · Pimpín 151 · congelador 198 · mano 228 · tieso 250 · helado 278 · semanas 305 · estornudó 335 ·
// nevó 353 · panadería 364 · madre 399 · bufandas 422 · él 462 · calor 503 · historia 529 · Cuarenta 548 · grados 572 · gallinas 596 · fritos 629 · Abanicos 648 · sirven 677 · fuente 699 ·
// Hirviendo 713 · alcaldesa 738 · derretida 755 · banco 772 · Pimpín 810 · mete 822 · fuente 832 · Uno 848 · dos 860 · tres 871 · Pista 885 · hielo 894 · patinando 925 · helados 942 ·
// gallinas 982 · encantadas 997 · Porque 1019 · Pimpín 1107 · Y 1124 · dale 1150
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1222;
export const W = { toca: 40, mano: 228, tieso: 246, helado: 276, estornudo: 335, nevo: 351, bufandas: 420, fritos: 627, abanicos: 646, hirviendo: 711, alcaldesa: 736, mete: 820, uno: 846, tres: 870, pista: 883, helados: 940, gallinas: 980, dale: 1150 };
export const S = { hook: 1, premise: 2, hand: 3, icecream: 4, sneeze: 5, scarves: 6, heat: 7, tries: 8, enter: 9, rink: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
export const FT: V3 = [-1.5, 0, -1.5];
/** heat-wave tint 0..1 */
export const heat = (f: number, id: number) => id === S.heat || id === S.tries ? 1 : id === S.enter ? 1 - smooth((f - 846) / 30) : 0;
/** how frozen the fountain is (hook/end: freezes when he touches it; the plaza ice disk grows from 846) */
export const frozen = (f: number, id: number) => id === S.hook ? smooth((f - W.toca) / 20) : id === S.end ? smooth((f - 1060) / 20) : id === S.enter ? smooth((f - W.uno) / 30) : id === S.rink ? 1 : 0;
export const iceDisk = (f: number, id: number) => id === S.enter ? smooth((f - W.uno) / 34) : id === S.rink ? 1 : 0;
const [fx0, , fz0] = FT;
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [fx0 + 0.9, 2.8, fz0 + 6.4], look: [fx0 + 0.7, 1.1, fz0 + 0.6], fov: 52 }, { f: b, pos: [fx0 + 0.9, 2.5, fz0 + 5.4], look: [fx0 + 0.7, 1.1, fz0 + 0.6], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 89, keys: hk(0, 89) },
  { id: 2, a: 87, b: 167, keys: [{ f: 87, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 167, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 165, b: 264, keys: [{ f: 165, pos: [1.2, 1.6, 6.4], look: [1.2, 1.2, 2.2], fov: 50 }, { f: 264, pos: [1.2, 1.5, 5.4], look: [1.2, 1.2, 2.2], fov: 48, glide: true }] },
  { id: 4, a: 262, b: 324, keys: [{ f: 262, pos: [0.5, 1.2, 5.6], look: [0.5, 1.0, 2.5], fov: 50 }, { f: 324, pos: [0.6, 1.2, 4.7], look: [0.5, 1.0, 2.5], fov: 46, glide: true }] },
  { id: 5, a: 322, b: 385, keys: [{ f: 322, pos: [3.2, 2.4, 1.0], look: [3.0, 2.2, -7.5], fov: 56 }, { f: 385, pos: [3.2, 2.2, -0.6], look: [3.0, 2.0, -7.5], fov: 52, glide: true }] },
  { id: 6, a: 383, b: 473, keys: [{ f: 383, pos: [2.1, 1.6, 6.4], look: [2.1, 1.3, 2.2], fov: 50 }, { f: 473, pos: [2.0, 1.5, 5.4], look: [2.1, 1.3, 2.2], fov: 48, glide: true }] },
  { id: 7, a: 471, b: 648, keys: [{ f: 471, pos: [0, 3.5, 11], look: [0, 3.5, -5], fov: 58 }, { f: 590, pos: [0.5, 2.0, 7.6], look: [0, 1.2, 1.5], fov: 54, glide: true }, { f: 648, pos: [2.2, 1.0, 4.6], look: [2.6, 0.5, 1.6], fov: 48, glide: true }] },
  { id: 8, a: 646, b: 788, keys: [{ f: 646, pos: [2.2, 1.9, 7.4], look: [2.2, 1.4, 1.5], fov: 54 }, { f: 690, pos: [fx0 + 1.2, 2.2, fz0 + 4.6], look: [fx0, 0.6, fz0], fov: 50, glide: true }, { f: 730, pos: [3.4, 1.4, 5.6], look: [3.4, 0.8, 1.6], fov: 50, glide: true }, { f: 788, pos: [3.4, 1.3, 4.8], look: [3.4, 0.8, 1.6], fov: 46, glide: true }] },
  { id: 9, a: 786, b: 885, keys: [{ f: 786, pos: [fx0 + 1.6, 1.8, fz0 + 6.4], look: [fx0 + 0.4, 0.9, fz0], fov: 52 }, { f: 845, pos: [fx0 + 1.4, 1.7, fz0 + 5.4], look: [fx0 + 0.4, 0.9, fz0], fov: 50, glide: true }, { f: 885, pos: [1, 6.5, 10], look: [0, 0, -1], fov: 58, glide: true }] },
  { id: 10, a: 883, b: 1021, keys: [{ f: 883, pos: [1, 6.0, 10], look: [0, 0, -1], fov: 58 }, { f: 950, pos: [0, 2.4, 8.4], look: [0, 1.2, 0], fov: 56, glide: true }, { f: 1021, pos: [2, 1.6, 6.2], look: [2.4, 0.8, 1.4], fov: 50, glide: true }] },
  { id: 11, a: 1019, b: 1126, keys: hk(1019, 1126) },
  { id: 12, a: 1124, b: TOTAL, keys: [{ f: 1124, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 51, k: 0.03 }, { f: 248, k: 0.03 }, { f: 335, k: 0.04 }, { f: 846, k: 0.03 }, { f: 870, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.heat || id === S.rink || id === S.enter ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 84, label: "¡CONGELADA!", sub: "en pleno agosto", col: "#3a9ad8", big: true },
  { a: 246, b: 262, label: "¡TIESO!", sub: "", col: "#3a9ad8", big: true },
  { a: 298, b: 322, label: "3 SEMANAS", sub: "", col: "#3a9ad8" },
  { a: 546, b: 590, label: "45 °C", sub: "", col: "#ff3b3b", big: true },
  { a: 672, b: 690, label: "NO SIRVEN", sub: "", col: "#ff3b3b" },
  { a: 883, b: 930, label: "¡PISTA DE HIELO!", sub: "", col: "#3a9ad8", big: true },
  { a: 1019, b: 1120, label: "¡CONGELADA!", sub: "en pleno agosto", col: "#3a9ad8", big: true },
];
void smooth;
