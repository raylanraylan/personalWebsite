<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue';

const heightSize = ref<string>();
function getSize(size:number){
  heightSize.value = size+'px';
}
</script>

<template>
  <header class="fixed top-0 w-full" >
    <Header @heightSize = "getSize"/>
  </header>
  <main :style="[{'margin-top':heightSize}]">
    <RouterView />
  </main>
  <footer>
    <Footer/>
  </footer>
</template>

<style scoped>

</style>
