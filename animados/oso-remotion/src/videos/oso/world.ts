// "El oso soldado": desert army camp in Iran (CAMP, x = 0), the port with the troopship (SHIP), Montecassino battlefield (BATTLE).
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, planksHD, stoneHD } from "./paint";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { burstDraw, signDraw } from "./beasts";
import { bearDraw, Hold, canDraw, bottleDraw, smokeDraw, paperDraw, xDraw, chevronDraw } from "./extra";
import { S, W, CAMP, SHIP, BATTLE } from "./story";

const SOLDIER = (v: number): Outfit => ({ jacket: ["#8a8458", "#7a7a50", "#948a5c"][v % 3], pants: "#6e6a48", boots: "#3a2a20", hat: "cap", cap: ["#5a5a38", "#6a5a3a"][v % 2], skin: SKINS[v % 4], belt: "#5a4a30", buttons: "#c8b070", moustache: v % 3 === 1 ? "#4a3020" : undefined });
const OFFICER: Outfit = { jacket: "#7a6e48", pants: "#5a5438", boots: "#2a1e18", hat: "cap", cap: "#8a2a2a", skin: SKINS[1], belt: "#3a2a20", buttons: "#e8c45a", moustache: "#5a3a20", build: "stout" };
const KID: Outfit = { jacket: "#d9a441", pants: "#7a5a3a", boots: "#5a3a2a", hat: "hair", hair: "#2a1a10", skin: SKINS[3], build: "kid" };
const emblem = (p: Pen) => {
  const g = p.g; p.ell(256, 256, 236, 236, "#2a3a2a", 10); p.ell(256, 256, 196, 196, "#f2ece0", 7);
  g.save(); g.translate(256, 256); g.scale(0.26, 0.26); g.translate(-1050, -800); bearDraw(0, "stand", "shell", "calm")(p); g.restore();
  g.fillStyle = "#c8202a"; g.font = "bold 40px Arial"; g.textAlign = "center"; g.fillText("22", 256, 470);
};

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    const sand = ctex("sand", 256, 256, (g, r) => { g.fillStyle = "#d8b884"; g.fillRect(0, 0, 256, 256); for (let k = 0; k < 400; k++) { g.fillStyle = `rgba(${r() > 0.5 ? 120 : 250},${r() > 0.5 ? 90 : 220},60,${r() * 0.18})`; g.fillRect(r() * 256, r() * 256, 2 + r() * 5, 2 + r() * 3); } });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lam({ map: rep(sand, 500, 500), color: "#e8d0a0" }));
    ground.position.y = -0.02; ground.receiveShadow = true; R.add(ground);
    const canvas = lamC("#b8a878"), dark = lamC("#8a7a50"), wood = lam({ map: rep(planksHD(), 1, 1), color: "#a87a4a" });
    // camp: ridge tents in rows, crates, flag pole
    const tent = (x: number, z: number, s = 1) => {
      const g = new THREE.CylinderGeometry(1.6 * s, 1.6 * s, 4 * s, 3, 1, false); g.rotateZ(Math.PI / 2);
      const m = new THREE.Mesh(g, canvas); m.position.set(x, 0.8 * s, z); m.rotation.x = Math.PI / 6 * 0; m.castShadow = m.receiveShadow = true; R.add(m);
      const d = new THREE.Mesh(new THREE.PlaneGeometry(0.9 * s, 1.3 * s), dark); d.position.set(x, 0.65 * s, z + 1.39 * s); R.add(d);
    };
    for (const [x, z] of [[-6, -6], [0, -8], [6, -6], [-12, -10], [12, -10], [-4, -15], [5, -16]] as const) tent(CAMP[0] + x, CAMP[2] + z);
    for (let k = 0; k < 4; k++) box(R, 0.7, 0.5, 0.5, wood, CAMP[0] - 2.4 + (k % 2) * 0.75, 0.25 + Math.floor(k / 2) * 0.5, CAMP[2] - 1.6);
    cyl(R, 0.05, 0.05, 6, lamC("#d8d0c0"), CAMP[0] + 4.5, 3, CAMP[2] - 3, 6);
    // emblem board (shot 8)
    for (const dx of [-0.9, 0.9]) cyl(R, 0.05, 0.05, 2.8, wood, -3 + dx, 1.4, -2.05, 6);
    // enlistment desk at x = 3
    box(R, 1.4, 0.06, 0.8, wood, 3.3, 0.8, -0.4); for (const dx of [-0.6, 0.6]) for (const dz of [-0.3, 0.3]) cyl(R, 0.03, 0.03, 0.8, wood, 3.3 + dx, 0.4, -0.4 + dz, 6);
    // distant hills
    for (let k = 0; k < 9; k++) { const m = new THREE.Mesh(new THREE.SphereGeometry(30 + (k % 3) * 12, 16, 8), lamC(["#c8a070", "#b89060", "#d0aa78"][k % 3])); m.scale.y = 0.35; m.position.set(-200 + k * 60, -4, -150 - (k % 2) * 40); R.add(m); }
    // port: quay, sea, troopship
    const seaTex = ctex("sea", 256, 256, (g, r) => { g.fillStyle = "#3a7aa2"; g.fillRect(0, 0, 256, 256); for (let k = 0; k < 120; k++) { g.fillStyle = `rgba(255,255,255,${r() * 0.25})`; g.fillRect(r() * 256, r() * 256, 10 + r() * 20, 2); } });
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(110, 200).rotateX(-Math.PI / 2), lam({ map: rep(seaTex, 11, 20) })); sea.position.set(SHIP[0], 0.0, SHIP[2] - 105); R.add(sea);
    box(R, 40, 0.6, 6, lam({ map: rep(stoneHD(), 8, 1), color: "#b8b0a0" }), SHIP[0], 0.0, SHIP[2] - 2);
    const hull = lamC("#3a3a44"), white = lamC("#e8e4dc");
    box(R, 34, 5, 7, hull, SHIP[0], 1.5, SHIP[2] - 10); box(R, 34.2, 0.6, 7.2, lamC("#8a2a26"), SHIP[0], -0.6, SHIP[2] - 10);
    box(R, 14, 3, 5, white, SHIP[0] + 2, 5.5, SHIP[2] - 10); box(R, 8, 2, 4, white, SHIP[0] + 2, 8, SHIP[2] - 10);
    for (const dx of [-1, 4]) cyl(R, 0.9, 0.9, 4, lamC("#c8a040"), SHIP[0] + dx, 10.5, SHIP[2] - 10, 14);
    for (let k = 0; k < 8; k++) { const w = new THREE.Mesh(new THREE.CircleGeometry(0.3, 12), lamC("#2a2a30")); w.position.set(SHIP[0] - 12 + k * 3.4, 2.4, SHIP[2] - 6.48); R.add(w); }
    const plank = box(R, 1.0, 0.1, 4.4, wood, SHIP[0] + 3, 1.6, SHIP[2] - 4.6); plank.rotation.x = 0.42;
    // battlefield: green-brown hills, monastery on the hilltop, sandbags, cannons
    const mud = lamC("#8a7a52");
    const field = new THREE.Mesh(new THREE.PlaneGeometry(80, 60).rotateX(-Math.PI / 2), mud); field.position.set(BATTLE[0], 0.0, BATTLE[2] - 10); field.receiveShadow = true; R.add(field);
    const hill = new THREE.Mesh(new THREE.SphereGeometry(40, 24, 12), lamC("#6a7a4a")); hill.scale.set(0.9, 0.5, 1); hill.position.set(BATTLE[0] - 6, -6, BATTLE[2] - 70); R.add(hill);
    box(R, 24, 6, 8, lamC("#e8dcc0"), BATTLE[0] - 6, 15, BATTLE[2] - 66); box(R, 4, 6, 4, lamC("#e0d4b8"), BATTLE[0] - 6, 20, BATTLE[2] - 66);
    for (let k = 0; k < 12; k++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 6), lamC("#a8946a")); b.scale.set(1.4, 0.6, 0.8); b.position.set(BATTLE[0] + 1.2 + (k % 6) * 0.6, 0.18 + Math.floor(k / 6) * 0.3, BATTLE[2] - 1.8); b.castShadow = true; R.add(b); }
    const gun = lamC("#4a5038");
    for (const dx of [3.6, 6.6]) {
      const x = BATTLE[0] + dx, z = BATTLE[2] - 0.6;
      const brl = cyl(R, 0.09, 0.12, 2.6, gun, x - 0.4, 0.95, z, 10); brl.rotation.z = -1.2;
      box(R, 1.0, 0.7, 0.12, gun, x, 0.6, z);
      for (const dz of [-0.45, 0.45]) { const w = cyl(R, 0.42, 0.42, 0.1, lamC("#2a2a26"), x, 0.42, z + dz, 16); w.rotation.x = Math.PI / 2; }
    }
    for (let k = 0; k < 6; k++) box(R, 0.6, 0.4, 0.45, wood, BATTLE[0] - 3.6 + (k % 3) * 0.65, 0.2 + Math.floor(k / 3) * 0.4, BATTLE[2] - 1.0);
    for (let k = 0; k < 4; k++) box(R, 0.6, 0.4, 0.45, wood, BATTLE[0] + 5 + (k % 2) * 0.65, 0.2 + Math.floor(k / 2) * 0.4, BATTLE[2] - 1.6);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    const bear = (key: string, x: number, z: number, sc: number, mode: "walk" | "stand" | "sit", hold: Hold, mood: "calm" | "wide" | "happy", dir = 1, cap = false, y = 0) => {
      const ph = mode === "sit" ? 0 : (Math.round(t * 8) % 8) * 0.785;
      card(`bear|${key}|${mode}|${hold}|${mood}|${cap ? 1 : 0}|${mode === "sit" ? 0 : Math.round(t * 8) % 8}`, x, z, sc, bearDraw(ph, mode, hold, mood, cap), dir, 0, y);
    };
    const B = BATTLE[0];
    const boom = (k: number, x: number, z: number, s = 1.6) => { const u = ((f + k * 17) % 34) / 34; if (u < 0.5) fx(`boom|${Math.floor(u * 6)}`, 256, 256, burstDraw(u < 0.2 ? "#fff3b0" : "#ffa040"), x, 1 + u * 2, z, s * (0.5 + u), s * (0.5 + u)); else fx("smoke", 256, 256, smokeDraw, x, 1.5 + u * 3, z, s * u * 1.6, s * u * 1.6, true); };
    const crew = (n: number, cheer: boolean) => { for (let k = 0; k < n; k++) person(`gun${k}`, SOLDIER(k + 2), B + 3.0 + k * 1.1, 0, -0.1 - (k % 2) * 0.4, { mode: "stand", expr: cheer ? "laugh" : k % 2 ? "nervous" : "stern", facing: -1, wave: cheer ? 0.6 + 0.4 * Math.sin(t * 8 + k) : undefined }, 10 + k); };
    if (id === S.hook || id === S.end) {
      bear("big", B, 0, 0.65, "stand", id === S.end && f > W.cabo - 6 ? "salute" : "shell", "calm", 1, true);
      crew(2, id === S.end && f > W.cabo - 6);
      boom(0, B - 3, -8, 2.4); boom(1, B + 4, -12, 3);
      if (id === S.hook && f < 12) fx("burst0", 256, 256, burstDraw(), B - 1.2, 1.4, -1.5, 1.4, 1.4);
    }
    if (id === S.iran) {
      person("kid", KID, 0.75, 0, 0.1, { mode: "stand", expr: f > W.latas - 4 ? "grin" : "smile", facing: -1 }, 1);
      for (let k = 0; k < 3; k++) person(`s${k}`, SOLDIER(k), -0.7 - k * 0.8, 0, -0.2 - k * 0.4, { mode: f < W.soldados && k === 0 ? "stroll" : "stand", phase: t * 6, expr: f > W.wojtek - 4 ? "laugh" : "grin", facing: 1, wave: k === 0 && f > W.latas - 4 && f < W.wojtek ? 0.8 : undefined }, 2 + k);
      bear("cub", 0.15, 0.25, 0.22, "sit", null, f > W.wojtek - 4 ? "happy" : "wide");
      if (f > W.latas - 4 && f < W.wojtek + 6) for (let k = 0; k < 3; k++) fx(`can`, 256, 256, canDraw, -0.15 + k * 0.22, 1.15 + 0.03 * Math.sin(t * 6 + k), 0.2, 0.22, 0.22);
    }
    if (id === S.grow) {
      const g = Math.min(1, Math.max(0, (f - W.crece + 4) / 30));
      const sc = 0.25 + g * 0.42;
      const wrestle = f > W.lucha - 4 && f < W.cigarros - 4;
      bear("grow", 0, 0, sc, f > W.cerveza - 4 && f < W.lucha - 4 ? "sit" : "stand", f > W.cerveza - 4 && f < W.lucha - 4 ? "bottle" : null, wrestle ? "wide" : f > W.cigarros - 4 ? "happy" : "calm");
      person("pal", SOLDIER(1), 1.25, 0, 0.1, { mode: wrestle && f > W.lucha + 6 ? "fall" : "stand", expr: wrestle ? "shock" : "laugh", facing: -1, tilt: wrestle ? -8 : 0 }, 2);
      person("pal2", SOLDIER(2), -1.3, 0, -0.3, { mode: "stand", expr: "laugh", facing: 1 }, 3);
      if (f > W.cerveza - 4 && f < W.lucha - 4) fx("beer", 256, 256, bottleDraw(), 0.75, 1.5, 0.2, 0.3, 0.3);
      if (f > W.cigarros - 4) fx("smk", 256, 256, smokeDraw, 0.55, 2.0 + ((f - W.cigarros) % 30) * 0.01, 0.2, 0.4, 0.4, true);
    }
    if (id === S.ship) {
      const X = SHIP[0];
      person("off", OFFICER, X + 0.7, 0, 0.1, { mode: "stand", expr: f > W.mascotas - 4 ? "stern" : "neutral", facing: -1, wave: f > W.mascotas - 4 ? 0.9 : undefined }, 1);
      bear("ship", X - 0.6, 0.1, 0.6, "walk", null, f > W.mascotas - 4 ? "wide" : "calm", 1);
      for (let k = 0; k < 2; k++) person(`sp${k}`, SOLDIER(k), X - 1.9 - k * 0.8, 0, -0.3, { mode: "stand", expr: f > W.mascotas - 4 ? "nervous" : "smile", facing: 1 }, 2 + k);
      fx("nopets", 1024, 512, signDraw(["PROHIBIDO", "MASCOTAS"], "#f2ece0", "#c8202a"), X + 1.6, 2.4, -0.2, 1.3, 0.65);
      if (f > W.mascotas - 4) fx("x", 256, 256, xDraw, X - 0.6, 1.0, 0.3, 0.6, 0.6);
    }
    if (id === S.enlist) {
      const X = 3.3;
      person("clerk", OFFICER, X + 0.2, 0, -0.95, { mode: "stand", expr: f > W.soldado - 4 ? "grin" : "stern", facing: -1 }, 1);
      bear("enl", X - 0.75, 0.1, 0.62, "stand", f > W.soldado - 4 ? "salute" : null, f > W.soldado - 4 ? "happy" : "calm", 1, f > W.mascota - 4);
      const stamp = f > W.sueldo + 6;
      fx(`paper|${f > W.nombre - 3 ? 1 : 0}${f > W.numero - 3 ? 1 : 0}${f > W.sueldo - 3 ? 1 : 0}${stamp ? 1 : 0}`, 512, 620,
        paperDraw("ALISTAMIENTO", [f > W.nombre - 3 ? "Nombre: WOJTEK" : "Nombre: ____", f > W.numero - 3 ? "Número: 1-0-1" : "Número: ____", f > W.sueldo - 3 ? "Sueldo: SÍ" : "Sueldo: ____"], stamp ? "SOLDADO" : undefined),
        X + 0.55, 1.45, 0.25, 0.55, 0.66);
    }
    if (id === S.battle) {
      for (let k = 0; k < 5; k++) boom(k, B - 12 + k * 6, -14 - (k % 2) * 6, f > W.explosiones - 4 ? 3.2 : 1.8);
      if (f > W.explosiones - 4) for (let k = 0; k < 3; k++) boom(k + 7, B - 4 + k * 4, -5, 2.2);
      crew(3, false);
      bear("bat", B - 1.6, 0.2, 0.65, "stand", null, f > W.wojtek2 - 4 ? "wide" : "calm", 1, true);
    }
    if (id === S.carry) {
      const x = B - 1.2 + (f - 876) * 0.0175;
      bear("carry", x, 0.2, 0.65, "stand", "crate", "calm", 1, true);
      crew(3, f > W.una - 4);
      boom(3, B - 2, -10, 3); boom(5, B + 5, -14, 3.2);
    }
    if (id === S.emblem) {
      const pop = Math.min(1, Math.max(0, (f - W.escudo + 6) / 8));
      fx("emblem", 512, 512, emblem, -3, 2.0, -2.0, 1.6 * (0.6 + 0.4 * pop), 1.6 * (0.6 + 0.4 * pop));
      bear("emb", -1.7, -0.4, 0.62, "stand", f > W.ascienden - 4 ? "salute" : null, f > W.ascienden - 4 ? "happy" : "calm", -1, true);
      if (f > W.ascienden - 4) fx("chev", 256, 256, chevronDraw(2), -1.4, 1.55, -0.2, 0.32, 0.32);
      for (let k = 0; k < 3; k++) person(`c${k}`, SOLDIER(k), -4.6 + k * 0.7, 0, -0.6, { mode: "stand", expr: f > W.ascienden - 4 ? "laugh" : "grin", facing: 1, wave: f > W.ascienden - 4 ? 0.5 + 0.5 * Math.sin(t * 9 + k) : undefined }, 2 + k);
    }
  }
}
