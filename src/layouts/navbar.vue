<template>
  <main
    class="tw-h-screen tw-bg-light tw-pt-[46px]"
    :class="hasTabbar && 'tw-pb-[50px]'"
  >
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

    <TheTabbar v-if="hasTabbar"></TheTabbar>
  </main>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ hasTabbar?: boolean }>(), {
  hasTabbar: false,
});

const router = useRouter();
const navBack = () => {
  router.back();
};

const route = useRoute();
const meta = computed(() => route.meta);
</script>
