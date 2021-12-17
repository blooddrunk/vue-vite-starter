<template>
  <main class="tw-h-screen tw-bg-light tw-pt-[46px] tw-pb-[50px]">
    <van-nav-bar
      class="!tw-fixed tw-left-0 tw-top-0 tw-right-0"
      :title="meta.title"
      left-arrow
      @click-left="navBack"
    >
    </van-nav-bar>

    <div class="tw-h-full tw-overflow-y-auto tw-p-6">
      <router-view></router-view>
    </div>

    <TheTabbar></TheTabbar>
  </main>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const navBack = () => {
  router.back();
};

const route = useRoute();
const { meta } = route;
</script>
