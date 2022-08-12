<template>
  <div>
    <a
      :class="buttonClass"
      class="max-w-40 inline-flex items-center px-3 py-1.5 shadow shadow-primary rounded bg-white"
      @click.prevent="togglePickerVisible()"
    >
      <span class="truncate">{{ displayValue }}</span>
      <IconMdiChevronRight class="ml-2"></IconMdiChevronRight>
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
        :columns-placeholder="['请选择', '请选择', '请选择']"
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
  (e: 'update:modelValue', value: string): void;
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
    : selectedAreaList.value
        .map((item) => item.name)
        .filter((name) => !!name)
        .join('/')
);
const buttonClass = computed(() =>
  isEmpty.value ? 'text-medium' : 'text-primary'
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

const normalizeAreaItems = (items: Item[]) => items.filter((item) => !!item);
const handleConfirm = (items: Item[]) => {
  selectedAreaList.value = normalizeAreaItems(items);
  const currentArea = getCurrentArea();
  if (currentArea) {
    emit('update:modelValue', currentArea.code);
  }
  togglePickerVisible(false);
};
</script>
