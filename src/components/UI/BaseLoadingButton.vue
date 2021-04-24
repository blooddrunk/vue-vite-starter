<template>
  <el-button
    v-bind="buttonProps"
    :loading="isPending"
    :disabled="isPending"
    @click="handleButtonClick"
  >
    <slot v-if="isPending" name="loading"></slot>
    <slot v-else></slot>
  </el-button>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { ElMessageBox } from 'element-plus';

import { useAsyncFn } from '@/hooks/useAsyncFn';
import { ElementPlusSize, ElementPlusButtonType } from '@/utils/typings';

type ButtonProps = Partial<{
  size: ElementPlusSize;
  type: ElementPlusButtonType;
  plain: boolean;
}>;

export default defineComponent({
  props: {
    confirmText: {
      type: String,
    },

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

    const { isPending, execute } = useAsyncFn(props.action);
    const handleButtonClick = async () => {
      if (props.confirmText) {
        try {
          await ElMessageBox.confirm(props.confirmText, '提示', {
            type: 'warning',
          });
        } catch (error) {
          // cancel
        }
      }

      execute();
    };

    return {
      buttonProps,
      isPending,
      handleButtonClick,
    };
  },
});
</script>
