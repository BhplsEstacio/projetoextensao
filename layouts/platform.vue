<template>
    <div class="w-screen h-screen box-border flex flex-col items-center justify-center bg-neutral-900 text-neutral-300 pt-lg-header max-sm:pt-sm-header">
        <Header />
        <main class="h-full w-full gap-x-2 gap-y-0 py-8 px-1/5 max-sm:py-2 max-sm:px-1/12 flex flex-wrap items-start justify-center">
            <slot />
        </main>
        <Footer />
    </div>
</template>