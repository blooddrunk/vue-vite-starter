import { isNil } from 'lodash-es';

export const isClient = () => typeof window === 'object';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const getFallbackDisplayForNonValue = (
  value: any,
  {
    fallback = '--',
    extraTestList,
  }: { fallback?: string; extraTestList?: string[] } = {}
) => {
  if (
    isNil(value) ||
    (extraTestList && extraTestList.some((nonValue) => nonValue === value))
  ) {
    return fallback;
  }

  return value;
};

export const jsonToUrlParams = (obj: Record<string, any>) =>
  Object.entries(obj).reduce((params, [key, value]) => {
    params.append(key, value);
    return params;
  }, new URLSearchParams());
