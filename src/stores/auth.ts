import { defineStore, acceptHMRUpdate } from 'pinia';
import { pick, keyBy } from 'lodash';

import type { AuthInfo, UserInfo, LoginInfo } from '@typings';
import type { MenuItem } from '@/stores/ui';

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
  const isAdmin = computed(() => userName.value === 'admin');
  const isLoggedIn = computed(() => !!userName.value);

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

  const permittedMenuLookupById = computed(() =>
    isAdmin.value
      ? uiStore.menuLookupById
      : (pick(
          uiStore.menuLookupById,
          (user.value.menuList || []).concat(uiStore.whitelistedMenuIdList)
        ) as Record<string, MenuItem>)
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
  const getFirstPermittedMenu = ({
    excludeIds,
    excludeRoutes,
  }: { excludeIds?: string[]; excludeRoutes?: string[] } = {}) => {
    for (const item of permittedMenuList.value) {
      if (
        (excludeRoutes && excludeRoutes.includes(item.route!)) ||
        (excludeIds && excludeIds.includes(item.id))
      ) {
        continue;
      } else if (item.route) {
        return item;
      }
    }
    return null;
  };
  const firstPermittedMenu = computed(() => getFirstPermittedMenu());

  return {
    user,
    userName,
    isAdmin,
    isLoggedIn,
    loginError,
    hasLoginError,
    isLoginPending,

    permittedMenuLookupById,
    permittedMenuLookupByRoute,
    firstPermittedMenu,
    getFirstPermittedMenu,

    updateUser,
    login,
    logout,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
