import type { AxiosRequestConfig, AxiosInstance } from 'axios';
import { defaultsDeep, isPlainObject } from 'lodash-es';

import { jsonToUrlParams } from '@/utils/misc';

declare module 'axios' {
  export interface AxiosRequestConfig {
    __cancellable?: boolean | string;
    __showProgress?: boolean;
    __needValidation?: boolean;
    __urlEncoded?: boolean;
    __transformData?:
      | boolean
      | ((data: unknown, response: AxiosResponse) => unknown);
  }

  export interface AxiosInstance {
    cancel?: (requestId: string, reason: string) => void;
    cancelAll?: (reason: string) => void;
  }
}

const apiRoot = import.meta.env.VITE_API_ROOT;

export const defaultDataTransformer = (data: unknown = {}) => data;

export type ServerResponse = {
  errcode: number;
  errmsg: string;
  data: unknown;
};

// biz logic
export const validateResponse = (response: ServerResponse) => {
  const { errcode = 200, errmsg = '未知错误', ...ret } = response;

  switch (`${errcode}`) {
    case '200':
      return ret;
    default: {
      throw new Error(errmsg);
    }
  }
};

// http status
// const validateStatus = (response: AxiosResponse) => {
//   const { status, data } = response;

//   console.error(`服务异常: ${status}`, data);

//   return data;
// };

export const setupInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(({ __urlEncoded, ...config }) => {
    //TODO: deal with request config here
    const presetConfig: AxiosRequestConfig = { method: 'GET' };

    if (__urlEncoded) {
      presetConfig.headers!['content-type'] =
        'application/x-www-form-urlencoded';
      if (isPlainObject(config.data)) {
        config.data = jsonToUrlParams(config.data);
      }
    }

    config = defaultsDeep(config, presetConfig);

    return config;
  });

  instance.onResponse((response) => {
    const {
      config: { __needValidation = true, __transformData = true },
    } = response;

    if (__needValidation) {
      try {
        response.data = validateResponse(response.data as ServerResponse);
      } catch (error) {
        (error as any).config = response.config;
        throw error;
      }
    }

    try {
      if (typeof __transformData === 'function') {
        response.data = __transformData(response.data, response);
      } else if (__transformData === true) {
        response.data = defaultDataTransformer(response.data);
      }
    } catch (error) {
      (error as any).config = response.config;
      throw error;
    }

    return response;
  });

  instance.onError((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // const handled = validateStatus(error.response);
      // if (typeof handled === 'string') {
      //   error.message = handled;
      // }
    }
  });
};

const setupProgress = (axiosInstance: EnhancedAxiosInstance) => {
  let pendingRequests = 0;
  let showProgress: boolean | undefined = true;

  axiosInstance.onRequest((config) => {
    showProgress = config.__showProgress;

    if (showProgress !== false) {
      if (pendingRequests === 0) {
        Nprogress.start();
      }

      pendingRequests++;
    }

    return config;
  });

  axiosInstance.onResponse((response) => {
    if (showProgress !== false) {
      pendingRequests--;
      if (pendingRequests <= 0) {
        pendingRequests = 0;

        Nprogress.done();
      }
    }

    return response;
  });

  axiosInstance.onError((error) => {
    if (showProgress === false) {
      return;
    }

    pendingRequests--;

    // if (Axios.isCancel(error)) {
    //   return;
    // }

    if (pendingRequests <= 0) {
      pendingRequests = 0;

      Nprogress.done();
    }
  });

  const onProgress = (event: ProgressEvent) => {
    if (!pendingRequests) {
      return;
    }

    const progress = event.loaded / (event.total * pendingRequests);
    Nprogress.set(Math.min(1, progress));
  };

  axiosInstance.defaults.onUploadProgress = onProgress;
  axiosInstance.defaults.onDownloadProgress = onProgress;
};

const axios = createAxiosInstance({
  baseURL: `${apiRoot}`,
});

export default axios;
