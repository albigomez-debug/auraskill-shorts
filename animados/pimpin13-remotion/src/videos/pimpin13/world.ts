// Pimpín 13 · "Helado": plaza with a fountain at FT that freezes, heat-wave tint, ice rink.
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api, lamC, cyl } from "./base";
import { ctaDraw, signDraw } from "./props";
import { chickenDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, FT, heat, frozen, iceDisk, smooth } from "./story";

export const PIMS = 1.1;
const iceBlockDraw = (p: Pen) => { p.poly([[20, 20], [236, 30], [230, 490], [26, 480]], "rgba(170,220,255,0.55)", 6); p.line([[60, 60], [120, 40]], "#ffffff", 8, false); p.line([[60, 120], [90, 100]], "#ffffff", 6, false); };
const flakeDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 40; j++) { const x = (j * 97 + k * 31) % 512, y = (j * 61 + k * 53) % 512; p.ell(x, y, 7, 7, "#ffffff", 0); } };
const iceCreamDraw = (p: Pen) => { p.poly([[90, 120], [166, 120], [128, 250]], "#d8a060", 5); p.ell(128, 100, 46, 40, "#f4b8d0", 5); p.ell(128, 60, 36, 32, "#a8e0ff", 5); };
const scarfDraw = (k: number) => (p: Pen) => { const c = ["#e2453c", "#3a8ac8", "#f2c84a"][k % 3]; p.poly([[10, 60], [246, 60], [246, 120], [10, 120]], c, 6); p.poly([[180, 110], [230, 110], [220, 240], [190, 240]], c, 5); };
const eggDraw = (p: Pen) => { p.ell(128, 128, 110, 80, "#ffffff", 5); p.ell(128, 128, 40, 40, "#f2b23a", 4); };
const fanDraw = (p: Pen) => { for (let k = -3; k <= 3; k++) p.poly([[128, 230], [128 + k * 30 - 16, 40], [128 + k * 30 + 16, 40]], k % 2 ? "#e2453c" : "#f4f1ea", 4); };
const bubbleDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 8; j++) p.ell((j * 61 + k * 23) % 236 + 10, (j * 37 + k * 41) % 120 + 10, 14, 14, null, 4); };
const puddleDraw = (p: Pen) => p.ell(128, 64, 120, 40, "#7a2a8a", 5);
const jetDraw = (c: string) => (p: Pen) => { for (const k of [-1, 0, 1]) p.poly([[120 + k * 10, 250], [128 + k * 70, 40], [138 + k * 74, 30], [136 + k * 10, 250]], c, 4); };
const breathDraw = (p: Pen) => { for (let j = 0; j < 4; j++) p.ell(40 + j * 50, 64 + Math.sin(j) * 10, 26 - j * 3, 20, "rgba(220,240,255,0.8)", 0); };

