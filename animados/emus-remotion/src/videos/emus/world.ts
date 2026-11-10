// "La guerra de los emús": one three.js world posed per frame. Sets: the wheat farm (x = 0), the army camp (x = CAMP)
// and the dirt road for the truck chase (x = ROAD..). Same toon pipeline as the other shorts.
import * as THREE from "three";
import { Pen, bodyFront, Outfit, Expr, SKINS, soldier, fxBurst, fxCreak, fxPuff, WG } from "./toon";
import { Pool, Actor, Fx, Stage, tier, tierW, light2D, blob, BODY, WIDE } from "./troop";
import { NOINK } from "./ink";
import { LIGHTS, LOOK, LightPreset, WorldLook } from "./lights";
import { TONE, CHAR, twoTone, untone } from "./shade";
import { cloudHD, rep, ctex, planksHD, facadeHD, CLOUD_DAY } from "./paint";
import { lamC } from "./town";
import { FPS, SHOTS, camAt, smooth, S, W, CAMP, ROAD, EMU_V, TRUCK_A, truckX } from "./story";

const WL: LightPreset = { ...LIGHTS.day, el: 40, lit: [1.62, 1.44, 1.16], shade: [0.4, 0.36, 0.4], lift: [0.05, 0.05, 0.06], sunCol: "#fff0d0", fog: "#e9dcc6" };
const WK: WorldLook = { ...LOOK.day, sky: { c: ["#efe2cc", "#cfdcea", "#9cc0e6", "#6fa0dc", "#4d86d2"], e: [0, 3, 8, 16, 40] }, sat: 1.05 };

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const hh = (i: number, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const lam = (p: THREE.MeshLambertMaterialParameters) => twoTone(new THREE.MeshLambertMaterial(p));

// ---------------- cast ----------------
const DIGGER = (v: number, extra: Partial<Outfit> = {}): Outfit => soldier(v, { jacket: "#9a8458", pants: "#857650", boots: "#3a2a1a", hat: "slouch", belt: "#5a4630", buttons: "#c8a040", ...extra });
const MAJOR: Outfit = { jacket: "#8a7a50", pants: "#7a6a48", boots: "#2a1e14", hat: "slouch", skin: SKINS[1], moustache: "#5a3a26", belt: "#5a3a24", buttons: "#d8b048", build: "stout" };
const FARMER = (v: number): Outfit => ({ jacket: ["#7a5a3a", "#5a6a7a", "#8a4a3a"][v % 3], pants: "#4a4a5a", boots: "#3a2a20", hat: "cap", cap: ["#6a5a3a", "#3a3a3a", "#7a6a4a"][v % 3], skin: SKINS[(v + 1) % 4], moustache: v % 2 ? "#6a4a2a" : undefined });

// ---------------- the emu (wide card, facing right, feet on WG) ----------------
type EmuPose = { mode: "stand" | "run" | "peck" | "hop"; ph?: number; k?: number; look?: "eye" | "mad" | "happy" };
const emuDraw = (o: EmuPose) => (p: Pen) => {
  const G = WG, g = p.g, ph = o.ph ?? 0;
  const run = o.mode === "run", hop = o.mode === "hop" ? Math.abs(Math.sin(ph)) * 70 : 0;
  const lean = run ? 60 : 0, by = G - 560 - hop + (run ? 30 : 0);
  // legs: hip at (960, by+90); backward knee
  const leg = (sw: number, col: string) => {
    const hip: [number, number] = [960 + lean * 0.3, by + 90];
    const ft: [number, number] = run ? [960 + 230 * Math.sin(sw), G - Math.max(0, 120 * Math.cos(sw))] : [960 + 60 * Math.sin(sw) * 0.3, G - hop];
    const kn: [number, number] = [(hip[0] + ft[0]) / 2 - 70, (hip[1] + ft[1]) / 2 + 10];
    p.band([hip, kn], col, 34, 5, "round"); p.band([kn, ft], col, 22, 5, "round");
    for (const d of [-40, 0, 45]) p.stroke([ft, [ft[0] + 50 + d * 0.4, ft[1] + d * 0.1 + 2]], 9, col);
  };
  if (run) { leg(ph + Math.PI, "#5e574f"); leg(ph, "#7a7268"); } else { leg(-0.6, "#5e574f"); leg(0.6, "#7a7268"); }
  // shaggy body
  const bx = 960, rx = 240, ry = 160, pts: [number, number][] = [];
  for (let i = 0; i <= 40; i++) { const a = (i / 40) * Math.PI * 2, r = 1 + 0.07 * Math.sin(i * 7.3) + (Math.sin(a) > 0.3 ? 0.06 * Math.sin(i * 13) : 0); pts.push([bx + rx * r * Math.cos(a) - (run ? 30 : 0), by + ry * r * Math.sin(a)]); }
  p.poly(pts, "#4c3c30", 9);
  g.save(); p.path(pts, true); g.clip();
  for (let k = 0; k < 60; k++) { const x = bx - rx + hh(k, 1) * rx * 2, y = by - ry + hh(k, 2) * ry * 2;
    g.strokeStyle = k % 3 ? "rgba(30,20,14,0.5)" : "rgba(150,120,90,0.45)"; g.lineWidth = 6; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x - 30, y + 30, x - 50, y + 70); g.stroke(); }
  g.fillStyle = "rgba(255,240,200,0.18)"; g.beginPath(); g.ellipse(bx + 40, by - 70, rx * 0.8, ry * 0.4, 0, 0, 6.3); g.fill();
  g.restore();
  // neck and head
  const peck = o.mode === "peck" ? smooth(o.k ?? 0) : 0;
  const n0: [number, number] = [bx + rx * 0.7, by - ry * 0.5];
  const hd: [number, number] = run ? [bx + rx + 210, by - 330] : [bx + rx * 0.9 + 60 + 190 * peck, (by - 380 - hop * 0) * (1 - peck) + (G - 70) * peck];
  const nk: [number, number] = [(n0[0] + hd[0]) / 2 + (run ? -20 : 40) - 60 * peck, (n0[1] + hd[1]) / 2];
  p.band([n0, nk, hd], "#6a7690", 54, 7, "round");
  for (let k = 0; k < 6; k++) { const t = k / 6, x = n0[0] + (hd[0] - n0[0]) * t, y = n0[1] + (hd[1] - n0[1]) * t; p.stroke([[x - 10, y], [x + 8, y + 12]], 4, "#3e4658"); }
  p.ell(hd[0], hd[1], 62, 50, "#3a3a46", 8);
  p.poly([[hd[0] + 46, hd[1] - 14], [hd[0] + 130, hd[1] + 6], [hd[0] + 46, hd[1] + 22]], "#4a4448", 6);
  // big comic eye
  const ex = hd[0] + 12, ey = hd[1] - 12;
  p.ell(ex, ey, 26, 26, "#fffbea", 5);
  if (o.look === "happy") p.arc(ex, ey + 4, 14, 10, 200, 340, 6);
  else { p.dot(ex + 8, ey + 2, 11); if (o.look === "mad") p.stroke([[ex - 26, ey - 32], [ex + 26, ey - 14]], 8); }
  for (let k = 0; k < 3; k++) p.stroke([[hd[0] - 30 + k * 18, hd[1] - 44], [hd[0] - 40 + k * 20, hd[1] - 74]], 6, "#2a2a32");
};

