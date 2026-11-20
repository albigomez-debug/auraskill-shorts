// "El Vasa" (1628), 37 s. Words: hundió 48 · veinte 67 · zarpar 87 · Estocolmo 102 · 1628 121 · rey 161 · impresionante 188 · Dos 221 · cañones 238 ·
// Cientos 256 · oro 286 · Sesenta 296 · Vasa 346 · prueba 393 · treinta 405 · corren 426 · balancea 493 · paran 517 · bah 554 · nada 586 · agosto 610 ·
// miles 623 · puerto 650 · Salvas 663 · zarpa 702 · ráfaga 729 · inclina 758 · agua 779 · huecos 798 · hunde 836 · mundo 871 · Fíjate 883 · alto 915 ·
// pesado 936 · suerte 962 · 1961 978 · sacaron 1013 · desgracia 1052 · veinte 1090 · minutos 1097
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1118;
export const W = { rey: 161, dos: 221, cientos: 256, oro: 286, sesenta: 296, vasa: 346, prueba: 393, corren: 426, balancea: 493, paran: 517, bah: 554,
  miles: 623, salvas: 663, zarpa: 702, rafaga: 729, inclina: 758, agua: 779, hunde: 836, fijate: 883, alto: 915, pesado: 936, sacaron: 1013 };
export const S = { hook: 1, port: 2, king: 3, hull: 4, test: 5, bah: 6, crowd: 7, sail: 8, water: 9, sink: 10, why: 11, raised: 12, end: 13 };
export const SX = 2;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, keys: [{ f: 0, pos: [16, 5, 38], look: [7, 3, 0], fov: 48 }, { f: 100, pos: [12, 4, 33], look: [7, 3, 0], fov: 46, glide: true }] },
  { id: 2, a: 96, b: 158, keys: [{ f: 96, pos: [-18, 9, 34], look: [0, 5, 0], fov: 52 }, { f: 158, pos: [-14, 6, 28], look: [0, 5, 0], fov: 50, glide: true }] },
  { id: 3, a: 154, b: 220, keys: [{ f: 154, pos: [-11.5, 1.9, 9.5], look: [-13, 1.6, 4], fov: 44 }, { f: 220, pos: [-12.2, 1.9, 8.2], look: [-13, 1.7, 4], fov: 42, glide: true }] },
  { id: 4, a: 216, b: 358, keys: [{ f: 216, pos: [8, 1.6, 9], look: [8, 1.3, 2], fov: 46 }, { f: 300, pos: [-1, 2.4, 10], look: [-2, 2.4, 2], fov: 48, glide: true }, { f: 358, pos: [-5, 5, 15], look: [-6, 5, 0], fov: 48, glide: true }] },
  { id: 5, a: 354, b: 540, keys: [{ f: 354, pos: [SX + 4.2, 7.5, 9], look: [SX + 3.8, 2.8, 0], fov: 50 }, { f: 540, pos: [SX + 3.9, 6.5, 7.4], look: [SX + 3.8, 2.8, 0], fov: 50, glide: true }] },
  { id: 6, a: 536, b: 600, keys: [{ f: 536, pos: [SX + 1.6, 3.9, 3.6], look: [SX + 0.6, 3.6, 0], fov: 44 }, { f: 600, pos: [SX + 1.2, 3.9, 2.8], look: [SX + 0.6, 3.7, 0], fov: 42, glide: true }] },
  { id: 7, a: 596, b: 692, keys: [{ f: 596, pos: [-3, 2.6, 17], look: [-9, 1.8, 3], fov: 50 }, { f: 692, pos: [-5, 2.2, 14], look: [-10, 1.8, 3], fov: 48, glide: true }] },
  { id: 8, a: 688, b: 776, keys: [{ f: 688, pos: [10, 4, 26], look: [6, 5, 0], fov: 52 }, { f: 776, pos: [14, 3, 24], look: [10, 4, 0], fov: 50, glide: true }] },
  { id: 9, a: 772, b: 830, keys: [{ f: 772, pos: [12, 0.8, 7], look: [12, 0.4, 2], fov: 44 }, { f: 830, pos: [12.5, 0.6, 5.6], look: [12, 0.3, 2], fov: 42, glide: true }] },
  { id: 10, a: 826, b: 886, keys: [{ f: 826, pos: [-7, 2.2, 18], look: [8, 3, 0], fov: 50 }, { f: 886, pos: [-6, 2, 15], look: [9, 2.5, 0], fov: 48, glide: true }] },
  { id: 11, a: 882, b: 962, keys: [{ f: 882, pos: [SX, 7, 34], look: [SX, 7, 0], fov: 50 }, { f: 962, pos: [SX, 7, 30], look: [SX, 7.5, 0], fov: 50, glide: true }] },
  { id: 12, a: 958, b: 1050, keys: [{ f: 958, pos: [SX + 14, 4, 26], look: [SX, 4, 0], fov: 50 }, { f: 1050, pos: [SX + 6, 3, 22], look: [SX, 4, 0], fov: 48, glide: true }] },
  { id: 13, a: 1046, b: TOTAL, keys: [{ f: 1046, pos: [12, 4, 33], look: [7, 3, 0], fov: 46 }, { f: TOTAL, pos: [16, 5, 38], look: [7, 3, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 663, k: 0.03 }, { f: 836, k: 0.04 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.king || id === S.bah || id === S.water ? 12 : 0 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 66, label: "SE HUNDIÓ", sub: "a los 20 minutos", col: "#ff3b3b", big: true },
  { a: 100, b: 156, label: "Estocolmo", sub: "1628", col: "#ffffff" },
  { a: 221, b: 254, label: "2 PISOS", sub: "de cañones", col: "#ffffff" },
  { a: 256, b: 294, label: "ORO", sub: "cientos de esculturas", col: "#ffd23f" },
  { a: 296, b: 334, label: "64 CAÑONES", col: "#ff3b3b" },
  { a: 600, b: 680, label: "10 de agosto", col: "#ffffff" },
  { a: 970, b: 1040, label: "1961", sub: "333 años después", col: "#ffffff" },
  { a: 1060, b: TOTAL, label: "20 MINUTOS", sub: "de viaje", col: "#ff3b3b", big: true },
];
