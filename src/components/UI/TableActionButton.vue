<template>
  <el-button v-bind="buttonProps" :loading="isLoading" :disabled="isLoading">
    <slot v-if="!isLoading"></slot>
  </el-button>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { ElementPlusSize, ElementPlusButtonType } from '@/utils/typings';

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

export default defineComponent({
  name: 'TableActionButton',

  props: {
    buttonProps: {
      type: Object as PropType<ButtonProps>,
    },

    rowProps: {
      type: Object as PropType<RowProps>,
      required: true,
    },
  },

  setup(props) {
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

    return {
      buttonProps,
      isLoading,
    };
  },
});
</script>
