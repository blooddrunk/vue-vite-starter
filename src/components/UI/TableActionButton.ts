import { defineComponent, computed, h, resolveComponent, ComponentOptions, PropType } from 'vue';

import { ElementPlusSize, ElementPlusButtonType } from '@/utils/typings';

type ButtonProps = Partial<{
  size: ElementPlusSize;
  type: ElementPlusButtonType;
  plain: boolean;
}>;

type RowProps = {
  row: {
    loading: boolean,
    [x: string]: any;
  } ,
  $index: number
}

export default defineComponent({
  name: 'TableActionButton',

  props: {
    buttonProps: {
      type: Object as PropType<ButtonProps>,
    },

    rowProps: {
      type: Object as PropType<RowProps>,
      required: true,
    }
  },

  setup(props, { slots }) {
    const buttonProps = computed(() => Object.assign({}, {
      type: 'text',
      size: 'mini'
    }, props.buttonProps));

    const isLoading = computed(() => props.rowProps.row.loading);

    return () => 
      {
        return h(resolveComponent('ElButton') as ComponentOptions,  {
          ...buttonProps.value,
          loading: isLoading.value,
          disabled: isLoading.value
        }, { default: () => isLoading.value ? '' : slots.default?.() })
      }
    
  },
});
