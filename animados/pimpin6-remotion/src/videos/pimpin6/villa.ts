// Villazanca: the town of giants (everyone ~2.5 m) and Pimpín (1.2 m). Shared by the "pimpin" series.
import * as THREE from "three";
import { Outfit, SKINS } from "./toon";
import { lam, lamC, box, cyl } from "./base";
import { rep, planksHD } from "./paint";
import { house, tree, flatGround } from "./props";

export const TALL = 1.45, KIDT = 1.75, PIM = 0.9;
export const PIMPIN: Outfit = { jacket: "#f0a02c", pants: "#3b5b9a", boots: "#e8e2d4", hat: "cap", cap: "#e2453c", build: "kid", skin: SKINS[0] };
export const ALCALDESA: Outfit = { jacket: "#7a2a8a", pants: "#3a2a4a", boots: "#2a1a1a", hat: "hair", hair: "#3a2a1a", skin: SKINS[1], dress: "#7a2a8a", belt: "#e8c45a", buttons: "#e8c45a" };
export const ESTIRADO: Outfit = { jacket: "#4a5a3a", pants: "#3a3a30", boots: "#2a2020", hat: "hair", hair: "#d8d8d8", skin: SKINS[0], moustache: "#d8d8d8", belt: null, buttons: "#e8c45a" };
export const ZANCUDO: Outfit = { jacket: "#3a7ac8", pants: "#2a2a3a", boots: "#f4f1ea", hat: "hair", hair: "#e8c45a", skin: SKINS[0], build: "kid", belt: null };
export const HOGAZA: Outfit = { jacket: "#f4f1ea", pants: "#d8c8a8", boots: "#6a4a2a", hat: "toque", skin: SKINS[2], dress: "#e8d8b8", belt: "#c8a06a" };
export const VEC = (v: number): Outfit => ({ jacket: ["#c84a3a", "#3a8a6a", "#d8a83a", "#5a6ac8", "#a85a8a", "#6a8a3a"][v % 6], pants: ["#3a3a4a", "#5a4a3a", "#2a3a4a"][v % 3], boots: "#3a2a20", hat: ["hair", "slouch", "hair", "tophat", "bonnet", "hair"][v % 6], hair: ["#3a2a1a", "#8a5a2a", "#1a1a1a", "#c8a050"][v % 4], cap: "#5a4a3a", skin: SKINS[v % 4], dress: v % 3 === 1 ? ["#c87a9a", "#7ab0c8"][v % 2] : undefined, moustache: v % 4 === 2 ? "#3a2a1a" : undefined, belt: null });
export const KIDV = (v: number): Outfit => ({ ...VEC(v + 2), hat: "hair", build: "kid", dress: undefined, moustache: undefined });

/** tall house: extra-tall door and windows high up (giants' proportions) */
export const tallHouse = (R: THREE.Object3D, x: number, z: number, w: number, wall: string, roof: string, face = 1) => {
  const h = 7.5, d = 6; house(R, x, z, w, h, d, wall, roof);
  const zf = z + face * (d / 2 + 0.03), dark = lamC("#4a2e1e"), win = lamC("#9ad0f0"), trim = lamC("#f4f1ea");
  box(R, 1.5, 3.7, 0.06, dark, x, 1.85, zf); box(R, 1.7, 0.2, 0.08, trim, x, 3.8, zf);
  for (const dx of [-w / 2 + 1.2, w / 2 - 1.2]) { box(R, 1.1, 1.8, 0.06, win, x + dx, 4.6, zf); box(R, 1.3, 0.15, 0.08, trim, x + dx, 3.65, zf); }
};

