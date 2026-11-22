// Pimpín 6 · "Súper rápido": all in the plaza; birthday balcony on the house at x = 3 (front z = -8), the "home" door at x = -9.
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { textDraw, ctaDraw, bubbleDraw, noteDraw } from "./props";
import { dogDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, cakeY, runAt, smooth } from "./story";

export const PIMS = 1.1;
const cakeDraw = (candles: boolean) => (p: Pen) => { p.poly([[40, 130], [216, 130], [216, 240], [40, 240]], "#f8f4ec", 7); p.band([[40, 150], [128, 172], [216, 150]], "#e84a6a", 14, 0); p.ell(128, 128, 88, 16, "#f8f4ec", 5); if (candles) for (let k = 0; k < 4; k++) { const x = 70 + k * 38; p.poly([[x, 70], [x + 10, 70], [x + 10, 124], [x, 124]], "#8ac8f0", 4); p.ell(x + 5, 56, 8, 14, "#ffb030", 3); } };
const streakDraw = (p: Pen) => { for (let j = 0; j < 7; j++) p.band([[20 + (j % 3) * 30, 40 + j * 30], [480 - (j % 2) * 60, 40 + j * 30]], "rgba(255,255,255,0.85)", 8, 0); };
const towelDraw = (p: Pen) => { p.poly([[40, 30], [216, 30], [216, 230], [40, 230]], "#5ab8e8", 7); for (let k = 0; k < 3; k++) p.poly([[40, 170 + k * 18], [216, 170 + k * 18], [216, 178 + k * 18], [40, 178 + k * 18]], "#f4f1ea", 0); };
const dropsDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 24; j++) p.band([[(j * 53 + k * 17) % 256, (j * 37 + k * 60) % 512], [(j * 53 + k * 17) % 256 - 4, ((j * 37 + k * 60) % 512) + 30]], "#9ad4ff", 6, 0); };
const flagDraw = (p: Pen) => { for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) p.poly([[c * 64, r * 64], [c * 64 + 64, r * 64], [c * 64 + 64, r * 64 + 64], [c * 64, r * 64 + 64]], (r + c) % 2 ? "#1a1a1a" : "#f4f1ea", 0); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const iron = lamC("#2a2a30");
    box(R, 2.4, 0.15, 1.0, lamC("#9a948a"), 3, 4.6, -7.5); box(R, 2.4, 0.06, 0.06, iron, 3, 5.5, -7.0); for (let k = 0; k < 7; k++) box(R, 0.05, 0.9, 0.05, iron, 1.9 + k * 0.36, 5.05, -7.0);
    // shower stall at the side of the plaza
    box(R, 1.4, 0.1, 1.4, lamC("#e8f0f4"), -6, 0.05, 2); box(R, 0.06, 2.6, 0.06, iron, -6.6, 1.3, 1.4); box(R, 0.7, 0.06, 0.06, iron, -6.3, 2.6, 1.4); box(R, 0.3, 0.08, 0.3, lamC("#b8c0c8"), -6, 2.56, 1.5);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const ph = Math.floor(t * 8) % 4;
    const blur = (key: string, x: number, y: number, z: number, n = 3, dx = -0.5) => { for (let k = 0; k < n; k++) person(`${key}g${k}`, PIMPIN, x + dx * (k + 1), y, z, { mode: "march", phase: t * 6, expr: "grin", facing: dx < 0 ? 1 : -1 }, 30 + k, false, PIMS * (0.96 - k * 0.04)); fx(`${key}st|${ph}`, 512, 256, streakDraw, x + dx * 2.2, y + 1.0, z - 0.05, 2.4, 1.0, true); };
    if (id === S.hook || id === S.slow || id === S.end) {
      for (let j = 0; j < 9; j++) { const x = -3.6 + (j % 5) * 1.8, z = -2.2 + Math.floor(j / 5) * 1.2; person(`v${j}`, VEC(j), x, 0, z, { mode: id === S.slow ? "stroll" : "stand", phase: t * 0.25 + j, expr: id === S.slow ? "dazed" : "shock", facing: 0 }, 10 + j, true, 1.0); }
      const r = runAt(f, id);
      if (r) { person("pim", PIMPIN, r[0], 0, r[1], { mode: "march", phase: t * 6, expr: "grin", facing: r[2] }, 1, true, PIMS); blur("p", r[0], 0, r[1], 2, -0.55 * r[2]); }
      if (false) fx("snail", 512, 256, textDraw("10 km/h... al día", "#ffffff", 70), -2.5, 2.4, -1.4, 1.4, 0.7);
    }
    if (id === S.ja) {
      for (let j = 0; j < 6; j++) person(`v${j}`, VEC(j), -3 + j * 1.2 + (j > 2 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "laugh", facing: 0, wave: 0.5 + Math.sin(t * 7 + j) * 0.4 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.6, 0, 2.8, { mode: "stand", expr: "nervous", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.home) {
      // the door of the house at x = -9 (front z = -8)
      const two = f > W.salir - 6;
      person("pim", PIMPIN, -8.0, 0, -6.6, { mode: "stand", expr: two ? "shock" : "smile", facing: -1, wave: two ? undefined : 0.6 }, 1, true, PIMS);
      if (two) person("pim2", PIMPIN, -9.0, 0, -7.4, { mode: "stand", expr: "shock", facing: 1 }, 2, true, PIMS);
      if (f > W.salir - 6) fx("q", 512, 256, bubbleDraw("¿YA ESTOY AQUÍ?"), -8.4, 2.6, -6.6, 1.1, 0.55);
    }
    if (id === S.shower) {
      const flick = Math.floor(t * 10) % 2;
      person("pim", PIMPIN, -6 + (flick ? 0.05 : -0.05), 0, 2.0, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      fx(`dr|${ph}`, 256, 512, dropsDraw(ph), -6, 1.4, 2.1, 0.9, 1.8, true);
      fx("tow", 256, 256, towelDraw, -5.1, 1.0, 2.2, 0.55, 0.55);
      if (false) fx("seco", 512, 200, textDraw("¡SECA!", "#ffd23f", 120), -5.1, 1.75, 2.2, 0.8, 0.31);
    }
    if (id === S.hide) {
      person("pa", PIMPIN, -0.6, 0, 2.0, { mode: "stand", expr: f > W.encuentra - 6 ? "shock" : "whistle", facing: 1 }, 1, true, PIMS);
      person("pb", PIMPIN, 0.6, 0, 2.0, { mode: "stand", expr: f > W.encuentra - 6 ? "shock" : "nervous", facing: -1 }, 2, true, PIMS);
      if (f > W.encuentra - 4) fx("te", 512, 256, bubbleDraw("¡TE PILLÉ!"), 0, 2.4, 2.1, 1.0, 0.5);
    }
    if (id === S.race) {
      fx("flag", 512, 256, flagDraw, 0, 0.03, 3.0, 5.0, 0.6);
      person("pim", PIMPIN, -1.6, 0, 3.0, { mode: "stand", expr: "grin", facing: 1, wave: 0.6 }, 1, true, PIMS);
      for (let j = 0; j < 3; j++) person(`n${j}`, VEC(j + 2), 0.6 + j * 1.1, 0, 2.2, { mode: "stand", expr: "nervous", facing: 0 }, 10 + j, true, 1.0);
      if (f > W.perro - 8) card("dog", 0.4, 3.4, 0.5, dogDraw(0, "sit", "stubby"), -1, 0); 
      if (false) fx("no", 512, 200, textDraw("NI EL PERRO", "#ff3b3b", 100), 0.6, 2.6, 3.2, 1.3, 0.51);
    }
    if (id === S.party || id === S.save || id === S.sing) {
      const pr = smooth((f - W.cumple + 6) / 10);
      person("alc", ALCALDESA, 3, 0, -6.4, { mode: "stand", expr: id === S.sing ? "laugh" : f > W.escapa ? "shock" : "grin", facing: 0, wave: id === S.sing ? 0.8 : undefined }, 3, true, 1.0);
      for (let j = 0; j < 4; j++) person(`g${j}`, VEC(j + 4), 0.2 + j * 1.6 + (j > 1 ? 2.2 : 0), 0, -4.6, { mode: "stand", expr: id === S.sing ? "laugh" : f > W.escapa ? "shock" : "smile", facing: 0, wave: id === S.sing ? 0.8 : undefined }, 10 + j, true, 1.0);
      person("bal", VEC(7), 3.6, 4.7, -7.6, { mode: "stand", expr: f > W.escapa ? "shock" : "smile", facing: 0, wave: 0.8 }, 4, false, 1.0);
      const cy = cakeY(f, id), candles = f > W.velas - 4;
      void pr;
      if (id !== S.sing && f < W.coge) fx(`cake|${candles ? 1 : 0}`, 256, 256, cakeDraw(candles), 3, cy, -7.1, 0.9, 0.9);
      if (id === S.save) {
        const r = runAt(f, id);
        if (r) { person("pim", PIMPIN, r[0], r[3] ?? 0, r[1], { mode: "march", phase: t * 6, expr: "grin", facing: r[2] }, 1, (r[3] ?? 0) < 0.1, PIMS); blur("s", r[0], r[3] ?? 0, r[1], 2, -0.55 * r[2]); }
        if (f >= W.coge) { person("pim", PIMPIN, 3.5, 0, -6.6, { mode: "stand", expr: "laugh", facing: -1, wave: 0.95 }, 1, true, PIMS); fx("cake|1", 256, 256, cakeDraw(true), 3.1, 2.25, -6.5, 0.6, 0.6); }
      }
      if (id === S.sing) { person("pim", PIMPIN, 3.5, 0, -6.6, { mode: "stand", expr: "laugh", facing: -1, wave: 0.95 }, 1, true, PIMS); fx("cake|1", 256, 256, cakeDraw(true), 3.1, 2.25, -6.5, 0.6, 0.6); for (let k = 0; k < 3; k++) fx(`n${k}`, 256, 256, noteDraw(k), 2.4 + k * 0.6, 2.9 + Math.sin(t * 4 + k) * 0.15, -6.2, 0.4, 0.4); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
    void SKINS; void ({} as Outfit);
  }
}
