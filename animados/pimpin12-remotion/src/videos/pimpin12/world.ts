// Pimpín 12 · "Imán": the plaza, a fridge and two airport arches (each only in its shot), the well at WELL (dark hole on top).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { ctaDraw, signDraw, coinDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA, keyDraw } from "./villa";
import { S, W, WELL, smooth } from "./story";

export const PIMS = 1.1;
const GUARD: Outfit = { jacket: "#2a4a8a", pants: "#1a2a4a", boots: "#111", hat: "cap", cap: "#2a4a8a", skin: SKINS[2], belt: "#e8c45a", buttons: "#e8c45a", moustache: "#3a2a1a" };
const spoonDraw = (p: Pen) => { p.ell(64, 50, 34, 44, "#d8dce4", 5); p.poly([[58, 90], [70, 90], [72, 240], [56, 240]], "#c8ccd4", 4); };
const bikeDraw = (p: Pen) => { p.g.lineWidth = 12; p.g.strokeStyle = "#1a1a1e"; for (const x of [110, 400]) { p.g.beginPath(); p.g.arc(x, 220, 90, 0, Math.PI * 2); p.g.stroke(); } p.g.strokeStyle = "#e2453c"; p.g.lineWidth = 16; p.g.beginPath(); p.g.moveTo(110, 220); p.g.lineTo(220, 110); p.g.lineTo(360, 110); p.g.lineTo(400, 220); p.g.moveTo(220, 110); p.g.lineTo(260, 220); p.g.lineTo(360, 110); p.g.stroke(); p.poly([[190, 80], [250, 80], [250, 96], [190, 96]], "#1a1a1e", 4); p.g.beginPath(); p.g.moveTo(360, 110); p.g.lineTo(350, 60); p.g.lineTo(390, 50); p.g.stroke(); };
const panDraw = (p: Pen) => { p.ell(100, 128, 90, 90, "#2a2a2e", 7); p.ell(100, 128, 64, 64, "#4a4a52", 0); p.poly([[180, 116], [252, 110], [252, 146], [180, 140]], "#6a4a2a", 5); };
const anchorDraw = (p: Pen) => { const c = "#5a5a62"; p.ell(128, 40, 30, 30, null, 10); p.poly([[116, 66], [140, 66], [140, 270], [116, 270]], c, 6); p.poly([[60, 110], [196, 110], [196, 130], [60, 130]], c, 6); p.g.strokeStyle = c; p.g.lineWidth = 26; p.g.beginPath(); p.g.arc(128, 200, 100, 0.15 * Math.PI, 0.85 * Math.PI); p.g.stroke(); p.poly([[10, 250], [60, 230], [40, 290]], c, 5); p.poly([[246, 250], [196, 230], [216, 290]], c, 5); };
const ringDraw = (p: Pen) => { p.g.strokeStyle = "#f2c84a"; p.g.lineWidth = 18; p.g.beginPath(); p.g.arc(64, 74, 40, 0, Math.PI * 2); p.g.stroke(); p.poly([[50, 10], [78, 10], [86, 34], [42, 34]], "#7ad0ff", 4); };
const bucketDraw = (p: Pen) => p.poly([[30, 40], [226, 40], [196, 230], [60, 230]], "#8a8a92", 7);
const starDraw = (p: Pen) => { const pts: [number, number][] = []; for (let k = 0; k < 10; k++) { const r = k % 2 ? 40 : 110, a = (k / 10) * Math.PI * 2 - Math.PI / 2; pts.push([128 + Math.cos(a) * r, 128 + Math.sin(a) * r]); } p.poly(pts, "#ffe25a", 6); };
const ropeDraw = (p: Pen) => { p.g.fillStyle = "#6a4a2a"; p.g.fillRect(10, 0, 12, 512); };
const lightDraw = (p: Pen) => p.ell(64, 64, 54, 54, "#ff2a2a", 6);
type Item = { k: string; d: (p: Pen) => void; cw: number; ch: number; dx: number; dy: number; w: number; h: number };
const SP = (n: number): Item[] => Array.from({ length: n }, (_, k) => ({ k: `sp${k}`, d: spoonDraw, cw: 128, ch: 256, dx: [-0.3, 0.28, -0.18, 0.2, -0.36, 0.34, 0, -0.1][k], dy: [0.9, 0.85, 0.6, 0.55, 0.4, 0.38, 0.75, 0.3][k], w: 0.16, h: 0.32 }));
const KEYS: Item[] = [0, 1].map((k) => ({ k: `ky${k}`, d: keyDraw, cw: 512, ch: 192, dx: k ? 0.25 : -0.22, dy: 0.98 - k * 0.1, w: 0.3, h: 0.11 }));
const COINS: Item[] = [0, 1, 2].map((k) => ({ k: `co${k}`, d: coinDraw("1"), cw: 256, ch: 256, dx: -0.12 + k * 0.12, dy: 0.66 + (k % 2) * 0.08, w: 0.13, h: 0.13 }));

