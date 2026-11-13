// "La lluvia de carne": a Kentucky farm field (x = 0) with the soap pot, the newspaper office wall (x = -6), the scientist's table (LAB) and the sky (SKYY).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, planksHD, grassHD, roofHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { vultureDraw, meatDraw, burstDraw } from "./beasts";
import { S, W, POT, LAB, SKYY } from "./story";

const CROUCH: Outfit = { jacket: "#7a5a8a", pants: "#4a3a3a", boots: "#3a2a20", hat: "bonnet", dress: "#9a6aa8", skin: SKINS[1], belt: null };
const TASTER = (v: number): Outfit => ({ jacket: v ? "#8a5a34" : "#4a6a8a", pants: "#4a4a3a", boots: "#3a2a20", hat: v ? "slouch" : "cap", cap: "#6a4a2a", skin: SKINS[v ? 2 : 0], beard: v ? "#5a3a20" : undefined, moustache: v ? undefined : "#6a4a2a", belt: null });
const SCI: Outfit = { jacket: "#f2f0ea", pants: "#3a3a44", boots: "#1a1a1e", hat: "hair", hair: "#c8c8c8", skin: SKINS[0], moustache: "#c8c8c8", belt: null, buttons: "#9aa2aa" };
const FOLK = (v: number): Outfit => ({ jacket: ["#6a7a3a", "#8a3a3a", "#3a5a7a", "#9a7a3a"][v % 4], pants: "#3a3a40", boots: "#2a2020", hat: v % 2 ? "bonnet" : "slouch", dress: v % 2 ? ["#d9a441", "#5a8fc2"][v % 2] : undefined, skin: SKINS[v % 4] });

