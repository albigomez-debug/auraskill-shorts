// Pimpín 3 · "El vendaval": Villazanca square in a storm; the barn at BARN; the well at (5, -3).
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { rep, planksHD } from "./paint";
import { textDraw, labelDraw, ctaDraw } from "./props";
import { villazanca, TALL, PIM, PIMPIN, ALCALDESA, VEC } from "./villa";
import { S, W, BARN, storm, fly, pull, smooth } from "./story";

const windDraw = (k: number) => (p: Pen) => { p.g.strokeStyle = "rgba(255,255,255,0.85)"; p.g.lineCap = "round"; for (let j = 0; j < 7; j++) { const y = 30 + j * 34, x = ((k * 90 + j * 140) % 700) - 200; p.g.lineWidth = 6; p.g.beginPath(); p.g.moveTo(x, y); p.g.bezierCurveTo(x + 80, y - 10, x + 160, y + 10, x + 240, y); p.g.stroke(); } };
const veilDraw = (k: number, ph: number) => (p: Pen) => { p.g.fillStyle = `rgba(28,30,58,${0.5 * k})`; p.g.fillRect(0, 0, 256, 256); p.g.strokeStyle = `rgba(200,210,240,${0.55 * k})`; p.g.lineWidth = 2; for (let j = 0; j < 40; j++) { const x = (j * 53 + ph * 37) % 280 - 10, y = (j * 71 + ph * 61) % 270 - 10; p.g.beginPath(); p.g.moveTo(x, y); p.g.lineTo(x - 8, y + 26); p.g.stroke(); } };
const hatDraw = (p: Pen) => { p.poly([[70, 60], [186, 60], [186, 190], [70, 190]], "#2a2a30", 8); p.poly([[30, 190], [226, 190], [226, 220], [30, 220]], "#2a2a30", 8); p.poly([[70, 160], [186, 160], [186, 185], [70, 185]], "#c8202a", 0); };
const scarfDraw = (k: number) => (p: Pen) => { const w = (x: number) => 128 + Math.sin(x * 0.03 + k) * 40; p.band([[10, w(10)], [130, w(130)], [250, w(250)], [380, w(380)], [500, w(500)]], "#e2453c", 46, 7); };

