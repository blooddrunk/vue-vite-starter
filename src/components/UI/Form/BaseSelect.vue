<template>
  <BaseFormItem v-bind="$attrs">
    <template #default="slotProps">
      <el-select v-bind="slotProps">
        <el-option
          v-for="item in props.items"
          :key="item.value"
          v-bind="item"
        ></el-option>
      </el-select>
    </template>
  </BaseFormItem>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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

const props = defineProps<Props>();
</script>
