// Pimpín 22 · "Lento": a street crossing with waiting cars, a snail, shoelaces at night, a wedding glass tower.
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { TONE, CHAR } from "./shade";
import { ctaDraw, carDraw, bubbleDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, night, smooth } from "./story";

export const PIMS = 1.1;
const snailDraw = (p: Pen) => { p.ell(150, 110, 80, 80, "#c88a3a", 7); p.arc(150, 110, 50, 50, 0, 300, 10, "#8a5a2a"); p.poly([[20, 190], [240, 190], [240, 170], [60, 170]], "#9ab86a", 6); p.line([[40, 175], [20, 110]], "#1a1010", 6, false); p.line([[56, 175], [52, 112]], "#1a1010", 6, false); p.ell(20, 106, 9, 9, "#1a1010", 0); p.ell(52, 108, 9, 9, "#1a1010", 0); };
const towerDraw = (missing: boolean) => (p: Pen) => { const rows = 6; for (let r = 0; r < rows; r++) { const n = rows - r; for (let k = 0; k < n; k++) { if (missing && r === rows - 1) continue; const x = 256 - (n - 1) * 36 + k * 72, y = 600 - r * 96; p.poly([[x - 28, y - 90], [x + 28, y - 90], [x + 6, y - 40], [x + 6, y - 8], [x + 22, y], [x - 22, y], [x - 6, y - 8], [x - 6, y - 40]], "rgba(220,240,255,0.75)", 5); p.poly([[x - 22, y - 84], [x + 22, y - 84], [x + 4, y - 50], [x - 4, y - 50]], "#f2d84a", 0); } } };
const glassDraw = (p: Pen) => { p.poly([[100, 20], [156, 20], [134, 70], [134, 102], [150, 110], [106, 110], [122, 102], [122, 70]], "rgba(220,240,255,0.8)", 5); p.poly([[106, 26], [150, 26], [132, 60], [124, 60]], "#f2d84a", 0); };
const moonDraw = (p: Pen) => { p.ell(128, 128, 90, 90, "#f8f0c8", 6); for (let j = 0; j < 8; j++) p.ell(20 + j * 70 % 240, 20 + (j * 53) % 230, 5, 5, "#fff", 0); };
const sunDraw = (p: Pen) => p.ell(128, 128, 90, 90, "#ffd23f", 6);
const calDraw = (p: Pen) => { p.poly([[20, 40], [236, 40], [236, 236], [20, 236]], "#f4f1ea", 7); p.poly([[20, 40], [236, 40], [236, 96], [20, 96]], "#d8302a", 7); p.g.fillStyle = "#1a1010"; p.g.font = "bold 50px Arial"; p.g.textAlign = "center"; p.g.fillText("MAÑANA", 128, 180); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const nk = night(f, id); if (nk > 0) { this.sun.intensity *= 1 - 0.85 * nk; this.hemi.intensity *= 1 - 0.65 * nk; const dk = new THREE.Color("#10142e"); for (const u of ["c0", "c1", "c2", "c3", "c4"]) (this.skyMat.uniforms[u].value as THREE.Color).lerp(dk, 0.92 * nk);
      const k = (v: THREE.Vector3, r: number, g: number, b: number) => v.set(v.x * (1 - nk + nk * r), v.y * (1 - nk + nk * g), v.z * (1 - nk + nk * b));
      k(TONE.uLitCol.value, 0.22, 0.25, 0.42); k(TONE.uShadeCol.value, 0.2, 0.22, 0.4); k(TONE.uShadeLift.value, 0.3, 0.3, 0.5); k(CHAR.uCharTint.value, 0.5, 0.52, 0.7); }
    const camarero = { ...VEC(3), jacket: "#f4f1ea", pants: "#1a1a1e", hat: "hair" } as any;
    const cura = { ...VEC(1), jacket: "#1a1a1e", pants: "#1a1a1e", hat: "hair", hair: "#8a8a8a" } as any;
    const novia = { ...ALCALDESA, jacket: "#f4f1ea", dress: "#f4f1ea", belt: "#e8c45a" } as any;
    if (id === S.hook || id === S.end) {
      const x = -0.4 + ((f % 400) / 400) * 0.5;
      person("pim", PIMPIN, x, 0, 1.4, { mode: "stroll", phase: t * 0.6, expr: "smile", facing: 1 }, 1, true, PIMS);
      card("c1", -1.9, 0.9, 0.8, carDraw(0, "#8a1e26"), 1, 0); card("c2", 2.0, 1.9, 0.8, carDraw(0, "#3a5ab8"), -1, 0);
      person("d1", VEC(2), -2.2, 0, -0.6, { mode: "stand", expr: "stern", facing: 1 }, 10, true, 1.0);
      person("d2", VEC(4), 2.4, 0, 0.0, { mode: "stand", expr: "dazed", facing: -1 }, 11, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -6 + ((f - 110) * 0.08 + j * 1.6) % 9, 0, 0.8 + (j % 2) * 0.6, { mode: "march", phase: t * 6 + j, expr: "stern", facing: 1 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stroll", phase: t * 0.5, expr: "smile", facing: 1 }, 1, true, PIMS);
    }
    if (id === S.snail) {
      person("pim", PIMPIN, -0.2 + (f - 174) * 0.001, 0, 1.4, { mode: "stroll", phase: t * 0.5, expr: f > 225 ? "dazed" : "smile", facing: 1 }, 1, true, PIMS);
      const sx = -1.2 + smooth((f - 190) / 60) * 2.0; fx("sn", 256, 256, snailDraw, sx, 0.2, 1.8, 0.5, 0.5);
    }
    if (id === S.shoes) {
      person("pim", PIMPIN, 0, 0, 1.4, { mode: "sit", expr: nk > 0.5 ? "dazed" : "smile", facing: 0 }, 1, true, PIMS);
      fx(nk > 0.5 ? "moon" : "sun", 256, 256, nk > 0.5 ? moonDraw : sunDraw, 1.2, 2.5, 0.2, 0.7, 0.7);
    }
    if (id === S.joke) {
      const later = f > W.siguiente - 3;
      person("j", VEC(5), -0.8, 0, 1.2, { mode: "stand", expr: later ? "neutral" : "laugh", facing: 1 }, 10, true, 1.0);
      person("pim", PIMPIN, 0.5, 0, 1.6, { mode: "stand", expr: later ? "laugh" : "neutral", facing: -1 }, 1, true, PIMS);
      if (later) fx("cal", 256, 256, calDraw, 1.0, 2.4, 0.8, 0.6, 0.6);
    }
    const tower = (shake: number, missing: boolean) => fx(`tw|${missing ? 1 : 0}`, 512, 640, towerDraw(missing), 0.3 + Math.sin(t * 40) * shake, 1.6, 0, 1.4, 1.75);
    if (id === S.tower || id === S.tries || id === S.slow) {
      fx("tbl", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#f4f1ea", 5), 0.3, 0.7, 0.02, 1.8, 0.3);
      const shake = id === S.tries && f > W.temblar - 4 ? 0.03 : 0;
      tower(shake, !(id === S.slow && f > W.pone));
    }
    if (id === S.tower) {
      person("alc", novia, -1.4, 0, 0.8, { mode: "stand", expr: "smile", facing: 1 }, 2, true, 1.0);
      person("gr", { ...VEC(3), jacket: "#2a2a32", pants: "#2a2a32", hat: "hair" } as any, 1.9, 0, 0.8, { mode: "stand", expr: "grin", facing: -1 }, 3, true, 1.0);
      if (f > 530) fx("gap", 256, 256, (p: Pen) => { p.g.fillStyle = "#ff3b3b"; p.g.font = "bold 160px Arial"; p.g.textAlign = "center"; p.g.fillText("?", 128, 190); }, 0.3, 2.6, 0.05, 0.6, 0.6);
    }
    if (id === S.tries) {
      if (f < 630) { const tr = f > W.tiembla - 6 ? Math.sin(t * 50) * 0.03 : 0; person("cam", camarero, 1.0, 0, 0.7, { mode: "stand", expr: f > W.tiembla - 6 ? "nervous" : "smile", facing: -1, wave: 0.9 }, 4, true, 1.0); fx("g", 256, 128, glassDraw, 0.75 + tr, 1.75 + tr, 0.75, 0.3, 0.15); }
      else if (f < 686) { const sn = f > W.estornuda - 4 && f < W.estornuda + 14; person("cura", cura, 1.0, 0, 0.7, { mode: "stand", expr: sn ? "shock" : "nervous", facing: -1, wave: 0.9 }, 5, true, 1.0); fx("g", 256, 128, glassDraw, sn ? 1.4 : 0.75, sn ? 2.3 : 1.75, 0.75, 0.3, 0.15); if (sn) fx("ach", 512, 256, bubbleDraw("¡ACHÍS!"), 1.4, 2.2, 0.9, 0.9, 0.45); }
      else { const ap = smooth((f - W.novia) / 40); person("alc", novia, 1.8 - ap * 0.7, 0, 0.7, { mode: ap > 0 && ap < 1 ? "stroll" : "stand", phase: t * 3, expr: f > W.temblar ? "shock" : "smile", facing: -1 }, 2, true, 1.0); }
      for (let j = 0; j < 3; j++) person(`g${j}`, VEC(j), -2.0 + j * 0.6, 0, 1.6 + (j % 2) * 0.4, { mode: "stand", expr: f > W.temblar ? "shock" : "nervous", facing: 1 }, 10 + j, true, 1.0);
    }
    if (id === S.slow) {
      const p = smooth((f - 770) / 85), x = -1.6 + p * 1.7;
      person("pim", PIMPIN, x, 0, 0.7, { mode: p < 1 ? "stroll" : "stand", phase: t * 0.6, expr: "smile", facing: 1, wave: 0.9 }, 1, true, PIMS);
      if (f <= W.pone) fx("g", 256, 128, glassDraw, x + 0.25 + (p > 0.9 ? (p - 0.9) * 3 : 0), 1.75 + (p > 0.9 ? (p - 0.9) * 5 : 0), 0.75, 0.3, 0.15);
      for (let j = 0; j < 3; j++) person(`g${j}`, j === 0 ? novia : VEC(j), -2.4 + j * 0.6, 0, 1.6 + (j % 2) * 0.4, { mode: "stand", expr: f > 905 ? "relief_open" : "nervous", facing: 1 }, 10 + j, true, 1.0);
    }
    if (id === S.laugh) {
      person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: f > W.rie - 3 ? "laugh" : "smile", facing: 0 }, 1, true, PIMS);
      person("j", VEC(5), -1.0, 0, 0.6, { mode: "stand", expr: f > W.rie + 10 ? "dazed" : "neutral", facing: 1 }, 10, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
