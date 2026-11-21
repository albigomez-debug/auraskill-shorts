// "La fuga de Alcatraz": a night bay with the prison island (BAY, x = 60) and the cell block (origin). Blue moonlit look.
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { ctex, rep } from "./paint";
import { flatGround, docDraw, ctaDraw, exDraw, qDraw, zDraw, labelDraw } from "./props";
import { smooth } from "./story";
import { S, W, BAY } from "./story";

const CON = (v: number): Outfit => ({ jacket: "#e8e8f0", pants: "#3a4a6a", boots: "#1a1a1e", hat: "hair", hair: ["#3a2a1a", "#8a5a2a", "#2a1a10"][v], skin: SKINS[v % 4], belt: null, buttons: "#888" });
const GUARD: Outfit = { jacket: "#2a2a3a", pants: "#2a2a3a", boots: "#111", hat: "cap", cap: "#2a2a3a", skin: SKINS[1], belt: "#1a1a1a", buttons: "#e8c45a", moustache: "#3a2a1a" };
const headDraw = (hair: string) => (p: Pen) => { p.ell(128, 140, 80, 92, "#e8b890", 7); p.poly([[50, 120], [60, 50], [128, 30], [196, 50], [206, 120], [180, 80], [80, 80]], hair, 6); p.arc(100, 140, 16, 8, 0, 180, 5); p.arc(156, 140, 16, 8, 0, 180, 5); p.arc(128, 185, 14, 6, 0, 180, 5); };
const ventDraw = (open: number) => (p: Pen) => { p.poly([[20, 20], [236, 20], [236, 236], [20, 236]], open > 0.5 ? "#1a1a22" : "#7a7a84", 8); if (open < 0.5) for (let k = 0; k < 6; k++) p.stroke([[40, 50 + k * 32], [216, 50 + k * 32]], 8, "#3a3a42"); else p.poly([[50, 50], [206, 50], [206, 206], [50, 206]], "#0a0a10", 0); };
const spoonDraw = (p: Pen) => { p.stroke([[40, 220], [170, 90]], 14, "#c8c8d0"); p.ell(190, 70, 34, 24, "#c8c8d0", 5); };
const dustDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 8; j++) p.ell(40 + ((j * 53 + k * 29) % 180), 60 + ((j * 37 + k * 41) % 160), 6 + (j % 3) * 3, 6 + (j % 3) * 3, "#c8c0b0", 0); };
const raftDraw = (p: Pen) => { p.ell(512, 330, 470, 110, "#c8a83a", 10); p.ell(512, 300, 400, 70, "#e8c84a", 6); for (let k = 0; k < 7; k++) p.stroke([[150 + k * 120, 250], [130 + k * 120, 390]], 5, "#8a6a1a"); };
const lightDraw = (p: Pen) => { const g = p.g, gr = g.createLinearGradient(0, 0, 1024, 0); gr.addColorStop(0, "rgba(255,250,200,0.7)"); gr.addColorStop(1, "rgba(255,250,200,0)"); g.fillStyle = gr; g.beginPath(); g.moveTo(0, 230); g.lineTo(1024, 0); g.lineTo(1024, 512); g.lineTo(0, 282); g.fill(); };
const torchDraw = (p: Pen) => { const g = p.g, gr = g.createRadialGradient(40, 128, 10, 40, 128, 240); gr.addColorStop(0, "rgba(255,245,190,0.8)"); gr.addColorStop(1, "rgba(255,245,190,0)"); g.fillStyle = gr; g.beginPath(); g.moveTo(30, 128); g.lineTo(512, 0); g.lineTo(512, 256); g.fill(); };
const barsDraw = (p: Pen) => { for (let k = 0; k < 7; k++) p.band([[20 + k * 80, 0], [20 + k * 80, 512]], "#4a4a54", 12, 3); p.band([[0, 30], [512, 30]], "#4a4a54", 14, 3); p.band([[0, 300], [512, 300]], "#4a4a54", 10, 3); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    this.L = { ...this.L, el: 40, lit: [0.72, 0.8, 1.15], shade: [0.16, 0.18, 0.3], lift: [0.03, 0.04, 0.1], sunCol: "#b8c8ff", sunI: 1.6, hemiI: 0.35, sky: "#5a6a9a", ground: "#1a2030", charTint: [0.8, 0.86, 1.0], fog: "#1c2648" };
    this.K = { ...this.K, sky: { c: ["#2a3460", "#1c2650", "#141c40", "#0e1434", "#080c24"], e: [0, 3, 8, 16, 40] } };
    this.fogNear = 60; this.fogFar = 380;
    for (const m of (this as unknown as { clouds: THREE.Mesh[] }).clouds) m.visible = false;
    const seaTex = ctex("nsea", 256, 256, (g, r) => { g.fillStyle = "#1a3050"; g.fillRect(0, 0, 256, 256); for (let k = 0; k < 160; k++) { g.fillStyle = `rgba(160,200,255,${r() * 0.18})`; g.fillRect(r() * 256, r() * 256, 8 + r() * 24, 2); } });
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(seaTex, 900, 900), color: "#5a7aa8" }));
    sea.position.y = 0; sea.receiveShadow = true; R.add(sea);
    // the island and the prison
    const I = BAY[0];
    const rock = new THREE.Mesh(new THREE.CylinderGeometry(26, 34, 8, 9), lamC("#4a4a52")); rock.position.set(I, 1, -44); R.add(rock);
    box(R, 30, 6, 10, lamC("#c8c4b8"), I, 8, -44); for (let k = 0; k < 10; k++) box(R, 1.2, 1.6, 0.1, lamC("#ffe8a0"), I - 13 + k * 2.9, 8.4, -38.9);
    cyl(R, 0.8, 1.1, 14, lamC("#e8e4d8"), I + 18, 12, -40, 8); box(R, 2, 1.6, 2, lamC("#fff6b0"), I + 18, 19.6, -40);
    // the cell block
    flatGround(R, 14, 12, "#6a6a72", 0, 0, 0.04);
    box(R, 3.0, 3, 0.2, lamC("#8a8a94"), 0, 1.5, -1.5); for (const dx of [-1.5, 1.5]) box(R, 0.2, 3, 2.8, lamC("#7a7a84"), dx, 1.5, -0.1);
    box(R, 14, 3, 0.2, lamC("#5a5a64"), 0, 1.5, 6);
    box(R, 0.9, 0.35, 1.9, lamC("#5a5a62"), 0.9, 0.3, -0.45); box(R, 0.8, 0.12, 1.8, lamC("#d8d8e0"), 0.9, 0.53, -0.45);
    box(R, 0.7, 0.05, 0.4, lamC("#6a5a4a"), -0.9, 0.75, -1.2);
    for (const dx of [-4.5, 4.5]) { box(R, 3.0, 3, 0.2, lamC("#8a8a94"), dx, 1.5, -1.5); box(R, 0.2, 3, 2.8, lamC("#7a7a84"), dx + (dx < 0 ? -1.5 : 1.5), 1.5, -0.1); }
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const raft = (x: number, scared = false) => {
      fx("raft", 1024, 512, raftDraw, x, 0.15, 0.3, 2.2, 1.1);
      for (let k = 0; k < 3; k++) person(`c${k}`, CON(k), x - 0.55 + k * 0.55, 0.08, 0, { mode: "stand", expr: scared ? "nervous" : k === 1 ? "grin" : "shock", facing: 1, wave: (Math.round(t * 2) + k) % 2 ? 0.7 : undefined }, 1 + k, false);
    };
    if (id === S.hook || id === S.end) {
      raft(BAY[0] + Math.sin(t) * 0.05, id === S.hook);
      fx("search", 1024, 512, lightDraw, BAY[0] - 2.5, 2.4 + Math.sin(t * 0.8) * 0.4, -3, 6, 3);
      if (id === S.end && f > W.suscribete - 4 && f < W.alcatraz - 6) { const pr = smooth((f - W.suscribete) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), BAY[0], 1.75, 0.5, 0.9, 0.45); }
    }
    if (id === S.island) fx("search", 1024, 512, lightDraw, BAY[0] + 6, 10, -36, 22, 11);
    if (id === S.plan) {
      for (let k = 0; k < 3; k++) person(`c${k}`, CON(k), -0.6 + k * 0.6, 0, -0.3 + (k % 2) * 0.3, { mode: "stand", expr: k === 1 ? "grin" : "stern", facing: k === 0 ? 1 : k === 2 ? -1 : 0 }, 1 + k);
      if (f > W.plan - 4) fx("q", 256, 256, labelDraw("PLAN", "#c8323a"), 0, 2.15, 0, 0.6, 0.19);
    }
    if (id === S.dig) {
      fx(`vent|${f > W.rejilla + 10 ? 1 : 0}`, 256, 256, ventDraw(f > W.rejilla + 10 ? 1 : 0), -0.85, 0.45, -1.38, 0.5, 0.5);
      person("c0", CON(0), -0.2, 0, -0.6, { mode: "sit", expr: "stern", facing: -1, wave: 0.4 + 0.2 * Math.sin(t * 14) }, 1);
      fx("spoon", 256, 256, spoonDraw, -0.55 + Math.sin(t * 14) * 0.03, 0.55, -1.0, 0.22, 0.22);
      fx(`dust|${Math.floor(f / 4) % 5}`, 256, 256, dustDraw(Math.floor(f / 4) % 5), -0.7, 0.35, -1.1, 0.4, 0.4);
    }
    if (id === S.heads) {
      if (f < W.cama - 6) {
        person("c1", CON(1), 0.0, 0, -0.5, { mode: "stand", expr: "grin", facing: 1, wave: 0.6 }, 2);
        const items: [number, string][] = [[W.papel, "PAPEL"], [W.jabon, "JABÓN"], [W.pelo, "PELO"]];
        for (const [k, [w, s]] of items.entries()) if (f > w - 4) fx(`lab${k}`, 512, 160, labelDraw(s, ["#8a7a5a", "#5a8aa8", "#6a4a2a"][k]), 0.5, 1.9 - k * 0.22, -0.2, 0.5, 0.16);
        if (f > W.cabezas - 4) fx("head", 256, 256, headDraw("#3a2a1a"), 0.45, 1.05, -0.3, 0.32 * smooth((f - W.cabezas + 4) / 12) + 0.01, 0.32 * smooth((f - W.cabezas + 4) / 12) + 0.01);
      } else fx("headbed", 256, 256, headDraw("#3a2a1a"), 0.9, 0.72, -1.1, 0.3, 0.3);
    }
    if (id === S.guards) {
      fx("bars", 512, 512, barsDraw, 0, 1.4, 1.35, 3.0, 3.0);
      fx("headbed", 256, 256, headDraw("#3a2a1a"), 0.9, 0.72, -1.1, 0.3, 0.3);
      fx(`z|${Math.round(t * 2) % 2}`, 256, 256, zDraw, 1.0, 1.15 + 0.06 * (Math.round(t * 2) % 2), -1.0, 0.45, 0.45);
      if (f > W.guardias - 10) { const gx = -1.8 + (f - W.guardias + 10) * 0.03; person("guard", GUARD, gx, 0, 2.2, { mode: "stroll", phase: t * 5, expr: "neutral", facing: 1 }, 3); fx("torch", 512, 256, torchDraw, gx + 0.9, 1.0, 1.6, 1.6, 0.8, true); }
    }
    if (id === S.escape) {
      const x = BAY[0] + (f - 694) * 0.012;
      raft(x);
      fx("search", 1024, 512, lightDraw, BAY[0] - 6 + (f - 694) * 0.03, 2.8, -3, 6, 3);
      if (f > W.chubasqueros - 4) fx("lab", 512, 160, labelDraw("50 CHUBASQUEROS", "#c8a83a"), x, 0.6, 0.6, 1.0, 0.32);
    }
    if (id === S.morning) {
      const fall = smooth((f - W.cae) / 10);
      fx("head", 256, 256, headDraw("#3a2a1a"), 0.9 + fall * 0.2, 0.72 - fall * 0.54, -1.1 + fall * 1.85, 0.3, 0.3);
      person("guard", GUARD, -0.05, 0, 0.3, { mode: "stand", expr: f > W.cae ? "shock" : "neutral", facing: 1 }, 3);
      if (f > W.cae + 4) fx("ex", 256, 256, exDraw, -0.05, 2.1, 0.4, 0.4, 0.4);
    }
    if (id === S.fbi) {
      fx("raft", 1024, 512, raftDraw, BAY[0] + 0.6, 0.05, -1.0, 1.6, 0.8);
      if (f < W.cuerpo - 10) fx("doc", 512, 620, docDraw("FBI", "CERRADO", "se ahogaron"), BAY[0], 1.1, 0.4, 0.75, 0.9);
      else fx("q", 256, 256, qDraw, BAY[0], 1.0, 0.4, 0.7, 0.7);
    }
  }
}
