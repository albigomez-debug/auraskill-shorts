// Extra animal cards (2000x1400 wide canvas, ground at WG, facing right) and prop drawings for the 5 new shorts.
import { Pen, WG, shade } from "./toon";

type P2 = [number, number];
const G = WG;
export const eye = (p: Pen, x: number, y: number, r: number, kind: "calm" | "wide" | "x" | "lid" | "happy" = "calm") => {
  if (kind === "x") { p.stroke([[x - r, y - r], [x + r, y + r]], r * 0.45); p.stroke([[x - r, y + r], [x + r, y - r]], r * 0.45); return; }
  if (kind === "happy") { p.arc(x, y + r * 0.3, r, r * 0.8, 200, 340, Math.max(5, r * 0.3)); return; }
  p.ell(x, y, r, r * (kind === "wide" ? 1.25 : 1.05), "#fffbea", Math.max(4, r * 0.18));
  p.dot(x + r * 0.2, y + r * 0.05, r * (kind === "wide" ? 0.35 : 0.5));
  if (kind === "lid") p.poly([[x - r, y - r * 1.1], [x + r, y - r * 1.1], [x + r, y - r * 0.1], [x - r, y - r * 0.1]], "#fffbea", 0), p.stroke([[x - r, y - r * 0.1], [x + r, y - r * 0.1]], r * 0.22);
};
const legs = (p: Pen, pts: [P2, P2][], col: string, w: number) => { for (const [a, b] of pts) p.line([a, b], col, w); };

export type Hold = null | "crate" | "shell" | "bottle" | "salute";
/** brown bear: walk on all fours, or upright ("stand") holding something; mood for the eyes */
export const bearDraw = (ph: number, mode: "walk" | "stand" | "sit", hold: Hold = null, mood: "calm" | "wide" | "happy" = "calm", cap = false) => (p: Pen) => {
  const col = "#8a5a34", dk = shade(col, 0.72), lt = "#c8946a";
  if (mode === "walk") {
    const bx = 1000, by = G - 380, sw = Math.sin(ph) * 60;
    legs(p, [[[bx - 230, by + 120], [bx - 230 + sw, G - 20]], [[bx - 120, by + 140], [bx - 120 - sw, G - 20]], [[bx + 160, by + 140], [bx + 160 + sw, G - 20]], [[bx + 250, by + 120], [bx + 250 - sw, G - 20]]], col, 95);
    p.ell(bx - 330, by - 40, 50, 45, col, 9);
    p.ell(bx, by, 360, 230, col, 12);
    p.ell(bx - 40, by + 80, 250, 100, dk, 0);
    const hx = bx + 380, hy = by - 90 + Math.sin(ph * 2) * 8;
    head(p, hx, hy, 1, col, lt, mood, cap);
    return;
  }
  if (mode === "sit") {
    const bx = 1000, by = G - 380;
    p.ell(bx, by + 80, 260, 290, col, 12); p.ell(bx + 30, by + 140, 150, 170, lt, 0);
    p.ell(bx + 200, G - 40, 110, 50, col, 9); p.ell(bx - 150, G - 40, 110, 50, col, 9);
    if (hold === "bottle") { bottle(p, bx + 250, by - 40, 0.9); p.line([[bx + 120, by - 20], [bx + 240, by - 40]], col, 80); }
    head(p, bx + 60, by - 280, 1, col, lt, mood, cap);
    return;
  }
  // upright on hind legs
  const bx = 1000, sw = Math.sin(ph) * 40, hip = G - 330, sh = G - 820;
  legs(p, [[[bx - 70, hip], [bx - 80 + sw, G - 20]], [[bx + 70, hip], [bx + 80 - sw, G - 20]]], col, 120);
  for (const s of [-1, 1]) p.ell(bx + s * 80 + (s > 0 ? -sw : sw) + 40, G - 25, 90, 35, dk, 8);
  p.ell(bx, G - 580, 240, 330, col, 12); p.ell(bx + 40, G - 540, 150, 230, lt, 0);
  const armTo: P2 = hold === "salute" ? [bx + 200, sh - 260] : hold ? [bx + 280, sh + 60] : [bx + 230, sh + 180];
  if (hold === "crate" || hold === "shell") {
    if (hold === "crate") { p.poly([[bx + 120, sh - 120], [bx + 440, sh - 120], [bx + 440, sh + 160], [bx + 120, sh + 160]], "#a8844a", 10); p.stroke([[bx + 120, sh - 120], [bx + 440, sh + 160]], 10, "#6a4a2a"); p.stroke([[bx + 440, sh - 120], [bx + 120, sh + 160]], 10, "#6a4a2a"); }
    else shell(p, bx + 290, sh + 20, 1.1);
  }
  if (hold === "bottle") bottle(p, armTo[0] + 30, armTo[1] - 40, 0.9);
  p.line([[bx + 90, sh], armTo], col, 100);
  if (hold !== "salute") p.line([[bx - 90, sh], [bx - 150, sh + 320]], col, 95);
  else p.line([[bx - 90, sh], [bx - 150, sh + 320]], col, 95);
  head(p, bx + 60, sh - 230, 1, col, lt, mood, cap);
};
const head = (p: Pen, hx: number, hy: number, s: number, col: string, lt: string, mood: "calm" | "wide" | "happy", cap: boolean) => {
  for (const dx of [-120, 60]) { p.ell(hx + dx * s, hy - 150 * s, 62 * s, 58 * s, col, 9); p.ell(hx + dx * s, hy - 150 * s, 30 * s, 28 * s, shade(col, 0.7), 0); }
  p.ell(hx, hy, 190 * s, 170 * s, col, 11);
  p.ell(hx + 140 * s, hy + 50 * s, 110 * s, 80 * s, lt, 9);
  p.ell(hx + 230 * s, hy + 20 * s, 38 * s, 30 * s, "#241726", 0);
  p.arc(hx + 160 * s, hy + 80 * s, 50 * s, 30 * s, 20, 160, 9);
  eye(p, hx + 40 * s, hy - 40 * s, 26 * s, mood);
  if (cap) { p.poly([[hx - 140 * s, hy - 120 * s], [hx + 120 * s, hy - 150 * s], [hx + 110 * s, hy - 230 * s], [hx - 120 * s, hy - 210 * s]], "#5a6a3a", 9); p.poly([[hx + 100 * s, hy - 150 * s], [hx + 230 * s, hy - 140 * s], [hx + 110 * s, hy - 120 * s]], "#3a4a2a", 7); p.dot(hx, hy - 180 * s, 14 * s, "#e8c45a"); }
};

