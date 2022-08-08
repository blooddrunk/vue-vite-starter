import type { Router, RouteLocationRaw } from 'vue-router';
import { ElNotification } from 'element-plus';

import { getRouteOfMenuItem } from '@/utils/biz/menu';

const notifyPermission = (message: string) =>
  ElNotification.warning({
    title: '提醒',
    message,
    duration: 5000,
  });

export default (router: Router) => {
  router.beforeEach((to) => {
    // TODO: remove this
    if (to.name && String(to.name).startsWith('mobile')) {
      return;
    }

    const authStore = useAuthStore();
    const uiStore = useUIStore();

    const isLoggedIn = authStore.isLoggedIn;
    const isInLoginPage = to.name === 'sign-in';
    const requiresAuth =
      typeof to.meta.requiresAuth === 'undefined'
        ? true
        : !!to.meta.requiresAuth;

    if (isLoggedIn) {
      if (isInLoginPage) {
        authStore.logout();
      } else if (requiresAuth) {
        // TODO: fetch remote user menu if needed

        const fallbackMenu = authStore.firstPermittedMenu;
        const menuLookup = authStore.permittedMenuLookupByRoute;
        const allMenuLookup = uiStore.menuLookupByRoute;

        const targetMenu = allMenuLookup[to.name as string];
        const systemOfRoute = targetMenu ? targetMenu.system : '';
        const isCurrentRouteAvailable =
          !!menuLookup[to.name as string] && !!systemOfRoute;

        let hasNoPermissionAtAll = false;
        if (isCurrentRouteAvailable) {
          uiStore.switchSystem(
            systemOfRoute || uiStore.firstAvailableSystem.value
          );
        } else if (fallbackMenu) {
          notifyPermission(
            `没有访问 ${targetMenu?.title ?? '未命名'} 的权限，请联系管理员`
          );
          const fallbackRoute = getRouteOfMenuItem(fallbackMenu);
          if (fallbackRoute) {
            return fallbackRoute;
          } else {
            hasNoPermissionAtAll = true;
          }
        } else {
          hasNoPermissionAtAll = true;
        }

        if (hasNoPermissionAtAll) {
          notifyPermission(`没有访问系统的权限，请联系管理员`);
          return {
            name: 'sign-in',
          } as RouteLocationRaw;
        }
      }
    } else if (requiresAuth) {
      return {
        name: 'sign-in',
        query: {
          from: to.name || 'index',
          ...to.query,
        },
      } as RouteLocationRaw;
    }
  });
};
