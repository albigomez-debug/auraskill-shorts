"""Consigue un clip o una imagen vertical para cada escena, siempre gratis.

1. Si hay clave de Pexels (gratis), busca vídeos verticales de stock.
2. Si no, genera una imagen con IA en Pollinations (sin clave).
3. Si todo falla, usa un fondo de color para que el short salga igualmente.
"""
import os
import random
import subprocess
import time
import urllib.parse

import requests

UA = {"User-Agent": "auraskill-shorts/1.0"}


def _bajar(url, ruta, cabeceras=None, timeout=120):
    r = requests.get(url, headers={**UA, **(cabeceras or {})}, timeout=timeout, stream=True)
    r.raise_for_status()
    with open(ruta, "wb") as f:
        for b in r.iter_content(1 << 16):
            f.write(b)
    if os.path.getsize(ruta) < 10_000:
        raise ValueError("Archivo demasiado pequeño")


def video_pexels(busqueda, ruta, usados):
    clave = os.environ.get("PEXELS_API_KEY")
    if not clave:
        return False
    r = requests.get(
        "https://api.pexels.com/videos/search",
        params={"query": busqueda, "orientation": "portrait", "per_page": 15},
        headers={"Authorization": clave, **UA}, timeout=30,
    )
    r.raise_for_status()
    videos = [v for v in r.json().get("videos", []) if v["id"] not in usados]
    random.shuffle(videos)
    for v in videos:
        archivos = [a for a in v["video_files"]
                    if a.get("height") and a.get("width") and a["height"] > a["width"]
                    and 1000 <= a["height"] <= 2000]
        if not archivos:
            continue
        a = sorted(archivos, key=lambda a: a["height"])[-1]
        _bajar(a["link"], ruta)
        usados.add(v["id"])
        return True
    return False


def imagen_ia(prompt, ruta, estilo="", protagonista="", semilla=None):
    """Imagen IA. Mismo estilo, protagonista y semilla en todo el short para que parezca una sola historia."""
    partes = [estilo, protagonista, "Shot: " + prompt,
              "vertical 9:16 frame, consistent character, highly detailed, no text, no letters"]
    texto = ". ".join(p for p in partes if p)[:1500]
    semilla = semilla or random.randint(1, 10**6)
    url = ("https://image.pollinations.ai/prompt/" + urllib.parse.quote(texto)
           + f"?width=1080&height=1920&nologo=true&model=flux&seed={semilla}")
    cab = {}
    if os.environ.get("POLLINATIONS_TOKEN"):
        cab["Authorization"] = "Bearer " + os.environ["POLLINATIONS_TOKEN"]
    for intento in range(4):
        try:
            _bajar(url, ruta, cab, timeout=180)
            return True
        except Exception as e:
            print(f"Fallo de imagen IA (intento {intento + 1}): {e}")
            time.sleep(15 * (intento + 1))
    return False


def fondo_color(ruta):
    color = random.choice(["0x1a1a2e", "0x16213e", "0x2d132c", "0x0f3460", "0x222831"])
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i",
                    f"color=c={color}:s=1080x1920", "-frames:v", "1", ruta], check=True)


def material_escena(escena, carpeta, n, usados):
    """Devuelve (ruta, tipo) con tipo 'video' o 'imagen'."""
    ruta_v = os.path.join(carpeta, f"clip{n}.mp4")
    try:
        if video_pexels(escena["busqueda"], ruta_v, usados):
            return ruta_v, "video"
    except Exception as e:
        print(f"Pexels falló en la escena {n}: {e}")
    ruta_i = os.path.join(carpeta, f"img{n}.jpg")
    if imagen_ia(escena["imagen"], ruta_i, escena.get("_estilo", ""),
                 escena.get("_protagonista", ""), escena.get("_semilla")):
        return ruta_i, "imagen"
    ruta_c = os.path.join(carpeta, f"fondo{n}.png")
    fondo_color(ruta_c)
    return ruta_c, "imagen"


def materiales_escena(escena, carpeta, n, usados, cuantos):
    """Hasta 'cuantos' clips distintos de Pexels; si no hay, una imagen (que se reencuadra en cada corte)."""
    res = []
    if os.environ.get("PEXELS_API_KEY"):
        for c in range(cuantos):
            ruta = os.path.join(carpeta, f"clip{n}_{c}.mp4")
            try:
                if video_pexels(escena["busqueda"], ruta, usados):
                    res.append((ruta, "video"))
                else:
                    break
            except Exception as e:
                print(f"Pexels falló en la escena {n}: {e}")
                break
    if res:
        return res
    return [material_escena(escena, carpeta, n, usados)]
