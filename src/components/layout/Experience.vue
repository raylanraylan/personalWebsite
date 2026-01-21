<script setup lang="ts">
import Card from '../ui/card/Card.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import CardContent from '../ui/card/CardContent.vue';
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();
</script>

<template>
  <section class="relative bg-corkboard">
    <h2 class="text-center text-3xl mb-10">{{ $t('experienceTimeline.title') }}</h2>
    <Card class="block w-[450px] bg-paper rounded-lg mb-10 shadow-xl shadow-amber-800/50 last:mb-0" :class="index%2 === 0 ? 'mr-auto -rotate-2' : 'ml-auto rotate-2'" v-for="(experience, index) in tm('experienceTimeline.items')" :key="index">
      <CardHeader>
        <CardTitle class="mb-3">
          <span class="block mb-0 text-lg text-inverse">{{ experience.company }}</span>
          <span class="block mb-1 text-sm text-on-paper-label">{{ experience.title }}</span>
          <span class="block w-fit px-2 py-1 text-xs text-primary rounded bg-surface">{{ experience.timeRange }}</span>
        </CardTitle>
        <hr class="h-[1px] border-dashed bg-surface"/>
      </CardHeader>
      <CardContent>
        <ul class="pl-5 list-[square] space-y-2">
          <li v-for="(workItem, workIndex) in experience.work" :key="workIndex" class="text-on-paper-label">
            <h3>{{ workItem.title }}</h3>
            <p>{{ workItem.content }}</p>
          </li>
        </ul>
      </CardContent>
      <!-- <div class="w-full h-[5px] rotate-90 bg-white rounded-2xl absolute top-[50%]">
      </div> -->
    </Card>
  </section>
</template>