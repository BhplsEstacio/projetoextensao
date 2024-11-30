<script setup lang="ts">

    defineProps<{
        bgColor?: string,
        textColor?: string
        type?: 'button' | 'submit' | 'reset',
        disabled?: boolean,
        hug?: boolean,
        size?: string,
        disabledMessage?: string,
        variant?: 'default' | 'large',
        handleClick?: () => void
    }>();
</script>

<template>
    <button :disabled="disabled" @click="handleClick" 
        :class="`
        ${bgColor ?? 'bg-neutral-400'} 
        ${textColor ?? 'text-neutral-100'} 
        ${size ? size:hug ? '':variant === 'large' ? 'w-full max-w-[448px]':'w-60'} 
        p-2 rounded box-border leading-none hover:brightness-110 active:brightness-125
        text-lg  
        ${disabled ? 'brightness-50 hover:brightness-50':''}
        flex items-center justify-center gap-1
        `" 
        :type="type">
        <p v-if="disabled && disabledMessage">{{ disabledMessage }}</p>
        <slot v-else/>
    </button>
</template>