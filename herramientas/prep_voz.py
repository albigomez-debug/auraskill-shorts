"""Prepara la voz de un short animado: tempo x1.1 -> <slug>-remotion/public/voz/voz.wav, palabras escaladas y palabras.ts (cuadros).
Uso: python herramientas/prep_voz.py animados/<slug> [tempo]"""
import json, os, subprocess, sys
src = sys.argv[1].rstrip("/"); slug = os.path.basename(src); tempo = float(sys.argv[2]) if len(sys.argv) > 2 else 1.1
dst = f"{src}-remotion"; os.makedirs(f"{dst}/public/voz", exist_ok=True)
import numpy as np
from scipy.io import wavfile
SR = 48000; MAXGAP = 0.30  # pausas largas entre palabras se recortan a MAXGAP (segundos, antes del tempo)
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f"{src}/voz.mp3", "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.int16).astype(np.float32)
d = json.load(open(f"{src}/palabras.json", encoding="utf-8"))
pw = d["palabras"]
# rebuild simply: list of cut intervals
cuts = []; last = 0.0
for w in pw:
    if w["ini"] - last > MAXGAP: cuts.append((last + MAXGAP / 2, w["ini"] - MAXGAP / 2))
    last = w["fin"]
parts = []; pos = 0
fade = int(0.01 * SR)
for a, b in cuts:
    seg = x[pos:int(a * SR)].copy()
    if len(seg) > 2 * fade: seg[-fade:] *= np.linspace(1, 0, fade); seg[:fade] *= np.linspace(0, 1, fade) if pos else 1
    parts.append(seg); pos = int(b * SR)
parts.append(x[pos:])
ws = []
for w in pw:
    sh = sum(b - a for a, b in cuts if b <= w["ini"] + 1e-6)
    ws.append({"texto": w["texto"], "ini": (w["ini"] - sh) / tempo, "fin": (w["fin"] - sh) / tempo})
y = np.concatenate(parts)
tmp = f"{dst}/public/voz/_tmp.wav"; wavfile.write(tmp, SR, y.astype(np.int16))
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-af", f"atempo={tempo}", "-ar", str(SR), "-ac", "1", f"{dst}/public/voz/voz.wav"], check=True)
os.remove(tmp)
dur = len(y) / SR / tempo
json.dump({"duracion": dur, "palabras": ws}, open(f"{dst}/public/voz/palabras.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
fr = [{"t": w["texto"], "a": round(w["ini"] * 30), "b": round(w["fin"] * 30)} for w in ws]
open(f"{dst}/src/videos/{slug}/palabras.ts", "w", encoding="utf-8").write("export const WORDS: { t: string; a: number; b: number }[] = " + json.dumps(fr, ensure_ascii=False) + ";\n")
print(f"{slug}: {dur:.2f}s -> TOTAL ~{round(dur * 30) + 18}")
print(" · ".join(f"{w['t']} {w['a']}" for w in fr))
