// "Vendió la Torre Eiffel": a Paris avenue looking down to the tower (x = 0) and a luxury hotel room (x = HOTEL).
import * as THREE from "three";
import { Pen, Outfit, SKINS, fxPuff } from "./toon";
import { rep, ctex, cobbleHD, planksHD, facadeHD } from "./paint";
import { terrace, streetProps, skyline } from "./town";
import { Base, Api, lam, lamC, box, cyl, hh } from "./base";
import { smooth, S, W, HOTEL, TOWER_Z } from "./story";

const LUSTIG: Outfit = { jacket: "#2a2a34", pants: "#2a2a34", boots: "#111118", hat: "tophat", moustache: "#3a2a20", skin: SKINS[1], buttons: "#c8c0b0", belt: null };
const OFFICIAL: Outfit = { ...LUSTIG, sash: "#c8323a", buttons: "#e8c45a" };
const DEALER = (v: number): Outfit => ({ jacket: ["#6a4a3a", "#4a5a6a", "#5a5a3a", "#7a3a3a", "#3a4a3a"][v % 5], pants: "#3a3a44", boots: "#2a2020",
  hat: v % 2 ? "cap" : "tophat", cap: "#4a4038", skin: SKINS[(v + 2) % 4], moustache: v % 3 ? "#5a3a26" : undefined, build: v === 0 ? "stout" : undefined });

const paperDraw = (p: Pen) => {
  p.poly([[20, 30], [236, 30], [236, 200], [20, 200]], "#f2ecdc", 6); p.line([[128, 30], [128, 200]], "#c8c0b0", 3, false);
  p.g.fillStyle = "#2a2a2a"; p.g.font = "bold 26px Georgia"; p.g.fillText("LE TEMPS", 36, 62);
  for (let k = 0; k < 8; k++) { p.line([[36, 80 + k * 14], [116, 80 + k * 14]], "#8a8478", 4, false); p.line([[140, 80 + k * 14], [222, 80 + k * 14]], "#8a8478", 4, false); }
};
const signDraw = (p: Pen) => {
  p.band([[256, 200], [256, 500]], "#7a5a3a", 22, 4);
  p.poly([[40, 40], [472, 40], [472, 230], [40, 230]], "#f4ead0", 8);
  p.g.fillStyle = "#c8323a"; p.g.font = "bold 96px Georgia"; p.g.textAlign = "center"; p.g.fillText("SE VENDE", 256, 170);
};
const bagDraw = (p: Pen) => {
  p.poly([[60, 90], [196, 90], [236, 220], [200, 250], [56, 250], [20, 220]], "#c8a46a", 8);
  p.poly([[96, 60], [160, 60], [150, 92], [106, 92]], "#c8a46a", 7); p.band([[92, 88], [164, 88]], "#6a4a2a", 10, 3);
  p.g.fillStyle = "#3a2a1a"; p.g.font = "bold 80px Georgia"; p.g.textAlign = "center"; p.g.fillText("₣", 128, 205);
};
const blushDraw = (p: Pen) => { for (const x of [70, 186]) { const g = p.g, gr = g.createRadialGradient(x, 128, 0, x, 128, 50); gr.addColorStop(0, "rgba(230,60,60,0.7)"); gr.addColorStop(1, "rgba(230,60,60,0)"); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); } };
const sparkDraw = (p: Pen) => { for (let k = 0; k < 4; k++) { const x = 40 + k * 60, y = 60 + (k % 2) * 80; p.poly([[x, y - 30], [x + 8, y - 8], [x + 30, y], [x + 8, y + 8], [x, y + 30], [x - 8, y + 8], [x - 30, y], [x - 8, y - 8]], "#ffe066", 3); } };

