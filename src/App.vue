<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router';
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue';

const route = useRoute()
const heightSize = ref<string>();
function getSize(size:number){
  heightSize.value = size+'px';
}
</script>

<template>
  <header v-if="route.name !== 'notFound'" class="fixed top-0 w-full" >
    <Header class="max-w-7xl mx-auto px-[5vw] py-5" @heightSize = "getSize"/>
  </header>
  <main class="px-[5vw] pt-10 pb-20 max-w-7xl mx-auto" :style="[{'margin-top':heightSize}]">
    <RouterView />
  </main>
  <footer v-if="route.name !== 'notFound'">
    <Footer/>
  </footer>
</template>

