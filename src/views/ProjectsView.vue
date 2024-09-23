<script setup lang="ts">
import { ref } from 'vue';
const projects = ref([
  {
    i18nTitle:'project.personalPage.title',
    skill:'Vue3 | Vue Router | Typescript | Tailwind CSS | Vue I18n(translate)',
    description:'project.personalPage.description',
    link:'',
    github:'https://github.com/raylanraylan/personalWebsite',
  },
  {
    i18nTitle:'project.blog.title',
    skill:'',
    description:'project.blog.description',
    link:'https://raylanraylan.github.io/blog/',
    github:'',
  },
  {
    i18nTitle:'project.iTHelp-keep-sharing-award-2023.title',
    skill:'',
    description:'project.iTHelp-keep-sharing-award-2023.description',
    link:'https://ithelp.ithome.com.tw/users/20162664/ironman/6507',
    github:'',
  },
])
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
    <div v-for="project in projects" class="p-5 shadow-md bg-zinc-50 rounded-md flex flex-col">
      <h2 class="text-xl font-bold mb-1">{{ $t(project.i18nTitle) }}</h2>
      <h3 v-if="project.skill!==''" class="text-xs mb-3">{{ project.skill }}</h3>
      <p class="mb-3 mt-auto">{{ $t(project.description) }}</p>
      <div class="flex justify-center items-center gap-3 mt-auto">
        <a v-if="project.link!==''" class="block" :href="project.link" target="_blank">
          <button v-if="project.link!==''" class="flex items-center justify-center gap-x-6 rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 dark:bg-white dark:text-gray-900" type="submit">{{ $t("project.view") }}</button>
        </a>
        <a v-if="project.github!==''" class="w-10 block" :href="project.github" target="_blank">
          <img class="w-full" src="../assets/github.svg"/>
        </a>
      </div>
    </div>
  </div>
</template> 