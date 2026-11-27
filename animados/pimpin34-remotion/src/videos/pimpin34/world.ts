// Pimpín 34 · "Cocinero": tortilla flipped with a slingshot, floating sponge cakes, soup you smell from the next village, croquette queue; the giant paella burns; Pimpín saves it.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, signDraw, smokeDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA, HOGAZA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const panDraw = (p: Pen) => { p.ell(200, 128, 150, 40, "#2a2a2e", 7); p.band([[340, 128], [500, 128]], "#2a2a2e", 26, 5); };
const tortDraw = (flip: number) => (p: Pen) => { p.ell(128, 128, 110, Math.max(8, Math.abs(Math.cos(flip * Math.PI)) * 50), flip > 0.5 ? "#d8a03a" : "#f2c84a", 6); };
const slingDraw = (p: Pen) => { p.band([[128, 250], [128, 150]], "#7a4a2a", 18, 5); p.band([[128, 150], [60, 30]], "#7a4a2a", 16, 5); p.band([[128, 150], [196, 30]], "#7a4a2a", 16, 5); p.line([[60, 30], [128, 90], [196, 30]], "#c8202a", 6, false); };
const cakeDraw = (p: Pen) => { p.poly([[30, 200], [226, 200], [206, 90], [50, 90]], "#e8b870", 6); p.ell(128, 90, 78, 20, "#f4e0b0", 5); p.ell(128, 66, 12, 12, "#d8302a", 3); };
const potDraw = (p: Pen) => { p.poly([[40, 80], [216, 80], [200, 230], [56, 230]], "#5a5a62", 7); p.ell(128, 80, 92, 22, "#e8a04a", 5); };
const steamDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 3; j++) p.line(Array.from({ length: 8 }, (_, i) => [40 + i * 130, 80 + j * 90 + Math.sin(i + k + j) * 30] as [number, number]), "#f4fafc", 10, false); };
const croqDraw = (p: Pen) => { p.ell(256, 200, 220, 40, "#f4f1ea", 6); for (let k = 0; k < 7; k++) p.ell(110 + (k % 4) * 90 + (k > 3 ? 45 : 0), 170 - (k > 3 ? 40 : 0), 40, 22, "#c8802a", 5); };
const paellaDraw = (st: "ok" | "burn" | "flood" | "goo" | "gold") => (p: Pen) => {
  p.band([[30, 256], [120, 256]], "#2a2a2e", 30, 5); p.band([[904, 256], [994, 256]], "#2a2a2e", 30, 5);
  p.ell(512, 256, 420, 200, "#2a2a2e", 8);
  const base = { ok: "#f2b83a", burn: "#6a3a1a", flood: "#6ab4e8", goo: "#f4f1ea", gold: "#f2a82a" }[st];
  p.ell(512, 256, 390, 180, base, 0);
  if (st !== "flood" && st !== "goo") for (let k = 0; k < 26; k++) { const a = k * 2.4, r = 60 + (k * 53) % 300; const x = 512 + Math.cos(a) * r, y = 256 + Math.sin(a) * r * 0.42; p.ell(x, y, 18, 12, k % 3 === 0 ? "#d8302a" : k % 3 === 1 ? "#4a9a3a" : (st === "burn" ? "#1a1a1a" : "#f4d8c8"), 3); }
  if (st === "flood") for (let k = 0; k < 6; k++) p.line([[200 + k * 110, 220], [240 + k * 110, 200], [280 + k * 110, 220]], "#f4fafc", 6, false);
  if (st === "gold") for (let k = 0; k < 8; k++) p.ell(512 + Math.cos(k * 0.8) * 340, 256 + Math.sin(k * 0.8) * 150, 26, 14, "#a8602a", 3);
};
const shovelDraw = (spoon: boolean) => (p: Pen) => { p.band([[128, 20], [128, 380]], "#8a5a2a", 22, 5); if (spoon) p.ell(128, 420, 80, 70, "#c8c8d0", 7); else p.poly([[60, 370], [196, 370], [186, 500], [70, 500]], "#8a8a92", 7); };
const ladleDraw = (p: Pen) => { p.band([[200, 20], [140, 170]], "#c8c8d0", 16, 5); p.ell(110, 200, 70, 46, "#c8c8d0", 6); };
const lemonDraw = (p: Pen) => p.ell(128, 128, 90, 64, "#f2e84a", 6);
const waterDraw = (p: Pen) => { p.poly([[60, 30], [200, 30], [180, 120], [80, 120]], "#3a8ac8", 6); p.band([[140, 120], [150, 500]], "#6ab4e8", 34, 0); };
const flourDraw = (p: Pen) => { p.poly([[50, 20], [206, 20], [220, 200], [36, 200]], "#e8dcc0", 6); p.g.fillStyle = "#8a6a3a"; p.g.font = "bold 44px Arial"; p.g.textAlign = "center"; p.g.fillText("HARINA", 128, 130); for (let k = 0; k < 20; k++) p.ell(110 + (k * 37) % 60, 220 + k * 14, 10, 8, "#f4f1ea", 0); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const cocinero = { ...VEC(0), jacket: "#f4f1ea", hat: "toque" } as any;
    const panadero = { ...HOGAZA, jacket: "#e8d8b8" } as any;
    const sm = (x: number, y: number, z: number, s = 1) => fx(`sm|${Math.floor(t * 4) % 4}`, 256, 256, smokeDraw(Math.floor(t * 4)), x, y + (t % 1) * 0.2, z, s, s);
    if (id === S.hook || id === S.end) {
      const T = id === S.hook ? W.tirachinas : 1078;
      person("pim", PIMPIN, -0.5, 0, 1.2, { mode: "stand", expr: f > T ? "laugh" : "grin", facing: 1 }, 1, true, PIMS);
      fx("pan", 512, 256, panDraw, 0.25, 1.35, 1.35, 0.9, 0.45);
      fx("sling", 256, 256, slingDraw, -0.95, 1.5, 1.4, 0.4, 0.4);
      const s = smooth((f - T + 6) / 24), up = Math.sin(Math.PI * s) * 1.4;
      fx(`tt|${Math.round(s * 8)}`, 256, 256, tortDraw(s), 0.15, 1.45 + up, 1.36, 0.6, 0.6);
      if (f > T - 8 && f < T + 2) fx("stone", 256, 256, (p: Pen) => p.ell(128, 128, 40, 40, "#6a6a6a", 5), -0.9 + (f - T + 8) * 0.11, 1.5 + (f - T + 8) * 0.01, 1.38, 0.12, 0.12);
      person("v0", VEC(2), 1.4, 0, 0.6, { mode: "stand", expr: f > T ? "shock" : "neutral", facing: -1 }, 10, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) { const x = -5 + j * 1.4 + (j > 3 ? 1.2 : 0); person(`m${j}`, VEC(j), x, 0, 1.2, { mode: "stand", expr: j % 2 ? "dazed" : "nervous", facing: 0 }, 10 + j, true, 1.0); if (j > 2) fx(`smk${j}|${Math.floor(t * 4) % 4}`, 256, 256, smokeDraw(Math.floor(t * 4) + j), x, 2.2 + (t % 1) * 0.2, 1.2, 0.6, 0.6); }
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.cakes) {
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1, true, PIMS);
      for (let j = 0; j < 3; j++) { const s = smooth((f - W.bizcochos - j * 6) / 30); fx(`ck${j}`, 256, 256, cakeDraw, -0.8 + j * 0.8, 1.3 + s * (0.8 + j * 0.2) + Math.sin(t * 3 + j) * 0.05, 1.0, 0.5, 0.5); }
    }
    if (id === S.soup) {
      fx("pot", 256, 256, potDraw, -0.6, 0.6, 1.4, 0.7, 0.7);
      person("pim", PIMPIN, -1.2, 0, 1.0, { mode: "stand", expr: "smile", facing: 1 }, 1, true, PIMS);
      fx(`stm|${Math.floor(t * 6) % 6}`, 1024, 512, steamDraw(Math.floor(t * 6)), 0.6, 1.6, 1.0, 2.6, 1.2);
      fx("vec", 1024, 512, signDraw(["PUEBLO VECINO →"], "#f2e2b8", "#2a4a8a"), 1.2, 2.6, 0.4, 1.4, 0.7);
      if (f > W.vecino - 20) person("ve", VEC(4), 1.5, 0, 1.2, { mode: "stand", expr: "relief_open", facing: -1 }, 10, true, 1.0);
    }
    if (id === S.croq) {
      fx("croq", 512, 256, croqDraw, -0.9, 1.25, 1.6, 0.9, 0.45);
      person("pim", PIMPIN, -0.9, 0, 1.2, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      for (let j = 0; j < 5; j++) person(`q${j}`, VEC(j), 0.2 + j * 0.65, 0, 1.2 - j * 0.9, { mode: "stand", expr: j % 2 ? "smile" : "grin", facing: -1 }, 10 + j, true, 1.0);
      if (f > W.cola - 4) fx("cola", 512, 256, bubbleDraw("¡HAY COLA!"), 1.0, 2.5, 0.8, 1.2, 0.6);
    }
    const paella = (st: "ok" | "burn" | "flood" | "goo" | "gold") => fx(`pa|${st}`, 1024, 512, paellaDraw(st), 0, 0.62, 0.4, 2.8, 1.4);
    if (id === S.paella) {
      paella(f > W.quemar - 6 ? "burn" : "ok");
      if (f > W.quemar - 10) { sm(-0.6, 1.4, 0.7, 1.0); sm(0.6, 1.5, 0.7, 0.8); }
      if (f > 470) for (let j = 0; j < 3; j++) person(`v${j}`, VEC(j), -1.4 + j * 1.4, 0, -1.4, { mode: "stroll", phase: t * 4 + j, expr: "nervous", facing: 0 }, 10 + j, true, 1.0);
      if (f < 470) person("co", cocinero, 1.4, 0, -0.6, { mode: "stand", expr: f > W.quemar ? "shock" : "grin", facing: -1 }, 4, true, 1.0);
    }
    if (id === S.tries) {
      const st = f < W.inunda - 4 ? "burn" : f < W.engrudo - 6 ? "flood" : "goo";
      paella(st as any);
      if (f < 580) { person("co", cocinero, 1.2, 0, -0.4, { mode: "stand", expr: f > W.inunda ? "shock" : "grin", facing: -1 }, 4, true, 1.0); if (f > W.agua - 10 && f < W.inunda + 6) fx("wt", 256, 512, waterDraw, 0.6, 1.7, -0.2, 0.6, 1.2); }
      else if (f < 645) { person("pd", panadero, 1.2, 0, -0.4, { mode: "stand", expr: f > W.engrudo ? "dazed" : "grin", facing: -1 }, 5, true, 1.0); if (f > W.harina - 10 && f < W.engrudo) fx("fl", 256, 512, flourDraw, 0.6, 1.7, -0.2, 0.6, 1.2); }
      else { const stuck = f > W.pala - 4; person("al", ALCALDESA, stuck ? 1.2 : 0.8, 0, stuck ? 0.0 : -0.4, { mode: "stand", expr: stuck ? "dazed" : "stern", facing: -1, wave: stuck ? undefined : 0.95 }, 3, true, 1.0); fx("sh", 256, 512, shovelDraw(false), stuck ? 0.0 : 0.3 + Math.sin(t * 6) * 0.15, 1.2, 0.7, 0.5, 1.0); if (stuck) fx("q", 512, 256, bubbleDraw("¿Y AHORA?"), 1.2, 2.4, 0.0, 1.2, 0.6); }
    }
    if (id === S.fix) {
      const st = f < W.remueve2 + 30 ? "goo" : "gold";
      paella(st);
      person("pim", PIMPIN, -0.7, 0, 1.4, { mode: "stand", expr: f > W.perfecta ? "laugh" : "stern", facing: 1, wave: 0.95 }, 1, true, PIMS);
      fx("ld", 256, 256, ladleDraw, -0.2 + (f > W.remueve2 && f < 890 ? Math.sin(t * 9) * 0.25 : 0), 1.5, 1.45, 0.55, 0.55);
      if (f > W.pizca - 4 && f < W.limon) fx("pz", 512, 256, bubbleDraw("UNA PIZCA"), -0.7, 2.5, 1.4, 1.2, 0.6);
      if (f > W.limon - 4 && f < W.remueve2) fx("lm", 256, 256, lemonDraw, 0.0, 1.4 - smooth((f - W.limon) / 14) * 0.6, 1.0, 0.3, 0.3);
      if (f > W.perfecta - 4 && f < 940) fx("ok", 512, 256, bubbleDraw("¡PERFECTA!", "#ffd23f"), 0.4, 2.2, 0.6, 1.4, 0.7);
      if (f < W.perfecta) fx("sh", 256, 512, shovelDraw(false), 0.0, 1.2, 0.7, 0.5, 1.0);
      if (f > W.pala2 - 10) { const sp = f > W.cuchara - 6; person("al", ALCALDESA, 1.2, 0, 0.8, { mode: "stand", expr: sp ? "laugh" : "relief_open", facing: -1 }, 3, true, 1.0); fx(`sp|${sp ? 1 : 0}`, 256, 512, shovelDraw(sp), 0.75, 1.3, 0.9, 0.5, 1.0); }
      if (f > W.socarrat) for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j + 1), -1.6 + j * 3.4, 0, -0.8, { mode: "stand", expr: "laugh", facing: j ? -1 : 1, wave: 0.9 }, 10 + j, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
