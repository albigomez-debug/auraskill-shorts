"""Genera voz.mp3 y palabras.json (tiempos por palabra) para un texto. Uso: python herramientas/voz.py carpeta [voz] [velocidad]"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src"))
from voz import narrar_escena  # noqa: E402

carpeta = sys.argv[1]
config = {"voz": sys.argv[2] if len(sys.argv) > 2 else "es-ES-AlvaroNeural",
          "velocidad_voz": sys.argv[3] if len(sys.argv) > 3 else "+10%"}
texto = open(os.path.join(carpeta, "texto.txt"), encoding="utf-8").read().strip()
dur, palabras = narrar_escena(texto, config, os.path.join(carpeta, "voz.mp3"))
json.dump({"duracion": dur, "palabras": palabras}, open(os.path.join(carpeta, "palabras.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print(f"{dur:.2f}s, {len(palabras)} palabras, {len(palabras) / dur:.2f} palabras/s")
