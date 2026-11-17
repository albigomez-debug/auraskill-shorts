// Shared animal cards (2000x1400 wide canvas, ground at WG, facing right) and small effect drawings.
import { Pen, WG, shade } from "./toon";

type P2 = [number, number];
const G = WG;
const eye = (p: Pen, x: number, y: number, r: number, kind: "calm" | "wide" | "x" | "lid" = "calm") => {
  if (kind === "x") { p.stroke([[x - r, y - r], [x + r, y + r]], r * 0.45); p.stroke([[x - r, y + r], [x + r, y - r]], r * 0.45); return; }
  p.ell(x, y, r, r * (kind === "wide" ? 1.25 : 1.05), "#fffbea", Math.max(4, r * 0.18));
  p.dot(x + r * 0.2, y + r * 0.05, r * (kind === "wide" ? 0.35 : 0.5));
  if (kind === "lid") p.poly([[x - r, y - r * 1.1], [x + r, y - r * 1.1], [x + r, y - r * 0.1], [x - r, y - r * 0.1]], "#fffbea", 0), p.stroke([[x - r, y - r * 0.1], [x + r, y - r * 0.1]], r * 0.22);
};
const legs = (p: Pen, pts: [P2, P2][], col: string, w: number) => { for (const [a, b] of pts) p.line([a, b], col, w); };

/** chicken: walk phase ph, headless shows a neck stump; peck tilts forward */
export const chickenDraw = (ph: number, headless: boolean, col = "#fbf7ee", mood: "calm" | "wide" = "calm") => (p: Pen) => {
  const bx = 1000, by = G - 430, sw = Math.sin(ph) * 70, bob = Math.abs(Math.cos(ph)) * 18;
  legs(p, [[[bx - 40, by + 150], [bx - 40 + sw, G - 10]], [[bx + 40, by + 150], [bx + 40 - sw, G - 10]]], "#f2b23a", 26);
  for (const s of [1, -1]) { const fx = bx + s * 40 + s * sw * (s > 0 ? 1 : -1) * 1; p.stroke([[fx, G - 10], [fx + 70, G - 4]], 16, "#e09a26"); }
  p.poly([[bx - 220, by - 40 - bob], [bx - 380, by - 260 - bob], [bx - 300, by - 60 - bob], [bx - 400, by - 160 - bob], [bx - 260, by + 20 - bob]], shade(col, 0.92), 10);
  p.ell(bx, by - bob, 260, 190, col, 11);
  p.ell(bx - 30, by - 10 - bob, 150, 90, shade(col, 0.88), 8, 0, 360, -12);
  const nx = bx + 190, ny = by - 120 - bob;
  if (headless) {
    p.band([[nx, ny + 60], [nx + 40, ny - 120]], col, 110, 10, "round");
    p.ell(nx + 40, ny - 165, 48, 22, "#e9a0a0", 7);
    return;
  }
  p.band([[nx, ny + 60], [nx + 60, ny - 160]], col, 110, 10, "round");
  const hx = nx + 75, hy = ny - 230;
  for (let k = 0; k < 3; k++) p.ell(hx - 30 + k * 34, hy - 85, 26, 40, "#e2333a", 6);
  p.ell(hx, hy, 85, 78, col, 10);
  p.poly([[hx + 70, hy - 10], [hx + 150, hy + 10], [hx + 70, hy + 30]], "#f2b23a", 7);
  p.ell(hx + 60, hy + 70, 22, 38, "#e2333a", 6);
  eye(p, hx + 25, hy - 18, 24, mood);
};

