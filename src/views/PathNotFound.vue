<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';

onMounted(()=>{
  if(localStorage.getItem('darkMode') === 'true'){
    document.documentElement.classList.add('dark');
  }
})
</script>
<template>
  <main class="grid min-h-full place-items-center px-6 lg:px-8">
    <div class="text-center text-gray-900 dark:text-white">
      <p class="text-base font-semibold">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{{ $t("notFound.title") }}</h1>
      <p class="mt-6 text-base leading-7">{{ $t("notFound.content") }}</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <RouterLink to="/" class="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-white dark:text-gray-900">{{ $t("notFound.goBackHome") }}</RouterLink>
      </div>
    </div>
  </main>
</template>
