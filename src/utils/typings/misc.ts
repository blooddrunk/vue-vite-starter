export type CommonSelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type ServerResponse = {
  errcode: string;
  errmsg: string;
  data: unknown;
};
