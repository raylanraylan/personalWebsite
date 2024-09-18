<script setup lang="ts">
const thisYear:number = new Date().getFullYear()
</script>
<template>
<p class="text-center">{{$t("footer.copyright")}} &copy; {{thisYear}} Ray</p>

</template>