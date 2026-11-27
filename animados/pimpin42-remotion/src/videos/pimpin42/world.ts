// Pimpín 42 · "Bailarín": the plaza statue dances; sweeping, the bread queue, a wedding; the band goes silent at the dance; Pimpín claps and the whole town (and the statue) dance.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, noteDraw } from "./props";
import { dogDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, ALCALDESA, HOGAZA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const pedDraw = (p: Pen) => { p.poly([[40, 40], [216, 40], [216, 250], [40, 250]], "#a8a49a", 7); p.poly([[20, 20], [236, 20], [236, 50], [20, 50]], "#bcb8ae", 6); };
const broomDraw = (p: Pen) => { p.band([[60, 20], [200, 380]], "#a8703a", 14, 4); p.poly([[170, 360], [250, 340], [256, 480], [190, 500]], "#e8c86a", 5); };
const sparkDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 8; j++) { const x = 60 + ((j * 131 + k * 40) % 900), y = 40 + ((j * 53) % 160); p.poly([[x, y - 24], [x + 6, y - 6], [x + 24, y], [x + 6, y + 6], [x, y + 24], [x - 6, y + 6], [x - 24, y], [x - 6, y - 6]], "#fff6a8", 3); } };
const hornDraw = (p: Pen) => p.poly([[10, 100], [200, 70], [250, 20], [250, 236], [200, 186], [10, 156]], "#e8b84a", 6);
const drumDraw = (broken: boolean) => (p: Pen) => { p.poly([[30, 60], [226, 60], [226, 220], [30, 220]], "#c8202a", 7); p.ell(128, 60, 98, 26, broken ? "#5a3a2a" : "#f4f1ea", 6); if (broken) p.line([[80, 50], [128, 70], [170, 48]], "#1a1a1e", 5, false); for (let k = 0; k < 5; k++) p.line([[30 + k * 49, 70], [55 + k * 49, 210]], "#f2c84a", 4, false); };
const chairDraw = (p: Pen) => { p.band([[70, 250], [70, 140]], "#8a5a2a", 14, 4); p.band([[186, 250], [186, 140]], "#8a5a2a", 14, 4); p.poly([[60, 130], [196, 130], [196, 150], [60, 150]], "#a8703a", 5); p.band([[186, 140], [186, 20]], "#8a5a2a", 14, 4); };
const stageDraw = (p: Pen) => { p.poly([[0, 60], [1024, 60], [1024, 256], [0, 256]], "#8a5a2a", 8); p.poly([[0, 30], [1024, 30], [1024, 70], [0, 70]], "#a8703a", 6); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const k = Math.floor(t * 6) % 8;
    const STATUE = { ...VEC(0), jacket: "#9a9aa2", pants: "#8a8a92", boots: "#8a8a92", skin: "#b8b8c0", hat: "hair", hair: "#9a9aa2", belt: null, buttons: "#9a9aa2" } as any;
    const BRIDE = { ...VEC(2), jacket: "#f4f1ea", dress: "#f4f1ea", hat: "hair", hair: "#5a3a1a" } as any;
    const dance = (key: string, o: any, x: number, y: number, z: number, i: number, s: number, ph = 0, ground = true) => { const sn = Math.sin(t * 7 + ph); person(key, o, x + sn * 0.08, y + Math.abs(Math.sin(t * 14 + ph)) * 0.1, z, { mode: "march", phase: t * 8 + ph, expr: "laugh", facing: sn > 0 ? 1 : -1, wave: 0.9 }, i, false, s); void ground; };
    const statue = (danc: boolean, x = 1.0, z = 0.0) => { fx("ped", 256, 256, pedDraw, x, 0.55, z + 0.05, 1.1, 1.1); if (danc) dance("sta", STATUE, x, 0.86, z, 20, 1.0, 1.3); else person("sta", STATUE, x, 0.86, z, { mode: "stand", expr: "neutral", facing: 0, wave: 0.9 }, 20, false, 1.0); };
    const trompeta = { ...VEC(3), jacket: "#3a5ab8", hat: "cap", cap: "#3a5ab8" } as any;
    const tambor = { ...VEC(0), jacket: "#3a5ab8", hat: "cap", cap: "#3a5ab8" } as any;
    if (id === S.hook || id === S.end) {
      const T = id === S.hook ? W.bailar : 1060;
      dance("pim", PIMPIN, -0.6, 0, 1.2, 1, PIMS);
      statue(f > T - 4, 0.9, 0.2);
      if (f > T) person("v0", VEC(4), 1.9, 0, 1.0, { mode: "stand", expr: "shock", facing: -1 }, 10, true, 1.0);
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "neutral", facing: 0 }, 10 + j, true, 1.0);
      dance("pim", PIMPIN, 0.4, 0, 2.4, 1, PIMS);
    }
    if (id === S.sweep) {
      dance("pim", PIMPIN, -0.2, 0, 1.2, 1, PIMS);
      fx("br", 256, 512, broomDraw, 0.25 + Math.sin(t * 7) * 0.08, 0.9, 1.25, 0.5, 1.0);
      if (f > W.brillando - 10) fx(`sp|${k}`, 1024, 256, sparkDraw(k), 0, 0.3, 1.6, 3.0, 0.75);
    }
    if (id === S.queue) {
      const adv = smooth((f - W.avanza + 10) / 30);
      fx("pan", 1024, 512, (p: Pen) => { p.poly([[0, 0], [1024, 0], [1024, 512], [0, 512]], "#f2e2b8", 8); p.g.fillStyle = "#8a1e26"; p.g.font = "bold 200px Arial"; p.g.textAlign = "center"; p.g.fillText("PAN", 512, 330); }, -1.4, 2.6, -0.6, 1.4, 0.7);
      for (let j = 0; j < 3; j++) person(`q${j}`, j === 0 ? HOGAZA : VEC(j + 1), -0.9 + j * 0.75 - adv * 0.75, 0, 0.6, { mode: adv > 0 && adv < 1 ? "march" : "stand", phase: t * 6, expr: adv > 0 ? "shock" : "neutral", facing: -1 }, 10 + j, true, 1.0);
      dance("pim", PIMPIN, 1.6 - adv * 0.75, 0, 0.6, 1, PIMS);
    }
    if (id === S.wedding) {
      dance("bride", BRIDE, -0.4, 0, 0.4, 3, 1.0, 0.5);
      dance("groom", { ...VEC(1), jacket: "#1a1a1e", pants: "#1a1a1e" }, 0.3, 0, 0.4, 4, 1.0, 1.0);
      dance("pim", PIMPIN, -1.2, 0, 1.4, 1, PIMS);
      if (f > W.invitados - 10) for (let j = 0; j < 3; j++) dance(`g${j}`, VEC(j + 3), 1.1 + j * 0.6, 0, 0.9 - j * 0.6, 10 + j, 1.0, j * 0.7);
    }
    const stage = () => fx("stage", 1024, 256, stageDraw, 0, 0.25, -0.6, 3.6, 0.9);
    const chairs = (sitters: boolean) => { for (let j = 0; j < 3; j++) { const x = -1.2 + j * 1.2; fx(`ch${j}`, 256, 256, chairDraw, x, 0.45, 1.45, 0.7, 0.7); if (sitters) person(`s${j}`, VEC(j + 1), x, 0.0, 1.5, { mode: "sit", expr: "neutral", facing: 0 }, 10 + j, true, 1.0); } };
    if (id === S.silent) {
      stage();
      person("tr", trompeta, -0.5, 0.45, -0.6, { mode: "stand", expr: f > W.musica ? "nervous" : "grin", facing: 0 }, 5, false, 1.0);
      person("ta", tambor, 0.6, 0.45, -0.6, { mode: "stand", expr: f > W.musica ? "nervous" : "grin", facing: 0 }, 6, false, 1.0);
      if (f < W.musica - 6) fx(`no|${k % 2}`, 256, 256, noteDraw(k), 0, 2.3 + (t % 1) * 0.2, -0.4, 0.4, 0.4);
      else fx("sil", 512, 256, bubbleDraw("..."), 0, 2.4, -0.4, 0.9, 0.45);
      chairs(f > W.silla - 20);
    }
    if (id === S.tries) {
      stage();
      chairs(true);
      if (f < 628) { person("tr", trompeta, 0.0, 0.45, -0.6, { mode: "stand", expr: f > W.pitido ? "dazed" : "stern", facing: 0, wave: 0.95 }, 5, false, 1.0); fx("hr", 256, 256, hornDraw, 0.4, 1.75, -0.5, 0.45, 0.45); if (f > W.pitido - 4) fx("pi", 512, 256, bubbleDraw("¡PIIIIII!"), 0.6, 2.6, -0.4, 1.3, 0.65); }
      else if (f < 692) { person("ta", tambor, 0.0, 0.45, -0.6, { mode: "stand", expr: f > W.rompe ? "shock" : "grin", facing: 0, wave: 0.95 }, 6, false, 1.0); fx(`dr|${f > W.rompe - 2 ? 1 : 0}`, 256, 256, drumDraw(f > W.rompe - 2), 0.0, 0.95, -0.4, 0.6, 0.6); }
      else { person("al", ALCALDESA, 0.0, 0.45, -0.6, { mode: "stand", expr: "laugh", facing: 0, wave: 0.95 }, 3, false, 1.0); fx(`no|${k % 2}`, 256, 256, noteDraw(k), 0.4, 2.3 + (t % 1) * 0.2, -0.5, 0.4, 0.4); const go = smooth((f - W.perros + 20) / 30); for (let j = 0; j < 2; j++) card(`dog${j}|${Math.floor(t * 6) % 2}`, 0.3 + j * 0.6 + go * 2.5, 2.2 - j * 0.2, 0.45, dogDraw(t * 6, go > 0 ? "walk" : "sit", j ? "akita" : "stubby"), 1, 0); }
    }
    if (id === S.fix) {
      stage();
      const up = f > W.levanta - 4, dancing = f > W.bailar2 - 4;
      const joined = (j: number) => f > W.sigue + j * 10;
      for (let j = 0; j < 3; j++) { const x = -1.2 + j * 1.2; fx(`ch${j}`, 256, 256, chairDraw, x, 0.45, 1.45, 0.7, 0.7); if (joined(j)) dance(`s${j}`, VEC(j + 1), x, 0, 1.7, 10 + j, 1.0, j); else person(`s${j}`, VEC(j + 1), x, 0, 1.5, { mode: "sit", expr: "neutral", facing: 0 }, 10 + j, true, 1.0); }
      if (dancing) dance("pim", PIMPIN, -0.6, 0, 2.3, 1, PIMS);
      else person("pim", PIMPIN, -0.6, up ? 0 : 0, up ? 2.3 : 2.3, { mode: up ? "stand" : "sit", expr: up ? "grin" : "neutral", facing: 0, wave: f > W.palmada - 4 ? 0.95 : undefined }, 1, true, PIMS);
      if ((f > W.palmada - 2 && f < W.palmada + 12) || (f > W.otra - 2 && f < W.otra + 12)) fx("plas", 512, 256, bubbleDraw("¡PLAS!", "#ffd23f"), -0.6, 2.4, 2.3, 1.0, 0.5);
      if (f > W.entero - 10) { dance("al", ALCALDESA, 0.9, 0.45, -0.6, 3, 1.0, 2); dance("tr", trompeta, -0.4, 0.45, -0.6, 5, 1.0, 3); }
      if (f > W.estatua - 20) statue(f > W.estatua - 4, 2.0, 0.4);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
