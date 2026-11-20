// "Sargento Stubby": the US camp (x = 0), the troop ship at sea (SEA), the trench in France (TR) and the medal ceremony (HQ).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, tree, sailShip, exDraw, heartDraw, flagDraw, labelDraw, textDraw } from "./props";
import { dogDraw } from "./beasts";
import { S, W, HQ, SEA, TR } from "./story";

const DOUGH = (v: number): Outfit => ({ jacket: "#6a6a3a", pants: "#5a5a32", boots: "#3a2a20", hat: "slouch", skin: SKINS[v % 3], belt: "#5a4024", rifle: v % 2 === 1 });
const CONROY: Outfit = { ...DOUGH(0), rifle: false, hat: "cap", cap: "#5a5a32" };
const OFFICER: Outfit = { jacket: "#5a5a32", pants: "#6a5a3a", boots: "#2a1a10", hat: "cap", cap: "#5a5a32", skin: SKINS[0], buttons: "#e8c45a", moustache: "#8a6a4a", belt: "#5a4024", build: "stout" };
const SPY: Outfit = { jacket: "#7a7e82", pants: "#6a6e72", boots: "#1a1a1e", hat: "cap", cap: "#6a6e72", skin: SKINS[0], moustache: "#c8a060", belt: "#2a2a2a" };
const PRES = (v: number): Outfit => ({ jacket: "#2a2a32", pants: "#2a2a32", boots: "#111", hat: v === 1 ? "hair" : "tophat", hair: "#c8c8c8", skin: SKINS[0], moustache: v === 2 ? "#5a4a3a" : undefined, belt: null });
const usFlag = flagDraw(["#b22234", "#f4f1ea", "#b22234", "#f4f1ea", "#b22234", "#f4f1ea", "#b22234"], false, (p) => { p.g.fillStyle = "#3c3b6e"; p.g.fillRect(16, 16, 210, 155); for (let k = 0; k < 12; k++) p.dot(40 + (k % 4) * 52, 40 + Math.floor(k / 4) * 50, 8, "#f4f1ea"); });
const gasDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 6; j++) p.ell(128 + Math.sin(j * 2 + k) * 60, 140 + Math.cos(j * 1.7 + k) * 45, 62 + j * 5, 48 + j * 4, j % 2 ? "#a8c45a" : "#c8dc7a", 0); };
const medalDraw = (p: Pen) => { p.poly([[100, 20], [156, 20], [150, 120], [106, 120]], "#c8323a", 6); p.ell(128, 170, 62, 62, "#e8c45a", 8); p.g.fillStyle = "#8a6a10"; p.g.font = "bold 70px Arial"; p.g.textAlign = "center"; p.g.fillText("★", 128, 195); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // camp: tents and a flag pole
    for (let k = 0; k < 4; k++) { const t = new THREE.Mesh(new THREE.ConeGeometry(1.8, 2, 4), lamC("#9a9a6a")); t.rotation.y = Math.PI / 4; t.position.set(-5 + k * 3.4, 1.0, -4.5); t.castShadow = true; R.add(t); }
    cyl(R, 0.05, 0.05, 5, lamC("#d8d0c0"), 3.2, 2.5, -2.5, 6);
    for (let k = 0; k < 5; k++) tree(R, -9 + k * 4.5, -9, 1);
    // sea and troop ship
    flatGround(R, 60, 160, "#2f8ab0", SEA[0], SEA[2] - 20, 0.02);
    sailShip(R, SEA[0], SEA[2], 1, "#4a4e56", 2);
    // trench: mud floor, earth wall, sandbags, duckboards
    const mud = lamC("#6a4a32");
    flatGround(R, 40, 8, "#7a5a3e", TR[0], TR[2] - 1, 0.01);
    box(R, 40, 1.6, 0.6, mud, TR[0], 0.8, TR[2] - 1.6);
    for (let k = 0; k < 50; k++) box(R, 0.7, 0.28, 0.4, lamC(["#b8a478", "#a8946a"][k % 2]), TR[0] - 19.5 + (k % 25) * 1.6 + (k > 24 ? 0.8 : 0), 1.75 + (k > 24 ? 0.28 : 0), TR[2] - 1.5);
    box(R, 40, 0.06, 0.8, lam({ map: rep(planksHD(), 20, 0.4), color: "#8a6a4a" }), TR[0], 0.04, TR[2] + 0.1);
    for (let k = 0; k < 8; k++) cyl(R, 0.05, 0.05, 1.8, lamC("#5a4030"), TR[0] - 18 + k * 5, 0.9, TR[2] - 1.25, 5);
    // ceremony stage
    box(R, 8, 0.3, 4, lam({ map: rep(planksHD(), 2, 1), color: "#a8784a" }), HQ[0], 0.15, HQ[2] - 0.8);
    box(R, 8, 3.5, 0.2, lamC("#2a3a6a"), HQ[0], 1.75, HQ[2] - 3);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const D = 0.4, wk = (Math.round(t * 8) % 8) * 0.785;
    const dog = (key: string, x: number, z: number, mode: "walk" | "sit" | "bark" | "salute" | "bite", extra: "none" | "coat" | "medal" | "both", dir = 1, y = 0) =>
      card(`dog|${key}|${mode}|${extra}|${mode === "walk" || mode === "bark" ? Math.round(t * 8) % 8 : 0}`, x, z, D, dogDraw(mode === "walk" || mode === "bark" ? wk : 0, mode, "stubby", extra), dir, 0, y);
    const H = HQ[0], T = TR[0], SX = SEA[0];
    if (id === S.hook || id === S.end) {
      fx("usf", 512, 320, usFlag, H - 1.6, 2.4, -2.8, 1.6, 1.0);
      dog("hero", H, 0, "salute", "both", 1, 0.3);
    }
    if (id === S.camp) {
      fx("usf", 512, 320, usFlag, 3.75, 4.6, -2.5, 1.1, 0.7);
      dog("stray", -3 + Math.min(1, (f - 90) / 80) * 3.4, 0, f < 172 ? "walk" : "sit", "none");
      for (let k = 0; k < 4; k++) person(`s${k}`, DOUGH(k), -2.4 + k * 1.6, 0, -2.2, { mode: "march", phase: t * 4 + k, expr: "stern", facing: 1 }, 10 + k);
    }
    if (id === S.adopt) {
      const got = f > W.adopta - 4;
      person("conroy", CONROY, -0.45, 0, -0.1, { mode: "stand", expr: got ? "grin" : "smile", facing: 1, wave: got && f < W.stubby + 20 ? 0.8 : undefined }, 1);
      dog("st", 0.45, 0.1, f > W.stubby - 2 ? "bark" : "sit", "none", -1);
      if (got) fx("heart", 256, 256, heartDraw, 0.45, 0.95 + Math.sin(t * 4) * 0.04, 0.2, 0.25, 0.25);
      if (f > W.stubby - 4) fx("name", 512, 160, labelDraw("STUBBY", "#c8323a"), 0, 2.2, 0.2, 0.9, 0.28);
    }
    if (id === S.deck) {
      const Y = 2.83, caught = f > W.pillan - 3, ok = f > W.queda - 4;
      person("conroy", CONROY, SX - 0.9, Y, 0.9, { mode: "stand", expr: caught && !ok ? "nervous" : "grin", facing: 1 }, 1);
      person("off", OFFICER, SX + 0.8, Y, 0.9, { mode: "stand", expr: ok ? "grin" : caught ? "stern" : "neutral", facing: -1, wave: ok ? 0.8 : undefined }, 2);
      dog("d", SX - 0.05, 1.1, f > W.saluda - 3 ? "salute" : "sit", "none", 1, Y);
      if (caught && f < W.saluda) fx("ex", 256, 256, exDraw, SX + 0.8, Y + 2.2, 1.0, 0.3, 0.3);
    }
    if (id === S.trench) {
      const gas = f > W.gas - 6, bark = f > W.ladra - 6;
      dog("d", T + 0.2, 0, bark ? "bark" : gas ? "sit" : "walk", "coat", 1);
      for (let k = 0; k < 3; k++) person(`s${k}`, DOUGH(k), T - 1.6 + k * 0.6 - (k === 2 ? -2.6 : 0), 0, -0.6, { mode: "stand", expr: bark ? "shock" : "dazed", facing: k === 2 ? -1 : 1 }, 10 + k);
      if (gas) for (let k = 0; k < 4; k++) { const x = T + 2.2 - Math.min(1.4, (f - W.gas) * 0.015) + k * 0.6; fx(`gas${(k + Math.floor(f / 12)) % 3}`, 256, 256, gasDraw((k + Math.floor(f / 12)) % 3), x, 0.9 + (k % 2) * 0.6, -0.9, 1.4, 1.4, true); }
      if (bark) fx("warn", 512, 200, textDraw("¡GAS!", "#c8dc4a", 120), T + 0.6, 1.6, 0.2, 0.6, 0.24);
    }
    if (id === S.wounded) {
      person("w", DOUGH(2), T + 6.3, 0, -0.3, { mode: "sit", expr: f > W.heridos + 10 ? "relief" : "pained", facing: -1 }, 1);
      dog("d", T + 5.3 + Math.min(0.4, (f - 536) * 0.01), 0.1, f < 575 ? "walk" : "bark", "coat", 1);
    }
    if (id === S.spy || id === S.grip) {
      const X = T + 12, held = id === S.grip || f > W.sujeta - 3;
      person("spy", SPY, X + 0.2, 0, -0.2, { mode: held ? "stand" : "stroll", phase: t * 5, expr: held ? "shock" : "nervous", facing: 1, look: held ? -1 : 0 }, 1);
      dog("d", X - 0.45, 0, held ? "bite" : "walk", "coat", 1);
      if (id === S.spy && f > W.espia - 4 && !held) fx("ex", 256, 256, exDraw, X + 0.2, 2.2, -0.1, 0.3, 0.3);
      if (id === S.spy && f > W.soldados - 6) for (let k = 0; k < 2; k++) person(`s${k}`, DOUGH(k + 1), X - 2 + k * 0.7 + Math.min(0.8, (f - W.soldados) * 0.03), 0, -0.6, { mode: "stand", expr: "grin", facing: 1 }, 3 + k);
    }
    if (id === S.years) {
      dog("d", T - 3 + (f - 682) * 0.025, 0, "walk", "coat", 1);
      for (let k = 0; k < 2; k++) person(`s${k}`, DOUGH(k), T - 2 + k * 2.4, 0, -0.7, { mode: "stand", expr: "dazed", facing: 1 }, 10 + k);
    }
    if (id === S.medals) {
      const Y = 0.3;
      fx("usf", 512, 320, usFlag, H, 3.0, -2.85, 1.4, 0.88);
      dog("d", H, 0, f > W.medallas - 3 ? "salute" : "sit", f > W.medallas - 3 ? "both" : "coat", 1, Y);
      if (f > W.medallas - 3 && f < W.presidentes) fx("med", 256, 256, medalDraw, H + 0.15, Y + 0.95, 0.2, 0.3, 0.3);
      if (f > W.presidentes - 4) for (let k = 0; k < 3; k++) person(`p${k}`, PRES(k), H - 0.9 + k * 0.9, Y, -1.4, { mode: "stand", expr: "grin", facing: 0, wave: Math.sin(t * 6 + k) * 0.4 + 0.5 }, 20 + k);
      if (f > W.presidentes - 4) fx("three", 512, 200, textDraw("3 PRESIDENTES", "#ffd23f", 70), H, 2.25, -0.4, 1.2, 0.47);
    }
  }
}
