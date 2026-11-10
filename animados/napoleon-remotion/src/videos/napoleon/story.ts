// Timeline of "La lata de Napoleón", 31.3 s, timed to public/voz/voz.wav (palabras.json).
export const FPS = 30;
export const TOTAL = 940;
export type V3 = [number, number, number];
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const u = clamp01(x); return u * u * (3 - 2 * u); };
const smoother = (x: number) => { const u = clamp01(x); return u * u * u * (u * (6 * u - 15) + 10); };

// words (frames): Napoleón 2 · problema 27 · ejército 45 · hambre 72 · perro 84 · afilador 96 · Francia 125 · premio 147 ·
// doce mil francos 160-171 · conservar 202 · comida 216 · Nicolas Appert 232-245 · cocinero 258 · París 271 ·
// catorce años 294-305 · botellas 333 · hirviéndolas 346 · joder 373 · funciona 386 · Napoleón 405 · premio 428 ·
// Ese mismo año 444-459 · ingleses 473 · copian 484 · latas 513 · hierro 522 · Por suerte 538 · aguantaba 568 · años 580 ·
// Por desgracia 596 · nadie 619 · abrirlas 647 · Fíjate 665 · abrelatas 686 · cincuenta 711 · años 723 · después 729 ·
// Mientras tanto 747 · bayonetazos 775 · martillazos 799 · tiros 824 · Hostia 840 · locura 859 · lata 875 ·
// medio siglo 886-893 · abrelatas 914 (voice ends ~935)
export const W = { problema: 27, hambre: 72, perro: 84, premio: 147, francos: 160, anos14: 294, joder: 373, funciona: 386, da: 422,
  copian: 484, latas: 513, aguantaba: 568, nadie: 619, abrir: 647, cincuenta: 711, bayoneta: 775, martillo: 799, tiros: 824, hostia: 840, abrelatas: 914 };
export const S = { hunger: 1, paris: 2, appert: 3, works: 4, england: 5, cans: 6, wait: 7, open: 8, end: 9 };
export const CAMP = { x: 0, z: 0 }, PARIS = 200, KITCHEN = 400, FACTORY = 600;

