<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-select-v2 v-bind="slotProps">
        <template v-for="(_, slotName) in $slots" #[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </el-select-v2>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { defineProps } from 'vue';

import { CommonSelectOption } from '@typings';

type Props = {
  items: CommonSelectOption[];
};

defineProps<Props>();
</script>
