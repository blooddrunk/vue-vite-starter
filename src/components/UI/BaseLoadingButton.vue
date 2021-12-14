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

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { ElMessageBox } from 'element-plus';

import { useAsyncFn } from '@/hooks/useAsyncFn';
import { ElementPlusSize, ElementPlusButtonType } from '@typings';

type ButtonProps = Partial<{
  size: ElementPlusSize;
  type: ElementPlusButtonType;
  plain: boolean;
}>;

type Props = {
  confirmText?: string;
  action: () => Promise<void>;
  buttonProps?: ButtonProps;
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
</script>
