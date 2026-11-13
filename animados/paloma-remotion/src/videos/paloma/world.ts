// "Proyecto Paloma": Skinner's lab at x = 0 (tables, the bomb on a stand, a board at x = 3) and the open sky over the sea (y = SKY).
import * as THREE from "three";
import { Pen, Outfit, SKINS, WG } from "./toon";
import { rep, ctex, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { pigeonDraw, coinDraw, burstDraw } from "./beasts";
import { S, W, SKY } from "./story";

const SKINNER: Outfit = { jacket: "#6a6a7a", pants: "#4a4a5a", boots: "#2a2020", hat: "hair", hair: "#8a7a6a", skin: SKINS[0], belt: null, buttons: "#c8c0b0" };
const GENERAL = (v: number): Outfit => ({ jacket: "#5a6a3a", pants: "#4a5a34", boots: "#2a2020", hat: "cap", cap: "#4a5a30", skin: SKINS[v % 4], moustache: v % 2 ? "#6a6a6a" : undefined, buttons: "#e8c45a", belt: "#6a4a2a", build: v === 1 ? "stout" : undefined });
const NAVY: Outfit = { jacket: "#1a2a4a", pants: "#1a2a4a", boots: "#111", hat: "cap", cap: "#f2ece0", skin: SKINS[2], buttons: "#e8c45a", belt: null };

/** the guided bomb in profile; a pigeon looks out of the nose window; ang tilts it (deg) */
const missileDraw = (ang: number, peck: number, flame: number) => (p: Pen) => {
  const g = p.g, cx = 1000, cy = WG - 600;
  g.save(); g.translate(cx, cy); g.rotate((ang * Math.PI) / 180); g.translate(-cx, -cy);
  if (flame) p.poly([[300, cy - 70], [80 - flame * 60, cy], [300, cy + 70]], "#ffb43a", 6), p.poly([[300, cy - 35], [170 - flame * 40, cy], [300, cy + 35]], "#fff3a0", 0);
  for (const s of [-1, 1]) p.poly([[360, cy + s * 120], [260, cy + s * 300], [420, cy + s * 300], [560, cy + s * 120]], "#4a5a34", 9);
  p.poly([[300, cy - 150], [1500, cy - 150], [1500, cy + 150], [300, cy + 150]], "#6a7a4a", 11);
  p.poly([[1500, cy - 150], [1840, cy], [1500, cy + 150]], "#5a6a3a", 11);
  for (const x of [700, 1100]) p.stroke([[x, cy - 150], [x, cy + 150]], 6, "#4a5a34");
  p.g.fillStyle = "#f2ece0"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText("U.S.", 900, cy + 25);
  p.ell(1580, cy - 10, 95, 95, "#bfe4f2", 10);
  const hy = cy - 10 + peck * 30;
  p.ell(1575, hy + 10, 60, 55, "#9aa2b4", 6); p.poly([[1625, hy + 5], [1680, hy + 20], [1625, hy + 30]], "#3a3a44", 4); p.ell(1590, hy - 5, 16, 16, "#fffbea", 3); p.dot(1594, hy - 3, 8);
  p.arc(1580, cy - 10, 70, 70, 200, 250, 10, "#ffffff");
  g.restore();
};
const screenDraw = (ship: boolean, hit: boolean) => (p: Pen) => {
  p.poly([[16, 16], [496, 16], [496, 368], [16, 368]], "#8a8a92", 12); p.poly([[50, 50], [462, 50], [462, 334], [50, 334]], "#1e3a2e", 6);
  if (ship) { p.poly([[150, 220], [360, 220], [330, 260], [180, 260]], "#9ad48a", 0); p.poly([[220, 220], [220, 170], [290, 170], [290, 220]], "#9ad48a", 0); p.stroke([[250, 170], [250, 120]], 8, "#9ad48a"); }
  p.stroke([[256, 60], [256, 324]], 4, hit ? "#ff5a5a" : "#6aaa6a"); p.stroke([[60, 192], [452, 192]], 4, hit ? "#ff5a5a" : "#6aaa6a");
  if (hit) p.ell(256, 192, 60, 60, null, 8);
};
const noseDraw = (n: number) => (p: Pen) => {
  const g = p.g; p.poly([[60, 120], [700, 120], [980, 400], [700, 680], [60, 680]], "#6a7a4a", 12);
  p.poly([[100, 160], [680, 160], [920, 400], [680, 640], [100, 640]], "#e8e4d8", 6);
  for (let k = 0; k < n; k++) {
    const y = 250 + k * 150;
    p.poly([[520, y - 60], [640, y - 60], [640, y + 50], [520, y + 50]], "#1e3a2e", 6); p.poly([[555, y], [610, y], [600, y + 18], [565, y + 18]], "#9ad48a", 0);
    p.ell(360, y + 10, 80, 50, "#9aa2b4", 6); p.ell(450, y - 10, 40, 38, "#9aa2b4", 5); p.poly([[485, y - 15], [515, y - 5], [485, y + 5]], "#3a3a44", 3); p.dot(460, y - 18, 7);
  }
  g.fillStyle = "#2a2a32"; g.font = "bold 64px Arial"; g.textAlign = "left"; g.fillText(`${n} PALOMAS`, 90, 100);
};
const eyeDraw = (p: Pen) => { p.ell(128, 128, 110, 110, "#e8702a", 8); p.ell(128, 128, 55, 55, "#1a1a1e", 0); p.dot(150, 100, 18, "#ffffff"); };
const checkDraw = (p: Pen) => p.stroke([[50, 140], [110, 200], [210, 60]], 34, "#3ac85a");
const docDraw = (title: string, stamp: boolean) => (p: Pen) => {
  p.poly([[40, 20], [472, 20], [472, 600], [40, 600]], "#f2ecdc", 8);
  const g = p.g; g.fillStyle = "#2a2a32"; g.font = "bold 38px Arial"; g.textAlign = "center"; g.fillText(title, 256, 100);
  for (let k = 0; k < 8; k++) p.line([[80, 170 + k * 34], [430 - (k % 3) * 40, 170 + k * 34]], "#8a8478", 6, false);
  if (stamp) { g.save(); g.translate(256, 470); g.rotate(-0.25); g.strokeStyle = "#c8202a"; g.lineWidth = 10; g.strokeRect(-200, -60, 400, 120); g.fillStyle = "#c8202a"; g.font = "bold 52px Arial"; g.fillText("CANCELADO", 0, 18); g.restore(); }
};
const laughDraw = (p: Pen) => { p.g.fillStyle = "#ffd23f"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 10; p.g.font = "bold 110px Arial"; p.g.textAlign = "center"; p.g.strokeText("JA JA", 256, 150); p.g.fillText("JA JA", 256, 150); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000).rotateX(-Math.PI / 2), lam({ map: rep(ctex("sea", 512, 512, (g, r) => {
      g.fillStyle = "#3a7aa8"; g.fillRect(0, 0, 512, 512);
      for (let k = 0; k < 140; k++) { g.strokeStyle = `rgba(230,245,255,${0.25 + r() * 0.35})`; g.lineWidth = 3; const x = r() * 512, y = r() * 512; g.beginPath(); g.arc(x, y, 14 + r() * 10, 3.6, 5.8); g.stroke(); }
    }), 150, 150) }));
    sea.position.y = -0.3; R.add(sea);
    // target ship far away
    box(R, 40, 8, 8, lamC("#5a6068"), 30, 3, -400); box(R, 10, 10, 6, lamC("#6a7078"), 30, 10, -400);
    // the lab
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(16, 14).rotateX(-Math.PI / 2), lam({ map: rep(planksHD(), 4, 4), color: "#b08a5a" })); floor.position.set(0, 0.01, 1); floor.receiveShadow = true; R.add(floor);
    const wall = lamC("#d8d0b8");
    box(R, 16, 5, 0.2, wall, 0, 2.5, -3.2); for (const dx of [-8, 8]) box(R, 0.2, 5, 14, wall, dx, 2.5, 1);
    for (const dx of [-5, 5]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.8), lamC("#9ad4f2")); w.position.set(dx, 2.6, -3.08); R.add(w); }
    const wood = lam({ map: rep(planksHD(), 1, 0.4), color: "#9a6a40" });
    box(R, 1.6, 0.06, 0.8, wood, 0.6, 0.9, 0); for (const dx of [-0.7, 0.7]) for (const dz of [-0.35, 0.35]) cyl(R, 0.03, 0.03, 0.9, wood, 0.6 + dx, 0.45, dz, 6);
    // the bomb on a stand
    const olive = lamC("#6a7a4a");
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 2.6, 20), olive); body.rotation.z = Math.PI / 2; body.position.set(-1.6, 1.0, -1.6); body.castShadow = true; R.add(body);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.8, 20), lamC("#5a6a3a")); nose.rotation.z = -Math.PI / 2; nose.position.set(-0.1, 1.0, -1.6); R.add(nose);
    for (const dx of [-2.4, -0.8]) box(R, 0.15, 0.7, 0.6, lamC("#4a4a52"), dx, 0.35, -1.6);
    // crates
    for (let k = 0; k < 3; k++) box(R, 0.8, 0.6, 0.6, wood, -5 + k * 0.9, 0.3, -2.4);
    // board for diagrams
    box(R, 2.2, 1.7, 0.06, lamC("#f2ece0"), 3, 1.55, -2.0);
    for (const dx of [-1, 1]) cyl(R, 0.03, 0.03, 2.4, wood, 3 + dx, 1.2, -2.1, 6);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const PG = 0.3;
    const pigeon = (x: number, z: number, peck: number, y = 0, dir = 1, k = 0) => card(`pg${k}|${peck.toFixed(1)}`, x, z, PG, pigeonDraw(peck), dir, 0, y);
    const pk = (s: number) => Math.round(Math.max(0, Math.sin(t * s)) * 3) / 3;
    if (id === S.hook || id === S.turn || id === S.end) {
      const ang = id === S.turn && f > W.gira - 4 ? Math.min(14, (f - W.gira + 4) * 0.6) : 2 * Math.sin(t * 2);
      card(`mis|${ang.toFixed(0)}|${Math.floor(f / 3) % 2}`, 0, 0, 0.87, missileDraw(Math.round(ang), id === S.turn ? pk(14) : 0, 1 + (Math.floor(f / 3) % 2) * 0.5), 1, 0, SKY - 1.15 + 0.05 * Math.sin(t * 3));
    }
    if (id === S.lab || id === S.skinner || id === S.peck || id === S.train || id === S.demo) {
      const pecking = id === S.peck ? f > W.picotea - 4 : id === S.train;
      pigeon(0.5, 0, pecking ? pk(16) : 0, 0.93);
      if (id === S.peck || id === S.train) {
        const hit = id === S.train || (f > W.picotea2 - 3);
        fx(`scr|${hit ? 1 : 0}`, 512, 384, screenDraw(true, hit), 0.82, 1.1, 0.25, 0.26, 0.2);
      }
      if (id === S.skinner && f > W.brutal - 4) fx("eye", 256, 256, eyeDraw, 0.7, 1.4, 0.15, 0.12, 0.12);
      if (id === S.train) for (let k = 0; k < Math.min(5, Math.floor((f - 562) / 12)); k++) fx(`ok${k}`, 256, 256, checkDraw, 0.0 + k * 0.18, 1.75, 0.1, 0.16, 0.16);
      if (id === S.train && f > W.dinero - 4) for (let k = 0; k < 4; k++) fx(`coin${k}`, 256, 256, coinDraw("$"), -0.3 + k * 0.3, 1.6 - ((f - W.dinero + k * 5) % 20) * 0.04, 0.2, 0.18, 0.18);
      if (id !== S.peck) person("skinner", SKINNER, -0.4, 0, 0.2, { mode: "stand", expr: id === S.demo ? (f > W.risa - 4 ? "nervous" : "grin") : f > W.brutal - 4 && id === S.skinner ? "grin" : "smile", facing: 1, wave: id === S.skinner && f > W.skinner - 3 && f < W.brutal ? 0.8 : undefined }, 1);
      if (id === S.demo) {
        for (let k = 0; k < 4; k++) person(`gen${k}`, GENERAL(k), 0.7 + (k % 2) * 0.7, 0, 1.5 + Math.floor(k / 2) * 0.7, { mode: "stand", expr: f > W.risa - 4 ? "laugh" : "stern", facing: -1, tilt: f > W.risa - 4 ? 6 * Math.sin(t * 9 + k) : 0 }, 10 + k);
        if (f > W.risa - 4) fx(`ja${Math.floor(f / 8) % 2}`, 512, 200, laughDraw, 1.1, 2.4 + (Math.floor(f / 8) % 2) * 0.1, 1.6, 1.1, 0.43);
      }
    }
    if (id === S.nose) {
      const n = f > W.tres - 4 ? 3 : 1;
      fx(`nose|${n}`, 1024, 800, noseDraw(n), 3, 1.55, -1.7, 1.9, 1.48);
      if (f > W.barco - 4) fx("scr|0", 512, 384, screenDraw(true, false), 3.6, 0.55, -1.6, 0.5, 0.38);
    }
    if (id === S.cancel) {
      const st = f > W.cancelan - 3;
      fx(`doc|a|${st ? 1 : 0}`, 512, 620, docDraw("PROYECTO PALOMA", st), 3, 1.5, -1.7, 1.0, 1.21);
      if (st) for (let k = 0; k < 3; k++) pigeon(2.2 + k * 0.8, -1.4, 0, 0, 1, k);
    }
    if (id === S.navy) {
      const st = f > W.cancelar - 3;
      person("navy", NAVY, -1.4, 0, 0.2, { mode: "stand", expr: st ? "nervous" : "grin", facing: 1, wave: f > W.marina - 3 && f < W.resucita + 20 ? 0.8 : undefined }, 2);
      if (f > W.resucita - 4) fx(`doc|b|${st ? 1 : 0}`, 512, 620, docDraw("PROYECTO ORCON", st), -0.75, 1.45, 0.3, 0.7, 0.85);
      if (st && f < W.cancelar + 8) fx("burst", 256, 256, burstDraw("#ff8a6a"), -0.75, 1.45, 0.35, 0.9, 0.9);
    }
  }
}
