import { random } from 'lodash-es';

import { useAxios } from '@/hooks/useAxios';
import { CartItem } from '@typings';

export const fetchCartList = () => {
  return useAxios<CartItem[]>([] as CartItem[], {
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
  });
};

export const addCartItem = () => {
  const { data, isPending, isSuccessful, errorMessage, request } =
    useAxios<CartItem>({} as CartItem, {
      url: 'https://jsonplaceholder.typicode.com/posts',
      method: 'post',
      __needValidation: false,
    });
  return {
    data,
    isPending,
    isSuccessful,
    errorMessage,
    request: (item: CartItem) =>
      request({
        data: item,
      }),
  };
};

export const patchCartItem = () => {
  const { data, isPending, errorMessage, request } = useAxios<CartItem>(
    {} as CartItem,
    {
      method: 'patch',
      __needValidation: false,
    }
  );
  return {
    data,
    isPending,
    errorMessage,
    request: (item: CartItem) =>
      request({
        url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
        data: {
          quantity: item.quantity,
        },
      }),
  };
};

export const removeCartItem = () => {
  const { data, isPending, errorMessage, request } = useAxios<CartItem>(
    {} as CartItem,
    {
      method: 'delete',
      __needValidation: false,
    }
  );
  return {
    data,
    isPending,
    errorMessage,
    request: (item: CartItem) =>
      request({
        url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
      }),
  };
};
