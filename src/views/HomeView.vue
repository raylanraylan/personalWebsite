<script setup lang="ts">
import { ref,defineProps,watch } from 'vue';
const showText = ref<boolean>(false);
// const props = defineProps<{
//   isLoading:boolean
// }>()

// watch(() => props.isLoading, (newValue) => {
//   const showContent = setTimeout(()=>{
//     if (!newValue) {
//       showText.value = true;
//       clearTimeout(showContent)
//     }
//   },300)
// }, { immediate: true });

</script>

<template>
  <Transition appear name="slide-fade">
    <div>
      <h2 class="text-[4rem] sm:text-[8rem] leading-tight dark:text-white">{{$t("home.greeting")}}</h2>
      <p class="dark:text-white">{{$t("home.introduce")}}</p>
    </div>
  </Transition>
</template>

<style>
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

</style>