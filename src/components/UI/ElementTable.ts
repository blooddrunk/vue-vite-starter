import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ElementTable',

  props: {
    paginationProps: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const defaultPaginationProps = {
      background: true,
      pageSizes: [10, 20, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper, ->, slot',
    };
  },
});
