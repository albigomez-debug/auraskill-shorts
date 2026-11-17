// "La guerra de 38 minutos": the sultan's palace on the shore (PAL), the old ship (OLD), the British fleet (FLEET), the admiral's pier (ADM).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, planksHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { seaPlane, flatGround, palm, sailShip, docDraw, smokeDraw, fireDraw, flagDraw } from "./props";
import { burstDraw } from "./beasts";
import { S, W, PAL, OLD, FLEET, ADM } from "./story";

const SULTAN: Outfit = { jacket: "#f2ece0", pants: "#f2ece0", boots: "#8a6a3a", hat: "persian", dress: "#f2ece0", skin: SKINS[3], beard: "#1a1a1a", moustache: "#1a1a1a", belt: "#c8a03a", sash: "#3a6a3a" };
const ASKARI = (v: number): Outfit => ({ jacket: "#f2ece0", pants: "#e8e0d0", boots: "#5a3a2a", hat: "cap", cap: "#c8323a", skin: SKINS[3 - (v % 2)], rifle: true, belt: "#5a4024" });
const ADMIRAL: Outfit = { jacket: "#1a2a4a", pants: "#f2ece0", boots: "#111", hat: "bicorne", skin: SKINS[0], moustache: "#c8c0b0", buttons: "#e8c45a", sash: "#e8c45a", sword: true, belt: null, build: "stout" };
const redFlag = flagDraw(["#c8202a"]);
const clockDraw = (min: number) => (p: Pen) => {
  p.ell(128, 128, 110, 110, "#f4f1ea", 10);
  for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; p.dot(128 + Math.sin(a) * 88, 128 - Math.cos(a) * 88, 7); }
  const am = (min / 60) * Math.PI * 2, ah = ((9 + min / 60) / 12) * Math.PI * 2;
  p.stroke([[128, 128], [128 + Math.sin(ah) * 55, 128 - Math.cos(ah) * 55]], 14); p.stroke([[128, 128], [128 + Math.sin(am) * 85, 128 - Math.cos(am) * 85]], 8, "#c8202a"); p.dot(128, 128, 10);
};

