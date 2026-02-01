import { ref } from 'vue';
let audio = ref<AudioContext | null>(null);
let ambientSource: AudioBufferSourceNode | null = null;
let ambientGain: GainNode | null = null;

const getAudio = () => {
  if (!audio.value){
    audio.value = new AudioContext();
  }
  return audio.value;
}

// 環境聲音
const createAmbientNoise = (volume: number)=>{
  const ctx = getAudio();
  if (ctx.state !== 'running') return null;

  // Create looping noise buffer
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    // Soft crackle with occasional pops
    const noise = Math.random() * 2 - 1;
    const crackle = Math.random() < 0.001 ? (Math.random() * 2 - 1) * 3 : 0;
    data[i] = (noise * 0.3 + crackle) * 0.1;
  }
  return buffer;
}

export const playAmbientNoise =  (volume: number = 2) =>{
  const ctx = getAudio();

  // Normalize volume (0-100 -> 0-1)
  const normalizedVolume = Math.min(Math.max(volume / 100, 0), 1);

  if (!ambientGain) {
    ambientGain = ctx.createGain();
    ambientGain.connect(ctx.destination);
  }

  // Update volume smoothly
  ambientGain.gain.setTargetAtTime(normalizedVolume, ctx.currentTime, 0.1);

  if (!ambientSource) {
    const buffer = createAmbientNoise(volume);
    if (!buffer) return null;

    ambientSource = ctx.createBufferSource();
    ambientSource.buffer = buffer;
    ambientSource.connect(ambientGain);
    ambientSource.loop = true;
    ambientSource.start();
  }
}

export const stopAmbientNoise = () => {
  if (ambientGain) {
    const ctx = getAudio();
    // Fade out
    ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
    
    setTimeout(() => {
      if (ambientSource) {
        ambientSource.stop();
        ambientSource.disconnect();
        ambientSource = null;
      }
      if (ambientGain) {
        ambientGain.disconnect();
        ambientGain = null;
      }
    }, 200);
  }
}

// hover sound
const createHoverSound = (volume: number) => {
  const ctx = getAudio();
  if (ctx.state !== 'running') return;

  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800 + Math.random() * 200, now);
  oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.03);
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(volume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + 0.04);
}

const playHoverSound = (volume: number = 0.02) => {
  createHoverSound(volume);
}

export const triggerHoverSound = (isEnable: boolean,volume:number) => {
  if (!isEnable) return;
  const volumeValue = Math.min(Math.max(volume / 100, 0), 1);
  playHoverSound(volumeValue);
}