import { RemovableRef } from '@vueuse/shared';

export type LoginInfo = {
  username: string;
  password: string;
  captcha: string;
};

export type MobileLoginInfo = {
  mobile: string;
  authCode: string;
};

export type UserInfo = {
  userName: string;
};

export type MobileUserInfo = {
  mobile: string;
  area?: string;
};

export type AuthInfo = {
  user: RemovableRef<UserInfo>;
};

export type MobileAuthInfo = {
  user: RemovableRef<MobileUserInfo>;
};
