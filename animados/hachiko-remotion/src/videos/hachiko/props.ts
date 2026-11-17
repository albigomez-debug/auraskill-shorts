// Shared set pieces and small effect drawings for the caricature shorts.
import * as THREE from "three";
import { Pen } from "./toon";
import { rep, ctex, planksHD, grassHD, roofHD } from "./paint";
import { lam, lamC, box, cyl } from "./base";

type P2 = [number, number];
export const qDraw = (p: Pen) => { p.g.fillStyle = "#ffd23f"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 14; p.g.font = "bold 200px Arial"; p.g.textAlign = "center"; p.g.strokeText("?", 128, 200); p.g.fillText("?", 128, 200); };
export const exDraw = (p: Pen) => { p.g.fillStyle = "#ff4a3a"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 14; p.g.font = "bold 200px Arial"; p.g.textAlign = "center"; p.g.strokeText("!", 128, 200); p.g.fillText("!", 128, 200); };
export const noteDraw = (k: number) => (p: Pen) => { const x = 70 + (k % 2) * 30; p.ell(x, 190, 40, 30, "#2a2a32", 5); p.band([[x + 36, 190], [x + 36, 50]], "#2a2a32", 12, 0); p.poly([[x + 36, 50], [x + 110, 80], [x + 110, 110], [x + 36, 84]], "#2a2a32", 0); };
export const heartDraw = (p: Pen) => p.poly([[128, 220], [30, 120], [50, 50], [128, 80], [206, 50], [226, 120]], "#e84a5a", 6);
export const tearDraw = (p: Pen) => p.poly([[128, 40], [170, 150], [128, 200], [86, 150]], "#9ad4ff", 5);
export const textDraw = (txt: string, col = "#ffd23f", size = 110) => (p: Pen) => { p.g.fillStyle = col; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 12; p.g.font = `bold ${size}px Arial`; p.g.textAlign = "center"; p.g.strokeText(txt, 256, 140); p.g.fillText(txt, 256, 140); };
export const labelDraw = (txt: string, col: string) => (p: Pen) => { p.poly([[10, 10], [502, 10], [502, 150], [10, 150]], col, 8); p.g.fillStyle = "#fff"; p.g.font = "bold 76px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 256, 108); };
export const signDraw = (lines: string[], bg = "#f2e2b8", fg = "#8a1e26") => (p: Pen) => {
  p.poly([[16, 16], [1008, 16], [1008, 496], [16, 496]], bg, 12);
  p.g.fillStyle = fg; p.g.textAlign = "center";
  lines.forEach((l, i) => { p.g.font = `bold ${i ? 86 : 120}px 'Arial Black', Arial`; p.g.fillText(l, 512, (lines.length === 1 ? 300 : 160) + i * (lines.length > 2 ? 140 : 190)); });
};
/** a paper with a title, ruled lines and an optional red stamp */
export const docDraw = (title: string, stamp = "", sub = "") => (p: Pen) => {
  p.poly([[40, 20], [472, 20], [472, 600], [40, 600]], "#f2ecdc", 8);
  const g = p.g; g.fillStyle = "#2a2a32"; g.font = `bold ${title.length > 14 ? 36 : 48}px Arial`; g.textAlign = "center"; g.fillText(title, 256, 95);
  if (sub) { g.font = "bold 34px 'Courier New', monospace"; g.fillText(sub, 256, 150); }
  for (let k = 0; k < 8; k++) p.line([[80, 200 + k * 34], [430 - (k % 3) * 40, 200 + k * 34]], "#8a8478", 6, false);
  if (stamp) { g.save(); g.translate(256, 480); g.rotate(-0.25); g.strokeStyle = "#c8202a"; g.lineWidth = 10; g.strokeRect(-210, -60, 420, 120); g.fillStyle = "#c8202a"; g.font = `bold ${stamp.length > 10 ? 40 : 52}px Arial`; g.fillText(stamp, 0, 18); g.restore(); }
};
export const newsDraw = (paper: string, l1: string, l2: string) => (p: Pen) => {
  p.poly([[20, 20], [700, 20], [700, 900], [20, 900]], "#ece6d6", 10);
  const g = p.g; g.fillStyle = "#1a1a1e"; g.textAlign = "center";
  g.font = "bold 44px Georgia, serif"; g.fillText(paper, 360, 90); p.stroke([[50, 110], [670, 110]], 6);
  g.font = `bold ${Math.max(l1.length, l2.length) > 9 ? 80 : 104}px Georgia, serif`; g.fillText(l1, 360, 240); g.fillText(l2, 360, 360);
  for (let k = 0; k < 12; k++) p.line([[60 + (k % 2) * 330, 430 + Math.floor(k / 2) * 70], [330 + (k % 2) * 330, 430 + Math.floor(k / 2) * 70]], "#8a8478", 10, false);
};
export const coinDraw = (txt: string) => (p: Pen) => { p.ell(128, 128, 100, 100, "#f2c84a", 8); p.ell(128, 128, 78, 78, null, 4); p.g.fillStyle = "#6a4a10"; p.g.font = "bold 80px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 128, 156); };
export const smokeDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 5; j++) p.ell(128 + Math.sin(j * 2 + k) * 50, 128 + Math.cos(j * 1.7 + k) * 40, 60 + j * 6, 50 + j * 5, j % 2 ? "#8a8a90" : "#a8a8ae", 0); };
export const fireDraw = (k: number) => (p: Pen) => { p.poly([[60, 240], [90 + k * 10, 120], [120, 180], [128, 40 + k * 20], [150, 170], [180, 100 - k * 10], [200, 240]], "#ff8a2a", 5); p.poly([[100, 240], [128, 140], [160, 240]], "#ffd23f", 0); };
export const zDraw = (p: Pen) => { p.g.fillStyle = "#9ad4ff"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 8; p.g.font = "bold 120px Arial"; p.g.textAlign = "center"; p.g.strokeText("Z", 100, 200); p.g.fillText("Z", 100, 200); p.g.font = "bold 80px Arial"; p.g.strokeText("z", 180, 110); p.g.fillText("z", 180, 110); };
export const flagDraw = (stripes: string[], vertical = false, emblem?: (p: Pen) => void) => (p: Pen) => {
  const n = stripes.length;
  stripes.forEach((c, i) => { p.g.fillStyle = c; if (vertical) p.g.fillRect(16 + (480 / n) * i, 16, 480 / n + 1, 286); else p.g.fillRect(16, 16 + (286 / n) * i, 480, 286 / n + 1); });
  if (emblem) emblem(p);
  p.poly([[16, 16], [496, 16], [496, 302], [16, 302]], null, 8);
};

