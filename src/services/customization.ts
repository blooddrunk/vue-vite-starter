import { useAxios } from '@/hooks/useAxios';
import type { CustomizationInfo } from '@typings';

export const fetchCustomizationInfo = () => {
  const { data, isPending, errorMessage, request } =
    useAxios<CustomizationInfo>({} as CustomizationInfo, {
      __needValidation: false,
    });
  return {
    data,
    isPending,
    errorMessage,
    request: () =>
      request({
        url: `https://jsonplaceholder.typicode.com/posts`,
        __transformData: (data) => ({
          ...(data as CustomizationInfo),
          detailImage: 'http://via.placeholder.com/640x1080',
          bannerImageList: [
            {
              url: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm',
              isVideo: true,
            },
          ].concat(
            [...Array(10).keys()].map(() => ({
              url: `http://via.placeholder.com/640`,
              isVideo: false,
            }))
          ),
        }),
      }),
  };
};
