// "Wojtek": the desert camp in Iran (x = 0), the dock (DOCK), Montecassino (MC) and the Scottish zoo (ZOO).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { grassGround, flatGround, tree, sailShip, docDraw, signDraw, zDraw, tearDraw, smokeDraw, textDraw, heartDraw } from "./props";
import { bearDraw, burstDraw } from "./beasts";
import { S, W, MC, DOCK, ZOO } from "./story";

const POLE = (v: number): Outfit => ({ jacket: "#8a7a4a", pants: "#7a6a40", boots: "#3a2a20", hat: v % 3 === 2 ? "hair" : "cap", hair: "#5a3a20", cap: "#7a6a3a", skin: SKINS[v % 2], belt: "#5a4024", moustache: v % 2 ? "#5a3a20" : undefined });
const BOY: Outfit = { jacket: "#e8dcc0", pants: "#c8b890", boots: "#8a6a3a", hat: "hair", hair: "#1a1a1a", skin: SKINS[2], belt: null, build: "kid" } as Outfit;
const OFFICER: Outfit = { jacket: "#3a4a3a", pants: "#3a4a3a", boots: "#111", hat: "cap", cap: "#2a3a2a", skin: SKINS[0], buttons: "#e8c45a", moustache: "#c8c0b0", belt: "#5a4024", build: "stout" };
const bottleDraw = (p: Pen) => { p.poly([[110, 30], [146, 30], [146, 80], [176, 120], [176, 236], [80, 236], [80, 120], [110, 80]], "#cfe8f0", 7); p.poly([[84, 150], [172, 150], [172, 236], [84, 236]], "#f4f1ea", 0); p.g.fillStyle = "#c8202a"; p.g.font = "bold 30px Arial"; p.g.textAlign = "center"; p.g.fillText("VODKA", 128, 140); };
const cigDraw = (p: Pen) => { p.poly([[30, 120], [210, 110], [212, 136], [32, 146]], "#f4f1ea", 6); p.poly([[30, 120], [70, 118], [72, 144], [32, 146]], "#e8a85a", 0); };
const crateDraw = (p: Pen) => { p.poly([[20, 60], [236, 60], [236, 220], [20, 220]], "#8a6a3a", 8); p.stroke([[20, 140], [236, 140]], 6, "#5a4024"); p.g.fillStyle = "#2a2a20"; p.g.font = "bold 40px Arial"; p.g.textAlign = "center"; p.g.fillText("AMMO", 128, 120); };
const tag = (txt: string, col: string) => textDraw(txt, col, 64);

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#b8b87a");
    // Iran: sand and tents
    flatGround(R, 40, 40, "#e2c890", 0, -6, 0.01);
    for (let k = 0; k < 4; k++) { const t = new THREE.Mesh(new THREE.ConeGeometry(1.8, 2, 4), lamC("#a8a070")); t.rotation.y = Math.PI / 4; t.position.set(-5 + k * 3.4 + (k > 1 ? 3 : 0), 1.0, -4.5); t.castShadow = true; R.add(t); }
    // dock with a troop ship
    flatGround(R, 120, 80, "#2f8ab0", DOCK[0], -44, 0.02);
    box(R, 16, 0.4, 6, lamC("#9a8a72"), DOCK[0], 0.2, 0);
    sailShip(R, DOCK[0] - 1, -8, 1, "#4a4e56", 2);
    // Montecassino: rocky slope, ruined abbey on the hill, crate stacks, a truck
    flatGround(R, 40, 30, "#a89474", MC[0], -6, 0.01);
    const hill = new THREE.Mesh(new THREE.ConeGeometry(18, 9, 8), lamC("#8a7a5a")); hill.position.set(MC[0] + 4, 4.5, -26); R.add(hill);
    for (let k = 0; k < 5; k++) box(R, 1.4, 2 + (k % 3), 1.2, lamC("#d8ccb4"), MC[0] + k * 1.6, 9.5 + (k % 3) / 2, -26);
    for (let k = 0; k < 6; k++) box(R, 0.8, 0.5, 0.6, lamC("#8a6a3a"), MC[0] - 3.4 + (k % 3) * 0.85, 0.25 + Math.floor(k / 3) * 0.5, -1.8);
    box(R, 3.4, 1.6, 1.8, lamC("#5a6a3a"), MC[0] + 3.6, 1.1, -2.6); box(R, 1.2, 1.2, 1.8, lamC("#4a5a32"), MC[0] + 5.8, 0.9, -2.6);
    for (const dx of [2.6, 4.6, 5.8]) cyl(R, 0.35, 0.35, 0.3, lamC("#1a1a1e"), MC[0] + dx, 0.35, -1.65, 10).rotation.x = Math.PI / 2;
    // zoo: stone pit wall and bars
    flatGround(R, 14, 10, "#b8aa90", ZOO[0], -1, 0.01);
    box(R, 10, 3, 0.4, lamC("#a8a090"), ZOO[0], 1.5, -2.4);
    for (let k = 0; k < 14; k++) if (Math.abs(-3.25 + k * 0.5) > 0.9) cyl(R, 0.03, 0.03, 2.6, lamC("#3a3a40"), ZOO[0] - 3.25 + k * 0.5, 1.3, 1.2, 5);
    box(R, 7, 0.08, 0.08, lamC("#3a3a40"), ZOO[0], 2.6, 1.2);
    for (let k = 0; k < 3; k++) tree(R, ZOO[0] - 6 + k * 6, -6, 1, "#3a6a3a");
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const B = 0.7, ph = (Math.round(t * 8) % 8) * 0.785, fr = Math.round(t * 8) % 8;
    const bear = (key: string, x: number, z: number, mode: "walk" | "stand" | "carry" | "cub", dir = 1, y = 0) =>
      card(`bear|${key}|${mode}|${mode === "walk" || mode === "cub" ? fr : 0}`, x, z, B, bearDraw(mode === "walk" || mode === "cub" ? ph : 0, mode), dir, 0, y);
    const M = MC[0], D = DOCK[0], Z = ZOO[0];
    if (id === S.hook || id === S.end || id === S.carry) {
      const x = id === S.carry ? M - 2 + (f - 742) * 0.04 : M, bob = Math.abs(Math.sin(t * 6)) * 0.04;
      bear("w", x, 0, "carry", 1, bob);
      for (let k = 0; k < 2; k++) { const sx = x - 1.4 - k * 1.2; person(`s${k}`, POLE(k), sx, 0, -0.5, { mode: "march", phase: t * 6 + k, expr: id === S.carry ? "grin" : "stern", facing: 1 }, 10 + k); fx(`cr${k}`, 256, 256, crateDraw, sx + 0.25, 1.15, -0.3, 0.45, 0.45); }
      if (Math.floor(f / 30) % 2 === 0) fx("boom", 256, 256, burstDraw("#ffd23f"), M + 4 - (f % 60) * 0.02, 2.4, -8, 3, 3);
      for (let k = 0; k < 3; k++) fx(`sm${(k + Math.floor(f / 10)) % 3}`, 256, 256, smokeDraw((k + Math.floor(f / 10)) % 3), M - 4 + k * 4, 2.5 + ((f / 50 + k * 0.3) % 1) * 2, -9, 4, 4, true);
      if (id === S.carry && f > W.caja - 4) fx(`cnt|${Math.min(9, Math.floor((f - W.caja) / 12) + 1)}`, 512, 200, tag(`CAJA ${Math.min(9, Math.floor((f - W.caja) / 12) + 1)}`, "#ffd23f"), x + 0.1, 2.15, 0.1, 0.7, 0.28);
    }
    if (id === S.buy) {
      const bought = f > W.compran - 4;
      person("boy", BOY, 1.0, 0, -0.2, { mode: "stand", expr: bought ? "grin" : "smile", facing: -1 }, 1);
      for (let k = 0; k < 3; k++) person(`s${k}`, POLE(k), -1.6 + k * 0.7, 0, -0.4 - (k % 2) * 0.3, { mode: "stand", expr: bought ? "grin" : "neutral", facing: 1, wave: k === 2 && bought ? 0.8 : undefined }, 10 + k);
      bear("cub", 0.3, 0.2, "cub", bought ? -1 : 1);
      if (f > W.osezno - 4) fx("tin", 256, 256, heartDraw, 0.3, 0.85 + Math.sin(t * 4) * 0.04, 0.3, 0.22, 0.22);
    }
    if (id === S.bottle || id === S.cigs || id === S.grow) {
      const big = id === S.grow && f > W.crece + 12;
      if (!big) bear("cub", 0.3, 0.1, "cub", 1); else bear("big", 0.2, 0, "stand", 1);
      if (id === S.bottle) {
        person("s0", POLE(0), -0.6, 0, -0.2, { mode: "stand", expr: "grin", facing: 1, wave: f > W.bebe - 4 ? 0.7 : undefined }, 1);
        if (f > W.wojtek - 4) fx("name", 512, 200, tag("WOJTEK", "#ffffff"), 0.2, 1.3, 0.1, 0.8, 0.31);
        if (f > W.bebe - 4) fx("bottle", 256, 256, bottleDraw, 0.72, 0.42, 0.35, 0.28, 0.28);
      }
      if (id === S.cigs && f > W.fuma - 4) { fx("cig", 256, 256, cigDraw, 0.75, 0.4 + (f > W.come ? 0.02 : 0), 0.35, 0.2, 0.2); if (f > W.come - 3) fx("yum", 512, 200, tag("ÑAM", "#ffd23f"), 0.5, 0.95, 0.3, 0.45, 0.18); }
      if (id === S.grow && big) for (let k = 0; k < 2; k++) person(`g${k}`, POLE(k), k ? 1.4 : -1.1, 0, -0.5, { mode: "stand", expr: "shock", facing: (k ? -1 : 1) as 1 | -1 }, 20 + k);
    }
    if (id === S.sleep) {
      for (let k = 0; k < 2; k++) person(`s${k}`, POLE(k), 7.3 + k * 1.4, 0, -0.2, { mode: "sit", expr: "smile_closed", facing: (k ? -1 : 1) as 1 | -1, blink: 1 }, 1 + k);
      bear("cub", 8, 0.1, "cub", 1);
      fx("z", 256, 256, zDraw, 8.3, 0.9 + ((f % 30) / 30) * 0.3, 0.2, 0.3, 0.3);
    }
    if (id === S.ship) {
      const no = f > W.animales - 6;
      person("off", OFFICER, D + 0.8, 0.4, 0, { mode: "stand", expr: no ? "stern" : "neutral", facing: -1, wave: no ? 0.9 : undefined }, 1);
      bear("w", D - 0.4, 0.2, "stand", 1, 0.4);
      if (f > W.problema - 4) fx(`sign|${no ? 1 : 0}`, 1024, 512, signDraw(no ? ["PROHIBIDO", "ANIMALES"] : ["SOLO", "SOLDADOS"], "#f2ece0", "#c8202a"), D + 1.4, 2.6, -0.2, 1.4, 0.7);
    }
    if (id === S.enlist) {
      const stamp = f > W.oficial - 3;
      bear("w", D - 0.3, 0.2, "stand", 1, 0.4);
      person("off", OFFICER, D + 1.0, 0.4, -0.1, { mode: "stand", expr: stamp ? "grin" : "stern", facing: -1, wave: 0.8 }, 1);
      fx(`doc|${stamp ? 1 : 0}`, 512, 620, docDraw("SOLDADO WOJTEK", stamp ? "ALISTADO" : "", "22º Cía. Artillería"), D + 0.55, 1.9, 0.2, 0.5, 0.6);
      const items = [[W.numero, "Nº", "#ffffff"], [W.rango, "RANGO", "#ffd23f"], [W.paga, "PAGA", "#8ae86a"]] as const;
      items.forEach(([fr0, l, c], i) => { if (f > fr0 - 3) fx(`it${i}`, 512, 200, tag(l, c), D - 0.9 + i * 0.8, 2.55, 0.3, 0.6, 0.24); });
    }
    if (id === S.battle) {
      for (let k = 0; k < 4; k++) { const sx = M - 3 + k * 1.1 + ((f * 0.03 + k * 0.8) % 1.2); person(`c${k}`, POLE(k), sx, 0, -0.6, { mode: "march", phase: t * 6 + k, expr: "stern", facing: 1 }, 10 + k); fx(`cr${k % 2}`, 256, 256, crateDraw, sx + 0.25, 1.15, -0.4, 0.45, 0.45); }
      bear("w", M + 1.6, 0.3, f > W.cajas ? "stand" : "walk", -1);
      if (Math.floor(f / 24) % 2 === 0) fx("boom", 256, 256, burstDraw("#ffd23f"), M + 6, 3, -14, 4, 4);
    }
    if (id === S.luck) {
      bear("w", M, 0, "stand", 1);
      for (let k = 0; k < 4; k++) person(`s${k}`, POLE(k), M + (k % 2 ? 1 : -1) * (1.1 + Math.floor(k / 2) * 0.8), 0, -0.5, { mode: "stand", expr: "laugh", facing: (k % 2 ? -1 : 1) as 1 | -1, wave: Math.sin(t * 7 + k) * 0.5 + 0.5 }, 10 + k);
    }
    if (id === S.zoo) {
      bear("w", Z, -0.4, "stand", 1);
      if (f > W.amigos - 20) fx("tear", 256, 256, tearDraw, Z + 0.2 + 0.0, 1.55 - ((f % 40) / 40) * 0.2, -0.1, 0.12, 0.12);
      if (f > W.zoo - 4) fx("zs", 1024, 512, signDraw(["ZOO DE", "EDIMBURGO"], "#2a4a2a", "#f2ece0"), Z - 2.8, 2.2, -2.1, 1.6, 0.8);
    }
  }
}
