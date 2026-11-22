// Pimpín 2 · "Súper fuerte": the plaza (x = 0) and the village gate at G (rock comes from the hill at -z).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { textDraw, ctaDraw, bubbleDraw } from "./props";
import { villazanca, PIMPIN, VEC, tallHouse } from "./villa";
import { S, W, G, rockAt, smooth } from "./story";

export const PIMS = 1.1;
const STRONG: Outfit = { ...PIMPIN, build: "stout" };
const ALCALDE: Outfit = { jacket: "#2a2a3a", pants: "#2a2a3a", boots: "#111", hat: "tophat", skin: SKINS[1], moustache: "#5a3a1a", belt: null, sash: "#c8202a", buttons: "#e8c45a", build: "stout" };
const doorDraw = (p: Pen) => { p.poly([[40, 10], [216, 10], [216, 500], [40, 500]], "#7a4a24", 8); for (const y of [60, 280]) p.poly([[66, y], [190, y], [190, y + 170], [66, y + 170]], "#8e5a2e", 5); p.ell(190, 260, 12, 12, "#e8c45a", 4); };
const jarDraw = (p: Pen) => { p.poly([[70, 60], [186, 60], [196, 240], [60, 240]], "#9ad8a0", 7); p.poly([[64, 30], [192, 30], [192, 64], [64, 64]], "#d8302a", 6); for (const [x, y] of [[100, 120], [150, 160], [110, 200]]) p.ell(x, y, 16, 36, "#4a8a2a", 3); };
const tableDraw = (broken: boolean) => (p: Pen) => { const top = "#b07a40", leg = "#8a5a2a"; if (!broken) { p.poly([[20, 60], [492, 60], [492, 100], [20, 100]], top, 7); p.poly([[50, 100], [80, 100], [80, 250], [50, 250]], leg, 5); p.poly([[432, 100], [462, 100], [462, 250], [432, 250]], leg, 5); } else { p.poly([[20, 120], [236, 60], [246, 100], [30, 160]], top, 7); p.poly([[276, 60], [492, 120], [482, 160], [266, 100]], top, 7); p.poly([[50, 150], [80, 140], [80, 250], [50, 250]], leg, 5); p.poly([[432, 140], [462, 150], [462, 250], [432, 250]], leg, 5); p.poly([[246, 70], [258, 40], [266, 76]], "#fff27a", 3); } };
const donkeyDraw = (p: Pen) => { p.ell(250, 150, 130, 70, "#8a8a92", 7); for (const x of [160, 200, 300, 340]) p.poly([[x, 190], [x + 22, 190], [x + 22, 290], [x, 290]], "#7a7a82", 5); p.poly([[360, 120], [420, 40], [470, 70], [470, 130], [390, 160]], "#8a8a92", 7); p.poly([[420, 40], [410, 0], [432, 34]], "#7a7a82", 4); p.poly([[440, 46], [446, 4], [460, 44]], "#7a7a82", 4); p.ell(448, 76, 7, 7, "#1a1010", 0); p.ell(468, 118, 14, 10, "#c8c8cc", 3); p.band([[122, 140], [96, 200]], "#5a5a62", 8, 0); };
const confDraw = (k: number) => (p: Pen) => { const c = ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a", "#c85ab8"]; for (let j = 0; j < 36; j++) { p.g.fillStyle = c[j % 5]; p.g.fillRect((j * 97 + k * 31) % 512, (j * 61 + k * 47) % 512, 12, 20); } };

export class World extends Base {
  rock: THREE.Mesh;
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    tallHouse(R, -35, -3, 6, "#e8c890", "#c8502a", 1); box(R, 20, 0.1, 20, lamC("#c8b896"), -35, -0.05, 4);
    const x0 = G[0], stone = lamC("#9a948a"), dark = lamC("#6a645a");
    box(R, 40, 0.1, 40, lamC("#b8a878"), x0, -0.05, 0);
    for (const s of [-1, 1]) { box(R, 2.4, 7, 2.4, stone, x0 + s * 3.0, 3.5, 0); box(R, 14, 5, 1.6, stone, x0 + s * 11.0, 2.5, 0); for (let k = 0; k < 3; k++) box(R, 0.8, 0.8, 2.5, dark, x0 + s * 3.0 + (k - 1) * 0.8, 7.4, 0); }
    box(R, 3.8, 1.4, 1.8, stone, x0, 5.6, 0);
    const hill = new THREE.Mesh(new THREE.ConeGeometry(30, 22, 7), lamC("#6a9a4a")); hill.position.set(x0 - 4, 11, -45); R.add(hill);
    const snow = new THREE.Mesh(new THREE.ConeGeometry(8.2, 6, 7), lamC("#f4f4f8")); snow.position.set(x0 - 4, 19.1, -45); R.add(snow);
    this.rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.9, 0), lamC("#7a7268")); R.add(this.rock);
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const ph = Math.floor(t * 8) % 4, x0 = G[0];
    const r = rockAt(f); this.rock.position.set(r[0], r[1], r[2]); this.rock.rotation.set(r[3], r[3] * 0.4, r[3] * 0.2); this.rock.scale.setScalar(r[4]);
    const plaza = id === S.hook || id === S.end || id === S.ja || id === S.five;
    if (plaza) {
      const five = id === S.five;
      for (let j = 0; j < 10; j++) { const x = -5 + (j % 5) * 2.5, z = -1 + Math.floor(j / 5) * 2.0; const away = five ? smooth((f - W.nadie) / 20) * Math.sign(x || 1) * 1.5 : 0; person(`v${j}`, VEC(j), x + away, 0, z, { mode: "stand", expr: five ? "nervous" : id === S.ja ? "laugh" : "smile", facing: 0, wave: id === S.ja ? 0.5 + Math.sin(t * 7 + j) * 0.4 : undefined }, 10 + j, true, 1.0); }
      const lift = id === S.hook || id === S.end;
      person("pim", STRONG, 0.2, 0, 3.2, { mode: "stand", expr: five ? "nervous" : lift ? "grin" : "smile", facing: 0, wave: lift || (five && f > W.nadie) ? 0.98 : undefined }, 1, true, PIMS);
      if (lift) fx("cart", 512, 256, tableDraw(false), 0.2, 2.3 + Math.sin(t * 3) * 0.05, 3.2, 1.6, 0.8);
      if (five && f > W.choca - 4) fx("cin", 512, 256, bubbleDraw("¿CHOCA ESOS CINCO?"), 0.8, 2.6, 3.0, 1.1, 0.55);
    }
    if (id === S.flex) {
      person("pim", STRONG, 0.2, 0, 3.2, { mode: "stand", expr: "grin", facing: 0, wave: 0.98, tilt: Math.sin(t * 4) * 0.05 }, 1, true, PIMS);
      if (f > W.verdad - 6) fx("fv", 1024, 256, textDraw("¡DE VERDAD!", "#ffd23f", 150), 0.2, 2.9, 3.0, 1.6, 0.4);
    }
    if (id === S.door) {
      // house at x=-9, z=-11, door 3.7 m tall at its front
      const got = f > W.mano - 10, px = -35.4;
      person("pim", STRONG, px, 0, 1.6, { mode: "stand", expr: got ? "shock" : "smile", facing: 0, wave: got ? 0.9 : undefined }, 1, true, PIMS);
      if (!got) fx("door", 256, 512, doorDraw, -35, 1.85, 0.08, 1.5, 3.7); else { fx("hole", 256, 512, (p: Pen) => p.poly([[40, 10], [216, 10], [216, 500], [40, 500]], "#1a1410", 0), -35, 1.85, 0.07, 1.5, 3.7); fx("door2", 256, 512, doorDraw, px + 0.9, 1.9, 1.9, 1.5, 3.7); }
      if (f < W.mano - 10 && f > W.llama) fx(`knock${Math.floor(f / 8) % 2}`, 512, 200, textDraw(Math.floor(f / 8) % 2 ? "TOC" : "TOC TOC", "#ffffff", 90), -34.4, 2.6, 0.6, 0.8, 0.31);
    }
    if (id === S.jar) {
      const broke = f > W.mesa - 16;
      person("pim", STRONG, 0.6, 0, 3.6, { mode: "stand", expr: broke ? "shock" : "stern", facing: 0, wave: broke ? 0.8 : undefined }, 1, true, PIMS);
      fx(broke ? "tb" : "ta", 512, 256, tableDraw(broke), -0.3, 0.55, 3.8, 1.6, 0.8);
      fx("jar", 256, 256, jarDraw, broke ? 0.9 : -0.3, broke ? 1.6 : 1.25, 3.9, 0.4, 0.4);
      if (broke) fx("crk", 512, 200, textDraw("¡CRAC!", "#ff6a3a", 110), -0.3, 1.9, 4.0, 0.9, 0.35);
    }
    if (id === S.shake) {
      const fly = smooth((f - W.vuela) / 24), fx0 = 1.2, fy = fly > 0 && fly < 1 ? Math.sin(fly * Math.PI) * 4 : 0;
      person("pim", STRONG, 0, 0, 3.4, { mode: "stand", expr: f > W.vuela ? "shock" : "smile", facing: 1, wave: f < W.vuela ? 0.5 : 0.9 }, 1, true, PIMS);
      person("alc", ALCALDE, fx0 + (5 - fx0) * fly, fy + (fly >= 1 ? 0.2 : 0), 3.4 + (-3 - 3.4) * fly, { mode: fly > 0 ? "fall" : "stand", expr: fly > 0 ? "shock" : "grin", facing: -1, tilt: fly * 6 }, 3, fly === 0, 1.0);
      if (f > W.fuente - 4) fx("chof", 512, 200, textDraw("¡CHOF!", "#8ad8ff", 120), 5, 2.4, -3, 1.4, 0.55);
    }
    if (id === S.rock || id === S.push || id === S.pim || id === S.throw) {
      if (id === S.rock && f < W.tapa - 20) fx(`conf|${ph}`, 512, 512, confDraw(ph), x0, 4.5 - ((t * 1.5) % 1.5), 4, 9, 9, true);
      const pushing = id === S.push, nv = pushing ? (f > W.veinte - 4 ? 8 : 5) : id === S.rock ? 6 : 6;
      for (let j = 0; j < nv; j++) { const side = j % 2 ? 1 : -1, k = Math.floor(j / 2); const x = pushing ? x0 + side * (0.4 + k * 0.6) : x0 + side * (2.2 + k * 1.2), z = pushing ? 3.2 + (j % 3) * 0.2 : 4.5 + (j % 3) * 0.8; person(`g${j}`, VEC(j), x, 0, z, { mode: pushing ? "march" : "stand", phase: t * 3 + j, expr: pushing ? "pained" : id === S.rock && f < W.tapa - 10 ? "laugh" : id === S.throw ? "shock" : "nervous", facing: pushing ? (side > 0 ? -1 : 1) : 0, tilt: pushing ? -0.25 : 0 }, 10 + j, true, 1.0); }
      if (pushing && f > W.burro - 4) fx("don", 512, 320, donkeyDraw, x0 + 0.6, 0.75, 3.6, 1.7, 1.06);
      if (pushing && f > W.nada - 3) fx("nada", 512, 200, textDraw("NADA", "#ff3b3b", 130), x0, 3.4, 3.4, 1.4, 0.55);
      if (id === S.pim || id === S.throw) {
        const walk = smooth((f - W.llega + 10) / 28);
        const ppx = x0 + 3 - 3 * walk + (id === S.throw ? 0 : 0);
        person("pim", STRONG, id === S.throw ? x0 - 0.6 : ppx, 0, 3.4, { mode: id === S.pim && walk < 1 ? "march" : "stand", phase: t * 3, expr: id === S.throw ? "grin" : f > W.respira - 4 && f < W.aparta ? "relief_open" : "stern", facing: id === S.pim && walk < 1 ? -1 : f > W.aparta - 6 && f < W.aparta + 30 ? 1 : 0, wave: id === S.throw && f < W.lanza + 10 ? 1.0 : undefined }, 1, true, PIMS);
        if (id === S.pim && f > W.remanga - 4 && f < W.respira) fx("rem", 512, 200, textDraw("*se remanga*", "#ffffff", 80), x0 + 0.4, 2.6, 3.4, 1.1, 0.43);
        if (false) fx("dedo", 1024, 256, textDraw("¡CON UN DEDO!", "#ffd23f", 110), x0 + 0.8, 3.0, 3.4, 2.0, 0.5);
        if (false) fx("nc", 1024, 256, textDraw("...TODAVÍA NO HA CAÍDO", "#ffffff", 80), x0 + 2.0, 5.2, 1.0, 2.6, 0.65);
      }
    }
    if (id === S.cta) { person("pim", STRONG, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
