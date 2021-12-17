<template>
  <div>
    <el-table ref="table" v-loading="loading" :data="items" v-bind="$attrs">
      <slot></slot>
    </el-table>

    <el-pagination
      :class="$style.pager"
      class="tw-py-3"
      v-bind="computedPaginationProps"
      :total="total"
      :page-size="pagination.rowsPerPage"
      :current-page="pagination.page"
      @update:page-size="handlePageSizeChange"
      @update:current-page="handleCurrentPageChange"
    >
      <slot name="pagination"></slot>
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, computed } from 'vue';
import { PaginationProps } from 'element-plus';

import { Pagination } from '@/hooks/usePaginatedList';

type Props = {
  items?: any[];
  loading?: boolean;
  total?: number;
  pagination: Pagination;
  paginationProps?: Partial<PaginationProps>;
  updatePagination: (pagination: Partial<Pagination>) => void;
};

const defaultPaginationProps: Partial<PaginationProps> = {
  background: true,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper, ->, slot',
};

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  loading: false,
  total: 0,
  paginationProps: () => ({}),
});

const computedPaginationProps = computed(() => ({
  ...defaultPaginationProps,
  ...props.paginationProps,
}));

const handlePageSizeChange = (rowsPerPage: number) => {
  props.updatePagination({
    rowsPerPage,
  });
};

const handleCurrentPageChange = (page: number) => {
  props.updatePagination({
    page,
  });
};
</script>

<style lang="postcss" module>
.pager {
  :global {
    .el-pager {
      @apply tw-pl-0;
    }
  }
}
</style>
