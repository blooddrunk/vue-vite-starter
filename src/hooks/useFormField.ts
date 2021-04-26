import { unref, computed } from 'vue';
import { useField } from 'vee-validate';

import { MaybeRef } from '@/utils/typings';

export type ValidationMode = 'aggressive' | 'lazy' | 'aggressiveIfInvalid';

export type UseFormFieldOption = {
  name: MaybeRef<string>;
  label: MaybeRef<string>;
  mode?: MaybeRef<ValidationMode>;
  validateOnMount?: boolean;
  bindBlurEvent?: boolean;
  isCheckbox: boolean;
};

export const useFormField = <TValue = unknown>({
  name,
  label,
  mode = 'aggressiveIfInvalid',
  validateOnMount = false,
  bindBlurEvent = true,
}: UseFormFieldOption) => {
  const {
    errorMessage,
    handleInput,
    handleChange,
    meta,
    ...rest
  } = useField<TValue>(unref(name), undefined, {
    label,
    validateOnValueUpdate: false,
    validateOnMount,
  });

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

  return {
    /** original useForm return */
    errorMessage,
    handleInput,
    handleChange,
    meta,
    ...rest,

    listeners,
    validateStatus,
  };
};
