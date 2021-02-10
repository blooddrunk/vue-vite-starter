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
    const { listeners, errorMessage, value, meta } = useFormField(
      pick(props, ['name', 'label', 'mode', 'validateOnMount'])
    );

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
              resolveComponent('ElInput') as ComponentOptions,
              formFieldProps.value,
              fieldSlots
            ),
          label,
        }
      );
    };
  },
});
