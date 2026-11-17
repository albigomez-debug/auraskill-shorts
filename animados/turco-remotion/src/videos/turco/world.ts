// "El Turco": the Vienna palace hall with the chess cabinet at the origin (front panel hides the operator), the 1854 museum fire (MUS).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box } from "./base";
import { flatGround, textDraw, exDraw, qDraw, labelDraw, fireDraw, smokeDraw } from "./props";
import { S, W, MUS } from "./story";

const TURK: Outfit = { jacket: "#c8323a", pants: "#3a2a5a", boots: "#2a1a10", hat: "persian", skin: SKINS[0], beard: "#2a1a10", moustache: "#2a1a10", belt: "#e8c45a", sash: "#e8c45a" };
const KEMP: Outfit = { jacket: "#3a5a3a", pants: "#e8dcc0", boots: "#111", hat: "hair", hair: "#e8e8e8", skin: SKINS[0], belt: null, buttons: "#e8c45a" };
const NOBLE = (v: number): Outfit => { const o: Outfit = { jacket: ["#5a3a6a", "#3a4a7a", "#7a5a3a", "#2a5a4a"][v % 4], pants: "#e8dcc0", boots: "#111", hat: "hair", hair: "#f2f2f2", skin: SKINS[0], belt: null }; return v % 2 ? { ...o, dress: ["#c87a9a", "#7a9ac8"][v % 2 ? 0 : 1], hat: "bonnet" } : o; };
const FRANK: Outfit = { jacket: "#5a4a3a", pants: "#5a4a3a", boots: "#111", hat: "hair", hair: "#c8c8c8", skin: SKINS[0], belt: null, build: "stout" };
const NAPO: Outfit = { jacket: "#1a2a6a", pants: "#f2ece0", boots: "#111", hat: "bicorne", skin: SKINS[0], belt: null, sash: "#e8c45a", buttons: "#e8c45a", sword: true };
const HIDDEN: Outfit = { jacket: "#4a4a4a", pants: "#3a3a3a", boots: "#2a2020", hat: "hair", hair: "#3a2a1a", skin: SKINS[0], belt: null };
const boardDraw = (n: number) => (p: Pen) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { p.g.fillStyle = (i + j) % 2 ? "#3a2a1a" : "#f2e2c0"; p.g.fillRect(16 + i * 60, 16 + j * 30, 60, 30); } p.poly([[16, 16], [496, 16], [496, 256], [16, 256]], null, 8); for (let k = 0; k < n; k++) { const x = 46 + ((k * 3) % 8) * 60, y = 30 + (k % 4) * 30 + (k > 7 ? 120 : 0); p.ell(x, y, 14, 14, k % 2 ? "#f4f1ea" : "#1a1a1e", 4); } };
const gearDraw = (r: number) => (p: Pen) => { p.g.save(); p.g.translate(128, 128); p.g.rotate(r); p.g.fillStyle = "#b8923a"; p.g.strokeStyle = "#3a2a10"; p.g.lineWidth = 6; for (let k = 0; k < 10; k++) { p.g.rotate(Math.PI / 5); p.g.fillRect(-14, -110, 28, 30); p.g.strokeRect(-14, -110, 28, 30); } p.g.beginPath(); p.g.arc(0, 0, 84, 0, 7); p.g.fill(); p.g.stroke(); p.g.fillStyle = "#3a2a10"; p.g.beginPath(); p.g.arc(0, 0, 20, 0, 7); p.g.fill(); p.g.restore(); };
const pieceDraw = (k: number) => (p: Pen) => { const c = k % 2 ? "#f4f1ea" : "#1a1a1e"; p.poly([[90, 220], [166, 220], [150, 160], [140, 100], [116, 100], [106, 160]], c, 6); p.ell(128, 84, 26, 26, c, 6); };
const candleDraw = (p: Pen) => { p.poly([[110, 240], [146, 240], [146, 130], [110, 130]], "#f4f1ea", 5); p.poly([[128, 60], [146, 110], [128, 130], [110, 110]], "#ffb83a", 4); };

