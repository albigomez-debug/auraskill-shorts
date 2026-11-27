// Pimpín 38 · "Calentito". Words: muñeco 46 · nieve 57 · charco 87 · frío 132 · menos 150 · calentito 195 · cama 230 · pueblo 247 · Tuesta 263 · manos 287 · gatos 327 · cola 342 · sentarse 353 · fuente 399 · congela 422 · fiesta 466 · agua 477 ·
// fontanero 498 · martillazos 515 · Nada 538 · caliente 572 · congela 598 · bufanda 657 · pegada 693 · espera 716 · acerca 745 · abraza 767 · derrite 807 · chorro 839 · fiesta 861 · bufanda 885 · calentita 923 · Porque 944 · Y 1041 · dale 1068
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1139;
export const W = { muneco: 44, charco: 85, cama: 228, tuesta: 261, manos: 285, gatos: 325, cola: 340, congela: 420, fiesta: 464, martillo: 513, nada: 536, caliente: 570, congela2: 596, bufanda: 655, pegada: 691, abraza: 765, derrite: 805, chorro: 837, fiesta2: 859, bufanda2: 883, calentita: 921, dale: 1068 };
export const S = { hook: 1, premise: 2, bed: 3, toast: 4, cats: 5, freeze: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const FT = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [-0.4, 2.0, 6.8], look: [0, 1.3, 0.4], fov: 56 }, { f: b, pos: [0.4, 1.9, 6.0], look: [0.3, 1.4, 0.4], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 104, keys: M(0, 104, 0, 1.0, 5.6, 1.1) },
  { id: 2, a: 102, b: 172, keys: [{ f: 102, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 172, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 170, b: 258, keys: M(170, 258, 0, 1.2, 6.0, 1.1) },
  { id: 4, a: 256, b: 300, keys: M(256, 300, 0, 1.2, 5.2, 1.4) },
  { id: 5, a: 298, b: 378, keys: M(298, 378, 0.3, 1.2, 6.4, 1.0) },
  { id: 6, a: 376, b: 490, keys: FT(376, 490) },
  { id: 7, a: 488, b: 714, keys: FT(488, 714) },
  { id: 8, a: 712, b: 944, keys: [{ f: 712, pos: [-0.6, 1.9, 6.0], look: [-0.3, 1.3, 0.4], fov: 54 }, { f: 830, pos: [0.0, 2.2, 7.4], look: [0.1, 1.6, 0.4], fov: 58, glide: true }, { f: 944, pos: [0.4, 2.0, 6.6], look: [0.4, 1.4, 0.6], fov: 55, glide: true }] },
  { id: 9, a: 942, b: 1043, keys: M(942, 1043, 0, 1.0, 5.6, 1.1) },
  { id: 10, a: 1041, b: TOTAL, keys: [{ f: 1041, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 513, k: 0.02 }, { f: 527, k: 0.02 }, { f: 837, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.freeze || id === S.tries || id === S.fix || id === S.premise ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 76, b: 100, label: "¡CHARCO!", sub: "", col: "#9ad4ff", big: true },
  { a: 1010, b: 1038, label: "¡CHARCO!", sub: "", col: "#9ad4ff", big: true },
];
void smooth;
