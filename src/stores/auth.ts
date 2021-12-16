import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { promiseTimeout } from '@vueuse/shared';

import { AuthInfo, UserInfo, LoginInfo, MobileLoginInfo } from '@typings';

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<AuthInfo>({
    user: useStorage('hsop_user', {
      userName: 'mockedLoginUser',
      mobile: '13312331233',
    }),
  });

  const user = computed(() => auth.value.user);
  const userName = computed(() => user.value.userName);
  const isLoggedIn = computed(() => !!userName.value);

  const isLoginPending = ref(false);
  const loginError = ref<string | null>('');
  const hasLoginError = computed(() => !!loginError.value);

  const isForcedOut = ref(false);

  const login = async (payload: LoginInfo & MobileLoginInfo) => {
    isLoginPending.value = true;

    try {
      console.log(payload);
      // const user = await axios.$post('/security/login', payload, {
      //   __needValidation: false,
      // });

      await promiseTimeout(1000);

      if (
        (payload.password && payload.password !== 'admin') ||
        (payload.authCode && payload.authCode === '123456')
      ) {
        throw new Error(`wrong auth info`);
      }

      auth.value.user = {
        userName: payload.username,
        mobile: payload.mobile,
      };
    } catch (error) {
      loginError.value = (error as any).message;
    } finally {
      isLoginPending.value = false;
    }
  };

  const logout = () => {
    auth.value.user = {} as UserInfo;
    loginError.value = null;
  };

  return {
    user,
    userName,
    isLoggedIn,
    loginError,
    hasLoginError,
    isLoginPending,

    login,
    logout,

    isForcedOut,
  };
});
