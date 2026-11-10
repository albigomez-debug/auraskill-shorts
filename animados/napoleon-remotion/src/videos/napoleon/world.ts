// "La lata de Napoleón": one three.js world posed per frame. Sets: the army camp (x = 0), a Paris square (x = 200),
// Appert's kitchen (x = 400) and an English tin works (x = 600). Same toon pipeline as the other shorts.
import * as THREE from "three";
import { Pen, bodyFront, Outfit, Expr, SKINS, soldier, fxBurst, fxCreak, fxPuff, WG } from "./toon";
import { Pool, Actor, Fx, Stage, tier, tierW, light2D, blob, BODY, WIDE } from "./troop";
import { NOINK } from "./ink";
import { LIGHTS, LOOK, LightPreset, WorldLook } from "./lights";
import { TONE, CHAR, twoTone, untone } from "./shade";
import { cloudHD, rep, ctex, facadeHD, cobbleHD, planksHD, grassHD, CLOUD_DAY } from "./paint";
import { terrace, streetProps, skyline, lamC } from "./town";
import { FPS, SHOTS, camAt, smooth, S, W, PARIS, KITCHEN, FACTORY } from "./story";

const WL: LightPreset = { ...LIGHTS.day, el: 34, lit: [1.55, 1.42, 1.2], shade: [0.38, 0.36, 0.42], lift: [0.05, 0.05, 0.07], sunCol: "#fff0d8", fog: "#cfdcea" };
const WK: WorldLook = { ...LOOK.day, sky: { c: ["#dfe8f0", "#c4d6ec", "#98b8e2", "#77a0da", "#5a88cf"], e: [0, 3, 8, 16, 40] }, sat: 1.0 };

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const hh = (i: number, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const lam = (p: THREE.MeshLambertMaterialParameters) => twoTone(new THREE.MeshLambertMaterial(p));

// ---------------- cast ----------------
const FR = (v: number, extra: Partial<Outfit> = {}): Outfit => soldier(v, { jacket: "#2a3f7a", pants: "#efece2", belt: "#f1efe6", buttons: "#e8c45a", ...extra });
const NAPOLEON: Outfit = { jacket: "#24346a", pants: "#efece2", boots: "#16141a", hat: "bicorne", skin: SKINS[0], buttons: "#e8c45a", belt: null, build: "stout" };
const APPERT: Outfit = { jacket: "#f4f1ea", pants: "#5a4632", boots: "#3a2a20", hat: "toque", skin: SKINS[1], moustache: "#5a3a26", buttons: "#c8c0b0" };
const ENGLISH = (v: number): Outfit => ({ jacket: ["#7a3a2a", "#5a5a4a"][v % 2], pants: "#3a3a44", boots: "#2a2020", hat: "cap", cap: "#3a3a3a", skin: SKINS[(v + 2) % 4], belt: "#5a3a26", moustache: v ? "#6a4a2a" : undefined });
const PARISIAN = (v: number): Outfit => {
  const coats = ["#7a3a4a", "#3a5a7a", "#6a7a3a", "#8a5a34", "#4a4a6a", "#a8423a"];
  const o: Outfit = { jacket: coats[v % 6], pants: "#e8dcc0", boots: "#3a2a20", skin: SKINS[v % 4] };
  return v % 3 === 1 ? { ...o, hat: "bonnet", dress: ["#d9a441", "#c25a7a", "#5a8fc2"][v % 3] } : v % 3 === 2 ? { ...o, hat: "cap", cap: "#c8323a" } : { ...o, hat: "tophat" };
};

// ---------------- painted pieces ----------------
const canDraw = (dent: number) => (p: Pen) => { // 128 x 160 tin can, side view; dent 0..1
  const d = dent * 18;
  p.poly([[22, 30], [106, 30], [106 - d * 0.4, 90], [106, 140], [22, 140], [22 + d, 86]], "#c4c8d0", 6);
  p.ell(64, 30, 42, 10, "#e2e6ec", 6); p.band([[24, 62], [104, 62]], "#8a2a2a", 22, 0); p.line([[30, 112], [100, 112]], "#9aa0aa", 3, false);
  if (dent > 0.3) for (const [x, y] of [[50, 50], [80, 100]]) p.stroke([[x - 8, y - 6], [x + 6, y + 4]], 3, "#6a6e78");
};
const dogDraw = (p: Pen) => { // skinny dog, side view on the wide card (ground at WG)
  const G = WG, c = "#c8a46a";
  for (const x of [760, 820, 1180, 1240]) p.band([[x, G - 360], [x + 6, G - 10]], c, 26, 5);
  p.ell(1000, G - 420, 280, 90, c, 9);
  for (let k = 0; k < 5; k++) p.arc(980 + k * 40, G - 410, 20, 60, 200, 340, 4);
  p.band([[1260, G - 450], [1400, G - 560]], c, 60, 8);
  p.ell(1450, G - 590, 100, 70, c, 9); p.ell(1530, G - 570, 40, 30, "#3a2a20", 6);
  p.poly([[1400, G - 640], [1440, G - 500], [1380, G - 520]], "#8a6a3a", 7);
  p.dot(1460, G - 610, 12); p.poly([[1520, G - 540], [1540, G - 490], [1510, G - 500]], "#e86e78", 5);
  p.band([[720, G - 430], [600, G - 480]], c, 24, 5);
};
const steamDraw = (p: Pen) => {
  const g = p.g;
  for (let k = 0; k < 5; k++) { const x = 128 + Math.sin(k * 1.9) * 40, y = 200 - k * 36, r = 50 + k * 8;
    const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, "rgba(255,255,255,0.55)"); gr.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }
};
const flameDraw = (v: number) => (p: Pen) => {
  const j = [0, 1, 2].map((k) => Math.sin(v * 2.1 + k * 1.7) * 0.18), cx = 128, by = 250, s = 1.1;
  p.poly([[cx - 60 * s, by], [cx - 66 * s, by - 80 * s], [cx - 18 * s, by - (190 + 40 * j[0]) * s], [cx + 10 * s, by - 100 * s], [cx + 38 * s, by - (160 + 40 * j[1]) * s], [cx + 66 * s, by - 70 * s], [cx + 60 * s, by]], "#ff7a1a", 0);
  p.poly([[cx - 32 * s, by], [cx - 30 * s, by - 70 * s], [cx, by - (130 + 30 * j[2]) * s], [cx + 30 * s, by - 66 * s], [cx + 32 * s, by]], "#ffd84a", 0);
};
const beardDraw = (len: number) => (p: Pen) => { // 256 x 512 long white beard hanging from the chin
  const L = 60 + 420 * len;
  p.poly([[40, 0], [216, 0], [200, L * 0.5], [150, L], [128, L + 20], [106, L], [56, L * 0.5]], "#f2f0ea", 6);
  for (let k = 0; k < 4; k++) p.stroke([[80 + k * 32, 20], [90 + k * 26, L * 0.8]], 3, "#c8c4bc");
};
const webDraw = (p: Pen) => { for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI / 2; p.stroke([[0, 0], [250 * Math.cos(a), 250 * Math.sin(a)]], 2, "#f4f4f4"); } for (const r of [60, 120, 180]) p.arc(0, 0, r, r, 0, 90, 2, "#f4f4f4"); };
const beansDraw = (u: number) => (p: Pen) => { for (let k = 0; k < 14; k++) { const a = (k / 14) * Math.PI * 2, d = 30 + 180 * u; p.ell(256 + d * Math.cos(a), 256 + d * Math.sin(a) + 60 * u * u, 16, 11, "#a8582a", 4); } };
const flagDraw = (p: Pen) => { p.poly([[0, 0], [170, 0], [170, 340], [0, 340]], "#2a4a9a", 5); p.poly([[170, 0], [340, 0], [340, 340], [170, 340]], "#f4f1ea", 5); p.poly([[340, 0], [512, 0], [512, 340], [340, 340]], "#c8323a", 5); };
const growlDraw = (t: number) => (p: Pen) => fxCreak(p, t);

