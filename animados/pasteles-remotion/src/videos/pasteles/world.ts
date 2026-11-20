// "La Guerra de los Pasteles": the pastry shop in Mexico City (x = 0), the Paris ministry (PAR), Veracruz fort and the French fleet (VER), the leg's funeral (FUN).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD, stoneHD } from "./paint";
import { Base, Api, lam, lamC, box } from "./base";
import { grassGround, flatGround, house, sailShip, seaPlane, palm, textDraw, docDraw, signDraw, smokeDraw, qDraw, exDraw, flagDraw, labelDraw, coinDraw } from "./props";
import { burstDraw } from "./beasts";
import { S, W, PAR, VER, FUN } from "./story";

const CHEF: Outfit = { jacket: "#f4f1ea", pants: "#3a3a44", boots: "#2a2020", hat: "toque", skin: SKINS[0], moustache: "#3a2a1a", belt: null, build: "stout" };
const MXS = (v: number): Outfit => ({ jacket: "#2a3a6a", pants: "#f2ece0", boots: "#111", hat: "shako", skin: SKINS[1 + (v % 2)], belt: "#f2ece0", moustache: v % 2 ? "#1a1a1a" : undefined, buttons: "#e8c45a" });
const MIN: Outfit = { jacket: "#1a1a2a", pants: "#1a1a2a", boots: "#111", hat: "hair", hair: "#8a8a8a", skin: SKINS[0], belt: null, sash: "#c8202a", buttons: "#e8c45a", moustache: "#8a8a8a" };
const SANTA: Outfit = { jacket: "#2a3a6a", pants: "#f2ece0", boots: "#111", hat: "bicorne", skin: SKINS[1], belt: null, sash: "#3a8a4a", buttons: "#e8c45a", sword: true };
const MXO: Outfit = { ...MXS(1), hat: "bicorne", sash: "#c8202a" };
const fra = flagDraw(["#1a3a8a", "#f4f1ea", "#c8202a"], true);
const mex = flagDraw(["#2a7a3a", "#f4f1ea", "#c8202a"], true, (p) => p.ell(256, 159, 30, 30, "#8a5a2a", 4));
const cakeDraw = (k: number) => (p: Pen) => { p.poly([[50, 220], [206, 220], [196, 120], [60, 120]], ["#f2c8d0", "#c89a6a", "#f2ecd8"][k % 3], 7); p.ell(128, 120, 70, 24, "#fff6f0", 6); p.ell(128, 92, 16, 16, "#c8202a", 4); };
const bigCakeDraw = (p: Pen) => { p.poly([[40, 470], [472, 470], [452, 260], [60, 260]], "#f2c8d0", 10); p.poly([[90, 260], [422, 260], [402, 120], [110, 120]], "#fff6f0", 10); p.ell(256, 100, 40, 40, "#c8202a", 6); p.g.fillStyle = "#c8202a"; p.g.font = "bold 50px Arial"; p.g.textAlign = "center"; p.g.fillText("PÂTISSERIE", 256, 380); };
const bookDraw = (p: Pen) => { p.poly([[40, 30], [472, 30], [472, 600], [40, 600]], "#7a2a2a", 10); p.poly([[40, 30], [90, 30], [90, 600], [40, 600]], "#5a1a1a", 0); p.g.fillStyle = "#ffd23f"; p.g.textAlign = "center"; p.g.font = "bold 54px Georgia"; p.g.fillText("LA GUERRA", 280, 220); p.g.fillText("DE LOS", 280, 300); p.g.fillText("PASTELES", 280, 380); p.g.font = "bold 40px Georgia"; p.g.fillText("1838", 280, 480); };
const coffinDraw = (p: Pen) => { p.poly([[30, 140], [120, 90], [480, 100], [480, 180], [120, 190], [30, 150]], "#4a2a1a", 8); p.g.fillStyle = "#e8c45a"; p.g.font = "bold 36px Arial"; p.g.textAlign = "center"; p.g.fillText("PIERNA", 290, 155); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#b8b87a");
    // Mexico City street and the pastry shop interior (counter + back wall)
    flatGround(R, 30, 14, "#d8c8a8", 0, -2, 0.012);
    for (let k = 0; k < 5; k++) house(R, -9 + k * 4.5, -7, 4, 4 + (k % 2), 3, ["#e8a878", "#f2d890", "#d87a6a"][k % 3], "#8a3a2a");
    box(R, 8, 3.2, 0.2, lam({ map: rep(planksHD(), 2, 1), color: "#f2d8b0" }), 0, 1.6, -2.2);
    box(R, 3.2, 0.9, 0.7, lam({ map: rep(planksHD(), 1, 0.4), color: "#8a5a3a" }), 0, 0.45, -1.2);
    // Paris ministry
    box(R, 16, 3.6, 0.2, lamC("#e8dcc8"), PAR[0] + 3, 1.8, -2); flatGround(R, 16, 8, "#7a3a2a", PAR[0] + 3, 1, 0.012);
    box(R, 1.6, 0.8, 0.8, lamC("#5a3a20"), PAR[0] + 6, 0.4, -1.0);
    // Veracruz: sea, stone fort on the coast, the French fleet
    seaPlane(R, -0.25, "#2f8ab0");
    flatGround(R, 30, 12, "#e2c890", VER[0], -10, 0.01);
    const st = lam({ map: rep(stoneHD(), 4, 1), color: "#c8b898" });
    box(R, 12, 3, 4, st, VER[0], 1.5, -12); for (let k = 0; k < 6; k++) box(R, 0.8, 0.8, 0.8, st, VER[0] - 5 + k * 2, 3.4, -10.4);
    for (let k = 0; k < 3; k++) palm(R, VER[0] - 9 + k * 9, -7, 0.9);
    for (let k = 0; k < 3; k++) sailShip(R, VER[0] - 8 + k * 8, 12 + (k % 2) * 4, 0.9, "#2a2a30", 3, Math.PI);
    // funeral street
    flatGround(R, 20, 8, "#d8c8a8", FUN[0], 0, 0.012);
    for (let k = 0; k < 4; k++) house(R, FUN[0] - 6 + k * 4, -5, 3.6, 4, 3, ["#e8a878", "#f2d890"][k % 2], "#8a3a2a");
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const P = PAR[0], V = VER[0], F = FUN[0];
    const firing = id === S.hook || id === S.end || (id === S.fleet && f > W.bombardea - 4);
    if (firing) for (let k = 0; k < 3; k++) {
      if ((Math.floor(f / 8) + k) % 3 === 0) fx(`fl${k}`, 256, 256, burstDraw("#ffd23f"), V - 8 + k * 8, 1.6, 9.6, 2.4, 2.4);
      if ((Math.floor(f / 10) + k) % 2 === 0) fx(`hit${k}`, 256, 256, burstDraw("#ff8a3a"), V - 4 + k * 4, 2.6, -9.6, 2.2, 2.2);
      fx(`sm${k}`, 256, 256, smokeDraw(k), V - 4 + k * 4, 3.6 + ((f / 40 + k * 0.3) % 1) * 2, -9.8, 2.6, 2.6, true);
    }
    if (id === S.hook || id === S.end) {
      fx("bigcake", 512, 512, bigCakeDraw, V + 0.5, 1.6, 0.5, 1.2, 1.2);
      fx("vs", 512, 200, textDraw("VS", "#ff4a3a", 140), V + 0.5, 2.6, 0.5, 0.8, 0.31);
    }
    if (id === S.city) {
      fx("shop", 1024, 512, signDraw(["PÂTISSERIE"], "#f2ece0", "#c8202a"), 0, 3.4, -2.05, 2.2, 1.1);
      fx("mex", 512, 320, mex, -4, 3.6, -5.4, 1.2, 0.75);
    }
    if (id === S.eat) {
      const gone = 6 - Math.max(0, Math.floor((f - W.comen) / 4));
      for (let k = 0; k < Math.min(6, gone); k++) fx(`ck${k}`, 256, 256, cakeDraw(k), -1.2 + k * 0.48, 1.08, -1.0, 0.36, 0.36);
      for (let k = 0; k < 3; k++) person(`s${k}`, MXS(k), -1.4 + k * 1.0, 0, -0.1, { mode: "stand", expr: f > W.comen - 4 ? "laugh" : "grin", facing: 0, wave: f > W.comen - 4 ? Math.sin(t * 8 + k) * 0.3 + 0.6 : undefined }, 10 + k);
      person("chef", CHEF, 1.8, 0, -0.3, { mode: "stand", expr: f > W.comen ? "shock" : "smile", facing: -1 }, 1);
      if (f > W.remontel - 4 && f < W.comen) fx("name", 512, 160, labelDraw("M. REMONTEL", "#1a3a8a"), 1.8, 2.4, -0.2, 0.9, 0.28);
      if (f > W.pagar - 6) fx("np", 512, 200, textDraw("¡SIN PAGAR!", "#ff4a3a", 96), 0, 2.4, 0.2, 1.1, 0.43);
    }
    if (id === S.complain || id === S.pay) {
      const pay = id === S.pay;
      person("a", pay ? MXO : CHEF, P - 0.5, 0, 0, { mode: "stand", expr: pay ? "nervous" : f > W.sesenta - 4 ? "shout" : "stern", facing: 1, wave: !pay && f > W.queja - 4 ? 0.9 : undefined }, 1);
      person("min", MIN, P + 0.6, 0, -0.1, { mode: "stand", expr: pay ? "grin" : f > W.barbaridad - 4 ? "shock" : "neutral", facing: -1 }, 2);
      if (!pay && f > W.sesenta - 4) fx("bill", 512, 620, docDraw("FACTURA", f > W.barbaridad - 4 ? "¡60.000 $!" : "", "pasteles"), P + 0.05, 1.4, 0.3, 0.42, 0.5);
      if (pay && f > W.seiscientos - 6) { fx("bill2", 512, 620, docDraw("TRATADO", "600.000 $", "México paga"), P + 0.05, 1.4, 0.3, 0.42, 0.5); for (let k = 0; k < 5; k++) fx(`c${k % 3}`, 256, 256, coinDraw("$"), P - 0.6 + k * 0.3, 0.2 + Math.abs(Math.sin(t * 3 + k)) * 0.05, 0.4, 0.25, 0.25); }
      fx("fr", 512, 320, fra, P - 1.6, 2.4, -1.85, 0.9, 0.56);
    }
    if (id === S.excuse || id === S.books) {
      const X = P + 6;
      person("min", MIN, X - 0.3, 0, 0, { mode: "stand", expr: id === S.books ? "laugh" : f > W.excusa - 4 ? "grin" : "stern", facing: 1, wave: f > W.excusa - 4 || id === S.books ? 0.8 : undefined }, 1);
      if (id === S.excuse && f > W.deudas - 6) for (let k = 0; k < 3; k++) fx(`d${k}`, 512, 620, docDraw("DEUDA", "", `México ${k + 1}`), X + 0.4 + k * 0.12, 1.3 + k * 0.05, 0.2 + k * 0.02, 0.32, 0.39);
      if (id === S.excuse && f > W.excusa - 4) fx("exc", 512, 200, textDraw("¡EXCUSA!", "#ffd23f", 110), X, 2.4, 0.2, 0.9, 0.35);
      if (id === S.books && f > W.libros - 6) fx("book", 512, 620, bookDraw, X + 0.45, 1.35, 0.3, 0.42, 0.5);
    }
    if (id === S.fleet && f > W.bloquea - 4 && f < W.bombardea) fx("blk", 512, 200, textDraw("BLOQUEO", "#ff4a3a", 110), V, 6, 4, 6, 2.3);
    if (id === S.general) {
      person("santa", SANTA, V, 3.0, -10.6, { mode: f > W.pierna - 4 ? "fall" : "stand", expr: f > W.pierna - 4 ? "pained" : "stern", facing: 0, wave: f < W.pierna - 4 ? 0.9 : undefined }, 1);
      if (f > W.santa - 4 && f < W.pierna - 4) fx("name", 512, 160, labelDraw("SANTA ANNA", "#2a7a3a"), V, 5.0, -10.2, 0.9, 0.28);
      if (f > W.pierna - 4) { fx("ex", 256, 256, exDraw, V + 0.5, 4.8, -10.2, 0.4, 0.4); fx("leg", 512, 160, labelDraw("-1 PIERNA", "#c8323a"), V - 0.2, 5.0, -10.2, 0.8, 0.25); }
      fx("mex", 512, 320, mex, V - 1.3, 4.6, -10.8, 0.7, 0.44);
    }
    if (id === S.funeral) {
      const x0 = F + 2 - (f - 722) * 0.025;
      fx("coffin", 512, 256, coffinDraw, x0, 1.3, 0, 1.1, 0.55);
      for (let k = 0; k < 2; k++) person(`p${k}`, MXS(k), x0 - 0.4 + k * 0.8, 0, -0.15, { mode: "stroll", phase: t * 4 + k, expr: "stern", facing: -1 }, 1 + k);
      person("santa", SANTA, x0 + 1.4, 0, -0.4, { mode: "stand", expr: "stern", facing: -1, wave: 0.9 }, 3);
      fx("mex", 512, 320, mex, x0 + 1.8, 2.3, -0.4, 0.6, 0.38);
      if (f > W.entierro - 4) fx("hon", 512, 200, textDraw("CON HONORES", "#ffd23f", 80), F, 2.6, 0, 1.2, 0.47);
    }
    if (id === S.tasty) {
      person("chef", CHEF, -0.3, 0, 0, { mode: "stand", expr: f > W.buenos - 10 ? "nervous" : "smile", facing: 1 }, 1);
      fx("ck", 256, 256, cakeDraw(0), 0.25, 1.15, 0.3, 0.35, 0.35);
      if (f > W.desgracia + 10) fx("q", 256, 256, qDraw, 0.25, 1.65, 0.3, 0.35, 0.35);
    }
  }
}
