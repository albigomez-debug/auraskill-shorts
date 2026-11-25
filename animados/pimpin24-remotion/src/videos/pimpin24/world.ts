// Pimpín 24 · "Puntería": a bell tower card at (0, z -8.6), a basket, a bin, grandpa, a fair stall, a giant piñata at y 9.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, signDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const towerDraw = (p: Pen) => { p.poly([[40, 1000], [40, 160], [216, 160], [216, 1000]], "#d8c8a8", 8); p.poly([[20, 170], [128, 20], [236, 170]], "#a8402a", 8); p.poly([[80, 240], [176, 240], [176, 380], [80, 380]], "#3a2a22", 6); p.ell(128, 330, 34, 40, "#e8b84a", 5); for (let y = 460; y < 960; y += 120) p.poly([[100, y], [156, y], [156, y + 60], [100, y + 60]], "#7ab0e8", 5); };
const basketDraw = (p: Pen) => { p.poly([[30, 60], [226, 60], [196, 230], [60, 230]], "#c89a5a", 7); for (let x = 60; x < 220; x += 34) p.line([[x, 64], [x - 6 + (x - 128) * -0.15, 226]], "#8a6a3a", 5, false); };
const marbleDraw = (p: Pen) => { p.ell(64, 64, 50, 50, "#3a8ac8", 6); p.ell(48, 46, 14, 12, "#bfe4f4", 0); };
const binDraw = (p: Pen) => { p.poly([[50, 40], [206, 40], [186, 240], [70, 240]], "#5a7a5a", 7); p.band([[40, 40], [216, 40]], "#3a5a3a", 18, 5); };
const paperDraw = (p: Pen) => p.ell(64, 64, 44, 40, "#f4f1ea", 6);
const cherryDraw = (p: Pen) => { p.ell(64, 80, 36, 34, "#c8202a", 6); p.line([[64, 48], [80, 10]], "#4a8a3a", 6, false); };
const teddyDraw = (c: string) => (p: Pen) => { p.ell(128, 170, 70, 70, c, 6); p.ell(128, 80, 54, 50, c, 6); p.ell(84, 40, 20, 20, c, 5); p.ell(172, 40, 20, 20, c, 5); p.ell(110, 76, 6, 6, "#1a1010", 0); p.ell(146, 76, 6, 6, "#1a1010", 0); };
const pinataDraw = (p: Pen) => { p.line([[256, 0], [256, 80]], "#3a2a1a", 6, false); for (let k = 0; k < 7; k++) p.ell(256, 180 + k * 40, 180 - Math.abs(k - 3) * 30, 30, ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a", "#c85ab8", "#ff8a2a", "#e2453c"][k], 5); for (const [x, y] of [[90, 100], [420, 100], [90, 460], [420, 460]]) p.poly([[256, 300], [x, y], [x + 30, y + 20]], "#f2c84a", 5); };
const burstDraw = (p: Pen) => { for (let k = 0; k < 14; k++) { const a = (k / 14) * Math.PI * 2; p.poly([[256, 256], [256 + Math.cos(a) * 240, 256 + Math.sin(a) * 240], [256 + Math.cos(a + 0.2) * 150, 256 + Math.sin(a + 0.2) * 150]], k % 2 ? "#ffd23f" : "#ff8a2a", 0); } };
const candyDraw = (c: string) => (p: Pen) => { p.ell(64, 64, 30, 24, c, 5); p.poly([[34, 64], [6, 44], [6, 84]], c, 4); p.poly([[94, 64], [122, 44], [122, 84]], c, 4); };
const shoeDraw = (p: Pen) => { p.poly([[20, 60], [150, 60], [230, 110], [230, 140], [20, 140]], "#c8202a", 7); p.band([[20, 140], [230, 140]], "#3a1a1a", 12, 4); };
const stoneDraw = (p: Pen) => p.ell(64, 64, 40, 34, "#8a8a90", 5);
const stickDraw = (p: Pen) => p.band([[10, 10], [246, 246]], "#8a5a2a", 22, 5);
const COLS = ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a", "#c85ab8", "#ff8a2a"];
const arcP = (s: number, a: number[], b: number[], h: number) => [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s + Math.sin(Math.PI * s) * h, a[2] + (b[2] - a[2]) * s];
const PIN = [0, 9.0, -1.0];

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const rival = { ...VEC(5), jacket: "#5a5a62", hat: "tophat" } as any;
    fx("tower", 256, 1000, towerDraw, 0, 5.0, -7.7, 3.2, 10.2);
    if (id === S.hook || id === S.end) {
      const L = id === S.hook ? W.encestado : 1058;
      person("pim", PIMPIN, 0, 8.6, -7.5, { mode: "stand", expr: f > L ? "grin" : "stern", facing: 0, wave: f > L ? 0.95 : undefined }, 1, false, PIMS);
      fx("bk", 256, 256, basketDraw, 0, 0.45, 2.0, 0.7, 0.7);
      const s = smooth((f - (L - 30)) / 30); if (s > 0 && s < 1) { const q = arcP(s, [0, 9.4, -7.4], [0, 0.6, 2.0], 2); fx("m", 128, 128, marbleDraw, q[0], q[1], q[2], 0.18, 0.18); }
      for (let j = 0; j < 2; j++) person(`k${j}`, VEC(j + 1), -1.1 + j * 2.2, 0, 1.4, { mode: "stand", expr: f > L ? "shock" : "neutral", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "nervous", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.paper) {
      person("pim", PIMPIN, -2.6, 0, 1.2, { mode: "stand", expr: "grin", facing: 1, wave: f > W.papel - 4 && f < W.papel + 20 ? 0.95 : undefined }, 1, true, PIMS);
      fx("bin", 256, 256, binDraw, 2.8, 0.45, 0.5, 0.6, 0.6);
      const s = smooth((f - W.papel) / 26); if (s > 0 && s < 1) { const q = arcP(s, [-2.4, 1.6, 1.2], [2.8, 0.8, 0.5], 1.8); fx("pp", 128, 128, paperDraw, q[0], q[1], q[2], 0.16, 0.16); }
      person("v", VEC(3), 2.0, 0, 0.0, { mode: "stand", expr: f > W.papelera ? "shock" : "neutral", facing: 1 }, 10, true, 1.0);
    }
    if (id === S.cherry) {
      person("pim", PIMPIN, -0.6, 0, 1.4, { mode: "stand", expr: "grin", facing: 1, wave: f < 290 ? 0.95 : undefined }, 1, true, PIMS);
      const ab = { ...VEC(4), hat: "hair", hair: "#e8e8e8", moustache: "#e8e8e8" } as any;
      person("ab", ab, 0.9, 0, 1.2, { mode: "stand", expr: f > W.boca + 2 ? "relief" : "shock", facing: -1 }, 6, true, 1.0);
      const s = smooth((f - W.cereza) / 22); if (s > 0 && s < 1) { const q = arcP(s, [-0.4, 1.6, 1.4], [0.9, 1.45, 1.3], 1.0); fx("ch", 128, 128, cherryDraw, q[0], q[1], q[2], 0.16, 0.16); }
    }
    if (id === S.fair) {
      fx("sg", 1024, 512, signDraw(["FERIA"], "#f2e2b8", "#c8202a"), 0.2, 2.9, -0.4, 1.8, 0.9);
      const n = Math.min(10, Math.floor((f - 335) / 6));
      for (let j = 0; j < n; j++) fx(`td${j}`, 256, 256, teddyDraw(COLS[j % 6]), -1.0 + (j % 4) * 0.35, 0.25 + Math.floor(j / 4) * 0.3, 1.9, 0.38, 0.38);
      person("pim", PIMPIN, -0.4, 0, 1.4, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1, true, PIMS);
      person("st", { ...VEC(2), jacket: "#c8202a" }, 1.0, 0, 0.6, { mode: "stand", expr: f > W.peluches ? "stern" : "nervous", facing: -1, wave: f > W.peluches ? 0.95 : undefined }, 10, true, 1.0);
    }
    const shoeStuck = (id === S.tries && f > W.colgado - 6) || (id === S.boom && f < 940);
    if (id === S.pinata || id === S.tries || (id === S.boom && f < W.plof)) fx("pin", 512, 512, pinataDraw, PIN[0], PIN[1], PIN[2], 3.0, 3.0);
    if (shoeStuck) fx("sh", 256, 160, shoeDraw, 1.7, 8.7, -1.0, 0.9, 0.56);
    if (id === S.pinata || id === S.tries || id === S.boom) {
      const crowd = [VEC(0), VEC(1), VEC(3)];
      crowd.forEach((o, j) => person(`c${j}`, o, -2.2 + j * 1.0, 0, 0.6 + (j % 2) * 0.5, { mode: "stand", expr: id === S.boom ? "laugh" : "nervous", facing: 0, wave: id === S.boom ? 0.9 : undefined }, 10 + j, true, 1.0));
      if (!(id === S.boom && f > 960)) person("alc", ALCALDESA, 0.9, 0, 0.6, { mode: "stand", expr: "nervous", facing: 0 }, 2, true, 1.0);
    }
    if (id === S.tries) {
      for (let j = 0; j < 3; j++) { const s = smooth((f - W.piedras - j * 6) / 30); if (s > 0 && s < 1) { const q = arcP(s, [-1.2 + j, 1.5, 0.6], [-0.6 + j * 0.8, 1.5, 0], 5.5); fx(`st${j}`, 128, 128, stoneDraw, q[0], q[1], q[2], 0.35, 0.35); } }
      const sk = smooth((f - W.palo) / 26); if (sk > 0 && sk < 1) { const q = arcP(sk, [-1.0, 1.6, 0.6], [1.5, 1.8, 1.4], 3.0); fx("stk", 256, 256, stickDraw, q[0], q[1], q[2], 0.5, 0.5); }
      if (f > 615) person("rv", rival, 1.5, 0, 1.4, { mode: "stand", expr: f > W.alcalde ? "dazed" : "neutral", facing: -1 }, 5, true, 1.0);
      const ss = smooth((f - W.zapato) / 36); if (ss > 0 && f < W.colgado - 6) { const q = arcP(ss, [0.9, 1.4, 0.6], [1.7, 8.7, -1.0], 0.6); fx("sh", 256, 160, shoeDraw, q[0], q[1], q[2], 0.9, 0.56); }
    }
    if (id === S.aim) {
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: f > W.apunta ? "stern" : "grin", facing: 0, wave: f > W.lanza - 6 ? 0.95 : undefined }, 1, true, PIMS);
      if (f < W.lanza) fx("m", 128, 128, marbleDraw, 0.35, 1.55, 1.4, 0.12, 0.12);
    }
    if (id === S.boom) {
      if (f < W.plof + 2) { const s = smooth((f - 846) / 14); const q = arcP(s, [0, 1.5, 1.0], PIN, 0.5); fx("m", 128, 128, marbleDraw, q[0], q[1], q[2], 0.18, 0.18); }
      else if (f < W.plof + 24) fx("burst", 512, 512, burstDraw, PIN[0], PIN[1], PIN[2] + 0.1, 5, 5);
      if (f > W.plof) for (let j = 0; j < 30; j++) { const y = 9.0 - ((f - W.plof) * 0.09 + (j * 0.37) % 3) % 10; if (y > 0.1) fx(`cd${j}`, 128, 128, candyDraw(COLS[j % 6]), -3 + (j * 0.73) % 6, y, -1 + (j * 0.41) % 2.4, 0.22, 0.22); }
      if (f > 940) { const s = smooth((f - 960) / 47); const y = 8.7 - s * 8.6; fx("sh", 256, 160, shoeDraw, 1.7 - s * 0.8, Math.max(0.12, y), -1.0 + s * 1.65, 0.6 + s * -0.1, 0.37); person("alc", ALCALDESA, 0.9, 0, 0.6, { mode: "stand", expr: f > W.pie ? "relief_open" : "shock", facing: 0, wave: f > W.pie ? 0.9 : undefined }, 2, true, 1.0); }
      if (f > 970) person("pim", PIMPIN, -0.6, 0, 1.4, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
