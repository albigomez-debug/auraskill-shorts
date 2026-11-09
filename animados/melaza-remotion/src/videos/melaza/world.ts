// "La ola de miel de caña": one three.js world posed per frame (pure function of shot id + frame).
// Commercial Street, Boston, January 1919: a cobbled street along +z lined with brick blocks, the elevated railway on
// its right side, a wooden house in a gap on the left, and the giant riveted tank across the north end.
// A courtroom set stands far away at x = 300. Built with the skill's pieces: painted sky, two-tone materials,
// painted textures, lit character cards with contact blobs, world ink.
import * as THREE from "three";
import { Pen, bodyFront, Outfit, Expr, SKINS, horse, WG, fxBurst, fxCreak, fxPuff } from "./toon";
import { Pool, Actor, Fx, Stage, tier, tierW, light2D, blob, BODY, WIDE } from "./troop";
import { NOINK } from "./ink";
import { LIGHTS, LOOK, LightPreset, WorldLook } from "./lights";
import { TONE, CHAR, twoTone, untone } from "./shade";
import { cloudHD, rep, ctex, facadeHD, cobbleHD, stoneHD, planksHD, CLOUD_DAY } from "./paint";
import { FPS, SHOTS, camAt, smooth, floodAt, TANK, TANK_FRONT, BURST } from "./story";

