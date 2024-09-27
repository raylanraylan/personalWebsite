<script setup lang="ts"></script>
<template>
  <form class="w-full space-y-5 dark:text-white">
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

    <button class="flex items-center justify-center gap-x-6 mx-auto rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 dark:bg-white dark:text-gray-900" type="submit">{{ $t("contact.sendForm") }}</button>
  </form>
</template>