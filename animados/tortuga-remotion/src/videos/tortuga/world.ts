// "Jonathan": a warm golden-hour lawn on Saint Helena, the governor's house behind, the Atlantic all around.
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { grassGround, seaPlane, palm, tree, house, labelDraw, planeDraw, heartDraw, medalDraw, ctaDraw, exDraw } from "./props";
import { tortoiseDraw, xDraw, moonDraw, starsDraw } from "./extra";
import { smooth } from "./story";
import { S, W } from "./story";

const VET: Outfit = { jacket: "#e8eef2", pants: "#3a5a7a", boots: "#2a2a2a", hat: "hair", hair: "#5a3a2a", skin: SKINS[1], belt: null, buttons: "#c8c0b0" };
const bananaDraw = (p: Pen) => { p.band([[40, 120], [90, 190], [170, 200], [220, 150]], "#ffd83a", 44, 7, "round"); p.stroke([[220, 150], [236, 132]], 10, "#5a4a2a"); };
const bulbDraw = (p: Pen) => { p.ell(128, 100, 70, 74, "#fff27a", 7); p.poly([[100, 160], [156, 160], [150, 210], [106, 210]], "#a8a8b0", 6); };
const phoneDraw = (p: Pen) => { p.poly([[60, 120], [196, 120], [210, 220], [46, 220]], "#2a2a30", 7); p.band([[50, 110], [80, 60], [176, 60], [206, 110]], "#2a2a30", 30, 6); p.ell(128, 170, 30, 30, "#e8e8e8", 5); };
const carSmall = (p: Pen) => { p.poly([[30, 170], [60, 120], [110, 90], [170, 90], [210, 130], [230, 170]], "#c8323a", 7); p.ell(80, 180, 26, 26, "#2a2a30", 6); p.ell(190, 180, 26, 26, "#2a2a30", 6); };
const iconX = (draw: (p: Pen) => void, crossed: number) => (p: Pen) => { draw(p); if (crossed > 0.5) xDraw(p); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    seaPlane(R, -0.6, "#2a7ab8");
    const lawn = new THREE.Mesh(new THREE.CylinderGeometry(40, 46, 0.62, 40), lamC("#7aa84a")); lawn.position.y = -0.33; R.add(lawn);
    grassGround(R, "#d8c87a").scale.set(0.012, 1, 0.012);
    house(R, -5, -18, 9, 4, 5, "#f2ead8", "#5a4a52");
    for (const [x, z, s] of [[-12, -6, 1.1], [7, -8, 1.3], [12, -3, 1], [-9, 4, 0.9], [9, 6, 1.2]] as const) palm(R, x, z, s);
    for (const [x, z] of [[-16, -12], [16, -14], [3, -16]] as const) tree(R, x, z, 1.3, "#3a6a2a");
    box(R, 30, 0.6, 0.15, lamC("#e8e0d0"), 0, 0.3, -6);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const tort = (key: string, x: number, z: number, dir: number, mood: "calm" | "wide" | "happy" | "lid", neck = 0, chew = false, walk = false, sc = 0.6) => {
      const ph = walk ? t * 3 : 0;
      card(`tort|${key}|${mood}|${Math.round(neck * 4)}|${chew ? Math.round(t * 6) % 2 : 0}|${walk ? Math.round(t * 6) % 8 : 0}`, x, z, sc, tortoiseDraw(ph, neck, mood, chew && Math.round(t * 6) % 2 === 1), dir);
    };
    if (id === S.hook || id === S.end) {
      tort("j", 0, 0, 1, f < 30 ? "wide" : "lid", 0.5 + 0.2 * Math.sin(t * 2), true);
      if (id === S.end && f > W.suscribete - 4 && f < W.doscientos - 6) { const pr = smooth((f - W.suscribete) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0.25, 1.02, 0.6, 0.62, 0.31); }
    }
    if (id === S.island) tort("j", 0, 0, 1, "lid", 0.3, false, true);
    if (id === S.born) {
      tort("j", 0, 0, 1, "lid", 0.2);
      const items: [number, (p: Pen) => void, number][] = [[W.bombilla, bulbDraw, -0.35], [W.telefono, phoneDraw, 0.25], [W.coches, carSmall, 0.85]];
      for (const [k, [w, d, x]] of items.entries()) if (f > w - 4) fx(`it${k}|${f > w + 8 ? 1 : 0}`, 256, 256, iconX(d, f > w + 8 ? 1 : 0), x, 1.55, 0.4, 0.42, 0.42);
    }
    if (id === S.history) {
      tort("j", 0, 0, 1, "lid", f > W.hierba - 6 ? 0 : 0.3, f > W.hierba - 6);
      if (f > W.guerras - 6 && f < W.avion - 4) fx("war", 512, 160, labelDraw("2 GUERRAS MUNDIALES", "#6a5a4a"), 0.4, 1.7, 0.3, 1.2, 0.38);
      if (f > W.avion - 4 && f < W.luna - 4) card("plane", -1.2 + (f - W.avion) * 0.06, -1.0, 0.35, planeDraw(0), 1, 0, 1.3);
      if (f > W.luna - 4 && f < W.hierba - 6) { fx("stars", 1024, 512, starsDraw, 0.4, 1.8, -1.0, 2.6, 1.3); fx("moon", 256, 256, moonDraw, 0.9, 1.8, -0.9, 0.6, 0.6); }
    }
    if (id === S.vet) {
      tort("j", 0, 0, 1, "lid", 0.6, f > W.platanos + 6);
      person("vet", VET, 1.15, 0, 0.1, { mode: "stand", expr: "smile", facing: -1, wave: f > W.vet - 4 ? 0.7 : undefined }, 2);
      if (f > W.platanos - 4) fx("ban", 256, 256, bananaDraw, 1.0, 0.85, 0.2, 0.28, 0.28);
    }
    if (id === S.love) {
      const shock = f > W.macho - 4;
      tort("j", -0.6, 0, 1, shock ? "wide" : "happy", 0.4);
      tort("fred", 1.4, -0.1, -1, shock ? "happy" : "calm", 0.4, false, false, 0.55);
      if (!shock && f > W.frederica - 6) fx(`heart|${Math.round(t * 4) % 2}`, 256, 256, heartDraw, 0.4, 1.2 + 0.05 * Math.sin(t * 6), 0.2, 0.35 + 0.04 * (Math.round(t * 4) % 2), 0.35);
      if (f > W.descubrieron - 4 && !shock) fx("q", 256, 256, exDraw, 0.4, 1.3, 0.2, 0.35, 0.35);
    }
    if (id === S.record) {
      tort("j", 0, 0, 1, "happy", 0.5);
      if (f > W.terrestre - 4) fx("medal", 256, 384, medalDraw("1º"), 0.5, 1.4, 0.4, 0.45, 0.68);
    }
  }
}
