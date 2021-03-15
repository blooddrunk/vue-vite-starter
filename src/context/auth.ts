import { reactive, computed } from 'vue';

import { createContext } from '@/utils/hooks';

export type UserInfo = Partial<{
  userName: string;
}>;

export interface AuthState {
  user: UserInfo;
  hasForcedOut: boolean;
  loginError: null;
  logoutError: null;
  pending: boolean;
  shouldChangePassword: boolean;
}

export default createContext(() => {
  // state
  const state = reactive<AuthState>({
    user: {},
    hasForcedOut: false,
    loginError: null,
    logoutError: null,
    pending: false,
    shouldChangePassword: false,
  });

  // getters
  const user = computed(() => state.user || {});
  const userName = computed(() => user.value.userName || '');
  const isLoggedIn = computed(() => !!userName.value);

  // actions

  return {
    state,

    user,
    userName,
    isLoggedIn,
  };
});
