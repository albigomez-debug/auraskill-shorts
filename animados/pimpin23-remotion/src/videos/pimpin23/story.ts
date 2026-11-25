// Pimpín 23 · "Camaleón", 40.9 s. Words: apoyado 40 · pared 56 · desaparecido 68 · color 127 · menos 145 · Pimpín 151 · camaleón 205 · nervioso 237 · verde 265 · gusta 286 · rosa 315 · fotos 341 · gorra 379 ·
// fiestas 417 · toro 436 · escapa 445 · corral 457 · persiguiendo 485 · rojo 519 · Esconden 535 · banderas 552 · Sigue 572 · tomates 616 · Sigue 635 · alcaldesa 668 · vestido 689 · rojo 699 · corre 720 · toro 738 ·
// espera 758 · Pimpín 775 · rojo 793 · Rojo 809 · rojísimo 824 · toro 852 · corral 874 · valla 923 · dentro 949 · puerta 964 · cerrada 972 · aparecer 1007 · Porque 1026 · Pimpín 1113 · Y 1130 · dale 1157
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1228;
export const W = { desap: 62, verde: 262, gusta: 284, rosa: 312, gorra: 376, toro: 434, banderas: 550, tomates: 614, vestido: 687, rojo: 790, rojisimo: 822, valla: 920, cerrada: 970, dale: 1157 };
export const S = { hook: 1, premise: 2, mood: 3, photo: 4, bull: 5, tries: 6, red: 7, corral: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => M(a, b, 1.5, -7.0, 5.2, 1.3);
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 125, keys: hk(0, 125) },
  { id: 2, a: 123, b: 190, keys: [{ f: 123, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 190, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 188, b: 335, keys: M(188, 335, 0, 1.4, 6.0) },
  { id: 4, a: 333, b: 412, keys: M(333, 412, -3, -7.0, 6.0, 1.2) },
  { id: 5, a: 410, b: 520, keys: [{ f: 410, pos: [0, 2.6, 9.5], look: [0, 1.0, 0], fov: 58 }, { f: 520, pos: [0.4, 2.2, 8.4], look: [0.4, 1.0, 0], fov: 56, glide: true }] },
  { id: 6, a: 518, b: 760, keys: [{ f: 518, pos: [-0.5, 2.4, 9.0], look: [0, 1.0, 0.5], fov: 56 }, { f: 760, pos: [0.5, 2.0, 7.8], look: [0.5, 1.0, 0.5], fov: 54, glide: true }] },
  { id: 7, a: 758, b: 850, keys: [{ f: 758, pos: [0.2, 1.4, 4.8], look: [0.0, 1.1, 1.2], fov: 50 }, { f: 850, pos: [0.2, 1.3, 3.9], look: [0.0, 1.1, 1.2], fov: 46, glide: true }] },
  { id: 8, a: 848, b: 1028, keys: [{ f: 848, pos: [-1.0, 2.2, 8.5], look: [0, 1.0, 0], fov: 56 }, { f: 940, pos: [1.6, 2.0, 7.6], look: [2.2, 1.0, -0.5], fov: 54, glide: true }, { f: 1028, pos: [2.0, 1.8, 6.4], look: [2.4, 1.1, -0.5], fov: 52, glide: true }] },
  { id: 9, a: 1026, b: 1132, keys: hk(1026, 1132) },
  { id: 10, a: 1130, b: TOTAL, keys: [{ f: 1130, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 62, k: 0.02 }, { f: 434, k: 0.04 }, { f: 720, k: 0.03 }, { f: 822, k: 0.03 }, { f: 970, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.bull || id === S.tries || id === S.corral ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 66, b: 120, label: "¿DÓNDE ESTÁ?", sub: "", col: "#ffd23f", big: true },
  { a: 434, b: 470, label: "¡TORO!", sub: "", col: "#ff3b3b", big: true },
  { a: 570, b: 590, label: "SIGUE...", sub: "", col: "#ff3b3b" },
  { a: 633, b: 652, label: "SIGUE...", sub: "", col: "#ff3b3b" },
  { a: 822, b: 848, label: "¡ROJÍSIMO!", sub: "", col: "#ff3b3b", big: true },
  { a: 1000, b: 1026, label: "¿Y PIMPÍN?", sub: "", col: "#ffd23f", big: true },
  { a: 1026, b: 1126, label: "¿DÓNDE ESTÁ?", sub: "", col: "#ffd23f", big: true },
];
void smooth;
