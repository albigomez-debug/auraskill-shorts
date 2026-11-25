// Pimpín 24 · "Puntería", 40.4 s. Words: encestado 37 · canica 53 · campanario 72 · puntería 113 · menos 135 · Pimpín 141 · falla 171 · papel 202 · papelera 213 · plaza 248 · cereza 278 · boca 301 · abuelo 313 ·
// feria 339 · peluches 401 · piñata 468 · historia 494 · veinte metros 517/525 · piedras 560 · rozan 585 · palo 607 · alcalde 634 · alcaldesa 666 · zapato 690 · colgado 728 · piñata 749 · espera 772 · Pimpín 788 ·
// canica 809 · Apunta 826 · lanza 845 · Plof 861 · explota 888 · caramelos 910 · zapato 957 · pie 1009 · Porque 1021 · Pimpín 1097 · Y 1114 · dale 1141
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1213;
export const W = { encestado: 35, papel: 200, papelera: 228, cereza: 276, boca: 299, peluches: 399, piedras: 558, palo: 605, alcalde: 632, zapato: 688, colgado: 726, apunta: 824, lanza: 843, plof: 859, caramelos: 908, pie: 1007, dale: 1141 };
export const S = { hook: 1, premise: 2, paper: 3, cherry: 4, fair: 5, pinata: 6, tries: 7, aim: 8, boom: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 1.3, 5.6], look: [0, 0.8, 2], fov: 54 }, { f: a + 44, pos: [0.1, 1.2, 5.2], look: [0, 0.9, 2], fov: 54, glide: true }, { f: b, pos: [0, 3.0, 9.5], look: [0, 6.5, -8], fov: 60, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 110, keys: hk(0, 110) },
  { id: 2, a: 108, b: 170, keys: [{ f: 108, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 170, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 168, b: 262, keys: [{ f: 168, pos: [-2.4, 1.9, 6.0], look: [-2.4, 1.2, 1.2], fov: 54 }, { f: 198, pos: [-2.4, 2.0, 6.6], look: [-2.2, 1.3, 1.0], fov: 56, glide: true }, { f: 230, pos: [2.2, 2.0, 6.4], look: [2.6, 1.0, 0.5], fov: 56, glide: true }, { f: 262, pos: [2.4, 1.9, 5.8], look: [2.7, 1.0, 0.5], fov: 54, glide: true }] },
  { id: 4, a: 260, b: 335, keys: M(260, 335, 0.2, 1.3, 6.0) },
  { id: 5, a: 333, b: 440, keys: M(333, 440, 0, 1.3, 6.0) },
  { id: 6, a: 438, b: 556, keys: [{ f: 438, pos: [0, 2.0, 8.5], look: [0, 2.0, 0], fov: 56 }, { f: 556, pos: [0, 2.4, 9.5], look: [0, 7.5, -1], fov: 60, glide: true }] },
  { id: 7, a: 554, b: 772, keys: [{ f: 554, pos: [0, 2.6, 10.5], look: [0, 4.6, -1], fov: 62 }, { f: 600, pos: [0, 2.4, 10.0], look: [0, 3.4, 0], fov: 60, glide: true }, { f: 650, pos: [0.5, 2.0, 8.4], look: [0.8, 1.4, 0.4], fov: 56, glide: true }, { f: 700, pos: [0, 2.2, 9.0], look: [0, 2.0, 0.5], fov: 58, glide: true }, { f: 772, pos: [0, 2.6, 10.5], look: [0, 6.8, -1], fov: 62, glide: true }] },
  { id: 8, a: 770, b: 862, keys: [{ f: 770, pos: [0.3, 1.4, 4.8], look: [0.0, 1.1, 1.2], fov: 50 }, { f: 862, pos: [0.3, 1.3, 3.9], look: [0.0, 1.2, 1.2], fov: 46, glide: true }] },
  { id: 9, a: 860, b: 1023, keys: [{ f: 860, pos: [0, 2.6, 10.5], look: [0, 7.0, -1], fov: 62 }, { f: 930, pos: [0, 2.2, 9.6], look: [0, 3.0, 0], fov: 60, glide: true }, { f: 1023, pos: [0.4, 1.8, 6.6], look: [0.4, 1.1, 0.8], fov: 54, glide: true }] },
  { id: 10, a: 1021, b: 1116, keys: hk(1021, 1116) },
  { id: 11, a: 1114, b: TOTAL, keys: [{ f: 1114, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 37, k: 0.03 }, { f: 228, k: 0.02 }, { f: 634, k: 0.03 }, { f: 861, k: 0.07 }, { f: 1009, k: 0.04 }, { f: 1058, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.pinata || id === S.tries || id === S.boom || id === S.paper ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 40, b: 104, label: "¡DENTRO!", sub: "desde el campanario", col: "#ffd23f", big: true },
  { a: 228, b: 256, label: "¡DENTRO!", sub: "", col: "#ffd23f", big: true },
  { a: 399, b: 436, label: "VETADO", sub: "", col: "#ff3b3b", big: true },
  { a: 515, b: 554, label: "20 METROS", sub: "", col: "#ffd23f", big: true },
  { a: 585, b: 602, label: "NI LA ROZAN", sub: "", col: "#ff3b3b" },
  { a: 859, b: 900, label: "¡PLOF!", sub: "", col: "#ff8a2a", big: true },
  { a: 1058, b: 1110, label: "¡DENTRO!", sub: "desde el campanario", col: "#ffd23f", big: true },
];
void smooth;
