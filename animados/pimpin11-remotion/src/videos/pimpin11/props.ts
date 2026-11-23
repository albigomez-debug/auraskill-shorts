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

// ---- added 19/11 (jinete, rayos, maraton, garbo, vesna) ----
/** lightning bolt, 256x512 */
export const boltDraw = (k = 0) => (p: Pen) => { const j = (n: number) => Math.sin(n * 3.1 + k * 1.7) * 14; p.poly([[120 + j(1), 6], [20 + j(2), 330], [118, 320], [40 + j(3), 634], [236 + j(4), 250], [140, 262], [230 + j(5), 6]], "#fff27a", 5); p.poly([[150, 30], [70, 300], [130, 292]], "#ffffff", 0); };
/** labelled bottle 256x512 */
export const bottleDraw = (txt: string, glass = "#6a8a4a", lab = "#f2ecdc") => (p: Pen) => { p.poly([[100, 30], [156, 30], [156, 140], [210, 210], [210, 490], [46, 490], [46, 210], [100, 140]], glass, 8); p.poly([[56, 260], [200, 260], [200, 420], [56, 420]], lab, 5); p.g.fillStyle = "#c8202a"; p.g.textAlign = "center"; p.g.font = `bold ${txt.length > 6 ? 30 : 44}px Arial`; p.g.fillText(txt, 128, 355); };
/** cross medal with a ribbon, 256x384 */
export const crossDraw = (metal = "#3a3a3e", ribbon = "#c8202a", rim = "#e8e8e8") => (p: Pen) => { p.poly([[88, 10], [168, 10], [160, 120], [96, 120]], ribbon, 6); const c = 128, y = 250, a = 100, b = 34; p.poly([[c - b, y - a], [c + b, y - a], [c + b * 0.6, y - b], [c + a, y - b], [c + a, y + b], [c + b * 0.6, y + b], [c + b, y + a], [c - b, y + a], [c - b * 0.6, y + b], [c - a, y + b], [c - a, y - b], [c - b * 0.6, y - b]], rim, 8); p.poly([[c - b + 12, y - a + 12], [c + b - 12, y - a + 12], [c + 8, y - 8], [c + a - 12, y - b + 12], [c + a - 12, y + b - 12], [c + 8, y + 8], [c + b - 12, y + a - 12], [c - b + 12, y + a - 12], [c - 8, y + 8], [c - a + 12, y + b - 12], [c - a + 12, y - b + 12], [c - 8, y - 8]], metal, 0); };
/** round medal with ribbon, 256x384 */
export const medalDraw = (txt = "", gold = "#f2c84a", ribbon = "#3a5ab8") => (p: Pen) => { p.poly([[80, 10], [176, 10], [150, 160], [106, 160]], ribbon, 6); p.ell(128, 260, 100, 100, gold, 8); p.ell(128, 260, 76, 76, null, 4); if (txt) { p.g.fillStyle = "#6a4a10"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 128, 285); } };
/** water jug 256x256 */
export const jugDraw = (p: Pen) => { p.poly([[70, 60], [186, 60], [220, 120], [220, 240], [36, 240], [36, 120]], "#9ad4ff", 8); p.poly([[100, 20], [156, 20], [156, 60], [100, 60]], "#e84a3a", 6); p.arc(205, 150, 40, 50, -80, 80, 14); };
/** apple 128x128 (rotten = brown with spots) */
export const appleDraw = (rotten = false) => (p: Pen) => { p.ell(64, 72, 50, 46, rotten ? "#8a6a2a" : "#d8302a", 6); p.stroke([[64, 30], [70, 8]], 8); if (rotten) for (let k = 0; k < 3; k++) p.ell(44 + k * 18, 70 + (k % 2) * 16, 9, 7, "#4a3a1a", 0); };
/** 1904 motor car in profile on a 2000x1400 card (ground y=1375), facing right; driver drawn by callback at the seat */
export const carDraw = (ph: number, col = "#8a1e26", seat?: (p: Pen) => void) => (p: Pen) => {
  const G = 1375; p.poly([[520, G - 330], [1500, G - 330], [1560, G - 470], [1380, G - 520], [1240, G - 520], [1240, G - 440], [700, G - 440], [600, G - 560], [520, G - 560]], col, 12);
  p.poly([[1240, G - 520], [1380, G - 520], [1400, G - 760], [1340, G - 760]], "#2a2a30", 10); // steering column
  seat?.(p);
  for (const x of [700, 1380]) { p.ell(x, G - 150, 150, 150, "#2a2a30", 12); p.ell(x, G - 150, 95, 95, "#c8b48a", 8); for (let k = 0; k < 6; k++) { const a = ph * 6.283 + k * 1.047; p.stroke([[x, G - 150], [x + Math.cos(a) * 95, G - 150 + Math.sin(a) * 95]], 12); } }
  p.ell(1530, G - 420, 30, 30, "#ffd23f", 6);
};
/** jet airliner in profile on a 2000x1400 card, facing right (y = mid fuselage ~700) */
export const planeDraw = (broken = 0) => (p: Pen) => {
  const y = 700; const body: [number, number][] = [[200, y - 80], [1600, y - 90], [1800, y - 40], [1840, y + 10], [1760, y + 70], [200, y + 80], [80, y + 20]];
  p.poly([[260, y - 80], [120, y - 380], [220, y - 380], [420, y - 80]], "#e8eef4", 10); // tail fin
  p.poly([[700, y + 30], [1100, y + 30], [800, y + 300], [700, y + 300]], "#cfd8e0", 10); // wing
  p.poly(body, "#f4f6f8", 12); p.band([[200, y + 10], [1760, y + 10]], "#2a4ab8", 26, 0);
  for (let k = 0; k < 14; k++) p.ell(500 + k * 80, y - 30, 16, 20, "#3a5a7a", 4);
  p.poly([[1640, y - 70], [1760, y - 50], [1740, y - 20], [1640, y - 30]], "#3a5a7a", 6);
  if (broken) for (let k = 0; k < 6; k++) p.ell(1050 + Math.sin(k * 2) * 120, y + Math.cos(k * 3) * 60, 90 * broken, 70 * broken, k % 2 ? "#ff8a2a" : "#ffd23f", 5);
};
/** call to action: thumbs-up LIKE + red SUSCRÍBETE button, 1024x512; press 0..1 animates the click */
export const ctaDraw = (press = 0) => (p: Pen) => {
  const g = p.g;
  p.poly([[40, 300], [520, 300], [520, 470], [40, 470]], press > 0.5 ? "#6a6a6a" : "#e8202a", 10);
  g.fillStyle = "#fff"; g.textAlign = "center"; g.font = "bold 76px 'Arial Black', Arial"; g.fillText(press > 0.5 ? "SUSCRITO" : "SUSCRÍBETE", 280, 410);
  p.poly([[560, 300], [740, 300], [740, 470], [560, 470]], "#f4f6f8", 10); // bell
  p.poly([[650, 330], [700, 360], [710, 430], [590, 430], [600, 360]], "#ffd23f", 6); p.ell(650, 445, 16, 12, "#ffd23f", 5);
  // thumbs up
  const s = 1 + 0.15 * Math.sin(press * Math.PI);
  g.save(); g.translate(880, 250); g.scale(s, s); g.translate(-880, -250);
  p.poly([[790, 230], [850, 230], [850, 420], [790, 420]], "#3a8ae8", 8);
  p.poly([[860, 230], [900, 120], [930, 90], [950, 120], [935, 210], [1000, 210], [1010, 240], [995, 420], [860, 420]], "#ffd8b0", 8);
  g.restore();
  g.fillStyle = "#ffd23f"; g.strokeStyle = "#1a1010"; g.lineWidth = 10; g.font = "bold 88px 'Arial Black', Arial";
  g.strokeText("LIKE", 900, 510 - 20); g.fillText("LIKE", 900, 510 - 20);
};

