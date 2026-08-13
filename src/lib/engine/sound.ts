// src/lib/engine/sound.ts
const getAudioCtx = () => {
  if (typeof window === "undefined") return null;
  // @ts-ignore
  const Ctx = window.AudioContext || window.webkitAudioContext;
  return new Ctx();
};

let audioCtx: AudioContext | null = null;

export type SoundTheme = "mechanical" | "arcade" | "typewriter" | "silent";

export function getSoundTheme(): SoundTheme {
  if (typeof window === "undefined") return "mechanical";
  return (localStorage.getItem("soundTheme") as SoundTheme) || "mechanical";
}

export function setSoundTheme(theme: SoundTheme) {
  if (typeof window !== "undefined") {
    localStorage.setItem("soundTheme", theme);
  }
}

export function playTick(combo: number = 0) {
  const theme = getSoundTheme();
  if (theme === "silent") return;
  if (!audioCtx) audioCtx = getAudioCtx();
  if (!audioCtx) return;

  const time = audioCtx.currentTime;
  
  if (theme === "arcade") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    // Pitch goes up with combo, up to a limit
    const baseFreq = 400 + Math.min(combo * 15, 600);
    osc.frequency.setValueAtTime(baseFreq, time);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, time + 0.05);
    
    gain.gain.setValueAtTime(0.1, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.05);
    return;
  }

  if (theme === "typewriter") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(800 + Math.random() * 200, time);
    
    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.02);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(time);
    osc.stop(time + 0.03);
    return;
  }

  // default: mechanical
  // 1. The "Thock" (low frequency body resonance)
  const osc = audioCtx.createOscillator();
  const oscGain = audioCtx.createGain();
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(350 + Math.random() * 50, time);
  osc.frequency.exponentialRampToValueAtTime(50, time + 0.04);
  
  oscGain.gain.setValueAtTime(0.5, time);
  oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.04);
  
  osc.connect(oscGain);
  oscGain.connect(audioCtx.destination);
  
  // 2. The "Click/Clack" (high frequency plastic switch noise)
  const bufferSize = Math.floor(audioCtx.sampleRate * 0.05); // 50ms
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;
  
  const filter = audioCtx.createBiquadFilter();
  filter.type = "bandpass";
  // Randomize the frequency slightly so each keystroke sounds natural
  filter.frequency.setValueAtTime(1200 + Math.random() * 800, time);
  filter.Q.value = 1.2;
  
  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.7, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.03);
  
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);
  
  osc.start(time);
  osc.stop(time + 0.05);
  noise.start(time);
}

export function playError() {
  if (!audioCtx) audioCtx = getAudioCtx();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "square";
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}
