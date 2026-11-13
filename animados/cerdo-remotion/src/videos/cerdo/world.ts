// "La guerra del cerdo": San Juan Island (x = 0): Cutlar's cabin and potato patch, the two camps, the sea with the British fleet (SHIP).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, planksHD, grassHD, roofHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { pigDraw, burstDraw } from "./beasts";
import { S, W, SHIP } from "./story";

const CUTLAR: Outfit = { jacket: "#8a6a3a", pants: "#4a4a5a", boots: "#3a2a20", hat: "slouch", skin: SKINS[1], beard: "#6a4a2a", moustache: "#6a4a2a", belt: null };
const GRIFFIN: Outfit = { jacket: "#3a6a3a", pants: "#3a3a40", boots: "#2a2020", hat: "cap", cap: "#2a4a2a", skin: SKINS[0], moustache: "#c8642a", belt: null };
const ADMIRAL: Outfit = { jacket: "#1a2a4a", pants: "#f2ece0", boots: "#111", hat: "bicorne", skin: SKINS[0], beard: "#e8e4dc", buttons: "#e8c45a", sash: "#e8c45a", sword: true, belt: null, build: "stout" };
const REDCOAT = (v: number): Outfit => ({ jacket: "#c8323a", pants: "#2a2a34", boots: "#111", hat: v % 5 === 0 ? "shako_tall" : "shako", belt: "#f2ece0", buttons: "#e8c45a", rifle: true, skin: SKINS[v % 4] });
const BLUECOAT = (v: number): Outfit => ({ jacket: "#2a3a6a", pants: "#7a8aa8", boots: "#111", hat: "cap", cap: "#2a3a6a", belt: "#f2ece0", buttons: "#e8c45a", rifle: true, skin: SKINS[(v + 1) % 4] });

