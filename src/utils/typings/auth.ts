export type LoginInfo = {
  username: string;
  password: string;
  captcha: string;
};

export type UserInfo = Partial<{
  userName: string;
}>;
