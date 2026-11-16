// "El panadero del whisky": night sea with the Titanic (SEA, ship at SHIPZ) that tilts and sinks, the galley/cabin (GALLEY)
// and a stretch of boat deck with railing and deck chairs (DECK).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { burstDraw } from "./beasts";
import { bottleDraw, xDraw, textDraw, starsDraw, moonDraw } from "./extra";
import { S, W, SHIPZ, GALLEY, DECK } from "./story";

const CHARLES: Outfit = { jacket: "#f4f1ea", pants: "#2a2a32", boots: "#1a1a1e", hat: "toque", skin: SKINS[0], belt: null, buttons: "#c8c0b0", moustache: "#6a4a2a", build: "stout" };
const CHARLES_COAT: Outfit = { ...CHARLES, jacket: "#2a3450", hat: "hair", hair: "#6a4a2a", buttons: "#e8c45a" };
const PAX = (v: number): Outfit => ({ jacket: ["#2a2a32", "#6a3a5a", "#3a4a6a", "#8a6a4a"][v % 4], pants: "#2a2a32", boots: "#1a1a1e", hat: v % 2 ? "bonnet" : "tophat", dress: v % 2 ? ["#c25a7a", "#5a8fc2"][v % 2] : undefined, skin: SKINS[v % 4], buttons: "#e8e4dc" });
const chairDraw = (p: Pen) => { p.poly([[40, 170], [200, 120], [210, 140], [50, 190]], "#c89a5a", 7); p.poly([[180, 125], [230, 30], [250, 40], [205, 135]], "#c89a5a", 7); p.stroke([[60, 185], [50, 230]], 8); p.stroke([[190, 140], [200, 230]], 8); };
const thermoDraw = (p: Pen) => {
  p.poly([[20, 20], [492, 20], [492, 600], [20, 600]], "#2a3a32", 10);
  p.band([[150, 470], [150, 110]], "#f4f1ea", 60, 8, "round"); p.ell(150, 500, 55, 55, "#4a8ae8", 8); p.band([[150, 490], [150, 380]], "#4a8ae8", 34, 0, "round");
  const g = p.g; g.fillStyle = "#f4f1ea"; g.font = "bold 56px 'Comic Sans MS', Arial"; g.textAlign = "left"; g.fillText("ALCOHOL", 230, 200); g.fillText("= MÁS", 230, 290); g.fillStyle = "#7ad4ff"; g.fillText("FRÍO", 230, 380);
};
const breadDraw = (p: Pen) => { p.ell(128, 140, 110, 60, "#d8964a", 7); for (let k = 0; k < 3; k++) p.stroke([[70 + k * 50, 110], [95 + k * 50, 160]], 8, "#a86a2a"); };
const arrowDraw = (p: Pen) => { p.band([[128, 20], [128, 160]], "#ffd23f", 40, 8); p.poly([[60, 150], [196, 150], [128, 236]], "#ffd23f", 8); };

