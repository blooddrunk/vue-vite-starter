<template>
  <el-button
    :loading="isLoading"
    :disabled="isLoading"
    :size="size"
    :type="type"
    :plain="plain"
    @click="handleButtonClick"
  >
    <slot v-if="isLoading && hasLoadingSlot" name="loading"> </slot>
    <slot v-else></slot>
  </el-button>
</template>

<script lang="ts" setup>
import { ElMessageBox, ComponentSize, ButtonType } from 'element-plus';

const slots = useSlots();
const hasLoadingSlot = computed(() => !!slots.loading);

type Props = {
  action: () => Promise<void>;
  confirmText?: string;
  size?: ComponentSize;
  type?: ButtonType;
  plain?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  confirmText: '',
  size: 'small',
  type: 'text',
  plain: false,
});

const { isLoading, execute } = useAsyncState<any>(props.action, null, {
  immediate: false,
});
const handleButtonClick = async () => {
  if (props.confirmText) {
    try {
      await ElMessageBox.confirm(props.confirmText, '提示', {
        type: 'warning',
      });

      execute();
    } catch (error) {
      // cancel
    }
  } else {
    execute();
  }
};
</script>
