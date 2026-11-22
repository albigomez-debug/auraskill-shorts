// Pimpín 3 · "Súper flaco": all in the plaza. Long table at z = 3, lamp post at LP, drain grate at GR.
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { textDraw, ctaDraw, bubbleDraw } from "./props";
import { catDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA, keyDraw } from "./villa";
import { S, W, LP, GR, smooth } from "./story";

export const PIMS = 1.12;
const THIN: Outfit = { ...PIMPIN, build: "thin" };
const ABUELA: Outfit = { jacket: "#8a6a9a", pants: "#4a3a4a", boots: "#2a1a1a", hat: "hair", hair: "#e8e8ec", skin: SKINS[0], dress: "#8a6a9a", belt: null };
const plateDraw = (n: number) => (p: Pen) => { p.ell(128, 170, 118, 50, "#f4f4f8", 7); if (n > 0) for (let k = 0; k < n; k++) { const x = 40 + ((k * 53) % 176), y = 130 + ((k * 31) % 50); p.band([[x, y], [x + 22, y - 8]], "#f2b84a", 14, 3); } else p.band([[110, 160], [146, 152]], "#f2b84a", 14, 3); };
const macDraw = (p: Pen) => p.band([[40, 160], [128, 110], [216, 160]], "#f2b84a", 46, 6);
const windDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 9; j++) { const y = 40 + j * 52, x = ((j * 137 + k * 90) % 700) - 200; p.band([[x, y], [x + 200, y - 8], [x + 300, y]], "#ffffff", 7, 0); } };
const broomDraw = (p: Pen) => { p.poly([[118, 0], [138, 0], [138, 380], [118, 380]], "#a8743a", 5); p.poly([[70, 380], [186, 380], [210, 510], [46, 510]], "#e8c86a", 6); };
const sockDraw = (p: Pen) => { p.poly([[90, 20], [170, 20], [170, 170], [220, 210], [200, 250], [100, 230], [90, 170]], "#e8e4d8", 7); p.poly([[90, 40], [170, 40], [170, 60], [90, 60]], "#d8302a", 0); p.poly([[90, 80], [170, 80], [170, 100], [90, 100]], "#3a6ab8", 0); };
const frogDraw = (p: Pen) => { p.ell(128, 170, 90, 60, "#5ab83a", 7); p.ell(88, 100, 30, 30, "#5ab83a", 6); p.ell(168, 100, 30, 30, "#5ab83a", 6); p.ell(88, 100, 12, 14, "#1a1a1a", 0); p.ell(168, 100, 12, 14, "#1a1a1a", 0); p.band([[90, 180], [128, 196], [166, 180]], "#2a5a1a", 6, 0); };
const confDraw = (k: number) => (p: Pen) => { const c = ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a", "#c85ab8"]; for (let j = 0; j < 36; j++) { p.g.fillStyle = c[j % 5]; p.g.fillRect((j * 97 + k * 31) % 512, (j * 61 + k * 47) % 512, 12, 20); } };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const wood = lamC("#b07a40"), cloth = lamC("#f4f1ea");
    box(R, 8, 0.08, 1.2, cloth, 0, 0.82, 3.0); for (const x of [-3.7, 3.7]) for (const z of [2.6, 3.4]) box(R, 0.12, 0.8, 0.12, wood, x, 0.4, z);
    const iron = lamC("#2a2a30");
    box(R, 0.18, 4.2, 0.18, iron, LP[0], 2.1, LP[2]); box(R, 0.7, 0.5, 0.7, lamC("#f2e48a"), LP[0], 4.4, LP[2]); box(R, 0.8, 0.12, 0.8, iron, LP[0], 4.7, LP[2]);
    box(R, 1.6, 0.03, 1.2, lamC("#0a0a0c"), GR[0], 0.015, GR[2]);
    for (let k = 0; k < 7; k++) box(R, 0.06, 0.06, 1.2, iron, GR[0] - 0.72 + k * 0.24, 0.05, GR[2]);
    box(R, 1.7, 0.08, 0.08, iron, GR[0], 0.05, GR[2] - 0.6); box(R, 1.7, 0.08, 0.08, iron, GR[0], 0.05, GR[2] + 0.6);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const ph = Math.floor(t * 8) % 4;
    if (id === S.hook || id === S.ja || id === S.end) {
      for (let j = 0; j < 8; j++) { const x = -3.2 + j * 0.9; if (Math.abs(x) < 0.5) continue; person(`v${j}`, { ...VEC(j), build: "stout" }, x, 0, 2.2, { mode: "stand", expr: id === S.ja ? "laugh" : j % 2 ? "lick" : "grin", facing: 0, tilt: Math.sin(t * 9 + j) * 0.06 }, 10 + j, true, 1.0); fx(`pl${j}`, 256, 256, plateDraw(9), x, 0.95, 3.1, 0.55, 0.55); }
      person("pim", THIN, 0, 0, 2.2, { mode: "stand", expr: id === S.ja ? "nervous" : "smile", facing: 0 }, 1, true, PIMS);
      fx("plp", 256, 256, plateDraw(0), 0, 0.95, 3.1, 0.55, 0.55);
      if (id === S.ja) fx("jaja", 512, 200, textDraw("¡JA, JA, JA!", "#ffd23f", 80), 0, 2.9, 2.6, 1.3, 0.5);
    }
    if (id === S.side) {
      const turn = f > W.lado - 4, gone = f > W.desaparece - 2;
      if (!gone) person("pim", THIN, 0, 0, 5.5, { mode: "stand", expr: "smile", facing: turn ? 1 : 0 }, 1, true, PIMS);
      if (gone) fx("q", 512, 256, bubbleDraw("¿PIMPÍN?"), 0, 2.0, 5.5, 1.0, 0.5);
    }
    if (id === S.wind) {
      const blow = smooth((f - W.viento + 6) / 12);
      person("pim", THIN, LP[0] + 0.25 + blow * 0.9, 1.1 * blow, LP[2], { mode: blow > 0.5 ? "fall" : "stand", expr: "shock", facing: 1, tilt: blow * 1.35 + Math.sin(t * 14) * 0.08 * blow }, 1, false, PIMS);
      fx(`w|${ph}`, 1024, 512, windDraw(ph), LP[0] + 0.8, 1.8, LP[2] + 0.6, 4, 2, true);
      if (f > W.atan - 4) fx("rope", 512, 64, (p: Pen) => p.band([[0, 32], [512, 32]], "#c8a06a", 22, 5), LP[0] + 0.25, 1.2, LP[2] + 0.12, 0.5, 0.07);
    }
    if (id === S.hide) {
      fx("broom", 256, 512, broomDraw, 0.35, 1.25, 5.75, 0.5, 2.5);
      person("pim", THIN, 0.4, 0, 5.5, { mode: "stand", expr: "whistle", facing: 1 }, 1, true, PIMS);
      person("seek", VEC(2), -1.0, 0, 5.5, { mode: "stand", expr: f > W.gana - 6 ? "shock" : "stern", facing: f > W.gana - 6 ? 0 : -1 }, 3, true, 1.0);
      if (f > W.gana - 4) fx("gana", 512, 200, textDraw("¡GANA!", "#8ae86a", 120), 0.0, 2.8, 5.5, 1.2, 0.47);
      if (f < W.gana - 6) fx("cnt", 512, 200, textDraw("...8, 9, 10", "#ffffff", 80), -1.0, 2.5, 5.5, 1.0, 0.4);
    }
    if (id === S.mac) {
      person("abu", ABUELA, -1.0, 0, 3.6, { mode: "stand", expr: "smile", facing: 1 }, 3, true, 0.95);
      person("pim", THIN, 0.9, 0, 2.2, { mode: "stand", expr: f > W.come - 4 && f < W.uno2 ? "lick" : "smile", facing: 0 }, 1, true, PIMS);
      const left = f > W.uno2 - 4;
      for (let k = 0; k < 3; k++) fx(`mp${k}`, 256, 256, plateDraw(left ? 9 : 9), -0.6 + k * 0.6, 0.95, 3.1, 0.55, 0.55);
      if (f > W.uno1 - 6) fx("mac", 256, 256, macDraw, 0.9, 1.3, 2.55, 0.3, 0.3);
      if (false) fx("one", 1024, 256, textDraw("UN MACARRÓN", "#ffd23f", 120), 0.4, 2.7, 2.6, 1.4, 0.35);
    }
    if (id === S.key) {
      const fall = smooth((f - W.cae + 4) / 14), into = smooth((f - W.rejilla + 4) / 12);
      person("alc", ALCALDESA, GR[0] - 0.9, 0, GR[2] - 0.4, { mode: "stand", expr: f > W.cae - 2 ? "shock" : "grin", facing: 1, wave: f > W.cae - 2 ? 0.9 : 0.4 }, 3, true, 1.0);
      if (into < 1) fx("key", 512, 192, keyDraw, GR[0] - 0.4 + 0.4 * fall, 1.3 - 1.2 * fall - 0.6 * into, GR[2], 0.6, 0.22);
      if (f > W.rejilla) fx("plink", 512, 200, textDraw("¡PLINC!", "#ffd23f", 100), GR[0] + 0.2, 1.4, GR[2] + 0.4, 1.0, 0.4);
    }
    if (id === S.nobody) {
      const kid = f < W.gato1 - 4, cat1 = f >= W.gato1 - 4 && f < W.gato2 - 6;
      if (kid) person("kid", KIDV(1), GR[0], 0, GR[2] + 0.1, { mode: "stand", expr: "pained", facing: 0, tilt: Math.sin(t * 10) * 0.1 }, 3, true, 0.8);
      if (cat1) card("cat1", GR[0], GR[2], 0.42, catDraw(0, "sit", false, "#e8a24a"), 1, 0);
      if (!kid && !cat1) card("cat2", GR[0], GR[2], 0.42, catDraw(0, "sit", false, "#9a9aa2"), 1, 0);
      for (let j = 0; j < 4; j++) person(`w${j}`, VEC(j + 3), GR[0] - 2.2 + j * 1.45 + (j > 1 ? 1.4 : 0), 0, GR[2] - 1.6, { mode: "stand", expr: "nervous", facing: 0 }, 10 + j, true, 1.0);
      if (f > W.nadie - 4 && kid) fx("no1", 512, 200, textDraw("NO CABE", "#ff3b3b", 110), GR[0], 2.2, GR[2] + 0.4, 1.1, 0.43);
    }
    if (id === S.slip) {
      const turn = f > W.lado2 - 6, sink = smooth((f - W.cuela + 2) / 24);
      person("pim", THIN, GR[0], -2.4 * sink, GR[2], { mode: "stand", expr: sink > 0 ? "grin" : "smile", facing: turn ? 1 : 0 }, 1, sink === 0, PIMS);
      for (let j = 0; j < 4; j++) person(`w${j}`, VEC(j + 3), GR[0] - 2.2 + j * 1.45 + (j > 1 ? 1.4 : 0), 0, GR[2] - 1.6, { mode: "stand", expr: sink > 0.5 ? "shock" : "nervous", facing: 0 }, 10 + j, true, 1.0);
      if (f > W.carta - 4) fx("post", 1024, 256, textDraw("¡COMO UNA CARTA!", "#ffd23f", 110), GR[0], 2.6, GR[2], 2.0, 0.5);
    }
    if (id === S.out) {
      const up = smooth((f - (W.sale - 12)) / 18);
      person("pim", THIN, GR[0], -2.4 * (1 - up), GR[2], { mode: "stand", expr: "laugh", facing: 0, wave: 0.95 }, 1, up >= 1, PIMS);
      if (f > W.llave2 - 4) fx("key2", 512, 192, keyDraw, GR[0] + 0.45, 2.3 - 2.4 * (1 - up), GR[2] + 0.2, 0.55, 0.2);
      if (f > W.calcetin - 4) fx("sock", 256, 256, sockDraw, GR[0] - 0.55, 1.4, GR[2] + 0.25, 0.4, 0.4);
      if (f > W.rana - 4) fx("frog", 256, 256, frogDraw, GR[0], 2.15 + Math.abs(Math.sin(t * 6)) * 0.08, GR[2] + 0.05, 0.36, 0.36);
      for (let j = 0; j < 4; j++) person(`w${j}`, VEC(j + 3), GR[0] - 2.2 + j * 1.45 + (j > 1 ? 1.4 : 0), 0, GR[2] - 1.6, { mode: "stand", expr: "laugh", facing: 0, wave: f > W.llave2 ? 0.7 : undefined }, 10 + j, true, 1.0);
      if (f > W.llave2) fx(`conf|${ph}`, 512, 512, confDraw(ph), GR[0], 4 - ((t * 1.5) % 1.5), GR[2] + 0.5, 7, 7, true);
      if (false) fx("20", 1024, 256, textDraw("(DE HACE 20 AÑOS)", "#ffffff", 80), GR[0] - 0.4, 0.9, GR[2] + 0.6, 1.6, 0.4);
    }
    if (id === S.cta) { person("pim", THIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
    void THREE;
  }
}
