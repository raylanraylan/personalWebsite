<script setup lang="ts">
const thisYear:number = new Date().getFullYear();
</script>

<template>
  <p class="text-center py-3 text-sm dark:text-amber-400">{{$t("footer.copyright")}} &copy; {{thisYear}} Ray</p>
</template>