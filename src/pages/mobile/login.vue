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
        inputmode="text"
        placeholder="请输入手机号"
      ></BaseTextInput>

      <BaseTextInput
        name="authCode"
        label="验证码"
        inputmode="text"
        placeholder="请输入验证码"
      >
        <template #append>
          <a
            :class="
              isCountdownActive ? 'tw-text-slate-400/75' : 'tw-text-primary'
            "
            @click.prevent="handleAuthCodeRequest"
          >
            {{ authCodeButtonText }}
          </a>
        </template>
      </BaseTextInput>

      <div class="tw-mt-16 tw-text-center">
        <van-button class="tw-w-11/12" type="primary" round>登录</van-button>
      </div>
    </form>
  </article>
</template>

<route lang="yaml">
meta:
  layout: empty
  requiresAuth: false
</route>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useForm } from 'vee-validate';
import { useIntervalFn } from '@vueuse/core';

import { MobileLoginInfo } from '@typings';
import { getAuthCode } from '@/services';

const { values, validateField, meta, isSubmitting, handleSubmit } =
  useForm<MobileLoginInfo>({
    validationSchema: {
      mobile: 'required|mobile',
      authCode: 'required|numeric|max:6',
    },
    initialValues: {
      mobile: '',
      authCode: '',
    },
  });

const maxWaitSecs = 10;
const countdown = ref(maxWaitSecs);
const {
  isActive: isCountdownActive,
  pause,
  resume,
} = useIntervalFn(
  () => {
    countdown.value--;
    if (countdown.value <= 0) {
      pause();
    }
  },
  1000,
  { immediate: false, immediateCallback: true }
);
const authCodeButtonText = computed(() =>
  isCountdownActive.value ? `${countdown.value}s后重新获取` : '获取验证码'
);

const handleAuthCodeRequest = async () => {
  const { valid } = await validateField('mobile');
  if (!valid) {
    return;
  }

  if (isCountdownActive.value) {
    return;
  }

  countdown.value = maxWaitSecs;
  await getAuthCode(values.mobile);
  resume();
};

const invalid = computed(() => !meta.value.valid && meta.value.dirty);
</script>
