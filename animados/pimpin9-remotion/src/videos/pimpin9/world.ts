// Pimpín 9 · "Alérgico": the plaza and the windmill hill at MW.
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { ctaDraw, signDraw, smokeDraw } from "./props";
import { catDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, MW, bladeA, smooth } from "./story";

export const PIMS = 1.1;
const flowerDraw = (p: Pen) => { for (const [x, y, c] of [[80, 70, "#e84a6a"], [150, 50, "#f2c84a"], [200, 100, "#c85ab8"], [110, 120, "#f4f1ea"]] as [number, number, string][]) { p.band([[x, y + 20], [128, 240]], "#4a8a2a", 8, 0); for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI * 2; p.ell(x + Math.cos(a) * 20, y + Math.sin(a) * 20, 16, 16, c, 4); } p.ell(x, y, 12, 12, "#f2a83a", 3); } };
const hatDraw = (p: Pen) => { p.ell(128, 180, 110, 26, "#3a2a2a", 6); p.poly([[70, 180], [80, 60], [176, 60], [186, 180]], "#3a2a2a", 6); p.poly([[78, 150], [178, 150], [180, 170], [76, 170]], "#c8202a", 0); };
const fanDraw = (p: Pen) => { for (let k = 0; k < 7; k++) { const a = Math.PI + (k / 6) * Math.PI; p.poly([[128, 220], [128 + Math.cos(a) * 120, 220 + Math.sin(a) * 120], [128 + Math.cos(a + 0.45) * 120, 220 + Math.sin(a + 0.45) * 120]], k % 2 ? "#e84a6a" : "#f4d8e8", 4); } };
const flourDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 60; j++) p.ell((j * 97 + k * 31) % 512, (j * 61 + k * 47) % 512, 7, 7, "#ffffff", 0); };
const breadDraw = (p: Pen) => { p.ell(128, 140, 110, 50, "#d89a4a", 7); for (const x of [70, 120, 170]) p.band([[x - 14, 120], [x + 14, 160]], "#a86a2a", 6, 0); };
const gustDraw = (p: Pen) => { for (let j = 0; j < 6; j++) p.band([[0, 60 + j * 70], [300, 50 + j * 70], [512, 70 + j * 70]], "rgba(255,255,255,0.8)", 10, 0); };

