<template>
  <div>
    <el-table
      ref="table"
      v-loading="listState.loading"
      :data="listState.items"
      v-bind="$attrs"
    >
      <slot></slot>
    </el-table>

    <el-pagination
      :class="$style.pager"
      class="tw-py-3"
      v-bind="computedPaginationProps"
      :page-size="pagination.rowsPerPage"
      :total="listState.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    >
      <slot name="pagination"></slot>
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { Pagination } from '@/hooks/usePaginatedList';

const defaultPaginationProps = {
  background: true,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper, ->, slot',
};

export default defineComponent({
  name: 'ElementTable',

  props: {
    pagination: {
      type: Object as PropType<Pagination>,
      required: true,
    },

    paginationProps: {
      type: Object,
      default: () => ({}),
    },

    updatePagination: {
      type: Function as PropType<(pagination: Partial<Pagination>) => void>,
      required: true,
    },
  },

  setup(props) {
    const computedPaginationProps = computed(() => ({
      ...defaultPaginationProps,
      ...props.paginationProps,
      currentPage: props.pagination.page,
    }));

    const handleSizeChange = (rowsPerPage: number) => {
      props.updatePagination({
        page: 1,
        rowsPerPage,
      });
    };

    const handlePageChange = (page: number) => {
      props.updatePagination({
        page,
      });
    };

    return {
      computedPaginationProps,
      handleSizeChange,
      handlePageChange,
    };
  },
});
</script>

<style lang="scss" module>
.pager {
  :global {
    .el-pager {
      @apply tw-pl-0;
    }
  }
}
</style>
