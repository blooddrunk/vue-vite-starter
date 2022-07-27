<template>
  <el-table-v2 ref="tableRef" v-bind="$attrs">
    <template v-for="(_, slotName) in slots" #[slotName]>
      <slot :name="slotName"></slot>
    </template>

    <template v-if="loading" #overlay>
      <div
        class="absolute inset-0 grid place-content-center z-50 transition bg-white/80 dark:bg-slate-800/95"
      >
        <icon-mdi-loading class="animate-spin"></icon-mdi-loading>
      </div>
    </template>
  </el-table-v2>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import type { TableV2Instance } from 'element-plus';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { overlay, ...slots } = useSlots();

const tableRef = ref<TableV2Instance>();
defineExpose({
  tableRef,
});

type Props = {
  loading: boolean;
};
withDefaults(defineProps<Props>(), {
  loading: false,
});
</script>
