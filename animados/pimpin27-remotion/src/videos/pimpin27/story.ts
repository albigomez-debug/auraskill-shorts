// Pimpín 27 · "Memoria", 40.7 s. Words: acuerda 39 · cenó 54 · tres años 70/76 · Aquí 90 · menos 133 · Pimpín 140 · olvida 170 · cumpleaños 202 · gallinas 229 · diccionario 263 · memoria 278 · caramelo 315 · diez 344 ·
// después 356 · cofre 396 · fiestas 410 · abre 427 · candado 452 · número 466 · acuerda 498 · cartero 521 · cumpleaños 543 · Nada 566 · cura 587 · uno 600 · dos 609 · tres 620 · Nada 635 · alcaldesa 657 · martillazo 678 ·
// rompe 701 · martillo 710 · espera 734 · Pimpín 750 · acuerda 763 · cuatro 787 · martes 816 · Lloviendo 833 · Siete 853 · tres 869 · nueve 881 · Clic 895 · abre 920 · farolillos 939 · caramelos 995 · Porque 1030 · Y 1123 · dale 1150
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1221;
export const W = { cena: 52, cumple: 200, caramelo: 313, despues: 354, candado: 450, cartero: 541, uno: 598, dos: 607, tres: 618, martillo: 676, rompe: 699, martes: 814, lluvia: 831, siete: 851, tres2: 867, nueve: 879, clic: 893, farol: 937, caramelos: 993, dale: 1150 };
export const S = { hook: 1, premise: 2, hens: 3, dict: 4, candy: 5, chest: 6, tries: 7, think: 8, open: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
const M = (a: number, b: number, x: number, z: number, d = 6.5, y = 1.2): ShotDef["keys"] => [{ f: a, pos: [x - 0.4, y + 0.8, z + d], look: [x, y, z], fov: 54 }, { f: b, pos: [x + 0.3, y + 0.6, z + d - 1.0], look: [x, y, z], fov: 51, glide: true }];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.2, 1.9, 6.0], look: [0, 1.6, 1], fov: 52 }, { f: b, pos: [0.1, 1.8, 4.9], look: [0, 1.6, 1], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 90, keys: hk(0, 90) },
  { id: 2, a: 88, b: 156, keys: [{ f: 88, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 156, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 154, b: 247, keys: M(154, 247, 0, 1.4, 5.8, 1.0) },
  { id: 4, a: 245, b: 297, keys: M(245, 297, 0, 1.4, 5.5, 1.3) },
  { id: 5, a: 295, b: 374, keys: M(295, 374, 0, 1.4, 6.0, 1.3) },
  { id: 6, a: 372, b: 517, keys: [{ f: 372, pos: [0, 2.2, 8.0], look: [0, 1.0, 0.6], fov: 56 }, { f: 450, pos: [0, 1.3, 3.6], look: [0, 0.7, 0.8], fov: 50, glide: true }, { f: 517, pos: [0.4, 2.0, 7.4], look: [0.2, 1.1, 0.6], fov: 56, glide: true }] },
  { id: 7, a: 515, b: 730, keys: [{ f: 515, pos: [-0.3, 2.0, 7.0], look: [0, 1.1, 0.6], fov: 56 }, { f: 730, pos: [0.4, 1.9, 6.2], look: [0.2, 1.1, 0.6], fov: 54, glide: true }] },
  { id: 8, a: 728, b: 900, keys: [{ f: 728, pos: [0.4, 1.5, 5.6], look: [0.3, 1.45, 1.2], fov: 52 }, { f: 900, pos: [0.4, 1.5, 4.8], look: [0.3, 1.5, 1.2], fov: 50, glide: true }] },
  { id: 9, a: 898, b: 1032, keys: [{ f: 898, pos: [0, 1.4, 4.0], look: [0, 0.8, 0.8], fov: 50 }, { f: 960, pos: [0, 2.2, 8.0], look: [0, 3.0, 0], fov: 58, glide: true }, { f: 1032, pos: [0.3, 1.9, 6.4], look: [0.2, 1.3, 0.8], fov: 54, glide: true }] },
  { id: 10, a: 1030, b: 1125, keys: hk(1030, 1125) },
  { id: 11, a: 1123, b: TOTAL, keys: [{ f: 1123, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 52, k: 0.02 }, { f: 676, k: 0.04 }, { f: 699, k: 0.03 }, { f: 893, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.open ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 56, b: 86, label: "HACE 3 AÑOS", sub: "", col: "#ffd23f", big: true },
  { a: 263, b: 295, label: "DE MEMORIA", sub: "", col: "#9ad4ff", big: true },
  { a: 342, b: 372, label: "10 AÑOS DESPUÉS", sub: "", col: "#ffd23f" },
  { a: 564, b: 582, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 633, b: 652, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 851, b: 893, label: "7 · 3 · 9", sub: "", col: "#ffd23f", big: true },
  { a: 1060, b: 1119, label: "HACE 3 AÑOS", sub: "", col: "#ffd23f", big: true },
];
void smooth;
