// Pimpín 28 · "Manitas", 41.7 s. Words: arreglado 38 · bici 52 · tenedor 73 · Aquí 88 · menos 131 · Pimpín 137 · arregla 166 · silla 195 · coja 203 · segundo 221 · radio 244 · abuelo 254 · chicle 274 · rompió 308 · tele 319 ·
// nueva 349 · reloj 384 · plaza 396 · para 408 · carrera 446 · salida 498 · relojero 521 · sube 532 · golpes 555 · Nada 572 · herrero 593 · aceite 611 · cae 638 · bote 646 · alcaldesa 667 · empuja 680 · aguja 691 · palo 707 ·
// aguja 721 · volando 735 · espera 759 · Pimpín 775 · caja 794 · muelle 816 · tornillo 836 · horquilla 863 · Tic 881 · tac 892 · andar 924 · campana 946 · carrera 972 · aguja 996 · vuelve 1029 · sola 1048 · Porque 1062 · Y 1154 · dale 1181
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1252;
export const W = { tenedor: 71, segundo: 219, chicle: 272, nueva: 347, para: 406, golpes: 553, aceite: 609, cae: 636, empuja: 678, volando: 733, caja: 792, muelle: 814, tornillo: 834, horquilla: 861, tic: 879, campana: 944, carrera: 970, vuelve: 1027, sola: 1046, dale: 1181 };
export const S = { hook: 1, premise: 2, chair: 3, radio: 4, tv: 5, clock: 6, tries: 7, box: 8, fixed: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 1.6, 5.8], look: [0.1, 1.0, 1.2], fov: 52 }, { f: b, pos: [0.1, 1.5, 4.8], look: [0.1, 1.0, 1.2], fov: 50, glide: true }];
const TW = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 3.0, 4.0], look: [0, 7.6, -7.6], fov: 54 }, { f: b, pos: [0, 3.2, 3.2], look: [0, 7.8, -7.6], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 90, keys: hk(0, 90) },
  { id: 2, a: 88, b: 157, keys: [{ f: 88, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 157, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 155, b: 237, keys: M(155, 237, 0.2, 1.4, 5.5, 1.0) },
  { id: 4, a: 235, b: 302, keys: M(235, 302, 0.2, 1.4, 5.5, 1.1) },
  { id: 5, a: 300, b: 365, keys: M(300, 365, 0.2, 1.4, 5.5, 1.1) },
  { id: 6, a: 363, b: 517, keys: [{ f: 363, pos: [0, 3.0, 4.0], look: [0, 7.6, -7.6], fov: 54 }, { f: 430, pos: [0, 3.0, 4.0], look: [0, 7.6, -7.6], fov: 52, glide: true }, { f: 517, pos: [0, 2.2, 9.0], look: [0, 1.4, 0.5], fov: 56, glide: true }] },
  { id: 7, a: 515, b: 759, keys: TW(515, 759) },
  { id: 8, a: 757, b: 880, keys: [{ f: 757, pos: [0.2, 1.4, 4.8], look: [0.0, 1.1, 1.2], fov: 50 }, { f: 880, pos: [0.2, 1.3, 4.0], look: [0.0, 1.1, 1.2], fov: 46, glide: true }] },
  { id: 9, a: 878, b: 1064, keys: [{ f: 878, pos: [0, 3.0, 4.0], look: [0, 7.6, -7.6], fov: 54 }, { f: 950, pos: [0, 3.0, 4.6], look: [0, 7.0, -7.6], fov: 56, glide: true }, { f: 990, pos: [0, 2.2, 9.0], look: [0, 1.2, 0.5], fov: 56, glide: true }, { f: 1020, pos: [0, 2.2, 9.0], look: [0, 1.2, 0.5], fov: 56, glide: true }, { f: 1064, pos: [0, 3.0, 4.0], look: [0, 7.6, -7.6], fov: 54, glide: true }] },
  { id: 10, a: 1062, b: 1156, keys: hk(1062, 1156) },
  { id: 11, a: 1154, b: TOTAL, keys: [{ f: 1154, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 553, k: 0.02 }, { f: 563, k: 0.02 }, { f: 636, k: 0.02 }, { f: 733, k: 0.03 }, { f: 944, k: 0.03 }, { f: 1046, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.clock || id === S.tries || id === S.fixed ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 66, b: 88, label: "¡CON TENEDOR!", sub: "", col: "#ffd23f", big: true },
  { a: 219, b: 235, label: "1 SEGUNDO", sub: "", col: "#5ab85a" },
  { a: 347, b: 363, label: "MEJOR QUE NUEVA", sub: "", col: "#5ab85a" },
  { a: 406, b: 440, label: "¡SE PARA!", sub: "", col: "#ff3b3b", big: true },
  { a: 570, b: 590, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 879, b: 905, label: "TIC, TAC", sub: "", col: "#ffd23f", big: true },
  { a: 1100, b: 1150, label: "¡CON TENEDOR!", sub: "", col: "#ffd23f", big: true },
];
void smooth;
