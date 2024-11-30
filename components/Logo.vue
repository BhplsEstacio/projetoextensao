<script setup lang="ts">
    defineProps<{
        type?: 'sm' | 'md' | 'lg'
    }>();
</script>

<template>
    <div class="flex gap-2 items-center justify-center cursor-default select-none">
        <img src="public/img/logo.svg" alt="logo" :class="`${type === 'sm' ? 'h-6 max-sm:h-4':type === 'md' ? 'h-10':'h-12'} max-sm:h-8`"/>
        <div class="flex flex-col gap-1 items-center justify-center">
            <h1 v-if="type !== 'sm'" :class="`${type === 'md' ? 'text-2xl':'text-4xl'} leading-none text-neutral-100 max-sm:text-xl`">Nuxt To-DO</h1>
            <span v-if="!type || type==='lg'" class="leading-none">Your Task Manager</span>
        </div>
    </div>
</template>