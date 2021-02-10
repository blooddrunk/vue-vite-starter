import { computed, PropType, watchEffect } from 'vue';
import { useField } from 'vee-validate';

type ValidationMode = 'aggressive' | 'lazy' | 'aggressiveIfInvalid';

export const useSharedProps = () =>
  ({
    name: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: '',
    },

    labelWidth: {
      type: String,
      default: undefined,
    },

    // only has a visual effect
    required: {
      type: Boolean,
      default: false,
    },

    mode: {
      type: String as PropType<ValidationMode>,
      default: 'aggressiveIfInvalid',
    },

    validateOnMount: {
      type: Boolean,
      default: false,
    },
  } as const);

export const useFormField = ({
  name,
  label,
  mode = 'aggressiveIfInvalid',
  validateOnMount = false,
}: {
  name: string;
  label: string;
  mode?: ValidationMode;
  validateOnMount?: boolean;
}) => {
  const { errorMessage, handleInput, handleChange, ...rest } = useField(
    name,
    undefined,
    {
      label,
      validateOnValueUpdate: false,
      validateOnMount,
    }
  );

  const listeners = computed(() => {
    const validationListeners: {
      onBlur: typeof handleChange;
      onChange: typeof handleChange;
      'onUpdate:modelValue': typeof handleChange | typeof handleInput;
    } = {
      onBlur: handleChange,
      onChange: handleChange,
      'onUpdate:modelValue': handleInput,
    };

    if (
      mode === 'aggressive' ||
      (mode === 'aggressiveIfInvalid' && errorMessage.value)
    ) {
      validationListeners['onUpdate:modelValue'] = handleChange;
    }

    return validationListeners;
  });

  return {
    ...rest,
    errorMessage,
    handleChange,
    handleInput,
    listeners,
  };
};
