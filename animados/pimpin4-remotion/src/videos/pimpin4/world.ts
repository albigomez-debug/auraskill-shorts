// Pimpín 4 · "La final": outdoor court along x (hoop at HOOP, x = +11.6), bleachers at z = -9.., scoreboard above.
import * as THREE from "three";
import { Pen, Outfit, SKINS } from "./toon";
import { Base, Api, lam, lamC, box, cyl } from "./base";
import { rep, planksHD } from "./paint";
import { textDraw, labelDraw, ctaDraw, bubbleDraw, grassGround, tree, medalDraw } from "./props";
import { TALL, PIM, PIMPIN, VEC } from "./villa";
import { S, W, HOOP, pimX, liftY, ballAt, score, smooth } from "./story";

const GIANT = 1.75;
const VZ = (v: number): Outfit => ({ jacket: "#d8302a", pants: "#d8302a", boots: "#f4f1ea", hat: "hair", hair: ["#3a2a1a", "#8a5a2a", "#1a1a1a", "#c8a050"][v % 4], skin: SKINS[v % 4], belt: null, buttons: "#f4f1ea" });
const VG = (v: number): Outfit => ({ jacket: "#2a5ac8", pants: "#2a5ac8", boots: "#f4f1ea", hat: "hair", hair: ["#1a1a1a", "#5a3a1a", "#d8b060"][v % 3], skin: SKINS[(v + 1) % 4], belt: null, buttons: "#f4f1ea", moustache: v % 2 ? "#2a1a10" : undefined });
const PIMJ: Outfit = { ...PIMPIN, jacket: "#d8302a", pants: "#d8302a" };
const ballDraw = (p: Pen) => { p.ell(64, 64, 56, 56, "#e8782a", 6); p.line([[10, 64], [118, 64]], "#3a1a0a", 4, false); p.line([[64, 10], [64, 118]], "#3a1a0a", 4, false); p.arc(20, 64, 40, 50, -60, 60, 4); p.arc(108, 64, 40, 50, 120, 240, 4); };
const boardDraw = (a: number, b: number, clock: string) => (p: Pen) => { p.poly([[6, 6], [1018, 6], [1018, 506], [6, 506]], "#1a1a22", 10); p.g.textAlign = "center"; p.g.fillStyle = "#f4f1ea"; p.g.font = "bold 58px Arial"; p.g.fillText("VILLAZANCA", 260, 90); p.g.fillText("VILLAGIGANTE", 764, 90); p.g.fillStyle = "#ff4a3a"; p.g.font = "bold 200px 'Courier New', monospace"; p.g.fillText(String(a), 260, 300); p.g.fillStyle = "#4a8aff"; p.g.fillText(String(b), 764, 300); p.g.fillStyle = "#ffd23f"; p.g.font = "bold 110px 'Courier New', monospace"; p.g.fillText(clock, 512, 460); };
const netDraw = (p: Pen) => { p.g.strokeStyle = "#f4f1ea"; p.g.lineWidth = 6; for (let k = 0; k < 7; k++) { p.g.beginPath(); p.g.moveTo(20 + k * 36, 10); p.g.lineTo(60 + k * 22, 240); p.g.stroke(); } for (let r = 0; r < 3; r++) { p.g.beginPath(); p.g.moveTo(20 + r * 14, 70 + r * 70); p.g.lineTo(236 - r * 14, 70 + r * 70); p.g.stroke(); } };

