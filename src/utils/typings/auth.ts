export type LoginInfo = {
  username: string;
  password: string;
  captcha: string;
};

export type AuthInfo = {
  user: Partial<{
    userName: string;
    mobile: string;
  }>;
};

export type MobileLoginInfo = {
  mobile: string;
  authCode: string;
};
