import {
  ref,
  computed,
  watch,
  readonly,
  unref,
  shallowRef,
  UnwrapRef,
} from 'vue';
import { AxiosRequestConfig } from 'axios';
import { cloneDeep, merge } from 'lodash-es';

import { trimValues } from '@/utils/misc';
import { useAxios } from '@/hooks/useAxios';
import { usePagination, UsePaginationOptions } from '@/hooks/usePagination';

export type Pagination = ReturnType<typeof usePagination>;

type PaginationToQuery = Record<keyof Pagination, string>;

export type ListResult<T = any> = {
  items: T[];
  total: number;
};

type UsePaginatedListOptions<TValue, TFilter> = {
  filter?: TFilter;
  paginationToQuery?: Partial<PaginationToQuery>;
  initialItems?: TValue[];
  transformPaginationToQuery?: (pagination: Pagination) => Record<string, any>;
  infinite?: boolean;
} & UsePaginationOptions;

const transformListData = <T = any>(data: ListResult<T>) => ({
  items: data?.items || [],
  total: data?.total || 0,
});

export const usePaginatedList = <
  TValue extends object = object,
  TFilter extends Record<string, any> = UnwrapRef<Record<string, any>>
>(
  requestConfig: AxiosRequestConfig,
  options: UsePaginatedListOptions<TValue, TFilter> = {}
) => {
  const {
    filter = {} as TFilter,
    initialItems = [],
    transformPaginationToQuery = (pagination) => ({
      page: pagination.currentPage.value,
      pageSize: pagination.pageSize.value,
    }),
    infinite = false,
  } = options;

  const __filter = ref(filter);
  const lastAppliedFilter = ref({} as TFilter);

  const pagination = usePagination(options);

  const __requestConfig = {
    __transformData: transformListData,
    ...requestConfig,
  };

  // data fetch
  const getRequestConfig = (config?: AxiosRequestConfig) => {
    const payloadValues: Record<string, any> = {
      ...trimValues(unref(lastAppliedFilter)),
      ...transformPaginationToQuery(pagination),
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

  const { data, isPending, errorMessage, request } = useAxios<
    ListResult<TValue>
  >(
    {
      items: initialItems,
      total: pagination.total.value,
    },
    getRequestConfig(),
    {
      immediate: false,
      // ! this is very important, cost me 45min to figure it out
      resetOnRequest: false,
    }
  );

  const items = shallowRef<TValue[]>([]);

  watch(data, (value) => {
    if (!value || !value.items || !Array.isArray(value.items)) {
      throw new Error(
        `[fetchList] expects response data to be an object with 'items' and 'total'(optional) as keys, do you forget to define a proper data transformer?`
      );
    }

    if (infinite && !pagination.isFirstPage.value) {
      items.value = items.value.concat(value.items);
    } else {
      items.value = value.items;
    }

    pagination.total.value = value.total || 0;
  });

  // ! make sure pagination is updated correctly before
  const fetchList = () => {
    // apply filter first
    lastAppliedFilter.value = cloneDeep(unref(__filter));

    request(getRequestConfig());
  };

  const fetchListAndReset = () => {
    if (pagination.isFirstPage.value) {
      fetchList();
    } else {
      pagination.currentPage.value = 1;
    }
  };

  watch(pagination.currentPage, () => {
    fetchList();
  });
  watch(pagination.pageSize, () => {
    fetchList();
  });

  // for Element Table
  const elementTableProps = computed(() => ({
    items: items.value,
    loading: isPending.value,
    total: pagination.total.value,
    page: pagination.currentPage.value,
    updatePage: pagination.jumpToPage,
    pageSize: pagination.pageSize.value,
    updatePageSize: (pageSize: number) => {
      pagination.pageSize.value = pageSize;
    },
  }));

  return {
    items,
    isPending,
    errorMessage,

    pagination,

    fetchList,
    fetchListAndReset,

    filter: __filter,
    lastAppliedFilter: readonly(lastAppliedFilter),

    // for Element Table only
    elementTableProps,
  };
};
