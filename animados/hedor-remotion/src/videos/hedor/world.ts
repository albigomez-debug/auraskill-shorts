// "El Gran Hedor": the Thames in 1858 (river along x, houses on the near bank at z = +8, Parliament on the far bank),
// the Commons chamber (x = HOUSE) and Bazalgette's brick sewer (x = TUNNEL).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, cobbleHD, planksHD, facadeHD } from "./paint";
import { terrace } from "./town";
import { Base, Api, lam, lamC, box, cyl, hh } from "./base";
import { smooth, S, W, HOUSE, TUNNEL, PARL_X, PARL_Z } from "./story";

const GENT = (v: number): Outfit => ({ jacket: ["#2a2a34", "#3a2a24", "#2a3a34", "#4a3a2a"][v % 4], pants: "#3a3a40", boots: "#111", hat: "tophat", skin: SKINS[v % 4], moustache: v % 2 ? "#5a3a26" : undefined, belt: null, buttons: "#c8c0b0" });
const LADY = (v: number): Outfit => ({ jacket: ["#7a3a5a", "#3a5a7a", "#6a7a3a"][v % 3], pants: "#3a3a44", boots: "#2a2020", hat: "bonnet", dress: ["#c25a7a", "#5a8fc2", "#d9a441"][v % 3], skin: SKINS[(v + 1) % 4] });
const BAZ: Outfit = { jacket: "#2a2a30", pants: "#3a3a40", boots: "#111", hat: "tophat", skin: SKINS[1], moustache: "#3a2a1e", beard: undefined, belt: null, buttons: "#c8c0b0", build: "stout" };
const NAVVY = (v: number): Outfit => ({ jacket: ["#6a5a4a", "#5a4a3a"][v % 2], pants: "#4a4a3a", boots: "#2a2020", hat: "cap", cap: "#4a4038", skin: SKINS[(v + 2) % 4], belt: "#5a3a24" });

const stinkDraw = (ph: number) => (p: Pen) => {
  for (let k = 0; k < 3; k++) {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 12; i++) { const y = 240 - i * 18; pts.push([70 + k * 58 + 18 * Math.sin(i * 0.9 + ph + k), y]); }
    p.stroke(pts, 12, "#8ac83a");
  }
};
const pourDraw = (ph: number) => (p: Pen) => { const g = p.g; g.fillStyle = "#6a5030"; g.beginPath(); g.moveTo(100, 0); g.lineTo(156, 0);
  for (let y = 0; y <= 256; y += 16) g.lineTo(156 + 8 * Math.sin(y * 0.05 + ph), y); for (let y = 256; y >= 0; y -= 16) g.lineTo(100 + 8 * Math.sin(y * 0.05 + ph + 1), y); g.fill(); };
const sunDraw = (p: Pen) => { for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; p.band([[256 + 130 * Math.cos(a), 256 + 130 * Math.sin(a)], [256 + 220 * Math.cos(a), 256 + 220 * Math.sin(a)]], "#ffb030", 26, 0); } p.ell(256, 256, 110, 110, "#ffd84a", 8); };
const planDraw = (p: Pen) => { p.poly([[10, 20], [246, 20], [246, 236], [10, 236]], "#dfe8f0", 6); for (const y of [70, 128, 186]) p.line([[30, y], [226, y]], "#3a5a9a", 8, false); for (const x of [60, 128, 196]) p.line([[x, 40], [x, 220]], "#3a5a9a", 5, false); };
const handDraw = (p: Pen) => { p.ell(128, 128, 60, 70, "#f5c9a0", 6); };

