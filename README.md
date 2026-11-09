# AuraSkill Shorts

Crea 5 YouTube Shorts al día y los sube solos, gratis, con GitHub Actions.

**Cómo funciona cada short:** Gemini escribe el guion (con las instrucciones de `instrucciones.txt`) → edge-tts pone la voz → Pexels (vídeos) o Pollinations (imágenes IA) ponen lo visual → ffmpeg monta el vídeo vertical con subtítulos → se sube a YouTube con título, descripción y hashtags.

## Qué puedes cambiar sin saber programar
- `instrucciones.txt`: tema y estilo (las instrucciones de tu Gem).
- `config.json`: voz, idioma, si los vídeos salen públicos o privados.
- `.github/workflows/shorts.yml`: horas de publicación.

## Secretos (Settings → Secrets and variables → Actions)
| Nombre | Para qué | Obligatorio |
|---|---|---|
| `GEMINI_API_KEY` | Escribir guiones (aistudio.google.com, gratis) | Sí |
| `YT_CLIENT_ID`, `YT_CLIENT_SECRET`, `YT_REFRESH_TOKEN` | Subir a YouTube | Sí |
| `PEXELS_API_KEY` | Vídeos de stock reales (pexels.com/api, gratis) | No, mejora la calidad |
| `POLLINATIONS_TOKEN` | Imágenes IA con menos esperas | No |

## Descargar el vídeo para TikTok
Pestaña **Actions** → la ejecución que quieras → abajo, en "Artifacts", descarga `short-N` (se guarda 7 días).

## Probar a mano
Pestaña **Actions** → "Crear y subir short" → **Run workflow**.
