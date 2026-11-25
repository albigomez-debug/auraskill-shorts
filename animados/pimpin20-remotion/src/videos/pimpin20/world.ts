// Pimpín 20 · "Olfato": plaza; smell trails, socks, hide-and-seek tree (11,-5), runaway dog, posters, bakery and puddle, barn.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, signDraw, bubbleDraw, zDraw } from "./props";
import { dogDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const sniffDraw = (k: number, col = "#ffb04a") => (p: Pen) => { for (let j = 0; j < 3; j++) { const pts: [number, number][] = []; for (let x = 0; x <= 512; x += 32) pts.push([x, 60 + j * 60 + Math.sin(x / 50 + k + j) * 18]); p.line(pts, col, 9, false); } };
const pizzaDraw = (p: Pen) => { p.poly([[128, 20], [236, 230], [20, 230]], "#f2c84a", 7); p.band([[20, 230], [236, 230]], "#c88a3a", 22, 5); for (const [x, y] of [[128, 110], [100, 180], [160, 180]]) p.ell(x, y, 18, 18, "#d8302a", 3); };
const sockDraw = (c: string) => (p: Pen) => { p.poly([[70, 10], [150, 10], [150, 160], [220, 190], [220, 240], [70, 240]], c, 7); p.band([[70, 30], [150, 30]], "#f4f1ea", 16, 0); };
const posterDraw = (p: Pen) => { p.poly([[8, 8], [248, 8], [248, 340], [8, 340]], "#f4f1ea", 6); p.g.fillStyle = "#c8202a"; p.g.font = "bold 52px Arial"; p.g.textAlign = "center"; p.g.fillText("¿ME HAS", 128, 70); p.g.fillText("VISTO?", 128, 124); p.ell(128, 220, 70, 60, "#d89a4a", 5); p.ell(90, 170, 20, 30, "#a86a2a", 4); p.ell(166, 170, 20, 30, "#a86a2a", 4); p.ell(128, 236, 14, 10, "#1a1010", 0); p.g.fillStyle = "#1a1010"; p.g.font = "bold 40px Arial"; p.g.fillText("PERRO", 128, 320); };
const boneDraw = (p: Pen) => { p.band([[90, 128], [420, 128]], "#f4f1ea", 60, 7); for (const x of [80, 430]) { p.ell(x, 96, 46, 44, "#f4f1ea", 7); p.ell(x, 160, 46, 44, "#f4f1ea", 7); } p.band([[90, 128], [420, 128]], "#f4f1ea", 52, 0); };
const glassesDraw = (p: Pen) => { p.ell(70, 64, 50, 40, "rgba(200,230,255,0.6)", 9); p.ell(186, 64, 50, 40, "rgba(200,230,255,0.6)", 9); p.line([[120, 60], [136, 60]], "#1a1010", 9, false); };
const barnDraw = (p: Pen) => { p.poly([[20, 300], [256, 80], [492, 300], [492, 600], [20, 600]], "#b83a2a", 9); p.poly([[176, 360], [336, 360], [336, 600], [176, 600]], "#6a2a1a", 7); p.line([[176, 360], [336, 600]], "#f4f1ea", 9, false); p.line([[336, 360], [176, 600]], "#f4f1ea", 9, false); p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 60px Arial"; p.g.textAlign = "center"; p.g.fillText("GRANERO", 256, 260); };
const hayDraw = (p: Pen) => { p.ell(256, 160, 240, 96, "#e8c45a", 7); for (let j = 0; j < 12; j++) p.line([[40 + j * 38, 150], [60 + j * 38, 110]], "#c8a03a", 5, false); };
const puddleDraw = (p: Pen) => p.ell(256, 128, 230, 90, "#6a9ad8", 6);

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const k3 = Math.floor(t * 6) % 3;
    if (id === S.hook || id === S.end) {
      person("pim", PIMPIN, -0.2, 0, 1.0, { mode: "stand", expr: "whistle", facing: 1 }, 1, true, PIMS);
      fx(`sn|${k3}`, 512, 256, sniffDraw(k3), 0.9, 1.5, 0.6, 1.8, 0.8, true);
      fx("pz", 256, 256, pizzaDraw, 0.85, 1.9 + Math.sin(t * 3) * 0.06, 0.2, 0.45, 0.45);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "neutral", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "whistle", facing: 0 }, 1, true, PIMS);
      fx(`sn|${k3}`, 512, 256, sniffDraw(k3), 1.4, 1.6, 2.2, 1.2, 0.5, true);
    }
    if (id === S.dog) {
      person("pim", PIMPIN, -0.5, 0, 1.5, { mode: "stand", expr: "whistle", facing: 1 }, 1, true, PIMS);
      card("dg", 0.6, 1.5, 0.45, dogDraw(t, "sit", "stubby"), 1, 0);
      if (f > 190) fx("sh", 512, 256, bubbleDraw("¿EH?"), 0.8, 1.3, 1.4, 0.8, 0.4);
    }
    if (id === S.school) {
      fx("sc", 1024, 512, signDraw(["COLEGIO"], "#f2e2b8", "#2a4a8a"), -3, 3.0, -7.9, 2.0, 1.0);
      person("pim", PIMPIN, -3.2, 0, -5.4, { mode: "stand", expr: f > W.cena + 14 ? "grin" : "whistle", facing: 0 }, 1, true, PIMS);
      fx(`sn|${k3}`, 512, 256, sniffDraw(k3), -2.3, 1.6, -5.6, 1.2, 0.5, true);
      for (let j = 0; j < 2; j++) person(`k${j}`, KIDV(j), -4.4 + j * 2.4, 0, -5.8, { mode: "stand", expr: "shock", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.socks) {
      person("pim", PIMPIN, 0, 0, 1.5, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1, true, PIMS);
      const n = Math.min(9, Math.floor((f - 258) / 5));
      for (let j = 0; j < n; j++) fx(`so${j}`, 256, 256, sockDraw(["#e2453c", "#3a8ac8", "#f2c84a", "#5ab85a", "#c85ab8"][j % 5]), -0.5 + (j % 3) * 0.45, 0.25 + Math.floor(j / 3) * 0.3, 2.0, 0.4, 0.4);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j + 1), -1.4 + j * 2.8, 0, 0.8, { mode: "stand", expr: "shock", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.hide) {
      const peek = f > W.champu - 6;
      person("kid", KIDV(3), 11.5, 0, -5.4, { mode: "stand", expr: peek ? "shock" : "nervous", facing: -1 }, 10, true, 1.0);
      person("pim", PIMPIN, 10.0 + smooth((f - 316) / 40) * 0.6, 0, -3.6, { mode: f < 356 ? "stroll" : "stand", phase: t * 3, expr: peek ? "grin" : "whistle", facing: 1 }, 1, true, PIMS);
      fx(`sn|${k3}`, 512, 256, sniffDraw(k3, "#c8a0ff"), 11.2, 1.6, -4.0, 1.0, 0.4, true);
      if (peek) fx("ch", 512, 256, bubbleDraw("¡CHAMPÚ!"), 10.4, 2.5, -3.6, 1.0, 0.5);
    }
    if (id === S.escape) {
      const run = smooth((f - W.escapa + 10) / 60);
      person("alc", ALCALDESA, -0.1, 0, 1.2, { mode: "stand", expr: f > W.escapa ? "shock" : "smile", facing: 1, wave: f > W.escapa ? 0.95 : undefined }, 2, true, 1.0);
      card("dg", 0.4 + run * 5, 1.3, 0.45, dogDraw(t * 8, run > 0 ? "walk" : "sit", "akita"), 1, 0);
    }
    if (id === S.tries) {
      for (let j = 0; j < 3; j++) fx(`po${j}`, 256, 352, posterDraw, -4.2 + j * 1.1, 1.8, -7.85, 0.7, 0.95);
      if (f > 529) {
        for (let j = 0; j < 3; j++) person(`w${j}`, VEC(j), -2.0 + j * 1.0, 0, 0.4, { mode: "stand", expr: f < 575 ? "whistle" : "nervous", facing: 0 }, 10 + j, true, 1.0);
        const walk = smooth((f - 590) / 40);
        person("cart", { ...VEC(3), jacket: "#3a5ab8", hat: "cap", cap: "#3a5ab8" } as any, 2.4 - walk * 1.6, 0, 1.6, { mode: walk < 1 && walk > 0 ? "stroll" : "stand", phase: t * 3, expr: "grin", facing: -1 }, 5, true, 1.0);
        card("od", 3.0 - walk * 1.6, 1.6, 0.4, dogDraw(t * 8, walk < 1 && walk > 0 ? "walk" : "sit", "stubby", "coat"), -1, 0);
      }
    }
    if (id === S.trail) {
      const x = -4.2 + smooth((f - 660) / 110) * 8.2;
      person("pim", PIMPIN, x, 0, 1.2, { mode: "march", phase: t * 3, expr: "whistle", facing: 1 }, 1, true, PIMS);
      fx(`sn|${k3}`, 512, 256, sniffDraw(k3), x + 0.9, 0.5, 1.3, 1.3, 0.4, true);
      fx("pan", 1024, 512, signDraw(["PANADERÍA"], "#f2e2b8", "#8a1e26"), 1.2, 2.3, -2.0, 1.6, 0.8);
      fx("pud", 512, 256, puddleDraw, 3.5, 0.02, 1.7, 1.4, 0.5);
    }
    if (id === S.barn) {
      fx("barn", 512, 640, barnDraw, 0.6, 2.4, -1.6, 4.4, 5.5);
      fx("hay", 512, 256, hayDraw, 0.3, 0.35, 0.3, 2.2, 1.0);
      card("dg", 0.5, 0.5, 0.7, dogDraw(0, "sit", "akita"), 1, 0);
      fx("bone", 512, 256, boneDraw, 0.4, 0.45, 0.85, 1.3, 0.6);
      fx(`z|${Math.floor(t * 2) % 2}`, 256, 256, zDraw, 0.9, 1.2 + (t % 1) * 0.2, 0.6, 0.4, 0.4);
      person("pim", PIMPIN, -1.0, 0, 1.4, { mode: "stand", expr: f > W.gafas - 4 ? "grin" : "smile", facing: 1, wave: f > W.gafas - 4 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.gafas - 4) fx("gl", 256, 128, glassesDraw, -0.62, 1.5, 1.6, 0.4, 0.2);
      if (f > 860) person("ab", { ...VEC(4), hat: "hair", hair: "#e8e8e8", moustache: "#e8e8e8" } as any, -2.0, 0, 1.0, { mode: "stand", expr: f > W.gafas + 10 ? "relief_open" : "nervous", facing: 1 }, 6, true, 1.0);
      person("alc", ALCALDESA, 1.8, 0, 1.0, { mode: "stand", expr: "relief", facing: -1 }, 2, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
