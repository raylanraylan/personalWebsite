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
  <div>
    <h2 class="text-[4rem] sm:text-[8rem] leading-tight dark:text-white">{{$t("home.greeting")}}</h2>
    <p class="dark:text-white">{{$t("home.introduce")}}</p>
  </div>
</template>
