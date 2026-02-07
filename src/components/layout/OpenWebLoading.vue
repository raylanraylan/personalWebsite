<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const emit = defineEmits<{
  (e: 'complete'): void
}>();

const phase = ref<'stamp' | 'opening' | 'reveal' | 'done'>('stamp');
const timers = ref<ReturnType<typeof setTimeout>[]>([]);

const isOpeningOrReveal = computed(() => phase.value === 'opening' || phase.value === 'reveal');

const containerClasses = computed(() => [
  'fixed inset-0 flex items-center justify-center transition-opacity duration-500',
  phase.value === 'reveal' ? 'opacity-0 pointer-events-none' : 'opacity-100'
]);

const folderFrontClasses = computed(() => [
  'relative z-50 w-80 h-96 rounded-t-lg overflow-hidden transition-all duration-1000 ease-out',
  isOpeningOrReveal.value ? 'folder-open' : ''
]);

const folderFrontStyle = computed(() => ({
  background: 'linear-gradient(135deg, hsl(38 45% 65%) 0%, hsl(35 40% 55%) 100%)',
  transformOrigin: 'bottom center',
  transform: isOpeningOrReveal.value
    ? 'perspective(1000px) rotateX(-85deg)'
    : 'perspective(1000px) rotateX(0deg)',
  boxShadow: '0 10px 40px rgb(0 0 0 / 0.5)'
}));

const contentsRevealClasses = computed(() => [
  'absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500',
  isOpeningOrReveal.value ? 'opacity-100' : 'opacity-0'
]);

onMounted(() => {
  timers.value.push(setTimeout(() => (phase.value = 'opening'), 1200));
  timers.value.push(setTimeout(() => (phase.value = 'reveal'), 2200));
  timers.value.push(setTimeout(() => {
    phase.value = 'done';
    emit('complete');
  }, 2800));
});

onUnmounted(() => {
  timers.value.forEach(clearTimeout);
});
</script>

<template>
  <div v-if="phase !== 'done'" :class="containerClasses" style="background: hsl(var(--neutral-950))">
    <!-- Vignette -->
    <div class="absolute inset-0 pointer-events-none"
      style="background: radial-gradient(ellipse at center, transparent 20%, rgb(0 0 0 / 0.8) 100%)" />

    <!-- Case File -->
    <div class="relative">
      <!-- Manila Folder Back -->
      <div class="absolute w-80 h-96 rounded-t-lg"
        style="background: linear-gradient(135deg, hsl(38 40% 55%) 0%, hsl(35 35% 45%) 100%); transform: translateY(10px)" />

      <!-- Manila Folder Front (Opening) -->
      <div :class="folderFrontClasses" :style="folderFrontStyle">
        <!-- Folder Tab -->
        <div class="absolute -top-4 left-8 px-6 py-2 font-typewriter text-sm tracking-wider"
          style="background: hsl(38 50% 72%); border-radius: 6px 6px 0 0; color: hsl(25 40% 25%)">
          CASE #2024
        </div>

        <!-- Folder Texture Lines -->
        <div class="absolute inset-0 opacity-20">
          <div v-for="i in 8" :key="i" class="h-px w-full" :style="{
            background: 'hsl(30 30% 40%)',
            marginTop: (40 + (i - 1) * 40) + 'px'
          }" />
        </div>

        <!-- Confidential Stamp -->
        <div
          class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-typewriter text-2xl tracking-widest uppercase"
          :class="{ 'animate-stamp-in': phase === 'stamp' }"
          style="color: hsl(var(--brand-accent)); border: 4px solid hsl(var(--brand-accent)); padding: 8px 24px; transform: translate(-50%, -50%) rotate(-12deg); opacity: 0.9; text-shadow: 0 0 10px hsl(var(--brand-accent) / 0.5)">
          CLASSIFIED
        </div>
      </div>

      <!-- Contents Revealed -->
      <div :class="contentsRevealClasses">
        <!-- Document inside -->
        <div class="w-72 h-80 p-6 flex flex-col items-center justify-center"
          style="background: linear-gradient(180deg, hsl(42 35% 88%) 0%, hsl(40 30% 82%) 100%); box-shadow: inset 0 0 30px rgb(30 20 70 / 0.5)">
          <!-- Photo placeholder -->
          <div class="w-24 h-28 mb-4 flex items-center justify-center"
            style="background: hsl(var(--neutral-950)); box-shadow: 0 4px 15px rgb(0 0 0 / 0.3)">
            <span class="text-muted-foreground text-xs font-typewriter">PHOTO</span>
          </div>

          <!-- Text lines -->
          <div class="w-full space-y-2">
            <div class="h-2 rounded w-3/4 mx-auto" style="background-color: hsl(var(--neutral-950) / 0.2)" />
            <div class="h-2 rounded w-1/2 mx-auto" style="background-color: hsl(var(--neutral-950) / 0.2)" />
            <div class="h-2 rounded w-2/3 mx-auto" style="background-color: hsl(var(--neutral-950) / 0.15)" />
          </div>

          <!-- Loading text -->
          <p class="mt-6 font-typewriter text-sm tracking-wider animate-pulse" style="color: hsl(25 40% 30%)">
            Accessing File...
          </p>
        </div>
      </div>
    </div>

    <!-- Film Reel Sprockets (decorative) -->
    <div class="absolute left-4 top-0 bottom-0 flex flex-col justify-around opacity-30">
      <div v-for="i in 12" :key="i" class="w-4 h-4 rounded-sm" style="background: hsl(var(--foreground))" />
    </div>
    <div class="absolute right-4 top-0 bottom-0 flex flex-col justify-around opacity-30">
      <div v-for="i in 12" :key="i" class="w-4 h-4 rounded-sm" style="background: hsl(var(--foreground))" />
    </div>

    <!-- Scanlines effect -->
    <!-- <div class="absolute inset-0 pointer-events-none opacity-5"
      style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 0%) 2px, hsl(0 0% 0%) 4px)" /> -->
  </div>
</template>