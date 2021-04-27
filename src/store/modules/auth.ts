import { ActionContext } from 'vuex';

import { RootState } from '../typings';
import axios from '@/utils/axios';

export type LoginInfo = {
  username: string;
  password: string;
  captcha: string;
};

export type UserInfo = Partial<{
  userName: string;
}>;

export type AuthState = {
  user: UserInfo;
  hasForcedOut: boolean;
  error: Error | null;
  isLoginPending: boolean;
  shouldChangePassword: boolean;
};

const state = () =>
  ({
    user: {
      userName: '',
    },
    hasForcedOut: false,
    error: null,
    isLoginPending: false,
    shouldChangePassword: false,
  } as AuthState);

const getters = {
  user: (state: AuthState) => state.user || {},
  userName: (state: AuthState, getters: any) => getters.user.userName,
  isLoggedIn: (state: AuthState, getters: any) => !!getters.userName,
  hasLoginError: (state: AuthState) => !!state.error,
};

const mutations = {
  loginRequest(state: AuthState) {
    state.isLoginPending = true;
    state.error = null;
  },
  loginSuccess(state: AuthState, payload: UserInfo) {
    state.isLoginPending = false;
    state.user = {
      ...state.user,
      ...payload,
    };
  },
  loginFailure(state: AuthState, error: Error) {
    state.isLoginPending = false;

    console.log(error.message);
    state.error = error;
  },
  setHasForcedOut: (state: AuthState, payload: boolean) => {
    state.hasForcedOut = payload;
  },
  logout: (state: AuthState) => {
    state.user = {};
    state.error = null;
    state.hasForcedOut = false;
    state.shouldChangePassword = false;
  },
  clearError: (state: AuthState) => {
    state.error = null;
  },
};

const actions = {
  login: async (
    { commit }: ActionContext<AuthState, RootState>,
    payload: LoginInfo
  ) => {
    commit('loginRequest');

    try {
      // const user = await axios.$post('/security/login', payload, {
      //   __needValidation: false,
      // });

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });

      commit('loginSuccess', {
        userName: 'mockedLoginUser',
      });
    } catch (error) {
      commit('loginFailure', error);
    }
  },
  logout: ({ commit }: ActionContext<AuthState, RootState>) => {
    commit('logout');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
