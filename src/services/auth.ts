import type {
  UserInfo,
  LoginInfo,
  MobileUserInfo,
  MobileLoginInfo,
} from '@typings';
import { promiseTimeout } from '@/utils/misc';

export const useLogin = () => {
  const data = ref<UserInfo>();
  const isLoading = ref(false);
  const error = ref<string | null>('');

  const loginRequest = async (
    payload: LoginInfo
  ): Promise<UserInfo | undefined> => {
    isLoading.value = true;

    try {
      await promiseTimeout(1500);

      if (payload.userName !== 'admin' && payload.userName !== 'guest') {
        throw new Error(`wrong auth info`);
      }

      data.value = {
        userName: payload.userName,
        menuList:
          payload.userName === 'admin'
            ? ['dashboard', 'admin', 'admin-account', 'admin-role']
            : ['dashboard', 'admin', 'admin-role'],
      };
      return data.value;
    } catch (e: any) {
      error.value = e.message;
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    isLoading,
    error,
    loginRequest,
  };
};

export const useAuthCode = () => {
  const isLoading = ref(false);
  const execute = async () => {
    isLoading.value = true;
    await promiseTimeout(1000);
    isLoading.value = false;
  };

  return {
    isLoading,
    execute,
  };
};

export const useMobileLogin = () => {
  const data = ref<MobileUserInfo>();
  const isLoading = ref(false);
  const error = ref<string | null>('');

  const loginRequest = async (
    payload: MobileLoginInfo
  ): Promise<MobileUserInfo | undefined> => {
    isLoading.value = true;

    try {
      await promiseTimeout(1500);

      if (payload.authCode !== '123456') {
        throw new Error(`wrong auth info`);
      }

      data.value = {
        mobile: payload.mobile,
      };
      return data.value;
    } catch (e: any) {
      error.value = e.message;
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    isLoading,
    error,
    loginRequest,
  };
};
