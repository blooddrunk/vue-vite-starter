<template>
  <el-button v-bind="buttonProps" :loading="isLoading" :disabled="isLoading">
    <slot v-if="!isLoading"></slot>
  </el-button>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

import { ElementPlusSize, ElementPlusButtonType } from '@typings';

type ButtonProps = Partial<{
  size: ElementPlusSize;
  type: ElementPlusButtonType;
  plain: boolean;
}>;

type RowProps = {
  row: {
    loading: boolean;
    [x: string]: any;
  };
  $index: number;
};

type Props = {
  buttonProps?: ButtonProps;
  rowProps: RowProps;
};

const props = defineProps<Props>();

const buttonProps = computed(() =>
  Object.assign(
    {},
    {
      type: 'text',
      size: 'mini',
    },
    props.buttonProps
  )
);

const isLoading = computed(() => props.rowProps.row.loading);
</script>
