// "Karánsebes 1788": a big Austrian camp on a plain (tents along x, campfires), the drinking corner (BAR), the Turkish approach (TUR).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { burstDraw } from "./beasts";
import { grassGround, flatGround, tree, textDraw, labelDraw, smokeDraw, fireDraw, noteDraw, exDraw, qDraw, ctaDraw, bubbleDraw, barrelDraw, flagDraw } from "./props";
import { S, W, BAR, TUR, smooth } from "./story";

const INF = (v: number): Outfit => ({ jacket: "#f2efe6", pants: "#f2efe6", boots: "#1a1a1a", hat: v % 3 ? "bicorne" : "shako", skin: SKINS[v % 4], belt: "#1a1a1a", buttons: "#e8c45a", rifle: true, moustache: v % 2 ? "#3a2a1a" : undefined });
const HUS = (v: number): Outfit => ({ jacket: "#2a4a8a", pants: "#c8202a", boots: "#1a1a1a", hat: "shako_tall", skin: SKINS[(v + 1) % 4], belt: "#e8c45a", buttons: "#e8c45a", sash: "#e8c45a", sword: true, moustache: "#2a1a10" });
const OFF: Outfit = { jacket: "#f2efe6", pants: "#2a2a30", boots: "#1a1a1a", hat: "bicorne", skin: SKINS[0], belt: null, buttons: "#e8c45a", sash: "#c8202a", sword: true, moustache: "#5a4a3a", build: "stout" };
const FARM = (v: number): Outfit => ({ jacket: ["#7a5a3a", "#5a4a3a", "#8a6a4a"][v % 3], pants: "#4a3a2a", boots: "#2a2020", hat: "slouch", cap: "#5a4a3a", skin: SKINS[v % 4], belt: null, moustache: "#2a1a10", beard: v % 2 ? "#3a2a1a" : undefined });
const TURK = (v: number): Outfit => ({ jacket: "#c8202a", pants: "#2a5a3a", boots: "#2a2020", hat: "persian", cap: "#f2efe6", skin: SKINS[(v + 2) % 4], belt: "#e8c45a", sword: true, moustache: "#1a1a1a", beard: v % 2 ? "#1a1a1a" : undefined });

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b070");
    const canvas = lamC("#efe8d8"), pole = lamC("#6a4a2a");
    for (let k = 0; k < 60; k++) { const x = -40 + (k % 20) * 5 + (Math.floor(k / 20) % 2) * 2.5, z = -6 - Math.floor(k / 20) * 6; const t = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.4, 4), canvas); t.position.set(x, 1.2, z); t.rotation.y = Math.PI / 4; t.castShadow = true; R.add(t); }
    void pole;
    for (let k = 0; k < 10; k++) tree(R, -60 + k * 14, -34 - (k % 3) * 6, 1.6, "#5a7a3a");
    flatGround(R, 80, 30, "#9a8a5a", 0, -12, 0.01);
    // drinking corner: barrels and a cart
    for (let k = 0; k < 3; k++) { const b = cyl(R, 0.45, 0.45, 0.9, lamC("#9a6a3a"), BAR[0] - 1.6 + k * 0.95, 0.45, -1.4, 12); void b; }
    box(R, 2.6, 0.6, 1.4, lamC("#7a5a3a"), BAR[0] + 2.4, 0.7, -1.8); for (const dx of [-1, 1]) { const w = cyl(R, 0.5, 0.5, 0.12, lamC("#4a3a2a"), BAR[0] + 2.4 + dx, 0.5, -1.0, 12); w.rotation.x = Math.PI / 2; }
    // Turkish side: hills
    for (let k = 0; k < 5; k++) { const h = new THREE.Mesh(new THREE.SphereGeometry(18, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), lamC("#9aa060")); h.position.set(TUR[0] - 40 + k * 22, -6, -40); h.scale.set(1, 0.5, 1); R.add(h); }
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const fires = (x0: number, n: number) => { for (let k = 0; k < n; k++) fx(`fire${k}|${Math.floor(t * 8 + k) % 3}`, 256, 256, fireDraw(Math.floor(t * 8 + k) % 3), x0 + k * 7, 0.45, -2.5 - (k % 2) * 3, 0.9, 0.9); };
    const flash = (k: string, x: number, y: number, z: number, fr: number) => { const d = (f - fr) % 18; if (d >= 0 && d < 4) fx(`fl${k}`, 256, 256, burstDraw(d < 2 ? "#fff3b0" : "#ffb04a"), x, y, z, 0.5, 0.5); };
    const battle = (x0: number, dense = 1) => {
      for (let k = 0; k < 10 * dense; k++) { const side = k % 2 ? 1 : -1; const x = x0 + side * (0.75 + (Math.floor(k / 2) % 5) * 0.75), z = -0.4 - Math.floor(k / 10) * 1.6 - (Math.floor(k / 2) % 5) * 0.5;
        person(`s${k}`, k % 4 === 3 ? HUS(k) : INF(k), x, 0, z, { mode: "stand", expr: k % 3 ? "shout" : "shock", facing: (side > 0 ? -1 : 1) as 1 | -1 }, 10 + k); flash(`${k}`, x - side * 0.55, 1.35, z + 0.2, k * 5); }
      for (let k = 0; k < 4; k++) fx(`sm${k}|${Math.floor(t * 3 + k) % 3}`, 256, 256, smokeDraw(Math.floor(t * 3 + k) % 3), x0 - 3 + k * 2, 2.2 + Math.sin(t + k) * 0.2, -2 - (k % 2), 2.4, 2.4, true);
      fires(x0 - 7, 3);
    };
    if (id === S.hook || id === S.chaos || id === S.end) battle(0);
    if (id === S.camp) { for (let k = 0; k < 24; k++) person(`c${k}`, INF(k), -8 + (k % 12) * 1.4, 0, 1.0 - Math.floor(k / 12) * 1.4, { mode: "march", phase: t * 2 + (Math.floor(k / 12)) * 0.5, expr: "stern", facing: 1 }, 10 + k); fx("fl", 512, 320, flagDraw(["#1a1a1a", "#e8c42a"]), 4, 3.6, -1, 1.4, 0.9); }
    if (id === S.wait) { for (let k = 0; k < 7; k++) person(`w${k}`, INF(k), -3 + k * 1.0, 0, 0, { mode: "stand", expr: k % 2 ? "nervous" : "stern", facing: 0 }, 10 + k); if (f > W.turcos - 4) fx("q", 256, 256, qDraw, 0, 2.6, 0, 0.5, 0.5); }
    if (id === S.meet || id === S.party) {
      const party = id === S.party;
      for (let k = 0; k < 4; k++) person(`h${k}`, HUS(k), BAR[0] - 2.2 + k * 0.8 + (party ? Math.sin(t * 6 + k) * 0.1 : 0), party ? Math.abs(Math.sin(t * 6 + k)) * 0.12 : 0, 0.2 + (k % 2) * 0.4, { mode: "stand", expr: party ? "laugh" : "grin", facing: 1, wave: party ? 0.6 + Math.sin(t * 7 + k) * 0.35 : undefined }, 1 + k);
      for (let k = 0; k < 2; k++) person(`p${k}`, FARM(k), BAR[0] + 1.6 + k * 0.8, 0, -0.2, { mode: "stand", expr: "grin", facing: -1, wave: !party && f > W.aguardiente - 4 ? 0.8 : undefined }, 6 + k);
      if (f > W.aguardiente - 6 || party) fx("brl", 256, 384, barrelDraw(party, "XXX"), BAR[0] + 0.9, 0.55, 0.6, 0.6, 0.9);
      if (party) { for (let k = 0; k < 3; k++) fx(`n${k}|${Math.floor(t * 4 + k) % 2}`, 256, 256, noteDraw(Math.floor(t * 4 + k) % 2), BAR[0] - 1.6 + k * 1.1, 2.5 + Math.sin(t * 3 + k) * 0.15, 0.3, 0.4, 0.4); fires(BAR[0] - 3, 1); }
      if (!party && f > W.campesinos - 4) fx("lab", 512, 160, labelDraw("AGUARDIENTE", "#7a5a3a"), BAR[0] + 0.9, 1.5, 0.7, 0.7, 0.22);
    }
    if (id === S.fight) {
      for (let k = 0; k < 3; k++) person(`h${k}`, HUS(k), BAR[0] - 1.6 + k * 0.7, 0, 0.3, { mode: "stand", expr: f > W.no - 4 ? "shout" : "laugh", facing: 1, wave: f > W.no - 4 ? 0.9 : undefined }, 1 + k);
      for (let k = 0; k < 3; k++) person(`i${k}`, INF(k), BAR[0] + 1.0 + k * 0.7 - smooth((f - W.infanteria) / 30) * 0.4, 0, 0.1, { mode: f < W.infanteria + 30 ? "march" : "stand", phase: t * 2, expr: f > W.peleas - 4 ? "shout" : "grin", facing: -1 }, 5 + k);
      fx("brl", 256, 384, barrelDraw(true), BAR[0] + 0.2, 0.45, 0.9, 0.5, 0.75);
      if (f > W.no - 4 && f < W.peleas - 4) fx("no", 512, 256, bubbleDraw("¡NO!"), BAR[0] - 1.0, 2.6, 0.4, 0.9, 0.45);
      if (f > W.peleas - 4) for (let k = 0; k < 3; k++) { const d = (f + k * 5) % 12; if (d < 5) fx(`p${k}`, 256, 256, burstDraw(), BAR[0] + 0.3 + k * 0.4 - 0.4, 1.5 + k * 0.2, 0.6, 0.55, 0.55); }
    }
    if (id === S.shot) {
      for (let k = 0; k < 6; k++) person(`s${k}`, k % 2 ? HUS(k) : INF(k), -2.5 + k, 0, 0.2 - (k % 2) * 0.5, { mode: "stand", expr: f > W.vienen - 4 ? "shock" : "nervous", facing: 0 }, 10 + k);
      if (f > W.dispara - 3 && f < W.dispara + 6) fx("bang", 256, 256, burstDraw("#fff3b0"), 1.4, 1.6, 0.5, 1.4, 1.4);
      if (f > W.grita - 4) fx("tur", 512, 256, bubbleDraw("¡TURCOS!", "#ffd23f"), -0.8, 2.75, 0.4, 1.3, 0.65);
    }
    if (id === S.halt) {
      person("off", OFF, -0.9, 0, 0, { mode: "stand", expr: "shout", facing: 1, wave: 0.95 }, 1);
      person("sol", INF(5), 1.0, 0, -0.2, { mode: "stand", expr: f > W.ala - 4 ? "shock" : "nervous", facing: -1 }, 2);
      if (f > W.halt - 4) fx("halt", 512, 256, bubbleDraw("¡HALT!"), -1.3, 2.75, 0.3, 1.1, 0.55);
      if (f > W.ala - 4) fx("ala", 512, 256, bubbleDraw("¿¡ALÁ!?", "#ff6a5a", "#ffffff"), 1.3, 2.75, 0.2, 1.1, 0.55);
    }
    if (id === S.turks) {
      for (let k = 0; k < 8; k++) person(`t${k}`, TURK(k), TUR[0] - 3 + k * 0.9, 0, -1.6 - (k % 2) * 0.8, { mode: f < W.llegan + 20 ? "march" : "stand", phase: t * 2, expr: f > W.vacio - 4 ? "shock" : "stern", facing: 0 }, 10 + k);
      for (let k = 0; k < 6; k++) person(`x${k}`, INF(k + 2), TUR[0] - 2.5 + k * 1.1, 0, 1.2, { mode: "sit", expr: k % 2 ? "pained" : "dazed", facing: 0 }, 20 + k);
      if (f > W.vacio - 4) fx("q", 256, 256, qDraw, TUR[0], 2.9, -1.4, 0.5, 0.5);
      fires(TUR[0] - 6, 2);
    }
    if (id === S.cta) {
      person("off", OFF, 0, 0, 0, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.4, 2.2, 1.1);
    }
  }
}
