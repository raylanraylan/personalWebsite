<script setup lang="ts">
import { ref,computed } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { useI18n } from 'vue-i18n';
import Button from '../ui/button/Button.vue';

const { tm,locale } = useI18n();
const isOpen = ref(false);
const formData = ref({
  name: '',
  email: '',
  content: ''
});
const isEmptyContent = computed(()=>
  !formData.value.name || !formData.value.email || !formData.value.content
);

const isSuccessSubmit = ref(false);

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

async function submitData(e) {
  const data = new FormData(e.target);        
  for (const value of data.values()) {
   if (value==='') return; 
  }
  
  try {
    const data = new FormData(e.target);        
    const res = await fetch('https://formspree.io/f/mblrnwjb', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      e.target.reset();
      isSuccessSubmit.value = true;
      openModal();
    }
    // } else {
    //   const json = await res.json();
    //   if (Object.hasOwn(json, 'errors')) {
    //     const errors = json.errors.map((error) => error.message).join(', ');
    //     throw new Error(errors);
    //   } else {
    //     throw new Error('Uh-oh! There was a problem submitting your form.');
    //   }
    // }
  } catch (err) {
    console.error(err);
    isSuccessSubmit.value = false;
    openModal();
  }
}
</script>
<template>
   <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel v-if="isSuccessSubmit"
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
              {{ $t('contact.submitResult.success.title') }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ $t('contact.submitResult.success.content') }}
                </p>
              </div>

              <div class="mt-4 flex justify-center">
                <button
                  type="button"
                  class="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-white dark:text-gray-900"
                  @click="closeModal"
                >
                {{ $t('contact.submitResult.close')}}
                </button>
              </div>
            </DialogPanel>
            <DialogPanel v-else
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ $t('contact.submitResult.fail.title') }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{ $t('contact.submitResult.fail.content') }}
                </p>
                <a href="mailto:startup9043672@gmail.com" class="mt-2 text-lg text-center block">startup9043672@gmail.com</a>
              </div>

              <div class="mt-4 flex justify-center">
                <button
                  type="button"
                  class="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-white dark:text-gray-900"
                  @click="closeModal"
                >
                  {{ $t('contact.submitResult.close')}}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
  
  <section class="bg-paper">
    <h2 class="text-3xl text-inverse text-center mb-3">{{ $t("contact.title") }}</h2>
    <h3 class="text-inverse text-center mb-3">{{ $t("contact.description") }}</h3>
    <div class="flex gap-5">
      <div class="p-10 bg-paper-dark relative rotate-1 shadow-[3px_3px_3px_0px_rgba(90,40,15,1)]">
        <div class="w-5 h-5 rounded-xl bg-red-400 absolute top-3 left-[40%] shadow-[1px_1px_0_0_rgb(198,70,70)] before:content-[''] before:block before:w-full before:h-full before:rounded-xl before:shadow-[-1px_-1px_0_0_rgba(255,255,255,.3)]"></div>
        <h4 class="mb-5 text-on-paper text-xl text-center">{{ $t("contact.contactMethods.title") }}</h4>
        <div v-for="method in tm('contact.contactMethods.items')" class="border-l-4 pl-3 mb-5 last:mb-0">
          <h5 class="text-on-paper-muted text-sm">{{ method.method }}</h5>
          <a :href="method.method==='Email'? `mailto:${method.value}` : method.value" target="_blank" rel="noopener noreferrer" class="underline text-on-paper">
            {{ method.value }}
          </a>
        </div>
      </div>
      <form @submit.prevent="submitData" class="p-10 w-full space-y-5 bg-paper-dark relative shadow-[5px_5px_5px_0px_rgba(90,40,15,1)]">
        <div class="w-5 h-5 rounded-xl bg-red-400 absolute top-2 left-[10%] shadow-[1px_1px_0_0_rgb(198,70,70)] before:content-[''] before:block before:w-full before:h-full before:rounded-xl before:shadow-[-1px_-1px_0_0_rgba(255,255,255,.3)]"></div>
        <div class="w-5 h-5 rounded-xl bg-red-400 absolute -top-2 left-[90%] shadow-[1px_1px_0_0_rgb(198,70,70)] before:content-[''] before:block before:w-full before:h-full before:rounded-xl before:shadow-[-1px_-1px_0_0_rgba(255,255,255,.3)]"></div>

        <h4 class="mb-5 text-on-paper text-xl text-center">{{ $t("contact.formTitle") }}</h4>
        <div class="sm:w-72 mx-auto">
          <label for="name" class="block text-sm text-on-paper-muted font-medium leading-6">{{ $t("contact.name") }}</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-400 sm:max-w-md">
              <input type="text" name="name" id="name" autocomplete="name" v-model="formData.name" class="block flex-1 border-0 bg-transparent text-on-paper p-2 placeholder:text-gray-400 focus:ring-0 focus-visible:outline-0 sm:text-sm sm:leading-6"/>
            </div>
          </div>
        </div>

        <div class="sm:w-72 mx-auto">
          <label for="email" class="block text-sm text-on-paper-muted font-medium leading-6">{{ $t("contact.email") }}</label>
          <div class="mt-2">
            <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-400 sm:max-w-md">
              <input type="email" name="email" id="email" v-model="formData.email" class="block flex-1 border-0 bg-transparent text-on-paper p-2 placeholder:text-gray-400 focus:ring-0 focus-visible:outline-0 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div class="sm:w-72 mx-auto">
          <label for="content" class="block text-sm text-on-paper-muted font-medium leading-6">{{ $t("contact.content") }}</label>
          <div class="mt-2">
            <textarea id="content" name="content" rows="3" v-model="formData.content" class="block w-full rounded-md border-0 p-2 text-on-paper shadow-sm ring-1 ring-inset ring-gray-300 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 focus-visible:outline-0 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <!-- <button class="flex items-center justify-center gap-x-6 mx-auto rounded-md px-3.5 py-2.5 text-sm font-semibold text-inverse" type="submit" :disable="isOpen">{{ $t("contact.sendForm") }}</button> -->
        <Button class="flex items-center justify-center mx-auto" :class="isEmptyContent?'':'bg-gray-300 text-gray-600 hover:bg-gray-300 hover:text-gray-600 hover:cursor-not-allowed'" type="submit" :disable="isOpen||isEmptyContent">{{ $t("contact.sendForm") }}</Button>
      </form>
    </div>
  </section>

</template>