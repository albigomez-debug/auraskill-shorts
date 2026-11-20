// "El Vasa": Stockholm harbour. The tall, top-heavy warship (group, rolls and sinks), the quay with the crowd at x < -12.
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD, stoneHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { seaPlane, house, textDraw, exDraw, smokeDraw, labelDraw, qDraw } from "./props";
import { S, W, SX } from "./story";

const KING: Outfit = { jacket: "#3a3a8a", pants: "#2a2a5a", boots: "#2a1a10", hat: "crown", skin: SKINS[0], moustache: "#c8a060", beard: "#c8a060", belt: null, sash: "#e8c45a", buttons: "#e8c45a" };
const SAILOR = (v: number): Outfit => ({ jacket: ["#3a4a6a", "#6a3a2a", "#4a4a3a", "#7a6a5a"][v % 4], pants: "#3a3a3a", boots: "#2a1a10", hat: v % 3 ? "hair" : "cap", hair: ["#5a3a20", "#c8a060", "#2a2a2a"][v % 3], cap: "#2a2a3a", skin: SKINS[v % 2], belt: null });
const CAPT: Outfit = { jacket: "#1a2a4a", pants: "#1a2a4a", boots: "#111", hat: "tophat", skin: SKINS[0], moustache: "#8a6a4a", beard: "#8a6a4a", buttons: "#e8c45a", sash: "#c8323a", belt: null, build: "stout" };
const FOLK = (v: number): Outfit => { const o: Outfit = { jacket: ["#5a3a2a", "#2a3a4a", "#6a5a3a", "#7a2a3a", "#3a4a3a"][v % 5], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 2] }; return v % 2 ? { ...o, hat: "bonnet", dress: ["#7a3a4a", "#3a5a6a", "#8a6a3a"][v % 3] } : { ...o, hat: v % 4 ? "tophat" : "cap", cap: "#3a3a3a" }; };
const windDraw = (p: Pen) => { for (let k = 0; k < 4; k++) p.line([[20, 60 + k * 50], [380 - k * 40, 50 + k * 50], [440 - k * 30, 20 + k * 50]], "#f4f8ff", 14); };
const splashDraw = (p: Pen) => { for (let k = 0; k < 6; k++) p.ell(60 + k * 30, 140 + Math.sin(k * 2) * 40, 40, 30, k % 2 ? "#6ab4e0" : "#a8daf4", 4); };
const arrowDraw = (txt: string) => (p: Pen) => { p.poly([[40, 70], [330, 70], [330, 30], [470, 110], [330, 190], [330, 150], [40, 150]], "#ff4a3a", 8); p.g.fillStyle = "#fff"; p.g.font = "bold 50px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 200, 128); };

export class World extends Base {
  private ship = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    seaPlane(R, -0.2, "#2f7aa0");
    // quay, warehouses, city
    box(R, 20, 0.7, 40, lam({ map: rep(stoneHD(), 6, 12), color: "#b8aa98" }), -22, 0.15, 4);
    for (let k = 0; k < 7; k++) house(R, -26 - (k % 2) * 5, -14 + k * 5, 4, 5 + (k % 3), 4, ["#c8823a", "#e8c48a", "#a8483a"][k % 3], "#5a3a3a");
    // the Vasa: dark hull, two rows of gun ports, high gilded stern, three tall masts
    const G = this.ship; G.position.set(SX, 0, 0); R.add(G);
    const hull = lam({ map: rep(planksHD(), 4, 1), color: "#5a3a22" }), gold = lamC("#e8b83a"), red = lamC("#a8202a");
    box(G, 20, 4, 5, hull, 0, 0.5, 0); box(G, 18, 0.15, 4.6, lam({ map: rep(planksHD(), 4, 1), color: "#b08a5a" }), 0, 2.55, 0);
    for (const y of [0.4, 1.6]) for (let k = 0; k < 8; k++) { box(G, 0.55, 0.5, 0.08, lamC("#1a1010"), -6.5 + k * 1.8, y, 2.52); box(G, 0.6, 0.12, 0.1, red, -6.5 + k * 1.8, y + 0.32, 2.54); }
    box(G, 20.2, 0.25, 5.2, gold, 0, 2.4, 0); box(G, 20.2, 0.2, 5.2, gold, 0, 1.05, 0);
    box(G, 4, 4, 5, hull, -8, 4.5, 0); box(G, 0.4, 5, 5.4, gold, -10.1, 4.5, 0);
    for (let k = 0; k < 5; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), gold); s.position.set(-9.6 + k * 0.7, 6.4, 2.6); G.add(s); }
    const lion = new THREE.Mesh(new THREE.ConeGeometry(0.6, 3, 6), gold); lion.rotation.z = -Math.PI / 2; lion.position.set(11.4, 2.2, 0); G.add(lion);
    const sail = lamC("#f4efe2", { side: THREE.DoubleSide });
    for (const [dx, hgt] of [[-4, 20], [1.5, 24], [7, 18]] as const) {
      cyl(G, 0.18, 0.24, hgt, hull, dx, 2.5 + hgt / 2, 0, 6);
      for (const [y, w] of [[0.35, 6], [0.6, 5], [0.82, 3.6]]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, hgt * 0.18), sail); m.position.set(dx, 2.5 + hgt * y, 0.35); G.add(m); }
    }
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const G = this.ship;
    // ship state
    let roll = 0, sink = 0, dx = 0;
    const sinkAmt = (x: number) => Math.max(0, Math.min(1, x));
    if (id === S.test) roll = f > W.corren ? Math.sin((f - W.corren) * 0.12) * Math.min(0.12, (f - W.corren) * 0.002) * (f > W.paran + 10 ? Math.max(0, 1 - (f - W.paran - 10) / 20) : 1) : 0;
    if (id === S.sail) { dx = (f - 688) * 0.06; roll = f > W.inclina - 6 ? Math.min(0.25, (f - W.inclina + 6) * 0.01) : Math.sin(t * 2) * 0.01; }
    if (id === S.water) { dx = 5.3; roll = 0.25 + (f - 772) * 0.003; }
    if (id === S.sink || id === S.hook || id === S.end) {
      dx = 6; const k = id === S.sink ? sinkAmt((f - 826) / 60) : id === S.hook ? sinkAmt(0.25 + f / 140) : sinkAmt(0.25 + (f - 1046) / 100);
      roll = 0.4 + k * 0.5; sink = k * 3.5;
    }
    if (id === S.raised) sink = -Math.min(1, (f - 980) / 40) * 0.6 + 0.6;
    G.position.set(SX + dx, -sink, 0); G.rotation.x = roll;
    if (id === S.hook || id === S.end || id === S.sink || id === S.water) for (let k = 0; k < 4; k++) fx(`sp${k % 2}|${Math.floor(f / 6) % 2}`, 256, 256, splashDraw, SX + dx - 6 + k * 4 + (Math.floor(f / 6) % 2) * 0.3, 0.1, 3.2, 2.4, 1.2);
    if (id === S.king) {
      person("king", KING, -13, 0.5, 4, { mode: "stand", expr: f > W.rey + 20 ? "grin" : "stern", facing: 1, wave: f > W.rey + 4 ? 0.9 : undefined }, 1);
      if (f > 186) fx("best", 512, 200, textDraw("¡EL MEJOR!", "#ffd23f", 96), -12.9, 2.55, 4.3, 0.8, 0.31);
    }
    if (id === S.hull) {
      if (f > W.vasa - 4) fx("vasa", 512, 160, labelDraw("VASA", "#1a3a7a"), -6.6, 5.6, 3.2, 1.5, 0.47);
    }
    if (id === S.test) {
      const Y = 2.63, phase = f > W.corren ? Math.sin((f - W.corren) * 0.12) : -1, stop = f > W.paran + 6;
      for (let k = 0; k < 10; k++) {
        const z = stop ? -1.5 + (k % 4) : phase * 1.6 + ((k * 37) % 7) / 7 * 0.4 - 0.2, x = SX + 2.3 + (k % 5) * 0.7 + Math.floor(k / 5) * 0.35;
        person(`s${k}`, SAILOR(k), x, Y - z * roll, z, { mode: f > W.corren && !stop ? "march" : "stand", phase: t * 9 + k, expr: f > W.balancea ? "shock" : "grin", facing: (Math.cos((f - W.corren) * 0.12) > 0 ? -1 : 1) as 1 | -1 }, 10 + k);
      }
      if (f > W.paran - 4) { person("capt", CAPT, SX + 4.4, Y, 0.6, { mode: "stand", expr: "shock", facing: 0, wave: 0.9 }, 2); fx("ex", 256, 256, exDraw, SX + 4.4, Y + 2.3, 0.6, 0.5, 0.5); }
    }
    if (id === S.bah) {
      person("capt", CAPT, SX + 0.2, 2.63, 0, { mode: "stand", expr: f > W.bah - 4 ? "grin" : "nervous", facing: 1, wave: f > W.bah - 4 ? Math.sin(t * 6) * 0.3 + 0.6 : undefined }, 2);
      person("adm", SAILOR(1), SX + 1.1, 2.63, -0.2, { mode: "stand", expr: "whistle", facing: -1 }, 3);
      if (f > W.bah - 4) fx("bah", 512, 200, textDraw("BAH", "#ffffff", 120), SX + 0.6, 4.75, 0.2, 0.7, 0.27);
    }
    if (id === S.crowd || id === S.sink) {
      const shock = id === S.sink;
      for (let k = 0; k < 18; k++) person(`c${k}`, FOLK(k), -12.6 - (k % 3) * 0.7, 0.5, -1 + Math.floor(k / 3) * 1.4 + (k % 3) * 0.3, { mode: "stand", expr: shock ? "shock" : "grin", facing: 1, wave: !shock && k % 2 ? Math.sin(t * 7 + k) * 0.5 + 0.5 : undefined }, 20 + k);
      if (id === S.crowd && f > W.salvas - 4) for (let k = 0; k < 4; k++) fx(`gs${k % 3}`, 256, 256, smokeDraw(k % 3), SX - 6 + k * 3.6, 1.6 + (f - W.salvas) * 0.01, 3.2, 2.2, 2.2, true);
    }
    if (id === S.sail && f > W.rafaga - 6) for (let k = 0; k < 3; k++) fx(`w${k}`, 512, 256, windDraw, SX + dx - 12 + ((f - W.rafaga) * 0.25 + k * 4) % 16, 8 + k * 3, 3, 4, 2);
    if (id === S.water && f > W.agua - 4) fx("in", 512, 200, textDraw("¡AGUA!", "#9ad4ff", 110), 12, 1.3, 3.4, 1.0, 0.39);
    if (id === S.why) {
      if (f > W.alto - 4) fx("alto", 512, 220, arrowDraw("MUY ALTO"), SX - 3.5, 16, 3, 8, 3.4);
      if (f > W.pesado - 4) fx("pes", 512, 220, arrowDraw("PESO ARRIBA"), SX - 3.5, 7, 3, 8, 3.4);
      if (f < W.alto - 4) fx("q", 256, 256, qDraw, SX, 12, 3, 3, 3);
    }
  }
}