/** the Eiffel tower: lattice frustums (square, via 4-sided cylinders) */
const tower = (s: number) => {
  const G = new THREE.Group();
  const lat = ctex("lattice", 256, 256, (g) => {
    g.clearRect(0, 0, 256, 256); g.strokeStyle = "#5a3f30"; g.lineWidth = 14; g.strokeRect(0, 0, 256, 256);
    g.lineWidth = 7; g.beginPath(); g.moveTo(0, 0); g.lineTo(256, 256); g.moveTo(256, 0); g.lineTo(0, 256); g.stroke();
    g.lineWidth = 5; g.beginPath(); g.moveTo(0, 128); g.lineTo(256, 128); g.stroke();
  });
  const mk = (rb: number, rt: number, h: number, y: number, rep_: number) => {
    const t = lat.clone(); t.needsUpdate = true; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep_, Math.max(1, Math.round(h / (rb + rt) * 1.2)) * 2);
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt * s, rb * s, h * s, 4, 1, true), new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, color: "#a86a48", fog: false }));
    m.rotation.y = Math.PI / 4; m.position.y = (y + h / 2) * s; m.castShadow = true; G.add(m);
  };
  // four splayed legs as one wide frustum with dark arches implied by the lattice, then platforms
  mk(19, 8.5, 18, 0, 6); mk(8.5, 5.6, 18, 18, 4); mk(5.6, 1.4, 40, 36, 3); mk(1.4, 0.5, 8, 76, 1);
  const deck = lamC("#7a5240");
  for (const [w, y] of [[18, 18], [11.6, 36], [3.4, 76]] as const) { const d = new THREE.Mesh(new THREE.BoxGeometry(w * s, 1.1 * s, w * s), deck); d.rotation.y = 0; d.position.y = y * s; G.add(d); }
  const arch = new THREE.Mesh(new THREE.TorusGeometry(9 * s, 0.6 * s, 6, 24, Math.PI), deck);
  for (let k = 0; k < 4; k++) { const a = arch.clone(); a.rotation.y = (k * Math.PI) / 2; a.position.set(Math.sin((k * Math.PI) / 2) * 12.5 * s, 7 * s, Math.cos((k * Math.PI) / 2) * 12.5 * s); a.rotation.y = (k * Math.PI) / 2 + Math.PI / 2; G.add(a); }
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.1 * s, 0.3 * s, 6 * s, 6), deck); spire.position.y = 87 * s; G.add(spire);
  return G;
};

