// Timeline of "La guerra de los emús", 28.1 s, timed to public/voz/voz.wav (palabras.json).
// Retention formula: triple hook (voice + big on-screen text + emus in shot 1), rehooks at "Pues todo, joder" (387)
// and "Hostia" (655) with a cut and a sound change, ending that loops back to the emu flock.
export const FPS = 30;
export const TOTAL = 850;
export type V3 = [number, number, number];
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const u = clamp01(x); return u * u * (3 - 2 * u); };
const smoother = (x: number) => { const u = clamp01(x); return u * u * u * (u * (6 * u - 15) + 10); };

// words (frames): Australia 2 · perdió 19 · guerra 31 · pájaros 46 · Sí 65 · emús 87 · 1932 103 · veinte mil emús 145-159 ·
// arrasan 166 · cosechas 180 · granjeros 199 · llaman 211 · ejército 222 · Llegan 244 · comandante 258 · dos 279 ·
// ametralladoras 284 · diez mil balas 304-316 · Qué podía salir mal 332-354 · Pues todo 367-375 · joder 387 · emús 410 ·
// separan 419 · corren 431 · cincuenta 441 · por hora 454-458 · ametralladora 477 · atasca 497 · suben 523 · camión 535 ·
// no los alcanza 562-570 · Un mes después 591-601 · ejército 620 · retira 637 · Hostia 655 · derrotados 671 · pájaros 689 ·
// comandante 716 · dijo 730 · soldados 749 · aguanten balas 763-773 · bichos 794 · conquisto 808 · mundo 823
export const W = { pajaros: 46, si: 65, emus: 87, veinte: 145, arrasan: 166, granjeros: 199, llegan: 244, comandante: 258, dos: 279,
  diez: 304, que: 332, mal: 354, pues: 367, joder: 387, separan: 419, corren: 431, cincuenta: 441, atasca: 497, suben: 523,
  alcanza: 570, mes: 597, retira: 637, hostia: 655, derrotados: 671, dijo: 730, aguanten: 763, bichos: 794, conquisto: 808, mundo: 823 };
export const S = { hook: 1, farm: 2, army: 3, scatter: 4, jam: 5, truck: 6, retreat: 7, quote: 8 };
export const CAMP = 100, ROAD = 200;
export const TRUCK_V = 6, EMU_V = 12, TRUCK_A = 512;
export const truckX = (f: number) => ROAD + TRUCK_V * Math.max(0, f - TRUCK_A) / FPS;

type Key = { f: number; pos: V3; look: V3; fov: number; glide?: boolean };
export type ShotDef = { id: number; a: number; b: number; keys: Key[]; sunAz?: number };
const truckKeys = (): Key[] => {
  const k: Key[] = [];
  for (let f = 511; f <= 592; f += 9) { const x = truckX(f); k.push({ f, pos: [x + 2.0, 1.9, 15], look: [x + 2.4, 1.3, 0], fov: 46 }); }
  return k;
};
export const SHOTS: ShotDef[] = [
  { id: 1, a: 0, b: 100, sunAz: 120, keys: [
    { f: 0, pos: [0.1, 1.3, 6.4], look: [0.1, 1.25, 0], fov: 44 },
    { f: 100, pos: [0.2, 1.4, 4.6], look: [0.1, 1.3, 0], fov: 42, glide: true },
  ] },
  { id: 2, a: 96, b: 240, sunAz: 120, keys: [
    { f: 96, pos: [3, 4.5, 17], look: [0, 0.6, 0], fov: 46 },
    { f: 240, pos: [2.2, 2.0, 10.5], look: [1.2, 1.0, 3], fov: 44, glide: true },
  ] },
  { id: 3, a: 236, b: 365, sunAz: 130, keys: [
    { f: 236, pos: [CAMP + 0.4, 1.8, 7.5], look: [CAMP, 1.4, 0], fov: 46 },
    { f: 330, pos: [CAMP + 0.2, 1.7, 5.0], look: [CAMP, 1.5, 0], fov: 42, glide: true },
    { f: 365, pos: [CAMP + 0.1, 1.7, 3.8], look: [CAMP, 1.6, 0], fov: 40, glide: true },
  ] },
  { id: 4, a: 361, b: 470, sunAz: 120, keys: [
    { f: 361, pos: [0, 2.0, 15], look: [0, 0.9, 0], fov: 44 },
    { f: 420, pos: [0, 3.0, 19], look: [0, 0.6, 0], fov: 50, glide: true },
    { f: 470, pos: [-1, 4.0, 22], look: [0, 0.5, 0], fov: 54, glide: true },
  ] },
  { id: 5, a: 466, b: 515, sunAz: 130, keys: [
    { f: 466, pos: [1.5, 1.5, 17.6], look: [1.2, 1.1, 14], fov: 42 },
    { f: 515, pos: [1.4, 1.5, 16.6], look: [1.2, 1.15, 14], fov: 38, glide: true },
  ] },
  { id: 6, a: 511, b: 592, sunAz: 110, keys: truckKeys() },
  { id: 7, a: 588, b: 705, sunAz: 120, keys: [
    { f: 588, pos: [0, 1.6, 21], look: [0, 1.2, 12], fov: 44 },
    { f: 705, pos: [0, 2.2, 23], look: [0, 1.1, 11], fov: 48, glide: true },
  ] },
  { id: 8, a: 701, b: TOTAL, sunAz: 130, keys: [
    { f: 701, pos: [CAMP + 0.2, 1.65, 4.2], look: [CAMP, 1.6, 0], fov: 42 },
    { f: 800, pos: [CAMP + 0.1, 1.65, 3.6], look: [CAMP, 1.6, 0], fov: 40, glide: true },
    { f: TOTAL, pos: [CAMP + 0.4, 2.6, 9.5], look: [CAMP, 1.3, 0], fov: 48, glide: true },
  ] },
];
export const XFADE = 6;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const SHAKES = [{ f: W.joder, k: 0.05 }, { f: W.atasca, k: 0.05 }, { f: W.hostia, k: 0.06 }];
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
  if (id === S.hook) return { cInf: 10 };
  if (id === S.farm || id === S.scatter) return { cInf: 0 };
  void f; return { cInf: 12 };
};
export const MARKS: { a: number; b: number; label: string; sub?: string; col: string; big?: boolean }[] = [
  { a: 0, b: 98, label: "AUSTRALIA", sub: "vs EMÚS", col: "#ffd23f", big: true },
  { a: 140, b: 232, label: "20.000", sub: "emús", col: "#ffffff" },
  { a: 300, b: 362, label: "10.000", sub: "balas", col: "#ffd23f" },
  { a: 438, b: 470, label: "50 km/h", col: "#ffffff" },
];
