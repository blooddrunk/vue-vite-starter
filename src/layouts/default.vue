<template>
  <main class="tw-h-screen tw-p-6 tw-overflow-y-auto dark:tw-bg-gray-800">
    <section class="tw-flex tw-flex-col tw-items-center tw-pt-20">
      <router-link to="/">
        <h2
          class="tw-flex tw-items-center tw-py-5 tw-text-3xl tw-text-primary tw-font-bold"
        >
          <IconHome></IconHome>
          <span class="tw-ml-1">Vue 3</span>
        </h2>
      </router-link>

      <div class="tw-container">
        <router-view></router-view>
      </div>
    </section>
  </main>
</template>
