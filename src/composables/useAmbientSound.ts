import { ref } from 'vue';
let audio = ref<AudioContext | null>(null);

const getAudio = () => {
  if (!audio.value){
    audio.value = new AudioContext();
  }
  return audio.value;
}

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

export const playAmbientNoise =  (volume: number = 0.02) =>{
  const ctx = getAudio();
  if (ctx.state !== 'running') return null;

  const buffer = createAmbientNoise(volume);
  if (!buffer) return null;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.loop = true;
  source.start();
}

export const stopAmbientNoise = () => {
  const ctx = getAudio();
  if (ctx.state !== 'running') return;

  ctx.close();
  audio.value = null;
}