export class World extends Base {
  private front!: THREE.Mesh;
  constructor() {
    super();
    const R = this.root;
    // palace hall: parquet, panelled walls, red curtain
    flatGround(R, 200, 200, "#2a3a2a", 0, 0, -0.03);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 12).rotateX(-Math.PI / 2), lam({ map: rep(planksHD(), 4, 4), color: "#a8784a" })); floor.position.set(0, 0.01, 0); R.add(floor);
    box(R, 14, 5, 0.2, lamC("#e8dcc0"), 0, 2.5, -3.2); for (const x of [-7, 7]) box(R, 0.2, 5, 12, lamC("#e8dcc0"), x, 2.5, 0);
    for (let k = 0; k < 6; k++) box(R, 0.3, 4.6, 0.3, lamC("#e8c45a"), -6 + k * 2.4, 2.3, -3.0);
    box(R, 3, 4, 0.1, lamC("#a8202a"), 0, 2.3, -3.05);
    // the cabinet: back + sides + top, and a removable front panel
    const wood = lam({ map: rep(planksHD(), 1, 0.5), color: "#6a3a1a" });
    box(R, 1.3, 0.9, 0.05, wood, 0, 0.45, -0.35); for (const x of [-0.65, 0.65]) box(R, 0.05, 0.9, 0.7, wood, x, 0.45, 0);
    box(R, 1.36, 0.06, 0.76, lamC("#3a2010"), 0, 0.93, 0);
    this.front = box(R, 1.3, 0.9, 0.05, wood, 0, 0.45, 0.35);
    box(R, 0.6, 0.95, 0.5, lamC("#5a3a20"), 0, 0.475, -0.8);
    // museum (1854)
    flatGround(R, 12, 10, "#6a5a4a", MUS[0], 0, 0.012);
    box(R, 12, 5, 0.2, lamC("#c8b8a0"), MUS[0], 2.5, -2.4);
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const inside = id === S.inside || id === S.gears || id === S.doors;
    this.front.visible = !inside;
    const turk = (expr: "stern" | "grin" | "neutral", arm?: number) => person("turk", TURK, 0, 0.75, -0.7, { mode: "sit", expr, facing: 0, wave: arm, blink: 0 }, 1);
    const board = (n: number) => fx(`bd${n}`, 512, 272, boardDraw(n), 0, 1.06, 0.15, 0.62, 0.33);
    if (id !== S.fire) { turk(id === S.napo && f > W.tira - 4 ? "stern" : id === S.hook || id === S.end || id === S.moves ? "grin" : "neutral", (id === S.moves || id === S.hook || id === S.end || id === S.franklin) ? Math.sin(t * 3) * 0.3 + 0.6 : id === S.napo && f > W.tira - 4 ? 1 : undefined); if (id !== S.inside && id !== S.gears && id !== S.doors) board(12); }
    if (id === S.hook || id === S.end) {
      person("napo", NAPO, 0.95, 0, 0.1, { mode: "stand", expr: "shock", facing: -1 }, 2);
      fx("mate", 512, 200, textDraw("¡JAQUE MATE!", "#ffd23f", 80), 0, 0.6, 0.45, 0.9, 0.35);
    }
    if (id === S.vienna || id === S.europe || id === S.luck) {
      person("kemp", KEMP, -1.3, 0, 0.2, { mode: "stand", expr: "grin", facing: 1, wave: id === S.vienna && f > W.inventor - 4 ? 0.9 : undefined }, 2);
      for (let k = 0; k < 6; k++) person(`n${k}`, NOBLE(k), (k % 2 ? 1 : -1) * (1.6 + Math.floor(k / 2) * 0.8), 0, -1.6 + (k % 3) * 0.5, { mode: "stand", expr: id === S.luck ? "grin" : "shock", facing: (k % 2 ? -1 : 1) as 1 | -1 }, 10 + k);
      if (id === S.vienna && f > W.turco - 4) fx("name", 512, 160, labelDraw("EL TURCO", "#c8323a"), 0, 2.55, 0, 0.9, 0.28);
      if (id === S.europe) fx("tour", 512, 200, textDraw("VIENA · PARÍS · LONDRES", "#ffd23f", 48), 0, 2.8, -0.5, 2.0, 0.78);
    }
    if (id === S.doors || id === S.gears) {
      for (let k = 0; k < 3; k++) fx(`g${k}|${Math.floor(f / 3) % 12}`, 256, 256, gearDraw((Math.floor(f / 3) % 12) * (k % 2 ? -0.26 : 0.26)), -0.38 + k * 0.38, 0.5 + (k % 2) * 0.15, 0.2, 0.36, 0.36);
      if (id === S.gears && f > W.despistar - 4) fx("desp", 512, 200, textDraw("¡DE ADORNO!", "#ff4a3a", 90), 0, 0.95, 0.4, 0.55, 0.21);
      if (id === S.doors && f > W.engranajes - 4) fx("only", 512, 200, textDraw("SOLO ENGRANAJES", "#ffd23f", 60), 0, 0.95, 0.4, 0.55, 0.21);
    }
    if (id === S.moves || id === S.franklin || id === S.napo) {
      const opp = id === S.franklin ? FRANK : id === S.napo ? NAPO : NOBLE(0);
      const lost = (id === S.moves && f > W.gana - 4) || id === S.franklin || (id === S.napo && f > W.tira - 4);
      person("opp", opp, 0.95, 0, 0.1, { mode: "stand", expr: lost ? "shock" : id === S.napo && f > W.trampas - 6 ? "whistle" : "neutral", facing: -1, wave: id === S.napo && f > W.trampas - 6 && f < W.tira ? 0.7 : undefined }, 2);
      if (id === S.franklin) fx("fr", 512, 160, labelDraw("B. FRANKLIN", "#5a4a3a"), 0.95, 2.2, 0.2, 0.8, 0.25);
      if (id === S.napo && f > W.trampas - 4 && f < W.tira) fx("ex", 256, 256, exDraw, 0.95, 2.15, 0.2, 0.3, 0.3);
      if (id === S.napo && f > W.tira - 4) for (let k = 0; k < 8; k++) { const d = (f - W.tira + 4) * 0.03; fx(`pc${k % 2}`, 256, 256, pieceDraw(k), (k - 3.5) * 0.12 * (1 + d * 3), Math.max(0.08, 1.15 + d * 1.2 - d * d * 3), 0.1 + (k % 3) * 0.1, 0.15, 0.15); }
      if (id === S.moves && f > W.gana - 4) fx("win", 512, 200, textDraw("¡GANA!", "#ffd23f", 110), 0.4, 2.15, 0.2, 0.7, 0.27);
    }
    if (id === S.how) fx("q", 256, 256, qDraw, 0, 0.6, 0.45, 0.45, 0.45);
    if (id === S.inside) {
      person("hid", HIDDEN, -0.1, -0.05, 0.0, { mode: "sit", expr: f > W.palancas - 4 ? "grin" : "stern", facing: 1, wave: f > W.palancas - 4 ? Math.sin(t * 5) * 0.3 + 0.5 : undefined }, 3);
      fx("candle", 256, 256, candleDraw, 0.42, 0.2, 0.15, 0.2, 0.2);
      if (f > W.escondido - 4) fx("lab", 512, 160, labelDraw("MAESTRO OCULTO", "#3a3a3a"), 0, 1.2, 0.45, 0.8, 0.25);
    }
    if (id === S.fire) {
      const X = MUS[0];
      person("turk", TURK, X, 0, -0.75, { mode: "sit", expr: "neutral", facing: 0, blink: 0 }, 1);
      box; // cabinet stays in Vienna; the museum shows the figure and the flames
      if (f > W.incendio - 40) for (let k = 0; k < 5; k++) { fx(`fi${k}|${Math.floor(f / 5) % 2}`, 256, 256, fireDraw(Math.floor(f / 5) % 2), X - 1.6 + k * 0.8, 0.5 + (k % 2) * 0.3, -0.2 + (k % 3) * 0.2, 0.9, 0.9); fx(`sm${k % 3}`, 256, 256, smokeDraw(k % 3), X - 1.6 + k * 0.8, 1.8 + ((f / 40 + k * 0.3) % 1) * 1.5, -0.5, 1.4, 1.4, true); }
    }
  }
}
