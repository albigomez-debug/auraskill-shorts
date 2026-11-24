// Pimpín 15 · "Brillante": the plaza at night, Pimpín carries a point light; a wood beyond the plaza (z 9..20).
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api, lamC } from "./base";
import { TONE, CHAR } from "./shade";
import { ctaDraw } from "./props";
import { tree, flatGround } from "./props";
import { villazanca, PIMPIN, VEC, KIDV } from "./villa";
import { S, W, night, bulbs, smooth } from "./story";

export const PIMS = 1.1;
const glowDraw = (p: Pen) => { const g = p.g.createRadialGradient(128, 128, 10, 128, 128, 128); g.addColorStop(0, "rgba(255,240,150,0.9)"); g.addColorStop(0.4, "rgba(255,220,90,0.35)"); g.addColorStop(1, "rgba(255,200,60,0)"); p.g.fillStyle = g; p.g.fillRect(0, 0, 256, 256); };
const mosqDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 14; j++) { const x = 128 + Math.sin(j * 2.1 + k) * 100, y = 128 + Math.cos(j * 1.7 + k * 1.3) * 90; p.ell(x, y, 6, 5, "#1a1a1e", 0); p.line([[x - 10, y - 6], [x + 10, y - 6]], "#8a8a92", 2, false); } };
const boxDraw = (p: Pen) => { p.poly([[10, 20], [246, 20], [246, 300], [10, 300]], "#c89a5a", 7); p.line([[10, 60], [246, 60]], "#8a6a3a", 5, false); for (const [x, y] of [[70, 140], [180, 200], [120, 250]]) p.ell(x, y, 10, 10, "#fff6a0", 0); };
const filmDraw = (washed: boolean) => (p: Pen) => { p.poly([[0, 0], [512, 0], [512, 300], [0, 300]], washed ? "#fff8d8" : "#2a3a6a", 6); if (!washed) { p.ell(180, 160, 50, 50, "#f2c84a", 4); p.poly([[300, 260], [360, 120], [420, 260]], "#e2453c", 4); } };
const bulbDraw = (on: boolean) => (p: Pen) => { for (let k = 0; k < 8; k++) p.ell(32 + k * 64, 40 + Math.sin(k) * 8, 14, 18, on ? ["#ffd23f", "#ff5a5a", "#5ad8ff", "#7aff7a"][k % 4] : "#3a3a42", 3); };
const torchDraw = (p: Pen) => { p.poly([[20, 40], [200, 40], [200, 90], [20, 90]], "#3a3a42", 5); p.poly([[200, 30], [240, 20], [240, 110], [200, 100]], "#5a5a62", 5); };
const flameDraw = (p: Pen) => { p.poly([[50, 240], [40, 120], [64, 20], [88, 120], [78, 240]], "#ffb030", 4); };
const candleDraw = (p: Pen) => p.poly([[44, 0], [84, 0], [84, 200], [44, 200]], "#f4f1ea", 4);
const flyDraw = (p: Pen) => { p.ell(64, 64, 22, 22, "#e8ff60", 0); p.ell(64, 64, 50, 50, "rgba(230,255,100,0.3)", 0); };
const owlDraw = (p: Pen) => { p.ell(128, 150, 90, 100, "#8a6a4a", 7); p.ell(90, 120, 30, 30, "#ffffff", 4); p.ell(166, 120, 30, 30, "#ffffff", 4); p.ell(90, 124, 12, 12, "#1a1010", 0); p.ell(166, 124, 12, 12, "#1a1010", 0); p.line([[60, 84], [118, 104]], "#1a1010", 8, false); p.line([[196, 84], [138, 104]], "#1a1010", 8, false); p.poly([[118, 150], [138, 150], [128, 176]], "#f2a02a", 3); };

