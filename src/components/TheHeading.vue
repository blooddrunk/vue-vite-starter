<template>
  <nav :class="$style.heading">
    <AppLogo is-link></AppLogo>

    <el-dropdown size="medium" @command="handleCommand">
      <div class="tw-flex tw-items-center tw-text-white">
        <IconMe :size="18"></IconMe>
        <span class="tw-ml-1">{{ userName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="password">
            修改密码
            <IconKey class="tw-ml-1"> </IconKey>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            退出登录
            <IconLogout class="tw-ml-1"> </IconLogout>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const userName = store.getters['auth/userName'];

    const handleCommand = async (command: string) => {
      switch (command) {
        case 'logout':
          await store.dispatch('auth/logout');
          router.push({ name: 'sign-in' });
          break;

        default:
          break;
      }
    };
    return {
      userName,
      handleCommand,
    };
  },
});
</script>

<style lang="postcss" module>
.heading {
  background-image: linear-gradient(
    to right,
    var(--color-primary) 75%,
    var(--color-tertiary)
  );
  background-color: var(--color-primary);

  @apply tw-flex-shrink-0 tw-flex tw-items-center tw-justify-between tw-p-4;
}
</style>
