// Pimpín 29 · "Suerte", 41.4 s. Words: tropezado 39 · encontrado 61 · moneda 77 · Aquí 100 · menos 146 · Pimpín 152 · suerte 189 · llueve 222 · paraguas 251 · tostada 289 · bueno 319 · tómbola 343 · premio 366 · boleto 387 ·
// carreta 422 · melones 438 · frenos 463 · baja 485 · mercado 514 · frutero 538 · corre 548 · Nada 571 · sacos 596 · Saltan 613 · alcaldesa 651 · delante 674 · brazos 691 · corriendo 721 · espera 747 · Pimpín 763 ·
// estornuda 772 · gorra 810 · agacha 832 · rueda 866 · pisa 873 · gorra 882 · frena 908 · mercado 936 · melón 958 · rompe 969 · levantar 993 · gorra 1007 · moneda 1024 · Porque 1049 · Y 1145 · dale 1171
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1243;
export const W = { tropieza: 37, moneda: 75, llueve: 220, paraguas: 249, tostada: 287, bueno: 317, premio: 364, frenos: 461, corre: 546, sacos: 594, saltan: 611, brazos: 689, corriendo: 719, estornuda: 770, gorra: 808, agacha: 830, pisa: 871, frena: 906, levantar: 991, moneda2: 1022, dale: 1171 };
export const S = { hook: 1, premise: 2, rain: 3, toast: 4, raffle: 5, cart: 6, tries: 7, sneeze: 8, stop: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 1.6, 5.8], look: [0.1, 1.0, 1.2], fov: 52 }, { f: b, pos: [0.1, 1.5, 4.8], look: [0.1, 1.0, 1.2], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 102, keys: hk(0, 102) },
  { id: 2, a: 100, b: 170, keys: [{ f: 100, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 170, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 168, b: 272, keys: M(168, 272, 0, 1.4, 6.5, 1.5) },
  { id: 4, a: 270, b: 335, keys: M(270, 335, 0.2, 1.4, 5.5, 1.0) },
  { id: 5, a: 333, b: 404, keys: M(333, 404, 0.3, 1.0, 6.0, 1.3) },
  { id: 6, a: 402, b: 532, keys: [{ f: 402, pos: [-2.5, 1.8, 6.5], look: [-2.8, 0.8, 0.8], fov: 56 }, { f: 532, pos: [1.5, 2.0, 7.4], look: [1.8, 0.9, 0.8], fov: 58, glide: true }] },
  { id: 7, a: 530, b: 747, keys: [{ f: 530, pos: [-1.0, 2.0, 7.6], look: [-0.8, 1.0, 0.8], fov: 58 }, { f: 747, pos: [1.0, 2.0, 7.4], look: [1.2, 1.0, 0.8], fov: 58, glide: true }] },
  { id: 8, a: 745, b: 862, keys: [{ f: 745, pos: [0.2, 1.4, 4.8], look: [0.0, 1.0, 1.2], fov: 50 }, { f: 862, pos: [0.2, 1.2, 4.2], look: [0.0, 0.8, 1.2], fov: 48, glide: true }] },
  { id: 9, a: 860, b: 1051, keys: [{ f: 860, pos: [0, 1.8, 7.6], look: [0.4, 0.8, 0.8], fov: 58 }, { f: 960, pos: [0.8, 2.0, 7.4], look: [1.2, 0.9, 0.8], fov: 56, glide: true }, { f: 1051, pos: [0.4, 1.6, 5.6], look: [0.3, 1.1, 1.2], fov: 52, glide: true }] },
  { id: 10, a: 1049, b: 1147, keys: hk(1049, 1147) },
  { id: 11, a: 1145, b: TOTAL, keys: [{ f: 1145, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 39, k: 0.03 }, { f: 461, k: 0.02 }, { f: 611, k: 0.03 }, { f: 772, k: 0.04 }, { f: 906, k: 0.05 }, { f: 1086, k: 0.03 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.cart || id === S.tries || id === S.stop ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 70, b: 98, label: "¡ORO!", sub: "", col: "#ffd23f", big: true },
  { a: 317, b: 333, label: "LADO BUENO", sub: "", col: "#5ab85a" },
  { a: 380, b: 402, label: "SIN BOLETO", sub: "", col: "#ffd23f" },
  { a: 461, b: 500, label: "¡SIN FRENOS!", sub: "", col: "#ff3b3b", big: true },
  { a: 569, b: 588, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 955, b: 990, label: "NI UN MELÓN ROTO", sub: "", col: "#5ab85a" },
  { a: 1110, b: 1141, label: "¡ORO!", sub: "", col: "#ffd23f", big: true },
];
void smooth;
