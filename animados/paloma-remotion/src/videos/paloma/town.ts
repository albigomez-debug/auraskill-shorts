// Richer street scenery for the toon world: terraced houses with pitched roofs, chimneys with pots, 3D window sills
// and lintels, cornices, shop fronts with awnings and painted signs, downpipes, lamp posts, barrels and crates,
// a dark gutter along the kerb and a painted far skyline (roofs, chimneys, spires, a dome) that hides the horizon.
import * as THREE from "three";
import { twoTone } from "./shade";
import { NOINK } from "./ink";
import { ctex, rep, facadeHD, roofHD, rng } from "./paint";

const mats = new Map<string, THREE.Material>();
export const lamC = (col: string, extra: THREE.MeshLambertMaterialParameters = {}) => {
  const k = col + JSON.stringify(Object.keys(extra));
  let m = mats.get(k);
  if (!m) { m = twoTone(new THREE.MeshLambertMaterial({ color: col, ...extra })); mats.set(k, m); }
  return m;
};
const box = (w: number, h: number, d: number, m: THREE.Material | THREE.Material[], x: number, y: number, z: number, shadow = true) => {
  const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  b.position.set(x, y, z); b.castShadow = shadow; b.receiveShadow = true; return b;
};

const signTex = (text: string, bg: string, fg: string) => ctex(`sign_${text}_${bg}`, 1024, 192, (g) => {
  g.fillStyle = bg; g.fillRect(0, 0, 1024, 192);
  g.strokeStyle = fg; g.lineWidth = 10; g.strokeRect(14, 14, 996, 164);
  g.fillStyle = fg; g.font = "bold 104px Georgia, 'Times New Roman', serif"; g.textAlign = "center"; g.textBaseline = "middle";
  g.fillText(text, 512, 100, 940);
});
const awningTex = (a: string, b: string) => ctex(`awn_${a}${b}`, 256, 256, (g) => {
  for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? a : b; g.fillRect(i * 32, 0, 32, 256); }
  g.fillStyle = "rgba(0,0,0,0.18)"; g.fillRect(0, 220, 256, 36);
});
const shopTex = () => ctex("shopwin", 512, 512, (g) => {
  g.fillStyle = "#3a2a22"; g.fillRect(0, 0, 512, 512);
  const gl = g.createLinearGradient(0, 0, 0, 512); gl.addColorStop(0, "#f2cf8a"); gl.addColorStop(1, "#b9874a");
  g.fillStyle = gl; g.fillRect(24, 24, 464, 464);
  g.fillStyle = "#3a2a22"; for (const x of [170, 340]) g.fillRect(x - 8, 24, 16, 464); g.fillRect(24, 250, 464, 14);
  for (let i = 0; i < 9; i++) { g.fillStyle = ["#a8423a", "#e8d6a0", "#6a8a4a"][i % 3]; g.beginPath(); g.arc(70 + (i % 3) * 170, 400 - Math.floor(i / 3) * 40, 26, 0, 6.3); g.fill(); }
  g.fillStyle = "rgba(255,255,255,0.35)"; g.save(); g.translate(140, 140); g.rotate(0.8); g.fillRect(-10, -200, 22, 400); g.restore();
});

