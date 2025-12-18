<script setup lang="ts">
import { onBeforeMount, onMounted, ref, nextTick } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue';
import PersonalWebLogo from '@/assets/PersonalWebLogo.vue'

const route = useRoute()
const heightSize = ref<string>();
const process = ref<number>(0);
const runProcess = setInterval(() => {
  if (process.value < 98) {
    process.value += Math.floor(Math.random() * 2 + 2)
  }
}, 100)

async function getSize(size: number) {
  heightSize.value = size + 'px';
  await nextTick()
}

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
    isLoading.value = false;
  }, 700)

  const showFullProcess = setTimeout(() => {
    isShowContent.value = true;
    clearTimeout(showFullProcess);
  }, 500)
}

onBeforeMount(() => {
  isToggleDark.value = localStorage.getItem('darkMode') === "true" ? true : false
  updateTheme();
  hideLoading();
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-[100vh] loading flex flex-col justify-center">
    <PersonalWebLogo class="h-20 w-full" :lineColor="isToggleDark ? '#fcfcfc' : '#1f2937'" />
    <p class="text-gray-900 dark:text-white text-4xl text-center">{{ process }}%</p>
  </div>
  <div v-else="!isLoading" class="bg-[url(@/assets/desk.jpeg)] bg-cover bg-center bg-no-repeat">
    <header v-if="route.name !== 'notFound'" class="fixed top-0 w-full">
      <Header class="max-w-7xl mx-auto px-[5vw] py-5" @heightSize="getSize" />
    </header>
    <Transition appear name="slide-fade">
      <main v-show="isShowContent" class="px-[5vw] pt-10 pb-20 max-w-4xl mx-auto">
        <RouterView />
      </main>
    </Transition>
    <footer v-if="route.name !== 'notFound'">
      <Footer />
    </footer>
  </div>
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