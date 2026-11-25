// Pimpín 21 · "Animales": plaza; hen, cows, cat, pigeons and sweeper, a wedding with a cake, twenty pigs.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, appleDraw } from "./props";
import { chickenDraw, catDraw, pigeonDraw, pigDraw, dogDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, KIDV } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const cowDraw = (p: Pen) => { p.ell(256, 200, 190, 110, "#f4f1ea", 8); p.ell(200, 170, 50, 40, "#2a2a2e", 0); p.ell(320, 230, 40, 34, "#2a2a2e", 0); for (const x of [120, 180, 330, 390]) p.band([[x, 290], [x, 400]], "#f4f1ea", 30, 6); p.ell(80, 140, 70, 60, "#f4f1ea", 8); p.ell(60, 175, 44, 30, "#f4b8c0", 5); p.ell(72, 118, 9, 9, "#1a1010", 0); p.ell(98, 118, 9, 9, "#1a1010", 0); p.ell(40, 96, 22, 12, "#e8d8b8", 4); p.ell(116, 96, 22, 12, "#e8d8b8", 4); };
const cakeDraw = (p: Pen) => { p.poly([[40, 140], [216, 140], [216, 240], [40, 240]], "#f4f1ea", 7); p.poly([[70, 60], [186, 60], [186, 140], [70, 140]], "#f4f1ea", 7); p.ell(128, 50, 20, 20, "#e84a6a", 4); p.band([[40, 190], [216, 190]], "#e84a6a", 10, 0); };
const broomDraw = (p: Pen) => { p.band([[60, 10], [60, 400]], "#8a5a2a", 14, 4); p.poly([[20, 400], [100, 400], [120, 500], [0, 500]], "#d8b84a", 6); };
const archDraw = (p: Pen) => { p.arc(256, 400, 220, 340, 180, 360, 40, "#f4f1ea"); for (let j = 0; j < 9; j++) { const a = Math.PI + j * Math.PI / 8; p.ell(256 + Math.cos(a) * 220, 400 + Math.sin(a) * 340, 26, 26, j % 2 ? "#f4b8d0" : "#e84a6a", 4); } };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const pig = (k: string, x: number, z: number, mode: "walk" | "eat" | "stand", dir = 1, s = 0.42) => card(`${k}|${mode}|${mode === "walk" ? Math.round(t * 8) % 8 : 0}`, x, z, s, pigDraw((Math.round(t * 8) % 8) * 0.785, mode), dir, 0);
    const novia = { ...VEC(4), jacket: "#f4f1ea", dress: "#f4f1ea", hat: "hair", hair: "#6a4a2a" } as any;
    const novio = { ...VEC(3), jacket: "#2a2a32", pants: "#2a2a32", hat: "hair" } as any;
    const granjero = { ...VEC(5), jacket: "#5a7a3a", hat: "straw" } as any;
    if (id === S.hook || id === S.end) {
      person("pim", PIMPIN, -0.4, 0, 1.2, { mode: "stand", expr: f > W.razon - 4 && id === S.hook || id === S.end ? "grin" : "smile", facing: 1 }, 1, true, PIMS);
      card(`hen|${Math.round(t * 4) % 4}`, 0.5, 1.5, 0.38, chickenDraw(t * 2, false), -1, 0);
      if ((id === S.hook && f > 20 && f < W.razon) || (id === S.end && f < 1040)) fx("bb", 512, 256, bubbleDraw("¡CLOC!"), 0.7, 1.25, 1.4, 0.9, 0.45);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "neutral", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      card("hen", 1.0, 2.6, 0.36, chickenDraw(0, false), -1, 0);
    }
    if (id === S.zoo) {
      person("pim", PIMPIN, 0, 0, 1.4, { mode: "stand", expr: "laugh", facing: 0, wave: 0.9 }, 1, true, PIMS);
      card("hen", -0.8, 1.8, 0.36, chickenDraw(0, false), 1, 0);
      card("cat", 1.0, 2.1, 0.4, catDraw(0, "sit", false, "#e8a24a"), -1, 0);
      card("dog", -1.3, 0.9, 0.45, dogDraw(0, "sit", "stubby"), -1, 0);
      card(`pg|${Math.round(t * 3) % 3}`, -0.9, 1.2, 0.28, pigeonDraw((t * 2) % 1), 1, 0);
    }
    if (id === S.cows) {
      fx("cow", 512, 420, cowDraw, 0.8, 0.75, 1.0, 1.6, 1.3);
      person("pim", PIMPIN, -0.6, 0, 1.6, { mode: "stand", expr: "nervous", facing: 1 }, 1, true, PIMS);
      if (f > 246) fx("bb", 512, 256, bubbleDraw("MUU... MUU..."), 0.9, 1.9, 1.0, 1.4, 0.7);
    }
    if (id === S.cat) {
      card("cat", 0.4, 1.8, 0.42, catDraw(0, "sit", false, "#9a9aa2"), -1, 0);
      person("pim", PIMPIN, -0.4, 0, 1.4, { mode: "stand", expr: f > W.favor ? "grin" : "smile", facing: 1 }, 1, true, PIMS);
      if (f > W.favor - 10) fx("bb", 512, 256, bubbleDraw("¿POR FAVOR?"), 0.6, 1.25, 1.7, 1.0, 0.5);
    }
    if (id === S.pigeons) {
      person("pim", PIMPIN, -0.6, 0, 1.4, { mode: "stand", expr: "nervous", facing: 1 }, 1, true, PIMS);
      for (let j = 0; j < 3; j++) card(`pg${j}|${Math.round(t * 3 + j) % 3}`, 0.1 + j * 0.45, 1.9 + (j % 2) * 0.3, 0.28, pigeonDraw((t * 2 + j) % 1), -1, 0);
      if (f > 380) { const x = 1.6 - smooth((f - 380) / 40) * 0.5; person("bar", { ...VEC(2), jacket: "#e8a02a" }, x, 0, 0.6, { mode: "stroll", phase: t * 3, expr: "whistle", facing: -1 }, 3, true, 1.0); fx("br", 128, 512, broomDraw, x - 0.4, 0.75, 0.7, 0.35, 1.3); }
      if (f > W.barrendero - 6) fx("bb", 512, 256, bubbleDraw("¡SIN ESCOBA!"), 0.4, 1.45, 1.9, 1.1, 0.55);
    }
    if (id === S.escape || id === S.tries) {
      fx("arch", 512, 440, archDraw, 0, 1.9, -2.2, 2.6, 2.4);
      const scream = id === S.tries && f > W.grita - 3;
      person("novia", novia, -0.5, 0, -1.8, { mode: "stand", expr: scream ? "shock" : f > 500 ? "nervous" : "smile", facing: 1, wave: scream ? 0.95 : undefined }, 4, true, 1.0);
      person("novio", novio, 0.5, 0, -1.8, { mode: "stand", expr: f > 500 ? "shock" : "smile", facing: -1 }, 5, true, 1.0);
      const stolen = id === S.tries && f > W.pastel - 8;
      fx("tbl", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#f4f1ea", 5), 1.8, 0.72, -1.2, 1.4, 0.25);
      if (!stolen) fx("cake", 256, 256, cakeDraw, 1.8, 1.15, -1.15, 0.7, 0.7);
      const n = id === S.escape ? Math.min(8, Math.max(0, Math.floor((f - W.escapan + 10) / 6))) : 8;
      for (let j = 0; j < n; j++) {
        const lap = ((t * 0.9 + j * 0.37) % 1);
        const eating = id === S.tries && f > W.comida + 10 && f < 680 && j < 5;
        const x = eating ? -2.2 + j * 0.5 : -4.5 + lap * 9;
        pig(`p${j}`, x, 0.6 + (j % 4) * 0.55, eating ? "eat" : "walk", 1);
      }
      if (stolen) { const x = 2.4 - (f - W.pastel + 8) * 0.06; fx("cake", 256, 256, cakeDraw, x, 0.75, 1.25, 0.5, 0.5); pig("pc", x, 1.2, "walk", -1); }
      if (id === S.tries) {
        if (f < 630) { const x = -3.5 + smooth((f - 565) / 60) * 3; person("gr", granjero, x, 0, 1.2, { mode: f < 600 ? "march" : "stand", phase: t * 4, expr: f > W.nada ? "dazed" : "stern", facing: 1 }, 6, true, 1.0); }
        else if (f < 700) { person("gr", granjero, -1.0, 0, 1.6, { mode: "stand", expr: "grin", facing: 1, wave: 0.9 }, 6, true, 1.0); for (let j = 0; j < 4; j++) { const s = smooth((f - W.comida + j * 3) / 18); if (s > 0) fx(`ap${j}`, 128, 128, appleDraw(), -1.0 + s * (j - 1.5) * 0.8 - 0.8 * s, 1.4 + Math.sin(Math.PI * s) * 1.0 - s * 1.2, 1.4 - s * 0.6, 0.2, 0.2); } }
      }
    }
    if (id === S.oink) {
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: W.oink.some((o) => f > o - 3 && f < o + 10) ? "whistle" : "smile", facing: 0 }, 1, true, PIMS);
      W.oink.forEach((o, j) => { if (f > o - 3) fx(`ob${j}`, 512, 256, bubbleDraw("OINK"), -0.3 + j * 0.3, 1.75 + j * 0.18, 1.0 - j * 0.1, 0.5, 0.25); });
    }
    if (id === S.line) {
      person("pim", PIMPIN, -1.0, 0, 1.6, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      for (let j = 0; j < 8; j++) { const x = -0.4 + j * 0.55 + smooth((f - W.fila) / 90) * 3.5; pig(`p${j}`, x, 0.8, "walk", 1, 0.38); }
      const back = smooth((f - W.devuelve + 10) / 20);
      if (back > 0) { pig("last", 1.6 - back * 1.4, 1.4, back < 1 ? "walk" : "stand", -1, 0.4); fx("cake", 256, 256, cakeDraw, 1.6 - back * 1.4, 0.72, 1.45, 0.45, 0.45); }
      person("novia", novia, 0.2, 0, -0.4, { mode: "stand", expr: back > 0.5 ? "relief_open" : "shock", facing: -1 }, 4, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
