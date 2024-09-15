<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue';
</script>

<template>
  <header>
    <Header/>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <Footer/>
  </footer>
</template>

<style scoped>

</style>
