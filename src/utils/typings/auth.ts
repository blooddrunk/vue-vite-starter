import { RemovableRef } from '@vueuse/shared';

export type LoginInfo = {
  username: string;
  password: string;
  captcha: string;
};

export type UserInfo = {
  userName: string;
  mobile: string;
};

export type AuthInfo = {
  user: RemovableRef<UserInfo>;
};

export type MobileLoginInfo = {
  mobile: string;
  authCode: string;
};
