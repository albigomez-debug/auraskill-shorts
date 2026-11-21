// "Calígula contra el mar" (año 40): the beach facing Britain (x=0, sea at z<-4), Rome's street (ROM), the library (LIB).
import * as THREE from "three";
import { Pen, Outfit, SKINS, horse } from "./toon";
import { Base, Api, lamC, box, cyl } from "./base";
import { flatGround, seaPlane, textDraw, labelDraw, docDraw, qDraw, exDraw, ctaDraw, bubbleDraw, shellDraw, signDraw } from "./props";
import { S, W, ROM, LIB, smooth } from "./story";

const LEG = (v: number): Outfit => ({ jacket: "#a83a2a", pants: "#a83a2a", boots: "#5a3a1a", hat: "greek", skin: SKINS[v % 4], belt: "#5a3a1a", spear: true, shield: "#c8202a", cape: "#8a2a1a", rifle: false });
const CALI: Outfit = { jacket: "#f4f1ea", pants: "#f4f1ea", boots: "#8a6a3a", hat: "crown", skin: SKINS[0], belt: "#e8c45a", cape: "#7a2a8a", sword: true, build: "stout" };
const CIT = (v: number): Outfit => ({ jacket: ["#f4f1ea", "#d8c8a8", "#a8c0d8", "#e8d8a0"][v % 4], pants: "#d8c8a8", boots: "#6a4a2a", hat: "hair", hair: ["#2a1a10", "#5a3a1a", "#1a1a1a"][v % 3], skin: SKINS[v % 4], belt: null, dress: v % 3 === 1 ? "#c8a8c0" : undefined });
const HCOAT = { coat: "#f4f1ea", mane: "#c8b8a0", cloth: "#7a2a8a" };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    const sand = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lamC("#e2d2a2")); sand.position.set(0, -0.02, 1500 - 6); R.add(sand);
    const sea = seaPlane(R, -0.1, "#3a7aa8"); sea.position.z = -1500 - 6;
    // white cliffs of Britain far away
    for (let k = 0; k < 6; k++) box(R, 40, 8 + (k % 3) * 3, 10, lamC("#f2f2ec"), -100 + k * 40, 4, -260);
    // catapults
    const wood = lamC("#7a5a3a");
    for (let k = 0; k < 3; k++) { const x = [-8, -3.6, 4.6][k]; box(R, 1.6, 0.4, 1.0, wood, x, 0.4, -1.2); box(R, 0.15, 1.6, 0.15, wood, x, 1.2, -1.2); const arm = box(R, 0.12, 2.2, 0.12, wood, x, 1.8, -1.0); arm.rotation.x = -0.6; }
    // Rome: columns and a temple
    flatGround(R, 30, 12, "#d8d0c0", ROM[0], 0, 0.01);
    const marble = lamC("#f2ece0");
    for (let k = 0; k < 10; k++) cyl(R, 0.35, 0.35, 5, marble, ROM[0] - 9 + k * 2, 2.5, -5, 12);
    box(R, 22, 1.0, 2.0, marble, ROM[0], 5.5, -5); const roof = new THREE.Mesh(new THREE.ConeGeometry(12, 2.4, 4), marble); roof.rotation.y = Math.PI / 4; roof.scale.set(1, 1, 0.2); roof.position.set(ROM[0], 7.2, -5); R.add(roof);
    box(R, 22, 6, 0.3, lamC("#e8dcc0"), ROM[0], 3, -6.5);
    // library
    box(R, 10, 4, 0.2, lamC("#d8c8a8"), LIB[0], 2, -2.2); flatGround(R, 10, 6, "#b8a888", LIB[0], 0.5, 0.012); box(R, 2.0, 0.8, 0.9, lamC("#6a4a2a"), LIB[0], 0.4, -0.8);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const legion = (n: number, mode: "stand" | "march", expr: "stern" | "shock" | "nervous" | "grin" | "shout" | "dazed", z0 = 0.5, look = 0) => { for (let k = 0; k < n; k++) person(`l${k}`, LEG(k), -5 + (k % 10) * 1.1 + (Math.floor(k / 10) % 2) * 0.5, 0, z0 - Math.floor(k / 10) * 1.2, { mode, phase: t * 2 + k * 0.1, expr, facing: look as 0 | 1 | -1 }, 10 + k); };
    if (id === S.hook || id === S.end) {
      person("cal", CALI, 3.0, 0, 1.6, { mode: "stand", expr: "shout", facing: -1, wave: 0.95 }, 1);
      legion(14, "march", "shout", -2.0);
      for (let k = 0; k < 5; k++) fx(`sp${k}|${Math.floor(t * 6 + k) % 2}`, 256, 256, (p: Pen) => p.ell(128, 160, 110, 50 + (Math.floor(t * 6 + k) % 2) * 20, "#e8f6fc", 6), -4 + k * 2, 0.2, -4.0, 1.2, 1.2);
    }
    if (id === S.intro) { person("cal", CALI, 0, 0, 0.5, { mode: "stand", expr: "grin", facing: 0, wave: 0.7 }, 1); if (f > W.caligula - 4) fx("name", 512, 160, labelDraw("CALÍGULA", "#7a2a8a"), 0, 2.55, 0.6, 0.8, 0.25); if (f > W.emperador - 4) fx("cr", 512, 200, textDraw("EMPERADOR", "#ffd23f", 66), 0, 2.95, 0.4, 1.0, 0.39); }
    if (id === S.army) { legion(30, "stand", "stern", 1.5, -1); fx("brit", 1024, 512, signDraw(["BRITANIA →"], "#f2e2b8", "#1a2a6a"), 6, 2.4, -3, 2, 1); person("cal", CALI, -6, 0, 2.2, { mode: "stand", expr: "stern", facing: 1 }, 1); }
    if (id === S.order || id === S.sea) {
      person("cal", CALI, -0.9, 0, 0.6, { mode: "stand", expr: "shout", facing: 1, wave: 0.95 }, 1);
      for (let k = 0; k < 4; k++) person(`s${k}`, LEG(k), 0.6 + k * 0.8, 0, -0.2 - (k % 2) * 0.5, { mode: "stand", expr: id === S.sea ? "shock" : "stern", facing: -1 }, 2 + k);
      if (id === S.order && f > W.orden - 4) fx("b", 512, 256, bubbleDraw("¡AL ATAQUE!"), -0.5, 2.85, 0.6, 1.2, 0.6);
      if (id === S.sea) { fx("b2", 512, 256, bubbleDraw(f > W.botin - 4 ? "¡BOTÍN!" : f > W.conchas - 4 ? "¡Y CONCHAS!" : "¡CONTRA EL MAR!", "#ffd23f"), -0.5, 2.85, 0.6, 1.3, 0.65); if (f > W.conchas - 4) for (let k = 0; k < 2; k++) fx(`q${k}`, 256, 256, qDraw, 1.0 + k * 1.6, 2.4, -0.2, 0.4, 0.4); if (false) fx("bt", 512, 200, textDraw("BOTÍN DE GUERRA", "#ffd23f", 52), 0.3, 3.05, 0.6, 1.4, 0.55); }
    }
    if (id === S.shells) {
      legion(10, "stand", f > W.obedecen - 4 ? "nervous" : "dazed", 0.6, 0);
      for (let k = 0; k < 14; k++) fx(`sh${k}`, 128, 128, shellDraw(k), -5 + (k % 7) * 1.6 + (k % 3) * 0.3, 0.12, 1.4 + (k % 2) * 0.8, 0.3, 0.3);
      if (f > W.cascos - 6) for (let k = 0; k < 6; k++) fx(`hs${k}`, 128, 128, shellDraw(k + 1), -4.4 + k * 1.1 * 2 * 0.5, 1.05 + 0.04 * Math.sin(t * 4 + k), 0.9, 0.25, 0.25);
    }
    if (id === S.rome) {
      const x = ROM[0] - 5 + (f - W.vuelve) * 0.03;
      person("cal", CALI, x, 0, 0.8, { mode: "march", phase: t * 1.6, expr: "laugh", facing: 1, wave: 0.9 }, 1);
      for (let k = 0; k < 6; k++) person(`l${k}`, LEG(k), x - 1.4 - (k % 3) * 0.9, 0, 0.2 - Math.floor(k / 3) * 0.8, { mode: "march", phase: t * 1.6 + k * 0.2, expr: "grin", facing: 1 }, 2 + k);
      for (let k = 0; k < 12; k++) person(`c${k}`, CIT(k), ROM[0] - 9 + k * 1.6, 0, -3.0, { mode: "stand", expr: k % 2 ? "laugh" : "grin", facing: 0, wave: Math.sin(t * 6 + k) * 0.3 + 0.6 }, 20 + k);
      if (f > W.oceano - 6) fx("ban", 1024, 512, signDraw(["VICTORIA", "SOBRE EL OCÉANO"], "#7a2a8a", "#ffd23f"), ROM[0], 4.3, -4, 4, 2);
    }
    if (id === S.source) {
      fx("doc", 512, 620, docDraw("SUETONIO", "", "Vidas de los Césares"), LIB[0] - 0.5, 1.5, -0.5, 0.6, 0.73);
      if (f > W.caballo - 4) { card("hor", LIB[0] + 6, -0.6, 1.0, (p: Pen) => horse(p, HCOAT, 1000, null), -1, 0); fx("cons", 512, 160, labelDraw("¿CÓNSUL?", "#7a2a8a"), LIB[0] + 6.4, 3.0, 0, 0.9, 0.28); person("cal2", CALI, LIB[0] + 4.6, 0, 0.6, { mode: "stand", expr: "laugh", facing: 1, wave: 0.9 }, 1); }
    }
    if (id === S.cta) {
      person("cal", CALI, 0, 0, 0.5, { mode: "stand", expr: "grin", facing: 0, wave: 0.9 }, 1);
      const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 0, 3.0, 0.5, 2.2, 1.1);
    }
  }
}
