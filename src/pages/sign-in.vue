<template>
  <div
    :class="$style.root"
    class="tw-h-screen tw-relative tw-flex tw-bg-primary"
  >
    <div
      class="tw-flex-grow tw-hidden lg:tw-flex tw-flex-col tw-items-center tw-justify-center"
    >
      <AppLogo size="large"></AppLogo>
      <img
        class="tw-mt-16"
        src="@/assets/images/login.png"
        alt="login background"
      />
    </div>

    <div :class="$style.formWrapper">
      <AppLogo size="large" class="lg:tw-hidden tw-mb-20"></AppLogo>

      <div
        class="tw-py-6 tw-w-80 2xl:tw-w-88 tw-px-10 2xl:tw-px-14 tw-shadow tw-rounded-md tw-bg-white"
      >
        <header>
          <h3
            class="tw-text-primary tw-font-semibold tw-text-xl tw-text-center tw-tracking-widiest"
          >
            用户登录
          </h3>
        </header>

        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__bounceOut animate__fast"
          mode="in-out"
        >
          <el-alert
            v-if="loginErrorMessage"
            class="tw-mt-6"
            :title="loginErrorMessage"
            type="error"
            effect="dark"
            :closable="false"
          >
          </el-alert>
        </transition>

        <el-form class="tw-mt-6" status-icon @submit="onSubmit">
          <InputWrapper
            name="username"
            label="用户名"
            :show-label="false"
            required
            placeholder="手机号/账号"
            clearable
          >
            <template #prefix>
              <div class="el-input__icon">
                <IconUser></IconUser>
              </div>
            </template>
          </InputWrapper>

          <InputWrapper
            name="password"
            label="密码"
            :show-label="false"
            required
            placeholder="密码"
            clearable
          >
            <template #prefix>
              <div class="el-input__icon">
                <IconLock></IconLock>
              </div>
            </template>
          </InputWrapper>

          <div class="tw-grid tw-grid-cols-3 tw-gap-x-1">
            <InputWrapper
              class="tw-col-span-2"
              name="captcha"
              label="验证码"
              :show-label="false"
              required
              placeholder="验证码"
              clearable
            >
              <template #prefix>
                <div class="el-input__icon">
                  <IconPic></IconPic>
                </div>
              </template>
            </InputWrapper>

            <div style="height: 40px">
              <transition
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
                mode="out-in"
              >
                <div
                  v-if="isCapchaBroken"
                  class="tw-h-full tw-flex tw-items-center tw-justify-center tw-text-yellow-300 tw-text-xs tw-cursor-pointer"
                  @click="fetchCaptcha"
                >
                  加载失败
                </div>
                <img
                  v-else
                  ref="captchaRef"
                  class="tw-rounded-sm tw-cursor-pointer tw-object-contain"
                  :src="captchaUrl"
                  alt="captcha"
                  @click="fetchCaptcha"
                />
              </transition>
            </div>
          </div>

          <el-form-item>
            <el-button
              class="tw-w-full"
              type="primary"
              :disabled="isLoginButtonDisabled"
              :loading="isLoginPending"
              native-type="submit"
            >
              <transition
                enter-active-class="animate__animated animate__heartBeat animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
                mode="out-in"
                @after-enter="handleLoginSuccess"
                @enter-cancelled="handleLoginSuccess"
              >
                <IconCheckOne v-if="isLoggedIn"></IconCheckOne>
                <span v-else>{{ loginButtonTest }}</span>
              </transition>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: empty
  requiresAuth: false
</route>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  watchEffect,
  onMounted,
} from 'vue';
import { useForm } from 'vee-validate';
import { useRouter, useRoute } from 'vue-router';
import { useTimeoutFn } from '@vueuse/core';

import { useStore } from '@/store';
import { LoginInfo } from '@/store/modules/auth';

export default defineComponent({
  setup() {
    /** login state*/
    const store = useStore();
    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
    const isLoginPending = computed(() => store.state.auth.isLoginPending);
    const loginErrorMessage = computed(() => store.state.auth.error?.message);
    const hasLoginError = computed(() => store.getters['auth/hasLoginError']);
    const loginButtonTest = computed(() =>
      isLoginPending.value ? '登录中...' : '登 录'
    );
    const clearError = () => store.commit('auth/clearError');

    /** captcha handling */
    const isCapchaBroken = ref(false);
    const captchaUrl = ref('');
    const captchaRef = ref<HTMLImageElement>();
    const setCaptchaUrl = () => {
      captchaUrl.value = `/captcha?_r=${Date.now()}`;
    };
    setCaptchaUrl();
    const fetchCaptcha = () => {
      setCaptchaUrl();
    };

    onMounted(() => {
      console.log('mounted');

      if (captchaRef.value) {
        captchaRef.value.onload = () => {
          isCapchaBroken.value = false;
        };

        captchaRef.value.onerror = () => {
          isCapchaBroken.value = true;
        };
      }
    });

    watchEffect(() => {
      if (hasLoginError.value) {
        fetchCaptcha();
      }
    });

    /** form handling*/
    const validationSchema = {
      username: 'required',
      password: 'required',
      captcha: 'required',
    };
    const { values, meta, isSubmitting, handleSubmit } = useForm<LoginInfo>({
      validationSchema,
      initialValues: {
        username: '',
        password: '',
        captcha: '',
      },
    });
    const invalid = computed(() => !meta.value.valid && meta.value.dirty);
    const isLoginButtonDisabled = computed(
      () => invalid.value || isSubmitting.value
    );

    const {
      start: startTransitionCounting,
      stop: stopTransitionCounting,
    } = useTimeoutFn(
      () => {
        if (isLoggedIn.value && !isLoginTransitionFinished.value) {
          handleLoginSuccess();
        }
      },
      2000,
      false
    );
    const onSubmit = handleSubmit(async (values) => {
      isLoginTransitionFinished.value = false;

      await store.dispatch('auth/login', values);

      // in case animationend did not happen, wait a while, then force redirecting
      startTransitionCounting();
    });

    const router = useRouter();
    const route = useRoute();
    const isLoginTransitionFinished = ref(false);
    const handleLoginSuccess = async () => {
      // in case page has already been redirected
      // should not happen
      if (route.name !== 'sign-in' || isLoginTransitionFinished.value) {
        return;
      }

      store.commit('auth/setHasForcedOut', false);
      isLoginTransitionFinished.value = true;
      stopTransitionCounting();

      const { from, ...rest } = route.query;
      await router.push({
        name: String(from === 'sign-in' || !from ? 'index' : from),
        query: rest,
      });

      fetchCaptcha();
    };

    watch(values, () => {
      if (hasLoginError.value) {
        clearError();
      }
    });

    return {
      isLoggedIn,
      isLoginPending,
      loginErrorMessage,
      hasLoginError,
      isLoginButtonDisabled,
      loginButtonTest,

      onSubmit,
      isSubmitting,
      handleLoginSuccess,

      isCapchaBroken,
      captchaUrl,
      captchaRef,
      fetchCaptcha,
    };
  },
});
</script>

<style lang="postcss" module>
.root {
  background-image: radial-gradient(
    var(--color-primary),
    var(--color-tertiary)
  );
}

.formWrapper {
  background-image: url(~assets/images/login.png);
  @apply tw-flex-grow tw-flex tw-flex-col tw-items-center tw-justify-center;
  @apply tw-bg-no-repeat tw-bg-center;
  @screen lg {
    @apply tw-bg-none;
  }
}

.captcha {
  height: 36px;
  @apply tw-rounded-sm tw-cursor-pointer tw-object-contain;
}
</style>
