"""Sonido del short animado: efectos y música sintetizados (todo original, gratis) + voz.
Salida: public/voz/mezcla.wav (48 kHz estéreo). La voz va al frente; música y efectos 8-12 dB debajo.
Uso: python sonido.py  (luego ffmpeg loudnorm a -14 LUFS en el render final)."""
import json
import subprocess

import numpy as np
from scipy import signal
from scipy.io import wavfile

SR = 48000
FPS = 30
DUR = 1068 / FPS
N = int(DUR * SR)
rng = np.random.default_rng(7)


def t_(d):
    return np.arange(int(d * SR)) / SR


def env(n, a, r, curve=4.0):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.exp(-curve * np.linspace(0, 1, nr))
    return e


def bp(x, lo, hi, order=2):
    b, a = signal.butter(order, [lo / (SR / 2), hi / (SR / 2)], "band")
    return signal.lfilter(b, a, x)


def lp(x, hi, order=2):
    b, a = signal.butter(order, hi / (SR / 2))
    return signal.lfilter(b, a, x)


def hp(x, lo, order=2):
    b, a = signal.butter(order, lo / (SR / 2), "high")
    return signal.lfilter(b, a, x)


def norm(x, peak=1.0):
    m = np.max(np.abs(x)) or 1
    return x / m * peak


sfx = np.zeros(N)
mus = np.zeros(N)


def put(buf, x, frame, gain=1.0):
    i = int(frame / FPS * SR)
    j = min(N, i + len(x))
    if j > i: buf[i:j] += gain * x[: j - i]


# ---------------- effects ----------------
def rumble(d, swell=1.0):
    x = lp(np.cumsum(rng.standard_normal(int(d * SR))) * 0.02, 140)
    x = hp(x, 25)
    return norm(x) * env(len(x), swell, 0.6, 3)


def boom():
    t = t_(2.2)
    f = 30 + 70 * np.exp(-t * 6)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2)
    n = lp(rng.standard_normal(len(t)), 900) * np.exp(-t * 7)
    return norm(s + 0.6 * n)


def ping(f0):
    t = t_(0.5)
    return np.sin(2 * np.pi * f0 * t * (1 - 0.15 * t)) * np.exp(-t * 9)


def groan(d):
    t = t_(d)
    f = 70 + 18 * np.sin(2 * np.pi * 0.7 * t) + 9 * np.sin(2 * np.pi * 5.3 * t)
    x = signal.sawtooth(2 * np.pi * np.cumsum(f) / SR)
    x = bp(x, 120, 900) * (0.6 + 0.4 * np.sin(2 * np.pi * 1.3 * t) ** 2)
    return norm(x) * env(len(t), 0.3, 0.4)


def screech(d):
    t = t_(d)
    f = 900 - 350 * t / d
    x = 0.5 * np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.3 * np.sin(2 * np.pi * np.cumsum(f * 1.51) / SR)
    x += 0.4 * bp(rng.standard_normal(len(t)), 700, 2500)
    return norm(x) * env(len(t), 0.05, 0.5)


def crack():
    t = t_(0.9)
    x = hp(rng.standard_normal(len(t)), 300) * np.exp(-t * 9)
    for k in range(6):
        i = int((0.01 + 0.06 * k + 0.02 * rng.random()) * SR)
        x[i:i + 300] += rng.standard_normal(300) * 2.5 * np.exp(-np.arange(300) / 60)
    th = np.sin(2 * np.pi * 70 * t) * np.exp(-t * 10)
    return norm(x + 1.2 * th)


def whoosh(d, lo=200, hi=2200):
    t = t_(d)
    x = rng.standard_normal(len(t))
    out = np.zeros_like(x)
    for k in range(8):  # moving band
        a, b = int(k * len(t) / 8), int((k + 1) * len(t) / 8)
        c = lo + (hi - lo) * np.sin(np.pi * (k + 0.5) / 8)
        out[a:b] = bp(x, c * 0.7, c * 1.3)[a:b]
    return norm(out) * np.sin(np.pi * np.linspace(0, 1, len(t))) ** 1.5


def drip():
    t = t_(0.25)
    f = 900 + 1400 * t / 0.25
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 25)


def bell():
    t = t_(1.6)
    x = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t * d) for f, a, d in [(1180, 1, 2.5), (2950, 0.5, 4), (4700, 0.25, 6)])
    return norm(x)


def wind(d):
    t = t_(d)
    x = rng.standard_normal(len(t))
    out = np.zeros_like(x)
    seg = 12
    for k in range(seg):
        a, b = int(k * len(t) / seg), int((k + 1) * len(t) / seg)
        c = 500 + 300 * np.sin(k * 1.7)
        out[a:b] = bp(x, c * 0.8, c * 1.25)[a:b]
    return norm(lp(out, 1500)) * env(len(t), 0.8, 1.0, 2)