// ---------------- painted fx ----------------
const dustDraw = (t: number) => (p: Pen) => {
  const g = p.g;
  for (let k = 0; k < 6; k++) { const x = 128 + (hh(k, 4) - 0.5) * 120 * (0.5 + t), y = 170 - t * 60 - hh(k, 5) * 40, r = 40 + 50 * t;
    const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(200,160,110,${0.6 * (1 - t)})`); gr.addColorStop(1, "rgba(200,160,110,0)"); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }
};
const smokeDraw = (t: number) => (p: Pen) => {
  const g = p.g;
  for (let k = 0; k < 5; k++) { const x = 128 + Math.sin(k * 2.1) * 40 * t, y = 200 - k * 30 - t * 40, r = 40 + 30 * t;
    const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(70,66,64,${0.8 * (1 - t * 0.6)})`); gr.addColorStop(1, "rgba(70,66,64,0)"); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); }
};
const noteDraw = (p: Pen) => { p.ell(90, 190, 40, 30, "#2a2a32", 5); p.band([[126, 190], [126, 50]], "#2a2a32", 12, 0); p.poly([[126, 50], [200, 80], [200, 110], [126, 84]], "#2a2a32", 0); };

// ---------------- 3D props ----------------
const lewisGun = () => {
  const G = new THREE.Group(), steel = lamC("#2e2e34"), wood = lamC("#6a4428");
  for (let k = 0; k < 3; k++) { const a = (k / 3) * Math.PI * 2, l = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 6), steel); l.position.set(Math.cos(a) * 0.25, 0.45, Math.sin(a) * 0.25); l.rotation.set(Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5); G.add(l); }
  const shroud = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.9, 12), steel); shroud.rotation.z = Math.PI / 2; shroud.position.set(0.25, 0.92, 0); G.add(shroud);
  const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.25, 8), steel); muzzle.rotation.z = Math.PI / 2; muzzle.position.set(0.8, 0.92, 0); G.add(muzzle);
  const stock = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.1, 0.07), wood); stock.position.set(-0.4, 0.88, 0); G.add(stock);
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.06, 18), steel); drum.position.set(0.05, 1.03, 0); G.add(drum);
  G.traverse((m) => { (m as THREE.Mesh).castShadow = true; });
  return G;
};
const truck = () => {
  const G = new THREE.Group(), green = lamC("#4a5a3a"), black = lamC("#1e1e22"), wood = lam({ map: rep(planksHD(), 0.6, 0.4), color: "#b08a5a" }), glass = lamC("#2a3440");
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.1, 1.6), green); cab.position.set(0.6, 1.25, 0);
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 1.2), green); hood.position.set(1.8, 1.05, 0);
  const grille = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.66, 1.0), black); grille.position.set(2.36, 1.05, 0);
  const win = new THREE.Mesh(new THREE.BoxGeometry(1.32, 0.45, 1.3), glass); win.position.set(0.6, 1.45, 0);
  const bed = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.5, 1.8), wood); bed.position.set(-1.2, 0.95, 0);
  const fender = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.12, 1.9), black); fender.position.set(0, 0.68, 0);
  G.add(cab, hood, grille, win, bed, fender);
  const wheels: THREE.Mesh[] = [];
  for (const [x, z] of [[1.7, 0.85], [1.7, -0.85], [-1.4, 0.85], [-1.4, -0.85]]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.22, 16), black); w.rotation.x = Math.PI / 2; w.position.set(x, 0.42, z);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.24, 10), lamC("#c8b070")); hub.rotation.x = Math.PI / 2; hub.position.copy(w.position);
    G.add(w, hub); wheels.push(w);
  }
  for (const h of [-0.5, 0.5]) { const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), lamC("#f4e8b0")); lamp.position.set(2.35, 1.42, h); G.add(lamp); }
  const gun = lewisGun(); gun.position.set(-1.2, 0.75, 0); gun.scale.setScalar(0.9); G.add(gun);
  G.traverse((m) => { (m as THREE.Mesh).castShadow = true; });
  return G;
};

