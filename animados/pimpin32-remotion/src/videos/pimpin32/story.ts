// Pimpín 32 · "Abejas". Words: sombrero 44 · abejas 65 · menos 138 · amigo 175 · miel 218 · sombra 262 · colegio 305 · respuestas 334 · enjambre 382 · ayuntamiento 416 · pleno 463 · ventanas 505 · Nada 525 ·
// manguera 565 · Moja 583 · alcalde 595 · tarro 640 · siguen 682 · espera 712 · silba 738 · mano 780 · posan 820 · brazo 833 · campo 861 · flores 871 · tarro 945 · nuevo 960 · Porque 974 · Y 1080 · dale 1107
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1178;
export const W = { sombrero: 42, abejas: 63, miel: 216, sombra: 260, respuestas: 332, enjambre: 380, pleno: 461, ventanas: 503, manguera: 563, moja: 581, tarro: 638, siguen: 680, silba: 736, mano: 778, posan: 818, campo: 859, tarro2: 943, dale: 1107 };
export const S = { hook: 1, premise: 2, honey: 3, shade: 4, school: 5, hall: 6, tries: 7, calm: 8, field: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [-0.5, 1.9, 5.4], look: [0, 1.5, 1.0], fov: 52 }, { f: b, pos: [0.4, 1.8, 6.6], look: [0.2, 1.3, 1.0], fov: 55, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 84, keys: hk(0, 84) },
  { id: 2, a: 82, b: 162, keys: [{ f: 82, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 162, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 160, b: 252, keys: M(160, 252, 0, 1.2, 6.0, 1.3) },
  { id: 4, a: 250, b: 300, keys: M(250, 300, 0, 1.2, 6.2, 1.5) },
  { id: 5, a: 298, b: 380, keys: M(298, 380, 0, 1.2, 6.4, 1.4) },
  { id: 6, a: 378, b: 500, keys: [{ f: 378, pos: [0, 2.6, 4.0], look: [0, 3.0, -7.8], fov: 56 }, { f: 500, pos: [0.4, 2.2, 1.0], look: [0.4, 2.4, -7.8], fov: 54, glide: true }] },
  { id: 7, a: 498, b: 712, keys: [{ f: 498, pos: [-0.4, 2.0, 7.4], look: [0, 1.4, 0.8], fov: 56 }, { f: 620, pos: [0.3, 2.0, 7.0], look: [0.3, 1.4, 0.8], fov: 55, glide: true }, { f: 712, pos: [0.6, 2.0, 7.6], look: [0.6, 1.4, 0.8], fov: 56, glide: true }] },
  { id: 8, a: 710, b: 862, keys: M(710, 862, 0, 1.2, 6.0, 1.4) },
  { id: 9, a: 860, b: 976, keys: [{ f: 860, pos: [0, 1.6, 7.0], look: [0, 1.1, 1.0], fov: 56 }, { f: 976, pos: [0.5, 1.8, 6.2], look: [0.5, 1.2, 1.0], fov: 52, glide: true }] },
  { id: 10, a: 974, b: 1082, keys: hk(974, 1082) },
  { id: 11, a: 1080, b: TOTAL, keys: [{ f: 1080, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 581, k: 0.03 }, { f: 680, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.hall || id === S.tries || id === S.field || id === S.premise ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 46, b: 80, label: "SOMBRERO", sub: "de abejas", col: "#ffd23f", big: true },
  { a: 990, b: 1076, label: "SOMBRERO", sub: "de abejas", col: "#ffd23f", big: true },
];
void smooth;