export class World extends Base {
  private old!: THREE.Group; private top = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    this.L = { ...this.L, el: 44 };
    seaPlane(R, -0.2, "#2f8ab0");
    flatGround(R, 200, 60, "#e8d4a0", 0, -27);
    // the palace: white block with arches, an upper floor that collapses, the clock tower
    const white = lamC("#f2ece0");
    box(R, 14, 4, 6, white, PAL[0], 2, PAL[2]);
    for (let k = 0; k < 6; k++) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.2), lamC("#3a3a44")); w.position.set(PAL[0] - 5.5 + k * 2.2, 1.6, PAL[2] + 3.02); R.add(w); }
    R.add(this.top); this.top.position.set(PAL[0], 4, PAL[2]);
    box(this.top, 14, 3.5, 6, white, 0, 1.75, 0);
    for (let k = 0; k < 6; k++) { const w = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.6), lamC("#5a8a8a")); w.position.set(-5.5 + k * 2.2, 1.8, 3.02); this.top.add(w); }
    box(this.top, 14.6, 0.4, 6.6, lamC("#c8b890"), 0, 3.6, 0);
    box(R, 3, 14, 3, white, PAL[0] + 8.5, 7, PAL[2]);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), lamC("#3a8a6a")); dome.position.set(PAL[0] + 8.5, 14, PAL[2]); R.add(dome);
    cyl(R, 0.06, 0.06, 4, lamC("#d8d0c0"), PAL[0] - 5, 9.5, PAL[2], 6);
    // throne in front of the palace
    box(R, 1.0, 0.5, 0.8, lamC("#c8a03a"), 0, 0.25, -2.6); box(R, 1.0, 1.4, 0.15, lamC("#a8202a"), 0, 1.0, -3.0);
    // town and palms along the shore
    for (let k = 0; k < 10; k++) { const x = -22 + k * 5; if (Math.abs(x) < 8) continue; palm(R, x, 1.5 + (k % 2), 0.9); }
    for (let k = 0; k < 8; k++) box(R, 4, 3 + (k % 3), 4, lamC(["#e8dcc0", "#d8c8a8", "#f2e8d0"][k % 3]), -26 + k * 5 + (k > 3 ? 22 : 0), 1.5 + (k % 3) / 2, -14);
    // the old ship and the fleet; the admiral's pier
    this.old = sailShip(R, OLD[0], OLD[2], 0.8, "#6a4a2a", 2);
    for (let k = 0; k < 3; k++) sailShip(R, FLEET[0] - 6 + k * 9, FLEET[2] + (k % 2) * 4, 1, "#2a2a30", 3, Math.PI);
    box(R, 4, 0.2, 8, lam({ map: rep(planksHD(), 1, 2), color: "#a8784a" }), ADM[0], 0.1, ADM[2] - 1);
    sailShip(R, ADM[0], ADM[2] - 10, 1, "#2a2a30", 3);
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    // the old ship sinks, the upper floor collapses
    const sink = id >= S.fire && !(id === S.fire && f < W.hunde - 4) ? Math.min(1, (id === S.fire ? f - W.hunde + 4 : 60) / 50) : 0;
    this.old.position.y = -sink * 3; this.old.rotation.z = sink * 0.35;
    const down = id === S.hook || id === S.end || id >= S.run || (id === S.fire && f > W.abajo - 4) ? Math.min(1, id === S.fire ? (f - W.abajo + 4) / 12 : 1) : 0;
    this.top.position.y = 4 - down * 3.2; this.top.rotation.z = down * 0.12;
    const burning = down > 0 || (id === S.fire && f > W.boom - 2);
    if (!down) fx("pflag", 512, 320, redFlag, PAL[0] - 4.4, 11.0, PAL[2], 1.2, 0.75);
    if (burning && id !== S.run && id !== S.throne && id !== S.bill) for (let k = 0; k < 5; k++) {
      fx(`sm${(k + Math.floor(f / 10)) % 3}`, 256, 256, smokeDraw((k + Math.floor(f / 10)) % 3), PAL[0] - 5 + k * 2.5, 5 + ((f / 40 + k * 0.3) % 1) * 4, PAL[2] + 3.4, 3, 3, true);
      fx(`fi${k}|${Math.floor(f / 5) % 2}`, 256, 256, fireDraw(Math.floor(f / 5) % 2), PAL[0] - 5 + k * 2.5, 4.2, PAL[2] + 3.5, 1.6, 1.6);
    }
    if (id === S.fire && f > W.fuego - 4) for (let k = 0; k < 3; k++) {
      const on = (Math.floor((f - W.fuego) / 6) + k) % 3 === 0;
      if (on) fx(`flash${k}`, 256, 256, burstDraw("#ffd23f"), FLEET[0] - 6 + k * 9 + 2, 1.2, FLEET[2] + (k % 2) * 4 - 2.6, 2.2, 2.2);
    }
    if (id === S.throne) {
      person("sultan", SULTAN, 0, 0.32, -2.45, { mode: "sit", expr: f > W.permiso - 4 ? "grin" : "smile", facing: 0, wave: f > W.trono - 4 ? 0.8 : undefined }, 1);
      for (let k = 0; k < 2; k++) person(`g${k}`, ASKARI(k), k ? 1.2 : -1.2, 0, -3.0, { mode: "stand", expr: "stern" }, 2 + k);
    }
    if (id === S.ultimatum || id === S.clock) {
      const X = ADM[0];
      person("adm", ADMIRAL, X - 0.3, 0.2, 0, { mode: "stand", expr: id === S.clock ? "grin" : "stern", facing: 1, wave: id === S.ultimatum && f > W.ultimatum - 4 ? 0.9 : undefined }, 1);
      if (id === S.ultimatum && f > W.ultimatum - 4) fx("ult", 512, 620, docDraw("ULTIMÁTUM", "", "antes de las 9:00"), X + 0.35, 1.35, 0.2, 0.42, 0.5);
      const min = id === S.clock ? Math.min(38, Math.max(0, (f - 710) * 0.9)) : 0;
      if (id === S.clock || f > W.nueve - 4) fx(`clk|${Math.round(min)}`, 256, 256, clockDraw(Math.round(min)), X + 0.45, id === S.clock ? 1.75 : 2.05, 0.25, 0.4, 0.4);
    }
    if (id === S.palace) {
      for (let k = 0; k < 10; k++) person(`a${k}`, ASKARI(k), -4.5 + k * 1.0, 0, -2.4 + (k % 2) * 0.4, { mode: "stand", expr: k % 3 ? "nervous" : "stern" }, 10 + k);
      person("sultan", SULTAN, 0.3, 0, -1.4, { mode: "stand", expr: "stern", facing: 0 }, 1);
    }
    if (id === S.run) {
      const x = 2 - (f - 646) * 0.06;
      person("sultan", SULTAN, x, 0, -1.0, { mode: "march", phase: t * 3, expr: "shock", facing: -1 }, 1);
      for (let k = 0; k < 2; k++) person(`g${k}`, ASKARI(k), x + 0.9 + k * 0.8, 0, -1.3, { mode: "march", phase: t * 3 + k, expr: "shock", facing: -1 }, 2 + k);
    }
    if (id === S.bill) {
      person("sultan", SULTAN, -0.5, 0, 0, { mode: "stand", expr: f > W.factura - 4 ? "shock" : "nervous", facing: 1 }, 1);
      if (f > W.desgracia - 4) fx(`bill|${f > W.factura - 3 ? 1 : 0}`, 512, 620, docDraw("FACTURA", f > W.factura - 3 ? "¡A PAGAR!" : "", "proyectiles"), 0.35, 1.4, 0.2, 0.45, 0.54);
    }
  }
}
