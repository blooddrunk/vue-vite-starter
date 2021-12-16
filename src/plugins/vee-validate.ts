import { configure, defineRule } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import {
  required,
  min,
  max,
  numeric,
  min_value,
  max_value,
} from '@vee-validate/rules';

export default async () => {
  const zh_CN = await import('@vee-validate/i18n/dist/locale/zh_CN.json');

  localize({
    zh_CN,
  });
  configure({
    generateMessage: localize(zh_CN.code, {
      messages: {
        required: '{field}不能为空',
      },
    }),
  });

  // setLocale(zh_CN.code);

  defineRule('required', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('numeric', numeric);
  defineRule('min_value', min_value);
  defineRule('max_value', max_value);

  defineRule('mobile', (value) => {
    if (!value || !value.length) {
      return true;
    }

    if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
      return '请输入有效的手机号码';
    }

    return true;
  });
};
