import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

export interface RootState {}

const vuexLocal = new VuexPersistence<RootState>({
  key: 'do_not_forget_to_define_your_own_key',
  storage: window.localStorage,
});

export const store = createStore<RootState>({
  plugins: [vuexLocal.plugin],

  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
