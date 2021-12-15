import { isNil } from 'lodash-es';

export const isClient = () => typeof window === 'object';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const isNumeric = (num: string | number) =>
  !Number.isNaN(Number.parseFloat(String(num)));

export const isNumericStrict = (num: string | number) =>
  !isNaN(Number(num)) && isNumeric(num);

export const isPromise = (promise: any) =>
  !!promise && typeof promise.then === 'function';

export type GetFallbackDisplayForNonValueOption = Partial<{
  fallback: string;
  isValueNumeric: boolean;
  extraTestList: string[];
}>;
export const getFallbackDisplayForNonValue = (
  value: any,
  {
    fallback = '--',
    isValueNumeric = false,
    extraTestList,
  }: GetFallbackDisplayForNonValueOption = {}
): { value: any; hasUsedFallback: boolean } => {
  const shouldUseFallback =
    (isValueNumeric ? !isNumeric(value) : isNil(value)) ||
    (extraTestList && extraTestList.some((nonValue) => nonValue === value));
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
