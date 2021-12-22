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

export interface CustomRouteMeta {
  layout?: 'default' | 'error' | 'empty';
  requiresAuth?: boolean;
  breadcrumb?: BreadcrumbItem | BreadcrumbItem[] | true;
  title?: string;
  canNavBack?: boolean;
  keepAlive?: boolean;
}

export type MenuItem = {
  id: string;
  title: string;
  icon?: string;
  to?: RouteLocationRaw;
  children?: MenuItem[];
};

export type ProductMedia = {
  url: string;
  isVideo?: false;
};

export type ProductItem = {
  id: string;
  title: string;
  body: string;
  price: number;
  thumbnail: string;
  bannerImageList?: ProductMedia[];
  detailImage?: string;
};

export type CartItem = ProductItem & {
  quantity: number;
  checked?: boolean;
};

export type OrderInfo = {
  items: CartItem[];
  remarks?: string;
  serviceCharge?: number;
  isServiceAgreementChecked?: boolean;
  contactPerson: string;
  servicePhone: string;
  address: string;
};

export type OrderItem = OrderInfo & {
  orderNumber: string;
  orderStatus: string;
  orderTime: number;
  crmNumber?: string;
  serviceTime?: number;
  cancelReason?: string;
};
