// "382 días sin comer": a bright mint hospital (origin), a grey Scottish street (TOWN) and the family chip shop (SHOP).
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { flatGround, tree, ctaDraw, exDraw, labelDraw, docDraw } from "./props";
import { smooth, clamp01 } from "./story";
import { S, W, TOWN, SHOP } from "./story";

const ANGUS = (fat: boolean): Outfit => ({ jacket: "#3a6a4a", pants: "#3a3a44", boots: "#2a1a1a", hat: "hair", hair: "#c8642a", skin: SKINS[0], belt: null, buttons: "#e8d8b8", build: fat ? "stout" : "adult" });
const DOC = (v: number): Outfit => ({ jacket: "#f4f6f8", pants: "#5a6a8a", boots: "#2a2a2a", hat: "hair", hair: ["#9a9a9a", "#3a2a1a"][v % 2], skin: SKINS[(v + 1) % 4], belt: null, buttons: "#bbb", moustache: v ? undefined : "#9a9a9a" });
const FOLK = (v: number): Outfit => ({ jacket: ["#8a5a3a", "#4a5a7a", "#7a3a3a"][v % 3], pants: "#3a3a40", boots: "#2a1a1a", hat: v % 2 ? "cap" : "hair", cap: "#5a5a4a", hair: "#3a2a1a", skin: SKINS[v % 4], belt: null, buttons: "#c8c0b0" });
const counterDraw = (big: string, small: string, col = "#2a2a30") => (p: Pen) => { p.poly([[20, 20], [492, 20], [492, 300], [20, 300]], "#f8f6f0", 8); p.poly([[20, 20], [492, 20], [492, 90], [20, 90]], col, 8); p.g.fillStyle = "#fff"; p.g.font = "bold 50px Arial"; p.g.textAlign = "center"; p.g.fillText(small, 256, 72); p.g.fillStyle = "#2a2a30"; p.g.font = "bold 150px Arial"; p.g.fillText(big, 256, 260); };
const scaleDraw = (kg: number) => (p: Pen) => { p.poly([[40, 120], [472, 120], [452, 300], [60, 300]], "#d8dce2", 8); p.poly([[110, 150], [402, 150], [402, 260], [110, 260]], "#1a2a1a", 5); p.g.fillStyle = "#6aff8a"; p.g.font = "bold 90px 'Courier New', monospace"; p.g.textAlign = "center"; p.g.fillText(`${Math.round(kg)} kg`, 256, 235); };
const plateDraw = (egg: boolean) => (p: Pen) => { p.ell(256, 160, 220, 80, "#f8f8f8", 7); p.ell(256, 160, 160, 54, "#eef2f4", 3); if (egg) { p.ell(256, 140, 80, 56, "#ffffff", 6); p.ell(256, 140, 36, 30, "#ffc83a", 4); } };
const friesDraw = (p: Pen) => { for (let k = 0; k < 9; k++) p.poly([[60 + k * 16, 150 - (k % 3) * 20], [72 + k * 16, 150 - (k % 3) * 20], [80 + k * 14, 40 + (k % 4) * 12], [68 + k * 14, 40 + (k % 4) * 12]], "#ffd23a", 4); p.poly([[50, 120], [206, 120], [190, 240], [66, 240]], "#e2333a", 7); };
const bubbleDraw = (txt: string, size = 54) => (p: Pen) => { p.ell(256, 130, 236, 110, "#ffffff", 7); p.poly([[120, 220], [80, 280], [170, 230]], "#ffffff", 5); p.g.fillStyle = "#2a2a30"; p.g.font = `bold ${size}px Arial`; p.g.textAlign = "center"; txt.split("|").forEach((l, i, a) => p.g.fillText(l, 256, 150 + (i - (a.length - 1) / 2) * size * 1.1)); };
const cupDraw = (lab: string, col: string) => (p: Pen) => { p.poly([[70, 70], [186, 70], [170, 220], [86, 220]], col, 7); p.g.fillStyle = "#fff"; p.g.font = "bold 40px Arial"; p.g.textAlign = "center"; p.g.fillText(lab, 128, 160); };
const lerpDays = (f: number) => { const k: [number, number][] = [[442, 1], [W.semana, 7], [W.mes, 30], [W.seis, 180], [652, 382]]; for (let i = 1; i < k.length; i++) if (f <= k[i][0]) { const [a, x] = k[i - 1], [b, y] = k[i]; return Math.round(x + (y - x) * smooth((f - a) / (b - a))); } return 382; };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    flatGround(R, 3000, 3000, "#7a9a5a", 0, 0, -0.02);
    // hospital
    flatGround(R, 14, 10, "#eef2f0", 0, 0, 0.01);
    box(R, 14, 4, 0.2, lamC("#bfe8d8"), 0, 2, -2.4); for (const dx of [-7, 7]) box(R, 0.2, 4, 10, lamC("#a8dcc8"), dx, 2, 2);
    box(R, 1.0, 0.06, 0.7, lamC("#d8d8e0"), 0, 0.78, 0.55); for (const dx of [-0.42, 0.42]) cyl(R, 0.03, 0.03, 0.78, lamC("#9a9aa2"), dx, 0.39, 0.55, 6);
    box(R, 2.2, 0.5, 1.0, lamC("#f8f8f8"), -2.4, 0.4, -1.6); box(R, 0.6, 0.8, 0.08, lamC("#c8d8e8"), 2.2, 2.2, -2.28);
    cyl(R, 0.03, 0.03, 1.8, lamC("#c8c8d0"), -1.0, 0.9, -1.8, 6);
    // Scottish street
    for (let k = 0; k < 8; k++) { const x = TOWN[0] - 16 + k * 4.4, h = 5 + (k % 3); box(R, 4.2, h, 4, lamC(["#8a8a84", "#9a9488", "#7a7a76"][k % 3]), x, h / 2, -5); box(R, 4.4, 0.4, 4.2, lamC("#3a3a42"), x, h + 0.2, -5); for (let i = 0; i < 3; i++) for (let j = 0; j < Math.floor(h / 1.7); j++) box(R, 0.6, 0.9, 0.05, lamC("#c8d8e0"), x - 1.3 + i * 1.3, 1.2 + j * 1.7, -2.97); }
    for (const x of [-10, 8]) tree(R, TOWN[0] + x, 2, 1.2, "#3a5a2a");
    flatGround(R, 60, 6, "#5a5a60", TOWN[0], -1.2, 0.006);
    // chip shop
    flatGround(R, 12, 10, "#c8a878", SHOP[0], 0, 0.01);
    box(R, 12, 4, 0.2, lamC("#f2d8a8"), SHOP[0], 2, -2.4);
    box(R, 4, 1.0, 0.8, lamC("#3a6a8a"), SHOP[0], 0.5, -0.9); box(R, 4.1, 0.08, 0.9, lamC("#e8e8f0"), SHOP[0], 1.04, -0.9);
    box(R, 3.2, 0.7, 0.06, lamC("#c8323a"), SHOP[0], 2.9, -2.28);
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    if (id === S.hook || id === S.end) {
      person("angus", ANGUS(false), 0, 0, 0, { mode: "stand", expr: id === S.hook && f < 50 ? "shock" : "grin", facing: 0, wave: 0.6 + 0.2 * Math.sin(t * 4) }, 1);
      fx("plate", 512, 300, plateDraw(false), 0, 0.84, 0.6, 0.6, 0.35);
      if (id === S.end && f > W.suscribete - 4 && f < W.comer2 - 30) { const pr = smooth((f - W.suscribete) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 2.0, 0.5, 0.8, 0.4); }
      if (id === S.hook && f > W.comer - 4) fx("ex", 256, 256, exDraw, 0.45, 2.0, 0.3, 0.3, 0.3);
    }
    if (id === S.town) {
      const T = TOWN[0];
      for (let k = 0; k < 4; k++) person(`p${k}`, FOLK(k), T - 5 + k * 2.8 + ((f * 0.02) % 2), 0, -2.0 - (k % 2) * 0.5, { mode: "stroll", phase: t * 6 + k, expr: "neutral", facing: 1 }, 5 + k);
      if (f > W.angus - 10) person("angus", ANGUS(true), T, 0, 0, { mode: "stand", expr: f > W.doscientos - 4 ? "nervous" : "smile", facing: 0, wave: f < W.doscientos ? 0.8 : undefined }, 1);
      if (f > W.doscientos - 4) fx("scale", 512, 320, scaleDraw(200 * smooth((f - W.doscientos + 4) / 16) + 1), T + 0.5, 1.9, 0.3, 0.6, 0.38);
    }
    if (id === S.hosp) {
      person("angus", ANGUS(true), -0.3, 0, 0, { mode: "stand", expr: "grin", facing: 1, wave: f > W.quiero - 4 && f < W.medicos ? 0.9 : undefined }, 1);
      for (let k = 0; k < 2; k++) person(`doc${k}`, DOC(k), 0.8 + k * 0.7, 0, -0.3 - k * 0.3, { mode: "stand", expr: f > W.quiero && f < W.medicos ? "shock" : "stern", facing: -1 }, 2 + k);
      if (f > W.quiero - 4 && f < W.vigilancia - 6) fx("bub", 512, 300, bubbleDraw("¡QUIERO DEJAR|DE COMER!", 50), 0.15, 2.1, 0.3, 0.75, 0.44);
      if (f > W.vigilancia - 6) fx("doc", 512, 620, docDraw("VIGILANCIA", "", "unos días"), 0.6, 1.5, 0.3, 0.4, 0.48);
    }
    if (id === S.time) {
      const d = lerpDays(f), fat = f < W.seis;
      person("angus", ANGUS(fat), -0.3, 0, 0, { mode: "stand", expr: "smile", facing: 1 }, 1);
      fx(`day|${d}`, 512, 320, counterDraw(String(d), "DÍA", "#3a8a6a"), 0.3, 2.0, 0, 0.5, 0.31);
      const items: [number, string, string][] = [[W.agua, "AGUA", "#5ab0e8"], [W.te, "TÉ", "#8a5a3a"], [W.cafe, "CAFÉ", "#3a2a1a"], [W.vitaminas, "VIT.", "#e8a83a"]];
      for (const [k, [w, s, c]] of items.entries()) if (f > w - 4) fx(`cup${k}`, 256, 256, cupDraw(s, c), -0.3 + k * 0.22, 0.93, 0.6, 0.24, 0.24);
    }
    if (id === S.shop) {
      const P = SHOP[0];
      person("angus", ANGUS(false), P, 0, -1.6, { mode: "stand", expr: f > W.comida - 10 ? "pained" : "smile", facing: 0, wave: f < W.comida - 10 ? 0.7 : undefined }, 1);
      for (let k = 0; k < 3; k++) { person(`c${k}`, FOLK(k), P - 1.2 + k * 1.2, 0, 0.6, { mode: "stand", expr: "laugh", facing: k === 0 ? 1 : k === 2 ? -1 : 0 }, 2 + k); fx(`fr${k}`, 256, 256, friesDraw, P - 1.0 + k * 1.2, 1.05, 0.85, 0.25, 0.25); }
      if (f > W.patatas - 4) for (let k = 0; k < 3; k++) fx(`frc${k}`, 256, 256, friesDraw, P - 1.2 + k * 1.2, 1.25, -0.8, 0.3, 0.3);
    }
    if (id === S.result) {
      person("angus", ANGUS(false), 0, 0, 0, { mode: "stand", expr: f > W.huevo ? "lick" : "grin", facing: 0, wave: 0.7 }, 1);
      if (f < W.plato - 6) { const kg = 200 - 118 * smooth((f - W.pesa + 10) / 24); fx("scale", 512, 320, scaleDraw(kg), 0.45, 1.95, 0.3, 0.6, 0.38); }
      else fx(`plate|${f > W.huevo - 4 ? 1 : 0}`, 512, 300, plateDraw(f > W.huevo - 4), 0, 0.84, 0.6, 0.6, 0.35);
      if (f > W.trescientos - 4 && f < W.pesa - 6) fx("day", 512, 320, counterDraw("382", "DÍA", "#3a8a6a"), 0.45, 1.95, 0.3, 0.6, 0.38);
      if (f > W.huevo - 4) fx("lab", 512, 160, labelDraw("HUEVO DURO", "#e8a83a"), 0.3, 2.05, 0.3, 0.5, 0.16);
    }
    if (id === S.warn) {
      person("angus", ANGUS(false), -0.4, 0, 0, { mode: "stand", expr: "smile", facing: 1 }, 1);
      for (let k = 0; k < 2; k++) person(`doc${k}`, DOC(k), 0.6 + k * 0.7, 0, -0.2 - k * 0.3, { mode: "stand", expr: "stern", facing: -1, wave: k === 0 && f > W.medicos2 ? 0.6 : undefined }, 2 + k);
      if (f > W.medicos2 - 4) fx("doc", 512, 620, docDraw("CONTROL", "SEMANAL", "análisis"), 0.25, 1.55, 0.3, 0.38, 0.46);
      void clamp01;
    }
  }
}
