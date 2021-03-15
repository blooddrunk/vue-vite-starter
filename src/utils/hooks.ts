import { watchEffect, watch, provide, inject, InjectionKey } from 'vue';

export const createContext = <T>(factory: () => T) => {
  const context = factory();

  const contextSymbol: InjectionKey<T> = Symbol();

  const useProvider = () => {
    provide(contextSymbol, context);
  };

  const useContext = () => inject(contextSymbol);

  return {
    context,
    useProvider,
    useContext,
  };
};

export const watchUntil = (cb: () => boolean): Promise<void> =>
  new Promise((resolve) => {
    const stop = watchEffect(() => {
      if (cb()) {
        resolve();
        stop();
      }
    });
  });

export const waitForValue = <T = any>(cb: () => T): Promise<T> =>
  new Promise((resolve) => {
    const stop = watch(
      cb,
      (value) => {
        if (value !== undefined && value !== null) {
          resolve(value);
          stop && stop();
        }
      },
      { immediate: true }
    );
  });