/** grass ground everywhere */
export const grassGround = (R: THREE.Object3D, tint = "#c8d49a") => { const g = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(grassHD(), 600, 600), color: tint })); g.position.y = -0.02; g.receiveShadow = true; R.add(g); return g; };
/** sea plane with painted wave marks */
export const seaPlane = (R: THREE.Object3D, y = -0.2, col = "#3a7aa8") => {
  const t = ctex("sea" + col, 512, 512, (g, r) => { g.fillStyle = col; g.fillRect(0, 0, 512, 512); for (let k = 0; k < 140; k++) { g.strokeStyle = `rgba(230,245,255,${0.25 + r() * 0.35})`; g.lineWidth = 3; const x = r() * 512, yy = r() * 512; g.beginPath(); g.arc(x, yy, 14 + r() * 10, 3.6, 5.8); g.stroke(); } });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000).rotateX(-Math.PI / 2), lam({ map: rep(t, 300, 300) })); m.position.y = y; R.add(m); return m;
};
export const flatGround = (R: THREE.Object3D, w: number, d: number, col: string, x: number, z: number, y = 0.0) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2), lamC(col)); m.position.set(x, y, z); m.receiveShadow = true; R.add(m); return m; };
export const tree = (R: THREE.Object3D, x: number, z: number, s = 1, leaf = "#4a7a3a") => { cyl(R, 0.15 * s, 0.2 * s, 2.4 * s, lamC("#6a4a2a"), x, 1.2 * s, z, 6); const b = new THREE.Mesh(new THREE.SphereGeometry(1.5 * s, 12, 8), lamC(leaf)); b.position.set(x, 3.2 * s, z); b.castShadow = true; R.add(b); };
export const palm = (R: THREE.Object3D, x: number, z: number, s = 1) => {
  const t = cyl(R, 0.12 * s, 0.18 * s, 5 * s, lamC("#8a6a4a"), x, 2.5 * s, z, 6); t.rotation.z = 0.08;
  for (let k = 0; k < 6; k++) { const l = new THREE.Mesh(new THREE.ConeGeometry(0.35 * s, 2.6 * s, 4), lamC("#3a8a3a")); l.position.set(x + 0.2 * s + Math.cos(k) * 1.0 * s, 4.9 * s, z + Math.sin(k) * 1.0 * s); l.rotation.set(Math.sin(k) * 1.2, 0, -Math.cos(k) * 1.2); R.add(l); }
};
export const house = (R: THREE.Object3D, x: number, z: number, w: number, h: number, d: number, wall = "#d8c8a8", roofCol = "#5a4a52") => {
  box(R, w, h, d, lam({ map: rep(planksHD(), w / 4, h / 3), color: wall }), x, h / 2, z);
  const r = new THREE.Mesh(new THREE.ConeGeometry(Math.hypot(w, d) / 2 + 0.3, h * 0.55, 4), lam({ map: rep(roofHD(roofCol), 2, 2) })); r.rotation.y = Math.PI / 4; r.scale.set(1, 1, d / w); r.position.set(x, h + h * 0.27, z); r.castShadow = true; R.add(r);
};
/** sailing warship along x; s scales; col = hull */
export const sailShip = (R: THREE.Object3D, x: number, z: number, s = 1, col = "#2a2a30", masts = 3, ry = 0) => {
  const G = new THREE.Group(); G.position.set(x, 0, z); G.rotation.y = ry; R.add(G);
  const wood = lam({ map: rep(planksHD(), 1, 1), color: "#b08a5a" }), sail = lamC("#f4f1ea", { side: THREE.DoubleSide });
  box(G, 16 * s, 3 * s, 4.5 * s, lamC(col), 0, 1.2 * s, 0); box(G, 16.1 * s, 0.35 * s, 4.6 * s, lamC("#e8c45a"), 0, 1.9 * s, 0);
  box(G, 15 * s, 0.15 * s, 4 * s, wood, 0, 2.75 * s, 0); box(G, 3 * s, 1.6 * s, 4.4 * s, lamC(col), -6.5 * s, 3.4 * s, 0);
  for (let k = 0; k < masts; k++) {
    const dx = (k - (masts - 1) / 2) * 5;
    cyl(G, 0.15 * s, 0.18 * s, 12 * s, wood, dx * s, 8.5 * s, 0, 6);
    for (const [y, w] of [[6, 5], [9.5, 4], [12.5, 3]]) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w * s, 2.6 * s), sail); m.position.set(dx * s, y * s, 0.3 * s); G.add(m); }
  }
  for (let k = 0; k < 7; k++) box(G, 0.5 * s, 0.4 * s, 0.1 * s, lamC("#1a1a1e"), -6 * s + k * 2 * s, 1.15 * s, 2.27 * s);
  return G;
};
export const P = (x: number, y: number): P2 => [x, y];
