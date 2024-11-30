<script setup lang="ts">
    defineProps<{
        icon?: string,
        iconSize?: string,
        color?: string,
        to: string
    }>();
</script>

<template>
    <NuxtLink :class="`${color ?? 'text-orange-500'} flex items-center gap-1 self-start text-sm hover:brightness-125`" :to="to">
        <Icon v-if="icon" :class="iconSize ?? 'text-lg'">{{ icon }}</Icon>
        <span>
            <slot />
        </span>
    </NuxtLink>
</template>