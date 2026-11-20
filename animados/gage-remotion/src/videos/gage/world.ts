// "Phineas Gage": the railway cut (x = 0), the road with the ox cart (x = 20), the doctor (DOC), the town friends (TOWN), the classroom (LAB).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD, stoneHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, tree, house, textDraw, exDraw, smokeDraw, labelDraw, qDraw, docDraw } from "./props";
import { burstDraw } from "./beasts";
import { S, W, DOC, TOWN, LAB } from "./story";

const GAGE: Outfit = { jacket: "#8a4a2a", pants: "#4a4a5a", boots: "#3a2a20", hat: "slouch", skin: SKINS[0], belt: "#5a4024" };
const WORK = (v: number): Outfit => ({ jacket: ["#5a6a8a", "#8a7a5a", "#6a3a3a"][v % 3], pants: "#3a3a44", boots: "#3a2a20", hat: v % 2 ? "cap" : "slouch", cap: "#3a3a3a", skin: SKINS[v % 3], belt: "#5a4024", moustache: v % 2 ? "#3a2a1a" : undefined });
const DOCTOR: Outfit = { jacket: "#2a2a32", pants: "#2a2a32", boots: "#111", hat: "hair", hair: "#8a8a8a", skin: SKINS[0], moustache: "#8a8a8a", beard: "#8a8a8a", belt: null, buttons: "#c8c0b0" };
const FOLK = (v: number): Outfit => { const o: Outfit = { jacket: ["#3a5a3a", "#5a3a5a", "#6a5a3a"][v % 3], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 3] }; return v % 2 ? { ...o, hat: "bonnet", dress: "#6a3a4a" } : { ...o, hat: "tophat" }; };
const STUD = (v: number): Outfit => ({ jacket: ["#2a2a32", "#3a3a4a", "#4a3a2a"][v % 3], pants: "#2a2a30", boots: "#111", hat: "hair", hair: ["#5a3a20", "#2a2a2a", "#c8a060"][v % 3], skin: SKINS[v % 2], belt: null });
/** iron bar on a 1024x128 canvas */
const rodDraw = (p: Pen) => { p.poly([[10, 54], [1000, 44], [1014, 64], [1000, 84], [10, 74]], "#5a5e66", 6); p.stroke([[30, 58], [990, 52]], 6, "#9aa2aa"); };
const sparkDraw = (p: Pen) => { for (let k = 0; k < 8; k++) { const a = k * 0.785; p.stroke([[128 + Math.cos(a) * 30, 128 + Math.sin(a) * 30], [128 + Math.cos(a) * 100, 128 + Math.sin(a) * 100]], 12, "#ffd23f"); } };
const brainDraw = (p: Pen) => {
  p.poly([[16, 16], [1008, 16], [1008, 700], [16, 700]], "#2a4a3a", 14);
  p.ell(512, 380, 320, 220, "#f2b8c0", 8); p.ell(330, 330, 150, 140, "#e84a5a", 6);
  for (let k = 0; k < 6; k++) p.arc(460 + k * 60, 360, 50, 80, 200, 340, 6, "#b87880");
  p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 56px Arial"; p.g.textAlign = "center"; p.g.fillText("CARÁCTER", 330, 140);
  p.stroke([[330, 160], [330, 210]], 8, "#f4f1ea");
};
const skullDraw = (p: Pen) => { p.ell(256, 230, 170, 180, "#f2ecd8", 8); p.ell(190, 250, 40, 46, "#2a2a2a", 0); p.ell(320, 250, 40, 46, "#2a2a2a", 0); p.poly([[256, 300], [236, 340], [276, 340]], "#2a2a2a", 0); p.poly([[180, 380], [330, 380], [320, 450], [190, 450]], "#f2ecd8", 6); for (let k = 0; k < 5; k++) p.stroke([[200 + k * 28, 390], [200 + k * 28, 440]], 4); p.stroke([[150, 470], [370, 40]], 26, "#5a5e66"); };
const bubbleDraw = (txt: string) => (p: Pen) => { p.ell(256, 110, 236, 90, "#ffffff", 8); p.poly([[150, 180], [110, 250], [210, 190]], "#ffffff", 0); p.g.fillStyle = "#1a1a1e"; p.g.font = `bold ${txt.length > 12 ? 40 : 54}px Arial`; p.g.textAlign = "center"; p.g.fillText(txt, 256, 128); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // railway cut: rock walls, gravel, rails, a big rock with the hole
    flatGround(R, 30, 12, "#b8a888", 0, -1, 0.01);
    const rock = lam({ map: rep(stoneHD(), 4, 2), color: "#9a8a7a" });
    for (let k = 0; k < 6; k++) box(R, 4, 2.5 + (k % 3), 3, rock, -10 + k * 4, 1.4, -5 - (k % 2));
    for (const z of [1.6, 2.6]) box(R, 30, 0.08, 0.08, lamC("#5a5a62"), 0, 0.08, z);
    for (let k = 0; k < 24; k++) box(R, 0.18, 0.06, 1.5, lamC("#6a4a2a"), -14 + k * 1.2, 0.03, 2.1);
    const big = new THREE.Mesh(new THREE.DodecahedronGeometry(0.6), rock); big.position.set(0.55, 0.3, -0.2); big.scale.y = 0.6; R.add(big);
    for (let k = 0; k < 4; k++) tree(R, -12 + k * 8, -10, 1.1);
    // road and ox cart
    flatGround(R, 20, 3, "#c8b090", 22, 0, 0.012);
    // doctor's office
    box(R, 6, 3.5, 0.2, lam({ map: rep(planksHD(), 2, 1), color: "#c8a878" }), DOC[0], 1.75, -1.6);
    box(R, 1.4, 0.8, 0.7, lamC("#6a4a2a"), DOC[0] + 1.6, 0.4, -0.9);
    // town street
    for (let k = 0; k < 4; k++) house(R, TOWN[0] - 6 + k * 4, -5, 3.6, 4 + (k % 2), 3, ["#e8dcc0", "#c8a878", "#a8c0c8"][k % 3], "#4a3a3a");
    flatGround(R, 20, 6, "#c8b090", TOWN[0], 0, 0.012);
    // classroom
    box(R, 14, 4, 0.2, lamC("#d8ccb4"), LAB[0] + 3, 2, -2.2);
    flatGround(R, 14, 8, "#8a6a4a", LAB[0] + 3, 1, 0.012);
    box(R, 1.2, 1.0, 0.6, lamC("#6a4a2a"), LAB[0] + 6, 0.5, -1.2);
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    // the bar in flight / through the head: a diagonal fx, rotated by drawing it long and placing it
    const rod = (x: number, y: number, z: number, len = 1.0) => fx("rod", 1024, 128, rodDraw, x, y, z, len, len / 8);
    if (id === S.hook || id === S.end || id === S.rod) {
      const flying = id === S.rod;
      const ry = flying ? 0.6 + Math.max(0, f - 398) * 0.06 : 1.62;
      person("gage", GAGE, 0, 0, 0, { mode: "stand", expr: flying ? (f > W.cabeza ? "dazed" : "shock") : "shout", facing: 0, headTilt: flying ? 0 : Math.sin(t * 9) * 4 }, 1);
      fx("rodv", 128, 1024, (p) => { p.poly([[54, 10], [44, 1000], [64, 1014], [84, 1000], [74, 10]], "#5a5e66", 6); p.stroke([[58, 30], [52, 990]], 6, "#9aa2aa"); }, 0.08, ry, 0.25, 0.12, 1.0);
      if (!flying) fx("bub", 512, 260, bubbleDraw("¡ESTOY BIEN!"), 0.5, 2.45, 0.2, 0.7, 0.36);
      if (flying && f > W.entra - 3 && f < W.cabeza + 6) fx("ex", 256, 256, exDraw, -0.4, 2.0, 0.2, 0.35, 0.35);
    }
    if (id === S.site) {
      for (let k = 0; k < 4; k++) person(`w${k}`, WORK(k), -4 + k * 1.6 + (k > 1 ? 4 : 0), 0, -1.2, { mode: "stand", expr: "stern", facing: (k > 1 ? -1 : 1) as 1 | -1 }, 10 + k);
      person("gage", GAGE, 0, 0, 0, { mode: "stand", expr: "smile", facing: 1 }, 1);
      if (f > W.gage - 4) fx("name", 512, 160, labelDraw("PHINEAS GAGE", "#8a4a2a"), 0, 2.3, 0.1, 1.1, 0.34);
    }
    if (id === S.tamp) {
      person("gage", GAGE, -0.1, 0, 0, { mode: "stand", expr: f > W.aprieta ? "stern" : "whistle", facing: 1, wave: 0.6 }, 1);
      const bob = f > W.aprieta ? Math.abs(Math.sin(t * 6)) * 0.12 : 0;
      fx("rodv", 128, 1024, (p) => { p.poly([[54, 10], [44, 1000], [64, 1014], [84, 1000], [74, 10]], "#5a5e66", 6); }, 0.45, 0.9 + bob, 0.1, 0.1, 0.85);
      if (f > W.polvora - 4 && f < W.aprieta) fx("pow", 512, 200, textDraw("PÓLVORA", "#2a2a2a", 80), 0.6, 1.6, 0.3, 0.6, 0.24);
      if (f > 316) fx("1m", 512, 200, textDraw("1 METRO", "#ffd23f", 90), 0.9, 1.9, 0.3, 0.7, 0.27);
      if (f > W.chispa - 3) fx("spark", 256, 256, sparkDraw, 0.5, 0.45, 0.3, 0.35, 0.35);
    }
    if (id === S.boom) {
      fx("boom", 256, 256, burstDraw("#ffd23f"), 0.4, 1.0, 0.2, 2.6, 2.6);
      for (let k = 0; k < 3; k++) fx(`sm${k}`, 256, 256, smokeDraw(k), -0.8 + k * 0.9, 1.2 + (f - 348) * 0.02, 0.1, 1.8, 1.8, true);
    }
    if (id === S.up) {
      person("gage", GAGE, 0, 0, 0, { mode: f > W.levanta - 2 ? "stand" : "sit", expr: f > W.habla - 4 ? "smile" : "dazed", facing: 0 }, 1);
      if (f > W.habla - 4) fx("bub", 512, 260, bubbleDraw("¿QUÉ PASÓ?"), 0.5, 2.3, 0.2, 0.6, 0.3);
    }
    if (id === S.cart) {
      const x = 20 + (f - 541) * 0.04;
      box; // the cart is built per frame from fx-free meshes would be heavy; use a painted card
      fx("cart", 1024, 512, (p) => { p.poly([[100, 120], [900, 120], [900, 320], [100, 320]], "#8a5a3a", 10); for (const cx of [260, 740]) { p.ell(cx, 380, 110, 110, "#6a4a2a", 10); p.ell(cx, 380, 20, 20, "#2a1a10", 0); } p.stroke([[900, 220], [1010, 220]], 20, "#5a3a20"); }, x, 0.65, 0.2, 2.0, 1.0);
      person("gage", GAGE, x - 0.2, 0.55, 0.1, { mode: "sit", expr: "grin", facing: 1 }, 1);
      person("drv", WORK(1), x + 0.6, 0.55, 0.0, { mode: "sit", expr: "nervous", facing: 1 }, 2);
    }
    if (id === S.doc) {
      const X = DOC[0];
      person("gage", GAGE, X - 0.5, 0, 0, { mode: "stand", expr: "grin", facing: 1, wave: f > W.doctor - 4 ? 0.8 : undefined }, 1);
      person("doc", DOCTOR, X + 0.6, 0, -0.1, { mode: "stand", expr: f > W.doctor - 2 ? "shock" : "neutral", facing: -1 }, 2);
      if (f > W.doctor - 4 && f < W.sobrevive - 4) fx("bub", 512, 260, bubbleDraw("¡AQUÍ TIENE TRABAJO!"), X - 0.4, 2.35, 0.2, 0.75, 0.38);
      if (f > W.sobrevive - 4) fx("ok", 512, 620, docDraw("PACIENTE", "SOBREVIVE", "P. Gage"), X + 0.1, 1.45, 0.4, 0.4, 0.48);
    }
    if (id === S.friends) {
      const X = TOWN[0];
      person("gage", GAGE, X, 0, 0, { mode: "stand", expr: f > W.impulsivo - 4 ? "shout" : "stern", facing: 0, wave: f > W.impulsivo - 4 ? Math.sin(t * 8) * 0.4 + 0.6 : undefined }, 1);
      for (let k = 0; k < 3; k++) person(`f${k}`, FOLK(k), X + (k ? 1 : -1) * (0.9 + (k > 1 ? 0.7 : 0)), 0, -0.6, { mode: "stand", expr: f > W.amigos + 20 ? "nervous" : "neutral", facing: (k ? -1 : 1) as 1 | -1 }, 10 + k);
      if (f > W.impulsivo - 4) fx("imp", 512, 160, labelDraw("IMPULSIVO", "#c8323a"), X - 0.5, 2.3, 0.2, 0.75, 0.23);
      if (f > W.maleducado - 4) fx("mal", 512, 160, labelDraw("MALEDUCADO", "#8a3ac8"), X + 0.5, 2.0, 0.25, 0.75, 0.23);
    }
    if (id === S.brain) {
      fx("brain", 1024, 720, brainDraw, LAB[0] + 0.6, 2.0, -2.05, 2.0, 1.4);
      person("gage", GAGE, LAB[0] - 0.9, 0, -0.6, { mode: "stand", expr: "dazed", facing: 1 }, 1);
      if (f > W.caracter - 4) fx("q", 256, 256, qDraw, LAB[0] - 0.9, 2.2, -0.5, 0.35, 0.35);
    }
    if (id === S.years) {
      person("gage", GAGE, -1.6 + (f - 846) * 0.012, 0, 0, { mode: f < 900 ? "stroll" : "stand", phase: t * 5, expr: f > W.desgracia ? "nervous" : "smile", facing: 1, blink: f > W.ojo - 4 ? 1 : undefined }, 1);
      if (f > W.ojo - 6) fx("eye", 512, 160, labelDraw("-1 OJO", "#c8323a"), -0.4, 2.2, 0.2, 0.6, 0.19);
    }
    if (id === S.science) {
      const X = LAB[0] + 6;
      fx("skull", 512, 512, skullDraw, X, 1.45, -1.1, 0.55, 0.55);
      for (let k = 0; k < 4; k++) person(`s${k}`, STUD(k), X + (k % 2 ? 1 : -1) * (0.8 + Math.floor(k / 2) * 0.7), 0, -0.4 - (k % 2) * 0.2, { mode: "stand", expr: f > W.ciencia ? "shock" : "neutral", facing: (k % 2 ? -1 : 1) as 1 | -1 }, 10 + k);
    }
    void rod; void cyl;
  }
}
