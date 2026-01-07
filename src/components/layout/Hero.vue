<script setup lang="ts">
import { ref } from 'vue';

const lightingSection = ref<HTMLElement|null>(null);
const lightPosition = ref<{x:string,y:string}>({x:'0px',y:'0px'});

const mouseMoveHandler = (e:MouseEvent) => {
  const rect = lightingSection.value?.getBoundingClientRect();
  if(rect){
    lightPosition.value.x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
    lightPosition.value.y = ((e.clientY - rect.top) / rect.height) * 100 + '%';
  }
}

document.addEventListener('mousemove', mouseMoveHandler)
</script>

<template>
  <section ref="lightingSection" class="w-full h-screen bg-[url(@/assets/desk.jpeg)] bg-cover bg-center bg-no-repeat">
    <div class="absolute inset-0 transition-all duration-75" :style="{background: `radial-gradient(400px at ${lightPosition.x} ${lightPosition.y}, transparent 0%, rgba(0, 0, 0, 0.85) 100%)`}"/>
    <div class="px-[5vw] pt-24 pb-20 max-w-4xl mx-auto flex flex-col">
      <div class="z-10 text-center">
        <p class="dark:text-white">{{ $t("home.fileTitle") }}</p>
        <h1 class="dark:text-white">Ray</h1>
        <h2 class="text-[4rem] sm:text-[8rem] leading-tight dark:text-white">{{$t("home.greeting")}}</h2>
        <p class="dark:text-white">{{$t("home.introduce")}}</p>
      </div>
    </div> 
  </section> 
</template>