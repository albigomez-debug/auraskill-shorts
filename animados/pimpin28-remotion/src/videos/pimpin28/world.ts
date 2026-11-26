// Pimpín 28 · "Manitas": bike with a fork, a wobbly chair, grandpa's radio, a TV, the plaza clock tower (0, z -7.7) with a face at y 7.6.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, noteDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const towerDraw = (p: Pen) => { p.poly([[40, 1000], [40, 160], [216, 160], [216, 1000]], "#d8c8a8", 8); p.poly([[20, 170], [128, 20], [236, 170]], "#a8402a", 8); for (let y = 520; y < 960; y += 120) p.poly([[100, y], [156, y], [156, y + 60], [100, y + 60]], "#7ab0e8", 5); };
const clockDraw = (h: number, m: number, dropMin = false) => (p: Pen) => { p.ell(128, 128, 116, 116, "#f4f1ea", 9); for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; p.ell(128 + Math.sin(a) * 96, 128 - Math.cos(a) * 96, 6, 6, "#1a1010", 0); } p.line([[128, 128], [128 + Math.sin(h) * 50, 128 - Math.cos(h) * 50]], "#1a1010", 12, false); if (!dropMin) p.line([[128, 128], [128 + Math.sin(m) * 84, 128 - Math.cos(m) * 84]], "#1a1010", 8, false); p.ell(128, 128, 10, 10, "#1a1010", 0); };
const handDraw = (p: Pen) => p.band([[10, 64], [240, 64]], "#1a1010", 14, 0);
const bikeDraw = (fixed: boolean) => (p: Pen) => { p.ell(110, 190, 80, 80, null, 12); p.ell(400, 190, 80, 80, null, 12); p.line([[110, 190], [220, 100], [330, 100], [400, 190]], fixed ? "#3a8ac8" : "#8a8a90", 12, false); p.line([[220, 100], [250, 190], [110, 190]], fixed ? "#3a8ac8" : "#8a8a90", 12, false); if (fixed) { p.line([[330, 100], [356, 40]], "#c8c8d0", 8, false); for (let k = 0; k < 3; k++) p.line([[350 + k * 8, 40], [356 + k * 8, 16]], "#c8c8d0", 4, false); } };
const forkDraw = (p: Pen) => { p.band([[64, 120], [64, 40]], "#c8c8d0", 8, 3); for (let k = 0; k < 3; k++) p.line([[54 + k * 10, 40], [54 + k * 10, 6]], "#c8c8d0", 4, false); };
const chairDraw = (p: Pen) => { p.poly([[40, 120], [216, 120], [216, 150], [40, 150]], "#a8703a", 6); p.poly([[40, 10], [70, 10], [70, 120], [40, 120]], "#a8703a", 6); for (const x of [50, 200]) p.band([[x, 150], [x, 250]], "#a8703a", 14, 4); };
const radioDraw = (p: Pen) => { p.poly([[20, 60], [236, 60], [236, 200], [20, 200]], "#8a5a2a", 7); p.ell(80, 130, 40, 40, "#3a2a22", 5); p.poly([[140, 90], [216, 90], [216, 120], [140, 120]], "#e8c45a", 4); p.line([[200, 60], [240, 10]], "#6a6a72", 5, false); };
const gumDraw = (p: Pen) => p.ell(64, 64, 30, 24, "#f49ac0", 5);
const tvDraw = (on: boolean) => (p: Pen) => { p.poly([[20, 20], [492, 20], [492, 320], [20, 320]], "#3a3a42", 8); p.poly([[50, 50], [462, 50], [462, 290], [50, 290]], on ? "#7ac8f0" : "#1a1a1e", 4); if (on) { p.ell(256, 170, 70, 70, "#ffd23f", 0); p.poly([[50, 290], [200, 180], [300, 240], [462, 150], [462, 290]], "#5ab85a", 0); } else for (let k = 0; k < 6; k++) p.line([[60 + k * 70, 60], [100 + k * 70, 280]], "#4a4a52", 4, false); };
const boxDraw = (p: Pen) => { p.poly([[20, 80], [236, 80], [236, 200], [20, 200]], "#d8302a", 7); p.arc(128, 80, 50, 40, 180, 360, 12, "#6a6a72"); };
const springDraw = (p: Pen) => { const pts: [number, number][] = []; for (let k = 0; k <= 40; k++) pts.push([64 + Math.sin(k * 0.8) * 30, 10 + k * 2.7]); p.line(pts, "#c8c8d0", 6, false); };
const screwDraw = (p: Pen) => { p.poly([[40, 20], [88, 20], [88, 40], [40, 40]], "#c8c8d0", 5); p.poly([[56, 40], [72, 40], [64, 116]], "#c8c8d0", 4); };
const pinDraw = (p: Pen) => p.line([[30, 10], [30, 118], [44, 118], [44, 20], [56, 20], [56, 100]], "#1a1a1e", 6, false);
const oilDraw = (p: Pen) => { p.poly([[40, 60], [120, 60], [120, 160], [40, 160]], "#3a8a3a", 6); p.line([[120, 70], [180, 30]], "#3a8a3a", 8, false); };
const stickDraw = (p: Pen) => p.band([[10, 246], [246, 10]], "#8a5a2a", 16, 4);
const CLK: [number, number, number] = [0, 7.6, -7.55];

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    fx("tower", 256, 1000, towerDraw, 0, 5.0, -7.7, 3.2, 10.2);
    const running = id === S.fixed && f > W.tic - 2;
    const stopped = id === S.clock && f > W.para || id === S.tries || (id === S.fixed && !running) || id === S.box;
    const tt = stopped ? 2.0 : t;
    const dropMin = (id === S.tries && f > W.volando - 6) || (id === S.fixed && f < W.sola) || id === S.box;
    const mm = Math.round((tt * 1.2) * 12) / 12, hh = mm / 12 + 2.2;
    fx(`clk|${mm.toFixed(2)}|${dropMin ? 1 : 0}`, 256, 256, clockDraw(hh, mm * Math.PI * 2 / 1, dropMin), CLK[0], CLK[1], CLK[2], 1.8, 1.8);
    const relojero = { ...VEC(4), jacket: "#5a4a3a", hat: "hair", hair: "#d8d8d8", moustache: "#d8d8d8" } as any;
    const herrero = { ...VEC(0), jacket: "#3a3a42", hat: "hair" } as any;
    if (id === S.hook || id === S.end) {
      const fixed = f > (id === S.hook ? W.tenedor - 10 : 1095);
      fx(`bike|${fixed ? 1 : 0}`, 512, 280, bikeDraw(fixed), 0.5, 0.55, 1.4, 1.5, 0.82);
      person("pim", PIMPIN, -0.5, 0, 1.6, { mode: "stand", expr: fixed ? "grin" : "stern", facing: 1, wave: 0.95 }, 1, true, PIMS);
      if (!fixed) fx("fork", 128, 128, forkDraw, -0.15, 1.45, 1.7, 0.25, 0.25);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "dazed", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1, true, PIMS);
    }
    if (id === S.chair) {
      const wob = f < W.segundo ? Math.sin(t * 14) * 0.06 : 0;
      fx("chair", 256, 256, chairDraw, 0.6 + wob, 0.5, 1.2, 0.8, 0.8);
      person("pim", PIMPIN, -0.4, 0, 1.6, { mode: "stand", expr: f > W.segundo ? "grin" : "stern", facing: 1, wave: f > W.segundo - 10 && f < W.segundo ? 0.95 : undefined }, 1, true, PIMS);
    }
    if (id === S.radio) {
      fx("radio", 256, 256, radioDraw, 0.3, 1.0, 1.3, 0.6, 0.6);
      fx("tbl", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#a8603a", 5), 0.3, 0.7, 1.25, 1.0, 0.2);
      if (f > W.chicle - 6) fx("gum", 128, 128, gumDraw, 0.5, 1.15, 1.35, 0.12, 0.12);
      if (f > W.chicle) fx(`nt|${Math.floor(t * 4) % 2}`, 256, 256, noteDraw(Math.floor(t * 4) % 2), 0.6, 1.6 + (t % 1) * 0.2, 1.3, 0.35, 0.35);
      person("ab", { ...VEC(4), hat: "hair", hair: "#e8e8e8", moustache: "#e8e8e8" } as any, 1.3, 0, 0.9, { mode: "stand", expr: f > W.chicle ? "laugh" : "dazed", facing: -1 }, 6, true, 1.0);
      person("pim", PIMPIN, -0.6, 0, 1.6, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
    }
    if (id === S.tv) {
      const on = f > W.nueva - 14;
      fx(`tv|${on ? 1 : 0}`, 512, 340, tvDraw(on), 0.4, 1.1, 1.0, 1.1, 0.73);
      person("pim", PIMPIN, -0.6, 0, 1.6, { mode: "stand", expr: on ? "laugh" : "stern", facing: 1, wave: on ? 0.95 : undefined }, 1, true, PIMS);
    }
    if (id === S.clock) {
      for (let j = 0; j < 5; j++) person(`r${j}`, VEC(j), -2.4 + j * 1.2, 0, 0.6, { mode: "stand", expr: f > W.para + 20 ? "shock" : "grin", facing: 0 }, 10 + j, true, 1.0);
      person("alc", ALCALDESA, 2.8, 0, 1.4, { mode: "stand", expr: "nervous", facing: -1 }, 2, true, 1.0);
    }
    if (id === S.tries) {
      if (f < 580) { const hit = f > W.golpes - 4 && f < W.golpes + 20 ? Math.sin(t * 30) : 0; person("rel", relojero, -1.2, 6.2, -7.2, { mode: "stand", expr: f > 570 ? "dazed" : "stern", facing: 1, wave: 0.95 }, 10, false, 1.0); fx("ham", 128, 128, stickDraw, -0.85 + hit * 0.1, 7.5, -7.15, 0.4, 0.4); }
      else if (f < 655) { person("her", herrero, -1.2, 6.2, -7.2, { mode: "stand", expr: f > W.cae ? "shock" : "grin", facing: 1, wave: 0.95 }, 11, false, 1.0); const fall = f > W.cae ? (f - W.cae) * 0.15 : 0; fx("oil", 256, 256, oilDraw, -0.8, 7.5 - fall, -7.15, 0.4, 0.4); }
      else { person("alc", ALCALDESA, -1.2, 6.2, -7.2, { mode: "stand", expr: f > W.volando ? "shock" : "stern", facing: 1, wave: 0.95 }, 2, false, 1.0); fx("stk", 256, 256, stickDraw, -0.6, 7.4, -7.15, 0.9, 0.9); if (f > W.volando - 6) { const s = (f - W.volando + 6) * 0.05; fx("hand", 256, 128, handDraw, 0.4 + s * 3, 7.8 + s * 2, -7.0, 0.9, 0.45); } }
      fx("bal", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#8a5a2a", 5), -0.9, 6.15, -7.3, 1.6, 0.2);
    }
    if (id === S.box) {
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: "stern", facing: 0, wave: 0.95 }, 1, true, PIMS);
      if (f > W.caja - 4) fx("box", 256, 256, boxDraw, -0.35, 0.95, 1.4, 0.4, 0.4);
      if (f > W.muelle - 2) fx("spr", 128, 128, springDraw, 0.35, 1.7, 1.4, 0.2, 0.2);
      if (f > W.tornillo - 2) fx("scr", 128, 128, screwDraw, 0.45, 1.4, 1.4, 0.18, 0.18);
      if (f > W.horquilla - 2) fx("pin", 128, 128, pinDraw, 0.25, 1.25, 1.4, 0.18, 0.18);
    }
    if (id === S.fixed) {
      if (f > 980 && f < 1025) for (let j = 0; j < 5; j++) person(`r${j}`, VEC(j), -2.4 + j * 1.2 + Math.max(0, f - W.carrera) * 0.06, 0, 0.6, { mode: f > W.carrera ? "march" : "stand", phase: t * 6 + j, expr: "laugh", facing: 1 }, 10 + j, true, 1.0);
      if (f > W.vuelve - 6 && f < W.sola) { const s = smooth((f - W.vuelve + 6) / 25); fx("hand", 256, 128, handDraw, 3 - s * 2.6, 10 - s * 2.2, -7.0, 0.9, 0.45); }
      if (f < 960) person("pim", PIMPIN, -1.2, 6.2, -7.2, { mode: "stand", expr: "grin", facing: 1, wave: 0.95 }, 1, false, PIMS);
      if (f < 960) fx("bal", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#8a5a2a", 5), -0.9, 6.15, -7.3, 1.6, 0.2);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
