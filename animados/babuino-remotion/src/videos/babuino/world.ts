// "El babuino guardavías": Uitenhage station (RAIL, x = 0) with platform, track along z = -2.6, a train that comes and goes,
// and the signal box with its lever frame (BOX, x = 6).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, planksHD, roofHD, stoneHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { burstDraw, coinDraw } from "./beasts";
import { baboonDraw, bottleDraw, qDraw, xDraw, checkDraw, paperDraw, textDraw, zzzDraw } from "./extra";
import { S, W, BOX } from "./story";

const JAMES: Outfit = { jacket: "#2a3a6a", pants: "#2a2a32", boots: "#1a1a1e", hat: "cap", cap: "#1a2440", skin: SKINS[0], belt: null, buttons: "#e8c45a", moustache: "#8a5a2a" };
const INSPECTOR: Outfit = { jacket: "#3a3a44", pants: "#2a2a32", boots: "#1a1a1e", hat: "tophat", skin: SKINS[1], belt: null, buttons: "#c8c0b0", moustache: "#5a5a5a", build: "stout" };
const LADY: Outfit = { jacket: "#8a3a5a", pants: "#3a2a3a", boots: "#2a1a1a", hat: "bonnet", dress: "#c25a7a", skin: SKINS[0], buttons: "#f2ece0" };
const DRIVER: Outfit = { jacket: "#4a4a52", pants: "#3a3a40", boots: "#1a1a1e", hat: "cap", cap: "#3a3a40", skin: SKINS[2], belt: null, buttons: "#9a9a9a" };
const WORKER: Outfit = { jacket: "#6a5a3a", pants: "#3a3a40", boots: "#2a1a1a", hat: "cap", cap: "#5a4a2a", skin: SKINS[3], belt: null, buttons: "#9a9a9a" };
/** the lever frame seen from the front: five levers, lever k pulled by pull[k] (0..1) */
const leversDraw = (pull: number[]) => (p: Pen) => {
  p.poly([[20, 360], [492, 360], [492, 420], [20, 420]], "#5a4a3a", 8);
  pull.forEach((u, k) => { const x = 70 + k * 92, a = (-0.5 + u * 1.0); const tx = x + Math.sin(a) * 260, ty = 380 - Math.cos(a) * 260; p.stroke([[x, 380], [tx, ty]], 22, ["#c8323a", "#c8323a", "#3a6ac8", "#e8c45a", "#2a2a32"][k]); p.ell(tx, ty, 18, 18, "#d8d0c0", 5); });
};
const keyDraw = (p: Pen) => { p.ell(80, 128, 50, 50, null, 18); p.band([[130, 128], [230, 128]], "#e8c45a", 22, 6); p.stroke([[200, 128], [200, 170]], 16, "#e8c45a"); p.stroke([[225, 128], [225, 160]], 16, "#e8c45a"); p.ell(80, 128, 50, 50, null, 0); };
const cartDraw = (p: Pen) => { p.poly([[30, 60], [226, 60], [226, 150], [30, 150]], "#8a5a34", 8); for (const x of [70, 186]) { p.ell(x, 180, 40, 40, "#2a2a30", 7); p.dot(x, 180, 8, "#c8c0b0"); } };
const blanketDraw = (p: Pen) => { p.poly([[20, 40], [236, 40], [236, 200], [20, 200]], "#c8423a", 7); for (let k = 0; k < 4; k++) p.stroke([[20, 70 + k * 36], [236, 70 + k * 36]], 6, "#f2e2b8"); };