export class World extends Base {
  lamp = new THREE.PointLight("#ffe08a", 0, 9, 1.6);
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    flatGround(R, 40, 24, "#4a6a3a", 0, 22, 0.0);
    const tz = [[-6, 10], [-4, 11.5], [-1, 10.5], [1.5, 12], [-3, 13.5], [0, 15], [-6, 14], [3, 14.5], [-8, 12], [4, 11], [-2, 17], [2, 18]];
    for (const [x, z] of tz) tree(R, x, z, 1.4 + ((x * 7 + z) % 3) * 0.15, "#3a6a2a");
    R.add(this.lamp);
  }
  private pim(a: Api, x: number, y: number, z: number, opts: any, glow = 1) {
    a.person("pim", PIMPIN, x, y, z, { facing: 0, ...opts }, 1, y === 0, PIMS);
    a.fx("glow", 256, 256, glowDraw, x, y + 0.75, z - 0.05, 2.6 * glow, 2.6 * glow, true);
    this.lamp.position.set(x, y + 1.0, z + 0.4); this.lamp.intensity = 6 * glow;
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    this.lamp.intensity = 0;
    const nk = night(f, id); if (nk > 0) { this.sun.intensity *= 1 - 0.85 * nk; this.hemi.intensity *= 1 - 0.65 * nk; const dk = new THREE.Color("#10142e"); for (const u of ["c0", "c1", "c2", "c3", "c4"]) (this.skyMat.uniforms[u].value as THREE.Color).lerp(dk, 0.92 * nk);
      const k = (v: THREE.Vector3, r: number, g: number, b: number) => v.set(v.x * (1 - nk + nk * r), v.y * (1 - nk + nk * g), v.z * (1 - nk + nk * b));
      k(TONE.uLitCol.value, 0.22, 0.25, 0.42); k(TONE.uShadeCol.value, 0.2, 0.22, 0.4); k(TONE.uShadeLift.value, 0.3, 0.3, 0.5); k(CHAR.uCharTint.value, 0.5, 0.52, 0.7); }
    const dance = (j: number) => Math.abs(Math.sin(t * 6 + j)) * 0.12;
    if (id === S.hook || id === S.end || (id === S.back && f > W.fiesta - 10)) {
      const back = id === S.back;
      for (let j = 0; j < 8; j++) { const a0 = j * 0.785 + t * 0.4, r = 2.6; person(`v${j}`, VEC(j), Math.cos(a0) * r, dance(j), 1 + Math.sin(a0) * r * 0.7, { mode: "stand", expr: "laugh", facing: Math.sin(a0) > 0 ? -1 : 1, wave: 0.5 + Math.sin(t * 7 + j) * 0.4 }, 10 + j, true, 1.0); }
      if (!back) this.pim(a, 0, 0, 1, { mode: "stand", expr: "grin", wave: 0.9 });
      if (!back) fx("bulbs", 512, 80, bulbDraw(false), 0, 4.2, -1, 7, 1.1);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "neutral", facing: 0 }, 10 + j, true, 1.0);
      this.pim(a, 0.9, 0, 1.9, { mode: "stand", expr: "grin", wave: 0.6 });
    }
    if (id === S.mosq) {
      const x = -2 + (f - 152) * 0.04;
      this.pim(a, x, 0, 2.0, { mode: "march", phase: t * 2.5, expr: "nervous", facing: 1 });
      fx(`mq|${Math.floor(t * 8) % 4}`, 256, 256, mosqDraw(Math.floor(t * 8) % 4), x - 0.1, 1.3, 2.2, 1.6, 1.6);
    }
    if (id === S.box) {
      person("mom", VEC(1), 2.6, 0, 1.8, { mode: "stand", expr: "stern", facing: -1, wave: f < W.caja + 4 ? 0.8 : undefined }, 2, true, 1.0);
      const s = smooth((f - W.caja + 8) / 8);
      this.pim(a, 1.6, 0, 2.4, { mode: "stand", expr: "nervous" }, 1 - 0.8 * s);
      if (s > 0) fx("bx", 256, 320, boxDraw, 1.6, 0.6 + (1 - s) * 1.6, 2.55, 0.75, 1.15);
    }
    if (id === S.cine) {
      const washed = f > 335;
      fx(`film|${washed ? 1 : 0}`, 512, 300, filmDraw(washed), -2.2, 2.2, -5.0, 3.0, 1.75);
      for (let j = 0; j < 4; j++) person(`au${j}`, VEC(j), 0.6 + (j % 2) * 1.2, 0, -2.6 + Math.floor(j / 2) * 1.2 + (j % 2) * 0.3, { mode: "sit", expr: washed ? "pained" : "smile", facing: -1, wave: f > 360 && j % 2 ? 0.9 : undefined }, 10 + j, true, 1.0);
      this.pim(a, -0.4, 0, -2.2, { mode: "sit", expr: washed ? "nervous" : "grin", facing: -1 });
    }
    if (id === S.party) {
      const on = bulbs(f, id);
      fx(`bulbs|${on ? 1 : 0}`, 512, 80, bulbDraw(on), 0, 4.2, -1, 7, 1.1);
      for (let j = 0; j < 6; j++) person(`v${j}`, VEC(j), -3 + j * 1.2, on ? dance(j) : 0, 0.2 + (j % 2) * 0.8, { mode: "stand", expr: on ? "laugh" : "shock", facing: 0, wave: on ? 0.6 : 0.95 }, 10 + j, true, 1.0);
      if (f > W.ninos - 10) for (let k = 0; k < 3; k++) { const s = smooth((f - W.ninos + 10 - k * 3) / 30); person(`k${k}`, KIDV(k), -2 + k * 0.7 - s * 0.6, 0, 3 + s * 7, { mode: "march", phase: t * 3 + k, expr: "shock", facing: 0 }, 20 + k, true, 1.0); }
    }
    if (id === S.tries) {
      const pos = [[-3.6, 8.3], [-2.2, 8.1], [-0.8, 8.4]];
      pos.forEach(([x, z], j) => person(`s${j}`, VEC(j + 2), x, 0, z, { mode: "stand", expr: "nervous", facing: 0, wave: 0.7 }, 10 + j, true, 1.0));
      if (f < W.velas - 6) fx("torch", 256, 128, torchDraw, -3.2, 1.45, 8.4, 0.4, 0.2);
      if (f > W.velas - 6 && f < W.luci - 10) { fx("cand", 128, 200, candleDraw, -1.85, 1.45, 8.3, 0.08, 0.14); if (f < W.apagan) fx(`fl|${Math.floor(t * 10) % 2}`, 128, 256, flameDraw, -1.85 + (Math.floor(t * 10) % 2) * 0.005, 1.6, 8.3, 0.08, 0.15); }
      if (f > W.luci - 8) { const s = smooth((f - W.asusta) / 20); fx("fly", 128, 128, flyDraw, -1.6 + s * 1.5 + Math.sin(t * 6) * 0.1, 1.9 + s * 1.6, 8.5 + s * 4, 0.3, 0.3, true); }
    }
    if (id === S.forest) {
      const s = smooth((f - W.entra + 10) / 70), z = 7.0 + s * 6.2;
      this.pim(a, -2.4, 0, z, { mode: s < 1 ? "march" : "stand", phase: t * 2.5, expr: "smile" });
      if (f > W.iluminado - 30) for (let k = 0; k < 3; k++) person(`k${k}`, KIDV(k), -3.2 + k * 0.8, 0, 14.4 + (k % 2) * 0.3, { mode: "sit", expr: f > W.iluminado ? "relief_open" : "nervous", facing: 0 }, 20 + k, true, 1.0);
    }
    if (id === S.back) {
      const s = smooth((f - W.sale) / 70), z = 12.5 - s * 8;
      this.pim(a, -2.2, 0, z, { mode: s < 1 ? "march" : "stand", phase: t * 2.5, expr: f > W.buho ? "nervous" : "grin" });
      if (f > W.buho - 4) fx("owl", 256, 256, owlDraw, -2.2, 1.55, z + 0.1, 0.45, 0.45);
      for (let k = 0; k < 3; k++) person(`k${k}`, KIDV(k), -1.4 + k * 0.7, 0, z + 0.4 - k * 0.3, { mode: s < 1 ? "march" : "stand", phase: t * 2.5 + k, expr: "laugh", facing: 0 }, 20 + k, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
