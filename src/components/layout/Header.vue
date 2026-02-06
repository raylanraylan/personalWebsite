<script setup lang="ts">
import { ref, onMounted, defineEmits, watch } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Switch } from '@headlessui/vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui';
import { Volume2, VolumeOff } from 'lucide-vue-next';
import { playAmbientNoise, stopAmbientNoise } from '@/composables/useAmbientSound';
import { imgUrl } from '@/composables/useImgUrl';
import { imgSize } from '@/composables/useImgAspectRatio';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: 'global' })

const emit = defineEmits<{
  isEnableSound: [isEnable: boolean]
  volume: [volume: number]
}>()

const sliderValue = ref<number[]>([0]);

watch(sliderValue, (newVal) => {
  if (newVal[0] > 0) {
    playAmbientNoise(newVal[0]);
  } else {
    stopAmbientNoise();
  }
  emit('isEnableSound', newVal[0] > 0);
  emit('volume', newVal[0]);
})

const memoPaper = imgUrl('/src/assets/images/memoPaper.webp');
const memoPaperSize = ref<string>('auto');
const redCircle = imgUrl('/src/assets/images/redCircle.webp');
const redCircleSize = ref<string>('auto');

const toggleLanguage = ref<boolean>(false);
const isToggleDark = ref<boolean>(true);
const logoName = ref('logo_name');
const navigation = [
  { i18nName: 'profile_section', path: '#profile' },
  { i18nName: 'arseanal_section', path: '#arseanal' },
  { i18nName: 'timeline_section', path: '#timeline' },
  { i18nName: 'cases_section', path: '#cases' },
  { i18nName: 'contact_section', path: '#contact' },
]

const closeMenu = ref("bg-gray-500 w-full h-1 relative before:content-[''] before:block before:bg-gray-500 before:w-full before:h-1 before:absolute before:-top-2 before:duration-300 after:content-[''] after:block after:bg-gray-500 after:w-full after:h-1 after:absolute after:-bottom-2 after:duration-300");
const openMenu = ref("transparent w-full h-1 relative before:content-[''] before:block before:bg-gray-500 before:w-full before:h-1 before:absolute before:top-0 before:rotate-135 before:duration-300 after:content-[''] after:block after:bg-gray-500 after:w-full after:h-1 after:absolute after:bottom-0 after:duration-300 after:rotate-45")

function toggleColor() {
  isToggleDark.value = !isToggleDark.value
  localStorage.setItem('darkMode', String(isToggleDark.value))
  updateTheme()
}

