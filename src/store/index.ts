import { InjectionKey } from 'vue';
import {
  createStore,
  useStore as baseUseStore,
  createLogger,
  Store,
  Module,
  StoreOptions,
} from 'vuex';
import VuexPersistence from 'vuex-persist';

import {
  GetActionsType,
  GetMutationsType,
  GetPayLoad,
  GetReturnType,
} from '@/utils/typings';

export type RootState = {};

const vuexLocal = new VuexPersistence<RootState>({
  key: 'do_not_forget_to_define_your_own_key',
  filter: () => false,
});

export const storeSymbol: InjectionKey<Store<RootState>> = Symbol();

const storeOptions: StoreOptions<RootState> = {
  plugins: [vuexLocal.plugin].concat(
    import.meta.env.DEV ? [createLogger()] : []
  ),

  state: {},
  getters: {},
  mutations: {},
  actions: {},

  modules: {},
};

type Mutations = GetMutationsType<typeof storeOptions>;

type Actions = GetActionsType<typeof storeOptions>;

declare module 'vuex' {
  export interface Commit {
    <T extends keyof Mutations>(
      type: T,
      payload?: GetPayLoad<Mutations, T>,
      options?: CommitOptions
    ): GetReturnType<Mutations, T>;
  }
  export interface Dispatch {
    <T extends keyof Actions>(
      type: T,
      payload?: GetPayLoad<Actions, T>,
      options?: DispatchOptions
    ): Promise<GetReturnType<Actions, T>>;
  }
}

export const store = createStore<RootState>(storeOptions);

export const useStore = () => {
  return baseUseStore(storeSymbol);
};
