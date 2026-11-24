// Pimpín 17 · "Pesado", 39.6 s. Words: sentado 40 · banco 54 · agujero 78 · pesan 111 · menos 139 · Pimpín 145 · elefante 188 · comba 221 · terremotos 253 · balancín 282 · volando 318 ·
// báscula 345 · médico 358 · baja 396 · vendaval 431 · siglo 458 · tejas 488 · gallinas 513 · vecinos 553 · farola 596 · volando 621 · árbol 647 · volando 672 · alcaldesa 695 · panadero 722 ·
// volando 746 · espera 778 · Pimpín 794 · mueve 810 · milímetro 834 · agarra 873 · Pimpín 883 · bandera 907 · humana 916 · viento 951 · despeinado 975 · Porque 998 · Pimpín 1073 · dale 1116
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1188;
export const W = { sienta: 40, agujero: 64, comba: 219, alarma: 232, volando: 312, bascula: 343, baja: 394, tejas: 486, gallinas: 511, vecinos: 551, farola: 594, vfarola: 612, arbol: 645, varbol: 663, panadero: 720, vdos: 740, agarra: 871, viento: 949, dale: 1116 };
export const S = { hook: 1, premise: 2, rope: 3, seesaw: 4, scale: 5, wind: 6, tries: 7, stand: 8, flag: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const windy = (f: number, id: number) => id === S.wind || id === S.tries || id === S.stand || (id === S.flag && f < W.viento);
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.5, 1.5, 6.0], look: [0.5, 0.9, 2.2], fov: 50 }, { f: b, pos: [0.6, 1.4, 5.0], look: [0.5, 0.8, 2.2], fov: 48, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 98, keys: hk(0, 98) },
  { id: 2, a: 96, b: 165, keys: [{ f: 96, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 165, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 163, b: 277, keys: [{ f: 163, pos: [0.5, 1.8, 7.4], look: [0.5, 1.2, 1.5], fov: 54 }, { f: 277, pos: [0.5, 1.7, 6.6], look: [0.5, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 4, a: 275, b: 338, keys: [{ f: 275, pos: [0.3, 2.0, 9.4], look: [0.3, 1.3, 1.4], fov: 58 }, { f: 338, pos: [0.7, 2.8, 9.6], look: [1.4, 2.8, 1.4], fov: 58, glide: true }] },
  { id: 5, a: 336, b: 414, keys: [{ f: 336, pos: [2.0, 1.4, 6.0], look: [2.0, 0.9, 2.0], fov: 50 }, { f: 414, pos: [2.0, 1.2, 5.0], look: [2.0, 0.7, 2.0], fov: 48, glide: true }] },
  { id: 6, a: 412, b: 573, keys: [{ f: 412, pos: [0, 3.0, 10], look: [0, 3.5, -5], fov: 58 }, { f: 500, pos: [0, 2.4, 9], look: [0, 2.6, 0], fov: 58, glide: true }, { f: 573, pos: [0, 2.2, 8.4], look: [0, 2.2, 1], fov: 56, glide: true }] },
  { id: 7, a: 571, b: 778, keys: [{ f: 571, pos: [-1, 2.4, 8.4], look: [-1, 2.0, 1], fov: 58 }, { f: 778, pos: [1, 2.6, 8.8], look: [1, 2.4, 1], fov: 58, glide: true }] },
  { id: 8, a: 776, b: 855, keys: [{ f: 776, pos: [0.4, 1.2, 4.4], look: [0.2, 0.8, 1.2], fov: 50 }, { f: 855, pos: [0.4, 1.1, 3.8], look: [0.2, 0.8, 1.2], fov: 46, glide: true }] },
  { id: 9, a: 853, b: 1000, keys: [{ f: 853, pos: [2.6, 2.0, 8.4], look: [2.6, 1.2, 1.2], fov: 56 }, { f: 1000, pos: [1.4, 1.8, 7.0], look: [1.2, 1.0, 1.2], fov: 54, glide: true }] },
  { id: 10, a: 998, b: 1092, keys: hk(998, 1092) },
  { id: 11, a: 1090, b: TOTAL, keys: [{ f: 1090, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 64, k: 0.05 }, { f: 232, k: 0.07 }, { f: 240, k: 0.05 }, { f: 312, k: 0.04 }, { f: 1062, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.wind || id === S.tries ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 92, label: "¡UN AGUJERO!", sub: "donde había un banco", col: "#ff8a2a", big: true },
  { a: 232, b: 270, label: "¡TERREMOTO!", sub: "", col: "#ff3b3b", big: true },
  { a: 394, b: 412, label: "DE BAJA", sub: "", col: "#ff3b3b" },
  { a: 806, b: 850, label: "NI UN MILÍMETRO", sub: "", col: "#ffd23f" },
  { a: 998, b: 1086, label: "¡UN AGUJERO!", sub: "donde había un banco", col: "#ff8a2a", big: true },
];
void smooth;