export class World extends Base {
  train = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    const dust = ctex("dust", 256, 256, (g, r) => { g.fillStyle = "#c8a878"; g.fillRect(0, 0, 256, 256); for (let k = 0; k < 400; k++) { g.fillStyle = `rgba(${r() > 0.5 ? 90 : 230},${r() > 0.5 ? 70 : 200},50,${r() * 0.15})`; g.fillRect(r() * 256, r() * 256, 2 + r() * 5, 2 + r() * 3); } });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(dust, 500, 500), color: "#e0c898" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    // track: ballast, sleepers, rails along x at z = -2.6
    const bal = new THREE.Mesh(new THREE.PlaneGeometry(400, 2.6).rotateX(-Math.PI / 2), lamC("#8a8078")); bal.position.set(0, 0.005, -2.6); bal.receiveShadow = true; R.add(bal);
    const sl = lamC("#5a4030"); for (let k = 0; k < 120; k++) box(R, 0.22, 0.08, 2.0, sl, -60 + k, 0.04, -2.6);
    for (const dz of [-0.55, 0.55]) box(R, 400, 0.1, 0.07, lamC("#6a6a72"), 0, 0.13, -2.6 + dz);
    // platform and station building
    box(R, 30, 0.5, 2.6, lam({ map: rep(stoneHD(), 10, 1), color: "#c8c0b0" }), -4, 0.25, 0.2);
    const wall = lam({ map: rep(planksHD(), 3, 1), color: "#e8d8b8" });
    box(R, 10, 3.6, 4, wall, -5, 1.8, 4.6 + 4); // behind the camera side: keeps the frame clean
    box(R, 9, 3.4, 4, wall, -6, 1.7, -8); const rf = new THREE.Mesh(new THREE.ConeGeometry(7, 2, 4), lam({ map: rep(roofHD("#7a3a2a"), 2, 2) })); rf.rotation.y = Math.PI / 4; rf.scale.set(1, 1, 0.5); rf.position.set(-6, 4.4, -8); R.add(rf);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3, 0.6), lamC("#f2ece0")); sign.position.set(-6, 3.0, -5.98); R.add(sign);
    // signal box: small raised cabin with big windows, the lever frame is drawn as fx
    box(R, 3.2, 0.5, 2.6, lam({ map: rep(planksHD(), 1, 1), color: "#8a5a34" }), BOX[0], 0.25, BOX[2] - 0.6);
    box(R, 3.2, 2.4, 0.15, lam({ map: rep(planksHD(), 1, 1), color: "#a8423a" }), BOX[0], 1.7, BOX[2] - 1.9);
    for (const dx of [-1.6, 1.6]) box(R, 0.12, 2.4, 2.6, lamC("#a8423a"), BOX[0] + dx, 1.7, BOX[2] - 0.6);
    box(R, 3.6, 0.15, 3.0, lam({ map: rep(roofHD("#4a4a52"), 1, 1) }), BOX[0], 3.0, BOX[2] - 0.6);
    // semaphore post
    cyl(R, 0.07, 0.08, 5, lamC("#e8e4dc"), BOX[0] + 3, 2.5, -1.2, 8);
    // the train (moved in pose): loco + 3 carriages, facing -x
    R.add(this.train);
    const T = this.train, blk = lamC("#2a2a30"), grn = lamC("#3a6a4a"), red = lamC("#8a2a26");
    box(T, 4.5, 1.6, 1.8, blk, 0, 1.3, 0); cyl(T, 0.75, 0.75, 4, blk, 0.2, 1.7, 0, 16).rotation.z = Math.PI / 2;
    cyl(T, 0.22, 0.3, 1.0, blk, -1.4, 2.8, 0, 10); box(T, 1.6, 2.2, 1.9, red, 1.7, 2.0, 0);
    for (const dx of [-1.5, -0.3, 0.9]) { const w = cyl(T, 0.55, 0.55, 2.0, lamC("#c8323a"), dx, 0.6, 0, 16); w.rotation.x = Math.PI / 2; }
    for (let c = 0; c < 3; c++) { const x = 5.6 + c * 5.4; box(T, 5, 2.2, 2.0, grn, x, 1.6, 0); box(T, 5.2, 0.15, 2.2, lamC("#5a4a3a"), x, 2.8, 0); for (let k = 0; k < 4; k++) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.6), lamC("#f2e2a8")); w.position.set(x - 1.7 + k * 1.15, 1.9, 1.01); T.add(w); } for (const dx of [-1.6, 1.6]) { const wh = cyl(T, 0.4, 0.4, 2.1, blk, x + dx, 0.45, 0, 12); wh.rotation.x = Math.PI / 2; } }
    T.position.set(40, 0, -2.6);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    // train position per shot
    let tx = 60;
    if (id === S.hook || id === S.end) tx = 14 - ((id === S.end ? f - 1074 : f) * 0.12);
    if (id === S.intro) tx = 30 - (f - 96) * 0.2;
    if (id === S.fall) tx = -3;
    if (id === S.keys) tx = -5.0;
    if (id === S.lady) tx = 0.5;
    if (id === S.levers) tx = 20 - (f - 498) * 0.25;
    this.train.position.x = tx;
    const B = BOX[0];
    const jack = (key: string, x: number, y: number, z: number, mode: "walk" | "sit" | "lever" | "push" | "proud", pull = 0, mood: "calm" | "wide" | "happy" = "calm", dir = 1, cap = false) => {
      const ph = (Math.round(t * 8) % 8) * 0.785, pq = Math.round(pull * 6) / 6;
      card(`jack|${key}|${mode}|${pq}|${mood}|${cap ? 1 : 0}|${mode === "walk" || mode === "push" ? Math.round(t * 8) % 8 : 0}`, x, z, 0.4, baboonDraw(ph, mode, pq, mood, cap), dir, 0, y);
    };
    const levers = (k0: number, u: number) => { const pull = [0, 0.15, 0, 0, 0]; pull[k0] = u; fx(`lev|${pull.map((v) => Math.round(v * 6)).join("")}`, 512, 420, leversDraw(pull.map((v) => Math.round(v * 6) / 6)), B + 0.35, 0.95, -0.4, 1.0, 0.82); };
    const pullAt = (fr: number, per = 40) => 0.5 - 0.5 * Math.cos(((fr % per) / per) * Math.PI * 2);
    const seated = (x: number, z: number, expr: "grin" | "smile" | "laugh" | "shock" | "stern" | "relief" | "nervous", k = 1) => {
      fx("cart", 256, 256, cartDraw, x, 0.75, z + 0.15, 0.85, 0.85);
      person("james", JAMES, x, 0.55, z, { mode: "sit", expr, facing: 1 }, k, false);
      fx("blanket", 256, 256, blanketDraw, x + 0.05, 0.9, z + 0.25, 0.6, 0.45);
    };
    if (id === S.hook || id === S.end || id === S.levers) {
      const u = pullAt(f + 10);
      levers(2, u);
      jack("box", B + 0.05, 0.5, -0.1, "lever", u, "calm", 1, true);
    }
    if (id === S.intro) person("james", JAMES, -1.2, 0.5, 0, { mode: f < W.ferrocarril ? "stroll" : "stand", phase: t * 6, expr: "smile", facing: 1, wave: f > W.ferrocarril ? 0.8 : undefined }, 1);
    if (id === S.fall) {
      const down = f > W.cae - 4;
      person("james", JAMES, -1.6, 0.5, -0.6, { mode: down ? "fall" : "stand", expr: down ? "shock" : "smile", facing: 1 }, 1);
      if (f > W.cae - 3 && f < W.cae + 12) fx("hit", 256, 256, burstDraw(), -1.5, 1.0, -0.4, 1.1, 1.1);
      if (f > W.pierde - 4) fx("x", 256, 256, xDraw, -1.0, 1.6, -0.3, 0.45, 0.45);
    }
    if (id === S.buy) {
      seated(-0.2, 0.2, f > W.babuino - 4 ? "grin" : "stern");
      if (f > W.que - 4 && f < W.compra) fx("q", 256, 256, qDraw(), -0.2, 1.7, 0.2, 0.4, 0.4);
      if (f > W.babuino - 4) { jack("buy", 0.7, 0.5, 0.25, "sit", 0, f > W.jack - 4 ? "happy" : "wide", -1); if (f < W.babuino + 8) fx("pop", 256, 256, burstDraw("#ffd23f"), 0.7, 0.8, 0.2, 0.8, 0.8); }
    }
    if (id === S.push) {
      const x = -1.6 + (f - 388) * 0.04;
      seated(x, 0.2, "laugh");
      jack("push", x - 0.75, 0.5, 0.25, "push", 0, "happy", 1, true);
    }
    if (id === S.keys) {
      person("driver", DRIVER, -2.9, 0.5, -1.2, { mode: "stand", expr: f > W.maquinistas - 4 ? "shock" : "neutral", facing: -1, wave: f > W.llaves ? 0.6 : undefined }, 2);
      jack("keys", -3.8, 0.5, -0.7, "proud", 0, "happy", 1, true);
      fx("key", 256, 256, keyDraw, -3.45, 1.15 + Math.min(0.2, (f - 444) * 0.004), -0.6, 0.25, 0.25);
    }
    if (id === S.lady) {
      person("lady", LADY, 2.9, 0.5, -0.4, { mode: "stand", expr: f > W.mono - 4 ? "shock" : "smile", facing: 1 }, 1);
      jack("seen", B + 0.05, 0.5, -0.1, "lever", pullAt(f), "calm", 1, true);
      levers(1, pullAt(f));
      if (f > W.escandalo - 4) fx("bang", 512, 256, textDraw("¡¡!!", "#ff3b3b", 170), 2.9, 2.35, -0.3, 0.6, 0.3);
    }
    if (id === S.exam) {
      const pass = f > W.aprobado - 4;
      person("insp", INSPECTOR, B + 0.95, 0.5, 0.3, { mode: "stand", expr: pass ? "shock" : "stern", facing: -1, wave: f > W.contratan - 4 ? 0.9 : undefined }, 1);
      jack("exam", B - 0.25, 0.5, -0.1, "lever", pullAt(f, 30), pass ? "happy" : "calm", 1, true);
      levers(3, pullAt(f, 30));
      fx(`exam|${pass ? 1 : 0}`, 512, 620, paperDraw("EXAMEN", ["Señales: OK", "Agujas: OK", "Llaves: OK"], pass ? "APROBADO" : undefined, "#2a8a3a"), B + 1.3, 1.6, 0.5, 0.42, 0.5);
    }
    if (id === S.pay) {
      jack("pay", 0.3, 0.5, 0, "proud", 0, "happy", 1, true);
      if (f > W.veinte - 4) for (let k = 0; k < 3; k++) fx(`coin${k}`, 256, 256, coinDraw("20¢"), -0.2 + k * 0.2, 1.4 + 0.04 * Math.sin(t * 5 + k), 0.1, 0.18, 0.18);
      if (f > W.media - 4 && f < W.nueve) fx("beer", 256, 256, bottleDraw(), 0.75, 1.2, 0.1, 0.3, 0.3);
      if (f > W.nueve - 4) fx("ok", 256, 256, checkDraw, 0.75, 1.3, 0.1, 0.3, 0.3);
    }
    if (id === S.best) {
      jack("best", -2.75, 0.5, -0.2, "proud", 0, "happy", 1, true);
      person("lazy", WORKER, -1.75, 0.5, -0.5, { mode: "sit", expr: "dazed", facing: -1 }, 2, false);
      fx("zzzW", 256, 256, zzzDraw, -1.55, 1.75, -0.4, 0.4, 0.4);
    }
  }
}
