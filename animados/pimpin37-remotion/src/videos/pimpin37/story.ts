// Pimpín 37 · "Nadador". Words: estanque 47 · pelo 77 · menos 128 · nada 161 · patos 196 · clases 214 · Bucea 233 · monedas 265 · bañera 307 · pequeña 327 · barca 363 · suelta 386 · niños 405 · centro 443 · barquero 480 · escoba 505 · Nada 521 ·
// flotador 551 · pato 586 · alcaldesa 607 · agua 634 · piedra 671 · espera 693 · gafas 731 · tira 765 · Nada 789 · empuja 805 · orilla 831 · secos 866 · rescata 904 · piedra 937 · Porque 953 · Y 1040 · dale 1067
import { kit, ShotDef, Mark, V3 } from "./kit";
import { smooth } from "./kit";
export { FPS, smooth, clamp01, XFADE } from "./kit";
export type { V3 };
export const TOTAL = 1138;
export const W = { estanque: 45, pelo: 75, patos: 194, bucea: 231, monedas: 263, banera: 305, barca: 361, suelta: 384, centro: 441, escoba: 503, nada: 519, flotador: 549, pato: 584, agua: 632, piedra: 669, gafas: 729, tira: 763, empuja: 803, orilla: 829, secos: 864, rescata: 902, piedra2: 935, dale: 1067 };
export const S = { hook: 1, premise: 2, ducks: 3, coins: 4, bath: 5, boat: 6, tries: 7, fix: 8, end: 9, cta: 10 };
export const GOLD: number[] = [];
export const ZP = 0.6;
const P = (a: number, b: number, x0: number, x1: number, y = 0.9): ShotDef["keys"] => [{ f: a, pos: [x0, 1.6, 5.4], look: [x0, y, 0], fov: 52 }, { f: b, pos: [x1, 1.5, 4.8], look: [x1, y, 0], fov: 50, glide: true }];
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 92, keys: P(0, 92, -1.0, 0.8) },
  { id: 2, a: 90, b: 152, keys: [{ f: 90, pos: [-1.5, 2.0, 8.6], look: [-1.5, 1.4, 1.5], fov: 56 }, { f: 152, pos: [0.4, 1.8, 7.6], look: [0.4, 1.2, 1.5], fov: 52, glide: true }] },
  { id: 3, a: 150, b: 230, keys: P(150, 230, -0.6, 0.6) },
  { id: 4, a: 228, b: 290, keys: P(228, 290, 0, 0.2, 1.1) },
  { id: 5, a: 288, b: 342, keys: [{ f: 288, pos: [0, 1.6, 5.4], look: [0, 0.8, 1.4], fov: 52 }, { f: 342, pos: [0.2, 1.5, 4.8], look: [0.1, 0.8, 1.4], fov: 50, glide: true }] },
  { id: 6, a: 340, b: 470, keys: P(340, 470, -0.8, 0.2, 1.0) },
  { id: 7, a: 468, b: 690, keys: [{ f: 468, pos: [-0.4, 2.0, 7.4], look: [0, 1.0, 0.4], fov: 56 }, { f: 600, pos: [0.3, 2.0, 7.2], look: [0.3, 1.0, 0.4], fov: 56, glide: true }, { f: 690, pos: [0.6, 1.9, 6.6], look: [0.6, 1.0, 0.4], fov: 54, glide: true }] },
  { id: 8, a: 688, b: 955, keys: [{ f: 688, pos: [-0.8, 1.8, 5.6], look: [-0.8, 1.3, 1.4], fov: 52 }, { f: 780, pos: [-0.2, 2.2, 7.4], look: [0, 0.9, 0.2], fov: 56, glide: true }, { f: 955, pos: [0.4, 2.0, 7.2], look: [0.4, 1.0, 0.4], fov: 56, glide: true }] },
  { id: 9, a: 953, b: 1042, keys: P(953, 1042, -1.0, 0.8) },
  { id: 10, a: 1040, b: TOTAL, keys: [{ f: 1040, pos: [0.3, 2.4, 6.4], look: [0, 2.2, 0], fov: 50 }, { f: TOTAL, pos: [0.2, 2.3, 5.4], look: [0, 2.2, 0], fov: 48, glide: true }] },
];
const K = kit(SHOTS, [{ f: 763, k: 0.03 }, { f: 669, k: 0.02 }]);
export const camAt = K.camAt, layersAt = K.layersAt;
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => { void f; return { cInf: id === S.bath || id === S.coins ? 10 : 0 }; };
export const MARKS: Mark[] = [
  { a: 50, b: 88, label: "SIN MOJARSE", sub: "el pelo", col: "#9ad4ff", big: true },
  { a: 975, b: 1036, label: "SIN MOJARSE", sub: "el pelo", col: "#9ad4ff", big: true },
];
void smooth;