/** the main square (centre at 0,0): cobbles, a ring of tall houses behind (z = -9), a well, trees and bunting */
export const villazanca = (R: THREE.Object3D) => {
  flatGround(R, 40, 26, "#c8b896", 0, -1, 0.01);
  const walls = ["#e8c890", "#d89a7a", "#c8d8b0", "#e8d8c0", "#b8c8e0", "#e0b0a0"], roofs = ["#a8402a", "#5a4a52", "#8a3a2a"];
  for (let k = 0; k < 6; k++) tallHouse(R, -15 + k * 6, -11, 5.4, walls[k], roofs[k % 3]);
  for (let k = 0; k < 3; k++) { tallHouse(R, -19, -3 + k * 6.5, 5.4, walls[(k + 3) % 6], roofs[k % 3]); tallHouse(R, 19, -3 + k * 6.5, 5.4, walls[(k + 1) % 6], roofs[(k + 1) % 3]); }
  // well
  const stone = lamC("#9a948a"); cyl(R, 0.9, 0.9, 1.0, stone, 5, 0.5, -3, 16); cyl(R, 0.07, 0.07, 2.4, lamC("#6a4a2a"), 4.2, 1.2, -3, 6); cyl(R, 0.07, 0.07, 2.4, lamC("#6a4a2a"), 5.8, 1.2, -3, 6);
  box(R, 1.9, 0.5, 1.2, lam({ map: rep(planksHD(), 1, 1), color: "#a8603a" }), 5, 2.5, -3);
  for (const [x, z] of [[-11, -5], [11, -5], [-14, 4], [14, 5]]) tree(R, x, z, 1.5, "#5a9a3a");
  // bunting lines over the square
  const cols = ["#e2453c", "#f2c84a", "#3a8ac8", "#5ab85a"];
  for (let r = 0; r < 2; r++) for (let k = 0; k < 18; k++) { const x = -12 + k * 1.4, y = 7.2 - Math.sin((k / 17) * Math.PI) * 1.2; const m = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.6, 3), lamC(cols[k % 4])); m.rotation.x = Math.PI; m.position.set(x, y, -6 + r * 6); R.add(m); }
};

import { Pen } from "./toon";
/** big grey mouse in profile facing right, 512x320; ph = run phase */
export const mouseDraw = (ph: number, angry = true) => (p: Pen) => {
  const b = Math.sin(ph * Math.PI * 2) * 10;
  p.line([[90, 220], [40, 200], [10, 150]], "#c89a9a", 10, false);
  for (const [x, s] of [[170, 1], [330, -1]] as [number, number][]) p.stroke([[x, 240], [x + s * b * 2, 300]], 14);
  p.ell(250, 200 - b * 0.3, 160, 90, "#9a9aa2", 8);
  p.ell(400, 170 - b * 0.3, 80, 66, "#a8a8b0", 8); p.ell(380, 100, 44, 44, "#c8a0a8", 7);
  p.ell(470, 180, 14, 12, "#2a1a1a", 0); p.ell(415, 158, 12, 12, "#ffffff", 4); p.ell(418, 160, 6, 6, "#1a1010", 0);
  if (angry) p.line([[398, 138], [432, 146]], "#1a1010", 6, false);
  p.line([[460, 196], [500, 186]], "#1a1010", 3, false); p.line([[460, 200], [500, 208]], "#1a1010", 3, false);
};
/** golden key, 512x192 */
export const keyDraw = (p: Pen) => { p.ell(90, 96, 70, 70, "#f2c84a", 8); p.ell(90, 96, 30, 30, "#3a2a10", 4); p.poly([[150, 80], [470, 80], [470, 112], [150, 112]], "#f2c84a", 7); p.poly([[400, 112], [430, 112], [430, 160], [400, 160]], "#f2c84a", 6); p.poly([[440, 112], [466, 112], [466, 146], [440, 146]], "#f2c84a", 6); };
/** cobweb, 256x256 */
export const webDraw = (p: Pen) => { for (let k = 0; k < 6; k++) p.line([[0, 0], [Math.cos(k * 0.3) * 250, Math.sin(k * 0.3) * 250]], "#e8e8f0", 3, false); for (let r = 1; r < 5; r++) p.line(Array.from({ length: 6 }, (_, k) => [Math.cos(k * 0.3) * r * 55, Math.sin(k * 0.3) * r * 55] as [number, number]), "#e8e8f0", 3, false); };
