// Pimpín 11 · "Hipo": plaza with a bell tower at TW (belfry ~12–14.5 m, spire to 17 m), a bell porch in front of it, the well at (5, -3).
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { ctaDraw, bubbleDraw } from "./props";
import { catDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, TW, TOP, CAT, hop, climbY, floatAt, smooth } from "./story";

export const PIMS = 1.1;
const balloonDraw = (p: Pen) => { p.ell(128, 140, 112, 128, "#e2453c", 8); p.ell(90, 90, 26, 36, "#ff9a8a", 0); p.poly([[112, 268], [144, 268], [128, 300]], "#b8302a", 5); p.g.fillStyle = "#fff"; p.g.font = "bold 46px Arial"; p.g.textAlign = "center"; p.g.fillText("FIESTA", 128, 160); };
const ropeDraw = (p: Pen) => { p.g.fillStyle = "#6a4a2a"; p.g.fillRect(10, 0, 12, 512); };
const bellDraw = (p: Pen) => { p.poly([[100, 30], [156, 30], [170, 80], [190, 180], [236, 220], [20, 220], [66, 180], [86, 80]], "#c89a3a", 8); p.ell(128, 228, 18, 18, "#8a6a2a", 5); };
const stoneDraw = (k: number) => (p: Pen) => p.ell(64, 64, 52 - k * 4, 44, ["#8a8a92", "#9a948a", "#7a7a82"][k % 3], 5);
const glassDraw = (p: Pen) => { p.poly([[30, 20], [98, 20], [90, 120], [38, 120]], "#d8f0ff", 5); p.poly([[34, 60], [94, 60], [90, 118], [38, 118]], "#6ab8e8", 0); };
const ringDraw = (p: Pen) => { p.g.strokeStyle = "#ffd23f"; p.g.lineWidth = 14; for (const r of [60, 100]) { p.g.beginPath(); p.g.arc(128, 128, r, 0, Math.PI * 2); p.g.stroke(); } };

