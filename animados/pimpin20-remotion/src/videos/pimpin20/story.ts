// Pimpín 20 · "Olfato", 37.2 s. Words: olido 37 · pizza 48 · pueblo 67 · nariz 104 · menos 131 · Pimpín 137 · huele 165 · perro 182 · cena 215 · colegio 229 · calcetines 265 · escondite 324 · champú 360 ·
// perro 397 · alcaldesa 409 · escapa 427 · Carteles 497 · Nada 517 · Silbidos 533 · Nada 555 · cartero 576 · otro perro 632 · espera 658 · Pimpín 674 · olfatea 684 · aquí 707 · panadería 726 · charco 752 ·
// encuentra 772 · granero 797 · hueso 827 · gafas 892 · abuelo 903 · Porque 919 · Pimpín 1001 · Y 1018 · dale 1045
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1117;
export const W = { pizza: 46, cena: 213, champu: 358, escapa: 425, carteles: 495, silbidos: 531, cartero: 574, otro: 630, olfatea: 682, panaderia: 724, charco: 750, hueso: 825, gafas: 890, dale: 1045 };
export const S = { hook: 1, premise: 2, dog: 3, school: 4, socks: 5, hide: 6, escape: 7, tries: 8, trail: 9, barn: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 1.9, 6.4], look: [0, 1.4, 1], fov: 52 }, { f: b, pos: [0.1, 1.7, 5.2], look: [0, 1.4, 1], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 108, keys: hk(0, 108) },
  { id: 2, a: 106, b: 163, keys: [{ f: 106, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 163, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 161, b: 213, keys: M(161, 213, 0, 1.5) },
  { id: 4, a: 211, b: 258, keys: M(211, 258, -3, -5.5) },
  { id: 5, a: 256, b: 318, keys: M(256, 318, 0, 1.5) },
  { id: 6, a: 316, b: 392, keys: M(316, 392, 11, -4.2, 6.0) },
  { id: 7, a: 390, b: 495, keys: [{ f: 390, pos: [0, 2.0, 8.0], look: [0, 1.2, 1.2], fov: 54 }, { f: 495, pos: [2.0, 2.0, 7.4], look: [2.4, 1.0, 1.2], fov: 54, glide: true }] },
  { id: 8, a: 493, b: 658, keys: [{ f: 493, pos: [-3, 2.0, -2.0], look: [-3, 1.8, -7.8], fov: 54 }, { f: 529, pos: [-3, 2.0, -2.6], look: [-3, 1.8, -7.8], fov: 52, glide: true }, { f: 531, pos: [0, 2.0, 8.0], look: [0, 1.2, 1.2], fov: 54 }, { f: 658, pos: [0.3, 1.9, 7.0], look: [0.3, 1.2, 1.2], fov: 52, glide: true }] },
  { id: 9, a: 656, b: 772, keys: [{ f: 656, pos: [-4.4, 1.6, 5.5], look: [-4, 1.0, 1.2], fov: 54 }, { f: 772, pos: [3.6, 1.6, 5.5], look: [4, 1.0, 1.2], fov: 54, glide: true }] },
  { id: 10, a: 770, b: 921, keys: [{ f: 770, pos: [0, 2.6, 9.5], look: [0, 1.8, 0], fov: 56 }, { f: 860, pos: [0.4, 1.6, 6.4], look: [0.3, 1.0, 0.6], fov: 52, glide: true }, { f: 921, pos: [-0.6, 1.8, 6.2], look: [-0.6, 1.4, 1.2], fov: 50, glide: true }] },
  { id: 11, a: 919, b: 1020, keys: hk(919, 1020) },
  { id: 12, a: 1018, b: TOTAL, keys: [{ f: 1018, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 46, k: 0.03 }, { f: 425, k: 0.03 }, { f: 630, k: 0.03 }, { f: 825, k: 0.03 }, { f: 975, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.barn || id === S.trail || id === S.escape ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 104, label: "¡PIZZA!", sub: "de otro pueblo", col: "#ff8a2a", big: true },
  { a: 228, b: 256, label: "¡LENTEJAS!", sub: "", col: "#ff8a2a", big: true },
  { a: 425, b: 470, label: "¡SE ESCAPA!", sub: "", col: "#ff3b3b", big: true },
  { a: 515, b: 530, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 553, b: 572, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 630, b: 656, label: "OTRO PERRO", sub: "", col: "#ff3b3b", big: true },
  { a: 919, b: 1014, label: "¡PIZZA!", sub: "de otro pueblo", col: "#ff8a2a", big: true },
];
void smooth;
