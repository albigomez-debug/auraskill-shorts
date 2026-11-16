// "Operación Gatito Acústico": the CIA lab (LAB) and a Washington park across the road from the Soviet embassy (EMB).
import * as THREE from "three";
import { Pen, Outfit, SKINS, WG } from "./toon";
import { rep, ctex, planksHD, grassHD, facadeHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { catDraw, pigeonDraw, burstDraw } from "./beasts";
import { S, W, LAB, EMB } from "./story";

const AGENT = (v: number): Outfit => ({ jacket: ["#2a2a32", "#3a3a44", "#2a3040"][v % 3], pants: "#2a2a32", boots: "#111", hat: v % 2 ? "slouch" : "hair", hair: "#3a2a20", skin: SKINS[v % 4], belt: null, buttons: "#c8c0b0" });
const DOC: Outfit = { jacket: "#e8f0f2", pants: "#c8d8dc", boots: "#f2f2f2", hat: "cap", cap: "#9ad4c8", skin: SKINS[1], belt: null, buttons: "#9ad4c8", moustache: "#6a6a6a" };

const ciaDraw = (p: Pen) => {
  p.ell(256, 256, 230, 230, "#1e3a6a", 10); p.ell(256, 256, 170, 170, "#f2ece0", 6);
  p.poly([[256, 120], [290, 220], [390, 220], [310, 280], [340, 380], [256, 320], [172, 380], [202, 280], [122, 220], [222, 220]], "#e8c45a", 6);
  p.g.fillStyle = "#f2ece0"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText("CIA", 256, 470);
};
const redFlag = (p: Pen) => { p.poly([[16, 16], [496, 16], [496, 302], [16, 302]], "#c8202a", 8); p.poly([[90, 50], [102, 86], [140, 86], [110, 108], [120, 144], [90, 122], [60, 144], [70, 108], [40, 86], [78, 86]], "#ffd23f", 0); };
const bulbDraw = (p: Pen) => { p.ell(128, 110, 70, 75, "#fff3a0", 7); p.poly([[100, 175], [156, 175], [150, 225], [106, 225]], "#9aa2aa", 6); for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; p.stroke([[128 + Math.cos(a) * 92, 110 + Math.sin(a) * 92], [128 + Math.cos(a) * 118, 110 + Math.sin(a) * 118]], 8, "#ffd23f"); } };
const fishDraw = (p: Pen) => { p.ell(128, 128, 118, 100, "#f4f1ea", 6); p.stroke([[60, 128], [180, 128]], 8); for (let k = 0; k < 4; k++) { p.stroke([[80 + k * 25, 100], [80 + k * 25, 156]], 6); } p.poly([[180, 128], [210, 100], [210, 156]], null, 6); p.ell(55, 128, 16, 16, null, 6); };
const micDraw = (p: Pen) => { p.ell(128, 128, 60, 60, "#ffd23f", 0); p.dot(128, 128, 26, "#3a3a44"); };
const docDraw = (stamp: boolean) => (p: Pen) => {
  p.poly([[40, 20], [472, 20], [472, 600], [40, 600]], "#f2ecdc", 8);
  const g = p.g; g.fillStyle = "#c8202a"; g.font = "bold 54px Arial"; g.textAlign = "center"; g.fillText("SECRETO", 256, 90);
  g.fillStyle = "#2a2a32"; g.font = "bold 34px 'Courier New', monospace"; g.fillText("Gatos entrenados", 256, 160);
  for (let k = 0; k < 8; k++) p.line([[80, 210 + k * 34], [430 - (k % 3) * 40, 210 + k * 34]], "#8a8478", 6, false);
  if (stamp) { g.save(); g.translate(256, 470); g.rotate(-0.25); g.strokeStyle = "#c8202a"; g.lineWidth = 10; g.strokeRect(-200, -60, 400, 120); g.fillStyle = "#c8202a"; g.font = "bold 46px Arial"; g.fillText("NO PRÁCTICO", 0, 16); g.restore(); }
};
const taxiDraw = (p: Pen) => {
  const G = WG, Y = "#ffcf2a";
  p.poly([[160, G - 170], [180, G - 330], [560, G - 360], [760, G - 560], [1240, G - 560], [1460, G - 360], [1820, G - 330], [1840, G - 170]], Y, 12);
  p.poly([[800, G - 520], [990, G - 520], [990, G - 380], [640, G - 380]], "#9ad4f2", 8); p.poly([[1020, G - 520], [1220, G - 520], [1380, G - 380], [1020, G - 380]], "#9ad4f2", 8);
  for (let k = 0; k < 12; k++) p.g.fillStyle = k % 2 ? "#1a1a1e" : "#f4f1ea", p.g.fillRect(560 + k * 70, G - 300, 70, 30), p.g.fillStyle = k % 2 ? "#f4f1ea" : "#1a1a1e", p.g.fillRect(560 + k * 70, G - 270, 70, 30);
  p.poly([[880, G - 640], [1120, G - 640], [1120, G - 570], [880, G - 570]], "#f4f1ea", 8);
  p.g.fillStyle = "#1a1a1e"; p.g.font = "bold 56px Arial"; p.g.textAlign = "center"; p.g.fillText("TAXI", 1000, G - 585);
  p.ell(1830, G - 260, 30, 40, "#fff3a0", 6);
  for (const x of [470, 1530]) { p.ell(x, G - 140, 140, 140, "#1a1a1e", 10); p.ell(x, G - 140, 60, 60, "#c8c8d0", 6); }
};

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(grassHD(), 600, 600), color: "#c8d49a" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    // road and sidewalks
    const asph = ctex("asphalt", 512, 512, (g, r) => { g.fillStyle = "#4a4a52"; g.fillRect(0, 0, 512, 512); for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(${r() > 0.5 ? 255 : 0},${r() > 0.5 ? 255 : 0},255,${r() * 0.06})`; g.fillRect(r() * 512, r() * 512, 3, 3); } g.fillStyle = "#f2e2a0"; g.fillRect(0, 248, 200, 16); });
    const road = new THREE.Mesh(new THREE.PlaneGeometry(200, 6).rotateX(-Math.PI / 2), lam({ map: rep(asph, 50, 1) })); road.position.set(0, 0.0, -5); road.receiveShadow = true; R.add(road);
    for (const z of [-1.6, -8.4]) box(R, 200, 0.14, 0.8, lamC("#c8c0b4"), 0, 0.07, z);
    // embassy
    box(R, 18, 10, 5, lam({ map: facadeHD("embassy", 18, 10, { wall: "#c8bca8", shutter: "#5a4a3a", door: true }) }), EMB[0], 5, EMB[2]);
    box(R, 18.6, 0.8, 5.6, lamC("#a89880"), EMB[0], 10.2, EMB[2]);
    cyl(R, 0.06, 0.06, 5, lamC("#d8d0c0"), EMB[0] + 5, 12.5, EMB[2] + 2, 6);
    const iron = lamC("#2a2a30");
    for (let k = 0; k < 40; k++) cyl(R, 0.03, 0.03, 1.4, iron, -20 + k, 0.7, -9.2, 4);
    box(R, 40, 0.06, 0.06, iron, 0, 1.3, -9.2);
    // park: trees, bench, lamp
    const leaf = lamC("#4a7a3a"), trunk = lamC("#6a4a2a");
    for (const [x, z] of [[-5, 3], [9, 6], [-8, -0.2], [8, 0.4], [-3.5, 7], [3, 9]] as const) { cyl(R, 0.15, 0.2, 2.4, trunk, x, 1.2, z, 6); const b = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 8), leaf); b.position.set(x, 3.2, z); b.castShadow = true; R.add(b); }
    const wood = lam({ map: rep(planksHD(), 1, 0.3), color: "#8a5a34" });
    box(R, 1.8, 0.1, 0.5, wood, -2.4, 0.45, 2.2); box(R, 1.8, 0.5, 0.08, wood, -2.4, 0.75, 1.96);
    cyl(R, 0.05, 0.06, 3.5, iron, 2.2, 1.75, -1.0, 6);
    // the lab
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 10).rotateX(-Math.PI / 2), lamC("#d8d8d0")); floor.position.set(LAB[0], 0.01, LAB[2]); R.add(floor);
    box(R, 14, 5, 0.2, lamC("#b8c8c8"), LAB[0], 2.5, LAB[2] - 3);
    for (const dx of [-7, 7]) box(R, 0.2, 5, 10, lamC("#a8b8b8"), LAB[0] + dx, 2.5, LAB[2] + 2);
    box(R, 1.6, 0.06, 0.9, lamC("#e8ece8"), LAB[0], 0.9, LAB[2]);
    for (const dx of [-0.7, 0.7]) for (const dz of [-0.35, 0.35]) cyl(R, 0.03, 0.03, 0.9, lamC("#9aa2aa"), LAB[0] + dx, 0.45, LAB[2] + dz, 6);
    box(R, 1.2, 0.06, 0.8, lamC("#c8b08a"), LAB[0] + 1.2, 0.9, LAB[2] - 0.2);
    cyl(R, 0.03, 0.03, 0.9, iron, LAB[0] + 1.2, 0.45, LAB[2] - 0.2, 6);
    const lamp = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.3, 16, 1, true), lamC("#3a5a5a", { side: THREE.DoubleSide })); lamp.position.set(LAB[0], 2.5, LAB[2]); R.add(lamp);
    cyl(R, 0.01, 0.01, 2.5, iron, LAB[0], 3.8, LAB[2], 4);
    // machines on the back wall
    for (let k = 0; k < 3; k++) box(R, 0.9, 1.6, 0.5, lamC(["#8a9a8a", "#9a8a7a", "#7a8a9a"][k]), LAB[0] - 4 + k * 1.1, 0.8, LAB[2] - 2.6);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const C = 0.38, X = LAB[0];
    const cat = (x: number, z: number, mode: "walk" | "sit" | "flat", spy: number, y = 0, dir = 1, dz = 0) =>
      card(`cat|${mode}|${spy}|${mode === "walk" ? Math.round(t * 8) % 8 : 0}`, x, z, C, catDraw((Math.round(t * 8) % 8) * 0.785, mode, spy), dir, dz, y);
    if (id === S.hook || id === S.end || id === S.idea) {
      fx("cia", 512, 512, ciaDraw, X, 2.45, LAB[2] - 2.85, 0.9, 0.9);
      if (id !== S.idea || f > W.gato - 3) cat(X, 0, "sit", id === S.idea ? 0 : 2, 0.93);
      for (let k = 0; k < 2; k++) person(`ag${k}`, AGENT(k), X + (k ? 0.95 : -0.95), 0, -0.6, { mode: "stand", expr: id === S.idea ? (f > W.gato - 3 ? "grin" : f > W.ocurre - 4 ? "smile" : "stern") : k ? "grin" : "stern", facing: (k ? -1 : 1) as -1 | 1, wave: id === S.idea && k === 0 && f > W.ocurre - 4 && f < W.gato - 3 ? 0.9 : undefined }, 1 + k);
      if (id === S.idea && f > W.ocurre - 4 && f < W.gato - 3) fx("bulb", 256, 256, bulbDraw, X - 0.95, 2.25, -0.4, 0.4, 0.4);
      if (id === S.idea && f > W.gato - 3 && f < W.gato + 8) fx("burst", 256, 256, burstDraw(), X, 1.3, 0.2, 0.6, 0.6);
    }
    if (id === S.surgery) {
      fx("cia", 512, 512, ciaDraw, X, 2.45, LAB[2] - 2.85, 0.9, 0.9);
      const spy = f > W.antena - 3 ? 2 : f > W.micro - 3 ? 1 : 0;
      cat(X + 0.1, 0, "sit", spy, 0.93);
      person("doc", DOC, X - 0.75, 0, -0.1, { mode: "stand", expr: "stern", facing: 1, wave: Math.sin(t * 5) * 0.4 + 0.5 }, 1);
      if (f > W.micro - 3 && f < W.antena - 3) fx("mic", 256, 256, micDraw, X - 0.02, 1.55 + 0.02 * Math.sin(t * 9), 0.15, 0.12, 0.12);
    }
    if (id === S.problem) {
      const xs = -1.3 + (f - 426) * 0.016;
      const chase = f > W.pajaros - 4, sit = f > W.distrae - 4 && !chase;
      const cx = chase ? xs + (f - W.pajaros + 4) * 0.03 : xs;
      cat(cx, 2, sit ? "sit" : "walk", 2, 0);
      if (f > W.hambre - 4 && f < W.pajaros - 4) fx("fish", 256, 256, fishDraw, cx + 0.15, 0.95, 2.1, 0.3, 0.3);
      if (f > W.pajaros - 10) card(`bird|${Math.floor(f / 4) % 2}`, cx + 0.9 + (f - W.pajaros) * 0.01, 2, 0.16, pigeonDraw(Math.floor(f / 4) % 2), 1, 0, Math.max(0, (f - W.pajaros) * 0.01));
      for (let k = 0; k < 2; k++) person(`ag${k}`, AGENT(k), -2.75 + k * 0.7, 0.05, 2.3, { mode: "sit", expr: f > W.gana - 4 ? "nervous" : "stern", facing: 1 }, 1 + k);
    }
    if (id === S.mission || id === S.taxi) {
      fx("redflag", 512, 320, redFlag, EMB[0] + 5.7, 14.3, EMB[2] + 2, 1.4, 0.88);
      if (id === S.mission) {
        const go = f > W.sueltan - 4, z = go ? -0.6 - (f - W.sueltan + 4) * 0.012 : -0.4;
        cat(0, z, go ? "walk" : "sit", 2, 0, 0, -1);
        for (let k = 0; k < 2; k++) person(`ag${k}`, AGENT(k), (k ? 0.7 : -0.7), 0, 0.3, { mode: "stand", expr: f > W.sueltan - 4 ? "grin" : "stern", facing: (k ? -1 : 1) as -1 | 1, wave: k === 0 && f > W.sueltan - 4 && f < W.sueltan + 30 ? 0.8 : undefined }, 1 + k);
      } else {
        const hit = f >= W.atropella;
        const z = hit ? -4.6 : -1.6 - Math.max(0, f - 698) * 0.066;
        cat(0, Math.max(z, -4.6), hit ? "flat" : "walk", 2, 0, 1, 0);
        const tx = (f - W.atropella) * 0.2;
        if (tx > -14 && tx < 14) card("taxi", tx, -4.2, 1.1, taxiDraw, 1, 0);
        if (f >= W.atropella - 1 && f < W.atropella + 8) fx("burst", 256, 256, burstDraw(), 0, 0.5, -4.2, 0.9, 0.9);
      }
    }
    if (id === S.report) {
      const stamp = f > W.practico - 4;
      fx(`doc|${stamp ? 1 : 0}`, 512, 620, docDraw(stamp), X + 1.2, 1.25, LAB[2] - 0.15, 0.6, 0.73);
      person("ag0", AGENT(0), X + 2.0, 0, -0.7, { mode: "stand", expr: stamp ? "nervous" : "stern", facing: -1, headTilt: stamp ? 10 * Math.sin(t * 10) : 0 }, 1);
    }
  }
}
