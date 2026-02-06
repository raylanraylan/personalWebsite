<script setup lang="ts">
import { defineProps, ref, onMounted, type Ref } from 'vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';

import Card from '../ui/card/Card.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import CardDescription from '../ui/card/CardDescription.vue';
import CardContent from '../ui/card/CardContent.vue';
import CardFooter from '../ui/card/CardFooter.vue';

const props = defineProps<{
  fileNumber: string;
}>();

function imgUrl(url: string) {
  return new URL(url, import.meta.url).href
}

const paperImgUrl = imgUrl('/src/assets/images/paper.webp');
const aspectRatio = ref('auto');
const penImgUrl = imgUrl('/src/assets/images/pen.webp');
const cameraImgUrl = imgUrl('/src/assets/images/camera.webp');

// 這樣寫 await 才有意義
function imgSize(url: string, variable?: Ref<string>): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      if (variable) {
        variable.value = `${img.naturalWidth} / ${img.naturalHeight}`;
      }
      resolve(); // 載入完成，結束 Promise
    };
    img.onerror = () => resolve(); // 失敗也要結束，避免 await 卡死
  });
}

onMounted(async () => {
  await imgSize(paperImgUrl, aspectRatio);
  await imgSize(penImgUrl);
  await imgSize(cameraImgUrl);
});

const updatedDate = '2026-01-15';

const aboutItems = [
  'name',
  'position',
  'status',
  'location',
  'yearsOfExperience'
];

const breakpoints = useBreakpoints(breakpointsTailwind);
const isLg = breakpoints.greaterOrEqual('lg');

</script>
<template>
  <section class="bg-[linear-gradient(180deg, hsl(0 0% 1% / 1), transparent)] relative">
    <h2 class="text-center text-xl mb-3 sm:text-3xl sm:mb-10 lg:hidden">{{ $t('profile_section') }}</h2>
    <Card :style="isLg ? { aspectRatio: aspectRatio, backgroundImage: `url(${paperImgUrl})` } : {}"
      class="bg-paper lg:bg-transparent bg-size-[100%_100%] h-auto bg-top sm:p-12 lg:px-30 py-20 relative lg:border-0 lg:bg-no-repeat">
      <CardHeader class="p-0">
        <h3
          class="sm:text-5xl status-danger p-4 border-2 border-danger uppercase absolute right-[5%] top-[200px] lg:top-[150px] rotate-25 text-shadow-sm text-shadow-red-500 mix-blend-color-burn filter-blur-sm">
          {{ $t('about.stamp') }}</h3>
        <CardTitle>
          <h2
            class="text-center text-xl mb-3 sm:text-3xl sm:mb-10 lg:text-ink-black lg:opacity-80 lg:text-shadow-xs lg:text-shadow-black hidden lg:block">
            {{ $t('profile_section') }}</h2>
        </CardTitle>
        <CardDescription class="lg:mix-blend-multiply lg:opacity-80 lg:text-shadow-xs lg:text-shadow-black">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-0 lg:border-t-2 lg:border-l-2 lg:border-gray-800">
            <div v-for="item in aboutItems" :key="item" class="lg:p-3 lg:border-b-2 lg:border-r-2 lg:border-gray-800"
              :class="item === 'name' ? 'sm:col-span-2' : ''">
              <h4 class="text-xs sm:text-base text-gray-500">{{ $t(`about.items.${item}.title`) }}{{ $t('about.colon')
                }}</h4>
              <p class="text-sm sm:text-lg text-paper-label">{{ $t(`about.items.${item}.content`) }}</p>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <hr class="h-px border-dashed bg-surface my-5 lg:hidden" />
      <CardContent
        class="p-0 lg:border-2 lg:border-t-0 lg:border-gray-800 lg:p-3 lg:opacity-80 lg:text-shadow-xs lg:text-shadow-black">
        <h4 class="text-xs sm:text-base text-gray-500">{{ $t('about.description.title') }}{{ $t('about.colon') }}</h4>
        <p class="text-sm sm:text-lg text-paper-label">{{ $t('about.description.content') }}</p>
      </CardContent>
      <hr class="h-px border-dashed bg-surface my-5 lg:hidden" />
      <CardFooter
        class="justify-between p-0 text-[10px] sm:text-xs text-gray-500 lg:opacity-80 lg:text-shadow-xs lg:text-shadow-gray-500">
        <span>{{ props.fileNumber }}</span>
        <span>{{ $t('about.footer.updated') }}{{ $t('about.colon') }}{{ updatedDate }}</span>
      </CardFooter>
    </Card>
    <img :src="penImgUrl" class="hidden lg:block absolute right-[20%] bottom-[10%] rotate-45 w-[50px]" />
    <img :src="cameraImgUrl" class="hidden lg:block absolute left-0 bottom-0 w-[600px]" />
  </section>
</template>