<script lang="ts">
import Card from '../ui/card/Card.vue';
import CardHeader from '../ui/card/CardHeader.vue';
import CardTitle from '../ui/card/CardTitle.vue';
import CardContent from '../ui/card/CardContent.vue';
</script>
<template>
  <Card class="block w-[375px] bg-paper rounded-lg">
    <CardHeader>
      <CardTitle>
        <h3 class="text-lg text-inverse"></h3>
        <span class="text-sm text-on-paper-label"></span>
        <br/>
        <span class="px-2 py-1 text-xs text-primary rounded bg-surface"></span>
      </CardTitle>
      <hr class="h-[1px] border-dashed bg-surface"/>
    </CardHeader>
    <CardContent>
      <span></span>
      <br/>
      <p></p>
    </CardContent>
  </Card>
</template>