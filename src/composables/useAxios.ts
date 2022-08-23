// see https://vueuse.org/integrations/useAxios/

import type { ComputedRef, Ref, ShallowRef } from 'vue';
import { ref, shallowRef } from 'vue';
import { until } from '@vueuse/core';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
import axiosDefault from 'axios';
import { merge } from 'lodash-es';

import axios from '@/utils/axios';

export interface UseAxiosReturn<T> {
  /**
   * Axios Response
   */
  response: ShallowRef<AxiosResponse<T> | undefined>;

  /**
   * Axios response data
   */
  data: Ref<T>;

  /**
   * Indicates if the request has finished
   */
  isFinished: Ref<boolean>;

  /**
   * Indicates if the request is currently loading
   */
  isLoading: Ref<boolean>;

  /**
   * Indicates if the request was canceled
   */
  isAborted: Ref<boolean>;

  /**
   * Any errors that may have occurred
   */
  error: ShallowRef<AxiosError<T> | undefined>;
  errorMessage: ComputedRef<string | undefined>;

  /**
   * Aborts the current request
   */
  abort: (message?: string | undefined) => void;

  /**
   * isAborted alias
   */
  isCanceled: Ref<boolean>;

  /**
   * Manually call the axios request
   */
  execute: <T>(config?: AxiosRequestConfig) => PromiseLike<UseAxiosReturn<T>>;
}

export interface UseAxiosOptions {
  /**
   * Will automatically run axios request when `useAxios` is used
   *
   */
  immediate?: boolean;
}

export function useAxios<T = any, D = any>(
  initialData: T,
  config?: AxiosRequestConfig<D>,
  options?: UseAxiosOptions
): UseAxiosReturn<T> & PromiseLike<UseAxiosReturn<T>>;
export function useAxios<T = any>(
  initialData: T,
  instance?: AxiosInstance,
  options?: UseAxiosOptions
): UseAxiosReturn<T> & PromiseLike<UseAxiosReturn<T>>;
export function useAxios<T = any, D = any>(
  initialData: T,
  config: AxiosRequestConfig<D>,
  instance: AxiosInstance,
  options?: UseAxiosOptions
): UseAxiosReturn<T> & PromiseLike<UseAxiosReturn<T>>;

/**
 * Wrapper for axios.
 *
 * @see https://vueuse.org/useAxios
 * @param url
 * @param config
 */
export function useAxios<T = any>(
  ...args: any[]
): UseAxiosReturn<T> & PromiseLike<UseAxiosReturn<T>> {
  const initialData: T = args[0];
  let defaultConfig: AxiosRequestConfig = {};
  let instance: AxiosInstance = axios;
  let options: UseAxiosOptions;

  const isAxiosInstance = (val: any) => !!val?.request;

  if (args.length > 1) {
    if (isAxiosInstance(args[1])) {
      instance = args[1];
    } else {
      defaultConfig = args[1];
    }
  }

  if (args.length > 2) {
    options = args[args.length - 1];
  } else {
    options = { immediate: !!defaultConfig.url };
  }

  if (args.length === 4) {
    instance = args[2];
  }

  const response = shallowRef<AxiosResponse<T>>();
  const data = shallowRef<T>(initialData);
  const isFinished = ref(false);
  const isLoading = ref(false);
  const isAborted = ref(false);
  const error = shallowRef<AxiosError<T>>();

  const cancelToken: CancelTokenSource = axiosDefault.CancelToken.source();
  const abort = (message?: string) => {
    if (isFinished.value || !isLoading.value) return;

    cancelToken.cancel(message);
    isAborted.value = true;
    isLoading.value = false;
    isFinished.value = false;
  };
  const loading = (loading: boolean) => {
    isLoading.value = loading;
    isFinished.value = !loading;
  };
  const waitUntilFinished = () =>
    new Promise<UseAxiosReturn<T>>((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => resolve(result))
        .catch(reject);
    });
  const then: PromiseLike<UseAxiosReturn<T>>['then'] = (
    onFulfilled,
    onRejected
  ) => waitUntilFinished().then(onFulfilled, onRejected);
  const execute = async (config?: AxiosRequestConfig) => {
    const _config = merge(
      { cancelToken: cancelToken.token },
      defaultConfig,
      config
    );

    loading(true);
    error.value = undefined;
    try {
      const r = await instance.request<T>(_config);
      response.value = r;
      data.value = r.data;
    } catch (error: any) {
      error.value = error;
    } finally {
      loading(false);
    }

    return { then };
  };
  if (options.immediate && defaultConfig.url) {
    execute();
  }

  const result = {
    response,
    data,
    error,
    errorMessage: computed(() => error.value?.message),
    finished: isFinished,
    loading: isLoading,
    isFinished,
    isLoading,
    cancel: abort,
    isAborted,
    canceled: isAborted,
    aborted: isAborted,
    isCanceled: isAborted,
    abort,
    execute,
  } as UseAxiosReturn<T>;

  return {
    ...result,
    then,
  };
}
