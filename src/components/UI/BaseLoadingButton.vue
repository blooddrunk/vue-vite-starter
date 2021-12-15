<template>
  <el-button
    :loading="isPending"
    :disabled="isPending"
    :size="size"
    :type="type"
    :plain="plain"
    @click="handleButtonClick"
  >
    <slot v-if="isPending" name="loading"> </slot>
    <slot v-else></slot>
  </el-button>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, toRefs } from 'vue';
import { ElMessageBox } from 'element-plus';

import { useAsyncFn } from '@/hooks/useAsyncFn';
import { ElementPlusSize, ElementPlusButtonType } from '@typings';

type Props = {
  action: () => Promise<void>;
  confirmText?: string;
  size?: ElementPlusSize;
  type?: ElementPlusButtonType;
  plain?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  confirmText: '',
  size: 'mini',
  type: 'text',
  plain: false,
});

const { size, type, plain } = toRefs(props);

const { isPending, execute } = useAsyncFn(props.action());
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
