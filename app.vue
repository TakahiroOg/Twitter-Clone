<template>
  <div class="bg-white dark:bg-dim-900">

    <!-- App -->
    <div v-if="user" class="min-h-full">

      <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

        <!-- Left sidebar -->
        <div class="hidden md:block xs:col-span-1 xl:col-span-2">
          <div class="sticky top-0">
            <SidebarLeft />
          </div>
        </div>

        <!-- Main content -->
        <main class="col-span-12 md:col-span-8 xl:col-span-6 bg-gray-800">
          <router-view />
        </main>

        <!-- Right sidebar -->
        <div class="hidden md:block  xl:col-span-4 md:col-span-3 bg-gray-800">
          <div class="sticky top-0">
            <SidebarRight />
          </div>
        </div>


      </div>

    </div>

    <AuthPage v-else />
  </div>
</template>

<script setup>
const { useAuthUser, initAuth } = useAuth()

onBeforeMount(() => {
  initAuth()
})

const user = useAuthUser()
</script>