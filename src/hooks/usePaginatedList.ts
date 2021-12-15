import { ref, computed, watch, readonly, UnwrapRef, unref } from 'vue';
import { AxiosRequestConfig } from 'axios';
import { cloneDeep, merge } from 'lodash-es';

import { trimValues } from '@/utils/form';
import { useAxios } from '@/hooks/useAxios';

export type Pagination = {
  page?: number;
  rowsPerPage?: number;
};

type PaginationToQuery = Record<keyof Pagination, string>;

export type ListResult<T = any> = {
  items: T[];
  total: number;
};

type UsePaginatedListOptions<TValue, TFilter> = Partial<{
  filter: TFilter;
  requestConfig: AxiosRequestConfig;
  paginationToQuery: Partial<PaginationToQuery>;
  initialItems: TValue[];
  initialTotal: number;
  initialPagination: Pagination;
}>;

const defaultPagination: Pagination = {
  page: 1,
  rowsPerPage: 20,
};

const defaultPaginationToQuery: PaginationToQuery = {
  page: 'page',
  rowsPerPage: 'rowsPerPage',
};

const defaultRequestConfig: AxiosRequestConfig = {
  __transformData: (data) => ({
    items: data?.items || [],
    total: data?.total || 0,
  }),
};

export const usePaginatedList = <
  TValue extends object = object,
  TFilter extends Record<string, any> = UnwrapRef<Record<string, any>>
>({
  filter = {} as TFilter,
  requestConfig,
  paginationToQuery = defaultPaginationToQuery,
  initialItems = [],
  initialTotal = 0,
  initialPagination = defaultPagination,
}: UsePaginatedListOptions<TValue, TFilter> = {}) => {
  const __filter = ref(filter);
  const lastAppliedFilter = ref({} as TFilter);
  const pagination = ref(initialPagination);

  const isListEmpty = computed(() => items.value.length === 0);
  const __pagination = computed<Pagination>(() => ({
    page: 1,
    ...pagination.value,
  }));
  const __requestConfig = {
    ...defaultRequestConfig,
    ...requestConfig,
  };
  const __mergedPaginationToQuery = {
    ...defaultPaginationToQuery,
    ...paginationToQuery,
  };

  const updatePagination = (newPagination: Partial<Pagination>) => {
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

  // data fetch
  const getRequestConfig = (config?: AxiosRequestConfig) => {
    const unwrappedPagination = unref(__pagination);
    const paginationInPayload = {} as any;

    paginationInPayload[__mergedPaginationToQuery.page] =
      unwrappedPagination.page;

    paginationInPayload[__mergedPaginationToQuery.rowsPerPage] =
      unwrappedPagination.rowsPerPage;

    const payloadValues: Record<string, any> = {
      ...trimValues(unref(lastAppliedFilter)),
      ...paginationInPayload,
    };

    const mergedConfig = merge({}, __requestConfig, config);
    const method = (mergedConfig?.method ?? 'get').toLowerCase();
    const payload =
      method === 'get' ? { params: payloadValues } : { data: payloadValues };

    return {
      ...mergedConfig,
      ...payload,
    };
  };

  const appliedRequestPayload = ref<AxiosRequestConfig>();

  const { data, isPending, error, request } = useAxios<ListResult<TValue>>(
    appliedRequestPayload.value!,
    {
      items: initialItems,
      total: initialTotal,
    },
    {
      immediate: false,
    }
  );

  const items = computed(() => data.value?.items ?? []);
  const total = computed(() => data.value?.total ?? 0);

  watch(data, (value) => {
    if (!value || !value.items) {
      throw new Error(
        `[fetchList] expects response data to be an object with 'items' and 'total'(optional) as keys, do you forget to define a proper data transformer?`
      );
    }
  });

  const fetchList = (newConfig?: AxiosRequestConfig) => {
    // apply filter first
    lastAppliedFilter.value = cloneDeep(unref(__filter));

    appliedRequestPayload.value = getRequestConfig(newConfig);

    request(appliedRequestPayload.value);
  };

  const fetchListAndReset = (newConfig?: AxiosRequestConfig) => {
    // avoid triggering watcher
    pagination.value.page = 1;

    fetchList(newConfig);
  };

  watch(pagination, () => {
    fetchList();
  });

  // for Element Table
  const tableProps = computed(() => ({
    items: items.value,
    total: total.value,
    loading: isPending.value,
    pagination: pagination.value,
    updatePagination,
  }));

  return {
    error,
    filter: __filter,
    lastAppliedFilter: readonly(lastAppliedFilter),
    items,
    total,
    isPending,

    pagination,
    isListEmpty,
    tableProps,

    updatePagination,
    resetPagination,
    fetchList,
    fetchListAndReset,
  };
};
