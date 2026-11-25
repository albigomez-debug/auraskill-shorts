// Pimpín 22 · "Lento", 39.4 s. Words: cruzado 38 · calle 49 · tres horas 73/79 · prisa 116 · menos 135 · Pimpín 141 · lento 178 · caracol 208 · adelanta 220 · zapatos 271 · noche 297 · chiste 337 ·
// siguiente 365 · boda 406 · alcaldesa 417 · torre 446 · copas 457 · Cien 500 · última 541 · camarero 565 · tiembla 607 · cura 637 · Estornuda 663 · novia 691 · temblar 738 · espera 760 · Pimpín 779 ·
// despacio 802/838 · Pone 858 · copa 877 · mueve 911 · ríe 957 · ayer 980 · Porque 994 · Pimpín 1068 · Y 1085 · dale 1111
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1183;
export const W = { horas: 71, caracol: 206, noche: 295, siguiente: 363, cien: 498, tiembla: 605, estornuda: 661, novia: 689, temblar: 736, pone: 856, rie: 955, dale: 1111 };
export const S = { hook: 1, premise: 2, snail: 3, shoes: 4, joke: 5, tower: 6, tries: 7, slow: 8, laugh: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 2.4, 8.4], look: [0, 1.0, 1], fov: 56 }, { f: b, pos: [0.2, 2.1, 7.2], look: [0.2, 1.0, 1], fov: 54, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 112, keys: hk(0, 112) },
  { id: 2, a: 110, b: 176, keys: [{ f: 110, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 176, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 174, b: 262, keys: [{ f: 174, pos: [0, 1.2, 4.8], look: [0, 0.7, 1.4], fov: 52 }, { f: 262, pos: [0.4, 1.1, 4.2], look: [0.3, 0.7, 1.4], fov: 50, glide: true }] },
  { id: 4, a: 260, b: 330, keys: M(260, 330, 0, 1.4, 5.5, 1.0) },
  { id: 5, a: 328, b: 400, keys: M(328, 400, 0, 1.4) },
  { id: 6, a: 398, b: 560, keys: [{ f: 398, pos: [0, 2.6, 9.0], look: [0, 1.4, 0], fov: 56 }, { f: 520, pos: [0.3, 1.9, 5.4], look: [0.3, 1.6, 0], fov: 52, glide: true }, { f: 560, pos: [0.3, 2.3, 4.6], look: [0.3, 2.3, 0], fov: 48, glide: true }] },
  { id: 7, a: 558, b: 760, keys: [{ f: 558, pos: [-0.4, 2.0, 7.0], look: [0, 1.5, 0], fov: 54 }, { f: 760, pos: [0.4, 1.9, 6.0], look: [0.2, 1.6, 0], fov: 52, glide: true }] },
  { id: 8, a: 758, b: 907, keys: [{ f: 758, pos: [-1.6, 1.8, 6.6], look: [-1.0, 1.4, 0.6], fov: 54 }, { f: 907, pos: [0.2, 2.0, 5.4], look: [0.2, 1.8, 0], fov: 50, glide: true }] },
  { id: 9, a: 905, b: 996, keys: [{ f: 905, pos: [0.2, 1.5, 5.2], look: [0.1, 1.2, 1.0], fov: 52 }, { f: 996, pos: [0.2, 1.4, 4.2], look: [0.1, 1.2, 1.0], fov: 48, glide: true }] },
  { id: 10, a: 994, b: 1087, keys: hk(994, 1087) },
  { id: 11, a: 1085, b: TOTAL, keys: [{ f: 1085, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 71, k: 0.03 }, { f: 661, k: 0.04 }, { f: 736, k: 0.03 }, { f: 856, k: 0.02 }, { f: 955, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hook || id === S.end || id === S.tower ? 0 : 10 }; };
export const night = (f: number, id: number) => id === S.shoes ? smooth((f - W.noche + 30) / 30) : 0;
export const MARKS: Mark[] = [
  { a: 66, b: 108, label: "3 HORAS", sub: "para cruzar", col: "#ffd23f", big: true },
  { a: 498, b: 540, label: "100 COPAS", sub: "", col: "#ffd23f", big: true },
  { a: 800, b: 836, label: "MUY DESPACIO", sub: "", col: "#9ad4ff" },
  { a: 836, b: 856, label: "MUY, MUY...", sub: "", col: "#9ad4ff", big: true },
  { a: 975, b: 996, label: "UN DÍA TARDE", sub: "", col: "#ff8a2a" },
  { a: 994, b: 1082, label: "3 HORAS", sub: "para cruzar", col: "#ffd23f", big: true },
];
void smooth;
