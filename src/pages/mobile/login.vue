<template>
  <article class="tw-flex tw-flex-col tw-h-screen tw-pt-[15vh] tw-pb-8 tw-px-8">
    <header>
      <h3 class="tw-py-3 tw-text-2xl tw-font-bold">手机快捷登录</h3>
      <p class="tw-text-sm tw-text-light">未注册过的手机号将自动创建账号</p>
    </header>

    <form class="tw-mt-12" @submit.prevent>
      <BaseTextInput
        name="mobile"
        label="手机号"
        inputmode="numeric"
        maxlength="11"
        placeholder="请输入手机号"
      ></BaseTextInput>

      <BaseTextInput
        name="authCode"
        label="验证码"
        inputmode="numeric"
        maxlength="6"
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
        <van-button
          class="tw-w-11/12"
          type="primary"
          round
          @click="handleLogin"
        >
          登录
        </van-button>
      </div>
    </form>

    <footer class="tw-mt-auto tw-flex tw-justify-center tw-text-xs">
      <van-checkbox
        v-model="isUserAgreementChecked"
        :class="checkboxClass"
        icon-size="16px"
        @animationend.native="handleAnimationEnd"
      >
        <span>
          登录即代表同意
          <router-link class="tw-text-primary" to="/mobile/user-agreement">
            《用户协议》
          </router-link>
          和
          <router-link class="tw-text-primary" to="/mobile/privacy-policy">
            《隐私政策》
          </router-link>
        </span>
      </van-checkbox>
    </footer>
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
import { Toast } from 'vant';

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

const isUserAgreementChecked = ref(false);
const checkboxClass = ref('');
const handleAnimationEnd = () => {
  checkboxClass.value = '';
};
const handleLogin = handleSubmit((formValues) => {
  console.log(formValues);

  console.log(isUserAgreementChecked.value);

  if (!isUserAgreementChecked.value) {
    Toast(`请先阅读并同意用户协议和隐私政策`);
    checkboxClass.value = 'animate__animated animate__shakeX';
  } else {
    checkboxClass.value = '';
  }
});
</script>
