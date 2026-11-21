// Pimpín 3 · "El vendaval", 40.1 s. Words: volando 32 · Pimpín 69 · Villazanca 91 · altísimos 117 · Pimpín 150 · metro 177 · negro 240 · vendaval 268 · empuja 339 ·
// velas 364 · Sombreros 380 · Bufandas 412 · alcaldesa 446 · agarran 482 · farolas 493 · abajo 559 · sopla 618 · Pimpín 648 · tranquilo 667 · espera 693 · cuerda 732 ·
// ata 748 · pozo 756 · enganchando 768 · tira 820/837 · granero 884 · tormenta 919 · aplaude 960 · agachado 975 · Porque 1016 · Pimpín 1086 · Y 1104 · dale 1131
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1202;
export const W = { pimpin: 150, metro: 177, sombreros: 380, bufandas: 412, alcaldesa: 446, ata: 748, engancha: 768, tira: 820, dale: 1131 };
export const S = { hook: 1, intro: 2, sky: 3, sails: 4, cling: 5, ground: 6, rope: 7, applause: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
export const BARN: V3 = [-7, 0, -5];
export const storm = (f: number, id: number) => id === 1 || id === 9 ? 1 : f < 895 ? smooth((f - 215) / 50) : 1 - smooth((f - 895) / 30);
export const fly = (f: number, j: number, id: number): [number, number] => { const k = id === 1 || id === 9 ? 1 : smooth((f - 300) / 70); return [k * (2.4 + Math.sin(f * 0.07 + j) * 0.6), k * (1.8 + (j % 3) * 1.2 + Math.sin(f * 0.11 + j * 2) * 0.4)]; };
export const pull = (f: number, j: number) => smooth((f - (W.tira - 6 + j * 6)) / 40);
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [3.8, 1.2, 5.0], look: [2.6, 2.6, 0], fov: 58 }, { f: b, pos: [3.6, 0.9, 2.4], look: [3.5, 0.8, -0.6], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 83, keys: hk(0, 83) },
  { id: 2, a: 81, b: 197, keys: [{ f: 81, pos: [0, 4, 14], look: [1, 2.5, -4], fov: 54 }, { f: 140, pos: [2.5, 2.2, 6], look: [3, 1.6, -1], fov: 52, glide: true }, { f: 197, pos: [3.6, 1.1, 2.0], look: [3.5, 1.0, -0.6], fov: 50, glide: true }] },
  { id: 3, a: 195, b: 286, keys: [{ f: 195, pos: [2, 1.5, 6], look: [0, 8, -20], fov: 60 }, { f: 286, pos: [2, 2.2, 8.5], look: [0, 5, -20], fov: 60, glide: true }] },
  { id: 4, a: 284, b: 473, keys: [{ f: 284, pos: [1, 3.0, 13], look: [1, 2.6, -2], fov: 54 }, { f: 400, pos: [2, 3.5, 11], look: [2, 3.4, -1], fov: 54, glide: true }, { f: 473, pos: [3, 4.2, 9], look: [3.5, 4.8, -1.5], fov: 54, glide: true }] },
  { id: 5, a: 471, b: 551, keys: [{ f: 471, pos: [-2.5, 2.5, 7.5], look: [-2, 2.5, 2.6], fov: 54 }, { f: 551, pos: [6, 2.8, 8], look: [7, 2.6, 2.6], fov: 54, glide: true }] },
  { id: 6, a: 549, b: 684, keys: [{ f: 549, pos: [4.4, 0.5, 3.0], look: [3.4, 1.4, -0.6], fov: 56 }, { f: 684, pos: [3.8, 0.6, 1.9], look: [3.5, 0.8, -0.6], fov: 50, glide: true }] },
  { id: 7, a: 682, b: 899, keys: [{ f: 682, pos: [6.5, 1.6, 5], look: [4.5, 1.0, -1.5], fov: 52 }, { f: 790, pos: [2.5, 2.6, 9], look: [0.5, 1.6, -0.5], fov: 54, glide: true }, { f: 899, pos: [-4.5, 2.6, 7.5], look: [-7, 2.2, -2], fov: 54, glide: true }] },
  { id: 8, a: 897, b: 1016, keys: [{ f: 897, pos: [3.0, 2.4, 8], look: [1.5, 1.8, 0], fov: 54 }, { f: 1016, pos: [3.5, 1.2, 2.6], look: [3.5, 1.1, -0.6], fov: 50, glide: true }] },
  { id: 9, a: 1014, b: 1102, keys: hk(1014, 1102) },
  { id: 10, a: 1100, b: TOTAL, keys: [{ f: 1100, pos: [3.7, 2.2, 5.0], look: [3.5, 2.0, -0.6], fov: 52 }, { f: TOTAL, pos: [3.6, 2.1, 4.0], look: [3.5, 2.0, -0.6], fov: 50, glide: true }] },
];
const K = kit(SHOTS, [{ f: 268, k: 0.06 }, { f: 339, k: 0.04 }, { f: 820, k: 0.03 }, { f: 837, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.ground || id === S.intro ? 10 : 0 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 80, label: "¡VOLANDO!", sub: "todo el pueblo... menos uno", col: "#ff3b3b", big: true },
  { a: 91, b: 140, label: "VILLAZANCA", sub: "el pueblo de los gigantes", col: "#ffffff" },
  { a: 268, b: 330, label: "¡VENDAVAL!", sub: "", col: "#9ad4ff" },
  { a: 1016, b: 1098, label: "¡VOLANDO!", sub: "todo el pueblo... menos uno", col: "#ff3b3b", big: true },
];
