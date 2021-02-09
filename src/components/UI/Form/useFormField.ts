import { computed, PropType } from 'vue';
import { useField } from 'vee-validate';
// import {
//   h,
//   defineComponent,
//   resolveComponent,
//   resolveDynamicComponent,
//   ComponentOptions,
//   VNodeArrayChildren,
// } from 'vue';

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
  } as const);

export const useFormField = ({
  name,
  label,
  mode = 'aggressiveIfInvalid',
}: {
  name: string;
  label: string;
  mode?: ValidationMode;
}) => {
  const { errorMessage, handleInput, handleChange, ...rest } = useField(
    name,
    undefined,
    {
      label,
      validateOnValueUpdate: false,
    }
  );

  const listeners = computed(() => {
    const validationListeners: {
      blur: typeof handleChange;
      change: typeof handleChange;
      input: typeof handleChange | typeof handleInput;
    } = {
      blur: handleChange,
      change: handleChange,
      input: handleInput,
    };

    if (mode === 'aggressive' || errorMessage.value) {
      validationListeners.input = handleChange;
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

// export const createFormField = (
//   component: string,
//   componentProps?: Record<string, any> | null,
//   children?: VNodeArrayChildren
// ) => {
//   return () => {
//     const

//     return h(
//       resolveDynamicComponent(component) as ComponentOptions,
//       componentProps,
//       children
//     )
//   };
// };
