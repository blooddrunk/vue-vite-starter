import { promiseTimeout } from '@vueuse/shared';
import { random } from 'lodash-es';

export * from './product';

export const getAuthCode = async (mobile: string) => {
  console.log(mobile);
  await promiseTimeout(1000);
  return random(1000);
};
