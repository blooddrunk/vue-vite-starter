<template>
  <el-table-v2 v-bind="$attrs">
    <template v-for="(index, slotName) in slots" #[slotName]>
      <slot :name="slotName"></slot>
    </template>

    <template #overlay>
      <div
        class="absolute inset-0 grid place-content-center z-50 transition-opacity bg-[var(--el-mask-color)]"
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
const { overlay, ...slots } = useSlots;

type Props = {
  loading: boolean;
};
</script>