export class World extends Base {
  ship = new THREE.Group(); hull = new THREE.Group(); berg: THREE.Mesh;
  constructor() {
    super();
    const R = this.root;
    this.L = { ...this.L, el: 40, lit: [0.72, 0.8, 1.15], shade: [0.16, 0.18, 0.3], lift: [0.03, 0.04, 0.1], sunCol: "#b8c8ff", sunI: 1.6, hemiI: 0.35, sky: "#5a6a9a", ground: "#1a2030", charTint: [0.8, 0.86, 1.0], fog: "#1c2648" };
    this.K = { ...this.K, sky: { c: ["#2a3460", "#1c2650", "#141c40", "#0e1434", "#080c24"], e: [0, 3, 8, 16, 40] } };
    this.fogNear = 60; this.fogFar = 380;
    for (const m of (this as unknown as { clouds: THREE.Mesh[] }).clouds) m.visible = false;
    const seaTex = ctex("nsea", 256, 256, (g, r) => { g.fillStyle = "#1a3050"; g.fillRect(0, 0, 256, 256); for (let k = 0; k < 160; k++) { g.fillStyle = `rgba(160,200,255,${r() * 0.18})`; g.fillRect(r() * 256, r() * 256, 8 + r() * 24, 2); } });
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(seaTex, 900, 900), color: "#5a7aa8" }));
    sea.position.y = 0; sea.receiveShadow = true; R.add(sea);
    // the Titanic: a pivot group at the ship's middle so it can tilt stern-up (+x is the stern)
    this.ship.position.set(0, 0, SHIPZ); R.add(this.ship); this.ship.add(this.hull);
    const blk = lamC("#1e1e24"), wht = lamC("#e8e4dc"), buff = lamC("#d8a040"), red = lamC("#8a2a26");
    const H = this.hull, b = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number) => box(H, w, h, d, m, x, y, z);
    b(64, 6, 7, blk, 0, 1, 0); b(64.2, 1.6, 7.2, red, 0, -2.4, 0); b(56, 2.4, 6.4, wht, 0, 5.2, 0); b(44, 1.6, 5.6, wht, -1, 7.2, 0);
    for (let k = 0; k < 4; k++) { const fn = cyl(H, 1.2, 1.3, 7, buff, -16 + k * 10, 11.5, 0, 16); fn.rotation.z = 0.12; cyl(H, 1.25, 1.25, 1.4, blk, -16 + k * 10 + 0.45, 14.6, 0, 16).rotation.z = 0.12; }
    const lit = new THREE.MeshBasicMaterial({ color: "#ffe6a0" });
    for (let k = 0; k < 40; k++) for (const y of [1.6, 3.0, 5.4]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), lit); w.position.set(-28 + k * 1.45, y, 3.52); H.add(w); }
    // iceberg
    this.berg = new THREE.Mesh(new THREE.ConeGeometry(9, 16, 7), lamC("#e8f4fa")); this.berg.position.set(-15, 5, SHIPZ + 9); this.berg.castShadow = true; R.add(this.berg);
    // galley: tiled floor, ovens, a table, cabin bunk at x - 74 and a chalkboard at x - 81.5
    const tile = ctex("tile", 128, 128, (g) => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { g.fillStyle = (i + j) % 2 ? "#e8e4dc" : "#2a2a32"; g.fillRect(i * 32, j * 32, 32, 32); } });
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(16, 10).rotateX(-Math.PI / 2), lam({ map: rep(tile, 16, 10) })); fl.position.set(GALLEY[0] + 2, 0.01, GALLEY[2]); fl.receiveShadow = true; R.add(fl);
    box(R, 16, 5, 0.2, lamC("#e8dcc0"), GALLEY[0] + 2, 2.5, GALLEY[2] - 2.6);
    for (const dx of [-6, 10]) box(R, 0.2, 5, 10, lamC("#d8ccb0"), GALLEY[0] + dx, 2.5, GALLEY[2] + 2);
    for (let k = 0; k < 3; k++) { box(R, 1.0, 1.6, 0.8, lamC("#5a5a62"), GALLEY[0] - 1.6 + k * 1.15, 0.8, GALLEY[2] - 2.0); const d = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.5), new THREE.MeshBasicMaterial({ color: "#ff9a40" })); d.position.set(GALLEY[0] - 1.6 + k * 1.15, 0.8, GALLEY[2] - 1.59); R.add(d); }
    const wood = lam({ map: rep(planksHD(), 1, 1), color: "#a8784a" });
    box(R, 1.6, 0.08, 0.8, wood, GALLEY[0] + 0.3, 0.85, GALLEY[2] - 0.5);
    box(R, 2.0, 0.45, 0.9, wood, GALLEY[0] + 6, 0.22, GALLEY[2] - 0.6); box(R, 2.0, 0.12, 0.85, lamC("#e8e4f2"), GALLEY[0] + 6, 0.5, GALLEY[2] - 0.6);
    box(R, 0.9, 0.9, 0.06, lamC("#c8a85a"), GALLEY[0] + 6.6, 1.6, GALLEY[2] - 2.45);
    box(R, 1.8, 1.3, 0.06, lamC("#2a3a32"), GALLEY[0] - 1.9, 2.45, GALLEY[2] - 2.45);
    // deck: planks, railing, a lifeboat on davits
    const dk = new THREE.Mesh(new THREE.PlaneGeometry(20, 8).rotateX(-Math.PI / 2), lam({ map: rep(planksHD(), 10, 4), color: "#c8a070" })); dk.position.set(DECK[0], 0.02, DECK[2] - 1); dk.receiveShadow = true; R.add(dk);
    box(R, 20, 4, 0.3, lamC("#e8e4dc"), DECK[0], 2, DECK[2] - 5);
    const iron = lamC("#e8e4dc");
    for (let k = 0; k < 20; k++) cyl(R, 0.03, 0.03, 1.1, iron, DECK[0] - 10 + k, 0.55, DECK[2] + 1.6, 6);
    box(R, 20, 0.06, 0.08, iron, DECK[0], 1.1, DECK[2] + 1.6);
    const boat = box(R, 5, 0.8, 1.4, lamC("#f2ece0"), DECK[0] + 4, 2.6, DECK[2] - 3.8); void boat;
    this.update0 = true;
  }
  update0 = false;

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    // ship: sailing (berg shot), tilting (rise), sinking (sink); hidden low in the water for hook/water/end shots
    let tilt = 0, sink = 0, x = 0;
    if (id === S.berg) x = -(f - 241) * 0.04;
    if (id === S.rise) tilt = Math.min(1, (f - 524) / 120) * 0.95;
    if (id === S.sink) { tilt = 0.95 + Math.min(1, (f - 668) / 40) * 0.35; sink = Math.max(0, (f - W.hunde2 + 6) / 60) * 42; }
    if (id === S.hook || id === S.end) { tilt = 1.3; sink = 18 + (id === S.end ? (f - 1090) * 0.05 : f * 0.05); }
    if (id === S.water) { tilt = 1.3; sink = 60; }
    const x0 = id === S.berg ? 20 : id === S.rise || id === S.sink ? -4 : -6;
    this.ship.position.set(x + x0, -sink, SHIPZ); this.ship.rotation.z = tilt;
    this.ship.visible = sink < 55;
    this.berg.visible = id === S.berg || id === S.rise;
    fx("stars", 1024, 512, starsDraw, 0, 140, -600, 900, 450);
    fx("moon", 256, 256, moonDraw, 120, 120, -560, 40, 40);
    // Charles in the water: only head and shoulders above the sea
    const floating = (k: string) => {
      person(`ch${k}`, CHARLES_COAT, 0, -1.15 + 0.04 * Math.sin(t * 2), 0, { mode: "stand", expr: "grin", facing: 1, wave: Math.sin(t * 3) * 0.3 + 0.6 }, 1, false);
      fx("ring", 256, 128, (p: Pen) => { p.ell(128, 64, 120, 40, null, 6); }, 0, 0.02, 0.05, 0.9, 0.3);
    };
    if (id === S.hook || id === S.end) {
      floating("h");
      fx("bot", 256, 256, bottleDraw("#7a4a1a"), 0.42, 0.62 + 0.04 * Math.sin(t * 3), 0.1, 0.25, 0.25);
    }
    if (id === S.galley || id === S.science) {
      const X = id === S.galley ? GALLEY[0] : GALLEY[0] - 0.6;
      person("charles", CHARLES, X, 0, -0.1, { mode: "stand", expr: id === S.science ? (f > W.pero - 4 ? "laugh" : "grin") : "grin", facing: 1, wave: id === S.galley && f > W.charles - 4 && f < W.abril ? 0.8 : undefined }, 1);
      if (id === S.galley) for (let k = 0; k < 3; k++) fx(`br${k}`, 256, 256, breadDraw, X + 0.0 + k * 0.4, 0.98, -0.5, 0.35, 0.22);
      if (id === S.science) {
        fx("thermo", 512, 620, thermoDraw, GALLEY[0] - 1.9, 2.45, -2.4, 1.3, 1.5);
        fx("botS", 256, 256, bottleDraw("#7a4a1a"), X + 0.35, 1.25, 0.1, 0.3, 0.3);
        if (f > W.enfria - 4 && f < W.pero) fx("xS", 256, 256, xDraw, X + 0.35, 1.25, 0.15, 0.35, 0.35);
        if (f > W.explico - 4) fx("shrug", 512, 256, textDraw("¿Y QUÉ?", "#ffd23f", 120), X - 0.2, 2.15, 0.1, 0.8, 0.4);
      }
    }
    if (id === S.cabin) {
      const X = GALLEY[0] + 6;
      person("charles", CHARLES, X, 0.3, -0.5, { mode: "sit", expr: f > W.trago - 4 ? "relief" : "grin", facing: 1 }, 1, false);
      fx("botC", 256, 256, bottleDraw("#7a4a1a"), X + 0.32, 1.35 + (f > W.trago - 4 ? 0.12 : 0), -0.3, 0.3, 0.3);
    }
    if (id === S.deck) {
      const X = DECK[0];
      person("charles", CHARLES_COAT, X - 0.2, 0, 0.6, { mode: "stand", expr: f > W.otro - 4 ? "relief" : "stern", facing: 1, wave: f > W.tumbonas - 4 && f < W.otro - 4 ? Math.max(0, Math.sin(t * 5)) : undefined }, 1);
      for (let k = 0; k < 3; k++) person(`pax${k}`, PAX(k), X - 2.2 - k * 0.9, 0, -0.8 - (k % 2) * 0.6, { mode: "stand", expr: "nervous", facing: 1 }, 3 + k);
      if (f > W.tumbonas - 6 && f < W.otro) for (let k = 0; k < 2; k++) { const u = ((f - W.tumbonas + 6 + k * 18) % 36) / 36; fx(`chair${k}`, 256, 256, chairDraw, X + 0.2 + u * 1.6, 1.3 + Math.sin(u * Math.PI) * 0.9 - u * 0.8, 1.2 + u * 1.2, 0.6, 0.6); }
      if (f > W.otro - 4) fx("botD", 256, 256, bottleDraw("#7a4a1a"), X + 0.15, 1.6, 0.7, 0.3, 0.3);
    }
    if (id === S.rise || id === S.sink) {
      const st = new THREE.Vector3(); this.ship.updateMatrixWorld(true); this.hull.localToWorld(st.set(31, 8.5, 0));
      if (st.y > 1) { person("tiny", CHARLES_COAT, st.x, st.y, st.z + 3.6, { mode: "stand", expr: "grin", facing: 1 }, 1, false); if (f > W.trepa - 4) fx("arrow", 256, 256, arrowDraw, st.x, st.y + 5.5, st.z + 3.6, 5, 5); }
      if (id === S.rise && f < 560) fx("boomR", 256, 256, burstDraw("#ffa040"), 8, 6, SHIPZ + 4, 4, 4);
    }
    if (id === S.berg && f > W.choca - 3 && f < W.choca + 10) fx("hit", 256, 256, burstDraw(), -12, 4, SHIPZ + 5, 7, 7);
    if (id === S.water) {
      floating("w");
      if (f > W.pelo - 8 && f < W.horas) fx("dry", 512, 256, textDraw("¡SECO!", "#ffd23f", 130), 0, 1.25, 0, 0.7, 0.35);
      if (f > W.amanecer - 10) { const bx = Math.max(1.2, 6 - (f - W.amanecer + 10) * 0.08); fx("lifeboat", 512, 256, (p: Pen) => { p.poly([[20, 90], [492, 90], [420, 200], [90, 200]], "#f2ece0", 8); p.stroke([[60, 110], [450, 110]], 8, "#c8423a"); }, bx, 0.35, -0.6, 2.4, 1.2); for (let k = 0; k < 2; k++) person(`rb${k}`, PAX(k + 2), bx - 0.5 + k * 0.9, -0.2, -0.75, { mode: "stand", expr: f > W.bote ? "relief_open" : "shock", facing: -1, wave: f > W.bote ? 0.8 : undefined }, 4 + k, false); }
    }
  }
}
