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
    <Header @heightSize = "getSize"/>
  </header>
  <main :style="[{'margin-top':heightSize}]">
    <RouterView />
  </main>
  <footer v-if="route.name !== 'notFound'">
    <Footer/>
  </footer>
</template>

