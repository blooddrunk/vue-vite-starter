import { ref, computed, unref, Ref } from 'vue';
import { AxiosRequestConfig, CancelTokenSource, AxiosResponse } from 'axios';

import { MaybeRef } from '@/utils/typings';
import axios from '@/utils/axios';

export const useAxios = <T = unknown>(
  requestConfig: MaybeRef<AxiosRequestConfig>,
  initialData: T,
  { immediate = true, takeLatest = true } = {}
) => {
  const isPending = ref(false);
  const isCompleted = ref(false);
  const error = ref<Error | null>(null);
  const data = ref<T>(initialData) as Ref<T>;
  const response = ref<AxiosResponse<T>>();

  const isSuccessful = computed(() => isCompleted.value && !error.value);

  // cancel
  let __cancelSource: CancelTokenSource | null;
  const cancel = (message?: string) => {
    if (__cancelSource) {
      __cancelSource.cancel(message);
    }
  };

  // prevent race condition
  const __lastPromise = ref<Promise<AxiosResponse<T>>>();

  const request = async (newConfig?: MaybeRef<AxiosRequestConfig>) => {
    const unwrappedConfig = unref(newConfig ?? requestConfig);

    if (takeLatest && __cancelSource) {
      cancel(
        `[userAxios]: '${unwrappedConfig.url}' cancelling request due to duplicate call`
      );
    }

    __cancelSource = axios.CancelToken.source();

    isPending.value = true;
    isCompleted.value = false;
    error.value = null;

    const promise = (__lastPromise.value = axios.request<T>({
      cancelToken: __cancelSource.token,
      ...unwrappedConfig,
    }));
    try {
      response.value = await promise;

      if (__lastPromise.value === promise) {
        data.value = response.value.data;
        isPending.value = false;
        isCompleted.value = true;

        __cancelSource = null;
      }

      return data.value;
    } catch (error) {
      if (__lastPromise.value === promise) {
        error.value = error;
        isPending.value = false;
        isCompleted.value = true;

        if (!axios.isCancel(error)) {
          __cancelSource = null;
        }
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
