<script setup lang="ts">
import { defineProps } from 'vue';

import Card from '../ui/card/Card.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import CardDescription from '../ui/card/CardDescription.vue';
import CardContent from '../ui/card/CardContent.vue';
import CardFooter from '../ui/card/CardFooter.vue';

const props = defineProps<{
  fileNumber: string;
}>();

const updatedDate = '2026-01-15';

const aboutItems = [
  'name',
  'position',
  'status',
  'location',
  'yearsOfExperience'
];

</script>
<template>
  <section class="px-40 py-20 bg-[linear-gradient(180deg, hsl(0 0% 1% / 1), transparent)]">
    <h2 class="text-center text-3xl mb-10">{{ $t('profile_section') }}</h2>
    <Card class="bg-paper p-12 relative">
      <CardHeader class="p-0">
        <CardTitle class="absolute right-[10px] top-[100px] rotate-[25deg] opacity-70">
          <h3 class="text-5xl status-danger p-4 border-2 border-danger uppercase">{{ $t('about.stamp') }}</h3>
        </CardTitle>
        <CardDescription>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="item in aboutItems" :key="item" :class="item==='name'? 'col-span-2' : ''">
              <h4 class="text-base text-gray-500">{{ $t(`about.items.${item}.title`) }}{{$t('about.colon')}}</h4>
              <p class="text-lg text-on-paper-label">{{ $t(`about.items.${item}.content`) }}</p>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <hr class="h-[1px] border-dashed bg-surface my-5"/>
      <CardContent class="p-0">
        <h4 class="text-gray-500">{{ $t('about.description.title') }}{{$t('about.colon')}}</h4>
        <p class="text-lg text-on-paper-label">{{ $t('about.description.content') }}</p>
      </CardContent>
      <hr class="h-[1px] border-dashed bg-surface my-5"/>
      <CardFooter class="justify-between p-0 text-xs  text-gray-500">
        <span>{{ props.fileNumber }}</span>
        <span>{{$t('about.footer.updated')}}{{$t('about.colon')}}{{ updatedDate }}</span>
      </CardFooter>
    </Card>
  </section>
</template>