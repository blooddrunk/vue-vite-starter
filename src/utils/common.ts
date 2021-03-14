import { Ref } from 'vue';
import produce from 'immer';

export const isClient = () => typeof window === 'object';

export const isNumeric = (num: number | string) =>
  !isNaN(Number(num)) && isFinite(Number(num));

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

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const jsonToUrlParams = (data: Record<string, any>) =>
  Object.entries(data).reduce((params, [key, value]) => {
    params.append(key, value);
    return params;
  }, new URLSearchParams());

export const setItemValueByArrayIndex = <TItem extends Record<string, any>>({
  items,
  index,
  key,
  value,
}: {
  items: Ref<TItem[]>;
  index: number;
  key: keyof TItem;
  value: any;
}) => {
  const item = items.value[index];
  if (item) {
    items.value = produce(items.value, (draftItems) => {
      (draftItems[index] as TItem)[key] = value;
    });
  }
};
