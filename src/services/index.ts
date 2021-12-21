import { promiseTimeout } from '@vueuse/shared';
import { random } from 'lodash-es';

export * from './product';
export * from './cart';
export * from './order';

export const fetchAuthCode = async (mobile: string) => {
  await promiseTimeout(1000);
  return random(1000);
};
