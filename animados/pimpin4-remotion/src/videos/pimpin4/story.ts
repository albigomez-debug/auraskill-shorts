// Pimpín 4 · "La final", 40.9 s. Words: gigantes 16 · bajito 58 · baloncesto 95 · Villagigante 135/167 · tres 192 · perdiendo 235 · tapan 289 · minuto 365 · banquillo 391 ·
// Pimpín 425 · ríen 455 · rodilla 515 · Exacto 532 · bota 561 · piernas 648 · Uno 666 · Dos 678 · Tres 695 · segundo 742 · canasta 788 · tirar 836 · levanta 875 ·
// mete 904 · Canasta 919 · gana 952 · anotador 1019 · Un 1038 · mundo 1115 · Y 1129 · dale 1155
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth, clamp01 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1227;
export const W = { tres: 192, tapan: 289, pimpin: 425, canasta: 919, anotador: 1008, dale: 1155 };
export const S = { hook: 1, intro: 2, losing: 3, bench: 4, laugh: 5, dribble: 6, under: 7, lift: 8, win: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const HOOP: V3 = [11.6, 3.05, 0];
export const pimX = (f: number, id: number) => id === 1 ? 3 + f * 0.08 : id === 10 ? 3 + (f - 1034) * 0.07 : id === 6 ? 1 + (f - 546) * 0.06 : id === 11 ? 2.0 : 11.1;
export const liftY = (f: number, id: number) => id === 9 ? 2.4 : smooth((f - 873) / 22) * 2.4;
export const ballAt = (f: number, id: number, px: number, py: number): V3 | null => {
  if (id === 1 || id === 10 || id === 6) return [px + 0.35, 0.15 + Math.abs(Math.sin(f * 0.45)) * 0.35, 1.2];
  if (id === 7) return [px + 0.3, 0.75, 1.2];
  if (id === 8) { if (f < 900) return [px + 0.3, py + 1.25, 1.2]; if (f < 915) { const k = smooth((f - 900) / 15); return [px + 0.3 + (HOOP[0] - px - 0.3) * k, py + 1.25 + (HOOP[1] + 0.25 - py - 1.25) * k, 1.2 * (1 - k)]; } return [HOOP[0], Math.max(0.2, HOOP[1] - 0.2 - (f - 915) * 0.08), 0]; }
  if (id === 3) { if (f < 289) return [7.4 + (f - 260) * 0.07, 2.8 + (f - 260) * 0.045, 1.0]; return [9.4 - (f - 289) * 0.12, Math.max(0.2, 4.1 - (f - 289) * 0.09), 1.0]; }
  if (id === 11) return [2.35, 0.15 + Math.abs(Math.sin(f * 0.45)) * 0.35, 1.2];
  return null;
};
export const score = (f: number): [number, number, string] => { if (f >= 904) return [52, 51, "0:00"]; if (f < 354) return [50, 51, "1:12"]; const s = Math.max(1, 60 - Math.floor((f - 354) / 6.5)); return [50, 51, `0:${String(s).padStart(2, "0")}`.replace("0:60", "1:00")]; };
const trk = (fs: number[], id: number): ShotDef["keys"] => fs.map((f, k) => { const px = pimX(f, id); return { f, pos: [px + 0.6, 0.9, 4.2] as V3, look: [px + 0.4, 1.5, 0.6] as V3, fov: 58, glide: k > 0 }; });
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 81, keys: trk([0, 40, 81], 1) },
  { id: 2, a: 79, b: 213, keys: [{ f: 79, pos: [0, 4.5, 16], look: [0, 3.5, -6], fov: 54 }, { f: 160, pos: [5, 3, 10], look: [7, 3.5, 0], fov: 54, glide: true }, { f: 213, pos: [7, 1.8, 6.5], look: [7.2, 4.5, 0], fov: 56, glide: true }] },
  { id: 3, a: 211, b: 352, keys: [{ f: 211, pos: [6, 2.5, 9], look: [8.5, 3, 0], fov: 54 }, { f: 352, pos: [8.5, 2.5, 7.5], look: [9.5, 3.5, 0], fov: 54, glide: true }] },
  { id: 4, a: 350, b: 468, keys: [{ f: 350, pos: [0, 6.5, -5], look: [0, 7.4, -12.4], fov: 52 }, { f: 380, pos: [0, 6.6, -6], look: [0, 7.4, -12.4], fov: 52, glide: true }, { f: 415, pos: [-6, 1.6, 9.5], look: [-6, 1.0, 5], fov: 52, glide: true }, { f: 468, pos: [-6, 1.0, 7.6], look: [-6, 0.9, 5], fov: 50, glide: true }] },
  { id: 5, a: 466, b: 548, keys: [{ f: 466, pos: [5.5, 2.5, 11], look: [7, 4.2, 0], fov: 56 }, { f: 548, pos: [6.5, 2.2, 9.5], look: [7.2, 4.6, 0], fov: 56, glide: true }] },
  { id: 6, a: 546, b: 708, keys: trk([546, 600, 650, 708], 6) },
  { id: 7, a: 706, b: 848, keys: [{ f: 706, pos: [10.4, 1.0, 4.4], look: [11.1, 1.6, 0.8], fov: 54 }, { f: 848, pos: [10.8, 1.1, 3.4], look: [11.3, 2.6, 0.4], fov: 56, glide: true }] },
  { id: 8, a: 846, b: 935, keys: [{ f: 846, pos: [9.5, 2.4, 8.5], look: [11, 2.6, 0.5], fov: 54 }, { f: 935, pos: [10.0, 3.3, 6.5], look: [11.2, 3.3, 0.3], fov: 54, glide: true }] },
  { id: 9, a: 933, b: 1036, keys: [{ f: 933, pos: [8.5, 3.0, 11], look: [10.5, 3.0, 1], fov: 54 }, { f: 1036, pos: [10.8, 3.5, 5.6], look: [11.1, 3.4, 1], fov: 52, glide: true }] },
  { id: 10, a: 1034, b: 1127, keys: trk([1034, 1080, 1127], 10) },
  { id: 11, a: 1125, b: TOTAL, keys: [{ f: 1125, pos: [2.3, 2.4, 7.0], look: [2.0, 2.2, 1.0], fov: 52 }, { f: TOTAL, pos: [2.2, 2.3, 6.0], look: [2.0, 2.2, 1.0], fov: 50, glide: true }] },
];
void clamp01;
const K = kit(SHOTS, [{ f: 289, k: 0.04 }, { f: 904, k: 0.07 }, { f: 666, k: 0.02 }, { f: 678, k: 0.02 }, { f: 695, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.intro || id === S.win ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 78, label: "¡3 METROS!", sub: "...y perdieron contra él", col: "#ff3b3b", big: true },
  { a: 135, b: 185, label: "VILLAGIGANTE", sub: "el equipo rival", col: "#4a8aff" },
  { a: 666, b: 677, label: "¡UNO!", sub: "", col: "#ffd23f" },
  { a: 678, b: 694, label: "¡DOS!", sub: "", col: "#ffd23f" },
  { a: 695, b: 708, label: "¡TRES!", sub: "", col: "#ffd23f" },
  { a: 740, b: 800, label: "0:01", sub: "último segundo", col: "#ff3b3b" },
  { a: 1038, b: 1122, label: "¡3 METROS!", sub: "...y perdieron contra él", col: "#ff3b3b", big: true },
];
