import {
  ref,
  shallowRef,
  computed,
  unref,
  Ref,
  ComputedRef,
  ShallowRef,
} from 'vue';
import { AxiosRequestConfig, CancelTokenSource, AxiosResponse } from 'axios';
import { merge, isString } from 'lodash-es';

import { MaybeRef } from '@typings';
import axios from '@/utils/axios';

export type UseAxiosOptions = {
  immediate?: boolean;
  resetOnRequest?: boolean;
  onError?: (e: unknown) => void;
};

export type UseAxiosReturn<T> = {
  isPending: Ref<boolean>;
  isFinished: Ref<boolean>;
  isSuccessful: ComputedRef<boolean>;
  error: Ref<unknown>;
  errorMessage: ComputedRef<string>;
  data: ShallowRef<T>;
  response: Ref<T>;
  request: (config?: MaybeRef<AxiosRequestConfig> | undefined) => Promise<T>;
  cancel: (message?: string | undefined) => void;
};

export function useAxios<T = any>(initialData: T): UseAxiosReturn<T>;
export function useAxios<T = any>(
  initialData: T,
  requestConfig: MaybeRef<AxiosRequestConfig>
): UseAxiosReturn<T>;
export function useAxios<T = any>(
  initialData: T,
  options: UseAxiosOptions
): UseAxiosReturn<T>;
export function useAxios<T = any>(
  initialData: T,
  requestConfig: MaybeRef<AxiosRequestConfig>,
  options: UseAxiosOptions
): UseAxiosReturn<T>;

export function useAxios<T = any>(initialData: T, ...args: any[]) {
  let initialConfig: AxiosRequestConfig = {};
  let options: UseAxiosOptions = {};

  if (args.length === 0) {
    initialConfig = {};
  } else if (args.length === 1) {
    if (
      ['immediate', 'resetOnRequest', 'onError'].some((key) =>
        Object.prototype.hasOwnProperty.call(args[0], key)
      )
    ) {
      options = args[0];
    } else {
      initialConfig = args[0];
    }
  } else if (args.length > 1) {
    initialConfig = args[0];
    options = args[1];
  }

  const { immediate = false, resetOnRequest = false, onError } = options;

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

  const request = async (config?: MaybeRef<AxiosRequestConfig>) => {
    const newConfig = config
      ? merge({}, unref(initialConfig), unref(config))
      : unref(initialConfig);

    if (resetOnRequest) {
      data.value = initialData;
      response.value = undefined;
    }

    lastCancelSource = axios.CancelToken.source();
    isPending.value = true;
    isFinished.value = false;
    error.value = null;

    const promise = axios.request<T>({
      cancelToken: lastCancelSource.token,
      ...newConfig,
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
}
