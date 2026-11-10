// "La ola de cerveza de Londres" (St Giles, 17 October 1814), one three.js world posed per frame.
// A narrow cobbled street along +z lined with terraced houses (town.ts), the Meux brewery yard across its north end
// behind a brick wall: the giant wooden vat with iron hoops and three smaller vats. Two houses on the left get
// flattened. Far away: a barrel warehouse (x = -300), the courtroom (x = 300) and the brewer's office (x = 600).
import * as THREE from "three";
import { Pen, bodyFront, Outfit, Expr, SKINS, fxBurst, fxCreak, fxPuff, fxSplash } from "./toon";
import { Pool, Actor, Fx, Stage, tier, light2D, blob, BODY, WIDE } from "./troop";
import { NOINK } from "./ink";
import { LIGHTS, LOOK, LightPreset, WorldLook } from "./lights";
import { TONE, CHAR, twoTone, untone } from "./shade";
import { cloudHD, rep, ctex, facadeHD, cobbleHD, stoneHD, planksHD, CLOUD_GOLD } from "./paint";
import { terrace, streetProps, skyline, lamC } from "./town";
import { FPS, SHOTS, camAt, smooth, floodAt, VAT, VAT_FRONT, BURST, S, W } from "./story";

// ---------------- late-afternoon October light: low warm sun, violet shadows ----------------
const WL: LightPreset = { ...LIGHTS.day, el: 26, lit: [1.55, 1.36, 1.08], shade: [0.42, 0.37, 0.4], lift: [0.06, 0.05, 0.06], sunCol: "#ffd6a8", charTint: [1.0, 0.92, 0.84], fog: "#e6cdb4" };
const WK: WorldLook = { ...LOOK.day, sky: { c: ["#f4d8b8", "#e6cdb8", "#b8c4d8", "#8fa8d0", "#6a8cc4"], e: [0, 4, 10, 20, 40] }, sat: 0.95 };

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const hh = (i: number, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const lam = (p: THREE.MeshLambertMaterialParameters) => twoTone(new THREE.MeshLambertMaterial(p));
const gait = (t: number, hz: number) => Math.floor(((((t * hz) % 1) + 1) % 1) * 8) / 8;

// ---------------- cast (Regency London) ----------------
const COATS = ["#3f5f8a", "#7a3a3a", "#4f6a3a", "#8a5a34", "#2f5560", "#5a4a7a", "#9a6a3a", "#4a4a5a"];
const folk = (v: number): Outfit => {
  const o: Outfit = { jacket: COATS[v % 8], pants: v % 3 ? "#d8c8a0" : "#3b3f52", boots: "#3a2a20", skin: SKINS[v % 4] };
  if (v % 4 === 1) return { ...o, hat: "bonnet", dress: ["#c8a46a", "#a85a6a", "#5a7aa2", "#7a9a6a"][v % 4] };
  if (v % 4 === 3) return { ...o, hat: "cap", cap: ["#5a4632", "#3a3f52", "#7a3a30"][v % 3], moustache: v % 8 === 3 ? "#4a3426" : undefined };
  return { ...o, hat: "tophat", moustache: v % 3 === 0 ? "#3a2a20" : undefined };
};
const BREWER_MAN = (v: number): Outfit => ({ jacket: ["#e8e0cc", "#d8c8a8"][v % 2], pants: "#5a4632", boots: "#3a2a20", hat: "cap", cap: "#4a3a2a", skin: SKINS[(v + 1) % 4], belt: "#6a4a2a", moustache: v % 2 ? "#5a3a26" : undefined });
const BREWER: Outfit = { jacket: "#4a2a3a", pants: "#d8c8a0", boots: "#1e1a1a", hat: "tophat", skin: SKINS[0], moustache: "#6a4a30", buttons: "#e8c45a", build: "stout" };
const TAXMAN: Outfit = { jacket: "#2a2a34", pants: "#2a2a34", boots: "#1a1a1a", hat: "tophat", skin: SKINS[1], buttons: "#d9dde0" };
const JUDGE: Outfit = { jacket: "#7a1a22", pants: "#1e1c26", boots: "#1a1a1a", hat: "hair", hair: "#f2f0ea", skin: SKINS[1], buttons: "#f4f1ea" };

// ---------------- painted pieces ----------------
/** porter: near-black brown body, foam (v > 0.8) on the crest */
const beerTex = () => ctex("beerHD", 512, 512, (g, r) => {
  const gr = g.createLinearGradient(0, 512, 0, 0);
  gr.addColorStop(0, "#2a1408"); gr.addColorStop(0.62, "#4a2410"); gr.addColorStop(0.74, "#7a4a22"); gr.addColorStop(0.8, "#e8d2a8"); gr.addColorStop(1, "#fff4dc");
  g.fillStyle = gr; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 60; i++) { const y = 150 + r() * 362, x = r() * 512, w = 40 + r() * 200; g.fillStyle = r() < 0.5 ? "rgba(110,60,24,0.5)" : "rgba(20,8,2,0.45)"; g.beginPath(); g.ellipse(x, y, w / 2, 2 + r() * 5, 0, 0, 6.3); g.fill(); }
  for (let i = 0; i < 140; i++) { const y = r() * 120, x = r() * 512, rr = 3 + r() * 12; g.fillStyle = r() < 0.5 ? "rgba(255,250,236,0.9)" : "rgba(214,186,140,0.7)"; g.beginPath(); g.arc(x, y, rr, 0, 6.3); g.fill(); }
  for (let i = 0; i < 24; i++) { const y = 200 + r() * 300, x = r() * 512; g.fillStyle = "rgba(255,210,150,0.55)"; g.beginPath(); g.ellipse(x, y, 10 + r() * 40, 1.5, 0, 0, 6.3); g.fill(); }
});
const poolTex = () => ctex("beerPool", 512, 512, (g, r) => {
  g.fillStyle = "#3a1c0a"; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 70; i++) { const x = r() * 512, y = r() * 512, rr = 6 + r() * 30; g.fillStyle = "rgba(232,210,168,0.55)"; g.beginPath(); g.ellipse(x, y, rr, rr * 0.6, r() * 3, 0, 6.3); g.fill(); }
  for (let i = 0; i < 40; i++) { g.fillStyle = "rgba(120,64,24,0.5)"; g.beginPath(); g.ellipse(r() * 512, r() * 512, 30 + r() * 80, 3, 0, 0, 6.3); g.fill(); }
});
const staveTex = () => ctex("staves", 1024, 512, (g, r) => {
  for (let i = 0; i < 48; i++) {
    const c = 150 + r() * 40; g.fillStyle = `rgb(${c},${c * 0.62 | 0},${c * 0.36 | 0})`; g.fillRect(i * (1024 / 48), 0, 1024 / 48, 512);
    g.fillStyle = "rgba(60,30,12,0.7)"; g.fillRect(i * (1024 / 48), 0, 3, 512);
    for (let k = 0; k < 6; k++) { g.fillStyle = "rgba(90,50,20,0.35)"; g.fillRect(i * (1024 / 48) + 4 + r() * 12, r() * 512, 2, 30 + r() * 80); }
  }
  for (let i = 0; i < 30; i++) { const x = r() * 1024, y = 300 + r() * 200; g.fillStyle = "rgba(40,20,8,0.75)"; g.fillRect(x, y, 4, 512 - y); } // leaks
});
const wallTex = () => facadeHD("brewwall", 40, 4, { wall: "#b97a5a", shutter: "#3a3a3a", brick: true });
const coinDraw = (p: Pen) => { p.ell(64, 64, 50, 50, "#f2c84a", 7); p.ell(64, 64, 32, 32, null, 4); p.ell(52, 50, 10, 6, "#fff2b0", 0); };
const bagDraw = (p: Pen) => {
  p.poly([[60, 90], [196, 90], [236, 220], [200, 250], [56, 250], [20, 220]], "#c8a46a", 8);
  p.poly([[96, 60], [160, 60], [150, 92], [106, 92]], "#c8a46a", 7); p.band([[92, 88], [164, 88]], "#6a4a2a", 10, 3);
  p.g.fillStyle = "#3a2a1a"; p.g.font = "bold 70px Georgia"; p.g.textAlign = "center"; p.g.fillText("£", 128, 200);
};
const fountainDraw = (u: number) => (p: Pen) => { // 256 x 512 beer geyser out of a barrel, u 0..1
  const h = 440 * Math.sin(Math.min(1, u * 1.6) * Math.PI * 0.5), y0 = 510;
  p.poly([[112, y0], [104, y0 - h * 0.6], [92, y0 - h], [164, y0 - h], [152, y0 - h * 0.6], [144, y0]], "#4a2410", 5);
  p.poly([[116, y0], [114, y0 - h * 0.8], [124, y0 - h], [126, y0]], "#8a5428", 0);
  p.poly([[80, y0 - h + 6], [92, y0 - h - 26], [128, y0 - h - 40], [164, y0 - h - 26], [176, y0 - h + 6], [128, y0 - h + 14]], "#f6ead0", 5);
  for (let k = 0; k < 5; k++) p.ell(88 + k * 20, y0 - h + 30 + (k % 2) * 30 + u * 40, 6, 9, "#5a2c10", 2);
};
const ropeDraw = (p: Pen) => p.stroke([[16, 0], [20, 120], [14, 240], [18, 360], [16, 512]], 9, "#b8945a");
const tearDraw = (p: Pen) => { p.ell(32, 40, 10, 16, "#9ad0f2", 3); };

