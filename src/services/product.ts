import { random } from 'lodash-es';

import { usePaginatedList } from '@/hooks/usePaginatedList';
import { useAxios } from '@/hooks/useAxios';
import { ProductItem } from '@typings';

export const fetchProductList = () => {
  return usePaginatedList<ProductItem>(
    {
      url: 'https://jsonplaceholder.typicode.com/posts',
      __needValidation: false,
      __transformData: (data, { headers }) => {
        return {
          items: ((data as ProductItem[]) || []).map((item) => ({
            ...item,
            price: random(2000),
            thumbnail: 'http://via.placeholder.com/640x240',
          })),
          total: Number(headers['x-total-count']) || 0,
        };
      },
    },
    {
      transformPaginationToQuery: (pagination) => ({
        _page: pagination.currentPage.value,
        _limit: pagination.pageSize.value,
      }),
      infinite: true,
      pageSize: 5,
    }
  );
};

export const fetchProductById = () => {
  const { data, isPending, errorMessage, request } = useAxios<ProductItem>(
    {} as ProductItem,
    {
      __needValidation: false,
    }
  );
  return {
    data,
    isPending,
    errorMessage,
    request: (id: string) =>
      request({
        url: `https://jsonplaceholder.typicode.com/posts/${id}`,
        __transformData: (data) => ({
          ...(data as ProductItem),
          price: random(2000),
          detailImage: 'http://via.placeholder.com/640x1080',
          bannerImageList: [...Array(10).keys()].map(
            () => `http://via.placeholder.com/640`
          ),
        }),
      }),
  };
};
