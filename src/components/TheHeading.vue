<template>
  <nav :class="$style.heading">
    <AppLogo is-link></AppLogo>

    <el-dropdown size="medium" @command="handleCommand">
      <div class="flex items-center text-white">
        <IconMdiAccount class="text-[1.3em]"></IconMdiAccount>
        <span class="ml-1">{{ userName }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="password">
            修改密码
            <IconMdiKey class="ml-1"> </IconMdiKey>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            退出登录
            <IconMdiLogout class="ml-1"> </IconMdiLogout>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore();

const userName = auth.userName;

const handleCommand = async (command: string) => {
  switch (command) {
    case 'logout':
      await auth.logout();
      router.push({ name: 'sign-in' });
      break;

    default:
      break;
  }
};
</script>

<style lang="postcss" module>
.heading {
  height: var(--app-header-height);

  @apply flex-shrink-0 flex items-center justify-between p-4;
  @apply bg-primary;
}
</style>
