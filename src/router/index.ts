import { createRouter, createWebHashHistory } from 'vue-router';
import type { Router } from 'vue-router';
import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';

import type { BreadcrumbItem } from '@/stores/ui';
import { createNamedEntryForGlobImport } from '@/utils/misc';

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

const middlewareModules = import.meta.glob<(router: Router) => void>(
  './middleware/*.ts',
  {
    import: 'default',
    eager: true,
  }
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
createNamedEntryForGlobImport(middlewareModules).forEach(([_, m]) => {
  m(router);
});

export { router };
