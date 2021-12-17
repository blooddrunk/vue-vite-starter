import { random } from 'lodash-es';

import { usePaginatedList } from '@/hooks/usePaginatedList';
import { ProductItem } from '@typings';

export const useProductList = () => {
  return usePaginatedList<ProductItem>(
    {
      url: 'https://jsonplaceholder.typicode.com/comments',
      __needValidation: false,
      __transformData: (data, { headers }) => {
        return {
          items: ((data as ProductItem[]) || []).map((item: ProductItem) => ({
            ...item,
            price: random(2000),
          })),
          total: Number(headers['x-total-count']) || 0,
        };
      },
    },
    {
      paginationToQuery: {
        page: '_page',
        rowsPerPage: '_limit',
      },
    }
  );
};
