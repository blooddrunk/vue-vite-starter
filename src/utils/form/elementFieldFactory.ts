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
  | 'ElSwitch';
type ElementFormFieldEvents = ['input', 'change', ''];

export const createElementField = (
  componentName: string,
  events: keyof ElementFormFieldEvents
) =>
  defineComponent({
    name: 'ElementInput',

    props: {
      ...useSharedProps(),
    },

    setup(props, { attrs, slots }) {
      const { handleChange, listeners, errorMessage, value } = useFormField({
        name: props.name,
        label: props.label,
      });

      const formItemProps = computed(() => ({
        error: errorMessage.value,
        ...pick(props, ['label', 'labelWidth', 'required']),
      }));

      const formFieldProps = computed(() => ({
        ...attrs,
        ...listeners,
        name: props.name,
        modelValue: value.value,
      }));

      return () => {
        return h(
          resolveComponent('ElFormItem'),
          formItemProps.value,
          h(
            resolveComponent('ElInput') as ComponentOptions,
            formFieldProps.value,
            slots
          )
        );
      };
    },
  });
