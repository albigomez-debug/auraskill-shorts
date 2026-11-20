// "Maratón de 1904": dusty road along x (runners run +x), the car, the orchard (ORC), the stadium (STD).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, tree, house, textDraw, labelDraw, bottleDraw, appleDraw, carDraw, medalDraw, smokeDraw, zDraw, exDraw, ctaDraw, flagDraw } from "./props";
import { S, W, ORC, STD, lorzX, carX, smooth } from "./story";

const RUN = (v: number): Outfit => ({ jacket: ["#f4f1ea", "#e8202a", "#2a5ab8", "#f4f1ea", "#2a8a4a"][v % 5], pants: "#1a1a1e", boots: "#2a2020", hat: "hair", hair: ["#3a2a1a", "#1a1a1a", "#8a6a3a"][v % 3], skin: SKINS[v % 4], belt: null });
const LORZ: Outfit = { jacket: "#f4f1ea", pants: "#1a1a1e", boots: "#2a2020", hat: "hair", hair: "#3a2a1a", skin: SKINS[0], belt: null };
const HICKS: Outfit = { jacket: "#f4f1ea", pants: "#3a3a44", boots: "#2a2020", hat: "hair", hair: "#5a3a1a", skin: SKINS[0], moustache: "#5a3a1a", belt: null };
const HELP = (v: number): Outfit => ({ jacket: ["#3a3a44", "#5a4a3a"][v % 2], pants: "#2a2a30", boots: "#111", hat: v ? "tophat" : "slouch", cap: "#3a3a3a", skin: SKINS[v % 2], moustache: "#3a2a1a", belt: null });
const CARVA: Outfit = { jacket: "#f4f1ea", pants: "#3a3a5a", boots: "#2a2020", hat: "slouch", cap: "#5a4a3a", skin: SKINS[2], moustache: "#1a1a1a", belt: null };
const DRIVER: Outfit = { jacket: "#3a3a44", pants: "#2a2a30", boots: "#111", hat: "cap", cap: "#2a2a2a", skin: SKINS[1], moustache: "#3a2a1a", belt: null };
const FAN = (v: number): Outfit => { const o: Outfit = { jacket: ["#5a3a2a", "#2a3a4a", "#6a5a3a", "#7a2a3a", "#3a4a3a"][v % 5], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 4] }; return v % 3 === 1 ? { ...o, hat: "bonnet", dress: ["#c25a7a", "#5a8fc2", "#d9a441"][v % 3] } : { ...o, hat: v % 2 ? "tophat" : "slouch", cap: "#3a3a3a" }; };
const tempDraw = (p: Pen) => { p.poly([[100, 30], [156, 30], [156, 380], [100, 380]], "#f4f6f8", 8); p.ell(128, 420, 60, 60, "#e8202a", 8); p.poly([[112, 120], [144, 120], [144, 400], [112, 400]], "#e8202a", 0); };
const eggDraw = (p: Pen) => p.ell(128, 140, 70, 90, "#f4f1ea", 7);

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#b8b86a");
    flatGround(R, 420, 5, "#c8a878", 80, 0, 0.012);
    for (let k = 0; k < 30; k++) tree(R, -60 + k * 12, -9 - (k % 3) * 5, 1.2 + (k % 2) * 0.3, "#6a8a3a");
    for (let k = 0; k < 6; k++) house(R, -20 + k * 30, -16, 5, 3.4, 4, ["#e8dcc0", "#c8b89a", "#d8c8a8"][k % 3], "#5a4a52");
    // orchard
    for (let k = 0; k < 6; k++) tree(R, ORC[0] - 4 + (k % 3) * 3.2, -2.6 - Math.floor(k / 3) * 3, 1.0, "#5a8a3a");
    // stadium: stands behind a track, flags
    const wood = lam({ map: rep(planksHD(), 6, 1), color: "#d8c8a8" });
    for (let k = 0; k < 6; k++) box(R, 50, 0.6, 1.4, wood, STD[0], 0.3 + k * 0.6, -5 - k * 1.4);
    flatGround(R, 60, 6, "#b07a4a", STD[0], 0, 0.014);
    box(R, 0.1, 2.4, 0.1, lamC("#f4f1ea"), STD[0] + 4, 1.2, -2.8);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const runner = (k: string, o: Outfit, x: number, z: number, expr: "stern" | "pained" | "dazed" | "grin" | "nervous" | "shock", i: number, mode: "march" | "stand" | "fall" = "march") =>
      person(k, o, x, 0, z, { mode, phase: t * 2.6 + i * 0.37, expr, facing: mode === "march" ? 1 : 0 }, i);
    const car = (x: number, z: number, broken: boolean) => { card(`car|${broken ? 0 : Math.floor(t * 8) % 6}`, x, z, 1.0, carDraw(broken ? 0 : (Math.floor(t * 8) % 6) / 6), 1, 0); };
    if (id === S.hook || id === S.end) {
      const cx = carX(f); car(cx, -1.2, false); person("lorz", LORZ, cx + 0.2, 0.75, -1.0, { mode: "sit", expr: "laugh", facing: 0, wave: 0.6 + Math.sin(t * 8) * 0.3 }, 1);
      person("drv", DRIVER, cx + 0.9, 0.75, -1.0, { mode: "sit", expr: "grin", facing: 0 }, 2);
      runner("hicks", HICKS, cx - 3.0, 1.0, "dazed", 3); fx(`bot|h`, 256, 512, bottleDraw("VENENO"), cx - 2.4, 1.3, 1.3, 0.35, 0.7);
    }
    if (id === S.city) {
      for (let k = 0; k < 14; k++) runner(`r${k}`, RUN(k), 4 + (f - 60) * 0.06 - (k % 7) * 1.1 - Math.floor(k / 7) * 0.5, -1.6 + (k % 4) * 1.0, k % 3 ? "pained" : "nervous", 10 + k);
      if (f > W.grados - 6) fx("temp", 256, 512, tempDraw, 5.5 + (f - 60) * 0.06, 3.0, -2.5, 0.8, 1.6);
      if (f > W.agua - 6) fx("agua", 512, 200, textDraw("¿AGUA?", "#9ad4ff", 110), 3 + (f - 60) * 0.06, 2.9, -1.0, 1.4, 0.55);
    }
    if (id === S.car) {
      const lx = lorzX(f), inCar = f > W.coche - 2 && f < W.baja, cx = carX(f), broken = f > W.rompe - 2;
      if (inCar) person("lorz", LORZ, cx + 0.2, 0.75, -1.0, { mode: "sit", expr: "laugh", facing: 0, wave: 0.5 }, 1);
      else runner("lorz", LORZ, lx, -0.6, f < W.coche ? "pained" : "grin", 1);
      person("drv", DRIVER, cx + 0.9, 0.75, -1.0, { mode: "sit", expr: broken ? "shock" : "grin", facing: 0 }, 2);
      car(cx, -1.2, broken);
      if (broken) fx(`sm|${Math.floor(t * 6) % 3}`, 256, 256, smokeDraw(Math.floor(t * 6) % 3), cx + 2.2, 1.6, -1.2, 1.4, 1.4);
      if (f > W.cansa - 4 && f < W.coche - 4) fx("tired", 512, 200, textDraw("AGOTADO", "#ff6a6a", 96), lx, 2.4, -0.5, 1.0, 0.39);
    }
    if (id === S.stadium || id === S.caught) {
      for (let k = 0; k < 30; k++) person(`fan${k}`, FAN(k), STD[0] - 20 + (k % 15) * 2.6, 0.6 + Math.floor(k / 15) * 0.6, -5.2 - Math.floor(k / 15) * 1.4, { mode: "stand", expr: id === S.caught && f > W.pilla - 4 ? "shock" : "laugh", facing: 0, wave: Math.sin(t * 7 + k) * 0.4 + 0.5 }, 20 + k);
      const x = id === S.stadium ? STD[0] - 5 + smooth((f - 428) / 68) * 8 : STD[0] + 3;
      runner("lorz", LORZ, x, 0, id === S.caught && f > W.pilla - 4 ? "nervous" : "grin", 1, id === S.stadium && f < W.estadio + 20 ? "march" : "stand");
      if (id === S.caught) {
        person("off", HELP(1), STD[0] + 4.4, 0, 0.3, { mode: "stand", expr: f > W.pilla - 4 ? "shout" : "grin", facing: -1, wave: f > W.pilla - 4 ? 0.9 : undefined }, 2);
        if (f < W.pilla - 2) fx("med", 256, 384, medalDraw("1"), STD[0] + 3.9, 1.4, 0.6, 0.35, 0.52);
        if (f > W.pilla - 4) fx("trampa", 512, 200, textDraw("¡TRAMPA!", "#ff4a3a", 110), STD[0] + 3.4, 2.6, 0.3, 1.2, 0.47);
      }
    }
    if (id === S.hicks) {
      const x = 30 + (f - W.espera) * 0.02, carried = f > W.brazos - 6;
      runner("hicks", HICKS, x, 0, f > W.alucinando - 4 ? "dazed" : "pained", 1, carried ? "stand" : "march");
      for (let k = 0; k < 2; k++) person(`h${k}`, HELP(k), x + (k ? 0.75 : -0.75), 0, carried ? 0.1 : -1.2, { mode: "march", phase: t * 2 + k, expr: "nervous", facing: 1 }, 2 + k);
      if (f > W.veneno - 4) fx("v", 256, 512, bottleDraw("VENENO"), x + 1.0, 1.5, 0.6, 0.35, 0.7);
      if (f > W.huevo - 4) fx("egg", 256, 256, eggDraw, x + 1.45, 1.2, 0.6, 0.3, 0.3);
      if (f > W.cognac - 4) fx("cog", 256, 512, bottleDraw("COÑAC", "#8a4a1a"), x + 1.85, 1.5, 0.6, 0.35, 0.7);
      if (f > W.gana - 4) fx("gana", 512, 200, textDraw("¡ORO!", "#ffd23f", 130), x, 2.6, 0.3, 1.1, 0.43);
    }
    if (id === S.carva) {
      const sleep = f > W.siesta - 4 && f < W.cuarto - 10;
      person("car", CARVA, ORC[0] - 0.4, 0, 1.2, { mode: sleep ? "fall" : "stand", expr: sleep ? "relief" : f > W.manzanas ? "grin" : "neutral", facing: 0, wave: f > W.manzanas - 4 && !sleep ? 0.7 : undefined }, 1);
      if (f > W.cartero - 4) fx("name", 512, 160, labelDraw("A. CARVAJAL", "#c8202a"), ORC[0] - 0.4, 2.25, 1.5, 0.8, 0.25);
      if (f > W.manzanas - 4 && !sleep) fx("apple", 128, 128, appleDraw(true), ORC[0] + 0.05, 1.35, 1.5, 0.25, 0.25);
      if (sleep) fx(`z|${Math.floor(t * 2) % 2}`, 256, 256, zDraw, ORC[0] + 0.2, 1.1 + 0.1 * Math.sin(t * 3), 1.4, 0.45, 0.45);
      if (f > W.cuarto - 6) fx("4", 512, 220, textDraw("4º", "#ffd23f", 160), ORC[0] - 0.4, 2.0, 1.5, 0.9, 0.39);
    }
    if (id === S.stats) {
      for (let k = 0; k < 18; k++) runner(`r${k}`, RUN(k), 60 + (k % 9) * 1.7, -1.8 + Math.floor(k / 9) * 2.2 + (k % 2) * 0.4, k % 2 ? "dazed" : "pained", 10 + k, k % 3 === 0 ? "fall" : "stand");
      fx("ex", 256, 256, exDraw, 66, 2.6, -0.5, 0.6, 0.6);
    }
    if (id === S.cta) {
      runner("lorz", LORZ, 0, 0, "grin", 1, "stand"); fx("med", 256, 384, medalDraw("1"), 0.5, 1.3, 0.3, 0.32, 0.48);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.4, 2.2, 1.1);
    }
  }
}
