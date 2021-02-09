import { defineComponent, h, resolveComponent, computed } from 'vue';
import { pick } from 'lodash-es';

import { useSharedProps, useFormField } from '../../../hooks/useFormField';

export default defineComponent({
  name: 'ElementInput',

  props: {
    ...useSharedProps(),
  },

  setup(props, { attrs }) {
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
      'onUpdate:modelValue': handleChange,
    }));

    return () => {
      return h(
        resolveComponent('ElFormItem'),
        formItemProps,
        h(resolveComponent('ElInput'), formFieldProps)
      );
    };
  },
});
