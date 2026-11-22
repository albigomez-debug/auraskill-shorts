// Pimpín 10 · "Patoso": all in the plaza. Stairs at ST, vase shop on the house at x = 9, Pimpín's door at x = -3, the well at (5, -3).
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box } from "./base";
import { ctaDraw, signDraw } from "./props";
import { dogDraw } from "./beasts";
import { villazanca, PIMPIN, VEC } from "./villa";
import { S, W, ST, thiefAt, rollAt, smooth } from "./story";

export const PIMS = 1.1;
const LADRON: Outfit = { jacket: "#2a2a2e", pants: "#2a2a2e", boots: "#111", hat: "cap", cap: "#1a1a1a", skin: SKINS[1], moustache: "#1a1010", belt: null, buttons: "#f4f1ea" };
const GUARD: Outfit = { jacket: "#2a4a8a", pants: "#1a2a4a", boots: "#111", hat: "cap", cap: "#2a4a8a", skin: SKINS[2], belt: "#e8c45a", buttons: "#e8c45a", moustache: "#3a2a1a" };
const cheeseDraw = (p: Pen) => { p.poly([[20, 200], [236, 200], [236, 120], [20, 200]], "#f2c84a", 7); p.poly([[20, 200], [236, 120], [200, 60], [20, 200]], "#f8dc6a", 7); for (const [x, y] of [[120, 180], [180, 160], [200, 185]]) p.ell(x, y, 10, 8, "#d8a83a", 2); };
const shadowDraw = (p: Pen) => p.ell(128, 128, 120, 40, "rgba(20,10,30,0.7)", 0);
const posterDraw = (p: Pen) => { p.poly([[10, 10], [246, 10], [246, 300], [10, 300]], "#f4f1ea", 6); p.ell(128, 140, 60, 60, "#f4d4b0", 5); p.ell(128, 100, 64, 34, "#e2453c", 5); p.ell(108, 140, 6, 6, "#1a1010", 0); p.ell(148, 140, 6, 6, "#1a1010", 0); p.g.strokeStyle = "#d8202a"; p.g.lineWidth = 18; p.g.beginPath(); p.g.arc(128, 140, 100, 0, Math.PI * 2); p.g.stroke(); p.g.beginPath(); p.g.moveTo(58, 70); p.g.lineTo(198, 210); p.g.stroke(); p.g.fillStyle = "#d8202a"; p.g.font = "bold 34px Arial"; p.g.textAlign = "center"; p.g.fillText("PROHIBIDO", 128, 280); };
const vaseDraw = (k: number) => (p: Pen) => { p.poly([[90, 30], [166, 30], [150, 70], [200, 150], [170, 240], [86, 240], [56, 150], [106, 70]], ["#3a8ac8", "#c85ab8", "#5ab85a"][k % 3], 7); };
const matDraw = (p: Pen) => { p.poly([[10, 60], [246, 60], [246, 200], [10, 200]], "#8a5a2a", 6); p.g.fillStyle = "#f2c84a"; p.g.font = "bold 44px Arial"; p.g.textAlign = "center"; p.g.fillText("HOLA", 128, 148); };
const plasterDraw = (p: Pen) => { for (const a of [0.6, -0.6]) { p.g.save(); p.g.translate(128, 128); p.g.rotate(a); p.poly([[-100, -26], [100, -26], [100, 26], [-100, 26]], "#f4c8a0", 5); p.g.restore(); } };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    const stone = lamC("#b8b0a0");
    for (let k = 0; k < 6; k++) box(R, 2.2, 0.3 * (k + 1), 0.5, stone, ST[0], 0.15 * (k + 1), ST[2] - k * 0.5);
    box(R, 2.2, 1.8, 2.0, stone, ST[0], 0.9, ST[2] - 3.9);
  }
  pose(a: Api) {
    const { f, t, id, person, fx, card } = a;
    if (id === S.hook || id === S.end) {
      const trip = id === S.end ? 1 : smooth((f - W.trip + 4) / 8);
      const px = id === S.end ? 0.6 : -1.6 + Math.min(f, W.trip) * 0.05;
      fx("shd", 256, 256, shadowDraw, 0.8, 0.02, 2.4, 1.6, 0.5);
      person("pim", PIMPIN, px + trip * 0.4, trip * 0.25, 2.2, { mode: trip > 0.2 ? "fall" : "march", phase: t * 2, expr: trip > 0.2 ? "shock" : "smile", facing: 1, tilt: trip * 1.3 }, 1, trip < 0.2, PIMS);
      person("tree", VEC(2), 2.6, 0, 1.0, { mode: "stand", expr: trip > 0.2 ? "shock" : "smile", facing: -1 }, 3, true, 1.0);
    }
    if (id === S.straight) {
      for (let j = 0; j < 6; j++) person(`m${j}`, VEC(j), -6 + ((f - 56) * 0.04) + j * 1.3, 0, 0.8, { mode: "march", phase: t * 2, expr: "stern", facing: 1 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, -1.5 + (f - 56) * 0.03, 0.2, 2.6, { mode: "fall", expr: "dazed", facing: 1, tilt: 1.4 + Math.sin(t * 5) * 0.1 }, 1, false, PIMS);
    }
    if (id === S.ja) {
      for (let j = 0; j < 6; j++) person(`v${j}`, VEC(j), -3 + j * 1.2 + (j > 2 ? 1.2 : 0), 0, 1.2, { mode: "stand", expr: "laugh", facing: 0, wave: 0.5 + Math.sin(t * 7 + j) * 0.4 }, 10 + j, true, 1.0);
      person("pim", PIMPIN, 0.6, 0, 2.8, { mode: "stand", expr: "dazed", facing: 0 }, 1, true, PIMS);
    }
    if (id === S.clumsy) { person("pim", PIMPIN, 0, 0, 2.6, { mode: "stand", expr: "nervous", facing: 0 }, 1, true, PIMS); fx("pl", 256, 256, plasterDraw, 0.12, 1.75, 2.75, 0.3, 0.3); fx("pl2", 256, 256, plasterDraw, -0.25, 1.0, 2.75, 0.25, 0.25); }
    if (id === S.stairs) {
      const [sx, , sz] = ST;
      let x = sx, y = 0, z = sz + 1.0, tilt = 0, mode: "fall" | "march" | "stand" = "march", expr: any = "smile";
      if (f < W.bajando - 6) { const s = smooth((f - 212) / 20); z = sz + 1 - s * 1.0; y = s * 0.3; if (f > W.tropieza - 2) { mode = "fall"; tilt = 1.2; expr = "shock"; y = 0.35; } }
      else if (f < W.liso - 8) { const s = smooth((f - W.bajando + 6) / 22); z = sz - 2.2 + s * 3.4; y = 1.8 * (1 - s) + 0.1; mode = "fall"; tilt = s * 6; expr = "dazed"; }
      else { x = sx + 2.4; z = sz + 1.4; const tr = smooth((f - W.liso + 4) / 6); mode = tr > 0.2 ? "fall" : "march"; tilt = tr * 1.3; y = tr * 0.2; expr = tr > 0.2 ? "shock" : "smile"; }
      person("pim", PIMPIN, x, y, z, { mode, phase: t * 2, expr, facing: 0, tilt }, 1, y < 0.05, PIMS);
    }
    if (id === S.vases) {
      fx("shop", 1024, 512, signDraw(["JARRONES"], "#f2e2b8", "#2a4a8a"), 3, 4.4, -7.85, 2.4, 1.2);
      fx("poster", 256, 320, posterDraw, 3, 1.8, -7.9, 1.2, 1.5);
      for (let k = 0; k < 3; k++) fx(`vs${k}`, 256, 256, vaseDraw(k), 1.4 + k * 0.25, 0.35, -7.6, 0.5, 0.5);
      if (f > W.prohibido - 20) person("pim", PIMPIN, 4.4, 0, -6.6, { mode: "stand", expr: "nervous", facing: -1 }, 1, true, PIMS);
    }
    if (id === S.theft || id === S.chase || id === S.roll) {
      const th = thiefAt(f, id);
      if (th) { const down = id === S.roll && f > W.tira - 2; person("thief", LADRON, down ? th[0] + 0.8 : th[0], 0, th[1], { mode: down ? "sit" : "march", phase: t * 3, expr: down ? "dazed" : "grin", facing: down ? 0 : 1, tilt: down ? 0.3 : 0 }, 2, true, 1.0); if (!down) fx("chz", 256, 256, cheeseDraw, th[0] + 0.35, 1.3, th[1] + 0.2, 0.5, 0.5); }
      if (id === S.chase) {
        const base = -4 + (f - 535) * 0.08 - 2.2;
        if (f > W.guardias - 10) for (let j = 0; j < 2; j++) person(`gd${j}`, GUARD, base - j * 1.2, 0, 0.4 + j * 0.8, { mode: "march", phase: t * 3 + j, expr: "pained", facing: 1, wave: 0.9 }, 10 + j, true, 1.0);
        if (f > W.vecinos - 10) for (let j = 0; j < 3; j++) person(`vc${j}`, VEC(j), base - 3 - j * 1.1, 0, 0.2 + j * 0.6, { mode: "march", phase: t * 3 + j, expr: "shock", facing: 1 }, 20 + j, true, 1.0);
        if (f > W.perro - 10) card("dog", base - 6.5, 1.0, 0.5, dogDraw(t * 3, "walk", "stubby"), 1, 0);
      }
      if (id === S.roll) {
        const r = rollAt(f);
        fx("mat", 256, 256, matDraw, -3, 0.03, -7.0, 0.9, 0.9);
        person("pim", PIMPIN, r[0], r[1], r[2], { mode: r[3] ? "fall" : "stand", expr: r[3] ? "dazed" : "smile", facing: 0, tilt: r[4] }, 1, !r[3], PIMS);
      }
    }
    if (id === S.cheese) {
      person("pim", PIMPIN, 4.2, 0, 0.6, { mode: "stand", expr: f > W.cabeza - 4 ? "dazed" : "grin", facing: 0, wave: f < W.cabeza - 4 ? 0.95 : undefined }, 1, true, PIMS);
      person("thief", LADRON, 5.4, 0, 0.2, { mode: "sit", expr: "dazed", facing: 0, tilt: 0.3 }, 2, true, 1.0);
      const s = smooth((f - W.queso + 6) / 30), hy = f > W.cabeza - 4 ? 2.05 : 1.2 + (1 - s) * 4;
      fx("chz", 256, 256, cheeseDraw, f > W.cabeza - 4 ? 4.2 : 4.55, hy, 0.8, 0.6, 0.6);
      for (let j = 0; j < 2; j++) person(`gd${j}`, GUARD, 2.2 + j * 4.4, 0, -0.6, { mode: "stand", expr: "laugh", facing: j ? -1 : 1, wave: 0.9 }, 10 + j, true, 1.0);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
