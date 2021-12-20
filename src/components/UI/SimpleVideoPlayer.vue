<template>
  <div class="tw-relative" @click="togglePlay">
    <video
      ref="video"
      crossorigin="anonymous"
      class="tw-w-full tw-h-full tw-bg-light"
      object-fit="cover"
    ></video>

    <div
      v-if="!playing"
      class="tw-absolute tw-inset-0 tw-bg-white/25 tw-flex tw-items-center tw-justify-center"
    >
      <IconPlay size="32"></IconPlay>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, onMounted, ref, watch } from 'vue';
import { useMediaControls } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    url: string;
    active?: boolean;
  }>(),
  {
    active: false,
  }
);

const video = ref<HTMLVideoElement>();
const { playing, volume, onSourceError } = useMediaControls(video, {
  src: props.url,
});

const togglePlay = () => {
  playing.value = !playing.value;
};

onSourceError((error) => {
  // TODO error dealing
  console.error(error);
});

onMounted(() => {
  volume.value = 0;

  watch(
    () => props.active,
    (value) => {
      playing.value = value;
    }
  );
});
</script>
