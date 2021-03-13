import { toNumber } from '@vue/shared';

import { createElementField } from '@/utils/form/createElementField';

export default createElementField<number>('ElInputNumber', {
  valueFormatter: toNumber,
});
