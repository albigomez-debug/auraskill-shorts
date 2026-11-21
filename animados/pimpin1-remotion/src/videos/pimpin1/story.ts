// Pimpín 1 · "La llave de oro", 41.2 s. Words: menos 57 · Pimpín 63 · Villazanca 92 · puertas 127 · sillas 163 · Pimpín 193 · metro 212 · abajo 299 · fiesta 326 ·
// alcaldesa 355 · llave 378 · puerta 410 · cae 447 · Clin 460/475/487 · agujerito 512 · agachan 570 · brazo 620 · espera 659 · Oscuro 720 · Telarañas 739 ·
// ratón 769 · corriendo 828 · llave 852 · abre 895 · fiesta 917 · hombros 1014 · Porque 1050 · Pimpín 1121 · Y 1138 · dale 1165
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1236;
export const W = { pimpin: 193, metro: 212, abajo: 299, cae: 447, espera: 659, raton: 769, llave2: 852, abre: 895, hombros: 1014, dale: 1165 };
export const S = { hook: 1, intro: 2, abajo: 3, fiesta: 4, drop: 5, crouch: 6, tunnel: 7, out: 8, open: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const GATE: V3 = [60, 0, -6], TUN: V3 = [120, 0, 0];
export const keyY = (f: number): [number, number] => { const s = f - W.cae; return [Math.min(5.2, s * 0.08), 0.15 + Math.abs(Math.sin(s * 0.22)) * Math.max(0, 3.1 - s * 0.05) * (s < 14 ? 1 : 0.6)]; };
export const pimRun = (f: number) => Math.max(0, f - 812) * 0.045;
export const doorA = (f: number) => smooth((f - 888) / 30) * 1.4;
const G0 = GATE[0], gz = GATE[2], T0 = TUN[0];
const px = (f: number) => T0 + (f - W.espera) * 0.035;
const hk = (a: number, b: number, m: number): ShotDef["keys"] => [{ f: a, pos: [0.5, 2.6, 6.5], look: [0.2, 3.2, -1], fov: 52 }, { f: m, pos: [0.5, 2.4, 6.0], look: [0.2, 3.0, -1], fov: 52, glide: true }, { f: b, pos: [0.4, 1.0, 3.6], look: [0.3, 0.8, 1.2], fov: 48, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 77, keys: hk(0, 77, 48) },
  { id: 2, a: 75, b: 232, keys: [{ f: 75, pos: [0, 6, 18], look: [0, 3, -6], fov: 54 }, { f: 118, pos: [2.0, 4.5, 8], look: [2.8, 3.0, -8], fov: 52, glide: true }, { f: 150, pos: [3.0, 1.6, -3.4], look: [3.0, 2.4, -8], fov: 52, glide: true }, { f: 185, pos: [4.0, 2.2, -0.2], look: [6.0, 1.7, -6.6], fov: 54, glide: true }, { f: 232, pos: [2.7, 1.2, -4.4], look: [2.6, 1.2, -7.6], fov: 48, glide: true }] },
  { id: 3, a: 230, b: 312, keys: [{ f: 230, pos: [0.4, 1.0, 4.6], look: [0.4, 2.6, 0], fov: 56 }, { f: 312, pos: [0.5, 1.1, 3.8], look: [0.4, 2.3, 0], fov: 54, glide: true }] },
  { id: 4, a: 310, b: 445, keys: [{ f: 310, pos: [G0 + 1, 3.5, gz + 22], look: [G0, 4, gz], fov: 54 }, { f: 380, pos: [G0, 3.0, gz + 13], look: [G0 - 0.6, 3.2, gz + 2], fov: 52, glide: true }, { f: 445, pos: [G0 - 0.8, 2.8, gz + 7.5], look: [G0 - 0.9, 3.0, gz + 2.2], fov: 50, glide: true }] },
  { id: 5, a: 443, b: 548, keys: [{ f: 443, pos: [G0 - 0.5, 2.6, gz + 7.5], look: [G0 - 0.6, 2.8, gz + 2], fov: 52 }, { f: 495, pos: [G0 + 2, 1.2, gz + 6.5], look: [G0 + 2.5, 0.6, gz + 1.5], fov: 52, glide: true }, { f: 548, pos: [G0 + 4.5, 0.6, gz + 3.0], look: [G0 + 4.6, 0.35, gz], fov: 48, glide: true }] },
  { id: 6, a: 546, b: 652, keys: [{ f: 546, pos: [G0 + 4.6, 2.0, gz + 8], look: [G0 + 4.4, 1.4, gz + 1], fov: 52 }, { f: 652, pos: [G0 + 4.5, 1.2, gz + 5], look: [G0 + 4.5, 0.8, gz + 0.5], fov: 50, glide: true }] },
  { id: 7, a: 650, b: 808, keys: [650, 700, 760, 808].map((f, k) => ({ f, pos: [px(f) + 0.4, 0.9, 3.2] as V3, look: [px(f), 0.6, 0.3] as V3, fov: 50, glide: k > 0 })) },
  { id: 8, a: 806, b: 874, keys: [{ f: 806, pos: [G0 + 5.5, 1.0, gz + 4.5], look: [G0 + 5.0, 0.8, gz + 0.6], fov: 50 }, { f: 874, pos: [G0 + 7.4, 1.5, gz + 5.6], look: [G0 + 7.6, 1.2, gz + 0.6], fov: 50, glide: true }] },
  { id: 9, a: 872, b: 1048, keys: [{ f: 872, pos: [G0, 3, gz + 20], look: [G0, 4, gz], fov: 54 }, { f: 960, pos: [G0 + 0.4, 2.6, gz + 12], look: [G0 + 0.4, 3, gz + 3], fov: 52, glide: true }, { f: 1048, pos: [G0 + 0.6, 3.6, gz + 9.8], look: [G0 + 0.4, 3.0, gz + 3.3], fov: 50, glide: true }] },
  { id: 10, a: 1046, b: 1136, keys: hk(1046, 1136, 1105) },
  { id: 11, a: 1134, b: TOTAL, keys: [{ f: 1134, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 63, k: 0.04 }, { f: 447, k: 0.04 }, { f: 769, k: 0.05 }, { f: 895, k: 0.05 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.fiesta || id === S.open ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 72, label: "¡2,5 METROS!", sub: "todos... menos uno", col: "#ff3b3b", big: true },
  { a: 92, b: 150, label: "VILLAZANCA", sub: "el pueblo de los gigantes", col: "#ffffff" },
  { a: 460, b: 474, label: "¡CLIN!", sub: "", col: "#ffd23f" },
  { a: 475, b: 486, label: "¡CLIN!", sub: "", col: "#ffd23f" },
  { a: 487, b: 506, label: "¡CLIN!", sub: "", col: "#ffd23f" },
  { a: 1050, b: 1132, label: "¡2,5 METROS!", sub: "todos... menos uno", col: "#ff3b3b", big: true },
];