/** pig: walking phase; dead lies on its back */
export const pigDraw = (ph: number, mode: "walk" | "eat" | "dead" | "stand") => (p: Pen) => {
  const col = "#f4b3b8", dk = "#d98a92";
  if (mode === "dead") {
    const bx = 1000, by = G - 200;
    for (const dx of [-170, -70, 90, 190]) p.line([[bx + dx, by - 140], [bx + dx + 10, by - 300]], col, 60);
    p.ell(bx, by, 330, 190, col, 11); p.ell(bx + 330, by + 20, 150, 130, col, 10);
    p.ell(bx + 450, by + 40, 50, 60, dk, 7); eye(p, bx + 360, by - 10, 22, "x");
    p.arc(bx - 360, by - 40, 40, 40, 0, 300, 10, dk);
    return;
  }
  const bx = 1000, by = G - 320, sw = mode === "walk" ? Math.sin(ph) * 50 : 0, hd = mode === "eat" ? 110 : 0;
  legs(p, [[[bx - 200, by + 120], [bx - 200 + sw, G - 10]], [[bx - 120, by + 130], [bx - 120 - sw, G - 10]], [[bx + 120, by + 130], [bx + 120 + sw, G - 10]], [[bx + 200, by + 120], [bx + 200 - sw, G - 10]]], col, 62);
  p.arc(bx - 360, by - 60, 40, 40, 0, 300, 10, dk);
  p.ell(bx, by, 330, 210, col, 11);
  p.ell(bx - 40, by + 60, 220, 90, shade(col, 0.93), 0);
  const hx = bx + 300, hy = by - 60 + hd;
  p.poly([[hx - 60, hy - 120], [hx - 20, hy - 230], [hx + 40, hy - 110]], dk, 8);
  p.ell(hx, hy, 150, 135, col, 10);
  p.ell(hx + 140, hy + 30, 50, 62, dk, 8); p.dot(hx + 130, hy + 15, 10); p.dot(hx + 150, hy + 45, 10);
  eye(p, hx + 50, hy - 40, 22);
  if (mode === "eat") p.ell(hx + 160, hy + 110, 50, 34, "#c9a26a", 7);
};

/** cat: walk/sit/spy; spy shows the antenna in the tail and a mic in the ear */
export const catDraw = (ph: number, mode: "walk" | "sit" | "flat", spyL: boolean | number, col = "#9a9aa2") => (p: Pen) => {
  const spy = !!spyL, ant = spyL === true || spyL === 2;
  const dk = shade(col, 0.75);
  if (mode === "flat") {
    const bx = 1000, by = G - 60;
    p.ell(bx, by, 380, 60, col, 10); p.ell(bx + 380, by - 10, 110, 60, col, 9);
    eye(p, bx + 400, by - 20, 20, "x"); eye(p, bx + 450, by - 20, 20, "x");
    p.line([[bx - 380, by], [bx - 600, by + 10]], col, 30);
    if (spy) { p.stroke([[bx - 600, by + 10], [bx - 700, by - 100]], 6, "#3a3a44"); p.dot(bx - 700, by - 100, 16, "#e2333a"); }
    return;
  }
  const sit = mode === "sit", bx = 1000, by = G - (sit ? 300 : 270), sw = mode === "walk" ? Math.sin(ph) * 60 : 0;
  // tail up, with antenna
  const tb: P2 = [bx - 230, by - 20], tt: P2 = [bx - 330 + 20 * Math.sin(ph * 0.5), by - 360];
  p.line([tb, [bx - 330, by - 160], tt], col, 34);
  if (ant) { p.stroke([tt, [tt[0] - 20, tt[1] - 160]], 7, "#3a3a44"); p.dot(tt[0] - 20, tt[1] - 160, 18, "#e2333a"); }
  if (sit) {
    p.ell(bx, by + 60, 210, 230, col, 11); p.ell(bx + 90, G - 30, 70, 30, col, 7); p.ell(bx - 60, G - 30, 70, 30, col, 7);
  } else {
    legs(p, [[[bx - 160, by + 60], [bx - 160 + sw, G - 10]], [[bx - 90, by + 70], [bx - 90 - sw, G - 10]], [[bx + 120, by + 70], [bx + 120 + sw, G - 10]], [[bx + 190, by + 60], [bx + 190 - sw, G - 10]]], col, 40);
    p.ell(bx, by, 260, 120, col, 11);
    for (let k = 0; k < 3; k++) p.stroke([[bx - 120 + k * 80, by - 110], [bx - 100 + k * 80, by - 40]], 12, dk);
  }
  const hx = bx + (sit ? 90 : 250), hy = by - (sit ? 210 : 120);
  for (const dx of [-60, 50]) p.poly([[hx + dx - 45, hy - 70], [hx + dx, hy - 175], [hx + dx + 45, hy - 70]], col, 9);
  p.ell(hx, hy, 130, 110, col, 10);
  eye(p, hx + 20, hy - 15, 26, "lid"); eye(p, hx + 85, hy - 15, 26, "lid");
  p.poly([[hx + 50, hy + 30], [hx + 70, hy + 30], [hx + 60, hy + 45]], "#e86e78", 3);
  for (const s of [-1, 1]) p.stroke([[hx + 90, hy + 40], [hx + 200, hy + 40 + s * 30]], 4);
  if (spy) { p.dot(hx - 60, hy - 90, 18, "#3a3a44"); p.stroke([[hx - 60, hy - 90], [hx - 140, hy + 20], [bx - 120, by]], 5, "#3a3a44"); }
};

