// "Napoleón contra los conejos": a meadow at the edge of a wood, a row of rabbit cages, the imperial carriage.
import * as THREE from "three";
import { Pen, Outfit, SKINS, soldier } from "./toon";
import { rep, planksHD, grassHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl, hh } from "./base";
import { smooth, S, W, CAGES_Z, COACH } from "./story";

const NAPOLEON: Outfit = { jacket: "#24346a", pants: "#efece2", boots: "#16141a", hat: "bicorne", skin: SKINS[0], buttons: "#e8c45a", belt: null, build: "stout" };
const BERTHIER: Outfit = { jacket: "#2a3f7a", pants: "#efece2", boots: "#16141a", hat: "bicorne", skin: SKINS[1], moustache: "#5a3a26", buttons: "#e8c45a", sash: "#c8323a", belt: null };
const HUNTER = (v: number): Outfit => soldier(v, { jacket: ["#2a5a3a", "#3a4a2a"][v % 2], pants: "#efece2", hat: "cap", cap: "#2a3a2a", belt: "#6a4a2a", buttons: "#e8c45a" });

const FUR = ["#f4f1ea", "#a8865e", "#8a8a90", "#c8a47a", "#5a4636", "#e8dcc8"];
/** rabbit in profile facing right on the wide card (feet at y = 1375) */
const rabbitDraw = (c: number, hop: number, mode: "sit" | "run" | "beg") => (p: Pen) => {
  const G = 1375, col = FUR[c % FUR.length], dark = c % FUR.length === 4 ? "#3a2a20" : "#6a5a50";
  const lift = mode === "run" ? Math.abs(Math.sin(hop)) * 160 : 0, stretch = mode === "run" ? 1.25 : 1;
  const bx = 1000, by = G - 230 - lift;
  if (mode === "beg") {
    p.ell(bx, G - 330, 170, 260, col, 9); p.ell(bx + 40, G - 650, 120, 110, col, 9);
    for (const dx of [-30, 40]) p.ell(bx + 20 + dx, G - 880, 34, 150, col, 7);
    p.ell(bx + 20 + 40, G - 860, 16, 110, "#f0a0a8", 0);
    p.ell(bx + 90, G - 680, 26, 26, "#fffbea", 5); p.dot(bx + 96, G - 676, 13); p.ell(bx + 150, G - 625, 14, 10, "#e86e78", 3);
    p.ell(bx + 60, G - 430, 40, 30, col, 6); p.ell(bx + 120, G - 430, 40, 30, col, 6);
    return;
  }
  p.ell(bx - 220 * stretch, by + 40, 70, 60, "#ffffff", 7);                 // tail
  p.ell(bx - 40, by, 230 * stretch, 160, col, 9);                         // body
  p.ell(bx + 120, by + 170, 110, 40, col, 7);                             // front paw
  p.ell(bx - 170, by + 180, 150, 50, col, 7);                             // hind foot
  const hx = bx + 200 * stretch, hy = by - 120;
  for (const [dx, a] of [[-40, mode === "run" ? -1.1 : -0.2], [10, mode === "run" ? -1.0 : 0.1]] as const) {
    const ex = hx + dx + Math.sin(a) * 250, ey = hy - 60 - Math.cos(a) * 250;
    p.band([[hx + dx, hy - 60], [ex, ey]], col, 70, 7, "round");
    p.band([[hx + dx + 6, hy - 80], [ex + 4, ey + 20]], "#f0a0a8", 26, 0, "round");
  }
  p.ell(hx, hy, 130, 110, col, 9);
  p.ell(hx + 40, hy - 25, 28, 28, "#fffbea", 5); p.dot(hx + 48, hy - 22, 14);
  p.ell(hx + 125, hy + 15, 16, 12, "#e86e78", 3);
  for (const s of [-1, 1]) p.stroke([[hx + 110, hy + 30], [hx + 190, hy + 30 + s * 24]], 4, dark);
};
const paperDraw = (p: Pen) => { p.poly([[30, 20], [226, 20], [226, 236], [30, 236]], "#f2ecdc", 6); for (let k = 0; k < 6; k++) p.line([[50, 50 + k * 26], [206, 50 + k * 26]], "#8a8478", 4, false); p.stroke([[120, 205], [200, 195]], 6, "#2a3a8a"); };
const heartDraw = (p: Pen) => { p.poly([[128, 220], [30, 120], [50, 50], [128, 80], [206, 50], [226, 120]], "#e84a5a", 6); };

