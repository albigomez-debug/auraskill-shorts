// Pimpín 4 · "Bajito", 35.9 s. Words: metros 35 · menos 53 · Pimpín 59 · Ja 76/85/94 · metro 128 · veinte 134 · tele 163 · silla 187 · abrazo 217 · rodillas 241 · fotos 271 ·
// gorra 309 · eso 346 · final 376 · baloncesto 386 · rivales 443 · tres 462 · metros 468 · minuto 495 · perdiendo 520 · banquillo 548 · uno 573 · ríen 599 · bota 630 ·
// gigantes 664 · ven 680 · piernas 712 · Uno 730 · Dos 743 · Tres 760 · espera 781 · bajito 811 · tirar 825 · equipo 851 · levanta 862 · canasta 878 · Porque 896 ·
// Pimpín 963 · Y 979 · dale 1006
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1078;
export const W = { metro: 125, tele: 163, abrazo: 214, rodillas: 241, fotos: 271, nieso: 343, uno: 571, canasta: 878, dale: 1006 };
export const S = { hook: 1, ja: 2, home: 3, photo: 4, intro: 5, losing: 6, laugh: 7, dribble: 8, under: 9, lift: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
export const V = -80;
export const HOOP: V3 = [11.6, 3.05, 0];
export const pimX = (f: number, id: number) => id === 8 ? 1 + (f - 614) * 0.06 : 11.1;
export const liftY = (f: number) => smooth((f - 852) / 20) * 2.4;
export const ballAt = (f: number, id: number, px: number, py: number): V3 | null => {
  if (id === 8) return [px + 0.35, 0.15 + Math.abs(Math.sin(f * 0.45)) * 0.35, 1.2];
  if (id === 9) return [px + 0.3, 0.75, 1.2];
  if (id === 10) { if (f < 866) return [px + 0.3, py + 1.25, 1.2]; if (f < 878) { const k = smooth((f - 866) / 12); return [px + 0.3 + (HOOP[0] - px - 0.3) * k, py + 1.25 + (HOOP[1] + 0.25 - py - 1.25) * k, 1.2 * (1 - k)]; } return [HOOP[0], Math.max(0.2, HOOP[1] - 0.2 - (f - 878) * 0.08), 0]; }
  return null;
};
export const score = (f: number): [number, number, string] => { if (f >= 878) return [52, 51, "0:00"]; if (f < 484) return [50, 51, "1:00"]; const s = Math.max(1, 59 - Math.floor((f - 484) / 6.8)); return [50, 51, `0:${String(s).padStart(2, "0")}`]; };
const trk = (fs: number[], id: number): ShotDef["keys"] => fs.map((f, k) => { const px = pimX(f, id); return { f, pos: [px + 0.6, 0.9, 4.2] as V3, look: [px + 0.4, 1.5, 0.6] as V3, fov: 58, glide: k > 0 }; });
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [V + 0.3, 2.4, 10.5], look: [V, 2.0, 2.4], fov: 54 }, { f: b, pos: [V + 0.2, 1.6, 7.6], look: [V, 1.6, 2.6], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 74, keys: hk(0, 74) },
  { id: 2, a: 72, b: 106, keys: [{ f: 72, pos: [V, 3.0, 11.5], look: [V, 2.2, 2], fov: 56 }, { f: 106, pos: [V, 2.6, 10.5], look: [V, 2.2, 2], fov: 54, glide: true }] },
  { id: 3, a: 104, b: 258, keys: [{ f: 104, pos: [V - 1.4, 1.3, 24.4], look: [V - 1.5, 1.0, 20.6], fov: 50 }, { f: 160, pos: [V - 1.2, 1.4, 24.0], look: [V - 1.3, 1.0, 20.6], fov: 50, glide: true }, { f: 200, pos: [V - 0.1, 1.5, 24.6], look: [V - 0.1, 1.2, 20.3], fov: 52, glide: true }, { f: 214, pos: [V - 1.7, 2.0, 25.4], look: [V - 1.7, 1.8, 20.2], fov: 54, glide: true }, { f: 258, pos: [V - 1.8, 1.5, 23.6], look: [V - 1.8, 1.3, 20.2], fov: 52, glide: true }] },
  { id: 4, a: 256, b: 358, keys: [{ f: 256, pos: [V, 2.0, 9.6], look: [V, 2.0, 3], fov: 52 }, { f: 358, pos: [V, 2.0, 8.6], look: [V, 2.0, 3], fov: 50, glide: true }] },
  { id: 5, a: 356, b: 482, keys: [{ f: 356, pos: [0, 4.5, 16], look: [0, 3.5, -6], fov: 54 }, { f: 430, pos: [5, 3, 10], look: [7, 3.5, 0], fov: 54, glide: true }, { f: 482, pos: [7, 1.8, 6.5], look: [7.2, 4.5, 0], fov: 56, glide: true }] },
  { id: 6, a: 480, b: 587, keys: [{ f: 480, pos: [0, 6.5, -5], look: [0, 7.4, -12.4], fov: 52 }, { f: 520, pos: [0, 6.6, -6], look: [0, 7.4, -12.4], fov: 52, glide: true }, { f: 545, pos: [-6, 1.6, 9.5], look: [-6, 1.0, 5], fov: 52, glide: true }, { f: 587, pos: [-6, 1.0, 7.6], look: [-6, 0.9, 5], fov: 50, glide: true }] },
  { id: 7, a: 585, b: 616, keys: [{ f: 585, pos: [5.5, 2.5, 11], look: [7, 4.2, 0], fov: 56 }, { f: 616, pos: [6.5, 2.2, 9.5], look: [7.2, 4.6, 0], fov: 56, glide: true }] },
  { id: 8, a: 614, b: 774, keys: trk([614, 670, 720, 774], 8) },
  { id: 9, a: 772, b: 840, keys: [{ f: 772, pos: [10.4, 1.0, 4.4], look: [11.1, 1.6, 0.8], fov: 54 }, { f: 840, pos: [10.8, 1.1, 3.4], look: [11.3, 2.6, 0.4], fov: 56, glide: true }] },
  { id: 10, a: 838, b: 897, keys: [{ f: 838, pos: [9.5, 2.4, 8.5], look: [11, 2.6, 0.5], fov: 54 }, { f: 897, pos: [10.0, 3.3, 6.5], look: [11.2, 3.3, 0.3], fov: 54, glide: true }] },
  { id: 11, a: 895, b: 980, keys: hk(895, 980) },
  { id: 12, a: 978, b: TOTAL, keys: [{ f: 978, pos: [V + 0.2, 1.9, 7.6], look: [V, 1.9, 2.6], fov: 52 }, { f: TOTAL, pos: [V + 0.2, 1.9, 6.8], look: [V, 1.9, 2.6], fov: 50, glide: true }] },
];
const K = kit(SHOTS, [{ f: 878, k: 0.07 }, { f: 730, k: 0.02 }, { f: 743, k: 0.02 }, { f: 760, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.intro || id === S.hook || id === S.end ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 70, label: "¡2 METROS!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
  { a: 460, b: 482, label: "¡3 METROS!", sub: "los rivales", col: "#4a8aff" },
  { a: 493, b: 540, label: "1:00", sub: "y van perdiendo", col: "#ff3b3b" },
  { a: 728, b: 742, label: "¡UNO!", sub: "", col: "#ffd23f" },
  { a: 743, b: 759, label: "¡DOS!", sub: "", col: "#ffd23f" },
  { a: 760, b: 774, label: "¡TRES!", sub: "", col: "#ffd23f" },
  { a: 896, b: 976, label: "¡2 METROS!", sub: "todos... menos Pimpín", col: "#ff3b3b", big: true },
];
