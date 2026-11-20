// "La guerra del cubo": Bologna's square with the well (x = 0), Modena with its tower (MOD), the field of Zappolino (ZAP), the museum today (MUS).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, stoneHD, cobbleHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, house, tree, textDraw, labelDraw, docDraw, signDraw, flagDraw, exDraw, smokeDraw } from "./props";
import { burstDraw } from "./beasts";
import { S, W, MOD, ZAP, MUS } from "./story";

const MODS = (v: number): Outfit => ({ jacket: "#e8c43a", pants: "#2a4a8a", boots: "#2a1a10", hat: "cap", cap: "#2a4a8a", skin: SKINS[v % 3], belt: "#5a4024", rifle: v % 3 === 0, moustache: v % 2 ? "#3a2a1a" : undefined });
const BOLS = (v: number): Outfit => ({ jacket: "#c8323a", pants: "#f2ece0", boots: "#2a1a10", hat: "cap", cap: "#f2ece0", skin: SKINS[v % 3], belt: "#5a4024", rifle: v % 3 === 0, beard: v % 4 === 1 ? "#3a2a1a" : undefined });
const LORD: Outfit = { jacket: "#2a4a8a", pants: "#e8c43a", boots: "#111", hat: "crown", skin: SKINS[0], beard: "#5a3a20", moustache: "#5a3a20", belt: null, sash: "#e8c43a" };
const ENVOY: Outfit = { jacket: "#c8323a", pants: "#f2ece0", boots: "#111", hat: "tophat", skin: SKINS[0], moustache: "#3a2a1a", belt: null };
const TOUR = (v: number): Outfit => ({ jacket: ["#e84a5a", "#3a8ad8", "#f0c83a", "#2a2a2a", "#8ad8a8"][v % 5], pants: ["#3a5a8a", "#2a2a2a", "#c8b890"][v % 3], boots: "#f4f1ea", hat: "hair", hair: ["#1a1a1a", "#8a5a3a", "#c87a3a"][v % 3], skin: SKINS[v % 3], belt: null });
const modF = flagDraw(["#e8c43a", "#2a4a8a"], true);
const bolF = flagDraw(["#f2ece0"], false, (p) => { p.g.fillStyle = "#c8323a"; p.g.fillRect(16, 134, 480, 50); p.g.fillRect(226, 16, 50, 286); });
const bucketDraw = (p: Pen) => { p.arc(128, 96, 80, 70, 190, 350, 10, "#3a3a3a"); p.poly([[52, 96], [204, 96], [188, 236], [68, 236]], "#a8784a", 8); for (const y of [126, 206]) p.stroke([[56 + (y - 96) * 0.12, y], [200 - (y - 96) * 0.12, y]], 10, "#4a4a52"); for (const x of [96, 128, 160]) p.stroke([[x, 100], [x, 232]], 4, "#7a5a3a"); };
const moonDraw = (p: Pen) => { p.ell(128, 128, 90, 90, "#f4f1d0", 6); p.ell(160, 110, 80, 80, "#2a3a6a", 0); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // Bologna square: cobbles, red houses, the well
    const cob = lam({ map: rep(cobbleHD(), 8, 4), color: "#d8ccbc" });
    const sq = new THREE.Mesh(new THREE.PlaneGeometry(26, 14).rotateX(-Math.PI / 2), cob); sq.position.set(0, 0.01, 0); R.add(sq);
    for (let k = 0; k < 6; k++) house(R, -11 + k * 4.4, -6, 4, 5 + (k % 2) * 2, 3, ["#c8623a", "#d8823a", "#b84a3a"][k % 3], "#7a3a2a");
    const st = lam({ map: rep(stoneHD(), 2, 1), color: "#b8aa98" });
    cyl(R, 0.6, 0.6, 0.7, st, 0, 0.35, -0.6, 16); for (const dx of [-0.55, 0.55]) box(R, 0.08, 1.4, 0.08, lamC("#5a3a20"), dx, 1.05, -0.6); box(R, 1.2, 0.08, 0.08, lamC("#5a3a20"), 0, 1.75, -0.6);
    // Modena: square + the tall Ghirlandina tower
    const sq2 = new THREE.Mesh(new THREE.PlaneGeometry(26, 14).rotateX(-Math.PI / 2), cob); sq2.position.set(MOD[0], 0.01, 0); R.add(sq2);
    box(R, 10, 4, 0.2, lamC("#e8d8b0"), MOD[0], 2, -2);
    box(R, 3, 18, 3, st, MOD[0] + 4, 9, -6); const sp = new THREE.Mesh(new THREE.ConeGeometry(1.6, 5, 8), st); sp.position.set(MOD[0] + 4, 20.5, -6); R.add(sp);
    for (let k = 0; k < 3; k++) house(R, MOD[0] - 8 + k * 4, -7, 3.6, 5, 3, "#e8c48a", "#7a3a2a");
    // Zappolino: hills, Bologna's walls in the distance
    for (let k = 0; k < 5; k++) { const h = new THREE.Mesh(new THREE.SphereGeometry(8, 12, 8), lamC("#7a9a5a")); h.scale.y = 0.35; h.position.set(ZAP[0] - 20 + k * 10, 0, -22 - (k % 2) * 6); R.add(h); }
    box(R, 20, 4, 1, st, ZAP[0] + 14, 2, -10); for (let k = 0; k < 8; k++) box(R, 0.8, 0.8, 1, st, ZAP[0] + 5 + k * 2.4, 4.4, -10);
    for (let k = 0; k < 4; k++) tree(R, ZAP[0] - 12 + k * 3, -6, 0.9);
    // museum
    box(R, 10, 4, 0.2, lamC("#f2ece0"), MUS[0], 2, -2); flatGround(R, 10, 8, "#a8a098", MUS[0], 1, 0.012);
    box(R, 0.8, 1.0, 0.8, lamC("#3a3a40"), MUS[0], 0.5, -0.6);
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const M = MOD[0], Z = ZAP[0], U = MUS[0];
    const army = (key: string, o: (v: number) => Outfit, x0: number, n: number, dir: 1 | -1, run: number, rows = 3) => {
      for (let k = 0; k < n; k++) { const r = k % rows, c = Math.floor(k / rows); person(`${key}${k}`, o(k), x0 + dir * (c * 0.8 + r * 0.3) + run, 0, -0.4 - r * 0.8, { mode: run ? "march" : "stand", phase: t * 6 + k, expr: "stern", facing: (-dir) as 1 | -1 }, 20 + k + (key === "b" ? 100 : 0)); }
    };
    if (id === S.hook || id === S.end) {
      army("m", MODS, Z - 1.0, 6, -1, 0, 2); army("b", BOLS, Z + 1.0, 6, 1, 0, 2);
      fx("bk", 256, 256, bucketDraw, Z, 1.2 + Math.sin(t * 3) * 0.05, 0.4, 0.7, 0.7);
      fx("mf", 512, 320, modF, Z - 1.9, 2.6, -0.8, 0.8, 0.5); fx("bf", 512, 320, bolF, Z + 1.9, 2.6, -0.8, 0.8, 0.5);
    }
    if (id === S.italy) {
      fx("bf", 512, 320, bolF, -3, 4.6, -4.3, 1.4, 0.88);
      if (f > W.modena - 4) fx("vs", 512, 200, textDraw("MÓDENA vs BOLONIA", "#ffd23f", 56), 0, 3.2, -1, 3.0, 1.17);
    }
    if (id === S.theft) {
      fx("moon", 256, 256, moonDraw, 3, 5.5, -5, 1.4, 1.4);
      const x0 = Math.min(-0.45, -2.6 + (f - 184) * 0.03), took = f > W.trofeo - 4;
      for (let k = 0; k < 3; k++) person(`m${k}`, MODS(k), x0 - k * 0.5 + (took ? -(f - W.trofeo) * 0.01 : 0), 0, 0.2 - k * 0.3, { mode: x0 < -0.45 || took ? "stroll" : "stand", phase: t * 6 + k, expr: took ? "grin" : "whistle", facing: took ? -1 : 1, wave: k === 0 && took ? 0.9 : undefined }, 1 + k);
      if (!took) fx("bk", 256, 256, bucketDraw, 0, 1.4, -0.6, 0.35, 0.35); else fx("bk", 256, 256, bucketDraw, x0 + 0.3 - (f - W.trofeo) * 0.01, 1.85, 0.3, 0.35, 0.35);
      if (f > W.cuelan - 4 && !took) fx("sh", 512, 200, textDraw("SHHH...", "#ffffff", 100), x0, 2.3, 0.3, 0.6, 0.23);
      if (took) fx("tro", 512, 160, labelDraw("¡TROFEO!", "#2a4a8a"), -0.8, 2.6, 0.2, 0.8, 0.25);
    }
    if (id === S.bucket) {
      fx("bk", 256, 256, bucketDraw, 0, 1.1, 0, 0.5, 0.5);
      fx("uno", 512, 200, textDraw(f > 376 ? "DE MADERA" : "UN CUBO", "#ffd23f", 100), 0, 1.5, 0.1, 0.5, 0.2);
    }
    if (id === S.demand) {
      person("env", ENVOY, M - 0.55, 0, 0, { mode: "stand", expr: f > W.no - 4 ? "shock" : "stern", facing: 1, wave: f > W.exige - 4 && f < W.no ? 0.9 : undefined }, 1);
      person("lord", LORD, M + 0.6, 0, -0.1, { mode: "stand", expr: f > W.no - 4 ? "grin" : "neutral", facing: -1, wave: f > W.no - 4 ? 0.9 : undefined }, 2);
      if (f > W.exige - 4) fx("doc", 512, 620, docDraw("DEVOLVED", "", "el cubo"), M - 0.05, 1.45, 0.3, 0.38, 0.46);
      if (f > W.no - 4) fx("no", 512, 200, textDraw("¡NO!", "#ff4a3a", 140), M + 0.6, 2.35, 0.1, 0.6, 0.23);
      fx("mf", 512, 320, modF, M + 1.8, 2.6, -1.85, 0.8, 0.5);
    }
    if (id === S.army) { army("b", BOLS, Z + 2.5, 30, 1, -(f - 460) * 0.02, 5); fx("bf", 512, 320, bolF, Z + 3, 3.2, -2, 1.0, 0.63); }
    if (id === S.wait) { army("m", MODS, Z - 2.6, 9, -1, 0, 3); fx("mf", 512, 320, modF, Z - 3.6, 3.0, -1.5, 0.9, 0.56); if (f > W.zappolino - 4) fx("zap", 512, 160, labelDraw("ZAPPOLINO", "#5a7a3a"), Z - 3.6, 2.4, 0.3, 1.0, 0.31); }
    if (id === S.win) {
      const run = Math.max(0, (f - W.gana) * 0.05);
      army("b", BOLS, Z + 1.2 + run * 1.1, 9, 1, 0.001, 3);
      army("m", MODS, Z - 1.2 + run, 9, -1, 0.001, 3);
      if (f < W.persiguen) for (let k = 0; k < 3; k++) if ((Math.floor(f / 8) + k) % 3 === 0) fx(`bu${k}`, 256, 256, burstDraw("#ffd23f"), Z - 1 + k, 1.4, 0.4, 1.2, 1.2);
      if (f > W.gana - 4 && f < W.persiguen) fx("win", 512, 200, textDraw("¡GANA MÓDENA!", "#ffd23f", 70), Z, 3.2, 0, 2.0, 0.78);
      for (let k = 0; k < 3; k++) fx(`sm${k}`, 256, 256, smokeDraw(k), Z - 2 + k * 2, 2.5 + ((f / 40 + k * 0.3) % 1) * 1.5, -3, 2.4, 2.4, true);
    }
    if (id === S.symbol) {
      person("lord", LORD, M, 0, 0, { mode: "stand", expr: "laugh", facing: 0, wave: f > W.simbolo - 4 ? 1 : 0.6 }, 1);
      fx("bk", 256, 256, bucketDraw, M + 0.4, 2.15 + (f > W.simbolo - 4 ? 0.1 : 0), 0.1, 0.4, 0.4);
      for (let k = 0; k < 4; k++) person(`c${k}`, MODS(k), M + (k % 2 ? 1 : -1) * (1.0 + Math.floor(k / 2) * 0.7), 0, -0.5, { mode: "stand", expr: "laugh", facing: (k % 2 ? -1 : 1) as 1 | -1, wave: Math.sin(t * 7 + k) * 0.4 + 0.5 }, 10 + k);
      if (f > W.politica - 4 && f < W.simbolo - 4) fx("pol", 512, 620, docDraw("POLÍTICA", "", "papa vs emperador"), M - 0.6, 1.5, 0.3, 0.38, 0.46);
      if (f > W.simbolo - 4) fx("sym", 512, 200, textDraw("SÍMBOLO", "#ffd23f", 110), M, 3.0, 0, 0.9, 0.35);
    }
    if (id === S.tower) { fx("bk", 256, 256, bucketDraw, M + 4, 12 + Math.min(4, (f - 836) * 0.06), -4.4, 1.6, 1.6); fx("mf", 512, 320, modF, M + 4, 23.5, -6, 1.6, 1.0); }
    if (id === S.today) {
      fx("bk", 256, 256, bucketDraw, U, 1.25, -0.5, 0.45, 0.45);
      if (f > W.expuesto - 4) fx("lab", 512, 160, labelDraw("EL CUBO", "#2a4a8a"), U, 1.75, -0.4, 0.7, 0.22);
      for (let k = 0; k < 4; k++) person(`t${k}`, TOUR(k), U + (k % 2 ? 1 : -1) * (0.9 + Math.floor(k / 2) * 0.7), 0, -0.2 - (k % 2) * 0.3, { mode: "stand", expr: k % 2 ? "shock" : "grin", facing: (k % 2 ? -1 : 1) as 1 | -1 }, 10 + k);
    }
    void exDraw; void signDraw;
  }
}
