// "La Mona Lisa robada": the Louvre gallery (x = 0), a newspaper wall (x = 10), the police office (x = 20), the Louvre outside (OUT), Florence (FLO).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD, stoneHD, cobbleHD } from "./paint";
import { Base, Api, lam, lamC, box } from "./base";
import { grassGround, newsDraw, qDraw, exDraw, signDraw } from "./props";
import { S, W, OUT, FLO } from "./story";

const PERUGGIA: Outfit = { jacket: "#f2f0ea", pants: "#3a3a44", boots: "#2a2020", hat: "cap", cap: "#3a3a44", skin: SKINS[2], moustache: "#2a1a10", dress: "#f2f0ea", belt: null };
const PERU2: Outfit = { ...PERUGGIA, dress: undefined, jacket: "#5a4a3a", hat: "tophat" };
const COP = (v: number): Outfit => ({ jacket: "#1e2a4a", pants: "#1e2a4a", boots: "#111", hat: "cap", cap: "#1e2a4a", skin: SKINS[v % 3], moustache: "#3a2a20", buttons: "#e8c45a", belt: null });
const PICASSO: Outfit = { jacket: "#2a3a6a", pants: "#3a3a44", boots: "#2a2020", hat: "hair", hair: "#2a2a2a", skin: SKINS[2], belt: null };
const FOLK = (v: number): Outfit => { const o: Outfit = { jacket: ["#3a3a44", "#5a3a2a", "#2a3a4a", "#6a5a3a", "#7a2a3a"][v % 5], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 4] }; return v % 2 ? { ...o, hat: "bonnet", dress: ["#5a2a4a", "#2a4a5a", "#7a5a3a"][v % 3] } : { ...o, hat: v % 4 ? "tophat" : "cap", cap: "#3a3a3a" }; };

