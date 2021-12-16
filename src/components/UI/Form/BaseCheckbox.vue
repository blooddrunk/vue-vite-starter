<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="props">
      <el-checkbox v-bind="props">
        <template v-for="(index, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-checkbox>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
});
</script>