export class World {
  root = new THREE.Group();
  private pool = new Pool();
  private actors: Actor[] = [];
  private fxs: Fx[] = [];
  private hemi: THREE.HemisphereLight; private sun: THREE.DirectionalLight;
  private skyMat: THREE.ShaderMaterial; private sky: THREE.Mesh;
  private fog = new THREE.Fog("#cfdcea", 60, 420);
  private clouds: THREE.Mesh[] = [];
  private shelfBottles: THREE.InstancedMesh;
  private sunCache = new Map<number, THREE.Vector3>();
  private frustum = new THREE.Frustum(); private m4 = new THREE.Matrix4(); private sph = new THREE.Sphere(); private v = new THREE.Vector3();

  constructor() {
    const R = this.root;
    this.skyMat = new THREE.ShaderMaterial({
      uniforms: { c0: { value: new THREE.Color() }, c1: { value: new THREE.Color() }, c2: { value: new THREE.Color() },
        c3: { value: new THREE.Color() }, c4: { value: new THREE.Color() }, e: { value: new THREE.Vector4() } },
      vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 c0, c1, c2, c3, c4; uniform vec4 e; varying vec3 vP;
        void main(){ float el = asin(clamp(normalize(vP).y, -1.0, 1.0));
          vec3 c = mix(c0, c1, smoothstep(0.0, e.x, el)); c = mix(c, c2, smoothstep(e.x, e.y, el));
          c = mix(c, c3, smoothstep(e.y, e.z, el)); c = mix(c, c4, smoothstep(e.z, e.w, el)); gl_FragColor = vec4(c, 1.0); }`,
      side: THREE.BackSide, depthWrite: false, fog: false,
    });
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(1800, 48, 24), this.skyMat);
    this.sky.renderOrder = -1; this.sky.frustumCulled = false; this.sky.layers.set(NOINK);
    R.add(this.sky);
    this.hemi = new THREE.HemisphereLight("#dcecff", "#8a7a6a", 0.55);
    this.sun = new THREE.DirectionalLight("#fff0d8", 2.8);
    this.sun.castShadow = true; this.sun.shadow.mapSize.set(2048, 2048);
    R.add(this.hemi, this.sun, this.sun.target);
    const cm = [0, 1, 2, 3].map((k) => cloudHD(k, CLOUD_DAY));
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + hh(i, 20), d = 500 + hh(i, 21) * 500, w = 140 + hh(i, 23) * 120;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: cm[i % 4], transparent: true, depthWrite: false, fog: false }));
      m.position.set(Math.cos(a) * d, 90 + hh(i, 22) * 220, Math.sin(a) * d); m.scale.set(w, w / 2, 1); m.layers.set(NOINK); this.clouds.push(m); R.add(m);
    }

    // ---- the camp: trampled grass, dirt round the fire, tents, trees, hills ----
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(grassHD(), 500, 500), color: "#c8c0a0" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    const dirt = new THREE.Mesh(new THREE.CircleGeometry(9, 40).rotateX(-Math.PI / 2), lam({ map: rep(ctex("campdirt", 512, 512, (g, r) => {
      g.fillStyle = "#a08462"; g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 700; i++) { g.fillStyle = r() < 0.5 ? "rgba(90,70,50,0.35)" : "rgba(180,160,130,0.3)"; g.beginPath(); g.ellipse(r() * 512, r() * 512, 2 + r() * 8, 1 + r() * 4, 0, 0, 6.3); g.fill(); }
    }), 4, 4) }));
    dirt.position.set(0, 0.01, 3); dirt.receiveShadow = true; R.add(dirt);
    const canvas = lamC("#ece4d0"), pole = lamC("#6a4a2a");
    for (const [x, z, rot] of [[-7, -6, 0.3], [6, -8, -0.2], [-12, 3, 1.2], [11, 1, -1.1], [0, -14, 0], [-5, -18, 0.5], [9, -19, -0.4], [-16, -10, 0.9], [16, -9, -0.8]]) {
      const shape = new THREE.Shape([new THREE.Vector2(-2, 0), new THREE.Vector2(2, 0), new THREE.Vector2(0, 2.6)]);
      const t = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled: false }).translate(0, 0, -2), canvas);
      t.position.set(x, 0, z); t.rotation.y = rot; t.castShadow = t.receiveShadow = true; R.add(t);
      const pl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3, 6), pole); pl.position.set(x, 1.5, z); R.add(pl);
    }
    // campfire: stones, logs, tripod and an empty pot
    for (let k = 0; k < 9; k++) { const a = (k / 9) * Math.PI * 2, st = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18), lamC("#8a8580")); st.position.set(Math.cos(a) * 0.6, 0.1, -1 + Math.sin(a) * 0.6); R.add(st); }
    for (let k = 0; k < 3; k++) { const lg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.0, 8), lamC("#5a3a24")); lg.rotation.set(Math.PI / 2, 0, (k / 3) * Math.PI); lg.position.set(0, 0.12, -1); R.add(lg); }
    for (let k = 0; k < 3; k++) { const a = (k / 3) * Math.PI * 2, lg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.9, 6), pole); lg.position.set(Math.cos(a) * 0.35, 0.85, -1 + Math.sin(a) * 0.35); lg.rotation.set(Math.sin(a) * 0.35, 0, -Math.cos(a) * 0.35); R.add(lg); }
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.24, 0.35, 16, 1, true), lamC("#2a2a2e", { side: THREE.DoubleSide })); pot.position.set(0, 0.95, -1); R.add(pot);
    for (let k = 0; k < 40; k++) { // tree line
      const a = (k / 40) * Math.PI * 2 + hh(k, 3) * 0.1, d = 34 + hh(k, 4) * 16, h = 6 + hh(k, 5) * 5;
      const tr = new THREE.Mesh(new THREE.ConeGeometry(h * 0.32, h, 9), lamC(["#4f8a3e", "#5a9a44", "#467a3a"][k % 3])); tr.position.set(Math.cos(a) * d, h / 2 + 1, Math.sin(a) * d - 6); tr.castShadow = true; R.add(tr);
      const tk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 1.2, 6), pole); tk.position.set(Math.cos(a) * d, 0.6, Math.sin(a) * d - 6); R.add(tk);
    }
    for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2, h = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), lamC("#8ab06a")); h.position.set(Math.cos(a) * 160, -2, Math.sin(a) * 160); h.scale.set(70, 22 + hh(k, 9) * 18, 40); R.add(h); }
    // crates of tins by the fire (shot 6)
    const crateM = lam({ map: rep(planksHD(), 0.5, 0.5), color: "#c89a6a" }), tin = lamC("#c4c8d0");
    for (const [x, z, y] of [[3.6, 3.2, 0.3], [4.4, 2.6, 0.3], [3.9, 2.8, 0.9]]) { const cr = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.6), crateM); cr.position.set(x, y, z); cr.castShadow = cr.receiveShadow = true; R.add(cr); }
    for (let k = 0; k < 14; k++) { const tc = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 12), tin); tc.position.set(3.3 + (k % 5) * 0.16, 1.28 + Math.floor(k / 5) * 0.16, 2.8 + (k % 2) * 0.1); R.add(tc); }
    // dented, stabbed tins scattered in front of the three soldiers (shot 8-9)
    for (let k = 0; k < 18; k++) { const tc = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 12), tin); tc.position.set(-2.6 + hh(k, 30) * 5.4, 0.07, 6.2 + hh(k, 31) * 1.4); tc.rotation.set(Math.PI / 2, hh(k, 32) * 3, 0); R.add(tc); }

    // ---- Paris square ----
    {
      const sq = new THREE.Mesh(new THREE.PlaneGeometry(22, 60).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 22 / 4, 60 / 4), color: "#e0d6cc" })); sq.position.set(PARIS, 0.01, 0); sq.receiveShadow = true; R.add(sq);
      const right = new THREE.Group(); terrace(right, { side: 1, x: 11, z0: -24, z1: 26, seed: 53, signs: ["VINS", "HÔTEL", "TABAC"], floors: [3, 5] }); right.position.x = PARIS; R.add(right);
      const left = new THREE.Group(); terrace(left, { side: -1, x: 11, z0: -24, z1: 26, seed: 51, signs: ["BOULANGERIE", "CAFÉ", "PHARMACIE"], floors: [3, 5] }); left.position.x = PARIS; R.add(left);
      const lp = new THREE.Group(); streetProps(lp, -1, 9.5, -20, 24, 61); streetProps(lp, 1, 9.5, -20, 24, 62); lp.position.x = PARIS; R.add(lp);
      const hall = new THREE.Mesh(new THREE.BoxGeometry(30, 16, 8), lam({ map: facadeHD("hoteldeville", 30, 16, { wall: "#e2d6c0", shutter: "#3a4a6a", door: true }) }));
      hall.position.set(PARIS, 8, -16); hall.castShadow = hall.receiveShadow = true; R.add(hall);
      const roofH = new THREE.Mesh(new THREE.BoxGeometry(30.6, 3.5, 8.6), lamC("#4e5560")); roofH.position.set(PARIS, 17.6, -16); R.add(roofH);
      const podium = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.5, 2.4), [lamC("#7a1a22"), lamC("#7a1a22"), lam({ map: rep(planksHD(), 0.5, 0.5) }), lamC("#7a1a22"), lamC("#7a1a22"), lamC("#7a1a22")]);
      podium.position.set(PARIS, 0.75, -6); podium.castShadow = podium.receiveShadow = true; R.add(podium);
      const steps = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 0.8), lamC("#6a1a20")); steps.position.set(PARIS, 0.3, -4.4); R.add(steps);
      for (const x of [-6, 6]) { const fp = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 7, 6), lamC("#3a3436")); fp.position.set(PARIS + x, 3.5, -9); R.add(fp); }
      skyline(R, "#cfdcea", 190, false);
    }
    // ---- rooms: Appert's kitchen and the English tin works ----
    const room = (C: number, wallCol: string) => {
      const wood = lam({ map: rep(planksHD(), 3, 3), color: "#c89a6a" }), dark = lamC("#6a3f24"), wall = lam({ map: rep(facadeHD(`roomwall${C}`, 20, 7, { wall: wallCol, shutter: "#5a4632", brick: wallCol === "brick" }), 1, 1) });
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 16).rotateX(-Math.PI / 2), wood); floor.position.set(C + 2, 0.01, 0); floor.receiveShadow = true;
      const back = new THREE.Mesh(new THREE.BoxGeometry(20, 7, 0.4), wall); back.position.set(C + 2, 3.5, -5.5); back.receiveShadow = true;
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7, 16), lamC("#d8c8a8")); side.position.set(C - 4, 3.5, 0); side.receiveShadow = true;
      R.add(floor, back, side);
      return dark;
    };
    {
      const C = KITCHEN, dark = room(C, "#e2d0b0");
      const stove = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, 1.3), lam({ map: rep(facadeHD("stove", 3, 1, { wall: "#b97a5a", shutter: "#333", brick: true }), 1, 1) })); stove.position.set(C + 2.2, 0.5, -4.2); stove.castShadow = stove.receiveShadow = true;
      const hood = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.6, 1.0), lamC("#c8b8a0")); hood.position.set(C + 2.2, 4.6, -4.7);
      const cauldron = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.5, 0.7, 20, 1, true), lamC("#3a3a40", { side: THREE.DoubleSide })); cauldron.position.set(C + 2.2, 1.35, -4.0);
      const water = new THREE.Mesh(new THREE.CircleGeometry(0.58, 20).rotateX(-Math.PI / 2), lamC("#a8c8d8")); water.position.set(C + 2.2, 1.6, -4.0);
      R.add(stove, hood, cauldron, water);
      const glass = lamC("#4a8a5a"), cork = lamC("#b8945a");
      for (let k = 0; k < 7; k++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.4, 10), glass); b.position.set(C + 1.9 + (k % 4) * 0.2, 1.65, -4.15 + Math.floor(k / 4) * 0.25); R.add(b); const c = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.06, 8), cork); c.position.set(b.position.x, 1.88, b.position.z); R.add(c); }
      const table = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 1.1), dark); table.position.set(C - 0.4, 0.45, -2.6); table.castShadow = true; R.add(table);
      for (const y of [1.6, 2.6, 3.6]) { const sh = new THREE.Mesh(new THREE.BoxGeometry(5, 0.08, 0.45), dark); sh.position.set(C + 6.4, y, -5.05); R.add(sh); }
      const geo = new THREE.CylinderGeometry(0.06, 0.08, 0.4, 8).translate(0, 0.2, 0);
      this.shelfBottles = new THREE.InstancedMesh(geo, glass, 66);
      const m = new THREE.Matrix4();
      for (let k = 0; k < 66; k++) this.shelfBottles.setMatrixAt(k, m.makeTranslation(C + 4.1 + (k % 22) * 0.21, 1.64 + Math.floor(k / 22) * 1.0, -5.0));
      R.add(this.shelfBottles);
      for (let k = 0; k < 6; k++) { const hm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.45, 10), lamC("#b87a5a")); hm.position.set(C - 1.2 + k * 0.32, 1.12, -2.7); R.add(hm); }
    }
    {
      const C = FACTORY, dark = room(C, "brick");
      const bench = new THREE.Mesh(new THREE.BoxGeometry(4, 0.95, 1.2), dark); bench.position.set(C + 1.2, 0.48, -1.6); bench.castShadow = bench.receiveShadow = true; R.add(bench);
      const tin = lamC("#c4c8d0");
      const geo = new THREE.CylinderGeometry(0.09, 0.09, 0.2, 12).translate(0, 0.1, 0);
      const pile = new THREE.InstancedMesh(geo, tin, 220), m = new THREE.Matrix4();
      for (let k = 0; k < 220; k++) { const row = Math.floor(k / 20), col = k % 20; pile.setMatrixAt(k, m.makeTranslation(C - 2.5 + col * 0.19 + (row % 2) * 0.09, row * 0.2, -4.6 + (row % 3) * 0.2)); }
      R.add(pile);
      for (let k = 0; k < 8; k++) { const tc = new THREE.Mesh(geo, tin); tc.position.set(C + 0.2 + k * 0.28, 0.96, -1.5 + (k % 2) * 0.2); R.add(tc); }
      const chimney = new THREE.Mesh(new THREE.BoxGeometry(1.4, 7, 1.0), lamC("#9a5a3e")); chimney.position.set(C + 6, 3.5, -5); R.add(chimney);
    }
  }

  private shotSun(id: number) {
    let v = this.sunCache.get(id);
    if (v) return v;
    const sh = SHOTS[id - 1];
    let fx = 0, fz = 0;
    for (let f = sh.a; f < sh.b; f += 3) { const c = camAt(id, f), x = c.look[0] - c.pos[0], z = c.look[2] - c.pos[2], n = Math.hypot(x, z) || 1; fx += x / n; fz += z / n; }
    const n = Math.hypot(fx, fz) || 1; fx /= n; fz /= n;
    const az = THREE.MathUtils.degToRad(sh.sunAz ?? 120), el = THREE.MathUtils.degToRad(WL.el);
    const hx = fx * Math.cos(az) - fz * Math.sin(az), hz = fz * Math.cos(az) + fx * Math.sin(az);
    v = new THREE.Vector3(hx * Math.cos(el), Math.sin(el), hz * Math.cos(el)).normalize();
    this.sunCache.set(id, v);
    return v;
  }
  private actor(i: number) { while (this.actors.length <= i) this.actors.push(new Actor(this.root)); return this.actors[i]; }
  private fx(i: number) { while (this.fxs.length <= i) this.fxs.push(new Fx(this.root)); return this.fxs[i]; }

  update(id: number, f: number, cam: THREE.PerspectiveCamera, scene: THREE.Scene) {
    const t = f / FPS, L = WL, K = WK;
    const c = camAt(id, f);
    cam.position.set(...c.pos); cam.up.set(0, 1, 0); cam.lookAt(...c.look);
    cam.fov = c.fov; cam.near = 0.15; cam.far = 3000; cam.updateProjectionMatrix(); cam.updateMatrixWorld();
    cam.layers.enable(NOINK);
    const focus = V(...c.look), dist = cam.position.distanceTo(focus), sunDir = this.shotSun(id);
    this.hemi.color.set(L.sky); this.hemi.groundColor.set(L.ground); this.hemi.intensity = L.hemiI;
    this.sun.color.set(L.sunCol); this.sun.intensity = L.sunI;
    const Rr = THREE.MathUtils.clamp(dist * 1.2 + 10, 14, 60);
    this.sun.position.copy(focus).addScaledVector(sunDir, 200); this.sun.target.position.copy(focus);
    const sc = this.sun.shadow.camera;
    sc.left = -Rr; sc.right = Rr; sc.top = Rr; sc.bottom = -Rr; sc.near = 20; sc.far = 500; sc.updateProjectionMatrix();
    this.sun.shadow.bias = L.bias; this.sun.shadow.normalBias = L.normalBias * (Rr / 12);
    TONE.uLitCol.value.set(...L.lit); TONE.uShadeCol.value.set(...L.shade); TONE.uShadeLift.value.set(...L.lift);
    TONE.uLambert.value = L.lambert; TONE.uSideK.value = L.sideK; TONE.uTerm.value = L.term; TONE.uBounce.value.set(...K.bounce);
    TONE.uSat.value = K.sat;
    CHAR.uCharTint.value.set(...L.charTint); CHAR.uCharShade.value = L.charShade; CHAR.uGrad.value = L.charGrad;
    CHAR.uBodyGrad.value = L.bodyGrad; CHAR.uSideTint.value.set(...L.sideTint);
    const su = this.skyMat.uniforms;
    K.sky.c.forEach((h, i) => untone(h, su["c" + i].value));
    const e = K.sky.e.map((deg) => THREE.MathUtils.degToRad(deg));
    su.e.value.set(e[1], e[2], e[3], e[4]);
    this.sky.position.copy(cam.position);
    untone(L.fog, this.fog.color); this.fog.near = 60; this.fog.far = 420;
    scene.fog = this.fog; scene.background = null;
    for (const m of this.clouds) m.quaternion.copy(cam.quaternion);
    // Appert's shelves fill up over 14 years
    this.shelfBottles.count = id === S.appert ? Math.round(66 * smooth((f - (W.anos14 - 10)) / 60)) : id === S.works ? 66 : 0;

    // ---- cast ----
    const right = V(0, 0, 0).setFromMatrixColumn(cam.matrixWorld, 0);
    const light = light2D(sunDir, right);
    const st: Stage = { places: [], fx: [] };
    this.frustum.setFromProjectionMatrix(this.m4.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse));
    const lidAt = (i: number) => {
      let s = Math.round(-60 * hh(i, 9));
      for (let n = 0; s <= f && n < 80; n++) { const k = f - s; if (k >= 0 && k < 4) return [0.5, 1, 1, 0.5][k]; s += Math.round(15 + 54 * hh(i * 31 + n, 13)); }
      return 0;
    };
    const visible = (x: number, y: number, z: number, r: number) => this.frustum.intersectsSphere(this.sph.set(this.v.set(x, y, z), r));
    const person = (who: string, o: Outfit, x: number, y: number, z: number, opts: Parameters<typeof bodyFront>[2], i: number, contact = true) => {
      if (!visible(x, y + 1.1, z, 3)) return;
      const d = cam.position.distanceTo(this.v.set(x, y + 1.6, z));
      if (d < 1.0) return;
      const [w, h, k] = tier(d), near = d < 16;
      const o2 = { ...opts, light, seed: (i * 5 + 3) % 7 + 1, blink: near ? lidAt(i) : 0 };
      if (d > 40) o2.expr = "neutral";
      st.places.push({ key: `${who}|${JSON.stringify(o2)}`, x, y, z, size: [w, h, k], draw: (p) => bodyFront(p, o, o2) });
      if (contact && d < 60) blob(st, sunDir, x, y, z);
    };
    const side = (key: string, x: number, z: number, scale: number, draw: (p: Pen) => void) => {
      if (!visible(x, 1.5 * scale, z, 5 * scale)) return;
      const d = cam.position.distanceTo(this.v.set(x, 1.4 * scale, z)) / scale, [w, h, k] = tierW(d);
      st.places.push({ key: `${key}|${w}`, x, y: 0, z, size: [w, h, k], wide: true, scale, mirror: right.z > 0, draw });
      blob(st, sunDir, x, 0, z, 1.2 * scale);
    };
    const fx = (key: string, cw: number, ch: number, draw: (p: Pen) => void, x: number, y: number, z: number, w: number, h: number, soft = false) =>
      st.fx.push({ key, cw, ch, draw, x, y, z, w, h, soft });
    const fire = () => { fx(`fire|${Math.floor(f / 3) % 6}`, 256, 256, flameDraw(Math.floor(f / 3)), 0, 0.45, -1, 1.1, 1.1); };

    if (id === S.hunger) {
      person("napo", NAPOLEON, 1.3, 0, 0.8, { mode: "stand", expr: f < W.problema - 2 ? "stern" : "nervous", facing: 0 }, 1);
      for (const [k, x, z] of [[0, -1.3, -2.2], [1, 0.9, -2.6], [2, -0.2, -3.2], [3, 1.9, -1.4]] as const)
        person(`hs${k}`, FR(k, { rifle: false }), x, 0, z, { mode: "sit", expr: f > W.hambre - 3 ? (k % 2 ? "pained" : "dazed") : "nervous", facing: 0 }, 10 + k);
      if (f > W.hambre - 3) for (let k = 0; k < 2; k++) fx(`growl|${(f + k * 3) % 6}`, 300, 300, growlDraw(((f + k * 3) % 6) / 6), [-1.3, 0.9][k], 0.9, [-2.0, -2.4][k], 0.5, 0.5);
      if (f > W.perro - 20) side("dog", 1.7, -0.4, 0.38, dogDraw);
      fire();
    }
    if (id === S.paris) {
      const up = f > W.premio - 4;
      person("napo", NAPOLEON, PARIS, 1.5, -6.2, { mode: "stand", expr: up ? "grin" : "stern", wave: up ? Math.sin(t * 6) * 0.5 + 0.5 : undefined }, 1);
      for (let k = 0; k < 22; k++) {
        const x = PARIS + (k % 6 - 2.5) * 1.15 + (hh(k, 1) - 0.5) * 0.4, z = -2.4 + Math.floor(k / 6) * 1.6 + hh(k, 2) * 0.4;
        person(`cr${k}`, PARISIAN(k), x, 0, z, { mode: "stand", expr: f > W.francos ? (k % 3 ? "shock" : "laugh") : "neutral", wave: f > W.francos && k % 4 === 0 ? Math.sin(t * 8 + k) : undefined }, 100 + k);
      }
      for (const x of [-6, 6]) fx("flag", 512, 340, flagDraw, PARIS + x + 1.1, 6.1, -9, 2.2, 1.5);
    }
    if (id === S.appert || id === S.works) {
      const C = KITCHEN, ok = id === S.works && f > W.joder - 6;
      const years = id === S.appert ? smooth((f - W.anos14) / 50) : 1;
      person("appert", { ...APPERT, moustache: years > 0.6 ? "#c8c0b0" : APPERT.moustache }, C + 1.0, 0, -1.4, { mode: "stand", expr: id === S.appert ? (f > W.anos14 + 10 ? "nervous" : "smile") : ok ? "laugh" : "nervous", prop: ok ? null : ["hammer", 0.2] as ["hammer", number], wave: ok ? Math.sin(t * 9) : undefined, facing: 1 }, 2);
      fx(`steam|${Math.floor(f / 4) % 3}`, 256, 256, steamDraw, C + 2.2 + Math.sin(t) * 0.1, 2.3 + (f % 40) / 40 * 0.4, -3.9, 1.4, 1.4, true);
      if (id === S.works && f > W.da - 30) {
        person("napo", NAPOLEON, C + 2.3, 0, -0.9, { mode: "stand", expr: "grin", wave: f > W.da - 4 ? 0.8 : undefined, facing: -1 }, 1);
        if (f > W.da - 4) fx("bag", 256, 256, bagDraw, C + 1.7, 1.45, -0.6, 0.55, 0.55);
      }
    }
    if (id === S.england) {
      const C = FACTORY;
      for (let k = 0; k < 2; k++) {
        const strike = ((t * 2.4 + k * 0.5) % 1) < 0.5 ? 0 : 1;
        person(`en${k}`, ENGLISH(k), C + 0.5 + k * 1.5, 0, -0.6 + k * 0.2, { mode: "stand", expr: f > W.copian ? (k ? "grin" : "whistle") : "stern", prop: ["hammer", strike] as ["hammer", number], facing: k ? -1 : 1 }, 300 + k);
      }
    }
    if (id === S.cans) {
      const bite = f > W.nadie - 6;
      person("eater", FR(2, { rifle: false }), 2.3, 0, 4.0, { mode: "stand", expr: bite ? (Math.floor(f / 6) % 2 ? "pained" : "shout") : f > W.aguantaba ? "smile" : "neutral", tilt: bite ? 4 * Math.sin(t * 14) : 0 }, 20);
      if (bite) fx(`can|${Math.floor(f / 6) % 2}`, 128, 160, canDraw(0.3), 2.33, 1.62 + 0.03 * Math.sin(t * 20), 4.12, 0.2, 0.25);
      else if (f > W.aguantaba - 10) fx("can0", 128, 160, canDraw(0), 2.6, 1.15, 4.1, 0.2, 0.25);
      if (f < W.nadie) fx("web", 256, 256, webDraw, 3.25, 1.62, 2.95, 0.5, 0.5);
    }
    if (id === S.wait) { // waiting for the can opener: the beard grows half a century
      const g = smooth((f - 672) / 60);
      person("waiter", FR(5, { rifle: false, moustache: g > 0.5 ? "#e8e8e8" : "#4a3426" }), -3.8, 0, 6, { mode: "sit", expr: g > 0.8 ? "dazed" : "nervous" }, 30);
      fx(`beard|${Math.round(g * 10)}`, 256, 512, beardDraw(g), -3.8, 0.74 - 0.25 * g, 6.06, 0.32 * (0.6 + 0.4 * g), 0.5 * (0.3 + 0.9 * g));
      fx("can1", 128, 160, canDraw(0.1), -3.52, 0.62, 6.1, 0.18, 0.22);
      if (g > 0.4) fx("web2", 256, 256, webDraw, -4.15, 1.75, 6.02, 0.45 * g, 0.45 * g);
    }
    if (id === S.open || id === S.end) {
      const stab = f > W.bayoneta - 6 ? (Math.floor(f / 5) % 2) : 0;
      const ham = f > W.martillo - 6 ? (Math.floor(f / 4) % 2) : 0;
      const shot = f > W.tiros - 4;
      const endExpr: Expr = id === S.end ? (f > W.hostia + 8 ? "laugh" : "shock") : "stern";
      person("bay", FR(0), -1.8, 0, 5.5, { mode: "stand", expr: id === S.end ? endExpr : stab ? "shout" : "stern", raise: stab, facing: 1 }, 40);
      person("ham", FR(1, { rifle: false }), 0.2, 0, 5.4, { mode: "stand", expr: id === S.end ? endExpr : ham ? "shout" : "stern", prop: ["hammer", ham] as ["hammer", number] }, 41);
      person("shoot", FR(3), 2.2, 0, 5.5, { mode: "stand", expr: id === S.end ? endExpr : shot ? "grin" : "stern", raise: shot ? 0.6 : 0, facing: -1 }, 42);
      if (f > W.bayoneta - 6 && f < W.martillo + 30) fx(`canA|${stab}`, 128, 160, canDraw(0.6), -1.25, 0.12 + 0.05 * stab, 5.9, 0.2, 0.25);
      if (f > W.martillo - 6) fx(`canB|${ham}`, 128, 160, canDraw(ham ? 1 : 0.6), 0.7, 0.12, 5.9, 0.2, 0.25);
      if (shot && f < W.tiros + 14) fx(`bang|${f - W.tiros + 4}`, 500, 500, (p) => fxBurst(p, (f - W.tiros + 4) / 18, "#fff3b0", 10, 30, 200), 2.7, 1.9, 5.7, 0.9, 0.9, true);
      if (shot) { const u = (f - W.tiros) / 20; if (u < 1.5) fx(`canC|${Math.floor(f / 2) % 2}`, 128, 160, canDraw(0.8), 2.6 + u * 2.2, 0.15 + 2.2 * u - 1.6 * u * u, 6.0, 0.2, 0.25); }
      if (id === S.end) {
        person("napo", NAPOLEON, -0.8, 0, 4.0, { mode: "stand", expr: f < W.hostia + 8 ? "shock" : "laugh", facing: 0 }, 1);
        if (f > W.abrelatas - 12) { const u = Math.min(1, (f - W.abrelatas + 12) / 20); fx(`beans|${Math.round(u * 10)}`, 512, 512, beansDraw(u), 0.4, 1.0, 5.6, 1.2, 1.2); }
        if (f > W.abrelatas - 12 && f < W.abrelatas + 4) fx(`puff|${f % 8}`, 300, 300, (p) => fxPuff(p, (f % 8) / 8), 0.4, 0.6, 5.6, 1.4, 1.4, true);
      }
      fire();
    }

    let ai = 0;
    for (const p of st.places) {
      const a = this.actor(ai++), [w, h, k] = p.size, s = p.scale ?? 1;
      a.r = this.pool.req(p.key, w, h, k, p.draw);
      a.mesh.geometry = p.wide ? WIDE : BODY;
      a.mesh.visible = true; a.mesh.position.set(p.x, p.y, p.z);
      a.mesh.rotation.set(0, Math.atan2(cam.position.x - p.x, cam.position.z - p.z), 0);
      a.mesh.scale.set(p.mirror ? -s : s, s, s);
    }
    for (let i = ai; i < this.actors.length; i++) this.actors[i].mesh.visible = false;
    let fi = 0;
    for (const p of st.fx) {
      if (!visible(p.x, p.y, p.z, Math.max(p.w, p.h))) continue;
      const e = this.fx(fi++);
      e.r = this.pool.req(p.key, p.cw, p.ch, 1, p.draw);
      e.use(!!p.soft); e.mesh.visible = true; e.mesh.position.set(p.x, p.y, p.z);
      e.mesh.rotation.order = "YXZ"; e.mesh.rotation.set(0, Math.atan2(cam.position.x - p.x, cam.position.z - p.z), 0);
      if (p.soft) e.mesh.quaternion.copy(cam.quaternion);
      e.mesh.scale.set(p.w, p.h, 1);
    }
    for (let i = fi; i < this.fxs.length; i++) this.fxs[i].mesh.visible = false;
    this.pool.flush();
    for (let i = 0; i < ai; i++) this.actors[i].bind();
    for (let i = 0; i < fi; i++) this.fxs[i].bind();
    return focus;
  }
}

const bagDraw = (p: Pen) => {
  p.poly([[60, 90], [196, 90], [236, 220], [200, 250], [56, 250], [20, 220]], "#c8a46a", 8);
  p.poly([[96, 60], [160, 60], [150, 92], [106, 92]], "#c8a46a", 7); p.band([[92, 88], [164, 88]], "#6a4a2a", 10, 3);
  p.g.fillStyle = "#3a2a1a"; p.g.font = "bold 70px Georgia"; p.g.textAlign = "center"; p.g.fillText("₣", 128, 200);
};
