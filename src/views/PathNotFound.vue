<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

onMounted(() => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  }
})
</script>
<template>
  <div class="h-screen flex items-center justify-center">
    <div class="text-center">
      <p class="text-base">404</p>
      <h1 class="mt-4 text-3xl font-bold sm:text-5xl">{{ $t("notFound.title") }}</h1>
      <p class="mt-6 text-base">{{ $t("notFound.content") }}</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <RouterLink to="/"
          class="rounded-md px-3.5 py-2.5 text-sm font-semibold bg-muted text-brand-highlight hover:shadow-glow">
          {{ $t("notFound.goBackHome") }}</RouterLink>
      </div>
    </div>
  </div>
</template>
