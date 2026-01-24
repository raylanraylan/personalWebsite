<script setup lang="ts">
import { ref,computed,defineProps } from 'vue';
import Button from '../ui/button/Button.vue';

const lightingSection = ref<HTMLElement|null>(null);
const lightPosition = ref<{x:string,y:string}>({x:'0px',y:'0px'});
    
const props = defineProps<{
  fileNumber: string;
}>();

const mouseMoveHandler = (e:MouseEvent) => {
  const rect = lightingSection.value?.getBoundingClientRect();
  if(rect){
    lightPosition.value.x = ((e.clientX - rect.left) / rect.width) * 100 + '%';
    lightPosition.value.y = ((e.clientY - rect.top) / rect.height) * 100 + '%';
  }
}

const quickOpen = ref<string>('#profile');
document.addEventListener('mousemove', mouseMoveHandler)
</script>

<template>
  <section ref="lightingSection" class="w-full h-screen bg-[url(@/assets/desk.jpeg)] bg-cover bg-center bg-no-repeat relative">
    <div 
      class="absolute inset-0 pointer-events-none transition-all duration-75 
      bg-[rgba(255,255,255,0.8)]
      dark:bg-[radial-gradient(400px_at_var(--x)_var(--y),transparent_0%,rgba(0,0,0,0.85)_100%)]"
      :style="{ '--x': lightPosition.x, '--y': lightPosition.y }"
    /> 
    
    <div class="px-[5vw] pt-32 pb-20 max-w-4xl mx-auto flex flex-col relative z-10 text-center">
      <div>
        <h1 class="text-muted">{{ props.fileNumber }}</h1>
        <h2 class="mt-5 text-[1rem] sm:text-[3rem] leading-tight">{{$t("hero.fileType")}}</h2>
        <p class="mb-10 text-muted-foreground">{{$t("hero.fileDescription")}}</p>
        <Button class="mb-3">
          <a :href="quickOpen">{{ $t("hero.quickOpen") }}</a>
        </Button>
      </div>
      <p class="absolute bottom-0 left-1/2 transform -translate-x-1/2">{{ $t("hero.useFile") }}</p>
    </div> 
  </section> 
</template>