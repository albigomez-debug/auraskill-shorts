// Shared world skeleton for the caricature shorts: sky, sun, clouds, fog, per-shot sun direction and the card/fx
// placement. Each short extends Base with build() (static set) and pose() (what moves each frame).
import * as THREE from "three";
import { Pen, bodyFront, Outfit } from "./toon";
import { Pool, Actor, Fx, Stage, tier, tierW, light2D, blob, BODY, WIDE } from "./troop";
import { NOINK } from "./ink";
import { LIGHTS, LOOK, LightPreset, WorldLook } from "./lights";
import { TONE, CHAR, twoTone, untone } from "./shade";
import { cloudHD, CLOUD_DAY } from "./paint";
import { lamC } from "./town";
import { FPS, SHOTS, camAt } from "./story";

export const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
export const hh = (i: number, s = 0) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
export const lam = (p: THREE.MeshLambertMaterialParameters) => twoTone(new THREE.MeshLambertMaterial(p));
export { lamC };
export const box = (R: THREE.Object3D, w: number, h: number, d: number, mat: THREE.Material | THREE.Material[], x: number, y: number, z: number, ry = 0) => {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.rotation.y = ry; m.castShadow = m.receiveShadow = true; R.add(m); return m;
};
export const cyl = (R: THREE.Object3D, r0: number, r1: number, h: number, mat: THREE.Material, x: number, y: number, z: number, seg = 12) => {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; R.add(m); return m;
};

export type PersonOpts = Parameters<typeof bodyFront>[2];
export type Api = {
  f: number; t: number; id: number; cam: THREE.PerspectiveCamera; right: THREE.Vector3;
  person: (who: string, o: Outfit, x: number, y: number, z: number, opts: PersonOpts, i: number, contact?: boolean) => void;
  /** wide 2000x1400 profile card (feet at WG), drawn facing right; mirrored when (dx, dz) points to screen-left */
  card: (key: string, x: number, z: number, scale: number, draw: (p: Pen) => void, dx?: number, dz?: number, y?: number) => void;
  fx: (key: string, cw: number, ch: number, draw: (p: Pen) => void, x: number, y: number, z: number, w: number, h: number, soft?: boolean) => void;
};

export abstract class Base {
  root = new THREE.Group();
  private pool = new Pool();
  private actors: Actor[] = [];
  private fxs: Fx[] = [];
  private hemi: THREE.HemisphereLight; private sun: THREE.DirectionalLight;
  private skyMat: THREE.ShaderMaterial; private sky: THREE.Mesh;
  private fog = new THREE.Fog("#cfdcea", 60, 420);
  private clouds: THREE.Mesh[] = [];
  private sunCache = new Map<number, THREE.Vector3>();
  private frustum = new THREE.Frustum(); private m4 = new THREE.Matrix4(); private sph = new THREE.Sphere(); private v = new THREE.Vector3();
  L: LightPreset = { ...LIGHTS.day, el: 36, lit: [1.55, 1.42, 1.2], shade: [0.38, 0.36, 0.42], lift: [0.05, 0.05, 0.07], sunCol: "#fff0d8", fog: "#cfdcea" };
  K: WorldLook = { ...LOOK.day, sky: { c: ["#dfe8f0", "#c4d6ec", "#98b8e2", "#77a0da", "#5a88cf"], e: [0, 3, 8, 16, 40] }, sat: 1.0 };
  fogNear = 60; fogFar = 420;

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
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2 + hh(i, 20), d = 550 + hh(i, 21) * 500, w = 130 + hh(i, 23) * 120;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: cm[i % 4], transparent: true, depthWrite: false, fog: false }));
      m.position.set(Math.cos(a) * d, 100 + hh(i, 22) * 220, Math.sin(a) * d); m.scale.set(w, w / 2, 1); m.layers.set(NOINK); this.clouds.push(m); R.add(m);
    }
  }
  /** called once by the subclass constructor after it set L/K */
  abstract pose(a: Api): void;

  private shotSun(id: number) {
    let v = this.sunCache.get(id);
    if (v) return v;
    const sh = SHOTS[id - 1];
    let fx = 0, fz = 0;
    for (let f = sh.a; f < sh.b; f += 3) { const c = camAt(id, f), x = c.look[0] - c.pos[0], z = c.look[2] - c.pos[2], n = Math.hypot(x, z) || 1; fx += x / n; fz += z / n; }
    const n = Math.hypot(fx, fz) || 1; fx /= n; fz /= n;
    const az = THREE.MathUtils.degToRad(sh.sunAz ?? 120), el = THREE.MathUtils.degToRad(this.L.el);
    const hx = fx * Math.cos(az) - fz * Math.sin(az), hz = fz * Math.cos(az) + fx * Math.sin(az);
    v = new THREE.Vector3(hx * Math.cos(el), Math.sin(el), hz * Math.cos(el)).normalize();
    this.sunCache.set(id, v);
    return v;
  }
  private actor(i: number) { while (this.actors.length <= i) this.actors.push(new Actor(this.root)); return this.actors[i]; }
  private fxm(i: number) { while (this.fxs.length <= i) this.fxs.push(new Fx(this.root)); return this.fxs[i]; }

  update(id: number, f: number, cam: THREE.PerspectiveCamera, scene: THREE.Scene) {
    const t = f / FPS, L = this.L, K = this.K;
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
    untone(L.fog, this.fog.color); this.fog.near = this.fogNear; this.fog.far = this.fogFar;
    scene.fog = this.fog; scene.background = null;
    for (const m of this.clouds) m.quaternion.copy(cam.quaternion);

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
    const api: Api = {
      f, t, id, cam, right,
      person: (who, o, x, y, z, opts, i, contact = true) => {
        if (!visible(x, y + 1.1, z, 3)) return;
        const d = cam.position.distanceTo(this.v.set(x, y + 1.6, z));
        if (d < 1.0) return;
        const [w, h, k] = tier(d), near = d < 16;
        const o2 = { ...opts, light, seed: (i * 5 + 3) % 7 + 1, blink: near ? lidAt(i) : 0 };
        if (d > 40) o2.expr = "neutral";
        st.places.push({ key: `${who}|${JSON.stringify(o2)}`, x, y, z, size: [w, h, k], draw: (p) => bodyFront(p, o, o2) });
        if (contact && d < 60) blob(st, sunDir, x, y, z);
      },
      card: (key, x, z, scale, draw, dx = 1, dz = 0, y = 0) => {
        if (!visible(x, y + 1.2 * scale, z, 2.6 * scale)) return;
        const d = cam.position.distanceTo(this.v.set(x, y + 1.2 * scale, z)) / scale, [w, h, k] = tierW(d);
        st.places.push({ key: `${key}|${w}`, x, y, z, size: [w, h, k], wide: true, scale, mirror: dx * right.x + dz * right.z < 0, draw });
        if (d < 60 && y < 0.05) blob(st, sunDir, x, y, z, 1.0 * scale);
      },
      fx: (key, cw, ch, draw, x, y, z, w, h, soft = false) => { st.fx.push({ key, cw, ch, draw, x, y, z, w, h, soft }); },
    };
    this.pose(api);

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
      const e = this.fxm(fi++);
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