export type TownOpts = {
  side: -1 | 1; x: number; z0: number; z1: number; seed: number;
  floors?: [number, number]; walls?: string[]; shutters?: string[]; roofs?: string[]; signs?: string[]; skip?: [number, number][];
  brick?: number; // probability of a brick facade
};
/** a row of terraced houses whose fronts stand at |x| = o.x, facing the street (towards x = 0) */
export const terrace = (R: THREE.Object3D, o: TownOpts) => {
  const r = rng(o.seed), U = (a: number, b: number) => a + (b - a) * r();
  const pick = <T,>(a: T[]) => a[Math.floor(r() * a.length) % a.length];
  const walls = o.walls ?? ["#d8c4a0", "#c9a882", "#e2d3b4", "#b98e6c", "#cdb69a"];
  const shut = o.shutters ?? ["#3f5f4a", "#6a3a30", "#3a4a6a", "#5a4632"];
  const roofs = o.roofs ?? ["#5a4a52", "#6a4a3e", "#4e5560"];
  const signs = o.signs ?? [];
  const [fMin, fMax] = o.floors ?? [3, 4];
  const s = o.side, iron = lamC("#2e2a2c"), stoneTrim = lamC("#ece2cf"), dark = lamC("#2a2224"), pot = lamC("#b0603e");
  let z = o.z0, k = 0;
  while (z < o.z1 - 2) {
    const w = Math.min(U(5.5, 8.5), o.z1 - z), floors = Math.floor(U(fMin, fMax + 1)), h = floors * 2.8 + 0.6, depth = 9;
    if (o.skip?.some(([a, b]) => z + w > a && z < b)) { z += w; continue; }
    const brickF = r() < (o.brick ?? 0.5), wall = pick(walls);
    const fac = twoTone(new THREE.MeshLambertMaterial({ map: facadeHD(`t${o.seed}_${k}`, w, h, { wall, shutter: pick(shut), brick: brickF, door: true }) }));
    const side = twoTone(new THREE.MeshLambertMaterial({ color: brickF ? "#a86a4a" : wall }));
    const mats = s === -1 ? [fac, side, side, side, side, side] : [side, fac, side, side, side, side];
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(depth, h, w), mats);
    if (s === 1) { const uv = body.geometry.attributes.uv as THREE.BufferAttribute; for (let i = 4; i < 8; i++) uv.setX(i, 1 - uv.getX(i)); }
    body.position.set(s * (o.x + depth / 2), h / 2, z + w / 2); body.castShadow = body.receiveShadow = true; g.add(body);
    const fx = s * o.x, out = -s; // front plane x and the outward (street) direction
    // cornice + string courses
    g.add(box(0.5, 0.35, w + 0.1, stoneTrim, fx + out * 0.2, h - 0.15, z + w / 2));
    for (let f = 1; f < floors; f++) g.add(box(0.14, 0.12, w, stoneTrim, fx + out * 0.07, f * 2.8 + 0.05, z + w / 2, false));
    // 3D sills and lintels at the painted windows (facadeHD: windows every 2.2 m, 0.85 x 1.25, sill 0.9 m above each floor)
    const nWin = Math.max(1, Math.floor(w / 2.2));
    for (let f = 0; f < floors; f++) for (let i = 0; i < nWin; i++) {
      if (f === 0 && i === Math.floor(nWin / 2)) continue;
      const zc = s === -1 ? z + w - ((i + 0.5) * w) / nWin : z + ((i + 0.5) * w) / nWin, y0 = f * 2.8 + 0.9;
      if (f === 0 && signs.length && k % 2 === 0) continue;
      g.add(box(0.22, 0.1, 1.25, stoneTrim, fx + out * 0.11, y0 - 0.1, zc, false));
      g.add(box(0.16, 0.16, 1.2, stoneTrim, fx + out * 0.08, y0 + 1.42, zc, false));
    }
    // shop front with awning and a painted sign on every other house when signs are given
    if (signs.length && k % 2 === 0) {
      const sw = Math.min(w - 1.6, 4.6), zc = z + w / 2 + (s === -1 ? 0.8 : -0.8);
      const win = new THREE.Mesh(new THREE.PlaneGeometry(sw, 1.9), new THREE.MeshLambertMaterial({ map: shopTex() }));
      win.position.set(fx + out * 0.03, 1.55, zc); win.rotation.y = out * Math.PI / 2; g.add(win);
      g.add(box(0.2, 0.25, sw + 0.4, dark, fx + out * 0.1, 0.5, zc, false));
      const sign = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, sw + 0.3), [lamC("#3a2a22"), lamC("#3a2a22"), lamC("#3a2a22"), lamC("#3a2a22"), lamC("#3a2a22"), lamC("#3a2a22")]);
      const sm = twoTone(new THREE.MeshLambertMaterial({ map: signTex(signs[k / 2 % signs.length | 0], pick(["#1f3a2a", "#5a1e22", "#1e2a4a"]), "#e8c45a") }));
      (sign.material as THREE.Material[])[s === -1 ? 0 : 1] = sm;
      if (s === 1) { const uv = sign.geometry.attributes.uv as THREE.BufferAttribute; for (let i = 4; i < 8; i++) uv.setX(i, 1 - uv.getX(i)); }
      sign.position.set(fx + out * 0.08, 2.95, zc); sign.castShadow = true; g.add(sign);
      const aw = new THREE.Mesh(new THREE.PlaneGeometry(1.3, sw + 0.4), twoTone(new THREE.MeshLambertMaterial({ map: rep(awningTex(pick(["#b8322f", "#2f6f4a", "#2f4f8a"]), "#f1e6cc"), 1, (sw + 0.4) / 2), side: THREE.DoubleSide })));
      aw.rotation.set(0, 0, 0); aw.rotateX(-Math.PI / 2); aw.rotateY(out * 0.45);
      aw.position.set(fx + out * 0.6, 2.45, zc); aw.castShadow = true; g.add(aw);
    }
    // roof: pitched (ridge along the street) with tiles, chimney stacks with pots
    const rh = U(2.2, 3.4), shape = new THREE.Shape([new THREE.Vector2(-depth / 2 - 0.3, 0), new THREE.Vector2(depth / 2 + 0.3, 0), new THREE.Vector2(0, rh)]);
    const rg = new THREE.ExtrudeGeometry(shape, { depth: w, bevelEnabled: false });
    const roof = new THREE.Mesh(rg, [twoTone(new THREE.MeshLambertMaterial({ map: rep(roofHD(pick(roofs), r() < 0.5), 0.25, 0.25) })), side]);
    roof.position.set(s * (o.x + depth / 2), h, z); roof.castShadow = true; roof.receiveShadow = true; g.add(roof);
    for (let c = 0; c < 2; c++) {
      const cz = z + (c ? w - 0.6 : 0.6), cx = s * (o.x + depth / 2 + U(-1.5, 1.5)), ch = rh + U(0.8, 1.8);
      g.add(box(0.9, ch, 1.1, side, cx, h + ch / 2, cz));
      g.add(box(1.05, 0.18, 1.25, stoneTrim, cx, h + ch, cz, false));
      for (let p = 0; p < 2 + (r() < 0.5 ? 1 : 0); p++) {
        const pp = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.5, 8), pot);
        pp.position.set(cx, h + ch + 0.33, cz - 0.3 + p * 0.3); pp.castShadow = true; g.add(pp);
      }
    }
    // downpipe at one corner
    g.add(box(0.12, h, 0.12, iron, fx + out * 0.12, h / 2, z + 0.15, false));
    R.add(g);
    z += w; k++;
  }
};

