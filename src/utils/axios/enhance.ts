import Axios, {
  AxiosInstance,
  AxiosStatic,
  AxiosPromise,
  Canceler,
  CancelTokenSource,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { defaultsDeep } from 'lodash-es';
import Nprogress from 'nprogress';

export const setupProgress = (axiosInstance: EnhancedAxiosInstance) => {
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

export const createAxiosInstance = (extraOptions: AxiosRequestConfig) => {
  const axiosOptions: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
  };

  // Create new axios instance
  const axios = Axios.create(
    defaultsDeep(axiosOptions, extraOptions)
  ) as EnhancedAxiosInstance;

  // Extend axios instance
  addExtraMethods(axios);
  addRequestHelpers(axios);

  axios.CancelToken = Axios.CancelToken;
  axios.isCancel = Axios.isCancel;

  setupProgress(axios);

  // ! use `useAxios` hook instead
  // setupRequestManager(axios);

  return axios;
};
