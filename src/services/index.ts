import { promiseTimeout } from '@/utils/misc';
import { random } from 'lodash-es';

export const fetchAuthCode = async (mobile: string) => {
  await promiseTimeout(1000);
  return random(1000);
};