const updateTheme = () => {
  if (isToggleDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// const desktopMenu = ref<HTMLElement | null>(null);
// const desktopMenuHeight = ref<number>(0);
// document.addEventListener('resize', () => {
//   if (desktopMenu.value) {
//     desktopMenuHeight.value = desktopMenu.value.offsetHeight;
//   }
// })

onMounted(async () => {
  isToggleDark.value = localStorage.getItem('darkMode') === "true" ? true : false
  updateTheme();

  await imgSize(memoPaper, memoPaperSize);

  // if (desktopMenu.value) {
  //   desktopMenuHeight.value = desktopMenu.value?.offsetHeight;
  // }
})

const headerPosition = ref<number>(0);
const headerContainer = ref<HTMLElement | null>(null);
document.addEventListener('scroll', () => {
  if (headerContainer.value) {
    headerPosition.value = scrollY;
  }
})


</script>

<template>
  <Disclosure as="nav" v-slot="{ open }">
    <div ref="headerContainer" class="mx-auto px-[5vw] py-5 fixed top-0 w-full z-50 lg:w-auto lg:h-screen lg:p-0"
      :class="headerPosition > 10 ? 'bg-primary lg:bg-transparent' : 'bg-transparent'">
      <div class="relative flex h-16 items-center justify-between lg:flex-col lg:h-full">
        <h1 class="p-3 lg:hidden">
          <a href="#hero">
            <span class="ml-2 font-medium text-lg text-primary">[{{ $t(logoName) }}]</span>
          </a>
        </h1>
        <!-- Mobile menu button-->
        <DisclosureButton
          class="w-8 h-8 relative inline-flex items-center justify-center rounded-md p-2 bg-paper text-gray-400 hover:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-white sm:hidden">
          <span class="absolute -inset-0.5" />
          <span class="sr-only">Open main menu</span>
          <span :class="open ? openMenu : closeMenu"></span>
        </DisclosureButton>
        <!-- Desktop menu -->
        <div class="hidden sm:flex space-x-4 whitespace-nowrap lg:flex-col lg:relative lg:h-full" ref="desktopMenu">
          <a v-for="(item, index) in navigation" :key="item.i18nName" :href="item.path"
            class="p-2 text-sm text-paper duration-300 lg:relative lg:left-[-30px] lg:w-24 lg:block lg:bg-[url('@/assets/images/anchor.webp')] lg:bg-no-repeat lg:bg-top-right lg:bg-size-[300px] lg:p-0 lg:h-full lg:m-0 lg:mt-[-100px] lg:first:mt-0 hover:text-primary lg:hover:left-[-20px] lg:shadow-lg">
            <span class="lg:relative lg:right-[-30px] lg:top-[80px] lg:rotate-90 lg:origin-center lg:block">{{
              $t(item.i18nName) }}</span></a>
          <!-- <a class="flex gap-1 items-center rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-700 hover:text-white dark:text-white" href="https://raylanraylan.github.io/blog/" target="_blank">
              <span>{{ $t('blog_link') }}</span> -->
          <!-- <ArrowTopRightOnSquareIcon class="size-4"></ArrowTopRightOnSquareIcon> -->
          <!-- </a> -->
        </div>
        <!-- buttons -->
        <div class="flex gap-3 flex-1 items-center justify-end lg:hidden">
          <div class="flex gap-2 items-center">
            <div>
              <Volume2 v-if="sliderValue[0] > 0" @click="sliderValue = [0]" class="cursor-pointer" />
              <VolumeOff v-else @click="sliderValue = [100]" class="cursor-pointer" />
            </div>
            <SliderRoot v-model="sliderValue" class="relative flex items-center w-full h-2" :default-value="[50]"
              orientation="horizontal">
              <SliderTrack class="relative header-underline-border w-[100px] h-2 rounded-full">
                <SliderRange class="absolute bg-paper" />
              </SliderTrack>
              <SliderThumb class="block w-4 h-4 rounded-full header-underline-border cursor-pointer" />
            </SliderRoot>
          </div>
          <Switch v-model="toggleLanguage" :class="toggleLanguage ? 'bg-gray-500' : 'bg-gray-500'"
            class="relative inline-flex h-8 w-14 items-center rounded-full shadow-[inset_2px_2px_3px_0_rgba(0,0,0,.3)] cursor-pointer"
            @click="toggleLanguage ? locale = 'en-US' : locale = 'zh-TW'">
            <span class="sr-only">Enable notifications</span>
            <span :class="toggleLanguage ? 'translate-x-8' : 'translate-x-1'"
              class="h-5 w-5 transform rounded-full bg-white transition absolute top-1.5 shadow-lg" />
            <div class="mx-auto">
              <span class="text-sm mr-.5" :class="toggleLanguage ? 'text-white' : 'text-gray-500'">繁</span>
              <span class="text-sm" :class="toggleLanguage ? 'text-gray-500' : 'text-white'">EN</span>
            </div>
          </Switch>
          <Switch v-model="isToggleDark"
            :class="isToggleDark ? 'bg-gray-100 drop-shadow-lg' : 'bg-amber-400 shadow-[inset_2px_2px_3px_0_rgba(200,70,40,0.7)]'"
            class="relative inline-flex justify-center h-8 w-8 items-center rounded-full cursor-pointer"
            @click="toggleColor">
            <span class="sr-only">Enable notifications</span>
            <MoonIcon v-show="isToggleDark" class="size-4 text-grey-500"></MoonIcon>
            <SunIcon v-show="!isToggleDark" class="size-5 text-grey-500"></SunIcon>
          </Switch>
        </div>
      </div>
    </div>

    <div
      class="hidden lg:flex flex-col fixed top-[10px] right-[10px] z-50 bg-no-repeat bg-size-[100%_100%] px-5 py-8 gap-3"
      :style="{ backgroundImage: `url(${memoPaper})`, aspectRatio: memoPaperSize }">
      <h1 class="hover:underline rotate-[-2]">
        <a href="#hero">
          <span
            class="ml-2 font-medium text-lg text-ink-black opacity-80 mix-blend-multiply text-shadow-xs font-serif">[{{
              $t(logoName) }}]</span>
        </a>
      </h1>
      <div class="rotate-[-2] flex flex-col gap-2">
        <div class="flex gap-3 items-center">
          <div>
            <Volume2 v-if="sliderValue[0] > 0" @click="sliderValue = [0]" class="cursor-pointer text-ink-black" />
            <VolumeOff v-else @click="sliderValue = [100]" class="cursor-pointer text-ink-black" />
          </div>
          <SliderRoot v-model="sliderValue" class="relative flex items-center w-[60%] h-2" :default-value="[50]"
            orientation="horizontal">
            <SliderTrack class="relative w-[100px] h-2 rounded-full bg-primary">
              <SliderRange class="absolute" />
            </SliderTrack>
            <SliderThumb class="block w-4 h-4 rounded-full cursor-pointer bg-primary border-2 border-strong" />
          </SliderRoot>
        </div>
        <div class="flex gap-3 items-center">
          <h2 class="text-sm mr-.5 text-ink-black block">語言：</h2>
          <Switch v-model="toggleLanguage" class="relative flex justify-center gap-5 cursor-pointer"
            @click="toggleLanguage ? locale = 'en-US' : locale = 'zh-TW'">
            <span class="text-sm mr-.5 text-ink-black block">繁</span>
            <span class="text-sm text-ink-black block">EN</span>
            <div>
              <img v-if="toggleLanguage" :src="redCircle" class="w-5 h-5 absolute top-0 left-0"></img>
              <img v-else :src="redCircle" class="w-5 h-5 absolute top-2/12 left-6/12"></img>
            </div>
          </Switch>
        </div>

        <div>
          <h2 class="text-sm mr-.5 text-ink-black block">切換主題色：</h2>
          <Switch v-model="isToggleDark" @click="toggleColor" class="relative flex justify-center gap-5 cursor-pointer">
            <SunIcon class="size-5 text-orange-500 block z-10" />
            <MoonIcon class="size-4 text-gray-500 block z-10" />
            <div>
              <img v-if="isToggleDark" :src="redCircle" class="w-5 h-5 absolute top-2/12 left-6/12" />
              <img v-else :src="redCircle" class="w-5 h-5 absolute top-0 left-0" />
            </div>
          </Switch>
        </div>

      </div>
    </div>

    <DisclosurePanel class="sm:hidden" v-slot="{ close }">
      <div class="space-y-1 px-2 pb-3 pt-3 shadow-2xl w-full fixed top-30 z-50 bg-paper">
        <a v-for="item in navigation" :key="item.i18nName" :href="item.path" @click="close()"
          class="block rounded-md px-3 py-2 text-base font-medium text-inverse hover:bg-surface hover:text-paper">
          {{ $t(item.i18nName) }}
        </a>
        <!-- <a href="https://raylanraylan.github.io/blog/" target="_blank" class="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium flex gap-1 items-center dark:text-white">
          <span>{{ $t('blog_link') }}</span>
          <ArrowTopRightOnSquareIcon class="size-4"></ArrowTopRightOnSquareIcon>
        </a> -->
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style>
.menu-container {
  position: relative;
}

.menu-trigger {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-trigger:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.menu-trigger svg {
  width: 24px;
  height: 24px;
  fill: white;
}

.menu-dropdown {
  position: absolute;
  top: 0;
  right: 100px;
  /* margin-top: 8px; */
  background: rgba(255, 255, 255);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  min-width: 360px;
  /* opacity: 0; */
  /* visibility: hidden; */
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

/* .menu-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        } */

.menu-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-title {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
}

.menu-subtitle {
  font-size: 13px;
  color: #718096;
}

.constellation-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.constellation-item {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.5);
}

.constellation-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.constellation-info {
  flex: 1;
}

.constellation-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
}

.constellation-date {
  font-size: 11px;
  opacity: 0.7;
}

.menu-note {
  text-align: center;
  font-size: 11px;
  color: #a0aec0;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.selected-count {
  color: #667eea;
  font-weight: 600;
}
</style>