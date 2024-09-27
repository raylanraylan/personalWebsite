<script setup lang="ts">
import { onBeforeUpdate, onMounted, ref } from 'vue'
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
    clearTime(hideTime);
  },1000)

  const showFullProcess = setTimeout(()=>{
    isLoading.value = false;
    clearTime(showFullProcess);
  },3000)
}

function clearTime(time:number){
  clearTimeout(time)
}

onMounted(()=>{
  isToggleDark.value = localStorage.getItem('darkMode')==="true"?true:false
  updateTheme();
  hideLoading();
})

</script>

<template>
  <!-- v-if="isLoading" -->
  <div v-if="isLoading" class="w-full h-[100vh] loading flex flex-col justify-center">
    <div>
      <PersonalWebLogo class="h-20 w-full" :lineColor="isToggleDark?'#fcfcfc':'#1f2937'"/>
      <p class="text-white text-4xl text-center">{{ process }}%</p>
    </div>
  </div>
  <div v-else>
    <header v-if="route.name !== 'notFound'" class="fixed top-0 w-full" >
      <Header class="max-w-7xl mx-auto px-[5vw] py-5" @heightSize = "getSize"/>
    </header>
    <main class="px-[5vw] pt-10 pb-20 max-w-4xl mx-auto" :style="[{'margin-top':heightSize}]">
      <RouterView />
    </main>
    <footer v-if="route.name !== 'notFound'">
      <Footer/>
    </footer>
  </div>
</template>