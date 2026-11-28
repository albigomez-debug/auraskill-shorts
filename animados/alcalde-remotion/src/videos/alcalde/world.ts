// "El gato alcalde": Talkeetna's snowy main street (TOWN, x = 0) with Denali behind, Nagley's store inside (STORE) and the
// "town hall" corner with the ballot box and the report board (HALL).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, planksHD, roofHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { catDraw, burstDraw, signDraw } from "./beasts";
import { xDraw, checkDraw, qDraw, zzzDraw, heartDraw, textDraw, paperDraw } from "./extra";
import { S, W, STORE, HALL } from "./story";

const ORANGE = "#e0963a";
const FOLK = (v: number): Outfit => ({ jacket: ["#c8423a", "#3a5a8a", "#6a7a3a", "#d9a441", "#5a3a6a", "#2a6a6a"][v % 6], pants: "#3a3a44", boots: "#3a2a20", hat: ["cap", "hair", "bonnet", "slouch"][v % 4], cap: ["#2a4a8a", "#c8423a"][v % 2], hair: "#4a3020", skin: SKINS[v % 4], dress: v % 4 === 2 ? "#5a8fc2" : undefined, build: v === 5 ? "stout" : undefined });
const TOUR = (v: number): Outfit => ({ jacket: ["#ff7a2a", "#2ab0c8", "#e2457a"][v % 3], pants: "#2a2a32", boots: "#f2f2f2", hat: v % 2 ? "cap" : "hair", cap: "#f2f2f2", hair: "#c8a050", skin: SKINS[v % 4] });
const badgeDraw = (p: Pen) => { const pts: [number, number][] = []; for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k / 10) * Math.PI * 2, r = k % 2 ? 50 : 110; pts.push([128 + Math.cos(a) * r, 128 + Math.sin(a) * r]); } p.poly(pts, "#e8c45a", 7); p.g.fillStyle = "#6a4a10"; p.g.font = "bold 30px Arial"; p.g.textAlign = "center"; p.g.fillText("ALCALDE", 128, 140); };
const glassDraw = (p: Pen) => { p.poly([[78, 40], [178, 40], [168, 110], [88, 110]], "#cfe8f2", 6); p.ell(128, 115, 44, 34, "#cfe8f2", 6, 0, 180); p.stroke([[128, 145], [128, 215]], 10, "#cfe8f2"); p.stroke([[90, 220], [166, 220]], 10, "#cfe8f2"); p.poly([[84, 70], [172, 70], [166, 108], [90, 108]], "#9ad48a", 0); };
const flashDraw = (p: Pen) => { const pts: [number, number][] = []; for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI * 2, r = k % 2 ? 40 : 120; pts.push([128 + Math.cos(a) * r, 128 + Math.sin(a) * r]); } p.poly(pts, "#ffffff", 0); };
const camDraw = (p: Pen) => { p.poly([[50, 90], [206, 90], [206, 190], [50, 190]], "#2a2a32", 7); p.ell(128, 140, 38, 38, "#7a8aa2", 6); p.poly([[80, 70], [130, 70], [130, 90], [80, 90]], "#2a2a32", 5); };
const letterDraw = (p: Pen) => { p.poly([[30, 60], [226, 60], [226, 196], [30, 196]], "#f4f1ea", 7); p.stroke([[30, 60], [128, 140], [226, 60]], 7); p.dot(190, 90, 14, "#c8323a"); };
const ballotDraw = (p: Pen) => { p.poly([[40, 30], [216, 30], [216, 226], [40, 226]], "#f4f1ea", 7); const g = p.g; g.fillStyle = "#c8323a"; g.font = "bold 40px Arial"; g.textAlign = "center"; g.fillText("STUBBS", 128, 120); p.stroke([[70, 160], [110, 200], [190, 140]], 14, "#3a8a3a"); };
const portraitDraw = (p: Pen) => {
  p.poly([[20, 20], [492, 20], [492, 620], [20, 620]], "#8a5a34", 14); p.poly([[50, 50], [462, 50], [462, 500], [50, 500]], "#cfe0f0", 0);
  const g = p.g; g.save(); g.translate(256, 300); g.scale(0.36, 0.36); g.translate(-1050, -900); catDraw(0, "sit", false, ORANGE)(p); g.restore();
  g.fillStyle = "#f4f1ea"; g.font = "bold 48px Arial"; g.textAlign = "center"; g.fillText("1997 – 2017", 256, 570);
};
const reportDraw = (k: number) => (p: Pen) => {
  p.poly([[20, 20], [492, 20], [492, 600], [20, 600]], "#f4f1ea", 10);
  const g = p.g; g.fillStyle = "#2a2a32"; g.font = "bold 70px Arial"; g.textAlign = "left"; g.fillText("GESTIÓN", 50, 100);
  ["Impuestos", "Promesas", "Escándalos"].forEach((t, i) => { g.font = "bold 50px Arial"; g.fillStyle = "#2a2a32"; g.fillText(t, 40, 220 + i * 130); if (k > i) { g.fillStyle = "#e2333a"; g.font = "bold 80px Arial"; g.fillText("0", 420, 230 + i * 130); } });
};

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    this.K = { ...this.K, sky: { c: ["#e8eef4", "#d0dcec", "#a8c0e0", "#8aa8d8", "#6a90d0"], e: [0, 3, 8, 16, 40] } };
    const snow = ctex("snow", 256, 256, (g, r) => { g.fillStyle = "#eef2f6"; g.fillRect(0, 0, 256, 256); for (let k = 0; k < 300; k++) { g.fillStyle = `rgba(150,170,200,${r() * 0.2})`; g.fillRect(r() * 256, r() * 256, 4 + r() * 8, 2 + r() * 3); } });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(snow, 500, 500), color: "#ffffff" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(200, 5).rotateX(-Math.PI / 2), lamC("#a8a098")); road.position.set(0, 0, -1.5); road.receiveShadow = true; R.add(road);
    // false-front log buildings along the back of the street
    const cols = ["#8a5a34", "#a8423a", "#5a7a8a", "#c89a5a", "#6a8a5a", "#9a6a4a"];
    for (let k = 0; k < 9; k++) {
      const x = -22 + k * 5.5, h = 3.6 + (k % 3) * 0.6, c = cols[k % 6];
      box(R, 4.8, h, 4, lam({ map: rep(planksHD(), 2, 1), color: c }), x, h / 2, -7);
      box(R, 4.9, 1.0, 0.2, lam({ map: rep(planksHD(), 2, 0.5), color: c }), x, h + 0.5, -4.95);
      const d = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 2.0), lamC("#3a2a20")); d.position.set(x, 1.0, -4.98); R.add(d);
      for (const dx of [-1.5, 1.5]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.0), lamC("#cfe0f0")); w.position.set(x + dx, 1.7, -4.98); R.add(w); }
      const sn = box(R, 4.9, 0.12, 4.1, lamC("#f4f6fa"), x, h + 0.06, -7); void sn;
    }
    // spruce trees and Denali
    const spr = lamC("#3a5a4a");
    for (let k = 0; k < 24; k++) { const x = -60 + k * 5 + Math.sin(k * 3.1) * 2, z = -16 - (k % 3) * 4; const c = new THREE.Mesh(new THREE.ConeGeometry(1.4, 6, 8), spr); c.position.set(x, 3, z); c.castShadow = true; R.add(c); }
    const mtn = new THREE.Mesh(new THREE.ConeGeometry(160, 170, 7), lamC("#9aaac4")); mtn.position.set(30, 70, -520); R.add(mtn);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(80, 86, 7), lamC("#f8fafc")); cap.position.set(30, 113, -518); R.add(cap);
    // the store interior
    const wood = lam({ map: rep(planksHD(), 2, 1), color: "#c08a5a" });
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(12, 10).rotateX(-Math.PI / 2), lam({ map: rep(planksHD(), 6, 5), color: "#a8784a" })); fl.position.set(STORE[0], 0.01, STORE[2]); fl.receiveShadow = true; R.add(fl);
    box(R, 12, 4, 0.2, wood, STORE[0], 2, STORE[2] - 2.6);
    for (const dx of [-6, 6]) box(R, 0.2, 4, 10, wood, STORE[0] + dx, 2, STORE[2] + 2);
    box(R, 2.4, 1.0, 0.7, lam({ map: rep(planksHD(), 1, 0.5), color: "#8a5a34" }), STORE[0], 0.5, STORE[2] - 0.35);
    box(R, 2.5, 0.06, 0.8, lamC("#5a3a24"), STORE[0], 1.02, STORE[2] - 0.35);
    for (let s = 0; s < 3; s++) { box(R, 5, 0.06, 0.4, lamC("#6a4a2a"), STORE[0], 1.1 + s * 0.7, STORE[2] - 2.3); for (let k = 0; k < 10; k++) box(R, 0.3, 0.4, 0.25, lamC(["#c8423a", "#3a6a9a", "#e8c45a", "#4a8a4a", "#f2ece0"][(k + s) % 5]), STORE[0] - 2.2 + k * 0.48, 1.33 + s * 0.7, STORE[2] - 2.3); }
    // hall corner: table with ballot box, report board, outdoors in the snow by a log cabin
    box(R, 8, 4, 5, lam({ map: rep(planksHD(), 3, 1), color: "#8a5a34" }), HALL[0] + 1.5, 2, HALL[2] - 5);
    const hr = new THREE.Mesh(new THREE.ConeGeometry(6, 2, 4), lam({ map: rep(roofHD("#4a4a52"), 2, 2) })); hr.rotation.y = Math.PI / 4; hr.scale.set(1, 1, 0.6); hr.position.set(HALL[0] + 1.5, 5, HALL[2] - 5); R.add(hr);
    box(R, 1.2, 0.06, 0.7, wood, HALL[0], 0.8, HALL[2] - 0.4); for (const dx of [-0.5, 0.5]) cyl(R, 0.03, 0.03, 0.8, wood, HALL[0] + dx, 0.4, HALL[2] - 0.4, 6);
    box(R, 0.5, 0.45, 0.4, lamC("#3a5a8a"), HALL[0], 1.05, HALL[2] - 0.4); box(R, 0.25, 0.02, 0.05, lamC("#1a1a20"), HALL[0], 1.28, HALL[2] - 0.4);
    for (const dx of [-0.75, 0.75]) cyl(R, 0.05, 0.05, 2.6, wood, HALL[0] + 2.4 + dx, 1.3, HALL[2] - 1.55, 6);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const C = 0.36;
    const cat = (x: number, y: number, z: number, mode: "walk" | "sit" | "flat", dir = 1) =>
      card(`stubbs|${mode}|${mode === "walk" ? Math.round(t * 8) % 8 : 0}`, x, z, C, catDraw((Math.round(t * 8) % 8) * 0.785, mode, false, ORANGE), dir, 0, y);
    const X = STORE[0];
    if (id === S.hook || id === S.end || id === S.office || id === S.tour) {
      const sleep = false;
      cat(X - 0.05, 1.05, -0.3, sleep ? "flat" : "sit");
      fx("badge", 256, 256, badgeDraw, X + 0.25, 1.5, -0.1, 0.22, 0.22);
      if (id === S.office) fx("office", 1024, 512, signDraw(["DESPACHO", "DEL ALCALDE"], "#2a3a5a", "#ffd23f"), X, 2.75, -2.4, 1.6, 0.8);
      if (id === S.hook || id === S.end) for (let k = 0; k < 2; k++) person(`f${k}`, FOLK(k), X + (k ? 0.8 : -0.8), 0, -1.6, { mode: "stand", expr: "laugh", facing: (k ? -1 : 1) as -1 | 1, wave: 0.5 + 0.5 * Math.sin(t * 8 + k * 2) }, 1 + k);
      if (id === S.tour) {
        for (let k = 0; k < 3; k++) person(`t${k}`, TOUR(k), [X - 0.95, X - 1.6, X + 0.95][k], 0, 0.35, { mode: "stand", expr: f > W.copa - 4 ? "shock" : "grin", facing: (k === 2 ? -1 : 1) as -1 | 1, wave: f > W.posa - 4 && f < W.bebe ? 0.9 : undefined }, 3 + k);
        if (f > W.posa - 4 && f < W.bebe) { fx("camT", 256, 256, camDraw, X - 0.6, 1.55, 0.95, 0.22, 0.22); if (Math.floor(f / 7) % 3 === 0) fx("flash", 256, 256, flashDraw, X - 0.05, 1.3, -0.1, 0.6, 0.6); }
        if (f > W.bebe - 4) fx("glass", 256, 256, glassDraw, X + 0.28, 1.17, -0.15, 0.2, 0.2);
      }
      if (id === S.hook && f < 12) fx("b0", 256, 256, burstDraw(), X, 1.4, -0.6, 1.0, 1.0);
    }
    if (id === S.town) {
      for (let k = 0; k < 6; k++) person(`v${k}`, FOLK(k), -2.6 + k * 1.05, 0, -0.4 - (k % 2) * 0.7, { mode: "stand", expr: f > W.convence - 4 ? (k % 2 ? "stern" : "dazed") : "neutral", facing: (k < 3 ? 1 : -1) as -1 | 1 }, 1 + k);
      if (f > W.candidato - 6) for (let k = 0; k < 2; k++) { fx(`cand${k}`, 512, 620, paperDraw("CANDIDATO", ["Vote por mí"]), -1.0 + k * 2, 2.0, -1.5, 0.6, 0.72); fx(`cx${k}`, 256, 256, xDraw, -1.0 + k * 2, 2.0, -1.45, 0.5, 0.5); }
      if (f > W.convence - 4 && f < W.candidato - 6) fx("q", 256, 256, qDraw(), 0, 2.3, -0.5, 0.5, 0.5);
    }
    if (id === S.vote) {
      const H = HALL[0];
      person("prop", FOLK(5), H - 0.85, 0, -0.3, { mode: "stand", expr: f > W.stubbs - 4 ? "grin" : "smile", facing: 1, wave: f > W.propone - 4 && f < W.arrasa ? 0.9 : undefined }, 1);
      if (f > W.stubbs - 6) cat(H + 0.45, 0.83, -0.3, "sit");
      if (f > W.gatito) for (let k = 0; k < 6; k++) { const u = ((f - W.gatito + k * 9) % 40) / 40; fx(`bal${k}`, 256, 256, ballotDraw, H - 0.8 + k * 0.3, 2.4 - u * 1.4, -0.3, 0.22, 0.22); }
      if (f > W.arrasa - 4) { for (let k = 0; k < 2; k++) person(`fan${k}`, FOLK(k + 2), H + 0.9 + k * 0.6, 0, -1.0, { mode: "stand", expr: "laugh", facing: -1, wave: 0.5 + 0.5 * Math.sin(t * 9 + k) }, 2 + k); fx("win", 256, 256, burstDraw("#ffd23f"), H + 0.15, 1.3, -0.4, 0.9, 0.9); }
    }
    if (id === S.fame) {
      for (let k = 0; k < 10; k++) person(`fan${k}`, k % 2 ? TOUR(k) : FOLK(k), -2.2 + (k % 5) * 1.1, 0, -0.2 - Math.floor(k / 5) * 1.1, { mode: "stand", expr: k % 3 ? "laugh" : "grin", facing: (k % 2 ? -1 : 1) as -1 | 1, wave: f > W.senado - 4 ? 0.5 + 0.5 * Math.sin(t * 8 + k) : undefined }, 1 + k);
      cat(0.15, 0.0, 0.6, "sit");
      if (f > W.cartas - 4) for (let k = 0; k < 8; k++) { const u = ((f - W.cartas + k * 7) % 45) / 45; fx(`let${k}`, 256, 256, letterDraw, -1.2 + k * 0.35, 3.0 - u * 2.4, 0.4, 0.28, 0.28); }
      if (f > W.visitan - 4 && f < W.cartas) fx("heart", 256, 256, heartDraw, 0.3, 1.0, 0.7, 0.3, 0.3);
    }
    if (id === S.gov) {
      {
        const H = HALL[0] + 2.4, k = f > W.escandalo - 3 ? 3 : f > W.promesas - 3 ? 2 : f > W.impuestos - 3 ? 1 : 0;
        fx(`rep${k}`, 512, 620, reportDraw(k), H, 1.7, -1.5, 1.2, 1.45);
        cat(H - 0.95, 0, -0.4, "sit");
        if (k > 0) fx("ok", 256, 256, checkDraw, H + 0.75, 2.4, -1.4, 0.35, 0.35);
      }
    }
    if (id === S.nap) {
      {
        cat(X - 0.05, 1.05, -0.3, "sit");
        if (f > W.duerme - 4) fx("zzz", 256, 256, zzzDraw, X + 0.2, 1.4, -0.2, 0.3, 0.3);
        if (f > W.bueno && f < W.duerme - 4) fx("q2", 512, 256, textDraw("UNO...", "#ff3b3b", 130), X, 1.6, -0.2, 0.6, 0.3);
      }
    }
    if (id === S.legacy) {
      fx("portrait", 512, 640, portraitDraw, 0, 1.9, -2.2, 1.2, 1.5);
      for (let k = 0; k < 6; k++) person(`m${k}`, FOLK(k), -2.0 + k * 0.8 + (k > 2 ? 0.8 : 0), 0, -1.2 + (k % 2) * 0.4, { mode: "stand", expr: f > W.mejor - 4 ? "grin" : "relief", facing: (k < 3 ? 1 : -1) as -1 | 1 }, 1 + k);
      if (f > W.invicto - 4) fx("heartL", 256, 256, heartDraw, 0.75, 2.5, -2.0, 0.35, 0.35);
    }
  }
}
