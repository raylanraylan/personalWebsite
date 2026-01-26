<script setup lang="ts">
import Card from '../ui/card/Card.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import CardDescription from '../ui/card/CardDescription.vue';
import CardContent from '../ui/card/CardContent.vue';
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();

</script>
<template>
  <section class="bg-elevated">
    <h2 class="text-center text-3xl mb-10 text-on-surface">{{ $t('skills.title') }}</h2>
    <div class="grid grid-cols-1 gap-y-5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5 mb-10">
      <Card class="border-base bg-primary hover:border-spotlight-yellow relative"
        :class="Number(index) > 2 ? 'lg:col-span-3' : 'lg:col-span-2'" v-for="(skill, index) in tm('skills.items')"
        :key="index">
        <CardHeader>
          <CardTitle>
            <h3 class="text-lg text-surface">{{ skill.title }}</h3>
          </CardTitle>
          <CardDescription class="absolute -top-3 left-3">
            <p class="p-1 px-2 text-sm text-paper-label bg-paper">class{{ index + 1 }}</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="flex flex-wrap gap-3">
            <li v-for="(item, itemIndex) in skill.items" :key="item"
              class="w-fit px-3 py-1 border border-base text-muted bg-surface hover:text-primary hover:bg-elevated hover:transition-colors hover:cursor-default">
              <a v-if="skill.urls[itemIndex]" :href="skill.urls[itemIndex]" target="_blank" rel="noopener noreferrer">{{
                item }}</a>
              <span v-else>{{ item }}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
    <p class="text-center text-sm text-gray-500">{{ $t('skills.description') }}</p>
  </section>
</template>