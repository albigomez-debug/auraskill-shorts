// Pimpín 25 · "Saltarín", 38.4 s. Words: saltado 38 · encima 56 · campanario 67 · Aquí 87 · menos 135 · Pimpín 142 · salta 170 · muelle 186 · manzanas 209 · escalera 225 · bombillas 256 · farolas 273 · suelo 290 · comba 326 ·
// baja 337 · minutos 356 · fiesta 395 · globo 413 · suelta 434 · sube 456/470 · cuerda 490 · panadero 524 · salta 533 · Nada 551 · escalera 580 · corta 611 · alcaldesa 632 · agarra 646 · vuela 701 · espera 721 · Pimpín 738 ·
// agacha 750 · impulso 775 · salta 798 · Agarra 812 · baja 838 · globo 846 · suelo 885 · devuelve 924 · sombrero 936 · Porque 955 · Pimpín 1037 · Y 1054 · dale 1081
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1152;
export const W = { encima: 54, manzanas: 207, bombillas: 254, comba: 324, baja: 335, suelta: 432, salta: 531, escalera: 578, agarra: 644, vuela: 699, agacha: 748, salta2: 796, baja2: 836, suelo: 883, sombrero: 934, dale: 1081 };
export const S = { hook: 1, premise: 2, apple: 3, lamp: 4, rope: 5, balloon: 6, tries: 7, jump: 8, rescue: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 2.6, 9.5], look: [0, 5.6, -6], fov: 62 }, { f: b, pos: [0.3, 2.4, 8.6], look: [0.2, 5.6, -6], fov: 60, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 88, keys: hk(0, 88) },
  { id: 2, a: 86, b: 156, keys: [{ f: 86, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 156, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 154, b: 242, keys: M(154, 242, 0, 1.4, 6.5, 1.6) },
  { id: 4, a: 240, b: 307, keys: M(240, 307, 0, 1.4, 7.0, 2.0) },
  { id: 5, a: 305, b: 374, keys: M(305, 374, 0, 1.4, 7.0, 1.6) },
  { id: 6, a: 372, b: 517, keys: [{ f: 372, pos: [0, 2.0, 9.0], look: [0, 1.8, 0], fov: 56 }, { f: 517, pos: [0, 2.4, 10.0], look: [0, 5.0, -1], fov: 60, glide: true }] },
  { id: 7, a: 515, b: 717, keys: [{ f: 515, pos: [0, 2.2, 9.0], look: [0, 2.0, 0], fov: 58 }, { f: 630, pos: [0.2, 2.2, 8.6], look: [0.2, 2.2, 0], fov: 58, glide: true }, { f: 717, pos: [0.2, 2.4, 9.6], look: [0.2, 4.0, -0.5], fov: 60, glide: true }] },
  { id: 8, a: 715, b: 812, keys: [{ f: 715, pos: [0.2, 1.3, 4.8], look: [0.0, 1.0, 1.2], fov: 50 }, { f: 790, pos: [0.2, 1.2, 4.2], look: [0.0, 1.0, 1.2], fov: 48, glide: true }, { f: 812, pos: [0.2, 1.6, 5.4], look: [0.0, 3.0, 1.2], fov: 54, glide: true }] },
  { id: 9, a: 810, b: 957, keys: [{ f: 810, pos: [0, 2.4, 10.0], look: [0, 4.8, -1], fov: 60 }, { f: 890, pos: [0, 2.0, 8.6], look: [0, 1.8, 0], fov: 56, glide: true }, { f: 957, pos: [0.3, 1.8, 7.0], look: [0.3, 1.4, 0.4], fov: 54, glide: true }] },
  { id: 10, a: 955, b: 1056, keys: hk(955, 1056) },
  { id: 11, a: 1054, b: TOTAL, keys: [{ f: 1054, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 432, k: 0.03 }, { f: 611, k: 0.02 }, { f: 796, k: 0.05 }, { f: 883, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.balloon || id === S.tries || id === S.rescue ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 40, b: 84, label: "¡POR ENCIMA!", sub: "del campanario", col: "#ffd23f", big: true },
  { a: 349, b: 372, label: "5 MIN DESPUÉS", sub: "", col: "#9ad4ff" },
  { a: 432, b: 470, label: "¡SE SUELTA!", sub: "", col: "#ff3b3b", big: true },
  { a: 549, b: 566, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 609, b: 626, label: "CORTA", sub: "", col: "#ff3b3b" },
  { a: 990, b: 1050, label: "¡POR ENCIMA!", sub: "del campanario", col: "#ffd23f", big: true },
];
void smooth;
