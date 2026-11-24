// Pimpín 14 · "Comilón": plaza, a bench he eats, table, birthday cake, restaurant sign, a 3 m pumpkin (mesh) that rolls in.
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { ctaDraw, signDraw, carDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, HOGAZA } from "./villa";
import { S, W, pump, smooth } from "./story";

export const PIMS = 1.1;
const benchDraw = (bites: number) => (p: Pen) => { p.poly([[20, 120], [492, 120], [492, 160], [20, 160]], "#a8603a", 6); p.poly([[20, 60], [492, 60], [492, 100], [20, 100]], "#a8603a", 6); for (const x of [60, 450]) p.poly([[x, 160], [x + 20, 160], [x + 20, 250], [x, 250]], "#5a3a2a", 5); for (let k = 0; k < bites; k++) p.ell(492 - k * 70, 110, 46, 60, "#c8b896", 0); };
const breadDraw = (p: Pen) => p.ell(128, 64, 120, 30, "#d8a060", 6);
const cakeDraw = (candles: boolean) => (p: Pen) => { p.poly([[30, 120], [226, 120], [226, 230], [30, 230]], "#f4b8d0", 6); p.poly([[30, 110], [226, 110], [226, 140], [30, 140]], "#ffffff", 4); if (candles) for (let k = 0; k < 5; k++) { p.poly([[50 + k * 38, 60], [62 + k * 38, 60], [62 + k * 38, 112], [50 + k * 38, 112]], "#7ab0e8", 3); p.ell(56 + k * 38, 48, 8, 14, "#ffb030", 0); } };
const posterDraw = (p: Pen) => { p.poly([[10, 10], [246, 10], [246, 300], [10, 300]], "#f4f1ea", 6); p.ell(128, 140, 60, 60, "#f4d4b0", 5); p.ell(128, 100, 64, 34, "#e2453c", 5); p.g.strokeStyle = "#d8202a"; p.g.lineWidth = 18; p.g.beginPath(); p.g.arc(128, 140, 100, 0, Math.PI * 2); p.g.stroke(); p.g.beginPath(); p.g.moveTo(58, 70); p.g.lineTo(198, 210); p.g.stroke(); };
const smokeDraw = (p: Pen) => { for (let j = 0; j < 3; j++) p.ell(60 + j * 60, 64 - j * 10, 34, 28, "rgba(120,120,130,0.8)", 0); };
const crumbDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 10; j++) p.ell((j * 53 + k * 29) % 236 + 10, (j * 31 + k * 17) % 236 + 10, 8, 6, "#a8603a", 0); };
const bellyDraw = (p: Pen) => p.ell(128, 128, 110, 100, "#f0a02c", 7);

