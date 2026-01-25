<script setup lang="ts">
import Card from '../ui/card/Card.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import CardDescription from '../ui/card/CardDescription.vue';
import { useI18n } from 'vue-i18n';
const { tm } = useI18n();
</script>
<template>
  <section class="relative bg-surface">
    <h2 class="text-center text-3xl mb-10">{{ $t('project.title') }}</h2>
    <div class="grid gap-10 lg:grid-cols-2">
      <Card v-for="project in tm('project.items')" :key="project.title"
        class="max-w-4xl bg-manila rounded-lg shadow-noir transition-all duration-500 opacity-100 transform last:mb-0 hover:-translate-y-2 hover:shadow-glow">
        <CardHeader>
          <CardTitle class="text-lg text-ink-black group-hover:text-alert-red">{{ project.title }}</CardTitle>
          <CardDescription>
            <p class="text-paper-label">{{ project.description }}</p>
            <br />
            <Button>
              <a class="text-inverse hover:underline" :href="project.url" target="_blank" rel="noopener noreferrer">{{
                $t('project.view') }}</a>
            </Button>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </section>
</template>