"""Monta el vídeo vertical 1080x1920 con ffmpeg: clips/imágenes + voz + subtítulos."""
import os
import subprocess

FPS = 30
W, H = 1080, 1920


def ff(*args):
    subprocess.run(["ffmpeg", "-y", "-v", "error", *args], check=True)


def segmento(material, tipo, dur, ruta):
    frames = int(dur * FPS) + 1
    if tipo == "video":
        ff("-stream_loop", "-1", "-i", material, "-t", f"{dur:.3f}", "-an",
           "-vf", f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},setsar=1",
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", ruta)
    else:
        zoom = "min(zoom+0.0009,1.18)"
        ff("-i", material, "-t", f"{dur:.3f}",
           "-vf", (f"scale={W * 2}:{H * 2}:force_original_aspect_ratio=increase,crop={W * 2}:{H * 2},"
                   f"zoompan=z='{zoom}':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
                   f":s={W}x{H}:fps={FPS},setsar=1"),
           "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", ruta)


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


def montar(escenas, carpeta, salida):
    """escenas: lista de dicts con audio, dur, material, tipo, palabras (tiempos relativos)."""
    segs, audios, palabras, t = [], [], [], 0.0
    for n, e in enumerate(escenas):
        seg = os.path.join(carpeta, f"seg{n}.mp4")
        segmento(e["material"], e["tipo"], e["dur"], seg)
        segs.append(seg)
        audios.append(e["audio"])
        palabras += [{**p, "ini": p["ini"] + t, "fin": p["fin"] + t} for p in e["palabras"]]
        t += e["dur"]

    lista_v = os.path.join(carpeta, "videos.txt")
    with open(lista_v, "w") as f:
        f.writelines(f"file '{os.path.abspath(s)}'\n" for s in segs)
    lista_a = os.path.join(carpeta, "audios.txt")
    with open(lista_a, "w") as f:
        f.writelines(f"file '{os.path.abspath(a)}'\n" for a in audios)

    video = os.path.join(carpeta, "video_sin_audio.mp4")
    ff("-f", "concat", "-safe", "0", "-i", lista_v, "-c", "copy", video)
    audio = os.path.join(carpeta, "voz.m4a")
    ff("-f", "concat", "-safe", "0", "-i", lista_a, "-c:a", "aac", "-b:a", "192k", audio)

    ass = os.path.join(carpeta, "subs.ass")
    subtitulos(palabras, ass)
    ff("-i", video, "-i", audio, "-vf", f"ass={ass}",
       "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
       "-c:a", "copy", "-shortest", "-movflags", "+faststart", salida)
    return t
