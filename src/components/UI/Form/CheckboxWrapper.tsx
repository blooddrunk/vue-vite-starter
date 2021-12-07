import { ElCheckbox} from 'element-plus';

import { createElementField } from '@/utils/form/createElementField';

export default createElementField<string | number | boolean>(ElCheckbox);
