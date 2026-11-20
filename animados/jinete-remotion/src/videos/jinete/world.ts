// "El jinete muerto" (Frank Hayes, Belmont Park 1923): dirt track along x with hedges, grandstand behind (z<0), finish post at FIN, stable at STB.
import * as THREE from "three";
import { Pen, Outfit, SKINS, horse, ride } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, tree, textDraw, labelDraw, signDraw, heartDraw, qDraw, exDraw, ctaDraw, flagDraw } from "./props";
import { S, W, STB, FIN, HEDGES, hx, smooth } from "./story";

const FRANK: Outfit = { jacket: "#e8202a", pants: "#f4f1ea", boots: "#1a1a1a", hat: "cap", cap: "#f4f1ea", skin: SKINS[0], belt: null, buttons: "#f4f1ea" };
const GROOM: Outfit = { jacket: "#6a5a3a", pants: "#3a3a40", boots: "#2a2020", hat: "cap", cap: "#4a3a2a", skin: SKINS[0], belt: null };
const JOCK = (v: number): Outfit => ({ jacket: ["#2a5ab8", "#2a8a4a", "#e8c42a", "#7a2a8a"][v % 4], pants: "#f4f1ea", boots: "#1a1a1a", hat: "cap", cap: ["#f4f1ea", "#1a1a1a", "#2a5ab8", "#e8c42a"][v % 4], skin: SKINS[(v + 1) % 4], belt: null });
const FAN = (v: number): Outfit => { const o: Outfit = { jacket: ["#5a3a2a", "#2a3a4a", "#6a5a3a", "#7a2a3a", "#3a4a3a", "#8a7a6a"][v % 6], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 4] }; return v % 3 === 1 ? { ...o, hat: "bonnet", dress: ["#c25a7a", "#5a8fc2", "#d9a441"][v % 3] } : { ...o, hat: v % 2 ? "tophat" : "slouch", cap: "#3a3a3a", moustache: v % 4 ? undefined : "#3a2a1a" }; };
const KISS = { coat: "#5a3a22", mane: "#1a120c", blaze: true, cloth: "#e8202a" };
const COATS = [{ coat: "#9a6a3a", mane: "#3a2414", cloth: "#2a5ab8" }, { coat: "#3a2a22", mane: "#141010", cloth: "#2a8a4a" }, { coat: "#c8b8a0", mane: "#7a6a5a", cloth: "#e8c42a" }];

