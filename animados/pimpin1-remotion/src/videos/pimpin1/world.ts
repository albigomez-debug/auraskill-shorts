// Pimpín 1 · "Todos de fiesta": the party square (x = 0) and the burger bar at BUR (open towards +z).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lam, lamC, box } from "./base";
import { rep, planksHD } from "./paint";
import { textDraw, labelDraw, ctaDraw, signDraw, bubbleDraw } from "./props";
import { villazanca, PIMPIN, VEC } from "./villa";
import { S, W, BUR, night, fryArc, queueN, smooth } from "./story";

export const PIMS = 1.15;
const ALCALDE: Outfit = { jacket: "#2a2a3a", pants: "#2a2a3a", boots: "#111", hat: "tophat", skin: SKINS[1], moustache: "#5a3a1a", belt: null, sash: "#c8202a", buttons: "#e8c45a", build: "stout" };
const burgerDraw = (p: Pen) => { p.ell(128, 90, 100, 60, "#e8a24a", 7); p.poly([[30, 120], [226, 120], [226, 150], [30, 150]], "#6a3a1a", 6); p.band([[24, 160], [80, 172], [140, 158], [232, 170]], "#6ab83a", 16, 0); p.poly([[34, 176], [222, 176], [210, 210], [46, 210]], "#e8a24a", 7); p.poly([[40, 112], [216, 112], [200, 128], [60, 130]], "#f2c84a", 0); };
const friesDraw = (p: Pen) => { for (let k = 0; k < 7; k++) p.poly([[70 + k * 18, 40 + (k % 3) * 14], [82 + k * 18, 40 + (k % 3) * 14], [86 + k * 16, 140], [72 + k * 16, 140]], "#f6d04a", 4); p.poly([[60, 120], [196, 120], [176, 240], [80, 240]], "#d8302a", 7); p.g.fillStyle = "#f6d04a"; p.g.font = "bold 50px Arial"; p.g.textAlign = "center"; p.g.fillText("P", 128, 200); };
const stickDraw = (p: Pen) => { for (let k = 0; k < 5; k++) p.poly([[40 + k * 30, 30 + (k % 2) * 20], [58 + k * 30, 30 + (k % 2) * 20], [64 + k * 28, 220], [46 + k * 28, 220]], "#f6d04a", 4); };
const bagDraw = (p: Pen) => { p.poly([[40, 70], [216, 70], [226, 250], [30, 250]], "#c89a5a", 7); p.poly([[40, 70], [216, 70], [200, 40], [56, 40]], "#a87a3a", 5); };
const stoneDraw = (p: Pen) => { p.poly([[50, 160], [80, 80], [170, 60], [220, 140], [180, 210], [80, 210]], "#8a9ab0", 7); p.poly([[90, 100], [130, 86], [120, 120]], "#d8e4f4", 0); for (const [x, y] of [[40, 50], [220, 40], [230, 200]]) p.poly([[x, y - 26], [x + 7, y - 7], [x + 26, y], [x + 7, y + 7], [x, y + 26], [x - 7, y + 7], [x - 26, y], [x - 7, y - 7]], "#fff27a", 3); };
const cakeDraw = (p: Pen) => { p.poly([[40, 130], [216, 130], [216, 240], [40, 240]], "#f4d8e8", 7); p.band([[40, 150], [128, 170], [216, 150]], "#e84a6a", 14, 0); for (let k = 0; k < 4; k++) { const x = 70 + k * 38; p.poly([[x, 70], [x + 10, 70], [x + 10, 130], [x, 130]], "#8ac8f0", 4); p.ell(x + 5, 56, 8, 14, "#ffb030", 3); } };
const crownDraw = (p: Pen) => p.poly([[20, 200], [20, 60], [70, 130], [128, 40], [186, 130], [236, 60], [236, 200]], "#f2c84a", 8);
const confDraw = (k: number) => (p: Pen) => { const c = ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a", "#c85ab8"]; for (let j = 0; j < 36; j++) { p.g.fillStyle = c[j % 5]; p.g.fillRect((j * 97 + k * 31) % 512, (j * 61 + k * 47) % 512, 12, 20); } };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const B = BUR[0], tile = lamC("#f4f1ea"), red = lamC("#d8302a");
    box(R, 10, 0.1, 7, tile, B, -0.03, -0.5); box(R, 10, 4.2, 0.3, red, B, 2.1, -3.8); box(R, 0.3, 4.2, 7, red, B - 5, 2.1, -0.5); box(R, 0.3, 4.2, 7, red, B + 5, 2.1, -0.5); box(R, 10.6, 0.4, 7.4, lamC("#f2c84a"), B, 4.3, -0.5);
    box(R, 7, 0.8, 0.8, lam({ map: rep(planksHD(), 3, 1), color: "#e8c890" }), B, 0.4, 0.7); box(R, 7.1, 0.08, 0.9, lamC("#d8302a"), B, 0.82, 0.7);
    box(R, 2.2, 0.9, 1.0, lamC("#5a5a62"), B - 1.8, 0.45, -2.6); box(R, 2.0, 0.04, 0.9, lamC("#1a1a1e"), B - 1.8, 0.92, -2.6);
    box(R, 1.4, 1.0, 1.0, lamC("#8a8e96"), B + 2.4, 0.5, -2.6); box(R, 1.2, 0.04, 0.8, lamC("#e8b04a"), B + 2.4, 1.0, -2.6);
    box(R, 30, 0.1, 30, lamC("#c8b896"), B, -0.05, 14);
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const nk = night(f, id); if (nk > 0) { this.sun.intensity *= 1 - 0.75 * nk; this.hemi.intensity *= 1 - 0.5 * nk; const dk = new THREE.Color("#141a3a"); for (const u of ["c0", "c1", "c2", "c3", "c4"]) (this.skyMat.uniforms[u].value as THREE.Color).lerp(dk, 0.9 * nk); }
    const B = BUR[0], ph = Math.floor(t * 8) % 4;
    const party = id === S.hook || id === S.reasons || id === S.end;
    if (party || id === S.night) {
      for (let j = 0; j < 12; j++) { const x = -6 + (j % 6) * 2.2 + Math.floor(j / 6) * 1.1, z = -1 + Math.floor(j / 6) * 2.2; const dance = party; person(`v${j}`, VEC(j), x, dance ? Math.abs(Math.sin(t * 6 + j)) * 0.15 : 0, z, { mode: id === S.night && f > W.hambre - 4 ? "march" : "stand", phase: t * 2 + j, expr: id === S.night ? "nervous" : "laugh", facing: id === S.night && f > W.hambre - 4 ? 1 : 0, wave: dance ? 0.5 + Math.sin(t * 7 + j) * 0.45 : undefined, tilt: dance ? Math.sin(t * 5 + j) * 0.12 : 0 }, 10 + j, true, 1.0); }
      if (party) fx(`conf|${ph}`, 512, 512, confDraw(ph), 0, 4.5 - ((t * 1.5) % 1.5), 1.5, 9, 9, true);
    }
    if (id === S.reasons) {
      if (f > W.cumple - 6 && f < W.martes - 4) fx("cake", 256, 256, cakeDraw, -1.5, 1.9, 0.6, 1.0, 1.0);
      if (f > W.martes - 6 && f < W.piedra - 20) fx("mar", 1024, 512, signDraw(["¡ES MARTES!"], "#f2e2b8", "#c8202a"), 0.5, 3.5, 0.4, 2.6, 1.3);
      if (f > W.piedra - 30 && f < W.alcalde - 4) fx("stone", 256, 256, stoneDraw, 1.2, 2.3, 1.2, 0.7, 0.7);
      if (f > W.alcalde - 6) { person("alc", ALCALDE, 0.2, 0, 2.2, { mode: "stand", expr: f > W.ach1 - 4 ? "shock" : "grin", facing: 0, tilt: [W.ach1, W.ach2, W.ach3].some((g) => f > g - 2 && f < g + 6) ? -0.15 : 0 }, 3, true, 1.0); [W.ach1, W.ach2, W.ach3].forEach((g, k) => { if (f > g - 2) fx(`ach${k}`, 512, 200, textDraw("¡ACHÍS!", "#ffffff", 90), 0.2 + (k - 1) * 0.8, 2.6 + k * 0.45, 2.4, 0.9, 0.35); }); }
    }
    if (id === S.hookB || id === S.work || id === S.fries || id === S.rush || id === S.honor) {
      const sad = id === S.hookB || id === S.fries;
      const px = id === S.honor ? B : B - 0.8, py = id === S.honor ? 0.0 : 0.3;
      person("pim", PIMPIN, px, py, id === S.honor ? 2.5 : -0.2, { mode: "stand", expr: sad ? "nervous" : id === S.honor ? "laugh" : id === S.rush ? "grin" : f > W.casi - 4 && f < W.casi + 20 ? "shock" : "stern", facing: 0, wave: id === S.rush || id === S.honor || (id === S.work && f > W.lanza - 4) ? 0.95 : undefined }, 1, true, PIMS);
      fx("sign", 1024, 512, signDraw(["HAMBURGUESAS"], "#f2c84a", "#c8202a"), B, 3.5, -3.6, 3.2, 1.6);
      if (id === S.hookB) fx("ja", 512, 200, textDraw("¡JA, JA, JA!", "#ffd23f", 80), B + 0.8, 2.4, 0.2, 1.3, 0.5);
      if (id === S.work) {
        if (f > W.hace - 6 && f < W.envuelve) fx("bur", 256, 256, burgerDraw, B - 1.6, 1.15 + Math.abs(Math.sin((f - W.hace) * 0.25)) * 0.5, -2.4, 0.45, 0.45);
        if (f > W.envuelve - 6 && f < W.patatas) fx("wrap", 256, 256, (p: Pen) => { p.poly([[30, 60], [226, 60], [226, 200], [30, 200]], "#f4f1ea", 7); p.g.fillStyle = "#c8202a"; p.g.font = "bold 40px Arial"; p.g.textAlign = "center"; p.g.fillText("¡ÑAM!", 128, 145); }, B - 0.3, 1.25, 0.6, 0.45, 0.45);
        fx("bag", 256, 256, bagDraw, B + 1.5, 1.1, 0.7, 0.5, 0.5);
        const fa = fryArc(f, W.lanza, B - 0.5, B + 1.5 + (f > W.casi - 20 ? 0.9 : 0)); if (fa) fx("fly", 256, 256, stickDraw, fa[0], fa[1], 0.6, 0.45, 0.45);
        if (f > W.casi - 4) { fx("uy", 512, 200, textDraw("¡UY, CASI!", "#ff6a3a", 90), B + 0.5, 2.6, 0.8, 1.3, 0.5); fx("floor", 256, 256, stickDraw, B + 2.4, 0.25, 1.3, 0.45, 0.45); }
      }
      if (id === S.rush) {
        const n = queueN(f); for (let j = 0; j < 9; j++) if (2.4 + j * 1.3 < a.cam.position.z - 2.5) person(`q${j}`, VEC(j), B + 0.6 + (j % 2) * 0.5, 0, 2.4 + j * 1.3, { mode: "stand", expr: j < n ? "laugh" : "nervous", facing: 0, wave: j < n ? 0.9 : undefined }, 10 + j, true, 1.0);
        const stack = Math.min(12, Math.floor((f - W.mil + 6) / 4)); for (let k = 0; k < stack; k++) fx(`st${k}`, 256, 256, burgerDraw, B - 2.0, 1.0 + k * 0.17, 0.7, 0.4, 0.4);
        for (let k = 0; k < 3; k++) { const fa = fryArc(f, W.lanzando + k * 9, B - 0.5, B + 1.5, 12); if (fa) fx(`fl${k}`, 256, 256, stickDraw, fa[0], fa[1], 0.6, 0.45, 0.45); }
        fx("bag", 256, 256, bagDraw, B + 1.5, 1.1, 0.7, 0.5, 0.5);
        if (f > W.falla - 4) fx("ok", 512, 200, textDraw("¡NI UNA!", "#8ae86a", 100), B + 0.5, 2.6, 0.9, 1.2, 0.47);
        fx("open", 1024, 512, signDraw(["ABIERTO"], "#1a1a2a", "#8ae86a"), B - 3.4, 2.6, -3.6, 1.8, 0.9);
      }
      if (id === S.honor) {
        for (let j = 0; j < 8; j++) person(`h${j}`, VEC(j), B + (j % 2 ? 1 : -1) * (1.0 + Math.floor(j / 2) * 0.8), 0, 1.6 - (j % 3) * 0.3, { mode: "stand", expr: "laugh", facing: 0, wave: 0.5 + Math.sin(t * 7 + j) * 0.45, tilt: Math.sin(t * 5 + j) * 0.12 }, 10 + j, true, 1.0);
        fx(`conf|${ph}`, 512, 512, confDraw(ph), B, 3.4 - ((t * 1.5) % 1.5), 2.6, 7, 7, true);
        if (f > W.honor - 6) { fx("crown", 256, 256, crownDraw, B, 1.72, 2.55, 0.4, 0.4); fx("hl", 1024, 256, (p: Pen) => { p.poly([[10, 10], [1014, 10], [1014, 246], [10, 246]], "#e8c45a", 10); p.g.fillStyle = "#1a1010"; p.g.font = "bold 92px 'Arial Black', Arial"; p.g.textAlign = "center"; p.g.fillText("INVITADO DE HONOR", 512, 160); }, B, 2.75, 2.5, 1.7, 0.42); }
      }
    }
    if (id === S.fries) { fx("fr", 256, 256, friesDraw, B + 0.6, 1.4, -1.2, 0.5, 0.5); fx("bub", 512, 256, bubbleDraw("¡TOC... TOC!"), B - 0.3, 2.6, -0.4, 1.0, 0.5); }
    if (id === S.night && f > W.hambre - 4) for (let j = 0; j < 3; j++) fx(`gr${j}`, 512, 200, textDraw("GRRR", "#ffd23f", 90), -4 + j * 3.5, 2.3 + (j % 2) * 0.3, 0, 0.8, 0.31);
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
    void labelDraw;
  }
}
