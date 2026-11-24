// Pimpín 17 · "Pesado": plaza; bench that becomes a hole, seesaw, scale, a gale that blows everyone away but him.
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { ctaDraw } from "./props";
import { chickenDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, ALCALDESA, HOGAZA } from "./villa";
import { S, W, windy, smooth } from "./story";

export const PIMS = 1.1;
const benchDraw = (p: Pen) => { p.poly([[20, 120], [492, 120], [492, 160], [20, 160]], "#a8603a", 6); p.poly([[20, 60], [492, 60], [492, 100], [20, 100]], "#a8603a", 6); for (const x of [60, 450]) p.poly([[x, 160], [x + 20, 160], [x + 20, 250], [x, 250]], "#5a3a2a", 5); };
const holeDraw = (p: Pen) => { p.ell(256, 128, 240, 90, "#1a1210", 6); for (let k = 0; k < 6; k++) p.line([[256 + Math.cos(k) * 240, 128 + Math.sin(k) * 90], [256 + Math.cos(k) * 300, 128 + Math.sin(k) * 120]], "#3a2a20", 6, false); };
const crackDraw = (p: Pen) => { for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI * 2; p.line([[256, 128], [256 + Math.cos(a) * 120, 128 + Math.sin(a) * 50], [256 + Math.cos(a + 0.3) * 230, 128 + Math.sin(a + 0.3) * 100]], "#3a2a20", 7, false); } };
const ropeArc = (ph: number) => (p: Pen) => { p.g.strokeStyle = "#e2453c"; p.g.lineWidth = 10; p.g.beginPath(); p.g.moveTo(10, 60); p.g.quadraticCurveTo(256, 60 + Math.cos(ph) * 380, 502, 60); p.g.stroke(); };
const scaleDraw = (broken: boolean) => (p: Pen) => { p.poly([[30, 160], [226, 160], [236, 240], [20, 240]], "#e8e8ec", 6); p.ell(128, 110, 70, 50, "#f4f1ea", 5); p.line([[128, 120], broken ? [190, 60] : [128, 72]], "#e2453c", 6, false); if (broken) for (let k = 0; k < 3; k++) p.line([[60 + k * 60, 160], [70 + k * 60, 120], [50 + k * 60, 90]], "#8a8a92", 6, false); };
const windDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 9; j++) { const y = (j * 57 + k * 31) % 480 + 16, x = (j * 97 + k * 140) % 400; p.line([[x, y], [x + 110, y - 4]], "rgba(255,255,255,0.9)", 6, false); } };
const tileDraw = (p: Pen) => p.poly([[10, 20], [118, 4], [110, 60], [4, 70]], "#a8402a", 5);
const postDraw = (p: Pen) => { p.poly([[56, 40], [72, 40], [72, 500], [56, 500]], "#2a2a32", 4); p.poly([[34, 10], [94, 10], [84, 50], [44, 50]], "#3a3a42", 5); p.ell(64, 36, 14, 12, "#ffe08a", 0); };
const treeDraw = (p: Pen) => { p.poly([[112, 300], [144, 300], [144, 500], [112, 500]], "#6a4a2a", 5); p.ell(128, 190, 110, 130, "#5a9a3a", 7); };

