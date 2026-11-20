// "Garbo" (Juan Pujol): Barcelona street (x=0), British office (UK), Lisbon flat (LIS), German office (GER), Calais coast (CAL), Normandy beach (NOR).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, house, seaPlane, textDraw, labelDraw, docDraw, signDraw, coinDraw, crossDraw, medalDraw, qDraw, ctaDraw, flagDraw } from "./props";
import { S, W, UK, LIS, GER, CAL, NOR, smooth } from "./story";

const PUJOL: Outfit = { jacket: "#3a3a48", pants: "#3a3a48", boots: "#111", hat: "hair", hair: "#2a1a10", skin: SKINS[1], moustache: "#2a1a10", belt: null, buttons: "#c8c0b0" };
const BRIT = (v: number): Outfit => ({ jacket: "#7a6a4a", pants: "#6a5a3a", boots: "#2a2020", hat: "cap", cap: "#7a6a4a", skin: SKINS[0], moustache: v % 2 ? "#8a6a3a" : undefined, belt: "#5a3a1a", buttons: "#e8c45a" });
const GERM = (v: number): Outfit => ({ jacket: "#5a6050", pants: "#4a5044", boots: "#111", hat: "cap", cap: "#4a5044", skin: SKINS[v % 2], belt: "#2a2a2a", buttons: "#c8c8c8", rifle: v > 1 });
const GHOST = (v: number): Outfit => ({ jacket: ["#8a8a96", "#9a9aa6", "#7a7a88"][v % 3], pants: "#6a6a76", boots: "#5a5a66", hat: v % 2 ? "tophat" : "slouch", cap: "#7a7a88", skin: "#c8ccd8", belt: null });
const FOLK = (v: number): Outfit => ({ jacket: ["#5a3a2a", "#2a3a4a", "#6a5a3a"][v % 3], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 4], hat: v % 2 ? "cap" : "hair", cap: "#3a3a3a", hair: "#2a1a10" });
const mapDraw = (p: Pen) => { p.poly([[16, 16], [496, 16], [496, 360], [16, 360]], "#d8ecf4", 8); p.poly([[200, 60], [260, 50], [280, 140], [240, 220], [190, 200], [210, 130]], "#c8d8a0", 5); p.poly([[300, 240], [460, 230], [470, 340], [290, 345]], "#c8d8a0", 5); p.g.fillStyle = "#c8202a"; p.g.font = "bold 34px Arial"; p.g.fillText("✕ LONDRES", 225, 190); };
const bubbleDraw = (txt: string) => (p: Pen) => { p.ell(256, 120, 230, 100, "#ffffff", 8); p.ell(80, 230, 24, 18, "#ffffff", 5); p.g.fillStyle = "#2a2a32"; p.g.textAlign = "center"; p.g.font = "bold 64px Arial"; p.g.fillText(txt, 256, 142); };
const radioDraw = (p: Pen) => { p.poly([[30, 60], [226, 60], [226, 220], [30, 220]], "#5a4a3a", 8); p.ell(90, 140, 40, 40, "#2a2a2a", 5); p.ell(180, 120, 14, 14, "#e8c45a", 4); p.ell(180, 175, 14, 14, "#e8c45a", 4); p.stroke([[200, 60], [240, 0]], 6); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // Barcelona street
    flatGround(R, 30, 8, "#c8b8a0", 0, 0, 0.012);
    for (let k = 0; k < 7; k++) house(R, -12 + k * 4, -5, 3.6, 6 + (k % 3), 3, ["#e8c48a", "#e8dcc0", "#d8a878", "#c8b8a8"][k % 4], "#a84a3a");
    box(R, 30, 5, 0.2, lamC("#e8c48a"), 0, 2.5, -3.4); for (let k = 0; k < 8; k++) for (let j = 0; j < 2; j++) box(R, 0.8, 1.1, 0.1, lamC("#5a3a2a"), -7 + k * 2, 1.4 + j * 2, -3.25);
    // offices: back wall + desk
    const office = (x: number, wall: string) => { box(R, 9, 3.6, 0.2, lam({ map: rep(planksHD(), 2, 1), color: wall }), x, 1.8, -2); flatGround(R, 9, 6, "#7a5a3a", x, 1, 0.013); box(R, 2.0, 0.8, 0.9, lamC("#5a3a20"), x, 0.4, -0.6); };
    office(UK[0], "#c8b8a0"); office(LIS[0], "#e8dcc0"); office(GER[0], "#8a8a7a");
    // coasts
    const sea = seaPlane(R, -0.15, "#4a7a98"); sea.position.set(CAL[0], 0, -30); sea.scale.set(0.05, 1, 0.01);
    flatGround(R, 60, 10, "#d8c8a0", CAL[0], 0, 0.013); flatGround(R, 60, 10, "#d8c8a0", NOR[0], 0, 0.013);
    const steel = lamC("#6a7078");
    for (let k = 0; k < 7; k++) { box(R, 6, 1.4, 1.6, steel, NOR[0] - 18 + k * 6, 0.4, -22 - (k % 3) * 6); box(R, 1.2, 1.4, 1.2, steel, NOR[0] - 18 + k * 6, 1.6, -22 - (k % 3) * 6); }
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const pujol = (x: number, z: number, expr: "grin" | "smile" | "stern" | "nervous" | "laugh" | "shock" | "neutral", wave?: number, mode: "stand" | "sit" = "stand") => person("pu", PUJOL, x, mode === "sit" ? 0.1 : 0, z, { mode, expr, facing: 0, wave }, 1);
    if (id === S.hook || id === S.end || id === S.medals) {
      const both = id === S.medals;
      pujol(0 + GER[0], 0, "grin", 0.5);
      person("g0", GERM(0), GER[0] - 1.3, 0, -0.4, { mode: "stand", expr: "grin", facing: 1, wave: 0.6 + Math.sin(t * 6) * 0.3 }, 2);
      if (both) person("b0", BRIT(0), GER[0] + 1.3, 0, -0.4, { mode: "stand", expr: "grin", facing: -1, wave: 0.6 + Math.sin(t * 6 + 1) * 0.3 }, 3);
      fx("cross", 256, 384, crossDraw(), GER[0] - 0.22, 1.45, 0.25, 0.26, 0.39);
      if (both && f > W.rey - 6) fx("mbe", 256, 384, medalDraw("", "#d8d8e0", "#c8202a"), GER[0] + 0.22, 1.45, 0.25, 0.26, 0.39);
      if (!both) fx("q", 256, 256, qDraw, GER[0] - 1.3, 2.5, -0.3, 0.4, 0.4);
    }
    if (id === S.bcn) {
      pujol(0, 0, "smile", 0.7);
      for (let k = 0; k < 4; k++) person(`f${k}`, FOLK(k), -3 + k * 2, 0, -1.6, { mode: "stroll", phase: t * 4 + k, expr: "neutral", facing: (k % 2 ? -1 : 1) as 1 | -1 }, 10 + k);
      if (f > W.pujol - 4) fx("name", 512, 160, labelDraw("J. PUJOL", "#3a3a48"), 0, 2.4, 0.3, 0.8, 0.25);
    }
    if (id === S.no) {
      pujol(UK[0] - 0.9, 0.4, f > W.no ? "nervous" : "smile", f < W.no ? 0.7 : undefined);
      person("b0", BRIT(1), UK[0] + 0.5, 0, -1.2, { mode: "stand", expr: "stern", facing: -1 }, 2);
      if (f > W.no - 4) fx(`doc|${f > W.varias - 4 ? 3 : 1}`, 512, 620, docDraw("SOLICITUD", f > W.varias - 4 ? "NO · NO · NO" : "NO", "Espía para UK"), UK[0], 1.3, 0.2, 0.42, 0.5);
    }
    if (id === S.lisbon) {
      pujol(LIS[0] - 0.3, -0.1, "grin", undefined, "stand");
      person("g1", GERM(1), LIS[0] + 2.4, 0, -0.8, { mode: "stand", expr: "grin", facing: -1 }, 2);
      if (f > W.nazis - 6) fx("cross0", 256, 384, crossDraw(), LIS[0] + 2.4, 2.4, -0.7, 0.3, 0.45);
      if (f > W.londres - 4) fx("bub", 512, 256, bubbleDraw(f > W.lisboa - 2 ? "¿LONDRES?" : "LONDRES"), LIS[0] + 1.6, 2.6, -0.6, 0.9, 0.45);
      if (f > W.lisboa - 4) fx("lis", 1024, 512, signDraw(["LISBOA"], "#f2e2b8", "#1a5a3a"), LIS[0] - 0.4, 3.0, -1.85, 1.6, 0.8);
      if (f > W.guia - 4) fx("guide", 512, 620, docDraw("GUÍA DE VIAJES", "", "Londres"), LIS[0] - 0.75, 1.2, 0.4, 0.35, 0.42);
      if (f > W.mapa - 4) fx("map", 512, 384, mapDraw, LIS[0] + 0.25, 1.15, 0.4, 0.5, 0.375);
    }
    if (id === S.spies) {
      pujol(LIS[0] + 6, 0.5, "laugh", 0.8);
      const n = Math.min(27, Math.max(0, Math.floor((f - W.inventa) / 2.2)));
      for (let k = 0; k < n; k++) person(`gh${k}`, GHOST(k), LIS[0] + 6 - 2.8 + (k % 9) * 0.7 + (Math.floor(k / 9) % 2) * 0.35, 0, -1.0 - Math.floor(k / 9) * 0.9, { mode: "stand", expr: "neutral", facing: 0 }, 10 + k);
      if (n > 0) fx(`n|${n}`, 512, 220, textDraw(`${n}`, "#ffd23f", 160), LIS[0] + 6, 3.4, -0.8, 2.0, 0.86);
      if (f > W.pagan - 4) for (let k = 0; k < 5; k++) fx(`c${k}`, 256, 256, coinDraw("$"), LIS[0] + 6 - 2 + k, 1.8 + Math.sin(t * 5 + k) * 0.1, -0.2, 0.3, 0.3);
    }
    if (id === S.garbo) {
      pujol(UK[0] + 6, 0.2, "grin", 0.6);
      for (let k = 0; k < 2; k++) person(`b${k}`, BRIT(k), UK[0] + 6 + (k ? 1.3 : -1.3), 0, -0.6, { mode: "stand", expr: "grin", facing: (k ? -1 : 1) as 1 | -1, wave: k ? 0.7 : undefined }, 2 + k);
      if (f > W.garbo - 4) fx("g", 512, 160, labelDraw("GARBO", "#c8202a"), UK[0] + 6, 2.4, 0.4, 0.8, 0.25);
      if (f > W.diad - 4) fx("dd", 512, 220, textDraw("DÍA D", "#ffd23f", 150), UK[0] + 6, 3.1, -1.0, 1.1, 0.47);
    }
    if (id === S.radio) {
      pujol(UK[0] + 12, 0, "stern"); fx("radio", 256, 256, radioDraw, UK[0] + 12.7, 1.0, 0.4, 0.5, 0.5);
      fx("bub", 512, 256, bubbleDraw(f > W.calais - 4 ? "¡CALAIS!" : "¡ES UN ENGAÑO!"), UK[0] + 12.4, 2.6, 0.2, 1.0, 0.5);
    }
    if (id === S.calais) {
      for (let k = 0; k < 24; k++) person(`s${k}`, GERM(2 + k), CAL[0] - 9 + (k % 8) * 2.2, 0, 2.6 - Math.floor(k / 8) * 1.6, { mode: "stand", expr: f > W.nunca - 4 ? "dazed" : "stern", facing: 0 }, 10 + k);
      fx("cal", 1024, 512, signDraw(["CALAIS"], "#f2e2b8", "#2a2a32"), CAL[0], 3.4, -3, 2.4, 1.2);
      if (f > W.nunca - 4) fx("q", 256, 256, qDraw, CAL[0] + 1, 3.0, 1.5, 0.6, 0.6);
    }
    if (id === S.cta) {
      pujol(0, 0, "grin", 0.9);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.4, 2.2, 1.1);
    }
  }
}
