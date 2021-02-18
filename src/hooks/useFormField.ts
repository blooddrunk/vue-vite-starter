import { computed } from 'vue';
import { useField } from 'vee-validate';

export type ValidationMode = 'aggressive' | 'lazy' | 'aggressiveIfInvalid';

export const useFormField = <TValue = unknown>({
  name,
  label,
  mode = 'aggressiveIfInvalid',
  validateOnMount = false,
  bindBlurEvent = true,
}: {
  name: string;
  label: string;
  mode?: ValidationMode;
  validateOnMount?: boolean;
  bindBlurEvent?: boolean;
}) => {
  const { errorMessage, handleInput, handleChange, ...rest } = useField<TValue>(
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
      onBlur?: typeof handleChange;
      onChange: typeof handleChange;
      'onUpdate:modelValue': typeof handleChange | typeof handleInput;
    } = {
      onChange: handleChange,
      'onUpdate:modelValue': handleInput,
    };

    if (bindBlurEvent) {
      validationListeners.onBlur = handleChange;
    }

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
