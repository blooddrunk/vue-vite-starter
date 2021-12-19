<template>
  <div>
    <a
      :class="buttonClass"
      class="tw-max-w-40 tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-shadow tw-shadow-primary tw-rounded tw-bg-white"
      @click.prevent="togglePickerVisible()"
    >
      <span class="tw-truncate">{{ displayValue }}</span>
      <IconRight class="tw-ml-2"></IconRight>
    </a>

    <van-popup
      v-model:show="isPickerVisible"
      position="bottom"
      close-on-popstate
      :lazy-render="false"
    >
      <van-area
        ref="areaPicker"
        :value="value"
        :area-list="areaList"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      ></van-area>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import {
  withDefaults,
  defineProps,
  defineEmits,
  ref,
  toRef,
  computed,
  onMounted,
} from 'vue';
import { useToggle } from '@vueuse/core';
import { areaList } from '@vant/area-data';
import type { AreaInstance } from 'vant';

type Props = {
  modelValue?: string;
  placeholder?: string;
};

type Item = {
  code?: string;
  name: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: '310000',
  placeholder: '省/市/区',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): string;
}>();

const value = toRef(props, 'modelValue');
const isPickerVisible = ref(false);
const togglePickerVisible = useToggle(isPickerVisible);
const selectedAreaList = ref<Item[]>([]);
const isEmpty = computed(() => !selectedAreaList.value.length);
('');
const displayValue = computed(() =>
  isEmpty.value
    ? props.placeholder
    : selectedAreaList.value.map((item) => item.name).join('/')
);
const buttonClass = computed(() =>
  isEmpty.value ? 'tw-text-medium' : 'tw-text-primary'
);

const areaPicker = ref<AreaInstance>();
const getCurrentArea = () => areaPicker.value?.getArea?.();
onMounted(() => {
  const currentArea = getCurrentArea();
  if (currentArea) {
    selectedAreaList.value = [
      { name: currentArea.province },
      { name: currentArea.city },
      { name: currentArea.county },
    ];
  }
});

const handleCancel = () => {
  togglePickerVisible(false);
};

const handleConfirm = (items: Item[]) => {
  selectedAreaList.value = items;
  const currentArea = getCurrentArea();
  if (currentArea) {
    emit('update:modelValue', currentArea.code);
  }
  togglePickerVisible(false);
};
</script>
