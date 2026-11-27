// Pimpín 40 · "Risa contagiosa". Words: reído 41 · caído 61 · sillas 74 · risa 84 · serios 128 · menos 148 · contagiosa 197 · clase 235 · profe 263 · misa 294 · cura 307 · seguir 322 · médico 376 · alta 394 · alcalde 434 · firmar 456 ·
// enfado 501 · gordos 517 · pastel 545 · Nada 562 · canción 594 · oídos 630 · chiste 678 · enfada 717 · todavía 726 · espera 757 · acerca 786 · mira 809 · ríe 822 · aguanta 868 · aguanta 883 · explota 900 · Firma 929 · sonrisa 958 · parar 1022 · Porque 1036 · Y 1134 · dale 1161
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1232;
export const W = { reido: 39, caido: 59, clase: 233, profe: 261, cura: 305, alta: 392, alcalde: 432, enfado: 499, pastel: 543, nada: 560, cancion: 592, oidos: 628, chiste: 676, enfada: 715, acerca: 784, mira: 807, rie: 820, aguanta: 866, explota: 898, firma: 927, sonrisa: 956, parar: 1020, dale: 1161 };
export const S = { hook: 1, premise: 2, school: 3, mass: 4, doctor: 5, arrive: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 101, keys: M(0, 101, 0.2, 1.0, 6.2, 1.1) },
  { id: 2, a: 99, b: 170, keys: [{ f: 99, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 170, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 168, b: 292, keys: M(168, 292, 0, 1.0, 7.0, 1.2) },
  { id: 4, a: 290, b: 357, keys: M(290, 357, 0, 1.0, 6.0, 1.4) },
  { id: 5, a: 355, b: 407, keys: M(355, 407, 0, 1.0, 6.0, 1.4) },
  { id: 6, a: 405, b: 530, keys: [{ f: 405, pos: [0.6, 1.8, 6.4], look: [0.5, 1.6, 0.8], fov: 54 }, { f: 530, pos: [0.4, 2.0, 5.6], look: [0.4, 1.8, 0.8], fov: 52, glide: true }] },
  { id: 7, a: 528, b: 757, keys: [{ f: 528, pos: [-0.2, 1.9, 7.0], look: [0, 1.5, 0.8], fov: 56 }, { f: 680, pos: [0.3, 1.9, 6.6], look: [0.3, 1.6, 0.8], fov: 55, glide: true }, { f: 757, pos: [0.5, 2.0, 5.8], look: [0.6, 1.8, 0.8], fov: 53, glide: true }] },
  { id: 8, a: 755, b: 1038, keys: [{ f: 755, pos: [-0.4, 1.8, 6.4], look: [-0.2, 1.5, 0.8], fov: 54 }, { f: 880, pos: [0.3, 1.9, 5.6], look: [0.4, 1.7, 0.8], fov: 52, glide: true }, { f: 1038, pos: [0.2, 2.1, 7.2], look: [0.2, 1.3, 0.8], fov: 57, glide: true }] },
  { id: 9, a: 1036, b: 1136, keys: M(1036, 1136, 0.2, 1.0, 6.2, 1.1) },
  { id: 10, a: 1134, b: TOTAL, keys: [{ f: 1134, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 59, k: 0.03 }, { f: 715, k: 0.02 }, { f: 898, k: 0.04 }, { f: 1080, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.school || id === S.tries || id === S.premise || id === S.hook || id === S.end ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 64, b: 96, label: "3 SILLAS", sub: "al suelo de la risa", col: "#ffd23f", big: true },
  { a: 1060, b: 1130, label: "3 SILLAS", sub: "al suelo de la risa", col: "#ffd23f", big: true },
];
void smooth;