export class World extends Base {
  constructor() {
    super();
    const R = this.root;
    grassGround(R, "#9ac06a");
    box(R, 30, 0.1, 15, lam({ map: rep(planksHD(), 10, 5), color: "#d8a46a" }), 0, -0.03, 0);
    const white = lamC("#f4f1ea");
    for (const z of [-7.4, 7.4]) box(R, 30, 0.03, 0.1, white, 0, 0.03, z);
    for (const x of [-14.9, 14.9, 0]) box(R, 0.1, 0.03, 15, white, x, 0.03, 0);
    const key = new THREE.Mesh(new THREE.PlaneGeometry(5.5, 4.8).rotateX(-Math.PI / 2), lamC("#b8562a")); key.position.set(12.2, 0.025, 0); R.add(key);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.05, 6, 40), white); ring.rotation.x = Math.PI / 2; ring.position.set(0, 0.03, 0); R.add(ring);
    // hoop
    const [hx, hy] = HOOP; cyl(R, 0.12, 0.12, 4.0, lamC("#3a3a40"), hx + 1.6, 2.0, 0, 10); box(R, 1.4, 0.12, 0.12, lamC("#3a3a40"), hx + 1.0, 3.9, 0);
    box(R, 0.08, 1.1, 1.8, lamC("#f4f1ea"), hx + 0.45, hy + 0.45, 0); box(R, 0.09, 0.45, 0.6, lamC("#d8302a"), hx + 0.44, hy + 0.25, 0);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.025, 6, 20), lamC("#e8502a")); rim.rotation.x = Math.PI / 2; rim.position.set(hx, hy, 0); R.add(rim);
    // bleachers
    const wood = lam({ map: rep(planksHD(), 6, 1), color: "#8a6a4a" });
    for (let r = 0; r < 3; r++) box(R, 26, 0.8 * (r + 1), 1.4, wood, 0, 0.4 * (r + 1), -9 - r * 1.4);
    box(R, 6.4, 3.4, 0.3, lamC("#2a2a30"), 0, 7.4, -12.6); cyl(R, 0.15, 0.15, 6, lamC("#2a2a30"), -2.5, 3, -12.8, 8); cyl(R, 0.15, 0.15, 6, lamC("#2a2a30"), 2.5, 3, -12.8, 8);
    box(R, 4, 0.5, 0.6, wood, -6, 0.25, 5.7);
    for (let k = 0; k < 6; k++) tree(R, -25 + k * 10, -20, 1.6, "#5a9a3a");
  }
  pose(a: Api) {
    const { f, t, id, person, fx } = a;
    const [hx, hy] = HOOP;
    const [sa, sb, clock] = score(f);
    fx(`sb|${sa}|${sb}|${clock}`, 1024, 512, boardDraw(sa, sb, clock), 0, 7.4, -12.4, 6.2, 3.1);
    fx("net", 256, 256, netDraw, hx, hy - 0.25, 0, 0.5, 0.5);
    // crowd in the bleachers
    const cheer = id === S.win || id === S.lift || id === S.laugh;
    for (let k = 0; k < 14; k++) { const r = k % 3; person(`fan${k}`, VEC(k), -11 + Math.floor(k / 3) * 4.6 + r * 1.3, 0.8 * (r + 1), -9 - r * 1.4, { mode: "stand", expr: id === S.laugh ? "laugh" : cheer ? (id === S.win ? "laugh" : "shock") : "neutral", facing: 0, wave: cheer || id === S.dribble ? 0.6 + Math.sin(t * 7 + k) * 0.3 : undefined }, 20 + k, false, TALL); }
    // Villagigante (3 m) guarding the hoop
    const guard: [number, number][] = [[4.5, 0.2], [6.5, -0.8], [8.2, 0.6], [9.6, -0.4], [10.6, 1.2]];
    if (id !== S.cta) guard.forEach(([x, z], k) => { const beat = (id === S.dribble || id === S.hook || id === S.end) && pimX(f, id) > x - 0.4; person(`vg${k}`, VG(k), x, 0, z, { mode: "stand", expr: id === S.laugh ? "laugh" : beat || id === S.lift ? "shock" : id === S.win ? "dazed" : "grin", facing: -1, wave: id === S.losing && k === 3 && f > W.tapan - 10 ? 0.95 : undefined }, 2 + k, true, GIANT); });
    // Villazanca team
    const teamX: [number, number][] = id === S.lift || id === S.win ? [[10.6, 1.0], [11.4, 1.6], [9.2, 2.0]] : [[2.0, 1.8], [-1.0, -1.0], [7.4, 2.2]];
    if (id !== S.cta) teamX.forEach(([x, z], k) => person(`vz${k}`, VZ(k), x, 0, z, { mode: "stand", expr: id === S.win ? "laugh" : id === S.losing ? "nervous" : id === S.lift ? "grin" : "neutral", facing: 1, wave: id === S.lift || id === S.win ? 0.95 : undefined }, 8 + k, true, TALL));
    // Pimpín
    const onBench = id === S.intro || id === S.losing || id === S.bench || id === S.laugh;
    const px = onBench ? -6 : pimX(f, id), py = id === S.lift || id === S.win ? liftY(f, id) : 0;
    person("pim", PIMJ, px, py, onBench ? 5.0 : 1.0, { mode: id === S.dribble || id === S.hook || id === S.end ? "march" : "stand", phase: t * 3, expr: id === S.laugh ? "nervous" : id === S.win || id === S.lift ? "laugh" : id === S.under ? "stern" : id === S.dribble ? "grin" : "smile", facing: onBench ? 0 : 1, wave: id === S.lift || id === S.win ? 0.95 : undefined }, 1, py < 0.05, PIM);
    if (id === S.bench && f > W.pimpin - 4) fx("lab", 512, 160, labelDraw("PIMPÍN", "#e2453c"), px, 1.6, 5.1, 0.7, 0.22);
    // the ball
    const b = ballAt(f, id, px, py); if (b) fx("ball", 128, 128, ballDraw, b[0], b[1], b[2], 0.3, 0.3);
    if (id === S.intro && f > W.tres - 4) fx("3m", 512, 200, textDraw("3 METROS", "#4a8aff", 100), 7.0, 5.3, 0.5, 2.6, 1.0);
    if (id === S.laugh) fx("bub", 512, 256, bubbleDraw("¡NI A LA RODILLA!"), 7.0, 5.0, 0.5, 3.0, 1.5);
    if (id === S.lift && f > W.canasta - 4) fx("can", 512, 200, textDraw("¡CANASTA!", "#ffd23f", 100), hx - 0.6, hy + 1.4, 0.6, 1.8, 0.7);
    if (id === S.win && f > W.anotador - 6) fx("med", 256, 384, medalDraw("MVP"), px + 0.05, py + 0.75, 1.15, 0.3, 0.45);
    if (id === S.cta) { const pr = smooth((f - W.dale) / 10); fx(`cta|${Math.round(pr * 6)}`, 1024, 512, ctaDraw(pr), 2.0, 3.0, 1.5, 2.2, 1.1); }
    void cyl;
  }
}
