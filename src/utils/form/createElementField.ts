import {
  defineComponent,
  h,
  resolveComponent,
  computed,
  ComponentOptions,
  PropType,
  DefineComponent,
} from 'vue';
import { pick } from 'lodash-es';

import { useFormField, ValidationMode } from '@/hooks/useFormField';

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

type CreateElementFieldOptions<T> = {
  bindBlurEvent?: boolean;
  valueFormatter?: (value: unknown) => T;
};

export const createElementField = <TValue = unknown>(
  componentName: ElementFormComponent,
  {
    bindBlurEvent = true,
    valueFormatter,
  }: CreateElementFieldOptions<TValue> = {}
) =>
  defineComponent({
    name: `${componentName}Wrapper`,

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
        const FormField = h(
          resolveComponent(componentName) as ComponentOptions,
          formFieldProps.value,
          fieldSlots
        );

        if (props.hasWrapper) {
          return h(
            resolveComponent('ElFormItem') as ComponentOptions,
            formItemProps.value,
            {
              default: () => FormField,
              label,
            }
          );
        } else {
          return FormField;
        }
      };
    },
  });
