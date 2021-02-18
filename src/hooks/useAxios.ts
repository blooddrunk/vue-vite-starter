import { ref, computed, unref, Ref } from 'vue';
import { AxiosRequestConfig, CancelTokenSource, AxiosResponse } from 'axios';

import { Refable } from '@/utils/typings';
import axios from '@/utils/axios';

export const useAxios = <T = unknown>(
  requestConfig: Refable<AxiosRequestConfig>,
  initialData: T,
  { immediate = true, takeLatest = true } = {}
) => {
  const isPending = ref(false);
  const isCompleted = ref(false);
  const error = ref<Error | null>(null);
  const data = ref<T>(initialData) as Ref<T>;
  const response = ref<AxiosResponse<T>>();

  const isSuccessful = computed(() => isCompleted.value && !error.value);

  // cancel func
  let cancelSource: CancelTokenSource | null;
  const cancel = (message?: string) => {
    if (cancelSource) {
      cancelSource.cancel(message);
    }
  };

  const request = async () => {
    const unwrappedConfig = unref(requestConfig);

    if (takeLatest && cancelSource) {
      cancel(
        `[userAxios]: '${unwrappedConfig.url}' cancelling request due to duplicate call`
      );
    }

    cancelSource = axios.CancelToken.source();

    isPending.value = true;
    isCompleted.value = false;
    error.value = null;

    try {
      response.value = await axios.request<T>({
        cancelToken: cancelSource.token,
        ...unwrappedConfig,
      });

      data.value = response.value.data;
      isPending.value = false;
      isCompleted.value = true;

      cancelSource = null;

      return data.value;
    } catch (error) {
      error.value = error;
      isPending.value = false;
      isCompleted.value = true;

      if (!axios.isCancel(error)) {
        cancelSource = null;
      }
    }
  };

  if (immediate) {
    request();
  }

  return {
    isPending,
    isCompleted,
    isSuccessful,
    error,
    data,
    response,
    request,
  };
};
