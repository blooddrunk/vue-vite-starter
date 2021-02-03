import { ref, watchEffect, Ref } from 'vue';

export const useTimeout = (
  fn: () => void,
  ms: number | Ref<number>,
  { immediate = true } = {}
): {
  isReady: Ref<boolean>;
  set: () => void;
  clear: () => void;
} => {
  const isReady = ref(false);

  // TODO: to remain reactivity, ms has to be a ref
  // or ??
  const delayRef = ref(ms);

  let timeoutID: number | null = null;

  const clear = () => {
    isReady.value = false;
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
  };

  const set = () => {
    clear();

    // force correct return type of sto
    timeoutID = window.setTimeout(() => {
      isReady.value = true;
      fn();
    }, delayRef.value);
  };

  if (immediate) {
    set();
  }

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      clear();
    });
  });

  return {
    isReady,
    set,
    clear,
  };
};
