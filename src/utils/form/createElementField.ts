import { defineComponent, h, computed, ComponentOptions, PropType } from 'vue';
import { pick } from 'lodash-es';
import { ElFormItem } from 'element-plus';

import { useFormField, ValidationMode } from '@/hooks/useFormField';

type CreateElementFieldOptions<T> = {
  bindBlurEvent?: boolean;
  valueFormatter?: (value: unknown) => T;
};

export const createElementField = <TValue = unknown>(
  Component: ComponentOptions,
  {
    bindBlurEvent = true,
    valueFormatter,
  }: CreateElementFieldOptions<TValue> = {}
) =>
  defineComponent({
    name: `${Component.name ?? 'Unknown'}Wrapper`,

    props: {
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

      showLabel: {
        type: Boolean,
        default: true,
      },

      hasWrapper: {
        type: Boolean,
        default: true,
      },

      valueFormatter: {
        type: Function as PropType<(value: unknown) => TValue>,
        default: valueFormatter,
      },
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

      const formItemProps = computed(() => {
        const passedByProps = ['labelWidth', 'required'];
        if (props.showLabel) {
          passedByProps.push('label');
        }

        return {
          error: errorMessage.value,
          validateStatus: validateStatus.value,
          ...pick(props, passedByProps),
        };
      });

      const formFieldProps = computed(() => {
        const modelValue = props.valueFormatter
          ? props.valueFormatter(value.value)
          : value.value;

        return {
          ...attrs,
          ...listeners.value,
          name: props.name,
          modelValue,
        };
      });

      const { label, ...fieldSlots } = slots;

      return () => {
        const FormField = h(Component, formFieldProps.value, fieldSlots);

        if (props.hasWrapper) {
          return h(ElFormItem, formItemProps.value, {
            default: () => FormField,
            label,
          });
        } else {
          return FormField;
        }
      };
    },
  });