const usFlag = (p: Pen) => {
  for (let k = 0; k < 13; k++) { p.g.fillStyle = k % 2 ? "#f4f1ea" : "#c8323a"; p.g.fillRect(16, 16 + k * 22, 480, 22); }
  p.g.fillStyle = "#2a3a7a"; p.g.fillRect(16, 16, 200, 154);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) p.dot(40 + c * 32, 40 + r * 36, 7, "#f4f1ea");
  p.poly([[16, 16], [496, 16], [496, 302], [16, 302]], null, 8);
};
const ukFlag = (p: Pen) => {
  const g = p.g; g.fillStyle = "#1e3a7a"; g.fillRect(16, 16, 480, 286);
  g.lineCap = "butt"; g.strokeStyle = "#f4f1ea"; g.lineWidth = 56; g.beginPath(); g.moveTo(16, 16); g.lineTo(496, 302); g.moveTo(496, 16); g.lineTo(16, 302); g.stroke();
  g.strokeStyle = "#c8323a"; g.lineWidth = 18; g.beginPath(); g.moveTo(16, 16); g.lineTo(496, 302); g.moveTo(496, 16); g.lineTo(16, 302); g.stroke();
  g.fillStyle = "#f4f1ea"; g.fillRect(16, 129, 480, 60); g.fillRect(226, 16, 60, 286);
  g.fillStyle = "#c8323a"; g.fillRect(16, 141, 480, 36); g.fillRect(238, 16, 36, 286);
  p.poly([[16, 16], [496, 16], [496, 302], [16, 302]], null, 8);
};
const haloDraw = (p: Pen) => { p.ell(128, 128, 110, 34, null, 0); p.arc(128, 128, 100, 28, 0, 360, 18, "#ffd23f"); };
const angerDraw = (p: Pen) => { for (const [x, y, a] of [[80, 80, 0], [170, 90, 90], [90, 170, 270], [175, 175, 180]] as const) { const r = (a * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r); p.stroke([[x - 30 * c, y - 30 * s], [x + 10 * c - 20 * s, y + 10 * s + 20 * c]], 16, "#e2333a"); } };
const noteDraw = (k: number) => (p: Pen) => { const x = 70 + (k % 2) * 30; p.ell(x, 190, 40, 30, "#2a2a32", 5); p.band([[x + 36, 190], [x + 36, 50]], "#2a2a32", 12, 0); p.poly([[x + 36, 50], [x + 110, 80], [x + 110, 110], [x + 36, 84]], "#2a2a32", 0); };
const potatoDraw = (p: Pen) => { p.ell(128, 140, 90, 60, "#c8a26a", 7); for (const [x, y] of [[100, 120], [150, 150], [170, 115]]) p.dot(x, y, 6, "#8a6a3a"); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 60).rotateX(-Math.PI / 2), lam({ map: rep(grassHD(), 80, 12), color: "#c8d49a" }));
    ground.position.set(0, -0.02, 2); ground.receiveShadow = true; R.add(ground);
    const sand = new THREE.Mesh(new THREE.PlaneGeometry(400, 6).rotateX(-Math.PI / 2), lamC("#e8d8a8")); sand.position.set(0, -0.03, -30); R.add(sand);
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(ctex("sea", 512, 512, (g, r) => {
      g.fillStyle = "#3a7aa8"; g.fillRect(0, 0, 512, 512);
      for (let k = 0; k < 140; k++) { g.strokeStyle = `rgba(230,245,255,${0.25 + r() * 0.35})`; g.lineWidth = 3; const x = r() * 512, y = r() * 512; g.beginPath(); g.arc(x, y, 14 + r() * 10, 3.6, 5.8); g.stroke(); }
    }), 300, 300) }));
    sea.position.y = -0.2; R.add(sea);
    // hills at the back of the island
    for (let k = 0; k < 6; k++) { const h = new THREE.Mesh(new THREE.SphereGeometry(14 + k * 2, 16, 8), lamC(k % 2 ? "#6a8a4a" : "#5a7a42")); h.scale.y = 0.35; h.position.set(-60 + k * 24, -2, 30 + (k % 2) * 6); R.add(h); }
    // pines
    const pine = lamC("#2e5a3a"), trunk = lamC("#5a3a24");
    for (let k = 0; k < 26; k++) { const x = -40 + k * 3.3 + Math.sin(k * 7.1) * 1.2, z = -15 + Math.sin(k * 3.3) * 3; if (Math.abs(x) < 8) continue; cyl(R, 0.15, 0.2, 2, trunk, x, 1, z, 6); const c = new THREE.Mesh(new THREE.ConeGeometry(1.4, 4.5, 8), pine); c.position.set(x, 4, z); c.castShadow = true; R.add(c); }
    // Cutlar's cabin and fence
    const logs = lam({ map: rep(planksHD(), 1.5, 1), color: "#a8784a" }), wood = lam({ map: rep(planksHD(), 1, 1), color: "#b08a5a" });
    box(R, 5, 3, 4, logs, -5, 1.5, -6);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(4.2, 1.8, 4), lam({ map: rep(roofHD("#5a4a3a"), 2, 2) })); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, 0.8); roof.position.set(-5, 3.9, -6); R.add(roof);
    for (let k = 0; k < 9; k++) cyl(R, 0.05, 0.06, 1.0, wood, -3 + k * 0.9, 0.5, -2.2, 6);
    box(R, 7.4, 0.06, 0.04, wood, 0.6, 0.8, -2.2);
    // potato rows
    const leaf = lamC("#4a8a3a"), soil = lamC("#8a6a48");
    for (let r = 0; r < 4; r++) { box(R, 6, 0.12, 0.4, soil, 0.5, 0.05, -0.9 - r * 0.6 - 0.3); for (let k = 0; k < 10; k++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), leaf); b.scale.y = 0.7; b.position.set(-2.2 + k * 0.6, 0.2, -1.2 - r * 0.6); R.add(b); } }
    // flag poles at both camps
    for (const x of [-9, 9]) cyl(R, 0.05, 0.05, 6, lamC("#d8d0c0"), x, 3, -3, 6);
    // cannons
    const iron = lamC("#2a2a30");
    for (const [x, d] of [[-7.2, 1], [-5.8, 1], [7.4, -1], [6.0, -1]] as const) {
      const c = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.17, 1.6, 12), iron); c.rotation.z = d * Math.PI / 2 - d * 0.1; c.position.set(x + d * 0.3, 0.55, -1.2); c.castShadow = true; R.add(c);
      for (const dz of [-0.25, 0.25]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 14), wood); w.rotation.x = Math.PI / 2; w.position.set(x, 0.35, -1.2 + dz); R.add(w); }
    }
    // the British fleet
    const hull = lamC("#2a2a30"), stripe = lamC("#f2ece0"), sail = lamC("#f4f1ea", { side: THREE.DoubleSide });
    const ship = (x: number, z: number, s: number) => {
      box(R, 16 * s, 3 * s, 4.5 * s, hull, x, 1.2 * s, z); box(R, 16.1 * s, 0.35 * s, 4.6 * s, stripe, x, 1.6 * s, z);
      box(R, 15 * s, 0.15 * s, 4 * s, wood, x, 2.75 * s, z);
      for (const dx of [-5, 0, 5]) {
        cyl(R, 0.15 * s, 0.18 * s, 12 * s, wood, x + dx * s, 8.5 * s, z, 6);
        for (const [y, w] of [[6, 5], [9.5, 4], [12.5, 3]]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w * s, 2.6 * s), sail); m.position.set(x + dx * s, y * s, z + 0.3 * s); R.add(m); }
      }
      for (let k = 0; k < 7; k++) box(R, 0.5 * s, 0.4 * s, 0.1 * s, iron, x - 6 * s + k * 2 * s, 1.15 * s, z + 2.27 * s);
    };
    ship(SHIP[0], SHIP[2], 1);
    ship(-30, -85, 0.9); ship(32, -90, 0.9); ship(-60, -120, 0.8); ship(60, -125, 0.8);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const P = 0.5;
    const pig = (x: number, z: number, mode: "walk" | "eat" | "dead" | "stand", y = 0, dir = 1) => card(`pig|${mode}|${mode === "walk" ? Math.round(t * 8) % 8 : 0}`, x, z, P, pigDraw((Math.round(t * 8) % 8) * 0.785, mode), dir, 0, y);
    const camps = (n: number, aim: boolean, party = false, x0 = 2.4) => {
      for (let k = 0; k < n; k++) {
        const row = Math.floor(k / 4), x = x0 + (k % 4) * 0.85 + row * 0.4, z = -0.4 - row * 1.0;
        const ex = party ? (k % 2 ? "laugh" : "grin") : aim ? (k % 3 ? "stern" : "nervous") : "neutral";
        const wav = party ? Math.sin(t * 7 + k) * 0.5 + 0.5 : undefined, hop = party ? Math.abs(Math.sin(t * 6 + k)) * 0.06 : 0;
        person(`uk${k}`, REDCOAT(k), x, hop, z, { mode: "stand", expr: ex as never, facing: -1, wave: wav }, 100 + k);
        person(`us${k}`, BLUECOAT(k), -x, hop, z, { mode: "stand", expr: ex as never, facing: 1, wave: wav }, 200 + k);
      }
    };
    if (id === S.island || id === S.armies || id === S.stand || id === S.party) {
      fx("usflag", 512, 320, usFlag, -8.4, 5.3, -3, 1.2, 0.75); fx("ukflag", 512, 320, ukFlag, 9.6, 5.3, -3, 1.2, 0.75);
    }
    if (id === S.hook || id === S.end) {
      camps(8, true, false, 1.0);
      if (id === S.end && f > W.cerdo2 - 8 && f < W.estados) {
        const up = Math.min(1, (f - W.cerdo2 + 8) / 50);
        pig(0, 0, "stand", 0.3 + up * 0.9);
        fx("halo", 256, 256, haloDraw, 0.18, 1.6 + up * 0.9, 0.05, 0.4, 0.4);
      } else if (id === S.end && f < W.cerdo2 - 8) { pig(0, 0, "dead"); }
      else pig(0, 0, "eat");
    }
    if (id === S.island || id === S.potato) {
      const shot = id === S.potato && f >= W.pum;
      person("cutlar", id === S.potato && f > W.patatas - 3 ? { ...CUTLAR, rifle: true } : CUTLAR, -0.75, 0, 0.1, { mode: "stand", expr: id === S.potato ? (f > W.patatas - 3 ? "stern" : "neutral") : "neutral", facing: 1 }, 1);
      if (id === S.potato && f > W.patatas - 3 && f < W.pum) fx("anger", 256, 256, angerDraw, -0.5, 1.95, 0.2, 0.3, 0.3);
      pig(0.45, -0.4, shot ? "dead" : "eat");
      if (!shot && id === S.potato) fx(`pot|${Math.floor(f / 10) % 2}`, 256, 256, potatoDraw, 1.05, 0.15 + (Math.floor(f / 10) % 2) * 0.05, -0.2, 0.18, 0.18);
      if (id === S.potato && f >= W.pum - 1 && f < W.pum + 8) fx("burst", 256, 256, burstDraw(), 0.1, 1.2, 0.3, 0.6, 0.6);
    }
    if (id === S.owner) {
      pig(0.0, -0.3, "dead");
      person("griffin", GRIFFIN, 1.1, 0, 0.2, { mode: "stand", expr: f > W.amenazan - 4 ? "stern" : "shock", facing: -1 }, 1);
      person("cutlar", CUTLAR, -1.2, 0, 0.2, { mode: "stand", expr: f > W.amenazan - 4 ? "nervous" : "neutral", facing: 1 }, 2);
      if (f > W.amenazan - 6) for (let k = 0; k < 2; k++) person(`off${k}`, REDCOAT(5 + k * 5), 1.9 + k * 0.7, 0, -0.5, { mode: "stand", expr: "stern", facing: -1, wave: k === 0 ? 0.8 : undefined }, 3 + k);
      if (f > W.lia - 4) fx("anger", 256, 256, angerDraw, 1.35, 1.95, 0.4, 0.3, 0.3);
    }
    if (id === S.armies) {
      // American soldiers arrive marching
      for (let k = 0; k < 12; k++) {
        const x = -9 + (f - 484) * 0.03 + (k % 4) * 0.8, z = -1 - Math.floor(k / 4) * 1.0;
        person(`us${k}`, BLUECOAT(k), x, 0, z, { mode: "march", phase: t * 2 + k * 0.3, expr: "stern", facing: 1 }, 200 + k);
      }
    }
    if (id === S.stand) { camps(12, true, false, 1.3); pig(0, 0.3, "dead"); }
    if (id === S.admiral) {
      const no = f > W.yo - 6 && f < W.yo + 40;
      person("admiral", ADMIRAL, SHIP[0], 2.85, SHIP[2] + 1.2, { mode: "stand", expr: f > W.almirante - 4 ? "stern" : "neutral", headTilt: no ? 12 * Math.sin(t * 12) : 0, wave: no ? 0.6 : undefined }, 1);
      for (let k = 0; k < 2; k++) person(`sail${k}`, REDCOAT(k + 2), SHIP[0] + (k ? 1.0 : -1.0), 2.85, SHIP[2] + 0.4, { mode: "stand", expr: "nervous", facing: (k ? -1 : 1) as -1 | 1 }, 2 + k);
    }
    if (id === S.dead) { pig(0, 0, "dead"); if (f > W.tarde - 4) fx("halo", 256, 256, haloDraw, 0.0, 0.85, 0.1, 0.4, 0.4); }
    if (id === S.party) {
      camps(10, false, true, 0.6);
      for (let k = 0; k < 5; k++) fx(`note${k % 2}`, 256, 256, noteDraw(k), -2 + k, 2.4 + ((f / 25 + k * 0.4) % 1) * 1.0, -0.8, 0.4, 0.4);
    }
  }
}
