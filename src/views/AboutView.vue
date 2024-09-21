<template>
  <div class="flex gap-10 flex-col dark:text-white">
    <section>
      <h2 class="sm:text-4xl">Ray</h2>
      <p>{{ $t("about.position") }}</p>
    </section>
    <hr/>
    <section>
      <h2 class="text-2xl sm:text-4xl mb-3 font-bold">{{ $t("about.skills") }}</h2>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <h3 class="text-xl font-medium">{{ $t("about.skill.structureStyling") }}</h3>
          <ul class="text-sm">
            <li>HTML</li>
            <li>CSS</li>
            <li>RWD</li>
            <li>Sass</li>
            <li>Bootstrap 5</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-medium">{{ $t("about.skill.programmingFrameworks") }}</h3>
          <ul class="text-sm">
            <li>JavaScript ES6</li>
            <li>AJAX/Axios/Fetch</li>
            <li>Vue 3</li>
            <li>Vite</li>
            <li>Vue Router</li>
            <li>Pinia</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-medium">{{ $t("about.skill.versionControl") }}</h3>
          <ul class="text-sm">
            <li>Git</li>
          </ul>
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-2xl sm:text-4xl mb-3 font-bold">{{ $t("about.work-experience") }}</h2>
      <div class="flex flex-col gap-3">
        <div>
          <h3 class="flex text-xl gap-3">
            <span>{{ $t("about.company.legend") }}</span>
            <span>2024/5 - 2024/9</span>
          </h3>
          <h4 class="text-xs">{{ $t("about.position") }}</h4>
        </div>
        <div>
          <div>
            <h5 class="text-lg font-medium">{{ $t("about.work.legend.microBusiness.title") }}</h5>
            <ul class="list-disc ml-5 text-sm">
              <li>{{ $t("about.work.legend.microBusiness.identityManagement") }}</li>
              <li>{{ $t("about.work.legend.microBusiness.userExperience") }}</li>
            </ul>
          </div>
          <div>
            <h5 class="text-lg font-medium">{{ $t("about.work.legend.formProcess.title") }}</h5>
            <ul class="list-disc ml-5 text-sm">
              <li>{{ $t("about.work.legend.formProcess.webpagePlanning") }}</li>
              <li>{{ $t("about.work.legend.formProcess.basicStructure") }}</li>
            </ul>
          </div>
          <div>
            <h5 class="text-lg font-medium">{{ $t("about.work.legend.questionAndAnswer.title") }}</h5>
            <ul class="list-disc ml-5 text-sm">
              <li>{{ $t("about.work.legend.questionAndAnswer.intuitiveQA") }}</li>
              <li>{{ $t("about.work.legend.questionAndAnswer.webpagePlanning") }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 class="text-2xl sm:text-4xl mb-3 font-bold">{{ $t("about.education") }}</h2>
      <h3 class="text-xl font-medium">{{ $t("about.school") }}</h3>
      <p class="text-sm">{{ $t("about.school-department") }}</p>
    </section>
  </div>
</template>

<style>
</style>
