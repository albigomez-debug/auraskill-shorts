// "Tulipomanía": an Amsterdam street (x = 0), the tulip field with a windmill (FIELD) and a tavern (TAV).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, cobbleHD, planksHD } from "./paint";
import { terrace } from "./town";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { grassGround, coinDraw, docDraw, signDraw } from "./props";
import { S, W, FIELD, TAV } from "./story";

const MERCH: Outfit = { jacket: "#1a1a22", pants: "#1a1a22", boots: "#111", hat: "tophat", skin: SKINS[0], moustache: "#8a6a3a", beard: "#8a6a3a", buttons: "#f2ece0", belt: null };
const FOLK = (v: number): Outfit => {
  const o: Outfit = { jacket: ["#3a3a44", "#5a3a2a", "#2a3a4a", "#6a5a3a"][v % 4], pants: "#2a2a30", boots: "#2a2020", skin: SKINS[v % 3] };
  return v % 2 ? { ...o, hat: "bonnet", dress: ["#3a3a44", "#6a2a2a", "#2a4a3a"][v % 3] } : { ...o, hat: "tophat" };
};
const PETAL = ["#e8323a", "#f2c83a", "#e86ab0", "#f28a3a", "#a83ae8"];
const tulipDraw = (striped: boolean, col = "#e8323a") => (p: Pen) => {
  p.band([[256, 500], [256, 250]], "#3a8a3a", 18, 4); p.poly([[256, 420], [180, 330], [250, 380]], "#3a8a3a", 5);
  p.poly([[160, 120], [200, 250], [312, 250], [352, 120], [306, 170], [256, 90], [206, 170]], striped ? "#f4f1ea" : col, 9);
  if (striped) for (const [a, b] of [[[190, 140], [230, 240]], [[256, 100], [256, 240]], [[320, 140], [282, 240]]] as [number, number][][]) p.stroke([a, b] as [number, number][], 18, col);
};
const bulbDraw = (p: Pen) => { p.ell(128, 150, 80, 85, "#c89a6a", 7); p.poly([[110, 75], [128, 20], [146, 75]], "#7aa84a", 5); for (let k = 0; k < 5; k++) p.stroke([[100 + k * 14, 230], [92 + k * 16, 250]], 5, "#8a6a4a"); p.arc(128, 150, 50, 70, 200, 300, 6, "#a87a4a"); };
const balanceDraw = (tilt: number) => (p: Pen) => {
  p.stroke([[256, 480], [256, 140]], 14, "#6a4a2a"); p.poly([[196, 490], [316, 490], [290, 460], [222, 460]], "#6a4a2a", 6);
  const dy = Math.sin(tilt) * 140, L: [number, number] = [96, 140 + dy], Rr: [number, number] = [416, 140 - dy];
  p.stroke([L, Rr], 10, "#8a6a3a"); p.dot(256, 140, 14, "#c8a03a");
  for (const c of [L, Rr]) { p.stroke([c, [c[0] - 50, c[1] + 90]], 4); p.stroke([c, [c[0] + 50, c[1] + 90]], 4); p.ell(c[0], c[1] + 95, 70, 16, "#c8a03a", 5); }
  p.ell(L[0], L[1] + 50, 34, 36, "#c89a6a", 5); p.poly([[L[0] - 8, L[1] + 18], [L[0], L[1] - 10], [L[0] + 8, L[1] + 18]], "#7aa84a", 3);
  p.poly([[Rr[0] - 50, Rr[1] + 90], [Rr[0] - 50, Rr[1] + 40], [Rr[0], Rr[1] + 5], [Rr[0] + 50, Rr[1] + 40], [Rr[0] + 50, Rr[1] + 90]], "#d8a878", 5);
};
const chartDraw = (u: number, crash: number) => (p: Pen) => {
  p.poly([[16, 16], [496, 16], [496, 368], [16, 368]], "#f4f1ea", 10);
  p.stroke([[60, 40], [60, 330], [470, 330]], 6);
  const pts: [number, number][] = [];
  for (let k = 0; k <= 40; k++) { const x = k / 40; if (x > u) break; let y = Math.pow(x, 3); if (crash > 0 && x > 0.8) y = Math.max(0.03, 1 - (x - 0.8) * 5 * crash * 1.2); pts.push([60 + x * 400, 330 - y * 270]); }
  if (pts.length > 1) p.stroke(pts, 12, crash > 0 ? "#e2333a" : "#3ac85a");
  p.g.fillStyle = "#2a2a32"; p.g.font = "bold 40px Arial"; p.g.textAlign = "left"; p.g.fillText("PRECIO", 80, 70);
};
const bubbleDraw = (pop: number) => (p: Pen) => {
  if (pop < 0.5) { p.ell(256, 256, 200, 200, "rgba(170,220,255,0.35)", 8); p.arc(256, 256, 160, 160, 200, 250, 16, "#ffffff"); p.g.save(); p.g.globalAlpha = 0.9; tulipDraw(true)(p); p.g.restore(); }
  else for (let k = 0; k < 12; k++) { const a = (k / 12) * Math.PI * 2; p.stroke([[256 + Math.cos(a) * 120, 256 + Math.sin(a) * 120], [256 + Math.cos(a) * 220, 256 + Math.sin(a) * 220]], 14, "#9ad4ff"); }
};
const chairDraw = (p: Pen) => { p.poly([[70, 30], [110, 30], [110, 140], [190, 140], [190, 240], [170, 240], [170, 170], [90, 170], [90, 240], [70, 240]], "#8a5a34", 7); };

