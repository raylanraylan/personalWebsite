<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue';
import PersonalWebLogo from '@/assets/PersonalWebLogo.vue'

const route = useRoute()
const heightSize = ref<string>();
const process = ref<number>(0);
const runProcess = setInterval(()=>{  
  if (process.value < 98) {
    process.value += Math.floor(Math.random() * 2 + 2)
  }
},100)

function getSize(size:number){
  heightSize.value = size+'px';
}

const isLoading = ref(true);
const isToggleDark = ref(false)

const updateTheme = () => {    
  if (isToggleDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function hideLoading(){
  const hideTime = setTimeout(()=>{
    process.value = 100;
    clearInterval(runProcess)
    clearTimeout(hideTime);
  },500)

  const showFullProcess = setTimeout(()=>{
    isLoading.value = false;
    clearTimeout(showFullProcess);
  },1000)
}

onBeforeMount(()=>{
  isToggleDark.value = localStorage.getItem('darkMode')==="true"?true:false
  updateTheme();
  hideLoading();
})
</script>

<template>
  <Transition :duration="1000">
    <div v-show="isLoading" class="w-full h-[100vh] loading flex flex-col justify-center" >
      <div>
        <PersonalWebLogo class="h-20 w-full" :lineColor="isToggleDark?'#fcfcfc':'#1f2937'"/>
        <p class="text-gray-900 dark:text-white text-4xl text-center">{{ process }}%</p>
      </div>
    </div>
  </Transition>
  <div v-show="!isLoading">
    <header v-if="route.name !== 'notFound'" class="fixed top-0 w-full" >
      <Header class="max-w-7xl mx-auto px-[5vw] py-5" @heightSize = "getSize"/>
    </header>
    <main class="px-[5vw] pt-10 pb-20 max-w-4xl mx-auto" :style="[{'margin-top':heightSize}]" :isLoading="isLoading">
      <RouterView />
    </main>
    <footer v-if="route.name !== 'notFound'">
      <Footer/>
    </footer>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>