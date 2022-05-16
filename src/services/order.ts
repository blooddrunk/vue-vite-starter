import { sample, random } from 'lodash-es';

import { useAxios } from '@/composables/useAxios';
import { OrderInfo, OrderItem, CartItem } from '@typings';
import { precisionRound, precisionFixed } from '@/utils/math';

export const placeOrder = (
  onSuccess: () => void,
  onError: (e: unknown) => void
) => {
  const { data, isPending, isSuccessful, errorMessage, request } =
    useAxios<OrderInfo>(
      {} as OrderInfo,
      {
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'post',
        __needValidation: false,
      },
      {
        onSuccess,
        onError,
      }
    );
  return {
    data,
    isPending,
    isSuccessful,
    errorMessage,
    request: (item: OrderInfo) =>
      request({
        data: item,
      }),
  };
};

export const fetchOrderList = () => {
  return useAxios<OrderItem[]>([] as OrderItem[], {
    url: 'https://jsonplaceholder.typicode.com/posts',
    __needValidation: false,
    __transformData: (data) => {
      return [...Array(10).keys()].map((id) => {
        const items = (data as CartItem[])
          .slice(0, random(1, 3))
          .map((item) => ({
            ...item,
            price: precisionRound(random(1, 500, true)),
            thumbnail: 'http://via.placeholder.com/240x240',
            quantity: random(1, 10),
          }));

        return {
          orderNumber: String(id),
          orderTime: Date.now(),
          orderStatus: sample(['已预约', '已下单', '已办理', '已撤单']),
          quantity: items.reduce((acc, item) => item.quantity + acc, 0),
          totalPrice: precisionFixed(
            items.reduce((acc, item) => item.quantity * item.price + acc, 0)
          ),
          items,
        };
      });
    },
  });
};

export const cancelOrder = (
  onSuccess: () => void,
  onError: (e: unknown) => void
) => {
  const { data, isPending, isSuccessful, errorMessage, request } =
    useAxios<OrderItem>(
      {} as OrderItem,
      {
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'post',
        __needValidation: false,
      },
      {
        onSuccess,
        onError,
      }
    );
  return {
    data,
    isPending,
    isSuccessful,
    errorMessage,
    request: (item: OrderItem) =>
      request({
        data: item,
      }),
  };
};