/** pigeon: stand/peck; big eyes */
export const pigeonDraw = (peck: number, col = "#9aa2b4") => (p: Pen) => {
  const bx = 1000, by = G - 330;
  legs(p, [[[bx - 30, by + 140], [bx - 40, G - 10]], [[bx + 40, by + 140], [bx + 40, G - 10]]], "#e8707a", 20);
  p.poly([[bx - 180, by - 20], [bx - 380, by + 40], [bx - 360, by + 100], [bx - 170, by + 70]], shade(col, 0.7), 9);
  p.ell(bx, by, 220, 160, col, 11);
  p.ell(bx - 50, by + 10, 140, 90, shade(col, 0.82), 8, 0, 360, -10);
  for (let k = 0; k < 2; k++) p.stroke([[bx - 120, by - 20 + k * 40], [bx + 20, by - 20 + k * 40]], 10, "#3a3a48");
  const a = peck * 0.9, nx = bx + 150, ny = by - 90;
  const hx = nx + 80 + Math.sin(a) * 120, hy = ny - 130 + (1 - Math.cos(a)) * 260;
  p.band([[nx, ny + 30], [hx - 20, hy + 20]], "#6a9a8a", 120, 10, "round");
  p.ell(hx, hy, 80, 72, col, 10);
  p.poly([[hx + 65, hy - 5], [hx + 140, hy + 15], [hx + 65, hy + 25]], "#3a3a44", 6);
  p.ell(hx + 55, hy - 18, 18, 12, "#f2f0ea", 3);
  eye(p, hx + 20, hy - 15, 22, "wide");
};

/** vulture flying (wings flap) or perched */
export const vultureDraw = (ph: number, fly: boolean, sick = 0) => (p: Pen) => {
  const bx = 1000, by = fly ? 600 : G - 380, col = "#2e2a30", up = Math.sin(ph) * 260;
  if (fly) {
    for (const s of [-1, 1]) p.poly([[bx - 60, by - 20], [bx - 140 - 30 * s, by - 260 * s * 0 - up - 80], [bx - 520, by - up * 0.6 - 120], [bx - 420, by - up * 0.4 - 40], [bx - 300, by + 10]], shade(col, s > 0 ? 1 : 0.8), 10);
  } else legs(p, [[[bx - 30, by + 160], [bx - 30, G - 10]], [[bx + 40, by + 160], [bx + 40, G - 10]]], "#c8a07a", 22);
  p.poly([[bx - 200, by], [bx - 420, by + 60], [bx - 220, by + 80]], col, 10);
  p.ell(bx, by, 240, 160, col, 11);
  p.ell(bx + 200, by - 110, 70, 30, "#f2ece0", 8);
  const hx = bx + 300, hy = by - 170 + sick * 60;
  p.band([[bx + 200, by - 110], [hx, hy]], "#d97a6a", 60, 8, "round");
  p.ell(hx, hy, 70, 60, "#e08a7a", 9);
  p.poly([[hx + 55, hy - 20], [hx + 130, hy + 20], [hx + 70, hy + 40]], "#e8d8b0", 6);
  eye(p, hx + 15, hy - 15, 18, sick > 0.5 ? "wide" : "calm");
};

