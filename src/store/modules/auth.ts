import { ActionContext } from 'vuex';

import { RootState } from '../typings';

export type UserInfo = Partial<{
  userName: string;
}>;

export type AuthState = {
  user: UserInfo;
  hasForcedOut: boolean;
  error: Error | null;
  pending: boolean;
  shouldChangePassword: boolean;
};

const state = () =>
  ({
    user: {
      userName: '',
    },
    hasForcedOut: false,
    error: null,
    pending: false,
    shouldChangePassword: false,
  } as AuthState);

const getters = {
  user: (state: AuthState) => state.user || {},
  userName: (state: AuthState, getters: any) => getters.user.userName,
  isLoggedIn: (state: AuthState, getters: any) => !!getters.userName,
};

const mutations = {
  forceLogout: (state: AuthState, payload: boolean) => {
    state.hasForcedOut = payload;
  },
  logout: (state: AuthState) => {
    state.user = {};
    state.error = null;
    state.hasForcedOut = false;
    state.shouldChangePassword = false;
  },
};

const actions = {
  logout: ({ commit }: ActionContext<AuthState, RootState>) => {
    commit('auth/logout');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
