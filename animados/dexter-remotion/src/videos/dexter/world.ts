// "Timothy Dexter": Newburyport street (x = 0), the Newcastle docks (NEWC), the Caribbean plantation (CAR), Dexter's mansion (HOME).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD, cobbleHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, palm, house, sailShip, textDraw, labelDraw, signDraw, docDraw, coinDraw, exDraw } from "./props";
import { catDraw } from "./beasts";
import { S, W, NEWC, CAR, HOME } from "./story";

const DEX: Outfit = { jacket: "#7a2a6a", pants: "#e8dcc0", boots: "#2a1a10", hat: "tophat", skin: SKINS[0], buttons: "#e8c45a", sash: "#e8c45a", belt: null };
const RICH = (v: number): Outfit => ({ jacket: ["#1a2a4a", "#2a2a2a", "#3a2a1a"][v % 3], pants: "#2a2a30", boots: "#111", hat: "tophat", skin: SKINS[0], moustache: v % 2 ? "#c8c0b0" : undefined, belt: null, buttons: "#c8c0b0", build: v === 1 ? "stout" : "adult" });
const MINER = (v: number): Outfit => ({ jacket: "#4a4a4a", pants: "#3a3a3a", boots: "#1a1a1a", hat: "cap", cap: "#2a2a2a", skin: SKINS[v % 2], belt: null, moustache: v % 2 ? "#2a2a2a" : undefined });
const WORKER = (v: number): Outfit => ({ jacket: "#e8dcc0", pants: "#c8b890", boots: "#5a3a2a", hat: v % 2 ? "slouch" : "hair", hair: "#1a1a1a", skin: SKINS[2 + (v % 2)], belt: null });
const bubbleDraw = (txt: string) => (p: Pen) => { p.ell(256, 110, 236, 90, "#ffffff", 8); p.poly([[150, 180], [110, 250], [210, 190]], "#ffffff", 0); p.g.fillStyle = "#1a1a1e"; p.g.font = `bold ${txt.length > 14 ? 34 : 46}px Arial`; p.g.textAlign = "center"; p.g.fillText(txt, 256, 126); };
const panDraw = (p: Pen) => { p.ell(90, 160, 80, 60, "#c8823a", 8); p.ell(90, 160, 56, 40, "#a8622a", 0); p.line([[160, 140], [480, 40]], "#6a4a2a", 18); };
const ratDraw = (k: number) => (p: Pen) => { p.ell(128, 170, 70, 40, "#7a7a82", 6); p.ell(190, 155, 34, 28, "#7a7a82", 6); p.ell(178, 130, 14, 14, "#e8a8b0", 4); p.dot(205, 150, 5); p.line([[60, 170], [10, 150 + k * 20]], "#e8a8b0", 6); };
const sackDraw = (p: Pen) => { p.poly([[60, 240], [40, 120], [90, 60], [166, 60], [216, 120], [196, 240]], "#2a2a2a", 8); p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 34px Arial"; p.g.textAlign = "center"; p.g.fillText("CARBÓN", 128, 170); };
const sunDraw = (p: Pen) => { for (let k = 0; k < 12; k++) { const a = k * 0.5236; p.stroke([[128 + Math.cos(a) * 80, 128 + Math.sin(a) * 80], [128 + Math.cos(a) * 120, 128 + Math.sin(a) * 120]], 14, "#ffb83a"); } p.ell(128, 128, 66, 66, "#ffd23f", 8); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // Newburyport street
    const cob = lam({ map: rep(cobbleHD(), 8, 3), color: "#d8ccbc" });
    const st = new THREE.Mesh(new THREE.PlaneGeometry(30, 10).rotateX(-Math.PI / 2), cob); st.position.set(0, 0.01, 0); R.add(st);
    for (let k = 0; k < 6; k++) house(R, -10 + k * 4, -5, 3.6, 4 + (k % 2), 3, ["#e8dcc0", "#c8a878", "#a8483a"][k % 3], "#3a3a44");
    // Newcastle: grey dock, sea, collier ship, coal heaps
    flatGround(R, 60, 40, "#4a6a7a", NEWC[0], -26, 0.02);
    box(R, 20, 0.4, 8, lamC("#6a6a6a"), NEWC[0], 0.2, 0);
    sailShip(R, NEWC[0] + 2, -8, 0.8, "#2a2a2a", 2);
    for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 8), lamC("#1a1a1e")); c.position.set(NEWC[0] - 5 + k * 1.6, 0.9, -2.5); R.add(c); }
    for (let k = 0; k < 4; k++) house(R, NEWC[0] - 7 + k * 4.6, -14, 4, 5, 3, "#7a6a62", "#3a3a3a");
    // Caribbean: sand, palms, plantation vat, the sea
    flatGround(R, 40, 30, "#ecd8a0", CAR[0], -4, 0.012);
    flatGround(R, 80, 40, "#2fa8c0", CAR[0], -40, 0.02);
    for (let k = 0; k < 8; k++) { const x = CAR[0] - 14 + k * 4; if (Math.abs(x - CAR[0] - 6) < 2 || Math.abs(x - CAR[0] + 6) < 2) continue; palm(R, x, -5 - (k % 2) * 2, 1); }
    cyl(R, 0.8, 0.7, 0.9, lamC("#6a4a2a"), CAR[0] + 6, 0.45, -0.6, 14);
    const mol = new THREE.Mesh(new THREE.CircleGeometry(0.72, 18).rotateX(-Math.PI / 2), lamC("#4a2a10")); mol.position.set(CAR[0] + 6, 0.88, -0.6); R.add(mol);
    // mansion
    box(R, 10, 4, 0.2, lam({ map: rep(planksHD(), 2, 1), color: "#e8d8b0" }), HOME[0], 2, -2);
    flatGround(R, 10, 8, "#7a2a3a", HOME[0], 1, 0.012);
    for (const dx of [-3, 3]) box(R, 0.4, 4, 0.4, lamC("#f4f1ea"), HOME[0] + dx, 2, -1.7);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const N = NEWC[0], C = CAR[0], H = HOME[0];
    const coins = (cx: number, n: number, z = 0.4) => { for (let k = 0; k < n; k++) fx(`co${k % 3}`, 256, 256, coinDraw("$"), cx - 0.9 + (k % 6) * 0.36, 0.15 + Math.floor(k / 6) * 0.2 + Math.abs(Math.sin(t * 3 + k)) * 0.04, z + (k % 2) * 0.05, 0.28, 0.28); };
    if (id === S.hook || id === S.end || id === S.luck) {
      person("dex", DEX, H, 0, 0, { mode: "stand", expr: id === S.luck ? "grin" : "laugh", facing: 0, wave: Math.sin(t * 6) * 0.3 + 0.6 }, 1);
      coins(H, id === S.luck ? 18 : 12);
      if (id === S.luck) for (let k = 0; k < 6; k++) { const y = 3.2 - ((f - 772 + k * 12) % 70) * 0.05; fx(`fc${k % 3}`, 256, 256, coinDraw("$"), H - 1 + k * 0.4, y, 0.3, 0.2, 0.2); }
    }
    if (id === S.town) {
      person("dex", DEX, 0, 0, 0, { mode: f < 150 ? "stroll" : "stand", phase: t * 5, expr: f > W.escribir - 4 ? "dazed" : "grin", facing: 1 }, 1);
      if (f > W.timothy - 4) fx("name", 512, 160, labelDraw("T. DEXTER", "#7a2a6a"), 0, 2.45, 0.2, 0.9, 0.28);
      if (f > W.escribir - 4) fx("doc", 512, 620, docDraw("¿ABC?", "", "garabatos"), 0.45, 1.25, 0.3, 0.32, 0.39);
    }
    if (id === S.mock || id === S.book) {
      const shock = id === S.book && f > W.desgracia;
      person("dex", DEX, 0, 0, 0, { mode: "stand", expr: id === S.book ? "grin" : f > W.malisimos ? "grin" : "neutral", facing: 0, wave: id === S.book && f > W.libro - 4 ? 0.9 : undefined }, 1);
      for (let k = 0; k < 3; k++) person(`r${k}`, RICH(k), (k % 2 ? 1 : -1) * (1.0 + (k > 1 ? 0.7 : 0)), 0, -0.7, { mode: "stand", expr: shock ? "shock" : f > W.reirse - 4 || id === S.book ? "laugh" : "smile", facing: (k % 2 ? -1 : 1) as 1 | -1 }, 10 + k);
      if (id === S.mock && f > W.malisimos - 4) fx("bad", 512, 200, textDraw("CONSEJOS MALOS", "#ff4a3a", 64), 0, 2.4, 0.2, 1.0, 0.39);
      if (id === S.book && f > W.libro - 4) fx("bk", 512, 620, docDraw("MI LIBRO", f > W.comas - 4 ? "SIN . NI ," : "", "por T. Dexter"), 0.45, 1.3, 0.3, 0.35, 0.42);
    }
    if (id === S.coal || (id === S.warm && f < 516)) {
      const coal = id === S.coal;
      person("dex", DEX, 0.55, 0, 0, { mode: "stand", expr: "grin", facing: -1, wave: (coal && f > W.hace - 4) || (!coal && f > W.calentadores + 10) ? 0.9 : undefined }, 1);
      person("r0", RICH(1), -0.45, 0, -0.1, { mode: "stand", expr: "laugh", facing: 1 }, 2);
      fx(`bub${coal ? 1 : 2}`, 512, 260, bubbleDraw(coal ? "¡CARBÓN A NEWCASTLE!" : "¡CALENTADORES AL CARIBE!"), 0.05, 2.45, 0.3, 0.75, 0.38);
      if (!coal) fx("pan", 512, 256, panDraw, 0.95, 1.1, 0.3, 0.6, 0.3);
    }
    if (id === S.newc) {
      const strike = f > W.huelga - 4, sold = f > W.vende - 4;
      for (let k = 0; k < 3; k++) person(`m${k}`, MINER(k), N - 1.4 + k * 0.7, 0.4, -0.6, { mode: "stand", expr: sold ? "grin" : strike ? "stern" : "neutral", facing: 1 }, 10 + k);
      if (strike) fx("strike", 1024, 512, signDraw(["HUELGA"], "#f2ece0", "#c8202a"), N - 0.7, 2.6, -0.4, 1.2, 0.6);
      for (let k = 0; k < 3; k++) fx(`sk${k}`, 256, 256, sackDraw, N + 0.8 + k * 0.5, 0.75, 0.2, 0.45, 0.45);
      if (sold) coins(N + 0.5, 6, 0.5);
    }
    if (id === S.warm && f >= 516) fx("sun", 256, 256, sunDraw, C + 1.6, 4.8, -2, 1.8, 1.8);
    if (id === S.warm && f > W.calor - 4) fx("hot", 512, 200, textDraw("¡40 °C!", "#ff4a3a", 110), C, 3.0, -0.5, 1.4, 0.55);
    if (id === S.plant) {
      for (let k = 0; k < 2; k++) {
        const x = C + 5.3 + k * 1.4; person(`w${k}`, WORKER(k), x, 0, 0.1, { mode: "stand", expr: f > W.compran - 4 ? "grin" : "neutral", facing: (k ? -1 : 1) as 1 | -1 }, 1 + k);
        fx(`pan${k}`, 512, 256, panDraw, x + (k ? -0.5 : 0.5), 1.0 + Math.sin(t * 5 + k) * 0.06, -0.2, 0.6, 0.3);
      }
      if (f > W.melaza - 4) fx("mel", 512, 200, textDraw("MELAZA", "#c8823a", 100), C + 6, 2.3, 0, 0.8, 0.31);
    }
    if (id === S.cats) {
      const X = C - 6, rats = f > W.ratas - 10, fr = Math.round(t * 8) % 8;
      for (let k = 0; k < 3; k++) card(`cat${k}|${rats ? "w" : "s"}|${rats ? fr : 0}`, X - 0.8 + k * 0.7 + (rats ? (f - W.ratas) * 0.01 : 0), 0.2 - k * 0.2, 0.38, catDraw(rats ? fr * 0.785 : 0, rats ? "walk" : "sit", false, ["#9a9aa2", "#e8a85a", "#3a3a3a"][k]), 1, 0);
      if (rats) for (let k = 0; k < 4; k++) fx(`rat${Math.floor(f / 4) % 2}`, 256, 256, ratDraw(Math.floor(f / 4) % 2), X + 0.9 + k * 0.35 + (f - W.ratas) * 0.015, 0.12, -0.3 + k * 0.15, 0.3, 0.3);
      if (f > W.ganancias - 4) { coins(X, 6, 0.6); fx("gan", 512, 200, textDraw("¡GANANCIAS!", "#ffd23f", 90), X, 1.5, 0.3, 0.9, 0.35); }
      if (f > W.gatos - 4 && !rats) fx("ex", 256, 256, exDraw, X, 1.2, 0.2, 0.3, 0.3);
    }
  }
}
