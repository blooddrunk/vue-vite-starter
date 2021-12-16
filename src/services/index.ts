import { promiseTimeout } from '@vueuse/shared';
import { random } from 'lodash-es';

export const fetchCaptcha = async () => {
  await promiseTimeout(1000);
  return random(1000);
};