const fireDraw = (k: number) => (p: Pen) => { p.poly([[60, 240], [90 + k * 10, 120], [120, 180], [128, 40 + k * 20], [150, 170], [180, 100 - k * 10], [200, 240]], "#ff8a2a", 5); p.poly([[100, 240], [128, 140], [160, 240]], "#ffd23f", 0); };
const sheepDraw = (p: Pen) => { p.ell(128, 128, 118, 100, "#ffffff", 6); for (let k = 0; k < 7; k++) p.ell(70 + (k % 4) * 38, 110 + Math.floor(k / 4) * 40, 30, 26, "#f2f0ea", 4); p.ell(195, 110, 26, 30, "#3a3a44", 4); p.dot(200, 104, 5, "#fff"); for (const x of [90, 150]) p.stroke([[x, 165], [x, 205]], 10); };
const paperDraw = (p: Pen) => {
  p.poly([[20, 20], [700, 20], [700, 900], [20, 900]], "#ece6d6", 10);
  const g = p.g; g.fillStyle = "#1a1a1e"; g.textAlign = "center";
  g.font = "bold 46px Georgia, serif"; g.fillText("THE KENTUCKY TIMES · 1876", 360, 90); p.stroke([[50, 110], [670, 110]], 6);
  g.font = "bold 110px Georgia, serif"; g.fillText("¡LLUEVE", 360, 240); g.fillText("CARNE!", 360, 360);
  for (let k = 0; k < 12; k++) p.line([[60 + (k % 2) * 330, 430 + Math.floor(k / 2) * 70], [330 + (k % 2) * 330, 430 + Math.floor(k / 2) * 70]], "#8a8478", 10, false);
  p.poly([[380, 420], [660, 420], [660, 560], [380, 560]], "#c8c0b0", 4);
};
const labelDraw = (txt: string, col: string) => (p: Pen) => { p.poly([[10, 10], [502, 10], [502, 150], [10, 150]], col, 8); p.g.fillStyle = "#fff"; p.g.font = "bold 80px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 256, 110); };
const qDraw = (p: Pen) => { p.g.fillStyle = "#ffd23f"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 14; p.g.font = "bold 200px Arial"; p.g.textAlign = "center"; p.g.strokeText("?", 128, 200); p.g.fillText("?", 128, 200); };
const sickDraw = (p: Pen) => { for (let k = 0; k < 3; k++) p.arc(128, 80 + k * 50, 60 - k * 10, 20, 200, 340, 12, "#7ac85a"); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    this.K = { ...this.K, sky: { c: ["#e8eef4", "#cfe0f2", "#a8c8ec", "#80aee2", "#5a8ed6"], e: [0, 3, 8, 16, 40] } };
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(grassHD(), 600, 600), color: "#c8d49a" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    // rolling hills
    for (let k = 0; k < 7; k++) { const h = new THREE.Mesh(new THREE.SphereGeometry(30 + k * 4, 18, 8), lamC(k % 2 ? "#7a9a4a" : "#6a8a42")); h.scale.y = 0.25; h.position.set(-90 + k * 32, -3, -70 - (k % 3) * 15); R.add(h); }
    // farmhouse, fence, trees
    const wood = lam({ map: rep(planksHD(), 1.5, 1), color: "#d8c8a8" });
    box(R, 7, 3.6, 5, wood, -3.5, 1.8, -9);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 2.2, 4), lam({ map: rep(roofHD("#5a4a52"), 2, 2) })); roof.rotation.y = Math.PI / 4; roof.scale.set(1.0, 1, 0.75); roof.position.set(-3.5, 4.7, -9); R.add(roof);
    const post = lamC("#7a5a3a");
    for (let k = 0; k < 18; k++) cyl(R, 0.05, 0.06, 1.0, post, -9 + k * 1.1, 0.5, -5, 6);
    box(R, 19, 0.06, 0.04, post, 0.4, 0.8, -5);
    const leaf = lamC("#4a7a3a"), trunk = lamC("#6a4a2a");
    for (const [x, z] of [[6, -8], [9, -12], [-10, -14], [12, -4]] as const) { cyl(R, 0.2, 0.25, 2.6, trunk, x, 1.3, z, 6); const b = new THREE.Mesh(new THREE.SphereGeometry(1.8, 12, 8), leaf); b.position.set(x, 3.6, z); b.castShadow = true; R.add(b); }
    // the soap pot on a fire
    const pot = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 10, 0, Math.PI * 2, Math.PI * 0.35, Math.PI * 0.65), lamC("#2a2a30", { side: THREE.DoubleSide })); pot.position.set(POT[0], 0.62, POT[2]); R.add(pot);
    const soap = new THREE.Mesh(new THREE.CircleGeometry(0.37, 16).rotateX(-Math.PI / 2), lamC("#e8e0b0")); soap.position.set(POT[0], 0.82, POT[2]); R.add(soap);
    for (const a of [0, 2.1, 4.2]) { const l = cyl(R, 0.03, 0.03, 0.9, trunk, POT[0] + Math.cos(a) * 0.4, 0.4, POT[2] + Math.sin(a) * 0.4, 5); l.rotation.set(Math.sin(a) * 0.25, 0, -Math.cos(a) * 0.25); }
    // newspaper office wall
    box(R, 4, 3, 0.2, lam({ map: rep(planksHD(), 1, 1), color: "#a88a6a" }), -6, 1.5, -1.3);
    // the scientist's table and microscope
    box(R, 1.4, 0.06, 0.7, lamC("#e8e4dc"), LAB[0], 0.9, LAB[2]);
    for (const dx of [-0.6, 0.6]) cyl(R, 0.03, 0.03, 0.9, lamC("#6a6a72"), LAB[0] + dx, 0.45, LAB[2], 6);
    cyl(R, 0.12, 0.14, 0.05, lamC("#2a2a30"), LAB[0] + 0.3, 0.95, LAB[2]); const tube = cyl(R, 0.04, 0.05, 0.4, lamC("#2a2a30"), LAB[0] + 0.3, 1.15, LAB[2], 8); tube.rotation.z = 0.3;
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    /** meat chunks falling: deterministic per index, landing spots spread over the field */
    const rain = (n: number, f0: number, cx: number, cz: number, spread: number, y0 = 8, loop = false, big = 1) => {
      for (let k = 0; k < n; k++) {
        const t0 = f0 + ((k * 37) % 60), x = cx + Math.sin(k * 12.9) * spread, z = cz + Math.cos(k * 7.7) * spread * 0.6 - spread * 0.2, s = (0.12 + ((k * 13) % 7) * 0.02) * big;
        if (f < t0) continue;
        const y = loop ? y0 - (((f - t0) * 0.12) % (y0 + 0.5)) + 0.2 : Math.max(s * 0.4, y0 - (f - t0) * 0.25);
        if (loop && y < 0.1) continue;
        fx(`meat${k % 5}`, 256, 256, meatDraw(k % 5), x, y, z, s, s * 0.8);
      }
    };
    if (id === S.hook || id === S.end || id === S.farm || id === S.plaf || id === S.after) {
      const up = id === S.hook || id === S.end || (id === S.plaf && f > W.trozos - 4);
      const ex = id === S.after ? (f > W.suerte - 4 ? "relief" : "neutral") : up ? "shock" : id === S.plaf ? (f > W.plaf1 - 3 ? "shock" : "neutral") : "smile";
      person("crouch", CROUCH, -0.3, 0, -0.1, { mode: "stand", expr: ex as never, facing: 1, look: up ? -1 : 0, wave: id === S.farm || (id === S.plaf && f < W.plaf1) ? Math.sin(t * 3) * 0.3 + 0.4 : undefined }, 1);
      fx(`fire|${Math.floor(f / 5) % 2}`, 256, 256, fireDraw(Math.floor(f / 5) % 2), POT[0], 0.18, POT[2] + 0.3, 0.45, 0.45);
    }
    if (id === S.hook || id === S.end) { rain(45, -400, 0.1, 0.4, 1.2, 4, true, 1.3); rain(12, -200, 0.2, 0.3, 1.8, 4, false); }
    if (id === S.plaf) {
      const hits = [W.plaf1, W.plaf2, W.plaf3];
      hits.forEach((h, k) => {
        const x = -0.05 + k * 0.3, z = 0.6 - k * 0.2, y = Math.max(0.06, 2.5 - (f - h + 10) * 0.25);
        if (f > h - 10) fx(`meat${k}`, 256, 256, meatDraw(k), x, y, z, 0.18, 0.14);
        if (f >= h && f < h + 6) fx(`b${k}`, 256, 256, burstDraw("#ff8a8a"), x, 0.12, z + 0.05, 0.4, 0.4);
      });
      if (f > W.trozos - 10) rain(22, W.trozos - 10, 0.3, 0.2, 1.6, 4);
    }
    if (id === S.field) {
      rain(90, 280, 0, -1, 6, 4, false, 1.8);
      person("crouch", CROUCH, -0.3, 0, -0.1, { mode: "stand", expr: "shock", facing: 1 }, 1);
      if (f > W.curiosos - 10) for (let k = 0; k < 6; k++) person(`cu${k}`, FOLK(k), -5 + k * 0.5 + (f - W.curiosos) * 0.02, 0, 2 + (k % 3) * 0.6, { mode: "stroll", phase: t * 6 + k, expr: "shock", facing: 1 }, 10 + k);
    }
    if (id === S.taste || id === S.after) {
      rain(20, -100, -2.2, 0.2, 2.5, 3);
      const sick = id === S.after && f > W.desgracia - 4;
      for (let k = 0; k < 2; k++) {
        const x = -2.6 + k * 0.75;
        person(`ta${k}`, TASTER(k), x, 0, 0.5, { mode: "stand", expr: sick ? (f > W.vomito - 4 ? "pained" : "shock") : id === S.taste ? (f > W.cordero - 4 ? "grin" : f > W.prueban - 4 ? "lick" : "neutral") : "smile", facing: (k ? -1 : 1) as -1 | 1, wave: id === S.taste && f > W.prueban - 6 && f < W.cordero ? 0.9 : undefined }, 20 + k);
        if (id === S.taste && f > W.prueban - 6 && f < W.cordero) fx(`bite${k}`, 256, 256, meatDraw(k + 2), x + (k ? -0.2 : 0.2), 1.45, 0.65, 0.12, 0.1);
        if (sick && f > W.vomito - 6) fx(`sick${k}`, 256, 256, sickDraw, x, 2.0, 0.6, 0.3, 0.3);
      }
      if (id === S.taste && f > W.cordero - 4) fx("sheep", 256, 256, sheepDraw, -2.2, 2.25, 0.6, 0.45, 0.45);
    }
    if (id === S.news) {
      fx("paper", 720, 920, paperDraw, -6, 1.45, -1.1, 0.95, 1.21);
      if (f > W.milagro - 4) fx("q", 256, 256, qDraw, -5.55, 2.1, -1.0, 0.3, 0.3);
    }
    if (id === S.science) {
      person("sci", SCI, LAB[0] - 0.4, 0, LAB[2] - 0.5, { mode: "stand", expr: f > W.cartilago - 4 ? "grin" : "stern", facing: 1 }, 1);
      fx("sample", 256, 256, meatDraw(3), LAB[0] - 0.2, 0.98, LAB[2] + 0.1, 0.18, 0.14);
      const L = [[W.pulmon, "PULMÓN", "#c8424a"], [W.musculo, "MÚSCULO", "#a8323a"], [W.cartilago, "CARTÍLAGO", "#8a7a9a"]] as const;
      L.forEach(([w, txt, col], k) => { if (f > w - 3) fx(`lab${k}`, 512, 160, labelDraw(txt, col), LAB[0] + 0.15, 1.72 - k * 0.24, LAB[2] + 0.3, 0.6, 0.19); });
    }
    if (id === S.sky) {
      for (let k = 0; k < 6; k++) {
        const x = -2.5 + k * 1.1 + (f - 722) * 0.012, z = -0.5 - (k % 3) * 1.4, y = SKYY + Math.sin(k * 2.3) * 0.6;
        const scared = (k === 2 && f > W.asusta - 4) || f > W.vomita2 - 4;
        card(`vul|${Math.floor(t * 6 + k) % 4}|${scared ? 1 : 0}`, x, z, 0.75, vultureDraw((Math.floor(t * 6 + k) % 4) * 1.57, true, scared ? 1 : 0), 1, 0, y);
        const t0 = k === 2 ? W.vomita : W.vomita2 + k * 3;
        if (f > t0) for (let j = 0; j < 3; j++) { const dt = f - t0 - j * 6; if (dt > 0) fx(`meat${(j + k) % 5}`, 256, 256, meatDraw((j + k) % 5), x + 0.75 + j * 0.08, y + 1.0 - dt * 0.05 - dt * dt * 0.002, z + 0.1, 0.32, 0.25); }
      }
    }
  }
}
