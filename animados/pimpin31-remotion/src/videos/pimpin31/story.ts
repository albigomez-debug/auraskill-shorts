// Pimpín 31 · "Imitador". Words: ladrado 38 · perros 79 · menos 140 · gato 215 · esconde 240 · profe 270 · sienta 302 · timbre 339 · recreo 369 · gallo 407 · afónico 436 · feria 479 · despierta 527 ·
// corneta 574 · Nada 593 · campanas 630 · inmutan 661 · megáfono 710 · gallo 750 · espera 770 · tejado 808 · aire 835 · boca 860 · Quiquiriquí 874 · ventanas 920 · feria 965 · autógrafo 1022 · Porque 1043 · Y 1138 · dale 1165
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1236;
export const W = { ladrado: 36, perros: 77, gato: 213, esconde: 238, sienta: 300, timbre: 337, recreo: 367, afonico: 434, feria: 477, despierta: 525, corneta: 572, campanas: 628, megafono: 708, gallo2: 748, tejado: 806, aire: 833, boca: 858, quiqui: 872, ventanas: 918, feria2: 963, autografo: 1020, dale: 1165 };
export const S = { hook: 1, premise: 2, cat: 3, teacher: 4, bell: 5, rooster: 6, tries: 7, roof: 8, crow: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [-0.8, 1.8, 8.0], look: [0, 1.1, 0.8], fov: 56 }, { f: b, pos: [0.6, 1.6, 7.0], look: [0.3, 1.0, 0.8], fov: 52, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 95, keys: hk(0, 95) },
  { id: 2, a: 93, b: 162, keys: [{ f: 93, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 162, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 160, b: 262, keys: M(160, 262, 0.3, 1.2, 6.0, 1.0) },
  { id: 4, a: 260, b: 330, keys: M(260, 330, 0, 1.0, 7.0, 1.2) },
  { id: 5, a: 328, b: 384, keys: M(328, 384, 0, 1.0, 7.4, 1.2) },
  { id: 6, a: 382, b: 545, keys: [{ f: 382, pos: [0.4, 2.2, 5.6], look: [0.6, 1.8, 0.8], fov: 54 }, { f: 470, pos: [0.0, 2.0, 7.0], look: [0.3, 1.5, 0.8], fov: 56, glide: true }, { f: 545, pos: [-0.4, 2.0, 7.8], look: [0, 1.3, 0.8], fov: 56, glide: true }] },
  { id: 7, a: 543, b: 766, keys: [{ f: 543, pos: [-0.6, 2.0, 7.6], look: [0, 1.3, 0.8], fov: 56 }, { f: 680, pos: [0.4, 2.0, 7.2], look: [0.4, 1.4, 0.8], fov: 55, glide: true }, { f: 766, pos: [0.8, 2.2, 6.4], look: [0.8, 1.6, 0.8], fov: 54, glide: true }] },
  { id: 8, a: 764, b: 874, keys: [{ f: 764, pos: [0, 1.4, 7.6], look: [0, 2.2, -1.0], fov: 56 }, { f: 874, pos: [0.2, 3.0, 6.4], look: [0.2, 4.3, -1.0], fov: 54, glide: true }] },
  { id: 9, a: 872, b: 1043, keys: [{ f: 872, pos: [0.2, 3.2, 6.6], look: [0.2, 4.5, -1.0], fov: 56 }, { f: 950, pos: [0.2, 2.6, 9.0], look: [0.2, 2.6, -1.0], fov: 62, glide: true }, { f: 1043, pos: [0.6, 1.8, 6.4], look: [0.8, 1.2, 0.8], fov: 54, glide: true }] },
  { id: 10, a: 1041, b: 1140, keys: hk(1041, 1140) },
  { id: 11, a: 1138, b: TOTAL, keys: [{ f: 1138, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 872, k: 0.04 }, { f: 918, k: 0.02 }, { f: 708, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.tries || id === S.crow || id === S.roof ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 40, b: 92, label: "¡GUAU!", sub: "y contestan todos", col: "#ffd23f", big: true },
  { a: 434, b: 470, label: "AFÓNICO", sub: "", col: "#9ad4ff" },
  { a: 1060, b: 1135, label: "¡GUAU!", sub: "y contestan todos", col: "#ffd23f", big: true },
];
void smooth;
