export type UserInfo = Partial<{
  userName: string;
}>;

export type AuthState = {
  user: UserInfo;
  hasForcedOut: boolean;
  loginError: null;
  logoutError: null;
  pending: boolean;
  shouldChangePassword: boolean;
};

const state = () =>
  ({
    user: {},
    hasForcedOut: false,
    loginError: null,
    logoutError: null,
    pending: false,
    shouldChangePassword: false,
  } as AuthState);

const getters = {
  user: ({ user }: AuthState) => user || {},
  userName: (state: AuthState, getters: any) => getters.user.userName,
  isLoggedIn: (state: AuthState, getters: any) => !!getters.user.userName,
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
