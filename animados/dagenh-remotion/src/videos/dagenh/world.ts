// "Dagen H": a Stockholm street seen from above (road along z at x = 0), the government room (GOV), the road-sign corner (SIGN), the bus stop (x = 4.6).
import * as THREE from "three";
import { Pen, Outfit, SKINS, WG } from "./toon";
import { rep, cobbleHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, house, tree, textDraw, exDraw, qDraw, signDraw, noteDraw, flagDraw, labelDraw } from "./props";
import { S, W, GOV, SIGN } from "./story";

const COLS = ["#c8323a", "#3a6ac8", "#e8c43a", "#3a9a5a", "#e8e4dc", "#8a4ac8", "#e87a2a"];
const sweFlag = flagDraw(["#2a5ab0"], false, (p) => { p.g.fillStyle = "#f2c83a"; p.g.fillRect(150, 16, 50, 286); p.g.fillRect(16, 134, 480, 50); });
/** car seen from above, nose up (-z), on a 256x512 canvas */
const topCar = (col: string) => (p: Pen) => {
  p.poly([[50, 40], [206, 40], [226, 120], [226, 460], [206, 490], [50, 490], [30, 460], [30, 120]], col, 10);
  p.poly([[60, 130], [196, 130], [186, 200], [70, 200]], "#2a3a4a", 6); p.poly([[70, 380], [186, 380], [196, 430], [60, 430]], "#2a3a4a", 6);
  p.poly([[64, 210], [192, 210], [192, 370], [64, 370]], col, 6);
  for (const x of [52, 204]) p.ell(x, 50, 14, 10, "#fff6b0", 3);
};
/** side-view car on the 2000x1400 profile card, nose right */
const sideCar = (col: string, wheel: number) => (p: Pen) => {
  const G = WG;
  p.poly([[260, G - 120], [260, G - 380], [620, G - 420], [780, G - 640], [1260, G - 640], [1440, G - 420], [1740, G - 380], [1760, G - 120]], col, 12);
  p.poly([[820, G - 600], [1010, G - 600], [1010, G - 430], [700, G - 430]], "#bfe4f2", 8); p.poly([[1050, G - 600], [1230, G - 600], [1380, G - 430], [1050, G - 430]], "#bfe4f2", 8);
  for (const cx of [520, 1500]) { p.ell(cx, G - 120, 130, 130, "#1a1a1e", 8); p.ell(cx, G - 120, 50, 50, "#c8c8d0", 4); p.stroke([[cx, G - 120], [cx + Math.cos(wheel) * 50, G - 120 + Math.sin(wheel) * 50]], 10, "#5a5a62"); }
  p.ell(1730, G - 330, 30, 22, "#fff6b0", 4);
};
const wheelDraw = (left: boolean) => (p: Pen) => { p.poly([[30, 30], [482, 30], [482, 290], [30, 290]], "#e8e4dc", 10); p.poly([[60, 60], [452, 60], [452, 140], [60, 140]], "#bfe4f2", 6); const x = left ? 150 : 362; p.arc(x, 220, 60, 60, 0, 360, 14, "#1a1a1e"); p.g.fillStyle = "#c8323a"; p.g.font = "bold 40px Arial"; p.g.textAlign = "center"; p.g.fillText("VOLANTE", 256, 120); };
const clockDraw = (h: number, m: number) => (p: Pen) => { p.ell(128, 128, 110, 110, "#f4f1ea", 10); const am = (m / 60) * Math.PI * 2, ah = ((h + m / 60) / 12) * Math.PI * 2; p.stroke([[128, 128], [128 + Math.sin(ah) * 55, 128 - Math.cos(ah) * 55]], 14); p.stroke([[128, 128], [128 + Math.sin(am) * 85, 128 - Math.cos(am) * 85]], 8, "#c8202a"); p.dot(128, 128, 10); };
const chartDraw = (p: Pen) => { p.poly([[16, 16], [496, 16], [496, 380], [16, 380]], "#f4f1ea", 8); p.line([[60, 80], [200, 120], [300, 290], [440, 320]], "#c8323a", 14); p.g.fillStyle = "#1a1a1e"; p.g.font = "bold 44px Arial"; p.g.textAlign = "center"; p.g.fillText("ACCIDENTES", 256, 70); };
const hDraw = (p: Pen) => { p.ell(256, 256, 230, 230, "#f2c83a", 12); p.g.fillStyle = "#2a5ab0"; p.g.font = "bold 300px Arial"; p.g.textAlign = "center"; p.g.fillText("H", 256, 360); };
const OFF: Outfit = { jacket: "#2a2a32", pants: "#2a2a32", boots: "#111", hat: "hair", hair: "#c8c8c8", skin: SKINS[0], belt: null, buttons: "#c8c0b0", build: "stout" };
const SWEDE = (v: number, h = false): Outfit => ({ jacket: h ? "#f2c83a" : ["#3a5a8a", "#8a3a3a", "#5a5a5a", "#3a7a5a"][v % 4], pants: "#2a2a34", boots: "#1a1a1e", hat: v % 3 ? "hair" : "cap", hair: ["#e8d08a", "#8a5a3a", "#c8a060"][v % 3], cap: "#2a2a34", skin: SKINS[0], belt: null, dress: v % 2 ? ["#c8323a", "#3a6ac8"][v % 2] : undefined });

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // the road along z: asphalt, centre line, pavements, houses both sides
    flatGround(R, 5, 200, "#4a4a52", 0, -40, 0.01);
    for (let k = 0; k < 60; k++) box(R, 0.12, 0.01, 1.4, lamC("#f4f1ea"), 0, 0.02, 20 - k * 3);
    const cob = lam({ map: rep(cobbleHD(), 2, 40), color: "#c8c0b4" });
    for (const x of [-3.5, 3.5]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(2, 200).rotateX(-Math.PI / 2), cob); m.position.set(x, 0.03, -40); R.add(m); }
    for (let k = 0; k < 24; k++) for (const s of [-1, 1]) house(R, s * 7, 14 - k * 5, 4, 5 + (k % 3), 4, ["#e8c48a", "#c8823a", "#e8dcc0", "#a8483a"][(k + (s > 0 ? 1 : 0)) % 4], "#4a3a3a");
    for (let k = 0; k < 6; k++) tree(R, -4.8, 8 - k * 9, 0.7, "#4a7a3a");
    // bus stop pole on the pavement
    cyl(R, 0.04, 0.04, 2.2, lamC("#3a3a40"), 3.6, 1.1, -1.5, 6);
    // government room
    box(R, 10, 3.5, 0.2, lamC("#d8ccb4"), GOV[0], 1.75, -2);
    flatGround(R, 14, 8, "#8a6a4a", GOV[0] + 3, 1, 0.012);
    box(R, 1.2, 1.1, 0.6, lamC("#6a4a2a"), GOV[0], 0.55, -0.6);
    // sign corner
    flatGround(R, 10, 8, "#4a4a52", SIGN[0], 1, 0.012);
    for (let k = 0; k < 3; k++) house(R, SIGN[0] - 4 + k * 4, -5, 3.6, 5, 3, "#e8c48a", "#4a3a3a");
    cyl(R, 0.05, 0.05, 2.6, lamC("#3a3a40"), SIGN[0] + 0.6, 1.3, -0.4, 6);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    // traffic seen from above. Before 5:00 they keep LEFT (x < 0 going -z); after, RIGHT (x > 0 going -z).
    const traffic = (mode: "left" | "stopped" | "switch" | "right" | "chaos", z0: number) => {
      for (let k = 0; k < 8; k++) {
        const up = k % 2 === 0, base = z0 + 6 - ((k * 3.1) % 14);
        let x = up ? -1.1 : 1.1, z = base + (mode === "stopped" || mode === "switch" ? 0 : (up ? -1 : 1) * ((f * 0.06) % 6));
        if (mode === "right" || (mode === "switch" && f > W.cruzan - 6)) { const k2 = mode === "right" ? 1 : Math.min(1, (f - W.cruzan + 6) / 50); x = (up ? -1.1 : 1.1) * (1 - 2 * k2); }
        if (mode === "chaos") x = (k % 3 === 0 ? 1 : -1) * 1.1;
        fx(`car${k}|${up ? 1 : 0}`, 256, 512, topCar(COLS[k % COLS.length]), x, 0.06 + k * 0.002, z, 1.5, 3.0);
        void up;
      }
    };
    if (id === S.hook || id === S.end) { traffic("switch", 0); fx(`clk|${f % 60 < 30 ? 0 : 1}`, 256, 256, clockDraw(5, 0), 1.6, 0.1, -5.5, 1.4, 1.4); }
    if (id === S.left) {
      traffic("left", -6);
      if (f > W.vecinos - 4) fx("nb", 512, 200, textDraw("VECINOS: DERECHA ➡", "#ffd23f", 56), 0, 0.2, -9.5, 4, 1.56);
    }
    if (id === S.sweden) {
      fx("flag", 512, 320, sweFlag, -3.8, 3.4, -2.6, 1.4, 0.88);
      for (let k = 0; k < 3; k++) card(`sc${k}`, -4 + k * 4.5 + ((f * 0.05) % 2), -1.1 + (k % 2) * 2.2, 1.0, sideCar(COLS[k + 1], f * 0.3), k % 2 ? -1 : 1, 0);
    }
    if (id === S.chaos) {
      card("sc", -1.2, 0, 1.0, sideCar(COLS[0], 0), 1, 0);
      person("drv", SWEDE(2), -1.6, 0.35, 0.05, { mode: "sit", expr: f > W.caos - 4 ? "shock" : "nervous", facing: 1 }, 1);
      if (f > W.volante - 4) fx("wh", 512, 320, wheelDraw(true), -0.2, 2.1, 0.2, 0.9, 0.56);
      if (f > W.caos - 4) { fx("caos", 512, 200, textDraw("¡CAOS!", "#ff4a3a", 120), -1.1, 1.6, 0.4, 0.9, 0.35); fx("ex", 256, 256, exDraw, -2.2, 1.6, 0.4, 0.4, 0.4); }
    }
    if (id === S.gov) {
      person("off", OFF, GOV[0], 0, -0.9, { mode: "stand", expr: f > W.cambiar - 4 ? "shout" : "stern", facing: 0, wave: f > W.todos - 4 ? 0.9 : undefined }, 1);
      fx("flag", 512, 320, sweFlag, GOV[0] - 1.8, 2.4, -1.85, 1.0, 0.63);
      if (f > W.septiembre - 4) fx("date", 1024, 512, signDraw(["3 SEPT 1967", "IZQ. ➡ DER."], "#f2ece0", "#2a5ab0"), GOV[0] + 1.4, 2.2, -1.85, 1.4, 0.7);
      for (let k = 0; k < 4; k++) person(`p${k}`, SWEDE(k), GOV[0] - 1.6 + k * 1.05, 0, 0.8, { mode: "stand", expr: f > W.todos ? "shock" : "neutral", facing: 0 }, 10 + k);
    }
    if (id === S.ads) {
      const X = GOV[0] + 6;
      fx("H", 512, 512, hDraw, X, 2.4, -1.85, 1.2, 1.2);
      if (f > W.anuncios - 4) for (let k = 0; k < 2; k++) fx(`ad${k}`, 1024, 512, signDraw(["DÍA H", "¡A LA DERECHA!"], "#f2c83a", "#2a5ab0"), X + (k ? 2.2 : -2.2), 2.0, -1.85, 1.4, 0.7);
      for (let k = 0; k < 4; k++) person(`p${k}`, SWEDE(k, f > W.ropa - 4), X - 1.6 + k * 1.05, 0, 0, { mode: "stand", expr: "grin", facing: 0, wave: f > W.canciones - 4 ? Math.sin(t * 7 + k) * 0.5 + 0.5 : undefined }, 10 + k);
      if (f > W.canciones - 4) for (let k = 0; k < 3; k++) fx(`n${k}`, 256, 256, noteDraw(k), X - 1 + k, 2.2 + Math.sin(t * 4 + k) * 0.1, 0.2, 0.35, 0.35);
      if (f > W.ropa - 4) fx("tee", 512, 160, labelDraw("¡Y ROPA!", "#2a5ab0"), X, 2.7, 0.3, 1.2, 0.38);
    }
    if (id === S.stop) { traffic("stopped", -12); fx("clk", 256, 256, clockDraw(4, 50), 1.6, 0.1, -17, 1.4, 1.4); }
    if (id === S.cross) {
      traffic(f > W.cinco - 2 ? "switch" : "stopped", -12);
      fx(`clk|${f > W.cinco - 2 ? 1 : 0}`, 256, 256, clockDraw(f > W.cinco - 2 ? 5 : 4, f > W.cinco - 2 ? 0 : 59), 1.6, 0.1, -17, 1.4, 1.4);
      if (f > W.pita - 4) fx("pi", 512, 200, textDraw("¡PIIIII!", "#ffd23f", 110), 0, 0.3, -14.5, 3.4, 1.33);
    }
    if (id === S.signs) {
      const flip = f > W.senales;
      fx(`sg|${flip ? 1 : 0}`, 1024, 512, signDraw(flip ? ["MANTENGA", "DERECHA ➡"] : ["⬅ MANTENGA", "IZQUIERDA"], "#2a5ab0", "#f4f1ea"), SIGN[0] + 0.25, 2.4, -0.3, 1.0, 0.5);
      for (let k = 0; k < 2; k++) person(`w${k}`, { ...SWEDE(k), jacket: "#e87a2a", dress: undefined }, SIGN[0] - 0.4 + k * 1.6, 0, 0.1, { mode: "stand", expr: "stern", facing: (k ? -1 : 1) as 1 | -1, wave: 0.8 }, 1 + k);
      if (f > W.senales - 4) fx("miles", 512, 200, textDraw("MILES", "#ffd23f", 110), SIGN[0] - 0.5, 2.6, 0.3, 0.8, 0.31);
    }
    if (id === S.luck) {
      person("off", OFF, GOV[0] - 0.4, 0, -0.2, { mode: "stand", expr: "grin", facing: 1 }, 1);
      if (f > W.accidentes - 6) fx("ch", 512, 400, chartDraw, GOV[0] + 0.55, 1.5, 0.2, 0.8, 0.62);
    }
    if (id === S.bus) {
      const conf = f > W.parada - 4;
      fx("bs", 1024, 512, signDraw(["BUS"], "#f2c83a", "#2a2a32"), 3.6, 2.35, -1.45, 0.6, 0.3);
      for (let k = 0; k < 3; k++) person(`b${k}`, SWEDE(k + 1), 3.9 + k * 0.6, 0.03, -0.6 + k * 0.2, { mode: "stand", expr: conf ? "dazed" : "neutral", facing: -1, look: Math.sin(t * 3 + k) }, 1 + k);
      if (conf) fx("q", 256, 256, qDraw, 4.5, 2.2, -0.3, 0.4, 0.4);
      if (f > W.autobus - 6) card(`bus|${Math.floor(f / 3) % 4}`, -1.0 + (f - W.autobus) * 0.08, -2, 1.5, sideCar("#2a5ab0", f * 0.3), 1, 0);
    }
  }
}