export class World extends Base {
  private curtains: THREE.Mesh[] = [];
  constructor() {
    super();
    const R = this.root;
    this.L = { ...this.L, lit: [1.62, 1.42, 1.1], fog: "#d8d0b0" };
    this.K = { ...this.K, sky: { c: ["#e8dcb8", "#d0d4c0", "#a8bcd4", "#88a8d0", "#6a90c8"], e: [0, 3, 8, 16, 40] } };
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lamC("#8a7a5a")); ground.position.y = -0.4; R.add(ground);
    // the Thames: murky brown-green water between the banks
    const waterTex = ctex("thames", 512, 512, (g, r) => { g.fillStyle = "#5a5440"; g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 700; i++) { g.strokeStyle = r() < 0.5 ? "rgba(40,36,24,0.45)" : "rgba(170,170,140,0.35)"; g.lineWidth = 2 + r() * 3; const x = r() * 512, y = r() * 512; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 20, y - 5, x + 40 + r() * 40, y); g.stroke(); }
      for (let i = 0; i < 60; i++) { g.fillStyle = "rgba(120,140,60,0.4)"; g.beginPath(); g.ellipse(r() * 512, r() * 512, 10 + r() * 20, 4, 0, 0, 6.3); g.fill(); } });
    const water = new THREE.Mesh(new THREE.PlaneGeometry(400, 30).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: rep(waterTex, 30, 2) }));
    water.position.set(0, -0.3, -18); R.add(water);
    const mud = lamC("#7a6448");
    const nb = new THREE.Mesh(new THREE.PlaneGeometry(400, 3).rotateX(-Math.PI / 2 + 0.2), mud); nb.position.set(0, -0.15, -1.6); R.add(nb);
    const fb = new THREE.Mesh(new THREE.PlaneGeometry(400, 4).rotateX(-Math.PI / 2 - 0.2), mud); fb.position.set(0, -0.15, -33.6); R.add(fb);
    const street = new THREE.Mesh(new THREE.PlaneGeometry(400, 8).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 100, 2), color: "#d0c4b4" })); street.position.set(0, 0, 4); street.receiveShadow = true; R.add(street);
    // houses on the near bank facing the river (terrace rotated so its fronts face -z)
    const row = new THREE.Group(); terrace(row, { side: 1, x: 8, z0: -60, z1: 60, seed: 131, floors: [3, 4], brick: 0.6, signs: ["TAVERN", "GROCER", "CHANDLER"] });
    row.rotation.y = -Math.PI / 2; R.add(row);
    // sewage pipes from the houses down into the river
    const iron = lamC("#3a3a3e");
    for (const x of [-8, 2, 9, 16]) { const p = cyl(R, 0.25, 0.25, 4, iron, x, 0.2, -1.2, 10); p.rotation.x = Math.PI / 2; }
    // far bank: warehouses and the Palace of Westminster
    const stone = lam({ map: rep(ctex("bath", 256, 256, (g, r) => { g.fillStyle = "#d8c49a"; g.fillRect(0, 0, 256, 256);
      for (let x = 0; x < 256; x += 16) { g.fillStyle = "rgba(120,100,70,0.35)"; g.fillRect(x, 0, 3, 256); }
      for (let y = 0; y < 256; y += 32) { g.fillStyle = "rgba(120,100,70,0.3)"; g.fillRect(0, y, 256, 3); g.fillStyle = `rgba(80,90,110,${0.5 + r() * 0.2})`; for (let x = 4; x < 256; x += 32) g.fillRect(x, y + 8, 10, 18); } }), 8, 2) });
    box(R, 60, 14, 10, stone, PARL_X, 7, PARL_Z - 5);
    for (let k = 0; k < 9; k++) { const x = PARL_X - 31.5 + k * 7; box(R, 1.4, 17, 1.4, stone, x, 8.5, PARL_Z + 0.2); const tip = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3, 4), lamC("#6a6a62")); tip.position.set(x, 18.5, PARL_Z + 0.2); R.add(tip); }
    box(R, 8, 34, 8, stone, PARL_X - 32, 17, PARL_Z - 4);   // Victoria tower
    box(R, 5, 40, 5, stone, PARL_X + 34, 20, PARL_Z - 2);   // clock tower
    const clock = new THREE.Mesh(new THREE.CircleGeometry(1.8, 24), lamC("#f2ead6")); clock.position.set(PARL_X + 34, 33, PARL_Z + 0.55); R.add(clock);
    const spire = new THREE.Mesh(new THREE.ConeGeometry(3.2, 9, 4), lamC("#4a4a52")); spire.position.set(PARL_X + 34, 44.5, PARL_Z - 2); spire.rotation.y = Math.PI / 4; R.add(spire);
    box(R, 60, 2.5, 10.4, lamC("#5a5a5a"), PARL_X, 15.2, PARL_Z - 5);
    // balcony with curtained windows (shot 5)
    box(R, 8, 0.2, 1.4, stone, PARL_X, 2.6, PARL_Z + 0.6);
    for (const dx of [-2.4, 0, 2.4]) { box(R, 1.6, 2.6, 0.05, lamC("#2a2a34"), PARL_X + dx, 4.0, PARL_Z + 0.03); }
    const cloth = lamC("#f4f2ea", { side: THREE.DoubleSide });
    for (const dx of [-3.0, -1.8, -0.6, 0.6, 1.8, 3.0]) { const c = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 2.8).translate(0, -1.4, 0), cloth); c.position.set(PARL_X + dx, 5.4, PARL_Z + 0.25); this.curtains.push(c); R.add(c); }
    for (let k = 0; k < 4; k++) for (let x = -4; x < 30; x += 9) box(R, 7, 4, 7, lam({ map: facadeHD(`wh${k}`, 7, 4, { wall: "#8a5a40", shutter: "#3a3a3a", brick: true }) }), PARL_X + 36 + x + k * 0.3, 2 + (k % 2), PARL_Z - 2);
    // boats on the river
    const hull = lam({ map: rep(planksHD(), 1, 0.3), color: "#6a4a2a" });
    for (const [x, z] of [[-6, -14], [14, -22], [30, -12]]) box(R, 4, 0.7, 1.4, hull, x, -0.1, z);
    // ---- Commons chamber ----
    {
      const C = HOUSE, green = lamC("#2f5a3a"), wood = lam({ map: rep(planksHD(), 2, 2), color: "#7a5030" });
      const fl = new THREE.Mesh(new THREE.PlaneGeometry(14, 14).rotateX(-Math.PI / 2), wood); fl.position.set(C, 0.01, 0); R.add(fl);
      for (let r = 0; r < 3; r++) for (const sx of [-1, 1]) { box(R, 0.9, 0.5 + r * 0.45, 10, green, C + sx * (2.4 + r * 1.0), 0.25 + r * 0.22, -1); }
      box(R, 14, 7, 0.3, wood, C, 3.5, -5); box(R, 0.3, 7, 14, wood, C - 6.5, 3.5, 0); box(R, 0.3, 7, 14, wood, C + 6.5, 3.5, 0);
      box(R, 1.6, 2.2, 1.2, lamC("#5a3a24"), C, 1.1, -4.2);
      box(R, 1.6, 0.9, 1.0, lamC("#6a4428"), C, 0.45, -1.5);
    }
    // ---- the sewer tunnel: brick half-pipe running away from the camera ----
    {
      const brick = lam({ map: rep(ctex("sewerbr", 256, 256, (g, r) => { g.fillStyle = "#5a2a1e"; g.fillRect(0, 0, 256, 256);
        for (let y = 0; y < 256; y += 16) for (let x = (y / 16) % 2 ? -16 : 0; x < 256; x += 32) { g.fillStyle = `rgb(${150 + r() * 40},${70 + r() * 20},${50 + r() * 15})`; g.fillRect(x + 1, y + 1, 30, 14); } }), 10, 20), side: THREE.BackSide });
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 60, 24, 1, true), brick); tube.rotation.x = Math.PI / 2; tube.position.set(TUNNEL, 2.2, -24); R.add(tube);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(4, 60).rotateX(-Math.PI / 2), lamC("#6a5a48")); floor.position.set(TUNNEL, 0.01, -24); R.add(floor);
      const lampM = new THREE.MeshLambertMaterial({ color: "#ffd890", emissive: "#ffb040", emissiveIntensity: 0.9 });
      for (let k = 0; k < 8; k++) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), lampM); l.position.set(TUNNEL + 2.1, 2.6, -2 - k * 7); R.add(l); }
      const light = new THREE.PointLight("#ffc070", 8, 18); light.position.set(TUNNEL, 3, 0); R.add(light);
    }
    void hh;
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const stink = (x: number, y: number, z: number, k: number, s = 1) => fx(`stink|${(Math.floor(f / 4) + k) % 6}`, 256, 256, stinkDraw(((Math.floor(f / 4) + k) % 6) * 1.05), x, y + ((f / 40 + k * 0.37) % 1) * 0.6, z, 0.55 * s, 0.55 * s);
    if (id === S.hook || id === S.stink) {
      const nose = id === S.hook ? f > W.mal - 4 : f > W.apestar - 4;
      for (let k = 0; k < 5; k++) {
        const o = k % 2 ? LADY(k) : GENT(k), x = (k - 2) * 1.1, z = k === 2 ? 0 : -0.8 - (k % 2) * 0.5;
        const run = id === S.hook && f > W.corriendo - 6 && k !== 2;
        person(`p${k}`, o, x + (run ? (k < 2 ? -1 : 1) * (f - W.corriendo + 6) * 0.08 : 0), 0, z, { mode: run ? "stroll" : "stand", phase: t * 7 + k, expr: nose ? (k % 2 ? "pained" : "dazed") : "neutral", facing: run ? (k < 2 ? -1 : 1) : 0, tilt: nose ? 6 * Math.sin(t * 5 + k) : 0 }, 1 + k);
      }
      if (id === S.hook && nose) for (let k = 0; k < 3; k++) stink(-0.8 + k * 0.8, 1.9, 0.2, k, 0.9);
      if (id === S.stink) for (let k = 0; k < 10; k++) stink(-8 + k * 1.8, 0.3, -5 - (k % 3) * 2.5, k, 1.6);
    }
    if (id === S.river) for (let k = 0; k < 8; k++) stink(PARL_X + 10 + k * 3, 0.4, -18 - (k % 3) * 4, k, 2.5);
    if (id === S.sewage) {
      for (const [i, x] of [-8, 2, 9, 16].entries()) if (f > W.sucias - 30 + i * 6) fx(`pour|${Math.floor(f / 3) % 4}`, 256, 256, pourDraw(Math.floor(f / 3) % 4), x, -0.1, -3.3, 0.6, 1.0);
      if (f > W.calor - 12) { const u = smooth((f - W.calor + 12) / 14); fx("sun", 512, 512, sunDraw, 8, 15, 16, 5 * u, 5 * u); }
      for (let k = 0; k < 4; k++) person(`w${k}`, k % 2 ? LADY(k) : GENT(k), 3 + k * 1.6, 0, 2.5 + (k % 2) * 0.6, { mode: "stroll", phase: t * 3 + k, expr: f > W.calor ? "pained" : "neutral", facing: 1 }, 10 + k);
      if (f > W.calor) for (let k = 0; k < 5; k++) stink(2 + k * 2.2, 0.0, -6 - k, k, 1.3);
    }
    const drop = id === S.curtains ? smooth((f - W.cortinas + 10) / 12) : id > S.curtains ? 1 : 0;
    for (const c of this.curtains) { c.visible = drop > 0.01; c.scale.y = Math.max(0.01, drop); }
    if (id === S.curtains) {
      // politicians on the balcony, curtains soaked in lime hanging at every window, noses held
      const hung = f > W.cortinas - 10;
      for (let k = 0; k < 3; k++) person(`mp${k}`, GENT(k + 4), PARL_X - 2.4 + k * 2.4 + (k === 1 ? 0 : 0), 2.7, PARL_Z + 0.75, { mode: "stand", expr: f > W.olor - 6 ? "pained" : hung ? "nervous" : "dazed", tilt: 4 * Math.sin(t * 4 + k) }, 30 + k, false);
      for (let k = 0; k < 4; k++) stink(PARL_X - 3 + k * 2, 0.5, PARL_Z + 2.5, k, 1.2);
    }
    if (id === S.vote) {
      const C = HOUSE;
      for (let k = 0; k < 14; k++) {
        const sx = k % 2 ? 1 : -1, r = Math.floor(k / 2) % 3, z = -3.5 + Math.floor(k / 6) * 2.5;
        const yes = f > W.aprobaron - 4;
        person(`m${k}`, GENT(k), C + sx * (2.4 + r * 1.0), 0.5 + r * 0.45, z, { mode: "stand", expr: yes ? (k % 3 ? "grin" : "laugh") : "pained", raise: yes ? 1 : 0, facing: (-sx) as -1 | 1 }, 40 + k, false);
      }
      person("speaker", { ...GENT(1), jacket: "#1a1a20", hat: "tophat" }, C, 0, -3.4, { mode: "stand", expr: f > W.dias ? "grin" : "stern", wave: f > W.dias - 4 ? 0.8 : undefined }, 60);
    }
    if (id === S.sewer) {
      const C = TUNNEL;
      person("baz", BAZ, C - 0.2, 0, 0, { mode: "stand", expr: f > W.usa - 6 ? "grin" : "smile" as never, wave: f > W.alcantarillas - 4 && f < W.usa ? 0.7 : undefined }, 70);
      fx("plan", 256, 256, planDraw, C + 0.35, 1.15, 0.15, 0.5, 0.5);
      for (let k = 0; k < 4; k++) person(`nv${k}`, NAVVY(k), C + (k % 2 ? 1.1 : -1.1), 0, -4 - k * 4, { mode: "march", phase: t * 3 + k, expr: "grin" }, 80 + k);
      void handDraw;
    }
  }
}
