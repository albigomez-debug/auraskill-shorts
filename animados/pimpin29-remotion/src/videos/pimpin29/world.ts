// Pimpín 29 · "Suerte": gold coins, an umbrella from the sky, buttered toast, a raffle stall, a runaway melon cart heading for the market stall at x 3.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, signDraw, bubbleDraw, coinDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const NOCAP = { ...PIMPIN, hat: "hair", hair: "#5a3a1a" } as any;
const umbDraw = (p: Pen) => { p.poly([[10, 140], [128, 20], [246, 140]], "#e2453c", 7); p.band([[128, 140], [128, 300]], "#2a2a32", 10, 3); };
const cloudDraw = (k: number) => (p: Pen) => { p.ell(256, 100, 200, 70, "#8a8a98", 6); for (let j = 0; j < 12; j++) { const x = 80 + j * 30, y = 190 + ((j * 37 + k * 40) % 200); p.line([[x, y], [x - 8, y + 34]], "#9ad4ff", 6, false); } };
const toastDraw = (up: boolean) => (p: Pen) => { p.poly([[30, 60], [226, 60], [226, 200], [30, 200]], "#d8a05a", 7); if (up) p.poly([[50, 80], [206, 80], [206, 180], [50, 180]], "#f2e27a", 0); };
const teddyDraw = (p: Pen) => { p.ell(128, 170, 70, 70, "#c89a6a", 6); p.ell(128, 80, 54, 50, "#c89a6a", 6); p.ell(84, 40, 20, 20, "#c89a6a", 5); p.ell(172, 40, 20, 20, "#c89a6a", 5); p.ell(110, 76, 6, 6, "#1a1010", 0); p.ell(146, 76, 6, 6, "#1a1010", 0); };
const cartDraw = (ph: number, stopped = false) => (p: Pen) => { for (let k = 0; k < 6; k++) p.ell(110 + (k % 3) * 90, 90 - Math.floor(k / 3) * 50, 52, 42, "#3a8a3a", 6); p.poly([[40, 110], [400, 110], [380, 220], [60, 220]], "#a8703a", 8); for (const x of [110, 330]) { p.ell(x, 250, 56, 56, "#6a4a2a", 7); const a = stopped ? 0 : ph; p.line([[x - Math.cos(a) * 50, 250 - Math.sin(a) * 50], [x + Math.cos(a) * 50, 250 + Math.sin(a) * 50]], "#3a2a1a", 6, false); } p.line([[400, 140], [500, 120]], "#6a4a2a", 10, false); };
const sackDraw = (p: Pen) => { p.poly([[40, 230], [30, 80], [80, 30], [176, 30], [226, 80], [216, 230]], "#c8b07a", 7); };
const capDraw = (p: Pen) => { p.ell(128, 110, 90, 70, "#e2453c", 7); p.poly([[128, 140], [250, 150], [250, 170], [128, 170]], "#c8302a", 6); };
const stallDraw = (p: Pen) => { p.poly([[20, 200], [492, 200], [492, 500], [20, 500]], "#a8703a", 8); for (let k = 0; k < 6; k++) p.poly([[20 + k * 79, 40], [99 + k * 79, 40], [99 + k * 79, 200], [20 + k * 79, 200]], k % 2 ? "#f4f1ea" : "#e2453c", 5); p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText("MERCADO", 256, 380); };
const COIN = coinDraw("€");

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const frutero = { ...VEC(3), jacket: "#5a7a3a", hat: "straw" } as any;
    const cart = (x: number, stopped = false) => { const k = stopped ? 0 : Math.round(t * 8) % 6; fx(`cart|${k}|${stopped ? 1 : 0}`, 512, 320, cartDraw(k * 1.05, stopped), x, 0.6, 0.8, 1.9, 1.19); };
    if (id === S.hook || id === S.end) {
      const T0 = id === S.hook ? W.tropieza : 1080, fell = f > T0 - 2 && f < T0 + 24;
      person("pim", PIMPIN, -0.3, 0, 1.4, { mode: fell ? "fall" : "stand", expr: fell ? "shock" : f > T0 + 24 ? "laugh" : "smile", facing: 1, wave: f > T0 + 30 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > T0 + 24) fx("coin", 256, 256, COIN, 0.1, 1.55 + Math.sin(t * 4) * 0.04, 1.6, 0.3, 0.3);
      fx("rock", 128, 64, (p: Pen) => p.ell(64, 32, 50, 24, "#8a8a90", 5), 0.2, 0.08, 1.6, 0.3, 0.15);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "pained", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.rain) {
      if (f > W.llueve - 10) { const k = Math.floor(t * 8) % 3; fx(`cl|${k}`, 512, 400, cloudDraw(k), 0, 3.2, 0.4, 4, 3.1); }
      const s = smooth((f - W.paraguas + 24) / 24);
      if (s > 0) fx("umb", 256, 320, umbDraw, 0.25, 5 - s * 2.7, 1.5, 1.2, 1.5);
      person("pim", PIMPIN, 0, 0, 1.4, { mode: "stand", expr: s >= 1 ? "laugh" : "smile", facing: 0, wave: s >= 1 ? 0.95 : undefined }, 1, true, PIMS);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j + 2), -1.4 + j * 2.8, 0, 0.8, { mode: "stand", expr: f > W.llueve ? "pained" : "neutral", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.toast) {
      const s = smooth((f - W.tostada + 6) / 26), up = Math.floor(s * 5) % 2 === 0 || s >= 1;
      fx("tbl", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#a8603a", 5), 0.5, 0.7, 1.55, 1.0, 0.2);
      fx(`ts|${up ? 1 : 0}`, 256, 256, toastDraw(up), 0.5, 1.5 - s * 0.68, 1.6, 0.3, s >= 1 ? 0.12 : 0.3);
      person("pim", PIMPIN, -0.3, 0, 1.4, { mode: "stand", expr: s >= 1 ? "grin" : "shock", facing: 1 }, 1, true, PIMS);
    }
    if (id === S.raffle) {
      fx("sg", 1024, 512, signDraw(["TÓMBOLA"], "#f2e2b8", "#c8202a"), 0.6, 2.6, -0.6, 1.8, 0.9);
      person("st", { ...VEC(2), jacket: "#c8202a" }, 1.2, 0, 0.4, { mode: "stand", expr: f > W.premio ? "dazed" : "grin", facing: -1, wave: f > W.premio - 6 ? 0.95 : undefined }, 10, true, 1.0);
      person("pim", PIMPIN, -0.2, 0, 1.4, { mode: "stand", expr: f > W.premio ? "laugh" : "smile", facing: 1, wave: f > W.premio ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.premio - 4) { const s = smooth((f - W.premio + 4) / 14); fx("ted", 256, 256, teddyDraw, 0.9 - s * 0.9, 1.3 + s * 0.3, 0.6 + s * 0.9, 0.55, 0.55); }
    }
    if (id === S.cart) {
      fx("stall", 512, 520, stallDraw, 3.4, 1.3, -0.6, 2.4, 2.4);
      cart(-4.0 + smooth((f - 402) / 130) * 4.4);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j), 2.0 + j * 0.8, 0, 1.8, { mode: "stand", expr: f > W.frenos ? "shock" : "neutral", facing: -1 }, 10 + j, true, 1.0);
    }
    if (id === S.tries) {
      fx("stall", 512, 520, stallDraw, 3.4, 1.3, -0.6, 2.4, 2.4);
      const cx = 0.4 + (f - 530) * 0.004; const jump = f > W.saltan - 4 && f < W.saltan + 16 ? Math.sin(Math.PI * (f - W.saltan + 4) / 20) * 0.5 : 0;
      fx(`cartj|${Math.round(jump * 10)}`, 512, 320, cartDraw(Math.round(t * 8) * 1.05), cx, 0.6 + jump, 0.8, 1.9, 1.19);
      if (f < 590) person("fr", frutero, cx - 1.6, 0, 1.2, { mode: "march", phase: t * 7, expr: f > 571 ? "dazed" : "stern", facing: 1 }, 11, true, 1.0);
      else if (f < 640) for (let j = 0; j < 3; j++) fx(`sk${j}`, 256, 256, sackDraw, 1.6 + j * 0.25, 0.3, 1.0 + j * 0.05, 0.6, 0.6);
      else { const run = f > W.corriendo - 4; person("alc", ALCALDESA, run ? 2.0 + (f - W.corriendo) * 0.05 : 2.0, 0, 1.2, { mode: run ? "march" : "stand", phase: t * 8, expr: run ? "shock" : "stern", facing: run ? 1 : -1, wave: !run && f > W.brazos - 6 ? 0.95 : undefined }, 2, true, 1.0); }
    }
    if (id === S.sneeze) {
      const sn = f > W.estornuda - 3 && f < W.estornuda + 14, capOff = f > W.gorra - 2, bend = f > W.agacha - 2;
      person(capOff ? "pimN" : "pim", capOff ? NOCAP : PIMPIN, 0, 0, 1.2, { mode: bend ? "sit" : "stand", expr: sn ? "shock" : bend ? "smile" : "nervous", facing: 0 }, 1, true, PIMS);
      if (sn) fx("ach", 512, 256, bubbleDraw("¡ACHÍS!"), 0.6, 2.0, 1.1, 0.9, 0.45);
      if (capOff) { const s = smooth((f - W.gorra + 2) / 14); fx("cap", 256, 256, capDraw, 0.35 + s * 0.2, 1.75 - s * 1.65, 1.5, 0.35, 0.3); }
    }
    if (id === S.stop) {
      fx("stall", 512, 520, stallDraw, 3.4, 1.3, -0.6, 2.4, 2.4);
      const stopped = f > W.frena - 2; const cx = stopped ? 1.6 : 0.2 + (f - 860) * 0.03;
      cart(cx, stopped);
      if (f < W.levantar) fx("cap", 256, 256, capDraw, 1.06, 0.1, 1.25, 0.35, 0.3);
      const gotCap = f > W.levantar;
      person(gotCap ? "pim" : "pimN", gotCap ? PIMPIN : NOCAP, 0.4, 0, 1.6, { mode: f > 900 && !gotCap ? "sit" : "stand", expr: gotCap ? "laugh" : "smile", facing: 1, wave: gotCap ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.moneda2 - 4) fx("coin", 256, 256, COIN, 0.7, 1.75, 1.7, 0.3, 0.3);
      person("fr", frutero, 2.4, 0, 1.4, { mode: "stand", expr: stopped ? "relief_open" : "shock", facing: -1 }, 11, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
