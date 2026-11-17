// "Sargento Stubby" (1917-18), 33 s. Words: perro 9 · sargento 35 · 1917 90 · campamento 166 · Conroy 220 · adopta 234 · Stubby 254 · guerra 287 ·
// Francia 296 · esconde 310 · barco 324 · pillan 343 · Pero 356 · saluda 369 · pata 398 · queda 416 · trincheras 436 · huele 464 · gas 473 ·
// ladra 516 · heridos 556 · espía 597 · alemán 606 · sujeta 622 · pantalón 636 · soldados 667 · suerte 688 · dieciocho 716 · desgracia 755 ·
// soltaba 804 · medallas 832 · presidentes 864 · sargento 932 · Unidos 973
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 990;
export const W = { campamento: 166, conroy: 220, adopta: 234, stubby: 254, esconde: 310, barco: 324, pillan: 343, saluda: 369, queda: 416,
  trincheras: 436, huele: 464, gas: 473, ladra: 516, heridos: 556, espia: 597, sujeta: 622, pantalon: 636, soldados: 667, suerte: 688,
  desgracia: 755, soltaba: 804, medallas: 832, presidentes: 864 };
export const S = { hook: 1, camp: 2, adopt: 3, ship: 4, deck: 5, trench: 6, wounded: 7, spy: 8, years: 9, grip: 10, medals: 11, end: 12 };
export const HQ: V3 = [60, 0, 0], SEA: V3 = [-90, 0, 0], TR: V3 = [-40, 0, 0];
const H = HQ[0], T = TR[0], SX = SEA[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 94, keys: [{ f: 0, pos: [H + 0.5, 0.9, 1.4], look: [H, 0.75, 0], fov: 42 }, { f: 94, pos: [H + 0.8, 1.3, 2.8], look: [H, 1.0, -0.3], fov: 46, glide: true }] },
  { id: 2, a: 90, b: 184, keys: [{ f: 90, pos: [3, 1.6, 7], look: [0, 0.8, -1], fov: 48 }, { f: 184, pos: [1.5, 1.1, 4.2], look: [0.5, 0.6, -0.5], fov: 44, glide: true }] },
  { id: 3, a: 180, b: 290, keys: [{ f: 180, pos: [0.3, 1.2, 3.8], look: [0, 0.9, 0], fov: 44 }, { f: 290, pos: [0.4, 0.9, 2.6], look: [0.1, 0.7, 0], fov: 42, glide: true }] },
  { id: 4, a: 286, b: 340, keys: [{ f: 286, pos: [SX - 14, 5, 22], look: [SX, 4, 0], fov: 50 }, { f: 340, pos: [SX - 6, 4, 18], look: [SX, 3.5, 0], fov: 48, glide: true }] },
  { id: 5, a: 336, b: 432, keys: [{ f: 336, pos: [SX + 0.3, 4.0, 6.4], look: [SX, 3.6, 0.8], fov: 48 }, { f: 432, pos: [SX + 0.3, 3.8, 5.2], look: [SX, 3.5, 0.8], fov: 46, glide: true }] },
  { id: 6, a: 428, b: 540, keys: [{ f: 428, pos: [T + 2, 1.4, 4.4], look: [T, 0.9, -0.5], fov: 46 }, { f: 540, pos: [T + 1, 1.0, 3.0], look: [T, 0.8, -0.5], fov: 44, glide: true }] },
  { id: 7, a: 536, b: 594, keys: [{ f: 536, pos: [T + 6.5, 1.0, 3.2], look: [T + 6, 0.6, 0], fov: 44 }, { f: 594, pos: [T + 6.2, 0.9, 2.5], look: [T + 6, 0.6, 0], fov: 42, glide: true }] },
  { id: 8, a: 590, b: 686, keys: [{ f: 590, pos: [T + 12.5, 1.2, 4.6], look: [T + 12, 0.9, 0], fov: 46 }, { f: 686, pos: [T + 12.2, 1.1, 3.6], look: [T + 12, 0.9, 0], fov: 44, glide: true }] },
  { id: 9, a: 682, b: 760, keys: [{ f: 682, pos: [T - 4, 1.0, 3.4], look: [T - 3, 0.6, 0], fov: 44 }, { f: 760, pos: [T - 1.6, 0.9, 2.8], look: [T - 1.2, 0.6, 0], fov: 42, glide: true }] },
  { id: 10, a: 756, b: 830, keys: [{ f: 756, pos: [T + 12.6, 0.8, 2.6], look: [T + 12, 0.7, 0], fov: 42 }, { f: 830, pos: [T + 12.3, 0.8, 2.0], look: [T + 12, 0.6, 0], fov: 40, glide: true }] },
  { id: 11, a: 826, b: 930, keys: [{ f: 826, pos: [H + 0.3, 1.3, 3.6], look: [H, 1.0, -0.6], fov: 46 }, { f: 930, pos: [H + 0.2, 1.4, 4.6], look: [H, 1.3, -0.6], fov: 48, glide: true }] },
  { id: 12, a: 926, b: TOTAL, keys: [{ f: 926, pos: [H + 0.8, 1.3, 2.8], look: [H, 1.0, -0.3], fov: 46 }, { f: TOTAL, pos: [H + 0.5, 0.9, 1.4], look: [H, 0.75, 0], fov: 42, glide: true }] },
];
const K = kit(SHOTS, [{ f: 343, k: 0.03 }, { f: 473, k: 0.04 }, { f: 622, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.ship ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 60, label: "SARGENTO", sub: "y era un perro callejero", col: "#ff3b3b", big: true },
  { a: 92, b: 170, label: "1917", sub: "Estados Unidos", col: "#ffffff" },
  { a: 700, b: 760, label: "18 meses", sub: "en el frente", col: "#ffffff" },
  { a: 930, b: TOTAL, label: "SARGENTO", sub: "y era un perro callejero", col: "#ff3b3b", big: true },
];
