// "Hachiko" (Tokio, 1924-1935), 35 s. Words: perro 9 · esperó 15 · estación 40 · diez 78 · años 84 · Tokio 98 · 1924 110 · Hachiko 147 · akita 171 ·
// Shibuya 220 · profesor 262 · Ueno 273 · vuelve 287 · día 320 · no vuelve 346 · muerto 364 · Hachiko 401 · sigue 415 · siguiente 446 · otro 469 ·
// misma hora 512 · puerta 535 · trabajadores 554 · echan 587 · vuelve 604 · vecinos 623 · comer 643 · periódico 659 · Japón 702 · enamora 714 ·
// año 740 · cinco 750 · nueve 763 · suerte 788 · estatua 816 · desgracia 843 · tren 901 · hoy 916 · Shibuya 926 · estatua 966 · años 1026
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1046;
export const W = { hachiko: 147, akita: 171, shibuya: 220, profesor: 262, ueno: 273, vuelve: 287, novuelve: 346, muerto: 364, sigue: 415,
  siguiente: 446, otro: 469, hora: 512, puerta: 535, trabajadores: 554, echan: 587, vuelve2: 604, vecinos: 623, comer: 643, periodico: 659,
  enamora: 714, anio: 740, cinco: 750, nueve: 763, estatua: 816, desgracia: 843, tren: 901, hoy: 916 };
export const S = { hook: 1, tokyo: 2, daily: 3, wait: 4, uni: 5, keeps: 6, shoo: 7, food: 8, news: 9, years: 10, statue: 11, train: 12, today: 13 };
export const UNI: V3 = [40, 0, 0], NEWS: V3 = [60, 0, 0], MOD: V3 = [-60, 0, 0];
const U = UNI[0], N = NEWS[0], M = MOD[0];
const GATE = (a: number, b: number, d = 3.6): ShotDef["keys"] => [{ f: a, pos: [0.5, 1.2, d], look: [0.2, 0.7, 0], fov: 44 }, { f: b, pos: [0.4, 1.0, d - 0.9], look: [0.2, 0.6, 0], fov: 42, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 96, keys: [{ f: 0, pos: [0.4, 0.8, 2.2], look: [0.2, 0.6, 0], fov: 42 }, { f: 96, pos: [0.6, 1.1, 3.4], look: [0.2, 0.8, -0.5], fov: 46, glide: true }] },
  { id: 2, a: 92, b: 180, keys: [{ f: 92, pos: [5, 3, 11], look: [0, 1.8, -2], fov: 50 }, { f: 180, pos: [1.6, 1.4, 5.0], look: [0.3, 0.9, 0], fov: 46, glide: true }] },
  { id: 3, a: 176, b: 314, keys: [{ f: 176, pos: [0.6, 1.4, 4.8], look: [0.3, 1.0, 0], fov: 46 }, { f: 314, pos: [0.4, 1.3, 3.8], look: [0.2, 1.0, 0], fov: 44, glide: true }] },
  { id: 4, a: 310, b: 362, keys: GATE(310, 362) },
  { id: 5, a: 358, b: 400, keys: [{ f: 358, pos: [U + 0.3, 1.4, 3.0], look: [U, 1.0, -0.5], fov: 44 }, { f: 400, pos: [U + 0.3, 1.3, 2.4], look: [U, 1.0, -0.5], fov: 42, glide: true }] },
  { id: 6, a: 396, b: 550, keys: [{ f: 396, pos: [-3, 1.3, 4], look: [-2, 0.6, 0], fov: 46 }, { f: 470, pos: [-0.5, 1.2, 3.8], look: [0, 0.6, 0], fov: 46, glide: true }, { f: 550, pos: [0.4, 1.0, 2.6], look: [0.2, 0.6, 0], fov: 42, glide: true }] },
  { id: 7, a: 546, b: 618, keys: [{ f: 546, pos: [0.6, 1.5, 4.6], look: [0.4, 1.0, 0], fov: 46 }, { f: 618, pos: [0.5, 1.4, 3.8], look: [0.3, 1.0, 0], fov: 44, glide: true }] },
  { id: 8, a: 614, b: 656, keys: [{ f: 614, pos: [-0.2, 1.4, 4.2], look: [-0.2, 0.9, 0], fov: 46 }, { f: 656, pos: [-0.2, 1.3, 3.4], look: [-0.2, 0.9, 0], fov: 44, glide: true }] },
  { id: 9, a: 652, b: 736, keys: [{ f: 652, pos: [N, 1.5, 1.6], look: [N, 1.5, -1], fov: 44 }, { f: 700, pos: [N, 1.5, 1.0], look: [N, 1.5, -1], fov: 40, glide: true }, { f: 706, pos: [N + 0.4, 1.6, 5.4], look: [N + 0.2, 1.3, 0.8], fov: 48 }, { f: 736, pos: [N + 0.3, 1.6, 4.8], look: [N + 0.2, 1.3, 0.8], fov: 46, glide: true }] },
  { id: 10, a: 732, b: 786, keys: GATE(732, 786, 3.0) },
  { id: 11, a: 782, b: 840, keys: [{ f: 782, pos: [3.2, 1.4, 3.6], look: [2.6, 1.0, -0.6], fov: 46 }, { f: 840, pos: [2.9, 1.3, 2.8], look: [2.5, 1.0, -0.6], fov: 44, glide: true }] },
  { id: 12, a: 836, b: 912, keys: [{ f: 836, pos: [0.6, 1.1, 3.2], look: [0, 1.0, -2], fov: 48 }, { f: 912, pos: [0.4, 0.9, 2.4], look: [0, 0.9, -2], fov: 46, glide: true }] },
  { id: 13, a: 908, b: TOTAL, keys: [{ f: 908, pos: [M + 5, 3, 10], look: [M, 1.5, -1], fov: 50 }, { f: 990, pos: [M + 0.8, 1.5, 4.4], look: [M, 1.2, -0.6], fov: 46, glide: true }, { f: TOTAL, pos: [M + 0.5, 1.2, 3.2], look: [M, 1.1, -0.6], fov: 42, glide: true }] },
];
const K = kit(SHOTS, []);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.tokyo || (id === S.today && f < 960) ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 66, label: "10 AÑOS", sub: "esperando a su dueño", col: "#ffd23f", big: true },
  { a: 96, b: 146, label: "Tokio", sub: "1924", col: "#ffffff" },
  { a: 440, b: 462, label: "día 2", col: "#ffffff" },
  { a: 464, b: 490, label: "día 3", col: "#ffffff" },
  { a: 738, b: 750, label: "1 año", col: "#ffffff" },
  { a: 750, b: 762, label: "5 años", col: "#ffffff" },
  { a: 762, b: 786, label: "9 años", col: "#ffd23f" },
  { a: 916, b: 990, label: "Hoy", sub: "Shibuya", col: "#ffffff" },
  { a: 1000, b: TOTAL, label: "10 AÑOS", sub: "esperando a su dueño", col: "#ffd23f", big: true },
];
