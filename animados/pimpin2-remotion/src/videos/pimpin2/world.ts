// Pimpín 2 · "El examen": the classroom (camera usually at the front looking +z at the students; back board at z = 8.4).
import { Pen } from "./toon";
import { Base, Api, lam, lamC, box } from "./base";
import { rep, planksHD } from "./paint";
import { textDraw, labelDraw, ctaDraw, bubbleDraw, flatGround, exDraw, qDraw, tearDraw } from "./props";
import { tallHouse, KIDT, PIM, PIMPIN, ESTIRADO, ZANCUDO, KIDV } from "./villa";
import { S, W, smooth } from "./story";

export const boardDraw = (lines: string[], head = "", red = false) => (p: Pen) => {
  p.poly([[6, 6], [1018, 6], [1018, 506], [6, 506]], "#8a5a32", 0); p.poly([[30, 30], [994, 30], [994, 482], [30, 482]], "#2e5a46", 6);
  p.g.textAlign = "center"; p.g.fillStyle = "#f4f1ea";
  if (head) { p.g.font = "bold 64px Arial"; p.g.fillText(head, 512, 110); }
  p.g.font = "bold 96px 'Comic Sans MS', Arial"; lines.forEach((l, k) => p.g.fillText(l, 512, (head ? 230 : 170) + k * 110));
  if (red) { p.g.strokeStyle = "#e8302a"; p.g.lineWidth = 28; p.g.beginPath(); p.g.moveTo(120, 90); p.g.lineTo(900, 440); p.g.moveTo(900, 90); p.g.lineTo(120, 440); p.g.stroke(); }
};
const paperDraw = (p: Pen) => { p.poly([[20, 10], [236, 10], [236, 300], [20, 300]], "#f8f6f0", 5); for (let k = 0; k < 6; k++) p.g.fillRect(44, 50 + k * 40, 160, 6); };
const gradeDraw = (txt: string, col: string) => (p: Pen) => { p.ell(128, 128, 112, 112, "#fffdf4", 9); p.g.fillStyle = col; p.g.font = "bold 150px Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 128, 180); };
const bagDraw = (p: Pen) => { p.poly([[40, 60], [216, 60], [230, 250], [26, 250]], "#3a8a6a", 8); p.poly([[60, 120], [196, 120], [196, 200], [60, 200]], "#2e6a52", 5); p.arc(128, 60, 50, 40, 180, 360, 12); };
const thinkDraw = (txt: string) => (p: Pen) => { p.ell(256, 110, 236, 96, "#ffffff", 8); p.ell(110, 220, 26, 20, "#ffffff", 6); p.ell(70, 248, 14, 11, "#ffffff", 5); p.g.fillStyle = "#1a1a1e"; p.g.textAlign = "center"; p.g.font = "bold 76px 'Comic Sans MS', Arial"; p.g.fillText(txt, 256, 138); };

// seats: [x, z]; Pimpín sits at (0, 1.5), Zancudo at (3, 1.5)
export const SEATS: [number, number][] = [[-3, -1.5], [3, -1.5], [-3, 1.5], [3, 1.5], [-3, 4.5], [1.6, 4.5], [3.9, 4.5]];
export const PIMS: [number, number] = [0, 1.5];

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    const floor = lam({ map: rep(planksHD(), 8, 8), color: "#c89a6a" }); box(R, 16, 0.1, 18, floor, 0, -0.04, 0.8);
    const wall = lamC("#e8dcc0"), wainscot = lamC("#8aa0b8");
    box(R, 16, 7, 0.3, wall, 0, 3.5, 8.8); box(R, 16, 7, 0.3, wall, 0, 3.5, -7.4);
    for (const sx of [-1, 1]) { box(R, 0.3, 7, 16.5, wall, sx * 7.8, 3.5, 0.7); box(R, 0.32, 1.2, 16.5, wainscot, sx * 7.78, 0.6, 0.7); for (let k = 0; k < 3; k++) box(R, 0.34, 2.4, 2.0, lamC("#9ad0f0"), sx * 7.75, 3.8, -4 + k * 5); }
    box(R, 16, 1.2, 0.32, wainscot, 0, 0.6, 8.75); box(R, 16, 1.2, 0.32, wainscot, 0, 0.6, -7.35);
    const desk = lam({ map: rep(planksHD(), 1, 1), color: "#a8703a" });
    for (const [x, z] of [...SEATS, PIMS]) { box(R, 1.6, 0.1, 0.9, desk, x, 1.35, z - 0.75); for (const dx of [-0.7, 0.7]) box(R, 0.1, 1.3, 0.1, desk, x + dx, 0.65, z - 0.75); }
    box(R, 0.7, 0.75, 0.6, desk, PIMS[0], 0.37, PIMS[1]);
    box(R, 2.4, 1.4, 1.0, desk, -2.5, 0.7, -5.6);
    tallHouse; flatGround;
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const pimExpr = (): "smile" | "nervous" | "shock" | "laugh" | "stern" | "relief_open" =>
      id === S.grades ? (f > W.diez - 4 ? "laugh" : "nervous") : id === S.pimpin ? (f > W.espaldas - 4 ? "shock" : "nervous") : id === S.think ? (f > W.seis - 4 ? "relief_open" : "stern") : "smile";
    const copying = id === S.hook || id === S.tall || id === S.zancudo || id === S.pimpin || id === S.end;
    SEATS.forEach(([x, z], k) => {
      const zan = x === 3 && z === 1.5;
      const expr = id === S.grades ? (f > [W.cero, W.cero2, W.cero3, W.cero4][k % 4] - 4 ? "shock" : "grin") : copying ? (k % 2 ? "grin" : "whistle") : "neutral";
      const fc = zan ? (id === S.zancudo && f > W.pizarra - 30 ? 1 : 0) : copying ? (x < 3 ? 1 : -1) : 0;
      person(zan ? "zan" : `k${k}`, zan ? ZANCUDO : KIDV(k), x, 0, z, { mode: "stand", expr, facing: fc as 0 | 1 | -1, tilt: copying && !zan ? 0.1 * fc : 0, headTilt: copying ? 0.15 * fc : 0 }, 10 + k, true, zan ? KIDT * 1.12 : KIDT);
      fx(`pa${k}`, 256, 320, paperDraw, x, 1.42, z - 0.7, 0.32, 0.4);
      if (id === S.grades) { const g = [W.cero, W.cero2, W.cero3, W.cero4][k % 4]; if (f > g - 2) fx(`g${k}`, 256, 256, gradeDraw("0", "#e8302a"), x, 3.25, z, 0.6, 0.6); }
    });
    person("pim", PIMPIN, PIMS[0], 0.75, PIMS[1], { mode: "stand", expr: pimExpr(), facing: 0, wave: (id === S.pimpin && f > W.intenta - 4 && f < W.espaldas) || (id === S.grades && f > W.diez - 4) ? 0.95 : undefined }, 1, true, PIM);
    fx("pap", 256, 320, paperDraw, PIMS[0] + 0.5, 1.5, PIMS[1] - 0.7, 0.32, 0.4);
    // back board (the little ones' class) and the front board
    fx(`bb|${id === S.notas && f > W.mal - 4 ? 1 : 0}`, 1024, 512, boardDraw(["7 × 8 = 87", "2 + 2 = 22"], "CLASE DE LOS PEQUEÑOS", id === S.notas && f > W.mal - 4), 1.5, 3.6, 8.6, 3.6, 1.8);
    fx("fb", 1024, 512, boardDraw(["7 × 8 = ?", "15 − 6 = ?"], "EXAMEN SORPRESA"), 0, 3.6, -7.2, 3.6, 1.8);
    if (id === S.intro || id === S.notas) {
      person("est", ESTIRADO, -2.8, 0, -5.0, { mode: "stand", expr: id === S.notas ? "stern" : "grin", facing: 1, wave: id === S.intro ? 0.8 : undefined }, 2, true, 1.45);
      if (id === S.intro && f > W.estirado - 4) fx("lab", 512, 160, labelDraw("DON ESTIRADO", "#4a5a3a"), -2.2, 3.95, -4.9, 1.0, 0.31);
    }
    if (id === S.zancudo && f > W.zancudo - 4 && f < W.pizarra - 20) fx("zl", 512, 160, labelDraw("ZANCUDO", "#3a7ac8"), 3, 3.55, 1.6, 0.8, 0.25);
    if (id === S.pimpin) {
      if (f > W.metro - 4 && f < W.intenta) fx("m", 512, 200, textDraw("1,20 m", "#ffd23f", 110), PIMS[0], 2.15, PIMS[1] + 0.2, 0.7, 0.27);
      if (f > W.espaldas - 4) fx("q", 256, 256, qDraw, PIMS[0] + 0.35, 2.0, PIMS[1] + 0.2, 0.35, 0.35);
      if (f > W.mochila - 4) fx("bag", 256, 256, bagDraw, PIMS[0] - 0.5 + Math.max(0, W.mochila + 6 - f) * 0.08, 1.1, PIMS[1] + 0.4, 0.55, 0.55);
    }
    if (id === S.think) {
      fx(`th|${f > W.siete - 4 ? (f > W.seis - 4 ? 2 : 1) : 0}`, 512, 256, thinkDraw(f > W.seis - 4 ? "7 × 8 = 56" : f > W.siete - 4 ? "7 × 8 = ..." : "..."), PIMS[0] + 0.5, 2.5, PIMS[1] + 0.3, 1.1, 0.55);
      if (f < W.seis - 4) fx("sw", 256, 256, tearDraw, PIMS[0] + 0.22, 1.75, PIMS[1] + 0.25, 0.1, 0.1);
    }
    if (id === S.grades && f > W.diez - 2) { fx("g10", 256, 256, gradeDraw("10", "#2a9a3a"), PIMS[0], 2.3, PIMS[1] + 0.1, 0.55 + 0.1 * Math.max(0, 1 - (f - W.diez) / 8), 0.55 + 0.1 * Math.max(0, 1 - (f - W.diez) / 8)); }
    if (id === S.cta) { const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5 + PIMS[1], 2.2, 1.1); }
    void exDraw; void bubbleDraw; void t;
  }
}
