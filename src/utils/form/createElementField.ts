import { defineComponent, h, computed, ComponentOptions, PropType } from 'vue';
import { ElFormItem } from 'element-plus';
import { reactivePick } from '@vueuse/core';

import { useFormField, ValidationMode } from '@/hooks/useFormField';

type CreateElementFieldOption<T> = {
  bindBlurEvent?: boolean;
  valueFormatter?: (value: unknown) => T;
};

export const createElementField = <TValue = unknown>(
  Component: ComponentOptions,
  {
    bindBlurEvent = true,
    valueFormatter,
  }: CreateElementFieldOption<TValue> = {}
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
      const isCheckbox = [
        'ElCheckbox',
        'ElCheckboxButton',
        'ElRadio',
        'ElRadioButton',
      ].includes(Component.name ?? '');

      const { listeners, errorMessage, value, validateStatus } =
        useFormField<TValue>({
          ...reactivePick(props, 'name', 'label', 'mode', 'validateOnMount'),
          bindBlurEvent,
          isCheckbox,
        });

      const formItemProps = computed(() => {
        return {
          error: errorMessage.value,
          validateStatus: validateStatus.value,
          labelWidth: props.labelWidth,
          required: props.required,
          label: props.showLabel ? props.label : undefined,
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
