// Pimpín 31 · "Imitador": barks, meows, teacher, school bell; rooster loses its voice; Pimpín crows from a roof.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, zDraw, bubbleDraw, signDraw } from "./props";
import { dogDraw, catDraw, chickenDraw } from "./beasts";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA, mouseDraw } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const ROO = "#d8603a";
const hornDraw = (p: Pen) => p.poly([[10, 100], [200, 70], [250, 20], [250, 236], [200, 186], [10, 156]], "#e8b84a", 6);
const megaDraw = (p: Pen) => p.poly([[10, 100], [160, 80], [250, 10], [250, 246], [160, 176], [10, 156]], "#e8e8f0", 6);
const handBell = (p: Pen) => { p.poly([[80, 60], [176, 60], [220, 220], [36, 220]], "#c8a03a", 6); p.ell(128, 236, 24, 20, "#6a4a1a", 4); p.band([[128, 10], [128, 60]], "#5a3a1a", 16, 4); };
const roofDraw = (p: Pen) => { p.poly([[0, 500], [512, 90], [1024, 500]], "#a8402a", 10); p.poly([[120, 500], [904, 500], [904, 1000], [120, 1000]], "#e8d8b8", 10); for (const x of [220, 640]) p.poly([[x, 620], [x + 160, 620], [x + 160, 780], [x, 780]], "#7ab0e8", 6); p.poly([[700, 220], [780, 220], [780, 120], [700, 120]], "#7a4a3a", 6); };
const deskDraw = (p: Pen) => { p.poly([[0, 20], [512, 20], [512, 70], [0, 70]], "#a8703a", 6); p.band([[40, 70], [40, 200]], "#7a5030", 14, 4); p.band([[470, 70], [470, 200]], "#7a5030", 14, 4); };
const boardDraw = (p: Pen) => { p.poly([[0, 0], [1024, 0], [1024, 512], [0, 512]], "#2a4a3a", 12); p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 120px Arial"; p.g.textAlign = "center"; p.g.fillText("2 + 2 = 4", 512, 300); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    const granjero = { ...VEC(5), jacket: "#5a7a3a", hat: "straw" } as any;
    const cura = { ...VEC(1), jacket: "#1a1a1e", pants: "#1a1a1e", hat: "hair", hair: "#8a8a8a" } as any;
    const profe = { ...VEC(4), jacket: "#6a5a8a", hat: "hair", hair: "#5a3a2a" } as any;
    const rooster = (x: number, z: number, y = 0, k = "roo") => card(k, x, z, 0.4, chickenDraw(0, false, ROO, "wide"), -1, 0, y);
    const sleepers = (awake: boolean, wave = false) => { for (let j = 0; j < 4; j++) { const x = -2.0 + j * 1.3; person(`s${j}`, VEC(j + 1), x, 0, 1.0 - (j % 2) * 0.6, { mode: awake ? "stand" : "sit", expr: awake ? (wave ? "laugh" : "shock") : "neutral", facing: 0, wave: wave ? 0.9 : undefined }, 10 + j, true, 1.0); if (!awake) fx(`z${j}|${Math.floor(t * 2 + j) % 2}`, 256, 256, zDraw, x + 0.35, 1.9 + ((t + j * 0.3) % 1) * 0.2, 1.1 - (j % 2) * 0.6, 0.35, 0.35); } };
    if (id === S.hook || id === S.end) {
      const g0 = id === S.hook ? W.ladrado : 1060;
      person("pim", PIMPIN, -0.6, 0, 1.4, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      if (f > g0 - 8) fx("guau", 512, 256, bubbleDraw("¡GUAU!"), -0.4, 2.5, 1.5, 1.5, 0.75);
      for (let j = 0; j < 4; j++) { const on = f > g0 + 14 + j * 6; card(`dog${j}|${on ? Math.floor(t * 6) % 2 : 0}`, 0.5 + j * 0.7, 0.9 - j * 0.9, 0.44, dogDraw(t * 3, on ? "bark" : "sit", j % 2 ? "akita" : "stubby"), -1, 0); if (on) fx(`gb${j}`, 512, 256, bubbleDraw("¡GUAU!"), 0.6 + j * 0.7, 1.2 + j * 0.25, 1.0 - j * 0.9, 1.0, 0.5); }
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "nervous", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "grin", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.cat) {
      person("pim", PIMPIN, -0.3, 0, 1.4, { mode: "stand", expr: "grin", facing: 1 }, 1, true, PIMS);
      if (f > W.gato - 6) fx("miau", 512, 256, bubbleDraw("¡MIAU!"), -0.1, 2.5, 1.5, 1.5, 0.75);
      const run = smooth((f - W.esconde + 10) / 20);
      card(`mouse|${Math.floor(t * 8) % 2}`, 0.9 + run * 0.5, 1.8, 0.34, mouseDraw(t * 6, false), run > 0 ? 1 : -1, 0);
      if (f > W.esconde + 12) fx("ex", 512, 256, bubbleDraw("¡SOCORRO!"), 1.0, 1.0, 1.9, 1.0, 0.5);
    }
    if (id === S.teacher) {
      fx("board", 1024, 512, boardDraw, 0, 2.2, -1.2, 3.0, 1.5);
      person("pim", PIMPIN, -1.4, 0, 1.0, { mode: "stand", expr: "stern", facing: 1, wave: f > 280 ? 0.95 : undefined }, 1, true, PIMS);
      if (f > 268) fx("sil", 512, 256, bubbleDraw("¡A SENTARSE!"), -0.5, 2.6, 1.1, 1.6, 0.8);
      const sat = f > W.sienta - 2;
      for (let j = 0; j < 3; j++) { person(`k${j}`, KIDV(j), 0.0 + j * 1.0, 0, 1.6, { mode: sat ? "sit" : "march", phase: t * 4, expr: sat ? "shock" : "laugh", facing: 0 }, 10 + j, true, 1.0); if (sat) fx(`d${j}`, 512, 200, deskDraw, 0.0 + j * 1.0, 0.4, 1.9, 0.9, 0.35); }
      person("pro", profe, 1.6, 0, 0.2, { mode: "stand", expr: "dazed", facing: -1 }, 5, true, 1.0);
    }
    if (id === S.bell) {
      person("pim", PIMPIN, -0.8, 0, 1.4, { mode: "stand", expr: "laugh", facing: 1 }, 1, true, PIMS);
      fx(`rr|${Math.floor(t * 10) % 2}`, 512, 256, bubbleDraw("¡RIIIING!"), -0.5 + Math.sin(t * 60) * 0.03, 2.5, 1.5, 1.6, 0.8);
      const go = smooth((f - W.recreo + 14) / 30);
      for (let j = 0; j < 4; j++) person(`k${j}`, KIDV(j), 0.4 + j * 0.6 + go * 3, 0, 0.6 + (j % 2) * 0.6, { mode: go > 0 ? "march" : "stand", phase: t * 5 + j, expr: "laugh", facing: 1, wave: 0.9 }, 10 + j, true, 1.0);
    }
    if (id === S.rooster) {
      fx("roof", 1024, 1000, roofDraw, 0.6, 1.4, -1.0, 3.0, 2.9);
      rooster(0.6, -0.7, 2.6);
      if (f > 420 && f < 470) fx(`cof|${Math.floor(t * 4) % 2}`, 512, 256, bubbleDraw("...cof"), 1.2, 3.5, -0.6, 1.0, 0.5);
      if (f > W.feria - 4) fx("feria", 1024, 512, signDraw(["FERIA", "HOY"]), -0.1, 1.0, 2.2, 1.0, 0.5);
      if (f > W.despierta - 10) sleepers(false);
    }
    if (id === S.tries) {
      sleepers(false);
      if (f < 605) { person("gr", granjero, 1.4, 0, 2.0, { mode: "stand", expr: f > 590 ? "nervous" : "grin", facing: -1 }, 4, true, 1.0); fx("horn", 256, 256, hornDraw, 1.0, 1.5, 2.1, 0.5, 0.5); if (f > W.corneta - 4) fx("tu", 512, 256, bubbleDraw("¡TU-TUUU!"), 0.8, 2.6, 2.1, 1.3, 0.65); }
      else if (f < 676) { person("cu", cura, 1.4, 0, 2.0, { mode: "stand", expr: f > 655 ? "nervous" : "grin", facing: -1, wave: 0.95 }, 5, true, 1.0); fx("hb", 256, 256, handBell, 1.4 + Math.sin(t * 30) * 0.08, 2.4, 2.1, 0.4, 0.4); if (f > W.campanas - 4) fx("din", 512, 256, bubbleDraw("¡DING DONG!"), 0.8, 2.7, 2.1, 1.3, 0.65); }
      else { person("al", ALCALDESA, 1.4, 0, 2.0, { mode: "stand", expr: f > W.gallo2 ? "dazed" : "stern", facing: -1 }, 3, true, 1.0); fx("mega", 256, 256, megaDraw, 0.95, 1.6, 2.1, 0.5, 0.5); if (f > W.megafono - 4) fx("des", 512, 256, bubbleDraw("¡DESPERTAD!"), 0.8, 2.7, 2.1, 1.4, 0.7); if (f > W.gallo2 - 4) { rooster(-0.6, 1.8, 0, "roo2"); fx("ex2", 512, 256, bubbleDraw("¿EH?"), -0.6, 1.0, 1.9, 0.8, 0.4); } }
    }
    if (id === S.roof || id === S.crow) {
      fx("roof", 1024, 1000, roofDraw, 0, 1.9, -1.0, 4.0, 3.8);
      const up = id === S.roof ? smooth((f - W.tejado + 30) / 34) : 1;
      const breath = id === S.roof && f > W.aire - 4 && f < W.boca ? 1.06 : 1.0;
      person("pim", PIMPIN, 0.2, up * 3.2, -1.15, { mode: up > 0 && up < 1 ? "march" : "stand", phase: t * 4, expr: f > W.boca - 2 ? "laugh" : f > W.aire - 4 ? "nervous" : "grin", facing: 0, wave: f > W.boca - 2 ? 0.95 : undefined }, 1, up < 0.05, PIMS * breath);
      if (id === S.crow) {
        if (f < 950) fx(`qq|${Math.floor(t * 8) % 2}`, 512, 256, bubbleDraw("¡QUIQUIRIQUÍ!", "#ffd23f"), 0.2 + Math.sin(t * 50) * 0.03, 5.4, -0.6, 2.4, 1.2);
        const awake = f > W.ventanas - 4;
        if (f > 900) sleepers(awake, f > W.feria2 - 4);
        if (f > W.feria2 - 4) fx("feria", 1024, 512, signDraw(["FERIA", "¡A SU HORA!"]), -0.2, 2.9, 0.4, 1.3, 0.65);
        if (f > 990) { rooster(1.5, 1.2, 0, "roo3"); if (f > W.autografo - 4) fx("aut", 512, 256, bubbleDraw("¿ME FIRMAS?"), 1.3, 1.2, 1.3, 1.2, 0.6); }
      }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
    void catDraw;
  }
}