export class World extends Base {
  blades: THREE.Group;
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const [mx, , mz] = MW;
    box(R, 50, 0.1, 40, lamC("#8ab85a"), mx, -0.04, mz);
    cyl(R, 1.6, 2.4, 7, lamC("#f0e6d2"), mx + 2, 3.5, mz, 16);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.0, 2.2, 16), lamC("#a8402a")); roof.position.set(mx + 2, 8.1, mz); R.add(roof);
    box(R, 0.9, 1.8, 0.1, lamC("#5a3a2a"), mx + 2, 0.9, mz + 2.3);
    this.blades = new THREE.Group(); this.blades.position.set(mx + 2, 6.4, mz + 2.1); R.add(this.blades);
    const wood = lamC("#8a5a3a"), sail = lamC("#f4f1ea");
    for (let k = 0; k < 4; k++) { const arm = new THREE.Group(); arm.rotation.z = (k * Math.PI) / 2; const b = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.6, 0.1), wood); b.position.y = 2.3; arm.add(b); const s = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.4, 0.05), sail); s.position.set(0.55, 2.7, 0.05); arm.add(s); this.blades.add(arm); }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.3, 12), wood); hub.rotation.x = Math.PI / 2; this.blades.add(hub);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const ph = Math.floor(t * 8) % 4, [mx, , mz] = MW;
    this.blades.rotation.z = -bladeA(f);
    const sneezeFace = (f0: number) => f > f0 - 20 && f < f0 - 3 ? "relief_open" : f >= f0 - 3 && f < f0 + 14 ? "shout" : "nervous";
    if (id === S.hook || id === S.end) {
      const g = id === S.end ? 1 : smooth((f - W.ach0 + 2) / 6);
      person("pim", PIMPIN, 0, 0, 2.2, { mode: "stand", expr: id === S.end ? "shout" : sneezeFace(W.ach0), facing: 0, tilt: -0.1 * g }, 1, true, PIMS);
      for (let j = 0; j < 6; j++) { const x = (j % 2 ? 1 : -1) * (1.5 + Math.floor(j / 2) * 1.1); person(`v${j}`, VEC(j), x, 0, 0.4 - (j % 3) * 0.4, { mode: "stand", expr: g > 0.1 ? "dazed" : "smile", facing: 0, tilt: Math.sign(x) * 0.18 * g, headTilt: Math.sign(x) * 0.15 * g }, 10 + j, true, 1.0); }
      if (g > 0.05) { fx(`gust|${ph}`, 512, 512, gustDraw, 0, 1.6, 1.4, 6 * g, 4 * g, true); for (let k = 0; k < 3; k++) fx(`hat${k}`, 256, 256, hatDraw, (k - 1) * 2.2 * (1 + g), 2.4 + g * (1.5 + k * 0.4), 0.3, 0.4, 0.4); }
    }
    if (id === S.calm) {
      for (let j = 0; j < 4; j++) { person(`v${j}`, VEC(j), -3 + j * 2, 0, 1.6, { mode: "stand", expr: "smile_closed", facing: 0 }, 10 + j, true, 1.0); fx(`fl${j}`, 256, 256, flowerDraw, -3 + j * 2 + 0.35, 1.45, 1.8, 0.45, 0.45); }
      card("cat", 1.0, 2.6, 0.4, catDraw(0, "sit", false, "#e8a24a"), 1, 0);
    }
    if (id === S.ja) {
      for (let j = 0; j < 6; j++) person(`v${j}`, VEC(j), -3 + j * 1.2 + (j > 2 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "laugh", facing: 0, wave: 0.5 + Math.sin(t * 7 + j) * 0.4 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.6, 0, 2.8, { mode: "stand", expr: "nervous", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.list) {
      const k = f < W.polvo - 6 ? 0 : f < W.gatos - 6 ? 1 : f < W.lunes - 6 ? 2 : 3;
      person("pim", PIMPIN, -0.3, 0, 2.6, { mode: "stand", expr: "nervous", facing: 0, tilt: Math.sin(t * 20) * 0.02 }, 1, true, PIMS);
      if (k === 0) fx("fl", 256, 256, flowerDraw, 0.5, 1.2, 2.8, 0.55, 0.55);
      if (k === 1) fx(`dust|${ph % 4}`, 256, 256, smokeDraw(ph % 4), 0.5, 1.1, 2.8, 0.9, 0.8, true);
      if (k === 2) card("cat", 0.6, 2.9, 0.4, catDraw(0, "sit", false, "#9a9aa2"), -1, 0);
      if (k === 3) fx("lun", 1024, 512, signDraw(["LUNES"], "#f4f1ea", "#c8202a"), 0.6, 1.5, 2.8, 1.0, 0.5);
    }
    if (id === S.launch) {
      const up = smooth((f - W.despega + 2) / 20);
      person("pim", PIMPIN, -1.4 * up, 3.2 * up, 2.6, { mode: up > 0.1 ? "fall" : "stand", expr: up > 0 ? "shock" : sneezeFace(W.despega), facing: 0, tilt: -0.6 * up }, 1, up < 0.05, PIMS);
      if (up > 0.02) fx(`gust|${ph}`, 512, 512, gustDraw, 0.8, 1.6, 2.4, 3, 2, true);
    }
    if (id === S.flour) {
      for (let j = 0; j < 4; j++) person(`v${j}`, { ...VEC(j), jacket: "#f4f4f4", pants: "#e8e8e8" }, -4.6 + j * 1.2, 0, -5.4 + (j % 2) * 0.6, { mode: "stand", expr: "dazed", facing: 0 }, 10 + j, true, 1.0);
      fx("pan", 1024, 512, signDraw(["PANADERÍA"], "#f2e2b8", "#8a3a1a"), -3, 4.6, -7.85, 2.2, 1.1);
      fx(`flr|${ph}`, 512, 512, flourDraw(ph), -3, 3.2 - ((t * 2) % 1) * 0.6, -5.2, 6, 6, true);
    }
    if (id === S.mill || id === S.idea || id === S.blast) {
      const pim = id !== S.mill || f > W.soplan - 10;
      for (let j = 0; j < 3; j++) person(`v${j}`, VEC(j), (id === S.mill ? mx - 2.8 : mx - 4.6) + j * 1.1, 0, mz + 4.2, { mode: "stand", expr: id === S.blast ? "shock" : id === S.mill && f > W.soplan - 4 && f < W.abanican ? "whistle" : "nervous", facing: 1, wave: id === S.blast ? 0.9 : undefined }, 10 + j, true, 1.0);
      if (id === S.mill && f > W.abanican - 6) for (let j = 0; j < 2; j++) { person(`ab${j}`, { ...VEC(j + 4), hair: "#e8e8ec", dress: "#8a6a9a", hat: "hair" }, mx + 0.4 + j * 1.1, 0, mz + 4.6, { mode: "stand", expr: "pained", facing: -1 }, 20 + j, true, 0.95); fx(`fan${j}|${ph % 2}`, 256, 256, fanDraw, mx + 0.1 + j * 1.1, 1.3 + (ph % 2) * 0.06, mz + 4.8, 0.5, 0.5); }
      if (pim && id !== S.mill) {
        person("pim", PIMPIN, mx - 0.5, 0, mz + 3.2, { mode: "stand", expr: id === S.blast ? (f < W.ach + 20 ? "shout" : "laugh") : f > W.a1 - 6 ? "relief_open" : "nervous", facing: 1, tilt: id === S.blast && f < W.ach + 20 ? -0.15 : 0 }, 1, true, PIMS);
        if (id === S.idea || f < W.ach) { person("alc", ALCALDESA, mx - 1.5, 0, mz + 3.4, { mode: "stand", expr: "grin", facing: 1, wave: f > W.ramo - 6 ? 0.7 : undefined }, 3, true, 1.0); if (f > W.ramo - 6) fx("ramo", 256, 256, flowerDraw, mx - 0.25, 1.55, mz + 3.4, 0.45, 0.45); }
        if (id === S.blast && f < W.ach + 40) fx(`gust|${ph}`, 512, 512, gustDraw, mx + 1.2, 2.4, mz + 3.0, 4, 3, true);
      }
      if (id === S.blast && f > W.pan - 10) for (let k = 0; k < Math.min(8, Math.floor((f - W.pan + 10) / 4)); k++) fx(`br${k}`, 256, 256, breadDraw, mx + 0.6 + (k % 4) * 0.5, 0.25 + Math.floor(k / 4) * 0.3, mz + 3.6, 0.5, 0.5);
      if (id === S.blast && f > W.sombrero - 8) { const s = smooth((f - W.sombrero + 8) / 30); fx("hatf", 256, 256, hatDraw, mx + 1 + s * 3, 6 + s * 3, mz + 2.5, 0.6, 0.6); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
