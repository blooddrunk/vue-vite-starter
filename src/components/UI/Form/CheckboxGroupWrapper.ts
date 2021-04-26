import { defineComponent, h, DefineComponent, PropType } from 'vue';
import { ElCheckboxGroup, ElCheckbox } from 'element-plus';

import { createElementField } from '@/utils/form/createElementField';
import { CommonSelectOption } from '@/utils/typings';

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<CommonSelectOption[]>,
      default: () => [],
    },
  },

  setup(props, { attrs }) {
    return () => {
      const GroupComponent = createElementField<string[] | number[]>(
        ElCheckboxGroup
      );
      return h(
        (GroupComponent as unknown) as DefineComponent,
        {
          ...attrs,
        },
        {
          default: () =>
            props.items?.map((item) =>
              h(
                ElCheckbox,
                {
                  key: item.value,
                  label: item.value,
                  disabled: item.disabled,
                },
                {
                  default: () => item.label,
                }
              )
            ),
        }
      );
    };
  },
});
