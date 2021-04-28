import { Router, RouteLocationRaw } from 'vue-router';

import { useStore } from '@/store';

export default (router: Router) => {
  router.beforeEach((to) => {
    const store = useStore();

    const isLoggedIn = store.getters['auth/isLoggedIn'];
    const isInLoginPage = to.name === 'sign-in';
    const requiresAuth =
      !isLoggedIn &&
      (typeof to.meta.requiresAuth === 'undefined'
        ? true
        : !!to.meta.requiresAuth);

    if (isInLoginPage && isLoggedIn) {
      store.dispatch('auth/logout');
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
