"""Monta el vídeo vertical 1080x1920 con ffmpeg: clips/imágenes + voz + subtítulos."""
import os
import subprocess

FPS = 30
W, H = 1080, 1920


def ff(*args):
    subprocess.run(["ffmpeg", "-y", "-v", "error", *args], check=True)


MOVIMIENTOS = ["zoom_in", "pan_arriba", "zoom_out", "pan_izq", "zoom_in_lado", "pan_abajo", "pan_der"]


def segmento(material, tipo, dur, ruta, mov="zoom_in", desfase=0.0):
    """Un plano de 'dur' segundos. Vídeo: recorte vertical. Imagen: movimiento de cámara suave."""
    enc = ["-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-an"]
    if tipo == "video":
        ff("-ss", f"{desfase:.2f}", "-stream_loop", "-1", "-i", material, "-t", f"{dur:.3f}",
           "-vf", f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},setsar=1",
           *enc, ruta)
        return
    d = max(dur, 0.1)
    z = 0.14  # cuánto zoom (14 %)
    base = f"scale={int(W * 1.2)}:{int(H * 1.2)}:force_original_aspect_ratio=increase"
    if mov in ("zoom_in", "zoom_out", "zoom_in_lado"):
        f = f"(1+{z}*t/{d})" if mov != "zoom_out" else f"(1+{z}-{z}*t/{d})"
        cx = "(iw-ow)/2" if mov != "zoom_in_lado" else "(iw-ow)*0.3"
        vf = (f"{base},crop={int(W * 1.2)}:{int(H * 1.2)},"
              f"scale=w='trunc({W}*{f}/2)*2':h='trunc({H}*{f}/2)*2':eval=frame,"
              f"crop={W}:{H}:x='{cx}':y='(ih-oh)/2'")
    else:
        p = f"(t/{d})"
        x, y = "(iw-ow)/2", "(ih-oh)/2"
        if mov == "pan_izq":
            x = f"(iw-ow)*(1-{p})"
        elif mov == "pan_der":
            x = f"(iw-ow)*{p}"
        elif mov == "pan_arriba":
            y = f"(ih-oh)*(1-{p})"
        elif mov == "pan_abajo":
            y = f"(ih-oh)*{p}"
        vf = f"{base},crop={W}:{H}:x='{x}':y='{y}'"
    ff("-loop", "1", "-framerate", str(FPS), "-i", material, "-t", f"{dur:.3f}",
       "-vf", vf + f",fps={FPS},setsar=1", *enc, ruta)


def _t(s):
    h = int(s // 3600)
    m = int(s % 3600 // 60)
    return f"{h}:{m:02d}:{s % 60:05.2f}"


def _limpia(p):
    return p.replace("{", "").replace("}", "").replace("\\", "")


def subtitulos(palabras, ruta, por_grupo=3):
    cab = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Base,DejaVu Sans,92,&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,7,3,2,60,60,560,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    lineas = []
    grupos = [palabras[i:i + por_grupo] for i in range(0, len(palabras), por_grupo)]
    for g_i, grupo in enumerate(grupos):
        siguiente = grupos[g_i + 1][0]["ini"] if g_i + 1 < len(grupos) else grupo[-1]["fin"] + 0.3
        for j, p in enumerate(grupo):
            ini = p["ini"]
            fin = grupo[j + 1]["ini"] if j + 1 < len(grupo) else max(siguiente, p["fin"])
            texto = " ".join(
                ("{\\c&H00FFFF&}" + _limpia(q["texto"]).upper() + "{\\c&HFFFFFF&}") if k == j
                else _limpia(q["texto"]).upper()
                for k, q in enumerate(grupo)
            )
            lineas.append(f"Dialogue: 0,{_t(ini)},{_t(fin)},Base,,0,0,0,,{texto}")
    with open(ruta, "w", encoding="utf-8") as f:
        f.write(cab + "\n".join(lineas) + "\n")


def montar(planos, audio_voz, palabras, carpeta, salida):
    """planos: lista de dicts con material, tipo, dur, mov, desfase. La voz va en un solo archivo."""
    segs = []
    for n, p in enumerate(planos):
        seg = os.path.join(carpeta, f"seg{n:02d}.mp4")
        segmento(p["material"], p["tipo"], p["dur"], seg, p.get("mov", "zoom_in"), p.get("desfase", 0))
        segs.append(seg)

    lista_v = os.path.join(carpeta, "videos.txt")
    with open(lista_v, "w") as f:
        f.writelines(f"file '{os.path.abspath(s)}'\n" for s in segs)
    video = os.path.join(carpeta, "video_sin_audio.mp4")
    ff("-f", "concat", "-safe", "0", "-i", lista_v, "-c", "copy", video)

    ass = os.path.join(carpeta, "subs.ass")
    subtitulos(palabras, ass)
    ff("-i", video, "-i", audio_voz, "-vf", f"ass={ass}",
       "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
       "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", salida)
    return sum(p["dur"] for p in planos)
