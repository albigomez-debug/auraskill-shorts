// Pimpín 37 · "Nadador": a pond band in front (z ZP) hides what is under water; ducks, coins, a tiny bathtub; a boat with three kids drifts off; Pimpín pushes it back.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, coinDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA } from "./villa";
import { S, W, ZP, smooth } from "./story";

export const PIMS = 1.1;
const pondDraw = (k: number) => (p: Pen) => { p.poly([[0, 0], [1024, 0], [1024, 256], [0, 256]], "#3a8ac8", 0); p.poly([[0, 0], [1024, 0], [1024, 30], [0, 30]], "#6ab4e8", 0); for (let j = 0; j < 9; j++) { const x = ((j * 131 + k * 30) % 1100) - 40, y = 60 + (j % 4) * 45; p.line([[x, y], [x + 30, y - 10], [x + 60, y]], "#9ad4ff", 6, false); } };
const backDraw = (p: Pen) => p.poly([[0, 0], [1024, 0], [1024, 256], [0, 256]], "#4a9ad4", 0);
const duckDraw = (p: Pen) => { p.ell(128, 170, 80, 46, "#f4f1ea", 6); p.ell(190, 110, 36, 34, "#f4f1ea", 6); p.poly([[220, 108], [256, 118], [220, 126]], "#f2a02a", 4); p.ell(196, 102, 6, 6, "#1a1a1e", 0); };
const tubDraw = (p: Pen) => { p.poly([[40, 60], [472, 60], [440, 220], [72, 220]], "#f4f1ea", 8); p.ell(256, 64, 216, 22, "#9ad4ff", 6); p.band([[100, 220], [90, 250]], "#c8a03a", 10, 3); p.band([[412, 220], [422, 250]], "#c8a03a", 10, 3); };
const boatDraw = (p: Pen) => { p.poly([[20, 40], [1004, 40], [880, 230], [144, 230]], "#a8602a", 8); p.band([[30, 60], [994, 60]], "#f4f1ea", 12, 0); };
const broomDraw = (p: Pen) => { p.band([[60, 20], [200, 380]], "#a8703a", 14, 4); p.poly([[170, 360], [250, 340], [256, 480], [190, 500]], "#e8c86a", 5); };
const ringDraw = (p: Pen) => { p.ell(128, 128, 100, 100, "#e2453c", 8); p.ell(128, 128, 50, 50, "#3a8ac8", 6); for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + 0.6; p.band([[128 + Math.cos(a) * 60, 128 + Math.sin(a) * 60], [128 + Math.cos(a) * 96, 128 + Math.sin(a) * 96]], "#f4f1ea", 22, 0); } };
const rockDraw = (p: Pen) => p.poly([[30, 250], [60, 110], [150, 60], [230, 120], [250, 250]], "#8a8a8a", 7);
const goggDraw = (p: Pen) => { p.band([[20, 64], [236, 64]], "#1a1a1e", 10, 0); p.ell(80, 64, 42, 34, "#9ad4ff", 7); p.ell(176, 64, 42, 34, "#9ad4ff", 7); };
const splashDraw = (p: Pen) => { for (let k = 0; k < 7; k++) { const a = Math.PI + k * Math.PI / 6; p.ell(256 + Math.cos(a) * 160, 200 + Math.sin(a) * 140, 22, 30, "#9ad4ff", 4); } };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const k = Math.floor(t * 4) % 8;
    const pond = () => { fx(`pond|${k}`, 1024, 256, pondDraw(k), 0, 0.4, ZP, 9, 0.8); fx("back", 1024, 256, backDraw, 0, 0.05, -1.6, 12, 0.6); };
    const swim = (key: string, x: number, z: number, dive = 0, gog = false) => { person(key, PIMPIN, x, -0.28 - dive * 1.2, z, { mode: "stroll", phase: t * 6, expr: "grin", facing: 1, wave: 0.9 }, 1, false, PIMS); if (gog && dive < 0.3) fx("gog", 256, 128, goggDraw, x + 0.02, 1.0 - dive * 1.2, z + 0.05, 0.4, 0.2); };
    const duck = (key: string, x: number, z: number, s = 0.6) => fx(key, 256, 256, duckDraw, x, 0.95 + Math.sin(t * 4 + x) * 0.02, z, s, s);
    const barquero = { ...VEC(3), jacket: "#3a5ab8", hat: "cap", cap: "#f4f1ea" } as any;
    if (id === S.hook || id === S.end) {
      pond();
      const s = smooth((f - (id === S.hook ? 0 : 953)) / 90);
      swim("pim", -2.2 + s * 3.6, 0.0);
      fx(`sp|${k % 2}`, 512, 256, splashDraw, -2.6 + s * 3.6, 0.75, 0.05, 0.8, 0.4);
      for (let j = 0; j < 2; j++) person(`v${j}`, VEC(j), -1.7 + j * 3.4, 0, 1.6, { mode: "stand", expr: "shock", facing: 0 }, 10 + j, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "nervous", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.ducks) {
      pond();
      const x = -1.2 + (f - 150) * 0.018;
      swim("pim", x, 0.0);
      for (let j = 0; j < 3; j++) duck(`d${j}`, x - 0.6 - j * 0.45, -0.1 - j * 0.1);
      if (f > W.patos + 8) fx("cl", 512, 256, bubbleDraw("¡CUAC! ¡CUAC!"), x - 1.0, 1.4, -0.1, 1.2, 0.6);
    }
    if (id === S.coins) {
      pond();
      const up = smooth((f - W.bucea - 6) / 18), down = f < W.bucea + 4 ? smooth((f - 228) / 10) : 1 - up;
      swim("pim", 0, 0.0, down);
      if (f > W.monedas - 6) for (let j = 0; j < 3; j++) fx(`c${j}`, 256, 256, coinDraw("1"), -0.3 + j * 0.3, 2.0 + Math.sin(t * 5 + j) * 0.04, 0.1, 0.25, 0.25);
    }
    if (id === S.bath) {
      fx("tub", 512, 256, tubDraw, 0, 0.45, 1.6, 1.0, 0.5);
      person("pim", PIMPIN, 0, 0.1, 1.4, { mode: "sit", expr: f > W.banera + 10 ? "nervous" : "grin", facing: 0 }, 1, false, PIMS);
      if (f > W.banera + 10) fx("pq", 512, 256, bubbleDraw("...PEQUEÑA"), 0.4, 1.7, 1.4, 1.0, 0.5);
    }
    const boat = (x: number, kidsExpr: string, kidsY = 0.05) => { fx("boat", 1024, 256, boatDraw, x, 0.95, 0.15, 1.8, 0.45); for (let j = 0; j < 3; j++) person(`k${j}`, KIDV(j), x - 0.5 + j * 0.5, kidsY, 0.0, { mode: "stand", expr: kidsExpr as any, facing: 0, wave: kidsExpr === "shock" ? 0.95 : undefined }, 10 + j, false, 1.0); };
    if (id === S.boat) {
      pond();
      const drift = smooth((f - W.suelta) / 70);
      boat(-1.4 + drift * 1.4, f > W.suelta ? "shock" : "laugh");
      if (f > W.centro - 4) fx("ay", 512, 256, bubbleDraw("¡SOCORRO!"), 0.0, 2.0, 0.0, 1.3, 0.65);
    }
    if (id === S.tries) {
      pond();
      if (f < 595) boat(0, "shock");
      if (f < 535) { person("ba", barquero, -1.0, 0, 1.6, { mode: "stand", expr: f > W.nada ? "nervous" : "stern", facing: 1, wave: 0.95 }, 4, true, 1.0); fx("br", 256, 512, broomDraw, -0.5 + Math.sin(t * 6) * 0.1, 1.0, 1.4, 0.5, 1.0); }
      else if (f < 595) { person("ba", barquero, -1.0, 0, 1.6, { mode: "stand", expr: f > W.pato ? "shock" : "grin", facing: 1, wave: 0.95 }, 4, true, 1.0); const th = smooth((f - W.flotador + 4) / 14); const away = smooth((f - W.pato + 6) / 20); fx("ring", 256, 256, ringDraw, -0.8 + th * 1.0 + away * 0.7, 1.4 + Math.sin(Math.PI * th) * 0.5 - th * 0.55, 0.3, 0.45, 0.45); if (f > W.pato - 10) duck("dk", 0.6 + away * 0.7, 0.2, 0.6); }
      else { boat(0, "shock"); const wade = smooth((f - W.agua + 18) / 30); fx("rock", 256, 256, rockDraw, 1.2, 0.85, 0.25, 0.7, 0.7); person("al", ALCALDESA, 1.8 - wade * 0.6, -wade * 0.25 + (f > W.piedra - 6 ? 0.45 : 0), 0.9 - wade * 0.6, { mode: f > W.piedra - 6 ? "sit" : "stand", expr: f > W.piedra ? "dazed" : "nervous", facing: -1 }, 3, false, 1.0); }
    }
    if (id === S.fix) {
      pond();
      const push = smooth((f - W.empuja) / 40);
      boat(-push * 1.8, f > W.secos - 6 ? "laugh" : "shock", f > W.secos - 4 ? 0.3 : 0.05);
      fx("rock", 256, 256, rockDraw, 1.2, 0.85, 0.25, 0.7, 0.7);
      const res = smooth((f - W.rescata) / 30);
      person("al", ALCALDESA, 1.2 - res * 2.4, res > 0.95 ? 0 : 0.2, res > 0.95 ? 1.6 : 0.3, { mode: res > 0 && res < 1 ? "stand" : "sit", expr: res > 0.9 ? "relief_open" : "dazed", facing: 0 }, 3, res > 0.95, 1.0);
      if (f < W.tira) { person("pim", PIMPIN, -0.8, 0, 1.4, { mode: "stand", expr: "stern", facing: 0 }, 1, true, PIMS); if (f > W.gafas - 6) fx("gog", 256, 128, goggDraw, -0.78, 1.62, 1.46, 0.4, 0.2); }
      else if (f < W.empuja - 4) { const d = smooth((f - W.tira) / 16); person("pim", PIMPIN, -0.8 + d * 0.8, 1.0 - d * 2.0, 1.4 - d * 1.2, { mode: "stand", expr: "stern", facing: 0 }, 1, false, PIMS); if (d > 0.6) fx(`spl|${k % 2}`, 512, 256, splashDraw, 0, 0.7, 0.3, 1.2, 0.6); }
      else if (f < W.rescata - 10) swim("pim", 0.9 - push * 1.8, -0.1, 0, true);
      else swim("pim", 1.0 - res * 2.4, 0.4, 0, true);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
