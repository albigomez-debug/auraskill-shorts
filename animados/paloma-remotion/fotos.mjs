// uso: node fotos.mjs <Composición> <prefijo> <f,f,...> [escala]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
const [id, prefix, frames, scale = "0.5"] = process.argv.slice(2);
const browserExecutable = process.env.CHROME || null;
const chromiumOptions = { gl: process.env.GL || "angle" };
const inputProps = { mute: true };
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), publicDir: path.resolve("public") });
const composition = await selectComposition({ serveUrl, id, chromiumOptions, inputProps, browserExecutable });
const onBrowserLog = (l) => { if (l.type === "error") console.log("[error]", l.text.slice(0, 300)); };
for (const f of frames.split(",").map(Number)) {
  const t0 = Date.now();
  await renderStill({ composition, serveUrl, frame: f, output: `${prefix}${f}.jpg`, imageFormat: "jpeg", jpegQuality: 88, scale: Number(scale), chromiumOptions, inputProps, timeoutInMilliseconds: 240000, onBrowserLog, browserExecutable });
  console.log("still", f, ((Date.now() - t0) / 1000).toFixed(1) + "s");
}
