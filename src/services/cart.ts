import { random } from 'lodash-es';

import { useAxios } from '@/hooks/useAxios';
import { CartItem } from '@typings';

export const fetchCartList = () => {
  return useAxios<CartItem[]>(
    {
      url: 'https://jsonplaceholder.typicode.com/posts',
      __needValidation: false,
      __transformData: (data, { headers }) => {
        return {
          items: ((data as CartItem[]) || []).map((item) => ({
            ...item,
            price: random(2000),
            thumbnail: 'http://via.placeholder.com/240x240',
            quantity: random(1, 10),
          })),
          total: Number(headers['x-total-count']) || 0,
        };
      },
    },
    [] as CartItem[]
  );
};
