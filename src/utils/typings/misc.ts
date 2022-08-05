import { RouteLocationRaw } from 'vue-router';

export type CommonSelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type BreadcrumbItem = {
  text: string;
  to?: RouteLocationRaw;
  isVisible?: boolean;
};

export type MenuItem = {
  id: string;
  title: string;
  icon?: string;
  route?: RouteLocationRaw;
  children?: MenuItem[];
};