export class World extends Base {
  water: THREE.MeshLambertMaterial; ice: THREE.Mesh;
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const [x, , z] = FT;
    cyl(R, 1.8, 1.9, 0.6, lamC("#b8b0a0"), x, 0.3, z, 24);
    this.water = new THREE.MeshLambertMaterial({ color: "#3a8ad8" });
    const w = new THREE.Mesh(new THREE.CircleGeometry(1.6, 24).rotateX(-Math.PI / 2), this.water); w.position.set(x, 0.58, z); R.add(w);
    cyl(R, 0.25, 0.3, 1.4, lamC("#b8b0a0"), x, 1.0, z, 12); cyl(R, 0.6, 0.2, 0.2, lamC("#b8b0a0"), x, 1.75, z, 16);
    this.ice = new THREE.Mesh(new THREE.CircleGeometry(1, 40).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: "#cfeaff", transparent: true, opacity: 0.85 }));
    this.ice.position.set(x, 0.03, z); R.add(this.ice);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const hk = heat(f, id);
    if (hk > 0) { this.sun.intensity *= 1 + 0.15 * hk; const or = new THREE.Color("#ffb066"); for (const u of ["c0", "c1", "c2", "c3", "c4"]) (this.skyMat.uniforms[u].value as THREE.Color).lerp(or, 0.7 * hk); }
    const fr = frozen(f, id); this.water.color.set("#3a8ad8").lerp(new THREE.Color("#e4f4ff"), fr);
    const d = iceDisk(f, id); this.ice.visible = d > 0.01; this.ice.scale.setScalar(Math.max(0.01, d * 11));
    const [fxx, , fzz] = FT;
    if (id !== S.tries) fx(`jet|${fr > 0.5 ? 1 : 0}`, 256, 256, jetDraw(fr > 0.5 ? "#e4f4ff" : "#6ab8f0"), fxx, 2.3, fzz, 1.0, 1.0);
    if (fr > 0.1) for (let k = 0; k < 6; k++) fx(`icl${k}`, 64, 128, (p: Pen) => p.poly([[10, 0], [54, 0], [32, 120]], "#e4f4ff", 4), fxx - 1.5 + k * 0.6, 0.45, fzz + 1.75, 0.12 * fr, 0.25 * fr);
    if (id === S.hook || id === S.end) {
      const tc = id === S.hook ? W.toca : 1060;
      person("pim", PIMPIN, fxx + 0.9, 0, fzz + 2.4, { mode: "stand", expr: f > tc + 10 ? "grin" : "nervous", facing: -1, wave: f > tc - 6 && f < tc + 14 ? 0.5 : undefined }, 1, true, PIMS);
      fx("br", 256, 128, breathDraw, fxx + 1.3, 1.2, fzz + 2.6, 0.6, 0.3);
      for (let j = 0; j < 2; j++) person(`b${j}`, VEC(j + 2), fxx + 2.8 + j * 1.2, 0, fzz + 0.6, { mode: "stand", expr: f > tc + 10 ? "shock" : "smile", facing: -1 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "smile", facing: 0, wave: 0.35 + Math.sin(t * 9 + j) * 0.1 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.9, 0, 1.9, { mode: "stand", expr: "nervous", facing: 0 }, 1, true, PIMS);
      fx(`fl|${Math.floor(t * 6) % 4}`, 512, 512, flakeDraw(Math.floor(t * 6) % 4), 0.9, 1.0, 2.0, 1.2, 1.2, true);
    }
    if (id === S.hand) {
      const tz = f > W.tieso - 4;
      person("pim", PIMPIN, 0.5, 0, 2.3, { mode: "stand", expr: "smile", facing: 1, wave: f > W.mano - 10 && f < W.tieso + 4 ? 0.4 : undefined }, 1, true, PIMS);
      person("v", VEC(3), 1.5, 0, 2.1, { mode: "stand", expr: tz ? "dazed" : "grin", facing: -1, wave: f > W.mano - 10 ? 0.4 : undefined }, 2, true, 1.0);
      if (tz) { fx("fr2", 512, 512, flakeDraw(2), 1.5, 1.2, 2.3, 1.4, 1.8, true); fx("ic2", 256, 512, iceBlockDraw, 1.5, 1.0, 2.0, 0.9, 2.1); }
    }
    if (id === S.icecream) {
      person("pim", PIMPIN, 0.5, 0, 2.5, { mode: "stand", expr: "grin", facing: 0, wave: 0.6 }, 1, true, PIMS);
      fx("ic", 256, 256, iceCreamDraw, 0.85, 1.35, 2.7, 0.45, 0.45);
    }
    if (id === S.sneeze) {
      fx("pan", 1024, 512, signDraw(["PANADERÍA"], "#f2e2b8", "#8a1e26"), 3, 4.4, -7.9, 2.4, 1.2);
      person("pim", PIMPIN, 2.4, 0, -5.4, { mode: "stand", expr: f > W.estornudo - 4 && f < W.estornudo + 12 ? "shock" : "nervous", facing: 1, tilt: f > W.estornudo - 4 && f < W.estornudo + 8 ? 0.3 : 0 }, 1, true, PIMS);
      person("baker", VEC(4), 4.0, 0, -6.0, { mode: "stand", expr: f > W.nevo ? "shock" : "smile", facing: -1 }, 2, true, 1.0);
      if (f > W.estornudo) { const k = Math.floor(t * 6) % 4; fx(`sn|${k}`, 512, 512, flakeDraw(k), 3, 2.5 - ((f - W.estornudo) * 0.01) % 0.5, -5.4, 4.5, 4.5, true); }
    }
    if (id === S.scarves) {
      person("mom", VEC(1), 2.6, 0, 2.0, { mode: "stand", expr: "nervous", facing: -1 }, 2, true, 1.0);
      for (let k = 0; k < 3; k++) if (f > W.bufandas - 12 + k * 8) fx(`sc${k}`, 256, 256, scarfDraw(k), 2.6, 1.22 - k * 0.08, 2.3, 0.5, 0.45);
      person("pim", PIMPIN, 1.6, 0, 2.5, { mode: "stand", expr: "smile", facing: 1 }, 1, true, PIMS);
    }
    if (id === S.heat) {
      for (let j = 0; j < 5; j++) person(`h${j}`, VEC(j), -3 + j * 1.5, 0, 0.6 + (j % 2) * 0.6, { mode: "stand", expr: "pained", facing: 0, wave: 0.5 + Math.sin(t * 10 + j) * 0.2 }, 10 + j, true, 1.0);
      for (let k = 0; k < 2; k++) card(`ch${k}`, 2.2 + k * 0.9, 1.6, 0.36, chickenDraw(t * 4 + k, false, "#fbf7ee", f > W.fritos ? "wide" : "calm"), k ? -1 : 1, 0);
      if (f > W.fritos - 2) for (let k = 0; k < 2; k++) fx(`egg${k}`, 256, 256, eggDraw, 2.4 + k * 0.9, 0.05, 1.9, 0.4, 0.3);
    }
    if (id === S.tries) {
      for (let j = 0; j < 3; j++) { person(`fn${j}`, VEC(j), 0.8 + j * 1.4, 0, 1.2, { mode: "stand", expr: f > 672 ? "pained" : "grin", facing: 0, wave: 0.9 }, 10 + j, true, 1.0); fx(`fan${j}`, 256, 256, fanDraw, 1.1 + j * 1.4 + Math.sin(t * 18 + j) * 0.1, 2.3, 1.3, 0.5, 0.5); }
      if (f > W.hirviendo - 20) { const k = Math.floor(t * 8) % 4; fx(`bb|${k}`, 256, 128, bubbleDraw(k), fxx, 0.8, fzz + 0.3, 3, 1.5); }
      person("alc", ALCALDESA, 3.4, 0, 1.6, { mode: "sit", expr: "dazed", facing: 0 }, 2, true, 1.0);
      if (f > W.alcaldesa) fx("pud", 256, 128, puddleDraw, 3.4, 0.03, 1.9, 1.4 * smooth((f - W.alcaldesa) / 20), 0.45);
    }
    if (id === S.enter) {
      const s = smooth((f - W.mete + 10) / 14);
      person("pim", PIMPIN, fxx + 1.4 - s * 1.0, s * 0.6, fzz + 1.9 - s * 0.8, { mode: s > 0 && s < 1 ? "march" : "stand", phase: t * 2.5, expr: f > W.uno ? "grin" : "smile", facing: 0 }, 1, s < 0.05, PIMS);
      for (let j = 0; j < 3; j++) person(`w${j}`, VEC(j + 2), fxx + 2.8 + j * 1.0, 0, fzz + 0.4 + j * 0.5, { mode: "stand", expr: f > W.tres ? "shock" : "pained", facing: -1 }, 10 + j, true, 1.0);
    }
    if (id === S.rink) {
      for (let j = 0; j < 8; j++) { const a0 = t * 0.9 + j * 0.785, r = 3.2 + (j % 2) * 1.6; person(`sk${j}`, j === 3 ? ALCALDESA : VEC(j), FT[0] + Math.cos(a0) * r, 0, FT[2] + 1 + Math.sin(a0) * r * 0.6, { mode: "stand", expr: "laugh", facing: Math.sin(a0) > 0 ? -1 : 1, tilt: Math.sin(a0 * 2) * 0.15, wave: f > W.helados ? 0.8 : 0.5 }, 10 + j, true, 1.0); if (f > W.helados) fx(`ic${j}`, 256, 256, iceCreamDraw, FT[0] + Math.cos(a0) * r + 0.35, 1.9, FT[2] + 1.1 + Math.sin(a0) * r * 0.6, 0.35, 0.35); }
      person("pim", PIMPIN, FT[0], 0.6, FT[2] + 0.4, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1, false, PIMS);
      if (f > W.gallinas - 20) for (let k = 0; k < 2; k++) card(`ch${k}`, 1.4 + k * 1.0 + (f - 960) * 0.02, 1.8, 0.36, chickenDraw(0, false, "#fbf7ee", "wide"), 1, 0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
