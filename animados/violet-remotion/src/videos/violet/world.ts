// "Violet Jessop, la insumergible": Olympic dock (x=0), Titanic (TIT), Britannic (BRI). All at sea.
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box } from "./base";
import { burstDraw } from "./beasts";
import { seaPlane, textDraw, labelDraw, ctaDraw, bubbleDraw, liner, smokeDraw } from "./props";
import { S, W, TIT, BRI, sinkT, warX, smooth } from "./story";

const VIO: Outfit = { jacket: "#1a1a2a", pants: "#1a1a2a", boots: "#111", hat: "bonnet", skin: SKINS[0], dress: "#1a1a2a", belt: null, buttons: "#f4f1ea" };
const NURSE: Outfit = { jacket: "#f4f1ea", pants: "#f4f1ea", boots: "#3a3a3a", hat: "bonnet", skin: SKINS[0], dress: "#e8eef4", belt: "#c8202a", buttons: "#c8202a" };
const SAILOR: Outfit = { jacket: "#2a3a5a", pants: "#2a3a5a", boots: "#111", hat: "cap", cap: "#f4f1ea", skin: SKINS[2], moustache: "#3a2a1a", belt: null };
const babyDraw = (p: Pen) => { p.ell(128, 150, 96, 62, "#f4f1ea", 6); p.ell(176, 112, 38, 36, "#f2c8a0", 5); p.ell(166, 108, 4, 4, "#1a1010", 0); p.ell(184, 108, 4, 4, "#1a1010", 0); };
const rcDraw = (p: Pen) => { p.poly([[100, 20], [156, 20], [156, 100], [236, 100], [236, 156], [156, 156], [156, 236], [100, 236], [100, 156], [20, 156], [20, 100], [100, 100]], "#c8202a", 6); };
const propDraw = (k: number) => (p: Pen) => { p.g.translate(256, 256); p.g.rotate(k * Math.PI / 9); for (let j = 0; j < 3; j++) { p.g.rotate((Math.PI * 2) / 3); p.ell(0, -120, 60, 120, "#b88a3a", 8); } p.ell(0, 0, 50, 50, "#8a6a2a", 8); };
const starsDraw = (p: Pen) => { for (let j = 0; j < 5; j++) { const a = j * 1.26, x = 128 + Math.cos(a) * 90, y = 128 + Math.sin(a) * 60; p.poly([[x, y - 26], [x + 8, y - 8], [x + 26, y], [x + 8, y + 8], [x, y + 26], [x - 8, y + 8], [x - 26, y], [x - 8, y - 8]], "#ffd23f", 4); } };