def gloop():
    t = t_(0.35)
    f = 120 + 260 * (t / 0.35) ** 2
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7)


def knock():
    t = t_(0.5)
    x = np.sin(2 * np.pi * 190 * t) * np.exp(-t * 28) + 0.6 * hp(rng.standard_normal(len(t)), 1500) * np.exp(-t * 60)
    return norm(x)


put(sfx, wind(3.6), 0, 0.25)                # quiet London street
put(sfx, whoosh(1.2, 150, 900), 110, 0.25)
for f in (300, 318, 333):                   # the vat creaks
    put(sfx, groan(1.0), f, 0.5)
put(sfx, ping(900), 342, 0.6)               # the iron hoop snaps
put(sfx, screech(0.8), 344, 0.4)
put(sfx, boom(), 373, 1.0)                  # the vat bursts
put(sfx, crack(), 392, 0.8)                 # breaks the others
put(sfx, rumble(7.0, 0.3), 375, 0.95)       # the beer wave
put(sfx, crack(), 470, 0.7)                 # two houses fall
for f in (580, 596, 612):                   # cellars filling
    put(sfx, gloop(), f, 0.45)
for f in (669, 690):                        # rescue bell
    put(sfx, bell(), f, 0.3)
put(sfx, whoosh(0.8, 200, 1600), 795, 0.3)
for k in range(10):                         # barrels popping
    put(sfx, knock(), 802 + k * 3, 0.25)
put(sfx, whoosh(0.7, 200, 1600), 860, 0.25) # to the court
put(sfx, knock(), 900, 0.9)                 # gavel at "Dios"
for k in range(8):                          # coins
    put(sfx, ping(2200 + 600 * rng.random()), 990 + k * 3, 0.25)

# ---------------- music: light plucked loop (D minor), resolves to major at the end ----------------
BPM = 112
beat = 60 / BPM


def pluck(f, d=0.45, bright=0.5):
    t = t_(d)
    x = np.sin(2 * np.pi * f * t) + bright * 0.5 * np.sin(4 * np.pi * f * t) + bright * 0.25 * np.sin(6 * np.pi * f * t)
    return x * np.exp(-t * 7)


def bass(f, d):
    t = t_(d)
    x = np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)
    return x * env(len(t), 0.01, d * 0.6, 3)


note = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [(50, [62, 65, 69]), (46, [62, 65, 70]), (41, [60, 65, 69]), (45, [61, 64, 69])]  # Dm Bb F A
end = (50, [62, 66, 69])  # D major
bar = 4 * beat
tt = 0.0
k = 0
while tt < DUR:
    frame = tt * FPS
    root, ch = end if frame >= 983 else prog[k % 4]
    put(mus, bass(note(root - 12), bar * 0.9), frame, 0.55)
    for b in range(8):
        m = ch[[0, 1, 2, 1, 0, 2, 1, 2][b]] + (12 if b in (3, 7) else 0)
        put(mus, pluck(note(m)), (tt + b * beat / 2) * FPS, 0.28)
    tt += bar
    k += 1
# tension: music ducks during the disaster and swells back
dk = np.ones(N)
tsec = np.arange(N) / SR
dk *= 1 - 0.75 * np.clip((tsec - 10.9) / 0.3, 0, 1) * np.clip((19.0 - tsec) / 0.6, 0, 1)

# ---------------- mix ----------------
sr_v, v = wavfile.read("public/voz/voz.wav")
v = v.astype(np.float64)
if v.ndim > 1: v = v.mean(axis=1)
if sr_v != SR:
    v = signal.resample_poly(v, SR, sr_v)
v = v / (np.max(np.abs(v)) or 1)
voice = np.zeros(N)
voice[: min(N, len(v))] = v[:N]


def rms(x):
    return np.sqrt(np.mean(x[np.abs(x) > 1e-4] ** 2)) if np.any(np.abs(x) > 1e-4) else 1


g_s = (rms(voice) / rms(sfx)) * 10 ** (-9 / 20)
g_m = (rms(voice) / rms(mus)) * 10 ** (-14 / 20)
bed = sfx * g_s + mus * g_m * dk
fade = np.ones(N)
nf = int(0.25 * SR)
fade[-nf:] = np.linspace(1, 0, nf)
L = (voice + bed * 0.95) * fade
R = (voice + bed * 1.0) * fade
out = np.stack([L, R], 1)
out = out / np.max(np.abs(out)) * 0.89
wavfile.write("public/voz/mezcla.wav", SR, (out * 32767).astype(np.int16))
print("mezcla lista", DUR, "s")
