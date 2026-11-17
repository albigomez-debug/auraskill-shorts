// "Norton I": San Francisco street (x = 0), the newspaper office (NEWS), a bar (BAR), the Capitol (CAP), the bay with the bridge (BAY).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD, cobbleHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, flatGround, house, seaPlane, textDraw, labelDraw, docDraw, newsDraw, signDraw, heartDraw, qDraw } from "./props";
import { S, W, NEWS, BAR, CAP, BAY } from "./story";

const NORTON = (uni: boolean): Outfit => uni ? { jacket: "#1a2a6a", pants: "#1a2a6a", boots: "#111", hat: "bicorne", skin: SKINS[0], beard: "#5a4a3a", moustache: "#5a4a3a", buttons: "#e8c45a", sash: "#e8c45a", sword: true, belt: null, build: "stout" }
  : { jacket: "#3a3a44", pants: "#3a3a44", boots: "#111", hat: "tophat", skin: SKINS[0], beard: "#5a4a3a", moustache: "#5a4a3a", belt: null, build: "stout" };
const FOLK = (v: number): Outfit => { const o: Outfit = { jacket: ["#5a3a2a", "#2a3a4a", "#6a5a3a", "#7a2a3a", "#3a4a3a"][v % 5], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 3] }; return v % 2 ? { ...o, hat: "bonnet", dress: ["#7a3a4a", "#3a5a6a", "#8a6a3a"][v % 3] } : { ...o, hat: v % 4 ? "tophat" : "cap", cap: "#3a3a3a", moustache: "#3a2a1a" }; };
const BARMAN: Outfit = { jacket: "#f4f1ea", pants: "#2a2a30", boots: "#111", hat: "hair", hair: "#2a2a2a", skin: SKINS[0], moustache: "#2a2a2a", belt: null };
const EDITOR: Outfit = { jacket: "#5a5a62", pants: "#3a3a3a", boots: "#111", hat: "hair", hair: "#8a8a8a", skin: SKINS[0], belt: null };
const billDraw = (p: Pen) => { p.poly([[20, 40], [492, 40], [492, 220], [20, 220]], "#d8e8c8", 8); p.ell(256, 130, 60, 60, "#8aa87a", 4); p.g.fillStyle = "#2a4a2a"; p.g.textAlign = "center"; p.g.font = "bold 40px Georgia"; p.g.fillText("NORTON I", 256, 95); p.g.font = "bold 50px Georgia"; p.g.fillText("50 ¢", 110, 190); p.g.fillText("50 ¢", 400, 190); };
const sackDraw = (p: Pen) => { p.poly([[60, 240], [40, 120], [90, 60], [166, 60], [216, 120], [196, 240]], "#e8dcc0", 8); p.g.fillStyle = "#5a3a2a"; p.g.font = "bold 40px Arial"; p.g.textAlign = "center"; p.g.fillText("ARROZ", 128, 170); };
const downDraw = (p: Pen) => { p.poly([[16, 16], [496, 16], [496, 380], [16, 380]], "#f4f1ea", 8); p.line([[60, 80], [200, 120], [300, 260], [440, 340]], "#c8323a", 14); p.g.fillStyle = "#1a1a1e"; p.g.font = "bold 44px Arial"; p.g.textAlign = "center"; p.g.fillText("RUINA", 256, 70); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8b87a");
    const cob = lam({ map: rep(cobbleHD(), 8, 3), color: "#d8ccbc" });
    const st = new THREE.Mesh(new THREE.PlaneGeometry(40, 14).rotateX(-Math.PI / 2), cob); st.position.set(0, 0.01, 0); R.add(st);
    for (let k = 0; k < 8; k++) house(R, -14 + k * 4, -5, 3.6, 5 + (k % 3), 3, ["#e8dcc0", "#a8c0c8", "#e8c48a", "#c8a0a8"][k % 4], "#4a3a3a");
    for (let k = 0; k < 6; k++) house(R, -16 + k * 6, -14, 5, 4 + (k % 2) * 3, 4, ["#d8c8a8", "#c8b89a"][k % 2], "#5a4a52");
    // newspaper office
    box(R, 10, 3.5, 0.2, lam({ map: rep(planksHD(), 2, 1), color: "#c8b8a0" }), NEWS[0] + 2, 1.75, -2); flatGround(R, 12, 8, "#8a6a4a", NEWS[0] + 2, 1, 0.012);
    box(R, 1.6, 0.8, 0.8, lamC("#5a3a20"), NEWS[0] + 0.6, 0.4, -0.9);
    // bar
    box(R, 8, 3.5, 0.2, lam({ map: rep(planksHD(), 2, 1), color: "#8a5a3a" }), BAR[0], 1.75, -2); flatGround(R, 8, 6, "#6a4a2a", BAR[0], 0.5, 0.012);
    box(R, 3, 1.1, 0.6, lam({ map: rep(planksHD(), 1, 0.4), color: "#5a3a20" }), BAR[0] + 0.6, 0.55, -0.6);
    // Capitol
    const white = lamC("#f2ece0");
    box(R, 20, 6, 6, white, CAP[0], 3, -10); cyl(R, 3, 3, 3, white, CAP[0], 7.5, -10, 16);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(3, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), white); dome.position.set(CAP[0], 9, -10); R.add(dome);
    for (let k = 0; k < 8; k++) cyl(R, 0.3, 0.3, 5, white, CAP[0] - 7 + k * 2, 2.5, -6.6, 10);
    flatGround(R, 20, 10, "#c8c0b0", CAP[0], 0, 0.012);
    box(R, 4, 3, 0.2, lamC("#d8ccb4"), CAP[0], 1.5, -1.6);
    // bay and bridge
    const sea = seaPlane(R, -0.25, "#2f7aa0"); sea.position.x = BAY[0]; sea.scale.set(0.02, 1, 0.02);
    flatGround(R, 60, 50, "#2f7aa0", BAY[0], -20, 0.015);
    const steel = lamC("#9aa2aa");
    box(R, 60, 0.6, 2, steel, BAY[0], 6, -10);
    for (let k = 0; k < 4; k++) { box(R, 1, 16, 1, steel, BAY[0] - 21 + k * 14, 8, -10); }
    for (let k = 0; k < 3; k++) for (let j = 0; j < 8; j++) { const x0 = BAY[0] - 21 + k * 14; box(R, 0.15, 1 + Math.abs(j - 3.5) * 1.8, 0.15, steel, x0 + 1.5 + j * 1.5, 6.5 + (1 + Math.abs(j - 3.5) * 1.8) / 2, -10); }
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const N = NEWS[0], B = BAR[0], C = CAP[0];
    if (id === S.hook || id === S.end || id === S.walk || id === S.loved) {
      const x = id === S.walk ? -1.8 + (f - 480) * 0.045 : 0;
      person("nor", NORTON(true), x, 0, 0, { mode: id === S.walk ? "march" : "stand", phase: t * 4, expr: id === S.loved ? "grin" : "stern", facing: id === S.walk ? 1 : 0, wave: id === S.walk ? undefined : 0.9 }, 1);
      for (let k = 0; k < 6; k++) person(`f${k}`, FOLK(k), (k % 2 ? 1 : -1) * (1.1 + Math.floor(k / 2) * 0.7), 0, -0.6 - (k % 3) * 0.4, { mode: "stand", expr: id === S.loved ? "laugh" : "grin", facing: (k % 2 ? -1 : 1) as 1 | -1, wave: k % 2 || id === S.loved ? Math.sin(t * 6 + k) * 0.4 + 0.5 : undefined }, 10 + k);
      if (id === S.loved && f > W.adoraba - 6) fx("hrt", 256, 256, heartDraw, 0, 2.5 + Math.sin(t * 4) * 0.05, 0, 0.4, 0.4);
      if (id === S.walk && f > 520) fx("insp", 512, 200, textDraw("INSPECCIÓN", "#ffd23f", 90), x, 2.45, 0.2, 0.8, 0.31);
    }
    if (id === S.sf) for (let k = 0; k < 6; k++) person(`f${k}`, FOLK(k), -4 + k * 1.6, 0, -1 + (k % 2), { mode: "stroll", phase: t * 5 + k, expr: "neutral", facing: (k % 2 ? -1 : 1) as 1 | -1 }, 10 + k);
    if (id === S.rice) {
      person("nor", NORTON(false), -0.45, 0, 0, { mode: "stand", expr: "shock", facing: 1 }, 1);
      if (f > W.norton - 4) fx("name", 512, 160, labelDraw("J. NORTON", "#3a3a44"), 0, 2.4, 0.2, 0.8, 0.25);
      for (let k = 0; k < 2; k++) fx(`sk${k}`, 256, 256, sackDraw, 0.4 + k * 0.45, 0.35, 0.2, 0.55, 0.55);
      if (f > W.arroz - 4) fx("down", 512, 400, downDraw, 0.6, 1.5, 0.1, 0.7, 0.55);
    }
    if (id === S.letter) {
      person("nor", NORTON(false), N - 0.45, 0, 0, { mode: "stand", expr: "stern", facing: 1, wave: f > W.carta - 4 ? 0.9 : undefined }, 1);
      person("ed", EDITOR, N + 0.65, 0, -0.2, { mode: "stand", expr: f > W.emperador - 4 ? "shock" : "neutral", facing: -1 }, 2);
      if (f > W.carta - 4) fx("letter", 512, 620, docDraw("CARTA", "", f > W.emperador - 6 ? "Soy Emperador" : "Al periódico"), N + 0.1, 1.45, 0.3, 0.42, 0.5);
    }
    if (id === S.paper) fx("pap", 720, 920, newsDraw("SAN FRANCISCO BULLETIN", "¡NORTON I,", "EMPERADOR!"), N + 4, 1.5, -1.0, 0.95, 1.21);
    if (id === S.dress) {
      person("nor", NORTON(true), 0, 0, 0, { mode: "stand", expr: "grin", facing: 0, wave: f > W.sable - 4 ? 0.9 : undefined }, 1);
      const lab = f > W.plumas - 4 ? ["PLUMAS", "#ffffff"] : f > W.sable - 4 ? ["SABLE", "#c8c8d0"] : f > W.charreteras - 4 ? ["CHARRETERAS", "#ffd23f"] : f > W.uniforme - 4 ? ["UNIFORME AZUL", "#6a9ae8"] : null;
      if (lab) fx(`lab|${lab[0]}`, 512, 200, textDraw(lab[0], lab[1], lab[0].length > 10 ? 64 : 90), 0.3, f > W.plumas - 4 ? 2.05 : f > W.charreteras - 4 && f < W.sable - 4 ? 1.65 : 1.2, 0.3, 0.6, 0.23);
    }
    if (id === S.money) {
      person("nor", NORTON(true), B - 0.6, 0, 0, { mode: "stand", expr: "grin", facing: 1, wave: f > W.dinero - 4 ? 0.9 : undefined }, 1);
      person("bar", BARMAN, B + 0.9, 0, -1.0, { mode: "stand", expr: f > W.aceptan - 4 ? "grin" : "neutral", facing: -1, wave: f > W.aceptan - 2 ? 0.8 : undefined }, 2);
      if (f > W.dinero - 6) fx("bill", 512, 256, billDraw, B + 0.1, 1.45, 0.2, 0.55, 0.28);
      if (f > W.aceptan - 2) fx("ok", 512, 200, textDraw("¡ACEPTADO!", "#8ae86a", 90), B + 0.3, 2.35, 0.2, 0.8, 0.31);
    }
    if (id === S.congress || id === S.never) {
      person("nor", NORTON(true), C - 0.4, 0, 0, { mode: "stand", expr: id === S.never ? "nervous" : "shout", facing: 1, wave: id === S.congress && f > W.congreso - 4 ? 0.9 : undefined }, 1);
      if (id === S.congress && f > W.congreso - 4) fx("ord", 512, 620, docDraw("DECRETO", f > W.caso - 6 ? "IGNORADO" : "", "Disuélvase el Congreso"), C + 0.35, 1.45, 0.3, 0.42, 0.5);
      if (id === S.congress && f > W.caso - 4) for (let k = 0; k < 2; k++) person(`p${k}`, FOLK(k * 2), C + 1.1 + k * 0.7, 0, -0.6, { mode: "stand", expr: "laugh", facing: -1 }, 3 + k);
      if (id === S.never && f > W.nada - 10) fx("zero", 512, 620, docDraw("LEYES APROBADAS", "0", ""), C + 0.35, 1.45, 0.3, 0.42, 0.5);
      if (id === S.never) fx("q", 256, 256, qDraw, C - 0.4, 2.3, 0.1, 0.3, 0.3);
    }
    if (id === S.bridge && f > W.puente - 4) fx("ped", 1024, 512, signDraw(["DECRETO", "¡UN PUENTE!"], "#f2ece0", "#1a2a6a"), BAY[0] - 2, 2.2, 2, 2.4, 1.2);
    if (id === S.funeral) {
      for (let k = 0; k < 40; k++) person(`c${k}`, FOLK(k), -5 + (k % 10) * 1.1 + (Math.floor(k / 10) % 2) * 0.5, 0, -3 + Math.floor(k / 10) * 1.0, { mode: "stand", expr: "dazed", facing: 0 }, 20 + k);
      fx("cof", 1024, 512, signDraw(["NORTON I", "1818 – 1880"], "#2a2a2a", "#e8c45a"), 0, 1.4, 1.4, 1.6, 0.8);
    }
  }
}
