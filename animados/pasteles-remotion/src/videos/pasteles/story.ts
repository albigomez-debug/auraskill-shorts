// "La Guerra de los Pasteles" (1838), 38 s. Words: pasteles 45 · México 76 · 1828 90 · soldados 131 · pastelería 169 · Remontel 215 · comen 234 ·
// pasteles 256 · pagar 280 · Diez años 293 · queja 337 · sesenta mil 371 · barbaridad 408 · Francia 430 · deudas 467 · excusa 511 · barcos 546 ·
// Bloquea 569 · bombardea 602 · Veracruz 628 · Santa Anna 679 · pierna 710 · entierro 747 · pierna 780 · seiscientos 836 · suerte 874 · meses 917 ·
// desgracia 935 · buenos 993 · libros 1017 · Pasteles 1064 · pasteles 1127
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1150;
export const W = { soldados: 131, pasteleria: 169, remontel: 215, comen: 234, pagar: 280, queja: 337, sesenta: 371, barbaridad: 408, deudas: 467,
  excusa: 511, barcos: 546, bloquea: 569, bombardea: 602, santa: 679, pierna: 710, entierro: 747, seiscientos: 836, desgracia: 935, buenos: 993,
  libros: 1017, guerra: 1050 };
export const S = { hook: 1, city: 2, eat: 3, complain: 4, excuse: 5, fleet: 6, general: 7, funeral: 8, pay: 9, luck: 10, tasty: 11, books: 12, end: 13 };
export const PAR: V3 = [40, 0, 0], VER: V3 = [-60, 0, 0], FUN: V3 = [80, 0, 0];
const P = PAR[0], V = VER[0], F = FUN[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 62, keys: [{ f: 0, pos: [V + 1, 1.8, 6], look: [V, 1.8, -10], fov: 48 }, { f: 62, pos: [V + 1.5, 2.2, 8], look: [V, 2, -10], fov: 50, glide: true }] },
  { id: 2, a: 58, b: 160, keys: [{ f: 58, pos: [5, 3, 11], look: [0, 1.8, -2], fov: 50 }, { f: 160, pos: [1.6, 2, 6], look: [0, 1.8, -2], fov: 48, glide: true }] },
  { id: 3, a: 156, b: 292, keys: [{ f: 156, pos: [0.3, 1.6, 5.0], look: [0, 1.2, 0], fov: 48 }, { f: 292, pos: [0.3, 1.5, 3.8], look: [0, 1.25, 0], fov: 46, glide: true }] },
  { id: 4, a: 288, b: 426, keys: [{ f: 288, pos: [P + 0.3, 1.6, 4.2], look: [P, 1.4, 0], fov: 46 }, { f: 426, pos: [P + 0.3, 1.6, 3.2], look: [P, 1.45, 0], fov: 42, glide: true }] },
  { id: 5, a: 422, b: 536, keys: [{ f: 422, pos: [P + 6.3, 1.7, 4.4], look: [P + 6, 1.4, 0], fov: 46 }, { f: 536, pos: [P + 6.3, 1.6, 3.2], look: [P + 6, 1.45, 0], fov: 42, glide: true }] },
  { id: 6, a: 532, b: 648, keys: [{ f: 532, pos: [V - 2, 9, 32], look: [V, 2, -8], fov: 50 }, { f: 648, pos: [V - 1, 7, 24], look: [V, 2, -10], fov: 50, glide: true }] },
  { id: 7, a: 644, b: 726, keys: [{ f: 644, pos: [V + 0.5, 4.6, -6.0], look: [V, 4.3, -10.6], fov: 46 }, { f: 726, pos: [V + 0.4, 4.6, -6.8], look: [V, 4.35, -10.6], fov: 44, glide: true }] },
  { id: 8, a: 722, b: 798, keys: [{ f: 722, pos: [F + 1.6, 1.8, 5], look: [F + 1.6, 1.2, 0], fov: 48 }, { f: 798, pos: [F + 0.8, 1.6, 4.4], look: [F + 0.6, 1.2, 0], fov: 46, glide: true }] },
  { id: 9, a: 794, b: 870, keys: [{ f: 794, pos: [P + 0.3, 1.6, 4.0], look: [P, 1.35, 0], fov: 46 }, { f: 870, pos: [P + 0.3, 1.5, 3.0], look: [P, 1.4, 0], fov: 42, glide: true }] },
  { id: 10, a: 866, b: 932, keys: [{ f: 866, pos: [V + 3, 3, 4], look: [V, 2, -10], fov: 50 }, { f: 932, pos: [V + 1, 2.6, 2], look: [V, 2, -10], fov: 48, glide: true }] },
  { id: 11, a: 928, b: 1008, keys: [{ f: 928, pos: [0.3, 1.6, 3.6], look: [0, 1.45, 0], fov: 44 }, { f: 1008, pos: [0.3, 1.55, 2.6], look: [0, 1.5, 0], fov: 40, glide: true }] },
  { id: 12, a: 1004, b: 1084, keys: [{ f: 1004, pos: [P + 6.3, 1.6, 3.6], look: [P + 6, 1.4, 0], fov: 44 }, { f: 1084, pos: [P + 6.2, 1.5, 2.6], look: [P + 6, 1.45, 0], fov: 40, glide: true }] },
  { id: 13, a: 1080, b: TOTAL, keys: [{ f: 1080, pos: [V + 1.5, 2.2, 8], look: [V, 2, -10], fov: 50 }, { f: TOTAL, pos: [V + 1, 1.8, 6], look: [V, 1.8, -10], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 20, k: 0.04 }, { f: 602, k: 0.05 }, { f: 710, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.fleet || id === S.city || id === S.luck ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 58, label: "INVADIDOS", sub: "por unos pasteles", col: "#ff3b3b", big: true },
  { a: 62, b: 156, label: "Ciudad de México", sub: "1828", col: "#ffffff" },
  { a: 292, b: 336, label: "10 años después", col: "#ffffff" },
  { a: 600, b: 646, label: "Veracruz", sub: "1838", col: "#ffffff" },
  { a: 880, b: 930, label: "solo unos meses", col: "#ffffff" },
  { a: 1090, b: TOTAL, label: "INVADIDOS", sub: "por unos pasteles", col: "#ff3b3b", big: true },
];
