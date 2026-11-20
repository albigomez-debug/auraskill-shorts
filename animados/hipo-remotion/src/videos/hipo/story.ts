// "68 años con hipo" (Charles Osborne, 1922-1990), 37 s. Words: hipo 21 · sesenta y ocho 40 · parar 79 · 1922 92 · Charles 154 · cerdo 196 · pesarlo 218 ·
// cae 239 · empieza 254 · hip 270/278/287 · para 304 · día 327 · año 350 · década 371 · cuarenta 407 · minuto 428 · Prueba 441 · sustos 462 · agua 476 ·
// aguantar 498 · Nada 533 · médicos 553 · loco 624 · vida 649 · casa 663 · ocho hijos 694 · Hip 715 · Fíjate 725 · caída 768 · cerebro 803 · hipo 830 ·
// suerte 845 · Guinness 878 · desgracia 914 · cuatrocientos 951 · millones 975 · 1990 1010 · paró 1045 · sesenta y ocho 1073 · años 1092
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1110;
export const W = { charles: 154, cerdo: 196, cae: 239, hip1: 270, hip2: 278, hip3: 287, dia: 327, anio: 350, decada: 371, cuarenta: 407, sustos: 462,
  agua: 476, aguantar: 498, nada: 533, medicos: 553, casa: 663, ocho: 694, hip4: 715, caida: 768, cerebro: 803, guinness: 878, desgracia: 914,
  cuatro: 951, millones: 975, y1990: 1010, paro: 1045 };
export const S = { hook: 1, farm: 2, fall: 3, years: 4, rate: 5, cures: 6, docs: 7, life: 8, brain: 9, record: 10, count: 11, end: 12 };
export const HOME: V3 = [40, 0, 0], DOC: V3 = [-40, 0, 0], FAM: V3 = [80, 0, 0];
const H = HOME[0], D = DOC[0], F = FAM[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 94, keys: [{ f: 0, pos: [H + 0.2, 1.6, 2.2], look: [H, 1.5, 0], fov: 42 }, { f: 94, pos: [H + 0.4, 1.6, 3.2], look: [H, 1.4, 0], fov: 46, glide: true }] },
  { id: 2, a: 90, b: 236, keys: [{ f: 90, pos: [5, 3, 11], look: [0, 1.2, -1], fov: 50 }, { f: 236, pos: [0.8, 1.4, 4.6], look: [0.3, 1.0, 0], fov: 46, glide: true }] },
  { id: 3, a: 232, b: 300, keys: [{ f: 232, pos: [0.6, 1.2, 4.0], look: [0.2, 0.8, 0], fov: 46 }, { f: 300, pos: [0.4, 1.0, 3.0], look: [0.1, 0.7, 0], fov: 44, glide: true }] },
  { id: 4, a: 296, b: 384, keys: [{ f: 296, pos: [H + 0.2, 1.6, 4.2], look: [H, 1.4, -0.5], fov: 46 }, { f: 384, pos: [H + 0.2, 1.6, 3.2], look: [H, 1.5, -0.5], fov: 44, glide: true }] },
  { id: 5, a: 380, b: 440, keys: [{ f: 380, pos: [H - 0.3, 1.6, 2.4], look: [H, 1.5, 0], fov: 42 }, { f: 440, pos: [H - 0.2, 1.6, 1.9], look: [H, 1.55, 0], fov: 40, glide: true }] },
  { id: 6, a: 436, b: 546, keys: [{ f: 436, pos: [H + 0.4, 1.6, 4.4], look: [H + 0.2, 1.3, 0], fov: 46 }, { f: 546, pos: [H + 0.3, 1.5, 3.4], look: [H + 0.2, 1.35, 0], fov: 44, glide: true }] },
  { id: 7, a: 542, b: 592, keys: [{ f: 542, pos: [D + 0.3, 1.7, 4.6], look: [D, 1.3, 0], fov: 46 }, { f: 592, pos: [D + 0.2, 1.6, 3.8], look: [D, 1.35, 0], fov: 44, glide: true }] },
  { id: 8, a: 588, b: 726, keys: [{ f: 588, pos: [F + 0.3, 1.6, 4.0], look: [F, 1.3, 0], fov: 46 }, { f: 680, pos: [F + 0.4, 1.8, 6.4], look: [F + 0.4, 1.1, -0.5], fov: 50, glide: true }, { f: 726, pos: [F + 0.4, 1.7, 5.6], look: [F + 0.4, 1.1, -0.5], fov: 50, glide: true }] },
  { id: 9, a: 722, b: 842, keys: [{ f: 722, pos: [D + 0.4, 1.7, 4.4], look: [D + 0.3, 1.6, -1], fov: 46 }, { f: 842, pos: [D + 0.6, 1.8, 3.0], look: [D + 0.6, 1.9, -1.6], fov: 42, glide: true }] },
  { id: 10, a: 838, b: 910, keys: [{ f: 838, pos: [H + 0.3, 1.5, 3.4], look: [H + 0.3, 1.4, 0], fov: 44 }, { f: 910, pos: [H + 0.3, 1.5, 2.6], look: [H + 0.3, 1.45, 0], fov: 42, glide: true }] },
  { id: 11, a: 906, b: 1004, keys: [{ f: 906, pos: [H + 0.3, 1.6, 4.4], look: [H, 1.5, 0], fov: 46 }, { f: 1004, pos: [H + 0.3, 1.6, 3.4], look: [H, 1.5, 0], fov: 44, glide: true }] },
  { id: 12, a: 1000, b: TOTAL, keys: [{ f: 1000, pos: [H + 0.4, 1.6, 3.2], look: [H, 1.4, 0], fov: 46 }, { f: TOTAL, pos: [H + 0.2, 1.6, 2.2], look: [H, 1.5, 0], fov: 42, glide: true }] },
];
const K = kit(SHOTS, [{ f: 239, k: 0.05 }, { f: 462, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.farm ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 66, label: "68 AÑOS", sub: "con hipo, sin parar", col: "#ff3b3b", big: true },
  { a: 94, b: 150, label: "1922", sub: "Estados Unidos", col: "#ffffff" },
  { a: 405, b: 440, label: "40 por minuto", col: "#ffd23f" },
  { a: 1010, b: 1060, label: "1990", col: "#ffffff" },
  { a: 1062, b: TOTAL, label: "68 AÑOS", sub: "con hipo, sin parar", col: "#ff3b3b", big: true },
];
