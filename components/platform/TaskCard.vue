<script setup lang="ts">
    defineProps<{
        variant: 'actions' | 'status'
    }>();
</script>

<template>
    <div class="w-full box-border flex items-center justify-center gap-2 py-2 px-4 bg-neutral-850 rounded-md shadow-md transition-all hover:-translate-y-1 hover:brightness-110">
        <div :class="`${variant === 'actions' ? 'w-4/5 max-w-4/5':'w-full max-w-full'} box-border flex items-start justify-start flex-col gap-2`">
            <div class="max-w-full box-border flex items-start justify-start flex-col">
                <h4 class="w-full text-neutral-50 text-xl leading-none overflow-hidden text-nowrap text-ellipsis">Task 1 title</h4>
                <p class="w-full text-sm leading-none overflow-hidden text-nowrap text-ellipsis">Task 1 description aaaa aaa aaa aaa aaa aaa aaa aaa aaa aaa aaa</p>
            </div>
            <div class="w-full box-border flex items-center justify-between">
                <ul class="flex items-center justify-center gap-1">
                    <li class="bg-neutral-900 rounded-sm p-1 text-xs leading-none">Category 1</li>
                    <li class="bg-neutral-900 rounded-sm p-1 text-xs leading-none">Category 2</li>
                </ul>
                <span v-if="variant==='status'" class="bg-orange-500 text-neutral-100 rounded-sm p-1 text-xs leading-none">ToDo</span>
            </div>
        </div>
        <div v-if="variant==='actions'" class="w-1/5 flex items-center justify-center gap-1">
            <Button hug><Icon>play_circle</Icon></Button>
            <Button hug><Icon>pause_circle</Icon></Button>
        </div>
    </div>
</template>