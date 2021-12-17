import { Router, RouteLocationRaw } from 'vue-router';

import { useAuthStore } from '@/stores/auth';

export default (router: Router) => {
  router.beforeEach((to) => {
    if (to.name && String(to.name).startsWith('mobile')) {
      return;
    }

    const auth = useAuthStore();

    const isLoggedIn = auth.isLoggedIn;
    const isInLoginPage = to.name === 'sign-in';
    const requiresAuth =
      !isLoggedIn &&
      (typeof to.meta.requiresAuth === 'undefined'
        ? true
        : !!to.meta.requiresAuth);

    if (isInLoginPage && isLoggedIn) {
      auth.logout();
    } else if (requiresAuth && !isLoggedIn) {
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
