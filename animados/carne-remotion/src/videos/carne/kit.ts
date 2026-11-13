// Camera/timeline helpers shared by every short's story.ts.
export type V3 = [number, number, number];
export const FPS = 30;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => { const u = clamp01(x); return u * u * (3 - 2 * u); };
const smoother = (x: number) => { const u = clamp01(x); return u * u * u * (u * (6 * u - 15) + 10); };
export type Key = { f: number; pos: V3; look: V3; fov: number; glide?: boolean };
export type ShotDef = { id: number; a: number; b: number; keys: Key[]; sunAz?: number };
export type Mark = { a: number; b: number; label: string; sub?: string; col: string; big?: boolean };
export const XFADE = 6;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: V3, b: V3, t: number): V3 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
export const kit = (SHOTS: ShotDef[], SHAKES: { f: number; k: number }[]) => ({
  camAt: (id: number, f: number) => {
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
  },
  layersAt: (f: number): { id: number; alpha: number }[] => {
    for (let i = SHOTS.length - 1; i > 0; i--) {
      const a = SHOTS[i].a;
      if (f >= a + XFADE) return [{ id: i + 1, alpha: 1 }];
      if (f >= a) return [{ id: i, alpha: 1 }, { id: i + 1, alpha: (f - a + 1) / (XFADE + 1) }];
    }
    return [{ id: 1, alpha: 1 }];
  },
});