export class World extends Base {
  seesaw = new THREE.Group(); plank: THREE.Mesh;
  constructor() {
    super();
    villazanca(this.root);
    box(this.seesaw, 0.3, 0.5, 0.3, lamC("#5a3a2a"), 0, 0.25, 0);
    this.plank = box(this.seesaw, 4.0, 0.12, 0.35, lamC("#c84a3a"), 0, 0.55, 0);
    this.seesaw.position.set(0.5, 0, 1.4); this.root.add(this.seesaw);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    this.seesaw.visible = id === S.seesaw;
    const wk = Math.floor(t * 10) % 4;
    if (windy(f, id)) fx(`wind|${wk}`, 512, 512, windDraw(wk), 0, 2.2, 2.5, 9, 6, true);
    if (id === S.hook || id === S.end) {
      const s0 = id === S.hook ? W.sienta : 1036, sat = f > s0 - 6, hole = f > s0 + 24;
      if (!hole) fx("bench", 512, 256, benchDraw, 0.5, 0.55, 2.0, 2.0, 1.0); else fx("hole", 512, 256, holeDraw, 0.5, 0.03, 1.9, 1.9, 0.55);
      person("pim", PIMPIN, 0.5, hole ? -0.12 : sat ? 0.35 : 0, 2.05, { mode: sat ? "sit" : "march", phase: t * 2.5, expr: hole ? "dazed" : "smile", facing: 0 }, 1, !sat, PIMS);
      person("b0", VEC(3), 2.2, 0, 1.4, { mode: "stand", expr: hole ? "shock" : "smile", facing: -1 }, 10, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "smile", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.9, -0.05, 1.9, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      if (f > 140) fx("cr", 512, 256, crackDraw, 0.9, 0.03, 2.0, 2.2 * smooth((f - 140) / 6), 1.0);
    }
    if (id === S.rope) {
      const hop = f > W.comba - 6 && f < W.alarma ? Math.sin(Math.PI * (f - W.comba + 6) / (W.alarma - W.comba + 6)) * 0.4 : 0;
      for (const [k, x] of [[0, -1.6], [1, 2.6]] as [number, number][]) person(`r${k}`, VEC(k + 1), x, f > W.alarma ? Math.abs(Math.sin(t * 30)) * 0.1 : 0, 1.4, { mode: "stand", expr: f > W.alarma ? "shock" : "laugh", facing: k ? -1 : 1, wave: 0.6 }, 10 + k, true, 1.0);
      fx(`rope|${Math.floor(t * 8) % 8}`, 512, 512, ropeArc(t * 8 * 0.785), 0.5, 1.4, 1.5, 3.8, 1.8);
      person("pim", PIMPIN, 0.5, hop, 1.6, { mode: "stand", expr: f > W.alarma ? "nervous" : "grin", facing: 0 }, 1, hop < 0.02, PIMS);
      if (f > W.alarma) fx("cr", 512, 256, crackDraw, 0.5, 0.03, 1.7, 2.6, 1.2);
    }
    if (id === S.seesaw) {
      const s = smooth((f - 290) / 8), fly = smooth((f - W.volando + 10) / 30);
      this.plank.rotation.z = 0.25 * (1 - 2 * s);
      person("pim", PIMPIN, -1.1, 0.6 - s * 0.45, 1.4, { mode: "sit", expr: "smile", facing: 1 }, 1, false, PIMS);
      person("v", VEC(2), 2.1 + fly * 1.0, 0.45 + s * 0.45 + fly * 6, 1.4, { mode: fly > 0.05 ? "stand" : "sit", expr: fly > 0.05 ? "shock" : "grin", facing: -1, wave: fly > 0.05 ? 0.95 : undefined, tilt: fly * 2 }, 2, false, 1.0);
    }
    if (id === S.scale) {
      const broken = f > W.bascula + 12;
      fx(`sc|${broken ? 1 : 0}`, 256, 256, scaleDraw(broken), 2.0, 0.22, 2.0, 0.75, 0.75);
      person("pim", PIMPIN, 2.0, broken ? 0.05 : 0.3, 2.1, { mode: "stand", expr: broken ? "nervous" : "smile", facing: 0 }, 1, false, PIMS);
      person("doc", VEC(3), 3.2, 0, 1.6, { mode: "stand", expr: broken ? "shock" : "stern", facing: -1 }, 2, true, 1.0);
    }
    if (id === S.wind) {
      for (let k = 0; k < 6; k++) if (f > W.tejas - 10 + k * 3) { const s = (f - W.tejas + 10 - k * 3) * 0.12; fx(`tl${k}`, 128, 80, tileDraw, -6 + s + (k % 3), 5 + (k % 2) - s * 0.15 + Math.sin(t * 9 + k) * 0.2, -2 + k, 0.5, 0.3); }
      for (let k = 0; k < 2; k++) if (f > W.gallinas - 10) { const s = (f - W.gallinas + 10) * 0.08; card(`ch${k}`, -4 + s + k * 1.5, 0.5 + k, 0.36, chickenDraw(t * 9 + k, false, "#fbf7ee", "wide"), 1, 0, 1.0 + s * 0.2 + k * 0.4); }
      for (let j = 0; j < 4; j++) { const fl = f > W.vecinos - 6 + j * 4 ? (f - W.vecinos + 6 - j * 4) * 0.06 : 0; person(`v${j}`, VEC(j), -3 + j * 1.8 + fl, fl * 0.7, 0.6 + (j % 2), { mode: "stand", expr: fl > 0 ? "shock" : "nervous", facing: 1, tilt: fl > 0 ? Math.min(1.2, fl) : 0.15, wave: 0.95 }, 10 + j, fl === 0, 1.0); }
    }
    if (id === S.tries) {
      const pf = f > W.vfarola ? (f - W.vfarola) * 0.12 : 0;
      fx("post", 128, 512, postDraw, -2.6 + pf, 1.6 + pf * 0.6, 0.8, 0.5, 3.2);
      person("p1", VEC(1), -2.3 + pf, 0.2 + pf * 0.6, 0.9, { mode: "stand", expr: pf > 0 ? "shock" : "nervous", facing: -1, tilt: 0.8, wave: 0.95 }, 10, false, 1.0);
      if (f > W.arbol - 30) { const tf = f > W.varbol ? (f - W.varbol) * 0.12 : 0; fx("tree", 256, 512, treeDraw, 0.4 + tf, 1.8 + tf * 0.6, 0.6, 1.6, 3.2); person("p2", VEC(4), 0.8 + tf, 0.3 + tf * 0.6, 0.8, { mode: "stand", expr: tf > 0 ? "shock" : "nervous", facing: -1, tilt: 0.8, wave: 0.95 }, 11, false, 1.0); }
      if (f > W.panadero - 30) { const d = f > W.vdos ? (f - W.vdos) * 0.08 : 0; person("bak", HOGAZA, 1.6 + d, d * 0.6, 0.8, { mode: "stand", expr: d > 0 ? "shock" : "nervous", facing: -1, tilt: d > 0 ? 1.0 : 0.3 }, 12, d === 0, 1.0); person("alc", ALCALDESA, 2.5 + d, 0.3 + d * 0.6, 0.9, { mode: "stand", expr: "shock", facing: -1, tilt: 1.1, wave: 0.95 }, 13, false, 1.0); }
    }
    if (id === S.stand) person("pim", PIMPIN, 0.2, 0, 1.2, { mode: "stand", expr: f > 806 ? "grin" : "neutral", facing: 0 }, 1, true, PIMS);
    if (id === S.flag) {
      const calm = f > W.viento;
      person("pim", PIMPIN, 0.2, 0, 1.2, { mode: "stand", expr: calm ? "grin" : "smile", facing: 0, wave: calm ? 0.9 : 0.6 }, 1, true, PIMS);
      const n = Math.min(6, Math.max(0, Math.floor((f - W.agarra + 20) / 5)));
      for (let j = 0; j < n; j++) {
        const x = 0.9 + j * 1.0, wv = Math.sin(t * 9 - j) * 0.25;
        if (!calm) person(`f${j}`, j === 2 ? ALCALDESA : j === 4 ? HOGAZA : VEC(j), x, 1.0 + j * 0.15 + wv, 1.2 + j * 0.05, { mode: "fall", expr: "shock", facing: -1, tilt: 1.57, wave: 0.95 }, 10 + j, false, 1.0);
        else person(`f${j}`, j === 2 ? ALCALDESA : j === 4 ? HOGAZA : VEC(j), x, 0, 1.4 + (j % 2) * 0.5, { mode: "sit", expr: "dazed", facing: -1 }, 10 + j, true, 1.0);
      }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
