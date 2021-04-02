<template>
  <Promised :promise="promise">
    <template #combined="{ isPending }">
      <el-button
        v-bind="buttonProps"
        :loading="isPending"
        :disabled="isPending"
      >
        <slot v-if="isPending"></slot>
        <slot v-else name="loading"></slot>
      </el-button>
    </template>
  </Promised>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { ElementPlusSize, ElementPlusButtonType } from '@/utils/typings';

type ButtonProps = Partial<{
  size: ElementPlusSize;
  type: ElementPlusButtonType;
  plain: boolean;
}>;

export default defineComponent({
  props: {
    action: {
      type: Function as PropType<() => Promise<void>>,
      required: true,
    },

    buttonProps: {
      type: Object as PropType<ButtonProps>,
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

    const promise = computed(() => props.action());

    return {
      buttonProps,
      promise,
    };
  },
});
</script>
