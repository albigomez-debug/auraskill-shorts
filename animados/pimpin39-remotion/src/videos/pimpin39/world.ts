// Pimpín 39 · "Pintor": paintings so real people walk into them; rain washes away the fiesta poster; Pimpín repaints it in a minute; blue noses become fashion.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw } from "./props";
import { dogDraw, catDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, ALCALDESA, HOGAZA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const wallDraw = (door: boolean) => (p: Pen) => { p.poly([[0, 0], [1024, 0], [1024, 1024], [0, 1024]], "#efe6d2", 8); if (door) { p.poly([[380, 260], [644, 260], [644, 1024], [380, 1024]], "#7a4a2a", 8); p.ell(600, 650, 18, 18, "#f2c84a", 4); for (let y = 320; y < 1000; y += 120) p.band([[400, y], [624, y]], "#5a3420", 6, 0); } };
const easelDraw = (art: (p: Pen) => void) => (p: Pen) => { p.band([[100, 1000], [200, 300]], "#8a5a2a", 20, 4); p.band([[412, 1000], [312, 300]], "#8a5a2a", 20, 4); p.poly([[40, 120], [472, 120], [472, 600], [40, 600]], "#f4f1ea", 8); p.g.save(); p.g.translate(40, 120); art(p); p.g.restore(); };
const appleArt = (bit: boolean) => (p: Pen) => { p.ell(216, 260, 140, 130, "#d8302a", 6); p.band([[216, 130], [230, 80]], "#5a3a1a", 12, 3); p.ell(260, 100, 40, 20, "#4a9a3a", 4); if (bit) p.ell(340, 220, 50, 60, "#f4f1ea", 0); };
const puddleDraw = (p: Pen) => { p.ell(256, 128, 240, 80, "#6ab4e8", 6); p.ell(200, 110, 80, 20, "#b8e0f8", 0); };
const catArt = (p: Pen) => { p.ell(216, 330, 120, 110, "#e8a24a", 6); p.ell(216, 170, 80, 74, "#e8a24a", 6); p.poly([[150, 120], [160, 50], [200, 110]], "#e8a24a", 5); p.poly([[282, 120], [272, 50], [232, 110]], "#e8a24a", 5); p.ell(190, 160, 10, 14, "#1a1a1e", 0); p.ell(242, 160, 10, 14, "#1a1a1e", 0); };
const posterDraw = (st: "full" | "wash" | "blank" | "egg" | "rev" | "blue" | "pro", wash = 0) => (p: Pen) => {
  p.poly([[0, 0], [512, 0], [512, 700], [0, 700]], "#f4f1ea", 10);
  const txt = (s: string, y: number, col: string, size = 90, flip = false) => { p.g.save(); p.g.fillStyle = col; p.g.font = `bold ${size}px Arial`; p.g.textAlign = "center"; if (flip) { p.g.translate(256, 0); p.g.scale(-1, 1); p.g.translate(-256, 0); } p.g.fillText(s, 256, y); p.g.restore(); };
  if (st === "full" || st === "wash") { p.g.globalAlpha = 1 - wash; p.ell(256, 220, 110, 110, "#f2c84a", 6); txt("FIESTA", 480, "#c8202a"); p.g.globalAlpha = 1; if (wash > 0) for (let k = 0; k < 10; k++) p.band([[30 + k * 50, 100], [30 + k * 50, 100 + wash * 500]], "#c8c4ba", 10, 0); }
  if (st === "egg") { p.ell(256, 240, 90, 120, "#f4f1ea", 6); p.ell(256, 270, 50, 50, "#f2c84a", 4); }
  if (st === "rev") { p.ell(256, 240, 90, 120, "#f4f1ea", 6); p.ell(256, 270, 50, 50, "#f2c84a", 4); txt("FIESTA", 520, "#3a3a8a", 90, true); }
  if (st === "blue") { p.ell(256, 240, 90, 120, "#f4f1ea", 6); txt("FIESTA", 520, "#3a3a8a", 90, true); p.band([[60, 600], [300, 380]], "#3a6ae8", 30, 0); }
  if (st === "pro") { p.poly([[0, 0], [512, 0], [512, 700], [0, 700]], "#9ad4ff", 10); p.ell(256, 200, 120, 120, "#ffd23f", 7); for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; p.band([[256 + Math.cos(a) * 140, 200 + Math.sin(a) * 140], [256 + Math.cos(a) * 190, 200 + Math.sin(a) * 190]], "#ffb02a", 14, 3); } p.poly([[0, 560], [512, 560], [512, 700], [0, 700]], "#5ab85a", 6); for (let k = 0; k < 6; k++) p.ell(50 + k * 82, 580, 22, 22, ["#e84a5a", "#f49ac0", "#ffd23f"][k % 3], 4); txt("¡FIESTA!", 470, "#c8202a", 100); }
};
const rainDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 40; j++) { const x = (j * 211 + k * 37) % 1024, y = (j * 97 + k * 90) % 1024; p.band([[x, y], [x - 12, y + 60]], "#9ad4ff", 5, 0); } };
const brushDraw = (col: string) => (p: Pen) => { p.band([[200, 30], [70, 200]], "#a8703a", 14, 4); p.poly([[60, 190], [90, 210], [60, 250], [36, 236]], col, 4); };
const noseDraw = (p: Pen) => p.ell(32, 32, 26, 22, "#3a6ae8", 3);
const crownDraw = (p: Pen) => p.poly([[20, 110], [20, 30], [70, 70], [128, 10], [186, 70], [236, 30], [236, 110]], "#f2c84a", 6);

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const k = Math.floor(t * 8) % 10;
    const cura = { ...VEC(1), jacket: "#1a1a1e", pants: "#1a1a1e", hat: "hair", hair: "#8a8a8a" } as any;
    const rey = { ...VEC(4), jacket: "#8a1e26", hat: "hair", hair: "#e8e8e8", moustache: "#e8e8e8", belt: "#f2c84a" } as any;
    const nose = (x: number, z: number, y = 1.47) => fx("nose", 64, 64, noseDraw, x, y, z + 0.12, 0.09, 0.09);
    const poster = (st: any, wash = 0) => fx(`po|${st}|${Math.round(wash * 8)}`, 512, 700, posterDraw(st, wash), 0, 1.65, -0.2, 1.3, 1.78);
    if (id === S.hook || id === S.end) {
      fx("wall", 1024, 1024, wallDraw(true), 0, 1.6, -0.4, 3.2, 3.2);
      const T = id === S.hook ? W.entrar : 1080;
      const w = smooth((f - (T - 40)) / 38), bump = f > T - 2;
      person("v0", VEC(2), 1.5 - w * 1.5, 0, 0.3 + (bump ? 0.1 : 0), { mode: bump ? "fall" : "stroll", phase: t * 5, expr: bump ? "dazed" : "smile", facing: bump ? 0 : -1 }, 10, true, 1.0);
      person("pim", PIMPIN, -1.0, 0, 1.0, { mode: "stand", expr: bump ? "laugh" : "grin", facing: 1 }, 1, true, PIMS);
      fx("br", 256, 256, brushDraw("#7a4a2a"), -0.62, 1.2, 1.1, 0.35, 0.35);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: j % 2 ? "dazed" : "nervous", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.apple) {
      const bit = f > W.mordisco - 2;
      fx(`ea|${bit ? 1 : 0}`, 512, 1024, easelDraw(appleArt(bit)), 0.3, 1.2, 0.6, 1.2, 2.4);
      person("pim", PIMPIN, -0.8, 0, 1.0, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      if (f > 232) person("v0", VEC(3), 1.0, 0, 0.9, { mode: "stand", expr: bit ? "pained" : "grin", facing: -1 }, 10, true, 1.0);
      if (bit) fx("ay", 512, 256, bubbleDraw("¡MIS DIENTES!"), 0.45, 2.55, 0.9, 1.4, 0.7);
    }
    if (id === S.puddle) {
      fx("pd", 512, 256, puddleDraw, 0, 0.18, 1.0, 1.6, 0.5);
      const j = smooth((f - W.salta + 12) / 20), x = -1.6 + smooth((f - 270) / 50) * 3.0;
      person("v0", VEC(1), x, Math.sin(Math.PI * j) * 0.6, 1.0, { mode: "stroll", phase: t * 5, expr: j > 0 && j < 1 ? "shock" : "neutral", facing: 1 }, 10, j <= 0 || j >= 1, 1.0);
      person("pim", PIMPIN, 1.2, 0, 0.3, { mode: "stand", expr: "laugh", facing: -1 }, 1, true, PIMS);
    }
    if (id === S.cat) {
      fx(`ec`, 512, 1024, easelDraw(catArt), -0.3, 1.2, 0.4, 1.2, 2.4);
      const bark = f > W.ladran - 14;
      card(`dog|${bark ? Math.floor(t * 6) % 2 : 0}`, 0.9, 1.0, 0.5, dogDraw(t * 3, bark ? "bark" : "sit", "stubby"), -1, 0);
      if (bark) fx("gu", 512, 256, bubbleDraw("¡GUAU! ¡GUAU!"), 0.5, 1.6, 1.0, 1.2, 0.6);
      person("pim", PIMPIN, -1.3, 0, 1.0, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      void catDraw;
    }
    if (id === S.rain) {
      const wash = smooth((f - W.lluvia) / 40);
      poster("wash", wash);
      if (f > W.lluvia - 10 && f < 470) fx(`rn|${k}`, 1024, 1024, rainDraw(k), 0, 2.0, 1.4, 5, 5);
      person("al", ALCALDESA, 1.2, 0, 0.8, { mode: "stand", expr: f > W.cartel ? "shock" : "neutral", facing: -1, wave: f > 470 ? 0.95 : undefined }, 3, true, 1.0);
      if (f > W.comarca - 10) fx("rey", 512, 256, bubbleDraw("¡VIENE EL REY!"), 1.1, 2.4, 0.8, 1.4, 0.7);
    }
    if (id === S.tries) {
      const st = f < W.dibuja ? "blank" : f < W.escribe ? "egg" : f < W.pinta ? "rev" : "blue";
      poster(st);
      if (f < 575) { person("cu", cura, -0.9, 0, 0.8, { mode: "stand", expr: f > W.huevo ? "nervous" : "grin", facing: 1, wave: 0.95 }, 4, true, 1.0); fx("b1", 256, 256, brushDraw("#f2c84a"), -0.45, 1.4, 0.9, 0.35, 0.35); if (f > W.huevo - 4) fx("hv", 512, 256, bubbleDraw("¿UN HUEVO?"), 1.0, 2.0, 0.8, 1.2, 0.6); }
      else if (f < 660) { person("pa", HOGAZA, -0.9, 0, 0.8, { mode: "stand", expr: f > W.reves ? "dazed" : "grin", facing: 1, wave: 0.95 }, 5, true, 1.0); fx("b2", 256, 256, brushDraw("#3a3a8a"), -0.45, 1.4, 0.9, 0.35, 0.35); }
      else { person("al", ALCALDESA, -0.9, 0, 0.8, { mode: "stand", expr: f > W.nariz ? "shock" : "stern", facing: f > W.nariz ? 0 : 1, wave: 0.95 }, 3, true, 1.0); fx("b3", 256, 256, brushDraw("#3a6ae8"), -0.45, 1.4, 0.9, 0.35, 0.35); if (f > W.nariz - 2) nose(-0.9, 0.8); }
    }
    if (id === S.fix) {
      const fast = f > W.tres - 4 && f < W.cartel2 - 6;
      poster(f < W.cartel2 - 6 ? (fast ? (Math.floor(t * 8) % 2 ? "egg" : "blue") : "blue") : "pro");
      person("pim", PIMPIN, fast ? -0.6 + Math.sin(t * 25) * 0.35 : -0.9, 0, 0.9, { mode: "stand", expr: fast ? "grin" : f > W.cartel2 ? "laugh" : "stern", facing: 1, wave: f > W.pincel - 6 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.pincel - 6) fx(`bp|${fast ? Math.floor(t * 8) % 3 : 0}`, 256, 256, brushDraw(["#e2453c", "#ffd23f", "#5ab85a"][fast ? Math.floor(t * 8) % 3 : 0]), (fast ? -0.6 + Math.sin(t * 25) * 0.35 : -0.9) + 0.4, 1.25, 1.0, 0.35, 0.35);
      if (fast) fx("tc", 512, 256, bubbleDraw("¡ZAS, ZAS, ZAS!"), -0.8, 2.3, 0.9, 1.4, 0.7);
      if (f > W.castillo - 30) { person("rey", rey, 1.1, 0, 0.9, { mode: "stand", expr: "laugh", facing: -1, wave: 0.95 }, 6, true, 1.0); fx("cr", 256, 128, crownDraw, 1.1, 1.92, 0.95, 0.4, 0.2); if (f > W.castillo - 4 && f < W.nariz2) fx("ca", 512, 256, bubbleDraw("¡PARA MI CASTILLO!"), 0.55, 2.5, 0.9, 1.6, 0.8); }
      if (f > W.nariz2 - 4) { person("al", ALCALDESA, 0.2, 0, 1.6, { mode: "stand", expr: "laugh", facing: 0 }, 3, true, 1.0); nose(0.2, 1.6); }
      if (f > W.moda - 6) for (let j = 0; j < 2; j++) { person(`v${j}`, VEC(j), -1.6 + j * 3.6, 0, 1.4, { mode: "stand", expr: "grin", facing: j ? -1 : 1 }, 10 + j, true, 1.0); fx(`ns${j}`, 64, 64, noseDraw, -1.6 + j * 3.6, 1.47, 1.52, 0.09, 0.09); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
