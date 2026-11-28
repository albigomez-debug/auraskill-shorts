// "El ladrón del zumo de limón": a Pittsburgh street with the bank (BANK, x = 0), Wheeler's kitchen (HOME), a living room with the
// TV news (TV) and the police cell (JAIL). Bright comic look.
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD, facadeHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { flatGround, textDraw, docDraw, newsDraw, qDraw, exDraw, ctaDraw, carDraw } from "./props";
import { smooth } from "./story";
import { S, W, HOME, TV, JAIL } from "./story";

const WHEELER: Outfit = { jacket: "#3a3a44", pants: "#2a3a5a", boots: "#1a1a1e", hat: "cap", cap: "#c8323a", skin: SKINS[3], belt: null, buttons: "#c8c0b0", build: "stout" };
const COP = (v: number): Outfit => ({ jacket: "#1e2a4a", pants: "#1e2a4a", boots: "#111", hat: "cap", cap: "#1e2a4a", skin: SKINS[v % 4], belt: "#2a2a2a", buttons: "#e8c45a", moustache: v % 2 ? "#3a2a1a" : undefined });
const PROF = (v: number): Outfit => ({ jacket: ["#8a5a3a", "#4a5a3a"][v % 2], pants: "#3a3a40", boots: "#2a1a1a", hat: "hair", hair: ["#9a9a9a", "#3a2a1a"][v % 2], skin: SKINS[v % 4], belt: null, buttons: "#c8c0b0", moustache: v ? undefined : "#9a9a9a" });
const lemonDraw = (half: boolean) => (p: Pen) => { if (half) { p.ell(128, 128, 100, 100, "#ffe23a", 8); p.ell(128, 128, 78, 78, "#fff6a0", 4); for (let k = 0; k < 8; k++) { const a = (k / 8) * Math.PI * 2; p.stroke([[128, 128], [128 + Math.cos(a) * 74, 128 + Math.sin(a) * 74]], 5, "#ffe23a"); } } else { p.ell(128, 128, 110, 80, "#ffe23a", 8); p.ell(236, 128, 14, 10, "#ffe23a", 5); p.ell(100, 100, 30, 14, "#fff6a0", 0); } };
const dropsDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 4; j++) { const x = 60 + j * 45, y = 40 + ((k * 30 + j * 50) % 180); p.poly([[x, y], [x + 14, y + 34], [x, y + 46], [x - 14, y + 34]], "#ffe23a", 4); } };
const sparkDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 5; j++) { const x = 40 + ((j * 97 + k * 31) % 180), y = 40 + ((j * 61 + k * 47) % 180), r = 14 + (j % 3) * 8; p.poly([[x, y - r], [x + r * 0.3, y - r * 0.3], [x + r, y], [x + r * 0.3, y + r * 0.3], [x, y + r], [x - r * 0.3, y + r * 0.3], [x - r, y], [x - r * 0.3, y - r * 0.3]], "#fff6a0", 3); } };
const camDraw = (rec: boolean) => (p: Pen) => { p.poly([[40, 90], [190, 70], [200, 150], [50, 160]], "#d8d8de", 7); p.poly([[190, 90], [230, 80], [230, 150], [195, 140]], "#2a2a30", 6); p.stroke([[110, 160], [110, 230]], 12, "#8a8a90"); if (rec) { p.ell(80, 115, 14, 14, "#e2333a", 3); p.g.fillStyle = "#e2333a"; p.g.font = "bold 30px Arial"; p.g.fillText("REC", 100, 126); } };
const polaroidDraw = (dev: number) => (p: Pen) => { p.poly([[40, 20], [216, 20], [216, 240], [40, 240]], "#f8f6f0", 7); p.poly([[56, 36], [200, 36], [200, 190], [56, 190]], dev > 0.5 ? "#c8d8e0" : "#2a2a30", 0); if (dev > 0.5) { p.poly([[90, 190], [100, 140], [156, 140], [166, 190]], "#3a3a44", 4); p.g.fillStyle = "#e2333a"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText("?", 128, 120); } };
const bagDraw = (p: Pen) => { p.ell(128, 160, 90, 80, "#c8b07a", 7); p.poly([[100, 70], [156, 70], [146, 95], [110, 95]], "#c8b07a", 6); p.g.fillStyle = "#3a8a3a"; p.g.font = "bold 90px Arial"; p.g.textAlign = "center"; p.g.fillText("$", 128, 195); };
const barsDraw = (p: Pen) => { for (let k = 0; k < 6; k++) p.band([[30 + k * 90, 0], [30 + k * 90, 512]], "#5a5a62", 10, 3); p.band([[0, 40], [512, 40]], "#5a5a62", 18, 4); };
const dkDraw = (p: Pen) => {
  p.poly([[20, 20], [492, 20], [492, 600], [20, 600]], "#2a3a32", 10);
  const g = p.g; g.strokeStyle = "#f4f1ea"; g.lineWidth = 8; g.beginPath(); g.moveTo(70, 80); g.lineTo(70, 520); g.lineTo(470, 520); g.stroke();
  g.strokeStyle = "#ffd23f"; g.lineWidth = 12; g.beginPath(); g.moveTo(80, 500); g.quadraticCurveTo(140, 120, 190, 150); g.quadraticCurveTo(260, 420, 330, 380); g.quadraticCurveTo(400, 330, 460, 250); g.stroke();
  g.fillStyle = "#f4f1ea"; g.font = "bold 34px 'Comic Sans MS', Arial"; g.textAlign = "center"; g.fillText("confianza", 170, 70); g.fillText("lo que sabes →", 330, 570);
  p.ell(190, 150, 18, 18, "#e2333a", 4);
};

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    flatGround(R, 3000, 3000, "#9a9a9c", 0, 0, -0.02);
    flatGround(R, 200, 3, "#c8c4bc", 0, 1.2, 0.01);
    flatGround(R, 200, 8, "#5a5a62", 0, 7, 0.005);
    // the bank and the street
    box(R, 10, 8, 4, lam({ map: facadeHD("bank", 10, 8, { wall: "#d8d0c0", shutter: "#3a4a5a", door: true }) }), 0, 4, -2.5);
    for (const dx of [-3, -1, 1, 3]) cyl(R, 0.25, 0.25, 4, lamC("#efe8dc"), dx, 2, -0.3, 12);
    box(R, 10.4, 0.6, 1.2, lamC("#e8e0d0"), 0, 4.2, -0.3);
    const cols = ["#a8423a", "#5a7a8a", "#c89a5a", "#7a8a5a", "#8a5a7a", "#4a6a9a"];
    for (let k = 0; k < 10; k++) { if (k === 4 || k === 5) continue; const x = -26 + k * 5.6, h = 7 + (k % 3) * 3; box(R, 5.4, h, 4, lam({ map: facadeHD(`b${k}`, 5.4, h, { wall: cols[k % 6], shutter: "#2a2a30", door: k % 2 === 0 }) }), x, h / 2, -2.5); }
    for (let k = 0; k < 12; k++) box(R, 6, 10 + (k % 4) * 6, 6, lamC(["#8a8a94", "#9aa2aa", "#7a7a84"][k % 3]), -40 + k * 7, 5 + (k % 4) * 3, -30);
    // kitchen
    const wood = lam({ map: rep(planksHD(), 2, 2), color: "#c89a6a" });
    flatGround(R, 12, 10, "#e8dcc0", HOME[0], HOME[2], 0.012);
    box(R, 12, 4, 0.2, lamC("#f2d8a0"), HOME[0], 2, HOME[2] - 2.4); for (const dx of [-6, 6]) box(R, 0.2, 4, 10, lamC("#e8c890"), HOME[0] + dx, 2, HOME[2] + 2);
    box(R, 1.6, 0.06, 0.8, wood, HOME[0] + 0.1, 0.85, HOME[2] - 0.6); for (const dx of [-0.7, 0.7]) for (const dz of [-0.3, 0.3]) cyl(R, 0.03, 0.03, 0.85, wood, HOME[0] + 0.1 + dx, 0.42, HOME[2] - 0.6 + dz, 6);
    box(R, 2.4, 0.9, 0.6, lamC("#7aa8c8"), HOME[0] - 2.6, 0.45, HOME[2] - 2.0); box(R, 0.9, 1.9, 0.6, lamC("#f2f2f0"), HOME[0] + 3.4, 0.95, HOME[2] - 2.0);
    box(R, 1.8, 1.3, 0.06, lamC("#2a3a32"), HOME[0] + 2.4, 1.6, HOME[2] - 2.25);
    // living room with the TV
    flatGround(R, 10, 8, "#b8a080", TV[0], TV[2], 0.012);
    box(R, 10, 4, 0.2, lamC("#c8b8d8"), TV[0], 2, TV[2] - 2.4);
    box(R, 1.4, 0.6, 0.6, wood, TV[0] + 0.1, 0.3, TV[2] - 1.6); box(R, 1.2, 0.9, 0.7, lamC("#4a3a2a"), TV[0] + 0.1, 1.05, TV[2] - 1.6);
    box(R, 2.2, 0.5, 0.9, lamC("#c8423a"), TV[0] - 0.4, 0.25, TV[2] + 0.6); box(R, 2.2, 0.6, 0.2, lamC("#c8423a"), TV[0] - 0.4, 0.75, TV[2] + 1.05);
    // police cell
    flatGround(R, 10, 8, "#9a9aa2", JAIL[0], JAIL[2], 0.012);
    box(R, 10, 4, 0.2, lamC("#b8bcc4"), JAIL[0], 2, JAIL[2] - 1.6); box(R, 1.6, 0.4, 0.6, lamC("#6a6a72"), JAIL[0] + 0.9, 0.2, JAIL[2] - 1.1);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const wheeler = (x: number, z: number, expr: Parameters<Api["person"]>[5]["expr"], wave?: number, facing: -1 | 0 | 1 = 1, y = 0) => person("wheeler", WHEELER, x, y, z, { mode: "stand", expr, facing, wave }, 1);
    const juicy = (x: number, z: number) => { fx(`spark|${Math.floor(f / 5) % 4}`, 256, 256, sparkDraw(Math.floor(f / 5) % 4), x + 0.05, 1.62, z + 0.3, 0.5, 0.5); };
    if (id === S.hook || id === S.end) {
      wheeler(0.05, 0.3, "grin", 0.6 + 0.3 * Math.sin(t * 4));
      juicy(0.05, 0.3);
      fx("cam1", 256, 256, camDraw(Math.floor(f / 15) % 2 === 0), 0.85, 2.1, 0.2, 0.4, 0.4);
      fx("bag", 256, 256, bagDraw, -0.4, 0.85, 0.5, 0.35, 0.35);
      if (id === S.end && f > W.suscribete - 4 && f < W.ladron - 6) { const pr = smooth((f - W.suscribete) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0.1, 1.98, 0.3, 0.72, 0.36); }
      if (id === S.hook && f < 10) fx("ex0", 256, 256, exDraw, 0.6, 2.0, 0.4, 0.5, 0.5);
    }
    if (id === S.city) {
      wheeler(0.2, 0.6, "smile", undefined, 1);
      for (let k = 0; k < 6; k++) person(`p${k}`, PROF(k), -6 + k * 2.4, 0, 1.6 + (k % 2) * 1.2, { mode: "stroll", phase: t * 6 + k, expr: "neutral", facing: k % 2 ? 1 : -1 }, 5 + k);
      card("car", -4 - (f - 86) * 0.08, 5.5, 0.9, carDraw(f / 20, "#3a6ab8"), 1);
    }
    if (id === S.rob) {
      wheeler(0.2, 0.2, f > W.cara - 4 ? "grin" : "smile", f > W.camaras - 4 ? 0.9 : undefined, 1);
      fx("bag", 256, 256, bagDraw, 0.55, 0.9, 0.5, 0.4, 0.4);
      for (const [x, k] of [[-1.0, 0], [1.4, 1]] as const) fx(`cam${k}`, 256, 256, camDraw(true), x, 2.3, -0.2, 0.45, 0.45);
      if (f > W.camaras - 4) fx("smile", 512, 256, textDraw("¡HOLA! 👋", "#ffd23f", 100), 0.2, 2.25, 0.3, 0.8, 0.4);
    }
    if (id === S.idea) {
      wheeler(HOME[0] - 0.35, -0.1, f > W.tinta - 4 ? "grin" : "stern", f > W.zumo - 4 ? 0.8 : undefined, 1);
      if (f < W.porque) fx("q", 256, 256, qDraw, HOME[0] - 0.3, 2.2, 0, 0.4, 0.4);
      fx("lem", 256, 256, lemonDraw(false), HOME[0] + 0.3, 0.98, -0.5, 0.25, 0.25);
      if (f > W.zumo - 4) fx("doc", 512, 620, docDraw("TINTA INVISIBLE", "", "zumo de limón"), HOME[0] + 0.5, 1.5, 0, 0.5, 0.6);
    }
    if (id === S.apply) {
      const squeeze = f > W.echo - 8 && f < W.probo;
      wheeler(HOME[0], 0, squeeze ? "relief" : f > W.sin - 4 ? "shock" : "grin", squeeze ? 0.9 : undefined, 1);
      if (squeeze) { fx("lemH", 256, 256, lemonDraw(true), HOME[0] + 0.2, 1.95, 0.3, 0.22, 0.22); fx(`drops|${Math.floor(f / 4) % 6}`, 256, 256, dropsDraw(Math.floor(f / 4) % 6), HOME[0] + 0.1, 1.65, 0.32, 0.35, 0.35); }
      if (f > W.verán - 4) juicy(HOME[0], 0);
      if (f > W.foto - 4) fx(`pol|${f > W.sin - 4 ? 1 : 0}`, 256, 256, polaroidDraw(f > W.sin - 4 ? 1 : 0), HOME[0] + 0.45, 1.5, 0.35, 0.38, 0.38);
      if (f > W.apunto - 4) fx("q2", 256, 256, qDraw, HOME[0] + 0.45, 1.95, 0.35, 0.25, 0.25);
    }
    if (id === S.news) {
      const T = TV[0];
      fx("tv", 720, 920, newsDraw("NOTICIAS 11", "BUSCADO", "¿LO HAS VISTO?"), T + 0.1, 1.3, -1.2, 0.7, 0.9);
      person("viewer", PROF(1), T - 0.5, 0.0, 0.7, { mode: "sit", expr: f > W.noticias - 4 ? "shock" : "neutral", facing: -1 }, 2, false);
      if (f > W.detienen - 6) { person("cop", COP(0), T + 0.9, 0, 0.2, { mode: "stand", expr: "stern", facing: -1, wave: 0.8 }, 3); fx("ex", 256, 256, exDraw, T + 0.9, 2.2, 0.3, 0.4, 0.4); }
    }
    if (id === S.jail) {
      wheeler(JAIL[0], -0.6, f > W.pero - 4 ? "shock" : "dazed", f > W.pero - 4 ? 0.9 : undefined, 0);
      juicy(JAIL[0], -0.6);
      fx("bars", 512, 512, barsDraw, JAIL[0], 1.4, 0.3, 2.4, 2.4);
      if (f > W.pero - 4) fx("quote", 512, 256, textDraw("¡LLEVABA EL ZUMO!", "#ffe23a", 62), JAIL[0], 2.15, 0.4, 1.0, 0.5);
    }
    if (id === S.study) {
      fx("dk", 512, 620, dkDraw, HOME[0] + 2.4, 1.6, -2.2, 1.6, 1.94);
      for (let k = 0; k < 2; k++) person(`prof${k}`, PROF(k), HOME[0] + 1.6 + k * 1.6, 0, -1.2, { mode: "stand", expr: f > W.poco - 4 ? "grin" : "stern", facing: k ? -1 : 1, wave: k === 0 && f > W.estudio ? 0.8 : undefined }, 2 + k);
    }
  }
}
