<template>
  <main class="tw-h-screen tw-bg-light tw-pt-[46px]">
    <van-nav-bar
      class="!tw-fixed tw-left-0 tw-top-0 tw-right-0"
      :title="meta.title"
      :left-arrow="meta.canNavBack"
      @click-left="navBack"
    >
    </van-nav-bar>

    <div class="tw-h-full tw-overflow-y-auto">
      <router-view></router-view>
    </div>
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
