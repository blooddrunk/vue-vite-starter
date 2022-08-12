import { isNil, mapValues, mapKeys } from 'lodash-es';
import { unref } from 'vue';

import { MaybeRef } from '@typings';

export const isClient = () => typeof window === 'object';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const promiseTimeout = (
  ms: number,
  throwOnTimeout = false,
  reason = 'Timeout'
): Promise<void> =>
  new Promise((resolve, reject) => {
    if (throwOnTimeout) setTimeout(() => reject(reason), ms);
    else setTimeout(resolve, ms);
  });

export const isNumeric = (num: string | number) =>
  !Number.isNaN(Number.parseFloat(String(num)));

export const isNumericStrict = (num: string | number) =>
  !isNaN(Number(num)) && isNumeric(num);

export const isPromise = (promise: any) =>
  !!promise && typeof promise.then === 'function';

export type GetPlaceholderForNonValueOption = Partial<{
  fallback: string;
  isValueNumeric: boolean;
}>;
export const getPlaceholderForNonValue = (
  value: MaybeRef<string | number | any[] | null | undefined>,
  {
    fallback = '--',
    isValueNumeric = false,
  }: GetPlaceholderForNonValueOption = {}
): { value: any; hasUsedFallback: boolean } => {
  const unwrappedValue = unref(value);
  const shouldUseFallback = Array.isArray(unwrappedValue)
    ? unwrappedValue.length === 0
    : isNil(unwrappedValue)
    ? isValueNumeric
    : !isNumeric(unwrappedValue);
  if (shouldUseFallback) {
    return {
      value: fallback,
      hasUsedFallback: true,
    };
  }

  return {
    value,
    hasUsedFallback: false,
  };
};

export const jsonToUrlParams = (obj: Record<string, any>) =>
  Object.entries(obj).reduce((params, [key, value]) => {
    params.append(key, value);
    return params;
  }, new URLSearchParams());

export const convertToUnit = (
  str: string | number | null | undefined,
  unit = 'px'
): string | undefined => {
  if (str == null || str === '') {
    return undefined;
  } else if (isNumeric(str)) {
    return `${Number(str)}${unit}`;
  } else {
    return String(str);
  }
};

export const breakStringBy = (
  str: string,
  {
    breakpoint = 2,
    breakWith = '\n',
  }: {
    breakpoint?: ((input: string) => number) | number;
    breakWith?: string;
  } = {}
) => {
  if (!str) {
    return str;
  }

  let _breakpoint: number;
  if (typeof breakpoint === 'function') {
    _breakpoint = breakpoint(str);
  } else {
    _breakpoint = breakpoint;
  }

  if (_breakpoint <= 0) {
    return str;
  }

  return str.replace(new RegExp(`(.{${_breakpoint}})`, 'g'), `$1${breakWith}`);
};

export const trimValues = (filter: Record<string, any>) =>
  mapValues(filter, (value) => {
    if (value && typeof value === 'string') {
      return value.trim();
    }

    return value;
  });

export const getFileNameOfResource = (path: string) => {
  const matches = path.match(/([^\/]+)(?=\.\w+$)/);
  return matches ? matches[0] : '';
};

export const createNamedEntryForGlobImport = <M>(
  modules: Record<string, () => Promise<M>>
) => {
  const modulesWithFileNameAsKey = mapKeys(modules, (value, key) =>
    getFileNameOfResource(key)
  );
  return Object.entries(modulesWithFileNameAsKey);
};
