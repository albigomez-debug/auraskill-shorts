// Pimpín 26 · "Vista de lince": a zoom bubble with an ant, the neighbour's newspaper, umbrella and rain cloud, a far blackboard, a haystack with a ring.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, newsDraw, signDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const zoomDraw = (p: Pen) => { p.ell(256, 256, 236, 236, "#e8f4fc", 10); p.ell(256, 300, 70, 46, "#2a1a1a", 0); p.ell(170, 290, 46, 40, "#2a1a1a", 0); p.ell(350, 300, 56, 44, "#2a1a1a", 0); for (let k = 0; k < 3; k++) { p.line([[200 + k * 70, 330], [170 + k * 70, 420]], "#2a1a1a", 8, false); p.line([[220 + k * 70, 270], [190 + k * 70, 190]], "#2a1a1a", 8, false); } p.line([[140, 270], [100, 200]], "#2a1a1a", 6, false); p.ell(160, 280, 10, 10, "#fff", 0); };
const dotDraw = (p: Pen) => p.ell(32, 32, 10, 8, "#2a1a1a", 0);
const umbDraw = (p: Pen) => { p.poly([[10, 140], [128, 20], [246, 140]], "#3a8ac8", 7); p.band([[128, 140], [128, 300]], "#2a2a32", 10, 3); };
const cloudDraw = (k: number) => (p: Pen) => { p.ell(256, 100, 200, 70, "#8a8a98", 6); p.ell(170, 80, 90, 60, "#8a8a98", 0); p.ell(340, 76, 90, 60, "#8a8a98", 0); for (let j = 0; j < 12; j++) { const x = 80 + j * 30, y = 190 + ((j * 37 + k * 40) % 200); p.line([[x, y], [x - 8, y + 34]], "#9ad4ff", 6, false); } };
const deskDraw = (p: Pen) => { p.poly([[0, 0], [256, 0], [256, 40], [0, 40]], "#a8703a", 6); p.poly([[70, -30], [190, -30], [200, 0], [60, 0]], "#f4f1ea", 4); };
const hayDraw = (p: Pen) => { p.poly([[30, 500], [80, 160], [256, 40], [432, 160], [482, 500]], "#e8c45a", 8); for (let j = 0; j < 30; j++) p.line([[60 + (j * 37) % 400, 140 + (j * 53) % 340], [80 + (j * 37) % 400, 110 + (j * 53) % 340]], "#c8a03a", 5, false); };
const ringDraw = (p: Pen) => { p.ell(64, 70, 40, 36, null, 12); p.ell(64, 70, 40, 36, "rgba(0,0,0,0)", 0); p.g.strokeStyle = "#f2c84a"; p.g.lineWidth = 12; p.g.beginPath(); p.g.ellipse(64, 70, 38, 34, 0, 0, Math.PI * 2); p.g.stroke(); p.poly([[52, 20], [76, 20], [64, 40]], "#9ad4ff", 4); };
const lupaDraw = (p: Pen) => { p.ell(90, 90, 70, 70, "rgba(200,230,255,0.5)", 10); p.band([[140, 140], [240, 240]], "#6a4a2a", 22, 5); };
const magnetDraw = (p: Pen) => { p.arc(128, 100, 80, 80, 180, 360, 40, "#d8302a"); p.band([[48, 100], [48, 180]], "#d8302a", 40, 0); p.band([[208, 100], [208, 180]], "#d8302a", 40, 0); p.band([[48, 170], [48, 200]], "#c8c8d0", 40, 0); p.band([[208, 170], [208, 200]], "#c8c8d0", 40, 0); };
const shoeDraw = (p: Pen) => p.arc(128, 128, 90, 90, 200, 340, 26, "#8a8a90");
const strawDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 22; j++) { const x = (j * 71 + k * 50) % 500, y = (j * 43 + k * 37) % 240; p.line([[x, y], [x + 26, y - 10]], "#e8c45a", 6, false); } };
const glassesDraw = (p: Pen) => { p.ell(70, 64, 50, 40, "rgba(200,230,255,0.6)", 9); p.ell(186, 64, 50, 40, "rgba(200,230,255,0.6)", 9); p.line([[120, 60], [136, 60]], "#1a1010", 9, false); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const hay = () => fx("hay", 512, 512, hayDraw, 0.6, 1.1, -0.3, 2.4, 2.4);
    if (id === S.hook || id === S.end) {
      const s0 = id === S.hook ? W.hormiga - 10 : 975;
      person("pim", PIMPIN, -0.4, 0, 1.2, { mode: "stand", expr: f > s0 ? "grin" : "stern", facing: 1, wave: 0.95 }, 1, true, PIMS);
      fx("dot", 64, 64, dotDraw, 0.6, 0.05, -4, 0.2, 0.2);
      if (f > s0) { const s = smooth((f - s0) / 10); fx("zoom", 512, 512, zoomDraw, 0.55, 1.9, 0.9, 0.9 * s, 0.9 * s); }
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "dazed", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.news) {
      person("v", VEC(2), 1.2, 0, -0.6, { mode: "sit", expr: "neutral", facing: -1 }, 10, true, 1.0);
      fx("np", 720, 920, newsDraw("LA GACETA", "¡GANA", "VILLAZANCA!"), 0.85, 1.25, -0.3, 0.85, 1.08);
      person("pim", PIMPIN, -0.6, 0, 1.8, { mode: "stand", expr: f > W.periodico + 20 ? "laugh" : "stern", facing: 1 }, 1, true, PIMS);
    }
    if (id === S.rain) {
      const open = f > W.lluvia - 4;
      person("pim", PIMPIN, 0, 0, 1.4, { mode: "stand", expr: "grin", facing: 0, wave: open ? 0.95 : undefined }, 1, true, PIMS);
      if (open) fx("umb", 256, 320, umbDraw, 0.2, 2.3, 1.5, 1.2, 1.5);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j + 3), -1.4 + j * 2.8, 0, 0.8, { mode: "stand", expr: f > W.nube ? "shock" : "laugh", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
      if (f > W.nube - 6) { const k = Math.floor(t * 8) % 3; fx(`cl|${k}`, 512, 400, cloudDraw(k), 0, 3.0, 0.4, 4, 3.1); }
    }
    if (id === S.exam) {
      fx("pz", 1024, 512, signDraw(["2 + 2 = 4", "OTRO COLEGIO"], "#2a4a3a", "#f4f1ea"), -0.2, 2.6, -7.9, 2.2, 1.1);
      person("pim", PIMPIN, 0, 0, 1.0, { mode: "sit", expr: f > 360 ? "grin" : "stern", facing: 0 }, 1, true, PIMS);
      fx("desk", 256, 64, deskDraw, 0, 0.35, 1.4, 1.2, 0.3);
      for (let j = 0; j < 2; j++) person(`k${j}`, VEC(j), -1.2 + j * 2.4, 0, 0.6, { mode: "sit", expr: "nervous", facing: j ? -1 : 1 }, 10 + j, true, 0.95);
    }
    if (id === S.ring) {
      hay();
      person("alc", ALCALDESA, -0.6, 0, 1.0, { mode: "stand", expr: f > W.anillo ? "shock" : "smile", facing: 1, wave: f > W.anillo ? 0.95 : undefined }, 2, true, 1.0);
      const s = smooth((f - W.anillo + 4) / 26); if (s < 1) fx("ring", 128, 128, ringDraw, -0.3 + s * 0.8, 1.4 + Math.sin(Math.PI * s) * 0.8 - s * 0.3, 0.9 - s * 0.6, 0.2, 0.2);
    }
    if (id === S.tries) {
      hay();
      if (f < 545) { person("v1", VEC(1), -0.8, 0, 1.0, { mode: "stand", expr: f > 529 ? "dazed" : "stern", facing: 1, wave: 0.9 }, 10, true, 1.0); fx("lupa", 256, 256, lupaDraw, -0.35, 1.3, 1.1, 0.5, 0.5); }
      else if (f < 610) { person("v2", VEC(3), -0.8, 0, 1.0, { mode: "stand", expr: f > W.herradura ? "dazed" : "grin", facing: 1, wave: 0.95 }, 11, true, 1.0); fx("mag", 256, 256, magnetDraw, -0.35, 1.45, 1.1, 0.4, 0.4); if (f > W.herradura - 6) fx("hs", 256, 256, shoeDraw, -0.05, 1.45, 1.1, 0.35, 0.35); }
      else { const sc = f > W.revuelve; person("gr", { ...VEC(5), jacket: "#5a7a3a", hat: "straw" } as any, -0.6, 0, 1.0, { mode: "stand", expr: sc ? "laugh" : "grin", facing: 1, wave: 0.95 }, 12, true, 1.0); if (sc) { const k = Math.floor(t * 8) % 3; fx(`st|${k}`, 512, 256, strawDraw(k), 0.3, 2.2 + (f - W.revuelve) * 0.01, 0.6, 4.4, 2.2, true); } }
      person("alc", ALCALDESA, 1.7, 0, 0.9, { mode: "stand", expr: "nervous", facing: -1 }, 2, true, 1.0);
    }
    if (id === S.look) person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: f > 742 ? "stern" : "neutral", facing: 0, wave: f > W.ahi - 4 ? 0.95 : undefined }, 1, true, PIMS);
    if (id === S.found) {
      hay();
      const got = f > W.saca;
      person("pim", PIMPIN, -0.5, 0, 0.9, { mode: "stand", expr: got ? "grin" : "stern", facing: 1, wave: 0.95 }, 1, true, PIMS);
      if (got) fx("ring", 128, 128, ringDraw, -0.25, 1.55, 1.0, 0.22, 0.22);
      person("alc", ALCALDESA, 1.0, 0, 1.4, { mode: "stand", expr: got ? "relief_open" : "nervous", facing: -1 }, 2, true, 1.0);
      if (f > W.gafas - 4) { const s = smooth((f - W.gafas + 4) / 24); fx("gl", 256, 128, glassesDraw, -0.25 + s * 1.27, 1.35 + s * 0.12, 1.0 + s * 0.45, 0.35, 0.17); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
