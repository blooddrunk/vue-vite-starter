import { ref, shallowRef, computed, Ref } from 'vue';
import { noop, promiseTimeout } from '@vueuse/shared';

export type UseAsyncFnOptions = {
  immediate?: boolean;
  onError?: (e: unknown) => void;
  resetOnExecute?: boolean;
  delay?: number;
};

export const useAsyncFn = <T = any>(
  promise: Promise<T> | ((...args: any[]) => Promise<T>),
  initialData?: T,
  options: UseAsyncFnOptions = {}
) => {
  const data = shallowRef(initialData) as Ref<T | undefined>;
  const isPending = ref(false);
  const isFinished = ref(false);
  const error = ref<Error | null | undefined>(null);

  const isSuccessful = computed(() => isFinished.value && !error.value);

  const {
    immediate = true,
    onError = noop,
    resetOnExecute = true,
    delay = 0,
  } = options;

  const execute = async (delay = 0, ...args: any[]) => {
    if (resetOnExecute) {
      data.value = initialData;
    }

    isPending.value = true;
    isFinished.value = false;
    error.value = null;

    if (delay > 0) {
      await promiseTimeout(delay);
    }

    const __promise =
      typeof promise === 'function' ? promise(...args) : promise;

    try {
      const result = await __promise;
      data.value = result;

      return result;
    } catch (e) {
      console.error(e);
      (error as any).value = e;
      onError(e);
    } finally {
      isPending.value = false;
      isFinished.value = true;
    }
  };

  if (immediate) {
    execute(delay);
  }

  return {
    isPending,
    isFinished,
    isSuccessful,
    error,
    data,
    execute,
  };
};
