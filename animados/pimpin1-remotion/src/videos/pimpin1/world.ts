// Pimpín 1 · "La llave de oro": Villazanca square (x=0), the town gate (GATE), the tunnel inside the wall (TUN).
import * as THREE from "three";
import { Pen } from "./toon";
import { Base, Api, lam, lamC, box } from "./base";
import { rep, planksHD } from "./paint";
import { burstDraw } from "./beasts";
import { textDraw, labelDraw, ctaDraw, bubbleDraw, flatGround } from "./props";
import { villazanca, tallHouse, TALL, PIM, PIMPIN, ALCALDESA, VEC, mouseDraw, keyDraw, webDraw } from "./villa";
import { S, W, GATE, TUN, keyY, pimRun, doorA, smooth } from "./story";

const confDraw = (k: number) => (p: Pen) => { const c = ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a", "#c85ab8"]; for (let j = 0; j < 40; j++) { const x = (j * 97 + k * 31) % 512, y = (j * 61 + k * 47) % 512; p.g.fillStyle = c[j % 5]; p.g.fillRect(x, y, 14, 22); } };
const holeDraw = (p: Pen) => { p.ell(128, 160, 110, 90, "#120c0a", 6); p.poly([[18, 250], [238, 250], [238, 256], [18, 256]], "#120c0a", 0); };

export class World extends Base {
  doorL = new THREE.Group(); doorR = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    { const w2 = lam({ map: rep(planksHD(), 1, 1), color: "#a8603a" }); box(R, 1.3, 0.14, 1.2, w2, 6.0, 1.75, -6.4); for (const [dx, dz] of [[-0.55, -0.5], [0.55, -0.5], [-0.55, 0.5], [0.55, 0.5]]) box(R, 0.12, 1.75, 0.12, w2, 6.0 + dx, 0.87, -6.4 + dz); box(R, 1.3, 1.6, 0.12, w2, 6.0, 2.6, -7.0); }
    // the town wall and its great gate at GATE (wall along x, face at z = GATE[2])
    const G0 = GATE[0], gz = GATE[2], stone = lam({ map: rep(planksHD(), 8, 3), color: "#b8a890" });
    box(R, 16, 10, 2, stone, G0 - 11, 5, gz - 1); box(R, 16, 10, 2, stone, G0 + 11, 5, gz - 1); box(R, 6.4, 2.5, 2, stone, G0, 8.75, gz - 1);
    for (let k = 0; k < 12; k++) box(R, 1.2, 1.0, 2, stone, G0 - 18 + k * 3.3, 10.5, gz - 1);
    flatGround(R, 44, 18, "#c8b896", G0, gz + 7, 0.01);
    const wood = lam({ map: rep(planksHD(), 1, 3), color: "#8a5a32" });
    this.doorL.position.set(G0 - 3, 0, gz); this.doorR.position.set(G0 + 3, 0, gz); R.add(this.doorL, this.doorR);
    box(this.doorL, 3, 7.5, 0.3, wood, 1.5, 3.75, 0); box(this.doorR, 3, 7.5, 0.3, wood, -1.5, 3.75, 0);
    tallHouse(R, G0 - 14, gz + 12, 5.4, "#e8c890", "#a8402a", -1); tallHouse(R, G0 + 14, gz + 12, 5.4, "#c8d8b0", "#5a4a52", -1);
    // tunnel inside the wall: dark stone corridor along x, 1.6 m high
    const T0 = TUN[0], dark = lamC("#4a3e36");
    box(R, 30, 0.2, 3, dark, T0, -0.1 + 0.01, 0); box(R, 30, 0.3, 3, dark, T0, 1.75, 0); box(R, 30, 1.8, 0.3, lamC("#5a4a40"), T0, 0.9, -1.4);
    for (let k = 0; k < 10; k++) box(R, 0.4, 1.8, 0.4, lamC("#3a302a"), T0 - 14 + k * 3.2, 0.9, -1.2);
  }
  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const da = doorA(f); this.doorL.rotation.y = -da; this.doorR.rotation.y = da;
    const crowd = (n: number, x0: number, z0: number, expr: "grin" | "laugh" | "shock" | "neutral" | "nervous", wave = false) => { for (let k = 0; k < n; k++) person(`v${k}`, VEC(k), x0 - 5 + (k % 7) * 1.6 + (Math.floor(k / 7) % 2) * 0.8, 0, z0 - Math.floor(k / 7) * 1.4, { mode: "stand", expr, facing: 0, wave: wave ? 0.6 + Math.sin(t * 6 + k) * 0.3 : undefined }, 10 + k, true, TALL); };
    if (id === S.hook || id === S.end) {
      crowd(14, 0, -1.0, "neutral");
      person("pim", PIMPIN, 0.3, 0, 1.2, { mode: "stand", expr: "smile", facing: 0, wave: 0.8 }, 1, true, PIM);
    }
    if (id === S.intro) {
      const x = 3;
      person("pim", PIMPIN, x - 0.4, 0, -7.6, { mode: "stand", expr: f > W.metro - 4 ? "nervous" : "neutral", facing: 0, wave: 0.95 }, 1, true, PIM);
      if (f > W.pimpin - 4) fx("name", 512, 160, labelDraw("PIMPÍN", "#e2453c"), x - 0.4, 2.15, -7.5, 0.7, 0.22);
      if (f > W.metro - 4) fx("m", 512, 200, textDraw("1,20 m", "#ffd23f", 110), x - 0.4, 1.8, -7.4, 0.7, 0.27);
      fx("kn", 128, 128, (p: Pen) => p.ell(64, 64, 40, 40, "#e8c45a", 6), x + 0.5, 2.4, -7.95, 0.18, 0.18);
    }
    if (id === S.abajo) {
      person("g1", VEC(0), -0.6, 0, 0.0, { mode: "stand", expr: "grin", facing: 1, tilt: 0.12 }, 2, true, TALL);
      person("g2", VEC(3), 1.6, 0, -0.4, { mode: "stand", expr: "laugh", facing: -1, tilt: -0.1 }, 3, true, TALL);
      person("pim", PIMPIN, 0.5, 0, 0.6, { mode: "stand", expr: "nervous", facing: 0 }, 1, true, PIM);
      fx("bub", 512, 256, bubbleDraw("¿AHÍ ABAJO?"), 0.4, 3.9, 0.2, 1.4, 0.7);
    }
    const G0 = GATE[0], gz = GATE[2];
    if (id === S.fiesta || id === S.drop || id === S.crouch || id === S.out || id === S.open) {
      const shock = id === S.drop || id === S.crouch;
      if (id !== S.out) crowd(14, id === S.open ? G0 : G0 + 6.5, id === S.open ? gz + 7 : gz + 5, id === S.open ? "laugh" : shock ? "shock" : "grin", id === S.fiesta || id === S.open);
      person("alc", ALCALDESA, G0 - 1.2, 0, gz + 2.2, { mode: id === S.crouch ? "sit" : "stand", expr: shock ? "shock" : id === S.out ? "relief_open" : "grin", facing: 0, wave: id === S.fiesta || id === S.open ? 0.95 : undefined }, 2, true, TALL);
      fx("hole", 256, 256, holeDraw, G0 + 4.6, 0.32, gz + 0.02, 0.7, 0.7);
      if (id === S.fiesta || (id === S.drop && f < W.cae)) fx("key", 512, 192, keyDraw, G0 - 0.5, 3.7, gz + 2.6, 1.0, 0.37);
      if (id === S.drop && f >= W.cae && f < 515) { const [kx, ky] = keyY(f); fx(`key|${Math.round(f / 3) % 4}`, 512, 192, (p: Pen) => { p.g.translate(256, 96); p.g.rotate(f * 0.4); p.g.translate(-256, -96); keyDraw(p); }, G0 - 0.6 + kx, ky, gz + 2.0 - kx * 0.3, 0.5, 0.19); }
      if (id === S.crouch) for (let k = 0; k < 2; k++) person(`c${k}`, VEC(k + 4), G0 + 3.4 + k * 2.2, 0, gz + 1.0, { mode: "sit", expr: "nervous", facing: -1 }, 4 + k, true, TALL);
      if (id === S.out) {
        person("pim", PIMPIN, G0 + 4.6 + pimRun(f), 0, gz + 0.6, { mode: "march", phase: t * 3, expr: "laugh", facing: 1, wave: 0.95 }, 1, true, PIM);
        fx("k2", 512, 192, keyDraw, G0 + 4.9 + pimRun(f), 1.45, gz + 0.8, 0.5, 0.19);
        for (let k = 0; k < 6; k++) person(`v${k}`, VEC(k), G0 + 1 + k * 1.5, 0, gz + 4 + (k % 2), { mode: "stand", expr: "shock", facing: 0, wave: 0.9 }, 10 + k, true, TALL);
        if (f > W.llave2 - 4) fx("ok", 512, 200, textDraw("¡LA LLAVE!", "#ffd23f", 96), G0 + 5.2 + pimRun(f), 2.0, gz + 0.8, 1.1, 0.43);
      }
      if (id === S.open) {
        const sh = f > W.hombros - 6;
        person("car", VEC(1), G0 + 0.4, 0, gz + 3.2, { mode: "stand", expr: "laugh", facing: 0, wave: 0.95 }, 3, true, TALL);
        person("pim", PIMPIN, G0 + 0.4, sh ? 2.15 : 0, gz + (sh ? 3.35 : 3.9), { mode: "stand", expr: "laugh", facing: 0, wave: 0.95 }, 1, true, PIM);
        if (f > W.abre + 6) fx(`conf|${Math.floor(t * 8) % 4}`, 512, 512, confDraw(Math.floor(t * 8) % 4), G0, 5 - ((t * 2) % 2), gz + 1.5, 6, 6, true);
      }
    }
    if (id === S.tunnel) {
      const T0 = TUN[0], px = T0 + (f - W.espera) * 0.035;
      person("pim", PIMPIN, px, 0, 0.3, { mode: f > W.raton - 4 ? "march" : "stroll", phase: t * (f > W.raton - 4 ? 3.2 : 1.6), expr: f > W.raton - 4 ? "shock" : "nervous", facing: 1 }, 1, true, PIM);
      for (let k = 0; k < 5; k++) fx(`web${k}`, 256, 256, webDraw, T0 - 12 + k * 6, 1.5, -1.2, 1.2, 1.2);
      if (f > W.raton - 4) card(`mouse|${Math.floor(t * 6) % 2}`, px - 2.0 + Math.min(0.6, (f - W.raton) * 0.02), 0.3, 1.0, (p: Pen) => { p.g.translate(744, 1000); p.g.scale(1.6, 1.6); mouseDraw(Math.floor(t * 6) % 2 / 2)(p); }, 1, 0);
      fx("glow", 256, 256, (p: Pen) => p.ell(128, 128, 120, 120, "#fff3b0", 0), T0 + 13, 0.9, 0, 1.6, 1.6, true);
    }
    if (id === S.cta) {
      person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIM);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1);
    }
    void burstDraw;
  }
}
