// "Jonathan, la tortuga de casi 200 años" (Santa Elena), 32 s.
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 955;
export const W = { jonathan: 91, santa: 166, atlantico: 203, nacio: 237, bombilla: 265, telefono: 289, coches: 312, guerras: 372, avion: 410, luna: 438,
  hierba: 475, ciego: 516, huele: 531, vet: 564, platanos: 584, mejor: 624, frederica: 679, descubrieron: 715, macho: 753, terrestre: 791, guinness: 839,
  suscribete: 860, doscientos: 912 };
export const S = { hook: 1, island: 2, born: 3, history: 4, vet: 5, love: 6, record: 7, end: 8 };
const hookK = (a: number, b: number, rev = false) => {
  const k0 = { pos: [0.4, 0.8, 3.0] as V3, look: [0.15, 0.6, 0] as V3, fov: 44 }, k1 = { pos: [0.55, 0.75, 2.3] as V3, look: [0.35, 0.6, 0] as V3, fov: 42 };
  const [x, y] = rev ? [k1, k0] : [k0, k1];
  return [{ f: a, ...x }, { f: b, ...y, glide: true }];
};
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 78, sunAz: 250, keys: hookK(0, 78) },
  { id: 2, a: 76, b: 228, sunAz: 250, keys: [
    { f: 76, pos: [14, 14, 30], look: [0, 0, -2], fov: 50 },
    { f: 228, pos: [2.4, 1.3, 5.2], look: [0.3, 0.6, 0], fov: 44, glide: true },
  ] },
  { id: 3, a: 226, b: 334, sunAz: 240, keys: [
    { f: 226, pos: [-1.2, 1.0, 3.6], look: [0.2, 0.9, 0], fov: 46 },
    { f: 334, pos: [-0.6, 1.0, 3.0], look: [0.2, 0.9, 0], fov: 44, glide: true },
  ] },
  { id: 4, a: 332, b: 494, sunAz: 250, keys: [
    { f: 332, pos: [2.4, 1.6, 4.4], look: [0.4, 1.0, 0], fov: 48 },
    { f: 494, pos: [1.8, 1.2, 3.4], look: [0.4, 0.8, 0], fov: 44, glide: true },
  ] },
  { id: 5, a: 492, b: 618, sunAz: 240, keys: [
    { f: 492, pos: [0.6, 0.9, 3.2], look: [0.5, 0.7, 0], fov: 44 },
    { f: 618, pos: [0.8, 0.9, 2.8], look: [0.6, 0.7, 0], fov: 44, glide: true },
  ] },
  { id: 6, a: 616, b: 776, sunAz: 250, keys: [
    { f: 616, pos: [0.4, 1.0, 5.0], look: [0.4, 0.7, 0], fov: 46 },
    { f: 745, pos: [0.4, 0.9, 4.2], look: [0.4, 0.7, 0], fov: 44, glide: true },
    { f: 776, pos: [0.4, 0.8, 3.6], look: [0.4, 0.7, 0], fov: 42, glide: true },
  ] },
  { id: 7, a: 774, b: 862, sunAz: 250, keys: [
    { f: 774, pos: [-2.2, 1.4, 4.0], look: [0.2, 1.0, 0], fov: 46 },
    { f: 862, pos: [-1.4, 1.2, 3.2], look: [0.2, 1.0, 0], fov: 44, glide: true },
  ] },
  { id: 8, a: 860, b: TOTAL, sunAz: 250, keys: hookK(860, TOTAL, true) },
];
const K = kit(SHOTS, [{ f: 6, k: 0.04 }, { f: W.macho, k: 0.06 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.island ? 0 : 12 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 76, label: "¡194 AÑOS!", sub: "y sigue vivo", col: "#ffd23f", big: true },
  { a: 88, b: 160, label: "Jonathan", sub: "tortuga gigante", col: "#ffffff" },
  { a: 162, b: 226, label: "Santa Elena", sub: "en mitad del Atlántico", col: "#9ad4ff" },
  { a: 228, b: 262, label: "Nació en 1832", col: "#ffd23f" },
  { a: 748, b: 776, label: "¡ERA MACHO!", col: "#ff6a5a", big: true },
  { a: 790, b: 860, label: "RÉCORD GUINNESS", sub: "animal terrestre más viejo", col: "#ffd23f" },
];
