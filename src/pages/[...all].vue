<template>
  <section
    class="tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center"
  >
    <h3 class="tw-text-5xl tw-font-bold tw-py-6">404 NOT FOUND</h3>
    <p class="tw-mt-6">
      <router-link to="/"> 返回首页 </router-link>
    </p>
  </section>
</template>

<route lang="yaml">
meta:
  layout: error
</route>
