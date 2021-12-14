<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="props">
      <el-input v-bind="props">
        <template v-for="(index, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-input>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
