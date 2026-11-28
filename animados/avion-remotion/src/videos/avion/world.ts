// "El hombre que se comió un avión": airfield with the Cessna (FIELD, x = 0) that gets eaten piece by piece, Lotito's house and
// dining room (HOME) and the doctors' clinic (CLINIC).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, planksHD, grassHD, facadeHD, roofHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { burstDraw } from "./beasts";
import { bottleDraw, xDraw, checkDraw, paperDraw, textDraw } from "./extra";
import { S, W, FIELD, HOME, CLINIC } from "./story";

const MICHEL: Outfit = { jacket: "#2a4a8a", pants: "#3a3a44", boots: "#2a2020", hat: "hair", hair: "#3a2a1a", skin: SKINS[1], belt: null, buttons: "#e8e4dc", moustache: "#3a2a1a", build: "stout" };
const KIDM: Outfit = { jacket: "#2a4a8a", pants: "#7a5a3a", boots: "#3a2a20", hat: "hair", hair: "#3a2a1a", skin: SKINS[1], build: "kid" };
const DOC: Outfit = { jacket: "#e8f0f2", pants: "#c8d8dc", boots: "#f2f2f2", hat: "hair", hair: "#8a8a8a", skin: SKINS[0], belt: null, buttons: "#9ad4c8", moustache: "#8a8a8a" };
const FOLK = (v: number): Outfit => ({ jacket: ["#8a5a34", "#3a5a7a", "#6a7a3a", "#a8423a"][v % 4], pants: "#3a3a44", boots: "#2a2020", hat: v % 2 ? "hair" : "cap", hair: "#4a3020", cap: "#4a4a4a", skin: SKINS[v % 4] });
const glassDraw = (bit: boolean) => (p: Pen) => { p.poly([[70, 30], [186, 30], [170, 230], [86, 230]], "#cfe8f2", 6); if (bit) p.poly([[120, 26], [140, 50], [160, 30], [175, 26]], "#ffffff", 0); };
const bikeDraw = (p: Pen) => { for (const x of [70, 190]) { p.ell(x, 170, 55, 55, null, 10); p.dot(x, 170, 8); } p.stroke([[70, 170], [120, 100], [190, 170], [130, 170], [70, 170]], 9, "#c8323a"); p.stroke([[120, 100], [180, 95], [190, 170]], 9, "#c8323a"); p.stroke([[110, 80], [140, 80]], 10); };
const tvDraw = (p: Pen) => { p.poly([[30, 50], [226, 50], [226, 200], [30, 200]], "#6a4a2a", 8); p.poly([[50, 70], [180, 70], [180, 180], [50, 180]], "#9ab0c0", 6); p.dot(205, 90, 9); p.dot(205, 130, 9); p.stroke([[100, 50], [70, 10]], 6); p.stroke([[130, 50], [170, 10]], 6); };
const cartDraw = (p: Pen) => { p.poly([[40, 70], [220, 70], [195, 170], [65, 170]], "#b8c0c8", 8); for (let k = 0; k < 5; k++) p.stroke([[70 + k * 32, 75], [80 + k * 25, 165]], 5, "#7a828a"); p.stroke([[220, 70], [240, 40]], 8); for (const x of [80, 180]) p.ell(x, 205, 18, 18, "#2a2a30", 6); };
const coffinDraw = (p: Pen) => { p.poly([[100, 20], [160, 20], [200, 70], [170, 240], [90, 240], [60, 70]], "#6a4028", 8); p.stroke([[130, 60], [130, 160]], 10, "#e8c45a"); p.stroke([[100, 95], [160, 95]], 10, "#e8c45a"); for (const y of [110, 190]) { p.stroke([[52, y], [40, y]], 10, "#c8c8d0"); p.stroke([[208, y], [220, y]], 10, "#c8c8d0"); } };
const bananaDraw = (p: Pen) => { p.arc(128, 60, 100, 110, 30, 150, 40, "#f2d23a"); };
const eggDraw = (p: Pen) => { p.ell(128, 138, 70, 90, "#f8f4ea", 7); p.ell(128, 150, 32, 32, "#f2c23a", 0); };
const plaqueDraw = (bitten: boolean) => (p: Pen) => {
  const pts: [number, number][] = [[40, 40], [472, 40], [472, 330], [40, 330]];
  p.poly(pts, "#b8863a", 10); p.poly([[70, 70], [442, 70], [442, 300], [70, 300]], "#d8a85a", 6);
  const g = p.g; g.fillStyle = "#5a3a10"; g.textAlign = "center"; g.font = "bold 46px Arial"; g.fillText("RÉCORD", 256, 140); g.font = "bold 34px Arial"; g.fillText("dieta más rara", 256, 200); g.fillText("del mundo", 256, 250);
  if (bitten) { g.save(); g.globalCompositeOperation = "destination-out"; for (const [x, y, r] of [[472, 120, 60], [440, 190, 55], [470, 260, 55]] as const) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); } g.restore(); }
};
const stomachDraw = (p: Pen) => {
  p.poly([[20, 20], [492, 20], [492, 600], [20, 600]], "#1a2a3a", 10);
  const g = p.g; g.strokeStyle = "#cfe8f2"; g.lineCap = "round";
  g.lineWidth = 46; g.beginPath(); g.moveTo(190, 90); g.bezierCurveTo(170, 230, 120, 330, 210, 430); g.bezierCurveTo(300, 520, 420, 420, 380, 300); g.bezierCurveTo(350, 200, 260, 220, 230, 150); g.stroke();
  g.lineWidth = 14; g.strokeStyle = "#ffd23f"; g.beginPath(); g.moveTo(190, 90); g.bezierCurveTo(170, 230, 120, 330, 210, 430); g.bezierCurveTo(300, 520, 420, 420, 380, 300); g.stroke();
  g.fillStyle = "#ffd23f"; g.font = "bold 70px Arial"; g.textAlign = "center"; g.fillText("×2", 380, 560);
};