/** chacma baboon: walk on fours, sit, or upright pulling a lever (pull 0..1) / pushing a cart */
export const baboonDraw = (ph: number, mode: "walk" | "sit" | "lever" | "push" | "proud", pull = 0, mood: "calm" | "wide" | "happy" = "calm", cap = false) => (p: Pen) => {
  const col = "#8a8070", dk = shade(col, 0.72), face = "#c88a7a";
  if (mode === "walk") {
    const bx = 1000, by = G - 330, sw = Math.sin(ph) * 55;
    legs(p, [[[bx - 170, by + 80], [bx - 170 + sw, G - 15]], [[bx - 100, by + 90], [bx - 100 - sw, G - 15]], [[bx + 150, by + 60], [bx + 150 + sw, G - 15]], [[bx + 220, by + 50], [bx + 220 - sw, G - 15]]], col, 55);
    p.line([[bx - 230, by - 20], [bx - 330, by - 160], [bx - 420, by - 120]], col, 36);
    p.ell(bx, by, 260, 140, col, 11); p.ell(bx - 230, by + 30, 70, 60, "#d27a7a", 7);
    bhead(p, bx + 290, by - 110, 0.9, col, face, mood, cap);
    return;
  }
  if (mode === "sit" || mode === "proud") {
    const bx = 1000, by = G - 300;
    p.line([[bx - 160, G - 40], [bx - 380, G - 30], [bx - 440, G - 120]], col, 36);
    p.ell(bx, by + 40, 200, 250, col, 11); p.ell(bx + 30, by + 80, 110, 150, shade(col, 1.12), 0);
    p.ell(bx + 150, G - 30, 90, 36, col, 8); p.ell(bx - 110, G - 30, 90, 36, col, 8);
    if (mode === "proud") p.line([[bx + 100, by - 100], [bx + 230, by - 330]], col, 52); else p.line([[bx + 100, by - 80], [bx + 200, by + 120]], col, 52);
    bhead(p, bx + 60, by - 260, 1, col, face, mood, cap);
    return;
  }
  // upright: lever pull or cart push (arms forward)
  const bx = 1000, hip = G - 300, sh = G - 700, lean = mode === "push" ? 90 : 30 - pull * 60;
  legs(p, [[[bx - 50, hip], [bx - 90, G - 15]], [[bx + 50, hip], [bx + 70, G - 15]]], col, 62);
  p.line([[bx - 120, hip], [bx - 330, hip + 40], [bx - 400, hip - 60]], col, 34);
  p.ell(bx + lean * 0.4, G - 500, 170, 250, col, 11); p.ell(bx + lean * 0.4 + 30, G - 470, 95, 160, shade(col, 1.12), 0);
  const hand: P2 = mode === "push" ? [bx + 330, sh + 170] : [bx + 230 + lean, sh - 120 + pull * 330];
  p.line([[bx + 60 + lean, sh], hand], col, 52); p.line([[bx + 20 + lean, sh + 20], [hand[0] - 30, hand[1] + 30]], dk, 48);
  bhead(p, bx + 90 + lean, sh - 170, 1, col, face, mood, cap);
};
const bhead = (p: Pen, hx: number, hy: number, s: number, col: string, face: string, mood: "calm" | "wide" | "happy", cap: boolean) => {
  p.ell(hx - 40 * s, hy, 150 * s, 140 * s, shade(col, 1.08), 10); // mane
  p.ell(hx, hy, 115 * s, 105 * s, col, 10);
  p.ell(hx + 140 * s, hy + 40 * s, 120 * s, 62 * s, face, 9, 0, 360, 10);
  p.dot(hx + 245 * s, hy + 30 * s, 12 * s); p.arc(hx + 190 * s, hy + 80 * s, 40 * s, 20 * s, 20, 160, 7);
  p.ell(hx + 20 * s, hy - 30 * s, 50 * s, 30 * s, face, 0);
  eye(p, hx + 40 * s, hy - 35 * s, 22 * s, mood);
  if (cap) { p.poly([[hx - 120 * s, hy - 80 * s], [hx + 110 * s, hy - 100 * s], [hx + 100 * s, hy - 180 * s], [hx - 100 * s, hy - 170 * s]], "#2a3a6a", 8); p.poly([[hx + 95 * s, hy - 100 * s], [hx + 210 * s, hy - 90 * s], [hx + 100 * s, hy - 70 * s]], "#1a2440", 6); }
};

