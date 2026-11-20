// "Siete rayos" (Roy Sullivan, Shenandoah): forest (x=0), lookout tower (TOW), truck on a road (TRK), yard (YRD), ranger station (STA), lake (LAK), museum (MUS).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { bearDraw } from "./beasts";
import { grassGround, flatGround, tree, house, seaPlane, textDraw, labelDraw, docDraw, boltDraw, fireDraw, jugDraw, ctaDraw, qDraw } from "./props";
import { S, W, TOW, TRK, YRD, STA, LAK, MUS, smooth } from "./story";

const ROY = (burnt = false): Outfit => ({ jacket: "#6a7a4a", pants: "#5a4a3a", boots: "#2a2020", hat: "slouch", cap: "#8a6a3a", skin: SKINS[0], belt: "#3a2a1a", buttons: "#c8b48a", hair: burnt ? "#2a2a2a" : undefined });
const fishDraw = (p: Pen) => { p.ell(128, 128, 90, 40, "#8ab4c8", 6); p.poly([[40, 128], [6, 90], [6, 166]], "#8ab4c8", 6); p.dot(190, 118, 8); };
const hatDraw = (p: Pen) => { p.ell(128, 170, 120, 30, "#8a6a3a", 7); p.poly([[60, 170], [80, 80], [128, 60], [176, 80], [196, 170]], "#8a6a3a", 7); p.ell(100, 120, 20, 14, "#2a2a2a", 0); p.ell(150, 100, 14, 10, "#2a2a2a", 0); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#8aa85a");
    for (let k = 0; k < 70; k++) { const x = -20 + (k % 35) * 6 + (k % 3), z = -8 - Math.floor(k / 35) * 7 - (k % 4); tree(R, x, z, 1.2 + (k % 3) * 0.3, ["#3a6a2a", "#4a7a3a", "#2f5a2a"][k % 3]); }
    // lookout tower
    const wood = lam({ map: rep(planksHD(), 1, 1), color: "#a8784a" });
    for (const [dx, dz] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]]) box(R, 0.2, 6, 0.2, wood, TOW[0] + dx, 3, -2 + dz);
    box(R, 3, 0.2, 3, wood, TOW[0], 6, -2);
    // road + truck
    flatGround(R, 40, 5, "#5a5a5e", TRK[0], 0, 0.012);
    const tc = lamC("#2a5a3a"); box(R, 3.6, 1.0, 1.8, tc, TRK[0] + 0.4, 0.9, -1.2); box(R, 1.6, 0.9, 1.8, tc, TRK[0] + 1.3, 1.85, -1.2); box(R, 1.2, 0.6, 1.82, lamC("#9ad4ff"), TRK[0] + 1.35, 1.95, -1.2);
    for (const dx of [-0.9, 1.6]) for (const dz of [-0.95, 0.95]) { const w = cyl(R, 0.42, 0.42, 0.3, lamC("#1a1a1e"), TRK[0] + dx, 0.42, -1.2 + dz, 14); w.rotation.x = Math.PI / 2; }
    // yard + house
    house(R, YRD[0] + 1, -5, 6, 3.4, 4, "#e8dcc0", "#5a4a52"); flatGround(R, 12, 8, "#9ab86a", YRD[0], -1, 0.012);
    for (let k = 0; k < 8; k++) box(R, 0.1, 1, 0.1, lamC("#f4f1ea"), YRD[0] - 5 + k * 1.4, 0.5, 2.6);
    // ranger station
    house(R, STA[0], -4, 7, 3.6, 4, "#8a6a4a", "#3a4a3a"); box(R, 2.4, 0.6, 0.1, lamC("#3a4a2a"), STA[0], 2.9, -1.95);
    // lake
    const sea = seaPlane(R, -0.05, "#3a7aa8"); sea.position.set(LAK[0], 0, -8); sea.scale.set(0.012, 1, 0.006);
    flatGround(R, 6, 2, "#8a6a4a", LAK[0], 1.2, 0.02);
    // museum
    box(R, 16, 5, 0.2, lamC("#e8e2d6"), MUS[0], 2.5, -2.5); flatGround(R, 16, 8, "#c8b8a0", MUS[0], 0, 0.013);
    for (let k = 0; k < 2; k++) { box(R, 1.0, 1.0, 1.0, lamC("#5a4a3a"), MUS[0] - 1.2 + k * 2.4, 0.5, -1.0); }
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const bolt = (x: number, z: number, fr: number, key: string, top = 1.9) => { const d = f - fr; if (d >= -1 && d < 9 && (d < 4 || d % 2 === 0)) fx(`b${key}|${d % 3}`, 256, 640, boltDraw(d % 3), x, top + 3.25, z, 2.6, 6.5, true); };
    const roy = (x: number, z: number, expr: Parameters<typeof person>[5]["expr"], extra: Parameters<typeof person>[5] = {}, burnt = false) => person("roy", ROY(burnt), x, 0, z, { mode: "stand", expr, facing: 0, ...extra }, 1);
    if (id === S.hook || id === S.end) {
      roy(0, 0, f % 60 < 30 ? "shock" : "dazed", { blink: false });
      const per = 12, base = id === S.hook ? 0 : W.siete2 - 20;
      for (let i = 0; i < 7; i++) bolt(Math.sin(i * 2.3) * 1.6, -0.8 + Math.cos(i * 1.7) * 0.6, base + i * per, `h${i}`);
      fx(`smoke|${Math.floor(t * 4) % 3}`, 256, 256, fireDraw(Math.floor(t * 4) % 3), 0.05, 2.15, 0.15, 0.4, 0.4);
    }
    if (id === S.intro) { roy(0, 0, "grin", { wave: 0.8 }); if (f > W.roy - 4) fx("name", 512, 160, labelDraw("R. SULLIVAN", "#4a5a2a"), 0, 2.45, 0.3, 0.8, 0.25); if (f > W.guardabosques - 4) fx("job", 512, 200, textDraw("GUARDABOSQUES", "#ffd23f", 62), 0, 0.55, 0.4, 0.9, 0.35); }
    if (id === S.tower) { person("roy", ROY(), TOW[0], 6.1, -2, { mode: "stand", expr: f > W.y1942 + 4 ? "pained" : "neutral", facing: 0 }, 1); bolt(TOW[0], -2, W.rayo1, "1", 8.0); if (f > W.una - 4) fx("una", 512, 200, textDraw("¡LA UÑA!", "#ff6a6a", 96), TOW[0] + 0.2, 8.1, -1.6, 1.0, 0.39); }
    if (id === S.truck) {
      person("roy", ROY(), TRK[0] + 1.3, 0.9, 0.05, { mode: "sit", expr: f > W.cejas - 6 ? "shock" : "neutral", facing: 0 }, 1);
      bolt(TRK[0] + 1.3, -1.2, W.y1969 + 6, "2", 2.4);
      if (f > W.cejas - 4 && f < W.y1970 - 4) fx("cejas", 512, 200, textDraw("¡ADIÓS, CEJAS!", "#ffd23f", 70), TRK[0] + 1.3, 2.75, 0.4, 1.2, 0.47);
    }
    if (id === S.yard) { roy(YRD[0], 0, f > W.hombro ? "pained" : "smile"); bolt(YRD[0] + 0.25, 0, W.hombro - 3, "3"); }
    if (id === S.hair) {
      const onF = f > W.pelo - 4 && f < W.garrafa - 10;
      roy(STA[0], 0, onF ? "shout" : f > W.garrafa - 6 ? "stern" : "neutral", {}, f > W.pelo);
      bolt(STA[0], 0, W.cabeza - 3, "4");
      if (onF) fx(`fire|${Math.floor(t * 8) % 3}`, 256, 256, fireDraw(Math.floor(t * 8) % 3), STA[0] + 0.05, 2.2, 0.15, 0.55, 0.55);
      if (f > W.garrafa - 6) fx("jug", 256, 256, jugDraw, STA[0] + 0.55, 1.0, 0.3, 0.45, 0.45);
    }
    if (id === S.again) {
      const fire2 = f > W.quemar - 4 && f < W.y1976 - 6;
      roy(STA[0] + 6, 0, fire2 ? "shout" : f > W.tobillo - 2 ? "pained" : "nervous", {}, true);
      fx("jug2", 256, 256, jugDraw, STA[0] + 6.55, 1.0, 0.3, 0.45, 0.45);
      bolt(STA[0] + 6, 0, W.rayo5 - 2, "5"); bolt(STA[0] + 6.1, 0.2, W.tobillo - 3, "6", 0.4);
      if (fire2) fx(`fire|${Math.floor(t * 8) % 3}`, 256, 256, fireDraw(Math.floor(t * 8) % 3), STA[0] + 6.05, 2.2, 0.15, 0.55, 0.55);
    }
    if (id === S.lake) {
      const bearX = LAK[0] + 4.2 - smooth((f - W.oso + 10) / 30) * 2.2;
      roy(LAK[0] - 0.2, 1.2, f > W.oso - 4 ? "shock" : f > W.septimo ? "dazed" : "smile", { blink: false });
      bolt(LAK[0] - 0.2, 1.2, W.septimo - 3, "7");
      fx("fish", 256, 256, fishDraw, LAK[0] + 0.1, 0.5, 1.4, 0.45, 0.45);
      if (f > W.oso - 20) card(`bear|${Math.floor(t * 6) % 6}`, bearX, 0.6, 1.0, bearDraw(Math.floor(t * 6) % 6, "walk"), -1, 0);
    }
    if (id === S.record) {
      fx("doc", 512, 620, docDraw("GUINNESS", "7 RAYOS", "Roy C. Sullivan"), MUS[0] - 2.3, 1.9, -1.6, 0.9, 1.08);
      for (let k = 0; k < 2; k++) fx(`hat${k}`, 256, 256, hatDraw, MUS[0] - 1.2 + k * 2.4, 1.3, -1.0, 0.7, 0.7);
      if (f > W.museo - 6) fx("mus", 512, 200, textDraw("MUSEO", "#ffd23f", 100), MUS[0], 3.6, -2.3, 1.6, 0.62);
      fx("q", 256, 256, qDraw, MUS[0] + 3, 2.6, -1.5, 0.5, 0.5);
    }
    if (id === S.cta) {
      roy(0, 0, "grin", { wave: 0.9 }, false);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.4, 2.2, 1.1);
    }
  }
}
