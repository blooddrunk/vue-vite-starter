// see https://vueuse.org/integrations/useAxios/

import type { Ref, ShallowRef } from 'vue';
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
  execute: (config?: AxiosRequestConfig) => void;
}

export interface UseAxiosOptions {
  /**
   * Will automatically run axios request when `useAxios` is used
   *
   */
  immediate?: boolean;
}

export function useAxios<T = any>(
  initialData: T,
  config?: AxiosRequestConfig,
  options?: UseAxiosOptions
): UseAxiosReturn<T> & PromiseLike<UseAxiosReturn<T>>;
export function useAxios<T = any>(
  initialData: T,
  instance?: AxiosInstance,
  options?: UseAxiosOptions
): UseAxiosReturn<T> & PromiseLike<UseAxiosReturn<T>>;
export function useAxios<T = any>(
  initialData: T,
  config: AxiosRequestConfig,
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
  const execute: OverallUseAxiosReturn<T>['execute'] = (
    executeUrl: string | AxiosRequestConfig | undefined = url,
    config: AxiosRequestConfig = {}
  ) => {
    let _url = url ?? '';
    let _config;
    if (typeof executeUrl === 'string') {
      _url = executeUrl;
      _config = config;
    } else {
      _config = config;
    }
    loading(true);
    return instance(_url, {
      ...defaultConfig,
      ..._config,
      cancelToken: cancelToken.token,
    })
      .then((r: any) => {
        response.value = r;
        data.value = r.data;
      })
      .catch((e: any) => {
        error.value = e;
      })
      .finally(() => {
        loading(false);
      });
  };
  if (options.immediate && url)
    (execute as StrictUseAxiosReturn<T>['execute'])();

  const result = {
    response,
    data,
    error,
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
  } as OverallUseAxiosReturn<T>;
  function waitUntilFinished() {
    return new Promise<OverallUseAxiosReturn<T>>((resolve, reject) => {
      until(isFinished)
        .toBe(true)
        .then(() => resolve(result))
        .catch((error) => reject(error));
    });
  }

  return {
    ...result,
    then(onFulfilled, onRejected) {
      return waitUntilFinished().then(onFulfilled, onRejected);
    },
  };
}
