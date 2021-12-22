import { useAxios } from '@/hooks/useAxios';
import { OrderInfo, OrderItem } from '@typings';

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
      return ((data as OrderItem[]) || [])
        .map((item) => ({
          ...item,
          orderNumber: String(Date.now()),
          orderTime: Date.now(),
        }))
        .slice(0, 10);
    },
  });
};
