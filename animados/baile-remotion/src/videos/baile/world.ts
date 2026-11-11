// "La epidemia de baile de 1518": Strasbourg market square with half-timbered houses, the cathedral spire, a stage for musicians.
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { rep, ctex, cobbleHD, planksHD } from "./paint";
import { terrace, streetProps } from "./town";
import { Base, Api, lam, lamC, box, cyl, hh } from "./base";
import { smooth, S, W, STAGE } from "./story";

const TROFFEA: Outfit = { jacket: "#8a3a3a", pants: "#5a3a2a", boots: "#3a2a20", hat: "bonnet", dress: "#c25a5a", skin: SKINS[1] };
const FOLK = (v: number): Outfit => {
  const coats = ["#7a5a3a", "#5a6a3a", "#6a4a5a", "#8a6a3a", "#4a5a6a", "#9a4a3a", "#6a6a4a"];
  const o: Outfit = { jacket: coats[v % 7], pants: ["#5a4a3a", "#4a4a3a", "#6a5a4a"][v % 3], boots: "#3a2a20", skin: SKINS[v % 4] };
  return v % 2 ? { ...o, hat: "bonnet", dress: ["#d9a441", "#7a8a5a", "#5a7aa2", "#a2665a"][v % 4] } : { ...o, hat: v % 4 ? "cap" : "hair", cap: ["#6a4a3a", "#8a3a3a", "#4a5a3a"][v % 3], hair: "#4a3020" };
};
const COUNCIL = (v: number): Outfit => ({ jacket: "#8a1e26", pants: "#2a2a30", boots: "#1a1a1e", hat: "tophat", skin: SKINS[(v + 1) % 4], beard: v % 2 ? "#7a6a5a" : undefined, moustache: "#5a4030", buttons: "#e8c45a", belt: null, build: v ? undefined : "stout" });
const MUSIC = (v: number): Outfit => ({ jacket: ["#3a5a8a", "#8a7a3a", "#5a3a6a"][v % 3], pants: "#e8dcc0", boots: "#3a2a20", hat: "cap", cap: ["#c8323a", "#2a6a3a", "#d9a441"][v % 3], skin: SKINS[(v + 2) % 4] });

const noteDraw = (k: number) => (p: Pen) => { const x = 60 + (k % 2) * 30; p.ell(x, 190, 40, 30, "#2a2a32", 5); p.band([[x + 36, 190], [x + 36, 50]], "#2a2a32", 12, 0); p.poly([[x + 36, 50], [x + 110, 80], [x + 110, 110], [x + 36, 84]], "#2a2a32", 0); };
const drumDraw = (p: Pen) => { p.ell(128, 90, 90, 30, "#f2ecdc", 6); p.poly([[38, 90], [218, 90], [218, 200], [38, 200]], "#c8323a", 6); p.ell(128, 200, 90, 30, "#c8323a", 6); for (let k = 0; k < 5; k++) p.line([[38 + k * 45, 100], [60 + k * 45, 195]], "#e8c45a", 5, false); };
const sweatDraw = (p: Pen) => { for (let k = 0; k < 3; k++) { const x = 60 + k * 70, y = 80 + (k % 2) * 60; p.poly([[x, y - 30], [x + 18, y + 10], [x, y + 24], [x - 18, y + 10]], "#9ad4ff", 4); } };

