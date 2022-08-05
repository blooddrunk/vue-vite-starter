<template>
  <el-form-item
    :class="{ 'is-required': required }"
    :label="label"
    :label-width="labelWidth"
    :error="errorMessage"
    :validate-status="validateStatus"
  >
    <slot v-bind="fieldProps"></slot>
  </el-form-item>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { withDefaults, defineProps, useAttrs, computed } from 'vue';
import { reactivePick } from '@vueuse/core';

import type { ValidationMode } from '@/composables/useFormField';

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

const { listeners, errorMessage, value, meta } = useFormField<any>({
  ...reactivePick(props, 'name', 'label', 'mode', 'validateOnMount'),
});

const validateStatus = computed(() => {
  if (errorMessage.value) {
    return 'error';
  } else if (meta.pending) {
    return 'validating';
  } else if (meta.dirty) {
    return 'success';
  } else {
    return '';
  }
});

const fieldProps = computed(() => ({
  ...listeners.value,
  modelValue: value.value,
  ...useAttrs(),
}));
</script>
