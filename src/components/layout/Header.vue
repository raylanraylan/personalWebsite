<script setup lang="ts">
import { computed, ref,watch,onMounted } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Switch} from '@headlessui/vue'
import PersonalWebLogo from '@/assets/PersonalWebLogo.vue'
import { RouterLink } from 'vue-router';
import { SunIcon,MoonIcon,ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { locale }  = useI18n({ useScope: 'global' })
const route = useRoute();

const toggleLanguage = ref(false) , isToggleDark = ref(false)
const navigation = [
  { i18nName: 'home_link', path: '/'},
  { i18nName: 'about_link', path: '/about'},
  { i18nName: 'projects_link', path: '/projects'},
  { i18nName: 'contact_link', path: '/contact'},
]

const closeMenu = ref("bg-gray-500 w-full h-1 relative before:content-[''] before:block before:bg-gray-500 before:w-full before:h-1 before:absolute before:top-[-0.5rem] before:duration-300 after:content-[''] after:block after:bg-gray-500 after:w-full after:h-1 after:absolute after:bottom-[-0.5rem] after:duration-300");
const openMenu = ref("transparent w-full h-1 relative before:content-[''] before:block before:bg-gray-500 before:w-full before:h-1 before:absolute before:top-0 before:rotate-[135deg] before:duration-300 after:content-[''] after:block after:bg-gray-500 after:w-full after:h-1 after:absolute after:bottom-0 after:duration-300 after:rotate-45")

function toggleColor(){
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

watch(isToggleDark, updateTheme)

onMounted(() => {
  isToggleDark.value = localStorage.getItem('darkMode') === 'true'
  updateTheme()
})

</script>

<template>
  <Disclosure as="nav" v-slot="{ open }">    
    <div class="mx-auto max-w-7xl px-[5vw] py-5">
      <div class="relative flex h-16 items-center justify-between">
        <div class="w-full inset-y-0 left-0 flex">
          <h1 class="flex flex-1 items-center">
            <RouterLink to='/'>
              <!-- <img class="h-8 w-auto" :src="personalWebLogo" alt="logo" /> -->
              <PersonalWebLogo class="h-8 w-auto" :lineColor="isToggleDark?'#fcfcfc':'#1f2937'"/>
            </RouterLink>
          </h1>
          <!-- Mobile menu button-->
          <DisclosureButton class="w-10 h-10 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden" >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <span :class="open?openMenu:closeMenu"></span>
          </DisclosureButton>
          <div class="hidden sm:block flex-1">
            <div class="flex space-x-4 whitespace-nowrap">
              <RouterLink v-for="item in navigation" :key="item.i18nName" :to="item.path" :class="[item.path===route.fullPath ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']">{{ $t(item.i18nName) }}
              </RouterLink>
              <a class="flex gap-1 items-center rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-700 hover:text-white" href="https://raylanraylan.github.io/blog/" target="_blank">
                <span>{{ $t('blog_link') }}</span>
                <ArrowTopRightOnSquareIcon class="size-4"></ArrowTopRightOnSquareIcon>
              </a>
            </div>
          </div>
          <div class="flex flex-1 gap-3 items-center justify-end">
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
              v-model="isToggleDark"
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
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 shadow-lg">
        <DisclosureButton class="w-full" :aria-current="item.path===route.fullPath ? 'page' : undefined" v-for="item in navigation" :key="item.i18nName" as="a" :class="[item.path===route.fullPath ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']">
          <RouterLink :to="item.path">{{ $t(item.i18nName) }}</RouterLink>
        </DisclosureButton>
        <a href="https://raylanraylan.github.io/blog/" target="_blank" class="text-gray-500 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium flex gap-1 items-center">
          <span>{{ $t('blog_link') }}</span>
          <ArrowTopRightOnSquareIcon class="size-4"></ArrowTopRightOnSquareIcon>
        </a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

