// Pimpín 19 · "Soplador": plaza; cake at the far side, soup, balloon, dandelion, kite contest, a pond at (6, 2.4).
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, signDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const cakeDraw = (lit: boolean) => (p: Pen) => { p.poly([[30, 120], [226, 120], [226, 230], [30, 230]], "#f4b8d0", 6); p.poly([[30, 110], [226, 110], [226, 140], [30, 140]], "#ffffff", 4); for (let k = 0; k < 5; k++) { p.poly([[50 + k * 38, 60], [62 + k * 38, 60], [62 + k * 38, 112], [50 + k * 38, 112]], "#7ab0e8", 3); if (lit) p.ell(56 + k * 38, 48, 8, 14, "#ffb030", 0); else p.ell(60 + k * 38, 36, 10, 8, "rgba(150,150,160,0.7)", 0); } };
const gustDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 8; j++) { const y = 40 + j * 28 + Math.sin(j + k) * 8, x = (j * 47 + k * 90) % 160; p.line([[x, y], [x + 300, y - 6]], "rgba(220,240,255,0.95)", 7, false); } };
const bowlDraw = (p: Pen) => { p.poly([[20, 60], [236, 60], [200, 140], [56, 140]], "#f4f1ea", 6); p.ell(128, 64, 104, 18, "#d8902a", 3); };
const splashDraw = (p: Pen) => { for (let j = 0; j < 9; j++) p.ell(128 + Math.cos(j * 0.7) * (40 + (j % 3) * 30), 128 + Math.sin(j * 0.7) * (40 + (j % 3) * 30), 30 - (j % 3) * 6, 26, "#d8902a", 0); p.ell(128, 128, 60, 54, "#d8902a", 0); };
const balloonDraw = (p: Pen) => { p.ell(128, 120, 110, 116, "#e2453c", 7); p.ell(90, 80, 22, 30, "#ff9a8a", 0); p.poly([[112, 236], [144, 236], [128, 256]], "#b8302a", 4); };
const dandDraw = (p: Pen) => { p.line([[64, 250], [64, 120]], "#4a8a3a", 6, false); p.ell(64, 90, 50, 50, "rgba(255,255,255,0.9)", 3); };
const seedsDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 20; j++) p.ell((j * 61 + k * 40) % 500 + 6, (j * 37 + k * 23) % 240 + 8, 6, 6, "#ffffff", 0); };
const hatDraw = (p: Pen) => { p.poly([[40, 40], [88, 40], [88, 100], [40, 100]], "#1a1a1e", 4); p.poly([[20, 100], [108, 100], [108, 114], [20, 114]], "#1a1a1e", 4); };
const kiteDraw = (col: string) => (p: Pen) => { p.poly([[128, 10], [230, 120], [128, 260], [26, 120]], col, 7); p.line([[128, 10], [128, 260]], "#1a1010", 4, false); p.line([[26, 120], [230, 120]], "#1a1010", 4, false); p.line([[128, 260], [110, 320], [146, 380], [120, 440], [140, 500]], "#1a1010", 4, false); for (const y of [320, 400, 470]) p.poly([[120, y], [146, y - 10], [146, y + 10]], "#f2c84a", 3); };
const pondDraw = (p: Pen) => p.ell(256, 128, 240, 100, "#3a8ad8", 6);

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const gust = (key: string, x: number, y: number, z: number, w: number, h: number) => { const k = Math.floor(t * 10) % 4; fx(`${key}|${k}`, 512, 256, gustDraw(k), x, y, z, w, h, true); };
    if (id === S.hook || id === S.end) {
      const s0 = id === S.hook ? W.sopla0 : 1050, out = f > s0 + 14;
      person("pim", PIMPIN, -0.8, 0, 4.4, { mode: "stand", expr: f > s0 - 4 && f < s0 + 16 ? "whistle" : "grin", facing: 1 }, 1, true, PIMS);
      if (f > s0 && f < s0 + 30) gust("g", 0, 1.3, 0.8, 3, 1.2);
      fx(`cake|${out ? 0 : 1}`, 256, 256, cakeDraw(!out), 0.6, 1.15, -2.5, 0.8, 0.8);
      fx("tbl", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#a8603a", 5), 0.6, 0.75, -2.55, 1.4, 0.25);
      for (let j = 0; j < 3; j++) person(`k${j}`, KIDV(j), -0.6 + j * 1.0, 0, -3.3, { mode: "stand", expr: out ? "shock" : "laugh", facing: -1, wave: out ? 0.9 : 0.4 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "whistle", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.soup) {
      fx("bowl", 256, 160, bowlDraw, -3.2, 0.95, -5.6, 0.5, 0.3);
      fx("tbl", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#a8603a", 5), -3.2, 0.8, -5.65, 1.4, 0.25);
      person("pim", PIMPIN, -3.8, 0, -5.2, { mode: "stand", expr: f > W.sopa - 4 && f < W.pared ? "whistle" : f > W.pared ? "shock" : "smile", facing: 0 }, 1, true, PIMS);
      if (f > W.pared - 2) fx("spl", 256, 256, splashDraw, -2.8, 2.2, -7.85, 1.4 * smooth((f - W.pared + 2) / 4), 1.4 * smooth((f - W.pared + 2) / 4));
      person("mom", VEC(1), -1.8, 0, -5.4, { mode: "stand", expr: f > W.pared ? "shock" : "stern", facing: -1 }, 2, true, 1.0);
    }
    if (id === S.balloon) {
      const s = smooth((f - W.infla) / 26), up = f > W.volando - 6 ? (f - W.volando + 6) * 0.06 : 0;
      person("pim", PIMPIN, 1.0, up, 2.0, { mode: "stand", expr: up > 0 ? "shock" : "whistle", facing: 0, wave: up > 0 ? 0.95 : undefined }, 1, up === 0, PIMS);
      fx("bal", 256, 256, balloonDraw, 1.3, 1.25 + s * 0.6 + up, 2.2, 0.2 + s * 1.2, 0.2 + s * 1.2);
    }
    if (id === S.dandelion) {
      const blown = f > W.leon + 2;
      person("pim", PIMPIN, -0.6, 0, 2.6, { mode: "stand", expr: blown ? "grin" : "whistle", facing: 1 }, 1, true, PIMS);
      if (!blown) fx("dand", 128, 256, dandDraw, -0.3, 1.0, 2.8, 0.2, 0.4);
      else { const k = Math.floor(t * 8) % 3; fx(`sd|${k}`, 512, 256, seedsDraw(k), 1.5, 1.8, 1.2, 5, 2.4, true); gust("g", 1.5, 1.6, 1.0, 6, 2); }
      for (let j = 0; j < 4; j++) { person(`v${j}`, { ...VEC(j), hat: blown ? "hair" : "tophat", hair: "#3a2a1a" } as any, 0.8 + j * 1.2, 0, 0.6 + (j % 2) * 0.5, { mode: "stand", expr: blown ? "shock" : "smile", facing: -1 }, 10 + j, true, 1.0); if (blown) fx(`hat${j}`, 128, 128, hatDraw, 0.8 + j * 1.2 + (f - W.leon) * 0.08, 2.4 + (f - W.leon) * 0.04, 0.6, 0.35, 0.35); }
    }
    if (id === S.contest) {
      fx("ban", 1024, 512, signDraw(["CONCURSO", "DE COMETAS"], "#f2e2b8", "#2a4a8a"), 0, 4.6, -7.9, 2.8, 1.4);
      for (let j = 0; j < 4; j++) { person(`a${j}`, VEC(j), -3.6 + j * 1.1, 0, 0.6, { mode: "stand", expr: "nervous", facing: 1 }, 10 + j, true, 1.0); person(`r${j}`, { ...VEC(j + 2), jacket: "#5a5a62" }, 1.6 + j * 1.1, 0, 0.6, { mode: "stand", expr: "stern", facing: -1 }, 20 + j, true, 1.0); }
      for (let j = 0; j < 3; j++) fx(`kt${j}`, 256, 512, kiteDraw(["#e2453c", "#3a8ac8", "#f2c84a"][j]), -3 + j * 1.2, 0.35, 1.1, 0.4, 0.8);
    }
    if (id === S.tries) {
      const run = f < 610, toss = f > W.tiran - 6 && f < 668 ? Math.sin(Math.PI * smooth((f - W.tiran + 6) / 34)) * 3 : 0;
      for (let j = 0; j < 3; j++) { const x = -3.5 + j * 1.2 + (run ? (f - 565) * 0.04 : 1.8); person(`a${j}`, VEC(j), x, 0, 0.6 + j * 0.4, { mode: run ? "march" : "stand", phase: t * 3 + j, expr: f > 604 ? "nervous" : "grin", facing: 1, wave: toss > 0.2 ? 0.95 : undefined }, 10 + j, true, 1.0); fx(`kt${j}`, 256, 512, kiteDraw(["#e2453c", "#3a8ac8", "#f2c84a"][j]), x - 0.7, 0.4 + toss, 0.6 + j * 0.4, 0.4, 0.8); }
      if (f > W.alcaldesa - 20) { const fall = smooth((f - W.cae + 4) / 20); person("alc", ALCALDESA, 3.0, 7.4, -8.4, { mode: "stand", expr: fall > 0 ? "shock" : "grin", facing: 0, wave: 0.95 }, 4, false, 1.0); fx("ka", 256, 512, kiteDraw("#c85ab8"), 3.0 - fall * 0.4, 8.6 - fall * 7.0, -8.0 + fall * 6.6, 0.6, 1.2); }
      if (f > 748) person("rival", { ...VEC(5), jacket: "#5a5a62", hat: "tophat" }, 2.6, 0, -1.2, { mode: "stand", expr: f > W.cae + 16 ? "dazed" : "stern", facing: 0 }, 5, true, 1.0);
    }
    if (id === S.breathe) {
      const s = smooth((f - 800) / 70);
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: s > 0.3 ? "nervous" : "smile", facing: 0 }, 1, true, PIMS * (1 + 0.22 * s));
    }
    if (id === S.fly) {
      person("pim", PIMPIN, -1.5, 0, 2.6, { mode: "stand", expr: f < 900 ? "whistle" : "grin", facing: 1 }, 1, true, PIMS);
      if (f < 930) fx(`gust|${Math.floor(t * 10) % 4}`, 512, 256, gustDraw(Math.floor(t * 10) % 4), 1.5, 2.5, 1.5, 7, 3, true);
      const up = smooth((f - W.fuuu) / 30);
      for (let j = 0; j < 5; j++) fx(`kt${j}`, 256, 512, kiteDraw(["#e2453c", "#3a8ac8", "#f2c84a", "#5ab85a", "#c85ab8"][j]), -1 + j * 1.3 + Math.sin(t * 2 + j) * 0.2, 0.6 + up * (4.5 + (j % 3) * 1.2) + Math.sin(t * 3 + j) * 0.2, -1 + (j % 2), 0.8, 1.6);
      fx("pond", 512, 256, pondDraw, 5.2, 0.03, 2.6, 3.0, 1.0);
      for (let j = 0; j < 2; j++) { const dn = smooth((f - W.aterrizan + 20) / 20); fx(`rk${j}`, 256, 512, kiteDraw("#5a5a62"), 4.7 + j * 1.0, 4.5 - dn * 4.2, 2.6, 0.6, 1.2); }
      for (let j = 0; j < 3; j++) person(`a${j}`, VEC(j), -0.2 + j * 1.2, 0, 1.2, { mode: "stand", expr: "laugh", facing: 0, wave: 0.9 }, 10 + j, true, 1.0);
      person("rival", { ...VEC(5), jacket: "#5a5a62", hat: "tophat" }, 4.6, 0, 1.6, { mode: "stand", expr: f > W.aterrizan ? "shock" : "stern", facing: 1 }, 5, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
