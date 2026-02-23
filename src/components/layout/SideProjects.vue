<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useI18n } from 'vue-i18n';
import { triggerHoverSound } from '@/composables/useAmbientSound';
import useSetAnimationRef from '@/composables/useSetAnimationRef';
import { Button } from '@/components/ui/button';

const { tm } = useI18n();

defineProps<{
  isEnableSound: boolean;
  volume: number;
}>();

const visibleIndices = ref(new Set<number | string>());
const observed = new Set<number | string>();
</script>
<template>
  <section class="relative bg-surface">
    <h2 class="text-center mb-3 text-xl sm:text-3xl sm:mb-10">{{ $t('project.title') }}</h2>
    <div class="grid gap-3 sm:gap-10 lg:grid-cols-2">
      <Card v-for="(project, index) in tm('project.items')" :key="project.title"
        @mouseenter="triggerHoverSound(isEnableSound, volume)"
        :ref="(el: any) => useSetAnimationRef(el, index, observed, visibleIndices)"
        class="max-w-4xl bg-manila rounded-lg shadow-noir transition-all duration-500 opacity-100 transform last:mb-0 hover:-translate-y-2 hover:border-spotlight-yellow hover:border-2 animation-card-up"
        :class="{ 'is-visible': visibleIndices.has(index) }">
        <CardHeader class="p-3 sm:p-6">
          <CardTitle class="text-base sm:text-lg text-ink-black group-hover:text-alert-red">{{ project.title }}
          </CardTitle>
          <CardDescription>
            <p class="text-paper-label">{{ project.description }}</p>
            <br />
            <div class="flex gap-2">
              <Button v-if="project.design">
                <a class="text-paper-muted hover:underline" :href="project.design" target="_blank"
                  rel="noopener noreferrer">{{
                    $t('project.design') }}</a>
              </Button>
              <Button>
                <a class="text-paper-muted hover:underline" :href="project.url" target="_blank"
                  rel="noopener noreferrer">{{
                    $t('project.view') }}</a>
              </Button>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.animation-card-up {
  opacity: 0;
}

.animation-card-up.is-visible {
  animation: card-up .6s ease-out forwards;
}

@keyframes card-up {
  from {
    transform: translateY(30%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>