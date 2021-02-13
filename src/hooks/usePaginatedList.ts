import { ref, computed, Ref } from 'vue';
import produce from 'immer';

type Pagination = {
  page?: number;
  rowsPerPage?: number;
};

type PaginationToQuery = Record<keyof Pagination, string>;

type UsePaginatedListOptions<TValue, TFilter> = Partial<{
  initialFilter: TFilter;
  initialItems: TValue[];
  initialTotal: number;
  initialPagination: Pagination;
  paginationToQuery: PaginationToQuery;
}>;

export const usePaginatedList = <
  TValue extends object = object,
  TFilter extends Record<string, any> = Record<string, any>
>({
  initialFilter = {} as TFilter,
  initialItems = [],
  initialTotal = 0,
  initialPagination = {
    page: 1,
    rowsPerPage: 20,
  },
  paginationToQuery = {
    page: 'pageNum',
    rowsPerPage: 'perPageNum',
  },
}: UsePaginatedListOptions<TValue, TFilter> = {}) => {
  const error = ref<Error | null | undefined>();
  const filter = ref(initialFilter);
  const items = ref(initialItems) as Ref<TValue[]>;
  const total = ref(initialTotal);
  const isLoading = ref(false);
  const pagination = ref(initialPagination);

  const isListEmpty = computed(() => items.value.length === 0);

  const updatePagination = (newPagination: Pagination) => {
    pagination.value = {
      ...pagination.value,
      ...newPagination,
    };
  };

  const resetPagination = () => {
    updatePagination({
      page: 1,
    });
  };

  const toggleListState = (key: keyof TValue, index: number, value: any) => {
    const item = items.value[index];
    if (item) {
      items.value = produce(items.value, (draftItems) => {
        (draftItems[index] as TValue)[key] =
          value === undefined ? !item[key] : value;
      });
    }
  };

  return {
    error,
    filter,
    items,
    total,
    isLoading,
    pagination,

    isListEmpty,

    updatePagination,
    resetPagination,
    toggleListState,
  };
};
