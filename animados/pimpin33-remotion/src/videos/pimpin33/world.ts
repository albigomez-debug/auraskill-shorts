// Pimpín 33 · "Ordenado": a room sorted by colour, pencils by size, socks by day, bread bars by length; a gale scrambles the market; Pimpín re-sorts it in ten seconds.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, textDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA, HOGAZA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const RB = ["#e2453c", "#f28a2a", "#f2c84a", "#5ab85a", "#3a8ac8", "#5a4ab8", "#a85ac8"];
const shelfDraw = (sorted: boolean) => (p: Pen) => { p.poly([[0, 0], [1024, 0], [1024, 512], [0, 512]], "#8a5a2a", 10); for (let r = 0; r < 3; r++) { p.band([[10, 160 + r * 165], [1014, 160 + r * 165]], "#5a3a1a", 14, 0); for (let k = 0; k < 14; k++) { const c = sorted ? RB[Math.floor(k / 2)] : RB[(k * 5 + r * 3) % 7]; const h = 90 + ((k * 13 + r * 7) % 40); p.poly([[30 + k * 70, 150 + r * 165 - h], [86 + k * 70, 150 + r * 165 - h], [86 + k * 70, 150 + r * 165], [30 + k * 70, 150 + r * 165]], c, 4); } } };
const messDraw = (p: Pen) => { for (let k = 0; k < 18; k++) { const x = 30 + ((k * 137) % 960), y = 40 + ((k * 71) % 180); p.poly([[x, y], [x + 50, y + 10], [x + 40, y + 50], [x - 6, y + 40]], RB[k % 7], 4); } };
const pencilsDraw = (sorted: boolean) => (p: Pen) => { for (let k = 0; k < 7; k++) { const h = sorted ? 120 + k * 50 : 120 + ((k * 3) % 7) * 50; const x = 40 + k * 66; p.poly([[x, 470], [x + 44, 470], [x + 44, 470 - h], [x + 22, 470 - h - 40], [x, 470 - h]], RB[k], 5); } };
const DAYS = ["L", "M", "X", "J", "V", "S", "D"];
const socksDraw = (p: Pen) => { p.band([[0, 30], [1024, 30]], "#5a4a3a", 6, 0); for (let k = 0; k < 7; k++) { const x = 40 + k * 140; p.poly([[x, 30], [x + 60, 30], [x + 60, 180], [x + 110, 200], [x + 110, 250], [x, 250]], RB[k], 5); p.g.fillStyle = "#fff"; p.g.font = "bold 60px Arial"; p.g.textAlign = "center"; p.g.fillText(DAYS[k], x + 32, 130); } };
const breadDraw = (p: Pen) => { for (let k = 0; k < 6; k++) { const w = 200 + k * 70; p.ell(512, 60 + k * 76, w / 2, 30, "#d8a050", 5); for (let j = -2; j <= 2; j++) p.band([[512 + j * w / 7 - 12, 48 + k * 76], [512 + j * w / 7 + 12, 72 + k * 76]], "#a8702a", 5, 0); } };
type It = "apple" | "tomato" | "melon" | "fish" | "lettuce";
const itemDraw = (p: Pen, it: It, x: number, y: number, s = 1) => {
  if (it === "apple") { p.ell(x, y, 26 * s, 24 * s, "#d8302a", 4); p.band([[x, y - 22 * s], [x + 4, y - 34 * s]], "#5a3a1a", 5, 0); }
  if (it === "tomato") { p.ell(x, y, 26 * s, 22 * s, "#f0502a", 4); p.poly([[x - 12 * s, y - 20 * s], [x, y - 28 * s], [x + 12 * s, y - 20 * s]], "#3a8a3a", 3); }
  if (it === "melon") p.ell(x, y, 40 * s, 28 * s, "#9ac84a", 4);
  if (it === "fish") { p.ell(x, y, 38 * s, 16 * s, "#9aa8b8", 4); p.poly([[x + 34 * s, y], [x + 56 * s, y - 16 * s], [x + 56 * s, y + 16 * s]], "#9aa8b8", 4); }
  if (it === "lettuce") { p.ell(x, y, 34 * s, 30 * s, "#5ab85a", 4); p.ell(x, y, 18 * s, 16 * s, "#8ad86a", 3); }
};
const ITS: It[] = ["apple", "tomato", "melon", "fish", "lettuce"];
const stallDraw = (mix: number) => (p: Pen) => { p.poly([[0, 300], [1024, 300], [1024, 512], [0, 512]], "#a8703a", 8); for (let c = 0; c < 5; c++) { p.poly([[10 + c * 202, 200], [200 + c * 202, 200], [200 + c * 202, 300], [10 + c * 202, 300]], "#c8904a", 5); for (let k = 0; k < 6; k++) { const it = mix > 0 ? ITS[(c * 3 + k * 2 + mix) % 5] : ITS[c]; itemDraw(p, it, 45 + c * 202 + (k % 3) * 55, 190 - Math.floor(k / 3) * 40); } } };
const oneDraw = (it: It) => (p: Pen) => itemDraw(p, it, 128, 128, 3);
const gustDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 7; j++) { const y = 40 + j * 64, x = ((k * 140 + j * 230) % 1200) - 200; p.line([[x, y], [x + 200, y - 10], [x + 320, y + 12]], "#f4fafc", 6, false); } };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const frutero = { ...VEC(5), jacket: "#3a8a3a", hat: "cap", cap: "#3a8a3a" } as any;
    const pescadero = { ...VEC(3), jacket: "#3a5ab8", hat: "cap", cap: "#f4f1ea" } as any;
    if (id === S.hook || id === S.end) {
      fx("shelf", 1024, 512, shelfDraw(true), 0.3, 1.9, 0.2, 2.2, 1.1);
      person("pim", PIMPIN, -0.6, 0, 1.2, { mode: "stand", expr: "grin", facing: 1, wave: 0.9 }, 1, true, PIMS);
      person("v0", VEC(1), 1.2, 0, 1.4, { mode: "stand", expr: "shock", facing: -1 }, 10, true, 1.0);
    }
    if (id === S.premise) {
      fx("mess", 1024, 256, messDraw, -1, 0.3, 1.8, 7, 1.6);
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: j % 2 ? "dazed" : "nervous", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.pencils) {
      person("pim", PIMPIN, -0.6, 0, 1.2, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      fx(`pc|${f > W.tamano - 6 ? 1 : 0}`, 512, 512, pencilsDraw(f > W.tamano - 6), 0.55, 1.4, 1.3, 1.0, 1.0);
    }
    if (id === S.socks) {
      fx("socks", 1024, 256, socksDraw, 0, 2.6, 0.9, 2.6, 0.65);
      person("pim", PIMPIN, 0, 0, 1.4, { mode: "stand", expr: "smile", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.bread) {
      fx("bread", 1024, 512, breadDraw, 0.5, 1.3, 1.2, 1.5, 0.75);
      person("pim", PIMPIN, -0.7, 0, 1.2, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      person("pan", HOGAZA, 1.4, 0, 0.6, { mode: "stand", expr: f > W.barras ? "shock" : "smile", facing: -1 }, 3, true, 1.0);
    }
    const stall = (mix: number) => fx(`st|${mix}`, 1024, 512, stallDraw(mix), 0.3, 0.75, -0.6, 3.0, 1.5);
    if (id === S.storm) {
      const mix = f > W.mezcla - 4 ? 1 + (Math.floor(t * 6) % 2) * (f < 450 ? 1 : 0) : 0;
      stall(mix);
      if (f > W.vendaval - 8) { fx(`g|${Math.floor(t * 8) % 8}`, 1024, 512, gustDraw(Math.floor(t * 8)), 0, 1.8, 1.4, 4, 2); for (let j = 0; j < 4; j++) { const it = ITS[j]; const s = ((t * 1.5 + j * 0.25) % 1); fx(`fl${j}`, 256, 256, oneDraw(it), -1.6 + s * 3.4, 1.2 + Math.sin(s * 6 + j) * 0.6 + j * 0.2, 1.4, 0.35, 0.35); } }
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j), -1.0 + j * 2.4, 0, 1.6, { mode: "stand", expr: f > W.vendaval ? "shock" : "smile", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.tries) {
      stall(1);
      if (f < 540) { person("fr", frutero, -0.4, 0, 1.4, { mode: "stand", expr: f > W.tomates ? "nervous" : "grin", facing: 0, wave: 0.95 }, 4, true, 1.0); fx(`it|${f > W.tomates - 4 ? 1 : 0}`, 256, 256, oneDraw(f > W.tomates - 4 ? "tomato" : "apple"), -0.05, 2.0, 1.5, 0.4, 0.4); if (f > W.tomates) fx("q1", 512, 256, bubbleDraw("¿TOMATES?"), 0.6, 2.4, 1.5, 1.2, 0.6); }
      else if (f < 612) { person("pe", pescadero, -0.4, 0, 1.4, { mode: "stand", expr: f > W.melon ? "shock" : "neutral", facing: 0, wave: 0.95 }, 5, true, 1.0); if (f > W.melon - 6) { fx("mel", 256, 256, oneDraw("melon"), -0.05, 2.0, 1.5, 0.5, 0.5); fx("q2", 512, 256, bubbleDraw("¿PESCADO?"), 0.6, 2.4, 1.5, 1.2, 0.6); } }
      else { person("al", ALCALDESA, 0.2, 0, 1.4, { mode: "stand", expr: f > W.cabeza ? "dazed" : "stern", facing: 0 }, 3, true, 1.0); if (f > W.lechuga - 10) { const s = smooth((f - W.lechuga + 10) / 14); fx("let", 256, 256, oneDraw("lettuce"), 0.6 - s * 0.4, 1.4 + s * 0.38 + Math.sin(Math.PI * s) * 0.4, 1.45, 0.45, 0.45); } }
    }
    if (id === S.fix) {
      const go = f > W.uno - 4 && f < W.diez + 8;
      const mix = f < W.uno ? 1 : f < W.diez ? 1 + (Math.floor(t * 10) % 3) : 0;
      stall(mix);
      const n = f < W.uno - 4 ? 0 : f < W.tres - 2 ? 1 : f < W.diez - 4 ? 3 : 10;
      if (n > 0 && f < 850) fx(`c|${n}`, 512, 256, textDraw(n === 10 ? "¡10!" : String(n), "#ffd23f", 160), 0, 2.7, 1.0, 2.0, 1.0);
      const px = go ? Math.sin(t * 30) * 1.4 : f > W.diez ? 0.9 : -0.4;
      person("pim", PIMPIN, px, 0, 1.4, { mode: go ? "stroll" : "stand", phase: t * 12, expr: f < W.remanga + 20 ? "stern" : go ? "grin" : "laugh", facing: go ? (Math.cos(t * 30) > 0 ? 1 : -1) : 0, wave: f > W.remanga - 4 && f < W.uno ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.diez) { const off = smooth((f - W.vuelve + 30) / 28); person("al", ALCALDESA, -0.6, 0, 1.6, { mode: "stand", expr: off > 0.9 ? "relief_open" : "dazed", facing: 1 }, 3, true, 1.0); fx("let", 256, 256, oneDraw("lettuce"), -0.6 + off * 1.8, 1.82 - off * 0.8 + Math.sin(Math.PI * off) * 0.5, 1.65, 0.45, 0.45); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
