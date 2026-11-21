// "La cigüeña flecha" (Pfeilstorch, Klütz 1822): village (x=0), lake with mud (LAK), moon set (MOON, high), field with the hunter (HUN), university (UNI).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { burstDraw, pigeonDraw } from "./beasts";
import { grassGround, flatGround, tree, house, seaPlane, textDraw, labelDraw, docDraw, signDraw, qDraw, exDraw, ctaDraw, bubbleDraw, storkDraw } from "./props";
import { S, W, LAK, HUN, UNI, flyX, smooth } from "./story";

const FOLK = (v: number): Outfit => { const o: Outfit = { jacket: ["#5a3a2a", "#2a3a4a", "#6a5a3a", "#7a2a3a", "#3a4a3a"][v % 5], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 4] }; return v % 3 === 1 ? { ...o, hat: "bonnet", dress: ["#c25a7a", "#5a8fc2", "#d9a441"][v % 3] } : { ...o, hat: v % 2 ? "tophat" : "cap", cap: "#3a3a3a", moustache: v % 4 ? undefined : "#3a2a1a" }; };
const HUNTER: Outfit = { jacket: "#3a5a3a", pants: "#5a4a3a", boots: "#2a2020", hat: "slouch", cap: "#3a4a2a", skin: SKINS[0], belt: "#3a2a1a", rifle: true, moustache: "#6a4a2a", beard: "#6a4a2a" };
const PROF: Outfit = { jacket: "#2a2a30", pants: "#2a2a30", boots: "#111", hat: "tophat", skin: SKINS[0], belt: null, beard: "#d8d8d8", moustache: "#d8d8d8" };
const moonDraw = (p: Pen) => { p.ell(256, 256, 230, 230, "#f4ecc8", 8); for (const [x, y, r] of [[180, 180, 40], [300, 300, 55], [320, 160, 28]]) p.ell(x, y, r, r, "#d8cca0", 4); };
const mudDraw = (p: Pen) => { p.ell(256, 300, 240, 120, "#5a4a32", 6); p.ell(200, 260, 30, 18, "#3a2e1e", 0); p.ell(330, 330, 40, 20, "#3a2e1e", 0); };
const mapDraw = (k: number) => (p: Pen) => {
  p.poly([[16, 16], [496, 16], [496, 680], [16, 680]], "#cfe6f2", 8);
  p.poly([[150, 60], [380, 50], [420, 160], [330, 230], [180, 220], [130, 140]], "#c8d8a0", 5); // Europe
  p.poly([[140, 300], [380, 290], [440, 420], [360, 640], [280, 660], [210, 520], [130, 400]], "#e8d49a", 5); // Africa
  const a: [number, number] = [300, 460], b: [number, number] = [270, 120];
  for (let i = 0; i < 12; i++) { const u = i / 12; if (u > k) break; p.ell(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, 7, 7, "#c8202a", 0); }
  p.ell(b[0], b[1], 14, 14, "#1a1a1e", 4); p.ell(a[0], a[1], 14, 14, "#c8202a", 4);
  p.g.fillStyle = "#1a1a1e"; p.g.font = "bold 34px Arial"; p.g.textAlign = "left"; p.g.fillText("Klütz", b[0] + 20, b[1] + 10); p.g.fillText("África", a[0] + 22, a[1] + 10);
};

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#9ab86a");
    for (let k = 0; k < 7; k++) house(R, -12 + k * 4, -6, 3.6, 3.2 + (k % 3) * 0.6, 3.6, ["#f2ece0", "#e8d8c0", "#d8c0a8"][k % 3], "#a83a2a");
    for (let k = 0; k < 5; k++) box(R, 0.15, 1.2, 0.15, lamC("#5a3a2a"), -12 + k * 6 + 2, 2.6, -6.2);
    flatGround(R, 30, 8, "#c8b890", 0, 0, 0.01);
    for (let k = 0; k < 14; k++) tree(R, -40 + k * 12, -18 - (k % 3) * 5, 1.4, "#4a7a3a");
    const sea = seaPlane(R, -0.05, "#4a8ab0"); sea.position.set(LAK[0], 0, -6); sea.scale.set(0.006, 1, 0.004);
    flatGround(R, 10, 6, "#8a7a52", LAK[0], 1.0, 0.02);
    for (let k = 0; k < 4; k++) tree(R, HUN[0] - 6 + k * 4, -6, 1.3, "#5a8a3a");
    box(R, 14, 5, 0.2, lamC("#e8e2d6"), UNI[0], 2.5, -2.5); flatGround(R, 14, 8, "#a87a5a", UNI[0], 0, 0.013);
    box(R, 1.2, 1.0, 1.0, lamC("#3a2a1a"), UNI[0], 0.5, -0.8); box(R, 1.6, 2.2, 1.2, new THREE.MeshLambertMaterial({ color: "#cfe8f4", transparent: true, opacity: 0.25 }), UNI[0], 2.1, -0.8);
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const ph = (t * 2) % 1;
    const fly = (x: number, y: number, z: number, sz = 1.6, spear = true) => fx(`st|${Math.floor(ph * 6)}|${spear}`, 512, 512, storkDraw(Math.floor(ph * 6) / 6, true, spear), x, y, z, sz, sz);
    if (id === S.hook || id === S.end || id === S.appear) {
      fly(flyX(f), 5 + Math.sin(t * 2) * 0.2, 0);
      if (id === S.appear) for (let k = 0; k < 5; k++) person(`f${k}`, FOLK(k), flyX(f) - 3 + k * 1.3, 0, 1.6, { mode: "stand", expr: f > W.volando - 4 ? "shock" : "neutral", facing: 0, wave: k % 2 ? 0.95 : undefined }, 10 + k);
    }
    if (id === S.village) {
      for (let k = 0; k < 6; k++) person(`f${k}`, FOLK(k), -3 + k * 1.2, 0, 0.6 - (k % 2) * 0.5, { mode: "stand", expr: "nervous", facing: 0 }, 10 + k);
      if (f > W.invierno - 6) for (let k = 0; k < 3; k++) fx(`q${k}`, 256, 256, qDraw, -2 + k * 2, 2.6 + Math.sin(t * 3 + k) * 0.1, 0.5, 0.45, 0.45);
      fx("sign", 1024, 512, signDraw(["KLÜTZ"], "#f2e2b8", "#2a2a32"), 3.5, 2.0, -3.5, 1.6, 0.8);
    }
    if (id === S.mud) {
      fx("mud", 512, 512, mudDraw, LAK[0], 0.15, 1.2, 2.4, 2.4);
      fx(`stm`, 512, 512, storkDraw(0, false, false), LAK[0] + 0.2, 0.3 - smooth((f - W.barro + 6) / 30) * 0.9, 1.3, 1.4, 1.4);
      fx("bub1", 512, 256, bubbleDraw("¿EN EL BARRO?"), LAK[0] + 0.25, 2.0, 1.3, 1.4, 0.7);
    }
    if (id === S.change) {
      const k = Math.floor((f - W.convertian) / 8) % 2;
      if (k === 0) fx("sto", 512, 512, storkDraw(0, false, false), 0.8, 1.1, 0.5, 1.6, 1.6); else a.card("pig", 0.8, 0.5, 0.6, pigeonDraw(0), 1, 0);
      person("f0", FOLK(0), -0.8, 0, 0.6, { mode: "stand", expr: "shock", facing: 1 }, 1);
      fx("q", 256, 256, qDraw, 0.8, 2.3, 0.5, 0.4, 0.4);
    }
    if (id === S.moon) {
      fx("moon", 512, 512, moonDraw, 0, 32, -60, 28, 28);
      fly(-2 + (f - W.luna + 30) * 0.06, 6 + (f - W.luna + 30) * 0.05, -6, 2.2, false);
      if (f > W.luna - 4) fx("luna", 512, 200, textDraw("¡A LA LUNA!", "#ffd23f", 80), 0, 4.2, 0, 2.4, 0.95);
    }
    if (id === S.hunter) {
      const shot = f > W.abate - 3, x = HUN[0] + 1.2;
      person("hun", HUNTER, HUN[0] - 0.8, 0, 0.6, { mode: "stand", expr: f > W.alucina - 4 ? "shock" : "stern", facing: 1, wave: shot && f < W.abate + 20 ? 0.95 : undefined }, 1);
      if (shot && f < W.abate + 4) fx("bang", 256, 256, burstDraw(), HUN[0] - 0.2, 2.0, 0.7, 0.6, 0.6);
      if (!shot) fly(x, 3.8, -0.5, 1.4); else fx("dead", 512, 512, storkDraw(0, false, true, true), x, Math.max(0.45, 3.8 - (f - W.abate) * 0.2), 0.2, 1.4, 1.4);
      if (f > W.africa - 6) fx("lab", 512, 160, labelDraw("LANZA AFRICANA", "#7a5a3a"), x, 1.6, 0.5, 1.0, 0.31);
    }
    if (id === S.map) { const k = smooth((f - W.miles + 20) / 50); fx(`map|${Math.round(k * 12)}`, 512, 700, mapDraw(k), 0, 2.0, 0, 2.2, 3.0); if (f > W.miles - 4) fx("km", 512, 200, textDraw("+5.000 km", "#ffd23f", 100), 0, 3.35, 0.3, 1.6, 0.62); }
    if (id === S.museum) {
      fx("disp", 512, 512, storkDraw(0, false, true), UNI[0], 1.75, -0.8, 1.6, 1.6);
      person("prof", PROF, UNI[0] + 1.6, 0, 0.2, { mode: "stand", expr: "grin", facing: -1, wave: 0.7 }, 1);
      if (f > W.migran - 6) fx("mig", 512, 200, textDraw("¡MIGRAN!", "#8ae86a", 100), UNI[0] - 0.1, 3.75, -1, 1.5, 0.58);
      if (f > W.flecha - 6) fx("name", 512, 160, labelDraw("CIGÜEÑA FLECHA", "#c8202a"), UNI[0], 3.4, -0.6, 1.2, 0.38);
      if (f > W.universidad - 6) fx("uni", 512, 620, docDraw("UNIVERSIDAD", "", "de Rostock"), UNI[0] - 2.4, 1.9, -2.2, 0.8, 0.97);
    }
    if (id === S.cta) {
      fly(0.2, 1.6 + Math.sin(t * 2) * 0.1, 0.5, 1.5);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.4, 2.2, 1.1);
    }
  }
}
