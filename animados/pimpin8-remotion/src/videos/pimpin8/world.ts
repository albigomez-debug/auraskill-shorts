// Pimpín 8 · "Vozarrón": the plaza, and the foggy hill at M (kids lost in the fog).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { ctaDraw, bubbleDraw, noteDraw, signDraw, smokeDraw, tree } from "./props";
import { pigeonDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, KIDV, ESTIRADO } from "./villa";
import { S, W, M, smooth } from "./story";

export const PIMS = 1.1;
const crackDraw = (p: Pen) => { p.g.strokeStyle = "#1a1a22"; p.g.lineWidth = 14; for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI * 2 + 0.3; p.g.beginPath(); p.g.moveTo(128, 200); p.g.lineTo(128 + Math.cos(a) * 60, 200 + Math.sin(a) * 90); p.g.lineTo(128 + Math.cos(a + 0.2) * 130, 200 + Math.sin(a + 0.2) * 200); p.g.stroke(); } };
const ringDraw = (p: Pen) => { p.g.strokeStyle = "rgba(255,255,255,0.9)"; p.g.lineWidth = 14; p.g.beginPath(); p.g.arc(256, 256, 220, 0, Math.PI * 2); p.g.stroke(); };
const leafDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 14; j++) { const x = (j * 71 + k * 13) % 512, y = (j * 43 + k * 37) % 512; p.ell(x, y, 16, 9, j % 2 ? "#6aa83a" : "#c8a02a", 3); } };
const sheepDraw = (p: Pen) => { for (const [x, y] of [[90, 120], [140, 100], [190, 120], [110, 160], [170, 160]]) p.ell(x, y, 50, 40, "#f4f4f0", 6); p.ell(240, 110, 28, 34, "#2a2a2a", 5); p.ell(250, 102, 5, 5, "#ffffff", 0); for (const x of [90, 120, 160, 190]) p.poly([[x, 190], [x + 12, 190], [x + 12, 240], [x, 240]], "#2a2a2a", 3); };
const torchDraw = (p: Pen) => p.poly([[0, 128], [512, 20], [512, 236]], "rgba(255,240,150,0.55)", 0);
const bellDraw = (p: Pen) => { p.poly([[80, 60], [176, 60], [210, 200], [46, 200]], "#e8b83a", 7); p.ell(128, 214, 18, 18, "#a87a2a", 4); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const [mx, , mz] = M;
    box(R, 50, 0.1, 40, lamC("#6a9a4a"), mx, -0.04, mz);
    const hill = new THREE.Mesh(new THREE.SphereGeometry(18, 16, 10), lamC("#5a8a3a")); hill.position.set(mx, -12, mz - 14); R.add(hill);
    for (let k = 0; k < 10; k++) tree(R, mx - 12 + (k % 5) * 6 + (k > 4 ? 3 : 0), mz - 4 - (k > 4 ? 6 : 0), 1.4, "#3a7a3a");
    box(R, 1.4, 0.1, 1.4, lamC("#e8f0f4"), -6, 0.05, 2); box(R, 0.06, 2.6, 0.06, lamC("#2a2a30"), -6.6, 1.3, 1.4); box(R, 0.7, 0.06, 0.06, lamC("#2a2a30"), -6.3, 2.6, 1.4);
    box(R, 0.6, 0.4, 0.6, lamC("#a8743a"), 3.6, 0.2, -7.2);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const ph = Math.floor(t * 8) % 4;
    const rings = (key: string, x: number, y: number, z: number, f0: number, big = 1) => { for (let k = 0; k < 3; k++) { const u = ((f - f0) / 18 + k / 3) % 1; if (f < f0) return; fx(`${key}r${k}`, 512, 512, ringDraw, x, y, z + 0.1, (0.4 + u * 3.5) * big, (0.4 + u * 3.5) * big, true); } };
    if (id === S.hook || id === S.end) {
      person("pim", PIMPIN, 0, 0, 1.2, { mode: "stand", expr: f > W.hola - 10 && f < W.hola + 40 || id === S.end ? "shout" : "smile", facing: 0, wave: 0.95 }, 1, true, PIMS);
      if (f > W.hola - 4 && f < W.hola + 50 || id === S.end) rings("h", 0, 1.7, 1.2, W.hola - 4);
      for (let j = 0; j < 6; j++) person(`v${j}`, VEC(j), (j % 2 ? 1 : -1) * (1.6 + Math.floor(j / 2) * 1.1), 0, 0.2 - (j % 3) * 0.5, { mode: "stand", expr: f > W.roto - 6 || id === S.end ? "shock" : "smile", facing: 0, wave: f > W.roto - 6 || id === S.end ? 0.9 : undefined }, 10 + j, true, 1.0);
      if (f > W.roto - 2 || id === S.end) for (let h = 0; h < 6; h++) for (const dx of [-1.5, 1.5]) fx(`cr${h}${dx}`, 256, 512, crackDraw, -15 + h * 6 + dx, 4.6, -7.95, 1.1, 1.8);
    }
    if (id === S.whisper) {
      for (let j = 0; j < 3; j++) { const x = -3 + j * 3; person(`a${j}`, VEC(j), x - 0.45, 0, 1.6, { mode: "stand", expr: "whistle", facing: 1 }, 10 + j, true, 1.0); person(`b${j}`, VEC(j + 3), x + 0.45, 0, 1.6, { mode: "stand", expr: "smile", facing: -1 }, 20 + j, true, 1.0); fx(`ps${j}`, 512, 256, bubbleDraw("psss..."), x, 2.4, 1.6, 0.8, 0.4); }
    }
    if (id === S.ja) {
      for (let j = 0; j < 6; j++) person(`v${j}`, VEC(j), -3 + j * 1.2 + (j > 2 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "laugh", facing: 0, wave: 0.5 + Math.sin(t * 7 + j) * 0.4 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.6, 0, 2.8, { mode: "stand", expr: "nervous", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.voz) { person("pim", PIMPIN, 0, 0, 2.6, { mode: "stand", expr: "shout", facing: 0 }, 1, true, PIMS); rings("v", 0, 1.6, 2.6, 190); }
    if (id === S.leaves) {
      person("pim", PIMPIN, -9.6, 0, -3.2, { mode: "stand", expr: "whistle", facing: -1 }, 1, true, PIMS);
      fx("pss", 512, 256, bubbleDraw("pss..."), -9.9, 2.3, -3.0, 0.7, 0.35);
      if (f > W.caen - 8) { const u = smooth((f - W.caen + 8) / 40); fx(`lv|${ph}`, 512, 512, leafDraw(ph), -11, 4.5 - u * 3.6, -4.4, 4, 4, true); }
    }
    if (id === S.shower) {
      person("pim", PIMPIN, -6, 0, 2.0, { mode: "stand", expr: "shout", facing: 0 }, 1, true, PIMS);
      for (let k = 0; k < 3; k++) fx(`n${k}`, 256, 256, noteDraw(k), -6.6 + k * 0.6, 2.4 + Math.sin(t * 5 + k) * 0.2, 2.2, 0.4, 0.4);
      rings("s", -6, 1.6, 2.0, 296);
    }
    if (id === S.yawn) {
      person("pim", PIMPIN, 0, 0, 2.6, { mode: "stand", expr: f > W.bosteza - 6 ? "shout" : "smile", facing: 0, wave: f > W.bosteza - 6 ? 0.9 : undefined }, 1, true, PIMS);
      for (let k = 0; k < 4; k++) { const fly = smooth((f - W.bosteza - k * 3) / 20); card(`pg${k}`, -1.2 + k * 0.8 + fly * (k - 1.5) * 2, 2.2 + (k % 2) * 0.3, 0.3, pigeonDraw(fly > 0 ? (t * 4) % 1 : 0), k % 2 ? 1 : -1, 0, 2.2 + fly * 3); }
    }
    if (id === S.library) {
      fx("lib", 1024, 512, signDraw(["BIBLIOTECA"], "#f2e2b8", "#2a4a8a"), 3, 4.4, -7.85, 2.4, 1.2);
      person("pim", PIMPIN, 3.6, 0.25, -6.9, { mode: "sit", expr: "nervous", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.fog || id === S.lost) {
      const [mx, , mz] = M;
      for (let j = 0; j < 4; j++) person(`k${j}`, KIDV(j), mx - 2.4 + j * 1.5, 0, mz + 2 + (j % 2) * 0.8, { mode: "stroll", phase: t + j, expr: "nervous", facing: j % 2 ? 1 : -1, wave: id === S.lost && f > W.silbatos - 4 && j === 1 ? 0.9 : undefined }, 10 + j, true, 0.8);
      person("prof", ESTIRADO, mx + 2.6, 0, mz + 1.6, { mode: "stand", expr: "nervous", facing: -1 }, 20, true, 1.0);
      if (id === S.lost && f > W.linternas - 4 && f < W.silbatos) fx("torch", 512, 256, torchDraw, mx - 1.0, 1.0, mz + 2.2, 2.2, 1.0, true);
      if (id === S.lost && f > W.campanas - 4 && f < W.nada) fx(`bell|${ph % 2}`, 256, 256, bellDraw, mx + 1.6 + (ph % 2 ? 0.05 : -0.05), 1.3, mz + 2.2, 0.4, 0.4);
      const k = id === S.fog ? smooth((f - W.niebla + 6) / 30) : 1;
      for (let j = 0; j < 8; j++) for (const dz of [-1.5, -4.5]) fx(`fg${j}|${(ph + j) % 4}|${dz}`, 256, 256, smokeDraw((ph + j) % 4), mx - 7 + j * 2, 1.0 + (j % 3) * 0.7, mz + dz, 4.0 * k + 0.01, 3.2 * k + 0.01, true); for (let j = 0; j < 6; j++) fx(`lo${j}|${(ph + j) % 4}`, 256, 256, smokeDraw((ph + j) % 4), M[0] - 5 + j * 2, 0.2, M[2] + 3.4, 2.2 * k + 0.01, 0.9 * k + 0.01, true);
    }
    if (id === S.shout) {
      const inflate = smooth((f - W.coge + 4) / 18) * (f < W.grita ? 1 : 0);
      person("pim", PIMPIN, 0, 0, 1.6, { mode: "stand", expr: f > W.grita - 4 ? "shout" : inflate > 0 ? "relief_open" : "stern", facing: 0, wave: f > W.grita - 4 ? 0.95 : undefined }, 1, true, PIMS * (1 + inflate * 0.12));
      if (f > W.grita - 4) rings("g", 0, 1.7, 1.6, W.grita - 4, 1.6);
    }
    if (id === S.back) {
      const run = smooth((f - 858) / 40);
      person("pim", PIMPIN, 0, 0, 1.6, { mode: "stand", expr: "laugh", facing: 0, wave: 0.9 }, 1, true, PIMS);
      for (let j = 0; j < 4; j++) person(`k${j}`, KIDV(j), -6 + run * 4 + j * 1.2, 0, 0.6 + (j % 2) * 0.6, { mode: run < 1 ? "march" : "stand", phase: t * 3 + j, expr: "laugh", facing: run < 1 ? 1 : 0, wave: 0.8 }, 10 + j, true, 0.8);
      if (f > W.profe - 8) person("prof", ESTIRADO, -3.6, 0, -0.6, { mode: "stand", expr: "relief", facing: 1 }, 20, true, 1.0);
      if (f > W.ovejas - 14) { const s = smooth((f - W.ovejas + 14) / 24); for (let k = 0; k < 4; k++) fx(`sh${k}`, 256, 256, sheepDraw, 6 - s * 3.6 + k * 0.9, 0.5, 0.2 + (k % 2) * 0.7, 0.9, 0.9); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
    void SKINS; void ({} as Outfit);
  }
}
