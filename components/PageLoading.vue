<script setup lang="ts">
    const nuxtApp = useNuxtApp();
    const show = ref(false);

    addRouteMiddleware('global-loader', () => show.value = true, { global: true })
    nuxtApp.hook('page:finish', () => {show.value = false})
</script>

<template>
    <div class="w-screen h-screen box-border bg-neutral-900 grid place-items-center" v-show="show">
        Loading...
    </div>
</template>