// Pimpín 36 · "Calculadora": counting stars with fingers to spare, rice grains, raindrops, change for the shopkeeper; the pumpkin contest scale breaks; Pimpín weighs by eye.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, signDraw, coinDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const starsDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 14; j++) { const x = 40 + ((j * 173) % 940), y = 30 + ((j * 97) % 420), r = 16 + (j % 3) * 6 + ((j + k) % 2) * 4; p.poly(Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5 - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; return [x + Math.cos(a) * rr, y + Math.sin(a) * rr] as [number, number]; }), "#ffe88a", 3); } };
const sackDraw = (p: Pen) => { p.ell(128, 150, 92, 100, "#d8c49a", 7); p.poly([[96, 60], [160, 60], [176, 24], [80, 24]], "#c8b48a", 5); p.g.fillStyle = "#6a4a2a"; p.g.font = "bold 44px Arial"; p.g.textAlign = "center"; p.g.fillText("ARROZ", 128, 170); };
const cloudDraw = (p: Pen) => { p.ell(160, 130, 110, 70, "#f4f8fc", 6); p.ell(300, 110, 120, 86, "#f4f8fc", 6); p.ell(400, 140, 90, 60, "#f4f8fc", 6); for (let k = 0; k < 8; k++) p.poly([[120 + k * 40, 220], [128 + k * 40, 250], [112 + k * 40, 250]], "#6ab4e8", 2); };
const counterDraw = (p: Pen) => { p.poly([[0, 40], [1024, 40], [1024, 256], [0, 256]], "#a8703a", 8); p.poly([[0, 0], [1024, 0], [1024, 40], [0, 40]], "#c8904a", 6); };
const pumpDraw = (s: number, ribbon = false) => (p: Pen) => { const r = 110 + s * 70; for (const dx of [-0.5, 0, 0.5]) p.ell(256 + dx * r, 490 - r * 0.8, r * 0.55, r * 0.8, "#f28a2a", 6); p.band([[256, 490 - r * 1.6], [266, 490 - r * 1.6 - 40]], "#4a7a2a", 14, 4); if (ribbon) p.ell(256, 490 - r * 0.8, 50, 50, "#3a5ab8", 5); };
const scaleDraw = (broken: boolean) => (p: Pen) => { p.poly([[40, 300], [472, 300], [472, 360], [40, 360]], "#8a8a92", 7); p.band([[256, 300], [256, 140]], "#5a5a62", 20, 4); p.ell(256, 110, 80, 60, "#f4f1ea", 6); if (broken) { p.line([[200, 80], [300, 150], [230, 140]], "#1a1a1e", 6, false); p.band([[256, 110], [330, 60]], "#c8202a", 8, 0); } else p.band([[256, 110], [256, 70]], "#c8202a", 8, 0); };
const seesawDraw = (tilt: number) => (p: Pen) => { p.poly([[230, 250], [282, 250], [256, 160]], "#7a4a2a", 6); const dy = tilt * 120; p.band([[30, 160 + dy], [482, 160 - dy]], "#a8703a", 22, 5); };
const sparkDraw = (p: Pen) => { for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; p.band([[128 + Math.cos(a) * 40, 128 + Math.sin(a) * 40], [128 + Math.cos(a) * 110, 128 + Math.sin(a) * 110]], "#ffd23f", 12, 3); } };
const cupDraw = (p: Pen) => { p.poly([[70, 40], [186, 40], [170, 140], [86, 140]], "#f2c84a", 7); p.poly([[110, 140], [146, 140], [150, 200], [106, 200]], "#f2c84a", 6); p.poly([[70, 200], [186, 200], [186, 236], [70, 236]], "#a8703a", 6); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const juez = { ...VEC(4), hat: "hair", hair: "#e8e8e8", moustache: "#e8e8e8", jacket: "#2a2a3a" } as any;
    const abuela = { ...VEC(2), hat: "hair", hair: "#e8e8e8", dress: "#6a4a8a", jacket: "#6a4a8a" } as any;
    const tendero = { ...VEC(3), jacket: "#f4f1ea", hat: "cap", cap: "#3a8a3a" } as any;
    if (id === S.hook || id === S.end) {
      fx(`stars|${Math.floor(t * 2) % 2}`, 1024, 512, starsDraw(Math.floor(t * 2)), 0, 4.0, -1.0, 6, 3);
      const d = id === S.hook ? W.dedos : 1020;
      person("v0", VEC(1), -0.5, 0, 0.6, { mode: "stand", expr: f > d ? "dazed" : "neutral", facing: 0, wave: 0.95 }, 10, true, 1.0);
      if (f > d - 4) fx("dd", 512, 256, bubbleDraw("...¿Y ESTOS?"), -0.5, 2.6, 0.6, 1.3, 0.65);
      person("pim", PIMPIN, 0.8, 0, 0.9, { mode: "stand", expr: "grin", facing: -1 }, 1, true, PIMS);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: j % 2 ? "dazed" : "nervous", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.rice) {
      fx("sack", 256, 256, sackDraw, 0.7, 0.55, 1.0, 1.0, 1.0);
      person("pim", PIMPIN, -0.4, 0, 1.2, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      if (f > W.arroz - 4) fx("ar", 512, 256, bubbleDraw("1.284.567"), -0.2, 2.5, 1.2, 1.4, 0.7);
      else if (f < 230) fx("ca", 512, 256, bubbleDraw("¡BIP BIP!"), -0.2, 2.5, 1.2, 1.2, 0.6);
    }
    if (id === S.cloud) {
      fx("cloud", 512, 256, cloudDraw, 0.3, 3.0, 0.4, 1.8, 0.9);
      person("pim", PIMPIN, -0.3, 0, 1.2, { mode: "stand", expr: "grin", facing: 0, wave: 0.95 }, 1, true, PIMS);
      if (f > W.nube - 4) fx("gt", 512, 256, bubbleDraw("4.000.002"), -0.6, 2.2, 1.2, 1.3, 0.65);
    }
    if (id === S.shop) {
      fx("cnt", 1024, 256, counterDraw, 0.3, 0.5, 0.6, 2.6, 0.65);
      person("te", tendero, 0.9, 0, 0.0, { mode: "stand", expr: f > W.cambio ? "shock" : "neutral", facing: -1 }, 3, true, 1.0);
      person("pim", PIMPIN, -0.7, 0, 1.2, { mode: "stand", expr: "grin", facing: 1, wave: f > W.cambio - 6 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.cambio - 6) for (let k = 0; k < 3; k++) fx(`co${k}`, 256, 256, coinDraw("1"), 0.0 + k * 0.25, 1.15 + smooth((f - W.cambio + 6 - k * 3) / 10) * 0.05, 0.7, 0.25, 0.25);
    }
    const pumps = (ribbon: boolean, a0 = 1, a1 = 1) => { fx(`pA|${ribbon ? 1 : 0}`, 512, 512, pumpDraw(1.0, ribbon), -0.9, 0.7 * a0, 0.4, 1.4, 1.4); fx("pB", 512, 512, pumpDraw(0.98), 1.0, 0.7 * a1, 0.4, 1.4, 1.4); };
    if (id === S.contest) {
      pumps(false);
      fx(`sc|${f > W.rompe - 4 ? 1 : 0}`, 512, 512, scaleDraw(f > W.rompe - 4), 0.05, 0.55, 0.6, 1.1, 1.1);
      fx("cc", 1024, 512, signDraw(["CONCURSO", "DE CALABAZAS"], "#f2e2b8", "#c86a1a"), 0, 2.6, -0.4, 2.0, 1.0);
      if (f > W.rompe) fx("q", 512, 256, bubbleDraw("¿CUÁL PESA MÁS?"), 0.0, 1.5, 0.9, 1.6, 0.8);
    }
    if (id === S.tries) {
      if (f < 610) {
        pumps(false);
        const lift = f > W.levanta - 4 && f < W.cae ? smooth((f - W.levanta + 4) / 10) * 0.6 : 0;
        person("ju", juez, 0.1, 0, 1.2, { mode: "stand", expr: f > W.cae ? "pained" : f > W.nada - 4 ? "nervous" : "stern", facing: 0, wave: lift > 0 ? 0.95 : undefined }, 4, true, 1.0);
        if (lift > 0) fx("pL", 512, 512, pumpDraw(0.5), 0.1, 1.5 + lift, 1.3, 0.6, 0.6);
        if (f > W.cae) { fx("pF", 512, 512, pumpDraw(0.5), 0.35, 0.3, 1.4, 0.6, 0.6); fx("ay", 512, 256, bubbleDraw("¡AY!"), 0.6, 2.3, 1.2, 1.0, 0.5); }
      } else {
        const fly = smooth((f - W.volando + 6) / 30);
        const tilt = f < W.volando - 6 ? -0.6 : -0.6 + smooth((f - W.volando + 6) / 6) * 1.2;
        fx(`ss|${Math.round(tilt * 10)}`, 512, 256, seesawDraw(tilt), 0.3, 0.6, 0.8, 2.6, 1.3);
        fx("pS", 512, 512, pumpDraw(0.8), 1.2, 0.62 - (tilt + 0.6) * 0.2, 0.85, 0.8, 0.8);
        person("al", ALCALDESA, -0.6 + fly * 0.4, 0.3 + (1 - (tilt + 0.6) / 1.2) * 0.0 + fly * 2.2, 0.9, { mode: "stand", expr: fly > 0 ? "shock" : "grin", facing: 0, wave: fly > 0 ? 0.95 : undefined }, 3, false, 1.0);
      }
    }
    if (id === S.count) {
      pumps(false);
      person("pim", PIMPIN, -0.3, 0, 1.6, { mode: "stand", expr: f > W.cuenta ? "grin" : "stern", facing: 0, wave: f > W.mide - 6 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.cuenta - 2 && f < W.tres) fx(`ct|${Math.floor(t * 8) % 4}`, 512, 256, bubbleDraw(["148...", "203...", "277...", "305..."][Math.floor(t * 8) % 4]), -0.3, 2.6, 1.6, 1.2, 0.6);
      if (f > W.tres - 2) fx("312", 512, 256, bubbleDraw("¡312 KILOS!", "#ffd23f"), -0.3, 2.6, 1.6, 1.6, 0.8);
    }
    if (id === S.win) {
      pumps(f > W.abuela - 6);
      if (f > W.abuela - 6) fx("spk", 256, 256, sparkDraw, -0.8, 1.6, 0.35, 0.9, 0.9);
      person("ab", abuela, -1.4, 0, 1.0, { mode: "stand", expr: f > W.abuela ? "laugh" : "nervous", facing: 1, wave: f > W.abuela ? 0.95 : undefined }, 5, true, 1.0);
      person("pim", PIMPIN, 0.1, 0, 1.6, { mode: "stand", expr: "laugh", facing: 0 }, 1, true, PIMS);
      fx("cup", 256, 256, cupDraw, 1.4, 0.45, 1.2, 0.9, 0.9);
      const land = smooth((f - W.aterriza + 30) / 30);
      person("al", ALCALDESA, 1.4, 3.6 - land * 2.8, 1.15, { mode: land > 0.98 ? "sit" : "stand", expr: land > 0.98 ? "dazed" : "shock", facing: 0, wave: land < 0.98 ? 0.95 : undefined }, 3, false, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
