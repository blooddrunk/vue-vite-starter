import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'layouts-generated';

import * as middlewareList from './middleware';

export const routerHistory = createWebHistory(import.meta.env.BASE_URL);

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'default' | 'error' | 'empty';
    requiresAuth?: boolean;
  }
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
