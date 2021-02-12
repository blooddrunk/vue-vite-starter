import {
  defineComponent,
  h,
  resolveComponent,
  computed,
  ComponentOptions,
} from 'vue';
import { pick } from 'lodash-es';

import { useSharedProps, useFormField } from '@/hooks/useFormField';

type ElementFormComponent =
  | 'ElInput'
  | 'ElInputNumber'
  | 'ElRadio'
  | 'ElCheckbox'
  | 'ElSelect'
  | 'ElSwitch'
  | 'ElTimePicker'
  | 'ElTimeSelect'
  | 'ElDateTimePicker'
  | 'ElRate'
  | 'ElCascader';

type CreateElementFieldOptions = {
  bindBlurEvent?: boolean;
};

export const createElementField = <TValue = unknown>(
  componentName: ElementFormComponent,
  { bindBlurEvent = true } = {}
) =>
  defineComponent({
    name: `${componentName}WithFormItem`,

    props: {
      ...useSharedProps(),
    },

    setup(props, { attrs, slots }) {
      const { listeners, errorMessage, value, meta } = useFormField<TValue>({
        ...pick(props, ['name', 'label', 'mode', 'validateOnMount']),
        bindBlurEvent,
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

      const formItemProps = computed(() => ({
        error: errorMessage.value,
        validateStatus: validateStatus.value,
        ...pick(props, ['label', 'labelWidth', 'required']),
      }));

      const formFieldProps = computed(() => ({
        ...attrs,
        ...listeners.value,
        name: props.name,
        modelValue: value.value,
      }));

      const { label, ...fieldSlots } = slots;

      return () => {
        return h(
          resolveComponent('ElFormItem') as ComponentOptions,
          formItemProps.value,
          {
            default: () =>
              h(
                resolveComponent(componentName) as ComponentOptions,
                formFieldProps.value,
                fieldSlots
              ),
            label,
          }
        );
      };
    },
  });
