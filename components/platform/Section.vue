<script setup lang="ts">
    defineProps<{
        full?: boolean
    }>();
</script>

<template>
    <section :class="`h-fit min-w-50-8 ${full ? 'w-full':''} max-sm:min-w-full rounded-md sm:p-2 sm:hover:bg-neutral-880 transition-all cursor-default grid place-items-center gap-5`">
        <slot />
    </section>
</template>