type Key = { f: number; pos: V3; look: V3; fov: number; glide?: boolean };
export type ShotDef = { id: number; a: number; b: number; keys: Key[]; place: "out" | "room"; sunAz?: number };
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 116, place: "out", sunAz: 130, keys: [
    { f: 0, pos: [1.5, 1.75, 5.8], look: [1.3, 1.7, 0.8], fov: 40 },
    { f: 60, pos: [-1.6, 1.6, 4.8], look: [-0.6, 1.2, -1.5], fov: 44, glide: true },
    { f: 116, pos: [1.8, 1.4, 3.6], look: [1.6, 0.6, -0.6], fov: 42, glide: true },
  ] },
  { id: 2, a: 110, b: 230, place: "out", sunAz: 120, keys: [
    { f: 110, pos: [PARIS + 0.6, 1.9, 9], look: [PARIS, 2.6, -6], fov: 46 },
    { f: 170, pos: [PARIS + 0.3, 2.6, 2.5], look: [PARIS, 3.2, -6], fov: 42, glide: true },
    { f: 230, pos: [PARIS - 0.2, 3.0, 0.5], look: [PARIS, 3.3, -6], fov: 40, glide: true },
  ] },
  { id: 3, a: 226, b: 366, place: "room", sunAz: 140, keys: [
    { f: 226, pos: [KITCHEN + 1.0, 1.75, 4.2], look: [KITCHEN + 1.0, 1.6, -1.2], fov: 44 },
    { f: 290, pos: [KITCHEN + 1.6, 1.9, 3.0], look: [KITCHEN + 1.8, 1.5, -3.5], fov: 46, glide: true },
    { f: 366, pos: [KITCHEN + 1.2, 2.2, 2.2], look: [KITCHEN + 2.2, 1.4, -4], fov: 48, glide: true },
  ] },
  { id: 4, a: 362, b: 444, place: "room", sunAz: 140, keys: [
    { f: 362, pos: [KITCHEN + 1.1, 1.75, 3.0], look: [KITCHEN + 1.0, 1.7, -1.2], fov: 40 },
    { f: 400, pos: [KITCHEN + 1.4, 1.8, 3.8], look: [KITCHEN + 1.6, 1.6, -1.0], fov: 44, glide: true },
    { f: 444, pos: [KITCHEN + 1.6, 1.8, 3.4], look: [KITCHEN + 1.8, 1.6, -1.0], fov: 42, glide: true },
  ] },
  { id: 5, a: 440, b: 536, place: "room", sunAz: 130, keys: [
    { f: 440, pos: [FACTORY + 1, 2.4, 6], look: [FACTORY + 1, 1.4, -2], fov: 48 },
    { f: 536, pos: [FACTORY + 1.4, 1.9, 3.6], look: [FACTORY + 1.2, 1.3, -1.5], fov: 44, glide: true },
  ] },
  { id: 6, a: 532, b: 662, place: "out", sunAz: 120, keys: [
    { f: 532, pos: [3.4, 1.6, 7.6], look: [3.4, 0.9, 3.5], fov: 44 },
    { f: 600, pos: [2.8, 1.7, 8.4], look: [2.4, 1.2, 4.0], fov: 46, glide: true },
    { f: 662, pos: [2.5, 1.75, 7.4], look: [2.3, 1.5, 4.0], fov: 40, glide: true },
  ] },
  { id: 7, a: 660, b: 744, place: "out", sunAz: 150, keys: [
    { f: 660, pos: [-3.6, 1.5, 10.0], look: [-3.8, 1.2, 6], fov: 40 },
    { f: 744, pos: [-3.7, 1.4, 9.0], look: [-3.8, 1.2, 6], fov: 38, glide: true },
  ] },
  { id: 8, a: 742, b: 836, place: "out", sunAz: 125, keys: [
    { f: 742, pos: [-1.6, 1.7, 9.6], look: [-1.8, 1.3, 5.5], fov: 44 },
    { f: 790, pos: [0.4, 1.7, 9.6], look: [0.2, 1.3, 5.5], fov: 44, glide: true },
    { f: 836, pos: [2.4, 1.75, 9.6], look: [2.2, 1.3, 5.5], fov: 44, glide: true },
  ] },
  { id: 9, a: 832, b: TOTAL, place: "out", sunAz: 130, keys: [
    { f: 832, pos: [0.2, 1.8, 10.4], look: [0, 1.6, 5], fov: 46 },
    { f: TOTAL, pos: [0, 4.5, 14], look: [0, 1.2, 3], fov: 52, glide: true },
  ] },
];
export const XFADE = 6;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const SHAKES = [{ f: W.tiros, k: 0.08 }, { f: W.martillo + 3, k: 0.04 }];
export const camAt = (id: number, f: number) => {
  const k = SHOTS[id - 1].keys;
  let pos: V3 = k[k.length - 1].pos, look: V3 = k[k.length - 1].look, fov = k[k.length - 1].fov;
  if (f <= k[0].f) { pos = k[0].pos; look = k[0].look; fov = k[0].fov; }
  else for (let i = 1; i < k.length; i++) if (f <= k[i].f) {
    const u = (f - k[i - 1].f) / (k[i].f - k[i - 1].f), t = k[i].glide ? smoother(u) : u;
    pos = lerp3(k[i - 1].pos, k[i].pos, t); look = lerp3(k[i - 1].look, k[i].look, t); fov = lerp(k[i - 1].fov, k[i].fov, t);
    break;
  }
  let sx = 0, sy = 0;
  for (const s of SHAKES) { const d = f - s.f; if (d >= 0 && d < 7) { const a = s.k * (1 - d / 7) * (d % 2 ? -1 : 1); sx += a; sy += a * 0.6; } }
  return { pos: [pos[0] + sx, pos[1] + sy, pos[2]] as V3, look, fov };
};
export const layersAt = (f: number): { id: number; alpha: number }[] => {
  for (let i = SHOTS.length - 1; i > 0; i--) {
    const a = SHOTS[i].a;
    if (f >= a + XFADE) return [{ id: i + 1, alpha: 1 }];
    if (f >= a) return [{ id: i, alpha: 1 }, { id: i + 1, alpha: (f - a + 1) / (XFADE + 1) }];
  }
  return [{ id: 1, alpha: 1 }];
};
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => {
  if (id === S.paris) return { cInf: 6, focus: [PARIS, 3.4, -6] };
  if (id === S.end) return { cInf: lerp(10, 2, smooth((f - 870) / 50)) };
  void f; return { cInf: 12 };
};
export const MARKS = [
  { a: 158, b: 226, label: "12.000", sub: "francos de premio", col: "#ffd23f" },
  { a: 292, b: 340, label: "14 años", sub: "probando", col: "#ffffff" },
  { a: 444, b: 482, label: "1810", sub: "Inglaterra", col: "#ffffff" },
  { a: 700, b: 744, label: "1858", sub: "llega el abrelatas", col: "#ffd23f" },
];