export class World extends Base {
  pk = new THREE.Group(); table = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const body = new THREE.Mesh(new THREE.SphereGeometry(1.5, 24, 16), lamC("#f08a2a")); body.scale.set(1.15, 0.85, 1.15); this.pk.add(body);
    for (let k = 0; k < 8; k++) { const r = new THREE.Mesh(new THREE.TorusGeometry(1.48, 0.06, 6, 24), lamC("#c86a1a")); r.rotation.y = (k / 8) * Math.PI; r.scale.set(1.15, 0.85, 1); this.pk.add(r); }
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 0.6, 8), lamC("#4a7a2a")); stem.position.y = 1.4; this.pk.add(stem);
    R.add(this.pk);
    box(this.table, 1.8, 0.1, 0.9, lamC("#a8603a"), 0.6, 0.75, 1.6); for (const [dx, dz] of [[-0.8, -0.35], [0.8, -0.35], [-0.8, 0.35], [0.8, 0.35]]) box(this.table, 0.08, 0.75, 0.08, lamC("#5a3a2a"), 0.6 + dx, 0.37, 1.6 + dz);
    R.add(this.table);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const [px, sz] = pump(f, id); this.pk.visible = sz > 0.01; this.pk.scale.setScalar(Math.max(0.01, sz)); this.pk.position.set(px, 1.28 * sz, 0); this.pk.rotation.z = id === S.pumpkin || id === S.tries ? px * 0.6 : 0;
    this.table.visible = id === S.table && f < W.mesa + 4;
    const chew = Math.sin(t * 16) > 0;
    if (id === S.hook || id === S.end) {
      const b0 = id === S.hook ? W.bite : 1026, bites = Math.min(6, Math.max(0, Math.floor((f - b0) / 7)));
      fx(`bench|${bites}`, 512, 256, benchDraw(bites), 1.0, 0.55, 1.6, 2.0, 1.0);
      person("pim", PIMPIN, 0.35, 0, 1.9, { mode: "stand", expr: chew ? "grin" : "laugh", facing: 1 }, 1, true, PIMS);
      if (f > b0) fx(`cr|${Math.floor(t * 6) % 3}`, 256, 256, crumbDraw(Math.floor(t * 6) % 3), 0.5, 0.9, 2.1, 0.6, 0.6);
      for (let j = 0; j < 2; j++) person(`b${j}`, VEC(j + 2), 2.4 + j * 1.0, 0, 0.6, { mode: "stand", expr: f > (id === S.hook ? W.sido : 1070) ? "shock" : "stern", facing: -1 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "smile", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.9, 0, 1.9, { mode: "stand", expr: chew ? "grin" : "laugh", facing: 0, wave: 0.9 }, 1, true, PIMS);
      for (let k = 0; k < Math.min(10, Math.floor((f - 100) / 5)); k++) fx(`pl${k}`, 256, 64, (p: Pen) => p.ell(128, 32, 120, 26, "#f4f1ea", 5), 1.25, 1.45 + k * 0.09, 2.0, 0.5, 0.12);
    }
    if (id === S.table) {
      person("pim", PIMPIN, 0.6, 0, 2.3, { mode: "stand", expr: chew ? "grin" : "laugh", facing: 0 }, 1, true, PIMS);
      if (f < W.pan + 10) fx("brd", 256, 128, breadDraw, 0.3, 0.88, 1.7, 0.7, 0.35); if (f > W.pan - 12 && f < W.tarta + 6) fx("brd2", 256, 128, breadDraw, 0.9, 0.88, 1.7, 0.7, 0.35);
      if (f < W.tarta + 8) fx("ck", 256, 256, cakeDraw(false), 1.1, 1.0, 1.4, 0.5, 0.5);
      if (f > W.mesa + 4) fx(`cr|${Math.floor(t * 6) % 3}`, 256, 256, crumbDraw(Math.floor(t * 6) % 3), 0.6, 0.5, 2.4, 1.2, 1.0);
    }
    if (id === S.bday) {
      const ate = f > W.velas + 4;
      fx(`bc|${ate ? 0 : 1}`, 256, 256, cakeDraw(!ate), -2.6, 0.9, 1.9, 0.7, 0.7);
      person("kid", KIDV(1), -2.0, 0, 1.8, { mode: "stand", expr: ate ? "shock" : "laugh", facing: -1, wave: ate ? 0.9 : 0.5 }, 2, true, 1.0);
      person("pim", PIMPIN, -3.15, 0, 1.9, { mode: "stand", expr: ate ? "grin" : "smile", facing: 1 }, 1, true, PIMS);
      if (f > W.velas + 6 && f < W.velas + 40) fx("smk", 256, 128, smokeDraw, -2.85, 1.55 + (f - W.velas) * 0.01, 2.1, 0.6, 0.3);
    }
    if (id === S.resto) {
      fx("rest", 1024, 512, signDraw(["RESTAURANTE"], "#f2e2b8", "#2a4a8a"), -3, 4.4, -7.9, 2.6, 1.3);
      fx("post", 256, 320, posterDraw, -4.2, 1.9, -7.9, 0.9, 1.1);
      person("own", VEC(4), -3, 0, -6.8, { mode: "stand", expr: "nervous", facing: 0, wave: 0.95 }, 2, true, 1.0);
      person("pim", PIMPIN, -2.0, 0, -5.4, { mode: "stand", expr: "grin", facing: -1 }, 1, true, PIMS);
    }
    if (id === S.pumpkin) for (let j = 0; j < 4; j++) person(`v${j}`, VEC(j), -1.6 + j * 1.2, 0, 2.4 + (j % 2) * 0.6, { mode: f > 520 ? "march" : "stand", phase: t * 3 + j, expr: "shock", facing: f > 520 ? -1 : 1 }, 10 + j, true, 1.0);
    if (id === S.tries) {
      const ps = f > W.empujan - 14 && f < W.tractor - 6;
      for (let j = 0; j < 3; j++) person(`v${j}`, VEC(j), px - 2.2 - (ps ? 0 : 1.4) - j * 0.2, 0, -0.6 + j * 0.7, { mode: ps ? "march" : "stand", phase: t * 4 + j, expr: ps ? "pained" : "nervous", facing: 1, tilt: ps ? 0.25 : 0 }, 10 + j, true, 1.0);
      if (f > W.tractor - 8 && f < W.panadero - 4) card("trac", px - 3.4, 1.2, 1.0, carDraw(t * 2, "#3a8a3a"), 1, 0);
      const up = f > W.encima - 20;
      if (f > W.panadero - 8) person("bak", HOGAZA, up ? px : px - 1.9, up ? 2.5 : 0, up ? 0 : 1.0, { mode: "stand", expr: up ? "shock" : "stern", facing: 1, wave: up ? 0.95 : undefined }, 3, !up, 1.0);
    }
    if (id === S.eat) {
      const open = f > W.boca - 4;
      person("pim", PIMPIN, -0.6, 0, 1.0, { mode: "stand", expr: open ? (chew ? "shock" : "grin") : "smile", facing: 1 }, 1, true, PIMS);
      if (f > W.nam1) fx(`cr|${Math.floor(t * 6) % 3}`, 256, 256, crumbDraw(Math.floor(t * 6) % 3), 0.0, 1.1, 1.0, 0.9, 0.9);
    }
    if (id === S.after) {
      person("pim", PIMPIN, -0.4, 0, 0.6, { mode: "stand", expr: f > W.postre - 10 ? "grin" : "relief", facing: 0, wave: f > W.postre - 10 ? 0.9 : undefined }, 1, true, PIMS);
      fx("bel", 256, 256, bellyDraw, -0.4, 0.72, 0.85, 0.62 + Math.sin(t * 3) * 0.02, 0.56);
      for (let j = 0; j < 3; j++) person(`c${j}`, VEC(j), -2.4 + j * 2.0 + (j > 0 ? 0.8 : 0), 0, -0.6, { mode: "stand", expr: "laugh", facing: j ? -1 : 1, wave: 0.8 }, 10 + j, true, 1.0);
      person("bak", HOGAZA, 1.6, 0, 0.0, { mode: "sit", expr: "dazed", facing: -1 }, 3, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
