<template>
  <article class="tw-h-screen tw-pt-[15vh] tw-px-8">
    <header>
      <h3 class="tw-py-3 tw-text-2xl tw-font-bold">手机快捷登录</h3>
      <p class="tw-text-sm tw-text-light">未注册过的手机号将自动创建账号</p>
    </header>

    <form class="tw-mt-12" @submit.prevent>
      <BaseTextInput
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
      ></BaseTextInput>

      <BaseTextInput name="authCode" label="验证码" placeholder="请输入验证码">
        <template #append>
          <a class="tw-text-primary" @click.prevent="fetchCaptcha">
            获取验证码
          </a>
        </template>
      </BaseTextInput>
    </form>
  </article>
</template>

<route lang="yaml">
meta:
  layout: empty
  requiresAuth: false
</route>

<script lang="ts" setup>
import { computed } from 'vue';
import { useForm } from 'vee-validate';

import { MobileLoginInfo } from '@typings';

const { values, validateField, meta, isSubmitting, handleSubmit } =
  useForm<MobileLoginInfo>({
    validationSchema: {
      mobile: 'required|mobile',
      authCode: 'required|max:6',
    },
    initialValues: {
      mobile: '',
      authCode: '',
    },
  });

console.log(values);
const fetchCaptcha = async () => {
  const { valid } = await validateField('mobile');
  console.log(valid);
};

const invalid = computed(() => !meta.value.valid && meta.value.dirty);
</script>
