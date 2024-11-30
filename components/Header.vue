<script setup lang="ts">
    const session = String(useCookie('session').value);
    const {name} = await decrypt(session) as {name: string};

    const handleLogout = () => {
        useCookie('session').value = undefined;
        navigateTo('/login')
    }
</script>

<template>
    <header class="fixed top-0 bg-neutral-800 w-screen py-2 box-border shadow-md grid place-items-center max-sm:py-1">
        <nav class="w-4/5 py-2 max-sm:w-11/12 flex items-center justify-between">
            <Logo type="md"/>
            <div class="flex items-center justify-center gap-4">
                <h4 class="text-xl">{{ name }}</h4>
                <Button :handle-click="handleLogout" hug bg-color="bg-neutral-700">
                    Logout
                </Button>
            </div>
        </nav>
    </header>
</template>