// ---------------- props (fx canvases) ----------------
export const bottle = (p: Pen, x: number, y: number, s = 1) => {
  p.poly([[x - 30 * s, y], [x + 30 * s, y], [x + 34 * s, y + 160 * s], [x - 34 * s, y + 160 * s]], "#5a8a3a", 7 * s);
  p.poly([[x - 14 * s, y - 70 * s], [x + 14 * s, y - 70 * s], [x + 30 * s, y], [x - 30 * s, y]], "#5a8a3a", 7 * s);
  p.poly([[x - 26 * s, y + 50 * s], [x + 26 * s, y + 50 * s], [x + 28 * s, y + 110 * s], [x - 28 * s, y + 110 * s]], "#f2e2b8", 0);
};
export const bottleDraw = (col = "#5a8a3a") => (p: Pen) => {
  p.poly([[96, 90], [160, 90], [168, 240], [88, 240]], col, 7); p.poly([[114, 20], [142, 20], [160, 90], [96, 90]], col, 7);
  p.poly([[92, 140], [164, 140], [166, 200], [90, 200]], "#f2e2b8", 0);
};
export const shell = (p: Pen, x: number, y: number, s = 1) => {
  p.poly([[x - 50 * s, y - 60 * s], [x + 50 * s, y - 60 * s], [x + 50 * s, y + 170 * s], [x - 50 * s, y + 170 * s]], "#c8a04a", 8 * s);
  p.poly([[x - 50 * s, y - 60 * s], [x, y - 190 * s], [x + 50 * s, y - 60 * s]], "#8a8a90", 8 * s);
  p.stroke([[x - 50 * s, y + 120 * s], [x + 50 * s, y + 120 * s]], 8 * s, "#7a5a2a");
};
export const canDraw = (p: Pen) => { p.ell(128, 70, 70, 22, "#c8c8d0", 6); p.poly([[58, 70], [198, 70], [198, 200], [58, 200]], "#c8323a", 6); p.ell(128, 200, 70, 22, "#c8c8d0", 6); p.poly([[58, 110], [198, 110], [198, 160], [58, 160]], "#f2e2b8", 0); };
export const xDraw = (p: Pen) => { p.stroke([[40, 40], [216, 216]], 34, "#e2333a"); p.stroke([[40, 216], [216, 40]], 34, "#e2333a"); };
export const checkDraw = (p: Pen) => { p.stroke([[40, 140], [100, 210], [220, 50]], 36, "#3ac25a"); };
export const qDraw = (col = "#ffd23f") => (p: Pen) => { const g = p.g; g.fillStyle = col; g.strokeStyle = "#1a1010"; g.lineWidth = 14; g.font = "bold 200px Arial"; g.textAlign = "center"; g.strokeText("?", 128, 200); g.fillText("?", 128, 200); };
export const textDraw = (txt: string, col = "#ffd23f", size = 150) => (p: Pen) => { const g = p.g; g.fillStyle = col; g.strokeStyle = "#1a1010"; g.lineWidth = 16; g.font = `bold ${size}px 'Arial Black', Arial`; g.textAlign = "center"; g.strokeText(txt, 256, 170); g.fillText(txt, 256, 170); };
export const heartDraw = (p: Pen) => { p.poly([[128, 220], [30, 120], [40, 60], [90, 40], [128, 80], [166, 40], [216, 60], [226, 120]], "#e2333a", 8); };
export const zzzDraw = (p: Pen) => { const g = p.g; g.fillStyle = "#f4f1ea"; g.strokeStyle = "#1a1010"; g.lineWidth = 10; g.font = "bold 90px Arial"; for (const [x, y, s] of [[60, 210, 70], [120, 140, 90], [190, 70, 110]] as const) { g.font = `bold ${s}px Arial`; g.strokeText("Z", x, y); g.fillText("Z", x, y); } };
export const smokeDraw = (p: Pen) => { for (const [x, y, r] of [[128, 150, 80], [80, 110, 55], [175, 100, 60], [128, 70, 55]] as const) p.ell(x, y, r, r * 0.9, "#c8c4c0", 5); };
export const paperDraw = (title: string, lines: string[], stamp?: string, stampCol = "#c8202a") => (p: Pen) => {
  p.poly([[40, 20], [472, 20], [472, 600], [40, 600]], "#f2ecdc", 8);
  const g = p.g; g.fillStyle = "#2a2a32"; g.font = "bold 50px Arial"; g.textAlign = "center"; g.fillText(title, 256, 95);
  g.font = "bold 36px 'Courier New', monospace"; lines.forEach((l, i) => g.fillText(l, 256, 170 + i * 52));
  for (let k = 0; k < 4; k++) p.line([[80, 190 + lines.length * 52 + k * 34], [430 - (k % 3) * 40, 190 + lines.length * 52 + k * 34]], "#8a8478", 6, false);
  if (stamp) { g.save(); g.translate(256, 480); g.rotate(-0.22); g.strokeStyle = stampCol; g.lineWidth = 10; g.strokeRect(-200, -60, 400, 120); g.fillStyle = stampCol; g.font = "bold 50px Arial"; g.fillText(stamp, 0, 18); g.restore(); }
};
export const starsDraw = (p: Pen) => { const g = p.g; g.fillStyle = "#fff6c8"; for (let k = 0; k < 120; k++) { const x = (Math.sin(k * 12.9) * 0.5 + 0.5) * 1024, y = (Math.sin(k * 78.2) * 0.5 + 0.5) * 512, r = 1 + (k % 3); g.fillRect(x, y, r, r); } };
export const moonDraw = (p: Pen) => { p.ell(128, 128, 100, 100, "#fff6c8", 0); p.ell(165, 105, 85, 90, "#2a3458", 0); };
export const chevronDraw = (n: number) => (p: Pen) => { for (let k = 0; k < n; k++) p.poly([[40, 90 + k * 60], [128, 30 + k * 60], [216, 90 + k * 60], [216, 130 + k * 60], [128, 70 + k * 60], [40, 130 + k * 60]], "#e8c45a", 7); };
