import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { promiseTimeout } from '@/utils/misc';

import { AuthInfo, UserInfo, LoginInfo } from '@typings';

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
  const loginError = ref<string>('');
  const hasLoginError = computed(() => !!loginError.value);

  const isForcedOut = ref(false);

  const login = async (payload: LoginInfo) => {
    isLoginPending.value = true;

    try {
      // const user = await axios.$post('/security/login', payload, {
      //   __needValidation: false,
      // });

      await promiseTimeout(1000);

      if (payload.password !== 'admin') {
        throw new Error(`wrong auth info`);
      }

      auth.value.user = {
        userName: payload.username,
      };
    } catch (error) {
      console.error(error);
      loginError.value = (error as any).message || '发生未知错误';
    } finally {
      isLoginPending.value = false;
    }
  };

  const logout = () => {
    auth.value.user = {} as UserInfo;
    loginError.value = '';
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