export class World extends Base {
  rope = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1, 6), lamC("#c8a060"));
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    // barn
    const red = lam({ map: rep(planksHD(), 2, 2), color: "#b83a2a" }); const B0 = BARN[0], bz = BARN[2];
    box(R, 7, 6, 6, red, B0, 3, bz); const roof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 3, 4), lamC("#5a3a2a")); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, 0.85); roof.position.set(B0, 7.5, bz); R.add(roof);
    box(R, 3.4, 4.2, 0.08, lamC("#3a1a12"), B0, 2.1, bz + 3.02); box(R, 3.6, 0.2, 0.1, lamC("#f4f1ea"), B0, 4.3, bz + 3.04);
    // street lamps
    for (const x of [-2.5, 9]) { cyl(R, 0.09, 0.12, 4.6, lamC("#2a2a30"), x, 2.3, 2.6, 8); box(R, 0.5, 0.6, 0.5, lamC("#f2e2a0"), x, 4.8, 2.6); }
    this.rope.visible = false; R.add(this.rope);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, cam } = a;
    const k = storm(f, id), ph = Math.floor(f / 2) % 6;
    if (k > 0) { this.sun.intensity *= 1 - 0.7 * k; this.hemi.intensity *= 1 - 0.35 * k; const dk = new THREE.Color("#3a3e52"); for (const u of ["c0", "c1", "c2", "c3", "c4"]) (this.skyMat.uniforms[u].value as THREE.Color).lerp(dk, 0.85 * k); }
    // rain/darkness veil in front of the camera
    if (k > 0.02) { const d = new THREE.Vector3(); cam.getWorldDirection(d); const p = cam.position.clone().addScaledVector(d, 0.8); fx(`veil|${Math.round(k * 6)}|${ph}`, 256, 256, veilDraw(Math.round(k * 6) / 6, ph), p.x, p.y, p.z, 2.2, 2.2, true); }
    const windy = k > 0.5 && id !== S.applause;
    const pim = { x: 3.5, z: -0.6 };
    // villagers
    for (let j = 0; j < (id === S.cta ? 0 : 9); j++) {
      const x0 = -5 + (j % 5) * 2.6 + Math.floor(j / 5) * 1.3, z0 = 0.6 + Math.floor(j / 5) * 2.0;
      let x = x0, y = 0, tilt = 0, mode: "stand" | "sit" = "stand", wave: number | undefined; let expr: any = "neutral"; // eslint-disable-line
      if (id === S.applause) { mode = "sit"; expr = "laugh"; wave = 0.6 + Math.sin(t * 8 + j) * 0.35; }
      else if (id === S.rope) { const pl = pull(f, j); x = x0 + 0.6 + (1 - pl) * 0; tilt = -0.35 * (1 - pl); y = 0; expr = pl > 0.5 ? "relief" : "shock"; x = x0 * (1 - pl) + BARN[0] * pl; }
      else if (windy) { const [dx, dy] = fly(f, j, id); x = x0 + dx; y = dy; tilt = 0.9 + Math.sin(t * 6 + j) * 0.15; expr = "shock"; wave = 0.95; }
      else expr = id === S.intro ? "grin" : "neutral";
      const zz = id === S.rope ? z0 * (1 - pull(f, j)) + (BARN[2] + 3.2) * pull(f, j) : z0;
      person(`v${j}`, VEC(j), x, y, zz, { mode, expr, facing: 0, tilt, wave }, 10 + j, y < 0.05, TALL);
      if (id === S.rope && f > W.engancha + j * 5 && pull(f, j) < 0.98) fx(`kn${j}`, 128, 128, (p: Pen) => p.ell(64, 64, 30, 30, "#c8a060", 6), x, 1.5 * TALL * 0.75, zz + 0.1, 0.18, 0.18);
    }
    // the mayor flies off
    if (id === S.sails || id === S.hook || id === S.end) { const s = id === S.sails ? smooth((f - W.alcaldesa + 10) / 30) : 0.6; person("alc", ALCALDESA, -1 + s * 5, 0.2 + s * 4.5, -1.5, { mode: "stand", expr: "shock", facing: 0, tilt: 0.9 * s, wave: 0.95 }, 2, false, TALL); }
    // Pimpín
    const calm = id === S.ground || id === S.hook || id === S.end;
    person("pim", PIMPIN, id === S.rope ? pim.x + Math.min(0, -(f - W.tira) * 0.02) : pim.x, 0, pim.z, { mode: "stand", expr: id === S.applause ? "laugh" : calm ? "whistle" : id === S.rope ? "stern" : id === S.intro ? "smile" : "nervous", facing: 0, wave: id === S.applause || (id === S.rope && f > W.tira - 4) ? 0.95 : undefined }, 1, true, PIM);
    if (id === S.intro && f > W.pimpin - 4) { fx("name", 512, 160, labelDraw("PIMPÍN", "#e2453c"), pim.x, 1.75, pim.z + 0.1, 0.7, 0.22); if (f > W.metro - 4) fx("m", 512, 200, textDraw("1,20 m", "#ffd23f", 110), pim.x, 1.45, pim.z + 0.1, 0.7, 0.27); }
    if (windy) for (let j = 0; j < 4; j++) fx(`w${j}|${(ph + j) % 6}`, 512, 256, windDraw((ph + j) % 6), -2 + j * 3.2, 2.3 + (j % 2) * 1.4, 1.2 - j * 0.6, 3.2, 1.6, true);
    if (id === S.sails && f > W.sombreros - 6) for (let j = 0; j < 3; j++) { const s = (f - W.sombreros + j * 8) * 0.06; fx(`hat${j}`, 256, 256, hatDraw, -3 + s * 2 + j, 3.0 + Math.sin(s * 2 + j) * 0.6 + s * 0.4, 1 - j * 0.8, 0.5, 0.5); }
    if (id === S.sails && f > W.bufandas - 6) for (let j = 0; j < 2; j++) { const s = (f - W.bufandas + j * 6) * 0.06; fx(`sc${j}|${ph}`, 512, 256, scarfDraw(ph), -2 + s * 2.4 + j, 2.6 + j * 0.8 + s * 0.3, 0.5 - j, 1.0, 0.5); }
    if (id === S.ground) fx("calm", 512, 200, textDraw("¡NI UNA BRISA!", "#8ae86a", 58), pim.x, 1.55, pim.z + 0.2, 0.9, 0.35);
    // rope from the well to Pimpín
    this.rope.visible = id === S.rope && f > W.ata - 4;
    if (this.rope.visible) { const A = new THREE.Vector3(5, 0.9, -3), B = new THREE.Vector3(pim.x, 0.6, pim.z + 0.1); this.rope.position.copy(A).add(B).multiplyScalar(0.5); this.rope.scale.set(1, A.distanceTo(B), 1); this.rope.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize()); }
    if (id === S.cta) { const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), pim.x, 2.6, pim.z + 0.5, 2.2, 1.1); }
  }
}
