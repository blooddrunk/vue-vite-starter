import { createStore, createLogger, Store } from 'vuex';
import VuexPersistence from 'vuex-persist';

import {
  GetActionsType,
  GetGettersType,
  GetMutationsType,
  GetPayLoad,
  GetReturnType,
} from '@/utils/typings';
import { RootState } from './typings';
import auth, { AuthState } from './modules/auth';

const vuexLocal = new VuexPersistence<RootState>({
  key: 'do_not_forget_to_define_your_own_key',
  filter: () => false,
});

const storeOptions = {
  plugins: [vuexLocal.plugin].concat(
    import.meta.env.DEV ? [createLogger()] : []
  ),

  state: {},
  getters: {},
  mutations: {},
  actions: {},

  modules: {
    auth,
  },
};

type StoreOptions = typeof storeOptions;

type Mutations = GetMutationsType<StoreOptions>;

type Actions = GetActionsType<StoreOptions>;

type Getters = GetGettersType<StoreOptions>;

// * Module Augmentation
// ! cannot augment getters type(because it's any)
declare module 'vuex' {
  export interface Commit {
    <K extends keyof Mutations>(
      type: K,
      payload?: GetPayLoad<Mutations, K>,
      options?: CommitOptions
    ): GetReturnType<Mutations, K>;
  }
  export interface Dispatch {
    <K extends keyof Actions>(
      type: K,
      payload?: GetPayLoad<Actions, K>,
      options?: DispatchOptions
    ): Promise<GetReturnType<Actions, K>>;
  }
}

export type RootStateWithModule = RootState & {
  auth: AuthState;
};

export type VuexStore = Omit<Store<RootStateWithModule>, 'getters'> & {
  getters: Getters;
};

export const store = (createStore<RootState>(
  storeOptions
) as unknown) as VuexStore;

export const useStore = () => {
  return store;
};