/** gas lamps, barrels, crates and a dark gutter along one kerb */
export const streetProps = (R: THREE.Object3D, side: -1 | 1, kerbX: number, z0: number, z1: number, seed: number, skip: [number, number][] = []) => {
  const r = rng(seed), iron = lamC("#2a2a30"), glass = new THREE.MeshLambertMaterial({ color: "#ffe9a8", emissive: new THREE.Color("#c99a40") });
  const wood = lamC("#8a5a34"), hoop = lamC("#3a3436"), crate = lamC("#b08a5a");
  const gut = new THREE.Mesh(new THREE.PlaneGeometry(0.45, z1 - z0).rotateX(-Math.PI / 2), lamC("#4a4248"));
  gut.position.set(side * (kerbX - 0.3), 0.012, (z0 + z1) / 2); gut.receiveShadow = true; R.add(gut);
  for (let z = z0 + 4; z < z1; z += 13) {
    if (skip.some(([a, b]) => z > a - 1 && z < b + 1)) continue;
    const x = side * (kerbX + 0.35), g = new THREE.Group();
    g.add(box(0.12, 3.3, 0.12, iron, 0, 1.65, 0));
    g.add(box(0.28, 0.3, 0.28, iron, 0, 0.15, 0));
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.14, 0.5, 4), glass); lamp.position.y = 3.55; g.add(lamp);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.25, 4), iron); cap.position.y = 3.92; g.add(cap);
    g.position.set(x, 0.16, z); g.traverse((m) => { (m as THREE.Mesh).castShadow = true; }); R.add(g);
  }
  for (let i = 0; i < 9; i++) {
    const z = z0 + r() * (z1 - z0);
    if (skip.some(([a, b]) => z > a - 1 && z < b + 1)) continue;
    const x = side * (kerbX + 1.3 + r() * 0.8);
    if (r() < 0.6) {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.3, 0.9, 14), wood); b.position.set(x, 0.61, z); b.castShadow = true; R.add(b);
      for (const y of [0.35, 0.85]) { const h = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.03, 4, 16), hoop); h.rotation.x = Math.PI / 2; h.position.set(x, y, z); R.add(h); }
    } else R.add(box(0.8, 0.7, 0.8, crate, x, 0.51, z));
  }
};

/** a painted city skyline ring far away (roofs, chimneys, spires, one dome), hazed toward the sky colour */
export const skyline = (R: THREE.Object3D, haze: string, dist = 170, dome = true) => {
  const tex = ctex(`skyline_${haze}_${dome}`, 2048, 256, (g, r) => {
    g.clearRect(0, 0, 2048, 256);
    const col = new THREE.Color(haze).multiplyScalar(0.78), c = `#${col.getHexString()}`;
    g.fillStyle = c;
    let x = 0;
    while (x < 2048) {
      const w = 40 + r() * 90, h = 60 + r() * 80;
      g.beginPath(); g.moveTo(x, 256); g.lineTo(x, 256 - h); g.lineTo(x + w / 2, 256 - h - 18 - r() * 16); g.lineTo(x + w, 256 - h); g.lineTo(x + w, 256); g.fill();
      if (r() < 0.6) g.fillRect(x + w * 0.2, 256 - h - 34, 10, 30);
      x += w;
    }
    for (const sx of [380, 1240, 1760]) { g.fillRect(sx, 70, 22, 186); g.beginPath(); g.moveTo(sx - 4, 72); g.lineTo(sx + 11, 0); g.lineTo(sx + 26, 72); g.fill(); }
    if (dome) { g.beginPath(); g.arc(900, 120, 62, Math.PI, 0); g.fill(); g.fillRect(838, 120, 124, 136); g.fillRect(893, 30, 14, 34); }
  });
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2, m = new THREE.Mesh(new THREE.PlaneGeometry(2 * dist * Math.tan(Math.PI / 6) + 2, dist * 0.22), new THREE.MeshBasicMaterial({ map: tex, transparent: true, fog: false, depthWrite: false }));
    m.position.set(Math.sin(a) * dist, dist * 0.11 - 1, Math.cos(a) * dist); m.rotation.y = a + Math.PI; m.layers.set(NOINK); m.renderOrder = -0.5; R.add(m);
  }
};
