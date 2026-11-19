"""Genera voz.mp3 y palabras.json (tiempos por palabra) para un texto.
Uso: python herramientas/voz.py carpeta [voz] [velocidad]

Voz expresiva: cada línea de texto.txt se locuta aparte y puede empezar con {velocidad tono},
p. ej. "{+35% +10Hz} ¡Este hombre se comió un avión!" (gancho más rápido y agudo) o
"{+12% -6Hz} Y nadie volvió a verlo." (remate más lento y grave). Sin etiqueta usa los valores por defecto.
Si voz lleva varias voces separadas por comas, solo genera muestras voz_<voz>.mp3 para comparar.
"""
import asyncio
import json
import os
import re
import subprocess
import sys

import edge_tts

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src"))
from voz import duracion  # noqa: E402

carpeta = sys.argv[1]
voces = (sys.argv[2] if len(sys.argv) > 2 else "es-ES-AlvaroNeural").split(",")
vel = sys.argv[3] if len(sys.argv) > 3 else "+10%"
lineas = [l.strip() for l in open(os.path.join(carpeta, "texto.txt"), encoding="utf-8").read().splitlines() if l.strip()]
TAG = re.compile(r"^\{\s*([+-]\d+%)?\s*([+-]\d+Hz)?\s*\}\s*")


async def hablar(texto, voz, rate, pitch, ruta):
    com = edge_tts.Communicate(texto, voz, rate=rate, pitch=pitch, boundary="WordBoundary")
    pal = []
    with open(ruta, "wb") as f:
        async for t in com.stream():
            if t["type"] == "audio":
                f.write(t["data"])
            elif t["type"] == "WordBoundary":
                a = t["offset"] / 1e7
                pal.append({"texto": t["text"], "ini": a, "fin": a + t["duration"] / 1e7})
    return pal


def locutar(voz, salida):
    trozos, palabras, t0 = [], [], 0.0
    for i, l in enumerate(lineas):
        m = TAG.match(l)
        rate, pitch = (m.group(1) or vel, m.group(2) or "+0Hz") if m else (vel, "+0Hz")
        texto = TAG.sub("", l)
        ruta = f"/tmp/trozo_{i}.mp3"
        for intento in range(3):
            try:
                pal = asyncio.run(hablar(texto, voz, rate, pitch, ruta)); break
            except Exception as e:
                print("Fallo de voz:", e)
                if intento == 2: raise
        palabras += [{"texto": p["texto"], "ini": p["ini"] + t0, "fin": p["fin"] + t0} for p in pal]
        t0 += duracion(ruta); trozos.append(ruta)
    filt = "".join(f"[{i}:a]" for i in range(len(trozos))) + f"concat=n={len(trozos)}:v=0:a=1[o]"
    cmd = ["ffmpeg", "-y", "-v", "error"] + sum((["-i", t] for t in trozos), []) + ["-filter_complex", filt, "-map", "[o]", "-b:a", "128k", salida]
    subprocess.run(cmd, check=True)
    return duracion(salida), palabras


if len(voces) > 1:
    for v in voces:
        d, p = locutar(v, os.path.join(carpeta, f"voz_{v}.mp3"))
        print(v, f"{d:.2f}s", f"{len(p) / d:.2f} palabras/s")
else:
    dur, palabras = locutar(voces[0], os.path.join(carpeta, "voz.mp3"))
    json.dump({"duracion": dur, "palabras": palabras}, open(os.path.join(carpeta, "palabras.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print(f"{dur:.2f}s, {len(palabras)} palabras, {len(palabras) / dur:.2f} palabras/s")
