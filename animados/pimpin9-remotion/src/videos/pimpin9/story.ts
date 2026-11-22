// Pimpín 9 · "Alérgico", 41.2 s. Words: estornudado 13 · despeinado 35 · pueblo 57 · alérgico 97 · menos 125 · Pimpín 132 · Ja 148/157/166 · alérgico 193 · flores 210 · polvo 226 ·
// gatos 244 · lunes 264 · estornuda 291 · Despega 329 · estornudó 360 · panadería 378 · harina 402 · tres 409 · molino 458 · viento 496 · brisa 523 · pan 598 · Soplan 612 ·
// Abanican 647 · Nada 682 · aspas 705 · mueven 719 · espera 741 · alcaldesa 759 · idea 783 · Pimpín 811 · ramo 822 · flores 831 · nariz 852 · A 865 · a 872 · ACHÍS 880 ·
// giran 912 · rápido 924 · pan 955 · año 973 · sombrero 1010 · Porque 1051 · Pimpín 1121 · Y 1138 · dale 1165
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1236;
export const W = { ach0: 14, polvo: 226, gatos: 244, lunes: 264, despega: 327, soplan: 612, abanican: 647, ramo: 820, a1: 865, ach: 879, pan: 955, sombrero: 1008, dale: 1165 };
export const S = { hook: 1, calm: 2, ja: 3, list: 4, launch: 5, flour: 6, mill: 7, idea: 8, blast: 9, end: 10, cta: 11 };
export const GOLD: number[] = [];
export const MW: V3 = [0, 0, -70];
/** blade angle: still until the sneeze, then spins up fast */
export const bladeA = (f: number) => f < 879 ? 0 : Math.pow(Math.min(f - 879, 40) / 40, 2) * 3 + Math.max(0, f - 919) * 0.9;
const mx = MW[0], mz = MW[2];
const hk = (a: number, b: number): ShotDef["keys"] => [{ f: a, pos: [0, 1.9, 7.6], look: [0, 1.7, 1], fov: 54 }, { f: b, pos: [0, 1.8, 6.4], look: [0, 1.7, 1.2], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 70, keys: hk(0, 70) },
  { id: 2, a: 68, b: 148, keys: [{ f: 68, pos: [-1, 2.0, 7.4], look: [-1, 1.4, 1.6], fov: 54 }, { f: 148, pos: [0.5, 1.9, 6.8], look: [0.5, 1.4, 1.6], fov: 54, glide: true }] },
  { id: 3, a: 146, b: 178, keys: [{ f: 146, pos: [0, 2.4, 9], look: [0, 1.6, 1.5], fov: 54 }, { f: 178, pos: [0.1, 2.1, 7.8], look: [0.1, 1.5, 1.5], fov: 52, glide: true }] },
  { id: 4, a: 176, b: 282, keys: [{ f: 176, pos: [0.1, 1.5, 6.2], look: [0.1, 1.3, 2.6], fov: 50 }, { f: 282, pos: [0.1, 1.4, 5.0], look: [0.1, 1.3, 2.6], fov: 48, glide: true }] },
  { id: 5, a: 280, b: 350, keys: [{ f: 280, pos: [0, 1.6, 6.6], look: [0, 1.5, 2.6], fov: 52 }, { f: 350, pos: [0, 2.6, 8.6], look: [-0.8, 3.4, 2.6], fov: 58, glide: true }] },
  { id: 6, a: 348, b: 432, keys: [{ f: 348, pos: [-3, 2.4, 1.6], look: [-3, 2.4, -7], fov: 56 }, { f: 432, pos: [-3, 2.0, 0.4], look: [-3, 2.2, -7], fov: 54, glide: true }] },
  { id: 7, a: 430, b: 737, keys: [{ f: 430, pos: [mx, 4, mz + 20], look: [mx + 2, 5, mz], fov: 56 }, { f: 520, pos: [mx + 1, 3, mz + 13], look: [mx + 2, 5.6, mz], fov: 56, glide: true }, { f: 600, pos: [mx - 1, 2.0, mz + 10.4], look: [mx - 1.4, 1.5, mz + 4.2], fov: 54, glide: true }, { f: 680, pos: [mx + 0.4, 2.0, mz + 10.6], look: [mx + 0.4, 1.5, mz + 4.4], fov: 54, glide: true }, { f: 737, pos: [mx + 2, 4, mz + 12], look: [mx + 2, 6, mz], fov: 56, glide: true }] },
  { id: 8, a: 735, b: 882, keys: [{ f: 735, pos: [mx - 1, 2.0, mz + 9], look: [mx - 1, 1.6, mz + 3.3], fov: 54 }, { f: 860, pos: [mx - 0.6, 1.7, mz + 6.6], look: [mx - 0.6, 1.6, mz + 3.3], fov: 48, glide: true }, { f: 882, pos: [mx - 0.5, 1.7, mz + 6.0], look: [mx - 0.5, 1.6, mz + 3.3], fov: 46, glide: true }] },
  { id: 9, a: 880, b: 1053, keys: [{ f: 880, pos: [mx + 0.4, 3.0, mz + 13], look: [mx + 1.2, 4.0, mz + 1], fov: 58 }, { f: 960, pos: [mx + 1.4, 3.6, mz + 14], look: [mx + 1.8, 4.6, mz + 1], fov: 58, glide: true }, { f: 1053, pos: [mx + 3, 5, mz + 15], look: [mx + 3.5, 7.5, mz + 1], fov: 58, glide: true }] },
  { id: 10, a: 1051, b: 1140, keys: hk(1051, 1140) },
  { id: 11, a: 1138, b: TOTAL, keys: [{ f: 1138, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 14, k: 0.06 }, { f: 327, k: 0.04 }, { f: 879, k: 0.08 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.mill || id === S.blast || id === S.flour ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 66, label: "¡ACHÍS!", sub: "y todo el pueblo despeinado", col: "#ff3b3b", big: true },
  { a: 327, b: 350, label: "¡DESPEGA!", sub: "", col: "#ffd23f" },
  { a: 400, b: 432, label: "3 DÍAS", sub: "lloviendo harina", col: "#ffffff" },
  { a: 520, b: 560, label: "NI UNA BRISA", sub: "", col: "#ffffff" },
  { a: 682, b: 720, label: "NADA", sub: "", col: "#ff3b3b" },
  { a: 865, b: 879, label: "A... A...", sub: "", col: "#ffffff" },
  { a: 879, b: 912, label: "¡ACHÍS!", sub: "", col: "#ff3b3b", big: true },
  { a: 955, b: 1000, label: "PAN", sub: "para todo el año", col: "#ffd23f" },
  { a: 1051, b: 1134, label: "¡ACHÍS!", sub: "y todo el pueblo despeinado", col: "#ff3b3b", big: true },
];