/** a chunk of raw meat */
export const meatDraw = (seed: number) => (p: Pen) => {
  const r = (k: number) => 0.75 + 0.25 * Math.sin(seed * 7.3 + k * 2.1);
  const pts: P2[] = []; for (let k = 0; k < 9; k++) { const a = (k / 9) * Math.PI * 2; pts.push([128 + Math.cos(a) * 95 * r(k), 128 + Math.sin(a) * 75 * r(k + 3)]); }
  p.poly(pts, "#c8424a", 7); p.ell(110, 115, 40, 18, "#f2c4c0", 0, 0, 360, 20); p.ell(150, 150, 22, 10, "#f2c4c0", 0);
};
export const coinDraw = (txt: string) => (p: Pen) => {
  p.ell(128, 128, 100, 100, "#f2c84a", 8); p.ell(128, 128, 78, 78, null, 4);
  p.g.fillStyle = "#6a4a10"; p.g.font = "bold 80px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 128, 156);
};
export const signDraw = (lines: string[], bg = "#f2e2b8", fg = "#8a1e26") => (p: Pen) => {
  p.poly([[16, 16], [1008, 16], [1008, 496], [16, 496]], bg, 12);
  p.g.fillStyle = fg; p.g.textAlign = "center";
  lines.forEach((l, i) => { p.g.font = `bold ${i ? 90 : 120}px 'Arial Black', Arial`; p.g.fillText(l, 512, 150 + i * 150 * (lines.length > 2 ? 0.95 : 1.4)); });
};
export const burstDraw = (col = "#fff3b0") => (p: Pen) => {
  const pts: P2[] = []; for (let k = 0; k < 24; k++) { const a = (k / 24) * Math.PI * 2, rr = k % 2 ? 60 : 120; pts.push([128 + Math.cos(a) * rr, 128 + Math.sin(a) * rr]); }
  p.poly(pts, col, 6);
};

/** dog: walk/sit; akita (curled tail, pointy ears) or bull terrier (Stubby) */
export const dogDraw = (ph: number, mode: "walk" | "sit" | "bark", kind: "akita" | "stubby", extra: "none" | "coat" | "medal" = "none") => (p: Pen) => {
  const col = kind === "akita" ? "#e8c89a" : "#8a5a3a", light = kind === "akita" ? "#fbf2e2" : "#e8dcc8";
  const sit = mode === "sit", bx = 1000, by = G - (sit ? 330 : 300), sw = mode === "walk" ? Math.sin(ph) * 60 : 0;
  if (kind === "akita") p.arc(bx - 250, by - 110, 80, 80, 60, 330, 46, col), p.arc(bx - 250, by - 110, 80, 80, 60, 330, 30, light);
  else p.line([[bx - 240, by - 20], [bx - 330, by - 120 + Math.sin(ph * 2) * 30]], col, 26);
  if (sit) {
    p.ell(bx, by + 60, 200, 230, col, 11); p.ell(bx + 70, by + 40, 90, 170, light, 0);
    for (const dx of [40, 130]) p.line([[bx + dx, by + 60], [bx + dx, G - 15]], col, 46);
    p.ell(bx - 90, G - 40, 120, 40, col, 8);
  } else {
    legs(p, [[[bx - 170, by + 70], [bx - 170 + sw, G - 10]], [[bx - 100, by + 80], [bx - 100 - sw, G - 10]], [[bx + 130, by + 80], [bx + 130 + sw, G - 10]], [[bx + 200, by + 70], [bx + 200 - sw, G - 10]]], col, 48);
    p.ell(bx, by, 270, 140, col, 11); p.ell(bx + 60, by + 60, 180, 60, light, 0);
  }
  if (extra === "coat") p.poly([[bx - 160, by - (sit ? -20 : 110)], [bx + 150, by - (sit ? -20 : 110)], [bx + 170, by + 60], [bx - 180, by + 60]], "#5a6a3a", 8), p.dot(bx, by - (sit ? -60 : 30), 22, "#e8c45a");
  const hx = bx + (sit ? 130 : 270), hy = by - (sit ? 240 : 140), open = mode === "bark" && Math.sin(ph * 3) > 0;
  if (kind === "akita") for (const dx of [-55, 35]) p.poly([[hx + dx - 40, hy - 70], [hx + dx, hy - 170], [hx + dx + 40, hy - 70]], col, 9);
  else for (const dx of [-60, 30]) p.poly([[hx + dx - 35, hy - 60], [hx + dx - 10, hy - 150], [hx + dx + 40, hy - 70]], col, 9);
  p.ell(hx, hy, 135, 115, col, 10);
  p.ell(hx + 110, hy + 35, 85, open ? 70 : 55, light, 8);
  p.ell(hx + 180, hy + 10, 28, 22, "#2a1a1a", 4);
  if (open) p.ell(hx + 140, hy + 80, 40, 22, "#c8424a", 4);
  eye(p, hx + 30, hy - 30, 24);
  if (extra === "medal") { p.dot(hx - 20, hy + 130, 30, "#e8c45a"); p.stroke([[hx - 60, hy + 80], [hx - 20, hy + 105], [hx + 20, hy + 80]], 10, "#c8323a"); }
};

