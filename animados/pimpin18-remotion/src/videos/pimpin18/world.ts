// Pimpín 18 · "Elástico": his arm (an fx line from shoulder to hand) stretches; an apple tree by the houses, a very tall tree at TREE.
import { Pen } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { ctaDraw, signDraw, appleDraw } from "./props";
import { tree } from "./props";
import * as THREE from "three";
import { villazanca, PIMPIN, VEC, KIDV, HOGAZA } from "./villa";
import { S, W, TREE, KIDY, reach, smooth } from "./story";

export const PIMS = 1.1;
const armDraw = (ax: number, ay: number, bx: number, by: number) => (p: Pen) => { p.g.strokeStyle = "#241726"; p.g.lineCap = "round"; p.g.lineWidth = 30; p.g.beginPath(); p.g.moveTo(ax, ay); p.g.lineTo(bx, by); p.g.stroke(); p.g.strokeStyle = "#f0a02c"; p.g.lineWidth = 20; p.g.beginPath(); p.g.moveTo(ax, ay); p.g.lineTo(bx, by); p.g.stroke(); p.ell(bx, by, 20, 20, "#f4d4b0", 5); };
const remoteDraw = (p: Pen) => { p.poly([[40, 10], [88, 10], [88, 120], [40, 120]], "#2a2a32", 5); p.ell(64, 36, 10, 10, "#e2453c", 0); };
const ballDraw = (p: Pen) => { p.ell(64, 64, 56, 56, "#e8802a", 6); p.line([[8, 64], [120, 64]], "#1a1010", 4, false); };
const bunDraw = (p: Pen) => p.ell(128, 90, 110, 70, "#d8a060", 6);

