import type { Router, RouteLocationRaw } from 'vue-router';

export default (router: Router) => {
  router.beforeEach((to) => {
    if (!to.name || !String(to.name).startsWith('mobile')) {
      return;
    }

    const auth = useMobileAuthStore();

    const isLoggedIn = auth.isLoggedIn;
    const isInLoginPage = to.name === 'mobile-login';
    const requiresAuth =
      !isLoggedIn &&
      (typeof to.meta.requiresAuth === 'undefined'
        ? true
        : !!to.meta.requiresAuth);

    if (isInLoginPage && isLoggedIn) {
      auth.logout();
    } else if (requiresAuth && !isLoggedIn) {
      return {
        name: 'login',
        query: {
          from: to.name || 'mobile',
          ...to.query,
        },
      } as RouteLocationRaw;
    }
  });
};
