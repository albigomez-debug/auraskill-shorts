// "El caballo que sabía sumar": a Berlin courtyard with Hans, his teacher, a chalkboard and a growing crowd.
import * as THREE from "three";
import { Pen, Outfit, SKINS, horse } from "./toon";
import { rep, cobbleHD, planksHD, facadeHD } from "./paint";
import { terrace, streetProps } from "./town";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { smooth, S, W, HORSE, PROF, BOARD } from "./story";

const OSTEN: Outfit = { jacket: "#2a2a30", pants: "#3a3a40", boots: "#111118", hat: "tophat", skin: SKINS[1], beard: "#f2f0ea", moustache: "#f2f0ea", buttons: "#c8c0b0", belt: null };
const PFUNGST: Outfit = { jacket: "#5a4a3a", pants: "#3a3a40", boots: "#2a2020", hat: "cap", cap: "#3a3a3a", skin: SKINS[2], moustache: "#5a3a26", buttons: "#c8c0b0" };
const EXPERT = (v: number): Outfit => ({ jacket: ["#3a3a4a", "#4a3a3a", "#2a3a3a"][v % 3], pants: "#2a2a30", boots: "#111", hat: "tophat", skin: SKINS[v % 4], moustache: v % 2 ? "#6a6a6a" : "#4a3020", beard: v % 3 === 0 ? "#8a8a8a" : undefined, belt: null });
const BERLINER = (v: number): Outfit => {
  const coats = ["#7a3a4a", "#3a5a7a", "#6a7a3a", "#8a5a34", "#4a4a6a", "#a8423a"];
  const o: Outfit = { jacket: coats[v % 6], pants: "#3a3a44", boots: "#2a2020", skin: SKINS[v % 4] };
  return v % 3 === 1 ? { ...o, hat: "bonnet", dress: ["#d9a441", "#c25a7a", "#5a8fc2"][v % 3] } : v % 3 === 2 ? { ...o, hat: "cap", cap: "#4a4a4a" } : { ...o, hat: "tophat" };
};
const COAT = { coat: "#8a5a34", mane: "#2a1a12", blaze: true };

