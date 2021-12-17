<template>
  <div>
    <a
      :class="buttonClass"
      class="tw-max-w-40 tw-inline-flex tw-items-center tw-px-3 tw-py-1.5 tw-shadow tw-shadow-primary tw-rounded"
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
import { withDefaults, defineProps, ref, computed, onMounted } from 'vue';
import { useToggle } from '@vueuse/core';
import { areaList } from '@vant/area-data';
import type { AreaInstance } from 'vant';

type Props = {
  placeholder?: string;
};

type Item = {
  code?: string;
  name: string;
};

const props = withDefaults(defineProps<Props>(), {
  placeholder: '省/市/区',
});

const isPickerVisible = ref(false);
const togglePickerVisible = useToggle(isPickerVisible);
const value = ref('330000');
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
onMounted(() => {
  const currentArea = areaPicker.value?.getArea?.();
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
  console.log(items);
  selectedAreaList.value = items;
  togglePickerVisible(false);
};
</script>
