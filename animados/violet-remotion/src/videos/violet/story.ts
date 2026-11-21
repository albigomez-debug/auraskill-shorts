// "Violet Jessop, la insumergible", 41.8 s. Words: tres 28 · sobrevivió 60 · Titanic 104 · Violet 119 · camarera 146 · 1911 184 · Olympic 233 · gemelo 249 ·
// choca 284 · guerra 312 · ilesa 344 · 1912 360 · Titanic 404 · termina 440 · hunde 475 · Violet 499 · bote 526 · bebé 563 · Pero 596 · 1916 642 ·
// Guerra 687 · enfermera 718 · Britannic 733 · mina 784 · Violet 811 · salta 825 · hélice 858 · golpea 893 · sobrevive 921 · Fíjate 952 · Insumergible 986 ·
// siguió 1048 · Tres 1088 · tres 1148 · Y 1164 · dale 1191
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1254;
export const W = { violet: 119, camarera: 146, olympic: 233, choca: 284, ilesa: 344, titanic: 404, hunde: 475, bebe: 563, enfermera: 718, brit: 733, mina: 784, helice: 858, golpea: 893, sobrevive: 921, miss: 986, dale: 1191 };
export const S = { hook: 1, intro: 2, olympic: 3, titanic: 4, boat: 5, brit: 6, water: 7, miss: 8, end: 9, cta: 10 };
export const GOLD = [1, 4, 5, 9];
export const TIT: V3 = [300, 0, 0], BRI: V3 = [600, 0, 0];
export const sinkT = (f: number, id: number) => id === 1 ? 0.55 + 0.25 * smooth(f / 117) : id === 9 ? 0.55 + 0.25 * smooth((f - 1084) / 78) : f < 2000 ? smooth((f - 465) / 130) * 0.85 : 0;
export const warX = (f: number) => 62 - 32 * smooth((f - 196) / 88);
const T0 = TIT[0], B0 = BRI[0];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [T0 - 0.6, 2.8, 16.5], look: [T0 - 1.6, 2.8, 7], fov: 52 }, { f: b, pos: [T0 - 1.5, 1.7, 11.6], look: [T0 - 1.7, 1.3, 8], fov: 48, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 117, keys: hk(0, 117) },
  { id: 2, a: 115, b: 182, keys: [{ f: 115, pos: [0.8, 2.2, 6.2], look: [0, 2.0, 1.0], fov: 50 }, { f: 182, pos: [0.1, 2.2, 5.0], look: [0, 2.2, 1.0], fov: 48, glide: true }] },
  { id: 3, a: 180, b: 357, keys: [{ f: 180, pos: [-2, 6, 42], look: [4, 4, -9], fov: 52 }, { f: 280, pos: [10, 5, 36], look: [17, 3.5, -9], fov: 52, glide: true }, { f: 300, pos: [10, 5, 36], look: [17, 3.5, -9], fov: 52 }, { f: 330, pos: [2.4, 2.3, 5.4], look: [2, 2.1, 1.0], fov: 48, glide: true }, { f: 357, pos: [2.2, 2.3, 4.8], look: [2, 2.2, 1.0], fov: 48, glide: true }] },
  { id: 4, a: 355, b: 488, keys: [{ f: 355, pos: [T0 + 6, 4, 46], look: [T0 + 2, 5, -14], fov: 52 }, { f: 488, pos: [T0 + 16, 3, 38], look: [T0 + 9, 2.5, -14], fov: 52, glide: true }] },
  { id: 5, a: 486, b: 598, keys: [{ f: 486, pos: [T0 - 1.0, 2.0, 13.5], look: [T0 - 1.6, 1.4, 8], fov: 50 }, { f: 598, pos: [T0 - 1.4, 1.7, 11.4], look: [T0 - 1.6, 1.4, 8], fov: 48, glide: true }] },
  { id: 6, a: 596, b: 810, keys: [{ f: 596, pos: [B0 - 4, 5, 40], look: [B0, 4, -16], fov: 52 }, { f: 680, pos: [B0 + 4, 4, 34], look: [B0 + 2, 3.5, -16], fov: 52, glide: true }, { f: 712, pos: [B0 + 2.4, 2.2, 6.4], look: [B0 + 2, 2.0, 2.4], fov: 48, glide: true }, { f: 760, pos: [B0 + 2.2, 2.1, 5.6], look: [B0 + 2, 2.0, 2.4], fov: 48, glide: true }, { f: 784, pos: [B0 + 6, 4, 30], look: [B0 + 6, 4, -14], fov: 54, glide: true }, { f: 810, pos: [B0 + 6, 4, 28], look: [B0 + 7, 4, -14], fov: 54, glide: true }] },
  { id: 7, a: 808, b: 950, keys: [{ f: 808, pos: [B0 + 3.6, 1.3, 9.5], look: [B0 + 3.7, 0.3, 4], fov: 50 }, { f: 950, pos: [B0 + 3.3, 0.9, 7.6], look: [B0 + 3.3, 0.3, 4.5], fov: 48, glide: true }] },
  { id: 8, a: 948, b: 1086, keys: [{ f: 948, pos: [4.6, 2.2, 6.8], look: [4, 2.0, 1.0], fov: 50 }, { f: 1086, pos: [3.8, 2.2, 5.2], look: [4, 2.2, 1.0], fov: 48, glide: true }] },
  { id: 9, a: 1084, b: 1162, keys: hk(1084, 1162) },
  { id: 10, a: 1160, b: TOTAL, keys: [{ f: 1160, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 284, k: 0.07 }, { f: 784, k: 0.08 }, { f: 893, k: 0.05 }, { f: 475, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.titanic || id === S.olympic || id === S.brit ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 110, label: "¡3 VECES!", sub: "naufragó... y sobrevivió", col: "#ff3b3b", big: true },
  { a: 184, b: 240, label: "1911", sub: "RMS Olympic", col: "#ffffff" },
  { a: 360, b: 420, label: "1912", sub: "RMS Titanic", col: "#ffffff" },
  { a: 642, b: 700, label: "1916", sub: "Primera Guerra Mundial", col: "#ffffff" },
  { a: 1088, b: 1158, label: "¡3 VECES!", sub: "naufragó... y sobrevivió", col: "#ff3b3b", big: true },
];