const horseDraw = (tap: number, eye: "calm" | "wide" | "lost") => (p: Pen) => {
  horse(p, COAT, 1000, null, undefined, tap * 7);
  // comic eye on the head (head is to the right, high)
  void eye;
};
const boardText = (txt: string, col = "#f4f1ea") => (p: Pen) => {
  p.g.fillStyle = col; p.g.font = "bold 120px 'Comic Sans MS', Arial"; p.g.textAlign = "center"; p.g.fillText(txt, 256, 150);
};
const countDraw = (n: string, col = "#ffd23f") => (p: Pen) => {
  p.ell(128, 128, 90, 90, "#2a2a32", 8); p.g.fillStyle = col; p.g.font = "bold 120px Arial"; p.g.textAlign = "center"; p.g.fillText(n, 128, 170);
};
const qDraw = (p: Pen) => { p.g.fillStyle = "#ffd23f"; p.g.strokeStyle = "#1a1010"; p.g.lineWidth = 14; p.g.font = "bold 200px Arial"; p.g.textAlign = "center"; p.g.strokeText("?", 128, 200); p.g.fillText("?", 128, 200); };
const padDraw = (p: Pen) => { p.poly([[40, 20], [216, 20], [216, 236], [40, 236]], "#f2ecdc", 6); for (let k = 0; k < 6; k++) p.line([[60, 60 + k * 28], [196, 60 + k * 28]], "#8a8478", 4, false); };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000).rotateX(-Math.PI / 2), lamC("#a8a090")); ground.position.y = -0.03; R.add(ground);
    const yard = new THREE.Mesh(new THREE.PlaneGeometry(24, 70).rotateX(-Math.PI / 2), lam({ map: rep(cobbleHD(), 6, 17), color: "#d8ccc0" }));
    yard.position.set(0, 0, -10); yard.receiveShadow = true; R.add(yard);
    const walls = ["#d8c8a8", "#c8b494", "#e2d4b8", "#b8a080", "#cfc0a2"], roofs = ["#6a3a30", "#5a4a52", "#4e5560"];
    terrace(R, { side: 1, x: 12, z0: -40, z1: 24, seed: 91, floors: [4, 5], walls, roofs, brick: 0.4, signs: ["BÄCKEREI", "APOTHEKE", "BIER"] });
    terrace(R, { side: -1, x: 12, z0: -40, z1: 24, seed: 93, floors: [4, 5], walls, roofs, brick: 0.4, signs: ["KAFFEE", "SCHNEIDER"] });
    streetProps(R, 1, 10.5, -36, 20, 95); streetProps(R, -1, 10.5, -36, 20, 96);
    // a big building closing the courtyard
    const hall = box(R, 26, 15, 4, lam({ map: facadeHD("berlinhall", 26, 15, { wall: "#d8c4a0", shutter: "#3a4a3a", door: true }) }), 0, 7.5, -42);
    void hall; box(R, 26.6, 2.6, 4.6, lamC("#6a3a30"), 0, 16.2, -42);
    // chalkboard on an easel
    const wood = lam({ map: rep(planksHD(), 0.4, 0.4), color: "#8a5a34" });
    box(R, 1.6, 1.1, 0.06, lamC("#2a3a32"), BOARD[0], 1.45, BOARD[2]);
    box(R, 1.7, 0.08, 0.1, wood, BOARD[0], 2.02, BOARD[2]); box(R, 1.7, 0.08, 0.1, wood, BOARD[0], 0.88, BOARD[2]);
    for (const dx of [-0.7, 0.7]) { const l = cyl(R, 0.03, 0.03, 2.1, wood, BOARD[0] + dx, 1.0, BOARD[2] - 0.1, 6); l.rotation.x = 0.1; }
    // a low fence rope for the crowd
    const post = lamC("#5a4636");
    for (let k = 0; k < 7; k++) cyl(R, 0.04, 0.05, 0.9, post, -4.2 + k * 1.4, 0.45, -2.8, 6);
    box(R, 8.4, 0.03, 0.03, lamC("#c8a040"), 0, 0.8, -2.8);
  }

  pose(a: Api) {
    const { f, t, id, person, card, fx } = a;
    // Hans taps: 5 taps for "3 + 2" between 278 and 330; endless taps in the test (wrong); none otherwise
    let tap = 0;
    if (id === S.sum && f >= 276 && f < 332) tap = ((f - 276) % 11) < 5 ? 1 : 0;
    if (id === S.test && f >= 575) tap = ((f - 575) % 10) < 5 ? 1 : 0;
    if (id === S.faces && f < W.correcto) tap = ((f - 608) % 12) < 5 ? 1 : 0;
    const taps = id === S.sum ? Math.min(5, Math.floor((Math.max(0, f - 276) + 6) / 11)) : 0;
    card(`hans|${tap}`, HORSE[0], HORSE[2], 1.0, horseDraw(tap, "calm"), 1, 0);
    // the teacher beside his horse; tense while counting, relaxed at the right number
    const counting = (id === S.sum && f >= 276 && f < 332) || (id === S.faces && f < W.correcto - 3);
    const relax = (id === S.sum && f >= 330) || (id === S.faces && f >= W.correcto - 3);
    const profEx = id === S.test ? "nervous" : counting ? "nervous" : relax ? "relief" : id === S.hook ? "grin" : "smile";
    person("osten", OSTEN, PROF[0], 0, PROF[2], { mode: "stand", expr: profEx as never, wave: (id === S.berlin && f > W.hans - 4) || (id === S.sum && f > W.preguntas && f < 270) ? 0.8 : undefined, facing: 1 }, 1);
    // chalkboard text
    const q = id === S.test ? "? + ?" : "3 + 2";
    fx(`board|${q}`, 512, 200, boardText(q), BOARD[0], 1.48, BOARD[2] + 0.3, 1.4, 0.55);
    if (id === S.sum && taps > 0) fx(`count|${taps}`, 256, 256, countDraw(String(taps)), HORSE[0] - 0.3, 2.05, 0.3, 0.45, 0.45);
    if (id === S.sum && f > W.fallar - 6) fx("five", 512, 200, boardText("= 5", "#ffd23f"), BOARD[0], 1.12, BOARD[2] + 0.3, 1.0, 0.4);
    // crowd grows
    const nCrowd = id === S.hook ? 6 : id === S.berlin ? 10 + Math.round(8 * smooth((f - 106) / 80)) : id === S.crowd ? 26 : id === S.end ? 26 : 12;
    for (let k = 0; k < nCrowd; k++) {
      const x = -4 + (k % 8) * 1.15 + (Math.floor(k / 8) % 2) * 0.5, z = -3.6 - Math.floor(k / 8) * 1.2;
      const cheer = (id === S.sum && f > W.fallar - 4) || (id === S.end) || (id === S.crowd && f < 400);
      person(`c${k}`, BERLINER(k), x, 0, z, { mode: "stand", expr: cheer ? (k % 3 ? "laugh" : "shock") : id === S.test && f > W.falla ? "shock" : "neutral", wave: cheer && k % 3 === 0 ? Math.sin(t * 8 + k) * 0.5 + 0.5 : undefined }, 100 + k);
    }
    if (id === S.crowd) for (let k = 0; k < 4; k++) {
      const x = -2.4 + k * 0.9, z = 1.2 + (k % 2) * 0.5;
      person(`ex${k}`, EXPERT(k), x, 0, z, { mode: "stand", expr: f > W.trampa - 4 ? "shock" : "stern", facing: 1 }, 50 + k);
      if (f > W.comision - 10) fx("pad", 256, 256, padDraw, x + 0.25, 1.15, z + 0.12, 0.3, 0.3);
    }
    if (id === S.test || id === S.faces) {
      // Pfungst stands where the horse can't read the teacher; teacher doesn't know the answer
      person("pfungst", PFUNGST, -2.6, 0, 0.6, { mode: "stand", expr: id === S.test && f > W.falla ? "grin" : "stern", facing: 1 }, 2);
      if (id === S.test && f > W.respuesta - 4) fx("q", 256, 256, qDraw, PROF[0], 2.35, PROF[2] + 0.1, 0.45, 0.45);
      if (id === S.test && f > W.falla - 4) { const n = Math.floor((f - 575) / 10) + 1; fx(`count|${n}`, 256, 256, countDraw(String(n), "#ff6a5a"), HORSE[0] - 0.3, 2.05, 0.3, 0.45, 0.45); }
    }
  }
}
