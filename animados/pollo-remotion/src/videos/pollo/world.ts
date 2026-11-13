// "El pollo sin cabeza": a Colorado farm (x = 0) with barn, house, stump and a chalkboard; the sideshow tent (TENT); the motel (MOTEL).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, planksHD, grassHD, roofHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { chickenDraw, coinDraw, signDraw, burstDraw } from "./beasts";
import { S, W, STUMP, TENT, MOTEL, BOARD } from "./story";

const OLSEN: Outfit = { jacket: "#3a5a8a", pants: "#2a3a5a", boots: "#3a2a20", hat: "cap", cap: "#8a3a2a", skin: SKINS[1], belt: null, buttons: "#d9a441" };
const FOLK = (v: number): Outfit => {
  const coats = ["#8a5a34", "#3a5a7a", "#6a7a3a", "#a8423a", "#4a4a6a", "#c28a3a"];
  const o: Outfit = { jacket: coats[v % 6], pants: "#3a3a44", boots: "#2a2020", skin: SKINS[v % 4] };
  return v % 3 === 1 ? { ...o, hat: "bonnet", dress: ["#d9a441", "#c25a7a", "#5a8fc2"][v % 3] } : v % 3 === 2 ? { ...o, hat: "cap", cap: "#4a4a4a" } : { ...o, hat: "slouch" };
};
const dropDraw = (p: Pen) => { p.band([[60, 200], [190, 70]], "#cfe8f2", 26, 5, "round"); p.ell(205, 55, 34, 34, "#c8323a", 6); p.dot(52, 210, 9, "#e8c87a"); };
const noteDraw = (p: Pen) => { p.ell(90, 190, 40, 30, "#2a2a32", 5); p.band([[126, 190], [126, 50]], "#2a2a32", 12, 0); p.poly([[126, 50], [200, 80], [200, 110], [126, 84]], "#2a2a32", 0); };
const qDraw = (p: Pen) => { p.g.fillStyle = "#ffd23f"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 14; p.g.font = "bold 200px Arial"; p.g.textAlign = "center"; p.g.strokeText("?", 128, 200); p.g.fillText("?", 128, 200); };
const xDraw = (p: Pen) => { p.stroke([[40, 40], [216, 216]], 34, "#e2333a"); p.stroke([[40, 216], [216, 40]], 34, "#e2333a"); };
const moonDraw = (p: Pen) => { p.ell(128, 128, 100, 100, "#fff6c8", 0); p.ell(165, 105, 85, 90, "#3a4a7a", 0); };
/** the board diagram: chicken neck and skull outline, brainstem glowing */
const brainDraw = (glow: boolean) => (p: Pen) => {
  const g = p.g; g.strokeStyle = "#f4f1ea"; g.lineWidth = 10; g.lineCap = "round";
  g.beginPath(); g.moveTo(330, 470); g.lineTo(300, 260); g.stroke(); g.beginPath(); g.moveTo(420, 470); g.lineTo(400, 270); g.stroke();
  g.setLineDash([18, 16]); g.beginPath(); g.ellipse(360, 190, 110, 95, 0, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
  g.beginPath(); g.moveTo(330, 230); g.lineTo(355, 200); g.stroke();
  p.ell(350, 260, 40, 52, glow ? "#ffd23f" : "#c8b870", 0);
  g.strokeStyle = "#ff6a5a"; g.lineWidth = 12; g.beginPath(); g.moveTo(130, 120); g.lineTo(300, 240); g.stroke();
  g.fillStyle = "#f4f1ea"; g.font = "bold 46px 'Comic Sans MS', Arial"; g.textAlign = "left"; g.fillText("TRONCO", 30, 80); g.fillText("DEL CEREBRO", 30, 130);
  g.strokeStyle = "#ff6a5a"; g.lineWidth = 14; g.beginPath(); g.moveTo(230, 160); g.lineTo(480, 120); g.stroke(); // the axe cut
};

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(grassHD(), 600, 600), color: "#c8d49a" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    const dirt = lam({ map: rep(ctex("dirt", 256, 256, (g, r) => { g.fillStyle = "#b08a5a"; g.fillRect(0, 0, 256, 256); for (let k = 0; k < 300; k++) { g.fillStyle = `rgba(80,50,30,${r() * 0.3})`; g.fillRect(r() * 256, r() * 256, 3 + r() * 6, 2 + r() * 4); } }), 4, 4) });
    const yard = new THREE.Mesh(new THREE.PlaneGeometry(12, 10).rotateX(-Math.PI / 2), dirt); yard.position.set(0, 0, -1); yard.receiveShadow = true; R.add(yard);
    const wood = lam({ map: rep(planksHD(), 1, 1), color: "#c08a5a" });
    // the barn: red, white trim, gambrel-ish roof
    const red = lam({ map: rep(planksHD(), 2, 1), color: "#c8423a" });
    box(R, 8, 5, 6, red, -6.5, 2.5, -10);
    const rf = lam({ map: rep(roofHD("#5a4a52", true), 2, 2), color: "#ffffff" });
    for (const s of [-1, 1]) { const r = box(R, 4.8, 0.2, 6.6, rf, -6.5 + s * 2.0, 6.0, -10); r.rotation.z = -s * 0.62; }
    const door = new THREE.Mesh(new THREE.PlaneGeometry(3, 3.6), lamC("#f2ece0")); door.position.set(-6.5, 1.8, -6.98); R.add(door);
    const doorIn = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.2), lamC("#8a2a26")); doorIn.position.set(-6.5, 1.75, -6.96); R.add(doorIn);
    // farmhouse
    box(R, 7, 4, 5, lam({ map: rep(planksHD(), 2, 1), color: "#f2ead6" }), 7, 2, -13);
    const hr = new THREE.Mesh(new THREE.ConeGeometry(5.0, 2.2, 4), lam({ map: rep(roofHD("#4a3a34"), 2, 2) })); hr.rotation.y = Math.PI / 4; hr.scale.set(1.0, 1, 0.72); hr.position.set(7, 5.1, -13); hr.castShadow = true; R.add(hr);
    for (const dx of [-2, 2]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.2), lamC("#5a7aa2")); w.position.set(7 + dx, 2.3, -10.48); R.add(w); }
    // fence
    for (let k = 0; k < 16; k++) cyl(R, 0.06, 0.07, 1.1, wood, -8 + k * 1.1, 0.55, -5.5, 6);
    for (const y of [0.45, 0.85]) box(R, 17, 0.08, 0.05, wood, 0.25, y, -5.5);
    // stump
    cyl(R, 0.32, 0.36, 0.45, lam({ map: rep(planksHD(), 0.3, 0.3), color: "#8a5a34" }), STUMP[0] - 0.7, 0.22, STUMP[2] - 1.0, 14);
    // crate for feeding
    box(R, 0.7, 0.5, 0.5, wood, 0.3, 0.25, -0.7);
    // chalkboard
    box(R, 1.8, 1.2, 0.06, lamC("#2a3a32"), BOARD[0], 1.5, BOARD[2]);
    for (const dx of [-0.8, 0.8]) cyl(R, 0.03, 0.03, 2.1, wood, BOARD[0] + dx, 1.0, BOARD[2] - 0.1, 6);
    // sideshow tent: striped drum + cone
    const stripes = ctex("tent", 512, 256, (g) => { for (let k = 0; k < 16; k++) { g.fillStyle = k % 2 ? "#f2ece0" : "#c8323a"; g.fillRect(k * 32, 0, 32, 256); } });
    const tent = lam({ map: stripes });
    cyl(R, 3.4, 3.4, 3, tent, TENT[0], 1.5, TENT[2] - 4, 24);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(3.9, 2.6, 24), tent); cone.position.set(TENT[0], 4.3, TENT[2] - 4); cone.castShadow = true; R.add(cone);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.4), lamC("#ffd23f", { side: THREE.DoubleSide })); flag.position.set(TENT[0] + 0.35, 6.0, TENT[2] - 4); R.add(flag);
    box(R, 1.0, 0.8, 0.7, wood, TENT[0], 0.4, TENT[2] + 0.2);
    // motel
    const motel = lam({ map: rep(planksHD(), 3, 1), color: "#e8d8b4" });
    box(R, 16, 3, 4, motel, MOTEL[0], 1.5, MOTEL[2] - 3);
    box(R, 16.6, 0.25, 5, lamC("#5a8a8a"), MOTEL[0], 3.1, MOTEL[2] - 2.6);
    for (let k = 0; k < 5; k++) { const d = new THREE.Mesh(new THREE.PlaneGeometry(1, 2.1), lamC(["#3a7a8a", "#c8623a"][k % 2])); d.position.set(MOTEL[0] - 6 + k * 3, 1.05, MOTEL[2] - 0.98); R.add(d); }
    cyl(R, 0.1, 0.1, 5, lamC("#5a5a62"), MOTEL[0] + 3.2, 2.5, MOTEL[2] - 0.6, 8);
    box(R, 0.8, 0.4, 0.5, wood, MOTEL[0] - 0.9, 0.2, MOTEL[2] - 0.2);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const C = 0.4;
    const mike = (x: number, z: number, ph: number, headless: boolean, y = 0, mood: "calm" | "wide" = "calm", dir = 1) =>
      card(`mike|${headless ? 1 : 0}|${mood}|${Math.round(((ph % 6.283) + 6.283) % 6.283 * 4)}`, x, z, C, chickenDraw(Math.round(ph * 4) / 4, headless, "#fbf7ee", mood), dir, 0, y);
    // other farm chickens pecking around
    const flock = (n: number) => { for (let k = 0; k < n; k++) { const x = -3 + k * 1.3 + Math.sin(t * 0.6 + k) * 0.3, z = -2.4 - (k % 3) * 0.9; card(`hen${k % 3}|${Math.round(t * 4 + k) % 8}`, x, z, C, chickenDraw((Math.round(t * 4 + k) % 8) * 0.785, false, ["#fbf7ee", "#c8823a", "#8a5a3a"][k % 3]), k % 2 ? 1 : -1, 0); } };
    if (id === S.hook || id === S.life || id === S.end) {
      const x = id === S.end ? -0.2 + (f - 1026) * 0.012 : id === S.hook ? -1.0 + f * 0.015 : -0.9 + (f - 756) * 0.017;
      const peck = id === S.life && f > W.comer - 3 && f < W.comer + 25;
      mike(x, 0, peck ? 0 : t * 9, true, peck ? -0.03 : 0);
      if (id === S.life && f > W.cantar - 3 && f < W.pensar - 6) fx(`note|${Math.floor(f / 8) % 2}`, 256, 256, noteDraw, x + 0.25, 0.95 + ((f - W.cantar) % 20) * 0.01, 0.1, 0.22, 0.22);
      if (id === S.life && f > W.pensar - 3) fx("q", 256, 256, qDraw, x + 0.22, 1.0, 0.1, 0.26, 0.26);
      if (id === S.hook || id === S.end) for (let k = 0; k < 3; k++) person(`wit${k}`, FOLK(k), 0.6 + k * 0.9, 0, -2.6 - k * 0.6, { mode: "stand", expr: k === 1 ? "shock" : "dazed", facing: -1 }, 20 + k);
      flock(id === S.life ? 3 : 0);
    }
    if (id === S.farm || id === S.chop) {
      const raised = id === S.chop && f < W.hachazo - 4, k = id === S.chop ? (f < W.hachazo - 4 ? 0 : Math.min(1, (f - W.hachazo + 4) / 4)) : 0;
      const walkIn = id === S.farm ? Math.max(0, 1 - (f - 96) / 90) : 0;
      person("olsen", OLSEN, -0.75 - walkIn * 3, 0, 0.25, { mode: walkIn > 0 ? "stroll" : "stand", phase: t * 7, expr: id === S.chop ? (f > W.levanta - 4 ? "shock" : f > W.falla - 3 ? "nervous" : "stern") : f > W.cenar - 3 ? "grin" : "smile", prop: ["hammer", raised ? 0 : k], facing: 1 }, 1);
      if (id === S.farm) { mike(0.35, 0.05, 0, false); flock(6); }
      else {
        const up = f >= W.levanta - 4, walking = f >= W.andando - 4;
        const x = walking ? 0.35 + (f - W.andando + 4) * 0.012 : 0.35;
        if (f < W.hachazo) mike(x, 0.05, 0, false, 0, "wide");
        else mike(x, 0.05, walking ? t * 9 : 0, true, up ? 0 : -0.12);
        if (f >= W.hachazo - 1 && f < W.hachazo + 8) fx("burst", 256, 256, burstDraw(), 0.3, 0.7, 0.2, 0.7, 0.7);
      }
    }
    if (id === S.feed) {
      const shock = f > W.flipa - 4 && f < W.mike;
      person("olsen", OLSEN, -0.55, 0, -0.4, { mode: "stand", expr: shock ? "shock" : f > W.gotas - 3 ? "smile" : "dazed", facing: 1, wave: f > W.mike - 3 && f < W.gotas - 6 ? 0.8 : undefined }, 1);
      mike(0.3, -0.62, f < W.vivo ? t * 3 : 0, true, 0.5);
      if (f > W.gotas - 4) fx("drop", 256, 256, dropDraw, 0.52 + 0.02 * Math.sin(t * 5), 1.2, -0.5, 0.28, 0.28);
    }
    if (id === S.tour) {
      const X = TENT[0];
      fx("tentsign", 1024, 512, signDraw(["MIKE", "EL POLLO", "SIN CABEZA · 25¢"]), X, 3.6, TENT[2] - 0.4, 2.6, 1.3);
      mike(X, TENT[2] + 0.25, t * 3, true, 0.8);
      person("olsen", OLSEN, X + 1.0, 0, TENT[2] + 0.3, { mode: "stand", expr: f > W.fortuna - 4 ? "laugh" : "grin", facing: -1, wave: f > W.fortuna - 4 ? Math.sin(t * 7) * 0.5 + 0.5 : undefined }, 1);
      for (let k = 0; k < 10; k++) {
        const sx = k % 2 ? 1 : -1, x = X + sx * (1.9 + Math.floor(k / 2) * 0.55), z = 0.8 + (k % 4) * 0.5;
        person(`q${k}`, FOLK(k + 3), x, 0, z, { mode: "stand", expr: k % 3 ? "shock" : "laugh", facing: (-sx) as -1 | 1 }, 30 + k);
      }
      if (f > W.veinti - 4) for (let k = 0; k < (f > W.fortuna - 4 ? 10 : 4); k++) {
        const u = ((f - W.veinti + k * 7) % 40) / 40;
        fx(`coin|${k % 2}`, 256, 256, coinDraw("25¢"), X - 1.6 + (k % 5) * 0.8, 2.6 - u * 1.6, 1.5, 0.3, 0.3);
      }
    }
    if (id === S.board) {
      const glow = f > W.cerebro - 4 && Math.floor(f / 6) % 2 === 0;
      fx(`brain|${glow ? 1 : 0}`, 512, 512, brainDraw(glow), BOARD[0], 1.5, BOARD[2] + 0.25, 1.15, 1.15);
      person("olsen", OLSEN, BOARD[0] - 1.35, 0, BOARD[2] + 0.6, { mode: "stand", expr: "grin", facing: 1, wave: f > W.cerebro - 4 ? 0.9 : undefined }, 1);
    }
    if (id === S.motel) {
      const X = MOTEL[0];
      fx("moon", 256, 256, moonDraw, X - 3, 6.5, MOTEL[2] - 5, 1.4, 1.4);
      fx("motel", 1024, 512, signDraw(["MOTEL", "PHOENIX · 1947"], "#2a3a5a", "#ff6a8a"), X + 3.2, 4.4, MOTEL[2] - 0.4, 1.8, 0.9);
      const choke = f > W.atraganto - 3;
      mike(X - 0.9 + (choke ? 0.02 * Math.sin(f * 2.5) : 0), MOTEL[2] - 0.1, choke ? 0 : t * 3, true, 0.4, choke ? "wide" : "calm");
      if (f > W.olsen - 6) {
        person("olsen", OLSEN, X + 0.5, 0, MOTEL[2] - 0.1, { mode: "stand", expr: "nervous", facing: -1, tilt: 6 * Math.sin(t * 5) }, 1);
        fx("q", 256, 256, qDraw, X + 0.5, 2.2, MOTEL[2] + 0.1, 0.35, 0.35);
      }
      if (f > W.gotas2 - 4) { fx("drop", 256, 256, dropDraw, X + 1.3, 1.3, MOTEL[2] + 0.2, 0.35, 0.35); fx("x", 256, 256, xDraw, X + 1.3, 1.3, MOTEL[2] + 0.25, 0.35, 0.35); }
    }
  }
}
