// "Vesna Vulović" (1972): airport apron (x=0), the sky high up (SKY, y = ALT), Everest comparison (EVE), snowy slope (SNW), hospital (HOS), Guinness (GUI).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, tree, textDraw, labelDraw, docDraw, planeDraw, qDraw, exDraw, ctaDraw, smokeDraw } from "./props";
import { S, W, SKY, ALT, EVE, SNW, HOS, GUI, fallY, smooth } from "./story";

const VESNA = (hurt = false): Outfit => ({ jacket: "#2a4a8a", pants: "#2a4a8a", boots: "#1a1a1e", hat: "hair", hair: "#3a2a1a", skin: hurt ? "#f0d8c8" : SKINS[0], dress: "#2a4a8a", belt: null, buttons: "#e8c45a" });
const VESNA2: Outfit = { jacket: "#2a4a8a", pants: "#2a4a8a", boots: "#1a1a1e", hat: "hair", hair: "#c8a04a", skin: SKINS[1], dress: "#2a4a8a", belt: null, buttons: "#e8c45a" };
const DOC: Outfit = { jacket: "#5a4a3a", pants: "#3a3a40", boots: "#2a2020", hat: "slouch", cap: "#4a3a2a", skin: SKINS[0], moustache: "#8a8a8a", belt: null };
const NURSE: Outfit = { jacket: "#f4f6f8", pants: "#f4f6f8", boots: "#f4f6f8", hat: "hair", hair: "#5a3a1a", skin: SKINS[1], dress: "#f4f6f8", belt: null };
const cloudDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 6; j++) p.ell(256 + Math.sin(j * 2.1 + k) * 150, 140 + Math.cos(j * 1.3 + k) * 40, 110 + (j % 3) * 20, 70, "#f4f8fc", 0); };
const pieceDraw = (p: Pen) => { p.poly([[40, 80], [470, 60], [490, 300], [30, 320]], "#f4f6f8", 10); p.band([[40, 200], [480, 190]], "#2a4ab8", 22, 0); for (let k = 0; k < 4; k++) p.ell(110 + k * 95, 130, 22, 26, "#3a5a7a", 5); p.poly([[30, 320], [60, 360], [110, 330], [170, 370], [230, 330], [300, 372], [380, 330], [440, 360], [490, 300]], "#c8ccd0", 8); };
const cartDraw = (p: Pen) => { p.poly([[40, 40], [216, 40], [216, 220], [40, 220]], "#c8ccd0", 8); for (let k = 0; k < 3; k++) p.line([[50, 90 + k * 50], [206, 90 + k * 50]], "#8a8e96", 6, false); p.ell(70, 236, 16, 16, "#2a2a2a", 4); p.ell(186, 236, 16, 16, "#2a2a2a", 4); };
const altDraw = (txt: string, col = "#ffd23f") => (p: Pen) => { p.line([[10, 60], [1014, 60]], col, 10, false); p.g.fillStyle = col; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 10; p.g.font = "bold 90px Arial"; p.g.textAlign = "left"; p.g.strokeText(txt, 20, 170); p.g.fillText(txt, 20, 170); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    flatGround(R, 60, 30, "#8a8e92", 0, -6, 0.012);
    box(R, 30, 6, 6, lamC("#d8d4cc"), 0, 3, -24); box(R, 10, 1, 0.2, lamC("#2a4a8a"), 0, 5.2, -20.9);
    // Everest comparison: big mountain cone with snow cap
    const m = new THREE.Mesh(new THREE.ConeGeometry(60, 88, 6), lamC("#6a6a7a")); m.position.set(EVE[0], 44, -60); R.add(m);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(22, 32, 6), lamC("#f4f8fc")); cap.position.set(EVE[0], 74, -60); R.add(cap);
    // snowy slope with trees
    const snow = new THREE.Mesh(new THREE.PlaneGeometry(60, 40).rotateX(-Math.PI / 2), lamC("#f2f6fa")); snow.position.set(SNW[0], 0.02, -6); snow.rotation.z = 0.0; R.add(snow);
    for (let k = 0; k < 30; k++) { const x = SNW[0] - 20 + (k % 10) * 4 + (k % 3), z = -4 - Math.floor(k / 10) * 5; const c = new THREE.Mesh(new THREE.ConeGeometry(1.0, 3.2, 7), lamC("#2a4a3a")); c.position.set(x, 1.6, z); R.add(c); const s = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.0, 7), lamC("#f2f6fa")); s.position.set(x, 3.0, z); R.add(s); }
    // hospital room
    box(R, 9, 3.6, 0.2, lamC("#d8e8e4"), HOS[0], 1.8, -2); flatGround(R, 9, 6, "#c8d0cc", HOS[0], 1, 0.013);
    box(R, 2.2, 0.55, 1.0, lamC("#f4f6f8"), HOS[0] - 0.8, 0.45, -0.6); box(R, 0.1, 1.0, 1.0, lamC("#8a8e96"), HOS[0] - 1.9, 0.5, -0.6);
    box(R, 12, 4, 0.2, lamC("#e8e2d6"), GUI[0], 2, -2.5); flatGround(R, 12, 8, "#c8b8a0", GUI[0], 0, 0.013);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const clouds = (y: number, n = 10) => { void n; for (let k = 0; k < 40; k++) { const cy = ALT + 6 - k * 1.7; if (Math.abs(cy - y) > 9) continue; const side = k % 2 ? 1 : -1; fx(`cl${k}`, 512, 256, cloudDraw(k), SKY[0] + side * (2.2 + (k % 3) * 1.2), cy, k % 5 === 0 ? 2.5 : -2 - (k % 3) * 2, 4, 2, true); } };
    if (id === S.hook || id === S.end || id === S.fall) {
      const y = fallY(f);
      clouds(y);
      fx("piece", 512, 384, pieceDraw, SKY[0], y + 0.2, 0, 3.0, 2.25);
      person("ve", VESNA(), SKY[0] - 0.3, y - 0.3, 0.3, { mode: "fall", expr: "shock", facing: 0, blink: false }, 1);
      fx("cart", 256, 256, cartDraw, SKY[0] + 0.8, y + 0.2, 0.35, 0.8, 0.8);
      if (id === S.fall && f > W.everest - 6) fx("alt", 1024, 256, altDraw("10.160 m"), SKY[0] + 0.3, y + 1.9, -0.5, 3, 0.75);
    }
    if (id === S.intro) {
      card("plane0", 0, -9, 4.0, planeDraw(0), 1, 0);
      person("ve", VESNA(), 0, 0, 0, { mode: "stand", expr: "smile", facing: 0, wave: 0.8 }, 1);
      if (f > W.vesna - 4) fx("name", 512, 160, labelDraw("V. VULOVIĆ", "#2a4a8a"), 0, 2.4, 0.3, 0.8, 0.25);
      if (f > W.anos - 6) fx("age", 512, 200, textDraw("22 AÑOS", "#ffd23f", 100), 0.6, 2.05, 0.4, 0.8, 0.31);
    }
    if (id === S.mixup) {
      person("ve", VESNA(), 4 - 0.7, 0, 0, { mode: "stand", expr: f > W.confundieron - 4 ? "shock" : "smile", facing: 1 }, 1);
      person("ve2", VESNA2, 4 + 0.7, 0, 0, { mode: "stand", expr: "grin", facing: -1 }, 2);
      for (let k = 0; k < 2; k++) fx(`lab${k}`, 512, 160, labelDraw("VESNA", "#2a4a8a"), 4 + (k ? 0.7 : -0.7), 2.35, 0.3, 0.6, 0.19);
      if (f > W.confundieron - 4) fx("q", 256, 256, qDraw, 4, 2.6, 0.2, 0.45, 0.45);
    }
    if (id === S.bomb) {
      clouds(ALT, 8);
      const boom = f > W.revienta - 3;
      card(`plane|${boom ? 1 : 0}`, SKY[0] - 6 + (f - W.sobre) * 0.03, -4, 5.0, planeDraw(boom ? 1 + 0.2 * Math.sin(t * 20) : 0), 1, 0, ALT - 6);
      if (boom) fx(`sm|${Math.floor(t * 6) % 3}`, 256, 256, smokeDraw(Math.floor(t * 6) % 3), SKY[0] - 2, ALT, -3, 4, 4);
    }
    if (id === S.everest) {
      fx("eve", 1024, 256, altDraw("EVEREST 8.849 m", "#ffffff"), EVE[0], 90, -40, 80, 20);
      fx("alt", 1024, 256, altDraw("VESNA 10.160 m"), EVE[0], 106, -40, 80, 20);
    }
    if (id === S.crash || id === S.doctor) {
      fx("piece", 512, 384, pieceDraw, SNW[0], 1.0, -1.0, 3.6, 2.7);
      person("ve", VESNA(true), SNW[0] - 0.6, 0, 0.6, { mode: "fall", expr: "dazed", facing: 0 }, 1);
      if (id === S.doctor) {
        const x = SNW[0] + 3 - smooth((f - W.vecino + 10) / 30) * 2;
        person("doc", DOC, x, 0, 0.8, { mode: f < W.vecino + 20 ? "march" : "stand", phase: t * 3, expr: f > W.viva - 4 ? "shock" : "nervous", facing: -1, wave: f > W.salva - 4 ? 0.8 : undefined }, 2);
        if (f > W.medico - 4) fx("med", 512, 160, labelDraw("EX MÉDICO", "#c8202a"), x, 2.4, 1.0, 0.7, 0.22);
        if (f > W.viva - 4) fx("ex", 256, 256, exDraw, SNW[0] - 0.6, 1.5, 0.8, 0.4, 0.4);
      }
    }
    if (id === S.hospital) {
      const walks = f > W.andar - 8;
      person("ve", VESNA(true), walks ? HOS[0] + 1.2 : HOS[0] - 0.8, walks ? 0 : 0.5, walks ? 0.3 : -0.5, { mode: walks ? "stroll" : "fall", phase: t * 3, expr: walks ? "grin" : "dazed", facing: walks ? 1 : 0 }, 1);
      person("nu", NURSE, HOS[0] + 2.4, 0, -0.8, { mode: "stand", expr: walks ? "laugh" : "nervous", facing: -1, wave: walks ? 0.8 : undefined }, 2);
      const lab = f > W.piernas - 4 ? "PIERNAS ROTAS" : f > W.craneo - 4 ? "CRÁNEO ROTO" : f > W.coma - 4 ? "COMA" : "";
      if (lab && !walks) fx(`lab|${lab}`, 512, 200, textDraw(lab, "#ff6a6a", lab.length > 6 ? 60 : 110), HOS[0] - 0.6, 2.5, 0.2, 1.0, 0.39);
    }
    if (id === S.record) {
      person("ve", VESNA(), GUI[0] + 0.9, 0, 0.2, { mode: "stand", expr: "smile", facing: 0, wave: 0.7 }, 1);
      if (f > W.recuerda - 6 && f < W.miedo - 4) fx("q", 256, 256, qDraw, GUI[0] + 0.9, 2.5, 0.3, 0.4, 0.4);
      if (f > W.guinness - 10) fx("doc", 512, 620, docDraw("GUINNESS", "10.160 m", "Caída sin paracaídas"), GUI[0] - 1.0, 1.6, -1.6, 1.0, 1.2);
      if (f > W.miedo - 4 && f < W.guinness - 10) card("plane1", GUI[0] - 1.5, -2.2, 1.2, planeDraw(0), 1, 0, 1.5);
    }
    if (id === S.cta) {
      person("ve", VESNA(), 0, 0, 0, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.4, 2.2, 1.1);
    }
  }
}