// ---------------- winter day look: cold clear light, pale sky ----------------
const WL: LightPreset = { ...LIGHTS.day, el: 34, lit: [1.5, 1.46, 1.38], shade: [0.3, 0.31, 0.4], sunCol: "#fff1e0", fog: "#c9d8ec" };
const WK: WorldLook = { ...LOOK.day, sky: { c: ["#d4e0ef", "#b9cfea", "#8fb2e2", "#6c9bd8", "#4f84cc"], e: [0, 3, 8, 16, 40] }, sat: 1.0 };

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const hh = (i: number, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
const lam = (p: THREE.MeshLambertMaterialParameters) => twoTone(new THREE.MeshLambertMaterial(p));
const gait = (t: number, hz: number) => Math.floor(((((t * hz) % 1) + 1) % 1) * 8) / 8;

// ---------------- cast ----------------
const COATS = ["#3f6fb5", "#8c3b4a", "#5d7a3a", "#b5653f", "#2f5f6a", "#7b5ac9", "#a8423a", "#4a5a7a"];
const folk = (v: number): Outfit => {
  const o: Outfit = { jacket: COATS[v % 8], pants: v % 3 ? "#3b3f52" : "#5a4a3a", boots: "#4a3426", skin: SKINS[v % 4] };
  if (v % 4 === 1) return { ...o, hat: "bonnet", dress: ["#d9a441", "#c25a7a", "#5a8fc2", "#6aa36a"][v % 4] };
  if (v % 4 === 3) return { ...o, hat: "cap", cap: ["#5a4632", "#3a3f52", "#7a3a30"][v % 3], moustache: v % 8 === 3 ? "#4a3426" : undefined };
  return { ...o, hat: "tophat", moustache: v % 3 === 0 ? "#3a2a20" : undefined };
};
const WORKER: Outfit = { jacket: "#4f6f9a", pants: "#3a4a66", boots: "#3a2a20", hat: "cap", cap: "#6a5a40", skin: SKINS[1], moustache: "#5a3a26" };
const WORKER2: Outfit = { jacket: "#8a5a34", pants: "#3a4a66", boots: "#3a2a20", hat: "cap", cap: "#3a3f52", skin: SKINS[3] };
const SAILOR = (v: number): Outfit => ({ jacket: "#22325e", pants: "#22325e", boots: "#1a1a22", hat: "cap", cap: "#f4f1ea", skin: SKINS[v % 4], buttons: "#e8c45a",
  moustache: v % 3 === 1 ? "#4a3426" : undefined });
const BOSS: Outfit = { jacket: "#4a4f5e", pants: "#3a3e4a", boots: "#1e1a1a", hat: "tophat", skin: SKINS[0], moustache: "#2a201a", buttons: "#e8c45a", build: "stout" };
const JUDGE: Outfit = { jacket: "#1e1c26", pants: "#1e1c26", boots: "#1a1a1a", hat: "hair", hair: "#eeeeee", skin: SKINS[1], moustache: "#e8e8e8", buttons: "#f4f1ea" };
const HORSE = { coat: "#8a5a34", mane: "#2a1d16", cloth: "#b0262c" };

// ---------------- painted pieces ----------------
const gooTex = () => ctex("gooHD", 512, 512, (g, r) => {
  g.fillStyle = "#6a300e"; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 46; i++) { // flowing streaks
    const y = r() * 512, w = 60 + r() * 260, x = r() * 512, hgt = 3 + r() * 9;
    g.fillStyle = r() < 0.5 ? "rgba(150,74,26,0.6)" : "rgba(60,24,6,0.55)";
    g.beginPath(); g.ellipse(x, y, w / 2, hgt / 2, 0, 0, 6.3); g.fill();
    g.beginPath(); g.ellipse(x - 512, y, w / 2, hgt / 2, 0, 0, 6.3); g.fill();
  }
  for (let i = 0; i < 26; i++) { // glossy highlights
    const y = r() * 512, x = r() * 512, w = 20 + r() * 80;
    g.fillStyle = "rgba(255,214,150,0.7)"; g.beginPath(); g.ellipse(x, y, w / 2, 1.6 + r() * 2, 0, 0, 6.3); g.fill();
  }
});
const tankTex = () => ctex("tankHD", 2048, 1024, (g, r) => {
  g.fillStyle = "#7c8a8a"; g.fillRect(0, 0, 2048, 1024);
  const rows = 7, cols = 24, pw = 2048 / cols, ph = 1024 / rows;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { // steel plates, slightly different greys
    const k = 0.9 + r() * 0.16, c = [124, 138, 138].map((v) => Math.round(v * k));
    g.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`; g.fillRect(x * pw + 2, y * ph + 2, pw - 4, ph - 4);
  }
  g.fillStyle = "rgba(40,44,50,0.6)";
  for (let y = 0; y <= rows; y++) g.fillRect(0, y * ph - 3, 2048, 6);
  for (let x = 0; x <= cols; x++) g.fillRect(x * pw - 2, 0, 4, 1024);
  for (let y = 0; y <= rows; y++) for (let x = 0; x < 2048; x += 14) { // rivets
    g.fillStyle = "rgba(40,44,50,0.7)"; g.beginPath(); g.arc(x, y * ph + 9, 3.2, 0, 6.3); g.fill();
    g.fillStyle = "rgba(230,236,236,0.5)"; g.beginPath(); g.arc(x - 1, y * ph + 8, 1.4, 0, 6.3); g.fill();
  }
  for (let i = 0; i < 70; i++) { // rust streaks
    const x = r() * 2048, y = r() * 900, l = 40 + r() * 140;
    const gr = g.createLinearGradient(0, y, 0, y + l); gr.addColorStop(0, "rgba(150,80,40,0.45)"); gr.addColorStop(1, "rgba(150,80,40,0)");
    g.fillStyle = gr; g.fillRect(x, y, 4 + r() * 6, l);
  }
  for (let i = 0; i < 40; i++) { // molasses leaking from the lower seams (front of the texture = u around 0.25)
    const x = 380 + r() * 260 + (r() < 0.5 ? 0 : 1024), y = 1024 - ph * (1 + Math.floor(r() * 2)), l = 60 + r() * 200;
    g.fillStyle = "rgba(80,36,12,0.85)"; g.fillRect(x, y, 5 + r() * 6, Math.min(l, 1024 - y));
    g.beginPath(); g.arc(x + 4, y + Math.min(l, 1024 - y), 6, 0, 6.3); g.fill();
  }
});
const roofTex = () => ctex("tankRoof", 512, 512, (g) => {
  g.fillStyle = "#6e7a7a"; g.fillRect(0, 0, 512, 512);
  g.strokeStyle = "rgba(40,44,50,0.6)"; g.lineWidth = 4;
  for (let k = 0; k < 24; k++) { const a = (k / 24) * Math.PI * 2; g.beginPath(); g.moveTo(256, 256); g.lineTo(256 + 256 * Math.cos(a), 256 + 256 * Math.sin(a)); g.stroke(); }
  for (const rr of [80, 160, 240]) { g.beginPath(); g.arc(256, 256, rr, 0, 6.3); g.stroke(); }
});
const ironTex = () => ctex("ironGirder", 512, 128, (g) => {
  g.fillStyle = "#3f5a4c"; g.fillRect(0, 0, 512, 128);
  g.strokeStyle = "rgba(20,30,26,0.7)"; g.lineWidth = 5;
  g.strokeRect(6, 8, 500, 112);
  for (let x = 0; x < 512; x += 64) { g.beginPath(); g.moveTo(x, 10); g.lineTo(x + 64, 118); g.moveTo(x + 64, 10); g.lineTo(x, 118); g.stroke(); }
  g.fillStyle = "rgba(200,220,210,0.35)"; for (let x = 4; x < 512; x += 16) { g.beginPath(); g.arc(x, 14, 2.5, 0, 6.3); g.fill(); g.beginPath(); g.arc(x, 114, 2.5, 0, 6.3); g.fill(); }
});
const woodTex = () => ctex("houseBoards", 512, 512, (g, r) => {
  g.fillStyle = "#c8945a"; g.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 32) {
    g.fillStyle = `rgba(${150 + r() * 30},${100 + r() * 20},60,0.5)`; g.fillRect(0, y + 2, 512, 28);
    g.fillStyle = "rgba(70,40,20,0.6)"; g.fillRect(0, y, 512, 3);
  }
});
const snowDraw = (p: Pen) => {
  const g = p.g;
  for (let k = 0; k < 7; k++) {
    const x = 128 + Math.cos(k * 2.3) * 60, y = 128 + Math.sin(k * 1.7) * 50, rr = 60 - k * 4;
    const gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, "rgba(250,252,255,0.95)"); gr.addColorStop(0.7, "rgba(240,246,255,0.7)"); gr.addColorStop(1, "rgba(240,246,255,0)");
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  }
};
const dripDraw = (p: Pen) => { // 64 x 128: a fat drop with a thin tail
  p.poly([[28, 0], [36, 0], [40, 80], [32, 120], [24, 80]], "#5b2a0f", 3);
  p.ell(32, 96, 12, 18, "#6a3214", 3); p.ell(28, 90, 3, 6, "#d09a5a", 0);
};
const plateDraw = (p: Pen) => { // 256 x 256 bent steel plate with rivets
  p.poly([[20, 40], [230, 20], [240, 210], [30, 236]], "#7c8a8a", 8);
  for (let k = 0; k < 8; k++) { p.dot(36 + k * 26, 44 - k * 2.5, 4); p.dot(40 + k * 26, 222 - k * 2, 4); }
};
const smellDraw = (v: number) => (p: Pen) => { // 128 x 384: three wavy sweet-smell lines
  for (let k = 0; k < 3; k++) {
    const pts: [number, number][] = [];
    for (let i = 0; i <= 24; i++) { const y = 370 - i * 15; pts.push([30 + k * 34 + 10 * Math.sin(i * 0.7 + v * 0.8 + k), y]); }
    p.stroke(pts, 7, k === 1 ? "#c87a3a" : "#e0a060");
  }
};
const cartDraw = (p: Pen, ph: number | null) => { // horse with a barrel cart, side view on the wide card
  const G = WG;
  p.ell(470, G - 120, 115, 115, "#5a3a22", 12); p.ell(470, G - 120, 30, 30, "#2a1d16", 6);
  p.poly([[260, G - 420], [700, G - 420], [700, G - 220], [260, G - 220]], "#a8724a", 10);
  for (const x of [330, 480, 630]) { p.ell(x, G - 470, 70, 60, "#8a5a34", 9); p.band([[x - 70, G - 470], [x + 70, G - 470]], "#5a4632", 10, 3); }
  p.band([[700, G - 300], [980, G - 420]], "#5a3a22", 14, 4);
  horse(p, HORSE, 1200, ph);
};

// ---------------- the street layout ----------------
type Block = { side: -1 | 1; z0: number; z1: number; h: number; wall: string; shutter: string; brick: boolean; i: number };
const BLOCKS: Block[] = (() => {
  const out: Block[] = [];
  let i = 0;
  for (const side of [-1, 1] as const) {
    let z = -30;
    while (z < 76) {
      const w = 8 + hh(i, 1) * 5, nearTank = z < -20;
      const gap = side === -1 && z + w > 10 && z < 21; // the wooden house stands in this gap
      if (gap) { z = 21; continue; }
      const h = nearTank && side === -1 ? 13 : 8.5 + Math.floor(hh(i, 2) * 3) * 2.8;
      out.push({ side, z0: z, z1: Math.min(z + w, 78), h, wall: ["#c9b08a", "#b9a38a", "#d0bfa0"][i % 3], shutter: ["#3f5f4a", "#6a3a30", "#3a4a6a"][i % 3], brick: hh(i, 3) < 0.75, i });
      z += w + 0.2; i++;
    }
  }
  return out;
})();
const HOUSE = { x0: -15, x1: -9, z0: 11.5, z1: 19.5, h: 5.5 };
const RAIL = { x0: 3.4, x1: 6.6, y: 5.2, th: 0.7, colX: 6.1, seg: 7, z0: -28, z1: 92 };
const RAIL_SEGS = Array.from({ length: Math.round((RAIL.z1 - RAIL.z0) / RAIL.seg) }, (_, k) => RAIL.z0 + RAIL.seg * (k + 0.5));
const SNOWPATCH = Array.from({ length: 70 }, (_, k) => ({ x: (hh(k, 50) < 0.5 ? -1 : 1) * (5.4 + hh(k, 51) * 3), z: -26 + hh(k, 52) * 100, w: 1.2 + hh(k, 53) * 2.4, rot: hh(k, 54) * 6.28 }));
const STROLL = Array.from({ length: 16 }, (_, k) => ({ x: (hh(k, 60) - 0.5) * 9, z: -20 + hh(k, 61) * 36, dir: hh(k, 62) < 0.5 ? -1 : 1, v: k }));
const RUNNERS = Array.from({ length: 9 }, (_, k) => ({ x: -4 + (k % 5) * 2 + (hh(k, 70) - 0.5), dz: 2.5 + k * 1.3 + hh(k, 71), v: k + 2 }));
const SAILORS = Array.from({ length: 6 }, (_, k) => ({ x: -3.2 + k * 1.3 + (hh(k, 80) - 0.5) * 0.4, z: 15.6 + (k % 2) * 1.6 + hh(k, 81) * 0.6, v: k }));
const SNIFF = Array.from({ length: 8 }, (_, k) => ({ x: (hh(k, 90) - 0.5) * 8, z: 6 + hh(k, 91) * 16, v: k + 1 }));
const PLATES = Array.from({ length: 9 }, (_, k) => ({ a: -0.9 + k * 0.22, vy: 9 + hh(k, 40) * 7, vo: 7 + hh(k, 41) * 6, spin: (hh(k, 42) - 0.5) * 14 }));

// ---------------- snow: points falling in a box that wraps around the camera ----------------
const SN = { n: 9000, b: 26, h: 12 };
const SNOW_VS = `
attribute vec4 aSeed; uniform float uT; uniform vec3 uCam; uniform float uPx; varying float vA;
void main() {
  float B = ${SN.b.toFixed(1)}, H = ${SN.h.toFixed(1)};
  vec3 p = position;
  p.y = mod(p.y - uT * (0.8 + 0.6 * aSeed.x), H);
  p.x += sin(uT * (0.5 + aSeed.y) + aSeed.z * 30.0) * 0.5;
  p.z += cos(uT * (0.4 + aSeed.z) + aSeed.w * 30.0) * 0.5;
  p.xz = uCam.xz + mod(p.xz - uCam.xz + 0.5 * B, B) - 0.5 * B;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float sz = mix(0.035, 0.07, aSeed.y);
  gl_PointSize = clamp(sz * uPx / max(0.1, -mv.z), 1.5, 60.0);
  vA = smoothstep(0.0, 0.1, p.y / H) * smoothstep(0.5, 1.5, -mv.z);
  gl_Position = projectionMatrix * mv;
}`;
const SNOW_FS = `
uniform float uFade; varying float vA;
void main() { vec2 d = gl_PointCoord - 0.5; float r = length(d) * 2.0; if (r > 1.0) discard;
  gl_FragColor = vec4(vec3(1.0, 1.0, 1.04), (1.0 - r * r) * vA * uFade); }`;

// ---------------- world ----------------
export class World {
  root = new THREE.Group();
  private pool = new Pool();
  private actors: Actor[] = [];
  private fxs: Fx[] = [];
  private hemi: THREE.HemisphereLight; private sun: THREE.DirectionalLight;
  private skyMat: THREE.ShaderMaterial; private sky: THREE.Mesh;
  private fog = new THREE.Fog("#c9d8ec", 40, 400);
  private clouds: THREE.Mesh[] = [];
  private tank = new THREE.Group(); private broken = new THREE.Group();
  private house = new THREE.Group();
  private rail: THREE.Group[] = [];
  private wave: THREE.Mesh; private wavePos: THREE.BufferAttribute; private waveUv: THREE.BufferAttribute;
  private pool2: THREE.Mesh;
  private snow = { uT: { value: 0 }, uCam: { value: new THREE.Vector3() }, uPx: { value: 1000 }, uFade: { value: 0 } };
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
    this.hemi = new THREE.HemisphereLight("#dcecff", "#9a8a7a", 0.55);
    this.sun = new THREE.DirectionalLight("#fff1e0", 2.8);
    this.sun.castShadow = true; this.sun.shadow.mapSize.set(2048, 2048);
    R.add(this.hemi, this.sun, this.sun.target);
    const cm = [0, 1, 2, 3].map((k) => cloudHD(k, CLOUD_DAY));
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + hh(i, 20), d = 500 + hh(i, 21) * 500, w = 140 + hh(i, 23) * 120;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: cm[i % 4], transparent: true, depthWrite: false, fog: false }));
      m.position.set(Math.cos(a) * d, 90 + hh(i, 22) * 220, Math.sin(a) * d); m.scale.set(w, w / 2, 1); m.layers.set(NOINK); this.clouds.push(m); R.add(m);
    }

    // ---- ground: snowy grey ground far away, cobbled street, stone sidewalks ----
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ color: "#d9dde2" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    const street = new THREE.Mesh(new THREE.PlaneGeometry(11, 130).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 11 / 4, 130 / 4), color: "#d8d2cc" }));
    street.position.set(0, 0, 12); street.receiveShadow = true; R.add(street);
    for (const s of [-1, 1]) {
      const walk = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.16, 130), lam({ map: rep(stoneHD(), 1, 130 / 3), color: "#e6e0d8" }));
      walk.position.set(s * 7.1, 0.08, 12); walk.receiveShadow = true; R.add(walk);
    }
    // the open lot around the tank, a few low warehouses behind it, the harbour edge
    const lot = new THREE.Mesh(new THREE.PlaneGeometry(60, 40).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 15, 10), color: "#c8c2bc" }));
    lot.position.set(0, 0.005, -48); lot.receiveShadow = true; R.add(lot);
    for (const [x, z, w, d, h, c] of [[-30, -60, 18, 12, 6, "#9a6a4a"], [26, -62, 22, 14, 7, "#8a7a6a"], [-24, -38, 10, 10, 9, "#a5704e"], [24, -40, 12, 12, 8, "#b08a6a"], [0, -80, 60, 10, 5, "#7a6a5a"]] as [number, number, number, number, number, string][]) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lam({ map: rep(facadeHD(`wh${x}`, w, h, { wall: c, shutter: "#3a4a3a", brick: true }), 1, 1) }));
      b.position.set(x, h / 2, z); b.castShadow = b.receiveShadow = true; R.add(b);
    }
    // closing the far end of the street
    { const b = new THREE.Mesh(new THREE.BoxGeometry(40, 12, 8), lam({ map: facadeHD("endblock", 40, 12, { wall: "#c9b08a", shutter: "#3f5f4a", brick: true, door: true }) }));
      b.position.set(0, 6, 84); b.rotation.y = Math.PI; b.castShadow = b.receiveShadow = true; R.add(b); }

    // ---- brick blocks along the street: painted facade on the street side, plain brick elsewhere, cornice ----
    const plain = lam({ color: "#a86a4a" }), roofM = lam({ color: "#5a4a48" }), corn = lam({ color: "#e8dcc8" });
    for (const b of BLOCKS) {
      const w = b.z1 - b.z0, depth = 12, fac = lam({ map: facadeHD(`blk${b.i}_${b.side}`, w, b.h, { wall: b.wall, shutter: b.shutter, brick: b.brick, door: true }) });
      const mats = b.side === -1 ? [fac, plain, roofM, plain, plain, plain] : [plain, fac, roofM, plain, plain, plain];
      // BoxGeometry faces: +x, -x, +y, -y, +z, -z; the street face is +x on the left side, -x on the right side
      const m = new THREE.Mesh(new THREE.BoxGeometry(depth, b.h, w), mats);
      if (b.side === 1) { const uv = m.geometry.attributes.uv as THREE.BufferAttribute; for (let i = 4; i < 8; i++) uv.setX(i, 1 - uv.getX(i)); }
      m.position.set(b.side * (8.7 + depth / 2), b.h / 2, (b.z0 + b.z1) / 2); m.castShadow = m.receiveShadow = true; R.add(m);
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, w + 0.2), corn);
      c.position.set(b.side * 8.6, b.h - 0.2, (b.z0 + b.z1) / 2); c.castShadow = true; R.add(c);
    }

    // ---- the wooden house (it gets flattened) ----
    {
      const H = HOUSE, w = H.x1 - H.x0, d = H.z1 - H.z0;
      const walls = new THREE.Mesh(new THREE.BoxGeometry(w, H.h, d), [lam({ map: facadeHD("house", d, H.h, { wall: "#d8b07a", shutter: "#8a3a2a", timber: true, door: true }) }), lam({ map: rep(woodTex(), 2, 2) }), lam({ color: "#5a3a2a" }), lam({ color: "#5a3a2a" }), lam({ map: rep(woodTex(), 2, 2) }), lam({ map: rep(woodTex(), 2, 2) })]);
      walls.position.set(0, H.h / 2, 0); walls.castShadow = walls.receiveShadow = true;
      const shape = new THREE.Shape([new THREE.Vector2(-w / 2 - 0.4, 0), new THREE.Vector2(w / 2 + 0.4, 0), new THREE.Vector2(0, 2.8)]);
      const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: d + 0.6, bevelEnabled: false }), lam({ color: "#8a3a2e" }));
      roof.position.set(0, H.h, -d / 2 - 0.3); roof.castShadow = true;
      this.house.add(walls, roof);
      this.house.position.set((H.x0 + H.x1) / 2, 0, (H.z0 + H.z1) / 2);
      R.add(this.house);
    }

    // ---- elevated railway: one row of iron columns on the right sidewalk, a girder deck per span, rails ----
    {
      const girder = lam({ map: rep(ironTex(), 1, 1) }), iron = lam({ color: "#3f5a4c" }), steel = lam({ color: "#9aa4aa" }), tie = lam({ color: "#5a4632" });
      for (const zc of RAIL_SEGS) {
        const g = new THREE.Group(), L = RAIL.seg - 0.05, W = RAIL.x1 - RAIL.x0;
        const deck = new THREE.Mesh(new THREE.BoxGeometry(W, RAIL.th, L), [girder, girder, iron, iron, iron, iron]);
        deck.castShadow = deck.receiveShadow = true; g.add(deck);
        for (let k = 0; k < 9; k++) { const t2 = new THREE.Mesh(new THREE.BoxGeometry(W - 0.4, 0.12, 0.25), tie); t2.position.set(0, RAIL.th / 2 + 0.06, -L / 2 + 0.4 + k * (L - 0.8) / 8); g.add(t2); }
        for (const rx of [-0.75, 0.75]) { const r2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, L), steel); r2.position.set(rx, RAIL.th / 2 + 0.19, 0); r2.castShadow = true; g.add(r2); }
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, RAIL.y, 10), iron);
        col.position.set(RAIL.colX - (RAIL.x0 + RAIL.x1) / 2, -RAIL.y / 2, -L / 2 + 0.3); col.castShadow = true; g.add(col);
        g.position.set((RAIL.x0 + RAIL.x1) / 2, RAIL.y + RAIL.th / 2, zc);
        g.userData.zc = zc; this.rail.push(g); R.add(g);
      }
    }

    // ---- the tank: riveted steel drum with a shallow cone roof ----
    {
      const T = TANK, side = new THREE.Mesh(new THREE.CylinderGeometry(T.r, T.r, T.h, 64, 1, true), lam({ map: rep(tankTex(), 1, 1), side: THREE.DoubleSide }));
      side.position.y = T.h / 2; side.rotation.y = -Math.PI / 2 - Math.PI * 0.5; side.castShadow = side.receiveShadow = true;
      const top = new THREE.Mesh(new THREE.ConeGeometry(T.r + 0.3, 2.2, 64, 1), lam({ map: roofTex() }));
      top.position.y = T.h + 1.1; top.castShadow = true;
      const lip = new THREE.Mesh(new THREE.TorusGeometry(T.r + 0.05, 0.18, 6, 64), lam({ color: "#5a6464" }));
      lip.rotation.x = Math.PI / 2; lip.position.y = T.h;
      const ladder = new THREE.Mesh(new THREE.BoxGeometry(0.6, T.h, 0.08), lam({ color: "#3a3f44" }));
      ladder.position.set(-4.5, T.h / 2, Math.sqrt(T.r * T.r - 4.5 * 4.5) + 0.06); ladder.rotation.y = Math.atan2(-4.5, Math.sqrt(T.r * T.r - 4.5 * 4.5));
      this.tank.add(side, top, lip, ladder);
      this.tank.position.set(T.x, 0, T.z);
      R.add(this.tank);
      // after the burst: a jagged low ring of torn plates
      const geo = new THREE.CylinderGeometry(T.r, T.r, 4, 64, 1, true), p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) if (p.getY(i) > 0) { const q = Math.atan2(p.getZ(i), p.getX(i)); p.setY(i, 2 + 1.6 * Math.sin(q * 7) * Math.sin(q * 3.3 + 1) + (Math.abs(Math.sin(q * 0.5 - 0.8)) < 0.35 ? -3.6 : 0)); }
      geo.computeVertexNormals();
      const ring = new THREE.Mesh(geo, lam({ map: rep(tankTex(), 1, 0.3), side: THREE.DoubleSide }));
      ring.position.y = 0; ring.castShadow = true;
      this.broken.add(ring); this.broken.position.set(T.x, 0, T.z); this.broken.visible = false;
      R.add(this.broken);
    }

    // ---- the wave: a curling front + a long body behind it, rebuilt every frame ----
    {
      const geo = new THREE.BufferGeometry(), nv = WAVE.nx * WAVE.nr, idx: number[] = [];
      for (let j = 0; j < WAVE.nr - 1; j++) for (let i = 0; i < WAVE.nx - 1; i++) {
        const a = j * WAVE.nx + i, b = a + 1, c = a + WAVE.nx, d = c + 1; idx.push(a, b, c, b, d, c);
      }
      this.wavePos = new THREE.BufferAttribute(new Float32Array(nv * 3), 3); this.waveUv = new THREE.BufferAttribute(new Float32Array(nv * 2), 2);
      geo.setAttribute("position", this.wavePos); geo.setAttribute("uv", this.waveUv); geo.setIndex(idx);
      const gm = new THREE.MeshLambertMaterial({ map: rep(gooTex(), 1, 1), side: THREE.DoubleSide, emissive: new THREE.Color("#3a1606"), color: new THREE.Color(1.15, 1.1, 1.05) });
      this.wave = new THREE.Mesh(geo, gm); this.wave.frustumCulled = false; this.wave.castShadow = true; this.wave.receiveShadow = false;
      R.add(this.wave);
      this.pool2 = new THREE.Mesh(new THREE.PlaneGeometry(17.4, 140).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ map: rep(gooTex(), 3, 26), emissive: new THREE.Color("#3a1606"), color: new THREE.Color(1.15, 1.1, 1.05) }));
      this.pool2.position.set(0, 0.75, 10); this.pool2.receiveShadow = true; R.add(this.pool2);
    }

    // ---- the courtroom set at x = 300 ----
    {
      const C = 300, wood = lam({ map: rep(planksHD(), 3, 3), color: "#c89a6a" }), dark = lam({ color: "#6a3f24" }), wall = lam({ color: "#e8dcc4" });
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 16).rotateX(-Math.PI / 2), wood); floor.position.set(C + 2, 0.01, 0); floor.receiveShadow = true;
      const back = new THREE.Mesh(new THREE.BoxGeometry(20, 7, 0.4), wall); back.position.set(C + 2, 3.5, -5.5); back.receiveShadow = true;
      const panel = new THREE.Mesh(new THREE.BoxGeometry(20, 2.2, 0.2), dark); panel.position.set(C + 2, 1.1, -5.2);
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7, 16), wall); side.position.set(C - 4, 3.5, 0); side.receiveShadow = true;
      const dais = new THREE.Mesh(new THREE.BoxGeometry(6, 0.9, 3), dark); dais.position.set(C + 3, 0.45, -3.5); dais.castShadow = dais.receiveShadow = true;
      const bench = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.5, 0.9), [dark, dark, lam({ color: "#4a2a18" }), dark, lam({ map: rep(planksHD(), 1, 1), color: "#a8723e" }), dark]);
      bench.position.set(C + 3, 0.75, -2.0); bench.castShadow = bench.receiveShadow = true;
      const top = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.12, 1.2), lam({ color: "#4a2a18" })); top.position.set(C + 3, 1.55, -2.0);
      const block = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.1, 16), lam({ color: "#3a2010" })); block.position.set(C + 3.6, 1.65, -1.8);
      const table = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 1), dark); table.position.set(C - 1.4, 0.45, -0.2); table.castShadow = true;
      // windows on the back wall
      for (const x of [-2, 7.5]) {
        const w = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 3.4), new THREE.MeshBasicMaterial({ color: "#cfe2f6" }));
        w.position.set(C + x, 4.2, -5.28); R.add(w);
      }
      const seal = new THREE.Mesh(new THREE.CircleGeometry(0.7, 48), lam({ color: "#d9a441" })); seal.position.set(C + 3, 4.6, -5.28);
      const seal2 = new THREE.Mesh(new THREE.CircleGeometry(0.52, 48), lam({ color: "#2f4f7a" })); seal2.position.set(C + 3, 4.6, -5.27);
      const drape = new THREE.Mesh(new THREE.BoxGeometry(5.2, 5.6, 0.1), lam({ color: "#7a1f2a" })); drape.position.set(C + 3, 3.2, -5.25);
      seal.position.z = -5.18; seal2.position.z = -5.17;
      R.add(floor, back, panel, side, dais, bench, top, block, table, drape); void seal; void seal2;
    }

    // ---- snow ----
    {
      const N = SN.n, pos = new Float32Array(N * 3), sd = new Float32Array(N * 4);
      for (let i = 0; i < N; i++) { pos.set([hh(i, 90) * SN.b, hh(i, 91) * SN.h, hh(i, 92) * SN.b], i * 3); sd.set([hh(i, 93), hh(i, 94), hh(i, 95), hh(i, 96)], i * 4); }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("aSeed", new THREE.BufferAttribute(sd, 4));
      const mat = new THREE.ShaderMaterial({ uniforms: this.snow, transparent: true, depthWrite: false, vertexShader: SNOW_VS, fragmentShader: SNOW_FS });
      const pts = new THREE.Points(geo, mat);
      pts.frustumCulled = false; pts.layers.set(NOINK); pts.renderOrder = 5;
      const u = this.snow.uPx;
      pts.onBeforeRender = (r, _s, c) => { const rt = r.getRenderTarget(), h = rt ? rt.height : r.domElement.height; u.value = h / (2 * Math.tan(THREE.MathUtils.degToRad((c as THREE.PerspectiveCamera).fov) / 2)); };
      R.add(pts);
    }
  }

  /** the wave surface for this frame (x across the street, rows from the base of the front back to the tank) */
  private poseWave(id: number, f: number, t: number) {
    const fl = floodAt(id, f), P = this.wavePos, U = this.waveUv;
    this.wave.visible = fl.on && fl.h > 0.05 && id !== 5 && id !== 6;
    this.pool2.visible = id === 5 || id === 6;
    if (!this.wave.visible) return;
    const prof = WAVE.prof, nb = WAVE.nr - prof.length;
    for (let i = 0; i < WAVE.nx; i++) {
      const x = -WAVE.half + (2 * WAVE.half * i) / (WAVE.nx - 1);
      const dz = 0.35 * Math.sin(0.45 * x + 1.3 * t) + 0.18 * Math.sin(1.1 * x - 2.1 * t);
      const hk = fl.h * (1 + 0.07 * Math.sin(0.8 * x + 2.2 * t)) ;
      for (let j = 0; j < WAVE.nr; j++) {
        let z: number, y: number;
        if (j < prof.length) { const [pz, py] = prof[j]; z = fl.front + dz + pz * Math.min(1, fl.h / 5); y = Math.max(0.02, hk * py); }
        else {
          const s = 1.2 + 150 * ((j - prof.length + 1) / nb) ** 2;
          z = fl.front + dz * Math.exp(-s / 6) - s;
          if (z < TANK_FRONT - 2) z = TANK_FRONT - 2 + (z - TANK_FRONT + 2) * 0.02;
          y = fl.level + (hk - fl.level) * Math.exp(-(((s - 0.6) / 7) ** 1.8)) + 0.12 * Math.sin(x * 0.9 + s * 0.6 - t * 3);
        }
        P.setXYZ(j * WAVE.nx + i, x, y, z);
        U.setXY(j * WAVE.nx + i, x / 6, (z - fl.front * 0.6) / 6 + y / 8);
      }
    }
    P.needsUpdate = true; U.needsUpdate = true;
    this.wave.geometry.computeVertexNormals();
    this.wave.geometry.computeBoundingSphere();
  }

  /** camera-relative sun frozen per shot */
  private shotSun(id: number) {
    let v = this.sunCache.get(id);
    if (v) return v;
    const s = SHOTS[id - 1];
    let fx = 0, fz = 0;
    for (let f = s.a; f < s.b; f += 3) { const c = camAt(id, f), x = c.look[0] - c.pos[0], z = c.look[2] - c.pos[2], n = Math.hypot(x, z) || 1; fx += x / n; fz += z / n; }
    const n = Math.hypot(fx, fz) || 1; fx /= n; fz /= n;
    const az = THREE.MathUtils.degToRad([0, 140, 120, 115, 130, 125, 125, 145, 120][id]), el = THREE.MathUtils.degToRad(WL.el);
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
    untone(L.fog, this.fog.color);
    this.fog.near = 50; this.fog.far = 420;
    scene.fog = this.fog; scene.background = null;
    for (const m of this.clouds) m.quaternion.copy(cam.quaternion);
    // snow: only once "hacía frío" (S5) and in the swim shot
    this.snow.uT.value = t; this.snow.uCam.value.copy(cam.position);
    this.snow.uFade.value = id === 5 ? 0.9 * smooth((f - 578) / 16) : id === 6 ? 0.9 : id === 2 ? 0.35 : 0;

    // ---- set pieces ----
    const burst = id === 3 || id === 4 ? f >= BURST : id === 1 || id === 5 || id === 6;
    this.tank.visible = !burst && id !== 8; this.broken.visible = burst && id !== 8;
    // creak: the tank breathes in and out before it goes
    const creak = id === 3 && f >= 268 && f < BURST ? 0.012 * Math.sin(f * 1.9) * smooth((f - 268) / 10) + 0.02 * smooth((f - 296) / 14) : 0;
    this.tank.scale.set(1 + creak, 1 - creak * 0.5, 1 + creak);
    const fl = floodAt(id, f);
    // house: flattened when the wave reaches it (stays flat in the aftermath, rebuilt years later)
    const squash = id === 4 ? smooth((fl.front - 11) / 5) : id === 5 || id === 6 || id === 1 ? 1 : 0;
    this.house.scale.set(1 + 0.25 * squash, 1 - 0.78 * squash, 1 + 0.08 * squash);
    this.house.rotation.z = 0.12 * squash;
    // elevated railway: the spans in the wave's path buckle and sag
    for (const g of this.rail) {
      const zc = g.userData.zc as number, inPath = zc > -4 && zc < 16;
      const k = !inPath ? 0 : id === 4 ? smooth((fl.front - zc + 3) / 6) : id === 5 || id === 6 ? 1 : id === 1 ? smooth((fl.front - zc + 3) / 6) : 0;
      const w = Math.sin(((zc + 4) / 20) * Math.PI);
      g.position.y = RAIL.y + RAIL.th / 2 - 2.6 * k * w;
      g.rotation.x = 0.28 * k * Math.cos(((zc + 4) / 20) * Math.PI);
      g.rotation.z = -0.22 * k * w;
    }
    this.poseWave(id, f, t);

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
    const side = (key: string, x: number, y: number, z: number, scale: number, draw: (p: Pen) => void, dir = 1, roll = 0, contact = true) => {
      if (!visible(x, y + 1.5 * scale, z, 5 * scale)) return;
      const d = cam.position.distanceTo(this.v.set(x, y + 1.4 * scale, z)) / scale, [w, h, k] = tierW(d);
      const mirror = dir * right.z < 0;
      st.places.push({ key: `${key}|${w}`, x, y, z, size: [w, h, k], wide: true, scale, mirror, draw });
      rolls.push(roll);
      if (contact && d * scale < 60) { blob(st, sunDir, x, y, z - 1.0 * scale, 1.6 * scale); blob(st, sunDir, x, y, z + 1.0 * scale, 1.6 * scale); }
    };
    const fx = (key: string, cw: number, ch: number, draw: (p: Pen) => void, x: number, y: number, z: number, w: number, h: number, soft = false) =>
      st.fx.push({ key, cw, ch, draw, x, y, z, w, h, soft });
    const street = id !== 7;

    if (id === 1) { // people running from the wave, straight at us
      const ph = gait(t, 2.3);
      for (const r of RUNNERS) {
        const z = fl.front + r.dz;
        if (z > c.pos[2] - 3.5) continue;
        person(`run${r.v}`, folk(r.v), r.x, 0, z, { mode: "march", phase: (ph + (r.v % 2) * 0.5) % 1, expr: r.v % 3 ? "shock" : "shout", lift: 90, facing: 0 }, r.v + 40);
      }
    }
    if (id === 2 || id === 8) { // a calm winter street (and, years later, everybody sniffing the air)
      const ph = gait(t, 0.9);
      if (id === 2) for (const s of STROLL) {
        const z = s.z + s.dir * 0.9 * t;
        person(`st${s.v}`, folk(s.v), s.x, 0, z, { mode: "stroll", phase: (ph + (s.v % 4) * 0.25) % 1, expr: (["smile", "whistle", "neutral", "smile_closed"] as Expr[])[s.v % 4], facing: 0 }, s.v);
      } else for (const s of SNIFF) {
        const sniff = Math.sin(t * 5 + s.v) > 0.2;
        person(`sn${s.v}`, folk(s.v + 3), s.x, 0, s.z, { mode: "stand", expr: sniff ? "relief" : "smile_closed", headTilt: sniff ? -6 : 0, facing: 0 }, s.v + 200);
      }
      side(`cart|${id}`, -4.2, 0, id === 2 ? -6 : 4, 1, (p) => cartDraw(p, null), 1);
      if (id === 8) for (let k = 0; k < 14; k++) {
        const u = (t * 0.25 + k / 14) % 1, x = -5 + (k % 7) * 1.7, z = 4 + (k >> 1) * 2.3;
        fx(`smell|${(Math.floor(f / 3) + k) % 6}`, 128, 384, smellDraw((Math.floor(f / 3) + k) % 6), x + Math.sin(u * 6 + k) * 0.3, 0.6 + u * 2.6, z, 0.5, 1.5, true);
      }
    }
    if (id === 3) { // two workers by the leaking tank
      const ex: Expr = f < 268 ? "nervous" : f < 300 ? "shock" : "shout";
      person("w1", WORKER, -1.6, 0, -28.4, { mode: "stand", expr: ex, facing: 1, look: 1 }, 7);
      person("w2", WORKER2, 1.9, 0, -29.0, { mode: "stand", expr: f < 271 ? "stern" : "nervous", facing: -1 }, 8);
      for (let k = 0; k < 6; k++) { // drips running down the lower plates
        const u = ((t * 0.5 + k * 0.37) % 1), x = -3 + k * 1.2, zz = TANK.z + Math.sqrt(TANK.r ** 2 - x * x) + 0.08;
        fx("drip", 64, 128, dripDraw, x, 3.2 - u * 3.0, zz, 0.16, 0.32);
      }
      if (f >= 268 && f < BURST) for (let k = 0; k < 3; k++) {
        const x = [-4, 0.5, 3.5][k], zz = TANK.z + Math.sqrt(TANK.r ** 2 - x * x) + 0.3;
        fx(`creak|${f % 6}`, 300, 300, (p) => fxCreak(p, (f % 6) / 6), x, [2.6, 4.2, 3.0][k], zz, 1.4, 1.4);
      }
    }
    if ((id === 3 || id === 4) && f >= BURST - 1 && f < BURST + 22) { // the burst: flash, flying plates, rivets
      const u = (f - BURST + 1) / 22;
      fx(`burst|${Math.round(u * 20)}`, 500, 500, (p) => fxBurst(p, u, "#fff3b0", 12), 0, 5, TANK_FRONT + 0.5, 14, 14, true);
      for (const [k, pl] of PLATES.entries()) {
        const tt = (f - BURST) / FPS, a = pl.a, x = TANK.r * Math.sin(a) + pl.vo * Math.sin(a) * tt, z = TANK.z + TANK.r * Math.cos(a) + pl.vo * Math.cos(a) * tt;
        const y = 6 + pl.vy * tt - 4.9 * tt * tt * 1.4;
        if (y > 0.3) fx(`plate|${k % 3}|${Math.round(tt * pl.spin) % 4}`, 256, 256, plateDraw, x, y, z, 2.2, 2.2);
      }
    }
    if (id === 4) {
      // people fleeing ahead of the wave
      const ph = gait(t, 2.3);
      for (const r of RUNNERS) {
        const z = fl.front + 3 + r.dz * 1.3;
        if (z > 70) continue;
        person(`run${r.v}`, folk(r.v), r.x * 0.9, 0, z, { mode: "march", phase: (ph + (r.v % 2) * 0.5) % 1, expr: "shock", lift: 90 }, r.v + 40);
      }
      // the horse and barrel cart: standing, then swept up and carried along by the front
      const hz = 21, caught = fl.front > hz - 0.8;
      const z = caught ? fl.front - 0.8 : hz, y = caught ? Math.min(fl.h * 0.62, 0.9 * (fl.front - hz + 0.8) * 2.2) : 0;
      side(`cart4|${caught ? 1 : 0}|${Math.floor(f / 4) % 2}`, -0.5, y, z, 1, (p) => cartDraw(p, caught ? 0.25 + 0.25 * (Math.floor(f / 4) % 2) : null), 1, caught ? 0.25 * Math.sin(t * 6) : 0, !caught);
      if (Math.abs(fl.front - 12.5) < 3) fx(`puff|${f % 8}`, 300, 300, (p) => fxPuff(p, (f % 8) / 8), -11, 2.5, 15.5, 7, 7, true);
    }
    if (id === 5) { // the rescuers wade in... and get stuck
      const ph = gait(t, 1.0 * (1 - smooth((f - 600) / 40)));
      for (const s of SAILORS) {
        const z = s.z + Math.max(0, 560 - f) * 0.09;
        const stuck = f > 615 + s.v * 3;
        const ex: Expr = f < 590 ? "stern" : f < 625 ? "nervous" : "pained";
        person(`sa${s.v}`, SAILOR(s.v), s.x, 0, z, { mode: stuck ? "stand" : "march", phase: (ph + (s.v % 2) * 0.5) % 1, expr: ex, tilt: stuck ? 3 * Math.sin(t * 3 + s.v) : 0, facing: 0 }, s.v + 300, false);
      }
      for (let k = 0; k < 3; k++) person(`vic${k}`, folk(k + 4), -4 + k * 4, -0.5, 10 + k * 1.5, { mode: "fall", expr: "pained", facing: 0 }, k + 400, false);
    }
    if (id === 6) { // swimming in cold caramel: arms up, barely moving
      const tilt = 6 * Math.sin(t * 1.4);
      person("swim", folk(6), 2, -0.5, 9.5, { mode: "fall", expr: f < 700 ? "pained" : "dazed", tilt, facing: 0 }, 500, false);
      person("swim2", folk(9), -0.8, -0.45, 6.5, { mode: "fall", expr: "pained", tilt: -tilt, facing: 0 }, 501, false);
      person("stuck", SAILOR(2), 4.6, 0, 6.8, { mode: "stand", expr: "pained", facing: -1 }, 502, false);
    }
    if (id === 7) { // the courtroom
      const C = 300, pt = smooth((f - 762) / 8);
      person("boss", BOSS, C - 2, 0, 0, { mode: "stand", expr: f < 760 ? "stern" : "shout", wave: f >= 760 ? 1 : undefined, facing: 1 }, 600);
      person("lawyer", folk(4), C - 0.5, 0, -0.6, { mode: "stand", expr: "nervous", facing: -1 }, 601);
      const strike = f < 826 ? 0 : smooth((f - 826) / 7);
      person("judge", JUDGE, C + 3, 0.9, -3.0, { mode: "stand", expr: f < 805 ? "stern" : f < 833 ? "stern" : "shout", prop: ["hammer", strike] as ["hammer", number], facing: 0 }, 602, false);
      if (f >= 833 && f < 848) fx(`gavel|${f - 833}`, 500, 500, (p) => fxBurst(p, (f - 833) / 15, "#fff3b0", 8, 30, 160), C + 3.7, 1.8, -1.6, 1.4, 1.4, true);
      void pt;
    }
    if (street) for (const s of SNOWPATCH) if (id === 2 || id === 3 || id === 1) fx("snowpatch", 256, 256, snowDraw, s.x, 0.17, s.z, s.w, s.w * 0.7, true);

    // ---- place the cards ----
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
      if (p.key.startsWith("snowpatch")) { p.flat = true; p.rot = (p.x * 7 + p.z) % 6.28; }
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
    return focus;
  }
}

// wave mesh layout: the front profile (z offset from the front, y as a fraction of the crest), then the body rows
const WAVE = {
  nx: 64, half: 15,
  prof: [[-2.4, 0], [-1.9, 0.3], [-1.2, 0.55], [-0.4, 0.72], [0.35, 0.8], [0.6, 0.9], [0.3, 0.98], [-0.4, 1.0], [-1.0, 0.98]] as [number, number][],
  nr: 9 + 70,
};
