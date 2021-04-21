import {
  ref,
  computed,
  watch,
  watchEffect,
  readonly,
  Ref,
  UnwrapRef,
  unref,
} from 'vue';
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
  initialFilter: TFilter;
  initialItems: TValue[];
  initialTotal: number;
  initialPagination: Pagination;
  initialRequestConfig: AxiosRequestConfig;
  paginationToQuery: Partial<PaginationToQuery>;
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
  initialFilter = {} as TFilter,
  initialItems = [],
  initialTotal = 0,
  initialPagination = defaultPagination,
  initialRequestConfig,
  paginationToQuery = defaultPaginationToQuery,
}: UsePaginatedListOptions<TValue, TFilter> = {}) => {
  const error = ref<Error | null | undefined>();
  const filter = ref(initialFilter);
  const lastAppliedFilter = ref({} as TFilter);
  const items = ref(initialItems) as Ref<TValue[]>;
  const total = ref(initialTotal);
  const isLoading = ref(false);
  const pagination = ref(initialPagination);

  const isListEmpty = computed(() => items.value.length === 0);

  const __computedPagination = computed<Pagination>(() => ({
    page: 1,
    ...pagination.value,
  }));

  const __mergedRequestConfig = {
    ...defaultRequestConfig,
    ...initialRequestConfig,
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

  const __getRequestConfig = (config?: AxiosRequestConfig) => {
    const unwrappedPagination = unref(__computedPagination);
    const paginationInPayload = {} as any;

    paginationInPayload[__mergedPaginationToQuery.page] =
      unwrappedPagination.page;

    paginationInPayload[__mergedPaginationToQuery.rowsPerPage] =
      unwrappedPagination.rowsPerPage;

    const payloadValues: Record<string, any> = {
      ...trimValues(unref(lastAppliedFilter)),
      ...paginationInPayload,
    };

    const mergedConfig = merge({}, __mergedRequestConfig, config);
    const method = (mergedConfig?.method ?? 'get').toLowerCase();
    const payload =
      method === 'get' ? { params: payloadValues } : { data: payloadValues };

    return {
      ...mergedConfig,
      ...payload,
    };
  };

  const __dataFetcher = ref<(config?: AxiosRequestConfig) => void>();
  const __appliedRequestPayload = ref<AxiosRequestConfig>();

  const fetchList = (newConfig?: AxiosRequestConfig) => {
    // apply filter first
    lastAppliedFilter.value = cloneDeep(unref(filter));

    __appliedRequestPayload.value = __getRequestConfig(newConfig);

    if (__dataFetcher.value) {
      __dataFetcher.value(__appliedRequestPayload.value);
      return;
    }

    const { data, isPending, error: requestError, request } = useAxios<
      ListResult<TValue>
    >(__appliedRequestPayload.value!, {
      items: items.value,
      total: total.value,
    });

    __dataFetcher.value = request;

    watch(data, (value) => {
      if (value.items === undefined) {
        throw new Error(
          `[fetchList] expects response data to be an object with 'items' and 'total'(optional) as keys, do you forget to define a proper data transformer?`
        );
      }

      items.value = value.items;
      total.value = value.total;
    });

    watchEffect(() => {
      isLoading.value = isPending.value;
      error.value = requestError.value;
    });
  };

  const fetchListAndReset = (newConfig?: AxiosRequestConfig) => {
    // avoid triggering watcher
    pagination.value.page = 1;

    fetchList(newConfig);
  };

  watch(pagination, () => {
    fetchList();
  });

  // for ElementTable
  const tableProps = computed(() => ({
    items: items.value,
    total: total.value,
    loading: isLoading.value,
    pagination: pagination.value,
    updatePagination,
  }));

  return {
    error,
    filter,
    lastAppliedFilter: readonly(lastAppliedFilter),
    items,
    total,
    isLoading,

    pagination,
    isListEmpty,
    tableProps,

    updatePagination,
    resetPagination,
    fetchList,
    fetchListAndReset,
  };
};
