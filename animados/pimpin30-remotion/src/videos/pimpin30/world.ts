// Pimpín 30 · "Equilibrista": a rope across the plaza at y RY (z RZ) with washing / little flags, plates, a fountain edge, a fence nap, the baker's cat.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, zDraw } from "./props";
import { catDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, HOGAZA } from "./villa";
import { S, W, RY, RZ, smooth } from "./story";

export const PIMS = 1.1;
const ropeDraw = (flags: boolean) => (p: Pen) => { p.line([[0, 40], [1024, 40]], "#5a4a3a", 8, false); for (let k = 0; k < 10; k++) { const x = 40 + k * 100; if (flags) p.poly([[x, 40], [x + 60, 40], [x + 30, 110]], ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a"][k % 4], 4); else if (k % 3 === 0) p.poly([[x, 40], [x + 70, 40], [x + 70, 120], [x, 120]], ["#f4f1ea", "#9ad4ff", "#f49ac0"][k % 3], 4); } };
const plateDraw = (n: number) => (p: Pen) => { for (let k = 0; k < n; k++) p.ell(64 + Math.sin(k * 1.3) * 4, 500 - k * 46, 56, 14, "#f4f1ea", 5); };
const bikeDraw = (p: Pen) => { p.ell(110, 190, 80, 80, null, 12); p.ell(400, 190, 80, 80, null, 12); p.line([[110, 190], [220, 100], [330, 100], [400, 190]], "#3a8ac8", 12, false); p.line([[220, 100], [250, 190], [110, 190]], "#3a8ac8", 12, false); };
const fountainDraw = (p: Pen) => { p.poly([[0, 40], [1024, 40], [1024, 200], [0, 200]], "#a8a49a", 8); p.poly([[0, 0], [1024, 0], [1024, 40], [0, 40]], "#c8c4ba", 6); };
const waterDraw = (p: Pen) => p.poly([[0, 0], [512, 0], [512, 128], [0, 128]], "#6aa8d8", 0);
const fenceDraw = (p: Pen) => { for (let k = 0; k < 6; k++) p.band([[30 + k * 90, 30], [30 + k * 90, 250]], "#8a5a2a", 22, 5); p.band([[10, 70], [500, 70]], "#8a5a2a", 18, 5); p.band([[10, 190], [500, 190]], "#8a5a2a", 18, 5); };
const ladderDraw = (p: Pen) => { p.band([[30, 10], [30, 500]], "#a8703a", 14, 4); p.band([[226, 10], [226, 500]], "#a8703a", 14, 4); for (let y = 50; y < 500; y += 70) p.band([[30, y], [226, y]], "#a8703a", 10, 3); };
const netDraw = (p: Pen) => { for (let k = 0; k <= 8; k++) { p.line([[20 + k * 27, 20], [20 + k * 27, 236]], "#3a3a42", 4, false); p.line([[20, 20 + k * 27], [236, 20 + k * 27]], "#3a3a42", 4, false); } };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const flags = id === S.cat || id === S.tries || id === S.walk || id === S.rescue;
    if (id === S.hook || id === S.end || flags) fx(`rope|${flags ? 1 : 0}`, 1024, 128, ropeDraw(flags), 0, RY + 0.05 - 0.35, RZ - 0.05, 10, 1.25);
    const sway = Math.sin(t * 3) * 0.04;
    const cat = (x: number, y: number) => card("cat", x, RZ + 0.05, 0.36, catDraw(0, "sit", false, "#e8a24a"), 1, 0, y);
    const bombero = { ...VEC(0), jacket: "#c8202a", hat: "cap", cap: "#c8202a" } as any;
    const cartero = { ...VEC(3), jacket: "#3a5ab8", hat: "cap", cap: "#3a5ab8" } as any;
    const cura = { ...VEC(1), jacket: "#1a1a1e", pants: "#1a1a1e", hat: "hair", hair: "#8a8a8a" } as any;
    if (id === S.hook || id === S.end) {
      const s = smooth((f - (id === S.hook ? 0 : 965)) / 95);
      person("pim", PIMPIN, -2.0 + s * 3.4, RY, RZ + 0.1, { mode: "stroll", phase: t * 3, expr: "grin", facing: 1, wave: 0.9 }, 1, false, PIMS);
      for (let j = 0; j < 3; j++) person(`v${j}`, VEC(j), -1.2 + j * 1.2, 0, 1.4, { mode: "stand", expr: "shock", facing: 0 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: j % 2 ? "fall" : "stand", expr: j % 2 ? "dazed" : "nervous", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.plates) {
      const n = Math.min(10, Math.max(1, Math.floor((f - 160) / 6)));
      person("pim", PIMPIN, 0, 0, 1.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      fx(`pl|${n}`, 128, 512, plateDraw(n), sway * 2, 2.5, 1.42, 0.4, 1.6);
    }
    if (id === S.bike) {
      fx("fnt", 1024, 200, fountainDraw, 0, 0.3, 1.0, 5, 0.6); fx("wat", 512, 128, waterDraw, 0, 0.5, 0.4, 5, 0.6);
      const x = -1.2 + (f - 250) * 0.04;
      fx("bike", 512, 280, bikeDraw, x, 0.95, 1.1, 1.2, 0.66);
      person("pim", PIMPIN, x, 0.75, 1.15, { mode: "sit", expr: "laugh", facing: 1, wave: 0.9 }, 1, false, PIMS);
    }
    if (id === S.nap) {
      fx("fence", 512, 260, fenceDraw, 0, 0.6, 1.2, 2.4, 1.2);
      person("pim", PIMPIN, 0, 0.95, 1.3, { mode: "sit", expr: "neutral", facing: 0 }, 1, false, PIMS);
      fx(`z|${Math.floor(t * 2) % 2}`, 256, 256, zDraw, 0.5, 2.3 + (t % 1) * 0.2, 1.3, 0.4, 0.4);
    }
    if (id === S.cat) {
      cat(0.3 + sway, RY + 0.05);
      person("pan", HOGAZA, -0.4, 0, 0.8, { mode: "stand", expr: f > 460 ? "shock" : "nervous", facing: 1, wave: 0.95 }, 3, true, 1.0);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j + 2), 0.8 + j * 0.8, 0, 1.4, { mode: "stand", expr: "nervous", facing: -1 }, 10 + j, true, 1.0);
    }
    if (id === S.tries) {
      cat(0.3 + sway, RY + 0.05);
      if (f < 555) { const tilt = f > W.resbala - 6 ? smooth((f - W.resbala + 6) / 14) : 0; fx(`lad|${Math.round(tilt * 6)}`, 256, 512, ladderDraw, 0.0 + tilt * 1.2, 1.8 - tilt * 1.0, RZ + 0.3, 0.9, 3.4 - tilt * 1.6); person("bom", bombero, -0.6 + tilt * 0.8, 0, 0.6, { mode: tilt > 0.5 ? "fall" : "stand", expr: tilt > 0 ? "shock" : "grin", facing: 1 }, 4, true, 1.0); }
      else if (f < 615) { person("ca", cartero, -1.2, 0, 1.0, { mode: "stand", expr: f > W.atrapa ? "shock" : "grin", facing: 1, wave: 0.95 }, 5, true, 1.0); person("cu", cura, 1.0, 0, 0.6, { mode: "stand", expr: f > W.atrapa ? "dazed" : "neutral", facing: -1 }, 6, true, 1.0); const s = smooth((f - W.red) / 12); if (s > 0) fx("net", 256, 256, netDraw, -0.8 + s * 1.8, 1.6 + Math.sin(Math.PI * s) * 0.8 - s * 0.4, 0.7, 1.0, 1.0); }
      else { const up = smooth((f - W.panadera) / 40); person("pan", HOGAZA, 0.9, up * (RY - 1.9), RZ + 0.1, { mode: "stand", expr: f > W.colgando ? "shock" : "stern", facing: 0, wave: 0.95 }, 3, up < 0.05, 1.0); }
    }
    if (id === S.walk) {
      const x = -2.2 + smooth((f - 730) / 80) * 1.6;
      person("pim", PIMPIN, x, f < 730 ? smooth((f - 700) / 30) * RY : RY, RZ + 0.1, { mode: f > 735 ? "stroll" : "stand", phase: t * 2, expr: f > W.manos ? "grin" : "stern", facing: 1, wave: f > W.manos - 4 ? 0.95 : undefined }, 1, false, PIMS);
      cat(0.3 + sway, RY + 0.05);
      person("pan", HOGAZA, 0.9, RY - 1.9, RZ + 0.1, { mode: "stand", expr: "shock", facing: 0, wave: 0.95 }, 3, false, 1.0);
    }
    if (id === S.rescue) {
      const back = smooth((f - 855) / 60), x = 0.4 - back * 2.6, land = f > W.llegar - 10;
      const y = land ? 0 : RY;
      person("pim", PIMPIN, x, y, RZ + 0.1, { mode: f > W.reverencia - 2 && f < W.reverencia + 16 ? "sit" : back > 0 && back < 1 ? "stroll" : "stand", phase: t * 2, expr: "laugh", facing: back > 0 ? -1 : 1, wave: 0.9 }, 1, land, PIMS);
      if (f > W.coge - 2) cat(x + 0.25, y + 0.9); else cat(0.3, RY + 0.05);
      if (f > W.panadera2 - 2) person("pan", HOGAZA, x - 0.55, y, RZ + 0.2, { mode: "stand", expr: land ? "relief_open" : "nervous", facing: -1 }, 3, land, 1.0);
      else person("pan", HOGAZA, 0.9, RY - 1.9, RZ + 0.1, { mode: "stand", expr: "shock", facing: 0, wave: 0.95 }, 3, false, 1.0);
      if (land) for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j), -3.2 + j * 0.7, 0, 0.8, { mode: "stand", expr: "laugh", facing: 1, wave: 0.9 }, 10 + j, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
