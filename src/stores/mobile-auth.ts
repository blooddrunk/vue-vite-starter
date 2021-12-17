import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { promiseTimeout } from '@vueuse/shared';

import { MobileAuthInfo, MobileUserInfo, MobileLoginInfo } from '@typings';

export const useMobileAuthStore = defineStore('mobile-auth', () => {
  const auth = ref<MobileAuthInfo>({
    user: useStorage('hsop_auth_mobile_user', {
      mobile: '13312331233',
    }),
  });

  const user = computed(() => auth.value.user);
  const mobile = computed(() => user.value.mobile);
  const isLoggedIn = computed(() => !!mobile.value);

  const isLoginPending = ref(false);
  const loginError = ref<string>('');
  const hasLoginError = computed(() => !!loginError.value);

  const login = async (payload: MobileLoginInfo) => {
    isLoginPending.value = true;
    loginError.value = '';

    try {
      console.log(payload);
      // const user = await axios.$post('/security/login', payload, {
      //   __needValidation: false,
      // });

      await promiseTimeout(1000);

      if (payload.authCode !== '123456') {
        throw new Error(`wrong auth info`);
      }

      auth.value.user = {
        mobile: payload.mobile,
      };
    } catch (error) {
      console.error(error);
      loginError.value = (error as any).message;
    } finally {
      isLoginPending.value = false;
    }
  };

  const logout = () => {
    auth.value.user = {} as MobileUserInfo;
    loginError.value = '';
  };

  return {
    user,
    mobile,
    isLoggedIn,
    loginError,
    hasLoginError,
    isLoginPending,

    login,
    logout,
  };
});
