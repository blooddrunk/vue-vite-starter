import { Router } from 'vue-router';
import NProgress from 'nprogress';

export default (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (to.name) {
      NProgress.start();
    }
    next();
  });

  router.afterEach(() => {
    NProgress.done();
  });
};
