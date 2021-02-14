import { mapValues } from 'lodash-es';

export const trimValues = (filter: Record<string, any>) =>
  mapValues(filter, (value) => {
    if (value && typeof value === 'string') {
      return value.trim();
    }

    return value;
  });
