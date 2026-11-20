// "Onoda": the jungle (x = 0), the 1944 army camp (CAMP) and the 1974 welcome in Tokyo (TOKYO).
import * as THREE from "three";
import { Pen, Outfit, SKINS, WG } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { grassGround, palm, tree, house, docDraw, textDraw, flagDraw, exDraw } from "./props";
import { S, W, CAMP, TOKYO } from "./story";

const ONODA = (old: boolean): Outfit => ({ jacket: old ? "#7a7050" : "#8a7a4a", pants: old ? "#6a6040" : "#7a6a40", boots: "#3a2a20", hat: "cap", cap: old ? "#6a6040" : "#7a6a3a", skin: SKINS[1], belt: "#5a4024", rifle: true, beard: old ? "#3a3a3a" : undefined, moustache: old ? "#3a3a3a" : undefined });
const OFFICER: Outfit = { jacket: "#7a6a40", pants: "#6a5a38", boots: "#2a2020", hat: "cap", cap: "#6a5a30", skin: SKINS[1], buttons: "#e8c45a", sword: true, moustache: "#2a2a2a", belt: "#5a4024", build: "stout" };
const BOSS_OLD: Outfit = { jacket: "#3a3a44", pants: "#3a3a44", boots: "#1a1a1e", hat: "hair", hair: "#e8e8e8", skin: SKINS[1], belt: null, buttons: "#c8c0b0" };
const SUZUKI: Outfit = { jacket: "#c8423a", pants: "#3a4a6a", boots: "#5a3a2a", hat: "hair", hair: "#1a1a1a", skin: SKINS[1], belt: null };
const FOLK = (v: number): Outfit => ({ jacket: ["#3a5a8a", "#8a3a3a", "#5a5a5a", "#c8a03a"][v % 4], pants: "#2a2a34", boots: "#1a1a1e", hat: v % 3 ? "hair" : "cap", hair: "#1a1a1a", cap: "#2a2a34", skin: SKINS[1] });
const japan = flagDraw(["#f4f1ea"], false, (p) => p.ell(256, 159, 80, 80, "#c8202a", 0));
const planeDraw = (k: number) => (p: Pen) => {
  const G = WG, y = G - 700;
  p.poly([[300, y - 60], [1500, y - 80], [1700, y - 20], [1500, y + 60], [300, y + 40]], "#9aa2aa", 12);
  p.poly([[800, y - 10], [1050, y - 10], [900, y + 260], [760, y + 260]], "#8a929a", 10);
  p.poly([[300, y - 60], [220, y - 260], [380, y - 260], [460, y - 60]], "#8a929a", 10);
  p.ell(1250, y - 70, 120, 60, "#bfe4f2", 8);
  p.stroke([[1710, y - 20 - (k ? 160 : 40)], [1710, y - 20 + (k ? 160 : 40)]], 26, "#3a3a44");
};
const leafletDraw = (p: Pen) => { p.poly([[30, 40], [220, 20], [230, 220], [40, 236]], "#f2ecdc", 6); for (let k = 0; k < 4; k++) p.line([[60, 80 + k * 36], [190, 70 + k * 36]], "#8a8478", 6, false); };
const bushes = (R: THREE.Object3D, n: number, seed: number, cx: number, r0: number, r1: number) => {
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2 + seed, d = r0 + ((k * 37) % 17) / 17 * (r1 - r0), x = cx + Math.cos(a) * d, z = Math.sin(a) * d - 2;
    if (z > -0.8 && Math.abs(x - cx) < 3.5) continue;
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.7 + ((k * 13) % 7) * 0.12, 10, 8), lamC(["#2e6a32", "#3a7a3a", "#2a5a2e"][k % 3])); b.scale.y = 0.75; b.position.set(x, 0.4, z); b.castShadow = true; R.add(b);
  }
};

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#9ab87a");
    for (let k = 0; k < 30; k++) { const a = k * 2.4, d = 4 + (k % 7) * 2.2, x = Math.cos(a) * d, z = Math.sin(a) * d - 4; if (z > 1 && Math.abs(x) < 5) continue; palm(R, x, z, 0.9 + (k % 3) * 0.2); }
    bushes(R, 40, 0.3, 0, 2.2, 6);
    // camp: tents
    for (let k = 0; k < 3; k++) { const t = new THREE.Mesh(new THREE.ConeGeometry(2, 2.2, 4), lamC("#8a8a5a")); t.rotation.y = Math.PI / 4; t.position.set(CAMP[0] - 4 + k * 4, 1.1, CAMP[2] - 4); t.castShadow = true; R.add(t); }
    cyl(R, 0.05, 0.05, 5, lamC("#d8d0c0"), CAMP[0] + 2.4, 2.5, CAMP[2] - 1.5, 6);
    for (let k = 0; k < 6; k++) palm(R, CAMP[0] - 8 + k * 3.2, CAMP[2] - 9, 1);
    // Tokyo: houses and street
    for (let k = 0; k < 6; k++) house(R, TOKYO[0] - 9 + k * 3.6, TOKYO[2] - 6, 3.2, 4 + (k % 2) * 2, 3, ["#e8dcc0", "#d8c8a8", "#c8b89a"][k % 3], "#3a3a44");
    box(R, 30, 0.02, 10, lamC("#9a9aa2"), TOKYO[0], 0.01, TOKYO[2]);
    tree(R, TOKYO[0] + 9, TOKYO[2] - 3, 1, "#e8a8b8");
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    if (id === S.hook || id === S.end) {
      person("onoda", ONODA(true), 0, 0, 0, { mode: "stand", expr: "stern", facing: 1, look: Math.sin(t * 1.5) }, 1);
    }
    if (id === S.order) {
      fx("flag", 512, 320, japan, CAMP[0] + 3.0, 4.6, CAMP[2] - 1.5, 1.1, 0.7);
      person("onoda", ONODA(false), CAMP[0] + 0.5, 0, 0, { mode: "stand", expr: f > W.jamas - 4 ? "stern" : "neutral", facing: -1, wave: f > W.jamas ? 0.9 : undefined }, 1);
      person("off", OFFICER, CAMP[0] - 0.4, 0, 0, { mode: "stand", expr: "stern", facing: 1, wave: f > W.orden - 4 && f < W.jamas + 10 ? 0.9 : undefined }, 2);
      for (let k = 0; k < 6; k++) person(`s${k}`, ONODA(false), CAMP[0] - 3 + k * 1.2, 0, -2.2, { mode: "stand", expr: "stern" }, 10 + k);
      if (f > W.jamas - 6) fx("never", 512, 200, textDraw("¡NO TE RINDAS!", "#ff4a3a", 70), CAMP[0] + 0.4, 2.25, 0.3, 0.75, 0.3);
    }
    if (id === S.leaflets) {
      const px = -12 + (f - 286) * 0.12;
      if (f < 420) card(`plane|${Math.floor(f / 2) % 2}`, px, -4, 1.4, planeDraw(Math.floor(f / 2) % 2), 1, 0, 6);
      if (f > W.panfletos - 10) for (let k = 0; k < 14; k++) { const t0 = W.panfletos - 10 + k * 3, y = 6.5 - (f - t0) * 0.05; if (f > t0 && y > 0.1) fx(`lf${k % 2}`, 256, 256, leafletDraw, -2 + (k % 7) * 0.6 + Math.sin(t * 2 + k) * 0.3, y, -1 - (k % 3), 0.3, 0.3); }
      person("onoda", ONODA(false), 0, 0, 0, { mode: "stand", expr: f > W.trampa - 4 ? "stern" : f > W.piensa - 4 ? "nervous" : "dazed", facing: 1, headTilt: f > W.trampa - 4 && f < W.trampa + 30 ? 12 * Math.sin(t * 12) : 0 }, 1);
      if (f > 420) fx(`doc|${f > W.trampa ? 1 : 0}`, 512, 620, docDraw("LA GUERRA", f > W.trampa ? "¿TRAMPA?" : "", "HA TERMINADO"), 0.45, 1.25, 0.3, 0.35, 0.42);
    }
    if (id === S.years) {
      const old = f > W.escondido - 4;
      person("onoda", ONODA(old), -0.6 + (f - 496) * 0.008, 0, -0.3, { mode: f < 600 ? "stroll" : "stand", phase: t * 5, expr: old ? "dazed" : "stern", facing: 1 }, 1);
    }
    if (id === S.found || id === S.boss) {
      person("onoda", ONODA(true), 0.5, 0, 0, { mode: "stand", expr: id === S.boss ? (f > W.orden2 - 3 ? "relief" : "nervous") : f > W.dice - 4 ? "stern" : "shock", facing: -1, wave: id === S.boss && f > W.orden2 - 3 ? 0.9 : undefined }, 1);
      if (id === S.found) {
        person("suzuki", SUZUKI, -0.5 - Math.max(0, 1 - (f - 640) / 60) * 3, 0, 0, { mode: f < 700 ? "stroll" : "stand", phase: t * 7, expr: f > W.encuentra - 4 ? "shock" : "smile", facing: 1 }, 2);
        if (f > W.encuentra - 4 && f < W.dice) fx("ex", 256, 256, exDraw, 0.5, 2.25, 0.2, 0.3, 0.3);
      } else {
        person("boss", BOSS_OLD, -0.5, 0, 0, { mode: "stand", expr: "stern", facing: 1 }, 2);
        if (f > W.vuela - 4) fx("order", 512, 620, docDraw("ORDEN", "", "Ríndete"), -0.15, 1.3, 0.3, 0.32, 0.39);
      }
    }
    if (id === S.home) {
      const X = TOKYO[0], sad = f > W.desgracia - 4;
      person("onoda", ONODA(true), X, 0, 0, { mode: "stand", expr: sad ? "dazed" : "relief", facing: 0 }, 1);
      for (let k = 0; k < 10; k++) {
        const sx = k % 2 ? 1 : -1, x = X + sx * (1.0 + Math.floor(k / 2) * 0.6), z = -0.6 - (k % 3) * 0.5;
        person(`f${k}`, FOLK(k), x, 0, z, { mode: "stand", expr: "grin", facing: (-sx) as -1 | 1, wave: !sad ? Math.sin(t * 7 + k) * 0.5 + 0.5 : undefined }, 10 + k);
        if (!sad && k < 4) fx(`fl${k}`, 512, 320, japan, x + 0.25, 2.05 + 0.05 * Math.sin(t * 7 + k), z + 0.1, 0.35, 0.22);
      }
    }
  }
}
