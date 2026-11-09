"""Voz en off gratuita con edge-tts, con el tiempo de cada palabra para los subtítulos."""
import asyncio
import subprocess

import edge_tts


def duracion(ruta):
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", ruta],
        capture_output=True, text=True, check=True,
    ).stdout
    return float(out.strip())


async def _hablar(texto, voz, velocidad, ruta):
    try:
        com = edge_tts.Communicate(texto, voz, rate=velocidad, boundary="WordBoundary")
    except TypeError:  # versiones antiguas ya dan palabras por defecto
        com = edge_tts.Communicate(texto, voz, rate=velocidad)
    palabras = []
    with open(ruta, "wb") as f:
        async for trozo in com.stream():
            if trozo["type"] == "audio":
                f.write(trozo["data"])
            elif trozo["type"] == "WordBoundary":
                ini = trozo["offset"] / 1e7
                palabras.append({"texto": trozo["text"], "ini": ini,
                                 "fin": ini + trozo["duration"] / 1e7})
    return palabras


def narrar_escena(texto, config, ruta):
    """Genera el audio de una escena. Devuelve (duración, palabras con tiempos)."""
    for intento in range(3):
        try:
            palabras = asyncio.run(_hablar(texto, config["voz"], config["velocidad_voz"], ruta))
            break
        except Exception as e:
            print(f"Fallo de voz (intento {intento + 1}): {e}")
            if intento == 2:
                raise
    dur = duracion(ruta)
    if not palabras:  # reparto aproximado si el servicio no da tiempos por palabra
        trozos = texto.split()
        paso = dur / max(len(trozos), 1)
        palabras = [{"texto": p, "ini": i * paso, "fin": (i + 1) * paso}
                    for i, p in enumerate(trozos)]
    return dur, palabras


def narrar_todo(textos, config, ruta):
    """Una sola locución para todo el short (sin pausas raras entre escenas).

    Devuelve (duración, palabras con tiempos, inicio de cada escena en segundos).
    """
    total_txt = " ".join(t.strip() for t in textos)
    dur, palabras = narrar_escena(total_txt, config, ruta)
    cuentas = [len(t.split()) for t in textos]
    n = len(palabras)
    total = sum(cuentas) or 1
    inicios, acum = [], 0
    for c in cuentas:
        # índice de la primera palabra de la escena (proporcional si los recuentos no cuadran)
        i = acum if n == total else round(acum / total * n)
        i = min(i, n - 1) if n else 0
        inicios.append(palabras[i]["ini"] if n else dur * acum / total)
        acum += c
    inicios[0] = 0.0
    return dur, palabras, inicios
