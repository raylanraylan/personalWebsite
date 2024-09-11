<script setup lang="ts">
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Switch} from '@headlessui/vue'
import personalWebLogo from '@/assets/personalWebLogo.svg'
import { RouterLink } from 'vue-router';
import { SunIcon,MoonIcon } from '@heroicons/vue/24/solid';
import { useRoute } from 'vue-router'
const route = useRoute();

const toggleLanguage = ref(false)
const toggleColorMode = ref(true)
const navigation = [
  { name: 'Home', path: '/'},
  { name: 'About', path: '/about'},
  { name: 'Projects', path: '/projects'},
  { name: 'Contact', path: '/contact'},
  { name: 'Blog', path: '/blog'},
]

const closeMenu = ref("bg-gray-500 w-full h-1 relative before:content-[''] before:block before:bg-gray-500 before:w-full before:h-1 before:absolute before:top-[-0.5rem] before:duration-300 after:content-[''] after:block after:bg-gray-500 after:w-full after:h-1 after:absolute after:bottom-[-0.5rem] after:duration-300");
const openMenu = ref("transparent w-full h-1 relative before:content-[''] before:block before:bg-gray-500 before:w-full before:h-1 before:absolute before:top-0 before:rotate-[135deg] before:duration-300 after:content-[''] after:block after:bg-gray-500 after:w-full after:h-1 after:absolute after:bottom-0 after:duration-300 after:rotate-45")


</script>

<template>
  <Disclosure as="nav" class="dark:bg-gray-800" v-slot="{ open }">    
    <div class="mx-auto max-w-7xl px-[5vw] py-5">
      <div class="relative flex h-16 items-center justify-between">
        <div class="w-full inset-y-0 left-0 flex">
          <div class="flex flex-1 items-center">
            <img class="h-8 w-auto" :src="personalWebLogo" alt="Your Company" />
          </div>
          <!-- Mobile menu button-->
          <DisclosureButton class="w-10 h-10 relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden" >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <span :class="open?openMenu:closeMenu"></span>
          </DisclosureButton>
          <div class="hidden sm:block flex-1">
            <div class="flex space-x-4">
              <RouterLink v-for="item in navigation" :key="item.name" :to="item.path" :class="[item.path===route.fullPath ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']">{{ item.name }}</RouterLink>
            </div>
          </div>
          <div class="flex flex-1 gap-3 items-center justify-end">
            <Switch
              v-model="toggleLanguage"
              :class="toggleLanguage ? 'bg-gray-500' : 'bg-gray-500'"
              class="relative inline-flex h-8 w-14 items-center rounded-full shadow-[inset_2px_2px_3px_0_rgba(0,0,0,.3)]"
            >
              <span class="sr-only">Enable notifications</span>
              <span
                :class="toggleLanguage ? 'translate-x-8' : 'translate-x-1'"
                class="h-5 w-5 transform rounded-full bg-white transition absolute top-1.5 shadow-lg"
              />
              <div class="mx-auto">
                <span class="text-sm mr-.5" :class="toggleLanguage?'text-white':'text-gray-500'">TW</span>
                <span class="text-sm" :class="toggleLanguage?'text-gray-500':'text-white'">EN</span>
              </div>
            </Switch>
            <Switch
              v-model="toggleColorMode"
              :class="toggleColorMode ? 'bg-amber-400 shadow-[inset_2px_2px_3px_0_rgba(200,70,40,0.7)]' : 'bg-gray-800 drop-shadow-lg'"
              class="relative inline-flex justify-center h-8 w-8 items-center rounded-full"
            >
              <span class="sr-only">Enable notifications</span>
              <SunIcon v-show="toggleColorMode" class="size-5 text-grey-500"></SunIcon>
              <MoonIcon v-show="!toggleColorMode" class="size-4 text-white"></MoonIcon>
              <!-- <span
                :class="toggleColorMode?'':'shadow-md'"
                class="inline-block h-4 w-9 mx-auto transform rounded-full bg-white transition"
              /> -->
            </Switch>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2 shadow-lg">
        <DisclosureButton class="w-full" :aria-current="item.current ? 'page' : undefined" v-for="item in navigation" :key="item.name" as="a" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"><RouterLink :to="item.path">{{ item.name }}</RouterLink></DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

