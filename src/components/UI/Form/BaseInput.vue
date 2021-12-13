<template>
  <el-form-item
    :label="label"
    :label-width="labelWidth"
    :error="errorMessage"
    :validate-status="validateStatus"
    :required="required"
  >
    <el-input v-bind="fieldProps">
      <template v-for="(index, slotName) in $slots" #[slotName]>
        <slot :name="slotName"></slot>
      </template>
    </el-input>
  </el-form-item>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { withDefaults, defineProps, useAttrs, computed } from 'vue';
import { reactivePick } from '@vueuse/core';

import { useFormField, ValidationMode } from '@/hooks/useFormField';

type Props = {
  name: string;
  label?: string;
  showLabel?: boolean;
  labelWidth?: string;
  mode?: ValidationMode;
  validateOnMount?: boolean;
  required?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  label: '',
  showLabel: true,
  labelWidth: undefined,
  mode: 'aggressiveIfInvalid',
  validateOnMount: false,
  required: false,
});

const label = props.showLabel ? props.label : undefined;

const { listeners, errorMessage, value, validateStatus } = useFormField<
  string | number
>({
  ...reactivePick(props, 'name', 'label', 'mode', 'validateOnMount'),
});

const fieldProps = computed(() => ({
  ...listeners.value,
  name: props.name,
  modelValue: value.value,
  ...useAttrs(),
}));
</script>
