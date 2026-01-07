<script setup lang="ts">
import { ref,watch,onMounted,defineEmits,defineProps, nextTick,useTemplateRef, onBeforeUnmount } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Switch,Popover, PopoverButton, PopoverPanel} from '@headlessui/vue';
import PersonalWebLogo from '@/assets/PersonalWebLogo.vue'
import { RouterLink } from 'vue-router';
import { SunIcon,MoonIcon,StarIcon,ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
// import constellations from '@/constant/headerStarMapList.js'

const { locale }  = useI18n({ useScope: 'global' })
const emit = defineEmits<{
  heightSize:[size:number],
  addStarMapRender:[star:object]
}>()

const route = useRoute();

const toggleLanguage = ref<Boolean>(false);
const isToggleDark = ref<Boolean>(false);
const logoName = ref('logo_name');
const navigation = [
  { i18nName: 'home_link', path: '/'},
  { i18nName: 'about_link', path: '/about'},
  { i18nName: 'projects_link', path: '/projects'},
  { i18nName: 'contact_link', path: '/contact'},
]

const closeMenu = ref("bg-gray-500 w-full h-1 relative before:content-[''] before:block before:bg-gray-500 before:w-full before:h-1 before:absolute before:top-[-0.5rem] before:duration-300 after:content-[''] after:block after:bg-gray-500 after:w-full after:h-1 after:absolute after:bottom-[-0.5rem] after:duration-300");
const openMenu = ref("transparent w-full h-1 relative before:content-[''] before:block before:bg-gray-500 before:w-full before:h-1 before:absolute before:top-0 before:rotate-[135deg] before:duration-300 after:content-[''] after:block after:bg-gray-500 after:w-full after:h-1 after:absolute after:bottom-0 after:duration-300 after:rotate-45")

function toggleColor(){
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


const headerContainer = ref<HTMLDivElement>()

const observer = ref()
function getHeightValue(element:HTMLDivElement){
  observer.value = new ResizeObserver((entries)=>{
  const rect = entries[0].contentRect
  if (rect) {
    emit('heightSize',rect.height)
  }
  })
  observer.value.observe(element)
}

onMounted(() => {
  isToggleDark.value = localStorage.getItem('darkMode')==="true"?true:false
  updateTheme()
})

onBeforeUnmount(()=>{
  observer.value.unobserve();
})

</script>

<template>
  <Disclosure as="nav"  v-slot="{ open }">    
    <div ref="headerContainer" class="getHeaderSize">
      <div class="relative flex h-16 items-center justify-between">
        <h1 class="flex flex-1 items-center">
          <RouterLink to='/'>
            <span class="ml-2 font-medium text-lg text-primary">[{{ $t(logoName) }}]</span>
          </RouterLink>
        </h1>
        <!-- Mobile menu button-->
        <DisclosureButton class="w-10 h-10 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden" >
          <span class="absolute -inset-0.5" />
          <span class="sr-only">Open main menu</span>
          <span :class="open?openMenu:closeMenu"></span>
        </DisclosureButton>
        <div class="hidden sm:block">
          <div class="flex space-x-4 whitespace-nowrap">
            <RouterLink v-for="item in navigation" :key="item.i18nName" :to="item.path" :class="[item.path===route.fullPath ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-500 hover:bg-gray-700 hover:text-white dark:text-white', 'rounded-md px-3 py-2 text-sm font-medium']">{{ $t(item.i18nName) }}
            </RouterLink>
            <a class="flex gap-1 items-center rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-700 hover:text-white dark:text-white" href="https://raylanraylan.github.io/blog/" target="_blank">
              <span>{{ $t('blog_link') }}</span>
              <!-- <ArrowTopRightOnSquareIcon class="size-4"></ArrowTopRightOnSquareIcon> -->
            </a>
          </div>
        </div>
        <!-- buttons -->
        <div class="flex gap-3 flex-1 items-center justify-end">
          <Switch
            v-model="toggleLanguage"
            :class="toggleLanguage ? 'bg-gray-500' : 'bg-gray-500'"
            class="relative inline-flex h-8 w-14 items-center rounded-full shadow-[inset_2px_2px_3px_0_rgba(0,0,0,.3)]"
            @click="toggleLanguage?locale = 'en-US':locale = 'zh-TW'"
          >
            <span class="sr-only">Enable notifications</span>
            <span
              :class="toggleLanguage ? 'translate-x-8' : 'translate-x-1'"
              class="h-5 w-5 transform rounded-full bg-white transition absolute top-1.5 shadow-lg"
            />
            <div class="mx-auto">
              <span class="text-sm mr-.5" :class="toggleLanguage?'text-white':'text-gray-500'">繁</span>
              <span class="text-sm" :class="toggleLanguage?'text-gray-500':'text-white'">EN</span>
            </div>
          </Switch>
          <Switch
            :value="isToggleDark"
            :class="isToggleDark ?'bg-gray-100 drop-shadow-lg': 'bg-amber-400 shadow-[inset_2px_2px_3px_0_rgba(200,70,40,0.7)]'"
            class="relative inline-flex justify-center h-8 w-8 items-center rounded-full"
            @click="toggleColor"
          >
            <span class="sr-only">Enable notifications</span>
            <MoonIcon v-show="isToggleDark" class="size-4 text-grey-500"></MoonIcon>
            <SunIcon v-show="!isToggleDark" class="size-5 text-grey-500"></SunIcon>
          </Switch>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 shadow-lg">
        <RouterLink :to="item.path"  v-for="item in navigation" :key="item.i18nName">
          <DisclosureButton class="w-full" :aria-current="item.path===route.fullPath ? 'page' : undefined" as="a" :class="[item.path===route.fullPath ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-500 hover:bg-gray-700 hover:text-white dark:text-white', 'block rounded-md px-3 py-2 text-base font-medium']">
            {{ $t(item.i18nName) }}
          </DisclosureButton>
        </RouterLink>
        <a href="https://raylanraylan.github.io/blog/" target="_blank" class="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium flex gap-1 items-center dark:text-white">
          <span>{{ $t('blog_link') }}</span>
          <ArrowTopRightOnSquareIcon class="size-4"></ArrowTopRightOnSquareIcon>
        </a>
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
            z-index:1000;
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

        /* 星座圖案 SVG */
        .constellation-pattern {
            width: 100%;
            height: 100%;
        }

        .constellation-pattern .star {
            fill: currentColor;
        }

        .constellation-pattern .line {
            stroke: currentColor;
            stroke-width: 1;
            fill: none;
        }
</style>