const monaDraw = (p: Pen) => {
  p.poly([[16, 16], [496, 16], [496, 680], [16, 680]], "#8a6a20", 14); p.poly([[56, 56], [456, 56], [456, 640], [56, 640]], "#6a7a4a", 6);
  p.poly([[56, 56], [456, 56], [456, 300], [56, 300]], "#8a9a6a", 0);
  p.poly([[110, 640], [140, 430], [256, 380], [372, 430], [402, 640]], "#3a2a1a", 6);
  p.ell(256, 270, 100, 130, "#e8c08a", 6); p.poly([[150, 260], [160, 140], [256, 120], [352, 140], [362, 260], [330, 190], [256, 170], [182, 190]], "#2a1a10", 0);
  p.poly([[150, 260], [140, 420], [190, 400], [182, 200]], "#2a1a10", 0); p.poly([[362, 260], [372, 420], [322, 400], [330, 200]], "#2a1a10", 0);
  p.dot(222, 260, 9); p.dot(290, 260, 9); p.arc(256, 330, 34, 12, 20, 160, 6, "#8a4a3a");
  p.ell(256, 600, 80, 30, "#e8c08a", 5);
};
const holeDraw = (p: Pen) => { for (const [x, y] of [[100, 60], [412, 60], [100, 640], [412, 640]]) p.dot(x, y, 14, "#3a3a3a"); p.poly([[80, 40], [432, 40], [432, 660], [80, 660]], null, 0); p.poly([[80, 40], [432, 40], [432, 660], [80, 660]], "#e8d8b0", 6); p.g.fillStyle = "#8a7a5a"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText("?", 256, 380); };
const paintDraw = (k: number) => (p: Pen) => { p.poly([[16, 16], [496, 16], [496, 368], [16, 368]], "#8a6a20", 12); p.poly([[50, 50], [462, 50], [462, 334], [50, 334]], ["#5a7aa2", "#a85a3a", "#4a6a3a"][k % 3], 4); p.ell(256 + k * 30, 200, 90, 60, ["#e8c45a", "#f2ece0", "#c8823a"][k % 3], 4); };
const handcuffDraw = (p: Pen) => { p.ell(80, 128, 50, 50, null, 0); p.arc(80, 128, 50, 50, 0, 360, 16, "#9aa2aa"); p.arc(176, 128, 50, 50, 0, 360, 16, "#9aa2aa"); p.stroke([[130, 128], [126, 128]], 12, "#9aa2aa"); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // gallery
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(9, 14).rotateX(-Math.PI / 2), lam({ map: rep(planksHD(), 3, 4), color: "#a8784a" })); floor.position.set(0, 0.01, 2); R.add(floor);
    const wall = lamC("#c8b48a");
    box(R, 9, 5, 0.2, wall, 0, 2.5, -3.1); for (const dx of [-4.5, 4.5]) box(R, 0.2, 5, 14, wall, dx, 2.5, 2);
    box(R, 9, 0.3, 0.3, lamC("#8a6a3a"), 0, 0.15, -2.95);
    // closet
    box(R, 1.2, 2.2, 0.7, lam({ map: rep(planksHD(), 0.5, 1), color: "#6a4a2a" }), -3.6, 1.1, -0.6);
    // newspaper wall, police office
    box(R, 4, 3, 0.2, lamC("#5a5a62"), 10, 1.5, -1.3);
    box(R, 8, 4, 0.2, lamC("#9aa2a8"), 20, 2, -2); box(R, 1.6, 0.08, 0.8, lamC("#6a4a2a"), 20, 0.85, -0.6);
    // Louvre outside: stone palace + pyramid-free square
    const stone = lam({ map: rep(stoneHD(), 6, 3) });
    box(R, 40, 12, 6, stone, OUT[0], 6, OUT[2] - 8);
    for (let k = 0; k < 9; k++) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.6), lamC("#3a4a5a")); w.position.set(OUT[0] - 16 + k * 4, 6.5, OUT[2] - 4.98); R.add(w); }
    const door = new THREE.Mesh(new THREE.PlaneGeometry(3, 4), lamC("#3a2a1a")); door.position.set(OUT[0], 2, OUT[2] - 4.97); R.add(door);
    const sq = new THREE.Mesh(new THREE.PlaneGeometry(50, 16).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 12, 4), color: "#d8ccbc" })); sq.position.set(OUT[0], 0.01, OUT[2] + 2); R.add(sq);
    // Florence shop
    box(R, 8, 4, 0.2, lamC("#d8a878"), FLO[0], 2, FLO[2] - 2); box(R, 1.6, 0.9, 0.7, lam({ map: rep(planksHD(), 0.6, 0.4), color: "#6a4a2a" }), FLO[0], 0.45, FLO[2] - 0.8);
  }

  pose(a: Api) {
    const { f, id, t, person, fx } = a;
    const gone = (id === S.steal && f > W.descuelga + 6) || id === S.hole || id === S.queue;
    const galleryShot = id === S.hook || id === S.closet || id === S.steal || id === S.hole || id === S.back || id === S.end;
    if (galleryShot) {
      for (let k = 0; k < 3; k++) for (const sx of [-1, 1]) fx(`pt${k}|${sx}`, 512, 384, paintDraw(k + (sx > 0 ? 1 : 0)), sx * 4.38, 1.8, -1.5 + k * 2.6, 1.0, 0.75);
      if (!gone) fx("mona", 512, 700, monaDraw, 0, 1.7, -2.85, 0.75, 1.03);
      else fx("hole", 512, 700, holeDraw, 0, 1.7, -2.85, 0.75, 1.03);
    }
    if (id === S.closet) {
      const out = f > W.sale - 4;
      person("peru", PERUGGIA, -3.6 + (out ? Math.min(1, (f - W.sale) / 20) * 1.2 : 0), 0, out ? -0.1 : -0.6, { mode: out ? "stroll" : "stand", phase: t * 5, expr: "nervous", facing: 1, look: Math.sin(t * 3) }, 1);
    }
    if (id === S.steal) {
      const taken = f > W.descuelga + 6, hidden = f > W.mete;
      person("peru", PERUGGIA, 0.2, 0, -2.3, { mode: "stand", expr: hidden ? "whistle" : "nervous", facing: -1, wave: !hidden ? 0.9 : undefined }, 1);
      if (taken && !hidden) fx("mona", 512, 700, monaDraw, -0.15, 1.4, -2.0, 0.6, 0.82);
    }
    if (id === S.exit) {
      person("peru", PERUGGIA, OUT[0] - 1 + (f - 361) * 0.04, 0, -3.5 + (f - 361) * 0.05, { mode: "stroll", phase: t * 5, expr: "whistle", facing: 1 }, 1);
    }
    if (id === S.hole) {
      for (let k = 0; k < 3; k++) person(`g${k}`, k ? COP(k) : FOLK(4), -1.2 + k * 1.2, 0, -1.4, { mode: "stand", expr: f > W.escandalo - 4 ? "shock" : "dazed", facing: 0 }, 10 + k);
      if (f > W.hueco - 2) fx("ex", 256, 256, exDraw, 0, 2.6, -2.6, 0.4, 0.4);
    }
    if (id === S.news) fx("paper", 720, 920, newsDraw("LE PETIT PARISIEN · 1911", "¡ROBADA", "LA MONA LISA!"), 10, 1.5, -1.1, 0.95, 1.21);
    if (id === S.police) {
      person("cop", COP(0), 20.6, 0, -0.3, { mode: "stand", expr: "stern", facing: -1, wave: 0.8 }, 1);
      person("picasso", PICASSO, 19.4, 0, -0.3, { mode: "stand", expr: f > W.picasso - 2 ? "shock" : "nervous", facing: 1 }, 2);
      if (f > W.picasso - 2) fx("q", 256, 256, qDraw, 19.45, 2.2, 0, 0.3, 0.3);
    }
    if (id === S.queue) {
      fx("sign", 1024, 512, signDraw(["MUSÉE DU LOUVRE"], "#2a3a5a", "#f2ece0"), OUT[0], 4.8, OUT[2] - 4.7, 4, 2);
      for (let k = 0; k < 16; k++) person(`q${k}`, FOLK(k), OUT[0] + 0.5 + k * 0.55, 0, -3.6 + k * 0.45, { mode: "stand", expr: k % 3 ? "neutral" : "grin", facing: -1 }, 20 + k);
    }
    if (id === S.caught) {
      const X = FLO[0], got = f > W.pillan - 4;
      person("peru", PERU2, X - 0.5, 0, 0, { mode: "stand", expr: got ? "shock" : "grin", facing: 1 }, 1);
      person("dealer", FOLK(2), X + 0.6, 0, 0, { mode: "stand", expr: got ? "grin" : "stern", facing: -1 }, 2);
      if (f > W.venderla - 4) fx("mona", 512, 700, monaDraw, X + 0.05, 1.25, -0.6, 0.45, 0.62);
      if (got) { person("cop", COP(1), X + 1.4, 0, -0.4, { mode: "stand", expr: "stern", facing: -1 }, 3); fx("cuffs", 256, 256, handcuffDraw, X - 0.3, 1.1, 0.3, 0.3, 0.3); }
    }
    if (id === S.back) {
      for (let k = 0; k < 10; k++) person(`v${k}`, FOLK(k + 3), (k % 2 ? 1 : -1) * (0.75 + Math.floor(k / 2) * 0.55), 0, -1.6 + (k % 3) * 0.5, { mode: "stand", expr: f > W.desgracia - 4 ? "grin" : "shock", facing: 0, wave: k % 3 === 0 && f < W.desgracia ? Math.sin(t * 6 + k) * 0.5 + 0.5 : undefined }, 30 + k);
    }
  }
}
