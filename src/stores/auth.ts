import { defineStore } from 'pinia';
import { pick, keyBy } from 'lodash';

import { AuthInfo, UserInfo, LoginInfo } from '@typings';

export const useAuthStore = defineStore('auth', () => {
  const uiStore = useUIStore();

  const auth = ref<AuthInfo>({
    user: useStorage('some_app_user', {
      userName: 'admin',
      menuList: ['dashboard', 'admin', 'admin-account', 'admin-role'],
    }),
  });

  const user = computed(() => auth.value.user);
  const userName = computed(() => user.value.userName);
  const isLoggedIn = computed(() => !!userName.value);
  const permittedMenuLookupById = computed(() =>
    pick(uiStore.menuLookupById, user.value.menuList)
  );
  const permittedMenuList = computed(() =>
    Object.values(permittedMenuLookupById.value)
  );
  const permittedMenuLookupByRoute = computed(() =>
    keyBy(
      permittedMenuList.value.filter((item) => !!item.route),
      'route'
    )
  );
  const firstPermittedMenu = computed(() => permittedMenuList.value[0] ?? null);

  const updateUser = (payload: Partial<UserInfo>) => {
    auth.value.user = {
      ...auth.value.user,
      ...payload,
    };
  };

  const {
    data,
    isLoading: isLoginPending,
    loginRequest,
    error: loginError,
  } = useLogin();

  const hasLoginError = computed(() => !!loginError.value);
  const login = async (payload: LoginInfo) => {
    await loginRequest(payload);

    if (data.value) {
      updateUser(data.value);
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

    permittedMenuLookupById,
    permittedMenuLookupByRoute,
    firstPermittedMenu,

    updateUser,
    login,
    logout,
  };
});
