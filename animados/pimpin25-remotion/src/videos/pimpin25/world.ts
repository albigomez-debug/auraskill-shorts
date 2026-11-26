// Pimpín 25 · "Saltarín": bell tower card (0, z -7.7), apple branch, lamp post, skipping rope, a festival hot-air balloon with a hanging rope.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, appleDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA, HOGAZA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const towerDraw = (p: Pen) => { p.poly([[40, 1000], [40, 160], [216, 160], [216, 1000]], "#d8c8a8", 8); p.poly([[20, 170], [128, 20], [236, 170]], "#a8402a", 8); p.poly([[80, 240], [176, 240], [176, 380], [80, 380]], "#3a2a22", 6); p.ell(128, 330, 34, 40, "#e8b84a", 5); for (let y = 460; y < 960; y += 120) p.poly([[100, y], [156, y], [156, y + 60], [100, y + 60]], "#7ab0e8", 5); };
const branchDraw = (p: Pen) => { p.band([[0, 60], [256, 90]], "#6a4a2a", 18, 5); p.ell(80, 50, 70, 40, "#5a9a3a", 6); p.ell(190, 64, 70, 40, "#5a9a3a", 6); };
const lampDraw = (on: boolean) => (p: Pen) => { p.band([[64, 120], [64, 1000]], "#2a2a32", 16, 4); p.poly([[30, 40], [98, 40], [88, 120], [40, 120]], on ? "#fff27a" : "#8a8a90", 6); };
const balloonDraw = (p: Pen) => { const c = ["#e2453c", "#f2c84a", "#3a8ac8", "#f2c84a", "#e2453c"]; p.ell(256, 220, 210, 220, "#e2453c", 8); for (let k = 0; k < 5; k++) p.ell(256, 220, 210 - k * 42, 220, c[k], 4); p.line([[110, 400], [200, 520]], "#3a2a1a", 5, false); p.line([[402, 400], [312, 520]], "#3a2a1a", 5, false); p.poly([[190, 520], [322, 520], [310, 620], [202, 620]], "#a8703a", 7); };
const ropeDraw = (p: Pen) => p.line([[16, 0], [16, 1000]], "#6a4a2a", 10, false);
const ladderDraw = (p: Pen) => { p.band([[30, 10], [30, 500]], "#a8703a", 14, 4); p.band([[226, 10], [226, 500]], "#a8703a", 14, 4); for (let y = 50; y < 500; y += 70) p.band([[30, y], [226, y]], "#a8703a", 10, 3); };
const hatDraw = (p: Pen) => { p.ell(128, 150, 110, 30, "#7a2a8a", 6); p.poly([[70, 150], [80, 60], [176, 60], [186, 150]], "#7a2a8a", 6); p.band([[78, 130], [178, 130]], "#e8c45a", 12, 0); };
const jumpY = (f: number, f0: number, dur: number, h: number) => { const s = (f - f0) / dur; return s > 0 && s < 1 ? 4 * h * s * (1 - s) : 0; };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    fx("tower", 256, 1000, towerDraw, 0, 5.0, -7.7, 3.2, 10.2);
    const balY = (): number => id === S.balloon ? 1.2 + smooth((f - W.suelta) / 80) * 4.0 : id === S.tries ? 5.2 + (f > W.agarra ? smooth((f - W.agarra) / 60) * 1.5 : 0) : id === S.rescue ? 6.7 - smooth((f - W.baja2 + 20) / 50) * 5.0 : 0;
    const balloon = (x: number, z: number) => { const y = balY(); fx("bal", 512, 640, balloonDraw, x, y + 1.8, z, 3.0, 3.75); fx("rope", 32, 1000, ropeDraw, x + 0.0, y - 2.0, z + 0.05, 0.05, 4.0); return y; };
    if (id === S.hook || id === S.end) {
      const L = id === S.hook ? W.encima : 1000;
      const s = smooth((f - (L - 40)) / 70), y = Math.sin(Math.PI * Math.min(1, Math.max(0, (f - (L - 40)) / 70))) * 10.4;
      person("pim", PIMPIN, -3 + s * 6, y, -6.6, { mode: "stand", expr: y > 0.5 ? "laugh" : "grin", facing: 1, wave: y > 0.5 ? 0.95 : undefined }, 1, y < 0.05, PIMS);
      for (let j = 0; j < 3; j++) person(`v${j}`, VEC(j), -1.4 + j * 1.4, 0, 2.0, { mode: "stand", expr: y > 3 ? "shock" : "neutral", facing: 0 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), Math.abs(Math.sin(t * 5 + j)) * 0.08, 1.2, { mode: "stand", expr: "nervous", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, Math.abs(Math.sin(t * 3)) * 1.0, 2.4, { mode: "stand", expr: "laugh", facing: 0 }, 1, false, PIMS);
    }
    if (id === S.apple) {
      fx("br", 256, 128, branchDraw, 0.2, 3.6, 1.0, 1.8, 0.9);
      const y = jumpY(f, W.manzanas - 16, 34, 1.9), got = f > W.manzanas;
      if (!got) fx("ap", 128, 128, appleDraw(), 0.3, 3.2, 1.1, 0.25, 0.25);
      person("pim", PIMPIN, 0.1, y, 1.4, { mode: "stand", expr: y > 0.2 ? "laugh" : "grin", facing: 0, wave: y > 0.2 || got ? 0.95 : undefined }, 1, y < 0.05, PIMS);
      if (got) fx("ap2", 128, 128, appleDraw(), 0.45, 1.8 + y, 1.5, 0.22, 0.22);
    }
    if (id === S.lamp) {
      fx(`lp|${f > W.bombillas + 14 ? 1 : 0}`, 128, 1000, lampDraw(f > W.bombillas + 14), 0.8, 2.2, 1.0, 0.45, 3.5);
      const y = jumpY(f, W.bombillas - 10, 40, 2.4);
      person("pim", PIMPIN, 0.2, y, 1.4, { mode: "stand", expr: y > 0.2 ? "laugh" : "grin", facing: 1, wave: y > 0.2 ? 0.95 : undefined }, 1, y < 0.05, PIMS);
    }
    if (id === S.rope) {
      for (let j = 0; j < 2; j++) person(`k${j}`, KIDV(j), -1.4 + j * 2.8, 0, 1.2, { mode: "stand", expr: f > W.baja ? "shock" : "grin", facing: j ? -1 : 1, wave: 0.9 }, 10 + j, true, 1.0);
      const ph = t * 8; fx(`cr|${Math.round(ph * 2) % 8}`, 512, 256, (p: Pen) => { const yy = 128 + Math.cos((Math.round(ph * 2) % 8) * 0.785) * 100; p.line([[10, 128], [256, yy], [502, 128]], "#e2453c", 8, false); }, 0, 1.0, 1.25, 2.8, 1.0);
      const up = f < 318 ? jumpY(f, 305, 26, 0.8) : f < W.baja ? 9 : Math.max(0, 9 - (f - W.baja) * 0.6);
      person("pim", PIMPIN, 0, up, 1.4, { mode: "stand", expr: f > W.baja ? "dazed" : "laugh", facing: 0 }, 1, up < 0.05, PIMS);
    }
    if (id === S.balloon) {
      balloon(0.3, -0.6);
      for (let j = 0; j < 4; j++) person(`c${j}`, VEC(j), -2.0 + j * 1.2 + (j > 1 ? 0.6 : 0), 0, 1.4, { mode: "stand", expr: f > W.suelta ? "shock" : "grin", facing: 0, wave: f > W.suelta ? 0.95 : undefined }, 10 + j, true, 1.0);
    }
    if (id === S.tries) {
      const y = balloon(0.3, -0.6);
      if (f < 560) person("pan", HOGAZA, 0.2, jumpY(f, W.salta - 6, 22, 0.25), 0.4, { mode: "stand", expr: f > 551 ? "dazed" : "stern", facing: 0, wave: 0.95 }, 3, true, 1.0);
      else if (f < 630) { fx("lad", 256, 512, ladderDraw, 0.5, 1.5, -0.3, 0.9, 3.0); person("bom", VEC(4), 0.0, 0, 0.6, { mode: "stand", expr: f > 606 ? "dazed" : "grin", facing: 1 }, 4, true, 1.0); }
      else { const hang = f > W.agarra; person("alc", ALCALDESA, 0.3, hang ? y - 2.6 : 0, hang ? -0.55 : 0.6, { mode: "stand", expr: hang ? "shock" : "stern", facing: 0, wave: 0.95 }, 2, !hang, 1.0); if (!hang || f < 700) fx("hat", 256, 256, hatDraw, 0.3, (hang ? y - 2.6 : 0) + 1.75, hang ? -0.5 : 0.65, 0.42, 0.42); }
    }
    if (id === S.jump) {
      const crouch = f > W.agacha - 4 && f < W.salta2 - 2, up = f > W.salta2 - 2 ? (f - W.salta2 + 2) * 0.35 : 0;
      person("pim", PIMPIN, 0, up, 1.2, { mode: crouch ? "sit" : "stand", expr: crouch ? "stern" : up > 0 ? "laugh" : "nervous", facing: 0, wave: up > 0 ? 0.95 : undefined }, 1, up === 0, PIMS);
    }
    if (id === S.rescue) {
      const y = balloon(0.3, -0.6), down = f > W.suelo;
      person("pim", PIMPIN, 0.3, down ? 0 : y - 2.0, -0.5, { mode: "stand", expr: "laugh", facing: 0, wave: 0.95 }, 1, down, PIMS);
      person("alc", ALCALDESA, 1.0, down ? 0 : y - 2.6, down ? 0.4 : -0.55, { mode: "stand", expr: down ? "relief_open" : "shock", facing: -1, wave: down ? undefined : 0.95 }, 2, down, 1.0);
      if (f > W.sombrero - 40) { const s = smooth((f - W.sombrero + 40) / 40); fx("hat", 256, 256, hatDraw, 1.0, 4.0 - s * 2.25, 0.45, 0.42, 0.42); }
      for (let j = 0; j < 2; j++) person(`c${j}`, VEC(j), -1.6 + j * 0.9, 0, 1.4, { mode: "stand", expr: down ? "laugh" : "shock", facing: 1 }, 10 + j, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
