<template>
  <component :is="tag" class="tw-flex tw-items-center" :to="route">
    <img :class="classMap.logo" src="@/assets/logo.png" alt="logo" />
    <h1
      :class="classMap.text"
      class="tw-ml-3 tw-text-white tw-font-semibold tw-tracking-wide"
    >
      {{ $appName }}
    </h1>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  name: 'AppName',

  props: {
    size: {
      type: String as PropType<'normarl' | 'large'>,
      default: 'normal',
    },

    isLink: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const tag = computed(() => (props.isLink ? 'router-link' : 'header'));
    const route = computed(() => (props.isLink ? '/' : undefined));
    const classMap = computed(() =>
      props.size === 'large'
        ? {
            logo: 'tw-h-12 tw-w-12',
            text: 'tw-text-5xl',
          }
        : {
            logo: 'tw-h-6 tw-w-6',
            text: 'tw-text-2xl',
          }
    );

    return {
      tag,
      route,
      classMap,
    };
  },
});
</script>
