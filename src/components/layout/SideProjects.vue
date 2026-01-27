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
    <h2 class="text-center mb-3 text-xl sm:text-3xl sm:mb-10">{{ $t('project.title') }}</h2>
    <div class="grid gap-3 sm:gap-10 lg:grid-cols-2">
      <Card v-for="project in tm('project.items')" :key="project.title"
        class="max-w-4xl bg-manila rounded-lg shadow-noir transition-all duration-500 opacity-100 transform last:mb-0 hover:-translate-y-2 hover:border-spotlight-yellow hover:border-2">
        <CardHeader class="p-3 sm:p-6">
          <CardTitle class="text-base sm:text-lg text-ink-black group-hover:text-alert-red">{{ project.title }}
          </CardTitle>
          <CardDescription>
            <p class="text-paper-label">{{ project.description }}</p>
            <br />
            <Button>
              <a class="text-paper-muted hover:underline" :href="project.url" target="_blank"
                rel="noopener noreferrer">{{
                  $t('project.view') }}</a>
            </Button>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </section>
</template>