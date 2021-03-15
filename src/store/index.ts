import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store, Module } from 'vuex';
import VuexPersistence from 'vuex-persist';

export type RootState = {};

const vuexLocal = new VuexPersistence<RootState>({
  key: 'do_not_forget_to_define_your_own_key',
  filter: () => false,
});

export const storeSymbol: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  plugins: [vuexLocal.plugin],

  state: {},
  mutations: {},
  actions: {},

  modules: {},
});

export const useStore = () => {
  return baseUseStore(storeSymbol);
};
