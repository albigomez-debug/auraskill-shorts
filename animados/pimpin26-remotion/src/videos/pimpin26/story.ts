// Pimpín 26 · "Vista de lince", 37.6 s. Words: visto 36 · hormiga 47 · otro lado 63/68 · Aquí 89 · gafas 110 · menos 129 · Pimpín 135 · ojos 169 · águila 178 · periódico 205 · vecino 220 · ventana 238 · lluvia 264 · nube 294 ·
// examen 318 · respuestas 339 · pizarra 354 · colegio 372 · alcaldesa 410 · anillo 439 · pajar 459 · Buscan 502 · lupa 518 · Nada 531 · imán 565 · herradura 593 · granjero 616 · revuelve 626 · paja 662 · pueblo 681 ·
// espera 703 · Pimpín 719 · mira 728 · Entorna 742 · Ahí 775 · Mete 787 · saca 808 · anillo 818 · gafas 879 · alcaldesa 893 · Porque 941 · Pimpín 1013 · Y 1030 · dale 1057
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1128;
export const W = { hormiga: 45, periodico: 203, lluvia: 262, nube: 292, pizarra: 352, anillo: 437, lupa: 516, iman: 563, herradura: 591, revuelve: 624, ahi: 773, saca: 806, gafas: 877, dale: 1057 };
export const S = { hook: 1, premise: 2, news: 3, rain: 4, exam: 5, ring: 6, tries: 7, look: 8, found: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 1.8, 6.2], look: [0, 1.5, 1], fov: 52 }, { f: b, pos: [0.1, 1.7, 5.0], look: [0, 1.5, 1], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 89, keys: hk(0, 89) },
  { id: 2, a: 87, b: 151, keys: [{ f: 87, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 151, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 149, b: 252, keys: M(149, 252, 0.3, 0.6, 7.0) },
  { id: 4, a: 250, b: 307, keys: M(250, 307, 0, 1.4, 6.5, 1.6) },
  { id: 5, a: 305, b: 391, keys: M(305, 391, 0, 0.8, 7.0, 1.4) },
  { id: 6, a: 389, b: 502, keys: M(389, 502, 0.3, 0.6, 7.0, 1.2) },
  { id: 7, a: 500, b: 699, keys: [{ f: 500, pos: [0, 2.2, 7.6], look: [0.2, 1.2, 0.4], fov: 56 }, { f: 699, pos: [0.4, 2.4, 8.8], look: [0.3, 1.6, 0.4], fov: 58, glide: true }] },
  { id: 8, a: 697, b: 787, keys: [{ f: 697, pos: [0.2, 1.5, 4.6], look: [0.0, 1.35, 1.2], fov: 50 }, { f: 787, pos: [0.2, 1.45, 3.6], look: [0.0, 1.4, 1.2], fov: 44, glide: true }] },
  { id: 9, a: 785, b: 943, keys: M(785, 943, 0.3, 0.6, 6.5, 1.1) },
  { id: 10, a: 941, b: 1032, keys: hk(941, 1032) },
  { id: 11, a: 1030, b: TOTAL, keys: [{ f: 1030, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 45, k: 0.02 }, { f: 437, k: 0.03 }, { f: 591, k: 0.03 }, { f: 773, k: 0.04 }, { f: 818, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.tries ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 30, b: 85, label: "¡UNA HORMIGA!", sub: "al otro lado del río", col: "#ffd23f", big: true },
  { a: 372, b: 389, label: "¡UN 10!", sub: "", col: "#5ab85a", big: true },
  { a: 437, b: 480, label: "¡EL ANILLO!", sub: "", col: "#ff3b3b", big: true },
  { a: 529, b: 546, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 773, b: 787, label: "¡AHÍ!", sub: "", col: "#ffd23f", big: true },
  { a: 975, b: 1026, label: "¡UNA HORMIGA!", sub: "al otro lado del río", col: "#ffd23f", big: true },
];
void smooth;
