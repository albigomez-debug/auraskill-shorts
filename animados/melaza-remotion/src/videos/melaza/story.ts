// Timeline of "La ola de miel de caña" (Boston, 1919), 30.2 s, timed to public/voz/voz.wav (palabras.json).
// Camera grammar from the skill: the camera never stops (slow creep on holds), smootherstep glides of 18-46 frames,
// a change of place is a 6-frame crossfade. Reactions land 0-3 frames before their word.
export const FPS = 30;
export const TOTAL = 908;
export type V3 = [number, number, number];

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const u = clamp01(x); return u * u * (3 - 2 * u); };
const smoother = (x: number) => { const u = clamp01(x); return u * u * u * (u * (6 * u - 15) + 10); };

// words (frames): Una 1 · ola 8 · miel 16 · caña 23 · mató 31 · veintiuna 39 · personas 49 · Boston 64 ·
// Enero 80 · 1919 ~95 · tanque 128 · más alto 135 · edificio 154 · cinco 167 · pisos 175 · siete 202 · millones 210 ·
// litros 221 · Llevaba 238 · meses 249 · goteando 258 · crujiendo 271 · Al 289 · mediodía 295 · revienta 310 ·
// Una 328 · ola 336 · marrón 341 · doce 359 · metros 366 · sale 375 · sesenta 390 · kilómetros 400 · hora 418 ·
// Dobla 429 · vías 443 · tren 453 · aplasta 462 · casas 472 · arrastra 483 · caballos 493 · Por suerte 511 ·
// ayuda 532 · llegó 539 · enseguida 546 · Por desgracia 564 · frío 595 · miel 610 · espesaba 628 · cemento 644 ·
// Fíjate 662 · nadar 697 · caramelo 706 · frío 716 · empresa 735 · Dijo 751 · sabotaje 773 · juez 799 ·
// tanque 818 · chapuza 835 · Boston 858 · olió 868 · dulce 875 · durante 883 · años 892 (voice ends ~905)

// ---- the world: Commercial Street runs along +z; the tank stands across its north end ----
export const TANK = { x: 0, z: -44, r: 12.5, h: 15 };
export const TANK_FRONT = TANK.z + TANK.r; // -31.5
export const BURST = 310;
/** wave front speed in world metres per second (cartoon: slower than the real 16 m/s so it reads) */
const WV = 8.6;
/** flood state per shot/frame: front z, crest height, goo level behind it */
export const floodAt = (id: number, f: number): { on: boolean; front: number; h: number; level: number } => {
  if (id === 1) { const t = 2.4 + f / FPS; return { on: true, front: TANK_FRONT + WV * t * 0.9, h: 7.5, level: 1.6 }; }
  if (id === 3 || id === 4) {
    if (f < BURST) return { on: false, front: TANK_FRONT, h: 0, level: 0 };
    const t = (f - BURST) / FPS;
    return { on: true, front: TANK_FRONT + 0.6 + WV * t, h: 9.5 * smooth(t / 0.45) * (1 - 0.035 * t), level: 1.8 * smooth(t / 0.6) };
  }
  if (id === 5 || id === 6) return { on: true, front: 400, h: 0, level: 0.75 };
  return { on: false, front: 0, h: 0, level: 0 };
};

