<template>
  <div
    class="tw-relative tw-text-white"
    :class="wrapperClass"
    @click="togglePlay"
  >
    <video
      ref="video"
      class="tw-w-full tw-h-full tw-bg-slate-300"
      object-fit="cover"
      v-bind="$attrs"
    ></video>

    <a
      v-if="playing"
      class="tw-absolute tw-right-2 tw-bottom-2"
      @click.prevent.stop="toggleMuted"
    >
      <IconVolumeMute v-if="muted" size="18"></IconVolumeMute>
      <IconVolumeNotice v-else size="18"></IconVolumeNotice>
    </a>
    <div
      v-else
      class="tw-absolute tw-inset-0 tw-bg-white/25 tw-flex tw-items-center tw-justify-center"
    >
      <IconCaution v-if="hasError" size="32"></IconCaution>
      <IconPlay v-else size="32"></IconPlay>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { withDefaults, defineProps, onMounted, ref, watch } from 'vue';
import { useMediaControls } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    url: string;
    active?: boolean;
    wrapperClass?: string;
  }>(),
  {
    active: false,
    wrapperClass: '',
  }
);

const video = ref<HTMLVideoElement>();
const { playing, muted, onSourceError } = useMediaControls(video, {
  src: props.url,
});

const hasError = ref(false);
onSourceError(() => {
  hasError.value = true;
});

const togglePlay = () => {
  if (hasError.value) {
    return;
  }
  playing.value = !playing.value;
};

const toggleMuted = () => {
  muted.value = !muted.value;
};

onMounted(() => {
  muted.value = true;

  watch(
    () => props.active,
    (value) => {
      playing.value = value;
    }
  );
});
</script>