export class World extends Base {
  private model: THREE.Group;
  constructor() {
    super();
    const R = this.root;
    this.fogNear = 120; this.fogFar = 1100;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lamC("#b8b0a0")); ground.position.y = -0.03; ground.receiveShadow = true; R.add(ground);
    // the avenue: cobbles, pavements, Haussmann blocks on both sides, trees, and the tower at the end
    const street = new THREE.Mesh(new THREE.PlaneGeometry(22, 240).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 22 / 4, 240 / 4), color: "#e0d6cc" }));
    street.position.set(0, 0.0, -80); street.receiveShadow = true; R.add(street);
    const walls = ["#efe4cc", "#e8dcc0", "#f2e8d4", "#e2d4b8"], roofs = ["#5a6470", "#4e5560", "#646c78"];
    terrace(R, { side: 1, x: 11, z0: -110, z1: 30, seed: 71, floors: [5, 6], walls, roofs, brick: 0, signs: ["CAFÉ", "BRASSERIE", "HÔTEL", "PARFUMS"] });
    terrace(R, { side: -1, x: 11, z0: -110, z1: 30, seed: 73, floors: [5, 6], walls, roofs, brick: 0, signs: ["LIBRAIRIE", "CAFÉ", "BOULANGERIE"] });
    streetProps(R, 1, 9.5, -100, 26, 81); streetProps(R, -1, 9.5, -100, 26, 82);
    const leaf = lamC("#6a9a4a"), trunk = lamC("#5a4636");
    for (let k = 0; k < 16; k++) for (const sx of [-1, 1]) {
      const z = 20 - k * 8; cyl(R, 0.15, 0.2, 3, trunk, sx * 8.2, 1.5, z, 6);
      const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 1), leaf); c.position.set(sx * 8.2, 3.8, z); c.scale.y = 0.85; c.castShadow = true; R.add(c);
    }
    const bench = lam({ map: rep(planksHD(), 0.6, 0.3), color: "#6a8a5a" });
    box(R, 1.8, 0.1, 0.5, bench, -6.6, 0.48, 3.6); box(R, 1.8, 0.5, 0.08, bench, -6.6, 0.8, 3.36);
    const tw = tower(1); tw.position.set(0, 0, TOWER_Z); R.add(tw);
    const park = new THREE.Mesh(new THREE.PlaneGeometry(60, 60).rotateX(-Math.PI / 2), lamC("#7aa05a")); park.position.set(0, 0.01, TOWER_Z); R.add(park);
    skyline(R, "#cfdcea", 230, true);
    // ---- luxury hotel room ----
    {
      const C = HOTEL;
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 12).rotateX(-Math.PI / 2), lam({ map: rep(planksHD(), 3, 3), color: "#a8704a" })); floor.position.set(C, 0.01, 0); floor.receiveShadow = true; R.add(floor);
      const rug = new THREE.Mesh(new THREE.PlaneGeometry(6, 4).rotateX(-Math.PI / 2), lamC("#8a2a34")); rug.position.set(C, 0.02, -0.5); R.add(rug);
      const wallTex = ctex("damask", 512, 512, (g) => { g.fillStyle = "#7a2230"; g.fillRect(0, 0, 512, 512); g.fillStyle = "rgba(220,170,90,0.35)";
        for (let y = 0; y < 512; y += 64) for (let x = (y / 64) % 2 ? 32 : 0; x < 512; x += 64) { g.beginPath(); g.ellipse(x, y, 10, 18, 0, 0, 6.3); g.fill(); } });
      const wall = lam({ map: rep(wallTex, 6, 3) });
      box(R, 14, 6, 0.3, wall, C, 3, -4.5); box(R, 0.3, 6, 12, wall, C - 7, 3, 0); box(R, 0.3, 6, 12, wall, C + 7, 3, 0);
      const gold = lamC("#d8b048");
      box(R, 14, 0.25, 0.4, gold, C, 5.7, -4.3); box(R, 14, 0.3, 0.35, lamC("#3a2018"), C, 0.15, -4.3);
      for (const x of [-4.5, 4.5]) { const win = box(R, 2.2, 3, 0.1, lamC("#bcd4ec"), C + x, 2.8, -4.3); void win; box(R, 2.6, 3.4, 0.05, gold, C + x, 2.8, -4.36); box(R, 0.9, 3.6, 0.12, lamC("#c8a040"), C + x - 1.4, 2.8, -4.2); box(R, 0.9, 3.6, 0.12, lamC("#c8a040"), C + x + 1.4, 2.8, -4.2); }
      const painting = box(R, 2.4, 1.6, 0.08, lam({ map: facadeHD("paint1", 2.4, 1.6, { wall: "#8aa8c8", shutter: "#3a4a6a" }) }), C, 3.2, -4.3); void painting;
      box(R, 2.6, 1.8, 0.05, gold, C, 3.2, -4.36);
      const cloth = lamC("#f4f1ea"), dark = lamC("#4a2a1a");
      box(R, 3.4, 0.08, 1.4, cloth, C, 0.92, -1.2); box(R, 3.3, 0.5, 1.3, cloth, C, 0.66, -1.2);
      for (const [x, z] of [[-1.5, -0.6], [1.5, -0.6], [-1.5, -1.8], [1.5, -1.8]]) cyl(R, 0.05, 0.05, 0.5, dark, C + x, 0.2, z, 6);
      const ch = new THREE.Group(); ch.position.set(C, 4.7, -0.5); R.add(ch);
      const glass = new THREE.MeshLambertMaterial({ color: "#fff6d8", emissive: "#ffe8a0", emissiveIntensity: 0.7 });
      ch.add(new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 12), glass));
      for (let k = 0; k < 8; k++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), glass); b.position.set(Math.cos(k * 0.785) * 0.7, -0.25, Math.sin(k * 0.785) * 0.7); ch.add(b); }
      cyl(R, 0.02, 0.02, 1.3, gold, C, 5.5, -0.5, 4);
      for (const [x, z] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, -0.5]]) { cyl(R, 0.12, 0.12, 0.3, lamC("#e8e4dc"), C + x, 1.1, z, 10); }
      this.model = tower(0.012); this.model.position.set(C, 0.96, -1.3); R.add(this.model);
      void hh;
    }
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    if (id === S.hook || id === S.back) {
      const back = id === S.back;
      const x = back ? 0 : 0, z = back ? -2 + Math.min(1, (f - 615) / 120) * 2 : 0;
      const wav = back ? f > W.otra - 4 : f > W.hizo - 4;
      person("lustig", LUSTIG, x, 0, z, { mode: back && f < 690 ? "stroll" : "stand", phase: t * 3, expr: wav ? "grin" : "whistle", wave: wav ? Math.sin(t * 7) * 0.5 + 0.5 : undefined, facing: 0 }, 1);
      fx("sign", 512, 512, signDraw, x + 0.75, 1.3, z + 0.1, 1.1, 1.1);
      if ((!back && f > W.dos - 3 && f < W.dos + 20) || (back && f > W.otra && f < W.otra + 25)) fx(`spark|${f % 4}`, 256, 256, sparkDraw, x - 0.6, 2.2, z + 0.2, 0.6, 0.6);
      if (back) for (let k = 0; k < 6; k++) person(`pass${k}`, DEALER(k + 2), (k % 2 ? 1 : -1) * (3 + (k % 3)), 0, -6 - k * 4 + ((t * 1.3) % 4), { mode: "stroll", phase: t * 3 + k, expr: "neutral" }, 20 + k);
    }
    if (id === S.read) {
      const shock = f > W.fortuna - 3 && f < W.asi - 4, idea = f >= W.asi - 4;
      person("lustig", LUSTIG, -6.6, 0, 3.7, { mode: "sit", expr: idea ? "grin" : shock ? "shock" : "neutral", facing: 0 }, 1);
      if (!idea) fx("paper", 256, 230, paperDraw, -6.6, 1.0, 3.95, 0.62, 0.56);
      if (idea) fx(`puff|${Math.min(7, f - W.asi + 4)}`, 300, 300, (p) => fxPuff(p, Math.min(1, (f - W.asi + 4) / 8)), -6.6, 1.2, 4.0, 1.1, 1.1, true);
      for (let k = 0; k < 5; k++) person(`walk${k}`, DEALER(k), -3 + k * 1.6, 0, -2 - k * 3 + ((t * 1.2 + k) % 6), { mode: "stroll", phase: t * 3 + k, expr: "neutral" }, 10 + k);
    }
    if (id === S.disguise) {
      const on = f > W.funcionario - 6;
      person("lustig", on ? OFFICIAL : LUSTIG, 0, 0, 0, { mode: "stand", expr: on ? "grin" : "whistle", facing: 0 }, 1);
      if (f > W.funcionario - 10 && f < W.funcionario + 6) fx(`puff|${f % 8}`, 300, 300, (p) => fxPuff(p, ((f - W.funcionario + 10) % 16) / 16), 0, 1.2, 0.2, 1.6, 1.6, true);
    }
    if (id === S.hotel || id === S.pay || id === S.shame) {
      const C = HOTEL;
      const shocked = f > W.desmonta - 3 && f < W.paga;
      const pay = id === S.pay, shame = id === S.shame;
      // Lustig presents at the head of the table, gone after "huye"
      const run = pay && f > W.huye - 6 ? (f - W.huye + 6) / 30 : 0;
      if (!shame) person("lustig", OFFICIAL, C + 0.2 + run * 6, 0, -2.4, { mode: run ? "stroll" : "stand", phase: t * 6, expr: run ? "grin" : f > W.suelta ? "grin" : "smile" as never, wave: !run && f > W.suelta && f < W.desmonta + 30 ? 0.8 : undefined, facing: run ? 1 : 0 }, 1);
      if (run > 0) fx("bag", 256, 256, bagDraw, C + 0.6 + run * 6, 1.2, -2.2, 0.45, 0.45);
      for (let k = 0; k < 5; k++) {
        if (shame && k !== 0) continue;
        const pos = [[-1.2, 0], [1.4, 0.1], [-2.6, -1.0], [2.7, -1.1], [1.1, 0.8]][k];
        const ex = shame ? (f > W.verguenza - 3 ? "nervous" : "pained" as never) : pay && k === 0 ? (f > W.huye ? "shock" : "grin") : shocked ? "shock" : f > W.paga ? "neutral" : "nervous";
        person(`d${k}`, DEALER(k), C + pos[0], 0, pos[1], { mode: "stand", expr: ex, wave: pay && k === 0 && f < W.huye ? 0.7 : undefined }, 30 + k);
      }
      if (pay && f < W.huye - 6 && f > 474) fx("bag", 256, 256, bagDraw, C - 0.6, 1.15, 0.3, 0.42, 0.42);
      if (shame && f > W.verguenza - 4) fx("blush", 256, 256, blushDraw, C - 1.2, 1.4, 0.12, 0.42, 0.42, true);
      this.model.scale.setScalar(1 + 0.03 * smooth((f - W.desmonta) / 6) * (f < W.desmonta + 12 ? 1 : 0));
    }
  }
}
