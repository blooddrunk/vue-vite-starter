import { ref, shallowRef, computed, Ref } from 'vue';
import { noop } from '@vueuse/shared';

export type UseAsyncFnOptions = {
  immediate?: boolean;
  resetOnExecute?: boolean;
  onError?: (e: unknown) => void;
};

export const useAsyncFn = <T = any>(
  promise: Promise<T> | ((...args: any[]) => Promise<T>),
  initialData?: T,
  options: UseAsyncFnOptions = {}
) => {
  const data = shallowRef(initialData);
  const isPending = ref(false);
  const isFinished = ref(false);
  const error = ref<Error | null | undefined>(null);

  const isSuccessful = computed(() => isFinished.value && !error.value);

  const { immediate = false, onError = noop, resetOnExecute = true } = options;

  const execute = async (...args: any[]) => {
    if (resetOnExecute) {
      data.value = initialData;
    }

    isPending.value = true;
    isFinished.value = false;
    error.value = null;

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
    execute();
  }

  return {
    data,
    isPending,
    isFinished,
    isSuccessful,
    error,

    execute,
  };
};
