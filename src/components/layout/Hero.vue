<script setup lang="ts">
import { ref, computed, defineProps, inject, watch } from 'vue';
import { Button } from '@/components/ui/button';
import deskImg from '@/assets/desk.jpg';
import { triggerButtonSound, triggerTypewriterSound } from '@/composables/useAmbientSound';
const lightingSection = ref<HTMLElement | null>(null);
const lightPosition = ref<{ x: string, y: string }>({ x: '0px', y: '0px' });

const props = defineProps<{
  fileNumber: string;
  isEnableSound: boolean;
  volume: number;
}>();

const mouseMoveHandler = (e: MouseEvent) => {
  const rect = lightingSection.value?.getBoundingClientRect();
  if (rect) {
    lightPosition.value.x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
    lightPosition.value.y = ((e.clientY - rect.top) / rect.height) * 100 + '%';
  }
}

const quickOpen = ref<string>('#profile');

import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';
const { t } = useI18n();

const displayedText = ref('');
const isHighlight = ref(false);

const typeWriter = async () => {
  const fullText = t("hero.fileType");
  displayedText.value = '';
  isHighlight.value = false;

  // Typing
  for (let i = 0; i <= fullText.length; i++) {
    displayedText.value = fullText.slice(0, i);
    if (props.isEnableSound) {
      triggerTypewriterSound(props.isEnableSound, props.volume);
    }
    await new Promise(resolve => setTimeout(resolve, 150));
  }

  // Find Highlight
  await new Promise(resolve => setTimeout(resolve, 200));
  isHighlight.value = true;

  // Wait and Clear
  await new Promise(resolve => setTimeout(resolve, 800));
  if (props.isEnableSound) {
    triggerTypewriterSound(props.isEnableSound, props.volume);
  }
  displayedText.value = '';
  isHighlight.value = false;
  await new Promise(resolve => setTimeout(resolve, 1500));


  // Repeat
  typeWriter();
}

onMounted(() => {
  document.addEventListener('mousemove', mouseMoveHandler);
  typeWriter();
})
</script>

<template>
  <section ref="lightingSection" class="w-full sm:h-screen bg-contain sm:bg-cover bg-center bg-no-repeat relative"
    :style="{ backgroundImage: `url(${deskImg})` }">
    <div class="absolute inset-0 pointer-events-none transition-all duration-75 
      bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0.85)_100%)]
      dark:bg-[radial-gradient(200px_at_var(--x)_var(--y),transparent_0%,rgba(0,0,0,0.85)_100%)]"
      :style="{ '--x': lightPosition.x, '--y': lightPosition.y }" />
    <!-- <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div> -->
    <div class="px-[5vw] pt-32 pb-20 max-w-4xl mx-auto flex flex-col relative z-10 text-center">
      <div>
        <h1 class="text-xs sm:text-base text-brand-highlight">{{ props.fileNumber }}</h1>
        <h2 class="mt-5 text-[1rem] text-primary sm:text-[3rem] leading-tight">
          <span :class="{ 'bg-[#3b82f6] text-inverse': isHighlight }">{{ displayedText }}</span>
          <span class="animate-underline">_</span>
        </h2>
        <p class="mb-10 text-xs sm:text-base text-paper-muted">{{ $t("hero.fileDescription") }}</p>
        <Button class="mb-3 bg-muted text-brand-highlight hover:shadow-glow">
          <a @mouseenter="triggerButtonSound(props.isEnableSound, props.volume)" :href="quickOpen">{{
            $t("hero.quickOpen")
          }}</a>
        </Button>
      </div>
      <p class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-paper-muted text-xs sm:text-base">{{
        $t("hero.useFile") }}
      </p>
    </div>
  </section>
</template>