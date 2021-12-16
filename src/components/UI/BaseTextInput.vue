<template>
  <div
    :class="[
      $style.input,
      wrapperClass,
      showValidationError && 'tw-relative tw-mb-4',
    ]"
  >
    <div
      :class="{
        [$style.control]: true,
        [$style.controlActive]: isFocused,
      }"
    >
      <label
        v-if="showLabel && hasLabel"
        :class="{ [$style.labelActive]: isLabelActive }"
        :for="name"
        @click="input!.focus()"
        @touchstart.stop="input!.focus()"
      >
        <slot name="label">
          <span>{{ label }}</span>
        </slot>
      </label>

      <input
        :id="name"
        ref="input"
        v-model="value"
        :placeholder="placeholder"
        v-bind="$attrs"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div v-if="$slots.append" class="tw-ml-auto tw-pl-1 tw-flex-shrink-0">
        <slot name="append"></slot>
      </div>
    </div>

    <p
      v-if="showValidationError && errorMessage"
      class="tw-absolute tw-top-full tw-left-0"
    >
      <span
        class="tw-px-2 tw-text-xs tw-text-red-500 tw-font-medium tw-leading-none"
      >
        <slot name="error" :error="errorMessage">
          {{ errorMessage }}
        </slot>
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import {
  withDefaults,
  defineProps,
  defineEmits,
  ref,
  computed,
  watchEffect,
  useSlots,
} from 'vue';

import { useFormField } from '@/hooks/useFormField';

type Props = {
  name: string;
  label?: string;
  showLabel?: boolean;
  modelValue?: string;
  placeholder?: string;
  showValidationError?: boolean;
  wrapperClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
  label: '',
  showLabel: false,
  modelValue: '',
  placeholder: '',
  showValidationError: true,
  wrapperClass: undefined,
});

const emit = defineEmits<{
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'change', value: string): string;
  (e: 'update:modelValue', value: string): string;
}>();

// tempalte ref
const input = ref<HTMLInputElement | null>(null);
const slots = useSlots();
const hasLabel = computed(() => !!(slots.label || props.label));

const { listeners, errorMessage, value, meta } = useFormField<string>({
  name: props.name,
  label: props.label,
});

const isFocused = ref(false);
const handleFocus = () => {
  isFocused.value = true;
  emit('focus');
};
const handleBlur = (e: FocusEvent) => {
  listeners.value.onBlur!(e);
  isFocused.value = false;
  emit('blur');
};

watchEffect(() => {
  emit('change', value.value);
});

const isLabelActive = computed(
  () => isFocused.value || (meta.dirty && value.value) || props.placeholder
);
</script>

<style lang="postcss" module>
.input {
  @apply tw-max-w-full tw-pt-5;

  & .control {
    @apply tw-relative tw-flex tw-flex-grow tw-items-center tw-mb-1;

    &:hover {
      @apply tw-border-primary;
    }

    &::before,
    &::after {
      content: '';
      @apply tw-absolute tw-inset-x-0 tw-bottom-0;
      @apply tw-transition tw-duration-300 tw-ease-out;
    }

    &::before {
      @apply tw-border-b-thin tw-border-inherit;
    }

    &::after {
      @apply tw-border-b-2 tw-border-inherit;
      @apply tw-transform tw-scale-0;
    }
  }

  & .controlActive {
    &::after {
      @apply tw-transform tw-scale-100;
    }
  }

  & label {
    @apply tw-absolute tw-left-0;
    @apply tw-h-6 tw-ml-2;
    @apply tw-transition tw-origin-top-left tw-duration-500 tw-ease-in-out;
    @apply tw-leading-6 tw-text-primary;
  }

  & .labelActive {
    @apply tw-translate-y-[-1.5rem] tw-scale-75;
  }

  & input {
    @apply tw-flex-grow;
    @apply tw-w-full tw-p-2;
    @apply tw-appearance-none tw-bg-transparent tw-leading-normal;

    &::placeholder {
      @apply tw-text-medium;
    }

    &:focus {
      @apply tw-outline-none;
    }
  }
}
</style>
