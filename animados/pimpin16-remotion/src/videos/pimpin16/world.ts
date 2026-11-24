// Pimpín 16 · "Silencioso": a bear asleep in the plaza at BEAR on top of the keys.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, zDraw, signDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA, HOGAZA, ESTIRADO, keyDraw } from "./villa";
import { S, W, BEAR, smooth } from "./story";

export const PIMS = 1.1;
const bearDraw = (mode: "sleep" | "growl" | "chew" | "happy", blanket: boolean) => (p: Pen) => {
  p.ell(480, 330, 360, 150, "#7a4a2a", 9);
  for (const x of [220, 640]) p.ell(x, 450, 70, 40, "#5a321c", 7);
  const hy = mode === "growl" ? 170 : 260;
  p.ell(170, hy, 130, 110, "#7a4a2a", 8); p.ell(90, hy - 90, 40, 40, "#7a4a2a", 6); p.ell(250, hy - 90, 40, 40, "#7a4a2a", 6);
  p.ell(150, hy + 40, 60, 44, "#c89a6a", 5); p.ell(150, hy + 16, 20, 14, "#1a1010", 0);
  if (mode === "growl") { p.ell(110, hy - 20, 16, 16, "#ffffff", 4); p.ell(200, hy - 20, 16, 16, "#ffffff", 4); p.ell(112, hy - 18, 7, 7, "#1a1010", 0); p.ell(202, hy - 18, 7, 7, "#1a1010", 0); p.ell(150, hy + 66, 34, 24, "#5a1010", 4); }
  else { p.line([[92, hy - 18], [130, hy - 14]], "#1a1010", 7, false); p.line([[170, hy - 14], [208, hy - 18]], "#1a1010", 7, false); if (mode === "chew") p.ell(150, hy + 64, 26, 14, "#5a1010", 4); else p.line([[126, hy + 62], [150, hy + 72], [174, hy + 62]], "#1a1010", 6, false); }
  if (blanket) p.poly([[330, 190], [860, 210], [880, 470], [300, 470]], "#c84a5a", 8);
};
const pillowDraw = (p: Pen) => p.ell(128, 64, 120, 50, "#f4f1ea", 6);
const bellDraw = (p: Pen) => { p.ell(64, 70, 46, 46, "#f2c84a", 6); p.ell(64, 96, 10, 10, "#1a1010", 0); };
const cakeDraw = (p: Pen) => { p.poly([[30, 120], [226, 120], [226, 230], [30, 230]], "#f4b8d0", 6); p.poly([[30, 110], [226, 110], [226, 140], [30, 140]], "#ffffff", 4); };
const boardDraw = (p: Pen) => { p.poly([[0, 0], [512, 0], [512, 300], [0, 300]], "#2a4a3a", 10); p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 60px Arial"; p.g.textAlign = "center"; p.g.fillText("EXAMEN", 256, 100); p.g.fillText("2 + 2 = ?", 256, 200); };
const flowerDraw = (p: Pen) => { for (let j = 0; j < 6; j++) { const x = 30 + j * 80, y = 200 - (j % 2) * 40; p.line([[x, 256], [x, y]], "#3a8a3a", 6, false); p.ell(x, y, 22, 22, ["#e2453c", "#f2c84a", "#c85ab8"][j % 3], 4); } };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const [bx, , bz] = BEAR;
    const bear = (mode: "sleep" | "growl" | "chew" | "happy", blanket = false) => { fx(`bear|${mode}|${blanket ? 1 : 0}`, 1024, 512, bearDraw(mode, blanket), bx, 0.85, bz, 3.4, 1.7); if (mode !== "growl") { const k = (t * 0.6) % 1; fx("zz", 256, 256, zDraw, bx - 1.2 + k * 0.4, 1.9 + k * 0.8, bz + 0.1, 0.4 * (1 - k * 0.5), 0.4 * (1 - k * 0.5)); } };
    const keys = (has = true) => { if (has) fx("keys", 512, 192, keyDraw, bx - 0.5, 0.14, bz + 0.8, 0.8, 0.3); };
    if (id === S.hook || id === S.end) { bear("sleep"); keys(); for (let j = 0; j < 2; j++) person(`b${j}`, VEC(j + 2), bx - 2.6 + j * 5.2, 0, bz + 1.4, { mode: "stand", expr: "nervous", facing: j ? -1 : 1 }, 10 + j, true, 1.0); }
    if (id === S.premise) {
      for (let j = 0; j < 4; j++) person(`m${j}`, VEC(j), -3.6 + j * 1.6 + (f - 105) * 0.02, 0, 1.0, { mode: "march", phase: t * 3 + j, expr: "grin", facing: 1, lift: 90 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, -1.2 + (f - 105) * 0.02, 0, 2.4, { mode: "stroll", phase: t * 1.5, expr: "whistle", facing: 1 }, 1, true, PIMS);
    }
    if (id === S.bell) {
      person("mom", VEC(1), 2.7, 0, 2.0, { mode: "stand", expr: "stern", facing: -1, wave: 0.6 }, 2, true, 1.0);
      person("pim", PIMPIN, 1.6, 0, 2.4, { mode: "stand", expr: "nervous", facing: 1 }, 1, true, PIMS);
      if (f > W.cascabel - 8) fx("bel", 128, 128, bellDraw, 1.6 + Math.sin(t * 9) * 0.02, 0.98, 2.6, 0.18, 0.18);
    }
    if (id === S.hide) {
      for (let j = 0; j < 3; j++) person(`k${j}`, KIDV(j), -2.6 + j * 1.2, 0, 1.6, { mode: "stand", expr: "nervous", facing: j % 2 ? 1 : -1 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, -1.0, 0, 1.0, { mode: "stand", expr: "grin", facing: -1 }, 1, true, PIMS);
      if (f > W.primavera - 6) fx("flw", 512, 256, flowerDraw, -1, 0.3, 2.4, 3.6, 1.2);
    }
    if (id === S.school) {
      fx("board", 512, 300, boardDraw, 3.0, 2.0, -0.4, 2.4, 1.4);
      const gone = f > W.fue;
      person("prof", ESTIRADO, 2.6, 0, 0.6, { mode: "stand", expr: f > W.profe ? "nervous" : "stern", facing: f > W.profe ? (Math.sin(t * 3) > 0 ? 1 : -1) : 1 }, 2, true, 1.0);
      if (!gone) person("pim", PIMPIN, 4.2, 0, 1.6, { mode: "stand", expr: "whistle", facing: -1, wave: f > W.examen ? 0.6 : undefined }, 1, true, PIMS);
      for (let j = 0; j < 2; j++) person(`st${j}`, KIDV(j + 3), 3.2 + j * 1.8 - (j ? 0 : 0.2), 0, 2.4 - j * 0.3, { mode: "stand", expr: "neutral", facing: 0 }, 10 + j, true, 1.0);
    }
    if (id === S.problem) {
      bear("sleep"); keys();
      fx("fiesta", 1024, 512, signDraw(["FIESTA"], "#f2e2b8", "#8a1e26"), 0, 4.5, -7.9, 2.4, 1.2);
      for (let j = 0; j < 4; j++) person(`p${j}`, j === 1 ? ALCALDESA : VEC(j), -3 + j * 2 + (j > 1 ? 0.6 : 0), 0, 1.8, { mode: "stand", expr: "nervous", facing: j < 2 ? 1 : -1 }, 10 + j, true, 1.0);
    }
    if (id === S.tries) {
      const growl = f > W.gruñe - 2 && f < W.gruñe + 16, chew = f > W.come - 4 && f < W.cartero;
      bear(growl ? "growl" : chew ? "chew" : "sleep"); keys();
      const al = f < W.gruñe ? smooth((f - 531) / 50) : 1 - smooth((f - W.gruñe) / 10);
      person("alc", ALCALDESA, -3.2 + 1.8 * al, 0, 0.4, { mode: f < W.gruñe ? "stroll" : "march", phase: t * 2, expr: f < W.gruñe ? "nervous" : "shock", facing: f < W.gruñe ? 1 : -1, wave: f > W.gruñe ? 0.95 : undefined }, 2, true, 1.0);
      if (f > W.panadero - 10 && f < W.cartero) { const s = smooth((f - W.panadero + 10) / 30); person("bak", HOGAZA, -3.2 + 1.9 * s, 0, 1.2, { mode: "stand", expr: chew ? "shock" : "smile", facing: 1, wave: 0.6 }, 3, true, 1.0); if (f < W.come - 4) fx("cake", 256, 256, cakeDraw, -2.9 + 1.9 * s, 1.4, 1.4, 0.5, 0.5); }
      if (f > W.cartero - 10) { const x = -4 + (f - W.cartero + 10) * 0.16; person("post", VEC(5), x, 0, 1.6, { mode: "march", phase: t * 5, expr: "shock", facing: 1, wave: 0.95 }, 4, true, 1.0); }
    }
    if (id === S.sneak) {
      bear("sleep"); keys();
      const s = smooth((f - 745) / 80);
      person("pim", PIMPIN, -2.6 + 2.4 * s, 0, 1.0 - 0.6 * s, { mode: "stroll", phase: t * 1.2, expr: "whistle", facing: 1 }, 1, true, PIMS);
    }
    if (id === S.rescue) {
      const got = f > W.llaves - 2;
      bear(f > W.almohada ? "happy" : "sleep", f > W.manta - 2);
      keys(!got);
      if (f > W.almohada - 4) fx("pil", 256, 128, pillowDraw, bx - 1.2, 0.35, bz + 0.25, 1.0, 0.5);
      person("pim", PIMPIN, got ? 1.2 : 0.8, 0, bz + 1.3, { mode: "stand", expr: "grin", facing: -1, wave: got ? 0.8 : undefined }, 1, true, PIMS);
      if (got) fx("keys2", 512, 192, keyDraw, got ? 1.45 : 0, 1.25, bz + 1.4, 0.4, 0.15);
      if (f > W.entera - 30) for (let j = 0; j < 3; j++) person(`c${j}`, j === 0 ? ALCALDESA : VEC(j), -1.6 + j * 1.4, 0, bz - 1.4, { mode: "stand", expr: "relief_open", facing: 1, wave: 0.8 }, 10 + j, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
