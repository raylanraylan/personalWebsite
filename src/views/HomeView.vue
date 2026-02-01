<script setup lang="ts">
import Hero from '@/components/layout/Hero.vue';
import About from '@/components/layout/About.vue';
import Skill from '@/components/layout/Skill.vue';
import Experience from '@/components/layout/Experience.vue';
import SideProjects from '@/components/layout/SideProjects.vue';
import Contact from '@/components/layout/Contact.vue';
import { ref } from 'vue';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function generateFileNumber(year: number): string {
  const randomSegment = getRandomInt(10000, 99999);
  return `FILE-${year}-OPR-${randomSegment}`;
}

const thisYear = new Date().getFullYear();
const fileNumber = ref<string>(generateFileNumber(thisYear));

defineProps<{
  isEnableSound: boolean;
  volume: number;
}>();
</script>

<template>
  <Hero id="hero" :fileNumber="fileNumber" />
  <About id="profile" :fileNumber="fileNumber" />
  <Skill id="arseanal" :isEnableSound="isEnableSound" :volume="volume" />
  <Experience id="timeline" />
  <SideProjects id="cases" :isEnableSound="isEnableSound" :volume="volume" />
  <Contact id="contact" />
</template>