// Pimpín 23 · "Camaleón": Pimpín's outfit blends toward the wall/fence colour; a runaway bull, red flags and tomatoes, a corral fence at (2.4, -0.6).
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, heartDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const hx = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mix = (a: string, b: string, s: number) => { const A = hx(a), B = hx(b); return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * s).toString(16).padStart(2, "0")).join(""); };
const WALL = "#c89448", FENCE = "#8a5a2a";
const tint = (col: string, s: number, cap = true) => { const q = Math.round(s * 6) / 6; return { key: `${col}${q}${cap}`, o: { ...PIMPIN, jacket: mix(PIMPIN.jacket, col, q), pants: mix(PIMPIN.pants, col, q), boots: mix(PIMPIN.boots, col, q), skin: mix(PIMPIN.skin!, col, q), cap: cap ? mix(PIMPIN.cap!, col, q) : PIMPIN.cap } }; };
const bullDraw = (ph: number) => (p: Pen) => { const s = Math.sin(ph) * 30; p.ell(250, 170, 160, 90, "#3a2a22", 8); for (const [x, d] of [[140, s], [200, -s], [310, s], [370, -s]]) p.band([[x, 230], [x + d, 320]], "#3a2a22", 30, 6); p.ell(420, 140, 64, 56, "#3a2a22", 8); p.ell(460, 160, 30, 22, "#8a6a5a", 4); p.arc(400, 92, 30, 30, 180, 300, 10, "#f4f1ea"); p.arc(446, 92, 30, 30, 240, 360, 10, "#f4f1ea"); p.ell(424, 128, 8, 8, "#ff3b3b", 0); p.line([[96, 150], [50, 210]], "#3a2a22", 10, false); };
const fenceDraw = (open: number) => (p: Pen) => { for (let k = 0; k < 8; k++) if (k < 3 || k > 4 || open < 0.5) p.band([[30 + k * 64, 40], [30 + k * 64, 250]], FENCE, 22, 5); p.band([[10, 90], [500, 90]], FENCE, 18, 5); p.band([[10, 190], [500, 190]], FENCE, 18, 5); };
const flagDraw = (p: Pen) => { p.band([[30, 20], [30, 240]], "#6a4a2a", 10, 3); p.poly([[34, 20], [220, 60], [34, 110]], "#e2302a", 5); };
const tomDraw = (p: Pen) => { for (let j = 0; j < 6; j++) p.ell(40 + (j % 3) * 70, 150 - Math.floor(j / 3) * 50, 34, 30, "#e2302a", 5); p.poly([[10, 160], [246, 160], [226, 230], [30, 230]], "#a8703a", 6); };
const flashDraw = (p: Pen) => { p.g.fillStyle = "rgba(255,255,255,0.85)"; p.g.fillRect(0, 0, 256, 256); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const pim = (x: number, y: number, z: number, opts: any, col: string, s: number, cap = true, sc = PIMS) => { const T = tint(col, s, cap); person(`pim${T.key}`, T.o, x, y, z, opts, 1, true, sc); };
    const bull = (x: number, z: number, dir = 1) => fx(`bull|${dir}|${Math.round(t * 10) % 6}`, 512, 340, (p: Pen) => { if (dir < 0) { p.g.translate(512, 0); p.g.scale(-1, 1); } bullDraw((Math.round(t * 10) % 6) * 1.05)(p); }, x, 0.75, z, 2.2, 1.46);
    if (id === S.hook || id === S.end) {
      const s = id === S.hook ? smooth((f - W.desap + 16) / 18) : 1;
      pim(1.5, 0, -7.6, { mode: "stand", expr: "whistle", facing: 0 }, WALL, s);
      person("w", VEC(2), 0.2, 0, -5.6, { mode: "stand", expr: s > 0.8 ? "shock" : "smile", facing: 1 }, 10, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "neutral", facing: 0 }, 10 + j, true, 1.0);
      const cols = ["#5ab85a", "#f49ac0", "#3a8ac8", "#f2c84a"]; pim(0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, cols[Math.floor(t * 4) % 4], 0.7);
    }
    if (id === S.mood) {
      const green = smooth((f - W.verde + 18) / 14) * (1 - smooth((f - W.gusta) / 10)), pink = smooth((f - W.rosa + 18) / 14);
      if (pink > 0) pim(-0.4, 0, 1.4, { mode: "stand", expr: "smile", facing: 1 }, "#f49ac0", pink);
      else pim(-0.4, 0, 1.4, { mode: "stand", expr: "nervous", facing: 1 }, "#5ab85a", green);
      if (f < W.gusta - 4) person("t", { ...VEC(1), jacket: "#4a4a52" }, 0.8, 0, 1.0, { mode: "stand", expr: "stern", facing: -1 }, 10, true, 1.0);
      else { person("g", { ...KIDV(4), dress: "#e84a8a", hat: "hair", hair: "#e8b84a" } as any, 0.8, 0, 1.2, { mode: "stand", expr: "smile", facing: -1 }, 11, true, 1.0); if (pink > 0.3) fx("ht", 256, 256, heartDraw, -0.2, 2.1 + Math.sin(t * 6) * 0.05, 1.5, 0.3, 0.3); }
    }
    if (id === S.photo) {
      for (let j = 0; j < 4; j++) person(`k${j}`, KIDV(j), -5.5 + j * 0.85 + (j > 1 ? 0.85 : 0), 0, -7.4, { mode: "stand", expr: "grin", facing: 0 }, 10 + j, true, 1.0);
      pim(-3.95, 0, -7.6, { mode: "stand", expr: "grin", facing: 0 }, WALL, 1, false);
      if (f > W.gorra - 30 && f < W.gorra - 24) fx("fl", 256, 256, flashDraw, -3, 1.3, -4.2, 4, 4);
    }
    if (id === S.bull) {
      fx("fence", 512, 260, fenceDraw(1), -3.2, 0.6, -2.0, 3.0, 1.5);
      const x = -3.2 + smooth((f - 430) / 70) * 5.5; bull(x, -0.8);
      for (let j = 0; j < 3; j++) person(`v${j}`, VEC(j), 1.2 + j * 0.8, 0, 0.8 + (j % 2) * 0.5, { mode: f > 450 ? "march" : "stand", phase: t * 6 + j, expr: f > W.toro ? "shock" : "grin", facing: 1 }, 10 + j, true, 1.0);
      person("red", { ...VEC(4), jacket: "#e2302a" }, 2.4 + Math.max(0, f - 450) * 0.03, 0, -0.4, { mode: f > 450 ? "march" : "stand", phase: t * 6, expr: "shock", facing: 1 }, 14, true, 1.0);
    }
    if (id === S.tries) {
            if (f < 600) { for (let j = 0; j < 3; j++) { const hid = f > W.banderas - 10 + j * 4; fx(`fl${j}`, 256, 256, flagDraw, -1.2 + j * 1.0, hid ? 0.3 : 1.6, 1.0, 0.5, 0.5); person(`h${j}`, VEC(j), -1.4 + j * 1.0, 0, 1.2, { mode: "stand", expr: "nervous", facing: 0, wave: hid ? undefined : 0.9 }, 10 + j, true, 1.0); } bull(-2.6 + Math.max(0, f - 556) * 0.07, -0.6); }
      else if (f < 662) { const hid = f > W.tomates - 4; fx("tom", 256, 256, tomDraw, 0.3, hid ? -0.5 : 0.45, 1.3, 0.8, 0.8); person("tm", VEC(5), 0.9, 0, 1.0, { mode: "stand", expr: "nervous", facing: -1 }, 12, true, 1.0); bull(-2.6 + Math.max(0, f - 626) * 0.08, -0.6); }
      else { const run = smooth((f - W.vestido) / 30), xa = -0.4 + Math.max(0, f - 690) * 0.025, x = xa - 1.2 - Math.max(0, f - 690) * 0.008; person("alc", { ...ALCALDESA, dress: "#e2302a", jacket: "#e2302a" } as any, run > 0 ? xa : 0.2, 0, 0.8, { mode: run > 0 ? "march" : "stand", phase: t * 9, expr: run > 0 ? "shock" : "smile", facing: 1 }, 2, true, 1.0); if (run > 0) bull(x, 0.6); }
    }
    if (id === S.red) pim(0, 0, 1.2, { mode: "stand", expr: f > W.rojisimo ? "stern" : "nervous", facing: 0 }, "#e2302a", smooth((f - W.rojo + 10) / 34));
    if (id === S.corral) {
      const open = f < W.cerrada ? 1 : 0;
      fx(`fence|${open}`, 512, 260, fenceDraw(open), 2.4, 0.6, -0.6, 3.0, 1.5);
      const run = smooth((f - 852) / 70), px = -2.4 + run * 4.4;
      const fade = smooth((f - W.valla + 14) / 16);
      pim(px, 0, -0.2, { mode: run < 1 ? "march" : "stand", phase: t * 8, expr: "grin", facing: 1 }, fade > 0 ? FENCE : "#e2302a", fade > 0 ? fade : 1);
      const bx = Math.min(2.4, -4.0 + smooth((f - 860) / 90) * 6.4); bull(bx, f > 945 ? -1.0 : -0.4);
      for (let j = 0; j < 2; j++) if (f > 960) person(`v${j}`, VEC(j), -0.6 + j * 0.8, 0, 1.2, { mode: "stand", expr: f > 1000 ? "dazed" : "relief_open", facing: 1 }, 10 + j, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
