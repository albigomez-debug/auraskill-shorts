"""Sube el short a YouTube con la API de datos (el permiso se guarda como secreto en GitHub)."""
import os
import time

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload


def youtube():
    cred = Credentials(
        None,
        refresh_token=os.environ["YT_REFRESH_TOKEN"],
        token_uri="https://oauth2.googleapis.com/token",
        client_id=os.environ["YT_CLIENT_ID"],
        client_secret=os.environ["YT_CLIENT_SECRET"],
        scopes=["https://www.googleapis.com/auth/youtube.upload"],
    )
    return build("youtube", "v3", credentials=cred, cache_discovery=False)


def subir(ruta, guion, config):
    hashtags = " ".join(guion["hashtags"])
    titulo = guion["titulo"]
    if "#shorts" not in titulo.lower() and len(titulo) <= 90:
        titulo = f"{titulo} #Shorts"
    cuerpo = {
        "snippet": {
            "title": titulo[:100],
            "description": f"{guion['descripcion']}\n\n{hashtags}"[:4900],
            "tags": [h.lstrip("#") for h in guion["hashtags"]],
            "categoryId": config["categoria_youtube"],
            "defaultLanguage": "es",
            "defaultAudioLanguage": "es",
        },
        "status": {
            "privacyStatus": config["privacidad"],
            "selfDeclaredMadeForKids": False,
            "containsSyntheticMedia": True,
        },
    }
    peticion = youtube().videos().insert(
        part="snippet,status", body=cuerpo,
        media_body=MediaFileUpload(ruta, mimetype="video/mp4", chunksize=8 << 20, resumable=True),
    )
    respuesta, fallos = None, 0
    while respuesta is None:
        try:
            _, respuesta = peticion.next_chunk()
        except HttpError as e:
            if e.resp.status in (500, 502, 503, 504) and fallos < 5:
                fallos += 1
                time.sleep(2 ** fallos)
                continue
            raise
    vid = respuesta["id"]
    print(f"Subido: https://youtube.com/shorts/{vid}")
    return vid
