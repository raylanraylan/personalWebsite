<script setup lang="ts">
import { ref } from 'vue';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { useI18n } from 'vue-i18n';
import useSetAnimationRef from '@/composables/useSetAnimationRef';

const { tm } = useI18n();

// 1. 儲存目前「已經進入畫面」的卡片索引 (使用 Set 避免重複)
const visibleIndices = ref(new Set<number | string>());

// 2. 追蹤哪些卡片「已經被啟用了監聽器」，避免重複初始化
const observed = new Set<number | string>();

</script>

<template>
  <section class="relative bg-cork">
    <h2 class="text-center text-xl mb-5 sm:text-3xl sm:mb-10">{{ $t('experienceTimeline.title') }}</h2>
    <Card class="block w-[300px] md:w-[400px] bg-paper rounded-lg mb-10 shadow-xl shadow-amber-800/50 last:mb-0"
      :class="[Number(index) % 2 === 0 ? 'mx-auto -rotate-2 animation-card-left' : 'mx-auto rotate-2 animation-card-right', { 'is-visible': visibleIndices.has(index) }]"
      v-for="(experience, index) in tm('experienceTimeline.items')"
      :ref="(el: any) => useSetAnimationRef(el, index, observed, visibleIndices)" :key="index">
      <CardHeader>
        <CardTitle class="mb-3">
          <span class="block mb-0 text-base sm:text-lg text-inverse">{{ experience.company }}</span>
          <span class="block mb-1 text-sm sm:text-base text-paper-label">{{ experience.title }}</span>
          <span class="block w-fit px-2 py-1 text-xs text-primary rounded bg-surface">{{ experience.timeRange }}</span>
        </CardTitle>
        <hr class="h-px border-dashed bg-surface" />
      </CardHeader>
      <CardContent>
        <ul class="pl-5 list-[square] space-y-2">
          <li v-for="(workItem, workIndex) in experience.work" :key="workIndex" class="text-paper-label">
            <h3 class="text-base sm:text-sm text-paper-label">{{ workItem.title }}</h3>
            <p class="text-sm sm:text-base text-paper-label">{{ workItem.content }}</p>
          </li>
        </ul>
      </CardContent>
      <!-- <div class="w-full h-[5px] rotate-90 bg-white rounded-2xl absolute top-[50%]">
      </div> -->
    </Card>
  </section>
</template>
<style scoped>
.animation-card-left,
.animation-card-right {
  opacity: 0;
}


.animation-card-left.is-visible {
  animation: card-left-min .6s ease-out forwards;
}

.animation-card-right.is-visible {
  animation: card-right-min .6s ease-out forwards;
}

@media (min-width: 768px) {
  .animation-card-left.is-visible {
    animation: card-left-middle .6s ease-out forwards;
  }

  .animation-card-right.is-visible {
    animation: card-right-middle .6s ease-out forwards;
  }
}

@media (min-width: 1024px) {
  .animation-card-left.is-visible {
    animation: card-left .6s ease-out forwards;
  }

  .animation-card-right.is-visible {
    animation: card-right .6s ease-out forwards;
  }
}

@keyframes card-left-min {
  from {
    transform: translateX(-30%);
    opacity: 0;
  }

  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes card-right-min {
  from {
    transform: translateX(30%);
    opacity: 0;
  }

  to {
    transform: translateX(0%);
    opacity: 1;
  }
}

@keyframes card-left-middle {
  from {
    transform: translateX(-60%);
    opacity: 0;
  }

  to {
    transform: translateX(-30%);
    opacity: 1;
  }
}

@keyframes card-right-middle {
  from {
    transform: translateX(60%);
    opacity: 0;
  }

  to {
    transform: translateX(30%);
    opacity: 1;
  }
}


@keyframes card-left {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(-70%);
    opacity: 1;
  }
}

@keyframes card-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(70%);
    opacity: 1;
  }
}
</style>