<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue';
import PersonalWebLogo from '@/assets/PersonalWebLogo.vue'

const route = useRoute()
const heightSize = ref<string>();
function getSize(size:number){
  heightSize.value = size+'px';
}

const isLoading = ref(true);
const isToggleDark = ref(false)
onMounted(()=>{
  isToggleDark.value = localStorage.getItem('darkMode')==="true"?true:false
  isLoading.value = false;
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full loading">
    <PersonalWebLogo class="h-8 w-auto" :lineColor="isToggleDark?'#fcfcfc':'#1f2937'"/>
  </div>
  <div v-else>
    <header v-if="route.name !== 'notFound'" class="fixed top-0 w-full" >
      <Header class="max-w-7xl mx-auto px-[5vw] py-5" @heightSize = "getSize"/>
    </header>
    <main class="px-[5vw] pt-10 pb-20 max-w-7xl mx-auto" :style="[{'margin-top':heightSize}]">
      <RouterView />
    </main>
    <footer v-if="route.name !== 'notFound'">
      <Footer/>
    </footer>
  </div>
</template>