export class World extends Base {
  hoop = new THREE.Group(); ladder = new THREE.Group(); sofa = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    tree(R, 2.3, -6.0, 1.0, "#4a8a3a");
    const [tx, , tz] = TREE;
    cyl(R, 0.3, 0.45, 9.6, lamC("#6a4a2a"), tx, 4.8, tz, 8);
    const fol = new THREE.Mesh(new THREE.SphereGeometry(2.2, 14, 10), lamC("#4a8a3a")); fol.position.set(tx, 11.2, tz - 0.3); R.add(fol);
    box(R, 1.6, 0.18, 0.2, lamC("#6a4a2a"), tx + 0.8, 7.7, tz + 0.2);
    box(this.hoop, 0.12, 3.0, 0.12, lamC("#5a5a62"), 3.2, 1.5, 0.4); box(this.hoop, 1.2, 0.8, 0.06, lamC("#f4f1ea"), 3.2, 3.3, 0.5);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.025, 6, 16), lamC("#e2453c")); ring.rotation.x = Math.PI / 2; ring.position.set(3.2, 3.05, 0.8); this.hoop.add(ring); R.add(this.hoop);
    for (const dx of [-0.3, 0.3]) box(this.ladder, 0.07, 3.2, 0.07, lamC("#8a6a3a"), tx + 0.9 + dx, 1.6, tz + 0.5);
    for (let k = 0; k < 8; k++) box(this.ladder, 0.6, 0.05, 0.05, lamC("#8a6a3a"), tx + 0.9, 0.3 + k * 0.4, tz + 0.5);
    R.add(this.ladder);
    box(this.sofa, 1.8, 0.45, 0.8, lamC("#5a6ac8"), -0.4, 0.22, 1.6); box(this.sofa, 1.8, 0.6, 0.2, lamC("#4a5ab8"), -0.4, 0.75, 1.25); R.add(this.sofa);
  }
  /** an arm from A to B (world x, y) drawn at depth z */
  private arm(a: Api, A: [number, number], B: [number, number], z: number) {
    const x0 = Math.min(A[0], B[0]) - 0.15, x1 = Math.max(A[0], B[0]) + 0.15, y0 = Math.min(A[1], B[1]) - 0.15, y1 = Math.max(A[1], B[1]) + 0.15;
    const w = x1 - x0, h = y1 - y0, sc = 512 / Math.max(w, h), cw = Math.max(32, Math.round(w * sc)), ch = Math.max(32, Math.round(h * sc));
    const px = (x: number) => (x - x0) * sc, py = (y: number) => (y1 - y) * sc;
    a.fx(`arm|${cw}|${ch}|${Math.round(px(A[0]))}|${Math.round(py(A[1]))}|${Math.round(px(B[0]))}|${Math.round(py(B[1]))}`, cw, ch, armDraw(px(A[0]), py(A[1]), px(B[0]), py(B[1])), (x0 + x1) / 2, (y0 + y1) / 2, z, w, h);
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    this.hoop.visible = id === S.hoop; this.ladder.visible = id === S.tries; this.sofa.visible = id === S.sofa;
    const [tx, , tz] = TREE;
    if (id === S.hook || id === S.end) {
      const c0 = id === S.hook ? W.coge : 993, out = smooth((f - c0 + 30) / 26), back = smooth((f - c0 - 4) / 24), u = out * (1 - back);
      const A: [number, number] = [-1.5, 4.4], T: [number, number] = [2.0, 3.0];
      if (u > 0.02) this.arm(a, A, [A[0] + (T[0] - A[0]) * u, A[1] + (T[1] - A[1]) * u], -6.4);
      const ap: [number, number] = f > c0 ? [A[0] + (T[0] - A[0]) * u, A[1] + (T[1] - A[1]) * u] : T;
      if (u > 0.05 || f < c0) fx("apple", 128, 128, appleDraw(false), ap[0], ap[1], -6.3, 0.3, 0.3);
      person("b0", VEC(2), 1.4, 0, -3.6, { mode: "stand", expr: f > c0 ? "shock" : "smile", facing: -1 }, 10, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "smile", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.9, 0, 1.9, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
      if (f > 140) { const L = 0.5 + 2.6 * smooth((f - 140) / 12); this.arm(a, [1.15, 1.0], [1.3, 1.0 + L], 2.0); }
    }
    if (id === S.sofa) {
      person("pim", PIMPIN, -0.8, 0.25, 1.75, { mode: "sit", expr: "grin", facing: 1 }, 1, false, PIMS);
      const R: [number, number] = [2.0, 1.0], out = smooth((f - W.mando + 24) / 18), back = smooth((f - W.mando - 2) / 22), u = out * (1 - back);
      const A: [number, number] = [-0.55, 0.95];
      if (u > 0.02) this.arm(a, A, [A[0] + (R[0] - A[0]) * u, A[1] + (R[1] - A[1]) * u], 1.8);
      fx("rem", 128, 128, remoteDraw, f > W.mando ? A[0] + (R[0] - A[0]) * u + 0.1 : R[0], f > W.mando ? A[1] + (R[1] - A[1]) * u : R[1] - 0.15, 1.85, 0.2, 0.2);
      fx("shelf", 256, 64, (p: Pen) => p.poly([[0, 0], [256, 0], [256, 64], [0, 64]], "#8a5a2a", 5), 2.0, 0.8, 1.7, 0.8, 0.16);
    }
    if (id === S.scratch) {
      person("pim", PIMPIN, -2.0, 0, 1.5, { mode: "stand", expr: "smile", facing: 1 }, 1, true, PIMS);
      person("nb", VEC(3), 2.0, 0, 1.4, { mode: "stand", expr: f > W.rasca + 8 ? "relief" : "nervous", facing: 1 }, 2, true, 1.0);
      const u = smooth((f - W.rasca + 14) / 16);
      if (u > 0.02) this.arm(a, [-1.75, 0.95], [-1.75 + (3.5 * u) + Math.sin(t * 20) * 0.05 * (u > 0.95 ? 1 : 0), 1.3 + Math.sin(t * 20) * 0.08 * (u > 0.95 ? 1 : 0)], 1.45);
    }
    if (id === S.hoop) {
      person("pim", PIMPIN, 0.8, 0, 0.8, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      const u = smooth((f - W.deja + 20) / 16), back = smooth((f - W.canasta) / 14);
      const H: [number, number] = [1.05 + 2.1 * u * (1 - back), 1.0 + 2.3 * u * (1 - back)];
      if (u * (1 - back) > 0.02) this.arm(a, [1.05, 1.0], H, 0.8);
      const bY = f < W.canasta ? H[1] + 0.15 : 3.05 - Math.min(2.8, (f - W.canasta) * 0.12);
      fx("ball", 128, 128, ballDraw, f < W.canasta ? H[0] : 3.2, bY, 0.85, 0.3, 0.3);
      for (let j = 0; j < 2; j++) person(`o${j}`, VEC(j + 1), -0.6 + j * 4.6, 0, -0.2, { mode: "stand", expr: f > W.canasta ? "shock" : "stern", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    const kid = (y: number, expr: any, z = tz + 0.45, x = tx + 1.1) => person("kid", KIDV(1), x, y, z, { mode: "stand", expr, facing: 0, wave: y > 1 ? 0.95 : undefined }, 2, y < 0.05, 0.9);
    if (id === S.problem) {
      kid(Math.min(7.8, 7.8 * smooth((f - 450) / 50)), "nervous");
      person("bak", HOGAZA, tx + 2.4, 0, tz + 1.6, { mode: "stand", expr: "shock", facing: -1, wave: 0.95 }, 3, true, 1.0);
    }
    if (id === S.tries) {
      kid(KIDY(f, id), f > W.bollo ? "laugh" : "nervous");
      person("bak", HOGAZA, tx + 2.4, 0, tz + 1.6, { mode: "stand", expr: f > W.sube ? "shock" : "nervous", facing: -1, wave: f > W.bollo - 4 ? 0.95 : undefined }, 3, true, 1.0);
      if (f > W.bollo - 4) fx("bun", 256, 192, bunDraw, tx + 2.0, 2.3, tz + 1.8, 0.4, 0.3);
      person("lad", VEC(4), tx + 0.9, 2.4, tz + 0.75, { mode: "stand", expr: f > 572 ? "nervous" : "grin", facing: 0, wave: 0.95 }, 4, false, 1.0);
      if (f > W.bomberos - 6 && f < W.bollo - 10) fx("fire", 1024, 512, signDraw(["BOMBEROS", "DE VACACIONES"], "#f2e2b8", "#c8202a"), tx + 3.6, 2.2, tz + 2.6, 1.8, 0.9);
    }
    if (id === S.stretch) {
      kid(8.8, "nervous");
      person("pim", PIMPIN, tx + 2.0, 0, tz + 1.2, { mode: "stand", expr: f > W.quince ? "grin" : "smile", facing: -1 }, 1, true, PIMS);
      const h = reach(f); if (h > 1.2) this.arm(a, [tx + 1.8, 1.0], [tx + 1.3, h], tz + 1.0);
      person("bak", HOGAZA, tx + 3.4, 0, tz + 1.8, { mode: "stand", expr: "shock", facing: -1 }, 3, true, 1.0);
    }
    if (id === S.lower) {
      const y = KIDY(f, id);
      kid(y, "laugh", tz + 0.9, tx + 1.3);
      person("pim", PIMPIN, tx + 2.0, 0, tz + 1.2, { mode: "stand", expr: "grin", facing: -1 }, 1, true, PIMS);
      if (y > 1.4) this.arm(a, [tx + 1.8, 1.0], [tx + 1.4, y + 0.9], tz + 1.0);
      person("bak", HOGAZA, tx + 3.4, 0, tz + 1.8, { mode: "stand", expr: y < 0.1 ? "relief_open" : "nervous", facing: -1, wave: y < 0.1 ? 0.9 : undefined }, 3, true, 1.0);
      for (let j = 0; j < 3; j++) { person(`n${j}`, VEC(j), tx + 2.9 + j * 0.8, 0, tz - 0.4 + j * 0.2, { mode: "stand", expr: f > W.devuelve + j * 6 ? "laugh" : "smile", facing: -1, wave: f > W.devuelve + j * 6 ? 0.9 : undefined }, 10 + j, true, 1.0); if (f > W.devuelve + j * 6) fx(`ap${j}`, 128, 128, appleDraw(false), tx + 3.25 + j * 0.8, 2.0, tz - 0.3 + j * 0.2, 0.25, 0.25); }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
