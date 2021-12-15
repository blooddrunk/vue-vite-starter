import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { promiseTimeout } from '@vueuse/shared';

import { UserInfo, LoginInfo } from '@typings';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo>({
    userName: 'mockedLoginUser',
  });
  const userName = computed(() => user.value.userName);
  const isLoggedIn = computed(() => !!userName.value);

  const isLoginPending = ref(false);
  const loginError = ref<string | null>('');
  const hasLoginError = computed(() => !!loginError.value);

  const isForcedOut = ref(false);

  const login = async (payload: LoginInfo) => {
    isLoginPending.value = true;

    try {
      console.log(payload);
      // const user = await axios.$post('/security/login', payload, {
      //   __needValidation: false,
      // });

      await promiseTimeout(1000);

      if (payload.password !== 'admin') {
        throw new Error(`password is 'admin'`);
      }

      user.value = {
        userName: 'mockedLoginUser',
      };
    } catch (error) {
      loginError.value = (error as any).message;
    } finally {
      isLoginPending.value = false;
    }
  };

  const logout = () => {
    user.value = {};
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