type Key = { f: number; pos: V3; look: V3; fov: number; glide?: boolean };
export type ShotDef = { id: number; a: number; b: number; keys: Key[]; place: "street" | "court" };
export const SHOTS: ShotDef[] = [
  // hook: the brown wave rolls down the street at us, people running
  { id: 1, a: 0, b: 84, place: "street", keys: [
    { f: 0, pos: [1.2, 1.7, 8], look: [0, 3.2, -14], fov: 50 },
    { f: 40, pos: [0.4, 2.0, 15], look: [0, 3.6, -6], fov: 50, glide: true },
    { f: 84, pos: [-0.6, 2.4, 22], look: [0, 4.0, 0], fov: 52, glide: true },
  ] },
  // calm before: Boston, January 1919, the tank taller than a five-storey building
  { id: 2, a: 78, b: 236, place: "street", keys: [
    { f: 78, pos: [1.6, 1.75, 16], look: [0, 3.5, -20], fov: 46 },
    { f: 120, pos: [1.2, 2.0, 9], look: [0, 6, -30], fov: 48, glide: true },
    { f: 178, pos: [-3.5, 9, -6], look: [0, 11, -40], fov: 54, glide: true }, // up beside the 5-storey block: the tank is taller
    { f: 236, pos: [7, 21, -14], look: [0, 12, -44], fov: 52, glide: true }, // over the roofs: 7 million litres
  ] },
  // the tank base: dripping, creaking... noon: it bursts
  { id: 3, a: 232, b: 326, place: "street", keys: [
    { f: 232, pos: [-3.2, 1.4, -24.5], look: [0.5, 1.9, -31], fov: 42 },
    { f: 286, pos: [-2.4, 1.5, -26.2], look: [0.4, 2.2, -31.5], fov: 40, glide: true },
    { f: 306, pos: [-1.5, 3.2, -16], look: [0, 6, -31.5], fov: 50, glide: true },
    { f: 326, pos: [-1.2, 3.6, -13], look: [0, 5, -28], fov: 52 },
  ] },
  // the wave down the street: bends the elevated railway, flattens a house, carries a horse away
  { id: 4, a: 322, b: 510, place: "street", keys: [
    { f: 322, pos: [-5.5, 7.5, -6], look: [0, 4.5, -28], fov: 52 },
    { f: 405, pos: [-5.5, 8.5, 12], look: [1, 4, -4], fov: 54, glide: true },
    { f: 445, pos: [-4, 10, 23], look: [4, 4, 5], fov: 52, glide: true },
    { f: 474, pos: [2.0, 6.5, 33], look: [-8, 2.5, 15], fov: 50, glide: true },
    { f: 510, pos: [1.5, 3.2, 44], look: [0, 2.5, 24], fov: 48, glide: true },
  ] },
  // after the wave: help arrives... but it is cold and the goo sets like cement
  { id: 5, a: 506, b: 660, place: "street", keys: [
    { f: 506, pos: [3, 2.6, 34], look: [0, 1.4, 18], fov: 48 },
    { f: 560, pos: [-1.5, 2.2, 28], look: [0, 1.3, 16], fov: 46, glide: true },
    { f: 620, pos: [0.4, 1.6, 21.5], look: [0, 1.45, 16.5], fov: 42, glide: true },
    { f: 660, pos: [0.3, 1.55, 20.2], look: [0, 1.5, 16.5], fov: 40 },
  ] },
  // like swimming in cold caramel
  { id: 6, a: 656, b: 726, place: "street", keys: [
    { f: 656, pos: [3.6, 1.5, 13.6], look: [2, 1.0, 9.5], fov: 40 },
    { f: 726, pos: [3.0, 1.35, 12.2], look: [2, 1.0, 9.5], fov: 38, glide: true },
  ] },
  // the courtroom: the company says sabotage, the judge says shoddy tank
  { id: 7, a: 722, b: 850, place: "court", keys: [
    { f: 722, pos: [298.6, 1.75, 4.4], look: [298, 1.7, 0], fov: 40 },
    { f: 768, pos: [298.4, 1.7, 3.6], look: [298, 1.7, 0], fov: 38, glide: true },
    { f: 800, pos: [302.6, 2.5, 2.4], look: [303, 2.6, -3], fov: 42, glide: true },
    { f: 850, pos: [302.85, 2.6, 1.0], look: [303, 2.7, -3], fov: 40, glide: true },
  ] },
  // years later: the whole street still smells sweet
  { id: 8, a: 846, b: TOTAL, place: "street", keys: [
    { f: 846, pos: [1.2, 1.7, 30], look: [0, 2.2, 14], fov: 46 },
    { f: TOTAL, pos: [0.4, 4.2, 37], look: [0, 3, 10], fov: 50, glide: true },
  ] },
];
export const XFADE = 6;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
/** impact shakes: sign flips every frame, dies out over 7 frames */
const SHAKES = [{ f: BURST, k: 0.22 }, { f: 462, k: 0.12 }, { f: 835, k: 0.05 }];
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

/** one or two layers: each next shot fades in over the previous one for XFADE frames */
export const layersAt = (f: number): { id: number; alpha: number }[] => {
  for (let i = SHOTS.length - 1; i > 0; i--) {
    const a = SHOTS[i].a;
    if (f >= a + XFADE) return [{ id: i + 1, alpha: 1 }];
    if (f >= a) return [{ id: i, alpha: 1 }, { id: i + 1, alpha: (f - a + 1) / (XFADE + 1) }];
  }
  return [{ id: 1, alpha: 1 }];
};

export const worldF = (f: number) => f;

/** thin-lens depth of field: cInf = blur at infinity (px at 1080p); focus point (default = camera look) */
export const dofAt = (id: number, f: number): { cInf: number; focus?: V3 } => {
  if (id === 1) return { cInf: 3 };
  if (id === 2) return { cInf: lerp(8, 0, smooth((f - 100) / 40)) };
  if (id === 3) return f < 292 ? { cInf: 12, focus: [-1.6, 1.6, -28.4] } : { cInf: 4 };
  if (id === 4) return { cInf: 0 };
  if (id === 5) return { cInf: lerp(6, 12, smooth((f - 590) / 40)) };
  if (id === 6) return { cInf: 14, focus: [2, 1.0, 9.5] };
  if (id === 7) return f < 785 ? { cInf: 14, focus: [298, 1.9, 0] } : { cInf: 14, focus: [303, 2.6, -3] };
  return { cInf: 7 };
};

// ---- discreet figures at the top of the frame (skill rule: no boxes, nothing over the faces) ----
export const MARKS = [
  { a: 82, b: 140, label: "BOSTON", sub: "enero de 1919", col: "#ffffff" },
  { a: 204, b: 236, label: "7.000.000", sub: "litros", col: "#ffd23f" },
  { a: 356, b: 386, label: "12 m", sub: "de altura", col: "#ffd23f" },
  { a: 388, b: 426, label: "60 km/h", sub: "", col: "#ffffff" },
];
