"""Escribe el guion del short con la API de Gemini (nivel gratuito)."""
import json
import os
import time

from google import genai
from google.genai import types

FORMATO = """
REGLAS TÉCNICAS (obligatorias, por encima de todo lo anterior):
- Escribe el short en {idioma}.
- La narración completa debe tener entre {pmin} y {pmax} palabras (unos 40-55 segundos).
- Divide la narración en 5 a 8 escenas. Cada escena es una o dos frases cortas.
- No repitas ninguno de estos temas ya publicados: {usados}
- Responde SOLO con un JSON con esta forma exacta:
{{
  "tema": "tema en pocas palabras",
  "titulo": "título atractivo de máximo 80 caracteres, sin hashtags",
  "descripcion": "descripción de 1 a 3 frases para YouTube",
  "hashtags": ["#shorts", "#otro", "#otro"],
  "escenas": [
    {{
      "texto": "lo que dice la voz en esta escena",
      "imagen": "detailed English prompt for a vertical cinematic image of this scene",
      "busqueda": "2-3 English keywords to search stock video for this scene"
    }}
  ]
}}
"""


def escribir_guion(config, historial):
    clave = os.environ["GEMINI_API_KEY"]
    cliente = genai.Client(api_key=clave)
    with open("instrucciones.txt", encoding="utf-8") as f:
        instrucciones = f.read().strip()
    usados = ", ".join(h["tema"] for h in historial[-80:]) or "ninguno"
    sistema = instrucciones + "\n" + FORMATO.format(
        idioma=config["idioma"],
        pmin=config["palabras_min"],
        pmax=config["palabras_max"],
        usados=usados,
    )
    ultimo_error = None
    for modelo in config["modelos_gemini"]:
        for intento in range(3):
            try:
                r = cliente.models.generate_content(
                    model=modelo,
                    contents="Escribe un short nuevo.",
                    config=types.GenerateContentConfig(
                        system_instruction=sistema,
                        response_mime_type="application/json",
                        temperature=1.0,
                    ),
                )
                datos = json.loads(r.text)
                validar(datos)
                print(f"Guion creado con {modelo}: {datos['titulo']}")
                return datos
            except Exception as e:  # probamos otra vez u otro modelo
                ultimo_error = e
                print(f"Fallo con {modelo} (intento {intento + 1}): {e}")
                time.sleep(5 * (intento + 1))
    raise RuntimeError(f"Gemini no pudo escribir el guion: {ultimo_error}")


def validar(d):
    for campo in ("tema", "titulo", "descripcion", "hashtags", "escenas"):
        if campo not in d:
            raise ValueError(f"Falta el campo {campo}")
    if not 3 <= len(d["escenas"]) <= 12:
        raise ValueError("Número de escenas raro")
    for e in d["escenas"]:
        if not e.get("texto"):
            raise ValueError("Escena sin texto")
        e.setdefault("imagen", d["tema"])
        e.setdefault("busqueda", d["tema"])
    d["titulo"] = d["titulo"].strip()[:90]
    tags = [t if t.startswith("#") else "#" + t for t in d["hashtags"]]
    if "#shorts" not in [t.lower() for t in tags]:
        tags.insert(0, "#shorts")
    d["hashtags"] = [t.replace(" ", "") for t in tags][:8]
