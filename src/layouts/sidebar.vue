<template>
  <div class="flex">
    <div class="min-h-screen w-full flex flex-col">
      <TheHeading></TheHeading>

      <div class="flex-grow flex overflow-x-hidden">
        <TheSidebar></TheSidebar>

        <main class="flex-grow p-4 xl:p-8 2xl:p-12 bg-main">
          <TheBreadcrumb></TheBreadcrumb>

          <section class="p-3 xl:p-6 2xl:p-9 bg-white shadow-xl">
            <router-view></router-view>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>
