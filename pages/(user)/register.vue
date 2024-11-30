<script setup lang="ts">
definePageMeta({
        layout: 'auth'
    })

const state = reactive<{
    email: string,
    name: string,
    login: string,
    password: string,
    fieldsError?: {
        email?: string[],
        name?: string[],
        login?: string[],
        password?: string[]
    },
    messageError?: string,
    pending?: boolean
}>({
    email: '',
    name: '',
    login: '',
    password: ''
});

async function onSubmit() {
    state.pending = true;

    const dto = {
        email: state.email,
        name: state.name,
        login: state.login,
        password: state.password
    }

    const {status, data, error} = await useFetch('/api/user',{
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
        <h4 class="text-2xl">Register</h4>
        <div v-if="state.messageError">
            <span class="text-sm text-neutral-200 bg-red-500 rounded p-1 max-w-full">{{ state.messageError }}</span>
        </div>
        <div class="flex flex-col gap-1 w-full">
            <InputField label-name="Email:" placeholder="johndoe@email.com" input-id="registeremail" v-model="state.email" type="email" required :error="state.fieldsError?.email?.join(';')"/>
            <InputField label-name="Name:" placeholder="John Doe" input-id="registername" v-model="state.name" type="text" required :error="state.fieldsError?.name?.join(';')"/>
            <InputField label-name="Login:" placeholder="johndoe" input-id="registerlogin" v-model="state.login" type="text" required :error="state.fieldsError?.login?.join(';')"/>
            <InputField label-name="Password:" placeholder="12345678" input-id="registerpassword" v-model="state.password" type="password" required :error="state.fieldsError?.password?.join(';')"/>
        </div>
        <div class="flex flex-wrap gap-1">
            <Button :disabled="state.pending" disabled-message="Loading..." bg-color="bg-blue-500" type="submit">Register</Button>
            <Button :disabled="state.pending" disabled-message="Loading..." type="reset">Clear</Button>
        </div>
        <Anchor to="/login" icon="link">Has an account? Sign in!</Anchor>
    </form>
</template>