<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

const props = defineProps<{
    labelName: string,
    inputId: string,
    modelValue: string,
    type: InputTypeHTMLAttribute,
    placeholder?: string,
    required?: boolean
    error?: string
}>();

const inputType = ref(props.type);

const passwordShow = ref(false);

const togglePasswordShow = () => {
    passwordShow.value = !passwordShow.value;
    inputType.value = passwordShow.value ? 'text':'password';
}

const emit = defineEmits(['update:modelValue'])

const handleInput = ($event: any) => {
    emit('update:modelValue', $event.target.value)
}
</script>

<template>
    <div class="flex flex-col w-full box-border group">
        <label :for="inputId" class="group-hover:brightness-150 group-has-[input:focus]:brightness-150 group-has-[input:not(:placeholder-shown)]:brightness-150">{{ labelName }}</label>
        <div class="h-8 box-border rounded px-1 border-2 border-transparent bg-neutral-800 group-hover:border-neutral-400 group-has-[input:focus]:border-neutral-200 group-has-[input:not(:placeholder-shown)]:border-neutral-200 grid grid-cols-input">
            <input :value="modelValue" @input="handleInput($event)" :type="inputType" :id="inputId" :name="inputId" :required="required" :placeholder="placeholder ?? 'Fill with text...'"
                class="bg-transparent border-none w-full h-full outline-none"
                autocomplete="off"
            />
            <button v-if="type==='password'" type="button" class="grid place-items-center rounded-full p-0.5 hover:bg-neutral-700" @click="togglePasswordShow"><Icon>{{ passwordShow ? 'visibility_off':'visibility' }}</Icon></button>
        </div>
        <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
    </div>
</template>