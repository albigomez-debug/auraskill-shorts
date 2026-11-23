// Pimpín 12 · "Imán", 42.0 s. Words: cocina 27 · traído 46 · cucharas 64 · nadie 100 · magnético 109 · menos 133 · Pimpín 139 · imán 172 · humano 178 · pegan 203 · llaves 213 ·
// monedas 230 · cucharas 245 · taller 286 · sigue 300 · bicicleta 310 · quedó 349 · pegado 355 · nevera 366 · dos 378 · días 383 · aeropuerto 406 · intenta 425 · Pita 445 · máquina 460 ·
// lado 473 · anillo 508 · alcaldesa 528 · cae 542 · pozo 552 · hondo 598 · oscuro 611 · Bajan 644 · cubo 657 · Nada 671 · caña 693 · Nada 718 · vecino 739 · cuerda 762 · vuelve 775 ·
// resfriado 788 · espera 814 · Pimpín 839 · segundos 864 · clinc 879/890/899 · Sube 911 · anillo 927 · trescientas 951 · monedas 964 · bici 983 · sartenes 999 · ancla 1016 · barco 1028 ·
// llegó 1059 · Porque 1079 · Pimpín 1144 · Y 1160 · dale 1187
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1259;
export const W = { llaves: 211, monedas: 228, cucharas: 243, sigue: 298, nevera: 364, pita: 443, lado: 471, cae: 540, cubo: 644, cana: 690, vecino: 737, vuelve: 773, resfriado: 786, bajan: 830, sube: 911, anillo: 925, monedas2: 962, bici: 981, sartenes: 997, ancla: 1014, dale: 1187 };
export const S = { hook: 1, premise: 2, magnet: 3, bike: 4, fridge: 5, airport: 6, ring: 7, tries: 8, down: 9, up: 10, end: 11, cta: 12 };
export const GOLD: number[] = [];
export const WELL: V3 = [5, 0, -3];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0.5, 1.4, 6.4], look: [0.5, 1.1, 2.5], fov: 50 }, { f: b, pos: [0.7, 1.3, 5.4], look: [0.6, 1.0, 2.5], fov: 48, glide: true }];
const [wx, , wz] = WELL;
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 85, keys: hk(0, 85) },
  { id: 2, a: 83, b: 157, keys: [{ f: 83, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1], fov: 56 }, { f: 157, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1], fov: 52, glide: true }] },
  { id: 3, a: 155, b: 264, keys: [{ f: 155, pos: [0.5, 1.2, 5.6], look: [0.5, 0.9, 2.5], fov: 50 }, { f: 264, pos: [0.6, 1.1, 4.6], look: [0.5, 0.85, 2.5], fov: 46, glide: true }] },
  { id: 4, a: 262, b: 332, keys: [{ f: 262, pos: [-6.5, 1.8, 2.5], look: [-8.5, 1.4, -5], fov: 56 }, { f: 332, pos: [-2.0, 1.6, 4.5], look: [-4.6, 0.9, -1.4], fov: 54, glide: true }] },
  { id: 5, a: 330, b: 398, keys: [{ f: 330, pos: [-5.4, 1.3, 5.0], look: [-5.6, 1.0, 1.0], fov: 50 }, { f: 398, pos: [-5.4, 1.2, 4.2], look: [-5.6, 1.0, 1.0], fov: 46, glide: true }] },
  { id: 6, a: 396, b: 487, keys: [{ f: 396, pos: [-3.0, 1.9, 7.8], look: [-3.0, 1.3, 1.0], fov: 56 }, { f: 487, pos: [-3.0, 1.8, 7.0], look: [-3.0, 1.3, 1.0], fov: 54, glide: true }] },
  { id: 7, a: 485, b: 644, keys: [{ f: 485, pos: [wx - 0.3, 2.0, wz + 5.8], look: [wx - 0.4, 1.4, wz + 0.6], fov: 54 }, { f: 560, pos: [wx + 0.3, 2.4, wz + 3.6], look: [wx, 1.0, wz], fov: 50, glide: true }, { f: 585, pos: [wx + 0.05, 4.6, wz + 2.6], look: [wx, 0.4, wz], fov: 50, glide: true }, { f: 644, pos: [wx + 0.05, 3.8, wz + 2.0], look: [wx, 0.4, wz], fov: 46, glide: true }] },
  { id: 8, a: 642, b: 808, keys: [{ f: 642, pos: [wx + 1.0, 2.2, wz + 5.4], look: [wx, 1.4, wz], fov: 52 }, { f: 808, pos: [wx + 0.2, 2.0, wz + 4.6], look: [wx, 1.4, wz], fov: 50, glide: true }] },
  { id: 9, a: 806, b: 913, keys: [{ f: 806, pos: [wx - 0.8, 2.2, wz + 5.0], look: [wx, 1.6, wz], fov: 52 }, { f: 860, pos: [wx - 0.4, 2.0, wz + 4.2], look: [wx, 1.2, wz], fov: 50, glide: true }, { f: 913, pos: [wx - 0.3, 1.8, wz + 3.8], look: [wx, 1.2, wz], fov: 48, glide: true }] },
  { id: 10, a: 911, b: 1081, keys: [{ f: 911, pos: [wx, 1.8, wz + 4.6], look: [wx, 1.8, wz], fov: 50 }, { f: 1000, pos: [wx + 0.3, 2.2, wz + 6.2], look: [wx + 0.3, 1.9, wz], fov: 56, glide: true }, { f: 1081, pos: [wx + 0.6, 2.6, wz + 7.6], look: [wx + 0.4, 2.0, wz], fov: 58, glide: true }] },
  { id: 11, a: 1079, b: 1162, keys: hk(1079, 1162) },
  { id: 12, a: 1160, b: TOTAL, keys: [{ f: 1160, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 64, k: 0.03 }, { f: 445, k: 0.03 }, { f: 552, k: 0.03 }, { f: 879, k: 0.03 }, { f: 890, k: 0.03 }, { f: 899, k: 0.03 }, { f: 1016, k: 0.06 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.ring || id === S.bike ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 80, label: "¡CUCHARAS!", sub: "todas las del pueblo", col: "#ffd23f", big: true },
  { a: 170, b: 205, label: "IMÁN HUMANO", sub: "", col: "#ff3b3b", big: true },
  { a: 376, b: 396, label: "2 DÍAS", sub: "pegado a la nevera", col: "#3a9ad8", big: true },
  { a: 443, b: 485, label: "¡PIIII!", sub: "", col: "#ff3b3b", big: true },
  { a: 669, b: 684, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 716, b: 732, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 786, b: 806, label: "¡ACHÍS!", sub: "", col: "#3a9ad8", big: true },
  { a: 877, b: 888, label: "CLINC", sub: "", col: "#ffd23f", big: true },
  { a: 888, b: 897, label: "CLINC", sub: "", col: "#ffd23f", big: true },
  { a: 897, b: 911, label: "CLINC", sub: "", col: "#ffd23f", big: true },
  { a: 949, b: 980, label: "+300 MONEDAS", sub: "", col: "#ffd23f" },
  { a: 1014, b: 1076, label: "¿UN ANCLA?", sub: "", col: "#ff3b3b", big: true },
  { a: 1079, b: 1158, label: "¡CUCHARAS!", sub: "todas las del pueblo", col: "#ffd23f", big: true },
];
void smooth;