// ---- added 21/11 (karansebes, ciguena, annie, caligula, violet) ----
/** speech bubble with text, 512x256 */
export const bubbleDraw = (txt: string, col = "#ffffff", fg = "#1a1a1e") => (p: Pen) => { p.ell(256, 112, 236, 96, col, 8); p.poly([[150, 190], [110, 250], [210, 196]], col, 6); p.ell(256, 112, 228, 88, col, 0); p.g.fillStyle = fg; p.g.textAlign = "center"; p.g.font = `bold ${txt.length > 9 ? 56 : 76}px 'Arial Black', Arial`; p.g.fillText(txt, 256, 138); };
/** wooden barrel, 256x384 (open = lid off) */
export const barrelDraw = (open = false, txt = "") => (p: Pen) => { p.poly([[50, 40], [206, 40], [230, 190], [206, 350], [50, 350], [26, 190]], "#9a6a3a", 8); for (const y of [80, 190, 300]) p.band([[30, y], [226, y]], "#4a4a52", 14, 3); if (open) p.ell(128, 40, 78, 20, "#3a2416", 6); else p.ell(128, 40, 78, 20, "#b07a46", 6); if (txt) { p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 44px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 128, 250); } };
/** seashell, 128x128 */
export const shellDraw = (k = 0) => (p: Pen) => { p.poly([[64, 112], [14, 50], [34, 20], [64, 12], [94, 20], [114, 50]], ["#f2d8c8", "#f4e6d0", "#e8c8b8"][k % 3], 5); for (let j = -2; j <= 2; j++) p.line([[64, 108], [64 + j * 20, 22]], "#c89a8a", 4, false); };
/** stork in profile, 512x512: fly = wings spread (ph flaps), spear through the neck */
export const storkDraw = (ph: number, fly: boolean, spear = true, dead = false) => (p: Pen) => {
  const g = p.g; g.save(); if (dead) { g.translate(256, 256); g.rotate(Math.PI / 2.4); g.translate(-256, -256); }
  if (!fly) { p.stroke([[230, 330], [220, 470]], 8, "#e8502a"); p.stroke([[270, 330], [280, 470]], 8, "#e8502a"); }
  else p.stroke([[160, 300], [60, 330]], 8, "#e8502a");
  const w = fly ? Math.sin(ph * 6.283) * 80 : 0;
  p.ell(250, 280, 110, 60, "#f8f8f4", 7);
  if (fly) { p.poly([[200, 260], [300, 260], [340, 120 - w], [180, 140 - w]], "#f8f8f4", 7); p.poly([[250, 150 - w], [340, 120 - w], [330, 160 - w]], "#1a1a1e", 0); }
  else p.poly([[180, 250], [330, 250], [340, 300], [190, 310]], "#1a1a1e", 6);
  p.stroke([[340, 260], [370, 190], [380, 140]], 26, "#f8f8f4"); p.ell(390, 128, 34, 28, "#f8f8f4", 6); p.dot(398, 120, 6);
  p.poly([[418, 124], [500, 140], [418, 140]], "#e8502a", 5);
  if (spear) { p.stroke([[300, 70], [470, 250]], 10, "#7a5a3a"); p.poly([[290, 60], [320, 64], [300, 90]], "#8a8e96", 5); }
  g.restore();
};
/** vertical streaks of falling water, 256x512 (ph animates) */
export const fallsDraw = (ph: number) => (p: Pen) => { p.g.fillStyle = "#6ab4d8"; p.g.fillRect(0, 0, 256, 512); for (let k = 0; k < 14; k++) { const x = 8 + k * 18, y = ((ph * 512 + k * 97) % 512); p.g.fillStyle = k % 2 ? "#e8f6fc" : "#bfe4f4"; p.g.fillRect(x, y - 140, 6, 120); p.g.fillRect(x, y + 372 - 512, 6, 120); } };
/** white mist puffs, 256x256 */
export const mistDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 6; j++) p.ell(128 + Math.sin(j * 2 + k) * 60, 128 + Math.cos(j * 1.6 + k) * 40, 70, 50, "#f4fafc", 0); };
/** ocean liner along x (bow at +x), s scales; funnels count */
export const liner = (R: THREE.Object3D, x: number, z: number, s = 1, funnels = 4, hull = "#1a1a1e") => {
  box(R, 40 * s, 6 * s, 6 * s, lamC(hull), x, 3 * s - 1.5 * s, z); box(R, 40 * s, 0.6 * s, 6.05 * s, lamC("#c8202a"), x, -1.2 * s, z);
  box(R, 32 * s, 3 * s, 5 * s, lamC("#f4f1ea"), x - 1 * s, 6 * s - 1.5 * s + 0.2, z);
  for (let k = 0; k < funnels; k++) { cyl(R, 0.9 * s, 0.9 * s, 5 * s, lamC("#e8a23a"), x - 10 * s + k * 6 * s, 9.5 * s - 1.5 * s, z, 12); cyl(R, 0.92 * s, 0.92 * s, 1.2 * s, lamC("#1a1a1e"), x - 10 * s + k * 6 * s, 11.5 * s - 1.5 * s, z, 12); }
  for (let k = 0; k < 24; k++) box(R, 0.5 * s, 0.4 * s, 0.05, lamC("#2a3a4a"), x - 18 * s + k * 1.5 * s, 4.6 * s - 1.5 * s, z + 3.03 * s);
};