export class World extends Base {
  fridge = new THREE.Group(); arches = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.74, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: "#050408" }));
    hole.position.set(WELL[0], 1.012, WELL[2]); R.add(hole);
    box(this.fridge, 1.1, 2.1, 0.8, lamC("#f4f4f8"), -5.6, 1.05, 0.6); box(this.fridge, 0.06, 0.5, 0.06, lamC("#9a9aa2"), -5.2, 1.5, 1.02); R.add(this.fridge);
    const g = lamC("#c8ccd4");
    for (const x of [-4.0, -1.8]) { for (const dx of [-0.55, 0.55]) box(this.arches, 0.18, 2.2, 0.5, g, x + dx, 1.1, 1.0); box(this.arches, 1.3, 0.25, 0.5, g, x, 2.3, 1.0); }
    R.add(this.arches);
  }
  /** items stuck to Pimpín, flying in from the left over 8 frames from frame f0 */
  private stick(a: Api, items: Item[], f0: number[], px: number, py: number, pz: number) {
    items.forEach((it, i) => {
      const s = smooth((a.f - f0[i]) / 8); if (a.f < f0[i]) return;
      a.fx(it.k, it.cw, it.ch, it.d, px + it.dx - (1 - s) * 2.6, py + it.dy + (1 - s) * 0.8, pz + 0.18, it.w, it.h);
    });
  }
  private pim(a: Api, x: number, y: number, z: number, opts: any, f: { sp?: number[]; ky?: number[]; co?: number[] }) {
    a.person("pim", PIMPIN, x, y, z, { facing: 0, ...opts }, 1, y === 0, PIMS);
    this.stick(a, SP(8), f.sp ?? Array(8).fill(-99), x, y, z);
    if (f.ky) this.stick(a, KEYS, f.ky, x, y, z);
    if (f.co) this.stick(a, COINS, f.co, x, y, z);
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    this.fridge.visible = id === S.fridge; this.arches.visible = id === S.airport;
    const all = { ky: [-99, -99], co: [-99, -99, -99] };
    const [wx, , wz] = WELL;
    if (id === S.hook || id === S.end) {
      const f0 = id === S.hook ? 4 : 1083;
      this.pim(a, 0.5, 0, 2.5, { mode: "stand", expr: "nervous", wave: 0.3 }, { sp: Array.from({ length: 8 }, (_, k) => f0 + k * 7) });
      for (let j = 0; j < 2; j++) person(`b${j}`, VEC(j + 2), -1.6 + j * 4.2, 0, -0.2, { mode: "stand", expr: "shock", facing: j ? -1 : 1 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1, { mode: "stand", expr: f > 140 ? "shock" : "stern", facing: 0 }, 10 + j, true, 1.0);
      this.pim(a, 0.9, 0, 1.7, { mode: "stand", expr: "grin" }, { co: [137, 9999, 9999] });
    }
    if (id === S.magnet) this.pim(a, 0.5, 0, 2.5, { mode: "stand", expr: f > W.cucharas ? "nervous" : "grin" }, { ky: [W.llaves, W.llaves + 4], co: [W.monedas, W.monedas + 3, W.monedas + 6], sp: Array.from({ length: 8 }, (_, k) => W.cucharas + k * 2) });
    if (id === S.bike) {
      fx("taller", 1024, 512, signDraw(["TALLER"], "#f2e2b8", "#2a4a8a"), -9, 4.4, -7.9, 2.4, 1.2);
      const s = (f - 262) / 70, px = -8.5 + 3.9 * s, pz = -5.5 + 4.1 * s;
      this.pim(a, px, 0, pz, { mode: "march", phase: t * 2.5, expr: f > W.sigue + 4 ? "nervous" : "smile" }, all);
      if (f > W.sigue - 14) { const b = smooth((f - W.sigue + 14) / 14); fx("bike", 512, 320, bikeDraw, px - 1.5 * b - (1 - b) * 0.2 - 1.2 * (1 - b), 0.45 + Math.abs(Math.sin(t * 6)) * 0.04, pz - 1.3, 1.3, 0.8); }
      person("mec", VEC(3), -10.6, 0, -6.2, { mode: "stand", expr: f > W.sigue ? "shock" : "stern", facing: 1, wave: f > W.sigue ? 0.9 : undefined }, 2, true, 1.0);
    }
    if (id === S.fridge) this.pim(a, -5.6, 0.25, 1.15, { mode: "stand", expr: f > 375 ? "dazed" : "nervous", wave: 0.95 }, all);
    if (id === S.airport) {
      const s = smooth((f - 420) / 24);
      this.pim(a, -4.0, 0, -0.6 + 2.8 * s, { mode: s > 0 && s < 1 ? "march" : "stand", phase: t * 2.5, expr: f > W.pita ? "nervous" : "grin" }, all);
      if (f > W.pita - 1) for (const [k, x] of [[0, -4.0], [1, -1.8]] as [number, number][]) if (f > (k ? W.lado - 12 : W.pita - 1) && Math.floor(f / 4) % 2 === 0) fx(`li${k}`, 128, 128, lightDraw, x, 2.6, 1.3, 0.24, 0.24);
      person("guard", GUARD, -5.6, 0, 1.6, { mode: "stand", expr: f > W.pita ? "shock" : "stern", facing: 1 }, 2, true, 1.0);
      person("pax", VEC(4), -0.6, 0, 0.3, { mode: "stand", expr: f > W.lado - 10 ? "shock" : "smile", facing: -1 }, 3, true, 1.0);
    }
    if (id === S.ring) {
      person("alc", ALCALDESA, wx - 0.9, 0, wz + 1.3, { mode: "stand", expr: f > W.cae ? "shock" : "smile", facing: 1, wave: f < W.cae ? 0.7 : 0.95 }, 2, true, 1.0);
      const s = smooth((f - W.cae) / 10), d = smooth((f - W.cae - 10) / 40);
      if (f < W.cae + 60) fx("ring", 128, 128, ringDraw, wx - 0.6 + 0.6 * s, 1.5 + Math.sin(s * Math.PI) * 0.3 - d * 2.5, wz + 1.3 - 1.3 * s, 0.18, 0.18);
    }
    if (id === S.tries) {
      if (f < 682) { const s = Math.sin(Math.PI * smooth((f - W.cubo) / 34)); const by = 2.0 - s * 1.8; fx("bk", 256, 256, bucketDraw, wx, by, wz, 0.4, 0.38); fx("r1", 32, 512, ropeDraw, wx, (2.25 + by + 0.2) / 2, wz, 0.04, Math.max(0.05, 2.25 - by - 0.2)); }
      if (f > 680 && f < 730) { const s = Math.sin(Math.PI * smooth((f - W.cana) / 30)); fx("line", 32, 512, ropeDraw, wx + 0.2, 1.9 - s * 0.6, wz, 0.02, 1.0 + s * 1.2); person("fish", VEC(4), wx + 0.85, 0, wz + 1.0, { mode: "stand", expr: f > 716 ? "nervous" : "grin", facing: -1, wave: 0.95 }, 3, true, 1.0); }
      if (f > 728) {
        const dn = smooth((f - W.vecino) / 20), up = smooth((f - W.vuelve + 4) / 14), y = 1.0 - 3.2 * dn + 3.2 * up;
        person("vec", { ...VEC(0), jacket: f > W.vuelve ? "#7ab0d8" : VEC(0).jacket }, wx, y, wz + 0.1 + 0.85 * smooth((f - W.vuelve - 6) / 8), { mode: "stand", expr: f > W.vuelve ? "dazed" : "grin", facing: 0 }, 4, false, 1.0);
        fx("r2", 32, 512, ropeDraw, wx + 0.05, (2.25 + y + 2.2) / 2, wz + 0.1, 0.04, Math.max(0.05, 2.25 - y - 2.2 + 0.4));
      }
      person("hold", VEC(2), wx - 0.85, 0, wz + 1.1, { mode: "stand", expr: f > 716 ? "nervous" : "stern", facing: 1, wave: 0.6 }, 2, true, 1.0);
      person("alc", ALCALDESA, wx + 1.1, 0, wz + 1.8, { mode: "stand", expr: "nervous", facing: -1 }, 5, true, 1.0);
    }
    if (id === S.down || id === S.up) {
      const y = id === S.down ? 1.0 - 3.6 * smooth((f - W.bajan) / 30) : -2.6 + 3.6 * smooth((f - W.sube) / 16);
      const z = wz + (id === S.up ? 0.95 * smooth((f - W.sube - 14) / 10) : 0);
      const big = id === S.up;
      this.pim(a, wx, y, z, { mode: "stand", expr: big ? (f > W.ancla ? "dazed" : "grin") : "smile", wave: big && f > W.anillo ? 0.95 : 0.7 }, all);
      fx("r3", 32, 512, ropeDraw, wx, (2.25 + y + 1.3) / 2, wz, 0.04, Math.max(0.05, 2.25 - y - 1.3));
      if (id === S.down) for (const c of [879, 890, 899]) if (f >= c - 1 && f < c + 8) fx(`star${c}`, 256, 256, starDraw, wx + (c % 3 - 1) * 0.4, 1.6 + (f - c) * 0.04, wz + 0.6, 0.5, 0.5);
      if (big) {
        if (f > W.anillo - 2) fx("ring", 128, 128, ringDraw, wx + 0.45, y + 1.45, z + 0.25, 0.22, 0.22);
        if (f > W.monedas2 - 2) for (let k = 0; k < 14; k++) fx(`cc${k}`, 256, 256, coinDraw("1"), wx - 0.4 + (k % 5) * 0.2, y + 0.3 + Math.floor(k / 5) * 0.22, z + 0.3, 0.16, 0.16);
        if (f > W.bici - 2) fx("bike", 512, 320, bikeDraw, wx - 1.0, y + 0.9, z - 0.1, 1.2, 0.75);
        if (f > W.sartenes - 2) for (let k = 0; k < 2; k++) fx(`pan${k}`, 256, 256, panDraw, wx + 0.75 + k * 0.1, y + 0.55 + k * 0.45, z + 0.2, 0.5, 0.5);
        if (f > W.ancla - 2) { const s = smooth((f - W.ancla + 2) / 6); fx("anchor", 256, 320, anchorDraw, wx + 0.15, y + 2.0 + (1 - s) * 1.5, z + 0.35, 1.1, 1.38); }
      }
      for (let j = 0; j < 3; j++) person(`w${j}`, VEC(j + 1), wx - 2.2 + j * 2.2 + (j === 1 ? 2.2 : 0), 0, wz + 1.5 + (j % 2) * 0.3, { mode: "stand", expr: big && f > W.monedas2 ? (f > W.ancla ? "shock" : "laugh") : "nervous", facing: j ? -1 : 1, wave: big ? 0.9 : 0.5 }, 10 + j, true, 1.0);
      if (big) person("alc", ALCALDESA, wx - 1.4, 0, wz + 2.2, { mode: "stand", expr: f > W.anillo ? "relief_open" : "nervous", facing: 1, wave: 0.9 }, 5, true, 1.0);
    }
    if (id === S.cta) { this.pim(a, 0, 0, 1.0, { mode: "stand", expr: "smile", wave: 0.9 }, { sp: Array(8).fill(-99) }); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
