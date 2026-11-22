// Pimpín 7 · "Dormilón": everything in the plaza.
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { textDraw, ctaDraw, bubbleDraw, zDraw, signDraw } from "./props";
import { villazanca, PIMPIN, VEC, ALCALDESA } from "./villa";
import { S, W, smooth } from "./story";

export const PIMS = 1.1;
const NOVIA: Outfit = { jacket: "#f8f6f0", pants: "#f8f6f0", boots: "#f4f1ea", hat: "hair", hair: "#8a5a2a", skin: SKINS[0], dress: "#f8f6f0", belt: "#e8c4d8" };
const CURA: Outfit = { jacket: "#1a1a22", pants: "#1a1a22", boots: "#111", hat: "hair", hair: "#d8d8dc", skin: SKINS[1], dress: "#1a1a22", belt: null, buttons: "#f4f1ea" };
const RIV = (v: number): Outfit => ({ ...VEC(v), jacket: ["#2a5ac8", "#3a6ad8", "#1a4ab8"][v % 3] });
const archDraw = (p: Pen) => { p.band([[40, 500], [40, 180], [128, 60], [256, 30], [384, 60], [472, 180], [472, 500]], "#f4f1ea", 22, 5); for (let k = 0; k < 14; k++) { const a = Math.PI * (k / 13); p.ell(256 - Math.cos(a) * 216, 220 - Math.sin(a) * 180, 22, 22, ["#e84a6a", "#f2c84a", "#f4f1ea"][k % 3], 4); } };
const clockDraw = (ring: boolean, flag: boolean) => (p: Pen) => { p.ell(128, 150, 90, 90, "#e2453c", 8); p.ell(128, 150, 70, 70, "#f4f1ea", 5); p.band([[128, 150], [128, 98]], "#1a1010", 7, 0); p.band([[128, 150], [168, 150]], "#1a1010", 7, 0); p.ell(70, 60, 26, 20, "#e2453c", 6); p.ell(186, 60, 26, 20, "#e2453c", 6); if (ring) for (const s of [-1, 1]) p.band([[128 + s * 110, 70], [128 + s * 125, 40]], "#1a1010", 6, 0); if (flag) { p.band([[190, 240], [190, 20]], "#6a4a2a", 7, 0); p.poly([[190, 24], [250, 40], [190, 80]], "#ffffff", 5); } };
const trophyDraw = (p: Pen) => { p.poly([[70, 30], [186, 30], [170, 140], [86, 140]], "#f2c84a", 8); p.band([[70, 50], [30, 70], [70, 110]], "#f2c84a", 10, 4); p.band([[186, 50], [226, 70], [186, 110]], "#f2c84a", 10, 4); p.poly([[116, 140], [140, 140], [140, 190], [116, 190]], "#e8b03a", 5); p.poly([[80, 190], [176, 190], [176, 230], [80, 230]], "#8a5a2a", 6); };
const breadDraw = (p: Pen) => { p.ell(128, 140, 110, 50, "#d89a4a", 7); for (const x of [70, 120, 170]) p.band([[x - 14, 120], [x + 14, 160]], "#a86a2a", 6, 0); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    box(R, 3.2, 0.5, 1.2, lamC("#c8a06a"), -6.5, 0.25, 2.5); box(R, 3.2, 0.9, 0.15, lamC("#c8a06a"), -6.5, 0.7, 1.95);
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const zz = (key: string, x: number, y: number, z: number, s = 0.4) => { for (let k = 0; k < 2; k++) { const u = ((t * 0.7 + k * 0.5) % 1); fx(`${key}z${k}`, 256, 256, zDraw, x + 0.2 + u * 0.4, y + u * 0.7, z, s * (0.6 + u * 0.6), s * (0.6 + u * 0.6)); } };
    const sleeper = (key: string, x: number, y: number, z: number, opts: any = {}) => { person(key, PIMPIN, x, y, z, { mode: "stand", expr: "sleep", facing: 0, headTilt: 0.18 + Math.sin(t * 1.5) * 0.05, ...opts }, 1, y < 0.05, PIMS); zz(key, x, y + 1.9, z + 0.1); };
    if (id === S.hook || id === S.end) {
      fx("arch", 512, 512, archDraw, 0, 1.8, 0.6, 3.4, 3.4);
      person("cura", CURA, 0, 0, 0.8, { mode: "stand", expr: f > W.suya - 6 || id === S.end ? "shock" : "smile", facing: 0 }, 2, true, 1.0);
      person("novia", NOVIA, 0.75, 0, 1.8, { mode: "stand", expr: f > W.suya - 6 || id === S.end ? "shock" : "smile_closed", facing: -1 }, 3, true, 1.0);
      sleeper("pim", -0.65, 0, 1.8, { facing: 1 });
      for (let j = 0; j < 6; j++) person(`g${j}`, VEC(j), (j % 2 ? 1 : -1) * (2.2 + Math.floor(j / 2) * 1.0), 0, 0.4 + (j % 3) * 0.4, { mode: "stand", expr: f > W.suya - 6 || id === S.end ? "shock" : "smile", facing: 0 }, 10 + j, true, 1.0);
    }
    if (id === S.early) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -4 + j * 1.6, 0, 0.5 + (j % 2), { mode: "march", phase: t * 1.5 + j, expr: "grin", facing: 1, wave: j % 2 ? 0.8 : undefined }, 10 + j, true, 1.0);
      person("pim", PIMPIN, -6.5, 0.55, 2.4, { mode: "fall", expr: "sleep", facing: 1, tilt: 1.5 }, 1, false, PIMS); zz("b", -6.6, 1.4, 2.6);
    }
    if (id === S.ja) {
      for (let j = 0; j < 6; j++) person(`v${j}`, VEC(j), -3 + j * 1.2 + (j > 2 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "laugh", facing: 0, wave: 0.5 + Math.sin(t * 7 + j) * 0.4 }, 10 + j, true, 1.0);
      sleeper("pim", 0.6, 0, 2.8);
    }
    if (id === S.bus) {
      fx("bus", 1024, 512, signDraw(["PARADA DE", "AUTOBÚS"], "#3a6ab8", "#ffffff"), -6.5, 2.6, 1.7, 1.6, 0.8);
      person("pim", PIMPIN, -6.8, 0, 2.6, { mode: "sit", expr: "sleep", facing: 0, headTilt: 0.3 }, 1, true, PIMS); zz("bs", -6.8, 1.5, 2.8);
      person("n1", VEC(2), -5.6, 0, 2.6, { mode: "sit", expr: "nervous", facing: 0 }, 10, true, 1.0);
    }
    if (id === S.bread) {
      for (let j = 0; j < 4; j++) person(`q${j}`, VEC(j + 1), -1.6 + j * 1.0, 0, 2.0 - j * 0.15, { mode: "stand", expr: "stern", facing: -1 }, 10 + j, true, 1.0);
      sleeper("pim", 2.6, 0, 1.4, { tilt: 0.12 });
      fx("bread", 256, 256, breadDraw, -2.4, 1.4, 2.2, 0.5, 0.5);
      if (false) fx("ach", 1024, 256, textDraw("¡ACH... zzz", "#ffffff", 110), 2.6, 2.6, 1.6, 1.5, 0.37);
    }
    if (id === S.clock) {
      sleeper("pim", 0, 0, 2.6);
      const ring = f < W.ya - 2, flag = f > W.rendido - 6;
      fx(`clk|${ring ? (Math.floor(t * 12) % 2) : 2}|${flag ? 1 : 0}`, 256, 256, clockDraw(ring, flag), 0.9 + (ring ? (Math.floor(t * 12) % 2 ? 0.03 : -0.03) : 0), 0.9, 2.9, 0.55, 0.55);
    }
    if (id === S.dare || id === S.statues || id === S.solo || id === S.prize) {
      fx("sign", 1024, 512, signDraw(["CONCURSO", "DE ESTATUAS"], "#f2e2b8", "#8a1e26"), 0, 4.6, -7.85, 2.6, 1.3);
      const outA = (k: number) => k === 0 ? W.rasca : k === 1 ? W.rie : W.estornuda;
      for (let k = 0; k < 4; k++) {
        const x = -3.6 + k * 1.2, out = id === S.statues && f > outA(k) - 4 || id === S.solo || id === S.prize;
        const me = k === 3 ? ALCALDESA : VEC(k + 1);
        person(`a${k}`, me, out && id !== S.statues ? x - 0.3 : x, 0, 0.6, { mode: "stand", expr: out ? (k === 0 ? "pained" : k === 1 ? "laugh" : k === 2 ? "shock" : "shock") : "stern", facing: 0, wave: id === S.statues && out && f < outA(k) + 20 ? 0.9 : undefined, tilt: out && id === S.statues && f < outA(k) + 20 ? 0.12 : 0 }, 10 + k, true, 1.0);
      }
      for (let k = 0; k < 4; k++) person(`r${k}`, RIV(k), 1.8 + k * 1.2, 0, 0.6, { mode: "stand", expr: id === S.solo || id === S.prize ? "shock" : id === S.dare ? "grin" : "stern", facing: 0 }, 20 + k, true, 1.0);
      if (id === S.statues) { if (f > W.rasca - 4 && f < W.rasca + 24) fx("o1", 512, 200, textDraw("¡FUERA!", "#ff3b3b", 110), -3.6, 2.5, 0.8, 0.9, 0.35); if (f > W.rie - 4 && f < W.rie + 24) fx("o2", 512, 200, textDraw("¡FUERA!", "#ff3b3b", 110), -2.4, 2.5, 0.8, 0.9, 0.35); if (f > W.estornuda - 2) fx("o3", 512, 200, textDraw("¡ACHÍS!", "#ffffff", 110), 0.0, 2.5, 0.8, 0.9, 0.35); }
      if (id !== S.dare) sleeper("pim", -0.6, 0, 2.2);
      else person("pim", PIMPIN, -0.6, 0, 2.2, { mode: "stand", expr: "dazed", facing: 0 }, 1, true, PIMS);
      if (id === S.prize && f > W.trofeo - 6) fx("tro", 256, 256, trophyDraw, -0.3, 0.9 + 0.4 * smooth((f - W.trofeo + 6) / 10), 2.4, 0.5, 0.5);
      if (false) fx("ronc", 1024, 256, textDraw("ZZZZZZ", "#9ad4ff", 150), -0.6, 2.8, 2.0, 1.4, 0.35);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
    void bubbleDraw;
  }
}
