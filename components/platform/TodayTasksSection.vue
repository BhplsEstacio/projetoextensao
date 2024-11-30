<template>
    <PlatformSection>
        <h2 class="text-3xl text-neutral-200">Today's Tasks</h2>
        <Button variant="large" bg-color="bg-blue-500"><p>Add Task</p><Icon>add</Icon></Button>
        <nav class="w-full max-w-[448px]">
            <ul class="w-full max-w-[448px] flex items-center justify-between">
                <li><Button bg-color="bg-neutral-800" size="w-24 max-sm:w-fit">Doing</Button></li>
                <li><Button bg-color="bg-neutral-800" size="w-24 max-sm:w-fit">ToDo</Button></li>
                <li><Button bg-color="bg-neutral-800" size="w-24 max-sm:w-fit">Paused</Button></li>
                <li><Button bg-color="bg-neutral-800" size="w-24 max-sm:w-fit">Done</Button></li>
            </ul>
        </nav>
        <div class="w-full max-w-[448px]">
            <ul class="w-full">
                <li class="w-full"><PlatformTaskCard variant="status"/></li>
            </ul>
        </div>
    </PlatformSection>
</template>