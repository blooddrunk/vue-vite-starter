import { createRouter, createWebHashHistory } from 'vue-router';
import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';

import { BreadcrumbItem } from '@typings';
import * as middlewareList from './middleware';

export const routerHistory = createWebHashHistory(import.meta.env.BASE_URL);

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'default' | 'error' | 'empty';
    requiresAuth?: boolean;
    breadcrumb?: BreadcrumbItem | BreadcrumbItem[] | true;
    title?: string;
    canNavBack?: boolean;
    keepAlive?: boolean;
  }
}

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: routerHistory,
  routes,
});

let middlewareName: keyof typeof middlewareList;
for (middlewareName in middlewareList) {
  const middleware = middlewareList[middlewareName];

  middleware(router);
}

export { router };
