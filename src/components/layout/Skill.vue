<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';
import { useI18n } from 'vue-i18n';
import { triggerHoverSound } from '@/composables/useAmbientSound';
import Card from '../ui/card/Card.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import CardDescription from '../ui/card/CardDescription.vue';
import CardContent from '../ui/card/CardContent.vue';

const { tm } = useI18n();

defineProps<{
  isEnableSound: boolean;
  volume: number;
}>();

// 1. 儲存目前「已經進入畫面」的卡片索引 (使用 Set 避免重複)
const visibleIndices = ref(new Set<number | string>());

// 2. 追蹤哪些卡片「已經被啟用了監聽器」，避免重複初始化
const observed = new Set<number | string>();

/**
 * 3. 動態設定卡片引用並初始化監聽器
 * @param el 元件或 DOM 元素實體
 * @param index 卡片的唯一索引
 */
const setCardRef = (el: any, index: number | string) => {
  // 如果元素存在，且該索引還沒被監聽過
  if (el && !observed.has(index)) {
    observed.add(index); // 標記為已監聽

    // 針對 Vue 元件獲取其底層 DOM ($el)，若是普通標籤則直接使用 el
    const target = el.$el || el;

    // 4. 開始監聽元素是否進入可視範圍
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      // 5. 當卡片進入畫面 (isIntersecting 為 true)
      if (isIntersecting) {
        visibleIndices.value.add(index); // 將索引加入「可見列表」，觸發 CSS 動態類別
      }
    }, { threshold: 0.2 }); // threshold 0.2 表示元素出現 20% 時觸發
  }
};

</script>
<template>
  <section class="bg-elevated">
    <h2 class="text-center text-xl sm:text-3xl mb-3 sm:mb-10 text-on-surface">{{ $t('skills.title') }}</h2>
    <div class="grid grid-cols-1 gap-y-5 mb-3 sm:gap-5 sm:grid-cols-2 sm:mb-10 lg:grid-cols-6 lg:gap-5">
      <Card class="border-base bg-primary hover:border-spotlight-yellow relative animation-card-up"
        :ref="(el: any) => setCardRef(el, index)" @mouseenter="triggerHoverSound(isEnableSound, volume)" :class="[
          Number(index) > 2 ? 'lg:col-span-3' : 'lg:col-span-2',
          { 'is-visible': visibleIndices.has(index) }
        ]" v-for="(skill, index) in tm('skills.items')" :key="index">
        <CardHeader class="p-4 sm:p-6">
          <CardTitle>
            <h3 class="text-sm sm:text-lg text-surface">{{ skill.title }}</h3>
          </CardTitle>
          <CardDescription class="absolute -top-3 left-3">
            <p class="p-1 px-2 text-xs sm:text-sm text-paper-label bg-paper">class{{ index + 1 }}</p>
          </CardDescription>
        </CardHeader>
        <CardContent class="p-4 sm:p-6">
          <ul class="flex flex-wrap gap-3">
            <li v-for="(item, itemIndex) in skill.items" :key="item"
              @mouseenter="triggerHoverSound(isEnableSound, volume)"
              class="w-fit px-3 py-1 border border-base text-xs sm:text-base text-muted bg-surface hover:text-primary hover:bg-elevated hover:transition-colors hover:cursor-default">
              <a v-if="skill.urls[itemIndex]" :href="skill.urls[itemIndex]" target="_blank" rel="noopener noreferrer">{{
                item }}</a>
              <span v-else>{{ item }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
    <p class=" text-center text-xs sm:text-sm text-gray-500">{{ $t('skills.description') }}</p>
  </section>
</template>

<style scoped>
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