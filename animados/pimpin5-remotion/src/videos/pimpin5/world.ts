// Pimpín 5 · "Miedica": the square (bakery door at (-3, -8)) and the bakery interior at INT.
import { Pen } from "./toon";
import { Base, Api, lam, lamC, box } from "./base";
import { rep, planksHD } from "./paint";
import { catDraw, pigeonDraw } from "./beasts";
import { textDraw, labelDraw, ctaDraw, signDraw, fireDraw, smokeDraw, medalDraw } from "./props";
import { villazanca, PIMPIN, HOGAZA, VEC } from "./villa";
import { S, W, INT, smoke, pimIn, smooth } from "./story";

export const PIMS = 1.1;
const sockDraw = (p: Pen) => { p.poly([[90, 20], [170, 20], [170, 170], [220, 210], [200, 250], [100, 230], [90, 170]], "#f4f1ea", 7); for (let k = 0; k < 5; k++) p.poly([[90, 34 + k * 40], [170, 34 + k * 40], [170, 52 + k * 40], [90, 52 + k * 40]], k % 2 ? "#3a6ab8" : "#d8302a", 0); };
const shadowDraw = (p: Pen) => { p.ell(128, 90, 60, 60, "rgba(20,10,30,0.85)", 0); p.ell(128, 260, 70, 110, "rgba(20,10,30,0.85)", 0); p.poly([[70, 360], [100, 360], [100, 500], [70, 500]], "rgba(20,10,30,0.85)", 0); p.poly([[156, 360], [186, 360], [186, 500], [156, 500]], "rgba(20,10,30,0.85)", 0); };
const coughDraw = (p: Pen) => { p.g.fillStyle = "#f4f1ea"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 10; p.g.font = "bold 90px 'Arial Black', Arial"; p.g.textAlign = "center"; p.g.strokeText("¡COF!", 256, 120); p.g.fillText("¡COF!", 256, 120); };
const arrowDraw = (txt: string, col: string, up = true) => (p: Pen) => { p.poly(up ? [[128, 10], [230, 120], [170, 120], [170, 300], [86, 300], [86, 120], [26, 120]] : [[86, 10], [170, 10], [170, 190], [230, 190], [128, 300], [26, 190], [86, 190]], col, 8); p.g.fillStyle = "#1a1010"; p.g.font = "bold 40px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 128, up ? 230 : 120); };


export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    villazanca(R);
    // bakery interior at INT: open towards +z
    const I = INT[0], wall = lamC("#e8d4b0"), wood = lam({ map: rep(planksHD(), 4, 4), color: "#b07a4a" });
    box(R, 10, 0.1, 8, wood, I, -0.03, -0.5); box(R, 10, 4, 0.3, wall, I, 2, -4.5); box(R, 0.3, 4, 8, wall, I - 5, 2, -0.5); box(R, 0.3, 4, 8, wall, I + 5, 2, -0.5); box(R, 10, 0.3, 8, lamC("#c8b490"), I, 4.1, -0.5);
    box(R, 2.4, 2.2, 1.4, lamC("#8a5a3a"), I + 3.2, 1.1, -3.6); box(R, 1.2, 0.8, 0.05, lamC("#2a1a10"), I + 3.2, 1.1, -2.88);
    box(R, 2.6, 0.12, 1.3, wood, I - 1.6, 1.0, -1.2); for (const dx of [-1.15, 1.15]) for (const dz of [-0.5, 0.5]) box(R, 0.1, 1.0, 0.1, wood, I - 1.6 + dx, 0.5, -1.2 + dz);
    box(R, 3.5, 1.2, 0.8, wood, I - 2.5, 0.6, -3.9);
  }
  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const k = smoke(f, id), ph = Math.floor(t * 4) % 4, I = INT[0];
    const crouch = (key: string, x: number, z: number, expr: any, facing: -1 | 0 | 1 = 0, walk = false) => person(key, PIMPIN, x, 0, z, { mode: "sit", phase: t * 3, expr, facing, look: Math.sin(t * 5) * 0.8, tilt: walk ? Math.sin(t * 10) * 0.05 : 0 }, 1, true, PIMS);
    if (id === S.hook || id === S.ja || id === S.end) {
      for (let j = 0; j < 8; j++) { const x = -3.0 + j * 0.85; if (Math.abs(x) < 0.5) continue; person(`v${j}`, VEC(j), x, 0, 1.4 + (j % 2) * 0.6, { mode: "stand", expr: id === S.ja ? "laugh" : "grin", facing: 0, wave: 0.6 + Math.sin(t * 5 + j) * 0.35 }, 10 + j, true, 1.0); }
      crouch("pim", 0, 3.0, id === S.ja ? "shock" : "nervous");
    }
    if (id === S.fear) {
      const jump = (g: number) => Math.max(0, 1 - Math.abs(f - g - 6) / 8);
      const jy = Math.max(jump(W.palomas), jump(W.sombra), jump(W.rayas)) * 0.6;
      person("pim", PIMPIN, 0, jy, 3.0, { mode: "stand", expr: jy > 0.05 ? "shock" : "nervous", facing: 0, wave: jy > 0.05 ? 0.95 : undefined }, 1, jy < 0.05, PIMS);
      if (f > W.palomas - 6 && f < W.sombra - 4) for (let j = 0; j < 3; j++) card(`pg${j}`, -1.1 + j * 1.1, 3.6 + (j % 2) * 0.3, 0.28, pigeonDraw((t * 2 + j) % 1), 1, 0);
      if (f > W.sombra - 4 && f < W.rayas - 6) { fx("sh", 256, 512, shadowDraw, 0.8, 0.9, 2.8, 0.9, 1.8); if (false) fx("shq", 1024, 256, textDraw("¡SU SOMBRA!", "#ffffff", 110), 0.2, 2.5, 3.0, 1.4, 0.35); }
      if (f > W.rayas - 6) fx("sock", 256, 256, sockDraw, 0.9, 1.0, 3.3, 0.6, 0.6);
    }
    if (id === S.ninja) {
      const x = -2 + smooth((f - 238) / 110) * 4;
      crouch("pim", x, 3.0, "nervous", 1, true);
      if (false) fx("nj", 1024, 256, textDraw("NINJA... ASUSTADO", "#ffd23f", 100), x, 2.0, 3.0, 1.8, 0.45);
    }
    const inside = id === S.cat || id === S.giants || id === S.fact || id === S.idea || id === S.enter;
    if (inside) {
      for (let j = 0; j < 10; j++) for (const z of [1.8, -1.5]) fx(`sm${j}|${(ph + j) % 4}|${z}`, 256, 256, smokeDraw((ph + j) % 4), I - 4.5 + j, 2.9 - (j % 2) * 0.25, z + (j % 3) * 0.2, 2.6 * k + 0.01, 2.4 * k + 0.01, true);
      fx(`fire|${ph}`, 256, 256, fireDraw(ph % 3), I + 3.2, 1.1, -2.84, 1.0, 1.0);
      if (!(id === S.enter && f > W.sale - 4)) card(`cat|${id === S.enter && f > W.migas2 - 4 ? 1 : 0}`, I - 1.6, -1.1, 0.42, catDraw(t * 2, "sit", false, "#9a9aa2"), 1, 0);
      if (id === S.cat && f > W.migas - 4) fx("ml", 512, 160, labelDraw("MIGAS", "#7a5a3a"), I - 1.6, 1.25, -0.9, 0.6, 0.19);
    }
    if (id === S.giants) for (let j = 0; j < 3; j++) { const x = I - 2 + j * 2; person(`v${j}`, VEC(j), x, 0, 0.6 + (j % 2) * 0.4, { mode: f > W.salen - 4 ? "march" : "stand", phase: t * 2, expr: f > W.salen - 4 ? "pained" : "stern", facing: f > W.salen - 4 ? -1 : 0, wave: f < W.salen - 4 ? 0.9 : undefined }, 10 + j, true, 1.0); if (f > W.tosiendo - 4) fx(`cof${j}`, 512, 256, coughDraw, x + 0.3, 1.9 - (j % 2) * 0.1, 1.2 + (j % 2) * 0.4, 0.8, 0.4); }
    if (id === S.fact || id === S.idea) { crouch("pim", I + 0.5, 0.8, id === S.idea ? "grin" : "nervous"); }
    if (id === S.fact) { if (f > W.sube - 6) fx("up", 256, 320, arrowDraw("HUMO", "#e8e8f0"), I - 0.45, 2.1, 2.7, 0.6, 0.75); if (f > W.agachado - 6) fx("dn", 256, 320, arrowDraw("AIRE", "#8ae86a", false), I + 0.55, 0.7, 2.7, 0.5, 0.62); }
    if (id === S.enter) {
      const px = pimIn(f), carry = f > W.sale - 4;
      crouch("pim", px, 0.8, carry ? "laugh" : "stern", carry ? 1 : -1, true);
      if (carry) card("catc", px + 0.15, 1.0, 0.32, catDraw(0, "sit", false, "#9a9aa2"), 1, 0, 0.3);
    }
    if (id === S.bake || id === S.medal) {
      fx("sign", 1024, 512, signDraw(["PANADERÍA", "HOGAZA"], "#f2e2b8", "#8a3a1a"), -3, 4.6, -7.85, 2.2, 1.1);
      const sm = id === S.bake ? smooth((f - W.humo + 10) / 20) : 0;
      if (sm > 0.02) for (let j = 0; j < 5; j++) { const y = 2.5 + ((t * 0.8 + j * 0.5) % 2.5) * 1.6; fx(`ex${j}|${(ph + j) % 4}`, 256, 256, smokeDraw((ph + j) % 4), -3 + Math.sin(j * 2) * 1.2, y, -7.6, 2.4 * sm, 2.2 * sm, true); }
      person("hog", HOGAZA, -0.6, 0, -4.5, { mode: "stand", expr: id === S.medal ? "laugh" : f > W.humo - 4 ? "shock" : "smile", facing: -1, wave: id === S.medal ? 0.6 : undefined }, 2, true, 1.0);
      for (let j = 0; j < 4; j++) person(`n${j}`, VEC(j + 3), 2.5 + j * 1.5, 0, -2.5 + (j % 2) * 1.2, { mode: "stand", expr: id === S.medal ? "laugh" : "shock", facing: -1, wave: id === S.medal ? 0.7 : undefined }, 12 + j, true, 1.0);
      if (id === S.medal) {
        const run = smooth((f - W.corriendo + 4) / 30), px = 0.8 - run * 7;
        person("pim", PIMPIN, px, 0, -2.4, { mode: run > 0 ? "march" : "stand", phase: t * 4, expr: run > 0 ? "shock" : "laugh", facing: run > 0 ? -1 : 0 }, 1, true, PIMS);
        if (run < 0.05) card("catc", 1.3, -2.2, 0.32, catDraw(0, "sit", false, "#9a9aa2"), 1, 0);
        if (f > W.medalla - 6) { const shine = 0.5 + 0.5 * Math.sin(t * 20); fx("med", 256, 384, medalDraw(""), px + 0.02, 0.8, -2.2, 0.24, 0.36); if (f > W.brilla - 30) fx(`gl|${shine > 0.5 ? 1 : 0}`, 256, 256, (p: Pen) => { for (let r = 0; r < 8; r++) { const a2 = (r / 8) * Math.PI * 2; p.band([[128, 128], [128 + Math.cos(a2) * (90 + shine * 30), 128 + Math.sin(a2) * (90 + shine * 30)]], "#fff27a", 10, 0); } }, px + 0.02, 0.75, -2.15, 0.8, 0.8); }
        if (false) fx("bri", 512, 200, textDraw("¡BRILLA!", "#ffd23f", 120), 0.6, 2.6, -2.0, 1.2, 0.47);
      }
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIMS); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
  }
}
