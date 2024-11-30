<script setup lang="ts">
definePageMeta({
        layout: 'auth'
    })

const state = reactive<{
    credential: string,
    password: string,
    fieldsError?: {
        credential?: string[],
        password?: string[]
    },
    messageError?: string,
    pending?: boolean
}>({
    credential: '',
    password: ''
});

async function onSubmit() {
    state.pending = true;
    
    const dto = {
        credential: state.credential,
        password: state.password
    }

    const {status, data, error} = await useFetch('/api/user/auth',{
        method: 'POST',
        body: dto
    });

    if(status.value === 'error'){
        state.pending = false;
        state.fieldsError = error.value?.data?.data?.fields;
        state.messageError = error.value?.data.message;
    } 

    if(status.value === 'success'){
        state.pending = false;
        const sessionObject = {name: data.value?.name, token: data.value?.token};
        const token = await encrypt(sessionObject);
        useCookie('session').value = token;
        navigateTo('/');
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit" @reset="handlereset(state)" class="flex flex-col gap-2 items-center w-full max-w-[484px] max-sm:max-w-60 box-border">
        <h4 class="text-2xl">Login</h4>
        <div v-if="state.messageError">
            <span class="text-sm text-neutral-200 bg-red-500 rounded p-1 max-w-full">{{ state.messageError }}</span>
        </div>
        <div class="flex flex-col gap-1 w-full">
            <InputField label-name="Email or Login:" placeholder="johndoe or johndoe@email.com" input-id="logincredential" v-model="state.credential" type="text" required :error="state.fieldsError?.credential?.join(';')"/>
            <InputField label-name="Password:" placeholder="12345678" input-id="loginpassword" v-model="state.password" type="password" required :error="state.fieldsError?.password?.join(';')"/>
        </div>
        <div class="flex flex-wrap gap-1">
            <Button :disabled="state.pending" disabled-message="Loading..." bg-color="bg-blue-500" type="submit">Login</Button>
            <Button :disabled="state.pending" disabled-message="Loading..." type="reset">Clear</Button>
        </div>
        <Anchor to="/register" icon="link">Don't have an account? Sign on!</Anchor>
    </form>
</template>