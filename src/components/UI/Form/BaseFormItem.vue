<template>
  <el-form-item
    :label="label"
    :label-width="labelWidth"
    :error="errorMessage"
    :validate-status="validateStatus"
    :required="required"
  >
    <slot v-bind="fieldProps"></slot>
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
  name?: string;
  label?: string;
  showLabel?: boolean;
  labelWidth?: string;
  mode?: ValidationMode;
  validateOnMount?: boolean;
  required?: boolean;
  hasWrapper?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  name: '',
  label: '',
  showLabel: true,
  labelWidth: undefined,
  mode: 'aggressiveIfInvalid',
  validateOnMount: false,
  required: false,
  hasWrapper: true,
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
