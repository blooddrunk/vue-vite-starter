import { ref, computed, watch, Ref } from 'vue';
import produce from 'immer';
import { ElMessageBox, ElMessage } from 'element-plus';
import { AxiosRequestConfig } from 'axios';

import { trimValues } from '@/utils/form';
import { useAxios } from '@/hooks/useAxios';

type Pagination = {
  page?: number;
  rowsPerPage?: number;
};

type PaginationToQuery = Partial<Record<keyof Pagination, string>>;

export type ListResult<T = any> = {
  items: T[];
  total: number;
};

type UsePaginatedListOptions<TValue, TFilter> = Partial<{
  initialFilter: TFilter;
  initialItems: TValue[];
  initialTotal: number;
  initialPagination: Pagination;
  paginationToQuery: PaginationToQuery;
  defaultDataTransformer: (data: any) => ListResult;
}>;

const getRequestConfig = <
  TFilter extends Record<string, any> = Record<string, any>
>(
  config: AxiosRequestConfig,
  {
    filter,
    pagination,
    paginationToQuery,
  }: {
    filter: TFilter;
    pagination: Pagination;
    paginationToQuery: PaginationToQuery;
  }
) => {
  const paginationInPayload = {} as any;
  if (paginationToQuery.page) {
    paginationInPayload[paginationToQuery.page] = pagination.page;
  }
  if (paginationToQuery.rowsPerPage) {
    paginationInPayload[paginationToQuery.rowsPerPage] = pagination.rowsPerPage;
  }

  const payloadValues: Record<string, any> = {
    ...trimValues(filter),
    ...paginationInPayload,
  };
  const method = (config.method || 'get').toLowerCase();
  const payload =
    method === 'get' ? { params: payloadValues } : { data: payloadValues };

  return {
    ...config,
    ...payload,
  };
};

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
    page: 'page',
    rowsPerPage: 'rowsPerPage',
  },
  defaultDataTransformer = (data) => ({
    items: data?.items || [],
    total: data?.total || 0,
  }),
}: UsePaginatedListOptions<TValue, TFilter> = {}) => {
  const error = ref<Error | null | undefined>();
  const filter = ref(initialFilter);
  const items = ref(initialItems) as Ref<TValue[]>;
  const total = ref(initialTotal);
  const isLoading = ref(false);
  const pagination = ref(initialPagination);

  const isListEmpty = computed(() => items.value.length === 0);
  const computedPagination = computed<Pagination>(() => ({
    page: 1,
    ...pagination.value,
  }));

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

  watch(filter, (value) => {
    console.log(value);
  });

  const fetchList = (config: AxiosRequestConfig) => {
    console.log(filter.value);

    const { data, isPending, error } = useAxios<ListResult<TValue>>(
      {
        __transformData: defaultDataTransformer,
        ...getRequestConfig(config, {
          filter: filter.value,
          pagination: computedPagination.value,
          paginationToQuery,
        }),
      },
      {
        items: items.value,
        total: total.value,
      }
    );

    watch(data, (value) => {
      if (value.items === undefined) {
        throw new Error(
          `[fetchList] expects response data to be an object with 'items' and 'total'(optional) as keys, do you forget to define a proper data transformer?`
        );
      }

      items.value = value.items;
      total.value = value.total;
    });

    watch(isPending, (value) => {
      isLoading.value = value;
    });

    watch(error, (value) => {
      error.value = value;
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

  const handleListAction = async ({
    confirmText,
    successText,
    index,
    handler,
    onSuccess,
    onFailure,
  }: {
    confirmText?: string;
    successText?: string;
    index: number;
    handler: () => any;
    onSuccess: (response: any) => void;
    onFailure: (error: Error) => void;
  }) => {
    try {
      if (confirmText) {
        await ElMessageBox.confirm(confirmText, '提示', {
          type: 'warning',
        });
      }

      toggleListState('loading' as any, index, true);
      try {
        const response = await handler();

        successText && ElMessage.success(successText);
        onSuccess && onSuccess(response);
      } catch (error) {
        ElMessage.error(error.message);
        onFailure && onFailure(error);
      } finally {
        toggleListState('loading' as any, index, false);
      }
    } catch (error) {
      // cancelled
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
    fetchList,
    toggleListState,
    handleListAction,
  };
};
