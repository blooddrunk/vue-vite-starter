import type { Product } from '@typings';

export const useSimpleFormList = () =>
  useAxios<Product[]>(`${import.meta.env.VITE_JSON_SERVER_PATH}products`, [], {
    __needValidation: false,
  });

export const useAddProduct = () => {
  const { execute } = useAxios<Product | null>(
    `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
    null,
    {
      __needValidation: false,
      method: 'post',
    }
  );

  return {
    addProduct: (product: Product) =>
      execute({
        data: product,
      }),
  };
};

export const useRemoveProduct = () => {
  const { execute } = useAxios<Product | null>(
    `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
    null,
    {
      __needValidation: false,
      method: 'delete',
    }
  );

  return {
    removeProduct: (product: Product) =>
      execute({
        data: product,
      }),
  };
};
