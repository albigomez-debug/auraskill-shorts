// Pimpín 35 · "Pelo largo": hair that regrows in a minute; skipping rope, scarf, worn-out scissors; the well bucket falls in; Pimpín lowers his braid.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA } from "./villa";
import { S, W, WX, WZ, smooth } from "./story";

export const PIMS = 1.1;
const HAIR = "#6a3a1a";
// braid hanging straight down, length in px of a 128x1024 canvas (top = head)
const braidDraw = (len: number) => (p: Pen) => { for (let y = 20; y < len; y += 34) p.ell(64 + ((y / 34) % 2 ? 10 : -10), y, 30, 24, HAIR, 4); if (len > 60) p.ell(64, len + 6, 18, 14, "#e2453c", 3); };
const arcDraw = (ph: number) => (p: Pen) => { const pts: [number, number][] = []; for (let i = 0; i <= 20; i++) { const u = i / 20; pts.push([20 + u * 984, 256 + Math.sin(Math.PI * u) * 230 * Math.cos(ph)]); } p.line(pts, HAIR, 22, false); };
const scarfDraw = (p: Pen) => { p.band([[0, 64], [1024, 64]], HAIR, 44, 5); for (let x = 30; x < 1000; x += 50) p.line([[x, 50], [x + 20, 78]], "#4a2a10", 4, false); };
const scissorsDraw = (bent: boolean) => (p: Pen) => { p.ell(70, 190, 40, 30, null, 10); p.ell(70, 100, 40, 30, null, 10); p.band([[100, 180], [240, bent ? 60 : 120]], "#a8a8b0", 14, 4); p.band([[100, 110], [240, bent ? 200 : 140]], "#a8a8b0", 14, 4); };
const wellDraw = (roof: boolean) => (p: Pen) => { if (roof) { p.band([[70, 30], [70, 330]], "#7a4a2a", 22, 5); p.band([[442, 30], [442, 330]], "#7a4a2a", 22, 5); p.poly([[30, 40], [256, -20], [482, 40], [482, 70], [30, 70]], "#a8402a", 7); p.band([[70, 150], [442, 150]], "#5a3a1a", 14, 4); } p.poly([[20, 320], [492, 320], [492, 500], [20, 500]], "#a8a49a", 8); for (let r = 0; r < 3; r++) for (let k = 0; k < 5; k++) p.poly([[20 + k * 94 + (r % 2) * 47, 330 + r * 58], [110 + k * 94 + (r % 2) * 47, 330 + r * 58], [110 + k * 94 + (r % 2) * 47, 382 + r * 58], [20 + k * 94 + (r % 2) * 47, 382 + r * 58]], "#bcb8ae", 3); };
const bucketDraw = (full: boolean, hat: boolean) => (p: Pen) => { p.poly([[60, 110], [196, 110], [180, 240], [76, 240]], "#8a8a92", 6); p.line([[60, 110], [128, 40], [196, 110]], "#5a5a62", 6, false); if (full) p.ell(128, 112, 66, 14, "#6ab4e8", 3); if (hat) { p.ell(128, 96, 80, 14, "#7a2a8a", 4); p.poly([[88, 96], [168, 96], [158, 40], [98, 40]], "#7a2a8a", 4); } };
const ropeBits = (p: Pen) => { for (let k = 0; k < 3; k++) p.line([[20 + k * 80, 20 + k * 30], [60 + k * 80, 120 + k * 20]], "#c8a06a", 10, false); };
const chainDraw = (p: Pen) => { for (let k = 0; k < 10; k++) p.ell(60 + k * 40, 64, 22, 14, null, 8); };
const hatDraw = (p: Pen) => { p.ell(128, 180, 110, 22, "#7a2a8a", 5); p.poly([[70, 180], [186, 180], [170, 70], [86, 70]], "#7a2a8a", 5); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const barbero = { ...VEC(4), jacket: "#f4f1ea", hat: "hair", hair: "#2a2a2a", moustache: "#2a2a2a" } as any;
    const granjero = { ...VEC(5), jacket: "#5a7a3a", hat: "straw" } as any;
    const herrero = { ...VEC(0), jacket: "#3a3a3e" } as any;
    const bald = (j: number) => ({ ...VEC(j), hat: "hair", hair: (VEC(j) as any).skin }) as any;
    // braid hanging from Pimpín's head at (x, z), length in metres
    const braid = (x: number, y: number, z: number, L: number) => { if (L <= 0.02) return; const px = Math.max(40, Math.min(1000, L / 3.0 * 1024)); fx(`br|${Math.round(px / 20)}`, 128, 1024, braidDraw(px), x, y - 1.5, z, 0.375, 3.0); };
    const well = (roof = true) => fx(`well|${roof ? 1 : 0}`, 512, 512, wellDraw(roof), WX, 0.9, WZ + 0.3, 1.8, 1.8);
    if (id === S.hook || id === S.end) {
      const c0 = id === S.hook ? W.cortado : 990;
      person("pim", PIMPIN, -0.3, 0, 1.2, { mode: "stand", expr: f > c0 + 40 ? "laugh" : "grin", facing: 0 }, 1, true, PIMS);
      const L = f < c0 ? 1.3 : f < c0 + 26 ? 0.1 : 0.1 + smooth((f - c0 - 26) / 26) * 1.3;
      braid(-0.5, 1.55, 1.1, L);
      person("bar", barbero, 0.9, 0, 0.9, { mode: "stand", expr: f > c0 + 30 ? "shock" : "grin", facing: -1 }, 3, true, 1.0);
      fx(`sc|${Math.floor(t * 8) % 2}`, 256, 256, scissorsDraw(false), 0.4, 1.7 + (f < c0 + 4 ? Math.sin(t * 30) * 0.05 : 0), 1.0, 0.4, 0.4);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}b`, bald(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "neutral", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      braid(0.22, 1.55, 2.3, 1.3);
    }
    if (id === S.rope) {
      person("pim", PIMPIN, -1.3, 0, 1.0, { mode: "stand", expr: "laugh", facing: 1 }, 1, true, PIMS);
      const ph = t * 7;
      if (f < W.trenza - 4) braid(-1.48, 1.55, 0.95, 1.3);
      else { fx(`arc|${Math.floor(ph * 4) % 25}`, 1024, 512, arcDraw(Math.floor(ph * 4) * 0.25), 0, 1.2, 1.0, 2.6, 2.4); person("k1", KIDV(1), 1.3, 0, 1.0, { mode: "stand", expr: "grin", facing: -1, wave: 0.9 }, 10, true, 1.0); person("k0", KIDV(3), 0.0, Math.max(0, Math.sin(ph)) * 0.35, 1.0, { mode: "stand", expr: "laugh", facing: 0, wave: 0.9 }, 11, false, 1.0); if (f > W.comba + 10) person("k2", KIDV(4), 0.6, Math.max(0, Math.sin(ph + 0.6)) * 0.35, 1.0, { mode: "stand", expr: "laugh", facing: 0 }, 12, false, 1.0); }
    }
    if (id === S.scarf) {
      for (let j = 0; j < 4; j++) person(`v${j}`, j === 1 ? PIMPIN : VEC(j + 1), -1.5 + j * 1.0, 0, 1.0, { mode: "stand", expr: j === 1 ? "grin" : "smile", facing: 0 }, j === 1 ? 1 : 10 + j, true, j === 1 ? PIMS : 1.0);
      fx("scarf", 1024, 128, scarfDraw, 0, 1.25, 1.15, 4.4, 0.4);
    }
    if (id === S.barber) {
      person("bar", barbero, 0.4, 0, 1.2, { mode: "stand", expr: f > W.tijeras ? "pained" : "nervous", facing: -1 }, 3, true, 1.0);
      for (let k = 0; k < Math.min(5, 1 + Math.floor((f - 328) / 10)); k++) fx(`ss${k}`, 256, 256, scissorsDraw(true), -0.6 + (k % 3) * 0.3, 0.15 + Math.floor(k / 3) * 0.2, 1.6, 0.4, 0.4);
      person("pim", PIMPIN, -0.9, 0, 0.8, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      braid(-1.08, 1.55, 0.75, 1.3);
      if (f > W.tijeras - 4) fx("ot", 512, 256, bubbleDraw("¡OTRA VEZ!"), 0.6, 2.5, 1.2, 1.3, 0.65);
    }
    const bucket = (y: number, full = false, hat = false) => fx(`bk|${full ? 1 : 0}${hat ? 1 : 0}`, 256, 256, bucketDraw(full, hat), WX, y, WZ, 0.5, 0.5);
    if (id === S.well) {
      const s = smooth((f - W.rompe) / 30);
      if (f < W.rompe + 30) bucket(1.6 - s * 1.6);
      if (f < W.rompe) fx("rope", 128, 512, (p: Pen) => p.band([[64, 0], [64, 512]], "#c8a06a", 10, 0), WX, 2.0, WZ, 0.12, 0.5);
      well();
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j), WX - 1.2 + j * 2.4, 0, WZ + 1.0, { mode: "stand", expr: f > W.rompe ? "shock" : "smile", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
      if (f > W.fondo - 4) fx("af", 512, 256, bubbleDraw("¡AL FONDO!"), WX, 2.6, WZ + 0.6, 1.3, 0.65);
    }
    if (id === S.tries) {
      well();
      if (f < 560) { person("gr", granjero, WX - 0.9, 0, WZ + 1.0, { mode: "stand", expr: f > W.sueltan ? "nervous" : "grin", facing: 1, wave: 0.95 }, 4, true, 1.0); if (f > W.cuerdas - 4) { const d = f > W.sueltan - 4 ? smooth((f - W.sueltan + 4) / 14) : 0; fx("rb", 256, 256, ropeBits, WX + 0.1, 1.6 - d * 0.8, WZ + 0.35, 0.7, 0.7); } }
      else if (f < 630) { person("he", herrero, WX - 0.9, 0, WZ + 1.0, { mode: "stand", expr: f > W.entera ? "shock" : "grin", facing: 1, wave: f < W.entera ? 0.95 : undefined }, 5, true, 1.0); const d = smooth((f - W.entera + 10) / 14); if (d < 1) fx("ch", 512, 128, chainDraw, WX + 0.1, 1.6 - d * 1.0, WZ + 0.1 - d * 0.1, 1.0, 0.25); }
      else { const lean = smooth((f - W.asoma + 10) / 16); person("al", ALCALDESA, WX - 0.8 + lean * 0.3, 0, WZ + 0.9, { mode: "stand", expr: f > W.sombrero ? "shock" : "nervous", facing: 1 }, 3, true, 1.0); const d = smooth((f - W.sombrero + 6) / 16); if (d < 1 && f > W.sombrero - 10) fx("hat", 256, 256, hatDraw, WX - 0.3 + d * 0.5, 2.1 - d * 1.2, WZ + 0.2, 0.45, 0.45); }
    }
    if (id === S.fix) {
      const down = smooth((f - W.caer + 10) / 60), up = smooth((f - W.sube) / 50);
      const L = f < W.suelta ? 0.0 : f < W.caer - 10 ? 1.3 : 1.3 + down * 1.2 - up * 1.3;
      person("pim", PIMPIN, WX, 0.68, WZ + 0.12, { mode: "stand", expr: f > W.sube + 40 ? "laugh" : "stern", facing: 0, wave: f > W.sube + 40 ? 0.9 : undefined }, 1, false, PIMS);
      braid(WX, 2.23, WZ + 0.08, f < W.suelta ? 0.6 : L);
      if (f > W.engancha - 10) bucket(2.23 - L + 0.05, f > W.sube, f > W.sube);
      well(false);
      if (f > W.sube + 30) { person("al", ALCALDESA, WX + 1.2, 0, WZ + 1.0, { mode: "stand", expr: f > W.sombrero2 ? "relief_open" : "shock", facing: -1, wave: f > W.sombrero2 ? 0.95 : undefined }, 3, true, 1.0); person("v0", VEC(2), WX - 1.3, 0, WZ + 1.0, { mode: "stand", expr: "laugh", facing: 1, wave: 0.9 }, 10, true, 1.0); }
      if (f > W.baja - 4 && f < W.engancha) fx(`bj|${f > 830 ? 2 : f > 818 ? 1 : 0}`, 512, 256, bubbleDraw(["BAJA...", "BAJA...", "¡BAJA!"][f > 830 ? 2 : f > 818 ? 1 : 0]), WX - 0.9, 2.7, WZ + 0.6, 1.2, 0.6);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
