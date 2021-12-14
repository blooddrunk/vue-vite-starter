import { defineComponent, h, DefineComponent, PropType } from 'vue';
import { ElSelect, ElOption } from 'element-plus';

import { createElementField } from '@/utils/form/createElementField';
import { CommonSelectOption } from '@typings';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<CommonSelectOption[]>,
      default: () => [],
    },
  },

  setup(props, { attrs }) {
    return () => {
      const GroupComponent = createElementField<
        string | number | string[] | number[]
      >(ElSelect);
      return h(
        (GroupComponent as unknown) as DefineComponent,
        {
          ...attrs,
        },
        {
          default: () =>
            props.items?.map((item) =>
              h(ElOption, {
                key: item.value,
                label: item.label,
                value: item.value,
                disabled: item.disabled,
              })
            ),
        }
      );
  };
  },
});