export class World {
  root = new THREE.Group();
  private pool = new Pool();
  private actors: Actor[] = [];
  private fxs: Fx[] = [];
  private hemi: THREE.HemisphereLight; private sun: THREE.DirectionalLight;
  private skyMat: THREE.ShaderMaterial; private sky: THREE.Mesh;
  private fog = new THREE.Fog("#e9dcc6", 70, 480);
  private clouds: THREE.Mesh[] = [];
  private truck: THREE.Group;
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
    this.hemi = new THREE.HemisphereLight("#dcecff", "#a07a5a", 0.55);
    this.sun = new THREE.DirectionalLight("#fff0d0", 2.8);
    this.sun.castShadow = true; this.sun.shadow.mapSize.set(2048, 2048);
    R.add(this.hemi, this.sun, this.sun.target);
    const cm = [0, 1, 2, 3].map((k) => cloudHD(k, CLOUD_DAY));
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2 + hh(i, 20), d = 600 + hh(i, 21) * 500, w = 120 + hh(i, 23) * 120;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: cm[i % 4], transparent: true, depthWrite: false, fog: false }));
      m.position.set(Math.cos(a) * d, 120 + hh(i, 22) * 200, Math.sin(a) * d); m.scale.set(w, w / 2, 1); m.layers.set(NOINK); this.clouds.push(m); R.add(m);
    }
    // ---- outback ground: red dirt with dry grass ----
    const dirtTex = ctex("reddirt", 1024, 1024, (g, r) => {
      g.fillStyle = "#c9875a"; g.fillRect(0, 0, 1024, 1024);
      for (let i = 0; i < 2600; i++) { g.fillStyle = r() < 0.5 ? "rgba(140,80,50,0.3)" : r() < 0.5 ? "rgba(230,180,130,0.3)" : "rgba(170,160,90,0.35)"; g.beginPath(); g.ellipse(r() * 1024, r() * 1024, 2 + r() * 10, 1 + r() * 5, r() * 3, 0, 6.3); g.fill(); }
    });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(dirtTex, 400, 400) }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    // wheat field (golden) around x = 0
    const wheatTex = ctex("wheatfield", 1024, 1024, (g, r) => {
      g.fillStyle = "#d9b25a"; g.fillRect(0, 0, 1024, 1024);
      for (let i = 0; i < 5000; i++) { g.strokeStyle = r() < 0.4 ? "rgba(150,110,40,0.45)" : r() < 0.6 ? "rgba(245,215,120,0.5)" : "rgba(190,150,60,0.4)"; g.lineWidth = 1 + r() * 2; const x = r() * 1024, y = r() * 1024; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 8, y - 6 - r() * 14); g.stroke(); }
    });
    const field = new THREE.Mesh(new THREE.PlaneGeometry(70, 60).rotateX(-Math.PI / 2), lam({ map: rep(wheatTex, 10, 9) }));
    field.position.set(0, 0.0, -10); field.receiveShadow = true; R.add(field);
    const tuft = new THREE.ConeGeometry(0.12, 0.7, 5).translate(0, 0.3, 0), wheat = lamC("#f0c858");
    const tufts = new THREE.InstancedMesh(tuft, wheat, 5000), m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
    let n = 0;
    for (let i = 0; n < 5000 && i < 20000; i++) {
      const x = -35 + hh(i, 40) * 70, z = -40 + hh(i, 41) * 60;
      if (Math.abs(x) < 4 && z > -3) continue; // keep the foreground clear for the cast
      if (z > 8 && Math.abs(x) < 6) continue;
      const s = 0.7 + hh(i, 42) * 0.7; sc.set(s, s, s); q.setFromAxisAngle(V(0, 0, 1), (hh(i, 43) - 0.5) * 0.3);
      tufts.setMatrixAt(n++, m.compose(V(x, 0, z), q, sc));
    }
    tufts.count = n; R.add(tufts);
    // fence round the field
    const post = lamC("#7a5a3a");
    for (let k = 0; k < 60; k++) { const x = -35 + k * (70 / 59); const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 0.12), post); p1.position.set(x, 0.6, -40.5); R.add(p1); }
    for (const y of [0.5, 0.95]) { const rail = new THREE.Mesh(new THREE.BoxGeometry(70, 0.05, 0.05), post); rail.position.set(0, y, -40.5); R.add(rail); }
    // farmhouse with tin roof and water tank
    {
      const house = new THREE.Mesh(new THREE.BoxGeometry(9, 3.2, 6), lam({ map: facadeHD("farmhouse", 9, 3.2, { wall: "#e8dcc0", shutter: "#3f5f4a", door: true }) }));
      house.position.set(-11, 1.6, -26); house.castShadow = house.receiveShadow = true; R.add(house);
      const shape = new THREE.Shape([new THREE.Vector2(-3.6, 0), new THREE.Vector2(3.6, 0), new THREE.Vector2(0, 2.2)]);
      const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 10, bevelEnabled: false }).translate(0, 0, -5), lamC("#a8adb2")); roof.rotation.y = Math.PI / 2; roof.position.set(-11, 3.2, -26); roof.castShadow = true; R.add(roof);
      const veranda = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.1, 2), lamC("#9aa0a6")); veranda.position.set(-11, 2.7, -22.2); veranda.rotation.x = 0.15; R.add(veranda);
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 2.2, 20), lamC("#b8bcc0")); tank.position.set(-4.8, 2.2, -27); R.add(tank);
      const stand = new THREE.Mesh(new THREE.BoxGeometry(2, 1.1, 2), lamC("#6a4a2a")); stand.position.set(-4.8, 0.55, -27); R.add(stand);
      const mill = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.2, 9, 4), lamC("#8a8a8a")); mill.position.set(10, 4.5, -32); R.add(mill);
      for (let k = 0; k < 8; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.4, 0.02), lamC("#c8c8c8")); b.position.set(10, 9 + 0.7 * Math.cos((k / 8) * 6.28), -31.7 + 0.7 * Math.sin((k / 8) * 6.28)); b.rotation.x = (k / 8) * 6.28; R.add(b); }
    }
    // eucalyptus trees + distant mesas
    const bark = lamC("#d8d0c4"), leaf = lamC("#7a9a6a");
    for (let k = 0; k < 70; k++) {
      const a = (k / 70) * Math.PI * 2 + hh(k, 3) * 0.1, d = 45 + hh(k, 4) * 80, h = 5 + hh(k, 5) * 6;
      const x = Math.cos(a) * d + (k % 3 === 0 ? CAMP : 0), z = Math.sin(a) * d - 10;
      const tk = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.3, h, 6), bark); tk.position.set(x, h / 2, z); tk.rotation.z = (hh(k, 6) - 0.5) * 0.2; R.add(tk);
      for (let j = 0; j < 3; j++) { const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4 + hh(k, 7 + j) * 1.2, 0), leaf); c.position.set(x + (hh(k, 10 + j) - 0.5) * 2.5, h + (hh(k, 13 + j) - 0.3) * 1.5, z + (hh(k, 16 + j) - 0.5) * 2.5); c.scale.y = 0.6; c.castShadow = true; R.add(c); }
    }
    for (let k = 0; k < 9; k++) { const a = (k / 9) * Math.PI * 2 + 0.3, mesa = new THREE.Mesh(new THREE.CylinderGeometry(40 + hh(k, 50) * 40, 60 + hh(k, 51) * 50, 14 + hh(k, 52) * 12, 7), lamC("#c47a52")); mesa.position.set(Math.cos(a) * 320 + 100, 4, Math.sin(a) * 320); R.add(mesa); }
    // ---- army camp ----
    {
      const tent = lamC("#b8a878");
      for (const [x, z, rot] of [[-4.5, -5, 0.3], [4.5, -6, -0.2], [0, -9, 0]]) {
        const shape = new THREE.Shape([new THREE.Vector2(-1.8, 0), new THREE.Vector2(1.8, 0), new THREE.Vector2(0, 2.3)]);
        const t = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 3.6, bevelEnabled: false }).translate(0, 0, -1.8), tent);
        t.position.set(CAMP + x, 0, z); t.rotation.y = rot; t.castShadow = t.receiveShadow = true; R.add(t);
      }
      for (const x of [-1.5, 1.5]) { const g = lewisGun(); g.position.set(CAMP + x, 0, 0.7); g.rotation.y = x < 0 ? 0.4 : Math.PI - 0.4; R.add(g); }
      const crateM = lam({ map: rep(planksHD(), 0.5, 0.5), color: "#b8946a" });
      for (const [x, z, y] of [[2.6, -1.2, 0.25], [3.3, -1.0, 0.25], [2.9, -1.1, 0.75], [-2.8, -1.4, 0.25]]) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.5), crateM); c.position.set(CAMP + x, y, z); c.castShadow = true; R.add(c); }
      const flagpole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 6, 6), lamC("#5a4a3a")); flagpole.position.set(CAMP - 6, 3, -7); R.add(flagpole);
    }
    // the gun nest in the field (shots 4-5): sandbags + gun
    {
      const bag = lamC("#c8b48a");
      for (let k = 0; k < 7; k++) { const sb = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 6), bag); sb.scale.set(1.2, 0.5, 0.7); sb.position.set(0.6 + k * 0.32, 0.15 + (k % 2) * 0.12, 13.5); R.add(sb); }
      const g = lewisGun(); g.position.set(1.75, 0, 14.0); g.rotation.y = Math.PI * 0.62; R.add(g);
    }
    // ---- road for the chase ----
    const road = new THREE.Mesh(new THREE.PlaneGeometry(400, 4).rotateX(-Math.PI / 2), lam({ map: rep(dirtTex, 80, 1), color: "#e0b890" }));
    road.position.set(ROAD + 150, 0.01, 0); road.receiveShadow = true; R.add(road);
    for (let k = 0; k < 60; k++) { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 + hh(k, 60) * 0.6, 0), lamC(["#8a9a5a", "#a0a060"][k % 2])); b.position.set(ROAD - 10 + k * 6 + hh(k, 61) * 3, 0.3, (k % 2 ? 1 : -1) * (3.5 + hh(k, 62) * 6)); b.scale.y = 0.6; R.add(b); }
    this.truck = truck(); R.add(this.truck);
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
    const shc = this.sun.shadow.camera;
    shc.left = -Rr; shc.right = Rr; shc.top = Rr; shc.bottom = -Rr; shc.near = 20; shc.far = 500; shc.updateProjectionMatrix();
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
    untone(L.fog, this.fog.color); this.fog.near = 70; this.fog.far = 480;
    scene.fog = this.fog; scene.background = null;
    for (const m of this.clouds) m.quaternion.copy(cam.quaternion);
    // the truck: parked at camp, driving on the road in shot 6
    if (id === S.truck) { const x = truckX(f); this.truck.position.set(x, 0.03 * Math.abs(Math.sin(t * 13)), 0); this.truck.rotation.set(0, 0, 0.02 * Math.sin(t * 9)); }
    else { this.truck.position.set(CAMP + 6, 0, -3.5); this.truck.rotation.set(0, -0.5, 0); }

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
    // an emu moving along (dx, dz) faces right on screen if that direction points to camera-right
    const emu = (i: number, x: number, z: number, scale: number, pose: EmuPose, dx = 1, dz = 0, y = 0) => {
      if (!visible(x, 1.2 * scale, z, 2.5 * scale)) return;
      const d = cam.position.distanceTo(this.v.set(x, 1.2 * scale, z)) / scale, [w, h, k] = tierW(d);
      const ph = pose.ph !== undefined ? Math.round(((pose.ph % (Math.PI * 2)) / (Math.PI * 2)) * 8) / 8 * Math.PI * 2 : undefined;
      const p2 = { ...pose, ph, k: pose.k !== undefined ? Math.round(pose.k * 6) / 6 : undefined };
      const mirror = dx * right.x + dz * right.z < 0;
      st.places.push({ key: `emu|${JSON.stringify(p2)}|${w}`, x, y, z, size: [w, h, k], wide: true, scale, mirror, draw: emuDraw(p2) });
      if (d < 60) blob(st, sunDir, x, y, z, 0.9 * scale);
      void i;
    };
    const fx = (key: string, cw: number, ch: number, draw: (p: Pen) => void, x: number, y: number, z: number, w: number, h: number, soft = false) =>
      st.fx.push({ key, cw, ch, draw, x, y, z, w, h, soft });

    // ---- the flock in the field: grazing, then scattering at "joder" ----
    const flock = (n: number, scatter: boolean, near: [number, number] | null) => {
      for (let k = 0; k < n; k++) {
        const a = hh(k, 70) * Math.PI * 2, r = 3 + hh(k, 71) * 14;
        let x = Math.cos(a) * r * 1.3, z = Math.min(-0.5, -4 + Math.sin(a) * r * 0.7);
        if (near && Math.hypot(x - near[0], z - near[1]) < 1.6) continue;
        const go = scatter ? Math.max(0, f - W.joder - 6 - hh(k, 72) * 20) / FPS : 0;
        if (go > 0) {
          const dir = a + (hh(k, 73) - 0.5) * 0.6, v = EMU_V * 0.4 * (0.6 + 0.4 * hh(k, 74));
          const dx = Math.cos(dir), dz = Math.sin(dir) * 0.7;
          x += dx * v * go; z += dz * v * go;
          emu(k, x, z, 0.9, { mode: "run", ph: t * 16 + k, look: "mad" }, dx, dz);
          if (k % 3 === 0) fx(`dust|${Math.floor(f / 2 + k) % 6}`, 256, 256, dustDraw(((f / 2 + k) % 6) / 6), x - dx * 0.8, 0.4, z - dz * 0.8, 1.2, 1.2, true);
        } else {
          const pk = (Math.sin(t * (1.5 + hh(k, 75)) + k) + 1) / 2;
          emu(k, x + 0.2 * Math.sin(t * 0.5 + k), z, 0.9, k % 3 ? { mode: "peck", k: pk } : { mode: "stand", look: "eye" }, hh(k, 76) < 0.5 ? 1 : -1, 0);
        }
      }
    };

    if (id === S.hook) {
      emu(0, 0.5, 1.2, 0.85, f < W.si ? { mode: "stand", look: "eye" } : { mode: "peck", k: (Math.sin(t * 6) + 1) / 2 }, -1, 0);
      person("dig", DIGGER(0, { rifle: true }), -0.6, 0, 0, { mode: "stand", expr: f < W.pajaros - 2 ? "stern" : "shock", facing: 1 }, 1);
      flock(30, false, [0.5, 1.2]);
    }
    if (id === S.farm) {
      flock(40, false, null);
      const mad = f > W.granjeros - 3;
      person("farmer", FARMER(0), 1.6, 0, 4.2, { mode: "stand", expr: mad ? "shout" as Expr : "nervous", wave: mad ? Math.sin(t * 10) * 0.5 + 0.5 : undefined }, 2);
      person("farmer2", FARMER(1), 0.4, 0, 4.8, { mode: "stand", expr: mad ? "shock" : "nervous", raise: mad ? 1 : 0 }, 3);
    }
    if (id === S.army || id === S.quote) {
      const q = id === S.quote;
      const ex: Expr = q ? (f > W.conquisto - 2 ? "shout" as Expr : f > W.bichos - 3 ? "grin" : "stern") : f > W.que - 2 ? "grin" : f > W.comandante - 3 ? "stern" : "neutral";
      person("major", MAJOR, CAMP, 0, 0, { mode: "stand", expr: ex, raise: q && f > W.conquisto - 2 ? 1 : 0, wave: !q && f > W.dos - 2 && f < W.que ? 0.7 : undefined }, 4);
      if (!q) {
        person("g1", DIGGER(1, { rifle: false }), CAMP - 1.3, 0, -0.9, { mode: "stand", expr: f > W.que ? "grin" : "stern" }, 5);
        person("g2", DIGGER(2, { rifle: false }), CAMP + 1.3, 0, -0.9, { mode: "stand", expr: f > W.que ? "whistle" : "stern" }, 6);
      } else {
        // an emu sneaks up behind the major and stares at the camera; a flock crosses the background at the end (loop)
        const pk = smooth((f - 740) / 20);
        emu(90, CAMP + 0.55, -0.9, 0.95, f > W.bichos - 3 ? { mode: "hop", ph: t * 9, look: "happy" } : { mode: "stand", look: "eye" }, -1, 0, 0);
        void pk;
        if (f > 800) for (let k = 0; k < 10; k++) emu(91 + k, CAMP - 14 + EMU_V * (f - 800 - k * 3) / FPS * 0.8, -6 - (k % 3) * 1.4, 0.9, { mode: "run", ph: t * 16 + k }, 1, 0);
      }
    }
    if (id === S.scatter) {
      flock(40, true, null);
      if (f > W.joder - 4) fx(`dust0|${Math.floor(f / 2) % 6}`, 256, 256, dustDraw((Math.floor(f / 2) % 6) / 6), 0, 0.6, -2, 6, 3, true);
    }
    if (id === S.jam) {
      const jam = f > W.atasca - 3;
      person("gunner", DIGGER(3, { rifle: false }), 1.2, 0, 14, { mode: "stand", expr: jam ? (f > W.atasca + 8 ? "nervous" : "shock") : "grin", facing: 1 }, 7);
      if (!jam && f % 4 < 2) fx(`flash|${f % 4}`, 500, 500, (p) => fxBurst(p, 0.3, "#fff3b0", 8, 30, 200), 2.55, 1.0, 13.6, 0.5, 0.5, true);
      if (jam) {
        const u = Math.min(1, (f - W.atasca + 3) / 18);
        fx(`smoke|${Math.round(u * 8)}`, 256, 256, smokeDraw(u), 1.9, 1.2 + 0.4 * u, 14.1, 0.9 + 0.6 * u, 0.9 + 0.6 * u, true);
        if (f < W.atasca + 10) fx(`creak|${f % 6}`, 300, 300, (p) => fxCreak(p, (f % 6) / 6), 1.7, 1.25, 14.2, 0.5, 0.5);
      }
      for (let k = 0; k < 5; k++) emu(50 + k, -2 + k * 1.4 + (f - 466) / FPS * 3, 8 - k * 1.2, 0.9, { mode: "run", ph: t * 16 + k }, 1, -0.2);
    }
    if (id === S.truck) {
      const x = truckX(f);
      person("tgun", DIGGER(4, { rifle: false }), x - 1.1, 1.2, 0.2, { mode: "stand", expr: f > W.alcanza - 4 ? "shock" : "grin" }, 8, false);
      if (f % 5 < 2 && f < W.alcanza) fx(`flash2|${f % 5}`, 500, 500, (p) => fxBurst(p, 0.3, "#fff3b0", 8, 30, 200), x - 0.1, 2.0, 0, 0.5, 0.5, true);
      fx(`dust2|${Math.floor(f / 2) % 6}`, 256, 256, dustDraw((Math.floor(f / 2) % 6) / 6), x - 3.2, 0.6, 0.3, 2.2, 2.2, true);
      const lead = x + 3.0 + 1.3 * Math.max(0, f - TRUCK_A) / FPS;
      for (let k = 0; k < 5; k++) emu(60 + k, lead + k * 0.8 + (k % 2) * 0.3, -1.4 - (k % 3) * 0.7, 0.9, { mode: "run", ph: t * 18 + k * 1.3, look: k === 2 && f > W.alcanza - 6 ? "happy" : "mad" }, 1, 0);
    }
    if (id === S.retreat) {
      const sad = f > W.hostia - 3;
      for (let k = 0; k < 4; k++) person(`ret${k}`, DIGGER(k), -1.8 + k * 1.2, 0, 13.5 + (k % 2) * 0.6 + (f - 588) / FPS * 0.35, { mode: "march", phase: t * 3 + k, expr: sad ? (k % 2 ? "dazed" : "nervous") : "stern" }, 10 + k);
      person("major2", MAJOR, 0.2, 0, 15.2 + (f - 588) / FPS * 0.35, { mode: "march", phase: t * 3, expr: sad ? "nervous" : "stern" }, 4);
      for (let k = 0; k < 9; k++) emu(70 + k, -4 + k * 1.0, 8 - (k % 3) * 1.5, 0.9, { mode: "hop", ph: t * 9 + k, look: "happy" }, k % 2 ? 1 : -1, 0);
      if (f > W.hostia) for (let k = 0; k < 3; k++) fx(`note${k}`, 256, 256, noteDraw, -3 + k * 3, 2.6 + 0.2 * Math.sin(t * 5 + k), 8, 0.35, 0.35);
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
