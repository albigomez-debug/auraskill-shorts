// "Hachiko": Shibuya station 1924 with its exit gate at the origin, the professor's university (UNI), the newspaper wall (NEWS), Shibuya today (MOD).
import * as THREE from "three";
import { Pen, Outfit, SKINS, WG } from "./toon";
import { rep, planksHD, cobbleHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, tree, house, textDraw, labelDraw, newsDraw, signDraw, heartDraw, tearDraw, exDraw } from "./props";
import { dogDraw } from "./beasts";
import { S, W, UNI, NEWS, MOD } from "./story";

const UENO: Outfit = { jacket: "#3a3a44", pants: "#3a3a44", boots: "#111", hat: "tophat", skin: SKINS[1], moustache: "#2a2a2a", belt: null, buttons: "#c8c0b0" };
const JP = (v: number): Outfit => ({ jacket: ["#3a4a6a", "#6a4a3a", "#4a5a4a", "#7a3a4a"][v % 4], pants: "#2a2a34", boots: "#1a1a1e", hat: v % 3 ? "hair" : "cap", hair: "#1a1a1a", cap: "#2a2a34", skin: SKINS[1], belt: null, dress: v % 2 ? ["#c87a8a", "#5a7ab0"][v % 2 ? 0 : 1] : undefined });
const WORKER: Outfit = { jacket: "#1a2a4a", pants: "#1a2a4a", boots: "#111", hat: "cap", cap: "#1a2a4a", skin: SKINS[1], belt: null, buttons: "#e8c45a" };
const MODERN = (v: number): Outfit => ({ jacket: ["#e84a5a", "#3a8ad8", "#f0c83a", "#2a2a2a", "#8ad8a8", "#f4f1ea"][v % 6], pants: ["#3a5a8a", "#2a2a2a", "#c8b890"][v % 3], boots: "#f4f1ea", hat: "hair", hair: ["#1a1a1a", "#8a5a3a", "#c87a3a"][v % 3], skin: SKINS[1], belt: null });
const trainDraw = (p: Pen) => {
  const G = WG; p.poly([[60, G - 120], [60, G - 760], [1940, G - 760], [1940, G - 120]], "#3a5a3a", 12);
  p.poly([[60, G - 700], [1940, G - 700], [1940, G - 640], [60, G - 640]], "#e8c45a", 0);
  for (let k = 0; k < 6; k++) p.poly([[140 + k * 300, G - 600], [340 + k * 300, G - 600], [340 + k * 300, G - 420], [140 + k * 300, G - 420]], "#bfe4f2", 8);
  for (const cx of [300, 700, 1300, 1700]) p.ell(cx, G - 100, 90, 90, "#1a1a1e", 8);
};
const bowlDraw = (p: Pen) => { p.poly([[40, 150], [216, 150], [190, 220], [66, 220]], "#c8323a", 7); p.ell(128, 150, 88, 24, "#f4f1ea", 5); };
const calDraw = (p: Pen) => { p.ell(128, 128, 110, 110, "#f4f1ea", 10); p.stroke([[128, 128], [128, 50]], 10, "#c8202a"); p.stroke([[128, 128], [180, 160]], 14); p.dot(128, 128, 10); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // Shibuya station 1924: wooden building with the exit gate, plaza, platform and track behind
    const cob = lam({ map: rep(cobbleHD(), 8, 4), color: "#d8ccbc" });
    const pl = new THREE.Mesh(new THREE.PlaneGeometry(24, 12).rotateX(-Math.PI / 2), cob); pl.position.set(0, 0.01, 1); R.add(pl);
    box(R, 4, 3.4, 0.25, lam({ map: rep(planksHD(), 2, 1), color: "#c8a878" }), -3.6, 1.7, -2.2); box(R, 4, 3.4, 0.25, lam({ map: rep(planksHD(), 2, 1), color: "#c8a878" }), 3.6, 1.7, -2.2);
    box(R, 11.2, 0.6, 0.3, lamC("#5a3a2a"), 0, 3.6, -2.2);
    box(R, 11.2, 0.4, 1.2, lamC("#3a3a44"), 0, 0.2, -4.2);
    for (const z of [-5.2, -5.9]) box(R, 30, 0.06, 0.06, lamC("#5a5a62"), 0, 0.06, z);
    for (let k = 0; k < 4; k++) house(R, -12 + k * 8 + (k > 1 ? 0 : 0), -10, 5, 5 + (k % 2), 4, ["#e8dcc0", "#c8a878"][k % 2], "#3a3a44");
    tree(R, -6.5, -0.4, 0.9, "#e8a8b8");
    // statue pedestal (for the statue shot) at x 2.6
    box(R, 0.9, 0.7, 0.7, lamC("#7a7a72"), 2.6, 0.35, -0.6);
    // university office
    box(R, 8, 3.2, 0.2, lamC("#d8ccb4"), UNI[0], 1.6, -1.6); flatGround(R, 8, 6, "#8a6a4a", UNI[0], 0.5, 0.012);
    box(R, 1.4, 0.8, 0.7, lamC("#6a4a2a"), UNI[0], 0.4, -0.8); box(R, 0.5, 0.9, 0.5, lamC("#5a3a20"), UNI[0] - 0.3, 0.45, -0.2);
    // newspaper wall
    box(R, 4, 3, 0.2, lamC("#5a5a62"), NEWS[0], 1.5, -1.2);
    // modern Shibuya: grey plaza, tall buildings with screens
    flatGround(R, 30, 20, "#9a9aa2", MOD[0], -2, 0.012);
    for (let k = 0; k < 6; k++) { box(R, 5, 10 + (k % 3) * 5, 5, lamC(["#c8ccd4", "#8a929a", "#d8dce4"][k % 3]), MOD[0] - 13 + k * 5.2, 5 + (k % 3) * 2.5, -10); box(R, 3, 2, 0.1, lamC(["#e84a8a", "#3ac8e8", "#f0c83a"][k % 3]), MOD[0] - 13 + k * 5.2, 6, -7.4); }
    box(R, 0.9, 0.7, 0.7, lamC("#7a7a72"), MOD[0], 0.35, -0.6);
    for (let k = 0; k < 3; k++) tree(R, MOD[0] - 4 + k * 4, -3.6, 0.8, "#4a7a3a");
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const fr = Math.round(t * 8) % 8, D = 0.42;
    const hachi = (key: string, x: number, z: number, mode: "walk" | "sit" | "bark", dir = 1, y = 0) =>
      card(`ha|${key}|${mode}|${mode === "sit" ? 0 : fr}`, x, z, D, dogDraw(mode === "sit" ? 0 : fr * 0.785, mode, "akita"), dir, 0, y);
    if (id === S.hook || id === S.wait || id === S.years) {
      hachi("h", 0.2, 0.2, "sit", 1);
      fx("clk", 256, 256, calDraw, 0, 3.2, -2.0, 0.5, 0.5);
      if (id === S.wait) for (let k = 0; k < 3; k++) person(`p${k}`, JP(k), -1.8 + ((f - 310) * 0.05 + k * 1.4) % 4, 0, -1.0, { mode: "stroll", phase: t * 5 + k, expr: "neutral", facing: 1 }, 10 + k);
      if (id === S.wait && f > W.novuelve - 4) fx("q", 256, 256, (p) => { p.g.fillStyle = "#ffd23f"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 14; p.g.font = "bold 200px Arial"; p.g.textAlign = "center"; p.g.strokeText("?", 128, 200); p.g.fillText("?", 128, 200); }, 0.5, 1.0, 0.3, 0.3, 0.3);
    }
    if (id === S.tokyo) {
      fx("st", 1024, 512, signDraw(["SHIBUYA"], "#f2ece0", "#2a2a32"), 0, 4.4, -2.0, 2.4, 1.2);
      hachi("h", 0.3, 0.2, "sit", 1);
      if (f > W.hachiko - 4) fx("name", 512, 160, labelDraw("HACHIKO", "#c8823a"), 0.4, 1.3, 0.3, 0.8, 0.25);
    }
    if (id === S.daily) {
      const back = f > W.vuelve - 10;
      hachi("h", 0.2, 0.2, back ? "bark" : "sit", 1);
      if (back) { person("ueno", UENO, 0.95 - Math.min(0.3, (f - W.vuelve + 10) * 0.01), 0, -0.2, { mode: "stand", expr: "grin", facing: -1, wave: 0.8 }, 1); fx("heart", 256, 256, heartDraw, 0.75, 1.1 + Math.sin(t * 4) * 0.05, 0.3, 0.25, 0.25); }
      if (f > W.ueno - 4) fx("pr", 512, 160, labelDraw("PROF. UENO", "#3a3a44"), 0.7, 2.3, 0, 0.8, 0.25);
      if (f < W.vuelve - 10) fx("clk", 256, 256, calDraw, 0, 3.2, -2.0, 0.5, 0.5);
    }
    if (id === S.uni) {
      fx("fl", 256, 256, (p) => { p.line([[128, 240], [128, 100]], "#3a7a3a", 10); for (let k = 0; k < 5; k++) p.ell(128 + Math.cos(k * 1.26) * 30, 80 + Math.sin(k * 1.26) * 30, 22, 22, "#f4f1ea", 4); p.ell(128, 80, 16, 16, "#e8c45a", 3); }, UNI[0] + 0.3, 1.05, -0.6, 0.35, 0.35);
      fx("tear", 256, 256, tearDraw, UNI[0] - 0.3, 1.5, -0.2, 0.2, 0.2);
    }
    if (id === S.keeps) {
      const x = Math.min(0.2, -3 + (f - 396) * 0.05);
      hachi("h", x, 0.2, x < 0.2 ? "walk" : "sit", 1);
      fx("clk", 256, 256, calDraw, 0, 3.2, -2.0, 0.5, 0.5);
      if (f > W.puerta - 4) fx("gate", 512, 200, textDraw("MISMA PUERTA", "#ffd23f", 80), 0.2, 1.3, 0.3, 0.8, 0.31);
    }
    if (id === S.shoo) {
      const out = f > W.echan && f < W.vuelve2;
      person("wk", WORKER, 0.95, 0, -0.2, { mode: "stand", expr: f > W.vuelve2 + 6 ? "relief" : "stern", facing: -1, wave: f > W.echan - 6 && f < W.vuelve2 ? Math.sin(t * 10) * 0.4 + 0.6 : undefined }, 1);
      hachi("h", out ? 0.2 - (f - W.echan) * 0.06 : 0.2, 0.2, out ? "walk" : "sit", out ? -1 : 1);
      if (f > W.vuelve2) fx("ex", 256, 256, exDraw, 0.95, 2.2, 0, 0.3, 0.3);
    }
    if (id === S.food) {
      person("vec", JP(1), 0.5, 0, -0.1, { mode: "stand", expr: "smile", facing: -1 }, 1);
      hachi("h", -0.5, 0.2, "sit", 1);
      if (f > W.comer - 6) fx("bowl", 256, 256, bowlDraw, -0.05, 0.12, 0.4, 0.35, 0.35);
    }
    if (id === S.news) {
      const N = NEWS[0];
      fx("paper", 720, 920, newsDraw("TOKYO ASAHI · 1932", "EL PERRO", "MÁS FIEL"), N, 1.5, -1.0, 0.95, 1.21);
      if (f > 704) { for (let k = 0; k < 5; k++) person(`r${k}`, JP(k), N - 1.6 + k * 0.8, 0, 0.6 - (k % 2) * 0.4, { mode: "stand", expr: "grin", facing: 0 }, 10 + k); fx("heart", 256, 256, heartDraw, N + 0.2, 2.3 + Math.sin(t * 4) * 0.05, 1.0, 0.4, 0.4); }
    }
    if (id === S.statue) {
      card("st", 2.6, -0.6, D, dogDraw(0, "sit", "akita"), 1, 0, 0.7);
      hachi("h", 1.9, 0.0, "sit", 1);
      fx("lab", 512, 160, labelDraw("ESTATUA · 1934", "#6a6a62"), 2.6, 1.65, -0.4, 0.8, 0.25);
    }
    if (id === S.train) {
      const tx = -8 + Math.min(1, (f - 836) / 40) * 8;
      card("train", tx, -5.5, 1.2, trainDraw, 1, 0);
      hachi("h", 0.3, 0.3, "sit", -1);
      for (let k = 0; k < 3; k++) if (f > 870) person(`p${k}`, JP(k + 1), -1 + k * 0.9, 0, -1.3, { mode: "stroll", phase: t * 5 + k, expr: "neutral", facing: 1 }, 10 + k);
      if (f > W.desgracia + 30) fx("tear", 256, 256, tearDraw, 0.55, 0.72, 0.4, 0.12, 0.12);
    }
    if (id === S.today) {
      card("st", MOD[0], -0.6, D, dogDraw(0, "sit", "akita"), 1, 0, 0.7);
      for (let k = 0; k < 10; k++) person(`m${k}`, MODERN(k), MOD[0] + (k % 2 ? 1 : -1) * (0.9 + Math.floor(k / 2) * 0.55), 0, -0.4 + (k % 3) * 0.5, { mode: "stand", expr: k % 3 ? "smile" : "grin", facing: (k % 2 ? -1 : 1) as 1 | -1, wave: k % 4 === 0 ? 0.7 : undefined }, 10 + k);
    }
    void cyl;
  }
}