/** big brown bear: walk on fours, or stand upright carrying a crate */
export const bearDraw = (ph: number, mode: "walk" | "stand" | "carry" | "cub") => (p: Pen) => {
  const col = "#7a4a2a", dk = "#5a321c", muz = "#c89a6a";
  if (mode === "walk" || mode === "cub") {
    const k = mode === "cub" ? 0.55 : 1, bx = 1000, by = G - 380 * k, sw = Math.sin(ph) * 60 * k;
    legs(p, [[[bx - 220 * k, by + 100 * k], [bx - 220 * k + sw, G - 10]], [[bx - 120 * k, by + 120 * k], [bx - 120 * k - sw, G - 10]], [[bx + 140 * k, by + 120 * k], [bx + 140 * k + sw, G - 10]], [[bx + 230 * k, by + 100 * k], [bx + 230 * k - sw, G - 10]]], col, 100 * k);
    p.ell(bx, by, 360 * k, 230 * k, col, 11);
    const hx = bx + 330 * k, hy = by - 90 * k;
    for (const dx of [-80, 40]) p.ell(hx + dx * k, hy - 130 * k, 45 * k, 45 * k, col, 8);
    p.ell(hx, hy, 160 * k, 140 * k, col, 10); p.ell(hx + 120 * k, hy + 30 * k, 70 * k, 55 * k, muz, 7); p.ell(hx + 175 * k, hy + 10 * k, 24 * k, 18 * k, "#1a1010", 3);
    eye(p, hx + 40 * k, hy - 40 * k, 22 * k);
    return;
  }
  const bx = 1000, by = G - 700;
  for (const dx of [-90, 90]) p.line([[bx + dx, by + 300], [bx + dx, G - 20]], col, 120);
  p.ell(bx, by + 60, 250, 340, col, 11); p.ell(bx + 20, by + 120, 150, 220, muz, 0);
  const hx = bx + 30, hy = by - 330;
  if (mode === "carry") {
    p.poly([[bx - 170, by - 120], [bx + 230, by - 120], [bx + 230, by + 120], [bx - 170, by + 120]], "#8a6a3a", 10);
    for (const y of [-60, 60]) p.stroke([[bx - 170, by + y], [bx + 230, by + y]], 8, "#5a4024");
    p.g.fillStyle = "#2a2a20"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText("AMMO", bx + 30, by + 25);
    for (const s of [-1, 1]) p.line([[bx + s * 200, by - 200], [bx + s * 210 + 20, by]], col, 90);
  } else for (const s of [-1, 1]) p.line([[bx + s * 220, by - 150], [bx + s * 260, by + 150]], col, 90);
  for (const dx of [-110, 110]) p.ell(hx + dx, hy - 130, 55, 55, col, 8);
  p.ell(hx, hy, 190, 165, col, 10); p.ell(hx + 10, hy + 60, 85, 65, muz, 7); p.ell(hx + 10, hy + 30, 30, 22, "#1a1010", 3);
  eye(p, hx - 60, hy - 40, 24); eye(p, hx + 80, hy - 40, 24);
  void dk;
};
