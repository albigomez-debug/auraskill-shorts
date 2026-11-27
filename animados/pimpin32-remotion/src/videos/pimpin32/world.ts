// Pimpín 32 · "Abejas": a hat of bees, honey, shade, buzzing answers; a swarm in the town hall; Pimpín whistles them out to a flower field.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, signDraw, noteDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA, ESTIRADO } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const beesDraw = (k: number, n: number) => (p: Pen) => { for (let j = 0; j < n; j++) { const a = j * 2.39 + k * 0.5, r = 40 + ((j * 37) % 180); const x = 256 + Math.cos(a) * r, y = 256 + Math.sin(a * 1.3) * r * 0.75; p.ell(x - 11, y - 24, 20, 15, "#e8f4ff", 3); p.ell(x + 11, y - 24, 20, 15, "#e8f4ff", 3); p.ell(x, y, 32, 21, "#f2c22a", 5); p.band([[x - 7, y - 19], [x - 7, y + 19]], "#1a1a1e", 9, 0); p.band([[x + 12, y - 16], [x + 12, y + 16]], "#1a1a1e", 9, 0); } };
const jarDraw = (p: Pen) => { p.poly([[60, 60], [196, 60], [210, 236], [46, 236]], "#e8a020", 7); p.poly([[50, 30], [206, 30], [206, 64], [50, 64]], "#c8202a", 6); p.g.fillStyle = "#5a3a10"; p.g.font = "bold 50px Arial"; p.g.textAlign = "center"; p.g.fillText("MIEL", 128, 170); };
const sunDraw = (p: Pen) => { p.ell(128, 128, 70, 70, "#ffd23f", 6); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; p.band([[128 + Math.cos(a) * 85, 128 + Math.sin(a) * 85], [128 + Math.cos(a) * 118, 128 + Math.sin(a) * 118]], "#ffb02a", 12, 3); } };
const deskDraw = (p: Pen) => { p.poly([[0, 20], [512, 20], [512, 70], [0, 70]], "#a8703a", 6); p.band([[40, 70], [40, 200]], "#7a5030", 14, 4); p.band([[470, 70], [470, 200]], "#7a5030", 14, 4); };
const boardDraw = (p: Pen) => { p.poly([[0, 0], [1024, 0], [1024, 512], [0, 512]], "#2a4a3a", 12); p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 120px Arial"; p.g.textAlign = "center"; p.g.fillText("7 x 8 = ?", 512, 300); };
const waterDraw = (s: number) => (p: Pen) => { p.band([[10, 60], [260 * s, 40], [500 * s, 120]], "#6ab4e8", 26, 4); for (let k = 0; k < 6 * s; k++) p.ell(500 * s - 20 + (k % 3) * 14, 140 + k * 14, 10, 14, "#9ad4ff", 3); };
const flowersDraw = (p: Pen) => { for (let k = 0; k < 22; k++) { const x = 20 + k * 46, y = 150 + (k % 3) * 40; p.band([[x, y], [x, 250]], "#3a8a3a", 8, 0); p.ell(x, y, 22, 22, ["#e84a5a", "#ffd23f", "#f49ac0", "#9a6ac8", "#f4f1ea"][k % 5], 4); p.ell(x, y, 8, 8, "#e8a020", 0); } };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const k = Math.floor(t * 8) % 6;
    const bees = (key: string, x: number, y: number, z: number, s: number, n = 14) => fx(`${key}|${k}|${n}`, 512, 512, beesDraw(k, n), x, y, z, s, s);
    const bombero = { ...VEC(0), jacket: "#c8202a", hat: "cap", cap: "#c8202a" } as any;
    const conserje = { ...VEC(3), jacket: "#5a5a6a", hat: "cap", cap: "#3a3a4a" } as any;
    if (id === S.hook || id === S.end) {
      person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1, true, PIMS);
      bees("hat", 0, 1.76, 1.1, 0.8, 18);
      const run = smooth((f - (id === S.hook ? W.abejas : 1010)) / 30);
      for (let j = 0; j < 3; j += 2) person(`v${j}`, VEC(j), (j - 1) * 1.4 + (j - 1) * run * 2.5, 0, 1.8, { mode: run > 0 ? "stroll" : "stand", phase: t * 5 + j, expr: run > 0 ? "shock" : "nervous", facing: (j === 0 ? -1 : j === 2 ? 1 : 0) as 0 | 1 | -1 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stroll", phase: t * 6 + j, expr: "shock", facing: j % 2 ? 1 : -1 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      bees("pb", 0.4, 2.0, 2.5, 0.8, 8);
    }
    if (id === S.honey) {
      person("pim", PIMPIN, -0.3, 0, 1.2, { mode: "stand", expr: f > W.miel ? "laugh" : "grin", facing: 1, wave: f > W.miel ? 0.95 : undefined }, 1, true, PIMS);
      const s = smooth((f - 175) / 40);
      bees("hb", 1.6 - s * 1.0, 1.9, 1.3, 0.8, 10);
      fx("jar", 256, 256, jarDraw, 1.6 - s * 1.0, 1.4 + Math.sin(t * 6) * 0.04, 1.35, 0.4, 0.4);
    }
    if (id === S.shade) {
      fx("sun", 256, 256, sunDraw, 1.0, 3.2, 0.8, 0.9, 0.9);
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: "smile", facing: 0 }, 1, true, PIMS);
      bees("um", 0, 2.35, 1.25, 1.2, 18);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j + 2), -1.2 + j * 2.4, 0, 0.6, { mode: "stand", expr: "pained", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.school) {
      fx("board", 1024, 512, boardDraw, 0, 2.6, -1.2, 2.6, 1.3);
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "sit", expr: f > W.respuestas ? "grin" : "neutral", facing: 0 }, 1, true, PIMS);
      fx("desk", 512, 200, deskDraw, 0, 0.45, 1.5, 1.1, 0.43);
      bees("sb", 0.5, 1.8, 1.3, 0.5, 6);
      if (f > W.respuestas - 4) fx("bz", 512, 256, bubbleDraw("BZZ... ¡56!"), 0.5, 2.05, 1.3, 1.3, 0.65);
      for (let j = 0; j < 2; j++) person(`k${j}`, KIDV(j), (j ? 1.3 : -1.3), 0, 0.8, { mode: "sit", expr: "shock", facing: 0 }, 10 + j, true, 1.0);
    }
    if (id === S.hall) {
      fx("ayto", 1024, 512, signDraw(["AYUNTAMIENTO"], "#f2e2b8", "#2a4a8a"), 0, 3.6, -7.6, 2.6, 1.3);
      const g = smooth((f - W.enjambre + 20) / 50);
      bees("sw", 2.0 - g * 2.0, 2.4, -6.8, 1.4 + g * 0.8, 22);
      if (f > W.pleno - 4) fx("pleno", 1024, 512, signDraw(["PLENO", "HOY"], "#f4f1ea", "#c8202a"), -1.0, 1.4, -5.8, 1.2, 0.6);
      person("est", ESTIRADO, 0.8, 0, -6.0, { mode: "stand", expr: f > 430 ? "shock" : "stern", facing: 0 }, 3, true, 1.0);
    }
    if (id === S.tries) {
      if (f < 545) { person("co", conserje, -0.8, 0, 1.0, { mode: "stand", expr: f > 520 ? "nervous" : "stern", facing: 1, wave: 0.95 }, 4, true, 1.0); fx("win", 512, 256, bubbleDraw("¡FUERA!"), -0.8, 2.5, 1.1, 1.2, 0.6); bees("tw", 0.9, 1.9, 0.6, 1.4, 22); person("est", ESTIRADO, 1.2, 0, 1.6, { mode: "stand", expr: "nervous", facing: -1 }, 3, true, 1.0); }
      else if (f < 620) { const s = smooth((f - W.manguera) / 14); person("bo", bombero, -1.0, 0, 1.0, { mode: "stand", expr: "grin", facing: 1 }, 4, true, 1.0); if (s > 0) fx(`wt|${Math.round(s * 6)}`, 512, 256, waterDraw(s), 0.0, 1.5, 1.1, 1.8, 0.9); bees("tw", 0.9, 2.6, 0.4, 1.2, 24); person("est", ESTIRADO, 1.0, 0, 1.4, { mode: "stand", expr: f > W.moja ? "dazed" : "nervous", facing: -1 }, 3, true, 1.0); }
      else { const run = smooth((f - W.siguen + 10) / 40); person("al", ALCALDESA, 0.2 - run * 0.4, 0, 1.2, { mode: run > 0 ? "stroll" : "stand", phase: t * 6, expr: run > 0 ? "shock" : "grin", facing: run > 0 ? -1 : 0, wave: run > 0 ? 0.95 : undefined }, 3, true, 1.0); fx("jar", 256, 256, jarDraw, 0.55 - run * 0.4, 1.5, 1.3, 0.4, 0.4); const b = smooth((f - 650) / 30); bees("tw", 1.8 - b * 1.4 - run * 0.4, 2.3, 1.0, 1.3, 22); }
    }
    if (id === S.calm) {
      person("pim", PIMPIN, -0.3, 0, 1.2, { mode: "stand", expr: f < W.mano ? "whistle" : "smile", facing: 0, wave: f > W.mano - 4 ? 0.95 : undefined }, 1, true, PIMS);
      if (f < W.mano) fx(`n|${Math.floor(t * 3) % 2}`, 256, 256, noteDraw(Math.floor(t * 3)), 0.2, 2.3 + (t % 1) * 0.2, 1.3, 0.4, 0.4);
      const land = smooth((f - W.posan + 30) / 40);
      bees("cw", 1.4 - land * 1.4, 2.6 - land * 0.95, 1.0 + land * 0.25, 1.6 - land * 1.05, 24 - Math.round(land * 12));
    }
    if (id === S.field) {
      fx("flw", 1024, 256, flowersDraw, 0, 0.35, 1.8, 4.0, 1.0);
      person("pim", PIMPIN, -0.5, 0, 1.0, { mode: "stand", expr: "laugh", facing: 0, wave: 0.9 }, 1, true, PIMS);
      const s = smooth((f - W.campo) / 50);
      bees("fb", -0.2 + s * 1.4, 1.6 - s * 0.6, 1.2, 1.2, 20);
      if (f > 900) { person("al", ALCALDESA, 1.2, 0, 1.4, { mode: "stand", expr: f > W.tarro2 ? "relief_open" : "nervous", facing: -1 }, 3, true, 1.0); if (f > W.tarro2 - 4) fx("jar2", 256, 256, jarDraw, 0.9, 1.4, 1.5, 0.45, 0.45); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