/** horse + rider; dead = rider limp (dazed face), ph = gallop phase or null */
const mount = (c: typeof KISS, o: Outfit, ph: number | null, expr: "stern" | "grin" | "pained" | "dazed" | "neutral" | "shout") => (p: Pen) => {
  horse(p, c, 1000, ph, () => { ride(p, o, [1000, 790], { expr, tilt: expr === "dazed" ? 16 : 0, headTilt: expr === "dazed" ? 22 : 0, blink: expr === "dazed" ? 0.7 : false }, 0.9); });
};
const plateDraw = (p: Pen) => { p.ell(256, 140, 220, 80, "#f4f6f8", 8); p.ell(256, 140, 150, 50, null, 4); p.g.fillStyle = "#c8202a"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText("0", 256, 165); };
const crackHeart = (k: number) => (p: Pen) => { heartDraw(p); if (k > 0) p.line([[128, 70], [110, 120], [146, 150], [120, 215]], "#1a1010", 10); };
const oddsDraw = (p: Pen) => { p.poly([[16, 16], [496, 16], [496, 240], [16, 240]], "#1a1a1e", 8); p.g.fillStyle = "#ffd23f"; p.g.textAlign = "center"; p.g.font = "bold 120px Arial"; p.g.fillText("20 a 1", 256, 170); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#9ab86a");
    // dirt track along x, white rails on both sides
    flatGround(R, 400, 7, "#b08a5a", 60, 0, 0.012);
    const rail = lamC("#f4f6f8");
    for (const z of [-3.8, 3.8]) { box(R, 400, 0.12, 0.12, rail, 60, 1.05, z); for (let k = 0; k < 100; k++) box(R, 0.1, 1.05, 0.1, rail, -140 + k * 4, 0.52, z); }
    // hedges
    const hedge = lamC("#3a6a2a");
    for (const x of HEDGES) box(R, 0.8, 1.1, 6.4, hedge, x, 0.55, 0);
    // grandstand behind the far rail
    const wood = lam({ map: rep(planksHD(), 6, 1), color: "#d8c8a8" });
    for (let k = 0; k < 5; k++) box(R, 60, 0.6, 1.4, wood, FIN - 10, 0.3 + k * 0.6, -6 - k * 1.4);
    box(R, 62, 0.4, 9, lamC("#5a6a7a"), FIN - 10, 6.4, -9.5); for (let k = 0; k < 7; k++) cyl(R, 0.12, 0.12, 6.2, rail, FIN - 40 + k * 10, 3.1, -5.6, 6);
    // finish post
    cyl(R, 0.12, 0.12, 4, rail, FIN, 2, -4.1, 8); box(R, 1.6, 0.8, 0.1, lamC("#e8202a"), FIN, 3.8, -4.1);
    for (let k = 0; k < 12; k++) tree(R, -60 + k * 22, -30 - (k % 3) * 6, 1.6 + (k % 2) * 0.4, "#4a7a3a");
    // stable
    const st = lam({ map: rep(planksHD(), 3, 1), color: "#a8784a" });
    box(R, 10, 3.6, 0.2, st, STB[0], 1.8, -2.2); box(R, 0.2, 3.6, 6, st, STB[0] - 5, 1.8, 0.8); box(R, 0.2, 3.6, 6, st, STB[0] + 5, 1.8, 0.8);
    flatGround(R, 10, 6, "#d8b86a", STB[0], 0.8, 0.014);
    for (let k = 0; k < 3; k++) box(R, 1.2, 0.6, 0.8, lamC("#e8c86a"), STB[0] - 3.5 + k * 1.3, 0.3, -1.6);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const ph = (Math.floor(t * 8 * 2) % 8) / 8; // 2 strides/s, 8 frames of gallop
    const yJ = (x: number) => { let y = 0; for (const h of HEDGES) { const d = (x - h) / 2.2; if (Math.abs(d) < 1) y = Math.max(y, (1 - d * d) * 0.9); } return y; };
    const kiss = (expr: "stern" | "grin" | "pained" | "dazed" | "shout", z = 0.6) => { const x = hx(f); card(`kiss|${ph}|${expr}`, x, z, 1.0, mount(KISS, FRANK, ph, expr), 1, 0, yJ(x)); return x; };
    if (id === S.hook || id === S.end || id === S.keeps) { const x = kiss("dazed"); for (let k = 0; k < 2; k++) { const xo = x - 5 - k * 4; card(`o${k}|${ph}`, xo, -1.4 + k * 1.4, 1.0, mount(COATS[k] as typeof KISS, JOCK(k), (ph + 0.3 * (k + 1)) % 1, "shout"), 1, 0, yJ(xo)); } }
    if (id === S.ny) { for (let k = 0; k < 40; k++) person(`fan${k}`, FAN(k), FIN - 30 + (k % 20) * 2.4 + (Math.floor(k / 20) % 2) * 1.2, 0.6 + Math.floor(k / 20) * 0.6, -6.2 - Math.floor(k / 20) * 1.4, { mode: "stand", expr: "grin", facing: 0, wave: k % 3 ? undefined : Math.sin(t * 6 + k) * 0.4 + 0.5 }, 20 + k); fx("flag", 512, 320, flagDraw(["#b22234", "#f4f1ea", "#b22234", "#f4f1ea", "#b22234"]), FIN - 10, 7.6, -9, 1.6, 1.0); }
    if (id === S.stable || id === S.diet) {
      card(`sk|${id}`, STB[0] + 0.6, -0.6, 1.0, (p: Pen) => horse(p, KISS, 1000, null), -1, 0);
      person("fr", id === S.diet ? FRANK : GROOM, STB[0] - 1.4, 0, 0.4, { mode: "stand", expr: id === S.diet ? "nervous" : "neutral", facing: 1, wave: id === S.stable ? 0.5 + Math.sin(t * 8) * 0.3 : undefined }, 1);
      if (id === S.stable && f > W.nunca - 4) fx("zero", 512, 200, textDraw("0 VICTORIAS", "#ff6a6a", 80), STB[0] - 1.4, 2.4, 0.5, 0.9, 0.35);
      if (id === S.diet && f > W.comer - 10) fx("plate", 512, 280, plateDraw, STB[0] - 1.0, 1.2, 0.8, 0.6, 0.33);
    }
    if (id === S.kiss) {
      card("sk|k", STB[0] + 0.2, -0.4, 1.0, (p: Pen) => horse(p, KISS, 1000, null), 1, 0);
      if (f > W.sweet - 4) fx("name", 512, 160, labelDraw("SWEET KISS", "#e8202a"), STB[0] + 0.4, 2.7, 0.3, 0.9, 0.28);
      if (f > W.apuesta - 6) fx("odds", 512, 256, oddsDraw, STB[0] + 0.9, 1.9, 0.6, 0.6, 0.3);
    }
    if (id === S.race) { kiss(f > W.cabeza - 6 ? "grin" : "stern"); for (let k = 0; k < 3; k++) { const xo = hx(f) - (f > W.cabeza - 10 ? 2 + k * 2.5 : -1 + k * 1.2) ; card(`o${k}|${ph}`, xo, -1.6 + k * 1.1, 1.0, mount(COATS[k] as typeof KISS, JOCK(k), (ph + 0.3 * (k + 1)) % 1, "shout"), 1, 0, yJ(xo)); } }
    if (id === S.heart) { const x = kiss(f > W.para ? "dazed" : "pained"); fx(`hrt|${f > W.para - 2 ? 1 : 0}`, 256, 256, crackHeart(f > W.para - 2 ? 1 : 0), x + 0.3, 2.9 + yJ(x), 0.9, 0.5 + (f > W.para - 2 ? 0 : 0.04 * Math.sin(t * 20)), 0.5); }
    if (id === S.finish) { const x = kiss("dazed"); for (let k = 0; k < 2; k++) { const xo = x - 4 - k * 3; card(`o${k}|${ph}`, xo, -1.4 + k * 1.4, 1.0, mount(COATS[k] as typeof KISS, JOCK(k), (ph + 0.3 * (k + 1)) % 1, "shout"), 1, 0); }
      if (f > W.primero - 4) fx("first", 512, 220, textDraw("¡1º!", "#ffd23f", 160), FIN, 4.8, -3.9, 1.4, 0.6);
      for (let k = 0; k < 24; k++) person(`fan${k}`, FAN(k), FIN - 14 + (k % 12) * 2.4, 0.6 + Math.floor(k / 12) * 0.6, -6.2 - Math.floor(k / 12) * 1.4, { mode: "stand", expr: "laugh", facing: 0, wave: Math.sin(t * 7 + k) * 0.4 + 0.5 }, 20 + k); }
    if (id === S.congrats) {
      card("kd", FIN + 6, 0.4, 1.0, mount(KISS, FRANK, null, "dazed"), -1, 0);
      for (let k = 0; k < 4; k++) person(`m${k}`, FAN(k * 2), FIN + 3.6 + (k % 2) * 0.8, 0, 1.4 - Math.floor(k / 2) * 0.7 + Math.max(0, (W.cuenta - f) * 0.02), { mode: f < W.cuenta - 10 ? "march" : "stand", phase: t * 4, expr: f > W.cuenta - 4 ? "shock" : "grin", facing: 1, wave: f < W.cuenta - 4 ? 0.8 : undefined }, 30 + k);
      if (f > W.cuenta - 2 && f < W.unico - 6) fx("ex", 256, 256, exDraw, FIN + 4.6, 2.6, 1.2, 0.4, 0.4);
    }
    if (id === S.kissdeath) {
      card("sk|d", STB[0] + 0.2, -0.4, 1.0, (p: Pen) => horse(p, { ...KISS, cloth: undefined }, 1000, null), 1, 0);
      if (f > W.beso - 6) fx("sign", 1024, 512, signDraw(["«EL BESO", "DE LA MUERTE»"], "#1a1a1e", "#ffd23f"), STB[0], 3.0, -2.0, 2.6, 1.3);
      fx("q", 256, 256, qDraw, STB[0] + 1.2, 2.5, 0.2, 0.35, 0.35);
    }
    if (id === S.cta) {
      const x = FIN + 20; card(`kc|${ph}`, x, 0.4, 1.0, mount(KISS, FRANK, null, "grin"), 1, 0);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), x + 0.2, 3.5, 0.8, 2.4, 1.2);
    }
  }
}