export class World extends Base {
  parts: THREE.Object3D[] = [];
  constructor() {
    super();
    const R = this.root;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(grassHD(), 600, 600), color: "#c8d49a" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    const asph = ctex("strip", 256, 256, (g, r) => { g.fillStyle = "#6a6a70"; g.fillRect(0, 0, 256, 256); for (let k = 0; k < 400; k++) { g.fillStyle = `rgba(255,255,255,${r() * 0.06})`; g.fillRect(r() * 256, r() * 256, 3, 3); } g.fillStyle = "#f2f0e8"; g.fillRect(0, 120, 120, 16); });
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(200, 14).rotateX(-Math.PI / 2), lam({ map: rep(asph, 25, 1) })); strip.position.set(0, 0.0, -9); strip.receiveShadow = true; R.add(strip);
    const apron = new THREE.Mesh(new THREE.PlaneGeometry(26, 12).rotateX(-Math.PI / 2), lamC("#8a8a90")); apron.position.set(0, 0.005, -1); apron.receiveShadow = true; R.add(apron);
    // hangar
    const tin = lamC("#a8b0b8");
    const hg = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 18, 24, 1, false, -Math.PI / 2, Math.PI), tin); hg.rotation.x = Math.PI / 2; hg.rotation.z = Math.PI / 2; hg.position.set(-16, 0, -22); hg.castShadow = true; R.add(hg);
    box(R, 0.2, 3, 0.2, lamC("#c8323a"), 10, 1.5, -6); const sock = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.4, 10), lamC("#ff8a2a")); sock.rotation.z = Math.PI / 2; sock.position.set(10.6, 2.9, -6); R.add(sock);
    // the Cessna 150: side-on, nose to +x, at z = -3
    const P = new THREE.Group(); P.position.set(FIELD[0], 0, FIELD[2] - 3); R.add(P);
    const wh = lamC("#f4f2ec"), rd = lamC("#c8323a"), gl = lamC("#9ad4f2");
    const add = (m: THREE.Mesh) => { m.castShadow = m.receiveShadow = true; P.add(m); this.parts.push(m); return m; };
    const fus = add(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.3, 4.2, 14), wh)); fus.rotation.z = Math.PI / 2; fus.position.set(0.4, 1.3, 0);
    const tail = add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.1, 2.4, 12), wh)); tail.rotation.z = Math.PI / 2; tail.position.set(-2.9, 1.45, 0);
    const fin = add(new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.06), rd)); fin.position.set(-3.8, 2.05, 0);
    const stab = add(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 2.6), wh)); stab.position.set(-3.8, 1.5, 0);
    const wing = add(new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 10), wh)); wing.position.set(0.6, 2.05, 0);
    const stripe = add(new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.13, 0.5), rd)); stripe.position.set(0.6, 2.05, 4.6);
    const cab = add(new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 1.0), gl)); cab.position.set(0.8, 1.75, 0);
    const nose = add(new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.8, 14), wh)); nose.rotation.z = -Math.PI / 2; nose.position.set(2.85, 1.25, 0);
    const prop = add(new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.8, 0.14), lamC("#2a2a30"))); prop.position.set(3.3, 1.25, 0);
    const band = add(new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.5, 1.4, 14), rd)); band.rotation.z = Math.PI / 2; band.position.set(-0.9, 1.3, 0);
    for (const [x, z] of [[1.9, 0], [0.2, 0.9], [0.2, -0.9]] as const) { const w = add(new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 14), lamC("#2a2a30"))); w.rotation.x = Math.PI / 2; w.position.set(x, 0.28, z); const s = add(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.06), lamC("#8a8a90"))); s.position.set(x, 0.65, z * 0.6); }
    // dinner table in front of the plane (hook / end)
    const wood = lam({ map: rep(planksHD(), 1, 1), color: "#b07a4a" });
    box(R, 1.4, 0.06, 0.8, lamC("#f2ece0"), FIELD[0] + 0.1, 0.78, FIELD[2] - 0.3);
    for (const dx of [-0.6, 0.6]) for (const dz of [-0.3, 0.3]) cyl(R, 0.03, 0.03, 0.78, wood, FIELD[0] + 0.1 + dx, 0.39, FIELD[2] - 0.3 + dz, 6);
    // Lotito's house in Grenoble: facade + dining table, mountains behind
    box(R, 14, 8, 6, lam({ map: facadeHD("grenoble", 14, 8, { wall: "#e8d8bc", shutter: "#3a6a8a", door: true }) }), HOME[0], 4, HOME[2] - 9);
    const rf = new THREE.Mesh(new THREE.ConeGeometry(10, 3, 4), lam({ map: rep(roofHD("#8a4a3a"), 3, 3) })); rf.rotation.y = Math.PI / 4; rf.scale.set(1, 1, 0.45); rf.position.set(HOME[0], 9.5, HOME[2] - 9); R.add(rf);
    box(R, 1.6, 0.06, 0.9, lamC("#c8423a"), HOME[0] + 0.1, 0.78, HOME[2] - 0.3);
    for (const dx of [-0.7, 0.7]) for (const dz of [-0.35, 0.35]) cyl(R, 0.03, 0.03, 0.78, wood, HOME[0] + 0.1 + dx, 0.39, HOME[2] - 0.3 + dz, 6);
    box(R, 1.0, 0.06, 0.6, wood, HOME[0] + 2.5, 0.6, HOME[2] - 0.3);
    for (let k = 0; k < 5; k++) { const m = new THREE.Mesh(new THREE.ConeGeometry(40 + k * 6, 60 + (k % 2) * 25, 6), lamC(["#7a8aa2", "#8a9ab0"][k % 2])); m.position.set(HOME[0] - 120 + k * 60, 20, HOME[2] - 220); R.add(m); const cap = new THREE.Mesh(new THREE.ConeGeometry(14, 20, 6), lamC("#f4f6fa")); cap.position.set(HOME[0] - 120 + k * 60, 50 + (k % 2) * 12.5 + 10, HOME[2] - 220); R.add(cap); }
    // clinic: white room, x-ray light box on the back wall
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10).rotateX(-Math.PI / 2), lamC("#d8dcd8")); floor.position.set(CLINIC[0], 0.01, CLINIC[2]); R.add(floor);
    box(R, 12, 5, 0.2, lamC("#cfe0e4"), CLINIC[0], 2.5, CLINIC[2] - 2.5);
    for (const dx of [-6, 6]) box(R, 0.2, 5, 10, lamC("#bcd0d4"), CLINIC[0] + dx, 2.5, CLINIC[2] + 2);
    box(R, 1.8, 0.7, 0.8, lamC("#e8ece8"), CLINIC[0] - 2.4, 0.35, CLINIC[2] - 1.6);
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    // the plane disappears piece by piece from W.masticar to the end of shot 6, gone from shot 8 on
    const eaten = id >= S.plaque && id !== S.end ? 1 : id === S.eat ? Math.min(1, (f - 696) / 96) : id === S.end || id === S.hook ? 0.45 : 0;
    const order = [9, 8, 7, 5, 4, 3, 2, 1, 6, 0];
    this.parts.forEach((m, i) => { const k = order.indexOf(i % 10); m.visible = i >= 10 ? eaten < 0.9 : k < 0 || k / 10 >= eaten; });
    const X = FIELD[0];
    const munch = Math.floor(f / 5) % 2 === 0;
    if (id === S.hook || id === S.end) {
      person("michel", MICHEL, X + 0.1, 0, -0.75, { mode: "stand", expr: munch ? "grin" : "laugh", facing: 1 }, 1);
      fx(`bolt|${munch ? 1 : 0}`, 256, 256, (p: Pen) => { p.poly([[40, 100], [216, 100], [216, 150], [40, 150]], "#c8c8d0", 7); p.ell(60, 125, 30, 40, "#9aa2aa", 6); }, X + 0.45, 0.95, -0.2, 0.3, 0.3);
      if (id === S.hook && f < 14) fx("b0", 256, 256, burstDraw(), X + 0.1, 1.5, -0.9, 1.4, 1.4);
    }
    if (id === S.intro) {
      person("michel", MICHEL, HOME[0], 0, 0, { mode: f < W.michel ? "stroll" : "stand", phase: t * 6, expr: f > W.mangetout - 4 ? "laugh" : "grin", facing: 1, wave: f > W.michel && f < W.mangetout ? 0.9 : undefined }, 1);
      for (let k = 0; k < 4; k++) person(`n${k}`, FOLK(k), HOME[0] - 3 + k * 2, 0, -3 - (k % 2), { mode: "stand", expr: f > W.mangetout - 4 ? "shock" : "neutral", facing: k < 2 ? 1 : -1 }, 5 + k);
    }
    if (id === S.kid) {
      const bite = f > W.vasos - 4;
      person("kid", KIDM, HOME[0] + 2.5, 0, 0, { mode: "stand", expr: bite ? (munch ? "grin" : "laugh") : "smile", facing: 1 }, 1);
      fx(`glass|${bite ? 1 : 0}`, 256, 256, glassDraw(bite), HOME[0] + 2.75, 0.9, 0.15, 0.2, 0.2);
      if (f > W.ambicioso - 4) fx("q", 512, 256, textDraw("¡MÁS!", "#ffd23f", 140), HOME[0] + 2.5, 1.55, 0.2, 0.7, 0.35);
    }
    if (id === S.menu) {
      person("michel", MICHEL, HOME[0] + 0.1, 0, -0.85, { mode: "stand", expr: munch ? "grin" : "laugh", facing: 1 }, 1);
      const items: [number, (p: Pen) => void, string][] = [[W.bicis, bikeDraw, "bike"], [W.teles, tvDraw, "tv"], [W.carritos, cartDraw, "cart"], [W.ataud - 4, coffinDraw, "coffin"]];
      let cur = -1; items.forEach((it, i) => { if (f > it[0] - 4) cur = i; });
      if (cur >= 0) { const [f0, d, k] = items[cur], pop = Math.min(1, (f - f0 + 4) / 6); fx(k, 256, 256, d, HOME[0] + 0.15, 1.05, -0.1, 0.55 * pop, 0.55 * pop); fx(`plate`, 256, 256, (p: Pen) => p.ell(128, 128, 120, 50, "#f8f4ea", 6), HOME[0] + 0.15, 0.83, -0.1, 0.6, 0.3); }
    }
    if (id === S.plane || id === S.eat) {
      const sawing = id === S.plane && f > W.corta - 4 && f < W.aceite - 4;
      person("michel", MICHEL, X + 2.2, 0, -1.6, { mode: "stand", expr: id === S.eat ? (munch ? "grin" : "laugh") : f > W.jefe - 4 && f < W.corta ? "stern" : "grin", facing: -1, prop: sawing ? ["hammer", Math.floor(f / 4) % 2] : null, wave: id === S.plane && f > W.jefe - 4 && f < W.cessna + 10 ? 0.9 : undefined }, 1);
      if (sawing && Math.floor(f / 4) % 2) fx("spark", 256, 256, burstDraw("#ffe080"), X + 1.7, 1.3, -1.4, 0.35, 0.35);
      if (id === S.plane && f > W.aceite - 4 && f < W.agua - 2) fx("oil", 256, 256, bottleDraw("#d8b030"), X + 2.55, 1.5, -1.4, 0.35, 0.35);
      if (id === S.plane && f > W.agua - 2 && f < W.masticar - 2) fx("water", 256, 256, bottleDraw("#7ac0e8"), X + 2.55, 1.5, -1.4, 0.35, 0.35);
      if (id === S.eat) for (let k = 0; k < 3; k++) { const u = ((f + k * 11) % 33) / 33; fx(`chunk${k}`, 256, 256, (p: Pen) => p.poly([[60, 80], [200, 60], [180, 190], [80, 200]], "#e8e6e0", 7), X + 1.0 - u * 0.9, 1.6 + Math.sin(u * 3.14) * 0.6, -2, 0.25, 0.25); }
    }
    if (id === S.doc) {
      const C = CLINIC[0];
      fx("xray", 512, 620, stomachDraw, C + 0.6, 1.55, -2.35, 0.9, 1.1);
      person("doc", DOC, C - 0.3, 0, -0.9, { mode: "stand", expr: f > W.doble - 4 ? "shock" : "stern", facing: 1, wave: f > W.estomago - 4 && f < W.raro ? 0.8 : undefined }, 1);
      person("michel", MICHEL, C - 0.95, 0, 0.2, { mode: "stand", expr: f > W.platanos - 4 ? "nervous" : "grin", facing: 1 }, 2);
      if (f > W.platanos - 4) fx("banana", 256, 256, bananaDraw, C + 0.05, 1.95, 0.4, 0.35, 0.35);
      if (f > W.huevos - 4) fx("egg", 256, 256, eggDraw, C + 0.45, 1.95, 0.4, 0.3, 0.3);
      if (f > W.fatal - 4) { fx("x1", 256, 256, xDraw, C + 0.05, 1.95, 0.45, 0.35, 0.35); fx("x2", 256, 256, xDraw, C + 0.45, 1.95, 0.45, 0.35, 0.35); }
    }
    if (id === S.plaque) {
      person("michel", MICHEL, X + 0.1, 0, -0.75, { mode: "stand", expr: f > W.comio - 4 ? (munch ? "grin" : "laugh") : f > W.placa ? "relief_open" : "grin", facing: 1 }, 1);
      for (let k = 0; k < 3; k++) person(`g${k}`, FOLK(k + 1), X - 1.5 + k * 1.6 + (k === 1 ? 1.4 : 0), 0, -1.9, { mode: "stand", expr: f > W.comio - 4 ? "shock" : "smile", facing: k ? -1 : 1, wave: f > W.guinness && f < W.tambien ? 0.5 + 0.5 * Math.sin(t * 8 + k) : undefined }, 3 + k);
      if (f > W.placa - 6) fx(`plq|${f > W.comio ? 1 : 0}`, 512, 370, plaqueDraw(f > W.comio), X + 0.42, 1.75, -0.3, 0.42, 0.3);
      if (f > W.comio - 4) fx("ok", 256, 256, checkDraw, X + 0.6, 1.9, -0.2, 0.3, 0.3);
    }
  }
}
