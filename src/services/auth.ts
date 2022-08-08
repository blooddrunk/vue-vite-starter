import type { UserInfo, LoginInfo } from '@typings';
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
