// "68 años con hipo": the farm with the scale and the pig (x = 0), Charles's home (HOME), the doctors (DOC), the family yard (FAM).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box } from "./base";
import { grassGround, flatGround, tree, house, textDraw, exDraw, qDraw, heartDraw, labelDraw } from "./props";
import { pigDraw } from "./beasts";
import { S, W, HOME, DOC, FAM } from "./story";

const CH = (old: boolean): Outfit => ({ jacket: old ? "#6a5a4a" : "#3a5a8a", pants: old ? "#4a4a4a" : "#5a4a3a", boots: "#3a2a20", hat: old ? "hair" : "slouch", hair: "#e8e8e8", skin: SKINS[0], belt: old ? null : "#5a4024", moustache: old ? "#e8e8e8" : undefined });
const DOCTOR = (v: number): Outfit => ({ jacket: "#f4f1ea", pants: "#3a3a44", boots: "#111", hat: "hair", hair: v ? "#8a8a8a" : "#3a2a1a", skin: SKINS[v % 2], moustache: v ? "#8a8a8a" : undefined, belt: null, buttons: "#c8c0b0" });
const BRIDE: Outfit = { jacket: "#f4f1ea", pants: "#f4f1ea", boots: "#f4f1ea", hat: "bonnet", dress: "#f4f1ea", skin: SKINS[0], belt: null };
const KIDV = (v: number): Outfit => ({ jacket: ["#e2453c", "#3a8ad8", "#f0a83a", "#5aa84a"][v % 4], pants: "#3a3a5a", boots: "#3a2a20", hat: "hair", hair: ["#5a3a20", "#c8a060", "#2a2a2a"][v % 3], skin: SKINS[0], build: "kid", belt: null });
const FRIEND: Outfit = { jacket: "#8a3a3a", pants: "#3a3a44", boots: "#2a2020", hat: "cap", cap: "#3a3a3a", skin: SKINS[1], belt: null };
const HIPS = [270, 278, 287, 315, 337, 360, 395, 412, 425, 450, 470, 492, 520, 600, 640, 715, 860, 890, 930, 960, 985, 1000, 1018, 1032];
const hicAt = (f: number) => { let best = 99; for (const h of HIPS) if (f >= h - 1 && f - h < best) best = f - h; for (let h = 12; h < 100; h += 17) if (f >= h - 1 && f - h < best) best = f - h; return best; };
const glassDraw = (p: Pen) => { p.poly([[70, 230], [186, 230], [200, 40], [56, 40]], "#cfe8f0", 7); p.poly([[64, 160], [192, 160], [200, 40], [56, 40]], "#7ac0e8", 0); };
const bookDraw = (p: Pen) => { p.poly([[40, 30], [472, 30], [472, 600], [40, 600]], "#1a4a8a", 10); p.poly([[40, 30], [90, 30], [90, 600], [40, 600]], "#123a6a", 0); p.g.fillStyle = "#ffd23f"; p.g.textAlign = "center"; p.g.font = "bold 66px Arial"; p.g.fillText("LIBRO", 280, 200); p.g.fillText("DE LOS", 280, 280); p.g.fillText("RÉCORDS", 280, 360); p.ell(280, 470, 60, 60, "#ffd23f", 6); };
const calDraw = (txt: string) => (p: Pen) => { p.poly([[40, 40], [472, 40], [472, 470], [40, 470]], "#f4f1ea", 10); p.poly([[40, 40], [472, 40], [472, 140], [40, 140]], "#c8323a", 0); p.g.fillStyle = "#1a1a1e"; p.g.font = "bold 120px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 256, 360); };
const brainDraw = (p: Pen) => { p.poly([[16, 16], [1008, 16], [1008, 700], [16, 700]], "#2a4a3a", 14); p.ell(512, 380, 320, 220, "#f2b8c0", 8); for (let k = 0; k < 6; k++) p.arc(460 + k * 60, 360, 50, 80, 200, 340, 6, "#b87880"); p.ell(660, 500, 90, 70, "#e84a5a", 6); p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 56px Arial"; p.g.textAlign = "center"; p.g.fillText("CONTROL DEL HIPO", 512, 120); p.stroke([[660, 140], [660, 420]], 8, "#f4f1ea"); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    // farm: barn, fence, scale platform
    house(R, -4, -6, 6, 4, 4, "#a8302a", "#5a3a3a");
    for (let k = 0; k < 10; k++) box(R, 0.1, 1, 0.1, lamC("#8a6a4a"), -6 + k * 1.3, 0.5, -2.6);
    box(R, 13, 0.08, 0.06, lamC("#8a6a4a"), -0.15, 0.8, -2.6);
    box(R, 1.6, 0.12, 1.0, lamC("#7a7a82"), 0.9, 0.06, 0);
    for (let k = 0; k < 3; k++) tree(R, 5 + k * 3, -8, 1);
    // home: living room walls
    flatGround(R, 10, 8, "#a8784a", HOME[0], 1, 0.012);
    box(R, 10, 3.5, 0.2, lam({ map: rep(planksHD(), 2, 1), color: "#d8c8a0" }), HOME[0], 1.75, -2);
    box(R, 1.6, 0.8, 0.8, lamC("#7a3a3a"), HOME[0] - 2.2, 0.4, -1.4);
    // doctors' room
    box(R, 10, 3.5, 0.2, lamC("#e8ece8"), DOC[0], 1.75, -2.2);
    flatGround(R, 10, 8, "#c8d0d0", DOC[0], 1, 0.012);
    // family yard
    house(R, FAM[0], -5, 6, 4, 4, "#e8dcc0", "#3a4a6a");
    for (let k = 0; k < 2; k++) tree(R, FAM[0] - 6 + k * 12, -4, 1, "#5a8a3a");
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const hb = hicAt(f), jump = hb < 8 ? Math.sin((hb / 8) * Math.PI) * 0.12 : 0;
    const hipFx = (x: number, y: number, z: number) => { if (hb < 10) fx(`hip${Math.floor(f / 40) % 2}`, 512, 200, textDraw("¡HIP!", "#ffd23f", 110), x + (Math.floor(f / 40) % 2 ? 0.3 : -0.3), y + hb * 0.02, z, 0.6, 0.24); };
    const H = HOME[0], D = DOC[0], F = FAM[0];
    if (id === S.hook || id === S.rate || id === S.count || id === S.end) {
      const stop = id === S.end && f > W.paro - 4;
      const old = id === S.count || id === S.end;
      person("ch", CH(old), H, stop ? 0 : jump, 0, { mode: "stand", expr: stop ? "relief_open" : hb < 8 ? "shock" : "nervous", facing: 0 }, 1);
      if (!stop) hipFx(H, 1.95, 0.3);
      if (stop) fx("silence", 512, 200, textDraw("...", "#ffffff", 130), H, 2.25, 0.2, 0.5, 0.2);
      if (id === S.count && f > W.cuatro - 4) { const n = Math.min(430, Math.floor((f - W.cuatro + 4) * 9)); fx(`n|${n}`, 512, 200, textDraw(`${n}.000.000`, "#ff4a3a", 76), H, 2.55, 0.25, 1.0, 0.39); }
    }
    if (id === S.farm || id === S.fall) {
      const fell = id === S.fall && f > W.cae - 4;
      card("pig", 0.95, 0.05, 0.55, pigDraw(0, "stand"), -1, 0, 0.12);
      person("ch", CH(false), -0.2, fell ? 0 : 0, 0.1, { mode: fell ? "fall" : "stand", expr: fell ? (hb < 8 ? "shock" : "dazed") : "stern", facing: 1, wave: !fell && f > W.cerdo - 4 ? 0.9 : undefined }, 1);
      if (id === S.farm && f > W.charles - 4) fx("name", 512, 160, labelDraw("CHARLES OSBORNE", "#3a5a8a"), 0.2, 2.4, 0.2, 1.1, 0.34);
      if (id === S.fall && f > W.hip1 - 2) hipFx(-0.2, 1.4, 0.3);
    }
    if (id === S.years) {
      person("ch", CH(false), H + 0.6, jump, -0.2, { mode: "stand", expr: hb < 8 ? "shock" : "dazed", facing: -1 }, 1);
      hipFx(H + 0.6, 2.2, 0);
      const cal = f < W.anio - 3 ? "1922" : f < W.decada - 3 ? "1923" : "1932";
      fx(`cal|${cal}`, 512, 512, calDraw(cal), H - 0.8, 1.9, -1.8, 0.9, 0.9);
    }
    if (id === S.cures) {
      const sc = f > W.sustos - 4 && f < W.agua - 4, wat = f > W.agua - 4 && f < W.aguantar - 4, hold = f > W.aguantar - 4 && f < W.nada;
      person("ch", CH(false), H, hold ? 0 : jump, 0, { mode: "stand", expr: sc ? "shock" : hold ? "pained" : f > W.nada - 3 ? "dazed" : "nervous", facing: 1 }, 1);
      if (sc) { person("fr", FRIEND, H + 0.9, 0, 0.1, { mode: "stand", expr: "shout", facing: -1, wave: 1 }, 2); fx("bu", 512, 200, textDraw("¡BU!", "#ff4a3a", 120), H + 0.6, 2.25, 0.3, 0.7, 0.27); }
      if (wat) { fx("gl", 256, 256, glassDraw, H + 0.35, 1.35, 0.3, 0.25, 0.25); fx("rev", 512, 200, textDraw("AL REVÉS", "#9ad4ff", 90), H, 2.3, 0.2, 0.7, 0.27); }
      if (hold) fx("hold", 512, 200, textDraw("1... 2... 3...", "#ffffff", 80), H, 2.3, 0.2, 0.7, 0.27);
      if (f > W.nada - 3) hipFx(H, 2.2, 0.2);
    }
    if (id === S.docs) {
      for (let k = 0; k < 2; k++) person(`d${k}`, DOCTOR(k), D + (k ? 0.7 : -0.7), 0, -0.2, { mode: "stand", expr: "nervous", facing: (k ? -1 : 1) as 1 | -1 }, 1 + k);
      fx("q", 256, 256, qDraw, D, 2.2, 0, 0.4, 0.4);
    }
    if (id === S.life) {
      const wed = f < W.ocho - 6;
      person("ch", CH(false), F - 0.35, jump, 0, { mode: "stand", expr: "grin", facing: 1 }, 1);
      person("bride", BRIDE, F + 0.45, 0, 0, { mode: "stand", expr: "smile", facing: -1 }, 2);
      if (f > W.casa - 6 && wed) fx("heart", 256, 256, heartDraw, F + 0.05, 2.2 + Math.sin(t * 4) * 0.05, 0.2, 0.35, 0.35);
      if (f > W.casa - 4 && wed) fx("x2", 512, 200, textDraw("x2", "#ff6a8a", 120), F + 1.0, 2.2, 0.2, 0.4, 0.16);
      if (!wed) for (let k = 0; k < 8; k++) person(`k${k}`, KIDV(k), F - 1.9 + k * 0.55 + (k > 3 ? 0.5 : 0) - 0.05, 0, 0.6 + (k % 2) * 0.2, { mode: "stand", expr: "grin", facing: 0, wave: k % 3 === 0 ? 0.7 : undefined }, 10 + k);
      if (!wed) fx("8", 512, 200, textDraw("8 HIJOS", "#ffd23f", 100), F + 0.4, 2.5, 0.3, 0.9, 0.35);
      if (f > W.hip4 - 4) hipFx(F - 0.35, 2.2, 0.2);
    }
    if (id === S.brain) {
      fx("brain", 1024, 720, brainDraw, D + 0.6, 2.0, -2.05, 2.0, 1.4);
      person("d0", DOCTOR(1), D - 0.9, 0, -0.6, { mode: "stand", expr: "stern", facing: 1, wave: f > W.cerebro - 4 ? 0.9 : undefined }, 1);
    }
    if (id === S.record) {
      person("ch", CH(true), H - 0.25, jump, 0, { mode: "stand", expr: "grin", facing: 1 }, 1);
      if (f > W.guinness - 6) fx("book", 512, 620, bookDraw, H + 0.45, 1.35, 0.3, 0.4, 0.48);
      hipFx(H - 0.25, 2.2, 0.2);
    }
  }
}
