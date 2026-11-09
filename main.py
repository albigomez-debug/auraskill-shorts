"""Crea un short completo y lo sube a YouTube.

Uso:
  python main.py            -> crea y sube
  python main.py --sin-subir -> solo crea el vídeo (para probar)
"""
import datetime
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "src"))

from guion import escribir_guion, validar  # noqa: E402
from imagenes import material_escena  # noqa: E402
from montaje import montar  # noqa: E402
from voz import narrar_escena  # noqa: E402


def main():
    sin_subir = "--sin-subir" in sys.argv
    with open("config.json", encoding="utf-8") as f:
        config = json.load(f)
    with open("historial.json", encoding="utf-8") as f:
        historial = json.load(f)

    sello = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d-%H%M")
    carpeta = os.path.join("salida", sello)
    os.makedirs(carpeta, exist_ok=True)

    manual = "guion_manual.json"
    if os.path.exists(manual):  # guion escrito a mano: se usa una vez y se archiva
        with open(manual, encoding="utf-8") as f:
            guion = json.load(f)
        validar(guion)
        print(f"Usando guion manual: {guion['titulo']}")
    else:
        guion = escribir_guion(config, historial)
    with open(os.path.join(carpeta, "guion.json"), "w", encoding="utf-8") as f:
        json.dump(guion, f, ensure_ascii=False, indent=2)

    usados, escenas = set(), []
    for n, e in enumerate(guion["escenas"]):
        audio = os.path.join(carpeta, f"voz{n}.mp3")
        dur, palabras = narrar_escena(e["texto"], config, audio)
        material, tipo = material_escena(e, carpeta, n, usados)
        escenas.append({"audio": audio, "dur": dur, "palabras": palabras,
                        "material": material, "tipo": tipo})
        print(f"Escena {n + 1}/{len(guion['escenas'])} lista ({dur:.1f}s, {tipo})")

    salida = os.path.join("salida", "short.mp4")
    total = montar(escenas, carpeta, salida)
    print(f"Vídeo listo: {salida} ({total:.1f}s)")
    if total > 180:
        raise RuntimeError("El vídeo pasa de 3 minutos; YouTube no lo trataría como short")

    entrada = {"fecha": sello, "tema": guion["tema"], "titulo": guion["titulo"]}
    if not sin_subir:
        entrada["youtube_id"] = subir_video(salida, guion, config)
    historial.append(entrada)
    if os.path.exists(manual):
        os.makedirs("guiones_usados", exist_ok=True)
        os.replace(manual, os.path.join("guiones_usados", f"{sello}.json"))
    with open("historial.json", "w", encoding="utf-8") as f:
        json.dump(historial, f, ensure_ascii=False, indent=2)


def subir_video(salida, guion, config):
    from subir import subir
    return subir(salida, guion, config)


if __name__ == "__main__":
    main()
