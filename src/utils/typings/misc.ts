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
  to?: RouteLocationRaw;
  children?: MenuItem[];
};

export type ProductItem = {
  id: string;
  title: string;
  body: string;
  price: number;
  thumbnail: string;
};

export type CartItem = ProductItem & {
  quantity: number;
};
