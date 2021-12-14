import { unref, computed } from 'vue';
import { useField } from 'vee-validate';

import { MaybeRef } from '@typings';

export type ValidationMode = 'aggressive' | 'lazy' | 'aggressiveIfInvalid';

export type UseFormFieldOption = {
  name: MaybeRef<string>;
  label: MaybeRef<string>;
  mode?: MaybeRef<ValidationMode>;
  validateOnMount?: boolean;
  bindBlurEvent?: boolean;
};

export const useFormField = <TValue = unknown>({
  name,
  label,
  mode = 'aggressiveIfInvalid',
  validateOnMount = false,
  bindBlurEvent = true,
}: UseFormFieldOption) => {
  const { errorMessage, handleChange, meta, ...rest } = useField<TValue>(
    unref(name),
    undefined,
    {
      label,
      validateOnValueUpdate: false,
      validateOnMount,
    }
  );

  const listeners = computed(() => {
    const validationListeners: {
      onBlur?: (e: unknown) => void;
      onChange: (e: unknown) => void;
      'onUpdate:modelValue': (e: unknown) => void;
    } = {
      onChange: handleChange,
      'onUpdate:modelValue': (e) => handleChange(e, false),
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
    handleChange,
    meta,
    ...rest,

    listeners,
    validateStatus,
  };
};
