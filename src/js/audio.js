// Audio module for managing sound effects

let audioCtx = null;

export function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function playCrack() {
  const context = getAudioContext();
  const now = context.currentTime;

  // Ruído principal (crunch)
  const duration = 0.14 + Math.random() * 0.04;
  const buffer = context.createBuffer(1, Math.floor(context.sampleRate * duration), context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    const t = i / data.length;
    const envelope = Math.pow(1 - t, 2.8);
    const grain = Math.round((Math.random() * 2 - 1) * 8) / 8; // leve bit crush
    const wobble = Math.sin(t * 35) * 0.08;
    data[i] = (grain + wobble) * envelope * 0.9;
  }

  const crunch = context.createBufferSource();
  crunch.buffer = buffer;

  const band = context.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = 2400;
  band.Q.value = 0.9;

  const highPass = context.createBiquadFilter();
  highPass.type = 'highpass';
  highPass.frequency.value = 350;

  const crunchGain = context.createGain();
  crunchGain.gain.value = 0.45;

  crunch.connect(band).connect(highPass).connect(crunchGain).connect(context.destination);
  crunch.start(now);

  // Estalinhos aleatórios (craquelado)
  const crackles = 5 + Math.floor(Math.random() * 4); // 5-8
  for (let p = 0; p < crackles; p++) {
    const burst = context.createBuffer(1, context.sampleRate * (0.012 + Math.random() * 0.01), context.sampleRate);
    const d = burst.getChannelData(0);

    for (let i = 0; i < d.length; i++) {
      const t = i / d.length;
      const env = Math.pow(1 - t, 3.5);
      d[i] = (Math.random() * 2 - 1) * env;
    }

    const src = context.createBufferSource();
    const crackleHP = context.createBiquadFilter();
    crackleHP.type = 'highpass';
    crackleHP.frequency.value = 1800 + Math.random() * 600;

    const g = context.createGain();
    g.gain.value = 0.15 + Math.random() * 0.18;

    src.buffer = burst;
    src.connect(crackleHP).connect(g).connect(context.destination);

    const offset = now + 0.01 * p + Math.random() * 0.02;
    src.start(offset);
  }
}

export function playChew() {
  const context = getAudioContext();

  const now = context.currentTime + 0.05;

  const scheduleGrain = (durationMs, highPassFreq, gainValue, startTime) => {
    const length = Math.max(1, Math.floor(context.sampleRate * (durationMs / 1000)));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const t = i / length;
      const envelope = Math.exp(-t * 15); // decaimento rápido
      const noise = (Math.random() * 2 - 1) * envelope;
      data[i] = noise;
    }

    const src = context.createBufferSource();
    src.buffer = buffer;

    const highPass = context.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.value = highPassFreq;
    highPass.Q.value = 0.9;

    const gain = context.createGain();
    gain.gain.value = gainValue;

    src.connect(highPass).connect(gain).connect(context.destination);
    src.start(startTime);
  };

  const addBite = (startOffsetSec, intensity = 1, grainCount = 50) => {
    const baseTime = now + startOffsetSec;
    // Estalo principal
    scheduleGrain(80, 1200, 0.2 * intensity, baseTime);
    scheduleGrain(110, 800, 0.12 * intensity, baseTime + 0.08);
    scheduleGrain(180, 1600, 0.08 * intensity, baseTime + 0.18);
  };

  // Sequência de mordidas
  addBite(0, 0.4, 25);
  addBite(0.3, 0.7, 40);
  addBite(0.7, 1.0, 50);
  addBite(1.2, 0.8, 35);
  addBite(1.6, 0.5, 30);
}