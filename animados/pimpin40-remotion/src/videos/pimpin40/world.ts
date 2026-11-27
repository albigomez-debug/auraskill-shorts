// Pimpín 40 · "Risa contagiosa": chairs fall over laughing; class, mass and doctor; a grumpy neighbouring mayor; Pimpín laughs and he explodes laughing and signs the peace.
import { Pen } from "./toon";
import { Base, Api } from "./base";
import { ctaDraw, bubbleDraw, noteDraw, docDraw } from "./props";
import { villazanca, PIMPIN, VEC, KIDV, ALCALDESA, ESTIRADO } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const chairDraw = (tilt: number) => (p: Pen) => { p.g.save(); p.g.translate(128, 250); p.g.rotate(tilt * 1.4); p.g.translate(-128, -250); p.band([[70, 250], [70, 140]], "#8a5a2a", 14, 4); p.band([[186, 250], [186, 140]], "#8a5a2a", 14, 4); p.poly([[60, 130], [196, 130], [196, 150], [60, 150]], "#a8703a", 5); p.band([[186, 140], [186, 20]], "#8a5a2a", 14, 4); p.poly([[150, 20], [196, 20], [196, 100], [150, 100]], "#a8703a", 5); p.g.restore(); };
const burstDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 10; j++) { const a = j * Math.PI / 5 + k * 0.3; p.band([[128 + Math.cos(a) * 60, 128 + Math.sin(a) * 60], [128 + Math.cos(a) * 118, 128 + Math.sin(a) * 118]], j % 2 ? "#ffd23f" : "#ff8a4a", 12, 3); } };
const deskDraw = (p: Pen) => { p.poly([[0, 20], [512, 20], [512, 70], [0, 70]], "#a8703a", 6); p.band([[40, 70], [40, 200]], "#7a5030", 14, 4); p.band([[470, 70], [470, 200]], "#7a5030", 14, 4); };
const lecternDraw = (p: Pen) => { p.poly([[40, 40], [216, 20], [196, 90], [60, 100]], "#7a4a2a", 6); p.poly([[100, 100], [156, 100], [150, 400], [106, 400]], "#8a5a2a", 6); };
const stormDraw = (k: number, big: number) => (p: Pen) => { p.ell(256, 120, 160 + big * 60, 70 + big * 20, "#4a4a58", 6); p.ell(160, 140, 90, 60, "#4a4a58", 6); p.ell(360, 140, 90, 60, "#4a4a58", 6); if (k % 2) p.poly([[250, 190], [220, 260], [250, 255], [230, 320], [290, 230], [258, 236], [280, 190]], "#ffd23f", 4); };
const cakeDraw = (p: Pen) => { p.poly([[30, 200], [226, 200], [216, 100], [40, 100]], "#f49ac0", 6); p.ell(128, 100, 88, 20, "#f4f1ea", 5); p.ell(128, 74, 12, 12, "#d8302a", 3); };
const steamDraw = (p: Pen) => { for (const x of [60, 196]) p.line([[x, 240], [x - 20, 180], [x + 10, 120], [x - 10, 60]], "#f4f1ea", 12, false); };