export class World extends Base {
  private doors: THREE.Mesh[] = [];
  private coach: THREE.Group;
  constructor() {
    super();
    const R = this.root;
    this.L = { ...this.L, el: 42, lit: [1.58, 1.46, 1.2] };
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(grassHD(), 400, 400), color: "#d8e0b0" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    // the wood all around
    const trunk = lamC("#5a4232"), leaves = [lamC("#4f8a3e"), lamC("#5a9a44"), lamC("#467a3a")];
    for (let k = 0; k < 90; k++) {
      const a = (k / 90) * Math.PI * 2 + hh(k, 3) * 0.05, d = 22 + hh(k, 4) * 30, x = Math.cos(a) * d, z = Math.sin(a) * d - 6, h = 4 + hh(k, 5) * 4;
      cyl(R, 0.25, 0.35, h, trunk, x, h / 2, z, 7);
      for (let j = 0; j < 3; j++) { const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8 + hh(k, 6 + j), 1), leaves[(k + j) % 3]); c.position.set(x + (hh(k, 9 + j) - 0.5) * 2, h + hh(k, 12 + j) * 1.5, z + (hh(k, 15 + j) - 0.5) * 2); c.castShadow = true; R.add(c); }
    }
    // hunting pavilion: striped tent and a table with the treaty
    const shape = new THREE.Shape([new THREE.Vector2(-2.5, 0), new THREE.Vector2(2.5, 0), new THREE.Vector2(0, 3.2)]);
    const tent = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled: false }).translate(0, 0, -2), lamC("#f2ead6")); tent.position.set(-6, 0, -9); tent.castShadow = true; R.add(tent);
    for (let k = 0; k < 5; k++) { const st = new THREE.Mesh(new THREE.ExtrudeGeometry(new THREE.Shape([new THREE.Vector2(-2.52 + k, 0), new THREE.Vector2(-2.02 + k, 0), new THREE.Vector2(-0.1 + k * 0.05, 3.15), new THREE.Vector2(-0.3 + k * 0.05, 3.15)]), { depth: 4.02, bevelEnabled: false }).translate(0, 0, -2.01), lamC("#2a4a9a")); st.position.set(-6, 0, -9); R.add(st); }
    const wood = lam({ map: rep(planksHD(), 0.6, 0.6), color: "#b08a5a" });
    box(R, 1.8, 0.08, 0.9, lamC("#f4f1ea"), -1.4, 0.9, -1.0); for (const [x, z] of [[-0.8, -0.65], [0.8, -0.65], [-0.8, 0.35], [0.8, 0.35]]) cyl(R, 0.04, 0.04, 0.9, lamC("#5a3a24"), -1.4 + x, 0.45, -1.0 + z * 0.6, 6);
    // the cages: a long row of slatted crates with doors that drop open
    const bars = lamC("#6a4a2a");
    for (let k = 0; k < 9; k++) {
      const x = -4 + k * 1.0, z = CAGES_Z;
      box(R, 0.9, 0.08, 0.7, wood, x, 0.04, z); box(R, 0.9, 0.08, 0.7, wood, x, 0.66, z); box(R, 0.08, 0.7, 0.7, wood, x - 0.41, 0.35, z); box(R, 0.08, 0.7, 0.7, wood, x + 0.41, 0.35, z);
      box(R, 0.9, 0.7, 0.05, wood, x, 0.35, z - 0.33);
      const door = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.62, 0.04).translate(0, 0.31, 0), bars); door.position.set(x, 0.04, z + 0.34); R.add(door); this.doors.push(door);
      if (k % 2 === 0) { box(R, 0.9, 0.7, 0.7, wood, x, 1.06, z - 0.05); }
    }
    // the imperial carriage
    const coach = new THREE.Group(), green = lamC("#1e3a2a"), gold = lamC("#d8b048"), black = lamC("#1a1a1e");
    box(coach, 2.6, 1.6, 1.6, green, 0, 1.6, 0); box(coach, 2.7, 0.12, 1.7, gold, 0, 2.45, 0); box(coach, 2.7, 0.1, 1.7, gold, 0, 0.82, 0);
    box(coach, 0.8, 0.8, 0.02, lamC("#bcd4ec"), 0, 1.8, 0.81); box(coach, 0.9, 0.9, 0.01, gold, 0, 1.8, 0.805);
    for (const [x, z] of [[-1.0, 0.85], [1.0, 0.85], [-1.0, -0.85], [1.0, -0.85]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.1, 18), black); w.rotation.x = Math.PI / 2; w.position.set(x, 0.55, z); coach.add(w); const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.12, 8), gold); hub.rotation.x = Math.PI / 2; hub.position.set(x, 0.55, z); coach.add(hub); }
    coach.traverse((m) => { (m as THREE.Mesh).castShadow = true; });
    coach.position.set(...COACH); R.add(coach); this.coach = coach;
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    // cage doors
    const open = id === S.open ? smooth((f - W.abren + 6) / 8) : id > S.open ? 1 : 0;
    for (const d of this.doors) d.rotation.x = (Math.PI / 2) * open;
    // the carriage leaves at the end
    const go = id === S.flee ? Math.max(0, (f - 700) / 30) : 0;
    this.coach.position.set(COACH[0] + go * 1.5, 0.03 * Math.abs(Math.sin(t * 12)) * (go > 0 ? 1 : 0), COACH[2]);
    const rabbit = (k: number, x: number, z: number, mode: "sit" | "run" | "beg", dx: number, dz: number, y = 0, s = 0.25) => {
      const hop = mode === "run" ? Math.round(((t * 14 + k) % (Math.PI * 2)) / (Math.PI / 4)) * (Math.PI / 4) : 0;
      card(`rab|${k % 6}|${mode}|${hop.toFixed(2)}`, x, z, s, rabbitDraw(k, hop, mode), dx, dz, y);
    };
    // Napoleon: happy hunter, then swamped
    const napEx = id === S.hook ? "shock" : id === S.peace || id === S.cages ? "grin" : id === S.open ? (f > W.corren - 3 ? "shock" : "stern") : id === S.swarm ? (f > W.europa - 4 ? "pained" : f > W.trepan - 4 ? "shout" : "nervous") : "shock";
    const flee = id === S.swarm && f > W.huir - 8 ? (f - W.huir + 8) / 30 : 0;
    if (id !== S.cute && id !== S.flee) person("napo", NAPOLEON, 0 + flee * 3, 0, 0 - flee * 1, { mode: flee ? "stroll" : "stand", phase: t * 8, expr: napEx as never, raise: id === S.hook || (id === S.swarm && f > W.trepan) ? 1 : 0, wave: id === S.peace && f > W.caceria - 4 ? Math.sin(t * 6) * 0.5 + 0.5 : undefined, facing: flee ? 1 : 0, tilt: id === S.swarm ? 6 * Math.sin(t * 9) : 0 }, 1);
    if (id === S.peace && f < W.caceria) fx("treaty", 256, 256, paperDraw, -1.4, 1.05, -0.9, 0.4, 0.4);
    if (id === S.peace || id === S.cages || id === S.open) {
      person("berthier", BERTHIER, -0.3, 0, CAGES_Z + 1.4, { mode: "stand", expr: id === S.cages && f > W.miles - 4 ? "grin" : id === S.open && f > W.huyen ? "shock" : "smile" as never, wave: id === S.cages && f > W.berthier - 3 && f < W.miles ? 0.8 : undefined, facing: 1 }, 2);
      for (let k = 0; k < 4; k++) person(`h${k}`, HUNTER(k), -3.6 + k * 2.4, 0, CAGES_Z + 2.6 + (k % 2) * 0.4, { mode: "stand", expr: id === S.open && f > W.huyen ? "shock" : "grin" }, 10 + k);
    }
    // rabbits in the cages (peeking out)
    if (id === S.cages) for (let k = 0; k < 9; k++) rabbit(k, -4 + k * 1.0, CAGES_Z, "sit", k % 2 ? 1 : -1, 0, 0.06, 0.18);
    if (id === S.cute) rabbit(4, 0.2, CAGES_Z + 0.8, "beg", 1, 0, 0, 0.22);
    if (id === S.cute && f > W.domesticos - 4) fx("heart", 256, 256, heartDraw, 0.36, 0.62 + 0.04 * Math.sin(t * 6), CAGES_Z + 0.9, 0.14, 0.14);
    // out of the cages: first they sit there, then they run at Napoleon
    if (id === S.open || id === S.swarm || id === S.hook || id === S.flee) {
      const N = id === S.hook ? 40 : 70;
      for (let k = 0; k < N; k++) {
        const hx = -4 + (k % 9) * 1.0 + (hh(k, 1) - 0.5) * 0.6, hz = CAGES_Z + 0.6 + Math.floor(k / 9) * 0.25;
        // target: a ring around Napoleon
        const ang = hh(k, 2) * Math.PI * 2, rr = 0.45 + hh(k, 3) * 1.6;
        const tx = Math.cos(ang) * rr + (id === S.flee ? 4 : 0), tz = Math.sin(ang) * rr * 0.7 + 0.2;
        let x = hx, z = hz, mode: "sit" | "run" | "beg" = "sit";
        let u = 0;
        if (id === S.open) u = smooth((f - W.corren + 4 - hh(k, 4) * 10) / 26);
        else u = 1;
        if (id === S.open && f < W.abren + 4) continue;
        if (u > 0 && u < 1) mode = "run";
        if (id === S.flee) { mode = "run"; }
        x = hx + (tx - hx) * u; z = hz + (tz - hz) * u;
        if (id === S.flee) x += Math.max(0, (f - 700) / 30) * 1.5 + Math.sin(t * 3 + k) * 0.3;
        if (u >= 1 && id !== S.flee) { x += 0.08 * Math.sin(t * 2 + k); mode = k % 5 === 0 ? "beg" : "sit"; }
        if ((id === S.hook || id === S.swarm) && Math.hypot(x, z - 0.2) < 0.4) continue;
        rabbit(k, x, z, mode, tx - hx, tz - hz);
      }
      // rabbits climbing his legs
      if ((id === S.swarm && f > W.trepan - 4) || id === S.hook) for (let k = 0; k < 4; k++) rabbit(100 + k, -0.25 + (k % 2) * 0.5 + (id === S.swarm ? flee * 3 : 0), 0.15, "beg", k % 2 ? -1 : 1, 0, 0.15 + (k > 1 ? 0.4 : 0) + 0.04 * Math.sin(t * 8 + k), 0.18);
    }
    if (id === S.flee) person("napoC", NAPOLEON, this.coach.position.x + 0.2, 1.0, COACH[2] + 0.9, { mode: "stand", expr: "pained", raise: 1 }, 1, false);
  }
}