export class World extends Base {
  tit = new THREE.Group(); war = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    seaPlane(R, -0.1, "#2a6a9a");
    const wood = lam({ map: rep(planksHD(), 6, 1), color: "#a8784a" });
    // Olympic at the dock (x = 0)
    liner(R, 0, -9, 1, 4); box(R, 34, 0.4, 5, wood, 0, 0.2, 1.5);
    for (let k = 0; k < 8; k++) box(R, 0.3, 1.6, 0.3, wood, -15 + k * 4.3, 0.4, 4.0);
    this.war.position.set(60, 0, -9); this.war.rotation.y = Math.PI; R.add(this.war); liner(this.war, 0, 0, 0.5, 2, "#6a6e74");
    // Titanic group (sinks bow-first)
    this.tit.position.set(TIT[0], 0, -14); R.add(this.tit); liner(this.tit, 0, 0, 1, 4);
    box(R, 3.2, 0.5, 1.5, lamC("#f4f1ea"), TIT[0] - 2, 0.05, 8); box(R, 3.3, 0.12, 1.6, lamC("#8a5a3a"), TIT[0] - 2, 0.32, 8);
    // Britannic, white hospital ship, with a deck in the foreground
    liner(R, BRI[0], -16, 1, 4, "#f4f1ea"); box(R, 40.1, 0.8, 6.1, lamC("#3a8a4a"), BRI[0], 2.0, -16);
    box(R, 10, 0.3, 4, wood, BRI[0] + 2, 0.15, 2.0);
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const k = sinkT(f, id); this.tit.rotation.z = -0.22 * k; this.tit.position.y = -3.2 * k;
    this.war.position.x = warX(f);
    const shake = (n: number) => Math.round(f * 3 + n) % 6;
    if (id === S.hook || id === S.boat || id === S.end) {
      const x = TIT[0] - 2;
      person("vio", VIO, x - 0.4, 0.2, 8.1, { mode: "sit", expr: id === S.boat && f > W.bebe - 4 ? "smile" : "nervous", facing: 0 }, 1);
      person("sai", SAILOR, x + 0.9, 0.2, 8.0, { mode: "sit", expr: "stern", facing: -1 }, 2);
      if ((id === S.boat && f > W.bebe - 4) || id !== S.boat) fx("baby", 256, 256, babyDraw, x - 0.2, 0.95, 8.5, 0.45, 0.45);
      if (id === S.boat && f > W.bebe - 4) fx("bb", 512, 256, bubbleDraw("¡CUÍDALO!"), x + 0.7, 2.3, 8.2, 1.2, 0.6);
    }
    if (id === S.intro || id === S.olympic || id === S.miss || id === S.cta) {
      const x = id === S.olympic ? 2 : id === S.miss ? 4 : 0;
      const hit = id === S.olympic && f > W.choca - 2;
      person("vio", VIO, x, 0.4, 1.0, { mode: "stand", expr: id === S.olympic ? (hit ? (f > W.ilesa - 4 ? "relief_open" : "shock") : "smile") : id === S.miss ? "grin" : "smile", facing: 0, wave: (id === S.olympic && f > W.ilesa - 4) || id === S.miss ? 0.9 : undefined }, 1);
      if (id === S.intro && f > W.violet - 4) fx("name", 512, 160, labelDraw("V. JESSOP", "#1a2a4a"), 0, 2.55, 1.1, 0.95, 0.3);
      if (id === S.intro && f > W.camarera - 4) fx("job", 512, 200, textDraw("CAMARERA", "#ffd23f", 70), 0, 2.95, 1.1, 1.0, 0.39);
      if (id === S.olympic && f > W.olympic - 4 && f < W.choca - 6) fx("oly", 512, 160, labelDraw("OLYMPIC", "#8a1e26"), -4, 10, -5, 6, 1.9);
      if (id === S.olympic && f > W.choca - 2 && f < W.choca + 20) fx(`hit|${shake(0)}`, 256, 256, burstDraw(), 21, 3, -6, 6 + shake(0) * 0.3, 6);
      if (id === S.olympic && f > W.ilesa - 4) fx("ok", 512, 200, textDraw("¡ILESA!", "#8ae86a", 110), x, 2.75, 1.1, 1.1, 0.43);
      if (id === S.miss && f > W.miss - 4) fx("miss", 1024, 256, (p: Pen) => { p.poly([[10, 10], [1014, 10], [1014, 246], [10, 246]], "#e8c45a", 10); p.g.fillStyle = "#1a1010"; p.g.font = "bold 92px 'Arial Black', Arial"; p.g.textAlign = "center"; p.g.fillText("MISS INSUMERGIBLE", 512, 160); }, x, 2.8, 1.1, 1.8, 0.45);
      if (id === S.cta) { const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
    }
    if (id === S.titanic && f > W.titanic - 4 && f < W.hunde - 8) fx("tl", 512, 160, labelDraw("TITANIC", "#1a1a1e"), TIT[0], 13, -10, 7, 2.2);
    if (id === S.brit) {
      fx("rc", 256, 256, rcDraw, BRI[0] - 6, 3.4, -12.9, 2.6, 2.6); fx("rc2", 256, 256, rcDraw, BRI[0] + 8, 3.4, -12.9, 2.6, 2.6);
      if (f > W.brit - 4 && f < W.mina - 30) fx("bl", 512, 160, labelDraw("BRITANNIC", "#2a6a3a"), BRI[0], 14, -12, 7, 2.2);
      person("vio", NURSE, BRI[0] + 2, 0.3, 2.4, { mode: "stand", expr: f > W.mina - 4 ? "shock" : "smile", facing: 0 }, 1);
      if (f > W.enfermera - 4 && f < W.mina - 20) fx("enf", 512, 200, textDraw("ENFERMERA", "#ff6a6a", 66), BRI[0] + 2, 2.35, 2.5, 1.0, 0.39);
      if (f > W.mina - 2) { const q = shake(1); fx(`mine|${q}`, 256, 256, burstDraw("#ffb03a"), BRI[0] + 9, 3, -11, 12 + q * 0.4, 12); fx(`sm|${Math.floor(t * 4) % 4}`, 256, 256, smokeDraw(Math.floor(t * 4) % 4), BRI[0] + 7, 9, -12, 10, 8, true); }
    }
    if (id === S.water) {
      const x = BRI[0] + 3;
      person("vio", NURSE, x, -1.05, 4.5, { mode: "stand", expr: f > W.sobrevive - 4 ? "relief_open" : f > W.golpea - 4 ? "dazed" : "shock", facing: 0, wave: f < W.helice ? 0.95 : undefined }, 1);
      if (f > W.helice - 8) fx(`pr|${Math.floor(f / 2) % 6}`, 512, 512, propDraw(Math.floor(f / 2) % 6), x + 1.7 - smooth((f - W.helice) / 30) * 0.6, 0.5, 3.8, 1.8, 1.8);
      if (f > W.golpea - 2 && f < W.sobrevive - 4) fx("st", 256, 256, starsDraw, x, 1.15, 4.8, 0.7, 0.7);
      if (f > W.sobrevive - 4) fx("viva", 512, 200, textDraw("¡OTRA VEZ!", "#8ae86a", 80), x, 1.25, 4.6, 0.95, 0.37);
    }
  }
}
