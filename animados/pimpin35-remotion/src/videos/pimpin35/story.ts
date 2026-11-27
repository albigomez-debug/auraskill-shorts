// Pimpín 35 · "Pelo largo". Words: cortado 41 · pelo 52 · crecer 74 · minuto 86 · calvos 122 · menos 141 · crece 189 · trenza 231 · comba 255 · bufanda 289 · pueblo 311 · barbero 333 · tijeras 359 · rompe 408 · cuerda 418 · pozo 429 ·
// cubo 453 · fondo 475 · cuerdas 518 · sueltan 542 · cadena 583 · entera 615 · asoma 654 · sombrero 690 · espera 724 · trenza 762 · caer 792 · Baja 807 · engancha 845 · cubo 859 · sube 870 · sombrero 935 · Porque 970 · Y 1056 · dale 1083
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1154;
export const W = { cortado: 39, crecer: 72, minuto: 84, trenza: 229, comba: 253, bufanda: 287, tijeras: 357, rompe: 406, cubo: 451, fondo: 473, cuerdas: 516, sueltan: 540, cadena: 581, entera: 613, asoma: 652, sombrero: 688, suelta: 750, caer: 790, baja: 805, engancha: 843, sube: 868, sombrero2: 933, dale: 1083 };
export const S = { hook: 1, premise: 2, rope: 3, scarf: 4, barber: 5, well: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
export const WX = 0.2, WZ = 0.2;
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const WL = (a: number, b: number, y0 = 1.3, y1 = 1.4): ShotDef["keys"] => [{ f: a, pos: [WX - 0.5, 2.2, 7.2], look: [WX, y0, WZ], fov: 56 }, { f: b, pos: [WX + 0.4, 2.0, 6.4], look: [WX + 0.2, y1, WZ], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 105, keys: M(0, 105, 0, 1.0, 6.0, 1.3) },
  { id: 2, a: 103, b: 170, keys: [{ f: 103, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 170, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 168, b: 280, keys: M(168, 280, 0.3, 1.0, 6.6, 1.1) },
  { id: 4, a: 278, b: 330, keys: M(278, 330, 0, 1.0, 7.0, 1.5) },
  { id: 5, a: 328, b: 386, keys: M(328, 386, 0, 1.0, 6.0, 1.3) },
  { id: 6, a: 384, b: 500, keys: WL(384, 500) },
  { id: 7, a: 498, b: 722, keys: WL(498, 722, 1.3, 1.5) },
  { id: 8, a: 720, b: 972, keys: [{ f: 720, pos: [WX - 0.6, 2.0, 6.0], look: [WX - 0.4, 1.5, WZ], fov: 54 }, { f: 860, pos: [WX, 2.6, 6.8], look: [WX, 1.2, WZ], fov: 56, glide: true }, { f: 972, pos: [WX + 0.4, 2.2, 6.2], look: [WX + 0.3, 1.5, WZ], fov: 54, glide: true }] },
  { id: 9, a: 968, b: 1058, keys: M(968, 1058, 0, 1.0, 6.0, 1.3) },
  { id: 10, a: 1056, b: TOTAL, keys: [{ f: 1056, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 406, k: 0.03 }, { f: 613, k: 0.02 }, { f: 843, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.well || id === S.tries || id === S.fix || id === S.premise || id === S.scarf ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 74, b: 102, label: "1 MINUTO", sub: "y vuelve a crecer", col: "#ffd23f", big: true },
  { a: 990, b: 1052, label: "1 MINUTO", sub: "y vuelve a crecer", col: "#ffd23f", big: true },
];
void smooth;
