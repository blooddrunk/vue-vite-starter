import { ref, shallowRef, computed, unref } from 'vue';
import { AxiosRequestConfig, CancelTokenSource, AxiosResponse } from 'axios';
import { isString } from 'lodash-es';

import { MaybeRef } from '@typings';
import axios from '@/utils/axios';

export type UseAxiosOptions = {
  immediate?: boolean;
  resetOnRequest?: boolean;
  onError?: (e: unknown) => void;
};

export const useAxios = <T = unknown>(
  requestConfig: MaybeRef<AxiosRequestConfig>,
  initialData: T,
  { immediate = true, resetOnRequest = true, onError }: UseAxiosOptions = {}
) => {
  const data = shallowRef<T>(initialData);
  const isPending = ref(false);
  const isFinished = ref(false);
  const isCanceled = ref(false);
  const error = ref<unknown | null | undefined>(null);
  const response = ref<AxiosResponse<T>>();

  const isSuccessful = computed(() => isFinished.value && !error.value);
  const errorMessage = computed(() => {
    const unwrappedError = unref(error);
    return isString(unwrappedError)
      ? unwrappedError
      : (unwrappedError as Error)?.message;
  });

  // cancel
  let lastCancelSource: CancelTokenSource | null;
  const cancel = (message?: string) => {
    if (isFinished.value) {
      return;
    }

    if (lastCancelSource) {
      lastCancelSource.cancel(message);

      isCanceled.value = true;
      isPending.value = false;
      isFinished.value = false;
    }
  };

  const request = async (newConfig?: MaybeRef<AxiosRequestConfig>) => {
    const unwrappedConfig = unref(newConfig ?? unref(requestConfig));

    if (resetOnRequest) {
      data.value = initialData;
    }

    lastCancelSource = axios.CancelToken.source();
    isPending.value = true;
    isFinished.value = false;
    error.value = null;

    const promise = axios.request<T>({
      cancelToken: lastCancelSource.token,
      ...unwrappedConfig,
    });
    try {
      response.value = await promise;
      data.value = response.value.data;

      lastCancelSource = null;
      isPending.value = false;
      isFinished.value = true;

      return data.value;
    } catch (e) {
      console.error(e);
      error.value = e;
      isPending.value = false;
      isFinished.value = true;

      if (!axios.isCancel(e)) {
        lastCancelSource = null;

        if (onError) {
          onError(e);
        }
      }
    }
  };

  if (immediate) {
    request();
  }

  return {
    isPending,
    isFinished,
    isSuccessful,
    error,
    errorMessage,
    data,
    response,
    request,
    cancel,
  };
};
