import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';

import * as middlewareList from './middleware';
import { CustomRouteMeta } from '@typings';

export const routerHistory = createWebHashHistory(import.meta.env.BASE_URL);

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends CustomRouteMeta {}
}

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: routerHistory,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

let middlewareName: keyof typeof middlewareList;
for (middlewareName in middlewareList) {
  const middleware = middlewareList[middlewareName];

  middleware(router);
}

export { router };
