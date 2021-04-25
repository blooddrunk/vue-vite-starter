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

      <div class="tw-w-80 tw-py-6 tw-px-10 tw-shadow tw-rounded-md tw-bg-white">
        <header>
          <h3
            class="tw-text-primary tw-font-semibold tw-text-xl tw-text-center tw-tracking-widiest"
          >
            用户登录
          </h3>
        </header>

        <el-form class="tw-mt-6" status-icon @submit="onSubmit">
          <InputWrapper
            name="username"
            label="用户名"
            :show-label="false"
            required
            placeholder="手机号/账号"
            clearable
            autofocus
          >
            <template #prefix>
              <div
                class="tw-h-full tw-grid tw-place-content-center el-input__icon"
              >
                <IconUser></IconUser>
              </div>
            </template>
          </InputWrapper>
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
import { defineComponent } from 'vue';
import { useForm } from 'vee-validate';

type LoginInfo = {
  username: string;
  password: string;
  captcha: string;
};

export default defineComponent({
  setup() {
    const validationSchema = {
      username: 'required',
      password: 'required',
      captcha: 'required',
    };

    const { values, isSubmitting, handleSubmit } = useForm<LoginInfo>({
      validationSchema,
      initialValues: {
        username: '',
        password: '',
        captcha: '',
      },
    });

    const onSubmit = handleSubmit(async (values) => {
      console.log(values);
    });

    return {
      onSubmit,
      isSubmitting,
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
