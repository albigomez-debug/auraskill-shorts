// Pimpín 38 · "Calentito": snowy village; a snowman melts at his touch; warm beds, toast, cats; the fountain freezes on the water festival; Pimpín hugs it.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, signDraw } from "./props";
import { catDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const snowDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 40; j++) { const x = (j * 211) % 1024, y = ((j * 97 + k * 23) % 1024); p.ell(x, y, 7, 7, "#ffffff", 0); } };
const groundSnow = (p: Pen) => { p.poly([[0, 60], [200, 30], [420, 50], [640, 20], [860, 46], [1024, 30], [1024, 256], [0, 256]], "#f4f8fc", 0); };
const snowmanDraw = (m: number) => (p: Pen) => { const s = 1 - m; if (s > 0.05) { p.ell(128, 450 - 0, 100 * (0.6 + 0.4 * s), 90 * s, "#f8fbff", 6); p.ell(128, 450 - 150 * s, 70 * s, 64 * s, "#f8fbff", 6); p.ell(128, 450 - 260 * s, 50 * s, 46 * s, "#f8fbff", 6); p.poly([[128, 450 - 260 * s], [128 + 50 * s, 450 - 252 * s], [128, 450 - 245 * s]], "#f28a2a", 3); } p.ell(128, 480, 60 + m * 60, 16 + m * 6, "#9ad4ff", 4); };
const heatDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 3; j++) p.line(Array.from({ length: 6 }, (_, i) => [60 + j * 70 + Math.sin(i + k + j) * 14, 240 - i * 44] as [number, number]), "#ff9a4a", 7, false); };
const bedDraw = (p: Pen) => { p.poly([[20, 120], [492, 120], [492, 220], [20, 220]], "#c8904a", 7); p.poly([[30, 80], [482, 80], [482, 130], [30, 130]], "#e84a5a", 6); p.ell(90, 84, 54, 26, "#f4f1ea", 5); p.band([[20, 40], [20, 250]], "#8a5a2a", 18, 4); };
const breadDraw = (tt: number) => (p: Pen) => { p.poly([[30, 40], [226, 40], [226, 200], [30, 200]], tt > 0.5 ? "#b8702a" : "#f2dcae", 7); p.ell(128, 40, 98, 30, tt > 0.5 ? "#a8602a" : "#e8c890", 6); };
const fountainDraw = (ice: number, jet: number, scarf: boolean) => (p: Pen) => {
  p.poly([[40, 380], [472, 380], [440, 500], [72, 500]], "#a8a49a", 8); p.poly([[230, 380], [282, 380], [272, 180], [240, 180]], "#bcb8ae", 6); p.ell(256, 180, 90, 24, "#a8a49a", 6);
  if (jet > 0) for (const d of [-1, 1]) p.line([[256, 160], [256 + d * 80 * jet, 100], [256 + d * 160 * jet, 380]], "#6ab4e8", 14, false);
  if (jet > 0) p.band([[256, 160], [256, 160 - 120 * jet]], "#6ab4e8", 16, 0);
  if (ice > 0) { p.ell(256, 380, 200, 26, "#d8f0ff", 6); for (let k = 0; k < 7; k++) p.poly([[90 + k * 55, 390], [110 + k * 55, 390], [100 + k * 55, 390 + 40 * ice + (k % 2) * 20]], "#d8f0ff", 3); p.ell(256, 150, 30 + ice * 30, 60 + ice * 50, "#d8f0ff", 5); }
  if (scarf) p.band([[150, 300], [362, 300]], "#e2453c", 30, 5);
};
const hammerDraw = (p: Pen) => { p.band([[60, 220], [190, 80]], "#8a5a2a", 16, 4); p.poly([[150, 30], [250, 110], [220, 140], [120, 60]], "#6a6a72", 6); };
const bucketDraw = (p: Pen) => { p.poly([[60, 110], [196, 110], [180, 240], [76, 240]], "#8a8a92", 6); p.ell(128, 112, 66, 14, "#ff9a4a", 3); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const k = Math.floor(t * 6) % 12;
    const snow = (warm = false) => { if (!warm) fx(`sn|${k}`, 1024, 1024, snowDraw(k), 0, 2.2, 2.2, 6, 6); fx("gs", 1024, 256, groundSnow, 0, 0.15, -2.0, 12, 0.6); };
    const shiver = (j: number) => Math.sin(t * 50 + j) * 0.015;
    const fontanero = { ...VEC(3), jacket: "#3a5ab8", hat: "cap", cap: "#3a3a4a" } as any;
    const heat = (x: number, y: number, z: number, s = 0.6) => fx(`ht|${k % 6}`, 256, 256, heatDraw(k), x, y + (t % 1) * 0.1, z, s, s);
    const fountain = (ice: number, jet: number, scarf: boolean) => fx(`fn|${Math.round(ice * 6)}|${Math.round(jet * 6)}|${scarf ? 1 : 0}`, 512, 512, fountainDraw(ice, jet, scarf), 0, 1.15, 0.2, 2.3, 2.3);
    if (id === S.hook || id === S.end) {
      snow();
      const T = id === S.hook ? W.muneco + 10 : 980;
      const m = smooth((f - T) / 35);
      fx(`sm|${Math.round(m * 12)}`, 256, 512, snowmanDraw(m), 0.55, 1.0, 0.9, 1.0, 2.0);
      person("pim", PIMPIN, -0.4, 0, 1.2, { mode: "stand", expr: m > 0.5 ? "nervous" : "grin", facing: 1, wave: f > T - 14 && f < T + 30 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > T - 6 && m < 0.9) heat(0.2, 1.2, 1.0, 0.5);
    }
    if (id === S.premise) {
      snow();
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0) + shiver(j), 0, 1.2, { mode: "stand", expr: "pained", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      heat(0.4, 2.0, 2.4, 0.6);
    }
    if (id === S.bed) {
      fx("bed", 512, 256, bedDraw, 0, 0.5, 1.0, 1.9, 0.95);
      const out = f > W.cama;
      person("pim", PIMPIN, out ? -1.2 : -0.4, out ? 0 : 0.45, out ? 1.4 : 1.05, { mode: out ? "stand" : "sit", expr: "grin", facing: out ? 1 : 0 }, 1, !out, PIMS);
      heat(-0.4, 0.9, 1.1, 0.6);
      if (out) { person("v0", VEC(2), 0.4, 0.45, 1.05, { mode: "sit", expr: "relief_open", facing: 0 }, 10, false, 1.0); for (let j = 0; j < 3; j++) person(`q${j}`, VEC(j + 3), 1.4 + j * 0.6, 0, 0.6 - j * 0.6, { mode: "stand", expr: "nervous", facing: -1 }, 11 + j, true, 1.0); }
    }
    if (id === S.toast) {
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: "grin", facing: 0, wave: 0.95 }, 1, true, PIMS);
      const tt = smooth((f - W.manos + 6) / 10);
      fx(`bd|${tt > 0.5 ? 1 : 0}`, 256, 256, breadDraw(tt), 0.32, 1.4, 1.3, 0.4, 0.4);
      heat(0.32, 1.7, 1.25, 0.4);
    }
    if (id === S.cats) {
      snow();
      person("pim", PIMPIN, -0.6, 0, 1.2, { mode: "sit", expr: "smile", facing: 0 }, 1, true, PIMS);
      card("cat0", -0.2, 1.3, 0.4, catDraw(0, "sit", false, "#e8a24a"), -1, 0);
      for (let j = 1; j < 5; j++) card(`cat${j}`, 0.4 + j * 0.45, 1.3 - j * 0.3, 0.38, catDraw(0, "sit", false, ["#9a9aa2", "#2a2a2e", "#f4f1ea", "#c8803a"][j - 1]), -1, 0);
      if (f > W.cola - 4) fx("cola", 512, 256, bubbleDraw("¡MIAU!"), 1.4, 1.2, 0.8, 1.0, 0.5);
    }
    if (id === S.freeze) {
      snow();
      const ice = smooth((f - W.congela + 20) / 30);
      fountain(ice, ice > 0.5 ? 0 : 1 - ice * 2, false);
      if (f > W.fiesta - 6) fx("fa", 1024, 512, signDraw(["FIESTA", "DEL AGUA"], "#f2e2b8", "#2a5ab8"), -0.9, 2.8, -0.4, 1.4, 0.7);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j), -1.4 + j * 2.8 + shiver(j), 0, 1.0, { mode: "stand", expr: f > W.congela ? "shock" : "pained", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.tries) {
      snow();
      const ice = f > W.congela2 - 4 ? 1.4 : 1;
      fountain(ice, 0, f > W.bufanda - 4);
      if (f < 555) { person("fo", fontanero, -0.9, 0, 1.0, { mode: "stand", expr: f > W.nada ? "pained" : "stern", facing: 1, wave: 0.95 }, 4, true, 1.0); const sw = Math.max(0, Math.sin(t * 9)); fx("hm", 256, 256, hammerDraw, -0.45 + sw * 0.1, 1.7 + sw * 0.2, 1.0, 0.5, 0.5); }
      else if (f < 625) { person("fo", fontanero, -0.9, 0, 1.0, { mode: "stand", expr: f > W.congela2 ? "shock" : "grin", facing: 1, wave: 0.95 }, 4, true, 1.0); fx("bk", 256, 256, bucketDraw, -0.45, 1.55, 1.0, 0.45, 0.45); if (f < W.congela2) heat(-0.45, 1.9, 1.0, 0.4); }
      else { person("al", ALCALDESA, -0.9, 0, 1.0, { mode: "stand", expr: f > W.pegada ? "shock" : "grin", facing: 1, wave: f > W.pegada ? 0.95 : undefined }, 3, true, 1.0); if (f > W.pegada) fx("pg", 512, 256, bubbleDraw("¡SE HA PEGADO!"), -0.6, 2.6, 1.0, 1.5, 0.75); }
    }
    if (id === S.fix) {
      const melt = smooth((f - W.derrite + 10) / 30), jet = smooth((f - W.chorro + 4) / 12);
      snow(melt > 0.5);
      fountain((1 - melt) * 1.4, jet, f < W.bufanda2);
      const near = smooth((f - 730) / 30);
      person("pim", PIMPIN, -1.4 + near * 1.0, 0, 0.9, { mode: near > 0 && near < 1 ? "stroll" : "stand", phase: t * 4, expr: f > W.abraza ? "smile" : "grin", facing: 1, wave: f > W.abraza - 4 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > W.abraza - 4 && melt < 1) heat(-0.2, 1.3, 0.8, 0.8);
      if (f > W.fiesta2 - 4) for (let j = 0; j < 3; j++) person(`v${j}`, VEC(j), 0.8 + j * 0.6, 0, 1.4 - j * 0.6, { mode: "stand", expr: "laugh", facing: -1, wave: 0.9 }, 10 + j, true, 1.0);
      if (f > W.bufanda2 - 6) { person("al", ALCALDESA, -0.8, 0, 2.0, { mode: "stand", expr: "relief_open", facing: 1 }, 3, true, 1.0); fx("sc", 256, 64, (p: Pen) => p.band([[10, 32], [246, 32]], "#e2453c", 30, 5), -0.8, 1.24, 2.1, 0.5, 0.12); if (f > W.calentita - 4) heat(-0.8, 1.6, 2.0, 0.5); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
