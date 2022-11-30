<template>
  <div class="flex">
    <div class="h-screen w-full flex flex-col">
      <TheHeading></TheHeading>

      <div class="flex-grow flex overflow-x-hidden">
        <TheSidebar></TheSidebar>

        <main
          :class="
            uiStore.isSidebarCollapsed
              ? 'w-[calc(100vw-65px)]'
              : 'w-[calc(100vw-14rem)]'
          "
          class="flex flex-col flex-grow p-4 xl:p-8 2xl:p-12 bg-main"
        >
          <template v-if="navTabStore.isNavTabEnabled">
            <TheNavTab></TheNavTab>
            <section
              class="flex-grow p-3 xl:p-6 2xl:p-9 bg-white shadow-xl overflow-y-auto"
            >
              <router-view v-slot="{ Component }">
                <keep-alive :include="navTabStore.currentNavTabNameList">
                  <component :is="Component"></component>
                </keep-alive>
              </router-view>
            </section>
          </template>

          <template v-else>
            <TheBreadcrumb></TheBreadcrumb>

            <section
              class="flex-grow p-3 xl:p-6 2xl:p-9 bg-white shadow-xl overflow-y-auto"
            >
              <router-view></router-view>
            </section>
          </template>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const navTabStore = useNavTabStore();
const uiStore = useUIStore();
</script>