/** a dancer's pose: bounce, sway and flailing arms */
const dance = (t: number, i: number, tired = 0) => {
  const ph = t * (6 - 2 * tired) + i * 1.7;
  return { y: Math.abs(Math.sin(ph)) * 0.09 * (1 - 0.6 * tired), opts: { mode: "stand" as const, tilt: 9 * Math.sin(ph * 0.5) * (1 - 0.5 * tired), headTilt: 8 * Math.sin(ph * 0.5 + 1),
    wave: Math.sin(ph) * 0.5 + 0.5, raise: Math.sin(ph * 0.5) > 0 ? 1 : 0 } };
};

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    this.L = { ...this.L, el: 40 };
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lamC("#8a9a6a")); ground.position.y = -0.03; R.add(ground);
    const sq = new THREE.Mesh(new THREE.PlaneGeometry(26, 80).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 26 / 4, 20), color: "#d8ccbc" }));
    sq.position.set(0, 0, -15); sq.receiveShadow = true; R.add(sq);
    // half-timbered look: pale plaster walls with dark wood beams painted on top of the facades
    const walls = ["#f2ead6", "#efe2c4", "#f4ecdc", "#e8d8bc"], roofs = ["#8a3a2a", "#7a4a3a", "#9a4a32"], shut = ["#5a3a24", "#3f5f4a", "#6a3a30"];
    terrace(R, { side: 1, x: 13, z0: -50, z1: 24, seed: 111, floors: [3, 4], walls, roofs, shutters: shut, brick: 0, signs: ["BROT", "WEIN", "TUCH"] });
    terrace(R, { side: -1, x: 13, z0: -50, z1: 24, seed: 113, floors: [3, 4], walls, roofs, shutters: shut, brick: 0, signs: ["FISCH", "BIER"] });
    const beam = lamC("#4a2e1e");
    for (const sx of [-1, 1]) for (let z = -50; z < 24; z += 1.6) box(R, 0.06, 9, 0.14, beam, sx * 12.95, 4.5, z);
    for (const sx of [-1, 1]) for (const y of [2.8, 5.6, 8.4]) box(R, 0.06, 0.16, 74, beam, sx * 12.95, y, -13);
    streetProps(R, 1, 11.5, -46, 20, 115); streetProps(R, -1, 11.5, -46, 20, 116);
    // cathedral at the end of the square: tall nave block, one spire
    const stone = lam({ map: rep(ctex("redstone", 256, 256, (g, r) => { g.fillStyle = "#c48a78"; g.fillRect(0, 0, 256, 256);
      for (let y = 0; y < 256; y += 32) for (let x = (y / 32) % 2 ? -32 : 0; x < 256; x += 64) { g.strokeStyle = "rgba(90,50,40,0.5)"; g.lineWidth = 3; g.strokeRect(x, y, 64, 32); g.fillStyle = `rgba(255,220,200,${r() * 0.15})`; g.fillRect(x + 3, y + 3, 58, 26); } }), 6, 8) });
    box(R, 22, 26, 12, stone, 0, 13, -64);
    box(R, 7, 40, 7, stone, 4, 20, -60);
    const spire = new THREE.Mesh(new THREE.ConeGeometry(3.4, 30, 8), stone); spire.position.set(4, 55, -60); spire.castShadow = true; R.add(spire);
    const rose = new THREE.Mesh(new THREE.CircleGeometry(3.5, 24), lamC("#3a4a7a")); rose.position.set(-2, 17, -57.9); R.add(rose);
    const door = new THREE.Mesh(new THREE.PlaneGeometry(4, 7), lamC("#3a2418")); door.position.set(-2, 3.5, -57.9); R.add(door);
    // the musicians' stage
    const wood = lam({ map: rep(planksHD(), 1, 1), color: "#b08a5a" });
    box(R, 5, 1.0, 3, wood, STAGE[0], 0.5, STAGE[2]);
    for (const dx of [-2.3, 2.3]) cyl(R, 0.08, 0.08, 3.6, lamC("#5a3a24"), STAGE[0] + dx, 2.3, STAGE[2] - 1.3, 6);
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 0.7), lamC("#c8323a", { side: THREE.DoubleSide })); banner.position.set(STAGE[0], 3.8, STAGE[2] - 1.3); R.add(banner);
    // a market cart and well
    cyl(R, 1.0, 1.0, 0.8, lamC("#9a8a78"), -5, 0.4, -10, 16);
    box(R, 2, 0.8, 1.2, wood, 7, 0.9, 2);
    void hh;
  }

  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const tiredEnd = id === S.end ? smooth((f - 640) / 60) : 0;
    // Frau Troffea dances in the middle of everything
    const d0 = dance(t, 0, tiredEnd);
    const exp = id === S.hook ? "dazed" : id === S.end ? (f > W.hambre - 4 ? "pained" : "dazed") : "nervous";
    if (id !== S.council || f < 476) person("troffea", TROFFEA, 0, d0.y, 0, { ...d0.opts, expr: exp as never }, 1, true);
    if (id === S.hook || id === S.alone || id === S.end) fx(`sweat|${Math.floor(f / 6) % 2}`, 256, 256, sweatDraw, 0.1, 2.1 + 0.05 * Math.sin(t * 6), 0.1, 0.5, 0.4);
    // dancers: the crowd grows from 0 to "decenas" to "cientos"
    const n = id === S.hook ? 6 : id === S.city ? 3 : id === S.alone ? 0 : id === S.join ? Math.round(6 + 26 * smooth((f - W.decenas + 10) / 40)) : id === S.council ? 30 : id === S.worse ? 90 : 60;
    for (let k = 0; k < n; k++) {
      const ring = Math.floor(Math.sqrt(k + 1)), ang = k * 2.4;
      const x = Math.cos(ang) * (1.3 + ring * 0.85), z = -1.2 + Math.sin(ang) * (1.0 + ring * 0.8) - ring * 0.6;
      if (z > 1.5) continue;
      if ((id === S.end || id === S.hook) && z > -1.6) continue;
      const dk = dance(t, k + 3, tiredEnd);
      person(`dn${k}`, FOLK(k), x, dk.y, z, { ...dk.opts, expr: (k % 4 === 0 ? "dazed" : k % 4 === 1 ? "nervous" : k % 4 === 2 ? "pained" : "shock") as never }, 10 + k);
    }
    // onlookers by the walls
    if (id === S.alone || id === S.city || id === S.join) for (let k = 0; k < 10; k++) {
      const sx = k % 2 ? 1 : -1, x = sx * (6 + (k % 3) * 0.8), z = -3 - Math.floor(k / 2) * 2.2;
      person(`on${k}`, FOLK(k + 40), x, 0, z, { mode: "stand", expr: f > W.musica - 3 ? "shock" : "neutral", facing: (-sx) as -1 | 1 }, 60 + k);
    }
    if (id === S.council) {
      // the council decides: more dancing!
      for (let k = 0; k < 3; k++) person(`co${k}`, COUNCIL(k), -6.8 + k * 0.9, 0, -1.0 - (k % 2) * 0.4, { mode: "stand", expr: f > W.cura - 4 ? "grin" : "stern", wave: k === 0 && f > W.cura - 4 ? Math.sin(t * 6) * 0.5 + 0.5 : undefined, facing: 1 }, 80 + k);
      if (f > 470) for (let k = 0; k < 3; k++) {
        const x = STAGE[0] - 1.4 + k * 1.4, play = Math.sin(t * 10 + k);
        person(`mu${k}`, MUSIC(k), x, 1.0, STAGE[2] + 0.2, { mode: "stand", expr: "grin", wave: play * 0.5 + 0.5, tilt: 4 * play }, 90 + k, false);
        if (k === 1) fx("drum", 256, 256, drumDraw, x + 0.35, 1.85, STAGE[2] + 0.5, 0.45, 0.45);
        fx(`note${(Math.floor(f / 8) + k) % 2}`, 256, 256, noteDraw(k), x + 0.2 * Math.sin(t * 3 + k), 2.9 + ((f / 30 + k * 0.3) % 1) * 0.8, STAGE[2] + 0.3, 0.32, 0.32);
      }
    }
    if (id === S.worse && f > W.empeoro - 10) for (let k = 0; k < 6; k++) fx(`note${k % 2}`, 256, 256, noteDraw(k), -6 + k * 2.4, 3 + ((f / 25 + k * 0.4) % 1) * 1.2, -3 - k, 0.6, 0.6);
  }
}
