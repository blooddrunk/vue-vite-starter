import { random } from 'lodash-es';

import { useAxios } from '@/composables/useAxios';
import { precisionRound } from '@/utils/math';
import { CartItem } from '@typings';

export const fetchCartList = () => {
  return useAxios<CartItem[]>([] as CartItem[], {
    url: 'https://jsonplaceholder.typicode.com/posts',
    __needValidation: false,
    __transformData: (data) => {
      return ((data as CartItem[]) || [])
        .map((item) => ({
          ...item,
          price: precisionRound(random(1, 500, true)),
          thumbnail: 'http://via.placeholder.com/240x240',
          quantity: random(1, 10),
        }))
        .slice(0, 10);
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
  const { data, isPending, isSuccessful, errorMessage, request } =
    useAxios<CartItem>({} as CartItem, {
      method: 'delete',
      __needValidation: false,
    });
  return {
    data,
    isPending,
    isSuccessful,
    errorMessage,
    request: (item: CartItem) =>
      request({
        url: `https://jsonplaceholder.typicode.com/posts/${item.id}`,
      }),
  };
};
