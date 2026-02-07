<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue';
import PersonalWebLogo from '@/assets/PersonalWebLogo.vue'
import OpenWebLoading from '@/components/layout/OpenWebLoading.vue'

const route = useRoute()
const process = ref<number>(0);
const runProcess = setInterval(() => {
  if (process.value < 98) {
    process.value += Math.floor(Math.random() * 2 + 2)
  }
}, 100)

const isLoading = ref(true);
const isShowContent = ref(false)
const isToggleDark = ref(true)

const updateTheme = () => {
  if (isToggleDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function hideLoading() {
  const hideTime = setTimeout(() => {
    process.value = 100;
    clearInterval(runProcess)
    clearTimeout(hideTime);
    // isLoading.value = false; // Moved to @complete event from OpenWebLoading
  }, 700)

  const showFullProcess = setTimeout(() => {
    isShowContent.value = true;
    clearTimeout(showFullProcess);
  }, 500)
}

const isEnableSound = ref(false);
const handleEnableSound = (val: boolean) => {
  isEnableSound.value = val;
}

const volume = ref<number>(0);
const handleVolume = (val: number) => {
  volume.value = val;
}

onBeforeMount(() => {
  isToggleDark.value = localStorage.getItem('darkMode') === "true" ? true : false
  updateTheme();
  // hideLoading();
})
</script>

<template>
  <!-- <div v-if="isLoading" class="w-full h-screen loading flex flex-col justify-center">
    <PersonalWebLogo class="h-20 w-full" :lineColor="isToggleDark ? '#fcfcfc' : '#1f2937'" />
    <p class="text-gray-900 dark:text-white text-4xl text-center">{{ process }}%</p>
  </div> -->
  <!-- <div v-else> -->

  <OpenWebLoading v-if="isLoading" @complete="isLoading = false" />
  <div v-else>
    <header v-if="route.name !== 'notFound'">
      <Header @isEnableSound="handleEnableSound" @volume="handleVolume" />
    </header>
    <main class="relative">
      <RouterView :isEnableSound="isEnableSound" :volume="volume" />
    </main>
    <footer v-if="route.name !== 'notFound'">
      <Footer />
    </footer>
  </div>
  <!-- </div> -->
</template>

<style>
.slide-fade-enter-active {
  transition-property: opacity;
  transition: opacity 1s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>