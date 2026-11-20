// "El peor negocio de la historia": a pastel Provence street in Arles (origin) and a small cemetery corner (x = 30).
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { flatGround, tree, docDraw, coinDraw, textDraw, ctaDraw, exDraw, medalDraw } from "./props";
import { smooth, clamp01 } from "./story";
import { S, W } from "./story";

const JEANNE = (old: number): Outfit => ({ jacket: "#b86a8a", pants: "#b86a8a", dress: "#c87a9a", boots: "#3a2a2a", hat: "bonnet", cap: "#f2e2c8", hair: old ? "#e8e8e8" : "#d8d8d8", skin: SKINS[0], belt: null, buttons: "#f2e2c8" });
const LAWYER = (grey: number): Outfit => ({ jacket: "#2a3a5a", pants: "#2a3a5a", boots: "#1a1a1e", hat: "hair", hair: grey > 0.5 ? "#a8a8a8" : grey > 0.2 ? "#6a5a4a" : "#2a1a10", skin: SKINS[1], belt: null, buttons: "#c8c0b0", moustache: "#2a1a10" });
const WIDOW: Outfit = { jacket: "#1e1e24", pants: "#1e1e24", dress: "#1e1e24", boots: "#111", hat: "hair", hair: "#8a8a8a", skin: SKINS[1], belt: null, buttons: "#555" };
const bikeDraw = (ph: number) => (p: Pen) => {
  for (const x of [130, 380]) { p.ell(x, 170, 70, 70, null, 9); for (let k = 0; k < 4; k++) { const a = ph + (k * Math.PI) / 4; p.stroke([[x - Math.cos(a) * 66, 170 - Math.sin(a) * 66], [x + Math.cos(a) * 66, 170 + Math.sin(a) * 66]], 3, "#555"); } }
  p.stroke([[130, 170], [230, 170], [330, 80], [380, 170]], 10, "#c8323a"); p.stroke([[230, 170], [200, 80], [330, 80]], 10, "#c8323a"); p.stroke([[330, 80], [340, 40], [370, 40]], 8, "#2a2a2a"); p.poly([[180, 72], [230, 72], [225, 84], [185, 84]], "#3a2a2a", 3);
};
const chocDraw = (p: Pen) => { p.poly([[60, 60], [200, 60], [200, 210], [60, 210]], "#5a3218", 7); for (let x = 0; x < 2; x++) for (let y = 0; y < 3; y++) p.poly([[72 + x * 66, 72 + y * 46], [124 + x * 66, 72 + y * 46], [124 + x * 66, 108 + y * 46], [72 + x * 66, 108 + y * 46]], "#7a4a28", 3); p.poly([[60, 150], [200, 150], [200, 210], [60, 210]], "#e8c45a", 5); };
const tombDraw = (p: Pen) => { p.poly([[50, 250], [50, 90], [128, 30], [206, 90], [206, 250]], "#a8a8b0", 8); p.g.fillStyle = "#3a3a42"; p.g.font = "bold 46px Arial"; p.g.textAlign = "center"; p.g.fillText("R.I.P.", 128, 150); p.g.font = "bold 26px Arial"; p.g.fillText("el abogado", 128, 195); };
const cakeDraw = (p: Pen) => { p.poly([[40, 140], [216, 140], [216, 240], [40, 240]], "#f2c8d8", 7); p.poly([[40, 140], [216, 140], [216, 170], [40, 170]], "#fff6f8", 4); p.g.fillStyle = "#c8323a"; p.g.font = "bold 60px Arial"; p.g.textAlign = "center"; p.g.fillText("122", 128, 225); for (const x of [80, 128, 176]) { p.stroke([[x, 140], [x, 100]], 8, "#9ad4ff"); p.ell(x, 88, 8, 14, "#ffb23a", 0); } };
const vgDraw = (p: Pen) => {
  p.poly([[20, 20], [492, 20], [492, 620], [20, 620]], "#c89a3a", 16); p.poly([[50, 50], [462, 50], [462, 590], [50, 590]], "#2a4a8a", 0);
  const g = p.g; g.strokeStyle = "#9ad4ff"; g.lineWidth = 8; for (let k = 0; k < 7; k++) { g.beginPath(); g.arc(150 + (k % 3) * 120, 140 + Math.floor(k / 3) * 80, 40, 0, 4.5); g.stroke(); }
  p.ell(380, 120, 46, 46, "#ffe23a", 5); p.poly([[180, 590], [230, 340], [256, 280], [282, 340], [330, 590]], "#1a3a1a", 5);
  g.fillStyle = "#ffe23a"; g.font = "bold 52px 'Comic Sans MS', Arial"; g.textAlign = "center"; g.fillText("Van Gogh", 256, 560);
};
const calDraw = (n: string) => (p: Pen) => { p.poly([[30, 40], [482, 40], [482, 480], [30, 480]], "#f8f6f0", 8); p.poly([[30, 40], [482, 40], [482, 150], [30, 150]], "#c8323a", 8); p.g.fillStyle = "#fff"; p.g.font = "bold 64px Arial"; p.g.textAlign = "center"; p.g.fillText("AÑOS", 256, 120); p.g.fillStyle = "#2a2a30"; p.g.font = "bold 240px Arial"; p.g.fillText(n, 256, 400); };
const bubbleDraw = (txt: string) => (p: Pen) => { p.ell(256, 130, 230, 110, "#ffffff", 7); p.ell(90, 250, 22, 18, "#ffffff", 5); p.g.fillStyle = "#2a2a30"; p.g.font = "bold 62px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 256, 150); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    flatGround(R, 3000, 3000, "#c8b48a", 0, 0, -0.02);
    flatGround(R, 200, 6, "#d8c8a8", 0, -1, 0.006);
    const walls = ["#f2c8a0", "#f2d8c8", "#e8c87a", "#d8b8c8", "#f2e2b8", "#c8d8b8"], roofs = ["#c8643a", "#b85a3a", "#a8503a"];
    const home = (x: number, z: number, w: number, h: number, wall: string, roof: string) => {
      box(R, w, h, 3.6, lamC(wall), x, h / 2, z); box(R, w + 0.3, 0.35, 3.9, lamC(roof), x, h + 0.17, z);
      for (let i = 0; i < Math.floor(w / 1.3); i++) for (let j = 0; j < Math.floor(h / 1.6); j++) { const wx = x - w / 2 + 0.75 + i * 1.3, wy = 1.0 + j * 1.6; if (Math.abs(wx) < 0.7 && z > -6) continue; box(R, 0.62, 0.9, 0.05, lamC("#5a8aa8"), wx, wy + 0.3, z + 1.81); box(R, 0.16, 0.9, 0.06, lamC("#3a6a8a"), wx - 0.4, wy + 0.3, z + 1.82); box(R, 0.16, 0.9, 0.06, lamC("#3a6a8a"), wx + 0.4, wy + 0.3, z + 1.82); }
    };
    for (let k = 0; k < 9; k++) home(-16 + k * 4.1, -5, 4, 4 + (k % 3), walls[k % 6], roofs[k % 3]);
    for (let k = 0; k < 9; k++) home(-18 + k * 4.4, -14, 4.2, 6 + (k % 2) * 2, walls[(k + 2) % 6], roofs[(k + 1) % 3]);
    for (const x of [-9, -3.2, 4.4, 10]) { cyl(R, 0.06, 0.08, 1.2, lamC("#5a3a2a"), x, 0.6, -2.8, 6); const c = cyl(R, 0.02, 0.45, 3.4, lamC("#2a4a2a"), x, 2.6, -2.8, 8); void c; }
    box(R, 1.0, 1.9, 0.06, lamC("#3a6a8a"), 0, 0.95, -3.17);
    for (const [x, z] of [[-6, 3], [7, 2.5]] as const) tree(R, x, z, 1.1, "#7a8a3a");
    // cemetery corner
    flatGround(R, 12, 10, "#8a9a6a", 30, 0, 0.01); box(R, 12, 1.2, 0.3, lamC("#b8b0a0"), 30, 0.6, -2.4);
    for (const [x, z] of [[26, -1.6], [34, -1.2]] as const) { box(R, 0.5, 0.8, 0.12, lamC("#9a9aa2"), x, 0.4, z); }
    tree(R, 35.5, -3, 1.2, "#2a4a2a");
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const years = clamp01((f - W.pasan) / (W.treinta - W.pasan));
    if (id === S.hook || id === S.end || id === S.deal) {
      const shake = (id === S.hook && f > W.negocio) || (id === S.deal && f > W.trato - 4 && f < W.paga);
      person("jeanne", JEANNE(1), -0.55, 0, 0, { mode: "stand", expr: "smile", facing: 1, wave: shake ? 0.55 : undefined }, 1);
      person("lawyer", LAWYER(0), 0.55, 0, 0, { mode: "stand", expr: "grin", facing: -1, wave: shake ? 0.55 : undefined }, 2);
      if (id === S.hook && f > W.negocio - 4) fx("ex", 256, 256, exDraw, 0.55, 2.1, 0.2, 0.35, 0.35);
      if (id === S.deal) {
        if (f > W.trato - 4 && f < W.paga) fx("doc", 512, 620, docDraw("CONTRATO", "", "piso a cambio de pagos"), 0, 1.6, 0.4, 0.45, 0.54);
        if (f > W.paga - 4 && f < W.muera) { for (let k = 0; k < 4; k++) { const y = 1.9 - (((f - W.paga) * 0.03 + k * 0.25) % 1.0); fx(`coin${k}`, 256, 256, coinDraw("€"), -0.2 + k * 0.12, y, 0.3, 0.16, 0.16); } fx("month", 512, 256, textDraw("CADA MES", "#ffd23f", 90), 0, 2.1, 0.3, 0.8, 0.4); }
        if (f > W.muera - 4) fx("own", 512, 256, textDraw("PISO = SUYO", "#9ad4ff", 80), 0.3, 2.0, 0.3, 0.8, 0.4);
      }
      if (id === S.end && f > W.suscribete - 4 && f < W.abuela - 6) { const pr = smooth((f - W.suscribete) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 2.05, 0.6, 0.8, 0.4); }
    }
    if (id === S.town) {
      person("jeanne", JEANNE(1), -0.55, 0, 0, { mode: "stand", expr: "smile", facing: 1, wave: f > W.jeanne ? 0.8 : undefined }, 1);
      for (let k = 0; k < 4; k++) person(`p${k}`, LAWYER(k % 2), -7 + k * 4 + ((f * 0.02) % 2), 0, 1.8 + (k % 2), { mode: "stroll", phase: t * 6 + k, expr: "neutral", facing: 1 }, 5 + k);
    }
    if (id === S.think) {
      person("lawyer", LAWYER(0), 0.55, 0, 0, { mode: "stand", expr: "whistle", facing: -1 }, 2);
      if (f > W.dos - 6) fx("bub", 512, 300, bubbleDraw(f > W.tres - 4 ? "2... 3 AÑOS" : "2 AÑOS"), 0.15, 2.05, 0.3, 0.6, 0.35);
    }
    if (id === S.years) {
      const x = -2.5 + (f - 510) * 0.025;
      person("jeanne", JEANNE(1), x, 0.22, 0.6, { mode: "stroll", phase: t * 9, expr: f > W.chocolate - 4 ? "lick" : "laugh", facing: 1 }, 1);
      fx(`bike|${Math.round(t * 6) % 6}`, 512, 256, bikeDraw(t * 6), x + 0.05, 0.38, 0.62, 1.1, 0.55);
      if (f > W.chocolate - 4) fx("choc", 256, 256, chocDraw, x + 0.35, 1.25, 0.75, 0.2, 0.2);
      person("lawyer", LAWYER(years), 1.6, 0, -0.6, { mode: "stand", expr: years > 0.6 ? "shock" : "nervous", facing: -1 }, 2);
      const n = f > W.treinta - 4 ? "30" : f > W.veinte - 4 ? "20" : f > W.diez - 4 ? "10" : "";
      if (n) fx(`cal|${n}`, 512, 512, calDraw(n), 1.6, 2.35, -0.5, 0.5, 0.5);
    }
    if (id === S.widow) {
      fx("tomb", 256, 256, tombDraw, 30, 0.5, -0.8, 0.8, 0.8, false);
      if (f > W.viuda - 6) {
        person("widow", WIDOW, 30.6, 0, 0.2, { mode: "stand", expr: "pained", facing: -1, wave: f > W.pagando - 4 ? 0.6 : undefined }, 2);
        person("jeanne", JEANNE(1), 29.4, 0, 0.3, { mode: "stand", expr: "grin", facing: 1 }, 1);
        if (f > W.pagando - 4) for (let k = 0; k < 3; k++) fx(`c${k}`, 256, 256, coinDraw("€"), 30.2 - k * 0.15, 1.1 + Math.sin(t * 4 + k) * 0.04, 0.4, 0.15, 0.15);
      }
    }
    if (id === S.record) {
      person("jeanne", JEANNE(1), -0.6, 0, 0, { mode: "stand", expr: f > W.vangogh - 4 ? "shock" : "laugh", facing: 1, wave: 0.7 }, 1);
      if (f < W.vangogh - 6) { fx("cake", 256, 256, cakeDraw, -0.15, 1.0, 0.4, 0.4, 0.4); if (f > W.longeva - 4) fx("medal", 256, 384, medalDraw("1º"), -1.05, 1.5, 0.3, 0.26, 0.39); }
      else fx("vg", 512, 640, vgDraw, -0.05, 1.45, 0.3, 0.5, 0.62);
    }
  }
}
