// Pimpín 41 · "Jardinero": a chickpea grows into a tree overnight; a flowering cactus, mossy stone, football-sized tomatoes; the fiesta tree dries up; Pimpín whispers it back to life.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, signDraw, noteDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
// tree on a 1024x1024 canvas, trunk base at y 1000. leaves/flowers/oranges 0..1; branch: 0 missing, 1 present
const treeDraw = (lv: number, fl: number, or: number, branch: number, dry: boolean) => (p: Pen) => {
  const wood = dry ? "#7a6a5a" : "#7a4a2a";
  p.poly([[470, 1000], [554, 1000], [544, 560], [480, 560]], wood, 8);
  p.band([[500, 600], [330, 380]], wood, 34, 6); p.band([[520, 560], [512, 300]], wood, 30, 6);
  if (branch > 0) p.band([[540, 600], [540 + 180 * branch, 600 - 200 * branch]], wood, 30, 6);
  const blobs: [number, number, number][] = [[512, 300, 170], [330, 360, 140], [700, 380, 150], [420, 220, 120], [610, 220, 130], [512, 450, 150]];
  if (lv > 0) for (const [x, y, r] of blobs) p.ell(x, y, r * lv, r * 0.85 * lv, "#4a9a3a", 6);
  if (fl > 0) for (let k = 0; k < 14; k++) { const [x, y] = blobs[k % 6]; p.ell(x + Math.cos(k * 2.1) * 90, y + Math.sin(k * 1.7) * 70, 20 * fl, 20 * fl, k % 2 ? "#f49ac0" : "#f4f1ea", 3); }
  if (or > 0) for (let k = 0; k < 12; k++) { const [x, y] = blobs[(k + 3) % 6]; p.ell(x + Math.cos(k * 1.3) * 100, y + Math.sin(k * 2.3) * 80, 28 * or, 28 * or, "#f28a2a", 4); }
  if (dry && lv === 0) for (let k = 0; k < 4; k++) p.band([[330 + k * 110, 380 - (k % 2) * 80], [300 + k * 120, 300 - (k % 2) * 60]], wood, 12, 3);
};
const potDraw = (g: number) => (p: Pen) => { p.poly([[70, 400], [186, 400], [170, 500], [86, 500]], "#c86a3a", 6); if (g > 0) { p.band([[128, 400], [128, 400 - 300 * g]], "#4a9a3a", 10, 3); p.ell(100, 400 - 250 * g, 30 * g, 14 * g, "#5ab85a", 3); p.ell(156, 400 - 200 * g, 30 * g, 14 * g, "#5ab85a", 3); } else p.ell(128, 396, 14, 10, "#e8c890", 3); };
const wiltDraw = (p: Pen) => { p.poly([[70, 400], [186, 400], [170, 500], [86, 500]], "#c86a3a", 6); p.line([[128, 400], [128, 320], [180, 340]], "#8a7a3a", 8, false); p.ell(190, 350, 22, 10, "#8a7a3a", 3); };
const cactusDraw = (fl: boolean) => (p: Pen) => { p.poly([[70, 400], [186, 400], [170, 500], [86, 500]], "#c86a3a", 6); p.poly([[100, 400], [156, 400], [156, 150], [100, 150]], "#4a8a4a", 6); p.ell(128, 150, 28, 20, "#4a8a4a", 5); p.band([[100, 280], [60, 280], [60, 210]], "#4a8a4a", 22, 5); p.band([[156, 250], [196, 250], [196, 190]], "#4a8a4a", 22, 5); if (fl) for (const [x, y] of [[128, 128], [60, 196], [196, 176], [128, 230]]) { p.ell(x, y, 22, 22, "#e84a9a", 4); p.ell(x, y, 8, 8, "#ffd23f", 0); } };
const stoneDraw = (moss: number) => (p: Pen) => { p.poly([[30, 240], [60, 120], [150, 70], [230, 130], [250, 240]], "#8a8a8a", 7); if (moss > 0) for (let k = 0; k < 8; k++) p.ell(70 + k * 22, 110 + (k % 3) * 18, 24 * moss, 14 * moss, "#5ab85a", 3); };
const tomatoDraw = (p: Pen) => { p.ell(128, 140, 110, 100, "#e2453c", 7); p.poly([[96, 44], [128, 24], [160, 44], [128, 60]], "#3a8a3a", 4); };
const canDraw = (p: Pen) => { p.poly([[60, 120], [180, 120], [170, 230], [70, 230]], "#5a8ac8", 6); p.band([[180, 140], [250, 80]], "#5a8ac8", 14, 4); for (let k = 0; k < 4; k++) p.ell(250 + k * 2, 100 + k * 30, 6, 10, "#9ad4ff", 0); };
const sackDraw = (p: Pen) => { p.ell(128, 150, 92, 100, "#a8805a", 7); p.g.fillStyle = "#3a2a1a"; p.g.font = "bold 40px Arial"; p.g.textAlign = "center"; p.g.fillText("ABONO", 128, 170); };
const leafDraw = (p: Pen) => p.ell(32, 32, 26, 14, "#a89a3a", 3);
const branchDraw = (p: Pen) => { p.band([[20, 200], [236, 40]], "#7a6a5a", 26, 6); p.band([[130, 120], [200, 150]], "#7a6a5a", 12, 3); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const k = Math.floor(t * 6) % 8;
    const jardinero = { ...VEC(5), jacket: "#5a7a3a", hat: "straw" } as any;
    const tree = (lv: number, fl: number, or: number, branch: number, dry: boolean, x = 0) => fx(`tr|${Math.round(lv * 8)}|${Math.round(fl * 4)}|${Math.round(or * 4)}|${Math.round(branch * 6)}|${dry ? 1 : 0}`, 1024, 1024, treeDraw(lv, fl, or, branch, dry), x, 1.9, -0.2, 3.8, 3.8);
    if (id === S.hook || id === S.end) {
      const T = id === S.hook ? W.manana : 1050;
      const g = smooth((f - T) / 22);
      if (g < 0.2) fx(`pot|${Math.round(Math.min(1, f / 60) * 4)}`, 256, 512, potDraw(Math.min(1, (f - (T - 60)) / 60) * 0.5), 0.4, 0.8, 0.8, 0.8, 1.6);
      else tree(g, 0, 0, 1, false, 0.4);
      person("pim", PIMPIN, -0.4, 0, 1.2, { mode: "stand", expr: g > 0.5 ? "laugh" : "grin", facing: 1, wave: g > 0.5 ? 0.9 : undefined }, 1, true, PIMS);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) { const x = -5 + j * 1.4 + (j > 3 ? 1.2 : 0); person(`m${j}`, VEC(j), x, 0, 1.2, { mode: "stand", expr: "nervous", facing: 0 }, 10 + j, true, 1.0); fx(`w${j}`, 256, 512, wiltDraw, x + 0.45, 0.35, 1.4, 0.35, 0.7); }
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      fx("pp", 256, 512, potDraw(0.8), 0.9, 0.35, 2.5, 0.35, 0.7);
    }
    if (id === S.cactus) {
      fx(`ca|${f > W.flores - 4 ? 1 : 0}`, 256, 512, cactusDraw(f > W.flores - 4), 0.5, 0.6, 1.0, 0.6, 1.2);
      person("pim", PIMPIN, -0.4, 0, 1.2, { mode: "stand", expr: "smile", facing: 1 }, 1, true, PIMS);
      if (f > W.cactus - 4 && f < W.flores) fx("hb", 512, 256, bubbleDraw("¿QUÉ TAL, AMIGO?"), -0.2, 2.4, 1.2, 1.4, 0.7);
    }
    if (id === S.stone) {
      const m = smooth((f - W.musgo + 12) / 14);
      fx(`st|${Math.round(m * 4)}`, 256, 256, stoneDraw(m), 0.4, 0.35, 1.2, 0.8, 0.8);
      person("pim", PIMPIN, -0.4, 0, 1.0, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      fx("can", 256, 256, canDraw, 0.0, 1.0, 1.1, 0.5, 0.5);
    }
    if (id === S.garden) {
      for (let j = 0; j < 3; j++) fx(`tm${j}`, 256, 256, tomatoDraw, -0.2 + j * 0.75, 0.38, 0.8 - j * 0.3, 0.75, 0.75);
      person("pim", PIMPIN, -1.0, 0, 1.2, { mode: "stand", expr: "laugh", facing: 1, wave: 0.9 }, 1, true, PIMS);
      if (f > W.balon - 6) fx("bl", 512, 256, bubbleDraw("¡COMO UN BALÓN!"), 0.25, 2.0, 0.8, 1.5, 0.75);
    }
    if (id === S.dry) {
      const d = smooth((f - W.seca + 20) / 20);
      tree(1 - d * 0.8, 0, 0, 1, d > 0.5);
      if (f > 470) fx("fi", 1024, 512, signDraw(["FIESTA DEL ÁRBOL", "MAÑANA"], "#f2e2b8", "#3a7a2a"), -0.5, 0.75, 1.6, 1.2, 0.6);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j), 0.3 + j * 0.9, 0, 1.4, { mode: "stand", expr: f > W.seca ? "shock" : "smile", facing: -1 }, 10 + j, true, 1.0);
    }
    if (id === S.tries) {
      const leafs = f < W.hojas - 4 ? 0.2 : 0;
      tree(leafs, 0, 0, f < W.rama - 4 ? 1 : 0, true);
      const fell = f > W.encima - 6;
      person("ja", jardinero, 0.9, 0, 1.2, { mode: fell ? "fall" : "stand", expr: fell ? "dazed" : f > W.nada ? "nervous" : "grin", facing: -1, wave: f < 575 ? 0.95 : undefined }, 4, true, 1.0);
      if (f < 575) { fx("can", 256, 256, canDraw, 0.45, 1.4, 1.2, 0.5, 0.5); }
      else if (f < 650) { fx("sk", 256, 256, sackDraw, 0.3, 0.4, 1.4, 0.6, 0.6); if (f > W.hojas - 8) for (let j = 0; j < 5; j++) { const s = ((t * 0.8 + j * 0.2) % 1); fx(`lf${j}`, 64, 64, leafDraw, -0.8 + j * 0.4 + Math.sin(s * 6 + j) * 0.2, 3.0 - s * 2.8, 0.3, 0.18, 0.18); } }
      else { person("al", ALCALDESA, -0.9, 0, 1.2, { mode: "stand", expr: fell ? "shock" : "laugh", facing: 1, wave: fell ? undefined : 0.95 }, 3, true, 1.0); if (!fell) fx(`no|${k % 2}`, 256, 256, noteDraw(k), -0.5, 2.1 + (t % 1) * 0.2, 1.2, 0.4, 0.4); const dr = smooth((f - W.rama + 4) / 10); if (f > W.rama - 6) fx("br", 256, 256, branchDraw, 0.9, 2.8 - dr * 2.4, 1.3, 0.8, 0.8); }
    }
    if (id === S.fix) {
      const lv = smooth((f - W.hojas2 + 14) / 16), fl = smooth((f - W.flores2 + 6) / 10), or = smooth((f - W.naranjas + 6) / 10), br = smooth((f - W.vuelve) / 22);
      tree(lv, fl, or, br, lv < 0.3);
      person("pim", PIMPIN, -0.35, 0, 0.6, { mode: "stand", expr: f > W.hojas2 ? "laugh" : "smile", facing: 1, wave: f > W.mano - 6 && f < W.hojas2 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.susurra - 4 && f < W.hojas2 - 10) fx("ps", 512, 256, bubbleDraw("psss..."), -0.7, 2.2, 0.6, 1.0, 0.5);
      if (f > W.hojas2) for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j), -1.6 + j * 3.4, 0, 1.4, { mode: "stand", expr: "laugh", facing: j ? -1 : 1, wave: 0.9 }, 10 + j, true, 1.0);
      if (f > W.vuelve - 6 && br < 1) person("ja", jardinero, 1.1, 0, 1.2, { mode: "stand", expr: "shock", facing: -1 }, 4, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
