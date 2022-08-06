import { Router, RouteLocationRaw } from 'vue-router';

export default (router: Router) => {
  router.beforeEach((to) => {
    if (to.name && String(to.name).startsWith('mobile')) {
      return;
    }

    const authStore = useAuthStore();
    const uiStore = useUIStore();

    const isLoggedIn = authStore.isLoggedIn;
    const isInLoginPage = to.name === 'sign-in';
    const requiresAuth =
      !isLoggedIn &&
      (typeof to.meta.requiresAuth === 'undefined'
        ? true
        : !!to.meta.requiresAuth);

    if (isLoggedIn) {
      if (isInLoginPage) {
        authStore.logout();
      } else {
        // TODO: fetch user menu

        const menuLookup = uiStore.menuLookupByRoute;
        const systemOfRoute = menuLookup[to.name as string]
          ? menuLookup[to.name as string].system
          : '';

        uiStore.switchSystem(
          systemOfRoute || uiStore.firstAvailableSystem.value
        );
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
