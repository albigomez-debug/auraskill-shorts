// "Vesna Vulović" (JAT 367, 26-I-1972), 38.8 s. Words: metros 42 · paracaídas 60 · vivió 84 · 1972 99 · Vesna 138 · años 174 · confundieron 260 · Sobre 302 ·
// revienta 347 · Diez 376 · Everest 427 · Vesna 444 · carrito 517 · El 545 · choca 559 · nevada 587 · vecino 636 · médico 666 · viva 704 · salva 714 ·
// coma 753 · cráneo 768 · piernas 794 · andar 850 · Fíjate 865 · recordaba 885 · miedo 945 · Guinness 996 · Diez 1013 · vivió 1059 · Y 1074 · dale 1102
import { kit, ShotDef, Mark, V3 } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1166;
export const W = { vesna: 138, anos: 174, confundieron: 260, sobre: 302, revienta: 347, everest: 438, vecino: 636, medico: 666, viva: 704, salva: 714,
  coma: 753, craneo: 768, piernas: 794, andar: 850, recuerda: 885, miedo: 945, guinness: 996, dale: 1102 };
export const S = { hook: 1, intro: 2, mixup: 3, bomb: 4, everest: 5, fall: 6, crash: 7, doctor: 8, hospital: 9, record: 10, end: 11, cta: 12 };
export const SKY: V3 = [300, 0, 0], ALT = 200, EVE: V3 = [600, 0, 0], SNW: V3 = [400, 0, 0], HOS: V3 = [460, 0, 0], GUI: V3 = [500, 0, 0];
export const fallY = (f: number) => ALT - 0.08 * (f > 1000 ? f - 1009 : f > 400 ? f - 438 + 97 : f);
const fk = (a: number, b: number, z0 = 6.5, z1 = 5.0) => [{ f: a, pos: [SKY[0] + 0.3, fallY(a) + 1.2, z0] as V3, look: [SKY[0], fallY(a) + 0.2, 0] as V3, fov: 50 }, { f: b, pos: [SKY[0] + 0.2, fallY(b) + 1.2, z1] as V3, look: [SKY[0], fallY(b) + 0.2, 0] as V3, fov: 48 }];
const E = EVE[0], N = SNW[0], H = HOS[0], G = GUI[0], X = SKY[0];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 97, keys: fk(0, 97, 4.6, 6.0) },
  { id: 2, a: 95, b: 204, keys: [{ f: 95, pos: [0.4, 2.6, 9], look: [0, 2.2, -2], fov: 52 }, { f: 204, pos: [0.3, 1.9, 5.4], look: [0, 1.6, 0], fov: 48, glide: true }] },
  { id: 3, a: 202, b: 300, keys: [{ f: 202, pos: [4, 1.8, 5.2], look: [4, 1.5, 0], fov: 48 }, { f: 300, pos: [4, 1.7, 4.2], look: [4, 1.6, 0], fov: 46, glide: true }] },
  { id: 4, a: 298, b: 374, keys: [{ f: 298, pos: [X, ALT - 3, 34], look: [X - 3, ALT - 5, -4], fov: 50 }, { f: 374, pos: [X + 2, ALT - 4, 28], look: [X - 3, ALT - 5, -4], fov: 52, glide: true }] },
  { id: 5, a: 372, b: 440, keys: [{ f: 372, pos: [E, 50, 120], look: [E, 70, -60], fov: 56 }, { f: 440, pos: [E, 62, 100], look: [E, 85, -60], fov: 56, glide: true }] },
  { id: 6, a: 438, b: 545, keys: fk(438, 545, 7.0, 5.4) },
  { id: 7, a: 543, b: 631, keys: [{ f: 543, pos: [N + 3, 7, 12], look: [N, 1.0, -1], fov: 50 }, { f: 631, pos: [N + 0.6, 2.2, 6.0], look: [N, 0.9, 0], fov: 48, glide: true }] },
  { id: 8, a: 629, b: 738, keys: [{ f: 629, pos: [N + 1.2, 2.0, 6.2], look: [N + 0.8, 1.1, 0.4], fov: 48 }, { f: 738, pos: [N + 0.4, 1.8, 5.0], look: [N + 0.2, 1.1, 0.4], fov: 46, glide: true }] },
  { id: 9, a: 736, b: 865, keys: [{ f: 736, pos: [H - 0.4, 2.1, 4.6], look: [H - 0.6, 1.1, -0.4], fov: 48 }, { f: 838, pos: [H - 0.2, 2.0, 4.8], look: [H - 0.3, 1.2, -0.3], fov: 48, glide: true }, { f: 865, pos: [H + 0.8, 1.9, 5.4], look: [H + 1.0, 1.4, 0], fov: 48, glide: true }] },
  { id: 10, a: 863, b: 1011, keys: [{ f: 863, pos: [G + 0.4, 1.9, 6.0], look: [G + 0.2, 1.6, -0.6], fov: 50 }, { f: 1011, pos: [G + 0.2, 1.9, 5.2], look: [G, 1.6, -0.8], fov: 48, glide: true }] },
  { id: 11, a: 1009, b: 1072, keys: fk(1009, 1072, 6.0, 4.6) },
  { id: 12, a: 1070, b: TOTAL, keys: [{ f: 1070, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 4, k: 0.04 }, { f: 347, k: 0.07 }, { f: 559, k: 0.06 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.everest || id === S.bomb || id === S.crash ? 0 : 10 }; };
export const MARKS: Mark[] = [
  { a: 0, b: 92, label: "10.000 m", sub: "sin paracaídas... y vivió", col: "#ffd23f", big: true },
  { a: 99, b: 200, label: "1972", sub: "Yugoslavia", col: "#ffffff" },
  { a: 302, b: 370, label: "Checoslovaquia", sub: "26 de enero de 1972", col: "#ffffff" },
  { a: 1013, b: 1070, label: "10.000 m", sub: "sin paracaídas... y vivió", col: "#ffd23f", big: true },
];