// ---------------- layout ----------------
export const STREET = { half: 4, front: 5.6, z0: -24, z1: 70 };
const FLAT = { x0: -14.6, x1: -STREET.front, z0: 9, z1: 21 }; // the two houses that go down
const VATS2 = [[-12, -46, 4.0, 6.0], [12, -46, 4.2, 6.2], [0, -58, 4.6, 6.4]] as const;
const RUNNERS = Array.from({ length: 9 }, (_, k) => ({ x: -3 + (k % 4) * 2 + (hh(k, 70) - 0.5), dz: 2.5 + k * 1.3 + hh(k, 71), v: k + 2 }));
const STROLL = Array.from({ length: 14 }, (_, k) => ({ x: (hh(k, 60) - 0.5) * 6.5, z: -22 + hh(k, 61) * 40, dir: hh(k, 62) < 0.5 ? -1 : 1, v: k }));
const BARRELS = (() => { const o: { x: number; z: number; i: number }[] = []; let i = 0; for (let r = 0; r < 40; r++) for (let c = -14; c <= 14; c++) o.push({ x: -300 + c * 1.05, z: -r * 1.05, i: i++ }); return o; })();

export class World {
  root = new THREE.Group();
  private pool = new Pool();
  private actors: Actor[] = [];
  private fxs: Fx[] = [];
  private hemi: THREE.HemisphereLight; private sun: THREE.DirectionalLight;
  private skyMat: THREE.ShaderMaterial; private sky: THREE.Mesh;
  private fog = new THREE.Fog("#d8b49a", 60, 380);
  private clouds: THREE.Mesh[] = [];
  private vat = new THREE.Group(); private broken = new THREE.Group(); private hoop!: THREE.Mesh;
  private vats2: THREE.Group[] = []; private wallWhole!: THREE.Mesh; private wallBroken = new THREE.Group();
  private flat = new THREE.Group();
  private wave: THREE.Mesh; private wavePos: THREE.BufferAttribute; private waveUv: THREE.BufferAttribute;
  private pool2: THREE.Mesh; private yardPool: THREE.Mesh;
  private barrels: THREE.InstancedMesh;
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
    this.hemi = new THREE.HemisphereLight("#e8c8b0", "#7a6a7a", 0.5);
    this.sun = new THREE.DirectionalLight("#ffc68a", 4);
    this.sun.castShadow = true; this.sun.shadow.mapSize.set(2048, 2048);
    R.add(this.hemi, this.sun, this.sun.target);
    const cm = [0, 1, 2, 3].map((k) => cloudHD(k, CLOUD_GOLD));
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2 + hh(i, 20), d = 500 + hh(i, 21) * 500, w = 160 + hh(i, 23) * 140;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: cm[i % 4], transparent: true, depthWrite: false, fog: false }));
      m.position.set(Math.cos(a) * d, 80 + hh(i, 22) * 200, Math.sin(a) * d); m.scale.set(w, w / 2, 1); m.layers.set(NOINK); this.clouds.push(m); R.add(m);
    }
    skyline(R, "#e6cdb4", 180, true);

    // ---- ground ----
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 600, 600), color: "#b8aaa0" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    const street = new THREE.Mesh(new THREE.PlaneGeometry(STREET.half * 2, 110).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 2, 110 / 4), color: "#d8ccc0" }));
    street.position.set(0, 0, 21); street.receiveShadow = true; R.add(street);
    for (const s of [-1, 1]) {
      const walk = new THREE.Mesh(new THREE.BoxGeometry(STREET.front - STREET.half, 0.15, 110), lam({ map: rep(stoneHD(), 1, 110 / 2), color: "#e2d8cc" }));
      walk.position.set(s * (STREET.half + STREET.front) / 2, 0.075, 21); walk.receiveShadow = true; R.add(walk);
      streetProps(R, s as -1 | 1, STREET.half, STREET.z0, STREET.z1, 11 + s, s === -1 ? [[FLAT.z0, FLAT.z1]] : []);
    }
    terrace(R, { side: -1, x: STREET.front, z0: STREET.z0, z1: STREET.z1, seed: 21, skip: [[FLAT.z0, FLAT.z1]], signs: ["THE TAVISTOCK ARMS", "BAKER", "CHANDLER"], brick: 0.6 });
    terrace(R, { side: 1, x: STREET.front, z0: STREET.z0, z1: STREET.z1, seed: 37, signs: ["GIN", "TAILOR", "COFFEE HOUSE"], brick: 0.6 });
    { const b = new THREE.Mesh(new THREE.BoxGeometry(30, 11, 8), lam({ map: facadeHD("endblock", 30, 11, { wall: "#c9b08a", shutter: "#3f5f4a", brick: true, door: true }) }));
      b.position.set(0, 5.5, STREET.z1 + 4); b.rotation.y = Math.PI; b.castShadow = b.receiveShadow = true; R.add(b); }

    // ---- the two houses that get flattened (wood and plaster, older) ----
    {
      const w = FLAT.z1 - FLAT.z0, d = FLAT.x1 - FLAT.x0;
      for (const [k, zc] of [[0, FLAT.z0 + w / 4], [1, FLAT.z0 + 3 * w / 4]] as const) {
        const hgt = 7 + k * 1.4;
        const walls = new THREE.Mesh(new THREE.BoxGeometry(d, hgt, w / 2 - 0.1), [lam({ map: facadeHD(`old${k}`, w / 2, hgt, { wall: k ? "#d8c09a" : "#c8b088", shutter: "#5a3a2a", timber: true, door: true }) }), lam({ color: "#a88a6a" }), lam({ color: "#5a3a2a" }), lam({ color: "#5a3a2a" }), lam({ color: "#a88a6a" }), lam({ color: "#a88a6a" })]);
        walls.position.set(0, hgt / 2, zc - (FLAT.z0 + w / 2)); walls.castShadow = walls.receiveShadow = true;
        const shape = new THREE.Shape([new THREE.Vector2(-d / 2 - 0.3, 0), new THREE.Vector2(d / 2 + 0.3, 0), new THREE.Vector2(0, 2.6)]);
        const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: w / 2, bevelEnabled: false }), lam({ color: k ? "#6a4a3e" : "#5a4a52" }));
        roof.position.set(0, hgt, zc - (FLAT.z0 + w / 2) - w / 4); roof.castShadow = true;
        this.flat.add(walls, roof);
      }
      this.flat.position.set((FLAT.x0 + FLAT.x1) / 2, 0, (FLAT.z0 + FLAT.z1) / 2);
      R.add(this.flat);
    }

    // ---- the brewery: yard wall across the street end, big brick brewhouse behind ----
    {
      const wm = lam({ map: rep(wallTex(), 1, 1) });
      this.wallWhole = new THREE.Mesh(new THREE.BoxGeometry(40, 4, 0.8), wm);
      this.wallWhole.position.set(0, 2, -26); this.wallWhole.castShadow = this.wallWhole.receiveShadow = true; R.add(this.wallWhole);
      for (const [x0, x1] of [[-20, -6.5], [6, 20]]) { // broken wall: two stubs with ragged ends
        const m = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 4, 0.8), wm); m.position.set((x0 + x1) / 2, 2, -26); m.castShadow = true; this.wallBroken.add(m);
      }
      for (let k = 0; k < 10; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.6 + hh(k, 5), 0.3 + hh(k, 6) * 0.4, 0.5), lamC("#a8644a")); b.position.set(-6 + k * 1.3, 0.2, -24 + hh(k, 7) * 6); b.rotation.y = hh(k, 8) * 3; this.wallBroken.add(b); }
      this.wallBroken.visible = false; R.add(this.wallBroken);
      const gate = new THREE.Mesh(new THREE.BoxGeometry(4, 0.6, 0.9), lamC("#e8dcc8")); gate.position.set(0, 4.3, -26); R.add(gate);
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(6, 0.96), twoTone(new THREE.MeshLambertMaterial({ map: ctex("meuxsign", 1024, 164, (g) => {
        g.fillStyle = "#1e2a1e"; g.fillRect(0, 0, 1024, 164); g.strokeStyle = "#e8c45a"; g.lineWidth = 8; g.strokeRect(8, 8, 1008, 148);
        g.fillStyle = "#e8c45a"; g.font = "bold 86px Georgia"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("MEUX'S BREWERY", 512, 86); }) })));
      sign.position.set(0, 5.4, -25.55); R.add(sign);
      const house = new THREE.Mesh(new THREE.BoxGeometry(46, 14, 14), lam({ map: facadeHD("brewhouse", 46, 14, { wall: "#b97a5a", shutter: "#3a3a3a", brick: true }) }));
      house.position.set(0, 7, -72); house.castShadow = house.receiveShadow = true; R.add(house);
      const yard = new THREE.Mesh(new THREE.PlaneGeometry(40, 40).rotateX(-Math.PI / 2), lam({ map: rep(stoneHD(), 10, 9), color: "#c8b8a8" }));
      yard.position.set(0, 0.006, -46); yard.receiveShadow = true; R.add(yard);
      for (const [x, z, w, d, h] of [[-26, -40, 12, 30, 9], [26, -40, 12, 30, 10]]) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lam({ map: rep(facadeHD(`bw${x}`, d, h, { wall: "#b97a5a", shutter: "#3a3a3a", brick: true }), 1, 1) }));
        b.position.set(x, h / 2, z); b.castShadow = b.receiveShadow = true; R.add(b);
      }
      const cw = lamC("#9a5a3e"); // the brewery chimney
      const ch = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.5, 26, 16), cw); ch.position.set(14, 13, -74); ch.castShadow = true; R.add(ch);
    }
    // ---- vats: wooden staves + iron hoops ----
    const staves = lam({ map: rep(staveTex(), 1, 1) }), hoopM = lamC("#3a3436");
    const makeVat = (r: number, h: number) => {
      const g = new THREE.Group();
      const side = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.96, r, h, 48, 1, true), staves); side.position.y = h / 2; side.castShadow = side.receiveShadow = true;
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.97, r * 0.97, 0.2, 48), lamC("#7a4a24")); lid.position.y = h - 0.15;
      g.add(side, lid);
      for (let k = 1; k <= 5; k++) { const hp = new THREE.Mesh(new THREE.TorusGeometry(r * (1 - 0.04 * k / 5) + 0.04, 0.09, 6, 48), hoopM); hp.rotation.x = Math.PI / 2; hp.position.y = (k / 6) * h; hp.castShadow = true; g.add(hp); }
      return g;
    };
    this.vat = makeVat(VAT.r, VAT.h); this.vat.position.set(VAT.x, 0, VAT.z); R.add(this.vat);
    this.hoop = new THREE.Mesh(new THREE.TorusGeometry(VAT.r + 0.1, 0.12, 6, 48), hoopM); this.hoop.rotation.x = Math.PI / 2; this.hoop.castShadow = true; R.add(this.hoop);
    for (const [x, z, r, h] of VATS2) { const g = makeVat(r, h); g.position.set(x, 0, z); this.vats2.push(g); R.add(g); }
    {
      const geo = new THREE.CylinderGeometry(VAT.r, VAT.r, 2.4, 48, 1, true), p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) if (p.getY(i) > 0) { const q = Math.atan2(p.getZ(i), p.getX(i)); p.setY(i, 1.2 + 1.3 * Math.abs(Math.sin(q * 11)) * Math.sin(q * 2 + 1) - (Math.cos(q - Math.PI / 2) > 0.6 ? 2.3 : 0)); }
      geo.computeVertexNormals();
      const ring = new THREE.Mesh(geo, lam({ map: rep(staveTex(), 1, 0.3), side: THREE.DoubleSide })); ring.position.y = 0;
      this.broken.add(ring); this.broken.position.set(VAT.x, 0, VAT.z); this.broken.visible = false; R.add(this.broken);
    }

    // ---- the wave + pools ----
    {
      const geo = new THREE.BufferGeometry(), nv = WAVE.nx * WAVE.nr, idx: number[] = [];
      for (let j = 0; j < WAVE.nr - 1; j++) for (let i = 0; i < WAVE.nx - 1; i++) { const a = j * WAVE.nx + i, b = a + 1, c = a + WAVE.nx, d = c + 1; idx.push(a, b, c, b, d, c); }
      this.wavePos = new THREE.BufferAttribute(new Float32Array(nv * 3), 3); this.waveUv = new THREE.BufferAttribute(new Float32Array(nv * 2), 2);
      geo.setAttribute("position", this.wavePos); geo.setAttribute("uv", this.waveUv); geo.setIndex(idx);
      const bt = beerTex(); bt.wrapT = THREE.ClampToEdgeWrapping;
      this.wave = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: bt, side: THREE.DoubleSide, emissive: new THREE.Color("#24120a") }));
      this.wave.frustumCulled = false; this.wave.castShadow = true; R.add(this.wave);
      const pm = new THREE.MeshLambertMaterial({ map: rep(poolTex(), 2, 20), emissive: new THREE.Color("#24120a") });
      this.pool2 = new THREE.Mesh(new THREE.PlaneGeometry(STREET.front * 2, 110).rotateX(-Math.PI / 2), pm); this.pool2.position.set(0, 0.5, 21); this.pool2.receiveShadow = true; R.add(this.pool2);
      this.yardPool = new THREE.Mesh(new THREE.PlaneGeometry(40, 40).rotateX(-Math.PI / 2), pm); this.yardPool.position.set(0, 1.1, -46); R.add(this.yardPool);
    }

    // ---- the barrel warehouse at x = -300 (9,000 barrels: 1,160 shown, the rest lost in the gloom) ----
    {
      const geo = new THREE.LatheGeometry(Array.from({ length: 9 }, (_, i) => new THREE.Vector2(0.34 + 0.08 * Math.sin((i / 8) * Math.PI), (i / 8) * 0.95)), 14);
      this.barrels = new THREE.InstancedMesh(geo, lam({ map: ctex("barrelTex", 256, 256, (g, r) => { for (let i = 0; i < 16; i++) { const c = 140 + r() * 40; g.fillStyle = `rgb(${c},${c * 0.6 | 0},${c * 0.34 | 0})`; g.fillRect(i * 16, 0, 16, 256); g.fillStyle = "rgba(50,25,10,0.7)"; g.fillRect(i * 16, 0, 2, 256); } g.fillStyle = "#3a3436"; for (const y of [26, 70, 186, 230]) g.fillRect(0, y, 256, 14); }) }), BARRELS.length);
      const m = new THREE.Matrix4(); BARRELS.forEach((b, i) => this.barrels.setMatrixAt(i, m.makeTranslation(b.x, 0, b.z)));
      this.barrels.castShadow = true; R.add(this.barrels);
      const fl = new THREE.Mesh(new THREE.PlaneGeometry(60, 70).rotateX(-Math.PI / 2), lam({ map: rep(planksHD(), 8, 9), color: "#a8805a" })); fl.position.set(-300, 0.01, -20); fl.receiveShadow = true; R.add(fl);
      for (const [x, z, w, d] of [[-300, -52, 60, 1], [-330, -20, 1, 70], [-270, -20, 1, 70]]) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(w, 12, d), lam({ map: rep(facadeHD(`wh${x}${z}`, Math.max(w, d), 12, { wall: "#8a6a5a", shutter: "#3a3a3a", brick: true }), 1, 1) })); b.position.set(x, 6, z); b.receiveShadow = true; R.add(b);
      }
      for (let k = 0; k < 8; k++) { const beamM = new THREE.Mesh(new THREE.BoxGeometry(60, 0.5, 0.5), lamC("#5a3a24")); beamM.position.set(-300, 7.5, -k * 7); R.add(beamM); }
    }
    // ---- the courtroom at x = 300 and the brewer's office at x = 600 ----
    const room = (C: number, wallCol: string, drapeCol: string | null) => {
      const wood = lam({ map: rep(planksHD(), 3, 3), color: "#c89a6a" }), dark = lamC("#6a3f24"), wall = lamC(wallCol);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 16).rotateX(-Math.PI / 2), wood); floor.position.set(C + 2, 0.01, 0); floor.receiveShadow = true;
      const back = new THREE.Mesh(new THREE.BoxGeometry(20, 7, 0.4), wall); back.position.set(C + 2, 3.5, -5.5); back.receiveShadow = true;
      const panel = new THREE.Mesh(new THREE.BoxGeometry(20, 2.2, 0.2), dark); panel.position.set(C + 2, 1.1, -5.2);
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7, 16), wall); side.position.set(C - 4, 3.5, 0); side.receiveShadow = true;
      R.add(floor, back, panel, side);
      for (const x of [-2, 7.5]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3.4), new THREE.MeshBasicMaterial({ color: "#f2dcc0" })); w.position.set(C + x, 4.2, -5.28); R.add(w);
        const fr = new THREE.Mesh(new THREE.BoxGeometry(2.5, 3.7, 0.1), dark); fr.position.set(C + x, 4.2, -5.33); R.add(fr); }
      if (drapeCol) { const dr = new THREE.Mesh(new THREE.BoxGeometry(5.2, 5.6, 0.1), lamC(drapeCol)); dr.position.set(C + 3, 3.2, -5.25); R.add(dr); }
      return { dark, wood };
    };
    {
      const C = 300, { dark } = room(C, "#e8dcc4", "#2a3a6a");
      const dais = new THREE.Mesh(new THREE.BoxGeometry(6, 0.9, 3), dark); dais.position.set(C + 3, 0.45, -3.5); dais.castShadow = dais.receiveShadow = true;
      const bench = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.5, 0.9), [dark, dark, lamC("#4a2a18"), dark, lam({ map: rep(planksHD(), 1, 1), color: "#a8723e" }), dark]);
      bench.position.set(C + 3, 0.75, -2.0); bench.castShadow = bench.receiveShadow = true;
      const top = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.12, 1.2), lamC("#4a2a18")); top.position.set(C + 3, 1.55, -2.0);
      R.add(dais, bench, top);
    }
    {
      const C = 600, { dark } = room(C, "#d8c8a0", null);
      const desk = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.0, 1.4), dark); desk.position.set(C + 1, 0.5, -1.2); desk.castShadow = desk.receiveShadow = true;
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 0.6), dark); shelf.position.set(C + 5, 2, -5.0);
      R.add(desk, shelf);
      for (let k = 0; k < 30; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.7, 0.5), lamC(["#7a2a2a", "#2a4a3a", "#3a3a6a", "#8a6a3a"][k % 4])); b.position.set(C + 2.4 + (k % 15) * 0.34, 1.0 + Math.floor(k / 15) * 1.6, -4.6); R.add(b); }
      for (let k = 0; k < 4; k++) { const ld = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.7), lamC("#e8dcc0")); ld.position.set(C + 0.2 + k * 0.6, 1.06 + (k % 2) * 0.12, -1.2); R.add(ld); }
    }
  }

  private poseWave(id: number, f: number, t: number) {
    const fl = floodAt(id, f), P = this.wavePos, U = this.waveUv;
    this.wave.visible = fl.on && fl.h > 0.05;
    const pooled = id === S.rescue || id === S.sad;
    this.pool2.visible = pooled; this.yardPool.visible = pooled;
    if (!this.wave.visible) return;
    const prof = WAVE.prof, nb = WAVE.nr - prof.length;
    for (let i = 0; i < WAVE.nx; i++) {
      const x = -WAVE.half + (2 * WAVE.half * i) / (WAVE.nx - 1);
      const dz = 0.3 * Math.sin(0.5 * x + 1.4 * t) + 0.15 * Math.sin(1.2 * x - 2.2 * t);
      const hk = fl.h * (1 + 0.08 * Math.sin(0.9 * x + 2.4 * t));
      for (let j = 0; j < WAVE.nr; j++) {
        let z: number, y: number;
        if (j < prof.length) { const [pz, py] = prof[j]; z = fl.front + dz + pz * Math.min(1, fl.h / 4); y = Math.max(0.02, hk * py); }
        else {
          const s = 1.0 + 140 * ((j - prof.length + 1) / nb) ** 2;
          z = fl.front + dz * Math.exp(-s / 6) - s;
          if (z < VAT_FRONT - 2) z = VAT_FRONT - 2 + (z - VAT_FRONT + 2) * 0.02;
          y = fl.level + (hk - fl.level) * Math.exp(-(((s - 0.5) / 5) ** 1.8)) + 0.1 * Math.sin(x * 1.1 + s * 0.7 - t * 3.4);
        }
        P.setXYZ(j * WAVE.nx + i, x, y, z);
        U.setXY(j * WAVE.nx + i, x / 5 + (z - fl.front) * 0.05, Math.min(0.995, Math.max(0.0, 0.18 + 0.82 * y / Math.max(0.5, hk))));
      }
    }
    P.needsUpdate = true; U.needsUpdate = true;
    this.wave.geometry.computeVertexNormals();
  }

  private shotSun(id: number) {
    let v = this.sunCache.get(id);
    if (v) return v;
    const sh = SHOTS[id - 1];
    let fx = 0, fz = 0;
    for (let f = sh.a; f < sh.b; f += 3) { const c = camAt(id, f), x = c.look[0] - c.pos[0], z = c.look[2] - c.pos[2], n = Math.hypot(x, z) || 1; fx += x / n; fz += z / n; }
    const n = Math.hypot(fx, fz) || 1; fx /= n; fz /= n;
    const az = THREE.MathUtils.degToRad(sh.sunAz ?? 120), el = THREE.MathUtils.degToRad(sh.place === "street" ? WL.el : 30);
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
    cam.fov = c.fov; cam.near = 0.2; cam.far = 3000; cam.updateProjectionMatrix(); cam.updateMatrixWorld();
    cam.layers.enable(NOINK);
    const focus = V(...c.look), dist = cam.position.distanceTo(focus), sunDir = this.shotSun(id);
    this.hemi.color.set(L.sky); this.hemi.groundColor.set(L.ground); this.hemi.intensity = L.hemiI;
    this.sun.color.set(L.sunCol); this.sun.intensity = L.sunI;
    const Rr = THREE.MathUtils.clamp(dist * 1.2 + 10, 14, 70);
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
    untone(L.fog, this.fog.color); this.fog.near = 60; this.fog.far = id === S.barrels ? 70 : 380;
    scene.fog = this.fog; scene.background = null;
    for (const m of this.clouds) m.quaternion.copy(cam.quaternion);

    // ---- set pieces ----
    const fl = floodAt(id, f);
    const after = id === S.hook || id === S.rescue || id === S.sad || ((id === S.vat || id === S.wave) && f >= BURST);
    this.vat.visible = !after; this.broken.visible = after;
    this.wallWhole.visible = !after; this.wallBroken.visible = after;
    // the hoop slips down the vat on "se suelta" and pings off
    const hs = W.suelta - 3, hu = id === S.vat ? smooth((f - hs) / 10) : 0;
    this.hoop.visible = id === S.vat && f < BURST;
    this.hoop.position.set(VAT.x + 1.2 * hu, VAT.h * (4 / 6) - 3.4 * hu, VAT.z + 0.6 * hu); this.hoop.rotation.set(Math.PI / 2 + 0.5 * hu, 0.3 * hu, 0);
    const wob = id === S.vat && f > hs && f < BURST ? 0.015 * Math.sin(f * 2.1) : 0;
    this.vat.scale.set(1 + wob, 1, 1 + wob);
    // the neighbouring vats burst one after another ("rompe las de al lado")
    this.vats2.forEach((g, k) => { const gone = after && (id !== S.vat || f >= W.rompe + k * 4); g.scale.set(1, gone ? 0.25 : 1, 1); });
    const squash = id === S.wave ? smooth((fl.front - FLAT.z0 + 1) / 5) : id === S.rescue || id === S.sad || id === S.hook ? 1 : 0;
    this.flat.scale.set(1 + 0.2 * squash, 1 - 0.82 * squash, 1); this.flat.rotation.z = -0.1 * squash;
    this.poseWave(id, f, t);
    this.barrels.visible = id === S.barrels;

    // ---- cast ----
    const right = V(0, 0, 0).setFromMatrixColumn(cam.matrixWorld, 0);
    const light = light2D(sunDir, right);
    const st: Stage = { places: [], fx: [] };
    const rolls: number[] = [];
    this.frustum.setFromProjectionMatrix(this.m4.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse));
    const lidAt = (i: number) => {
      let s = Math.round(-60 * hh(i, 9));
      for (let n = 0; s <= f && n < 80; n++) { const k = f - s; if (k >= 0 && k < 4) return [0.5, 1, 1, 0.5][k]; s += Math.round(15 + 54 * hh(i * 31 + n, 13)); }
      return 0;
    };
    const visible = (x: number, y: number, z: number, r: number) => this.frustum.intersectsSphere(this.sph.set(this.v.set(x, y, z), r));
    const person = (who: string, o: Outfit, x: number, y: number, z: number, opts: Parameters<typeof bodyFront>[2], i: number, contact = true, roll = 0) => {
      if (!visible(x, y + 1.1, z, 3)) return;
      const d = cam.position.distanceTo(this.v.set(x, y + 1.6, z));
      if (d < 1.2) return;
      const [w, h, k] = tier(d), near = d < 16;
      const o2 = { ...opts, light, seed: (i * 5 + 3) % 7 + 1, blink: near ? lidAt(i) : 0 };
      if (d > 40) o2.expr = "neutral";
      st.places.push({ key: `${who}|${JSON.stringify(o2)}`, x, y, z, size: [w, h, k], draw: (p) => bodyFront(p, o, o2) });
      rolls.push(roll);
      if (contact && d < 60) blob(st, sunDir, x, y, z);
    };
    const fx = (key: string, cw: number, ch: number, draw: (p: Pen) => void, x: number, y: number, z: number, w: number, h: number, soft = false) =>
      st.fx.push({ key, cw, ch, draw, x, y, z, w, h, soft });

    if (id === S.hook) {
      const ph = gait(t, 2.3);
      for (const r of RUNNERS) {
        const z = fl.front + r.dz;
        if (z > c.pos[2] - 3.5) continue;
        person(`run${r.v}`, folk(r.v), r.x, 0, z, { mode: "march", phase: (ph + (r.v % 2) * 0.5) % 1, expr: r.v % 3 ? "shock" : "shout", lift: 90 }, r.v + 40);
      }
      // the one bloke who is delighted about it ("y no, no es coña")
      const zg = Math.min(fl.front + 4, c.pos[2] - 4.5);
      person("glad", { ...folk(3), moustache: "#5a3a26" }, 1.8, 0, zg, { mode: "stand", expr: f > W.cona - 4 ? "laugh" : "grin", wave: Math.sin(t * 9), facing: -1 }, 77);
    }
    if (id === S.calm) {
      const ph = gait(t, 0.9);
      for (const s of STROLL) person(`st${s.v}`, folk(s.v), s.x, 0, s.z + s.dir * 0.8 * t, { mode: "stroll", phase: (ph + (s.v % 4) * 0.25) % 1, expr: (["smile", "whistle", "neutral", "smile_closed"] as Expr[])[s.v % 4] }, s.v);
    }
    if (id === S.vat) {
      const ex: Expr = f < W.suelta - 3 ? "neutral" : f < BURST ? "shock" : "shout";
      person("w1", BREWER_MAN(0), -1.3, 0, VAT_FRONT + 2.0, { mode: "stand", expr: ex, facing: 1 }, 7);
      person("w2", BREWER_MAN(1), 0.1, 0, VAT_FRONT + 0.7, { mode: "stand", expr: f < W.suelta ? "whistle" : "nervous", facing: -1 }, 8);
      if (f >= W.suelta - 2 && f < W.suelta + 12) fx(`ping|${f % 6}`, 300, 300, (p) => fxCreak(p, (f % 6) / 6), VAT.x + 1.6, VAT.h * 0.5, VAT_FRONT + 0.4, 1.6, 1.6);
      if (f >= BURST - 1 && f < BURST + 20) { const u = (f - BURST + 1) / 20; fx(`burst|${Math.round(u * 20)}`, 500, 500, (p) => fxBurst(p, u, "#fff3b0", 12), 0, 3.5, VAT_FRONT + 0.5, 10, 10, true); }
      for (let k = 0; k < 3; k++) { const f0 = W.rompe + k * 4; if (f >= f0 && f < f0 + 16) { const [x, z] = VATS2[k]; fx(`splash|${f - f0}`, 800, 800, (p) => fxSplash(p, (f - f0) / 16), x, 3, z + 4, 8, 8, true); } }
    }
    if (id === S.wave) {
      const ph = gait(t, 2.3);
      for (const r of RUNNERS) { const z = fl.front + 3 + r.dz * 1.3; if (z < 60) person(`run${r.v}`, folk(r.v), r.x * 0.8, 0, z, { mode: "march", phase: (ph + (r.v % 2) * 0.5) % 1, expr: "shock", lift: 90 }, r.v + 40); }
      if (Math.abs(fl.front - FLAT.z0 - 2) < 3) fx(`puff|${f % 8}`, 300, 300, (p) => fxPuff(p, (f % 8) / 8), -9, 2.5, FLAT.z0 + 4, 7, 7, true);
      if (f > W.sotanos - 10) for (let k = 0; k < 3; k++) { // beer pouring down the cellar steps on the right
        const u = ((t * 1.3 + k * 0.33) % 1);
        fx(`cellar|${Math.floor(u * 8)}`, 800, 800, (p) => fxSplash(p, u), STREET.front - 0.6, 0.3, 2 + k * 6, 2.2, 2.2, true);
      }
    }
    if (id === S.rescue) { // brewery men waist-deep in porter in the yard, hauled out on a rope
      const pull = smooth((f - (W.vivos - 20)) / 30);
      person("res1", BREWER_MAN(0), -1.2, -0.1 + 0.8 * pull, -34.5, { mode: "fall", expr: f < W.vivos - 6 ? "pained" : "relief_open", facing: 0 }, 900, false);
      person("res2", BREWER_MAN(1), 0.5, -0.1, -36, { mode: "fall", expr: f < W.vivos ? "nervous" : "relief", facing: 0 }, 901, false);
      person("saver", folk(7), -0.8, 4.0, -26, { mode: "stand", expr: "stern", facing: -1, prop: ["sword", 0.6] as ["sword", number] }, 902, false);
      fx("rope", 32, 512, ropeDraw, -1.5, 2.6 + pull * 0.4, -31, 0.1, 3.4);
    }
    if (id === S.sad) { // the quiet street afterwards: a woman with her head down, hats floating
      person("widow", { ...folk(1), dress: "#3a3a44", jacket: "#2a2a34" }, 0.8, 0, 14, { mode: "stand", expr: "pained", headTilt: 8 }, 950, false);
      person("man", folk(4), -1.6, 0, 12.5, { mode: "stand", expr: "nervous", headTilt: 6 }, 951, false);
      if (f % 50 > 20) fx("tear", 64, 96, tearDraw, 0.95, 1.85 - ((f % 50) - 20) * 0.01, 14.1, 0.07, 0.1);
    }
    if (id === S.barrels) { // nine thousand barrels popping their lids at once
      const u0 = (f - (W.golpe - 4)) / 26;
      if (u0 > 0) for (const b of BARRELS) {
        if (b.z < -14 || Math.abs(b.x + 300) > 9) continue;
        const u = Math.min(1, u0 - hh(b.i, 3) * 0.15);
        if (u > 0) fx(`ftn|${Math.round(u * 12)}`, 256, 512, fountainDraw(u), b.x, 1.6, b.z, 0.7, 1.4);
      }
    }
    if (id === S.court) {
      const C = 300, up = f >= W.dios - 6;
      person("judge", JUDGE, C + 3, 0.9, -3.0, { mode: "stand", expr: up ? "relief" : "stern", wave: up ? 1 : undefined, facing: 0 }, 602, false);
      person("brewer", BREWER, C + 1.6, 0, 0.8, { mode: "stand", expr: up ? "grin" : "nervous", facing: 1 }, 603);
      for (let k = 0; k < 3; k++) person(`gal${k}`, folk(k + 2), C + 6 + k * 1.1, 0, 1.2 + k * 0.4, { mode: "stand", expr: up ? "shock" : "neutral", facing: -1 }, 604 + k);
    }
    if (id === S.tax) {
      const C = 600, give = smooth((f - (W.devolvio - 8)) / 10);
      person("taxman", TAXMAN, C + 0.25, 0, 0.6, { mode: "stand", expr: "neutral", wave: give > 0.5 ? 0.6 : undefined, facing: 1 }, 700);
      person("brewer", BREWER, C + 1.75, 0, 0.3, { mode: "stand", expr: give > 0.5 ? "laugh" : "grin", facing: -1 }, 701);
      if (give > 0) fx("bag", 256, 256, bagDraw, C + 0.6 + 0.8 * give, 1.4 + 0.5 * Math.sin(give * Math.PI), 0.5, 0.8, 0.8);
      if (f > W.devolvio) for (let k = 0; k < 10; k++) {
        const u = ((f - W.devolvio) / 30 + k * 0.1) % 1;
        fx("coin", 128, 128, coinDraw, C + 1.0 + Math.sin(k * 2.1) * 0.9, 3.2 - u * 3.0, 1.2 + Math.cos(k * 1.7) * 0.4, 0.16, 0.16);
      }
    }

    let ai = 0;
    for (const [n, p] of st.places.entries()) {
      const a = this.actor(ai++), [w, h, k] = p.size, s = p.scale ?? 1;
      a.r = this.pool.req(p.key, w, h, k, p.draw);
      a.mesh.geometry = p.wide ? WIDE : BODY;
      a.mesh.visible = true; a.mesh.position.set(p.x, p.y, p.z);
      a.mesh.rotation.order = "YXZ";
      a.mesh.rotation.set(0, Math.atan2(cam.position.x - p.x, cam.position.z - p.z), rolls[n] ?? 0);
      a.mesh.scale.set(p.mirror ? -s : s, s, s);
    }
    for (let i = ai; i < this.actors.length; i++) this.actors[i].mesh.visible = false;
    let fi = 0;
    for (const p of st.fx) {
      if (!visible(p.x, p.y, p.z, Math.max(p.w, p.h))) continue;
      const e = this.fx(fi++);
      e.r = this.pool.req(p.key, p.cw, p.ch, 1, p.draw);
      e.use(!!p.soft); e.mesh.visible = true; e.mesh.position.set(p.x, p.y, p.z);
      if (p.flat) e.mesh.rotation.set(-Math.PI / 2, 0, p.rot ?? 0);
      else { e.mesh.rotation.order = "YXZ"; e.mesh.rotation.set(0, Math.atan2(cam.position.x - p.x, cam.position.z - p.z), 0); if (p.soft) e.mesh.quaternion.copy(cam.quaternion); }
      e.mesh.scale.set(p.w, p.h, 1);
    }
    for (let i = fi; i < this.fxs.length; i++) this.fxs[i].mesh.visible = false;
    this.pool.flush();
    for (let i = 0; i < ai; i++) this.actors[i].bind();
    for (let i = 0; i < fi; i++) this.fxs[i].bind();
    void WIDE;
    return focus;
  }
}

const WAVE = {
  nx: 56, half: 13,
  prof: [[-2.0, 0], [-1.6, 0.3], [-1.0, 0.55], [-0.3, 0.72], [0.3, 0.8], [0.5, 0.9], [0.25, 0.98], [-0.3, 1.0], [-0.8, 0.98]] as [number, number][],
  nr: 9 + 64,
};
