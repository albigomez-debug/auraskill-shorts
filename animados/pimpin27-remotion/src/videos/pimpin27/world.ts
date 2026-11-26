// Pimpín 27 · "Memoria": thought bubbles, birthday hens, a big dictionary, the festival chest with a number padlock, hammer, lanterns.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, qDraw } from "./props";
import { chickenDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const thinkDraw = (inner: (p: Pen) => void) => (p: Pen) => { p.ell(256, 200, 230, 170, "#ffffff", 8); p.ell(110, 420, 30, 26, "#ffffff", 6); p.ell(60, 480, 18, 16, "#ffffff", 5); inner(p); };
const soupIn = (p: Pen) => { p.poly([[150, 200], [362, 200], [330, 290], [182, 290]], "#f4f1ea", 6); p.ell(256, 204, 104, 22, "#e8a03a", 4); p.g.fillStyle = "#1a1a1e"; p.g.font = "bold 44px Arial"; p.g.textAlign = "center"; p.g.fillText("MARTES 2023", 256, 120); };
const rainIn = (p: Pen) => { p.ell(256, 150, 130, 54, "#8a8a98", 5); for (let j = 0; j < 8; j++) p.line([[170 + j * 24, 220], [160 + j * 24, 270]], "#3a8ac8", 6, false); p.g.fillStyle = "#1a1a1e"; p.g.font = "bold 40px Arial"; p.g.textAlign = "center"; p.g.fillText("MARTES", 256, 330); };
const bookDraw = (p: Pen) => { p.poly([[20, 40], [492, 40], [492, 300], [20, 300]], "#8a1e26", 8); p.poly([[40, 56], [472, 56], [472, 284], [40, 284]], "#f4f1ea", 4); p.line([[256, 56], [256, 284]], "#1a1010", 5, false); for (let j = 0; j < 6; j++) { p.line([[60, 90 + j * 32], [236, 90 + j * 32]], "#8a8478", 6, false); p.line([[276, 90 + j * 32], [452, 90 + j * 32]], "#8a8478", 6, false); } };
const hatDraw = (c: string) => (p: Pen) => { p.poly([[64, 10], [20, 120], [108, 120]], c, 5); p.ell(64, 10, 12, 12, "#fff", 3); };
const chestDraw = (open: number) => (p: Pen) => { p.poly([[30, 160], [482, 160], [482, 340], [30, 340]], "#8a5a2a", 8); for (const x of [60, 452]) p.band([[x, 160], [x, 340]], "#e8c45a", 14, 3); if (open < 0.5) { p.poly([[30, 70], [482, 70], [482, 160], [30, 160]], "#a8703a", 8); p.poly([[216, 150], [296, 150], [296, 230], [216, 230]], "#c8c8d0", 6); p.arc(256, 150, 28, 34, 180, 360, 10, "#c8c8d0"); p.g.fillStyle = "#1a1a1e"; p.g.font = "bold 30px Arial"; p.g.textAlign = "center"; p.g.fillText(open > 0.2 ? "739" : "???", 256, 202); } else { p.poly([[30, 160], [482, 160], [452, 20], [60, 20]], "#a8703a", 8); p.ell(256, 168, 220, 20, "#3a2416", 0); } };
const hammerDraw = (broken: boolean) => (p: Pen) => { p.band([[128, 250], [128, 90]], "#8a5a2a", 18, 4); if (!broken) p.poly([[60, 40], [196, 40], [196, 100], [60, 100]], "#6a6a72", 6); };
const headDraw = (p: Pen) => p.poly([[10, 10], [118, 10], [118, 60], [10, 60]], "#6a6a72", 6);
const lanternDraw = (c: string) => (p: Pen) => { p.line([[64, 0], [64, 30]], "#3a2a1a", 4, false); p.ell(64, 80, 44, 52, c, 6); p.band([[30, 60], [98, 60]], "#3a2a1a", 3, 0); p.band([[30, 100], [98, 100]], "#3a2a1a", 3, 0); };
const candyDraw = (c: string) => (p: Pen) => { p.ell(64, 64, 30, 24, c, 5); p.poly([[34, 64], [6, 44], [6, 84]], c, 4); p.poly([[94, 64], [122, 44], [122, 84]], c, 4); };
const COLS = ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a", "#c85ab8", "#ff8a2a"];

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, id, person, fx, card } = a;
    const cura = { ...VEC(1), jacket: "#1a1a1e", pants: "#1a1a1e", hat: "hair", hair: "#8a8a8a" } as any;
    const cartero = { ...VEC(3), jacket: "#3a5ab8", hat: "cap", cap: "#3a5ab8" } as any;
    const chest = (open: number) => fx(`ch|${open > 0.5 ? 2 : open > 0.2 ? 1 : 0}`, 512, 360, chestDraw(open), 0, 0.5, 0.8, 1.4, 0.98);
    if (id === S.hook || id === S.end) {
      person("pim", PIMPIN, -0.4, 0, 1.2, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      const s = smooth((f - (id === S.hook ? 20 : 1040)) / 12); if (s > 0) fx("th", 512, 512, thinkDraw(soupIn), 0.45, 2.15, 1.0, 1.0 * s, 1.0 * s);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) { const x = -5 + j * 1.4 + (j > 3 ? 1.2 : 0); person(`m${j}`, VEC(j), x, 0, 1.2, { mode: "stand", expr: "dazed", facing: 0 }, 10 + j, true, 1.0); fx(`q${j}`, 256, 256, qDraw, x, 2.2, 1.2, 0.4, 0.4); }
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.hens) {
      person("pim", PIMPIN, -0.5, 0, 1.4, { mode: "stand", expr: "laugh", facing: 1, wave: 0.9 }, 1, true, PIMS);
      for (let j = 0; j < 3; j++) { const x = 0.3 + j * 0.5, z = 1.6 - j * 0.3; card(`h${j}`, x, z, 0.34, chickenDraw(0, false), -1, 0); fx(`hh${j}`, 128, 128, hatDraw(COLS[j]), x - 0.02, 0.62, z + 0.02, 0.16, 0.16); }
      if (f > W.cumple - 6) fx("bb", 512, 256, bubbleDraw("¡FELIZ DÍA, CLARA!"), 0.2, 2.2, 1.3, 1.3, 0.65);
    }
    if (id === S.dict) {
      person("pim", PIMPIN, 0, 0, 1.4, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1, true, PIMS);
      fx("book", 512, 340, bookDraw, 0.1, 0.95, 1.6, 0.9, 0.6);
    }
    if (id === S.candy) {
      const later = f > W.despues - 10;
      person("kid", later ? VEC(3) : KIDV(3), 0.7, 0, 1.1, { mode: "stand", expr: later ? "shock" : "grin", facing: -1 }, 10, true, later ? 1.0 : 0.9);
      person("pim", PIMPIN, -0.5, 0, 1.5, { mode: "stand", expr: later ? "stern" : "smile", facing: 1, wave: later ? 0.95 : undefined }, 1, true, later ? PIMS * 1.15 : PIMS);
      if (f > W.caramelo - 8) fx("bb", 512, 256, bubbleDraw(later ? "¡MI CARAMELO!" : "ME DEBES UNO"), -0.2, 2.25, 1.5, 1.2, 0.6);
    }
    if (id === S.chest) {
      chest(0);
      for (let j = 0; j < 3; j++) person(`c${j}`, VEC(j), -1.4 + j * 1.4, 0, -0.2, { mode: "stand", expr: f > 480 ? "dazed" : "grin", facing: 0 }, 10 + j, true, 1.0);
      if (f > 470) for (let j = 0; j < 3; j++) fx(`q${j}`, 256, 256, qDraw, -1.4 + j * 1.4, 2.2, -0.2, 0.4, 0.4);
    }
    if (id === S.tries) {
      chest(0);
      if (f < 575) { person("ca", cartero, -0.6, 0, 1.0, { mode: "stand", expr: f > 564 ? "dazed" : "grin", facing: 1, wave: 0.9 }, 11, true, 1.0); if (f > W.cartero - 6) fx("bb", 512, 256, bubbleDraw("¿12 05?"), -0.2, 2.15, 1.0, 1.1, 0.55); }
      else if (f < 650) { person("cu", cura, -0.6, 0, 1.0, { mode: "stand", expr: f > 633 ? "dazed" : "nervous", facing: 1, wave: 0.9 }, 12, true, 1.0); const n = f > W.tres ? "3" : f > W.dos ? "2" : f > W.uno ? "1" : ""; if (n) fx(`n${n}`, 512, 256, bubbleDraw(n), -0.2, 2.15, 1.0, 0.8, 0.4); }
      else { const sw = f > W.martillo - 8 && f < W.martillo + 2; person("alc", ALCALDESA, -0.7, 0, 1.0, { mode: "stand", expr: f > W.rompe ? "shock" : "stern", facing: 1, wave: 0.95 }, 2, true, 1.0); fx(`hm|${f > W.rompe ? 1 : 0}`, 256, 256, hammerDraw(f > W.rompe), sw ? -0.15 : -0.35, sw ? 1.2 : 1.75, 1.05, 0.5, 0.5); if (f > W.rompe) { const s = (f - W.rompe) * 0.06; fx("hd", 128, 64, headDraw, -0.35 + s * 1.2, 1.9 + s * 2 - s * s * 1.5, 1.0, 0.25, 0.12); } }
    }
    if (id === S.think) {
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: f > W.siete - 4 ? "grin" : "stern", facing: 0, wave: f > W.siete - 4 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.martes - 30 && f < W.siete - 4) fx("th", 512, 512, thinkDraw(rainIn), 0.6, 2.0, 1.0, 0.8, 0.8);
      if (f > W.clic - 2) fx("clic", 512, 256, bubbleDraw("¡CLIC!"), 0.6, 2.0, 1.0, 0.8, 0.4);
    }
    if (id === S.open) {
      const op = smooth((f - 905) / 15);
      chest(op > 0.5 ? 1 : 0.3);
      if (op > 0.5) for (let j = 0; j < 7; j++) { const s = smooth((f - 925 - j * 4) / 40); fx(`l${j}`, 128, 160, lanternDraw(COLS[j % 6]), -1.6 + j * 0.55, 0.8 + s * (2.2 + (j % 3) * 0.4), 0.8, 0.3, 0.38); }
      person("pim", PIMPIN, -1.0, 0, 1.4, { mode: "stand", expr: "laugh", facing: 1, wave: f > W.caramelos ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.caramelos - 10) for (let j = 0; j < 4; j++) fx(`cd${j}`, 128, 128, candyDraw(COLS[j]), -0.85 + (j % 2) * 0.2, 1.7 + Math.floor(j / 2) * 0.2, 1.5, 0.18, 0.18);
      person("kid", VEC(3), 0.9, 0, 1.6, { mode: "stand", expr: f > W.caramelos ? "nervous" : "laugh", facing: -1 }, 10, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