export class World extends Base {
  private blades = new THREE.Group();
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#a8c87a");
    const street = new THREE.Mesh(new THREE.PlaneGeometry(14, 60).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 4, 15), color: "#d8ccbc" }));
    street.position.set(0, 0, -6); street.receiveShadow = true; R.add(street);
    const walls = ["#8a3a2a", "#6a3a2a", "#9a5a3a", "#5a3a30", "#f2ead6"], roofs = ["#3a3a44", "#4a3a34"];
    terrace(R, { side: 1, x: 6.5, z0: -30, z1: 14, seed: 201, floors: [3, 4], walls, roofs, brick: 0.8, signs: ["BLOEMEN", "BIER"] });
    terrace(R, { side: -1, x: 6.5, z0: -30, z1: 14, seed: 203, floors: [3, 4], walls, roofs, brick: 0.8, signs: ["TULPEN", "KAAS"] });
    // tulip field in coloured rows + windmill
    for (let r = 0; r < 24; r++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(60, 0.9).rotateX(-Math.PI / 2), lamC(PETAL[r % 5])); m.position.set(FIELD[0], 0.03, FIELD[2] - 3 - r * 1.6); R.add(m); }
    const mill = lam({ map: rep(planksHD(), 1, 2), color: "#8a5a3a" });
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.6, 9, 8), mill); tower.position.set(FIELD[0] + 9, 4.5, FIELD[2] - 20); tower.castShadow = true; R.add(tower);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(2.0, 2.4, 8), lamC("#3a3a44")); cap.position.set(FIELD[0] + 9, 10.2, FIELD[2] - 20); R.add(cap);
    this.blades.position.set(FIELD[0] + 9, 8.6, FIELD[2] - 18.2); R.add(this.blades);
    for (let k = 0; k < 4; k++) { const b = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 6.5), lamC("#f2ece0", { side: THREE.DoubleSide })); b.geometry.translate(0, 3.4, 0); b.rotation.z = (k * Math.PI) / 2; this.blades.add(b); }
    // tavern
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10).rotateX(-Math.PI / 2), lam({ map: rep(planksHD(), 3, 3), color: "#8a5a34" })); floor.position.set(TAV[0], 0.01, TAV[2]); R.add(floor);
    box(R, 10, 4, 0.2, lamC("#6a4a30"), TAV[0], 2, TAV[2] - 3); for (const dx of [-5, 5]) box(R, 0.2, 4, 8, lamC("#5a3a24"), TAV[0] + dx, 2, TAV[2] + 1);
    box(R, 1.8, 0.08, 0.9, lam({ map: rep(planksHD(), 1, 0.4), color: "#7a4a2a" }), TAV[0], 0.85, TAV[2] - 0.6);
    for (const dx of [-0.8, 0.8]) cyl(R, 0.05, 0.05, 0.85, lamC("#5a3a24"), TAV[0] + dx, 0.42, TAV[2] - 0.6, 6);
    for (const dx of [-0.4, 0.5]) cyl(R, 0.07, 0.06, 0.18, lamC("#c8a03a"), TAV[0] + dx, 0.98, TAV[2] - 0.5, 10);
    for (let k = 0; k < 4; k++) cyl(R, 0.35, 0.35, 0.7, lam({ map: rep(planksHD(), 0.3, 0.3), color: "#8a5a34" }), TAV[0] - 4 + k * 0.8, 0.35, TAV[2] - 2.5, 10);
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    this.blades.rotation.z = t * 0.8;
    const mainShot = id === S.hook || id === S.end || id === S.rise || id === S.bubble;
    if (mainShot) {
      person("merch", MERCH, -0.45, 0, 0, { mode: "stand", expr: id === S.bubble ? (f > W.burbuja + 6 ? "shock" : "grin") : "grin", facing: 1, wave: 0.9 }, 1);
      fx("bulb", 256, 256, bulbDraw, -0.2, 2.05, 0.25, 0.25, 0.25);
      if (id === S.hook || id === S.end) fx(`bal|${Math.round(Math.sin(t * 2) * 4)}`, 512, 512, balanceDraw(0.35 + Math.sin(t * 2) * 0.08), 0.45, 1.45, 0.1, 0.8, 0.8);
      if (id === S.rise) {
        const u = Math.min(0.8, (f - 498) / 110);
        fx(`ch|${Math.round(u * 40)}|0`, 512, 384, chartDraw(u, 0), 0.4, 1.55, 0.1, 0.75, 0.56);
        if (f > W.casa - 4) fx("bal", 512, 512, balanceDraw(0.35), 0.4, 2.3, 0.15, 0.55, 0.55);
      }
      if (id === S.bubble) fx(`bub|${f > W.burbuja + 6 ? 1 : 0}`, 512, 512, bubbleDraw(f > W.burbuja + 6 ? 1 : 0), 0.45, 1.6, 0.1, 0.7, 0.7);
    }
    if (id === S.field || id === S.stripe) {
      const X = FIELD[0], Z = FIELD[2];
      for (let k = 0; k < 9; k++) fx(`tf${k % 5}`, 512, 512, tulipDraw(false, PETAL[k % 5]), X - 2 + (k % 5) * 0.9, 0.35, Z - 0.8 - Math.floor(k / 5) * 1.2, 0.7, 0.7);
      if (id === S.stripe) {
        fx("striped", 512, 512, tulipDraw(true), X, 1.45, Z + 0.2, 0.75, 0.75);
        for (let k = 0; k < 2; k++) person(`b${k}`, FOLK(k * 2), X + (k ? 0.75 : -0.75), 0, Z - 0.3, { mode: "stand", expr: f > W.locos - 4 ? "shock" : "grin", facing: (k ? -1 : 1) as -1 | 1 }, 10 + k);
        if (f > W.locos - 6) for (let k = 0; k < 4; k++) fx(`c${k}`, 256, 256, coinDraw("ƒ"), X - 0.6 + k * 0.4, 2.3 - ((f - W.locos + k * 6) % 24) * 0.04, Z + 0.3, 0.18, 0.18);
      }
    }
    if (id === S.sell) {
      fx("sign", 1024, 512, signDraw(["SE VENDE"]), 6.3, 2.4, -1.5, 1.4, 0.7);
      for (let k = 0; k < 5; k++) {
        const x = -2.5 + k * 1.2 + (f - 298) * 0.01, z = -0.5 - (k % 2) * 0.8;
        person(`s${k}`, FOLK(k + 1), x, 0, z, { mode: "stroll", phase: t * 6 + k, expr: "grin", facing: 1 }, 20 + k);
        if (k % 2 === 0 && f > W.muebles - 6) fx(`chair${k}`, 256, 256, chairDraw, x + 0.15, 1.35, z + 0.2, 0.45, 0.45);
      }
    }
    if (id === S.tavern) {
      const X = TAV[0];
      for (let k = 0; k < 2; k++) person(`t${k}`, k ? MERCH : FOLK(2), X + (k ? 0.75 : -0.75), 0, 0, { mode: "stand", expr: "grin", facing: (k ? -1 : 1) as -1 | 1, wave: f > W.papel - 4 && k === 0 ? 0.9 : undefined }, 30 + k);
      if (f > W.papel - 6) fx("paper", 512, 620, docDraw("1 BULBO", "", "tulipán raro"), X, 1.6, 0.3, 0.38, 0.46);
    }
    if (id === S.crash) {
      const nobody = f > W.nadie - 4;
      person("merch", MERCH, -0.45, 0, 0, { mode: "stand", expr: f > W.desploman - 4 ? "shock" : nobody ? "nervous" : "grin", facing: 1, wave: 0.9 }, 1);
      fx("bulb", 256, 256, bulbDraw, -0.2, 2.05, 0.25, 0.25, 0.25);
      for (let k = 0; k < 6; k++) { const sx = k % 2 ? 1 : -1; person(`c${k}`, FOLK(k), sx * (1.3 + Math.floor(k / 2) * 0.7) + (nobody ? sx * (f - W.nadie) * 0.03 : 0), 0, -0.8 - (k % 3) * 0.4, { mode: nobody ? "stroll" : "stand", phase: t * 6 + k, expr: nobody ? "stern" : "grin", facing: (nobody ? sx : -sx) as -1 | 1 }, 10 + k); }
      if (f > W.desploman - 30) { const c = Math.min(1, Math.max(0, (f - W.desploman + 4) / 20)); fx(`ch|32|${Math.round(c * 10)}`, 512, 384, chartDraw(1, c), 0.4, 1.55, 0.1, 0.75, 0.56); }
    }
    if (id === S.after) {
      const sad = f > W.desgracia - 4;
      for (let k = 0; k < 6; k++) person(`p${k}`, FOLK(k), -3 + k * 1.2 + (f - 880) * 0.01, 0, -2 - (k % 2), { mode: "stroll", phase: t * 6 + k, expr: "smile", facing: 1 }, 10 + k);
      person("merch", MERCH, 0.4, 0, 0, { mode: sad ? "sit" : "stand", expr: sad ? "pained" : "smile", facing: 0 }, 1);
      if (sad) fx("bulb", 256, 256, bulbDraw, 0.75, 0.75, 0.3, 0.2, 0.2);
    }
  }
}
