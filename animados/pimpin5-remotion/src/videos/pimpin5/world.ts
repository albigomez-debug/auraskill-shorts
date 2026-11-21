// Pimpín 5 · "Humo en la panadería": the square (bakery door at (-3, -8)) and the bakery interior at INT.
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lam, lamC, box } from "./base";
import { rep, planksHD } from "./paint";
import { catDraw } from "./beasts";
import { textDraw, labelDraw, ctaDraw, signDraw, fireDraw, smokeDraw, bubbleDraw } from "./props";
import { villazanca, TALL, PIM, PIMPIN, HOGAZA, VEC } from "./villa";
import { S, W, INT, smoke, pimIn, smooth } from "./story";

const FIRE: Outfit = { jacket: "#c8302a", pants: "#2a2a30", boots: "#1a1a1a", hat: "cap", cap: "#e8c020", skin: SKINS[1], belt: "#e8c020", buttons: "#e8c020", moustache: "#3a2a1a" };
const cakeDraw = (p: Pen) => { const t = [[60, 560, 452, 740, "#f4d8e8"], [110, 380, 402, 560, "#f8f4ec"], [160, 220, 352, 380, "#f4d8e8"]] as [number, number, number, number, string][]; for (const [a, b, c, d, col] of t) { p.poly([[a, b], [c, b], [c, d], [a, d]], col, 8); p.band([[a, b + 18], [(a + c) / 2, b + 40], [c, b + 18]], "#e84a6a", 16, 0); } for (let k = 0; k < 5; k++) { const x = 190 + k * 33; p.poly([[x, 150], [x + 12, 150], [x + 12, 220], [x, 220]], "#8ac8f0", 4); p.ell(x + 6, 132, 9, 16, "#ffb030", 3); } };
const coughDraw = (p: Pen) => { p.g.fillStyle = "#f4f1ea"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 10; p.g.font = "bold 90px 'Arial Black', Arial"; p.g.textAlign = "center"; p.g.strokeText("¡COF!", 256, 120); p.g.fillText("¡COF!", 256, 120); };
const waterDraw = (k: number) => (p: Pen) => { for (let j = 0; j < 4; j++) p.band([[0, 128 + j * 8], [180, 100 + j * 6 + ((k + j) % 3) * 6], [400, 120 + j * 10], [512, 180 + j * 12]], j % 2 ? "#9ad4ff" : "#d8f0ff", 14 - j * 2, 0); };
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
    const inside = id === S.hook || id === S.giants || id === S.cat || id === S.idea || id === S.fact || id === S.enter || id === S.end;
    if (inside) {
      // smoke layer: everything above ~1.6 m is grey
      for (let j = 0; j < 10; j++) for (const z of [1.8, -1.5]) fx(`sm${j}|${(ph + j) % 4}|${z}`, 256, 256, smokeDraw((ph + j) % 4), I - 4.5 + j, 2.9 - (j % 2) * 0.25, z + (j % 3) * 0.2, 2.6 * k + 0.01, 2.4 * k + 0.01, true);
      fx(`fire|${ph}`, 256, 256, fireDraw(ph % 3), I + 3.2, 1.1, -2.84, 1.0, 1.0);
      if (!(id === S.hook || id === S.end || (id === S.enter && f > W.sale - 4))) card(`cat|${id === S.enter && f > W.migas2 - 4 ? 1 : 0}`, I - 1.6, -1.1, 0.42, catDraw(t * 2, "sit", false, "#9a9aa2"), 1, 0);
      if (id === S.cat && f > W.migas - 4) fx("ml", 512, 160, labelDraw("MIGAS", "#7a5a3a"), I - 1.6, 1.25, -0.9, 0.6, 0.19);
      if (id === S.cat) fx("miau", 512, 256, bubbleDraw("¡MIAU!"), I - 1.0, 1.55, -0.9, 0.7, 0.35);
    }
    if (id === S.giants) for (let j = 0; j < 3; j++) { const x = I - 2 + j * 2; person(`v${j}`, VEC(j), x, 0, 0.6 + (j % 2) * 0.4, { mode: f > W.salir - 4 ? "march" : "stand", phase: t * 2, expr: "shock", facing: f > W.salir - 4 ? -1 : 0, wave: 0.9 }, 10 + j, true, TALL); if (f > W.tosen - 4) fx(`cof${j}`, 512, 256, coughDraw, x + 0.3, 1.45 - (j % 2) * 0.1, 1.2 + (j % 2) * 0.4, 0.8, 0.4); }
    if (id === S.idea || id === S.fact || id === S.enter || id === S.hook || id === S.end) {
      const px = id === S.enter ? pimIn(f) : id === S.hook || id === S.end ? I - 0.5 : I + 0.5, carry = (id === S.enter && f > W.sale - 4) || id === S.hook || id === S.end;
      person("pim", PIMPIN, px, 0, 0.8, { mode: id === S.enter || id === S.hook || id === S.end ? "march" : "stand", phase: t * 2, expr: carry ? "laugh" : id === S.fact ? "grin" : "stern", facing: id === S.enter && f > W.sale - 4 ? 1 : 0 }, 1, true, PIM);
      if (carry) card("catc", px + 0.15, 1.0, 0.32, catDraw(0, "sit", false, "#9a9aa2"), 1, 0, 0.35);
    }
    if (id === S.fact) { if (f > W.sube - 6) fx("up", 256, 320, arrowDraw("HUMO", "#e8e8f0"), I - 0.45, 2.1, 2.7, 0.6, 0.75); if (f > W.agachado - 6) fx("dn", 256, 320, arrowDraw("AIRE", "#8ae86a", false), I + 0.55, 0.7, 2.7, 0.5, 0.62); }
    // the square
    if (id === S.intro || id === S.out || id === S.cake) {
      fx("sign", 1024, 512, signDraw(["PANADERÍA", "HOGAZA"], "#f2e2b8", "#8a3a1a"), -3, 4.6, -7.85, 2.2, 1.1);
      const sm = id === S.intro ? smooth((f - W.humo + 10) / 20) : id === S.out ? 1 - smooth((f - W.apagan) / 40) : 0;
      if (sm > 0.02) for (let j = 0; j < 5; j++) { const y = 2.5 + ((t * 0.8 + j * 0.5) % 2.5) * 1.6; fx(`ex${j}|${(ph + j) % 4}`, 256, 256, smokeDraw((ph + j) % 4), -3 + Math.sin(j * 2) * 1.2, y, -7.6, 2.4 * sm, 2.2 * sm, true); }
      person("hog", HOGAZA, -0.6, 0, -4.5, { mode: "stand", expr: id === S.cake ? "laugh" : id === S.intro && f > W.humo - 4 ? "shock" : "smile", facing: -1, wave: id === S.cake && f > W.regala - 4 ? 0.95 : undefined }, 2, true, TALL);
      if (id === S.intro && f > W.hogaza - 4 && f < W.humo) fx("hl", 512, 160, labelDraw("SRA. HOGAZA", "#8a3a1a"), -0.6, 4.25, -4.4, 1.1, 0.34);
      for (let j = 0; j < 4; j++) person(`n${j}`, VEC(j + 3), 2.5 + j * 1.5, 0, -2.5 + (j % 2) * 1.2, { mode: "stand", expr: id === S.cake ? "laugh" : "shock", facing: -1, wave: id === S.cake ? 0.7 : undefined }, 12 + j, true, TALL);
      if (id === S.out || id === S.cake) { person("pim", PIMPIN, 0.8, 0, -3.4, { mode: "stand", expr: "laugh", facing: -1, wave: id === S.cake ? 0.95 : undefined }, 1, true, PIM); card("catc", 0.95, -3.2, 0.32, catDraw(0, "sit", false, "#9a9aa2"), 1, 0, 0.35); }
      if (id === S.out) for (let j = 0; j < 2; j++) { const x = -5.5 + j * 4.6; person(`fi${j}`, FIRE, x, 0, -4.8, { mode: "stand", expr: "stern", facing: j ? -1 : 1, wave: 0.6 }, 20 + j, true, TALL); if (f > W.bomberos + 10) fx(`wa${j}|${ph}`, 512, 256, waterDraw(ph), x + (j ? -1.1 : 1.1), 2.6, -6.0, 2.0, 1.0); }
      if (id === S.cake && f > W.tarta - 6) fx("cake", 512, 768, cakeDraw, 2.0, 1.35 * smooth((f - W.tarta + 6) / 10) + 0.01, -2.0, 1.8 * smooth((f - W.tarta + 6) / 10) + 0.01, 2.7 * smooth((f - W.tarta + 6) / 10) + 0.01);
    }
    if (id === S.cta) { person("pim", PIMPIN, 0, 0, 1.0, { mode: "stand", expr: "smile", facing: 0, wave: 0.9 }, 1, true, PIM); const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1); }
    void textDraw;
  }
}