export class World extends Base {
  ladder = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const [tx, , tz] = TW, stone = lamC("#d8c8a8"), dark = lamC("#4a2e1e"), roof = lamC("#8a3a2a");
    box(R, 3.2, 12, 3.2, stone, tx, 6, tz);
    box(R, 1.2, 2.4, 0.06, dark, tx, 1.2, tz + 1.63);
    for (const [dx, dz] of [[-1.4, -1.4], [1.4, -1.4], [-1.4, 1.4], [1.4, 1.4]]) box(R, 0.4, 2.5, 0.4, stone, tx + dx, 13.25, tz + dz);
    box(R, 3.4, 0.3, 3.4, stone, tx, 14.6, tz);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(2.4, 2.6, 4), roof); cone.position.set(tx, 16.05, tz); cone.rotation.y = Math.PI / 4; R.add(cone);
    cyl(R, 0.05, 0.05, 1.0, lamC("#3a3a3e"), tx, 17.6, tz, 6);
    const bigBell = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.1, 12, 1, true), lamC("#c89a3a")); bigBell.position.set(tx, 13.3, tz); R.add(bigBell);
    // bell porch in front of the tower
    const wood = lamC("#6a4a2a");
    for (const dx of [-1.2, 1.2]) box(R, 0.18, 3.1, 0.18, wood, tx + dx, 1.55, -1.8);
    box(R, 2.7, 0.2, 0.22, wood, tx, 3.05, -1.8);
    // ladder against the tower (only in its shot)
    for (const dx of [-0.45, 0.45]) box(this.ladder, 0.08, 6, 0.08, wood, -2.7 + dx, 3, -2.75);
    for (let k = 0; k < 14; k++) box(this.ladder, 0.9, 0.06, 0.06, wood, -2.7, 0.3 + k * 0.42, -2.75);
    R.add(this.ladder);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    this.ladder.visible = id === S.ladders || id === S.balloon;
    // the balloon, rope and cat (shared by the tower shots)
    const tower = id === S.balloon || id === S.ladders || id === S.ascent || id === S.rescue;
    if (tower) {
      let b: [number, number, number] = [1, 3.6 + Math.sin(t * 2) * 0.1, 0], catAt: [number, number, number] | null = null, held = false;
      if (id === S.balloon && f < W.escapa) { fx("rope0", 32, 512, ropeDraw, 1, 1.75, 0, 0.05, 3.5); }
      else if (id === S.balloon && f < W.atasco) { const s = smooth((f - W.escapa) / (W.atasco - W.escapa)); b = [1 + (TOP[0] - 1) * s, 3.6 + (TOP[1] - 3.6) * s, TOP[2] * s]; catAt = [b[0] + 0.3, b[1] - 3.4, b[2] + 0.5]; }
      else { b = [TOP[0], TOP[1] + Math.sin(t * 2) * 0.05, TOP[2]]; catAt = [CAT[0], CAT[1], CAT[2]]; }
      if (id === S.rescue && f > W.coge - 2) { const pp = f > W.baja ? floatAt(f) : [-2.4, 13.6, -1.6]; catAt = [pp[0] + 0.35, pp[1] + 0.45, pp[2] + 0.2]; held = true; if (f > W.globo - 2) b = [pp[0] + 0.15, pp[1] + 3.6, pp[2]]; }
      fx("ball", 256, 320, balloonDraw, b[0], b[1], b[2], 1.6, 2.0);
      if (catAt) {
        const top = b[1] - 1.0, bot = held && f > W.globo - 2 ? catAt[1] + 0.9 : held ? top : catAt[1] + 0.5;
        if (top - bot > 0.1) fx("rope", 32, 512, ropeDraw, held && f > W.globo - 2 ? b[0] : b[0] + 0.15, (top + bot) / 2, b[2], 0.05, top - bot);
        card("cat", catAt[0], catAt[2], 0.42, catDraw(t * 3, "sit", false, "#e8a050"), 1, 0, catAt[1] - 0.25);
      }
    }
    if (id === S.hook || id === S.end) {
      const h = id === S.hook ? hop(f, 8, 1) + hop(f, 38, 1) : hop(f, 1108, 1) + hop(f, 1138, 1);
      person("pim", PIMPIN, 0.5, h, 2.5, { mode: "stand", expr: h > 0.2 ? "shock" : "nervous", facing: 0, wave: h > 0.2 ? 0.9 : undefined }, 1, h < 0.05, PIMS);
      for (let j = 0; j < 3; j++) person(`b${j}`, VEC(j), -2.2 + j * 2.6 + (j === 1 ? 1.4 : 0), 0, -0.6, { mode: "stand", expr: "shock", facing: j === 2 ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1, { mode: "stand", expr: "stern", facing: 0 }, 10 + j, true, 1.0);
      const h = hop(f, 138, 1, true) + Math.sin(t * 3) * 0.05 * (f > 140 ? 1 : 0);
      person("pim", PIMPIN, 0.9, h, 1.6, { mode: "stand", expr: f > 138 ? "grin" : "nervous", facing: 0, wave: f > 145 ? 0.8 : undefined }, 1, h < 0.05, PIMS);
    }
    if (id === S.water) {
      const h = hop(f, 242, 1);
      person("pim", PIMPIN, 2, h, 3, { mode: "stand", expr: h > 0.2 ? "shock" : "whistle", facing: 0, tilt: f < 240 ? 0.35 : 0 }, 1, h < 0.05, PIMS);
      const s = smooth((f - W.vuela) / 26);
      fx("gl", 128, 128, glassDraw, 2.3 + s * 1.2, 1.15 + h + s * 3.2, 3.1, 0.3, 0.3);
    }
    if (id === S.scare) {
      const pop = smooth((f - 276) / 8);
      person("bu", VEC(2), -3.8 + pop * 1.4, hop(f, W.asusta, 0.5), 2.0, { mode: "stand", expr: f > W.asusta - 2 ? "shock" : "grin", facing: 1, wave: f < W.asusta ? 0.95 : undefined }, 2, true, 1.0);
      if (f > W.bu && f < 302) fx("bub", 512, 256, bubbleDraw("¡BU!"), -2.4, 3.0, 2.0, 1.4, 0.7);
      const h = hop(f, W.hip4, 1.2);
      person("pim", PIMPIN, -0.9, h, 2.6, { mode: "stand", expr: "shock", facing: 0, wave: h > 0.2 ? 0.9 : undefined }, 1, h < 0.05, PIMS);
      for (let j = 0; j < 4; j++) person(`v${j}`, VEC(j + 3), -4 + j * 1.6 + (j > 1 ? 1.2 : 0), hop(f, W.asusta + j, 0.4), -0.2, { mode: "stand", expr: f > W.asusta - 2 ? "shock" : "smile", facing: 0, wave: f > W.asusta ? 0.9 : undefined }, 10 + j, true, 1.0);
    }
    if (id === S.misa) {
      const up = f < W.campana - 6 ? 0 : f < W.campana ? smooth((f - W.campana + 6) / 6) * 1.05 : f < W.campana + 10 ? 1.05 : 1.05 * (1 - smooth((f - W.campana - 10) / 10));
      person("pim", PIMPIN, -5, up, -1.6, { mode: "stand", expr: f > W.campana ? "dazed" : "nervous", facing: 0 }, 1, up < 0.05, PIMS);
      const sw = f > W.campana ? Math.sin((f - W.campana) * 0.5) * Math.exp(-(f - W.campana) / 25) * 0.15 : 0;
      fx("bell", 256, 256, bellDraw, -5 + sw, 2.6, -1.75, 0.7, 0.7);
      if (f > W.campana && f < W.campana + 28) { const g = (f - W.campana) / 28; fx(`ring|${Math.floor(g * 6)}`, 256, 256, ringDraw, -5, 2.6, -1.7, 0.8 + g * 1.8, 0.8 + g * 1.8, true); }
      for (const [j, x] of [[0, -7.2], [1, -6.6], [2, -3.4], [3, -2.8]] as [number, number][]) person(`f${j}`, VEC(j + 1), x, 0, -1.4 + (j % 2) * 0.3, { mode: "stand", expr: f > W.campana ? "shock" : "stern", facing: x < -5 ? 1 : -1 }, 10 + j, true, 1.0);
    }
    if (id === S.stones) {
      person("mom", VEC(1), 3.0, 0, 2.0, { mode: "stand", expr: "stern", facing: -1, wave: Math.sin(t * 8) > 0 ? 0.6 : 0.3 }, 2, true, 1.0);
      const h = hop(f, W.hip6, 0.12);
      person("pim", PIMPIN, 1.7, h, 2.5, { mode: "stand", expr: f > W.hip6 ? "relief" : "nervous", facing: 1 }, 1, true, PIMS);
      for (let k = 0; k < 3; k++) if (f > W.piedras - 4 + k * 4) fx(`st${k}`, 128, 128, stoneDraw(k), 1.5 + k * 0.2, 0.55 + h + (k % 2) * 0.12, 2.75, 0.24, 0.2);
    }
    if (id === S.balloon) {
      const s = f > W.escapa - 2;
      for (let j = 0; j < 5; j++) person(`fe${j}`, VEC(j), -2.6 + j * 1.5, 0, 1.6 + (j % 2) * 0.6, { mode: "stand", expr: s ? "shock" : "laugh", facing: 0, wave: s ? 0.95 : 0.4 + Math.sin(t * 6 + j) * 0.3 }, 10 + j, true, 1.0);
      if (f > W.alc - 30) person("alc", ALCALDESA, -1.2, 0, 3.0, { mode: "stand", expr: "shock", facing: 0, wave: 0.95 }, 2, true, 1.0);
    }
    if (id === S.ladders) {
      person("lad", VEC(3), -2.7, 5.3, -2.4, { mode: "stand", expr: f > W.cortas - 2 ? "nervous" : "grin", facing: 0, wave: 0.95 }, 2, false, 1.0);
      const th = f > W.cuerda - 4 && f < W.corta + 14 ? Math.sin(Math.PI * smooth((f - W.cuerda + 4) / 46)) * 7 : 0;
      person("rope", VEC(5), 0.4, 0, 0.6, { mode: "stand", expr: f > W.corta - 2 ? "nervous" : "stern", facing: -1, wave: th > 0.5 ? 0.95 : undefined }, 3, true, 1.0);
      if (th > 0.3) fx("thr", 32, 512, ropeDraw, 0.2, 2.4 + th / 2, 0.6, 0.05, th);
      for (let j = 0; j < 3; j++) person(`g${j}`, VEC(j), -1.2 + j * 1.6, 0, 2.0, { mode: "stand", expr: f > W.nada - 2 ? "nervous" : "shock", facing: 0 }, 10 + j, true, 1.0);
      person("alc", ALCALDESA, 2.6, 0, 1.2, { mode: "stand", expr: "shock", facing: -1, wave: 0.9 }, 4, true, 1.0);
    }
    if (id === S.ascent) {
      const y = climbY(f);
      person("pim", PIMPIN, -2.4, y, -1.6, { mode: "stand", expr: y > 0.5 ? (y > 10 ? "grin" : "shock") : "nervous", facing: 0, wave: y > 0.5 ? 0.9 : undefined }, 1, y < 0.05, PIMS);
      if (f < 900) for (let j = 0; j < 3; j++) person(`g${j}`, VEC(j), 0.4 + j * 1.1, 0, -2.2, { mode: "stand", expr: "shock", facing: -1 }, 10 + j, true, 1.0);
    }
    if (id === S.rescue) {
      const pp = f > W.baja ? floatAt(f) : [-2.4, 13.6 + Math.sin(t * 3) * 0.04, -1.6];
      person("pim", PIMPIN, pp[0], pp[1], pp[2], { mode: "stand", expr: f > W.coge ? "grin" : "smile", facing: 0, wave: f > W.globo - 2 ? 0.95 : undefined }, 1, pp[1] < 0.05, PIMS);
      if (f > W.cheer - 10) for (let j = 0; j < 4; j++) person(`c${j}`, VEC(j + 1), -2.6 + j * 1.7 + (j > 1 ? 1.2 : 0), 0, 0.2, { mode: "stand", expr: "laugh", facing: 0, wave: 0.6 + Math.sin(t * 7 + j) * 0.3 }, 10 + j, true, 1.0);
      if (f > W.cheer - 10) person("alc", ALCALDESA, 2.8, 0, 1.0, { mode: "stand", expr: "relief_open", facing: -1, wave: 0.9 }, 4, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, hop(f, 1240, 0.6), 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
