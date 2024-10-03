<script setup lang="ts">
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = ref(false);
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
  <form @submit.prevent="submitData" class="w-full space-y-5 dark:text-white">
    <h2 class="text-4xl text-center">{{ $t("contact.title") }}</h2>
    <h3 class="text-xl text-center">{{ $t("contact.description") }}</h3>
    <div class="sm:w-72 mx-auto">
      <label for="name" class="block text-sm font-medium dark:text-white leading-6 text-gray-900">{{ $t("contact.name") }}</label>
      <div class="mt-2">
        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-400 sm:max-w-md">
          <input type="text" name="name" id="name" autocomplete="name" class="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus-visible:outline-0 sm:text-sm sm:leading-6"/>
        </div>
      </div>
    </div>

    <div class="sm:w-72 mx-auto">
      <label for="email" class="block text-sm font-medium dark:text-white leading-6 text-gray-900">{{ $t("contact.email") }}</label>
      <div class="mt-2">
        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-400 sm:max-w-md">
          <input type="email" name="email" id="email" class="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus-visible:outline-0 sm:text-sm sm:leading-6" />
        </div>
      </div>
    </div>

    <div class="sm:w-72 mx-auto">
      <label for="content" class="block text-sm font-medium dark:text-white leading-6 text-gray-900">{{ $t("contact.content") }}</label>
      <div class="mt-2">
        <textarea id="content" name="content" rows="3" class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-400 focus-visible:outline-0 sm:text-sm sm:leading-6" />
      </div>
    </div>

    <button class="flex items-center justify-center gap-x-6 mx-auto rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 dark:bg-white dark:text-gray-900" type="submit" :disable="isOpen">{{ $t("contact.sendForm") }}</button>
  </form>
</template>