export class World extends Base {
  constructor() { super(); villazanca(this.root); }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const k = Math.floor(t * 8) % 8;
    const shake = (amp = 0.03) => Math.sin(t * 40) * amp;
    const burst = (x: number, y: number, z: number, s = 0.8) => fx(`bu|${k}`, 256, 256, burstDraw(k), x, y, z, s, s);
    const cura = { ...VEC(1), jacket: "#1a1a1e", pants: "#1a1a1e", hat: "hair", hair: "#8a8a8a" } as any;
    const medico = { ...VEC(4), jacket: "#f4f1ea", hat: "hair", hair: "#5a3a2a" } as any;
    const profe = { ...VEC(4), jacket: "#6a5a8a", hat: "hair", hair: "#5a3a2a" } as any;
    const vecino = { ...ESTIRADO, jacket: "#3a3a5a" } as any;
    if (id === S.hook || id === S.end) {
      const T = id === S.hook ? W.caido : 1080;
      person("pim", PIMPIN, -0.6 + shake(0.02), 0, 1.2, { mode: "stand", expr: "laugh", facing: 1, wave: 0.9 }, 1, true, PIMS);
      burst(-0.6, 1.9, 1.15, 0.9);
      for (let j = 0; j < 3; j++) { const tl = smooth((f - T + 10 - j * 5) / 10); fx(`ch${j}|${Math.round(tl * 6)}`, 256, 256, chairDraw(tl * (j % 2 ? -1 : 1)), 0.1 + j * 0.6, 0.5, 1.2 - j * 0.3, 1.0, 1.0); }
    }
    if (id === S.premise) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -5 + j * 1.4 + (j > 3 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "stern", facing: 0 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.4, 0, 2.4, { mode: "stand", expr: "laugh", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.school) {
      const all = f > W.clase - 6, pr = f > W.profe - 4;
      for (let j = 0; j < 3; j++) { const isP = j === 1; person(isP ? "pim" : `k${j}`, isP ? PIMPIN : KIDV(j), -1.2 + j * 1.2, 0, 1.4, { mode: "sit", expr: isP || all ? "laugh" : "neutral", facing: 0 }, isP ? 1 : 10 + j, true, isP ? PIMS : 1.0); fx(`d${j}`, 512, 200, deskDraw, -1.2 + j * 1.2, 0.4, 1.7, 0.9, 0.35); }
      person("pro", profe, 0.4, 0, 0.0, { mode: pr ? "fall" : "stand", expr: pr ? "laugh" : "stern", facing: 0 }, 5, true, 1.0);
      if (pr) burst(0.4, 1.8, 0.0, 0.9);
    }
    if (id === S.mass) {
      fx("lec", 256, 512, lecternDraw, 0.3, 0.6, 0.8, 0.6, 1.2);
      person("cu", cura, 0.3 + shake(f > W.cura ? 0.03 : 0), 0, 0.4, { mode: "stand", expr: f > W.cura ? "laugh" : "stern", facing: 0, wave: f > W.cura ? 0.95 : undefined }, 4, true, 1.0);
      person("pim", PIMPIN, -1.0, 0, 1.4, { mode: "sit", expr: "laugh", facing: 1 }, 1, true, PIMS);
      if (f > W.cura) burst(0.3, 2.0, 0.4, 0.8);
    }
    if (id === S.doctor) {
      person("me", medico, 0.6, 0, 0.8, { mode: "stand", expr: "laugh", facing: -1, wave: f > W.alta - 10 ? 0.95 : undefined }, 4, true, 1.0);
      person("pim", PIMPIN, -0.6, 0, 1.2, { mode: "stand", expr: "laugh", facing: 1 }, 1, true, PIMS);
      if (f > W.alta - 6) fx("alta", 512, 640, docDraw("ALTA", "¡CURADO!"), 0.2, 1.4, 1.0, 0.6, 0.75);
    }
    const storm = (x: number, z: number, big: number) => fx(`st|${k % 2}|${Math.round(big * 4)}`, 512, 384, stormDraw(k, big), x, 2.55 + big * 0.1, z, 1.2 + big * 0.4, 0.9 + big * 0.3);
    if (id === S.arrive) {
      const w = smooth((f - 405) / 60);
      person("ve", vecino, 2.0 - w * 1.4, 0, 0.8, { mode: w < 1 ? "stroll" : "stand", phase: t * 4, expr: "stern", facing: w < 1 ? -1 : 0 }, 3, true, 1.0);
      if (f > W.enfado - 10) storm(0.6, 0.7, 0);
      if (f > 450 && f < 500) fx("paz", 512, 640, docDraw("TRATADO DE PAZ"), -0.3, 1.3, 1.0, 0.6, 0.75);
    }
    if (id === S.tries) {
      const angry = f > W.enfada - 4 ? 1 : 0;
      person("ve", vecino, 0.7 + shake(angry * 0.03), 0, 0.8, { mode: "stand", expr: angry ? "pained" : "stern", facing: -1, wave: f > W.oidos - 6 && f < 640 ? 0.95 : undefined }, 3, true, 1.0);
      storm(0.7, 0.7, angry);
      if (angry) fx(`stm|${k % 2}`, 256, 256, steamDraw, 0.7, 2.0, 0.75, 0.6, 0.6);
      if (f < 580) { person("v0", VEC(2), -0.7, 0, 1.0, { mode: "stand", expr: f > W.nada ? "nervous" : "grin", facing: 1, wave: 0.95 }, 10, true, 1.0); fx("cake", 256, 256, cakeDraw, -0.25, 1.4, 1.1, 0.45, 0.45); }
      else if (f < 645) { person("v1", VEC(5), -0.7, 0, 1.0, { mode: "stand", expr: "laugh", facing: 1 }, 11, true, 1.0); fx(`n|${k % 2}`, 256, 256, noteDraw(k), -0.3, 2.1 + (t % 1) * 0.2, 1.0, 0.4, 0.4); }
      else { person("al", ALCALDESA, -0.7, 0, 1.0, { mode: "stand", expr: angry ? "nervous" : "laugh", facing: 1, wave: angry ? undefined : 0.95 }, 4, true, 1.0); if (f > W.chiste - 10 && f < W.enfada) fx("ch", 512, 256, bubbleDraw("¿SABES EL DEL PATO?"), -0.15, 2.5, 1.0, 1.6, 0.8); }
    }
    if (id === S.fix) {
      const near = smooth((f - W.acerca) / 24);
      const hold = f > W.aguanta - 4 && f < W.explota - 2, boom = f > W.explota - 2;
      person("ve", vecino, 0.7 + (hold ? shake(0.04) : 0), 0, 0.8, { mode: f > W.parar - 20 ? "fall" : "stand", expr: boom ? "laugh" : hold ? "nervous" : "stern", facing: -1, wave: boom ? 0.95 : undefined }, 3, true, 1.0);
      if (!boom) storm(0.7, 0.7, hold ? 0.5 : 0.3);
      else burst(0.7, 2.0, 0.85, 1.0 + Math.sin(t * 10) * 0.1);
      person("pim", PIMPIN, -1.6 + near * 1.3, 0, 1.0, { mode: near > 0 && near < 1 ? "stroll" : "stand", phase: t * 4, expr: f > W.rie - 2 ? "laugh" : f > W.mira - 4 ? "smile" : "grin", facing: 1 }, 1, true, PIMS);
      if (f > W.firma - 6 && f < 1000) fx("paz", 512, 640, docDraw("TRATADO DE PAZ", "¡FIRMADO!"), 0.3, 1.0, 1.1, 0.6, 0.75);
      if (f > W.firma) person("al", ALCALDESA, 1.6, 0, 1.0, { mode: "stand", expr: "relief_open", facing: -1, wave: 0.95 }, 4, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
