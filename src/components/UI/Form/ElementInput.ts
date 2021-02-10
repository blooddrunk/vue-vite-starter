import {
  defineComponent,
  h,
  resolveComponent,
  computed,
  ComponentOptions,
} from 'vue';
import { pick } from 'lodash-es';

import { useSharedProps, useFormField } from '@/hooks/useFormField';

export default defineComponent({
  name: 'ElementInput',

  props: {
    ...useSharedProps(),
  },

  setup(props, { attrs, slots }) {
    const { listeners, errorMessage, value } = useFormField(
      pick(props, ['name', 'label', 'mode', 'validateOnMount'])
    );

    const formItemProps = computed(() => ({
      error: errorMessage.value,
      ...pick(props, ['label', 'labelWidth', 'required']),
    }));

    const formFieldProps = computed(() => ({
      ...attrs,
      ...listeners.value,
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
