// "Annie Taylor y el Niágara" (24-X-1901): her house (x=0), the river bank above the falls (TOP, y=12), the falls face (FAL) and basin, the street (STR).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { catDraw, burstDraw } from "./beasts";
import { grassGround, flatGround, tree, house, textDraw, labelDraw, coinDraw, qDraw, exDraw, ctaDraw, bubbleDraw, barrelDraw, fallsDraw, mistDraw, tearDraw } from "./props";
import { S, W, TOP, FAL, STR, barrelY, smooth } from "./story";

const ANNIE: Outfit = { jacket: "#1a1a1e", pants: "#1a1a1e", boots: "#111", hat: "bonnet", skin: SKINS[0], dress: "#1a1a1e", belt: null, buttons: "#c8c0b0" };
const MAN = (v: number): Outfit => ({ jacket: ["#5a3a2a", "#2a3a4a", "#6a5a3a", "#3a4a3a"][v % 4], pants: "#2a2a30", boots: "#2a2020", hat: v % 2 ? "tophat" : "slouch", cap: "#3a3a3a", skin: SKINS[v % 4], moustache: "#3a2a1a", belt: null });
const AGENT: Outfit = { jacket: "#7a6a3a", pants: "#4a3a2a", boots: "#111", hat: "tophat", skin: SKINS[1], moustache: "#1a1a1a", belt: null, buttons: "#e8c45a" };
const pumpDraw = (p: Pen) => { p.poly([[110, 60], [146, 60], [146, 230], [110, 230]], "#8a8e96", 6); p.stroke([[128, 60], [128, 20]], 10); p.stroke([[90, 20], [166, 20]], 12); p.poly([[70, 230], [186, 230], [186, 250], [70, 250]], "#3a3a3a", 5); };
const cutDraw = (p: Pen) => { p.band([[30, 128], [226, 128]], "#f4f1ea", 40, 6); p.ell(150, 128, 18, 10, "#c8202a", 0); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#8aa85a");
    // house interior-ish front for Annie (x = 0)
    house(R, 0, -5, 8, 4, 4, "#e8dcc0", "#5a4a52"); flatGround(R, 10, 6, "#9a7a5a", 0, 0, 0.012);
    // cliff and the falls: rock block top at y = 12, river on top, falls face at z = FAL[2]
    const rock = lamC("#6a6258");
    box(R, 60, 12, 30, rock, FAL[0], 6, -15 + FAL[2]); 
    const river = new THREE.Mesh(new THREE.PlaneGeometry(60, 30).rotateX(-Math.PI / 2), lamC("#4a9ac8")); river.position.set(FAL[0], 12.02, -15 + FAL[2]); R.add(river);
    flatGround(R, 60, 40, "#3a7ab0", FAL[0], 20 + FAL[2], 0.02);
    for (let k = 0; k < 8; k++) tree(R, FAL[0] - 28 + k * 8, -24 + FAL[2], 1.4, "#3a6a2a");
    for (let k = 0; k < 8; k++) { const t2 = tree; t2(R, FAL[0] - 28 + k * 8, -4 + FAL[2] - 26, 1.2, "#4a7a3a"); }
    // top bank where the barrel is launched (TOP): small dock
    box(R, 4, 0.3, 2, lam({ map: rep(planksHD(), 2, 1), color: "#a8784a" }), TOP[0], 12.15, TOP[2]);
    flatGround(R, 9, 4, "#c8b48a", FAL[0] + 8, 0.6, 0.035);
    { const wf = new THREE.Mesh(new THREE.PlaneGeometry(30, 12), lamC("#8ad4f4")); wf.position.set(FAL[0], 6, FAL[2] + 0.02); R.add(wf); }
    // street with a shop
    house(R, STR[0], -5, 7, 4, 4, "#d8c8a8", "#4a3a3a"); flatGround(R, 14, 8, "#b8a888", STR[0], 0, 0.012);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const falls = (n = 15) => { for (let k = 0; k < n; k++) fx(`fa${k}|${Math.floor(t * 10) % 6}`, 256, 512, fallsDraw((Math.floor(t * 10) % 6) / 6 + k * 0.13), FAL[0] - 14 + k * 2, 6, FAL[2] + 0.05 + (k % 2) * 0.02, 4.05, 12.2); for (let k = 0; k < 6; k++) fx(`mi${k}|${Math.floor(t * 3 + k) % 3}`, 256, 256, mistDraw(Math.floor(t * 3 + k) % 3), FAL[0] - 10 + k * 4, 1.2 + Math.sin(t + k) * 0.3, FAL[2] + 1.5, 5, 4, true); };
    const barrel = (x: number, y: number, z: number, rot = 0, open = false) => fx(`br|${open}|${Math.round(rot * 4) % 8}`, 256, 384, (p: Pen) => { p.g.translate(128, 192); p.g.rotate(rot); p.g.translate(-128, -192); barrelDraw(open)(p); }, x, y, z, 0.9, 1.35);
    if (id === S.hook || id === S.fall || id === S.end) {
      falls();
      const y = barrelY(f); barrel(FAL[0], y, FAL[2] + 1.0, f * 0.15);
      if (id === S.fall && f > W.cae + 50) fx("spl", 256, 256, burstDraw("#e8f6fc"), FAL[0], 0.8, FAL[2] + 1.6, 3, 3);
    }
    if (id === S.intro) {
      person("an", ANNIE, 0, 0, 0.5, { mode: "stand", expr: f > W.arruinada - 4 ? "nervous" : "smile", facing: 0 }, 1);
      if (f > W.annie - 4) fx("name", 512, 160, labelDraw("A. TAYLOR", "#1a1a1e"), 0, 2.45, 0.6, 0.8, 0.25);
      if (f > W.anos0 - 4) fx("age", 512, 200, textDraw("63 AÑOS", "#ffd23f", 100), 0, 2.78, 0.6, 0.8, 0.31);
      if (f > W.arruinada - 4) fx("coin", 256, 256, coinDraw("0"), -0.45, 1.4, 0.6, 0.45, 0.45);
    }
    if (id === S.plan) {
      person("an", ANNIE, -0.4, 0, 0.5, { mode: "stand", expr: "grin", facing: 1, wave: 0.9 }, 1);
      fx("bub", 512, 256, bubbleDraw(f > W.barril0 - 4 ? "¡UN BARRIL!" : "¡FAMA!", "#ffd23f"), 0.3, 2.5, 0.5, 1.2, 0.6);
      if (f > W.barril0 - 4) barrel(0.8, 0.7, 0.6);
    }
    if (id === S.cat) {
      const x = TOP[0] + 0.5;
      person("an", ANNIE, x - 1.2, 12, 0.6 + TOP[2], { mode: "stand", expr: f > W.sobrevive - 4 ? "laugh" : "nervous", facing: 1, wave: f > W.sobrevive - 4 ? 0.9 : undefined }, 1);
      barrel(x, 12.7, TOP[2] + 0.8, 0, true);
      card(`cat|${f > W.sobrevive - 4 ? 1 : 0}`, x + 0.05, TOP[2] + 0.9, 0.5, catDraw(0, "sit", false, "#e8a25a"), 1, 0, 13.25);
      if (f > W.sobrevive - 4) fx("ok", 512, 200, textDraw("¡VIVO!", "#8ae86a", 110), x, 14.6, TOP[2] + 0.6, 1.1, 0.43);
    }
    if (id === S.prep) {
      const x = TOP[0];
      barrel(x, 12.75, TOP[2] + 0.6, 0, f < W.tapa - 4);
      if (f < W.tapa) person("an", ANNIE, x, 12.55, TOP[2] + 0.55, { mode: "stand", expr: "stern", facing: 0, wave: 0.8 }, 1);
      for (let k = 0; k < 2; k++) person(`m${k}`, MAN(k), x + (k ? 1.1 : -1.1), 12.15, TOP[2] + 0.3, { mode: "stand", expr: "nervous", facing: (k ? -1 : 1) as 1 | -1, wave: f > W.bomba - 4 && k === 1 ? 0.6 + Math.sin(t * 10) * 0.3 : undefined }, 2 + k);
      if (f > W.bomba - 6) fx("pump", 256, 256, pumpDraw, x + 0.6, 12.55, TOP[2] + 0.8, 0.5, 0.5);
      if (f > W.cojin - 4 && f < W.tapa - 4) fx("coj", 512, 160, labelDraw("+ COJÍN", "#7a3a8a"), x, 14.5, TOP[2] + 0.6, 0.8, 0.25);
    }
    if (id === S.rescue || id === S.quote) {
      const x = FAL[0] + 8;
      barrel(x + 0.1, 0.6, 1.0, 0, true);
      person("an", ANNIE, x, 0.35, 0.95, { mode: "stand", expr: id === S.quote ? "stern" : f > W.viva - 4 ? "dazed" : "neutral", facing: 0, wave: id === S.quote ? 0.95 : undefined }, 1);
      for (let k = 0; k < 3; k++) person(`m${k}`, MAN(k), x - 1.6 + k * 1.6, 0, 0.2, { mode: "stand", expr: f > W.viva - 4 ? "shock" : "nervous", facing: 0, wave: f > W.viva - 4 ? 0.9 : undefined }, 2 + k);
      if (f > W.corte - 4) fx("cut", 256, 256, cutDraw, x, 2.0, 1.3, 0.35, 0.35);
      if (id === S.rescue && f > W.viva - 4) fx("viva", 512, 200, textDraw("¡VIVA!", "#8ae86a", 120), x, 2.7, 1.0, 1.1, 0.43);
      if (id === S.quote) fx("q", 512, 256, bubbleDraw("¡NUNCA MÁS!"), x, 2.75, 1.0, 1.4, 0.7);
    }
    if (id === S.poor) {
      const ax = STR[0] + 0.8 + smooth((f - W.robo + 4) / 40) * 6;
      person("an", ANNIE, STR[0] - 1.0, 0, 0.4, { mode: "stand", expr: f > W.robo - 4 ? "shock" : "grin", facing: 1 }, 1);
      person("ag", AGENT, ax, 0, 0.2, { mode: f > W.robo - 4 ? "march" : "stand", phase: t * 3, expr: f > W.robo - 4 ? "laugh" : "grin", facing: 1 }, 2);
      barrel(ax + 0.45, 1.1, 0.5);
      if (f > W.robo - 4) fx("ex", 256, 256, exDraw, STR[0] - 1.0, 2.5, 0.4, 0.4, 0.4);
      if (f > W.pobre - 6) { fx("tear", 256, 256, tearDraw, STR[0] - 0.85, 1.75, 0.6, 0.15, 0.15); fx("coin", 256, 256, coinDraw("0"), STR[0] - 1.6, 1.3, 0.6, 0.4, 0.4); }
      if (false) fx("lab", 512, 160, labelDraw("REPRESENTANTE", "#7a6a3a"), ax, 2.4, 0.4, 0.9, 0.28);
    }
    if (id === S.cta) {
      person("an", ANNIE, 0, 0, 0.5, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1); barrel(0.9, 0.7, 0.6);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1);
    }
  }
}
